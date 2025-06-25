# Metadata Extraction Tool

This project includes a Python script `extract_metadata.py` that parses metadata from `.rst`, `.js`, and `.html` files and generates structured JSON outputs for use in the SPLICE catalog system.

---

## How to Run the Script

To run the `extract_metadata.py` script for parsing the metadata for **Catalog** and **SLCItem**, use the following command:

**`python extract_metadata.py <config filename>.json`**

###  Example:
```bash
python extract_metadata.py Catalog.json
 
 ## expand_chapter_metdata.py
 This script will generate the complete metadata for the chapter
 To tun this script-
 python expand_chapter_metadata.py

## split_chapter_config.py
This script will generate the config file for each chapters
python split_chapter_metadata.py