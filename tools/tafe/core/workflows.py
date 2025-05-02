from itertools import combinations
import json
import os
from collections import Counter

import sympy
import networkx as nx

# from tafe.core.utils import *
# from tafe.expr_tree_analysis.tree_utils import generateExpressionTree
# from tafe.expr_tree_analysis.expr_tree import tree_annotator
# from tafe.expr_tree_analysis.tree_match import compare_exp_trees
# from tafe.expr_tree_analysis.tree_error import report_errors

from core.utils import *
# from expr_tree_analysis.tree_utils import generateExpressionTree
from expr_tree_analysis.expr_tree import tree_annotator
from expr_tree_analysis.tree_match import compare_exp_trees
from expr_tree_analysis.tree_error import report_errors
# from core.pipeline import *
from core.report import ReportContext
from core.solutionbox import compare_solution_boxes, SOLUTION_STATUS
from dag_analysis.dag_match import dag_compare, dag_compare_new

# setting up dummy method stubs and variables for later
# STUBS BEGIN
def get_unknown_summary(dummy_arg):
    return

def makeDependencyGraph(dummy_arg):
    return

def dependencyFolding(dummy_arg):
    return

master_soln_json: dict
attempt_soln_json: dict
# STUBS END

def get_minimal_unknown_set(master_soln_json):
    """
    Gets the minimal set of unknown variables for each answer.
    If any answer needs >1 unknowns (x_y) to compute it in a compelete system,
    it needs to be associated in the interface by the student.
    So it needs to be sent back in order to be put into the file.
    """
    
    # print("Master JSON has been loaded.")
    global master_unknown_summary 
    global master_dep_graph
    
    master_unknown_summary = get_unknown_summary(master_soln_json)
    master_dep_graph = makeDependencyGraph(master_soln_json, eqbank) # type: ignore
    master_dg_folded = dependencyFolding(master_dep_graph, debug=False) # type: ignore

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
        value = unknown_summary[next(iter(unknown_summary[k]))]# type: ignore #
        if isinstance(value['value'], dict):
            # print(k,value['value']['varDisplay'])
            minimal_set[k] = value['value']['varDisplay']
        else:
            # print(k,value['symbol_context']['parentSymbol'])
            minimal_set[k] = value['symbol_context']['parentSymbol']

    return minimal_set if len(minimal_set) > 0 else None

