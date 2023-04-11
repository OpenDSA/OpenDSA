#!/bin/bash

find . -type f -iname "*.html" | while read -r file; do
    echo "Processing $file"
    ./replace_raphael.py "$file" "$file.tmp"
    mv "$file.tmp" "$file"
done
