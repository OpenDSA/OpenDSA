import sys, os
import json

from argparse import ArgumentParser
from collections import Counter, defaultdict
from itertools import combinations

import networkx as nx
from networkx.algorithms import isomorphism
import sympy
# import unit_parse
import pint

ureg = pint.UnitRegistry()
ureg.define('strain = [length]/[length]')
ureg.define('microstrain = 0.000001 * strain')
ureg.define('percentstrain = 0.01 * strain')
ureg.define('rev = revolution')
ureg.define('Radian = radian')

master_unknown_summary = dict()
attempt_unknown_summary = dict()

master_dep_graph = None
attempt_dep_graph = None

training = False
varmap = dict()
eqbank = dict()

# message_text: supposed to store the messages for each individual solution
# in it's own context - compiled and printed later in compile_messages()
message_text = dict()

def compare_quantities(m_magn, m_unit, a_magn, a_unit):
    """
    Compares two comparable numeric quantities to see if they are within tolerable
    limits or not (0.1% of correct answer). Returns True or False
    """
    global ureg

    try:
        if m_unit == "":
            solutionComparableValue = m_magn;
            return abs((solutionComparableValue - a_magn) / solutionComparableValue) <= 0.0001 # corrected after DemoProblem error
        else:
            # solutionComparableValue = unit_parse.parser(f"{m_magn} {m_unit}").to(a_unit)
            solutionComparableValue = ureg.Quantity(m_magn, m_unit).to(a_unit)
            return abs((solutionComparableValue.magnitude - a_magn) / solutionComparableValue.magnitude) <= 0.0001 # corrected after DemoProblem error
        
    except pint.DimensionalityError:
        return False
    
def get_unknown_summary(solution_json):
    summary_json = {}
    
    for wk_id, workspace in solution_json["workspaces"].items():
        for eq_id, equation in workspace["equations"].items():
            #add mappings to equation numbers
            summary_json[f"wk{wk_id}_{eq_id}"] = equation['id']
            summary_json[equation['id']] = f"wk{wk_id}_{eq_id}"

            for varname, variable in equation["variables"].items():
                if variable["valueType"] == "number":
                    summary_json[variable["id"]] = variable
                elif variable["valueType"] == "association":
                    summary_json[variable["id"]] = variable
                    summary_json.setdefault(variable["value"]["var"], {variable["id"]}).add(variable["id"])
                else:  #definitely an unknown
                    summary_json[variable["id"]] = variable
                    summary_json.setdefault(variable["currentSymbol"], {variable["id"]}).add(variable["id"])
        
        # Also store pointers to/details of computed solutionboxes
    
    return summary_json

def makeDependencyGraph(solutionObject, eqbank, debug=False):
    g_dependency = nx.Graph()
        
    for w_id, wkspace in solutionObject['workspaces'].items():
        for eq_id, eq in wkspace['equations'].items():
            # add the equation as a node
            eq_node_name = f"wk{w_id}_{eq_id}"
            
            g_dependency.add_node(
                eq_node_name, group='equation'
            )
            template = eqbank[eq['equation_template_id']]["sympy_template"] \
            if "sympy_template" in eqbank[eq['equation_template_id']]  \
            else eqbank[eq['equation_template_id']]['template']
            
            for var_id, var in eq['variables'].items():
                if debug:
                    print(var_id)
                if var['valueType'] == 'association':
                    g_dependency.add_node(var['value']['var'], group='unknown')
                    if var['valueNegated']:
                        template = template.replace(var['name'], '-'+var['value']['var'])
                        g_dependency.add_edge(eq_node_name, var['value']['var'], negated=1)
                    else:
                        template = template.replace(var['name'], var['value']['var'])
                        g_dependency.add_edge(eq_node_name, var['value']['var'], negated=0)
                    
                elif var['valueType'] == None:
                    g_dependency.add_node(var['currentSymbol'], group='unknown')
                    if var['valueNegated']:
                        template = template.replace(var['name'], '-'+var['currentSymbol'])
                        g_dependency.add_edge(eq_node_name, var['currentSymbol'], negated=1)
                    else:
                        template = template.replace(var['name'], var['currentSymbol'])
                        g_dependency.add_edge(eq_node_name, var['currentSymbol'], negated=0)
                    
                elif var['valueType'] == 'number':
                    if len(var['valueSource'].split('_')) > 1:
                        g_dependency.add_node(var['valueSource'], group='unknown')
                        if var['valueNegated']:
                            template = template.replace(var['name'], '-'+var['valueSource'])
                            g_dependency.add_edge(eq_node_name, var['valueSource'], negated=1)
                        else:
                            template = template.replace(var['name'], var['valueSource'])
                            g_dependency.add_edge(eq_node_name, var['valueSource'], negated=0)
                    else:
                        # it is just a number
                        if var['valueNegated']:
                            template = template.replace(var['name'], '-'+var['id'])
                        else:
                            template = template.replace(var['name'], var['id'])
            
            lhs, rhs = template.split("=")
            g_dependency.nodes[eq_node_name]['template'] = sympy.Eq(sympy.parse_expr(rhs), sympy.parse_expr(lhs))
            g_dependency.nodes[eq_node_name]['folded'] = []
    
    for sol_id, solution in solutionObject['solutions'].items():
        if solution['source'] == '':
            if training:
                pass
            else:
                # print(f"Solution {sol_id} was not submitted")
                if solution['type'] == "choices":
                    continue
                else:
                    message_text[sol_id]["decision"] = [f"Solution {int(sol_id)+1} was not submitted"]
        elif solution["type"] == "number" or solution["type"] == "integer":  
            # otherwise no point in connecting this to subgraph
            if g_dependency.has_node(solution['source']):
                g_dependency.nodes[solution['source']]['solution_id'] = sol_id
                # stores the id of the solution box that connects to that unknown
        
        # Alternatively, if the source is not found, we have a problem
        # since ANY solution would have to be computed from a system of equations
        # to be legitimate. print error to terminal.
        # TODO: Add this error message
    
    # add function call to simplify and substitute? make it an all in one?
    
    return g_dependency

    """
    g_dependency = nx.Graph()
        
    for w_id, wkspace in solutionObject['workspaces'].items():
        for eq_id, eq in wkspace['equations'].items():
            # add the equation as a node
            eq_node_name = f"wk{w_id}_{eq_id}"
            
            g_dependency.add_node(
                eq_node_name, group='equation'
            )
            template = eqbank[eq['equation_template_id']]["sympy_template"] \
            if "sympy_template" in eqbank[eq['equation_template_id']]  \
            else eqbank[eq['equation_template_id']]['template']
            
            for var_id, var in eq['variables'].items():
                if debug:
                    print(var_id)
                if var['valueType'] == 'association':
                    g_dependency.add_node(var['value']['var'], group='unknown')
                    if var['valueNegated']:
                        template = template.replace(var['name'], '-'+var['value']['var'])
                        g_dependency.add_edge(eq_node_name, var['value']['var'], negated=1)
                    else:
                        template = template.replace(var['name'], var['value']['var'])
                        g_dependency.add_edge(eq_node_name, var['value']['var'], negated=0)
                    
                elif var['valueType'] == None:
                    g_dependency.add_node(var['currentSymbol'], group='unknown')
                    if var['valueNegated']:
                        template = template.replace(var['name'], '-'+var['currentSymbol'])
                        g_dependency.add_edge(eq_node_name, var['currentSymbol'], negated=1)
                    else:
                        template = template.replace(var['name'], var['currentSymbol'])
                        g_dependency.add_edge(eq_node_name, var['currentSymbol'], negated=0)
                    
                elif var['valueType'] == 'number':
                    if len(var['valueSource'].split('_')) > 1:
                        g_dependency.add_node(var['valueSource'], group='unknown')
                        if var['valueNegated']:
                            template = template.replace(var['name'], '-'+var['valueSource'])
                            g_dependency.add_edge(eq_node_name, var['valueSource'], negated=1)
                        else:
                            template = template.replace(var['name'], var['valueSource'])
                            g_dependency.add_edge(eq_node_name, var['valueSource'], negated=0)
                    else:
                        # it is just a number
                        if var['valueNegated']:
                            template = template.replace(var['name'], '-'+var['id'])
                        else:
                            template = template.replace(var['name'], var['id'])
            
            lhs, rhs = template.split("=")
            g_dependency.nodes[eq_node_name]['template'] = sympy.Eq(sympy.parse_expr(rhs), sympy.parse_expr(lhs))
            g_dependency.nodes[eq_node_name]['folded'] = []
    
    for sol_id, solution in solutionObject['solutions'].items():
        if solution['source'] == '':
            if training:
                pass
            else:
                # print(f"Solution {sol_id} was not submitted")
                if solution['type'] == "choices":
                    continue
                else:
                    message_text[sol_id]["decision"] = [f"Solution {int(sol_id)+1} was not submitted"]
        elif solution["type"] == "number" or solution["type"] == "integer":  
            # otherwise no point in connecting this to subgraph
            if g_dependency.has_node(solution['source']):
                g_dependency.nodes[solution['source']]['solution_id'] = sol_id
                # stores the id of the solution box that connects to that unknown
        
        # Alternatively, if the source is not found, we have a problem
        # since ANY solution would have to be computed from a system of equations
        # to be legitimate. print error to terminal.
        # TODO: Add this error message
    
    # add function call to simplify and substitute? make it an all in one?
    
    return g_dependency
    """

