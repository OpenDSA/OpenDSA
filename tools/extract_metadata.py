#!/usr/bin/env python3

import os
import sys
import json
import re
import simple2full
from ODSA_Config import ODSA_Config

def load_config(config_path, output_dir=None):
    conf_data = simple2full.generate_full_config(config_path, slides=False, verbose=True)
    config = ODSA_Config(
        config_file_path=config_path,
        output_directory=output_dir,
        no_lms=True,
        conf_data=conf_data
    )
    return config

def collect_rst_paths(config):
    rst_root = os.path.join(config.odsa_dir, 'RST', config.lang)
    rst_files = []
    for chapter in config.chapters:
        modules = config.chapters[chapter]
        if not isinstance(modules, dict):
            continue
        for mod_name in modules:
            rst_path = os.path.join(rst_root, f"{mod_name}.rst")
            if os.path.isfile(rst_path):
                rst_files.append((mod_name, rst_path))
    return rst_files

def extract_visualization_references(rst_files):
    visualizations = []
    for mod_name, rst_path in rst_files:
        try:
            with open(rst_path, encoding='utf-8') as f:
                lines = f.readlines()
            for i, line in enumerate(lines):
                inline_match = re.match(r"\.\. +inlineav:: +(\S+)", line)
                if inline_match:
                    vis_type = "inlineav"
                    vis_id = inline_match.group(1)
                    scripts_line = next((l for l in lines[i+1:i+5] if ":scripts:" in l), None)
                    if scripts_line:
                        scripts = scripts_line.split(":scripts:")[-1].strip().split()
                        js_file = scripts[-1] if scripts else None
                        if js_file:
                            visualizations.append({
                                "module": mod_name,
                                "type": vis_type,
                                "id": vis_id,
                                "source": js_file,
                                "line": i + 1
                            })
                embed_match = re.match(r"\.\. +avembed:: +(\S+)", line)
                if embed_match:
                    vis_type = "avembed"
                    html_file = embed_match.group(1)
                    visualizations.append({
                        "module": mod_name,
                        "type": vis_type,
                        "source": html_file,
                        "line": i + 1
                    })
        except Exception as e:
            print(f"Error reading {rst_path}: {e}")
    return visualizations

def parse_metadata_block(filepath):
    if not os.path.isfile(filepath):
        return None
    metadata = {}
    try:
        with open(filepath, encoding='utf-8') as f:
            content = f.read()
        comment_blocks = []
        comment_blocks += re.findall(r"<!--(.*?)-->", content, re.DOTALL)
        comment_blocks += re.findall(r"/\*(.*?)\*/", content, re.DOTALL)
        lines = content.splitlines()
        line_comment_block = []
        for line in lines:
            striped = line.strip()
            if striped.startswith("//"):
                line_comment_block.append(striped[2:].strip())
            elif striped == "":
                continue
            else:
                break
        if line_comment_block:
            comment_blocks.append("\n".join(line_comment_block))
        for block in comment_blocks:
            for line in block.strip().split("\n"):
                if ':' in line:
                    key, value = line.split(':', 1)
                    key = key.strip().lower()
                    value = value.strip()
                    if key in ['author', 'authors']:
                        metadata["Author"] = [x.strip() for x in re.split(r';|,|and', value)]
                    elif key in ['keyword', 'keywords']:
                        metadata["Keywords"] = [x.strip() for x in re.split(r';|,|and', value)]
                    elif key == 'description':
                        metadata["Description"] = value
                    elif key == 'title':
                        metadata["Exercise name"] = value
                    elif key == 'institution':
                        metadata["Institution"] = value
        return metadata if metadata else None
    except Exception as e:
        print(f"Failed to parse metadata from {filepath}: {e}")
        return None

