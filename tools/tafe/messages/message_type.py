"""
This file houses all the error pattern types.
it's like a utility/mixed bag library that is used to analyze different
errors and report if anything is found.
Every pattern has a corresponding method that has the following structure:
i) Looks for a specific error pattern in a DAG thread
(DEPRECATED)takes in an error pattern (subgraph from the expression tree)
ii) generates None if the error pattern doesn't fit,
otherwise generates an error message text
(which then gets assigned to a MessageText object by the caller)
"""

# from tafe.core.report import ReportContext
# from tafe.core.solution_subgroup import SolutionSubgroup
# from tafe.equation_analysis.equation import CurrentEquation

# from tafe.messages.message_utils import *

from tools.tafe.core.report import ReportContext
from tools.tafe.core.solution_subgroup import SolutionSubgroup
from tools.tafe.equation_analysis.equation import CurrentEquation

from tools.tafe.messages.message_utils import *

from enum import Enum
from pprint import pprint

ERROR_TYPE = Enum(
    "error_type",
    [
        "solo_equation", "equation_in_cluster", 
        "cluster_multiple_equation", 
        "parameter_no_match",
        "parameter_prev_error_no_match",
        "sign_error",
        "cluster_relation"
    ]
)

def find_missing_whole_equations(
    report_object: ReportContext,
    subgroup_id: str,
    metadata_object : dict,
    debug = False
) -> dict:
    """
    This goes the all the items in the 'matched_labeled_equations'
    field in the metadata and returns the list of equation template names
    that are missing (if master)/unexpected (if attempt).
    Basically, report at whole template level of equation if the template
    did not have a match somewhere else.

    model solution equation internal IDs:   ()[0]
    attempt equation internal IDs:          ()[1]
    """
    list_of_missing_equations = []
    prefix_index : int = {"m": 0, "a": 1}.get(report_object.context['prefix']) # type: ignore
    
    if debug:
        print(report_object.context['prefix'])
        print(prefix_index)
    
    subgroup : SolutionSubgroup = report_object.solution.solution_subgroups[subgroup_id]['subgroup']
    threads_list : dict = subgroup.equation_threads # type: ignore

    if debug:
        print(threads_list)
        print()
    
    for thread_id in metadata_object:
        # find the list of equations in the thread
        equation_thread = threads_list[thread_id[prefix_index]]
        
        # get the list of equations of the thread that have been observed and matched/scored
        target_equations_thread = [
            eq_pair[prefix_index] for eq_pair in
            metadata_object[thread_id]['metadata']['matched_label_equations'].keys()
        ]

        for eq_pair in metadata_object[thread_id]['metadata']['matched_reduced_equations'].keys():
            target_equations_thread.extend(
                equation_thread[
                    equation_thread.index(eq_pair[prefix_index][0]):
                    equation_thread.index(eq_pair[prefix_index][1])+1
                ]
                )
        
        sorted(target_equations_thread, key=lambda x: equation_thread.index(x))
        # finally, if any equations are there that were not found, report them
        for equation in equation_thread:
            # only add this equation if it is not present in
            # the thread at all; if the equation is present in thread
            # but was ignored because it wasn't set up properly, let
            # something else catch it.
            if len([
                eq for eq in target_equations_thread 
                if report_object.get_equation_name(eq) == report_object.get_equation_name(equation)
                ]):
                # this means the equation with that name exists, just in a different form.
                # ignore this equation, as it's not a "missing" equation per se.
                # might improve this later.
                # actually, move this into label_match to report equations some error Enums
                # as applicable.
                continue
            if equation not in target_equations_thread:
                list_of_missing_equations.append(equation)

    if debug:
        print(f"mising equations found in {\
            report_object.context['prefix']\
            } : solution number {subgroup_id}")
        print(list_of_missing_equations)
    return {
        "equations": list_of_missing_equations,
        "error_type": ERROR_TYPE.solo_equation,
    }