def dependencyFolding(g_dep, debug=False):
    # reduces 1-1 dependencies wherever possible to create the minimal set
    # of equations and unknowns. Keeps the terminal (orange) nodes intact.
    # Works only on the subgraphs that have a terminal node.
    
    g_folded = None
    
    # 1. find the subgraphs that actually connect to solutions
    solution_subgraphs = {} # key: id of soln box, value: subgraph/chain
    
    for g_sub in nx.connected_components(g_dep):
        #for soln_id in [
        #    g_dep.nodes[n]["solution_id"] for n in g_sub if "solution_id" in g_dep.nodes[n]
        #]:
        #    # for each solution id, add this subgraph, as a single subgraph may answer multiple subparts
        #    solution_subgraphs[soln_id] = g_dep.subgraph(g_sub).copy()
        soln_ids = [g_dep.nodes[n]["solution_id"] for n in g_sub if "solution_id" in g_dep.nodes[n]]
        if len(soln_ids) == 1:
            soln_id = soln_ids[0]
        elif len(soln_ids) > 1:
            soln_id = ",".join(soln_ids)
            message_text[soln_id] = {"details":[]}
        else:
            # NOTE: First noticed on 9/21/22, with DeformsDemo
            # when alt solutions were done and equations left unused,
            # resulted in non-solution conn comps.
            # later: remove these equations at the time of solution.
            continue
        solution_subgraphs[soln_id] = g_dep.subgraph(g_sub).copy()
    
    for s_id, g_solution in solution_subgraphs.items():
        # Repeat until the graph does not change
        flag = True
        while flag:
            # Find equations that can be substituted in g_solution, apply folding and record it
            
            # 1. Find equations connecting to only one unknown, which can be simplified
            # find foldable edges
            for n in g_solution:
                if g_solution.nodes[n]['group'] == 'equation' and g_solution.degree(n) == 1:
                    # get the details of the one var connected to n
                    var = [_ for _ in g_solution[n]][0]
                    if g_solution.degree(var) >= 2 and not 'solution_id' in g_solution.nodes[var]:
                        g_solution[n][var]['fold'] = True
                        g_solution[n][var]['equation'] = str(n)
                        g_solution[n][var]['unknown'] = str(var)

            # fold the edges/i.e. substitute where possible
            edges_to_fold = list([
                (g_solution[u][v]['equation'],g_solution[u][v]['unknown'])
                for u,v in nx.get_edge_attributes(g_solution,"fold")
            ])
            if debug:
                print(len(edges_to_fold))
            if len(edges_to_fold):
                for eq, var in edges_to_fold:
                    #eq, var = key
                    if debug:
                        print(eq,var,g_solution.nodes[eq]['template'])
                        print(sympy.solve(g_solution.nodes[eq]['template'], var))

                    subs_eq = sympy.solve(g_solution.nodes[eq]['template'], var, evaluate=False)

                    # Remove the edge between equation and var, since that unknown does not
                    # exist in that equation anymore.
                    g_solution.remove_edge(eq,var) # this is possible because a shallow copy is created.

                    # Find where target equation with var in it appears, and substitute var
                    # with the new expression in those equations, and remove edges to that equation
                    var_target_equations = list(g_solution[var].keys())
                    for eq_target in var_target_equations:
                        #substitute the lhs and rhs
                        #lhs = g_solution.nodes[eq_target]['template'].lhs.subs(var, sympy.UnevaluatedExpr(subs_eq[0]))
                        #rhs = g_solution.nodes[eq_target]['template'].rhs.subs(var, sympy.UnevaluatedExpr(subs_eq[0]))
                        lhs = g_solution.nodes[eq_target]['template'].lhs.subs(var, subs_eq[0])
                        rhs = g_solution.nodes[eq_target]['template'].rhs.subs(var, subs_eq[0])

                        #then, rewrite the equation in terms of the new lhs and rhs
                        #g_solution.nodes[eq_target]['template'] = sympy.Eq(lhs, rhs, evaluate=False)
                        g_solution.nodes[eq_target]['template'] = sympy.Eq(lhs, rhs)
                        g_solution.nodes[eq_target]['folded'].append(eq)
                        
                        # For possible canonicalization issues, reset these to subject variable
                        # when possible, afterwards
                        
                        g_solution.remove_edge(eq_target,var)
            else:
                flag = False # and the loop terminates
    
    g_folded = solution_subgraphs
    return g_folded

# comparing submitted solutions against other solutions

def compare_solution_boxes(master_soln, attempt_soln, attempt_soln_summary):
    
    def find_alternatives(solution):
        list_of_solns = {}
        for wk, wkspace in attempt_soln["workspaces"].items():
            for s_id, solnBox in wkspace["solutionBoxes"].items():
                if solution["unit"] == solnBox["unit"]:
                    if float(solution["solution"]) == float(solnBox["value"]):
                        # Exact match
                        list_of_solns[solnBox["variable"]] = {
                            "message": "Exact match found",
                            "sid": s_id,
                            "wk": wk,
                            "box": solnBox
                        }

                    elif abs(float(solution["solution"])) == abs(float(solnBox["value"])):
                        # Magnitude match
                        list_of_solns[solnBox["variable"]] = {
                            "message": "Magnitude match found",
                            "sid": s_id,
                            "wk": wk,
                            "box": solnBox
                        }
                    
        return list_of_solns
    
    for soln_id, solution in master_soln["solutions"].items():
        message_text[soln_id] = {"status": False, "decision": [], "details":[]}
        
        if solution["type"] != "number":
            if solution["solution"] == attempt_soln["solutions"][soln_id]["solution"]:
                message_text[soln_id]["status"] = True
                message_text[soln_id]["decision"].append(f"Solution {int(soln_id)+1} was correct!")
            else:
                message_text[soln_id]["status"] = False
                message_text[soln_id]["decision"].append(f"Solution {int(soln_id)+1} was incorrect!")
        else:
            # convert the units from solution["unit"] and attempt_soln[soln_id]["unit"]
            soln_target_tag = None
            flag=False
            
            if attempt_soln["solutions"][soln_id]["solution"] == None:
                flag=True
            
            # Replace this entire segment with compare_quantities
            #elif solution["unit"] == attempt_soln["solutions"][soln_id]["unit"]:
            #    if float(solution["solution"]) == float(attempt_soln["solutions"][soln_id]["solution"]):
            #        message_text[soln_id]["decision"]\
            #            .append(f"Solution {int(soln_id)+1} was correct!")
            #        soln_target_tag = solution["source"]
            #    elif abs(float(solution["solution"])) == abs(float(attempt_soln["solutions"][soln_id]["solution"])):
            #        message_text[soln_id]["decision"]\
            #            .append(f"Solution {int(soln_id)+1} magnitude/value was correct! Sign was different.")
            #        soln_target_tag = solution["source"]
            #    else:
            #        flag=True
            
            elif compare_quantities(
                float(solution["solution"]),
                solution["unit"],
                float(attempt_soln["solutions"][soln_id]["solution"]),
                attempt_soln["solutions"][soln_id]["unit"]
            ):
                message_text[soln_id]["status"] = True
                message_text[soln_id]["decision"]\
                    .append(f"Solution {int(soln_id)+1} was correct!")
                soln_target_tag = solution["source"]
            
            elif compare_quantities(
                abs(float(solution["solution"])),
                solution["unit"],
                abs(float(attempt_soln["solutions"][soln_id]["solution"])),
                attempt_soln["solutions"][soln_id]["unit"]
            ):
                message_text[soln_id]["status"] = False
                message_text[soln_id]["decision"]\
                    .append(f"Solution {int(soln_id)+1} magnitude/value was correct! Sign was different.")
                soln_target_tag = solution["source"]
            
            else:
                flag=True
            
            if flag:
                message_text[soln_id]["status"] = False
                text = f"Solution {int(soln_id)+1} was incorrect! "
                soln_target_tag = find_alternatives(solution) # which goes through the solution boxes in the solution.
                if not soln_target_tag:
                    text+=f"Seems like the correct answer for Solution {int(soln_id)+1} was not computed at all."
                else:
                    text+=f"Seems like the right answer for Solution {int(soln_id)+1} was found here:"
                    for key, solnbox in soln_target_tag.items():
                        message = solnbox["message"]
                        sid = solnbox["sid"]
                        wk = solnbox["wk"]
                        varDisp = solnbox["box"]["variableDisplay"].replace('{','{{').replace('}','}}')
                        text+=f"{message} in box no. {sid} in workspace {wk}."
                        text+=f"Box computed for {varDisp}"
                        text+=f"which connects to the following equations:"
                        text+=str(attempt_soln_summary[key])
                
                message_text[soln_id]["decision"].append(text)
    
    return
    
    """
    def find_alternatives(solution):
        list_of_solns = {}
        for wk, wkspace in attempt_soln["workspaces"].items():
            for s_id, solnBox in wkspace["solutionBoxes"].items():
                if solution["unit"] == solnBox["unit"]:
                    if float(solution["solution"]) == float(solnBox["value"]):
                        # Exact match
                        list_of_solns[solnBox["variable"]] = {
                            "message": "Exact match found",
                            "sid": s_id,
                            "wk": wk,
                            "box": solnBox
                        }

                    elif abs(float(solution["solution"])) == abs(float(solnBox["value"])):
                        # Magnitude match
                        list_of_solns[solnBox["variable"]] = {
                            "message": "Magnitude match found",
                            "sid": s_id,
                            "wk": wk,
                            "box": solnBox
                        }
                    
        return list_of_solns
    
    for soln_id, solution in master_soln["solutions"].items():
        message_text[soln_id] = {"decision": [], "details":[]}
        
        if solution["type"] != "number":
            if solution["solution"] == attempt_soln["solutions"][soln_id]["solution"]:
                message_text[soln_id]["decision"].append(f"Solution {int(soln_id)+1} was correct!")
            else:
                message_text[soln_id]["decision"].append(f"Solution {int(soln_id)+1} was incorrect!")
        else:
            # convert the units from solution["unit"] and attempt_soln[soln_id]["unit"]
            soln_target_tag = None
            flag=False
            
            if attempt_soln["solutions"][soln_id]["solution"] == None:
                flag=True
            
            elif solution["unit"] == attempt_soln["solutions"][soln_id]["unit"]:
                if float(solution["solution"]) == float(attempt_soln["solutions"][soln_id]["solution"]):
                    message_text[soln_id]["decision"]\
                        .append(f"Solution {int(soln_id)+1} was correct!")
                    soln_target_tag = solution["source"]
                elif abs(float(solution["solution"])) == abs(float(attempt_soln["solutions"][soln_id]["solution"])):
                    message_text[soln_id]["decision"]\
                        .append(f"Solution {int(soln_id)+1} magnitude/value was correct! Sign was different.")
                    soln_target_tag = solution["source"]
                else:
                    flag=True
            else:
                flag=True
            
            if flag:
                text = f"Solution {int(soln_id)+1} was incorrect! "
                soln_target_tag = find_alternatives(solution) # which goes through the solution boxes in the solution.
                if not soln_target_tag:
                    text+=f"Seems like the correct answer for Solution {int(soln_id)+1} was not computed at all."
                else:
                    text+=f"Seems like the right answer for Solution {int(soln_id)+1} was found here:"
                    for key, solnbox in soln_target_tag.items():
                        message = solnbox["message"]
                        sid = solnbox["sid"]
                        wk = solnbox["wk"]
                        varDisp = solnbox["box"]["variableDisplay"].replace('{','{{').replace('}','}}')
                        text+=f"{message} in box no. {sid} in workspace {wk}."
                        text+=f"Box computed for {varDisp}"
                        text+=f"which connects to the following equations:"
                        text+=str(attempt_soln_summary[key])
                
                message_text[soln_id]["decision"].append(text)
    
    return
    """

