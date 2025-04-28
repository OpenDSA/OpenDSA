from sympy import Equality, Symbol, solve

# TODO: Make dedicated equation class and send functionality to there?
def substitute_equation(source_eq: Equality, var, target_eq: Equality):
    # replace boxes with parameters, leave unknowns as they are
    # so that they can be compared where necessary.
    subs_eq = solve(source_eq, Symbol(var), evaluate=False)
    return Equality(
        target_eq.lhs.subs(var, subs_eq[0]),
        target_eq.rhs.subs(var, subs_eq[0]),
    )

# TODO: Make dedicated equation class and send functionality to there?
def change_equation_subject(source_eq: Equality, var, debug=True):
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
    )