def report_solo_equations(
    equations: list,
    report_context: ReportContext,
    is_online: bool,
    debug: bool = False
) -> str:
    """
    This is only responsible for reporting whole equation templates
    that were missing from threads/paths.

    'key' is only either 'm' for the master/model solution,
    or 'a' for the student's attempt. If you're doing 'default'
    it should not be getting this far, default is only for
    debugging/generating figures.
    """
    error_string = []

    if debug:
        pprint(report_context.context["prefix"])

    # this can happen, so as a safeguard
    if len(equations) == 0:
        return ""

    if report_context.context["prefix"] == "m":
        error_string.append(
            "The following equation(s) were missing from your setup:"
        )
        for eq in equations:
            if is_online:
                error_string.append(\
                    get_html_equation_palette(str(\
                        report_context.get_equation_name(eq)
                    ))
                    )
            else:
                error_string.append(report_context.get_equation_name(eq))
                
    elif report_context.context["prefix"] == "a":
        error_string.append(
            "These equation(s) were not supposed to be used in your setup:"
        )
        for eq in equations:
            if is_online:
                error_string.append(\
                    get_html_equation_in_workspace(str(\
                        report_context.summary[eq]
                    ))
                    )
            else:
                error_string.append(report_context.summary[eq])

    if len(error_string) > 0:
        return "\n".join(error_string)
    else:
        return ""

def find_missing_parameters_in_labeled_equations(
    report_master,
    report_attempt,
    subgroup_id: str,
    metadata_object : dict,
    debug = False
) -> dict:
    """
    Yes, we also detect and record sign issues.
    However, that is resolved in a different method, not over here.
    This is dedicated to ONLY detecting and reporting equation boxes
    with the wrong value that were direct parameters and not due to
    a previous equation.
    """
    dict_wrong_boxes : dict = {}

    for thread_id in metadata_object:
        for eq_pair_id, score_details in \
            metadata_object[thread_id]['metadata']['matched_label_equations'].items():
            if not score_details['score'] < 1.0:
                continue

            for error_pair, error_type in score_details['errors'].items():
                if error_type != ERROR_TYPE.parameter_no_match:
                    continue
                
                dict_wrong_boxes[error_pair[1]] = {
                    'm': report_master.get_box_value_unit(
                            error_pair[0], 
                            report_master.get_object_workspace_id(error_pair[0]), False),
                    'a': report_attempt.get_box_value_unit(
                            error_pair[1], 
                            report_attempt.get_object_workspace_id(error_pair[1]), False),
                    'param': ""
                        # add the link to the parameter box if available
                }
                if "param" in report_master.summary[error_pair[1]]["valueSource"]: # it's a parameter from the question
                    dict_wrong_boxes[error_pair[1]]['param'] = \
                        report_master.json_object['parameters']\
                            [
                                report_master.summary[error_pair[1]]['valueSource']
                                    ]["id"] # move to a function

    return {
        "equation_boxes": dict_wrong_boxes,
        "error_type": ERROR_TYPE.parameter_no_match
    }

def report_missing_parameters_in_labeled_equations(
    equation_boxes: dict,
    is_online: bool,
    debug: bool = True
) -> str:
    error_string = []

    # if debug:
    #     print("DEBUG: inside report_missing_parameters_in_labeled_equations")
    #     pprint(equation_boxes)

    for box, box_details in equation_boxes.items():
        if not is_online:
            a_box_text = f"{box_details['a'][0]} {box_details['a'][1]} in the box for {box}"
            m_box_text = f"{box_details['m'][0]} {box_details['m'][1]}"
            if box_details['param'] != "":
                m_box_text+=f" from parameter {box_details['param']} in prose"
            message = f"You entered {a_box_text}. "+\
                f"This was wrong. You were expected to enter {m_box_text}."
        else:
            a_box_text = get_html_parameter_box(
                box, box_details['a'][0], box_details['a'][1]
            )
            m_box_text = get_html_parameter_box(
                box_details['param'], box_details['m'][0], box_details['m'][1]
            )
            message = f"You entered {a_box_text} in the box indicated. "+\
                f"This was wrong. You were expected to enter {m_box_text}."+\
                    "Click on the texts to see the locations."
        
        error_string.append(message)

    if len(error_string) > 0:
        return "\n".join(error_string)
    else:
        return ""

