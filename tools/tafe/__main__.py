"""
Run Deforms-Feedback as top level module

Receives the JSON object and type of operation, and processes it accordingly
"""

import sys, os, json
from argparse import ArgumentParser

#from tafe.core.utils import *
from core.utils import *

#from tafe.core.workflow_manager import run_offline, run_online
from core.workflow_manager import run_offline, run_online

if __name__ == '__main__':
    print("Calling inhabitants of interplanetary craft")
    parser = ArgumentParser()
    expandHelp = "Generates an expanded configuration with extra details"
    # parser.add_argument("problem_attempt", help="input problem attempt JSON string", type=str)
    
    """
    Adding options for input:
    
    If online mode, does not require any options, just receives the JSON object
    If offline mode, requires optional arguments,
        since JSON will only be provided as a file
        i.e. it will not have the training/init/analyze options
    
    Offline mode:
        -o --offline    means we are operating in offline mode,
                        ignore all other options -t -i -c -m -a
                        and only use the JSON object passed in
        -i --init       same as "init" in online mode, needs -m path to master file
        -t --training   same as "training" in online mode, 
                        needs -m path to master file 
                        and JSON object of solution (really just testing training mode)
        -c --analyze    same as "analyze" in online mode
                        needs -m path and -a path to master and attempt
                        note: -c stands for 'compare', synonym for 'analyze'
        
        -m  --master    path to the master file, JSON, used by -i -c -t
                        -i  does not need the file to exist, rather will write file if it doesn't
                        -t  will write to file regardless, overwriting last attempt,
                        and will return error if file does not exist
        -a  --attempt   path to attempt file, only used by -c
        -d  --diagnose  generate intermediate figures, data etc. to see internal structures,
                        like dependency graphs, DAGs, etc.
    
    Online/Offline mode:
        -j  --json      JSON object if it is ever provided
                        Can be master solution if -o -t is used (offline mode, so ignore -m),
                        otherwise is attempt (for online mode)

    """
    parser.add_argument("-o", "--offline",
                        help="Run the script in offline mode, uses options in addition to -j", 
                        action="store_true"
                        )
    
    parser.add_argument("-i", "--init",
                        help="Initialization check, sees if the path exists or not and creates file",
                        action="store_true"
                        )
    
    parser.add_argument("-t", "--training",
                        help="Enables training mode, receives path to master file in -m and JSON in -j",
                        action="store_true"
                        )
    
    parser.add_argument("-c", "--analyze",
                        help="Compare master solution to submitted attempt, uses -m and -a or -m and -j together",
                        action="store_true"
                        )
    
    parser.add_argument("-m", "--master",
                        help="Path to master solution file, used in offline mode by all",
                        type=str
                        )
    
    parser.add_argument("-a", "--attempt",
                        help="Path to student attempt file, used in offline mode when -j isn't used",
                        type=str
                        )
    
    parser.add_argument("-d", "--diagnose",
                        help="Generate intermediate figures, data etc. to see internal structures for diagnosing issues", 
                        action="store_true"
                        )
    

    parser.add_argument("-j", "--json",
                        help="JSON object as a string input, for -m in -o -t, or -a in online/-o",
                        type=str
                        )
    
    # Sanity check, show help and quit if no options are provided
    if len(sys.argv)==1:
        parser.print_help(sys.stderr)
        sys.exit(1)
    
    # Parse arguments and start checking
    args = parser.parse_args()
    
    # Setting up logical checks and generating error messages
    if args.offline:
        run_offline(args)
    else:
        # sending the JSON string to be cleaned up
        # config_file = json.loads(clean_json(args.problem_attempt))
        
        # first, make sure that no other options other than -j are being used
        if any([args.init, args.training, args.analyze, args.master, args.attempt]):
            print_error("Don't include any other options if using in online mode, only -j JSON.\nExiting\n")
            sys.exit(1)
            
        run_online(args)
    
    # Then, process the options in config as you're required
    
