"""
For now, we don't intend on using this as a module, so we will leave this file
blank for the time being. Main imports, processing the JSON will happen in
__main__.py
"""

import sys, os
import json

from argparse import ArgumentParser
from collections import Counter, defaultdict
from itertools import combinations

import networkx as nx
from networkx.algorithms import isomorphism
import sympy
# import unit_parse
import pint

# IDEA: remove these global variables and go to classes instead
master_unknown_summary = dict()
attempt_unknown_summary = dict()

master_dep_graph = None
attempt_dep_graph = None

# message_text: supposed to store the messages for each individual solution
# in it's own context - compiled and printed later in compile_messages()
message_text = dict()
# from tafe.core.global_objects import *
from core.global_objects import *
# # loading the equation bank, one of the core global variables shared by everyone
# try:
#     eqbank = { obj["id"]: obj for obj in json.load(open("./tools/equation_bank.json"))}
# except FileNotFoundError:
#     print("{\"error\": \"Could not load the equation bank file, aborting\"}", end='')

# setting the training mode variable
training = False

# Find somewhere to initialize this and make it accessible everywhere
varmap = dict()

