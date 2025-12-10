
import networkx as nx
import sympy

# from tafe.core.global_objects import *
# from tafe.core.solution_subgroup import SolutionSubgroup
# from tafe.core.report import ReportContext
# from tafe.core.solutionbox import SOLUTION_STATUS
# from tafe.core.utils import compare_quantities, is_unit_compatible

# from tafe.expr_tree_analysis.expr_tree import ExpressionTree
# from tafe.equation_analysis.equations_util import *
# from tafe.equation_analysis.equation import CurrentEquation, compare_equations
# from tafe.dag_analysis.dag import DependencyDAG

# from tafe.messages.message import MessageText

# from tafe.messages.message_type import ERROR_TYPE

from core.global_objects import *
from core.solution_subgroup import SolutionSubgroup
from core.report import ReportContext
from core.solutionbox import SOLUTION_STATUS
from core.utils import compare_quantities, is_unit_compatible

from expr_tree_analysis.expr_tree import ExpressionTree
from equation_analysis.equations_util import *
from equation_analysis.equation import CurrentEquation, compare_equations
from dag_analysis.dag import DependencyDAG

from messages.message import MessageText

from messages.message_type import ERROR_TYPE

from pprint import pprint
from copy import deepcopy



subgroup_details = {}

# (DEPRECATED) DO NOT ENABLE, OTHERWISE CONFLICTS WITH equations_util above
# def compare_equations(source_eq: Equality, target_eq: Equality, debug=True) -> bool:
#     return True

