#!/usr/bin/env python3
import sys
import re

input_file = sys.argv[1]
output_file = sys.argv[2]

with open(input_file, 'r') as f:
    content = f.read()

new_line = '<script src="https://d3js.org/d3.v7.min.js"></script>'
head_pattern = re.compile(r'(<head.*?>)', flags=re.IGNORECASE)

new_content = head_pattern.sub(r'\1\n' + new_line, content)

with open(output_file, 'w') as f:
    f.write(new_content)
    