def find_equation_issues_in_subsequences(
    report_master: ReportContext,
    report_attempt: ReportContext,
    subgroup_id: str,
    metadata_object : dict,
    debug = False
) -> dict:
    """
    This one only parses the metadata object for the reduced equations
    Most approaches involve first making a CurrentEquation from the
    recorded subsequences, and then analyzing this.
    """
    if debug:
        print("Inside find_equation_issues_in_subsequences")
    
    dict_equation = {}

    m_subgroup : SolutionSubgroup = report_master.solution.solution_subgroups[subgroup_id]['subgroup']
    a_subgroup : SolutionSubgroup = report_attempt.solution.solution_subgroups[subgroup_id]['subgroup']
    m_threads_list : dict = m_subgroup.equation_threads # type: ignore
    a_threads_list : dict = m_subgroup.equation_threads # type: ignore
    
    for thread_id in metadata_object:
        for subseq, score_details in \
            metadata_object[thread_id]['metadata']['matched_reduced_equations'].items():
            if debug:
                print(subseq)
            if not score_details['score'] < 1.0:
                continue
            
            if debug:
                pprint({subseq: score_details['error_metadata']})
            
            # let's merge the equations in the subsequence before testing anything
            mceq : CurrentEquation = score_details['reduced_equations']['m']
            aceq : CurrentEquation = score_details['reduced_equations']['a']

            if debug:
                print(f"master reduced eq:{mceq.show_equation()}")
                print(f"leaves: {mceq.get_leaves()}")
                print(f"attempt reduced eq:{aceq.show_equation()}")
                print(f"leaves: {aceq.get_leaves()}")
            
            # create a hashtable to check which terms were matched and which weren't
            dict_m_terms = {str(_): False for _ in mceq.get_leaves()}
            dict_a_terms = {str(_): False for _ in aceq.get_leaves()}
            dict_pair_miss_terms = dict()
            # str() type casting since leaves directly extracted are sympy.Symbol type

            def traverse_metadata(key, dict_metadata):
                # if debug:
                #     print(f"DEBUG: new key found {key} {dict_metadata}")
                # base case:
                if "children" not in dict_metadata:
                    # if debug:
                    #     print("DEBUG: looks like its leaves")

                    if dict_metadata['score'] == 2:
                        if key[0] in dict_m_terms:
                            dict_m_terms[key[0]] = True
                        if key[1] in dict_a_terms:
                            dict_a_terms[key[1]] = True
                    else:
                        dict_pair_miss_terms[key] = dict_metadata
                        # if key[0] in dict_m_terms:
                        #     dict_m_terms[key[0]] = False
                        # if key[1] in dict_a_terms:
                        #     dict_a_terms[key[1]] = False
                    return

                # recursive case:
                for pair in dict_metadata['children']:
                    traverse_metadata(pair, dict_metadata['children'][pair]['metadata'])

                return
            
            traverse_metadata(subseq, score_details['error_metadata'])

            m_term_diff = [
                    _ for _ in dict_m_terms if dict_m_terms[_] == False
                    and len([k for k in dict_pair_miss_terms if k[0] == _]) == 0
                    ]
            a_term_diff = [
                    _ for _ in dict_a_terms if dict_a_terms[_] == False
                    and len([k for k in dict_pair_miss_terms if k[1] == _]) == 0
                    ]
            # these two are like m-(a.m) and a-(a.m), set differences one way
            # dict_pair_miss_terms is the intersection of the missing parameters

            if debug:
                print(f"The leaves with issues in M are {m_term_diff}")
                print(f"The leaves with issues in A are {a_term_diff}")
                print(f"The leaf pairs that registered other problems are {dict_pair_miss_terms}")
            
            # decision making steps for each term in each list
            # if the term is an assoc and is an input from a previous equation
            # ignore it
            # 
            # if the term is an assoc otherwise, find the equation it appears in
            # in the cluster, that needs to be revisited/revised if in A
            # if its in M, suggest the relation it appears in to use/revise with non-prev input parameters if any
            # 
            # if the term is a parameter, definitely report the equation it appears in as the basis for trouble in A.

            if debug:
                print(m_threads_list[thread_id[0]], subseq[0])
            
            m_subseq_thread = m_threads_list[thread_id[0]]
            m_subseq_thread = m_subseq_thread[m_subseq_thread.index(subseq[0][0]): m_subseq_thread.index(subseq[0][1])+1]
            for meq in m_subseq_thread:
                meq_boxes = report_master.get_equation_variables(meq)
                if debug:
                    print(meq, meq_boxes)
            
            # step 1: see if there is a parameter in m_term_diff that belongs to any of these equations
            for term in m_term_diff:
                if term in report_master.json_object["parameters"]:
                    box_id_list = {
                        
                    }


    return {
        "cluster_equation_issues": dict_equation,
        "error_type": ERROR_TYPE.cluster_relation
    }