def dag_compare(report_master: ReportContext, report_attempt: ReportContext, debug=False):
    if debug:
        print("Inside workflows.py: dag_compare()")
    
    if debug:
        print("Show solution box")
        print(report_attempt.dict_solution_box)

    if debug:
        print("Show subgroups")
        for _, dict_subgroups in {
            'master': report_master.solution.solution_subgroups,
            'attempt': report_attempt.solution.solution_subgroups
        }.items():
            print(_)
            for subgroup in dict_subgroups:
                print(subgroup)
                for k, thread in dict_subgroups[subgroup]['subgroup'].equation_threads.items():
                    print(k, thread)
    
    # check which solution subgroups are submitted
    # and therefore can be properly compared

    list_subgroups_to_test = []
    for subgroup in report_master.solution.solution_subgroups:
        checklist = {
            # ternary operator shorthand, see [geeksforgeeks]/ternary-operator-in-python/#Ternary%20Operator%20using%20Tuple
            # basically, sets it to False if it's absent, True for anything else but absent
            # opposite of intuition, false value first, then true value
            soln_id: (True, False)[report_attempt.dict_solution_box[soln_id].status == SOLUTION_STATUS.absent]
                for soln_id in subgroup.split(",")
        }
        print(subgroup, checklist)
        if all(checklist.values()):
            print(f'{subgroup} can be compared')  if debug else None
            list_subgroups_to_test.append(subgroup)

    # Series of bookkeeping checks

    # === label checking ===
    # Check equations by name, see if EVERYTHING including result matches.
    # note the ones where the name matches but not result; these are possible errors.
    # Store the earliest point, this could be a point of issue.
    
    # CORRECT ID phase
    for subgroup_id in list_subgroups_to_test:
        # NOTE: perhaps it might help to hold permanent references to the subgroups here
        # and refer to them later, instead of the extended references.
        # TODO: Change the code elsewhere as well to simplify, reduce references and function calls
        m_subgroup : SolutionSubgroup = report_master.solution.solution_subgroups[subgroup_id]['subgroup']
        a_subgroup : SolutionSubgroup = report_attempt.solution.solution_subgroups[subgroup_id]['subgroup']

        threads_subgroup_master : dict = m_subgroup.equation_threads # type: ignore
        threads_subgroup_attempt : dict = a_subgroup.equation_threads # type: ignore
        
        threads_score = {}
        for m_thread_id, m_thread in threads_subgroup_master.items():
            threads_score[m_thread_id] = {}
            for a_thread_id, a_thread in threads_subgroup_attempt.items():
                threads_score[m_thread_id][a_thread_id] = {
                    "score": 0,
                    "matched_equations": {

                    },
                }

                # thread compare by label only, commence
                # prototype: don't record points, just print for now.
                last_point_of_comparison = 0
                for m_equation in m_thread:
                    for a_equation in a_thread[last_point_of_comparison:]:
                        if report_master.get_equation_name(m_equation) == report_attempt.get_equation_name(a_equation):
                            # we have found an equation that matches what we're trying to do.
                            if False:
                                print(m_equation, a_equation, "---")
                            if False:
                                print(m_equation, report_master.summary[m_equation])
                                print(a_equation, report_attempt.summary[a_equation])    
                                print("Found the right label")
                            # time to try and match the variable values
                            # if you spot errors, then you know early estimate of
                            # point of error
                            # number of matched variables is the score
                            m_variables = report_master.get_equation_variables(m_equation)
                            a_variables = report_attempt.get_equation_variables(a_equation)
                                
                            if False:
                                print("\n\nList of variables in equation")
                                print("Master variables")
                                print(m_variables.keys())
                                print("Attempt variables")
                                print(a_variables.keys())
                            
                            dict_variable_check = {}
                            for (k_m, k_a) in zip(m_variables.keys(), a_variables.keys()):
                                if False:
                                    print('master')
                                m_value, m_unit = report_master.get_box_value_unit(
                                    k_m, 
                                    report_master.get_object_workspace_id(k_m), False) # type: ignore
                                
                                if False:
                                    print('attempt')
                                a_value, a_unit = report_attempt.get_box_value_unit(
                                    k_a, 
                                    report_attempt.get_object_workspace_id(k_a), False) # type: ignore
                                
                                dict_variable_check[(k_m, k_a)] = compare_quantities(
                                    m_magn=float(m_value),
                                    m_unit=m_unit,
                                    a_magn=float(a_value),
                                    a_unit=a_unit,
                                    )
                                if False:
                                    print(dict_variable_check[(k_m, k_a)])

                                # if values are calculated, then they care indexed by the internal variable name (eg: x_y),
                                # not the variable box name (eg: wk1_XYZ_N_M_term).
                                # this value is compared as is using compare_quantities()
                                # for parameters, param name is enough, and check for sign.
                                # if parameter was tampered with/other value was manually used, that is compared separately.
                                if False:
                                    print("====")
                            
                            # increase the score for the thread based on this, move on
                            # or note the error, and stop
                            if False:
                                print(f"match:{sum([_ for k,_ in dict_variable_check.items()])} out of {len(dict_variable_check)}")
                                if all([_ for k,_ in dict_variable_check.items()]):
                                    print("it was a match")
                                else:
                                    print("there was an error")
                            
                            # score of success for a thread for ID check is the sum of 
                            # match scores for each equation that we got.
                            # NOTE: This must be bookkept
                            score = sum([_ for k,_ in dict_variable_check.items()]) \
                                / (len(dict_variable_check))

                            threads_score[m_thread_id][a_thread_id]['score'] += score
                            threads_score[m_thread_id][a_thread_id]['matched_equations'][(m_equation, a_equation)] = score
                            last_point_of_comparison = a_thread.index(a_equation)+1
                            break
                    if False:
                        print(" ")
                        # compare equation boxes, including the results computed
    
                if debug:
                    print("====> After label check phase")
                    print("Show thread scores")
                    pprint(threads_score[m_thread_id][a_thread_id])
                    print()
                
                # thread compare by reduced forms, but only on a per-thread basis.
                # find the equations that reduce and match structurally
                # and/or functionally. BUT check only for equations in between
                # subsegments/endpoints of a given thread, i.e. either
                # 1. between two anchor points of label matched equations
                # 2. between start of thread and an anchor point
                # 3. between an anchor point and a thread.
                # bifurcations in threads are compared later
                # in a different stage, after these have been marked off.
                
                # gather up all reduced equations in subsegments
                m_reduce_subthread = {} # format: { (start_subthread_eqn, end_subthread_eqn): substituted reduced equation object }
                start_subthread_eqn = None
                end_subthread_eqn = None
                reduced_equation = None
                for m_equation in m_thread:
                    if m_equation not in [_[0] for _ in threads_score[m_thread_id][a_thread_id]['matched_equations']]:
                        if debug:
                            print(m_equation,"in m_thread was not matched")
                            parameterized_equation = report_master.rewrite_with_params(
                                m_equation,
                                m_subgroup.get_equation_object_unfolded(m_equation)
                                )
                            print("after subs==>", parameterized_equation)
                            target_var = m_subgroup.get_dag_outgoing_var(m_equation)
                            print("using new variable", target_var)
                            print("rewritten", change_equation_subject(parameterized_equation, target_var))
                        
                        # 1. fetch the current equation and rewrite it using parameters and assoc variables only.
                        parameterized_equation = report_master.rewrite_with_params(
                                m_equation,
                                m_subgroup.get_equation_object_unfolded(m_equation)
                                )
                        # 2. Rewrite it using the variable being solved for as subject.
                        target_var = m_subgroup.get_dag_outgoing_var(m_equation)

                        # EITHER this is the first equation in the series of unmatched equations 
                        # that need to be reduced, in which case just assign it, 
                        # OR this is another equation, just substitute it into the current equation,
                        # rewrite it using the variable, and continue.
                        if reduced_equation == None:
                            reduced_equation = change_equation_subject(parameterized_equation, target_var)
                        else:
                            new_reduced_equation = substitute_equation(
                                source_eq=parameterized_equation,
                                var=m_subgroup.get_dag_incoming_var(m_equation),
                                target_eq=reduced_equation # type: ignore
                            )
                            reduced_equation = change_equation_subject(new_reduced_equation, target_var) # type: ignore
                        
                        if False:
                            print("From",report_master.solution.solution_subgroups[subgroup]['subgroup'].get_equation_object_unfolded(m_equation))
                            print("Using",report_master.solution.solution_subgroups[subgroup]['subgroup'].get_dag_outgoing_var(m_equation))
                            print("To:",
                                report_master.solution.solution_subgroups[subgroup]['subgroup'].get_equation_object_unfolded(
                                    report_master.solution.solution_subgroups[subgroup]['subgroup'].get_next_thread_equation(m_equation)
                                )
                            )
                            print(substitute_equation(
                                source_eq   = report_master.solution.solution_subgroups[subgroup]['subgroup'].get_equation_object_unfolded(m_equation),
                                var         = report_master.solution.solution_subgroups[subgroup]['subgroup'].get_dag_outgoing_var(m_equation),
                                target_eq   = report_master.solution.solution_subgroups[subgroup]['subgroup'].get_equation_object_unfolded(
                                    report_master.solution.solution_subgroups[subgroup]['subgroup'].get_next_thread_equation(m_equation)
                                    )
                            ))
                        
                    else:
                        if start_subthread_eqn == None:
                            # then we haven't started looking at any intermediate equations, store new start point
                            start_subthread_eqn = m_equation
                        else:
                            # either the matched equation marks the start of a segment that can be reduced,
                            # or marks the end of one.
                            end_subthread_eqn = m_equation
                            m_reduce_subthread[(start_subthread_eqn, end_subthread_eqn)] = reduced_equation
                            # reset for beginning
                            reduced_equation = None
                            start_subthread_eqn = None
                            end_subthread_eqn = None
                        pass
                    pass
                
                # at the end, if we have reduced equation sequence that went 
                # all the way to the end of a thread without a closing equation.
                if end_subthread_eqn != None and reduced_equation != None:
                    m_reduce_subthread[(start_subthread_eqn, end_subthread_eqn)] = reduced_equation

                if debug:
                    print("\n\n===> After reduction, found the following subsegments in reduced form in m_thread")
                    pprint(m_reduce_subthread)
                    print("These should be compared.")

                if debug:
                    print()
                
                # gather up all reduced equations in subsegments
                a_reduce_subthread = {} # format: { (start_subthread_eqn, end_subthread_eqn): substituted reduced equation object }
                start_subthread_eqn = None
                end_subthread_eqn = None
                reduced_equation = None
                for a_equation in a_thread:
                    if a_equation not in [_[1] for _ in threads_score[m_thread_id][a_thread_id]['matched_equations']]:
                        if debug:
                            print(a_equation,"in a_thread was not matched")
                            new_equation = report_attempt.rewrite_with_params(
                                a_equation,
                                a_subgroup.get_equation_object_unfolded(a_equation)
                                )
                            print("after subs==>", new_equation)
                            new_var = a_subgroup.get_dag_outgoing_var(a_equation)
                            print("using new variable", new_var)
                            print("rewritten", change_equation_subject(new_equation, new_var))
                        
                        # 1. fetch the current equation and rewrite it using parameters and assoc variables only.
                        parameterized_equation = report_attempt.rewrite_with_params(
                                a_equation,
                                a_subgroup.get_equation_object_unfolded(a_equation)
                                )
                        # 2. Rewrite it using the variable being solved for as subject.
                        target_var = a_subgroup.get_dag_outgoing_var(a_equation)

                        # EITHER this is the first equation in the series of unmatched equations 
                        # that need to be reduced, in which case just assign it, 
                        # OR this is another equation, just substitute it into the current equation,
                        # rewrite it using the variable, and continue.
                        if reduced_equation == None:
                            reduced_equation = change_equation_subject(parameterized_equation, target_var)
                        else:
                            new_reduced_equation = substitute_equation(
                                source_eq=parameterized_equation,
                                var=a_subgroup.get_dag_incoming_var(a_equation),
                                target_eq=reduced_equation # type: ignore
                            )
                            reduced_equation = change_equation_subject(new_reduced_equation, target_var) # type: ignore
                        
                        if False:
                            print("From",report_attempt.solution.solution_subgroups[subgroup]['subgroup'].get_equation_object_unfolded(a_equation))
                            print("Using",report_attempt.solution.solution_subgroups[subgroup]['subgroup'].get_dag_outgoing_var(a_equation))
                            print("To:",
                                report_attempt.solution.solution_subgroups[subgroup]['subgroup'].get_equation_object_unfolded(
                                    report_attempt.solution.solution_subgroups[subgroup]['subgroup'].get_next_thread_equation(a_equation)
                                )
                            )
                            print(substitute_equation(
                                source_eq   = report_attempt.solution.solution_subgroups[subgroup]['subgroup'].get_equation_object_unfolded(a_equation),
                                var         = report_attempt.solution.solution_subgroups[subgroup]['subgroup'].get_dag_outgoing_var(a_equation),
                                target_eq   = report_attempt.solution.solution_subgroups[subgroup]['subgroup'].get_equation_object_unfolded(
                                    report_attempt.solution.solution_subgroups[subgroup]['subgroup'].get_next_thread_equation(a_equation)
                                    )
                            ))
                        pass
                    
                    else:
                        if start_subthread_eqn == None:
                            # then we haven't started looking at any intermediate equations, store new start point
                            start_subthread_eqn = a_equation
                        else:
                            # either the matched equation marks the start of a segment that can be reduced,
                            # or marks the end of one.
                            end_subthread_eqn = a_equation
                            a_reduce_subthread[(start_subthread_eqn, end_subthread_eqn)] = reduced_equation
                            # reset for beginning
                            reduced_equation = None
                            start_subthread_eqn = None
                            end_subthread_eqn = None
                        pass
                    pass
                
                # at the end, if we have reduced equation sequence that went 
                # all the way to the end of a thread without a closing equation.
                if end_subthread_eqn != None and reduced_equation != None:
                    a_reduce_subthread[(start_subthread_eqn, end_subthread_eqn)] = reduced_equation

                if debug:
                    print("\n\n===> After reduction, found the following subsegments in reduced form in a_thread")
                    pprint(a_reduce_subthread)
                    print("These should be compared.")

                if debug:
                    print("")
                
                if debug:
                    # randomly testing a pair of equations in each to see if they
                    # work with the expression tree code.
                    ExpressionTree(
                        report_context=report_master,
                        expression=list(m_reduce_subthread.values())[0]
                        ).print_dot() # this works
                    ExpressionTree(
                        report_context=report_attempt,
                        expression=list(a_reduce_subthread.values())[0]
                        ).print_dot() # this works
                
                # NEWS NEWS NEWS: 
                # NOTE: There exists functionality in SymPy to let you directly and quickly 
                # compare two equations structurally (for how it's laid out, and not symbolically, 
                # which involves evaluating the expressions). 
                # This is achieved by calculating a hash and then comparing the hashes.
                # For our purposes, we can use this, problem being how to account for the assoc variables.
                # An option: if the assoc variables have the same value, we treat them as 
                # temporary parameters with some temporary names (eg: tempParam1), substitute to create
                # temporary copies of the equations, and calculate hashes of those.
                # Checking for assocs - see if the assoc variable has an equation corresponding to it,
                # and if that equation appears in the matched nodes table. If so, it's alright.
                # problem - how to calculate score for this one?
                # true or false match can't be used to decide which thread is correct, scores 
                # might be too similar and random choice might yield problems.
                # check parameters to see which has greater overlap? - use that as score, if the match fails.
                # specificity check is performed afterwards.
                
                for m_endpoints, m_subthread in m_reduce_subthread.items():
                    if False:
                        print("in master",m_endpoints, m_subthread)
                        print("are the endpoints in matched_equations?")
                        for _ in threads_score[m_thread_id][a_thread_id]['matched_equations']:
                            print(_[0],"in", m_endpoints)
                            if _[0] in m_endpoints:
                                print("found it")
                                                
                    for a_endpoints, a_subthread in a_reduce_subthread.items():
                        if False:
                            print("in attempt",a_endpoints, a_subthread)
                            print("are the endpoints in matched_equations?")
                            print([
                                _ for _ in threads_score[m_thread_id][a_thread_id]['matched_equations']
                                if _[1] in a_endpoints
                                ])
                        # NOTE FINISH THIS BY TONIGHT SO YOU CAN REPORT SOME ERRORS
                        # START WRITING TOMORROW< LECTURE FIRST THEN PAPER
                        
                        if debug:
                            print("leaf level terms in",m_subthread)

                            collector = {}

                            def collect_terms(equation, collection):
                                if len(equation.args) == 0:
                                    if len(str(equation).split('_')) == 2:
                                        collection[equation] = report_master.get_variable_assoc_value(str(equation))
                                else:
                                    for arg in equation.args:
                                        collect_terms(arg, collection)

                            collect_terms(m_subthread, collector) # type: ignore
                            print(collector)



                # compare the reduced equation sets
                # look for whether their start or end points match with matched equations or not
                # this can include ones that have null start or end points

                #TODO: for pair in m_reduce_subthread X a_reduce_subthread :
                    # compare endpoints
                    # NOTE: format must be (m_eq_id_num, a_eq_id_num) for the matched_equations dictionary.
                    # if we find any endpoint pair keys which match, i.e. 
                    # for start endpoint of reduced subsegment: m_eq_id_num, a_eq_id_num show up in matched equations
                    # for end endpoint of reduced subsegment: m_eq_id_num, a_eq_id_num show up in matched equations
                        # then we can compare them using ExpressionTree
                        # record the amount of overlap.
                        # also account for how many parameters were used, and if end result
                        # answer was same or not, but this is ONLY IF the expression tree doesn't match exactly.
                        #
                        # NOTE: for subtree, add feature in ExpressionTree to compare functionally if
                        # number of parameters matches barring some additional dimensionless constant
                        # and otherwise sets are the same.


    # now we pick the threads with the most ID check comparisons
    # and check for equations that might match for reduced-form checking.

    # === reduced form checking ===
    # NOTE: Currently, we do this under the assumption that
    # the ID check establishes anchor points that can then be used to
    # check for reduced forms efficiently.
    # worst case scenario - this reduces to reducing and checking the whole
    # DAG when no equations were matched the last time, which may or may not work
    # and will definitely reduce ability to pin-point errors, even though it should be feasible.
    #
    # TODO: Find a way to do check for reduced forms in parallel to ID checking
    # (i.e. without depending on ID check to establish anchors first)
    # by taking candidate threads, matched/unmatched nodes, and going from that
    # to increase/decrease scores.
    #
    # PROCESS: Find equation nodes that are in between two possible anchor points
    # obtained from ID checking, reduce them in order to a single equation, then
    # compare the reduced forms. Do this for all sub-segments you can find,
    # calculate percentage match scores and add that to the thread scores.
    # NOTE: For equations in a thread that go back to equations in a preceding
    # thread and are all unmatched, reduce them all to the point.
    #
    # Strategy: Find the sub-threads. If they are between anchor points,
    # it's an easier job. Reduce all equations between the two points,
    # then compare the reduced forms for a score.
    # If next anchor point for a subsegment isn't in the same thread
    # but in a succeeding thread (from convergence), then reduce into that and keep going
    # until you reach the anchor point in that thread. (this becomes like a BFS)
    # Keep going until you reach absolute end of thread, or an anchor point.
    # Anything with some match in dict threads_score.
    
    """
    This code was moved and placed into the nested loop above.
    """

    # score each thread based on matched nodes (even with the intermediate errors)
    # pick the pairs with the highest match. These are fixed.

    # Now we re-trace the correct pairs of corresponding threads
    # to properly write our errors.

    # ERROR ID phase

    # === label checking === ---> this has been identified already, in CORRECT ID phase?
    # Go through named equations the matched threads (max score)
    # for named equations in the master thread, find equations in attempt thread
    # that show up earlier in the order.
    # Critera - the values will probably not match, and we've already marked
    # the correct equations/close to correct equations in order anyway, these are errors.
    # so report as "<eq> needed to be solved later."
    # maybe add a similar routine for equations that should be solved earlier but were
    # actually solved later, ID those as "<eq> needed to be solved earlier"
    # only for named/non Arithmetic equations that can be identified.

    # === reduced form checking ===
    # start squashing nodes in between to compound nodes by substitution of equations
    # limit: these have to live between other matching points
    # compare these squashed nodes to each other, see what matches and what doesn't.
    # heuristics - start from a point, keep going until the differences exceed.
    # eg: you had one error, error kept going down, then went up.
    # just before the point of going up, that's the last point of match. Squash
    # and reduce till then and compare with the other.
    # (how to do this for DAGs?)

    return

