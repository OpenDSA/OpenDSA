"""
This file houses all the error pattern types.
Every pattern has a corresponding method that has the following structure:
i) takes in an error pattern (subgraph from the expression tree)
ii) generates None if the error pattern doesn't fit,
otherwise generates an error message text
(which then gets assigned to a MessageText object by the caller)
"""

# Code snippets to revise and incorporate later on

# from inside run_analysis()
# for the equations from corresponding sets do not match up perfectly
# i.e. missing equation for something in the model solution, or
# multiple equations mapping to the same equation in the model solution.
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

# From run_analysis
# for when thr number 
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