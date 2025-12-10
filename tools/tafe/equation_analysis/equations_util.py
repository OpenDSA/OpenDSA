from sympy import Equality, Symbol, solve

# TODO: Update this to add more root node operations as applicable
from sympy import Mul, Add, Pow

# TODO: Make dedicated equation class and send functionality to there?
def substitute_equation(source_eq: Equality, var, target_eq: Equality) -> Equality:
    # replace boxes with parameters, leave unknowns as they are
    # so that they can be compared where necessary.
    subs_eq = solve(source_eq, Symbol(var), evaluate=False)
    return Equality(
        target_eq.lhs.subs(var, subs_eq[0]),
        target_eq.rhs.subs(var, subs_eq[0]),
    ) # type: ignore

# TODO: Make dedicated equation class and send functionality to there?
def change_equation_subject(source_eq: Equality, var, debug=False):
    """
    Just rewrite source_eq in terms of the above equation.
    """
    if isinstance(var, str):
        var = Symbol(var)

    if debug:
        print(var)
        print(source_eq)
        print(solve(source_eq, var, evaluate=False)[0])

    return Equality(
        var,
        solve(source_eq, var, evaluate=False)[0]
    ) # type: ignore

def is_node_operator(term):
    """
    This checks to see if a node in a sympy expression
    is an operator or an operand

    term: 
        a SymPy expression whose root node is checked
        for operation type
    """

    # if isinstance(term, tuple) and len(term) == 0:
    #     return False
    # else:
    #     return True
    return any([isinstance(term, _) for _ in [Mul, Add, Pow]])
    
def is_node_leaf(term_node):
    # one way to determine if you've reached a leaf/parameter node or not
    # return len(term_node.args) == 0
    return term_node.is_Atom

def get_number_of_nodes(expr):
    return __count_nodes(expr)

def __count_nodes(expr):
    """
    Counts the total number of nodes in a SymPy expression tree.
    Each subexpression, including atoms, is considered a node.
    """
    if expr.is_Atom:
        return 1
    else:
        # Start with 1 for the current expression (the 'func')
        node_count = 1 
        # Recursively count nodes in its arguments
        for arg in expr.args:
            node_count += __count_nodes(arg)
        return node_count
