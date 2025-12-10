# from tafe.core.report import *
# from tafe.core.utils import *
# from tafe.core.solution_subgroup import *
# from tafe.dag_analysis.dag import *
# from tafe.equation_analysis.equation import *
# from tafe.equation_analysis.equations_util import *

# from tafe.messages.message_type import *
# from tafe.messages.message_utils import *

from tools.tafe.core.report import *
from tools.tafe.core.utils import *
from tools.tafe.core.solution_subgroup import *
from tools.tafe.dag_analysis.dag import *
from tools.tafe.equation_analysis.equation import *
from tools.tafe.equation_analysis.equations_util import *

from tools.tafe.messages.message_type import *
from tools.tafe.messages.message_utils import *

from pprint import pprint

def find_errors(
    report_master: ReportContext,
    report_attempt: ReportContext,
    error_info_subgroup: dict
) -> MessageList:  
    """
    This function is only responsible for processing
    each subgroup and each thread to create the list of
    errors to report, that can then be turned into error messages
    in the right format as appropriate for the web interface/command line.
    """

    error_messages = MessageList()

    for subgroup_id, subgroup_info in error_info_subgroup.items():
        for report in [report_master, report_attempt]:
            # determining specifically label-checking-related errors
            # 1. Whole missing equations
            error_messages.add_new_message(
                {
                    "subgroup_id": 
                    report.solution.solution_subgroups[subgroup_id]["corrected_id"],
                    "message_details": {
                        "report": report, 
                        "error_info": find_missing_whole_equations(
                            report,
                            subgroup_id,
                            subgroup_info['matches']
                            )
                    }
                }
            )

        # 2. Erroneous parameters in equations
        # This is outside the report_context loop since
        # onlny parameter boxes in attempt can be wrong and must be reported
        error_messages.add_new_message(
            {
                "subgroup_id": 
                report.solution.solution_subgroups[subgroup_id]["corrected_id"],
                "message_details": {
                    # "report": report_attempt, 
                    "error_info": find_missing_parameters_in_labeled_equations(
                        report_master,
                        report_attempt,
                        subgroup_id,
                        subgroup_info['matches']
                        )
                }
            }
        )

        # 3. Report on equations with issues in cluster
        error_messages.add_new_message(
            {
                "subgroup_id": 
                report.solution.solution_subgroups[subgroup_id]["corrected_id"],
                "message_details": {
                    # "report": report_attempt, 
                    "error_info": find_equation_issues_in_subsequences(
                        report_master,
                        report_attempt,
                        subgroup_id,
                        subgroup_info['matches']
                        )
                }
            }
        )

    return error_messages

def create_error_texts(
    error_messages: MessageList,
    is_online: bool,
    debug=False
):
    for subgroup_id, error_items_list in error_messages.dict_message_texts.items():
        error_string_builder = []

        # STEP 0:
        # Start by announcing which subgroups you're printing errors for
        if debug:
            pass
            print(f"DEBUG: investigating {subgroup_id}:")
            pprint(error_items_list)
        
        # STEP 1:
        # collecting and printing the solo equations
        solo_equation_errors = {
            "m":{
                "report":None,
                "equations":[]
                },
            "a":{
                "report":None,
                "equations":[]
                },
        }
        # also, remove duplicates of equations,
        # if they missed it multiple times, mentioning it once is enough
        # for the first time, they can submit again to figure out
        # the next time.
        
        for error_item in error_items_list:
            if error_item["error_info"]["error_type"] == ERROR_TYPE.solo_equation:
                solo_equation_errors[
                    error_item["report"].context["prefix"]
                    ]["equations"].extend(
                        error_item["error_info"]["equations"]
                    )
                solo_equation_errors[
                    error_item["report"].context["prefix"]
                    ]["report"] = error_item["report"]
         
        for key in ["m","a"]:
            # print(solo_equation_errors[key])
            msg = report_solo_equations(
                solo_equation_errors[key]["equations"], 
                solo_equation_errors[key]["report"],
                is_online
            )
            if len(msg) > 0:
                error_string_builder.append(msg)
        
        # housekeeping to clear context for processing next type of error
        del solo_equation_errors, error_item, key

        # STEP 1.1:
        # collecting and printing the solo equations that were not
        # set up correctly, leading to the errors.
        # TODO: Make sure they are collected properly by label_match
        # and then show them.

        # STEP 2:
        # collecting and printing the parameter boxes in label-matched
        # equations that did not match

        # this is a list since the master/model is always correct,
        # so we only need to report the parameter box in the attempt
        # that is incorrect, and only refer to the master/model for the
        # correct value that was supposed to be in the box.

        for error_item in error_items_list:
            if error_item["error_info"]["error_type"] != ERROR_TYPE.parameter_no_match:
                continue

            if debug:
                print("DEBUG: reporting missing parameters")
                pprint(error_item["error_info"]["equation_boxes"])

            msg = report_missing_parameters_in_labeled_equations(
                error_item["error_info"]["equation_boxes"],
                is_online
            )
            if len(msg) > 0:
                error_string_builder.append(msg)

        # print all the errors at the very end
        if len(error_string_builder) > 0:
            print(f"Errors in approach for solution(s) to question part(s) {subgroup_id}:")
            print("".join(error_string_builder))
    return