def parse_rst_metadata_block(rst_files):
    parsed = []
    missing_report = []
    for mod_name, rst_path in rst_files:
        metadata = {}
        with open(rst_path, encoding='utf-8') as f:
            lines = f.readlines()
        inside_block = False
        for line in lines:
            stripped = line.strip()
            if stripped.startswith(".. avmetadata::"):
                inside_block = True
                continue
            if inside_block:
                if not stripped.startswith(":"):
                    break
                match = re.match(r":(\w+):\s*(.*)", stripped)
                if match:
                    key, value = match.groups()
                    key = key.strip().lower()
                    value = value.strip()
                    if key in ['author', 'authors']:
                        metadata["Author"] = [x.strip() for x in re.split(r';|,|and', value)]
                    elif key in ['keyword', 'keywords']:
                        metadata["Keywords"] = [x.strip() for x in re.split(r';|,|and', value)]
                    elif key == 'description':
                        metadata["Description"] = value
                    elif key == 'title':
                        metadata["Exercise name"] = value
                    elif key == 'institution':
                        metadata["Institution"] = value
        missing = []
        for field in ["Exercise name", "Author", "Description", "Keywords", "Institution"]:
            if field not in metadata:
                missing.append(field)
        if missing:
            missing_report.append({
                "rst_file": os.path.basename(rst_path),
                "missing_fields": missing
            })
        parsed.append((mod_name, metadata))
    return parsed, missing_report

def build_splice_entry(vis, metadata, host_url="https://opendsa-server.cs.vt.edu"):
    source = vis['source']
    short_name = os.path.splitext(os.path.basename(source))[0]
    embed_url = f"{host_url}/ODSA/Books/{vis['module']}.html#{short_name}"
    lti_url = f"{host_url}/lti/launch?custom_ex_short_name={short_name}&custom_ex_settings=%7B%7D"
    return {
        "catalog_type": "SLCItemCatalog",
        "platform_name": "OpenDSA",
        "url": embed_url,
        "iframe_url": embed_url,
        "lti_instructions_url": lti_url,
        "exercise_type": vis["type"],
        "license": "https://github.com/OpenDSA/OpenDSA/blob/master/MIT-license.txt",
        "description": metadata.get("Description", ""),
        "author": metadata.get("Author", []),
        "institution": metadata.get("Institution", "Virginia Tech"),
        "keywords": metadata.get("Keywords", []),
        "exercise_name": metadata.get("Exercise name", short_name)
    }

def build_catalog_entry(mod_name, metadata, host_url="https://opendsa-server.cs.vt.edu"):
    embed_url = f"{host_url}/ODSA/Books/{mod_name}.html"
    lti_url = f"{host_url}/lti/launch?custom_ex_short_name={mod_name}&custom_ex_settings=%7B%7D"
    return {
        "catalog_type": "SLCItemCatalog",
        "platform_name": "OpenDSA",
        "url": embed_url,
        "iframe_url": embed_url,
        "lti_instructions_url": lti_url,
        "exercise_type": "inlineav",
        "license": "https://github.com/OpenDSA/OpenDSA/blob/master/MIT-license.txt",
        "description": metadata.get("Description", ""),
        "author": metadata.get("Author", []),
        "institution": metadata.get("Institution", "Virginia Tech"),
        "keywords": metadata.get("Keywords", []),
        "exercise_name": metadata.get("Exercise name", mod_name)
    }

def save_json(data, filename):
    try:
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"Saved to {filename}")
    except Exception as e:
        print(f"Failed to save {filename}: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python extract_metadata.py <path-to-config.json>")
        sys.exit(1)

    config_file = sys.argv[1]
    config = load_config(config_file)
    rst_files = collect_rst_paths(config)
    visualizations = extract_visualization_references(rst_files)

    slc_metadata = []
    slc_missing = []

    for vis in visualizations:
        file_path = os.path.join(config.odsa_dir, vis['source'])
        metadata = parse_metadata_block(file_path) or {}
        missing = [field for field in ["Exercise name", "Author", "Description", "Keywords", "Institution"] if not metadata.get(field)]
        if missing:
            slc_missing.append({"source_file": vis["source"], "missing_fields": missing})
        entry = build_splice_entry(vis, metadata)
        slc_metadata.append(entry)

    save_json(slc_metadata, "SLCItem_metadata.json")
    save_json(slc_missing, "missing_SLCItem_metadata.json")

    catalog_metadata, catalog_missing = parse_rst_metadata_block(rst_files)
    catalog_entries = [build_catalog_entry(mod, meta) for mod, meta in catalog_metadata]
    save_json(catalog_entries, "Catalog_metadata.json")
    save_json(catalog_missing, "missing_catalog_metadata.json")
