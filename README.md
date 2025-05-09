# OpenDSA
# Metadata Extraction Tool

This project includes a Python script `extract_metadata.py` that parses metadata from `.rst`, `.js`, and `.html` files and generates structured JSON outputs for use in the SPLICE catalog system.

---

## How to Run the Script

To run the `extract_metadata.py` script for parsing the metadata for **Catalog** and **SLCItem**, use the following command:

**`python extract_metadata.py ..\config\<config filename>.json`**

### ✅ Example:
```bash
python extract_metadata.py ..\config\PointersCPP.json
