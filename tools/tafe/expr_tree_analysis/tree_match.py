"""
Contains all the functions necessary to match two different expression trees. 
"""

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
                    # may upgrade this to tree isomorphism?
                    # https://networkx.org/documentation/stable/reference/algorithms/isomorphism.html#module-networkx.algorithms.isomorphism.tree_isomorphism
                    
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