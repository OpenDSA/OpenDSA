import json
from pathlib import Path

#from tafe.core.utils import clean_json
from core.utils import clean_json, print_error
from core.workflows import run_workflow_init, run_workflow_training, run_workflow_analyze

def run_workflow(config_file: dict):
    if config_file["mode"] == "analyze":
        return

def run_offline(args):
    """Receives the command line arguments to decide workflow offline

    Args:
        args (str): command line arguments
    """
    
    if args.init:
        # it's doing an initialization check
        run_workflow_init(
            {
                "master_solution_path": args.master,
                "diagnose": args.diagnose
            }
        )
    
    elif args.training:
        # it's creating the master solution file
        try:
            run_workflow_training(
                {
                    "master_solution_path": args.master,
                    "master_solution": json.loads(
                        clean_json(args.json)
                        ),
                    "diagnose": args.diagnose
                }
            )
        except json.JSONDecodeError as e:
            print_error("Unable to decode JSON string.",e)
    
    elif args.analyze:
        # Needs -m and -a paths
        try:
            with open(args.attempt, "r") as f_attempt_json:
                run_workflow_analyze(
                    {
                        "master_solution_path": args.master,
                        "attempt": json.load(f_attempt_json),
                        "diagnose": args.diagnose,
                        "attempt_filename": Path(args.attempt).stem
                    }
                )
        except json.JSONDecodeError as e:
            print_error("Unable to decode JSON string.",e)
        except FileNotFoundError as e:
            print_error("Could not open the attempt solution file, aborting",e)
    else:
        print("\nNo appropriate options were specified, ignoring other options.\n")
        print("Use either -i -m, -t -m MASTER -j JSON, or -c -m MASTER -a ATTEMPT options combinations.")
        print("Exiting")
    
    return

def run_online(args):
    """Receives the command line arguments to decide workflow online

    Args:
        args (str): command line arguments,
                    which in this case is most likely just the JSON string
                    with all the options inside of it
    """
    # If we're running this online, then all the options are
    # in the single JSON object anyway
    try:
        config_file = json.loads(
            clean_json(args.json)
            )
    except json.JSONDecodeError as e:
        print_error("Unable to decode JSON string.",e)
        return
    
    # it's doing an initialization check
    if config_file["mode"] == "init":
        try:
            run_workflow_init(config_file)
        except KeyError as e:
            print_error("Attribute not found in config_file",e)
            return
    
    # it's creating the master solution file
    if config_file["mode"] == "training":
        try:
            run_workflow_training(config_file)
        except KeyError as e:
            print_error("Attribute not found in config_file",e)
            return
    
    # it's doing the analysis here
    """NOTE:
        In this situation, config_file will always be
        a JSON string with the path to the master solution
        and the attempt as a full desciption JSON object.
        And this has already been loaded successfully by this point,
        so no need to check anything else here.
    """
    if config_file["mode"] == "analyze":
        run_workflow_analyze(config_file)
    
    return