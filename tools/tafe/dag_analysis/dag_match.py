import networkx as nx
import sympy

from core.global_objects import *
from core.solution_subgroup import SolutionSubgroup
from expr_tree_analysis.expr_tree import ExpressionTree
from core.report import ReportContext
from core.solutionbox import SOLUTION_STATUS
from core.utils import compare_quantities
from equation_analysis.equations_util import *

from messages.message import MessageText

from pprint import pprint

subgroup_details = {}

def compare_equations(source_eq: Equality, target_eq: Equality, debug=True) -> bool:
    return True

def get_box_value_unit(report, boxid, wkspc, debug): # move into Report class later.
    if debug:
        print("Which variable box:", boxid)
        print("valueSource:", report.summary[boxid]["valueSource"])
        print("valueType:", report.summary[boxid]['valueType'])

    # pulling info, NOTE: assoc, param, solutionBox all have value and unit attributes,
    # manually added parameters don't, so they are treated specially    
    if report.summary[boxid]["valueType"] == 'association':
        if debug:
            print("Value is in ", report.summary[boxid]['value']['var'])
        value = report.json_object['workspaces'][wkspc]['solutionBoxes'][report.summary[boxid]['value']['var']] # move to a function
    
    elif report.summary[boxid]["valueType"] == 'number':
        if report.summary[boxid]["valueSource"]:
            value = report.json_object['parameters'][report.summary[boxid]['valueSource']] # move to a function

        else: # manually entered quantity, had to explicitly pull info
            value = {'value':report.summary[boxid]['value'], 'unit': report.summary[boxid]['currentUnit']} # move to a function
            if debug:
                print("Value is ", report.summary[boxid]['value'], report.summary[boxid]['currentUnit'])
    
    else:
        if debug:
            print("Value is in ", report.summary[boxid]['currentSymbol'])
        value = report.json_object['workspaces'][wkspc]['solutionBoxes'][report.summary[boxid]['currentSymbol']] # move to a function
    
    if debug:
        print("Value is", value['value'], value['unit']) # move to a function
    return (value['value'], value['unit'])

def dag_compare(report_master: ReportContext, report_attempt: ReportContext, debug=True):
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
            print(f'{subgroup} can be compared')
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
        m_subgroup : SolutionSubgroup = report_master.solution.solution_subgroups[subgroup]['subgroup']
        a_subgroup : SolutionSubgroup = report_attempt.solution.solution_subgroups[subgroup]['subgroup']

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
                                m_value, m_unit = get_box_value_unit(
                                    report_master, k_m, 
                                    report_master.get_object_workspace_id(k_m), False) # type: ignore
                                
                                if False:
                                    print('attempt')
                                a_value, a_unit = get_box_value_unit(
                                    report_attempt, k_a, 
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

def dag_compare_new(report_master: ReportContext, report_attempt: ReportContext, debug=True):
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
            soln_id: (True, False)[report_attempt.dict_solution_box[soln_id].status == SOLUTION_STATUS.absent]
                for soln_id in subgroup.split(",")
        }
        if debug:
            print(subgroup, checklist)
        if all(checklist.values()):
            print(f'{subgroup} can be compared')
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
    
    for subgroup_id in list_subgroups_to_test:
        # NOTE: perhaps it might help to hold permanent references to the subgroups here
        # and refer to them later, instead of the extended references.
        # TODO: Change the code elsewhere as well to simplify, reduce references and function calls
        m_subgroup : SolutionSubgroup = report_master.solution.solution_subgroups[subgroup]['subgroup']
        a_subgroup : SolutionSubgroup = report_attempt.solution.solution_subgroups[subgroup]['subgroup']

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
            
            # Label-based comparison of equations, storing metadata
            label_score, matched_pairs_scores_dict = compare_label(
                report_master, report_attempt,
                (
                    threads_subgroup_master[pair[0]],
                    threads_subgroup_attempt[pair[1]]
                    )
            )
            subgroup_details[subgroup]['pairs'][pair]\
                ['metadata']['matched_label_equations'] = matched_pairs_scores_dict

            # Reduced form comparison of equations in threads, storing metadata
            reduced_score, matched_clusters_scores_dict = compare_structural_symbolic(
                report_master, report_attempt,
                (
                    threads_subgroup_master[pair[0]],
                    threads_subgroup_attempt[pair[1]]
                    )
            )
            subgroup_details[subgroup]['pairs'][pair]\
                ['metadata']['matched_label_equations'] = matched_clusters_scores_dict

            # this needs to be right at the end, adding up all scores
            subgroup_details[subgroup]['pairs'][pair]['score'] = \
                label_score + reduced_score

    if debug:
        pprint(subgroup_details)
        

def compare_label(
        report_master: ReportContext, 
        report_attempt: ReportContext, 
        thread_pair_tuple: tuple,
        debug=True):
        """
        Internal function, uses the global scope object to get the threads, compare them,
        then record score and similarities. Differences are collected later.
        """

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
                        m_value, m_unit = get_box_value_unit(
                            report_master, k_m, 
                            report_master.get_object_workspace_id(k_m), False) # type: ignore
                        
                        if False:
                            print('attempt')
                        a_value, a_unit = get_box_value_unit(
                            report_attempt, k_a, 
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

                    thread_label_match_score += score
                    thread_label_match_pairs[(m_equation, a_equation)] = score
                    last_point_of_comparison = a_thread.index(a_equation)+1
                    break
            if False:
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
        thread_pair_tuple: tuple,
        debug=True):
        """
        Internal function, uses the global scope object to get the threads, compare them,
        then record score and similarities. Differences are collected later.

        NOTE: This one compares structurally and symbolically as applicable
        """

        m_thread, a_thread = thread_pair_tuple
        thread_reduced_match_score=0.0
        thread_reduced_match_clusters={}

        
        
        return thread_reduced_match_score, thread_reduced_match_clusters