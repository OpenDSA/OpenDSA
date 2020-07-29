# A script to create stripped down rst files containing only exercises and AV for each module

import os
import re

print("WARNING: This file seems unused and obsolete.")
print("WARNING: If this is not so, then remove this warning from:", __file__)
input("Press enter to continue...")

rst_dir = os.path.realpath(os.path.join(os.path.dirname(__file__), "..", "RST","en"))

short_name_re = r"^(\.\. )+(avembed|inlineav):: ([^\s]+/)*([^\s.]*)(\.html)? (ka|ss|ff|pe)"

# the directories to be processed
include_dirs = {"AlgAnal", "Background", "Binary", "Bounds", "BTRecurTutor",
                "Design", "Development", "Files", "General", "Graph", "Hashing", 
                "Indexing", "List", "MemManage", "NP", "PL", "PointersJava", 
                "RecurTutor", "Searching", "SearchStruct", "SeniorAlgAnal", 
                "Sorting", "Spatial", "Tutorials"}

def strip_rst_file(filename, root_dir):
    src = open(os.path.join(root_dir, filename), "r")
    out_filename = filename.replace(".rst", "_exs.rst")
    out = open(os.path.join(root_dir, out_filename), "w")

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
        if i < num_lines - 1 and lines[i + 1].startswith("=="):
            out.write("\n" + line.lstrip())
            out.write(lines[i+1])
            i+=1
        elif sline.startswith(".. odsalink::") \
            or sline.startswith(".. odsascript::") \
            or sline.startswith(".. index:: !"):

            out.write("\n" + line)
        elif sline.startswith(".. avmetadata::"):
            out.write("\n" + line)
            i += 1
            line = lines[i]
            while re.match(r"^\s+:.+:", line) != None:
                out.write(line)
                i += 1
                line = lines[i]
            i -= 1
        else:
            # check for exercises (ss, ka, pe)
            #added support for (ff) option
            matches = re.match(r"^(\.\. )+(avembed|inlineav):: .+ (ff|ss|pe|ka)", sline)
            if matches != None:
                exercise_count += 1
                # now try to figure out what we should name the section
                if i == num_lines - 1:
                    ex_name = re.match(short_name_re, line).group(4)
                    out.write("\n" + ex_name + "\n")
                    out.write("-" * len(ex_name) + "\n")
                    out.write(line)
                else:
                    name_matches = re.match(r"^\s+:long_name: (.+)", lines[i + 1])
                    if name_matches != None:
                        ex_name = name_matches.group(1)
                        out.write("\n" + ex_name + "\n")
                        out.write("-" * len(ex_name) + "\n")
                        out.write(line)
                        i += 1
                    else:
                        name_matches = re.match(short_name_re, line)
                        if name_matches is None:
                            print("Could not generate section name for:", os.path.join(root_dir, filename))
                            print(line)
                        else:
                            ex_name = name_matches.group(4)
                            out.write("\n" + ex_name + "\n")
                            out.write("-" * len(ex_name) + "\n")
                        out.write(line)
                    if matches.group(3) == "ss":
                        out.write("   :output: show\n")
                        i += 1
                    if matches.group(3) == "ff":
                        out.write("   :output: show\n")
                        i += 1
        i += 1

    src.close()
    out.close()
    # no need for the file if the module has no exercises
    if exercise_count == 0:
        os.remove(out.name)


if __name__ == "__main__":
    for root, dirs, filenames in os.walk(rst_dir):
        if os.path.basename(root) in include_dirs:
            for name in filenames:
                if not name.endswith("_exs.rst") and name.endswith(".rst"):
                    with open(os.path.join(root, name), 'r') as rstfile:
                        strip_rst_file(name, root)
    
    print("*_exs.rst files generation complete.")