def generateExpressionTree(expr, prefix="default", debug=False):
    # expr: Sympy expression
    
    g_exp_tree = nx.Graph()
    op_id_counter = 0
    id_maker = {
        "Add": "+",
        "Mul": "*",
        "Pow": "^",
        "NegativeOne": "-1",
        "Symbol": "Symbol",
        "Integer": "Integer",
        "Rational": "Rational",
        "Float": "Float"
    }
    def get_type_from_id(name):
        return name.split('_')[2] # since we now also have a prefix
    
    def walker(exp_node):
        # If no args then it is Symbol or a number, treat differently.
        nonlocal op_id_counter
        
        node_id = prefix+"_"+str(op_id_counter)+"_"+ \
        str(exp_node.func).replace('<','').replace('>','').replace("'",'').split(".")[-1]
        op_id_counter+=1
        
        if not exp_node.args:
            # Create a Symbol node
            g_exp_tree.add_node(node_id)
            if debug:
                print("exiting leaf",exp_node.func)
            
        else:
            if debug:
                print("in head",exp_node.func)
            g_exp_tree.add_node(node_id)
            for child in exp_node.args:
                child_exp_node_id = walker(child)
                g_exp_tree.add_edge(node_id, child_exp_node_id)
                g_exp_tree.nodes[child_exp_node_id]['pred'] = node_id
        
        if debug:
            print(exp_node, exp_node.func, exp_node.args)
        
        g_exp_tree.nodes[node_id]['label'] = \
        exp_node.name if get_type_from_id(node_id) == "Symbol" else \
        str(exp_node) if get_type_from_id(node_id) == "Integer" else \
        str(f"{exp_node.as_numer_denom()[0]}/{exp_node.as_numer_denom()[1]}") \
            if get_type_from_id(node_id) == "Rational" else \
        str(round(exp_node, 3)) if get_type_from_id(node_id) == "Float" else \
        id_maker[get_type_from_id(node_id)] if get_type_from_id(node_id) in id_maker \
        else get_type_from_id(node_id)
        return node_id
    
    root = walker(expr)
    g_exp_tree.nodes[root]['pred'] = None
    
    return g_exp_tree

def dg_node_match(master_node_dict, attempt_node_dict, debug=False):
    # Check the label
    # if it is a symbol, and is a full variable, compare value and unit
    # if it is an operator/anything else (-1, etc.), compare directly as per string.
    if debug:
        print(master_node_dict['label'], attempt_node_dict['label'])
    
    if master_node_dict['label'].count('_') == 4 and \
    attempt_node_dict['label'].count('_') == 4:
        master_details = master_unknown_summary[master_node_dict['label']]
        attempt_details = attempt_unknown_summary[attempt_node_dict['label']]
        # If they are manually inserted quantities
        if master_details['valueSource'] == "" and attempt_details['valueSource'] == "":
            #return \
            #master_details['value'] == attempt_details['value'] \
            #and master_details['currentUnit'] == attempt_details['currentUnit']
            return compare_quantities(
                float(master_details['value']),
                master_details['currentUnit'],
                float(attempt_details['value']),
                attempt_details['currentUnit']
            )
        
        # TODO put in an analogue for variables, when appropriate
        
        # If they are parameters drawn from the question
        return master_details['valueSource'] == attempt_details['valueSource']
    
    elif master_node_dict['label'].count('_') == 1 and \
        attempt_node_dict['label'].count('_') == 1:
        return varmap[attempt_node_dict['label']] == master_node_dict['label']
    
    else:
        return master_node_dict['label'] == attempt_node_dict['label']

def get_depth_nary_tree(tree, debug=False):
    """
    tree: root node of the tree, NetworkX graph
    
    returns integer or 0
    """
    
    if nx.number_connected_components(tree) > 1:
        # don't know which tree to calculate for
        return -1
    
    def calc_depth_rec(node,parent):
        l_children = [
            child
            for child in tree[node]
            if child != parent
        ]
        
        if len(l_children) == 0:
            return 1
        
        return max([ calc_depth_rec(n,node) for n in l_children ])+1
    
    return calc_depth_rec(find_root(tree), parent=None)

def find_root(g_subtree):
    return min(g_subtree.nodes(), key=lambda x: int(x.split("_")[1]))

