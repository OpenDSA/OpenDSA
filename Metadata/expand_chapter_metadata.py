
import os
import json
import re

with open("Chapter_metadata.json", "r", encoding="utf-8") as f:
    chapter_metadata = json.load(f)

host_url = "https://opendsa-server.cs.vt.edu"
license_url = "https://github.com/OpenDSA/OpenDSA/blob/master/MIT-license.txt"

expanded_entries = []

for chapter in chapter_metadata:
    title = chapter.get("title", "Untitled")
    
    short_name = re.sub(r'\\s+', '', title) 
    short_name = re.sub(r'[^A-Za-z0-9]', '', short_name)
    html_file = f"{short_name}.html"
    embed_url = f"{host_url}/OpenDSA/Books/Catalog/html/{html_file}"
    lti_url = f"{host_url}/lti/launch?custom_ex_short_name={short_name}&custom_ex_settings=%7B%7D"
    expanded_entry = {
        "catalog_type": "Bundles",
        "platform_name": "OpenDSA",
        "url": host_url,
        "iframe_url": embed_url,
        "lti_instructions_url": lti_url,
        "license": license_url,
        "title": chapter.get("title", ""),
        "description": chapter.get("description", ""),
        "author": chapter.get("author", []),
        "institution": chapter.get("institution", []),
        "keywords": chapter.get("keywords", []),
        "naturallanguage": chapter.get("NaturalLanguage", []),
        "programminglanguage": chapter.get("Programming Language", [])
    }
    
    expanded_entries.append(expanded_entry)
    
with open("ExpandedChapter_metadata.json", "w", encoding="utf-8") as f:
    json.dump(expanded_entries, f, indent=2, ensure_ascii=False)

print(f"Generated ExpandedChapter_metadata.json with {len(expanded_entries)} entries.")
