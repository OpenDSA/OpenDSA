import json
import os

__all__ = ['eqbank']

def load_bank():
    try:
        return { obj["id"]: obj for obj in json.load(open("./tafe/core/equation_bank.json"))}
    except FileNotFoundError:
        print("CWD is",os.getcwd())
        print("{\"error\": \"Could not load the equation bank file, aborting\"}", end='')
        return {}

# Loading the equation_bank globally
# eqbank = { obj["id"]: obj for obj in json.load(open("./tools/equation_bank.json"))}
eqbank = load_bank()