def compare_exp_trees(met, aet, debug=False):
    # store the matchings and show them as well, success or otherwise

    matchings = dict()    

    # Start by calculating the depth of the original trees
    met_root = find_root(met)
    aet_root = find_root(aet)

    met_depth = get_depth_nary_tree(met)
    aet_depth = get_depth_nary_tree(aet)

    # Creating list of subtrees to compare
    met_subg_trees = {
        met_depth:    {met_root:met}
    }
    aet_subg_trees = {
        aet_depth:    {aet_root:aet}
    }
    
    # depth_level determines where we are looking at any given moment
    depth_level = max(met_depth, aet_depth)
    
    while depth_level > 1:
        # If trees are reduced to leaves, then we move to the next phase
        # loop exit condition
        
        # Needed because legacy
        new_matches = dict()
        
        # checking for empty trees just in case
        if len(list(aet_subg_trees.keys())) == 0 \
        or len(list(met_subg_trees.keys())) == 0:
            # i.e. the only keys in this are depth=1, leaf nodes
            if debug:
                print("One of the trees is empty")
            break
        
        if depth_level not in met_subg_trees and depth_level not in aet_subg_trees:
            # No trees to be found at this level, nothing to be compared, move on
            break
        
        current_match = {}
        if depth_level in met_subg_trees and depth_level in aet_subg_trees:
            # If we have non-empty lists of trees at that level,
            # then that level is comparable.
            # We try to compare the trees at that level.
            for aet_subtree_root, aet_subtree in aet_subg_trees[depth_level].items():
                for met_subtree_root, met_subtree in met_subg_trees[depth_level].items():
                    # Compare if the subtrees are not leaf nodes; i.e. depth>1
                    GM = isomorphism.GraphMatcher(met_subtree, aet_subtree, node_match=dg_node_match)
                    
                    if debug:
                        print(met_subtree.nodes())
                        print(aet_subtree.nodes())
                        print(GM.mapping)
                    
                    if GM.is_isomorphic():
                        if len([ \
                                a for a in current_match \
                                if met_subtree_root in current_match[a] \
                        ]) > 0:
                            # if the met_sub3_root just matched with
                            # already matched with another ae3 root in current_match,
                            # then we skip this turn, find another match.
                            # ideally there should be one, if not, we've got something to report.
                            continue
                        else:
                            current_match[aet_subtree_root] = {met_subtree_root: GM.mapping}
                            new_matches[(aet_subtree_root, met_subtree_root)] = GM.mapping
                        
                        #aet_subg_trees[depth_level].pop(aet_subtree_root)
                        #met_subg_trees[depth_level].pop(met_subtree_root)

                        for m_node, a_node in GM.mapping.items():
                            met.nodes[m_node]['visited'] = 1
                            met.nodes[m_node]['mapped'] = 1
                            aet.nodes[a_node]['visited'] = 1
                            aet.nodes[a_node]['mapped'] = 1
                            if debug:
                                met.nodes[m_node]['color'] = 'red'
                                aet.nodes[a_node]['color'] = 'red'

                            matchings[(a_node,m_node)] = True
                    else:
                        pass

            # If a match is registered for an aet subtree at depth d,
            # there must be a corresponding met subtree at depth d
            # delete both from *_subg buckets
            for aet_root_match in current_match:
                for met_root_match in current_match[aet_root_match]:
                    met_subg_trees[depth_level].pop(met_root_match)
                aet_subg_trees[depth_level].pop(aet_root_match)
        
        # Now, if it's not comparable, then one of the lists at depth_level
        # must be empty. Check for them and breakdown the non-empty one.
        
        #if depth_level in met_subg_trees \
        #and depth_level not in aet_subg_trees:
        if depth_level in met_subg_trees:
            """
            If met_subg has subtrees of depth d
            But aet_subg has not subtrees of depth d
            But aet has subtrees of depth d+1 or more.
            then move them down
            """
            for root,subtree in met_subg_trees[depth_level].items():
                met.nodes[root]['visited'] = 1 # not mapped, since this one probs won't map correctly anyway

                # add the decomposed subtrees
                for met_st_nodes in list(nx.connected_components(
                    met.subgraph([_ for _ in met if not 'visited' in met.nodes[_]])
                )):
                    met_st = met.subgraph(met_st_nodes)
                    met_st_depth = get_depth_nary_tree(met_st)

                    met_subg_trees\
                    .setdefault(met_st_depth, dict()) \
                    .update({find_root(met_st): met_st})

            # Remove the subtrees at that level and the entry too
            met_subg_trees.pop(depth_level)
            
        #elif depth_level in aet_subg_trees \
        #and depth_level not in met_subg_trees:
        if depth_level in aet_subg_trees:
            """
            If aet_subg has subtrees of depth d
            But met_subg has not subtrees of depth d
            But met has subtrees of depth d+1 or more.
            then move them down
            """
            for root,subtree in aet_subg_trees[depth_level].items():
                aet.nodes[root]['visited'] = 1 # not mapped, since this one probs won't map correctly anyway

                # add the decomposed subtrees
                for aet_st_nodes in list(nx.connected_components(
                    aet.subgraph([_ for _ in aet if not 'visited' in aet.nodes[_]])
                )):
                    aet_st = aet.subgraph(aet_st_nodes)
                    aet_st_depth = get_depth_nary_tree(aet_st)

                    aet_subg_trees\
                    .setdefault(aet_st_depth, dict()) \
                    .update({find_root(aet_st): aet_st})

            # Remove the subtrees at that level and the entry too
            aet_subg_trees.pop(depth_level)
        
        # update depth_level to next step
        depth_level-=1

        # Step 2.2: Because we have some subtrees of depth>1 in MET/AET, possible
        # that someone missed an equation or an association, or added extras.
        # ==> if we have any leaf nodes (depth=1) in the list of subtrees.
        # We will try to compare these leaf nodes because we have some context here
        # because of the other subtrees we tried to compare.
        # Process: go over the leaf nodes in MET.subtree, 
        # try to find leaf nodes in AET.subtree that they match with.
        # mark/unmark these as per match (possibly using dg_node_match or similar)

        # UPDATE: We're going to do this later when we only have leaf nodes.
        # Process: Compare the leaf nodes and their parent opnodes
        # If they match, they were probably used correctly.
        # New addition: Orange nodes in AET which means something probably matched
        # (DO NOT report in MET since makes no sense, only mark it)
        # Add to matchings if it does match.

    # Step 3: If only lists of isolated leaf nodes are left, do the same as before:
    # try to compare them individually based on the equations they appear in.
    # If the type of equation is same, and box name is same -> candidate
    # compare values/varmap
    # nodes that aren't mapped are reported as unmarked, may get reported in errors.
    # UPDATE: This is dumb, do not do this. I mean, it'll work;
    # but we've got a better idea now that we know that the tree is mostly matching up.


    # aet_leaves = sorted(
    #     [(n, list(aet[n].keys())[0]) for n in aet if 'mapped' not in aet.nodes[n] and len(aet[n]) == 1], 
    #     key=lambda _:_[0].split('_')[1], reverse=True
    # )
    # met_leaves = sorted(
    #     [(n, list(met[n].keys())[0]) for n in met if 'mapped' not in met.nodes[n] and len(met[n]) == 1], 
    #     key=lambda _:_[0].split('_')[1], reverse=True
    # )

    aet_leaves = dict(
        [(n, list(aet[n].keys())[0]) for n in aet if 'mapped' not in aet.nodes[n] and len(aet[n]) == 1]
    )
    met_leaves = dict(
        [(n, list(met[n].keys())[0]) for n in met if 'mapped' not in met.nodes[n] and len(met[n]) == 1]
    )

    leaf_matches = {}
    for aetl,aetl_root in aet_leaves.items():
        for metl,metl_root in met_leaves.items():
            if dg_node_match(met.nodes[metl],aet.nodes[aetl]) \
            and dg_node_match(met.nodes[metl_root],aet.nodes[aetl_root]):
                # Either we can just classify it as a probabilistic match
                leaf_matches[aetl] = metl
                aet.nodes[aetl]['visited'] = 1
                met.nodes[metl]['visited'] = 1
                
                leaf_matches[aetl_root] = metl_root
                aet.nodes[aetl_root]['visited'] = 1
                met.nodes[metl_root]['visited'] = 1
                
                matchings[(aetl,metl)] = True
                matchings[(aetl_root,metl_root)] = True
                
                aet.nodes[aetl]['mapped'] = 0.5
                met.nodes[metl]['mapped'] = 0.5
                aet.nodes[aetl_root]['mapped'] = 0.5
                met.nodes[metl_root]['mapped'] = 0.5
                
                if debug:
                    # For probabilistic match
                    aet.nodes[aetl]['color'] = 'orange'
                    met.nodes[metl]['color'] = 'orange'
                    aet.nodes[aetl_root]['color'] = 'orange'
                    met.nodes[metl_root]['color'] = 'orange'

                break
                # Or, go 'full send' and check if the neighboring non-leaves
                # are isomorphic and reported or not.
                # LATER
        if aetl in leaf_matches:
            met_leaves.pop(leaf_matches[aetl])
    
    # Step 4: Matching root nodes that were earlier dismissed 
    # but have all matching immediate children
    
    # TODO
    # TODO
    # TODO
    # TODO
    # TODO
    # TODO
    # TODO
    # TODO
    # TODO
    # TODO
    # TODO
    # TODO
    # TODO
    # TODO
    # TODO
    # TODO
            
    return matchings

def get_node_height(node, tree, debug=False):
    """
    node: node to calculate height for
    tree: root node of the tree, NetworkX graph
    
    returns integer or 0
    """
    
    if nx.number_connected_components(tree) > 1:
        # don't know which tree to use
        return -1
    
    if not tree.has_node(node):
        return -1
    
    return 1+ nx.shortest_path_length(tree, find_root(tree), node)