def dag_compare_new(report_master: ReportContext, report_attempt: ReportContext, debug=False) -> dict:
    """
    Cleaned up version of dag_compare to correspond to writeup
    """
    if debug:
        print("Inside workflows.py: dag_compare()")
        print("Show solution box")
        print(report_attempt.dict_solution_box)
        print("Show subgroups")
        for _, dict_subgroups in {
            'master': report_master.solution.solution_subgroups,
            'attempt': report_attempt.solution.solution_subgroups
        }.items():
            print(_)
            for subgroup in dict_subgroups:
                print(subgroup)
                for k, thread in dict_subgroups[subgroup]['subgroup'].equation_threads.items():
                    print(k, thread)

    # check which solution subgroups are submitted
    # and therefore can be properly compared
    # Accordingly, create pairs of all the subgroups in master and attempt to compare.
    # dictionary - key by ID, store references to pairs
    # use the key to identify and report on errors afterwards.

    list_subgroups_to_test = []
    for subgroup in report_master.solution.solution_subgroups:
        checklist = {
            # ternary operator shorthand, see [geeksforgeeks]/ternary-operator-in-python/#Ternary%20Operator%20using%20Tuple
            # basically, sets it to False if it's absent, True for anything else but absent
            # opposite of intuition, false value first, then true value
            soln_id: report_attempt.dict_solution_box[soln_id].description != SOLUTION_STATUS.absent
                for soln_id in subgroup.split(",")
        }
        if debug:
            print(subgroup.split(","))
            print(subgroup, checklist)
        if all(checklist.values()):
            print(f'{subgroup} can be compared')  if debug else None
            list_subgroups_to_test.append(subgroup)
            subgroup_details[subgroup] = {
                # more details to be added later
                "pairs" : {
                    # adds all the thread pairs, which are then evaluated.
                    # metadata for all thread pairs is also stored.
                }, 
                "matches" : { 
                    # adds all the matched equations and equation clusters, with scores for later reference
                    # basically adds all mappings in both ways for lookup
                    # "m2a": { }, # dedicated, maps all master equations to attempt equations for faster look up
                    # "a2m": { } # dedicated, maps all attempt equations to master equations for faster look up 
                },
                "errors" : {
                    # dedicated entry to store all errors in this subgroup,
                    # usually filtered out of matches based on score, stores additional information.
                }
            }
    
    # cleaning up, the identifier subgroup can be confusing unless cleared up
    del subgroup # type: ignore
    
    for subgroup_id in list_subgroups_to_test:
        # NOTE: perhaps it might help to hold permanent references to the subgroups here
        # and refer to them later, instead of the extended references.
        # TODO: Change the code elsewhere as well to simplify, reduce references and function calls
        m_subgroup : SolutionSubgroup = report_master.solution.solution_subgroups[subgroup_id]['subgroup']
        # No checks required here, since it's already taken care of before.
        a_subgroup : SolutionSubgroup = report_attempt.solution.solution_subgroups[subgroup_id]['subgroup']

        threads_subgroup_master : dict = m_subgroup.equation_threads # type: ignore
        threads_subgroup_attempt : dict = a_subgroup.equation_threads # type: ignore

        # process all threads to find IDs to create entries in subgroup_details first.
        for mtid in threads_subgroup_master:
            for atid in threads_subgroup_attempt:
                subgroup_details[subgroup_id]['pairs'][(mtid,atid)] = {
                    'score': 0, 
                    'metadata': {
                        'matched_label_equations': {},
                        'matched_reduced_equations': {}
                        }
                    }
                
        for pair in subgroup_details[subgroup_id]['pairs']:
            if debug:
                print("===============> THREADS BEING CHECKED ARE")
                print(pair)

            # Label-based comparison of equations, storing metadata
            label_score, matched_pairs_scores_dict = compare_label(
                report_master, report_attempt,
                (
                    threads_subgroup_master[pair[0]],
                    threads_subgroup_attempt[pair[1]]
                    )
                ,
                subgroup_id
            )
            subgroup_details[subgroup_id]['pairs'][pair]\
                ['metadata']['matched_label_equations'] = matched_pairs_scores_dict

            # Reduced form comparison of equations in threads, storing metadata
            reduced_score, matched_clusters_scores_dict = compare_structural_symbolic(
                report_master, report_attempt,
                # (
                #     threads_subgroup_master[pair[0]],
                #     threads_subgroup_attempt[pair[1]]
                #     ),
                # matched_pairs_scores_dict,
                # m_subgroup,
                # a_subgroup
                pair,
                subgroup_id,
                matched_pairs_scores_dict
            )
            subgroup_details[subgroup_id]['pairs'][pair]\
                ['metadata']['matched_reduced_equations'] = matched_clusters_scores_dict

            # this needs to be right at the end, adding up all scores
            subgroup_details[subgroup_id]['pairs'][pair]['score'] = \
                label_score + reduced_score

        # Picking the maximal matching threads in the subgroup
        
        dict_max_score_M_first = {
            _: subgroup_details[subgroup_id]['pairs'][_]
            for _ in {(m_key, max([
                a_key[1] for a_key 
                in (filter(lambda y: y[0] == m_key, 
                        list(subgroup_details[subgroup_id]['pairs'].keys())))
                ], key = lambda y: subgroup_details[subgroup_id]['pairs'][(m_key, y)]['score']))
            for m_key in {x[0] for x in subgroup_details[subgroup_id]['pairs']}}
        }

        dict_max_score_A_first = {
            _: subgroup_details[subgroup_id]['pairs'][_]
            for _ in {(max([
                m_key[0] for m_key 
                in (filter(lambda y: y[1] == a_key, 
                        list(subgroup_details[subgroup_id]['pairs'].keys())))
                ], key = lambda y: subgroup_details[subgroup_id]['pairs'][(y, a_key)]['score']
                ), a_key)
            for a_key in {x[1] for x in subgroup_details[subgroup_id]['pairs']}}
        }

        for m_pair in dict_max_score_M_first:
            if m_pair in dict_max_score_A_first:
                subgroup_details[subgroup_id]['matches'][m_pair] = dict_max_score_M_first[m_pair]
        
        for a_pair in dict_max_score_A_first:
            if a_pair in dict_max_score_M_first:
                subgroup_details[subgroup_id]['matches'][a_pair] = dict_max_score_A_first[a_pair]

    if debug or True:
        print("\nSubgroup details summary")
        pprint(subgroup_details)
    
    return subgroup_details
        
