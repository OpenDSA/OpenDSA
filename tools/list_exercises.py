# A script to create stripped down rst files containing only exercises and AV for each module

import sys, os
import re

rst_dir = os.path.realpath(os.path.join(os.path.dirname(__file__), "..", "RST","en"))

ex_re = re.compile("^(\.\. )+(avembed|inlineav):: (([^\s]+\/)*([^\s.]*))(\.html)? (ka|ss|pe)")

# the directories to be processed
include_dirs = ["AlgAnal", "Background", "Binary", "Bounds", "BTRecurTutor",
                "Design", "Development", "Files", "General", "Graph", "Hashing", 
                "Indexing", "List", "MemManage", "NP", "PL", "PointersJava", 
                "RecurTutor", "Searching", "SearchStruct", "SeniorAlgAnal", 
                "Sorting", "Spatial", "Tutorials"]

def strip_rst_file(filename, root_dir):
    src = open(os.path.join(root_dir, filename), "r")

    exercise_count = 0

    lines = src.readlines()
    i = 0
    num_lines = len(lines)
    while i < num_lines:
        line = lines[i]
        sline = line.strip()
        if sline == "":
            i += 1
            continue
        
        # check for exercises (ss, ka, pe)
        match = ex_re.match(sline)
        if match != None:
            exercise_count += 1

            ex_name = match.group(3)
            ex_type = match.group(7)
            ex_lname = ""

            i += 1
            if i < num_lines:
                line = lines[i]
                sline = line.strip()
                # now try to figure out what we should name the section
                while i < num_lines and sline.startswith(":"):
                    i += 1
                    name_matches = re.match("^\s+:long_name: (.+)", line)
                    if name_matches != None:
                        ex_lname = name_matches.group(1)
                        break
            if ex_lname == "":
                index = ex_name.rfind("/") + 1
                ex_lname = ex_name[index:]
            print "\t" + ex_name + " (" + ex_type + ") -- " + ex_lname
        else:
            i += 1

    src.close()


if __name__ == "__main__":
    for dir_name in include_dirs:
        full_dir = os.path.join(rst_dir, dir_name)
        for root, dirs, filenames in os.walk(full_dir):
            print os.path.basename(root)
            for name in filenames:
                if not name.endswith("_exs.rst") and name.endswith(".rst"):
                    with open(os.path.join(root, name), 'r') as rstfile:
                        strip_rst_file(name, root)