def tree_annotator(exp_tree, dep_graph, soln_id, unknown_summary, debug=False):
    # Create dict of nodes by height, process them accordingly
    
    """
    for each height, process nodes at that level
    rules:
    if leaf node (operand or constant), continue
    if unary operator node (^ with -1, or * with -1, two nodes only, and one is operand)
        operator's equation is practically the same node as the operator below it.
            so copy over ID from the leaf node below it
        exception: if a single equation is used, then this is a substitution.
        Highly unlikely, but this can be processed.
        see exception condition
    else
        multiple equations are connected by same operator through substitution
        copy over all the common equation IDs from the LEAF NODES below it ONLY
        to the operator node.
    exception
        there are no leaf nodes at that level.
        So, all the operator nodes may/will have equation IDs.
        so the equations are connected purely using substitutions of variables.
        so this must be processed.
    
    For each equation ID at the operator node, one of two things brought the equation to this level.
    either it was a variable substitution that connected the operators at that level.
    or it was ... ???
        Use surrounding information to determine what the substitution was.
        OR use the equation ID that was moved to the operator node
        to determine which variable was folded over,
            and copy over its unique ID and latex representation.
            this will be used for reporting.
    """
    
    dict_node_depth = defaultdict(list)
        
    for node in exp_tree.nodes():
        dict_node_depth[get_node_height(node, exp_tree)].append(node)
    
    l_depth = sorted(dict_node_depth.keys(), reverse=True)
    # for depth in l_depth[1:]:
    for depth in l_depth:
        # Process the nodes as per previous rules.
        
        for node in dict_node_depth[depth]:
            l_children = [
                child
                for child in exp_tree[node]
                if child != exp_tree.nodes[node]['pred']
            ]
            
            if debug:
                print("Currently at this node:")
                print(depth, node, l_children)
                print()
            
            # Start the annotation rules
            if len(l_children) == 0:
                continue
            
            elif len(l_children) == 2 \
            and exp_tree.nodes[node]['label'] in ['*','^'] \
            and "NegativeOne" in [ _.split('_')[2] for _ in l_children]:
                if debug:
                    print("found a unary operator",node)
                    print()
                
                operand = \
                    l_children[0] if "NegativeOne" in l_children[1] \
                    else l_children[1]
                if not "Symbol" in operand:
                    continue
                
                exp_tree.nodes[node]['equationlist'] = {}
                exp_tree.nodes[node]['equationlist']\
                [exp_tree.nodes[operand]['label'][:exp_tree.nodes[operand]['label'].rfind('_')]] \
                = {
                    'term' : exp_tree.nodes[operand]['label'],'substituted' : False
                }
            
            else:
                # it's a standard n-way operator with a bunch of operands
                # figure out which equation this is in.
                
                leafoperand = []
                operators = []
                
                for child in l_children:
                    
                    #if debug:
                    #    print("Nbh of",child,": ",list(nx.neighbors(exp_tree,child)))
                    #    print("Pred of",child,": ",exp_tree.nodes[child]['pred'])
                    #    print()
                        
                    if len([
                            _ for _ in nx.neighbors(exp_tree,child) 
                            if _ != exp_tree.nodes[child]['pred']
                        ]) > 0 and \
                    'equationlist' in exp_tree.nodes[child]:
                        # If there's an equationlist, its an
                        # operator with leaves, not constants
                        operators.append(child)
                    else:
                        if "Symbol" in child:
                            leafoperand.append(child)
                
                if debug:
                    print("Leaves:",leafoperand)
                    print("Operators:",operators)
                
                leaf_eq = {}
                unsub_oper_eq = {}
                
                for lopnd in leafoperand:
                    leaf_eq[
                        exp_tree.nodes[lopnd]['label'][:exp_tree.nodes[lopnd]['label'].rfind('_')]
                    ] = None
                
                for op in operators:
                    for eq in exp_tree.nodes[op]['equationlist']:
                        if exp_tree.nodes[op]['equationlist'][eq]['substituted'] == False:
                            unsub_oper_eq[eq] = None
                
                if debug:
                    print("Leaf equations and operator equations---")
                    print(leaf_eq, unsub_oper_eq)
                    print()
                
                #equations_at_level = set(leaf_eq).intersection(set(unsub_oper_eq))
                #if debug:
                #    print(equations_at_level)
                
                # If nonzero intersection > 1, problem
                # means multiple equations are substituted into a single equation
                # and combined accordingly, not sure how prevalent this is
                # need to investigate
                #
                # if len(equations_at_level) > 1:
                #    pass
                
                # If nonzero intersection == 1
                # and union == 1, move up immediately
                #if len(set(leaf_eq).intersection(set(unsub_oper_eq))) == 1 \
                #and len(set(leaf_eq).union(set(unsub_oper_eq))) == 1:
                if len(set(leaf_eq).union(set(unsub_oper_eq))) == 1:
                    if debug:
                        print("Only one equation here, moving on up")
                        print("Assigning top level equation to this node")
                        print(node)
                        print(list(set(leaf_eq).union(set(unsub_oper_eq)))[0])
                        print()
                    
                    exp_tree.nodes[node]['equationlist'] = {}
                    exp_tree.nodes[node]['equationlist'] \
                    [list(set(leaf_eq).union(set(unsub_oper_eq)))[0]] = {'substituted' : False}
                
                # If zero intersection,
                # find the top level equation and move it to
                # the root node, no substitution
                # and add substitution information for
                # the child nodes where applicable.
                elif len(set(leaf_eq).intersection(set(unsub_oper_eq))) == 0:
                    # union will always be >0, whether there's any overlap is the question
                    
                    if debug:
                        print("Equations at the current level, no overlap---")
                        print(leaf_eq, unsub_oper_eq)
                        print()
                    
                    eq_ids = list(leaf_eq)
                    
                    # NOTE: This ONLY works for 1-1; definitely modify this for n-n subgraph
                    # Try to find the top level equation from the dependency graph

                    if debug:
                        print(list(unknown_summary.keys()))

                    solnbox = [ _ for _,s in dep_graph.nodes(data="solution_id") if s==soln_id][0]
                    equation_levels = {
                        eq: 
                        nx.shortest_path_length(
                            dep_graph, solnbox, eq
                        )
                        for eq in 
                        set([unknown_summary[_] for _ in list(leaf_eq)+list(unsub_oper_eq)])
                    }
                    
                    eq_top_level = min(equation_levels, key=lambda x:equation_levels[x])
                    
                    if debug:
                        print("Distances from solnbox to equations for top level equation")
                        print(equation_levels)
                        print("Top level:", eq_top_level, unknown_summary[eq_top_level])
                    
                    # Move the top level equation to the root node,
                    # substitute the other childnodes
                    # i.e. set substituted=True and term=<x_y csymbol> to be used later
                    
                    exp_tree.nodes[node]['equationlist'] = {}
                    exp_tree.nodes[node]['equationlist']\
                    [unknown_summary[eq_top_level]] \
                    = {
                        'substituted' : False
                    }
                    
                    for eq in unsub_oper_eq:
                        var = [_ for _ in dep_graph[unknown_summary[eq]]][0]
                        if dep_graph.degree(var) >= 2 and not 'solution_id' in dep_graph.nodes[var]:
                            if debug:
                                print(f"Substitution assoc for {eq} at level is {var}")
                                print("Symbol is",
                                    unknown_summary[
                                        list(unknown_summary[var])[0]]['value']['varDisplay']
                                )
                                print()
                            
                            # only storing var since that can be used to find the varDisplay when required
                            for op in operators:
                                if eq in exp_tree.nodes[op]['equationlist'] and \
                                exp_tree.nodes[op]['equationlist'][eq]['substituted'] == False:
                                    exp_tree.nodes[op]['equationlist'][eq]['substituted'] = True
                                    exp_tree.nodes[op]['equationlist'][eq]['term'] = var
                
                else: # check out this condition later
                    # Multiple equations appeared at that level
                    # similar stuff as before, but move substitutions to root instead,
                    # since they are all connected at the same operator
                    # tentatively, this stands for union>1 and intersection>0
                    
                    if debug:
                        print("Equations at the current level, no overlap---")
                        print(leaf_eq, unsub_oper_eq)
                        print("Resolved equations and substitutions go into the root")
                        print()
                    
                    eq_ids = list(leaf_eq)
                    
                    # NOTE: This ONLY works for 1-1; definitely modify this for n-n subgraph
                    # Try to find the top level equation from the dependency graph
                    solnbox = [ _ for _,s in dep_graph.nodes(data="solution_id") if s==soln_id][0]
                    equation_levels = {
                        eq: 
                        nx.shortest_path_length(
                            dep_graph, solnbox, eq
                        )
                        for eq in 
                        set([unknown_summary[_] for _ in list(leaf_eq)+list(unsub_oper_eq)])
                    }
                    eq_top_level = min(equation_levels, key=lambda x:equation_levels[x])
                    
                    if debug:
                        print("Distances from solnbox to equations for top level equation")
                        print(equation_levels)
                        print("Top level:", eq_top_level, unknown_summary[eq_top_level])
                    
                    exp_tree.nodes[node]['equationlist'] = {}
                    exp_tree.nodes[node]['equationlist']\
                    [unknown_summary[eq_top_level]] \
                    = {
                        'substituted' : False
                    }
                    
                    for eq in unsub_oper_eq:
                        var = [_ for _ in dep_graph[unknown_summary[eq]]][0]
                        if dep_graph.degree(var) >= 2 and not 'solution_id' in dep_graph.nodes[var]:
                            if debug:
                                print(f"Substitution assoc for {eq} at level is {var}")
                                print("Symbol is",
                                    unknown_summary[
                                        list(unknown_summary[var])[0]]['value']['varDisplay']
                                )
                                print()
                            
                            # Put it in the root operator node
                            # This is the first time we're visiting this node,
                            # so they definitely do not have any entries for these equations.
                            # create the entries and populate them
                            exp_tree.nodes[node]['equationlist'][eq] = {}
                            exp_tree.nodes[node]['equationlist'][eq]['substituted'] = True
                            exp_tree.nodes[node]['equationlist'][eq]['term'] = var
                    if debug:
                        print("At root level")
                        print(exp_tree.nodes[node]['equationlist'])
    
    return # nothing is returned, expression tree is modified is all.

def tree_report(tree, unknown_summary, debug=False):
    """
    Takes the AST math tree and turns it into a verbal representation
    by recursively examining the contents
    """
    ##########################################################################
    def get_equation_html_from_id(equation_id):
        if list(tree)[0].split('_')[0] == 'a':
            return '<span class="param" data-type=\"eq\" data-item=\"'+\
                equation_id+\
                '\">this equation</span>'
        else:
            name_of_eq = equation_id.split('_')[1]
            page_of_eq = eqbank[name_of_eq]["group"]
            return \
            '<span class="param" data-type=\"pallette-eq\" data-page=\"'\
            +str(page_of_eq)\
            +'\" data-item=\"'+\
            str(name_of_eq)+\
            '\">this equation</span>'
    
    def get_assoc_html(var_term):
        return '<span class="param" data-type=\"var-assoc\" data-item=\"'+\
            str(var_term)+\
        '\">'+\
            str(unknown_summary[list(unknown_summary[var_term])[0]]['value']['varDisplay'])+\
        '</span>'

    def construct_phrase_desc_rec(node, parent):
        l_children = {
            child: len([_ for _ in tree[child] if _ != node])
            for child in tree[node]
            if child != parent
        }
        if debug:
            print("In tree_report")
            print(l_children)
        
        # If the root node has any substitutions, address it accordingly
        # and only report it as such, no need for breakdowns.
        if "equationlist" in tree.nodes[node]:
            current_phrase = []
            
            subs_children = {
                eq: tree.nodes[node]["equationlist"][eq]['term'] \
                for eq in tree.nodes[node]["equationlist"]
                if tree.nodes[node]["equationlist"][eq]['substituted'] == True
            }
            
            # if node has * 
            # and children has -1, include negative
            # and if node has > 1 subs_children,
            #    include product of
            if tree.nodes[node]['label'] == '*':
                if "NegativeOne" in [
                    _.split('_')[2] 
                    for _ in nx.neighbors(tree, node) 
                    if _ !=tree.nodes[node]['pred']
                ]:
                    if parent==None:
                        # Top level product with a negative sign
                        current_phrase.append("negative")
                    elif parent['label'] == '+':
                        # The parent above node is +, so this must be a negative term
                        current_phrase.append("subtracted by")
                if len(subs_children)>1:
                    current_phrase.append("product of")
            
            # if node has + 
            # and if node has > 1 subs_children,
            #    include sum of
            if tree.nodes[node]['label'] == '+'\
            and len(subs_children)>1:
                    current_phrase.append("sum of")
            
            #if len(subs_children) == 1:
            #    host_eq = list(subs_children)[0]
            #    var_term = subs_children[host_eq]
            #    # only one substituted term, nothing fancy
            #    current_phrase.append(
            #        get_assoc_html(var_term)+' from '+get_equation_html_from_id(host_eq)
            #    )
            #
            #elif len(subs_children) > 1:
            
            if len(subs_children) > 0:
                term_list = []
                for host_eq, var_term in subs_children.items():
                    term_list.append(
                        get_assoc_html(var_term)+' from '+get_equation_html_from_id(host_eq)
                    )    
                current_phrase.append(",".join(term_list))
            
            if debug:
                print(current_phrase)
            return " ".join(current_phrase)

        # If the node is a leaf node
        if len(l_children) == 0:
            # Substitute this with the 
            # proper term related to each leaf node
            
            # Add utility function bits for comparison
            if is_symbol(tree, node):
                return get_parambox_html(node, tree)
            else:
                return tree.nodes[node]['label']
        
        child_phrases_list = {
            child: construct_phrase_desc_rec(child, node)
            for child in l_children
        }
        
        current_phrase = [];
        
        if tree.nodes[node]['label'] == '+':
            # Addition - "sum of" etc.
            # except: if only one child exists, just mention this child.
            # Separate out the negative and positive terms,
            # negative terms begin with "subtracted by"
            
            # if parent==None:
            #    current_phrase.append("sum of")
            # elif len(l_children) == 1\
            # or len([_ for _ in l_children if l_children[_]==0])==1:
            #    pass
            # else:
            #    current_phrase.append("sum of")
            
            texts = {"single":[], "subtree": []}
            for child in l_children:
                # Check if the children of node are leaves or not
                if l_children[child] == 0:
                    if debug:
                        print(f"at {node}--> child:{child} phrase:{child_phrases_list[child]}")
                    texts["single"].append(child_phrases_list[child])
                elif l_children[child] > 0:
                    texts["subtree"].append(child_phrases_list[child])
            
            if len(texts["single"]) + len(texts["subtree"]) > 1:
                current_phrase.append("sum of")
            
            if len(texts["single"]):
                current_phrase\
                .append(",".join(texts["single"]))
            
            if len(texts["single"]) and len(texts["subtree"]):
                current_phrase.append("and")
            
            if len(texts["subtree"]):
                current_phrase\
                .append(",".join(texts["subtree"]))
        
        elif tree.nodes[node]['label'] == '*':
            labels_children = [child_phrases_list[_] for _ in child_phrases_list]
            if "-1" in labels_children:
                if parent==None:
                    # Top level product with a negative sign
                    current_phrase.append("negative")
                elif tree.nodes[parent]['label'] == '+':
                    # The parent above node is +, so this must be a negative term
                    current_phrase.append("subtracted by")
                # removing -1 from future considerations, we've already accounted for this.
                l_children = {_:l_children[_] for _ in l_children if tree.nodes[_]['label'] != '-1'}
            
            # if parent==None:
            #    current_phrase.append("product of")
            # elif len(l_children) == 1\
            # or len([_ for _ in l_children if l_children[_]==0])==1:
            #    pass
            # else:
            #    current_phrase.append('product of')
            
            # directly append the leaf node labels,
            # then separately append the results of the sum on the next level
            texts = {"single":[], "subtree": []}
            for child in l_children:
                # Check if the children of node are leaves or not
                if l_children[child] == 0:
                    texts["single"].append(child_phrases_list[child])
                elif l_children[child] > 0:
                    texts["subtree"].append(child_phrases_list[child])
            
            if len(texts["single"]) + len(texts["subtree"]) > 1:
                current_phrase.append("product of")
            
            if len(texts["single"]):
                current_phrase\
                .append(",".join(texts["single"]))
            
            if len(texts["single"]) and len(texts["subtree"]):
                current_phrase.append("and")
            
            if len(texts["subtree"]):
                current_phrase\
                .append(",".join(texts["subtree"]))
        
        elif tree.nodes[node]['label'] == '^':
            labels_children = [child_phrases_list[_] for _ in child_phrases_list]
            if "-1" in labels_children:
                if parent!=None and tree.nodes[parent]['label'] == '*':
                    # The parent above node is +, so this must be a negative term
                    current_phrase.append("divided by")
                current_phrase.extend([
                    child_phrases_list[_] 
                    for _ in l_children if tree.nodes[_]['label'] != '-1'
                ])
                if parent==None:
                    # Top level product with a negative sign
                    current_phrase.append("raised to power (-1)")
            # Update:
            # If power is integer and <0
            # If -1, say divided by
            # If <-1, say divided by __ raised to the power
            # Otherwise, Say raised to power of (integer or expr)
            # Eg: MediumProblem
        
        return " ".join(current_phrase)
    ##########################################################################
    
    return construct_phrase_desc_rec(find_root(tree), None)