def compare_label(
    report_master: ReportContext, 
    report_attempt: ReportContext, 
    thread_pair_tuple: tuple,
    subgroup_id: str,
    debug=False):
    """
    Internal function, uses the global scope object to get the threads, compare them,
    then record score and similarities. Differences are collected later.
    """

    # Get the solution subgroups for more information (mostly the DAG)
    m_subgroup : SolutionSubgroup = report_master.solution.solution_subgroups[subgroup_id]['subgroup']
    a_subgroup : SolutionSubgroup = report_attempt.solution.solution_subgroups[subgroup_id]['subgroup']

    m_thread, a_thread = thread_pair_tuple
    thread_label_match_score=0.0
    thread_label_match_pairs={}

    # thread compare by label only, commence
    # prototype: don't record points, just print for now.
    last_point_of_comparison = 0
    for m_equation in m_thread:
        for a_equation in a_thread[last_point_of_comparison:]:
            if report_master.get_equation_name(m_equation) == report_attempt.get_equation_name(a_equation):
                # we have found an equation that matches what we're trying to do.
                if debug:
                    print(m_equation, a_equation, "---")
                if debug:
                    print(m_equation, report_master.summary[m_equation])
                    print(a_equation, report_attempt.summary[a_equation])    
                    print("Found the right label")
                
                # time to try and match the variable values
                # if you spot errors, then you know early estimate of
                # point of error
                # number of matched variables is the score
                m_variables = report_master.get_equation_variables(m_equation)
                a_variables = report_attempt.get_equation_variables(a_equation)
                
                if debug:
                    print("\n\nList of variables in equation")
                    print("Master variables")
                    pprint(sorted(m_variables.keys()))
                    print("Attempt variables")
                    pprint(sorted(a_variables.keys()))
                
                # We do a check to see if the incoming variable and outgoing variables match
                # in case the labels match exactly
                
                m_incoming = sorted([
                    report_master.get_variable_box_name(
                        report_master.get_assoc_equation_box_id(m_equation, mvar)
                        )
                    for mvar in m_subgroup.get_dag_incoming_var(m_equation)
                    ]) # type: ignore
                a_incoming = sorted([
                    report_attempt.get_variable_box_name(
                        report_attempt.get_assoc_equation_box_id(a_equation, avar)
                        )
                    for avar in a_subgroup.get_dag_incoming_var(a_equation)
                    ]) # type: ignore
                
                m_outgoing = sorted([
                    report_master.get_variable_box_name(
                        report_master.get_assoc_equation_box_id(m_equation, mvar)
                        )
                    for mvar in m_subgroup.get_dag_outgoing_var(m_equation)
                    ]) # type: ignore
                a_outgoing = sorted([
                    report_attempt.get_variable_box_name(
                        report_attempt.get_assoc_equation_box_id(a_equation, avar)
                        )
                    for avar in a_subgroup.get_dag_outgoing_var(a_equation)
                    ]) # type: ignore
                if debug:
                        print("M, A")
                        print("incoming",m_incoming,a_incoming)
                        print("outgoing",m_outgoing,a_outgoing)
                if  m_incoming == a_incoming and m_outgoing == a_outgoing:
                    if debug:
                        print("These matched just fine")
                        # and nothing happens, we just continue processing
                else:
                    # otherwise, we should compare these two, so skip this one
                    if debug:
                        print("Right equation label, but not used in the right place")
                    continue
                
                # If we reach here, we're good to compare and continue
                dict_variable_check = {}
                dict_variable_errors = {}

                for (k_m, k_a) in zip(
                    sorted(m_variables.keys()), 
                    sorted(a_variables.keys())
                    ):
                    
                    # We do a check to exclude incoming and outgoing variables
                    # as applicable
                    # NOTE: Lists of strings are matched per item and in order
                    # AT THIS POINT, we know that the incoming and outgoing variables match exactly
                    # We just have to decide when to count them for scoring and when not to.
                    # Rule: ONLY discard outgoing variables for intermediate equations in a path.
                    # (DEBATABLE) IF it's the first equation in a path,
                    # (DEBATABLE) THEN count the incoming variables for calculating score.
                    # outgoing variable is the dependent one, incoming variables and params are independent
                    # ONLY independents scores determine correctness, if structure is the same 
                    # (which is the case for label matching), so always discount outgoing variables
                    
                    if debug:
                        print(k_m, k_a)

                    k_m_assoc = [
                        assoc_id 
                        for assoc_id in report_master.summary 
                        if "locations" in report_master.summary[assoc_id] and k_m in report_master.summary[assoc_id]["locations"]
                        ]
                    k_a_assoc = [
                        assoc_id 
                        for assoc_id in report_attempt.summary 
                        if "locations" in report_attempt.summary[assoc_id] and k_a in report_attempt.summary[assoc_id]["locations"]
                        ]

                    if len(k_m_assoc) > 0 and k_m_assoc[0] in m_subgroup.get_dag_outgoing_var(m_equation) \
                    and len(k_a_assoc) > 0 and k_a_assoc[0] in a_subgroup.get_dag_outgoing_var(a_equation) :
                        if debug:
                            print(f"variable removed from {m_equation} is {k_m}")
                            print(f"variable removed from {a_equation} is {k_a}")
                        continue
                    
                    # NOTE: This one is heavily debatable, look at this later
                    # elif not m_subgroup.is_first_equation_in_thread(m_equation) \
                    # and not a_subgroup.is_first_equation_in_thread(a_equation) \
                    # and k_m in m_subgroup.get_dag_incoming_var(m_equation) \
                    # and k_a in a_subgroup.get_dag_incoming_var(a_equation) :
                    #     continue
                    
                    if debug:
                        print('master')
                    m_value, m_unit = report_master.get_box_value_unit(k_m)
                        # k_m, 
                        # report_master.get_object_workspace_id(k_m), False) # type: ignore
                    
                    if debug:
                        print('attempt')
                    a_value, a_unit = report_attempt.get_box_value_unit(k_a)
                        # k_a, 
                        # report_attempt.get_object_workspace_id(k_a), False) # type: ignore
                    
                    actual_decision = compare_quantities(
                        m_magn=float(m_value),
                        m_unit=m_unit,
                        a_magn=float(a_value),
                        a_unit=a_unit,
                        )
                    
                    sign_ignored_decision = compare_quantities(
                        m_magn=abs(float(m_value)),
                        m_unit=m_unit,
                        a_magn=abs(float(a_value)),
                        a_unit=a_unit,
                        )
                    
                    if debug:
                        print(float(m_value),m_unit,float(a_value),a_unit)
                        print(f"actual match?: {actual_decision}")
                        print(f"sign ignored match?: {sign_ignored_decision}")
                    
                    if actual_decision and sign_ignored_decision:
                        dict_variable_check[(k_m, k_a)] = 1.0
                    elif not actual_decision and sign_ignored_decision:
                        dict_variable_check[(k_m, k_a)] = 0.5
                        # change this to store the error also
                        dict_variable_errors[(k_m, k_a)] = ERROR_TYPE.sign_error
                        
                    else:
                        dict_variable_check[(k_m, k_a)] = 0.0
                        # this just means the variable boxes did not match at all
                        # additionally, track if this was from a box with an output from
                        # a previous result
                        if len(k_a_assoc) > 0 and k_a_assoc[0] in a_subgroup.get_dag_incoming_var(a_equation) :
                            # TEST THIS LATER
                            dict_variable_errors[(k_m, k_a)] = ERROR_TYPE.parameter_prev_error_no_match
                        else:
                            dict_variable_errors[(k_m, k_a)] = ERROR_TYPE.parameter_no_match

                    # if values are calculated, then they care indexed by the internal variable name (eg: x_y),
                    # not the variable box name (eg: wk1_XYZ_N_M_term).
                    # this value is compared as is using compare_quantities()
                    # for parameters, param name is enough, and check for sign.
                    # if parameter was tampered with/other value was manually used, that is compared separately.
                    if debug:
                        print("====")
                
                # increase the score for the thread based on this, move on
                # or note the error, and stop
                if debug:
                    print(f"match:{sum([_ for k,_ in dict_variable_check.items()])} out of {len(dict_variable_check)}")
                    if all([_ for k,_ in dict_variable_check.items()]):
                        print("it was a match")
                    else:
                        print("there was an error")
                
                # score of success for a thread for ID check is the sum of 
                # match scores for each equation that we got.
                # NOTE: This must be bookkept
                score = (sum([_ for k,_ in dict_variable_check.items() if _>0]) + 1.0) \
                    / (len(dict_variable_check) + 1.0) # ensures that we leave out the outgoing variables.
                    # also, + 1.0 to to numerator and denominator ensures we reward finding a compatible labeled equation.
                
                # see algorithm in paper for justification
                # these are the generic equations that even with slight modifications can make
                # direct comparison impossible/inexact, so we defer these to a later time.
                if report_master.get_equation_name(m_equation) in ["add2","sub","mult","div"] \
                    and score < 1.0:
                    break

                thread_label_match_score += score
                thread_label_match_pairs[(m_equation, a_equation)] = {
                    "score": score,
                    "errors": dict_variable_errors
                }
                last_point_of_comparison = a_thread.index(a_equation)+1
                break
        if debug:
            print(" ")
            # compare equation boxes, including the results computed

    if debug:
        print("====> After label check phase")
        print("Show thread scores")
        pprint(thread_label_match_score)
        print()
    
    return thread_label_match_score, thread_label_match_pairs