def run_analysis(master_soln_json, attempt_soln_json, debug=False):
    global eqbank
    
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
    
    compare_solution_boxes(master_soln_json, attempt_soln_json, attempt_unknown_summary) # type: ignore

    master_dep_graph = makeDependencyGraph(master_soln_json, eqbank) # type: ignore
    attempt_dep_graph = makeDependencyGraph(attempt_soln_json, eqbank) # type: ignore
    
    master_dg_folded = dependencyFolding(master_dep_graph, debug=False) # type: ignore
    attempt_dg_folded = dependencyFolding(attempt_dep_graph, debug=False) # type: ignore
    
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
            
            attempt_exp_tree = generateExpressionTree( # type: ignore
                sympy.solve(
                    attempt_dg_folded[s_id].nodes[eq_node]['template'],
                    sympy.Symbol(var_node))[0],
                prefix= 'a'
            )
            
            u,v = list(master_dg_folded[s_id].edges())[0]
            eq_node, var_node = (u,v) \
            if master_dg_folded[s_id].nodes[u]['group'] == 'equation' else (v,u)
            
            master_exp_tree = generateExpressionTree( # type: ignore
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
            message_text[s_id]["details"] = report_errors( # type: ignore
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
                eq_var_map = {}
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
                    if Counter(list(mvarset)) == Counter([varmap[_] for _ in avarset]): # type: ignore
                        found=True
                        break
                if found:
                    mapped_equations.setdefault(meq,{aeq}).add(aeq)
                    master_eq_sets[meq] = True
                    attempt_eq_sets[aeq] = True
            
            for eq in master_eq_sets:
                if master_eq_sets[eq] != True:
                    # print("Unable to match master equation:", master_dg_folded[s_id].nodes[eq]['template'])
                    message_text[s_id]["details"].append("This equation that we expected to see was not found:"+  # type: ignore
                        master_dg_folded[s_id].nodes[eq]['template'])
            
            for eq in attempt_eq_sets:
                if attempt_eq_sets[eq] != True:
                    # print("Unable to match attempt equation:", attempt_dg_folded[s_id].nodes[eq]['template'])
                    message_text[s_id]["details"].append(  # type: ignore
                        "We found this equation that we weren't expecting to be used:"+\
                        attempt_dg_folded[s_id].nodes[eq]['template'])
            
            for master_eq, res in mapped_equations.items():
                if len(res) > 1:
                    # print("Conflicts found in attempt for equation corresponding to "+master_eq)
                    message_text[s_id]["details"].append( # type: ignore
                        "Among the equations submitted, we found more than one equation that mapped to "+\
                        master_eq+" in our expected solution. Please consider revising.")
                else:
                    mlhs = master_dg_folded[s_id].nodes[master_eq]['template'].lhs
                    mrhs = master_dg_folded[s_id].nodes[master_eq]['template'].rhs
                    master_exp_tree = generateExpressionTree(mlhs-mrhs,prefix= str('m')) # type: ignore
                    #print("Master:",mlhs-mrhs)
                    
                    attempt_eq = list(res)[0]
                    alhs = attempt_dg_folded[s_id].nodes[attempt_eq]['template'].lhs
                    arhs = attempt_dg_folded[s_id].nodes[attempt_eq]['template'].rhs
                    attempt_exp_tree = generateExpressionTree(alhs-arhs,prefix= str('a')) # type: ignore
                    # print("Attempt:",alhs-arhs)
                    
                    compare_exp_trees(master_exp_tree, attempt_exp_tree, debug=False)
                    message_text[s_id]["details"].extend(report_errors(  # type: ignore
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
                            attempt_unknown_summary[list(attempt_unknown_summary[var])[0]] # type: ignore
                        
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
            
            message_text[s_id]["details"].append(mtext) # type: ignore
        

    compile_messages()
    
    return 0

def run_workflow_analyze(config_file: dict, debug=True):
    
    # INITIALIZATION:
    # Loading the solution json for master from file
    # and loading in the attempt
    try:
        with open(config_file["master_solution_path"], "r") as f_master:
            # print(json.dumps(config_file),end='')
            attempt_json = config_file["attempt"]
            master_soln_json = json.load(f_master)
    
    except FileNotFoundError:
        # If the master solution file isn't there, not point in executing anything else, quit
        print("{\"error\":\"Could not open the master solution file, aborting\"}", end="")
        return
    
    if "varmap" in config_file:
        # This is the varmap that connects the
        # unknowns in the master solution to the 
        # unknowns in the attempt.
        varmap = config_file["varmap"]
    
    # OLD
    # run_analysis(master_soln_json, attempt_summary)

    # NEW
    """
    We are creating a pipeline and abstracting away 
    as function much as possible into classes.
    Main workflow: There is a ReportContext object created for
    MASTER and for ATTEMPT, which will get passed from one 
    stage of pipeline (stored in another file) to the other.
    
    Phase I: Create context
    Stage 1:    create-summary creates summary object for BOTH
                adds the *_unknown_summary
    Stage 2:    create-dep creates dependency graph and subgraphs for BOTH
                adds the Solution object (which receives summary as well)
    Stage 3:    fold-dep folds dependency graph depending on the situation
                Either folding only once
                    TODO: folding at solution level as well
                    TODO: Split from simultaneous systems, if one solution is a parameter for another.
                Or folding for alternatives and retrying subsequent steps again
        Stage 3.1:      DAG creation (this is the new addition)
                        This will create DAGs from the folding of dependency graphs
    
    Phase 2: error detection
    Stage 4:    Compare solution boxes to determine which solutions are correct and which aren't.
                The status key alone is useful for deciding analysis steps/transformations early on.
    Stage 5:    Decide how and where to split DAGs into threads
    Stage 6:    Compare threads/sets of threads using rich LCS search

    Phase 3: error reporting
    Stage 6:    Collect and report the errors
    """
    
    """
    ---PHASE I--- CONSTRUCT
    """
    
    """ REACTIVATE AFTER TESTING """
    report_master = ReportContext(["master", "analyze", "master-file"], master_soln_json)
    report_attempt = ReportContext(["attempt", "analyze", config_file["attempt_filename"]], attempt_json)
    """ REACTIVATE AFTER TESTING """
    # print(report_master.solution.solution_subgroups.keys())
    
    """checklist:
    v/: dependency graph is built and folded (see class Solution in report.py and trace)
    v/: solution status is known (comparable)
    --- v/: create expression tree class to also store expression itself
              (do this inside the class, as member)
    v/: extract expression trees to add to context 
    (do inside ReportContext or SolutionSubgroup? Discuss)
    
    --- (DEPRECATED BY DAG ANALYSIS) 
    TODO: also store connections to points in the dependency graph
              (all the more reason to add this inside the SolutionSubgroup, more efficient)
    NOTE: Solution will obtain the expression trees and store them, 
    so it can see ExpTrees and SolnSubgroups alongside of full context from the parent,
    but a checking will need to be done here/inside ReportContext before proceeding to
    compare ExpressionTree objects, to make sure we have either 1-1 or n-n and not mismatched
    setups.
    ## NOTE: 12/7/2023
    tree_annotator is experimental and (currently) not needed for verbal messages
    6/9/2024 - see notes on how to remove/replace this eventually once everything else works"""
    
    """
    ===PHASE I ENDS===
    """
    
    """
    ---PHASE II--- COMPARE
    """
    # Stage 4: compares the solution boxes to generate some initial messages
    """ REACTIVATE AFTER TESTING """
    compare_solution_boxes(report_master, report_attempt)
    
    if debug:
        print([(v.id, v.status, v.description, v.alternatives) for k,v in report_attempt.dict_solution_box.items()])
    
    # By this point, you already know if the answers are correct or not,
    # and to what extent. This will be useful for analyzing errors later on.
    
    # DAG splitting to create threads has already been done.
    # Time to compare, score, and annotate threads.

    # dag_compare(report_master, report_attempt)
    dag_compare_new(report_master, report_attempt)

    """
    ===PHASE II ENDS===
    """

    # --- (DEPRECATED BY DAG ANALYSIS) 
    # TODO: compare expression trees for 1-1 (start with that)
    
    """
    ---PHASE III--- REPORT
    """

    """
    ===PHASE III ENDS===
    """

    # TODO: create error detection to determine the errors, merge, if required
    # and create a whole list of candidate error messages to provide
    
    # TODO: then choose from them by ranking them.
    
    print("Processing finished, OK.\n\n\n")
    return
    
# This could probably be its own pipeline
# Not currently called by anyone
# Oct 5, replaced by dedicated workflow run_offline and run_online
"""
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
"""

def run_workflow_init(config_file: dict, debug=False):
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
            # if the file can be loaded but it is empty
            # /does not have the essential keys such as 
            # parameters,workspaces,solutions
            with open(config_file["master_solution_path"], "w") as f_master:
                json.dump(
                    {
                        "parameters":{},
                        "workspaces":{},
                        "solutions":{}
                    }, f_master, indent=4)
        
        with open(config_file["master_solution_path"]) as f_master:
            master_soln_json = json.load(f_master)

            if "varmap" in master_soln_json:
                print(json.dumps(master_soln_json["varmap"]),end='')
            else:
                print("null",end='')
    
    except json.JSONDecodeError as e:
        print_error("Unable to decode JSON string.",e)
    
    except FileNotFoundError as e:
        print_error("Master solution file was not found",e)
    
    except Exception as e:
        print_error("Something went wrong.",e)

def run_workflow_training(config_file: dict, debug=False):
    """
    In training mode, we don't analyze or pre-train.
    We simply generate the folded graph to find if any variables need to be
    associated using varmap, and then store this info in the solution file.
    Store the whole setup information (assuming this is cleaned up by the trainer)
    and the varmap as a separate entry in the JSON.
    """
    
    """
    TODO: Create and save alternatives for sign variations.
    This needs to be generated 
    """

    # creating summary and creating Solution object is done in ReportContext()
    report_master_unused = ReportContext(["master", "training"], config_file)
    return
    
    
    # The following is done after the JSON is analyzed
    try:
        """
        probably don't need this to be a global variable,
        only needed inside the context of the workflow/pipeline
        either
        * attach to the Report object (probably this to follow design pattern)
        * pass to methods
        """
        # training = True
        with open(config_file["master_solution_path"], "w") as f_master:
            master_soln_json = config_file["master_solution"]
            if "varmap" in config_file:
                master_soln_json["varmap"]  = get_minimal_unknown_set(master_soln_json)
            json.dump(master_soln_json, f_master, indent=4)
            # print("", end='')
        
        #training = False
        
    except FileNotFoundError:
        print("{\"error\":\"Could not write to master solution file, aborting\"}", end="")
    