def get_parambox_html(node,exp_tree):
    if node[0]=='a':
        symbol_label = get_symbol_label_details(exp_tree, node)
        return '<span class="param" data-type=\"box\" data-item=\"'+\
            str(symbol_label['id'])+\
        '\">'+\
            str(symbol_label['value'])+" "+str(symbol_label['currentUnit'])+\
        '</span>'
    else:
        symbol_label = get_symbol_label_details(exp_tree, node)
        return '<span class="param" data-type=\"box\" data-item=\"'+\
        str(symbol_label['valueSource'])+\
        '\">'+\
            str(symbol_label['value'])+" "+str(symbol_label['currentUnit'])+\
        '</span>'

def get_eqbox_html(node,exp_tree):
    if node[0]=='a':
        #return '<span class="param" data-type=\"eq\" data-item=\"'+\
        #    "_".join(exp_tree.nodes[node]['label'].split("_")[:4])+\
        #'\">'+\
        #    'equation'+str("_".join(exp_tree.nodes[node]['label'].split("_")[2]))+\
        #'</span>'
        return '<span class="param" data-type=\"eq\" data-item=\"'+\
                "_".join(exp_tree.nodes[node]['label'].split("_")[:4])+\
                '\">this equation</span>'
    else:
        name_of_eq = exp_tree.nodes[node]['label'].split("_")[1]
        page_of_eq = eqbank[name_of_eq]["group"]
        #return f"{'an' if name_of_eq[0].lower() in ['a','e','i','o','u'] else 'a'}" +\
        #        '<span class="param" data-type=\"pallette-eq\" data-page=\"'+str(page_of_eq)+'\" data-item=\"'+\
        #        str(name_of_eq)+\
        #        '\">'+\
        #            str(name_of_eq)+\
        #        '</span>'
        return '<span class="param" data-type=\"pallette-eq\" data-page=\"'+str(page_of_eq)+'\" data-item=\"'+\
                str(name_of_eq)+\
                '\">this equation</span>'

def get_error_contexts(exp_tree, unknown_summary, soln_id, debug=False):
    """
    Gets error messages back from a tree
    """
    
    if debug:
        print('get_error_contexts')
    messages = []
    
    # error_contexts: List of subgraphs limited to either neighboring
    # leaf nodes, or to immediately avaialable connecting unknowns/equations.
    error_contexts = list(nx.connected_components(
                    exp_tree.subgraph([_ for _ in exp_tree if not 'mapped' in exp_tree.nodes[_]])
                ))
    
    for context_g in error_contexts:
        if debug:
            print(context_g)
        if len(context_g) == 1:
            # it's a leaf
            if is_symbol(exp_tree, list(context_g)[0]):
                # it's a var,unknown,param
                error_object = tree_report(
                    nx.subgraph(exp_tree, context_g), unknown_summary, debug=debug
                )
                eq_context = get_eqbox_html(
                    list(context_g)[0],
                    exp_tree
                )
                messages.append(f"{error_object} in {eq_context}")
            else:
                #it's a constant, get root and process it
                # Get the subgraph rooted at its predecessor
                if message_text[soln_id]['status'] == False:
                    if debug:
                        print("It's a constant")
                    # Breakdown and report errors in constants
                    # only when something really went wrong
                    # otherwise don't bother
                    messages.append(
                        tree_report(
                            get_rooted_subgraph(
                                exp_tree,
                                list(exp_tree[list(context_g)[0]])[0] #root
                            ), unknown_summary, debug=debug
                        )
                    )
                else:
                    if debug:
                        print("It's a constant but the answer is correct")
                    continue
        
        elif len(context_g) == 2:
            # it's an edge, same logic basically after you find the leaf node
            node, root = tuple(context_g)
            if is_symbol(exp_tree, root):
                node,root = root,node
            
            if is_symbol(exp_tree, node):
                error_object = tree_report(
                    nx.subgraph(exp_tree, [node]), unknown_summary, debug=debug
                )
                eq_context = get_eqbox_html(
                    node,
                    exp_tree,
                )
                messages.append(f"{error_object} in {eq_context}")
            
        else:
            messages.append(
                tree_report(
                    nx.subgraph(exp_tree, context_g), unknown_summary, debug=debug
                )
            )
    
    return messages

def get_rooted_subgraph(tree, root, limited=False):
    """
    Returns a SubgraphView on the original graph
    rooted at the root node ID in parameter
    
    root:       root node for tree, must be node id in tree
    limited:    boolean, used to determine if full subgraph must be
                extracted or to limit depth to current equation context
                i.e. leaves and relevant operators found
    """
    def get_nodes(tree, node, nodelist):
        l_children = [_ for _ in tree[node] if _ != tree.nodes[node]['pred']]
        nodelist.append(node)
        for n in l_children:
            get_nodes(tree, n, nodelist)
        return

    subgraph_nodelist = []
    get_nodes(tree, root, subgraph_nodelist)
    
    return nx.subgraph(tree, subgraph_nodelist)

def report_errors(met, aet, mus, aus, soln_id, control=True):
    # prints to the console the errors that occurred, and the equations they occurred in.
    # control flag in input determines the types and levels of error to be reported.
    
    # List of messages to be printed out for this specific (MET,AET) pair.
    messages_list = []
    
    # Process AET and MET to add context for all the operator nodes as well
    # i.e. to determine in which equations the errors occurred
    #find_contexts(aet)
    #find_contexts(met)
    
    # Processing for AET and MET messages
    AET_ERROR_CONTEXTS = get_error_contexts(aet, aus, soln_id)
    # Prefix all of the messages with "Unexpected pattern found: "

    # Processing for MET
    MET_ERRORS_CONTEXTS = get_error_contexts(met, mus, soln_id)
    
    # Prefix all of the messages with "Pattern expected but missing: "
    
    # tree_report() is supposed to add the equation number and necessary html
    # based on the expression tree.
    for _ in AET_ERROR_CONTEXTS:
        # print("Unexpected pattern found:",_)
        if len(_):
            messages_list.append(
                "We weren't expecting "+str(_)+" after simplification. Please check again."
            )
    
    for _ in MET_ERRORS_CONTEXTS:
        # print("Pattern expected but missing:",_)
        if len(_):
            messages_list.append(
                "You were expected to have "+str(_)+" after simplification, but we couldn't find it."
            )
    return messages_list

def is_symbol(g, node_label):
    # Receives G.nodes[n] as input
    return g.nodes[node_label]['label'].count('_') == 4

def is_unknown(g, node_label):
    # Receives G.nodes[n] as input
    return g.nodes[node_label]['label'].count('_') == 1

def get_symbol_label_details(exp_tree, symbol_node):
    details = master_unknown_summary[exp_tree.nodes[symbol_node]['label']] \
    if symbol_node.split('_')[0]=='m' \
    else attempt_unknown_summary[exp_tree.nodes[symbol_node]['label']]
    return details

