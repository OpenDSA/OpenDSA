"""
Object to store status of an answer box.
The IDs of the boxes themselves are common to both
master and attempt, so we save this status and use this
later to construct message text.

Note to self: this is defined separately, and accessible
to both report_master and report_attempt objects. It will be
primarily set up by compare_solution_boxes() called from workflows.py
AND ONLY used in "analyze" mode, because otherwise we don't need to
check this.
"""

from core.report import ReportContext
from core.utils import compare_quantities
from enum import Enum

SOLUTION_STATUS = Enum('status', ['correct', 'incorrect', 'magnitude', 'alternative', 'absent'])

class SolutionBox:
    
    def __init__(self, id: int, master_solution_box: dict, dict_attempt_solution: dict):
        self.id = id
        self.status = None
        self.description = None # only used to elaborate, use description/enum values
        
        """
        Notes: originally message text was just this
        message_text[soln_id] = {"status": False, "decision": [], "details":[]}
        
        We don't store the text here since we generate this later based on enums
        """
        
        # list of alternatives: used only when match is not found,
        # and other computed values in the workspace have to be scoured to find
        # an alternative the student probably forgot
        self.alternatives = {}
        
        self.compare_box_values(master_solution_box, dict_attempt_solution)
        pass

    def compare_box_values(self, master_solution_box, dict_attempt_solution):
        """Attempts to compare a box in the master solution with its corresponding
        box in the attempt. Works for numeric and string types.
        For string, it either succeeds or fails, and quits
        For numeric types, it either succeeds.
        Otherwise

        Args:
            master_solution_box (_type_): dictionary with infor about box in master
            dict_attempt_solution (_type_): contains all the info about the attempt;
            this is needed to find alternatives in other workspaces that the student
            probably did not submit.
        """
        
        # This is for when solution type is a text or a choice
        if master_solution_box["type"] != "number":
            # check if the exact text matches
            if master_solution_box["solution"] == dict_attempt_solution["solutions"][self.id]["solution"]:
                self.status = True
                self.description = SOLUTION_STATUS.correct
                # message_texts[soln_id] = soln_id
                # message_text[soln_id]["status"] = True
                # message_text[soln_id]["decision"].append(f"Solution {int(soln_id)+1} was correct!")
                return
            else:
                self.status = False
                self.description = SOLUTION_STATUS.incorrect
                # message_text[soln_id]["decision"].append(f"Solution {int(soln_id)+1} was incorrect!")
                return
        else:
            # This is only true if the solution type is number (int/float, generally float)
            
            soln_target_tag = None
            flag_find_alt = False
            
            # If the box was not answered to begin with
            if dict_attempt_solution["solutions"][self.id]["solution"] != None:
                if compare_quantities(
                    float(master_solution_box["solution"]),
                    master_solution_box["unit"],
                    float(dict_attempt_solution["solutions"][self.id]["solution"]),
                    dict_attempt_solution["solutions"][self.id]["unit"]
                ):
                    self.status = True
                    self.description = SOLUTION_STATUS.correct
                    # message_text[soln_id]["decision"]\
                    #     .append(f"Solution {int(soln_id)+1} was correct!")
                    # soln_target_tag = dict_attempt_solution["solutions"][self.id]["source"]
                    return
                
                elif compare_quantities(
                    abs(float(master_solution_box["solution"])),
                    master_solution_box["unit"],
                    abs(float(dict_attempt_solution["solutions"][self.id]["solution"])),
                    dict_attempt_solution["solutions"][self.id]["unit"]
                ):
                    self.status = False
                    self.description = SOLUTION_STATUS.magnitude
                    # message_text[soln_id]["decision"]\
                    #     .append(f"Solution {int(soln_id)+1} magnitude/value was correct! Sign was different.")
                    # soln_target_tag = dict_attempt_solution["solutions"][self.id]["source"]
                    return

                else:
                    """An answer was submitted, but it didn't match fully or in magnitude"""
                    self.status = False
                    self.description = SOLUTION_STATUS.incorrect
                
                # TODO: look at whether to suggest alternative solutions if the right one was calculated
                # and not added correctly, or leave it for None scenario (see below)
                # TODO: Also, see if this needs to be its own status or not. Even if it is,
                # it would be just a novelty.

            else:
                """To get here: the solution is numeric and None, which means nothing was submitted"""
                
                # message_text[soln_id]["status"] = False
                # text = f"Solution {int(soln_id)+1} was incorrect! "
                
                self.status = False
                # This goes through the solution boxes in the solution.
                self.find_alternatives(master_solution_box, dict_attempt_solution)             
                if len(self.alternatives) == 0: # no alternatives were found
                    # text+=f"Seems like the correct answer for Solution {int(soln_id)+1} was not computed at all."
                    self.description = SOLUTION_STATUS.absent
                else:
                    self.description = SOLUTION_STATUS.alternative
                    # text+=f"Seems like the right answer for Solution {int(soln_id)+1} was found here:"
                    # for key, solnbox in soln_target_tag.items():
                    #     message = solnbox["message"]
                    #     sid = solnbox["sid"]
                    #     wk = solnbox["wk"]
                    #     varDisp = solnbox["box"]["variableDisplay"].replace('{','{{').replace('}','}}')
                    #     text+=f"{message} in box no. {sid} in workspace {wk}."
                    #     text+=f"Box computed for {varDisp}"
                    #     text+=f"which connects to the following equations:"
                    #     # attempt_soln_summary[key]
                    #     text+=str(report_attempt.json_object[key])
                
                # message_text[soln_id]["decision"].append(text)
        pass
    
    def find_alternatives(self, master_solution_box, dict_attempt_solution, debug=False):
        
        if debug:
            if dict_attempt_solution["solutions"][self.id]["solution"] != None:
                print("searching for correct alternative",float(master_solution_box["solution"]),
                    master_solution_box["unit"],
                    float(dict_attempt_solution["solutions"][self.id]["solution"]),
                    dict_attempt_solution["solutions"][self.id]["unit"])
            elif dict_attempt_solution["solutions"][self.id]["solution"] == None:
                print("can't find answer at all",float(master_solution_box["solution"]),
                    master_solution_box["unit"])
            
        for wk, wkspace in dict_attempt_solution["workspaces"].items():
            for solved_box_id, solnBox in wkspace["solutionBoxes"].items():
                if master_solution_box["unit"] == solnBox["unit"]:
                    if debug:
                        print(float(master_solution_box["solution"]), solnBox["value"])
                        print(solved_box_id)
                    
                    # DEPRECATED: if float(master_solution_box["solution"]) == float(solnBox["value"]):
                    if compare_quantities(
                        float(master_solution_box["solution"]),
                        master_solution_box["unit"],
                        float(solnBox["value"]),
                        solnBox["unit"]
                    ) :
                        # Exact match
                        self.alternatives[solnBox["variable"]] = {
                            "message": "Exact match found",
                            "sid": solved_box_id,
                            "wk": wk,
                            "box": solnBox
                        }

                    # DEPRECATED: elif abs(float(master_solution_box["solution"])) == abs(float(solnBox["value"])):
                    elif compare_quantities(
                        abs(float(master_solution_box["solution"])),
                        master_solution_box["unit"],
                        abs(float(solnBox["value"])),
                        solnBox["unit"]
                    ):
                        # Magnitude match
                        self.alternatives[solnBox["variable"]] = {
                            "message": "Magnitude match found",
                            "sid": solved_box_id,
                            "wk": wk,
                            "box": solnBox
                        }

# comparing submitted solutions against other solutions
# def compare_solution_boxes(master_soln, attempt_soln, attempt_soln_summary):
def compare_solution_boxes(report_master: ReportContext, report_attempt: ReportContext):
    
    for soln_id, solution in report_master.json_object["solutions"].items():
        # message_text[soln_id] = {"status": False, "decision": [], "details":[]}
        soln_box_obj = SolutionBox(soln_id, solution, report_attempt.json_object)
        
        # pass in the dict from the master and attempt
        # inside class, it will use the following --vvv logic
        # to generate the status.
        # find alternatives is called from here,
        # but it will also receive the SolutionBox object to modify it directly.
        
        report_master.dict_solution_box[soln_id] = soln_box_obj
        report_attempt.dict_solution_box[soln_id] = soln_box_obj
    
    return
