"""
ReportContext class which stores all contextual related to the
master and the attempt solution objects. This is generated
as part of a workflow for both 'training' and 'analyze' modes.

"""

import json
from typing import Union

from sympy import Equality

# from tafe.core.solution import Solution
# from tafe.core.global_objects import *
# from tafe.core.utils import compare_quantities

# from tafe.expr_tree_analysis.expr_tree import ExpressionTree

# from tafe.messages.message import MessageText
# from tafe.messages.messagelist import MessageList

from tools.tafe.core.solution import Solution
from tools.tafe.core.global_objects import *
from tools.tafe.core.utils import compare_quantities

from tools.tafe.expr_tree_analysis.expr_tree import ExpressionTree

from tools.tafe.messages.message import MessageText
from tools.tafe.messages.messagelist import MessageList


class ReportContext:
    def __init__(self, context, json_solution_object):
        # information received from outside
        self.context = {
            "name": context[0],
            "task": context[1],
            "prefix": "m" if context[0] == "master" else "a" if context[0] == "attempt" else "default",
            "filename" : context[2] # to be used for saving any output files generated.
        }

        self.json_object = json_solution_object
        # information generated from json
        self.summary : dict = self.get_unknown_summary(self.json_object)
        
        # stores list of SolutionBoxes shared between report_master and report_attempt
        self.dict_solution_box = {}
        
        # list of all messages to show/return about this ReportContext
        self.message_list = MessageList()
        
        # parameters only used for master solution
        if "master" in self.context:
            self.str_path_to_master = ""
            self.str_path_to_alt_solutions = "" # only applicable when simultaneous systems or trig functions exists
        
        # populating the Solution object will all the information
        # related to the solution itself. Contains the solution boxes
        self.solution = Solution(self)
        
        # Demo proves that extending DiGraph worked!
        # self.tree : ExpressionTree = None
        # self.tree = ExpressionTree(self)
        # self.tree.add_node("a")
        # print(self.tree.nodes())
        
        return
    
    def is_variable_box_id(self, term) -> bool:
        assert term in self.summary

        return len(term.split('_')) == 5 and term[:2] == "wk"
    
    def is_equation_id(self, term) -> bool:
        assert term in self.summary

        return len(term.split('_')) == 4 and term[:2] == "wk"
    
    def is_equation_internal_id(self, term) -> bool:
        assert term in self.summary

        return len(term.split('_')) == 2 and term[:2] == "wk"
        
    def get_unknown_summary(self, json_solution_object, debug=False):
        # self contained, only needs the s
        dict_summary = {}

        if debug:
            print(json_solution_object.keys())
        
        for wk_id, workspace in json_solution_object["workspaces"].items():
            for eq_id, equation in workspace["equations"].items():
                #add mappings to equation numbers
                dict_summary[f"wk{wk_id}_{eq_id}"] = equation['id']
                dict_summary[equation['id']] = f"wk{wk_id}_{eq_id}"

                for varname, variable in equation["variables"].items():
                    if variable["valueType"] == "number":
                        dict_summary[variable["id"]] = variable
                        # ALT logic for below: len(variable["valueSource"].split('_')) > 1
                        if not ("param" in variable["valueSource"] or variable["valueSource"] == ""):
                            # special (not at all uncommon) case:
                            # unknown was calculated from a single variable equation, and then
                            # used in another equation as a parameter. So, it's a number, but 
                            # NOT a param or a custom value; it's like an assoc, just not treated like
                            # it.
                            dict_summary.setdefault(
                            variable["valueSource"], 
                            {
                                "symbol": workspace["solutionBoxes"][variable["valueSource"]]["variableDisplay"],
                                "locations": {variable["id"]}
                            })["locations"].add(variable["id"])
                        
                    elif variable["valueType"] == "association":
                        dict_summary[variable["id"]] = variable
                        dict_summary.setdefault(
                            variable["value"]["var"],
                            {
                                "symbol": variable["value"]['varDisplay'],
                                "locations": {variable["id"]}
                            })["locations"].add(variable["id"])
                    else:  #definitely an unknown
                        dict_summary[variable["id"]] = variable
                        dict_summary.setdefault(
                            variable["currentSymbol"], 
                            {
                                "symbol": variable["symbol_context"]["parentSymbol"],
                                "locations": {variable["id"]}
                            })["locations"].add(variable["id"])
            # Also store pointers to/details of computed solutionboxes
            # index by unknown names and workspaces

        return dict_summary

    def get_equation_name(self, equation_id : Union[str, None], debug = False):
        """
        If the equation name exists in the summary for this specific
        solution approach (master/attempt), it will return the name of the equation
        for it.
        """
        assert equation_id is not None # only for type checker mainly

        if len(equation_id.split('_')) < 2 or len(equation_id.split('_')) > 4:
            raise ValueError

        # If internal ID like wkX_Y
        elif self.is_equation_internal_id(equation_id):
            return self.summary[equation_id].split('_')[1]

        # If fully qualified name, like wkX_actualName_A_B
        elif self.is_equation_id(equation_id):
            return equation_id.split('_')[1]

    def get_object_workspace_id(self, equation_id : Union[str, None], debug = False):
        """
        NOTE: this returns ONLY the workspace NUMBER not wkN full

        This works for:
        whole equation IDs - wkN_name_X_Y
        boxes in equations - wkN_name_X_Y_boxName
        shorthand equation IDs - wkN_Z
        NOT for internal variable IDs of the form x_y (not directly, can pass in a box name)
        (future proof - if IDs become wkN_x_y, then yes)
        """
        assert equation_id is not None # only for type checker mainly

        if 'wk' in equation_id and equation_id.index('wk') == 0:
            return equation_id.split('_')[0].split('wk')[1]
        else:
            return None

    def get_equation_variables(self, equation_id : Union[str, None], debug = False) -> dict:
        """
        If the equation name exists in the summary for this specific
        solution approach (master/attempt), it will return the dictionary of 
        variables in said equation from the summary with objects.
        """
        assert equation_id is not None # only for type checker mainly

        eq_name = self.get_equation_name(equation_id)

        if len(equation_id.split('_')) != 2:
            raise ValueError
        
        elif len(equation_id.split('_')) == 2:
            return {
                key: value for key, value in self.summary.items()
                    if eq_name in key and self.is_variable_box_id(key)
            }
        
        return {}

        # CHECK later to simplify
        # return {
        #     key: value for key, value in self.summary.items()
        #         if eq_name in key and self.is_variable_box_id(key)
        # }
    
    def rewrite_with_params(self, equation_id: Union[str, None], equation, debug=False) -> Equality: # type: ignore
        pass
    
    # rewriting the function from original declaration from above (used in old dag_compare())
    def rewrite_with_parameters(self, equation_id: Union[str, None], debug=False) -> Equality: # type: ignore
        """
        This takes the equation_id inside the submission/attempt,
        replaces each box with either ID of the parameter in it,
        or the unknown association, or leaves the box as it is.
        If the box is a target being solved for and has no association,
        (i.e. it will end up with a solution box, which has x_y var id)
        replace it with that var id.
        """

        # TODO: move into subgroups, to return a copy of the equation as required.
        assert equation_id is not None

        # NOTE: This was originally needed when used in old dag_compare()
        # dag_compare_new() needs this for equations in g_dep and DAGs, 
        # which uses wkX_Y style ids, so this translation is not required.
        # 
        # if self.is_equation_internal_id(equation_id):
        #     equation_id = self.summary[equation_id]
        # else:
        #     raise KeyError(f"Equation {equation_id} is not found in {self.context["prefix"]}-{self.context["task"]}-{self.context["name"]} ")
        
        # if debug:
        #     print("We're looking for")
        #     print(equation_id)

        # Instead, we throw errors if this is NOT the case
        # And hold on to the equation FULL ID separately
        equation_full_id = None
        if not self.is_equation_internal_id(equation_id):
            raise KeyError(f"Equation {equation_id} is not found in {self.context["prefix"]}-{self.context["task"]}-{self.context["name"]} ")
        else:
            equation_full_id = self.summary[equation_id]
        

        # replace this with looking up an unfolded equation object from the subgroups
        # NOTE: This is different from rewriting a combined equation with parameters
        # TODO: Handled by CurrentEquation?

        for _, subg in self.solution.solution_subgroups.items():
            if debug:
                print(subg["subgroup"].is_equation_in_unfolded_graph(equation_id))
            if subg["subgroup"].is_equation_in_unfolded_graph(equation_id):
                equation = subg["subgroup"].get_equation_object_unfolded(equation_id)
                if debug:
                    print(f"{equation_id} ---> {equation}")

        new_equation = equation
        
        for term in [_ for _ in self.summary if equation_full_id in _ and equation_full_id != _]:
            if debug:
                print("found in",term)
            if self.summary[term]['valueSource'] is not None and "param" in self.summary[term]['valueSource']:
                new_equation = new_equation.subs(term, self.summary[term]['valueSource'])
            # elif self.summary[term]['valueSource'] == "":
            #     # this is a custom inserted quantity
            #     new_equation = new_equation.subs(term, <replace>)

        if debug:
            print("<===< Before", equation)
            print(">==> After", new_equation)
        
        return new_equation

    # functions to add

    # get value of unknown based on variable box
    # get value of unknown based on unknown ID which is combined with wk ID
    # both return magnitude and unit as a tuple

    def get_variable_assoc_value(self, assoc_id, debug=False):
        """
        This is not future proof yet, this assumes that var names stay the same
        across workspaces; we're just using this for now to get the value from the
        solution box inside of the given workspace.
        """
        
        # TODO fix this later when we make the variable names better
        assert assoc_id is not None and len(assoc_id.split('_')) == 2

        if debug:
            print("trying to find the value calculated in",assoc_id)
        
        # first find the workspace that this belongs to, then it's solution box.
        wk_id = self.get_object_workspace_id(
            list(self.summary[assoc_id]['locations'])[0])

        if debug:
            print("workspace id", wk_id)
            print(self.json_object['workspaces'][wk_id]['solutionBoxes'])

        assoc_value = self.json_object['workspaces'][wk_id]['solutionBoxes'][assoc_id]
        
        if debug:
            print(f"value at assoc {assoc_id} is {assoc_value}")
        
        return assoc_value
    
    def get_term_quantity(self, term: str):
        """
        This is assuming term is of type string
        """
        if term in self.summary:
            if len(term.split("_")) == 2 and not "wk" in term:
                # This is if it's an assoc x_y or
                # a fixed box in the equation
                return \
                    self.get_variable_assoc_value(term)
            elif self.is_variable_box_id(term):
                # this means it's a term box with a custom added quantity
                # must be carefully handled to return units and value
                return \
                    {
                        "value": self.summary[term]['value'],
                        "unit": self.summary[term]['currentUnit'],
                    }

        elif term in self.json_object['parameters']:
            return \
                self.json_object['parameters'][term]
        else:
            return None
    
    def get_valued_equation(self, equation_rhs, debug=False):
        """
        Replaces the values in the 

        This is not future proof yet, this assumes that var names stay the same
        across workspaces; we're just using this for now to get the value from the
        solution box inside of the given workspace.
        """
        
        # TODO fix this later when we make the variable names better
        assert equation_rhs is not None

        if debug:
            print("Replacing values in",equation_rhs)
    
    def get_assoc_equation_box_id(self, equation_id, assoc_id, debug=False):
        # Given an assoc ID x_y and the equation_id (fully qualified or wkX_Y)
        # that it appears in, find the ID of the box the assoc is connected to
        # since an assoc can be connected to multiple boxes in different equations
        assert equation_id is not None

        if self.is_equation_internal_id(equation_id):
            equation_name = self.summary[equation_id]
        elif self.is_equation_id(equation_id):
            equation_name = equation_id
        else:
            raise ValueError

        return [
            term
            for term in self.summary[assoc_id]['locations']
            if equation_name in term
            ][0]
    
    def get_variable_box_name(self, variable_box_id):
        # This takes a variable box name of the form
        # wkX_name_A_B_term and turns it into name_term
        # to check if the exact term is being referred to
        # in compare_label
        if self.is_variable_box_id(variable_box_id):
            return (lambda s: f"{s[1]}_{s[4]}")(variable_box_id.split("_"))
        else:
            return None

    def get_box_value_unit(self, boxid, wkspc=None, debug=False):
        """
        SPECIAL function for ONLY extracting the value and unit for
        equation boxes; so terms of the type wkX_eq_N_M_term
        """
        wkspc = self.get_object_workspace_id(boxid)
        
        if debug:
            print("Which variable box:", boxid)
            print("valueSource:", self.summary[boxid]["valueSource"])
            print("valueType:", self.summary[boxid]['valueType'])

        # pulling info, NOTE: assoc, param, solutionBox all have value and unit attributes,
        # manually added parameters don't, so they are treated specially    
        if self.summary[boxid]["valueType"] == 'association':
            if debug:
                print("Value is in ", self.summary[boxid]['value']['var'])
            value = self.json_object['workspaces'][wkspc]['solutionBoxes'][self.summary[boxid]['value']['var']] # move to a function
        
        elif self.summary[boxid]["valueType"] == 'number':
            if "param" in self.summary[boxid]["valueSource"]: # it's a parameter from the question
                value = self.json_object['parameters'][self.summary[boxid]['valueSource']] # move to a function
            
            elif len(
                self.summary[boxid]["valueSource"].replace("_","") # without '_ it's just two letters, like x_y for assocs
                ) == 2:
                # it could be a value from a box calculated from an assoc, negated or not, etc.
                # assoc name is given by x_y type names.
                # Value is already to whatever is used for calculation in the equation, just pull that
                # FOR NOW keep this separated, might need additional operations later on.
                value = {'value':self.summary[boxid]['value'], 'unit': self.summary[boxid]['currentUnit']} # move to a function

            else: # manually entered quantity, had to explicitly pull info
                value = {'value':self.summary[boxid]['value'], 'unit': self.summary[boxid]['currentUnit']} # move to a function
                if debug:
                    print("Value is ", self.summary[boxid]['value'], self.summary[boxid]['currentUnit'])
        
        else:
            if debug:
                print("Value is in ", self.summary[boxid]['currentSymbol'])
            value = self.json_object['workspaces'][wkspc]['solutionBoxes'][self.summary[boxid]['currentSymbol']] # move to a function
        
        if debug:
            print("Value is", value['value'], value['unit']) # move to a function
        return (value['value'], value['unit'])

### END OF CLASS

# GENERAL FUNCTIONS FOR ERROR REPORTING
# this works with multiple report objects