"""
DEPRECATED WEIRD BITS OF CODE TO EXAMINE LATER TO SEE WHAT CAN BE SALVAGED
"""
# # Code snippets to revise and incorporate later on

# # from inside run_analysis()
# # for the equations from corresponding sets do not match up perfectly
# # i.e. missing equation for something in the model solution, or
# # multiple equations mapping to the same equation in the model solution.
# for eq in master_eq_sets:
#     if master_eq_sets[eq] != True:
#         # print("Unable to match master equation:", master_dg_folded[s_id].nodes[eq]['template'])
#         message_text[s_id]["details"].append("This equation that we expected to see was not found:"+\
#             master_dg_folded[s_id].nodes[eq]['template'])
    
# for eq in attempt_eq_sets:
#     if attempt_eq_sets[eq] != True:
#         # print("Unable to match attempt equation:", attempt_dg_folded[s_id].nodes[eq]['template'])
#         message_text[s_id]["details"]\
#             .append("We found this equation that we weren't expecting to be used:"+\
#             attempt_dg_folded[s_id].nodes[eq]['template'])

# for master_eq, res in mapped_equations.items():
#     if len(res) > 1:
#         # print("Conflicts found in attempt for equation corresponding to "+master_eq)
#         message_text[s_id]["details"]\
#             .append("Among the equations submitted, we found more than one equation that mapped to "+\
#             master_eq+" in our expected solution. Please consider revising.")

# # From run_analysis
# # for when thr number 
# else:
#     # message_text[s_id]["details"].append(
#     #     "You set up your equations incorrectly.\
#     #     You probably have the wrong equations, \
#     #     or they're connected incorrectly, \
#     #     or you're reporting the value of the wrong unknown.\
#     # ")
#     """
#     Either the wrong variable was reported and/or
#     the right equations were not used.
#     Reporting at this stage will not be super targeted,
#     mostly being suggestions on how to modify their system
#     to try to align with what the master solution expects them
#     to provide.
#     """
    
#     # Step 1. Look at the unknowns in the attempt,
#     # pick different combinations of variables
#     # to see which one, when picked, gives a potential
#     # system that might align with the master solution.
#     # Suggest these combinations then.
    
#     # Note: s_id is the reference to the solution ID that we're trying 
#     # to align for.
    
#     unknown_vars = [
#         n for n in attempt_dg_folded[s_id]
#         if attempt_dg_folded[s_id].nodes[n]["group"] == "unknown"
        
#     ]
#     attempt_subg_nodes = [n for n in attempt_dg_folded[s_id]]
    
#     # Find the number of nodes the folded subgraph is supposed to have
#     master_sys_size = len([
#         n for n in master_dg_folded[s_id] if nx.degree(master_dg_folded[s_id],n)
#     ])
    
#     # Find the number of solution boxes that this solution subgraph
#     # tries to answer
#     n_solns_in_subgraph = len([
#         n for n in attempt_dg_folded[s_id] 
#         if attempt_dg_folded[s_id].nodes[n]["group"] == "unknown"
#         and "solution_id" in attempt_dg_folded[s_id].nodes[n]
#     ])
    
