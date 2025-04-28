"""
Should this house
ALL the functionality to detect and describe errors in trees
OR only functionality to detect and merge error patterns
and put the translation functionality into message_type.py?
"""

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

