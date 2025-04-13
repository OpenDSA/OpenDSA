"""
ReportContext class which stores all contextual related to the
master and the attempt solution objects. This is generated
as part of a workflow for both 'training' and 'analyze' modes.

"""

import json
from typing import Union

from sympy import Equality

from core.solution import Solution
from expr_tree_analysis.expr_tree import ExpressionTree
from core.global_objects import *
from messages.message import MessageText
from messages.messagelist import MessageList
from core.utils import compare_quantities

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

        return len(term.split('_')) == 5
    
    def is_equation_id(self, term) -> bool:
        assert term in self.summary

        return len(term.split('_')) == 4
    
    def is_equation_internal_id(self, term) -> bool:
        assert term in self.summary

        return len(term.split('_')) == 2
        
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

        elif self.is_equation_internal_id(equation_id):
            return self.summary[equation_id].split('_')[1]

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
    
    def rewrite_with_params(self, equation_id: Union[str, None], equation, debug=False) -> Equality: # type: ignore
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

        if self.is_equation_internal_id(equation_id):
            equation_id = self.summary[equation_id]
        
        if debug:
            print("We're looking for")
            print(equation_id)
        
        new_equation = equation
        
        for term in [_ for _ in self.summary if equation_id in _ and equation_id != _]:
            if debug:
                print("found in",term)
            if self.summary[term]['valueSource'] is not None and "param" in self.summary[term]['valueSource']:
                new_equation = new_equation.subs(term, self.summary[term]['valueSource'])

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
            print("value at assoc",assoc_id,"is",assoc_value)
        
        return assoc_value
    
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
        

### END OF CLASS

# GENERAL FUNCTIONS FOR ERROR REPORTING
# this works with multiple report objects

