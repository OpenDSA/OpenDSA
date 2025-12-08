"""
Responsible for utility functions used
to modify and work on the "current equation"
used in the structural/symbolic comparison step
in the DAG analysis/comparison code.
"""

from sympy import Equality, Symbol
from sympy.core.numbers import NegativeOne, Half, Infinity, NegativeInfinity
from pint import Quantity

# from tafe.core.utils import *
# from tafe.equation_analysis.equations_util import *
from core.utils import *
from equation_analysis.equations_util import *

from pprint import pprint

class CurrentEquation:
    def __init__(self, equation_object: Equality, context, target_var=None):
        """
        Constructor receives the sympy.Equality object and the context,
        providing an easy way to connect terms in the equation object
        as they appear in the syntax tree to the actual parameter values.

        This is also done to an extent by the expression_tree_analysis code,
        but we're reducing the footprint here and staying close to sympy's
        internal representation and using that for our algorithms.
        We'll defer to comparison stuff when we end up needing to compare
        large expression trees/do diagnostics.

        -=*>IMPORTANT<*=- RULE OF THUMB:
        The parametrization of the equation inside here stored in 
        base_equation is immutable, i.e. the parameters will not be changed.
        There is no reason to ever change any of the terms in the equation.
        It can only be ever rewritten by changing subject and function
        using change_equation_subject, or substituting another equation
        into it.
        """

        self.base_equation = equation_object
        self.context = context

        # Requirement: 
        # The constructor should automatically rewrite the equation 
        # in y = f(x1,x2,..) format. Or at least, store the
        # original equation object, the modified equation object with
        # format, and the necessary members (subject on LHS, RHS) etc.

        if target_var is None:
            # if no target is provided, reset the subject and function to make it canonical
            self.reset_equation_subject()
        else:
            self.change_equation_subject(target_var)

        pass
    
    def show_equation(self):
        return(f"{self.subject} = {self.function}")

    def get_leaves(self) -> list:
        """
        Returns leaf node terms in the equation/function
        consisting of only the 
        1. parameters used
        2. unknowns computed for/used from other equations
        3. other variable associations for simultaneous systems
        (2 and 3 are both just variable associations)

        Ignores any special constants like NegativeOne, etc.
        (see list from sympy.) Calls internal recursive routine to
        return and add to list of leaves.
        """
        list_of_parameter_leaves: list = []

        def eq_dfs_traverse(eq):
            # print("we are here", eq, eq.func)
            if any([
                    eq.func == _ for _ in [
                        Symbol
                    ]
                ]):
                # NOTE: This line is only to detect which
                # types are parameters, etc.
                # and \
                # all([
                #     not isinstance(eq.func, _) for _ in [
                #         NegativeOne, Exp1, ImaginaryUnit
                #     ]
                # ])
                # print("\t\tFound a leaf node")
                list_of_parameter_leaves.append(eq)
                return
                # return eq.args[0]
            
            # Otherwise, it's an equation we have to traverse through
            for arg in eq.args:
                # print("going through arg",arg, "of", eq)
                eq_dfs_traverse(arg)
        
        eq_dfs_traverse(self.function)
        return list_of_parameter_leaves

    def get_leaf_units(self):
        # This only fetches leaf units for the function part
        # of the equation.
        leaf_units = {}
        for leaf_term in self.get_leaves():
            term_unit = self.context.get_term_quantity(str(leaf_term))["unit"]
            if term_unit != '':
                leaf_units[str(leaf_term)] = term_unit
        
        return leaf_units
    
    def get_subject_units(self):
        if not self.is_equation_canonical():
            return self.get_term_units(self.subject)
        else:
            return None

    def get_term_units(self, term):
        # fetches units for any term in the equation
        return self.context.get_term_quantity(str(term))["unit"]

    def rewrite_subexpression_with_params(self, sub_exp):
        """
        Rewrites the equation in terms of the 
        parameters used in the equation and
        answers computed from other parts of solution
        using the context; i.e. replace terms with base value quantities
        """

        replaced_expression = sub_exp
        leaf_units = {}
        for leaf_term in self.get_leaves():
            term_value_details = self.context.get_term_quantity(str(leaf_term))
            if term_value_details['unit'] == '':
                replaced_expression = replaced_expression.subs(leaf_term, float(term_value_details['value']))
            else:
                redefined_quantity = ureg.Quantity(
                    value=float(term_value_details['value']),
                    units=term_value_details['unit']).to_base_units()        
                replaced_expression = replaced_expression.subs(leaf_term, redefined_quantity.magnitude)

        return replaced_expression
    
    def reset_equation_subject(self):
        self.subject = 0
        self.function = self.base_equation.rhs - self.base_equation.lhs # type: ignore

    def change_equation_subject(self, target_var, debug=False):
        # Basically calls the utility function
        # Lets it handle the work
        self.subject, self.function = \
                (lambda equation: (equation.lhs, equation.rhs))\
                (change_equation_subject(self.base_equation, target_var, debug))
    
    def substitute_into_equation(self, equation_to_add: Equality, var):
        """
        This one substitutes equation_to_add into the CurrentEquation,
        thus modifying the base equation.
        """

        new_equation = substitute_equation(
            source_eq=equation_to_add,
            var=var,
            target_eq=self.base_equation
        )

        self.base_equation = new_equation
        
        # Resetting the subject and function to make it canonical
        self.subject = 0
        self.function = self.base_equation.rhs - self.base_equation.lhs # type: ignore

    def is_equation_canonical(self):
        # If it is in canonical form,
        # then we have not set any subject/set subject to 0 and 
        # moved all terms to one side, which is the case for
        # 1. a brand new equation set up 
        #    without a specified target variable
        # 2. an equation with >=2 target variables, 
        #    like for a simultaneous system.
        return self.subject == 0
    
    def get_number_of_function_nodes(self):
        # Returns the number of internal nodes in
        # the syntax tree for the RHS part of the equation
        return get_number_of_nodes(self.function)
    