def get_symbol_quantity(exp_tree, symbol_node, summary):
    details = summary[exp_tree.nodes[symbol_node]['label']]
    return details['value']+" "+details['currentUnit']

def compile_messages():
    """
    Takes the messages_text contents and puts them together
    to be printed on individual lines as required by the parser in the UI
    """
    
    for soln_id in message_text:
        if soln_id.isnumeric():
            if message_text[soln_id]["decision"] is not None:
                for line in message_text[soln_id].setdefault("decision", []):
                    print(line)
            if message_text[soln_id]["details"] is not None:
                for line in message_text[soln_id].setdefault("details", []):
                    print(line)
        else:
            if message_text[soln_id]["details"]:
                # fix this later
                print("Errors for solutions "+",".join(
                    sorted(list(map(lambda x: str(int(x)+1),'2,1,0'.split(',')))))
                )
                for line in message_text[soln_id].setdefault("details", []):
                    print(line)

def run_analysis(master_soln_json, attempt_soln_json, debug=False):

    global eqbank
    try:
        eqbank = { obj["id"]: obj for obj in json.load(open("./tools/equation_bank.json"))}
    except FileNotFoundError:
        print("{\"error\": \"Could not load the equation bank file, aborting\"}", end='')
    
    # try:
    #     master_soln_json = json.load(open(path_master_soln))
    # except Exception:
    #     print("Could not open the master solution file, aborting")
    #     return 1
    
    # try:
    #     attempt_soln_json = json.load(open(path_attempt_soln))
    # except Exception:
    #     print("Could not open the attempt solution file, aborting")
    #     return 1
    
    # print("Master and solution files have been loaded.")
    
    global master_unknown_summary 
    global attempt_unknown_summary
    
    global master_dep_graph
    global attempt_dep_graph

    master_unknown_summary = get_unknown_summary(master_soln_json)
    attempt_unknown_summary = get_unknown_summary(attempt_soln_json)
    
    compare_solution_boxes(master_soln_json, attempt_soln_json, attempt_unknown_summary)

    master_dep_graph = makeDependencyGraph(master_soln_json, eqbank)
    attempt_dep_graph = makeDependencyGraph(attempt_soln_json, eqbank)
    
    master_dg_folded = dependencyFolding(master_dep_graph, debug=False)
    attempt_dg_folded = dependencyFolding(attempt_dep_graph, debug=False)
    
    if debug:
        print(attempt_dg_folded)

    # Now check for 1-1 or n-n relation, solve for 1-1 relations and compare
    for s_id in attempt_dg_folded:
        if attempt_dg_folded[s_id].number_of_edges() == 1 and \
        master_dg_folded[s_id].number_of_edges() == 1:
            
            # print("Reporting errors for solution id",s_id) 
            
            u,v = list(attempt_dg_folded[s_id].edges())[0]
            eq_node, var_node = (u,v) \
            if attempt_dg_folded[s_id].nodes[u]['group'] == 'equation' else (v,u)
            
            attempt_exp_tree = generateExpressionTree(
                sympy.solve(
                    attempt_dg_folded[s_id].nodes[eq_node]['template'],
                    sympy.Symbol(var_node))[0],
                prefix= 'a'
            )
            
            u,v = list(master_dg_folded[s_id].edges())[0]
            eq_node, var_node = (u,v) \
            if master_dg_folded[s_id].nodes[u]['group'] == 'equation' else (v,u)
            
            master_exp_tree = generateExpressionTree(
                sympy.solve(
                    master_dg_folded[s_id].nodes[eq_node]['template'],
                    sympy.Symbol(var_node))[0],
                prefix= 'm'
            )
            
            tree_annotator(
                exp_tree = master_exp_tree,
                dep_graph = master_dep_graph,
                soln_id = s_id,
                unknown_summary = master_unknown_summary,
                debug=False
            )

            tree_annotator(
                exp_tree = attempt_exp_tree,
                dep_graph = attempt_dep_graph,
                soln_id = s_id,
                unknown_summary = attempt_unknown_summary,
                debug=False
            )

            compare_exp_trees(master_exp_tree, attempt_exp_tree)
            message_text[s_id]["details"] = report_errors( \
                        master_exp_tree, attempt_exp_tree, \
                        master_unknown_summary, attempt_unknown_summary, \
                        s_id \
                        )
            
            # print()
        
        # Update 7/17/2022: 
        # For a given solution, check if the subgraphs have the same number of folded equations.
        # If so, either n=1 and they both match - which is what we have before.
        # Or, n>1 and the number of equations in the two systems match.
        # Otherwise, we have a problem.
        # eg: for DeformsSimple part 1, 
        # reporting \DeltaT instead of s makes the system n=2, 
        # whereas the master solution is n=1.
        # In this event, (for now) just report an error that says
        # i. "perhaps the wrong variable calculated as part of the system was reported."
        # ii. TBD

        elif \
        len([n for n in master_dg_folded[s_id] if nx.degree(master_dg_folded[s_id],n)]) == \
        len([n for n in attempt_dg_folded[s_id] if nx.degree(attempt_dg_folded[s_id],n)]):
            # print("n-n systems are not supported yet. Please check back later.")
            
            def get_eq_var_assignments(folded_n_graph):
                eq_var_map = dict()
                for u,v in folded_n_graph.edges:
                    eq_node, var_node = (u,v) if folded_n_graph.nodes[u]['group'] == 'equation' else (v,u)
                    eq_var_map.setdefault(eq_node, {var_node}).add(var_node)
                return eq_var_map
            
            master_eq_sets = get_eq_var_assignments(master_dg_folded[s_id])
            attempt_eq_sets = get_eq_var_assignments(attempt_dg_folded[s_id])

            # attempt_master_varmap
            # This should be globally set from the attempt JSON object

            global varmap
            # hardcoded placeholder
            # varmap = {
            #     "a_d": "a_j",
            #     "a_i": "a_o",
            #     "a_a": "a_g",
            #     "a_f": "a_l",
            #     "a_b": "a_h",
            #     "a_g": "a_m",
            #     "a_k": "a_y"
            # }

            mapped_equations = {}
            for meq, mvarset in master_eq_sets.items():
                found = False # flags if we found a corresponding equation for meq
                for aeq, avarset in attempt_eq_sets.items():
                    if avarset == True:
                        continue
                    if Counter(list(mvarset)) == Counter([varmap[_] for _ in avarset]):
                        found=True
                        break
                if found:
                    mapped_equations.setdefault(meq,{aeq}).add(aeq)
                    master_eq_sets[meq] = True
                    attempt_eq_sets[aeq] = True
            
            for eq in master_eq_sets:
                if master_eq_sets[eq] != True:
                    # print("Unable to match master equation:", master_dg_folded[s_id].nodes[eq]['template'])
                    message_text[s_id]["details"].append("This equation that we expected to see was not found:"+\
                        master_dg_folded[s_id].nodes[eq]['template'])
            
            for eq in attempt_eq_sets:
                if attempt_eq_sets[eq] != True:
                    # print("Unable to match attempt equation:", attempt_dg_folded[s_id].nodes[eq]['template'])
                    message_text[s_id]["details"]\
                        .append("We found this equation that we weren't expecting to be used:"+\
                        attempt_dg_folded[s_id].nodes[eq]['template'])
            
            for master_eq, res in mapped_equations.items():
                if len(res) > 1:
                    # print("Conflicts found in attempt for equation corresponding to "+master_eq)
                    message_text[s_id]["details"]\
                        .append("Among the equations submitted, we found more than one equation that mapped to "+\
                        master_eq+" in our expected solution. Please consider revising.")
                else:
                    mlhs = master_dg_folded[s_id].nodes[master_eq]['template'].lhs
                    mrhs = master_dg_folded[s_id].nodes[master_eq]['template'].rhs
                    master_exp_tree = generateExpressionTree(mlhs-mrhs,prefix= str('m'))
                    #print("Master:",mlhs-mrhs)
                    
                    attempt_eq = list(res)[0]
                    alhs = attempt_dg_folded[s_id].nodes[attempt_eq]['template'].lhs
                    arhs = attempt_dg_folded[s_id].nodes[attempt_eq]['template'].rhs
                    attempt_exp_tree = generateExpressionTree(alhs-arhs,prefix= str('a'))
                    # print("Attempt:",alhs-arhs)
                    
                    compare_exp_trees(master_exp_tree, attempt_exp_tree, debug=False)
                    message_text[s_id]["details"].extend(report_errors( \
                        master_exp_tree, attempt_exp_tree, \
                        master_unknown_summary, attempt_unknown_summary, \
                        s_id \
                        ))
                # print()
            
            # print(s_id,"has been checked for\n\n\n")
        
        else:
            # message_text[s_id]["details"].append(
            #     "You set up your equations incorrectly.\
            #     You probably have the wrong equations, \
            #     or they're connected incorrectly, \
            #     or you're reporting the value of the wrong unknown.\
            # ")
            """
            Either the wrong variable was reported and/or
            the right equations were not used.
            Reporting at this stage will not be super targeted,
            mostly being suggestions on how to modify their system
            to try to align with what the master solution expects them
            to provide.
            """
            
            # Step 1. Look at the unknowns in the attempt,
            # pick different combinations of variables
            # to see which one, when picked, gives a potential
            # system that might align with the master solution.
            # Suggest these combinations then.
            
            # Note: s_id is the reference to the solution ID that we're trying 
            # to align for.
            
            unknown_vars = [
                n for n in attempt_dg_folded[s_id]
                if attempt_dg_folded[s_id].nodes[n]["group"] == "unknown"
                
            ]
            attempt_subg_nodes = [n for n in attempt_dg_folded[s_id]]
            
            # Find the number of nodes the folded subgraph is supposed to have
            master_sys_size = len([
                n for n in master_dg_folded[s_id] if nx.degree(master_dg_folded[s_id],n)
            ])
            
            # Find the number of solution boxes that this solution subgraph
            # tries to answer
            n_solns_in_subgraph = len([
                n for n in attempt_dg_folded[s_id] 
                if attempt_dg_folded[s_id].nodes[n]["group"] == "unknown"
                and "solution_id" in attempt_dg_folded[s_id].nodes[n]
            ])
            
            # Repeat over all combinations of assignments for solution boxes
            # for this solution subgraph
            
            alternative_solution_reports = []
            
            for soln_box_comb in combinations(unknown_vars, n_solns_in_subgraph):
                
                # Create a copy of the subgraph induced on the nodes for the original
                # subgraph for the solution. Then, assign the solution boxes to this
                # as the current combination dictates. Try to fold this subgraph.
                
                g_solution = attempt_dep_graph.subgraph(attempt_subg_nodes).copy()
                # remove all solution assignments
                for n in unknown_vars:
                    if "solution_id" in g_solution.nodes[n]:
                        del g_solution.nodes[n]["solution_id"]
                    if n in soln_box_comb:
                        g_solution.nodes[n]["solution_id"] = "-1"
                
                # Repeat until the graph does not change
                flag = True
                while flag:
                    for n in g_solution:
                        if g_solution.nodes[n]['group'] == 'equation' and g_solution.degree(n) == 1:
                            var = [_ for _ in g_solution[n]][0]
                            if g_solution.degree(var) >= 2 and not 'solution_id' in g_solution.nodes[var]:
                                g_solution[n][var]['fold'] = True
                                g_solution[n][var]['equation'] = str(n)
                                g_solution[n][var]['unknown'] = str(var)

                    edges_to_fold = list([
                        (g_solution[u][v]['equation'],g_solution[u][v]['unknown'])
                        for u,v in nx.get_edge_attributes(g_solution,"fold")
                    ])
                    if len(edges_to_fold):
                        for eq, var in edges_to_fold:
                            subs_eq = sympy.solve(g_solution.nodes[eq]['template'], var, evaluate=False)
                            g_solution.remove_edge(eq,var)
                            var_target_equations = list(g_solution[var].keys())
                            for eq_target in var_target_equations:
                                lhs = g_solution.nodes[eq_target]['template'].lhs.subs(var, subs_eq[0])
                                rhs = g_solution.nodes[eq_target]['template'].rhs.subs(var, subs_eq[0])
                                g_solution.nodes[eq_target]['template'] = sympy.Eq(lhs, rhs)
                                g_solution.remove_edge(eq_target,var)
                    else:
                        flag = False # and the loop terminates
                
                # what is the number of elements in this system?
                
                if master_sys_size == len([n for n in g_solution if nx.degree(g_solution,n)]):
                    html_var_report = ""
                    
                    for var in soln_box_comb:
                        symbol_details = \
                            attempt_unknown_summary[list(attempt_unknown_summary[var])[0]]
                        
                        if type(symbol_details["value"]) == dict:
                            # Then it's an association
                            # use data-association field, type var-assoc
                            # item is the var name x_y
                            html_var_report += \
                            ' <span class="param" data-type=\"var-assoc\" data-item=\"'+\
                                str(symbol_details["value"]["var"])+\
                            '\">'+\
                                str(symbol_details["value"]["varDisplay"])+\
                            '</span>'
                            
                        else:
                            # Then it's a single variable
                            # use data-csymbol field, type var-single
                            # item is the var name x_y
                            html_var_report += \
                            ' <span class="param" data-type=\"var-single\" data-item=\"'+\
                                str(symbol_details["currentSymbol"])+\
                            '\">'+\
                                str(symbol_details['symbol_context']["parentSymbol"])+\
                            '</span>'
                        
                    alternative_solution_reports.append(html_var_report)
            
            # Update to add to messages_text
            mtext = \
            "You probably submitted the wrong variable as the solution."
            if len(alternative_solution_reports):
                mtext+="Try the submitting the following variables instead for the solutions "\
                +str([int(_)+1 for _ in s_id.split(",")])+" : "
                for _ in alternative_solution_reports:
                    mtext+=_+"; "
            else:
                mtext+=" Unfortunately that's all we can tell you right now about that."
            
            message_text[s_id]["details"].append(mtext)
        

    compile_messages()
    
    return 0

