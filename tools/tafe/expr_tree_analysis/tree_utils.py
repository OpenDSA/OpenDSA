###  HAS BEEN/WILL BE MOVED TO class ExpressionTree in expr_tree.py file

# declaring static variables accessible to all
node_id_map = {
    "Add": (lambda x_node: "+"),
    "Mul": (lambda x_node: "*"),
    "Pow": (lambda x_node: "^"),
    "NegativeOne": (lambda x_node: "-1"),
    "Symbol": (lambda x_node: x_node.name),
    "Integer": (lambda x_node: str(x_node)),
    "Rational": (lambda x_node: str(f"{x_node.as_numer_denom()[0]}/{x_node.as_numer_denom()[1]}")),
    "Float": (lambda x_node: str(round(x_node, 3)))
}

# UTILITY FUNCTIONS FOR WORKING WITH EXPRESSION TREES AND SYMPY EXPRESSIONS

def get_type_from_expression_node(expression_node):
    """
    This is used within ExpressionTree and others to get the type of
    a node in the expression tree as parsed from the sympy.Equality
    expression.
    """

    # return name.split('_')[2] # since we now also have a prefix
    return str(expression_node.func).replace('<','').replace('>','').replace("'",'').split(".")[-1]

# def generateExpressionTree(expr, prefix="default", debug=False):
#     # expr: Sympy expression
    
#     g_exp_tree = nx.Graph()
#     op_id_counter = 0
#     id_maker = {
#         "Add": "+",
#         "Mul": "*",
#         "Pow": "^",
#         "NegativeOne": "-1",
#         "Symbol": "Symbol",
#         "Integer": "Integer",
#         "Rational": "Rational",
#         "Float": "Float"
#     }
#     def get_type_from_id(name):
#         return name.split('_')[2] # since we now also have a prefix
    
#     def walker(exp_node):
#         # If no args then it is Symbol or a number, treat differently.
#         nonlocal op_id_counter
        
#         node_id = prefix+"_"+str(op_id_counter)+"_"+ \
#         str(exp_node.func).replace('<','').replace('>','').replace("'",'').split(".")[-1]
#         op_id_counter+=1
        
#         if not exp_node.args:
#             # Create a Symbol node
#             g_exp_tree.add_node(node_id)
#             if debug:
#                 print("exiting leaf",exp_node.func)
            
#         else:
#             if debug:
#                 print("in head",exp_node.func)
#             g_exp_tree.add_node(node_id)
#             for child in exp_node.args:
#                 child_exp_node_id = walker(child)
#                 g_exp_tree.add_edge(node_id, child_exp_node_id)
#                 g_exp_tree.nodes[child_exp_node_id]['pred'] = node_id
        
#         if debug:
#             print(exp_node, exp_node.func, exp_node.args)
        
#         g_exp_tree.nodes[node_id]['label'] = \
#         exp_node.name if get_type_from_id(node_id) == "Symbol" else \
#         str(exp_node) if get_type_from_id(node_id) == "Integer" else \
#         str(f"{exp_node.as_numer_denom()[0]}/{exp_node.as_numer_denom()[1]}") \
#             if get_type_from_id(node_id) == "Rational" else \
#         str(round(exp_node, 3)) if get_type_from_id(node_id) == "Float" else \
#         id_maker[get_type_from_id(node_id)] if get_type_from_id(node_id) in id_maker \
#         else get_type_from_id(node_id)
#         return node_id
    
#     root = walker(expr)
#     g_exp_tree.nodes[root]['pred'] = None
    
#     return g_exp_tree