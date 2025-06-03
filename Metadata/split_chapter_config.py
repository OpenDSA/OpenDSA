#!/usr/bin/env python3
import os
import json


metadata_dir = os.path.abspath(os.path.dirname(__file__))


project_root = os.path.abspath(os.path.join(metadata_dir, ".."))


catalog_file = os.path.join(project_root, "config", "Catalog.json")


if not os.path.isfile(catalog_file):
    raise FileNotFoundError(f"Catalog.json not found")


with open(catalog_file, "r", encoding="utf-8") as f:
    catalog_config = json.load(f)


output_dir = os.path.join(project_root, "config", "ChapterConfigs")
os.makedirs(output_dir, exist_ok=True)


global_fields = {k: v for k, v in catalog_config.items() if k != "chapters"}


for chapter_title, modules in catalog_config["chapters"].items():
    chapter_config = dict(global_fields)
    chapter_config["chapters"] = {chapter_title: modules}

   
    safe_filename = chapter_title.replace(" ", "_")
    config_filename = f"{safe_filename}_config.json"

    
    output_path = os.path.join(output_dir, config_filename)
    with open(output_path, "w", encoding="utf-8") as f_out:
        json.dump(chapter_config, f_out, indent=2, ensure_ascii=False)

print(f" Created chapter configuration files")