def get_leaf_intersection(self):
    """
    Gets the sets of leaves from two equations and their contexts,
    and compares them to find intersection 
    (i.e. checks if the values and units match)
    returns Jaccard coefficient similarity score.
    Different from compare_equation which also checks for
    symbolic equivalence when possible.
    This is only used to determine what equations to merge.
    """
    return 
    
def compare_equations(
        first_equation: CurrentEquation,
        second_equation: CurrentEquation,
        debug=False
        ) -> tuple:
    """
    Compares the equation and returns a dictionary comparing
    of matched nodes with a match score. The score is computed recursively.
    It is not required for both equations to have the same context,
    since in the absence of that we'll just have to use actual value comparison
    """
    
    if debug:
        print("================================")
        print("Entering Tree Comparison routine")
        print(f"M equation: {first_equation.show_equation()}")
        print(f"A equation: {second_equation.show_equation()}")
        print("================================")

    # Not sure why I added this, will re-enable later
    # same_context = False
    # if first_equation.context is second_equation.context:
    #     same_context = True
    # creating an inner function to use
    def compare(m_expr, a_expr, debug=False):
        """
        Recursive routine for comparing two expression trees
        """
        # This is the match score for the subtree at this level.
        # It will be a sum of the match score for the root [1] 
        # and the maximum match score for the children [2].
        # We also accordingly return the matchs for the best scores.
        # Notes:
        # [1] Since the root if an operator might not match while the subexpression might,
        # or it might be an operand, in which case compare and return if its correct.
        # [2] This score should also consider structural 
        # vs symbolic/functional comparison scores
        score=0

        # This stores the scores for matching each pair of subtrees 
        # as returned by the recursive routine.

        dict_pairwise_child_match_scores = {}

        # DEBUG: show all the children from this level
        # and the root node
        if debug:
            print("=========new recursive level=========")
            print(m_expr, a_expr)
            print("master root node:",m_expr.func)
            print("children in master expr:",m_expr.args)
            print("attempt root node:",a_expr.func)
            print("children in attempt expr:",a_expr.args)
        
        # ===== BASE CASE =====

        # If the nodes in m_expr and a_expr are BOTH
        # Symbols, then compare their values directly
        # This is a singleton tree with only Symbols 
        # at the roots, so only return the scores resulting
        # from calculation

        if is_node_leaf(m_expr) and is_node_leaf(a_expr):
            if debug:
                print("AT: BASE case") 

            # TODO: Add code to extract values and compare them
            # TODO: Extract the values using CurrentEquation.get_leaf_units()
            #       This is already an inner function so you should have no 
            #       problems getting the context
            #       Then, use compare_values in utils.py to compare
            
            # STEP 1. They're both parameters, or 
            # They're both computed unknowns from assocs x_y, in which case 
            # you can directly compare them.
            m_value = first_equation.context.\
                get_term_quantity(str(m_expr))
            a_value = second_equation.context.\
                get_term_quantity(str(a_expr))
            
            if debug:
                if m_value is not None and \
                a_value is not None:
                    print(f"{m_value["value"]} {m_value["unit"]} "+\
                            f"vs {a_value["value"]} {a_value["unit"]}")
            
            if m_value is not None and \
            a_value is not None and \
            compare_quantities(
                m_magn=float(m_value["value"]),
                m_unit=m_value["unit"],
                a_magn=float(a_value["value"]),
                a_unit=a_value["unit"]
            ):
                score = 2

                # storing score and metadata for match for error detection later.
                dict_pairwise_child_match_scores = {
                    "score": score,
                    "type": "struct"
                    }
            
            # Otherwise, one of them is not in the system, but shows up
            # AS IS as a quantity in the equation template.
            # This means: it is a dimensionless quantity, most definitely
            # TODO: verify if this is always true 
            # NOTE: it should be, since no equation template has a
            # dimensional quantity in it by default, or anything that would
            # reduce to one in the process. Anything dimensional would always
            # come either from a parameter, or from a computed quantity,
            # even explicitly dimensionless quantities as well
            # eg: r=d/2 from equation, or c=a/b where b=2
            else:
                m_quant = 0
                a_quant = 0
                if m_value is None:
                    m_quant = m_expr
                else:
                    m_quant = float(m_value["value"])
                
                if a_value is None:
                    a_quant = a_expr
                else:
                    a_quant = float(a_value["value"])

                if m_quant - a_quant == 0:
                    if m_value == a_value:
                        # if it's an exact match AND it's a fixed dimensionless
                        # award it as correct. Otherwise, its a symbolic comparison.
                        score = 2
                    else:
                        score = 1
                else:
                    # Otherwise even symbolic comparisons don't work
                    score = 0
                
                # storing score and metadata for match for error detection later.
                dict_pairwise_child_match_scores = {
                    "score": score,
                    "type": "sym"
                    }

        pass
        # ===== RECURSIVE CASE =====
        pass
        # ==SUBTREE ROOT/OPERATOR==
        pass
        # when comparing root nodes, just compare operators
        # unless it's a singleton with NegativeOne like
        # subtractive (*-1) or divisive (^-1) number
        # NOTE: This is true for any nodes that are both operators
        pass
        if is_node_operator(m_expr) and is_node_operator(a_expr):
            score+=2 if m_expr.func == a_expr.func else 0 # (see notes)
            if debug:
                print("inside recursive case")
                print("operator nodes matched at this level")    
            dict_pairwise_child_match_scores[(m_expr.func, a_expr.func)] = score # type: ignore

            # ==SUBTREE CHILDREN/SUBEXPRESSION==
            # ====    Examining them        ====
            # Generate all pairs of children of this parent to compare against.
            # Initialize match scores as well.

            dict_pairwise_child_match_scores["children"] = {}
            dict_children_scores = dict()
            for m_child in m_expr.args:
                for a_child in a_expr.args:
                    # dict_children_scores[(str(m_child), str(a_child))] = 0.0
                    
                    m_expr_valued = first_equation.rewrite_subexpression_with_params(m_child)
                    a_expr_valued = second_equation.rewrite_subexpression_with_params(a_child)
                    
                    # NOT NECESSARY CURRENTLY, ENABLE THIS IF REQUIRED
                    # if m_child.func == Mul and -1 in m_child.args:
                    #     m_expr_valued = -1*m_expr_valued
                    # if a_child.func == Mul and -1 in a_child.args:
                    #     a_expr_valued = -1*a_expr_valued

                    if debug:
                        print(f"\n\n{(m_child, a_child)}")
                        print(f"{(m_expr_valued, a_expr_valued)}")
                        print("result of symbolic comparison for new child pair")
                        print(m_child - a_child, m_child - a_child == 0)
                        print(m_expr_valued - a_expr_valued, m_expr_valued - a_expr_valued == 0)
                    score_sym = 0
                    if m_child - a_child == 0:
                        # THIS IS THE PART THAT DOES
                        # the symbolic comparison, pay heed to this
                        # ATTEMPT 1: only count them half
                        score_sym = 0.5 * (\
                            get_number_of_nodes(m_child) +\
                            get_number_of_nodes(a_child)
                            )
                        if debug:
                            print("symbolic score",score_sym)
                        
                        # ATTEMPT 2: count them half if there is no overlap
                        # Otherwise, count as fraction of leaf overlap
                        # since leaf overlap (cosine) is a good measure of
                        # how close the relationship is
                        # TODO: later

                    score_struct, child_metadata = compare(m_expr=m_child,a_expr=a_child)

                    dict_children_scores[(str(m_child), str(a_child))] = \
                        max([score_struct,score_sym])
                    
                    if score_struct > score_sym:
                        dict_pairwise_child_match_scores["children"][(str(m_child), str(a_child))] = { # type: ignore
                            "type": "struct",
                            "metadata": child_metadata
                        }
                    else:
                        dict_pairwise_child_match_scores["children"][(str(m_child), str(a_child))] = { # type: ignore
                            "type": "sym",
                            "metadata": {
                                "score": score_sym,
                            }
                        }

            if debug:
                print("Pairs of children to compare")
                pprint(dict_children_scores)

            dict_max_match_score = {}

            """
            # Find the pair with the maximum score for each child
            # dict_max_match_score = {
            #     _: dict_children_scores[_]
            #     for _ in {(m_key, max([
            #         a_key[1] for a_key 
            #         in (filter(lambda y: y[0] == m_key, 
            #                 list(dict_children_scores.keys())))
            #         ], key = lambda y: dict_children_scores[(m_key, y)]))
            #     for m_key in {x[0] for x in dict_children_scores}}
            # }
            """

            """
            NOTE: How to deal with conflicting selection for the same node?
            TODO: Find a better solution for this
            NOTE: Current solution:
            NOTE: Calculate the max twice, once along m and then a
            NOTE: Then, along a and then m
            NOTE: Select ONLY those pairs that 
            NOTE: appear in the first AND the second max calculation.
            NOTE: Then it is guaranteed to be symmetric. Otherwise, it isn't.
            NOTE: Meaning, if m picks a as max, a must also pick m as max.
            NOTE: Otherwise, one of them is wrong, ignore that one.
            
            NOTE: It seems to work!!! Symmetric max calc for the win!!!
            THIS is what fixed the issue, repeat for other steps too!!!
            """

            dict_max_score_M_first = {
                _: dict_children_scores[_]
                for _ in {(m_key, max([
                    a_key[1] for a_key 
                    in (filter(lambda y: y[0] == m_key, 
                            list(dict_children_scores.keys())))
                    ], key = lambda y: dict_children_scores[(m_key, y)]))
                for m_key in {x[0] for x in dict_children_scores}}
            }

            dict_max_score_A_first = {
                _: dict_children_scores[_]
                for _ in {(max([
                    m_key[0] for m_key 
                    in (filter(lambda y: y[1] == a_key, 
                            list(dict_children_scores.keys())))
                    ], key = lambda y: dict_children_scores[(y, a_key)]
                    ), a_key)
                for a_key in {x[1] for x in dict_children_scores}}
            }

            for m_pair in dict_max_score_M_first:
                if m_pair in dict_max_score_A_first:
                    dict_max_match_score[m_pair] = dict_max_score_M_first[m_pair]
            
            for a_pair in dict_max_score_A_first:
                if a_pair in dict_max_score_M_first:
                    dict_max_match_score[a_pair] = dict_max_score_A_first[a_pair]
            
            # filtering out the items for which max score is zero
            # since this means despite all comparisons, these items could not be matched to anything
            dict_max_match_score = {
                k:v for k,v in dict_max_match_score.items()
                if v > 0
            }

            score+=sum(
                [dict_max_match_score[_] for _ in dict_max_match_score]
            )
            
            terms_to_delete = [
                non_term for non_term in dict_pairwise_child_match_scores["children"]
                if not non_term in dict_max_match_score
                and not non_term == "node_score"
                ]
            
            for term in terms_to_delete:
                del dict_pairwise_child_match_scores["children"][term]
            
            dict_pairwise_child_match_scores["score"] = score
            
            if debug:
                print("Maximal match score pairs of children")
                pprint(dict_max_match_score)
        
        # NOTE: If both nodes are NOT operators and NOT operands,
        # then we have a level mismatch.
        # This occurs when the equations aren't exact matches.
        # eg: 3.14 vs 22/7 vs 1/arcsin(180)
        # Looks very different. Let the approximate comparison
        # take care of them then 
        # (i.e. subtract values, see difference, return score)
        # based on that
        
        if debug:
            print(f"score is {score}")
        return (score, dict_pairwise_child_match_scores)
    
    # TODO: Divide it by the number of nodes in the expression tree
    # including the operator nodes
    final_score, final_tree = compare(
        first_equation.function, second_equation.function)
    final_score = final_score * 1.0 \
        /  (first_equation.get_number_of_function_nodes() +\
            second_equation.get_number_of_function_nodes())

    if debug:
        print("================================")
        print("FINISHED Tree Comparison")
        print("================================")
        pprint(final_tree)

    return (final_score, final_tree)

    # return {}

