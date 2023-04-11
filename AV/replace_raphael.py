#!/usr/bin/env python3

import sys
import re

input_file = sys.argv[1]
output_file = sys.argv[2]

with open(input_file, 'r') as f:
    content = f.read()

new_content = re.sub(
    r'<script.*?raphael\.js.*?</script>',
    r'<script src="https://d3js.org/d3.v7.min.js"></script>',
    content,
    flags=re.IGNORECASE
)

with open(output_file, 'w') as f:
    f.write(new_content)