#     # Repeat over all combinations of assignments for solution boxes
#     # for this solution subgraph
    
#     alternative_solution_reports = []
    
#     for soln_box_comb in combinations(unknown_vars, n_solns_in_subgraph):
        
#         # Create a copy of the subgraph induced on the nodes for the original
#         # subgraph for the solution. Then, assign the solution boxes to this
#         # as the current combination dictates. Try to fold this subgraph.
        
#         g_solution = attempt_dep_graph.subgraph(attempt_subg_nodes).copy()
#         # remove all solution assignments
#         for n in unknown_vars:
#             if "solution_id" in g_solution.nodes[n]:
#                 del g_solution.nodes[n]["solution_id"]
#             if n in soln_box_comb:
#                 g_solution.nodes[n]["solution_id"] = "-1"
        
#         # Repeat until the graph does not change
#         flag = True
#         while flag:
#             for n in g_solution:
#                 if g_solution.nodes[n]['group'] == 'equation' and g_solution.degree(n) == 1:
#                     var = [_ for _ in g_solution[n]][0]
#                     if g_solution.degree(var) >= 2 and not 'solution_id' in g_solution.nodes[var]:
#                         g_solution[n][var]['fold'] = True
#                         g_solution[n][var]['equation'] = str(n)
#                         g_solution[n][var]['unknown'] = str(var)

#             edges_to_fold = list([
#                 (g_solution[u][v]['equation'],g_solution[u][v]['unknown'])
#                 for u,v in nx.get_edge_attributes(g_solution,"fold")
#             ])
#             if len(edges_to_fold):
#                 for eq, var in edges_to_fold:
#                     subs_eq = sympy.solve(g_solution.nodes[eq]['template'], var, evaluate=False)
#                     g_solution.remove_edge(eq,var)
#                     var_target_equations = list(g_solution[var].keys())
#                     for eq_target in var_target_equations:
#                         lhs = g_solution.nodes[eq_target]['template'].lhs.subs(var, subs_eq[0])
#                         rhs = g_solution.nodes[eq_target]['template'].rhs.subs(var, subs_eq[0])
#                         g_solution.nodes[eq_target]['template'] = sympy.Eq(lhs, rhs)
#                         g_solution.remove_edge(eq_target,var)
#             else:
#                 flag = False # and the loop terminates
        
#         # what is the number of elements in this system?
        
#         if master_sys_size == len([n for n in g_solution if nx.degree(g_solution,n)]):
#             html_var_report = ""
            
#             for var in soln_box_comb:
#                 symbol_details = \
#                     attempt_unknown_summary[list(attempt_unknown_summary[var])[0]]
                
#                 if type(symbol_details["value"]) == dict:
#                     # Then it's an association
#                     # use data-association field, type var-assoc
#                     # item is the var name x_y
#                     html_var_report += \
#                     ' <span class="param" data-type=\"var-assoc\" data-item=\"'+\
#                         str(symbol_details["value"]["var"])+\
#                     '\">'+\
#                         str(symbol_details["value"]["varDisplay"])+\
#                     '</span>'
                    
#                 else:
#                     # Then it's a single variable
#                     # use data-csymbol field, type var-single
#                     # item is the var name x_y
#                     html_var_report += \
#                     ' <span class="param" data-type=\"var-single\" data-item=\"'+\
#                         str(symbol_details["currentSymbol"])+\
#                     '\">'+\
#                         str(symbol_details['symbol_context']["parentSymbol"])+\
#                     '</span>'
                
#             alternative_solution_reports.append(html_var_report)
    
#     # Update to add to messages_text
#     mtext = \
#     "You probably submitted the wrong variable as the solution."
#     if len(alternative_solution_reports):
#         mtext+="Try the submitting the following variables instead for the solutions "\
#         +str([int(_)+1 for _ in s_id.split(",")])+" : "
#         for _ in alternative_solution_reports:
#             mtext+=_+"; "
#     else:
#         mtext+=" Unfortunately that's all we can tell you right now about that."
    
#     message_text[s_id]["details"].append(mtext)