def compare_structural_symbolic(
    report_master: ReportContext, 
    report_attempt: ReportContext, 
    # thread_pair_tuple: tuple,
    # matched_label_pairs_scores_dict: dict,
    # master_subgroup
    thread_pair_id_tuple: tuple,
    subgroup_id: str,
    matched_label_pairs_scores_dict: dict,
    debug=False):
    """
    Internal function, uses the global scope object to get the threads, compare them,
    then record score and similarities. Differences are collected later.

    NOTE: This one compares structurally and symbolically as applicable

    matched_label_pairs_scores_dict: dict
        pairs of equations that matched using labeled comparison 
        in the label comparison stage, used to determine start 
        and end of subsequences to be used for structural/symbolic
        comparison of equations by merging.
    """
    
    # Get the solution subgroups for more information (mostly the DAG)
    m_subgroup : SolutionSubgroup = report_master.solution.solution_subgroups[subgroup_id]['subgroup']
    a_subgroup : SolutionSubgroup = report_attempt.solution.solution_subgroups[subgroup_id]['subgroup']

    # Fetching the threads in question
    m_thread = m_subgroup.equation_threads[thread_pair_id_tuple[0]] # type: ignore
    a_thread = a_subgroup.equation_threads[thread_pair_id_tuple[1]] # type: ignore

    # Fetching DAGs in question
    m_dag_dep : DependencyDAG = m_subgroup.dag_dep # type: ignore
    a_dag_dep : DependencyDAG = a_subgroup.dag_dep # type: ignore
    
    # m_thread, a_thread = thread_pair_tuple
    thread_reduced_match_score=0.0
    thread_reduced_match_clusters={}

    # restarting
    if debug:
        print("Entering symbolic/structural comparison phase")
        print(m_thread, a_thread)

    # Find all subsequences that aren't matched 
    # in the thread_pair_tuple information
    # Since the equation mapping from m_thread to a_thread is 1-1,
    # iterating over m_thread is enough to find starting and ending points.
    # And because of the same reason, unmatched sequences in between these 
    # sentinel points are going to either match or not.
    
    unmatched_subseq_pairs_list = []
    # start_index = 0
    # end_index = -1

    # (DEPRECATED) THIS IS INCORRECT!!!!
    # # if debug:
    # #     print(list(map(
    # #     lambda eq: eq in map(lambda _:_[0], matched_label_pairs_scores_dict), 
    # #     m_thread
    # # )))
    # for eq_status in list(map(
    #         lambda eq: eq in map(lambda _:_[0], matched_label_pairs_scores_dict), 
    #         m_thread
    #     ))+[True]:
    #     # The deliberate True at the end is to force a subsequence to close 
    #     # especially if it is the last item in the thread
    #     if eq_status:
    #         if end_index > 0:
    #             # You have reached the end of a subsequence, mark and store this
    #             unmatched_subseq_pairs_list.append(
    #                 (
    #                     m_thread[start_index: end_index+1],
    #                     a_thread[start_index: end_index+1] # TODO: This is wrong!!! FIX THIS!!!!
    #                 )
    #             )
    #             end_index = -1
    #         start_index += 1
    #     else:
    #         if end_index < 0:
    #             end_index = start_index
    #         else:
    #             end_index += 1
    
    # if debug:
    #     print(unmatched_subseq_pairs_list)

    # all_subsequences = []
    m_start_index = -1
    a_start_index = -1
    bool_started_subseq = False
    
    for m_eq_index in range(len(m_thread)):
        broke_out = False
        for a_eq_index in range(len(a_thread)):
            if debug:
                print(m_eq_index, a_eq_index)
            
            if (m_thread[m_eq_index], a_thread[a_eq_index]) in matched_label_pairs_scores_dict:
                if debug:
                    print("found a match")
                
                # if you have already started mapping a subsequence
                if bool_started_subseq:
                    print("ending one subsequence to start another") if debug else None
                    m_subseq = m_thread[m_start_index+1:m_eq_index]
                    a_subseq = a_thread[a_start_index+1:a_eq_index]
                    unmatched_subseq_pairs_list.append((m_subseq, a_subseq))
                    print(m_subseq, a_subseq) if debug else None
                    bool_started_subseq = False
                
                # placed outside, since either
                # 1. we are progressing the subsequence starting point gradually
                # because we can't find start of parallel subsequences yet
                # 2. we just finished looking at the end of parallel subsequences
                # and need to reset (alternates between match, no match, match; 
                # that's how we find an unmatched parallel subsequence)
                m_start_index = m_eq_index
                a_start_index = a_eq_index
                
                print("moving the next starting point to") if debug else None
                print(m_start_index,a_start_index) if debug else None

                broke_out = True
                break
        
        if not broke_out:
            print("found no other a_eqn to match with m_eqn, time to start/continue a subsequence") if debug else None
            bool_started_subseq = True

    if bool_started_subseq:
        # then we need to end this current subsequence
        # that hasn't been closed off
        m_subseq = m_thread[m_start_index+1:len(m_thread)]
        a_subseq = a_thread[a_start_index+1:len(a_thread)]
        unmatched_subseq_pairs_list.append((m_subseq, a_subseq))

    # AT THIS POINT:
    # We have tuples of lists of equation wkX_Y IDs that were 
    # unmatched using label comparison, and pairs of subsets 
    # of these equations when reduced/substituted will match 
    # with each other for symbolic comparison

    # TESTING: Find all the input and output terms computed
    # for each equation. Make sure that params and computed terms
    # received from other equations are counted separately

    for m_subseq, a_subseq in unmatched_subseq_pairs_list:
        if debug:
            print("\nMaster subsequence")
            print(m_subseq)
            print("Attempt subsequence")
            print(a_subseq)

        # Step 1: Calculating input and output overlaps for subsequences
        dict_input_overlap = dict()
        dict_output_overlap = dict()

        m_eq_id, a_eq_id = "", ""

        for m_eq_id in m_subseq:
            # assuming that there is only one outgoing var, which is the case
            # for equations in a subsequence that isn't the last one
            # (if it is the last one, it's getting left as is) 
            if len(m_subgroup.get_dag_outgoing_var(m_eq_id)) == 1:
                m = CurrentEquation(
                    report_master.rewrite_with_parameters(m_eq_id),
                    report_master,
                    m_subgroup.get_dag_outgoing_var(m_eq_id)[0]
                    )
            else:
                # default reduced form
                m = CurrentEquation(
                    report_master.rewrite_with_parameters(m_eq_id),
                    report_master
                    )

            for a_eq_id in a_subseq:
                if debug:
                    print(m_eq_id, a_eq_id)

                if len(a_subgroup.get_dag_outgoing_var(a_eq_id)) == 1:
                    a = CurrentEquation(
                        report_attempt.rewrite_with_parameters(a_eq_id),
                        report_attempt,
                        a_subgroup.get_dag_outgoing_var(a_eq_id)[0]
                        )
                else:
                    a = CurrentEquation(
                        report_attempt.rewrite_with_parameters(a_eq_id),
                        report_attempt,
                        )
                
                if debug:
                    print(f"{m_eq_id}: {m.show_equation()} \n\
                        {m.get_leaf_units()} \n\
                        {m.get_subject_units()}")
                    print(f"{a_eq_id}: {a.show_equation()} \n\
                        {a.get_leaf_units()} \n\
                        {a.get_subject_units()}")
                    print("=======")

                # Calculating overlap of input variables
                dict_input_overlap[(m_eq_id, a_eq_id)] = {
                    "equations": {
                        "m": m,
                        "a": a,
                    },
                    "input_overlap": {
                        m_param : [
                            a_param for a_param, a_unit in a.get_leaf_units().items() \
                                if is_unit_compatible(m_unit, a_unit)
                            ]
                        for m_param, m_unit in m.get_leaf_units().items()
                    }
                }
                
                # Filter out the params for which no corresponding items were found
                dict_input_overlap[(m_eq_id, a_eq_id)]\
                    ["input_overlap"] = {
                        k:v for k,v in dict_input_overlap[(m_eq_id, a_eq_id)]["input_overlap"]\
                        .items() if len(v) > 0
                    }
                
                # Making it so that if there is no overlap, there is not entry at all
                # TODO: See if this is rational or not
                if len(dict_input_overlap[(m_eq_id, a_eq_id)]["input_overlap"]) == 0:
                    del dict_input_overlap[(m_eq_id, a_eq_id)]
                        
                # Calculating overlap of output variables
                
                # if m_dag_dep.nodes[m_eq_id]["thread-next"] != None \
                # and a_dag_dep.nodes[a_eq_id]["thread-next"] != None:
                if not m.is_equation_canonical() and \
                not a.is_equation_canonical():
                    if is_unit_compatible(m.get_subject_units(), a.get_subject_units()):
                        dict_output_overlap[(m_eq_id, a_eq_id)] =  {
                            "equations": {
                                "m": m,
                                "a": a,
                            },
                        }
                        dict_output_overlap[(m_eq_id, a_eq_id)]["output_overlap"] = {
                            str(m.subject) : str(a.subject)
                        }

        del m_eq_id, a_eq_id # type: ignore

        if debug:
            print("Input overlaps: ")
            pprint(dict_input_overlap)
            print("Output overlaps: ")
            pprint(dict_output_overlap)

        # Step 2: Finding borders of sub-subsequences to compare and score
        
        # Picking up from after calculating the input and output overlaps

        m_recent_start : int = 0
        a_recent_start : int = 0

        # Code below should be inside a while loop, that checks to see
        # If m_recent start or a_recent_start reached the end or not
        while \
            m_recent_start < len(m_subseq) and \
            a_recent_start < len(a_subseq):

            if debug:
                print("=====>>>>>>")
                print("New iteration, starting new subsubsequence search")
                print("=====>>>>>>")

            # Initialize the new subsub start and end points
            m_subsub_start : int = -1
            a_subsub_start : int = -1
            
            m_subsub_end : int = -1
            a_subsub_end : int = -1

            # Stretching the input overlaps to cover lowest ends first
            # TODO: Later, optimize to combine these two loops,
            # TODO: they just need to be one loop filtering out by recent_start points
            for m_eq_posn in range(m_recent_start, len(m_subseq)):
                m_input_overlaps : list = [
                    (m,a) for m,a in dict_input_overlap \
                        if m == m_subseq[m_eq_posn] \
                        and a_subseq.index(a) >= a_recent_start
                    ]
                for m_temp,a_eq_id in m_input_overlaps:
                    if a_subsub_start == -1 and m_subsub_start == -1:
                        # these would both be set at the same time
                        # if they were both None, meaning no input overlap set
                        # yet, looking for them still
                        a_subsub_start = a_subseq.index(a_eq_id)
                        m_subsub_start = m_eq_posn
                    elif a_subseq.index(a_eq_id) < a_subsub_start:
                        # If the start point a_substart changes, it changes for both
                        # m and a equations. 
                        a_subsub_start = a_subseq.index(a_eq_id)
                        m_subsub_start = m_eq_posn
                        
            for a_eq_posn in range(a_recent_start, len(a_subseq)):
                a_input_overlaps : list = [
                    (m,a) for m,a in dict_input_overlap \
                        if a == a_subseq[a_eq_posn] \
                        and m_subseq.index(m) >= m_recent_start
                    ]
                for m_eq_id, a_temp in a_input_overlaps:
                    if m_subsub_start == -1 and a_subsub_start == -1:
                        # these would both be set at the same time
                        # if they were both None, meaning no input overlap set
                        # yet, looking for them still
                        a_subsub_start = a_eq_posn
                        m_subsub_start = m_subseq.index(m_eq_id)

                    elif m_subseq.index(m_eq_id) < m_subsub_start:
                        # If the start point a_substart changes, it changes for both
                        # m and a equations. 
                        a_subsub_start = a_eq_posn
                        m_subsub_start = m_subseq.index(m_eq_id)

            # del m_eq_id, a_eq_id, m_temp, a_temp

            # Ensure that input bound of subsubequence exist first
            # Either they'll both be set or they'll both be unset
            if m_subsub_start == -1 and a_subsub_start == -1:
                if debug:
                    print("ERROR: breaking out since no START to a SUBsubsequence could be found")
                break
            if debug:
                print(f"SUCCESS: START to a SUBsubsequence could be FOUND at {m_subsub_start} {a_subsub_start}")

            # If not here, then adjusting subsub_start points further will not give us anything
            # new either. Abandon and abort loop, no more subsubs to find.
            # TODO: This logic can probably be moved out of the loop,
            # TODO: since this means that there are no input overlaps we can find
            # TODO: so continuing this step would be moot, we might as well
            # TODO: ditch the effort of finding reducible subsubsequences for this.
            # OR, it serves its purpose here, since the recent_start points change,
            # Which means for the remaining subsequence, at a later time, there
            # may not be any more input overlaps left, in which case break out.
            # Outside the loop => there aren't any to begin with, which is a corner case.
            # At most one can move this to the start of the loop to quit first,
            # Or just go through the steps and then see if we found anything.
            
            # Stretching the output overlaps to cover upper ends next
            for m_eq_posn in range(m_subsub_start,len(m_subseq)):
                # find output overlaps with all equations
                # that show up AFTER the start of this subsubsequence,
                # i.e. that can mark the end of this subsubsequence
                m_output_overlaps : list = [
                    (m,a) for m,a in dict_output_overlap \
                        if m == m_subseq[m_eq_posn] \
                        and a_subseq.index(a) >= a_subsub_start
                    ]
                for m_temp, a_eq_id in m_output_overlaps:
                    if a_subsub_end == -1 and m_subsub_end == -1:
                        # these would both be set at the same time
                        # if they were both None, meaning no output overlap set
                        # yet, looking for them still; Otherwise, we have found 
                        # a definite end for the subsub so far
                        a_subsub_end = a_subseq.index(a_eq_id)
                        m_subsub_end = m_eq_posn
                    elif a_subseq.index(a_eq_id) < a_subsub_end:
                        a_subsub_end = a_subseq.index(a_eq_id)
                        m_subsub_end = m_eq_posn
            
            for a_eq_id in range(a_subsub_start, len(a_subseq)):
                # find output overlaps with all equations
                # that show up AFTER the start of this subsubsequence,
                # i.e. that can mark the end of this subsubsequence
                a_output_overlaps : list = [
                    (m,a) for m,a in dict_output_overlap \
                        if a == a_subseq[a_eq_posn] \
                        and m_subseq.index(m) >= m_subsub_start
                    ]
                for m_eq_id, a_temp in a_output_overlaps:
                    if m_subsub_end == -1 and a_subsub_end == -1:
                        # these would both be set at the same time
                        # if they were both None, meaning no output overlap set
                        # yet, looking for them still; Otherwise, we have found 
                        # a definite end for the subsub so far
                        a_subsub_end = a_eq_posn
                        m_subsub_end = m_subseq.index(m_eq_id)

                    elif m_subseq.index(m_eq_id) < m_subsub_end:
                        a_subsub_end = a_eq_posn
                        m_subsub_end = m_subseq.index(m_eq_id)

            # END of finding the opener and first-candidate-closer of the 
            # subsubsequence, proceeding to updating them

            # BUT FIRST
            # ====Updating pointers at the end of the iteration====
            # Before updating the starting points, make sure that we have found a 
            # subsequence here. This means in both M and A paths, we found 
            # subsequences with definite start and end points.
            if m_subsub_end == -1 and a_subsub_end == -1:
                if debug:
                    print("ERROR: breaking out since no END to a SUBsubsequence could be found")
                break
            if debug:
                print(f"SUCCESS: END to a SUBsubsequence could be FOUND at {m_subsub_end} {a_subsub_end}")
            
            # Otherwise, do other things but also
            #    # m_recent_start = m_subsub_end+1
            #    # a_recent_start = a_subsub_end+1

            # initializing m_subsub_eq for substitutions
            if len(m_subgroup.get_dag_outgoing_var(m_subseq[m_subsub_start])) == 1:
                m_subsub_eq = CurrentEquation(
                    report_master.rewrite_with_parameters(m_subseq[m_subsub_start]),
                    report_master,
                    m_subgroup.get_dag_outgoing_var(m_subseq[m_subsub_start])[0]
                    )
            else:
                # default reduced form
                m_subsub_eq = CurrentEquation(
                    report_master.rewrite_with_parameters(m_subseq[m_subsub_start]),
                    report_master
                    )
            
            # initializing a_subsub_eq for substitutions
            if len(a_subgroup.get_dag_outgoing_var(a_subseq[a_subsub_start])) == 1:
                a_subsub_eq = CurrentEquation(
                    report_attempt.rewrite_with_parameters(a_subseq[a_subsub_start]),
                    report_attempt,
                    a_subgroup.get_dag_outgoing_var(a_subseq[a_subsub_start])[0]
                    )
            else:
                # default reduced form
                a_subsub_eq = CurrentEquation(
                    report_attempt.rewrite_with_parameters(a_subseq[a_subsub_start]),
                    report_attempt
                    )

            # time to merge the equations up to this point before stretching the end point
            # any further.
            # NOTE: for multiple outgoing variables as in the case of simultaneous
            # NOTE: equations, this would be a corner case where it's at the end of a path
            # NOTE: This loop (and the next one) would never run to begin with.
            for m_index in range(m_subsub_start+1,m_subsub_end+1):
                m_out_var = m_subgroup.get_dag_outgoing_var(m_subseq[m_index-1])[0]
                m_subsub_eq.substitute_into_equation(
                    report_master.rewrite_with_parameters(m_subseq[m_index]),
                    m_out_var
                    )
                m_subsub_eq.change_equation_subject(
                    m_subgroup.get_dag_outgoing_var(m_subseq[m_index])[0]
                    )
            
            for a_index in range(a_subsub_start+1,a_subsub_end+1):
                a_out_var = a_subgroup.get_dag_outgoing_var(a_subseq[a_index-1])[0]
                a_subsub_eq.substitute_into_equation(
                    report_attempt.rewrite_with_parameters(a_subseq[a_index]),
                    a_out_var
                    )
                a_subsub_eq.change_equation_subject(
                    a_subgroup.get_dag_outgoing_var(a_subseq[a_index])[0]
                    )

            if debug:
                print("Current limits of subsubsequence before stretching endpoint")
                print(f"m_subsub endpoints are {m_subseq[m_subsub_start]} -> {m_subseq[m_subsub_end]}")
                print(f"M: {m_subsub_eq.show_equation()}, p(M):{\
                    m_subsub_eq.get_leaf_units()}, out(M):{m_subsub_eq.get_subject_units()}")
                print(f"a_subsub endpoints are {a_subseq[a_subsub_start]} -> {a_subseq[a_subsub_end]}")
                print(f"A: {a_subsub_eq.show_equation()}, p(A):{\
                    a_subsub_eq.get_leaf_units()}, out(A):{a_subsub_eq.get_subject_units()}")

            # NOTE: same as above, this loop will also not run in case of
            # NOTE: singleton equations like in case of simultaneous equations.
            
            # for m_eq_posn in range(m_subsub_end+1, len(m_subseq)):
            #     for a_eq_posn in range(a_subsub_end+1, len(a_subseq)):
                    # if (
                    #     m_subseq[m_eq_posn], a_subseq[a_eq_posn]
                    # ) in dict_output_overlap:
            # UPDATING the end point and conditional to ensure that 
            # some overlap with the current candidate is also considered
            # without just considering the most recent subsub_end only.
            # only consider updates, if either or both endpoints move.
            # if they are both the same, do not change.
            # this is probably only true for the very first scenario to be honest.
            for m_eq_posn in range(m_subsub_end, len(m_subseq)):
                for a_eq_posn in range(a_subsub_end, len(a_subseq)):
                    if debug:
                        print("what ranges are we looking at")
                        print(f"M:{(m_subsub_end, m_eq_posn, len(m_subseq))}")
                        print(f"A:{(a_subsub_end, a_eq_posn, len(a_subseq))}")
                        print((
                            m_subseq[m_eq_posn], a_subseq[a_eq_posn]
                        ) in dict_output_overlap,
                        not (m_eq_posn == m_subsub_end and a_eq_posn == a_subsub_end))
                    
                    if (
                        m_subseq[m_eq_posn], a_subseq[a_eq_posn]
                    ) in dict_output_overlap \
                    and not (m_eq_posn == m_subsub_end and a_eq_posn == a_subsub_end):
                        
                        if debug:
                            print("Candidate for stretching endpoint")
                            print(f"m_subsub endpoints are {m_subseq[m_subsub_start]\
                                                            } -> {m_subseq[m_eq_posn]}")
                            print(f"a_subsub endpoints are {a_subseq[a_subsub_start]\
                                                            } -> {a_subseq[a_eq_posn]}")
                            pprint(dict_output_overlap[(m_subseq[m_eq_posn], a_subseq[a_eq_posn])])
                        
                        # create a copy, and merge everything up to this equation
                        # then, look at set difference between input unit set
                        # of original vs copy.
                        # any change ==> not to include this.
                        copy_m_subsub_eq = deepcopy(m_subsub_eq)
                        copy_a_subsub_eq = deepcopy(a_subsub_eq)

                        # start using copy_* equations only from this point on
                        # until you get to set symmetric difference for units
                        if debug:
                            print("stacking m_index equations now")
                            print(f"on top of {m_subsub_eq.show_equation()}")
                        for m_index in range(m_subsub_end+1, m_eq_posn+1):
                            m_out_var = m_subgroup.get_dag_outgoing_var(m_subseq[m_index-1])[0]
                            if debug:
                                print(f"Currently stacking {m_subseq[m_index]} {\
                                    report_master.rewrite_with_parameters(m_subseq[m_index])}")
                                print(f"with output: {m_out_var}")

                            copy_m_subsub_eq.substitute_into_equation(
                                report_master.rewrite_with_parameters(m_subseq[m_index]),
                                m_out_var
                                )
                            if debug:
                                print("now rewriting to the corresponding output variable")
                                print(f"{m_subgroup.get_dag_outgoing_var(m_subseq[m_index])}")
                            copy_m_subsub_eq.change_equation_subject(
                                m_subgroup.get_dag_outgoing_var(m_subseq[m_index])[0]
                                )
                        
                        if debug:
                            print("stacking m_index equations now")
                        for a_index in range(a_subsub_end+1, a_eq_posn+1):
                            a_out_var = a_subgroup.get_dag_outgoing_var(a_subseq[a_index-1])[0]
                            if debug:
                                print(f"Currently stacking {a_subseq[a_index-1]}")
                                print(f"with output: {a_out_var}")

                            copy_a_subsub_eq.substitute_into_equation(
                                report_attempt.rewrite_with_parameters(a_subseq[a_index]),
                                a_out_var
                                )
                            copy_a_subsub_eq.change_equation_subject(
                                a_subgroup.get_dag_outgoing_var(a_subseq[a_index])[0]
                                )
                        
                        if debug:
                            print("Looking at combined equation copy so far")
                            print(f"m_subsub endpoints are {m_subseq[m_subsub_start]\
                                                            } -> {m_subseq[m_eq_posn]}")
                            print(
                                f"M: {copy_m_subsub_eq.show_equation()}, \
                                p(M):{copy_m_subsub_eq.get_leaf_units()}")
                            print(f"a_subsub endpoints are {a_subseq[a_subsub_start]\
                                                            } -> {a_subseq[a_eq_posn]}")
                            print(
                                f"A: {copy_a_subsub_eq.show_equation()}, \
                                p(A):{copy_a_subsub_eq.get_leaf_units()}")
                        
                        # Set symmetric difference from previous
                        aA = a_subsub_eq.get_leaf_units()
                        aB = copy_a_subsub_eq.get_leaf_units()
                        mA = a_subsub_eq.get_leaf_units()
                        mB = copy_a_subsub_eq.get_leaf_units()
                        
                        # TODO: fix this calculation, it is incorrect currently
                        # a_set_difference = {k: aA[k] if k in aA else aB[k] for k in
                        #             set(aA.keys()).symmetric_difference(aB.keys())}
                        # m_set_difference = {k: mA[k] if k in mA else mB[k] for k in
                        #             set(mA.keys()).symmetric_difference(mB.keys())}
                        
                        a_set_difference = dict()
                        for aAterm in aA:
                            if len([
                                aBterm for aBterm in aB
                                if is_unit_compatible(aB[aBterm], aA[aAterm])
                                ]) == 0:
                                a_set_difference[aAterm] = None
                        for aBterm in aB:
                            if len([
                                aAterm for aAterm in aA
                                if is_unit_compatible(aB[aBterm], aA[aAterm])
                                ]) == 0:
                                a_set_difference[aBterm] = None
                        
                        m_set_difference = dict()
                        for mAterm in mA:
                            if len([
                                mBterm for mBterm in mB
                                if is_unit_compatible(mB[mBterm], mA[mAterm])
                                ]) == 0:
                                m_set_difference[mAterm] = None
                        for mBterm in mB:
                            if len([
                                mAterm for mAterm in mA
                                if is_unit_compatible(mB[mBterm], mA[mAterm])
                                ]) == 0:
                                m_set_difference[mBterm] = None
                        
                        a_bool_set_difference_exists = len(a_set_difference) > 0
                        m_bool_set_difference_exists = len(m_set_difference) > 0

                        if not a_bool_set_difference_exists \
                            and not m_bool_set_difference_exists:
                            a_subsub_eq = copy_a_subsub_eq
                            m_subsub_eq = copy_m_subsub_eq
                            a_subsub_end = a_eq_posn
                            m_subsub_end = m_eq_posn

                        pass
                    else:
                        # thre
                        pass

            m_recent_start = m_subsub_end+1
            a_recent_start = a_subsub_end+1
            
            # calculating similarity score based on tree comparison
            subsub_score, subsub_tree = compare_equations(m_subsub_eq, a_subsub_eq)
            
            if debug:
                print("match score between")
                print(
                    f"M: {m_subsub_eq.show_equation()}")
                print(
                    f"A: {a_subsub_eq.show_equation()}")
                print("the value",subsub_score)
                print("NEXT thread search starts at position:")
                print(m_recent_start, a_recent_start)

            thread_reduced_match_score+=subsub_score
            thread_reduced_match_clusters[(
                (m_subseq[m_subsub_start], m_subseq[m_subsub_end]),
                (a_subseq[a_subsub_start], a_subseq[a_subsub_end]),
            )] = {
                "score": subsub_score,
                "error_metadata": subsub_tree,
                "reduced_equations": {
                    "m": m_subsub_eq,
                    "a": a_subsub_eq
                }
            }
            del subsub_score

            # NOTE: only for debugging single iteration
            # if debug:
            #     break
            

    return thread_reduced_match_score, thread_reduced_match_clusters