def run_feedback_cmd(path_master_soln, path_attempt_soln):
    # To be used for running on command line
    try:
        with open(path_master_soln) as f_master:
            master_soln_json = json.load(f_master)
    except Exception:
        print("Could not open the master solution file, aborting")
        return 1
    
    try:
        with open(path_attempt_soln) as f_attempt:
            attempt_soln_json = json.load(f_attempt)
    except Exception:
        print("Could not open the attempt solution file, aborting")
        return 1
    
    return run_analysis(master_soln_json, attempt_soln_json)

def get_minimal_unknown_set(master_soln_json):
    """
    Gets the minimal set of unknown variables for each answer.
    If any answer needs >1 unknowns (x_y) to compute it in a compelete system,
    it needs to be associated in the interface by the student.
    So it needs to be sent back in order to be put into the file.
    """
    eqbank = { obj["id"]: obj for obj in json.load(open("./tools/equation_bank.json"))}
    
    # print("Master JSON has been loaded.")
    global master_unknown_summary 
    global master_dep_graph
    
    master_unknown_summary = get_unknown_summary(master_soln_json)
    master_dep_graph = makeDependencyGraph(master_soln_json, eqbank)
    master_dg_folded = dependencyFolding(master_dep_graph, debug=False)

    # Create the list of unknowns and symbols from the folded graph
    # For each of the solution_ids, if the graph contains >1 unknown,
    # add that to the dictionary of unknowns and symbols. These are the ones
    # that need to be explicitly identified by the user in the solution.
    # Doesn't matter if there are duplicates, i.e. same unknowns appearing
    # in multiple solutions, ultimately they're all in the same system anyway,
    # so they still need to be identified/var mapped.

    minimal_set = {}
    unknown_summary = get_unknown_summary(master_soln_json)

    for _, g_sub in master_dg_folded.items():
        # filter out the nodes that are the unknowns and count them
        l_gsub_unknowns = [
            n for n in g_sub if g_sub.nodes[n]['group'] == 'unknown' 
            and nx.degree(g_sub, n) > 0
            ]
        # print(_,l_gsub_unknowns)
        if len(l_gsub_unknowns) == 1:
            # only onw unknown, no var map needed.
            pass
        else:
            # we need a varmap, store this reference.
            minimal_set.update({k:"" for k in l_gsub_unknowns})
    
    for k in minimal_set:
        value = unknown_summary[next(iter(unknown_summary[k]))]
        if isinstance(value['value'], dict):
            # print(k,value['value']['varDisplay'])
            minimal_set[k] = value['value']['varDisplay']
        else:
            # print(k,value['symbol_context']['parentSymbol'])
            minimal_set[k] = value['symbol_context']['parentSymbol']

    return minimal_set if len(minimal_set) > 0 else None

if __name__ == '__main__':
    parser = ArgumentParser()
    expandHelp = "Generates an expanded configuration with extra details"
    parser.add_argument("problem_attempt", help="input problem attempt JSON string", type=str)
    args = parser.parse_args()

    config_file = json.loads(
        args.problem_attempt[1:-1]
        .replace('\'','\"')
        .replace("None","null")
        .replace("False","false")
        .replace("True","true")
    )

    if config_file["mode"] == "training":
        """
        In training mode, we don't analyze or pre-train.
        We simply generate the folded graph to find if any variables need to be
        associated using varmap, and then store this info in the solution file.
        Store the whole setup information (assuming this is cleaned up by the trainer)
        and the varmap as a separate entry in the JSON.
        """
        try:
            training = True
            with open(config_file["master_solution_path"], "w") as f_master:
                master_soln_json            = config_file["master_solution"]
                if "varmap" in config_file:
                    master_soln_json["varmap"]  = get_minimal_unknown_set(master_soln_json)
                json.dump(master_soln_json, f_master, indent=4)
                # print("", end='')
            training = False

        except FileNotFoundError:
            print("{\"error\":\"Could not write to master solution file, aborting\"}", end="")

    elif config_file["mode"] == "analyze":
        try:
            with open(config_file["master_solution_path"], "r") as f_master:
                # print(json.dumps(config_file),end='')
                attempt_summary     = config_file["attempt"]
                master_soln_json    = json.load(f_master)
                
                if "varmap" in config_file:
                    # This is the varmap that connects the
                    # unknowns in the master solution to the 
                    # unknowns in the attempt.
                    varmap          = config_file["varmap"]
                
                run_analysis(master_soln_json, attempt_summary)

        except FileNotFoundError:
            print("{\"error\":\"Could not open the master solution file, aborting\"}", end="")
    
    elif config_file["mode"] == "init":
        """
        init mode, or initializer mode. Called when initializing the exercise,
        only once. Sends back information about varmap, and 
        (later) the solution numbers and units to the UI when requested.
        Eliminates the need for a separate solution file to be included
        with the exercise that needs to be manually set and accessed/parsed in the UI.
        """
        try:
            # If the path doesn't exist, it won't load the first time either,
            # so might as well create an empty JSON object in the file for posterity.
            if not os.path.exists(config_file["master_solution_path"]):
                with open(config_file["master_solution_path"], "w") as f_master:
                    json.dump(
                        {
                            "parameters":{},
                            "workspaces":{},
                            "solutions":{}
                        }, f_master, indent=4)
            
            with open(config_file["master_solution_path"]) as f_master:
                master_soln_json = json.load(f_master)

                # if the file can be loaded but it is empty
                # /does not have the essential keys such as 
                # parameters,workspaces,solutions
                if "varmap" in master_soln_json:
                    print(json.dumps(master_soln_json["varmap"]),end='')
                else:
                    print("null",end='')
        
        except json.JSONDecodeError as e:
            print(e)
        
        except FileNotFoundError:
            print("Master solution file was not found")
        
        except Exception as e:
            print("{\"error\":\"Something went wrong."+e+"\"}")
