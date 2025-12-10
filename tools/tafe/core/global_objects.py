import json
import os

__all__ = ['eqbank','trainingStatus','onlineStatus']

def load_bank():
    try:
        return { obj["id"]: obj for obj in json.load(open("./tools/tafe/core/equation_bank.json"))}
    except FileNotFoundError:
        print("CWD is",os.getcwd())
        print("{\"error\": \"Could not load the equation bank file, aborting\"}", end='')
        return {}

# Loading the equation_bank globally
# eqbank = { obj["id"]: obj for obj in json.load(open("./tools/equation_bank.json"))}

global eqbank
eqbank = load_bank()

# True only if running "training" workflow
trainingStatus : bool = False

# is True if running run_online, else False, used by messages
onlineStatus : bool = False