"""
Contains the whole solution as an object

Contains the JSON object originally received
Contains the solution dependency graph
Contains the variable and parameter summaries and all related mapppings
Contains the variable name to symbol mappings

Contains list of objects that represent each individual solution/solution subgroup
- called reduced solutions, determined by splitting/folding dependency graph


"""

from networkx import Graph, DiGraph, connected_components, get_node_attributes
from sympy import Eq, Symbol, parse_expr, solve
from pprint import pp as prettyprint
#from networkx.drawing.nx_pydot import to_pydot, pydot_layout
#from networkx.drawing import bipartite_layout, rescale_layout_dict, draw_networkx_nodes, draw_networkx_labels, draw_networkx_edges, draw_networkx_edge_labels, draw_networkx

#import matplotlib.pyplot as plt
#import matplotlib
#matplotlib.rcParams['mathtext.fontset'] = 'cm'

import textwrap

from core.global_objects import *
from core.solution_subgroup import SolutionSubgroup
from expr_tree_analysis.expr_tree import ExpressionTree

from messages.message import MessageText

class Solution:

    # Constructor
    def __init__(self, report_context, debug=False):
        self.list_solution= []
        self.ref_report_context = report_context
        # self.dict_unknown_summary = self.get_unknown_summary(json_solution_object)
        self.main_dependency_graph = Graph()
        self.solution_subgroups = {}
        
        # Get the subgroups from the dependency graphs
        self.makeDependencyGraph()
        self.fetch_solution_subgroups()

        # diagnostic, disable this before exporting/put behind options
        if debug:
            self.show_solution_subgroups()
        
        # DEPRECATED: Get the sets of expression trees from each connected subgraph
        # in the dependency graph
        # self.get_expression_trees()

        # TODO: AFTER creating DAG splitting in solution_subgroup.py to create sequences,
        # come back here and put sequences/paths in accessible places.

        # then go back to workflows.py, and call functions to compare two reports

        return

    # Methods
    # get_unknown_summary() used to be here, decide if required or not
    
    def makeDependencyGraph(self, debug=False):
        for w_id, wkspace in self.ref_report_context.json_object['workspaces'].items():
            # assumption here: equations in different workspaces are isolated from each other;
            # eg: wk1_1 and wk2_1 will never be associated together, or have a value in it used in another.
            # OR it just processes the whole thing one workspace at a time (see if interface supports cross workspace associations)
            for eq_id, eq in wkspace['equations'].items():
                # add the equation as a node
                eq_node_name = f"wk{w_id}_{eq_id}"
                
                self.main_dependency_graph.add_node(
                    eq_node_name, group='equation'
                )

                # template = [eq['equation_template_id']]["sympy_template"] \
                # if "sympy_template" in eqbank[eq['equation_template_id']]  \
                # else eqbank[eq['equation_template_id']]['template']
                if "sympy_template" in eqbank[eq['equation_template_id']]:
                    template = eqbank[eq['equation_template_id']]["sympy_template"]
                else:
                    template = eqbank[eq['equation_template_id']]['template']
                
                # Second set of conditions to create LaTeX template for drawing dep_graphs.
                # you only need the LaTeX template for the very first dependency graph, not for folded or DAG or paths
                # Add conditions so that dependency graph looks exactly like system taken from the interface.
                # NOTE: If this causes problems, trash the whole thing, functionality is more important than pretty diagrams
                latex_template = eqbank[eq['equation_template_id']]['latex'].replace("\\frac", "\\dfrac")

                # this is a sanity check for situations like substituting for \\Delta l_{} and l_{} (\Delta 50 and 50 in DeformsDemo)
                # it might help to see if there is a conflict or not, and accordingly, choose the right value to replace.
                # Accordingly, replace eq['variables'].items() with a pre-ordered set of variables, so that they don't conflict.
                # best case: it doesn't matter, and it'a little one-time overhead.
                # worst case: we need to create a whole ordering.
                # it doesn't work. this bug can only be fixed by regex or something.
                
                for var_id, var in eq['variables'].items():
                    if debug:
                        print(var_id)
                    if var['valueType'] == 'association':
                        self.main_dependency_graph.add_node(var['value']['var'], group='unknown')
                        if var['valueNegated']:
                            template = template.replace(var['name'], '-'+var['value']['var'])
                            self.main_dependency_graph.add_edge(eq_node_name, var['value']['var'], negated=1)

                            #latex template, experimental
                            # latex_template = latex_template.replace(
                            #     eqbank[eq['equation_template_id']]['variables'][var_id], 
                            #     f"-({var['value']['varDisplay']})"
                            #     )
                        else:
                            template = template.replace(var['name'], var['value']['var'])
                            self.main_dependency_graph.add_edge(eq_node_name, var['value']['var'], negated=0)

                            #latex template, experimental
                            # latex_template = latex_template.replace(
                            #     eqbank[eq['equation_template_id']]['variables'][var_id], 
                            #     f"{var['value']['varDisplay']}"
                            #     )
                            
                    elif var['valueType'] == None:
                        self.main_dependency_graph.add_node(var['currentSymbol'], group='unknown')
                        if var['valueNegated']:
                            template = template.replace(var['name'], '-'+var['currentSymbol'])
                            self.main_dependency_graph.add_edge(eq_node_name, var['currentSymbol'], negated=1)
                            
                            #latex template, experimental
                            # latex_template = latex_template.replace(
                            #     eqbank[eq['equation_template_id']]['variables'][var_id], 
                            #     f"-({var['symbol_context']['parentSymbol']})"
                            #     )
                        else:
                            template = template.replace(var['name'], var['currentSymbol'])
                            self.main_dependency_graph.add_edge(eq_node_name, var['currentSymbol'], negated=0)
                            
                            #latex template, experimental
                            # latex_template = latex_template.replace(
                            #     eqbank[eq['equation_template_id']]['variables'][var_id], 
                            #     f"{var['symbol_context']['parentSymbol']}"
                            #     )
                        
                    elif var['valueType'] == 'number':
                        if len(var['valueSource'].split('_')) > 1: # it's a computed solution, not a parameter from the prose
                            self.main_dependency_graph.add_node(var['valueSource'], group='unknown')
                            if var['valueNegated']:
                                template = template.replace(var['name'], '-'+var['valueSource'])
                                self.main_dependency_graph.add_edge(eq_node_name, var['valueSource'], negated=1)
                                
                                #latex template, experimental TODO: Check if this is correct or not with an example.
                                # latex_template = latex_template.replace(
                                #     eqbank[eq['equation_template_id']]['variables'][var_id], 
                                #     f"(-{self.ref_report_context.summary[var['valueSource']]['symbol']})"
                                #     )
                            else:
                                template = template.replace(var['name'], var['valueSource'])
                                self.main_dependency_graph.add_edge(eq_node_name, var['valueSource'], negated=0)
                                
                                #latex template, experimental TODO: Check if this is correct or not with an example.
                                # latex_template = latex_template.replace(
                                #     eqbank[eq['equation_template_id']]['variables'][var_id], 
                                #     f"{self.ref_report_context.summary[var['valueSource']]['symbol']}"
                                #     )
                        else:
                            # it is just a number, a parameter from the question pulled directly
                            if var['valueNegated']:
                                template = template.replace(var['name'], '-'+var['id'])
                                
                            else:
                                template = template.replace(var['name'], var['id'])
                            
                            # this one does not substitute values correctly, so we leave this
                            # latex template, experimental (only need one for this since the value would already have been negated)
                            # latex_template = latex_template.replace(
                            #     eqbank[eq['equation_template_id']]['variables'][var_id], 
                            #     f"{var['value']} {var['currentUnit']}"
                            #     )
                    
                lhs, rhs = template.split("=")
                self.main_dependency_graph.nodes[eq_node_name]['template'] = Eq(parse_expr(lhs), parse_expr(rhs))
                self.main_dependency_graph.nodes[eq_node_name]['folded'] = []
                self.main_dependency_graph.nodes[eq_node_name]['latex'] = latex_template
                
        for sol_id, solution in self.ref_report_context.json_object['solutions'].items():
            if solution['source'] == '':
                # TODO: Look at why this makes sense
                # TODO: and document this later
                if "training" in self.ref_report_context.context:
                    pass
                else:
                    # print(f"Solution {sol_id} was not submitted")
                    if solution['type'] == "choices":
                        continue
                    else:
                        # self.ref_report_context.message_text[sol_id]["decision"] = [f"Solution {int(sol_id)+1} was not submitted"]
                        self.ref_report_context.message_list.dict_message_texts[sol_id] = \
                            MessageText(
                                int_soln_id=int(sol_id), 
                                str_soln_text=f"Solution {int(sol_id)+1} was not submitted")
            elif solution["type"] == "number" or solution["type"] == "integer":  
                # otherwise no point in connecting this to subgraph
                if self.main_dependency_graph.has_node(solution['source']):
                    self.main_dependency_graph.nodes[solution['source']]['solution_id'] = sol_id
                    # stores the id of the solution box that connects to that unknown    
            
            # Alternatively, if the source is not found, we have a problem
            # since ANY solution would have to be computed from a system of equations
            # to be legitimate. print error to terminal.
            # TODO: Add this error message
        
        # add function call to simplify and substitute? make it an all in one?
        
        return self.main_dependency_graph
    
    def fetch_solution_subgroups(self, debug=False):
        """Generates the solution subgroups from the dependency graph,
        which includes separating them by solution id (single id or tuple of ids)
        and folding them to minimize dependency.

        Args:
            debug (bool, optional): Enables printing debugging information. Defaults to False.
        
        Returns Updates self.solution_subgroups dictionary.
                Also returns a reference to the self.solution_subgroups dictionary
                Note: This will be useful when using the functionality as a library for analysis
                outside of the script
                
        """
        g_dep = self.main_dependency_graph
        
        # TODO: This needs to be turned into a dict() of
        # (soln_id, SolutionSubgroup object) (k,v) pairs
        
        # self.solution_subgraphs = {} # key: id of soln box, value: subgraph/chain
        
        for g_sub in connected_components(g_dep):
            #for soln_id in [
            #    g_dep.nodes[n]["solution_id"] for n in g_sub if "solution_id" in g_dep.nodes[n]
            #]:
            #    # for each solution id, add this subgraph, as a single subgraph may answer multiple subparts
            #    solution_subgraphs[soln_id] = g_dep.subgraph(g_sub).copy()
            soln_ids : list = [g_dep.nodes[n]["solution_id"] for n in g_sub if "solution_id" in g_dep.nodes[n]]
            if len(soln_ids) == 1:
                soln_id = soln_ids[0]
            elif len(soln_ids) > 1:
                soln_id = ",".join(soln_ids)
                # TODO: Change this line to be a field in class Message
                self.ref_report_context.message_text[soln_id] = {"details":[]}
            else:
                # NOTE: First noticed on 9/21/22, with DeformsDemo
                # when alt solutions were done and equations left unused,
                # resulted in non-solution conn comps.
                # later: remove these equations at the time of solution.
                continue
            # solution_subgraphs[soln_id] = g_dep.subgraph(g_sub).copy()
            if debug:
                # Print current context
                print("\nPrinting context from inside get_solution_subgroups for debugging\n---")
                print(self.ref_report_context.context)

            self.solution_subgroups[soln_id] = {
                'subgroup': SolutionSubgroup(soln_id, g_dep.subgraph(g_sub).copy()),
                'trees':    {}, # dict of expression trees corresponding to expression trees in the subgroup.
                                # the keys can be anything, I'm using dictionaries for faster access and addition of objects
                                # but that also helps to double up. I'll probably use 0..n integers, with no actual ordering,
                                # and then use this to map expression trees for n-n based on varmap, might make managing easier
                                # (i.e. store dict and keys mapping to trees in that dict, faster access during comparison)
            }
        return self.solution_subgroups

    def show_solution_subgroups(self, width = 8, debug=False):
        """diagnostic function only, used to create images of
        everything in the solution subgroups for this solution.
        Creates multiple images, as required.

        Function only gets called with report context has
        the following options enabled:
        default settings for one attempt with visualizations.

        NOTE: width=8 works for most straight lines, 16-24 for everything else.
        """

        for subgroup_id, subgroup in self.solution_subgroups.items():
            if debug:
                print(f"Solution Subgroup ID {subgroup_id}")
            height_unit = max(
                    (len([_ for _ in subgroup["subgroup"].g_dep_unfolded 
                        if subgroup["subgroup"].g_dep_unfolded.nodes[_]['group'] == "equation"]),
                    len([_ for _ in subgroup["subgroup"].g_dep_unfolded 
                        if subgroup["subgroup"].g_dep_unfolded.nodes[_]['group'] == "unknown"]))
                    )
            fig = plt.figure(figsize=(
                width, 8.8+(height_unit-2)*3
                ))

            ax1_g_dep_unfolded = fig.add_axes([0, 0.7, 1, 0.3])
            ax2_g_dep_unfolded = fig.add_axes([0, 0.4, 1, 0.3])
            ax3_g_dep_dag = fig.add_axes([0, 0, 1, 0.4])

            if debug:
                print("Unfolded graph")
                print("==============")
                print(to_pydot(subgroup["subgroup"].g_dep_unfolded).to_string())

            # draw the unfolded graph
            self.draw_dep_graph(G=subgroup["subgroup"].g_dep_unfolded, axes=ax1_g_dep_unfolded, use_latex=True)

            if debug:
                print("Folded graph")
                print("============")
                print(to_pydot(subgroup["subgroup"].g_dep_folded).to_string())
            
            # draw the folded graph
            self.draw_dep_graph(G=subgroup["subgroup"].g_dep_folded, axes=ax2_g_dep_unfolded)

            if debug:
                print("DAG")
                print("==============")
                print(to_pydot(subgroup["subgroup"].dag_dep).to_string())

            self.draw_dag(G=subgroup["subgroup"].dag_dep, axes=ax3_g_dep_dag)
            
            # change to work for "default" case that only runs the current attempt to create visualizations.
            if debug:
                filename = f"{self.ref_report_context.context['filename']}-{self.ref_report_context.context['name']}-{self.ref_report_context.context['task']}-{self.ref_report_context.context['prefix']}-{subgroup_id}.png"
            else:
                filename = f"{self.ref_report_context.context['filename']}-{self.ref_report_context.context['name']}-{self.ref_report_context.context['task']}-{self.ref_report_context.context['prefix']}-{subgroup_id}.svg"
            
            try:
                plt.savefig(filename)
            except ValueError:
                print(f"valueError occurred in solution.py when trying to create {filename}")

    def draw_dep_graph(self, G: Graph, axes, use_latex=False, debug=False):
        # this is assuming that the graph follows the properties:
        # 1. solution nodes are marked in orange squares
        # 2. all other equations are marked in green circles
        # 3. all other unknowns are marked in blue circles
        # 4. the equation and symbol to be displayed is in the 'label' field.
        
        # just create a copy of the graph with the least amount of info needed to display it
        depG = Graph()

        for node in G:
            depG.add_node(node)
            if 'solution_id' in G.nodes[node]:
                depG.nodes[node]['color']='orange'
                # depG.nodes[node]['label']=f"{node}: ${self.ref_report_context.summary[node]['symbol']}$"
                depG.nodes[node]['label']=f"${self.ref_report_context.summary[node]['symbol']}$"
            
            elif G.nodes[node]['group'] == 'unknown':
                depG.nodes[node]['color']='cyan'
                # depG.nodes[node]['label']=f"{node}: ${self.ref_report_context.summary[node]['symbol']}$"
                depG.nodes[node]['label']=f"${self.ref_report_context.summary[node]['symbol']}$"
            
            else: # it's an equation
                depG.nodes[node]['color']='lightgreen'
                # eq_label=f"{node}: ${G.nodes[node]['template'].lhs} = {G.nodes[node]['template'].rhs}$"
                eq_label="${lhs} = {rhs}$"\
                        .format(
                            lhs=G.nodes[node]['template'].lhs,
                            rhs=G.nodes[node]['template'].rhs
                            ) # <<--- WARN: THIS WORKS, COME BACK TO THIS
                if use_latex:
                    eq_label="".join([node,": ","$",G.nodes[node]['latex'].replace('\\pi','pi'),"$",\
                                      "\n",eq_label,
                                      ])
                
                # a little hamfisted, but it'll have to do for generating the figures
                for term, term_details in self.ref_report_context.summary.items():
                    if term in eq_label:
                        if "symbol" in term_details: # it's an unknown
                            eq_label=eq_label.replace(term, term_details['symbol'])
                        elif "id" in term_details and term_details['valueType'] == "number": # it's a parameter
                            """IGNORE these options, these were prior to printing both"""
                            # eq_label.replace(term, f"{term_details['value']} {term_details['currentUnit']}")
                            # eq_label=eq_label.replace(term, term_details['symbol_context']['parentSymbol'])
                            #eq_label=eq_label.replace(term, "p"+term_details['valueSource'].split("param")[1]) # writes params as pN
                            if abs(float(str(term_details['value']))) > 1100:
                                value = '{:.3e}'.format(float(str(term_details['value']).replace('-','')))
                            else:
                                value = float(str(term_details['value']))
                            # eq_label = eq_label.replace(term, f"{value} {term_details['currentUnit']}")
                            eq_label = eq_label.replace(term, f"{value} {term_details['currentUnit']}")
                                # just cuts out negative sign, keeps everything else
                                # because when creating the equation in SymPy, the negative sign was already added.
                            if debug:
                                print(eq_label)
                
                depG.nodes[node]['label']=eq_label.replace("**","^").replace("pi","\\pi").replace("*"," \\times ")

            if debug:
                print(node,depG.nodes[node]['label'])

        #then, add the edges as they were in the original
        depG.add_edges_from(G.edges.data())

        labels = {node:depG.nodes[node]['label'] for node in depG.nodes()}
        edge_labels = {(x,y):"$\\times -1$" if G[x][y]['negated'] == 1 else "" for (x,y) in depG.edges()}

        # fixing positions of nodes
        node_groups = get_node_attributes(depG, 'color')
        bip_layout = bipartite_layout(
            depG, 
            list(filter(lambda x: node_groups[x] == 'cyan' or node_groups[x] == 'orange' , node_groups))
        )

        # adjusting plot size to accommodate everything
        l,r = axes.get_xlim()
        axes.set_xlim(l-2,r+4)
        t,b = axes.get_ylim()
        axes.set_ylim(t+1,b-2)

        #draw all unknowns except solution nodes
        draw_networkx_nodes(
            depG, pos = bip_layout, 
            nodelist = [_ for _ in depG if depG.nodes[_]['color']=='cyan'],
            node_color = [depG.nodes[_]['color'] for _ in depG if depG.nodes[_]['color']=='cyan'], # type: ignore
            node_shape='o',
            node_size=800,
            ax=axes
        )

        #draw all the equation nodes, with node sizes proportional to size of equation
        draw_networkx_nodes(
            depG, pos = bip_layout, 
            nodelist = [_ for _ in depG if depG.nodes[_]['color']=='lightgreen'],
            node_color = [depG.nodes[_]['color'] for _ in depG if depG.nodes[_]['color']=='lightgreen'], # type: ignore
            node_shape='o',
            node_size=800,
            ax=axes
        )

        #draw solution nodes
        draw_networkx_nodes(
            depG, pos = bip_layout, 
            nodelist = [_ for _ in depG if depG.nodes[_]['color']=='orange'],
            node_color = [depG.nodes[_]['color'] for _ in depG if depG.nodes[_]['color']=='orange'], # type: ignore
            node_shape='s',
            node_size=800,
            ax=axes
        )

        # draw labels for equations
        draw_networkx_labels(
            depG, pos = {_:bip_layout[_] for _ in bip_layout if depG.nodes[_]['color']=='lightgreen'}, 
            labels = {_:labels[_] for _ in labels if depG.nodes[_]['color']=='lightgreen'},
            font_family='cm', horizontalalignment="left",
            ax=axes
        )

        # draw labels for unknowns
        draw_networkx_labels(
            depG, pos = {_:bip_layout[_] for _ in bip_layout if depG.nodes[_]['color']!='lightgreen'}, 
            labels = {_:labels[_] for _ in bip_layout if depG.nodes[_]['color']!='lightgreen'}, 
            font_family='cm', horizontalalignment="center",
            ax=axes
        )
        
        # possibly add directed arrows for direction of substituting variables? How to determine this?
        draw_networkx_edges(depG, pos = bip_layout, ax=axes)
        draw_networkx_edge_labels(G, pos = bip_layout, edge_labels=edge_labels, ax=axes, horizontalalignment="center")
    
    def draw_dag(self, G: DiGraph, axes, use_latex=True, debug=False):
        dag = DiGraph()

        for node in G:
            dag.add_node(node)
            # eq_label=f"{node}: ${G.nodes[node]['template'].lhs} = {G.nodes[node]['template'].rhs}$"
            eq_label="${lhs} = {rhs}$"\
                    .format(
                        lhs=G.nodes[node]['template'].lhs,
                        rhs=G.nodes[node]['template'].rhs
                        ) # <<--- WARN: THIS WORKS, COME BACK TO THIS
            if use_latex:
                eq_label="".join([node,": ","$",G.nodes[node]['latex'].replace('\\pi','pi'),"$",\
                                    "\n",eq_label,
                                    ])
            
            # a little hamfisted, but it'll have to do for generating the figures
            for term, term_details in self.ref_report_context.summary.items():
                if term in eq_label:
                    if "symbol" in term_details: # it's an unknown
                        eq_label=eq_label.replace(term, term_details['symbol'])
                    elif "id" in term_details and term_details['valueType'] == "number": # it's a parameter
                        # eq_label.replace(term, f"{term_details['value']} {term_details['currentUnit']}")
                        # eq_label=eq_label.replace(term, term_details['symbol_context']['parentSymbol'])
                        # eq_label = eq_label.replace(term, f"{str(term_details['value']).replace('-','')} {term_details['currentUnit']}") # just cuts out negative sign, keeps everything else
                        if abs(float(str(term_details['value']))) > 1100:
                            value = '{:.3e}'.format(float(str(term_details['value']).replace('-','')))
                        else:
                            value = float(str(term_details['value']))
                        eq_label = eq_label.replace(term, f"{value} {term_details['currentUnit']}") # just cuts out negative sign, keeps everything else
                        #eq_label=eq_label.replace(term, "p"+term_details['valueSource'].split("param")[1]) # writes params as pN
            
            dag.nodes[node]['label']=eq_label.replace("**","^").replace("pi","\\pi").replace("*"," \\times ")

            if debug:
                print(node,dag.nodes[node]['label'])
        #then, add the edges as they were in the original
        dag.add_edges_from(G.edges.data())

        pos = rescale_layout_dict(pydot_layout(dag, prog='dot'))
        draw_networkx(
            dag, pos, 
            node_color = 'lightgreen', node_shape='o', node_size=800,
            labels = {node:dag.nodes[node]['label'] for node in dag.nodes()}, 
            font_family='cm', horizontalalignment="center",
            ax=axes,
        )
        draw_networkx_edges(dag, pos, ax=axes)

    def get_expression_trees(self, debug=True):
        """
        Goes through the dependency graph, which may have either
        * 1 equation and 1 unknown (1-1 system) [ideal] OR
        * n equations and n unknowns (n-n system) [ideal] OR
        * n equations and m unknowns, i.e. incompatible systems [NON-ideal]

        Returns:
            dict[ExpressionTree]: dict of ExpressionTree objects,
            For all unknowns (x,y,z...) in an equation eq (node term),
                SubGroup already has (key,value) pairs - (x,eq), (y,eq), etc.
                so you know the equation that an unknown belongs to
            So just a mapping of which equation node term maps to which
            object in this case is sufficient.
        """
        
        # precondition: you already have the equation-variable mapping done 
        # inside __init__() after folding the dependency graph.
        
        # test: count the number of pairs you have.
        # it should be 1 for a 1-1 scenario, otherwise different (i.e. needing a check later)
        # print(len(self.map_equation_variable_folded))
        # confirmed, works
        
        # Go through pair, and create the expression tree (DiGraph object) corresponding to each equation.

        if debug:
            print("\nInside solution.py:get_expression_trees")
            print(self.ref_report_context.context)

        for soln_id, solution_subgroup in self.solution_subgroups.items():
            # Insert conditions to properly generate the expression trees
            # Based on whether it's a 1-1 or n-n system
            
            if not solution_subgroup["subgroup"].is_consistent \
                or solution_subgroup["subgroup"].n_system < 1 :

                # TODO: Add error data to context here;
                # Generate error message or just store info for later?

                continue
            
            # If you get to here, your system should be consistent.
            if solution_subgroup["subgroup"].n_system == 1 :
                equation_in_1_unknown_id = solution_subgroup["subgroup"].get_equations_folded()[0]
                single_unknown = solution_subgroup["subgroup"].get_unknowns_folded()[0]

                solution_subgroup["trees"][equation_in_1_unknown_id] = \
                ExpressionTree(
                    self.ref_report_context,
                    solve(
                        solution_subgroup["subgroup"].get_equation_object_folded(equation_in_1_unknown_id),
                        Symbol(single_unknown))[0]
                    )
            else:
                # TODO: Add support for checking varmap over here for correspondence?
                # No, varmap will be looked at when comparing two contexts;
                # which happens AFTER context is fully created (including this step)
                # and happens inside (possibly) the workflow functions/offloaded elsewhere close to that
                
                for equation_id in solution_subgroup["subgroup"].get_equations_folded():
                    equation_in_n_unknowns = solution_subgroup["subgroup"].get_equation_object_folded(equation_id)
                    
                    solution_subgroup["trees"][equation_id] = \
                    ExpressionTree(
                        self.ref_report_context,
                        equation_in_n_unknowns.lhs - equation_in_n_unknowns.rhs
                        )
        
        if debug:
            prettyprint(self.solution_subgroups)

        return None
    
