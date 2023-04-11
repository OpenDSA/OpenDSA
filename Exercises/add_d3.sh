#!/bin/bash

find . -type f -iname "*.html" | while read -r file; do
    echo "Processing $file"
    ./add_d3.py "$file" "$file.tmp"
    mv "$file.tmp" "$file"
done
