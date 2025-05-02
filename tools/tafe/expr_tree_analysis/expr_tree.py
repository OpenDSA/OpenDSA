from networkx import DiGraph, number_connected_components, is_tree, shortest_path_length, neighbors
from networkx.drawing.nx_pydot import to_pydot
from collections import defaultdict
from sympy import Equality

from expr_tree_analysis.tree_utils import *

class ExpressionTree(DiGraph):
    def __init__(self, report_context, expression : Equality):
        # step 1. store the necessary parameters
        self.ref_report_context = report_context
        self.expression = expression

        #step 2. initialize the class variables
        # self.expression_tree = DiGraph()
        super().__init__()
        
        # step 3. other things
        self.create_expression_tree()
        return

    # DISPLAY/DEBUG functions

    def __repr__(self) -> str:
        return str(self.expression)
    
    def __str__(self) -> str:
        return str(self.expression)

    def print_dot(self, full=True, debug=True):
        """
        Prints to DOT format the expression tree (DiGraph)
        for this current ExpressionTree object
        """
        if debug:
            print("here's your graph in DOT format")
        print(to_pydot(self).to_string())
    
    # Membership check functions

    # def is_symbol(g, node_label):
    #     # Receives G.nodes[n] as input
    #     return g.nodes[node_label]['label'].count('_') == 4
    
    def is_symbol(self, node_label):
        # Receives G.nodes[n] as input
        return self.nodes[node_label]['label'].count('_') == 4

    # def is_unknown(g, node_label):
    #     # Receives G.nodes[n] as input
    #     return g.nodes[node_label]['label'].count('_') == 1
    
    def is_unknown(self, node_label):
        # Receives G.nodes[n] as input
        return self.nodes[node_label]['label'].count('_') == 1

    # def get_symbol_label_details(self, exp_tree, symbol_node):
    def get_symbol_label_details(self, symbol_node):
        """This will get rewritten so that it only works with
        the corresponding unknown_summary for a given Solution
        which is parent of Solution_subgroup
        which is parent of the expression tree we are in right now
        i.e. if original Solution was master, then we use its
        unknown summary, which by default would be the master_unknown_summary

        Args:
            exp_tree (_type_): _description_
            symbol_node (_type_): _description_

        Returns:
            _type_: _description_
        """
        # details = master_unknown_summary[exp_tree.nodes[symbol_node]['label']] \
        # if symbol_node.split('_')[0]=='m' \
        # else attempt_unknown_summary[exp_tree.nodes[symbol_node]['label']]
        
        # because summary is already known from the ReportContext object
        details = self.ref_report_context.summary[self.nodes[symbol_node]['label']]
        
        return details

    def get_symbol_quantity(self, symbol_node):
        details = self.ref_report_context.summary[self.nodes[symbol_node]['label']]
        return details['value']

    def get_symbol_current_unit(self, symbol_node):
        details = self.ref_report_context.summary[self.nodes[symbol_node]['label']]
        return details['currentUnit']

    def get_symbol_unit(self, symbol_node):
        return \
            self.get_symbol_quantity(symbol_node)+\
            " "+ \
            self.get_symbol_unit(symbol_node)

    def get_node_parent(self, node_id):# -> str | None:
        """
        Returns the parent of the given node_id
        """
        return (lambda _: next(iter(_)) if len(_)else None)(self.pred[node_id])

    # def generateExpressionTree(expr, prefix="default", debug=False):
    def create_expression_tree(self, show_tree=False, debug=False):
        # expr: Sympy expression
        
        # RECIPE:
        #   To generate the expression tree for any random expression;
        # create the ExpressionTree object with the expression, and then
        # the expression tree as a tree/DiGraph will be automatically available
        # from inside the object.

        op_id_counter = 0
        
        def walker(exp_node):
            # If no args then it is Symbol or a number, treat differently.
            nonlocal op_id_counter
            
            if debug:
                print("Inside walker < create_expression_tree < ExpressionTree < expr_tree.py")
                # print(self.ref_report_context.context["prefix"])
                print(exp_node, exp_node.func, exp_node.args)

            node_type = get_type_from_expression_node(exp_node)
            node_id = self.ref_report_context.context["prefix"]+"_"+str(op_id_counter)+"_"+ node_type
            
            self.add_node(node_id)
            self.nodes[node_id]['type'] = node_type
            self.nodes[node_id]['label'] = node_id_map.get(node_type, (lambda _: node_type))(exp_node)
            
            op_id_counter+=1
            
            if not exp_node.args:
                # Create a Symbol node
                if debug:
                    print("exiting leaf",exp_node.func)
                
            else:
                if debug:
                    print("in head",exp_node.func)
                
                for child in exp_node.args:
                    child_exp_node_id = walker(child)
                    self.add_edge(node_id, child_exp_node_id)

                    # To determine later: have a dedicated field, or calculate as needed?
                    # Or have a dedicated function (<-- current solution)
                    #                     
                    # self.nodes[child_exp_node_id]['pred'] = node_id
                    # assert(next(iter(self.pred[child_exp_node_id])) == self.nodes[child_exp_node_id]['pred'])
            
            return node_id
        
        root = walker(self.expression)
        # self.nodes[root]['pred'] = None
        
        if show_tree:
            assert(is_tree(self))
            print(self.get_node_parent(root))
        
        # TODO: having to set explicity predecessors is a problem, we need to fix this and other issues
        # that arise from using general Graphs and not specifically DiGraphs. 1/15/2024 tasks

        if debug:
            self.print_dot()        

def get_depth_nary_tree(tree, debug=False):
    """
    TODO: update this to find depth for DiGraph instead.
    possibly using shortest path distance to leaf nodes
    
    tree: root node of the tree, NetworkX graph
    
    returns integer or 0
    """
    
    if number_connected_components(tree) > 1:
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

def get_node_height(node, tree, debug=False):
    """
    node: node to calculate height for
    tree: root node of the tree, NetworkX graph
    
    returns integer or 0
    """
    
    if number_connected_components(tree) > 1:
        # don't know which tree to use
        return -1
    
    if not tree.has_node(node):
        return -1
    
    return 1+ shortest_path_length(tree, find_root(tree), node)

def tree_annotator(exp_tree, dep_graph, soln_id, unknown_summary, debug=False):
    # Create dict of nodes by height, process them accordingly

    # NOTE 3/11/2025: Very, very good chance that this has been made 
    # obsolete by the DAG/thread analysis approach. This approach
    # and reduced restrictions on specificity make it unnecessary to add
    # additional information to the nodes about the equations created.
    
    # NOTE 6/7/2024: This might need to be replaced by a routine
    # performed after comparison of trees. Or at the very least, by
    # a routine that goes over the dependency graph as well to 
    # determine what to do. This should definitely live at the 
    # SolutionSubgroup level at least so that it has access to both 
    # the expression trees and the dependency graphs. Also, NOTE it 
    # seems like the only data key created here that is used elsewhere
    # is "substituted", which is 100% what we need to track and the 
    # dependency graph can help us with; and it is used by 
    # construct_phrase_desc_rec() in tree_report() which is currently 
    # inside tree_error.py and definitely needs to be completely redone.

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
                            _ for _ in neighbors(exp_tree,child) 
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
                        shortest_path_length(
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
                        shortest_path_length(
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
