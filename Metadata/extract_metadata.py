#!/usr/bin/env python3

import os
import sys
import json
import re
from collections import defaultdict

tools_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'tools'))
sys.path.append(tools_dir)

import simple2full
from ODSA_Config import ODSA_Config

def load_config(config_path, output_dir=None):
    config_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'config', config_path))
    conf_data = simple2full.generate_full_config(config_path, slides=False, verbose=True)
    config = ODSA_Config(
        config_file_path=config_path,
        output_directory=output_dir,
        no_lms=True,
        conf_data=conf_data
    )
    return config

def contains_nocatalog_directive(content):
    return ":nocatalog:" in content or "//:nocatalog:" in content or "<!--:nocatalog:-->" in content


def detect_duplicate_fields(entries, id_key):
    seen_titles = defaultdict(set)
    seen_descriptions = defaultdict(set)
    duplicates = []

    for entry in entries:
        title = entry.get("title", "").strip().lower()
        desc = entry.get("description", "").strip().lower()
        identifier = entry.get(id_key)
        if not identifier:
            continue
        if title:
            seen_titles[title].add(identifier)
        if desc:
            seen_descriptions[desc].add(identifier)

    for value, locations in seen_titles.items():
        if len(locations) > 1:
            duplicates.append({
                "issue": "Duplicate Title",
                "duplicate_value": value,
                "duplicate_in": sorted(locations),
            })

    for value, locations in seen_descriptions.items():
        if len(locations) > 1:
            duplicates.append({
                "issue": "Duplicate Description",
                "duplicate_value": value,
                "duplicate_in": sorted(locations),
            })

    return duplicates

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
                with open(rst_path, encoding='utf-8') as f:
                    content = f.read()
                    if contains_nocatalog_directive(content):
                        continue
                rst_files.append((mod_name, rst_path))
    return rst_files

def extract_visualization_references(rst_files):
    visualizations = []
    for mod_name, rst_path in rst_files:
        try:
            with open(rst_path, encoding='utf-8') as f:
                lines = f.readlines()
            for i, line in enumerate(lines):
                inline_match = re.match(r"\.\. +inlineav:: +(.+)", line)
                if inline_match:
                    vis_type = "inlineav"
                    full_directive = inline_match.group(1)
                    tokens = full_directive.strip().split()
                    vis_id = tokens[0]
                    tags = tokens[1:]

                    if 'dgm' in tags:
                        continue  

                    scripts_line = next((l for l in lines[i+1:i+5] if ":scripts:" in l), None)
                    js_file = None
                    if scripts_line:
                        scripts = scripts_line.split(":scripts:")[-1].strip().split()
                        js_file = scripts[-1] if scripts else None
                    if js_file:
                        js_file = js_file.lstrip('/\\')
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
        if contains_nocatalog_directive(content):
            return None
        comment_blocks = []
        comment_blocks += re.findall(r"<!--(.*?)-->", content, re.DOTALL)
        comment_blocks += re.findall(r"/\*(.*?)\*/", content, re.DOTALL)

        slashed_lines = re.findall(r"^\s*//.*?:.*", content, re.MULTILINE)
        if slashed_lines:
            cleaned_lines = [line.strip()[2:].strip() for line in slashed_lines]
            comment_blocks.append("\n".join(cleaned_lines))
        for block in comment_blocks:
            lines = block.strip().splitlines()
            for line in lines:
                if ':' in line:
                    key, value = line.split(':', 1)
                    key = key.strip().lower()
                    value = value.strip()
                    if key in ['author', 'authors']:
                        metadata["Author"] = [x.strip() for x in re.split(r';|,|\band\b', value)]
                    elif key in ['keyword', 'keywords']:
                        metadata["Keywords"] = [x.strip() for x in re.split(r';|,|\band\b', value)]
                    elif key == 'description':
                        metadata["Description"] = value
                    elif key == 'title':
                        metadata["Title"] = value
                    elif key in ['programming language']:
                        metadata["Programming Language"] = [x.strip() for x in re.split(r';|,|\band\b', value)]
                    elif key in ['natural language']:
                        metadata["Natural Language"] = [x.strip() for x in re.split(r';|,|\band\b', value)]
                    elif key == 'features':
                        metadata["Features"] = [x.strip() for x in re.split(r';|,|\band\b', value)]
                    elif key == 'institution':
                        metadata["Institution"] = [x.strip() for x in re.split(r';|,|\band\b', value)]
        return metadata if metadata else None
    except Exception as e:
        print(f"Failed to parse metadata from {filepath}: {e}")
        return None


def parse_rst_metadata_block(rst_files, config):
    parsed = []
    missing_report = []
    for mod_name, rst_path in rst_files:
        metadata = {}
        with open(rst_path, encoding='utf-8') as f:
            content = f.read()
        if contains_nocatalog_directive(content):
            continue
        lines = content.splitlines()
        inside_block = False
        for line in lines:
            stripped = line.strip()
            if stripped.startswith(".. avmetadata::"):
                inside_block = True
                continue
            if inside_block and stripped.startswith(":"):
                match = re.match(r":(\w+):\s*(.*)", stripped)
                if match:
                    key, value = match.groups()
                    key = key.strip().lower()
                    value = value.strip()
                    if key in ['author', 'authors']:
                         metadata["Author"] = [x.strip() for x in re.split(r';|,|\band\b', value)]
                    elif key in ['keyword', 'keywords']:
                         metadata["Keywords"] = [x.strip() for x in re.split(r';|,|\band\b', value)]
                    elif key in ['programminglanguage', 'programminglanguage']:
                         metadata["Programminglanguage"] = [x.strip() for x in re.split(r';|,|\band\b', value)]
                    elif key in ['naturallanguage', 'naturallanguage']:
                         metadata["Naturallanguage"] = [x.strip() for x in re.split(r';|,|\band\b', value)]
                    elif key == 'description':
                        metadata["Description"] = value
                    elif key == 'title':
                        metadata["Title"] = value
                    elif key == 'institution':
                        metadata["Institution"] = [x.strip() for x in re.split(r';|,|\band\b', value)]
            elif inside_block:
                break
        missing = [field for field in ["Title", "Author", "Description", "Keywords", "Institution", "Programminglanguage"] if field not in metadata]
        if missing:
            relative_rst_path = os.path.relpath(rst_path, config.odsa_dir).replace("\\", "/")
            missing_report.append({
                "rst_file": os.path.basename(rst_path),
                "rst_path": relative_rst_path,
                "missing_fields": missing
            })
        parsed.append((mod_name, metadata))
    return parsed, missing_report

def build_splice_entry(vis, metadata, host_url="https://opendsa-server.cs.vt.edu"):
    source = vis['source']
    short_name = os.path.splitext(os.path.basename(source))[0]
    if vis['type'] == "inlineav":
        rel_path = os.path.dirname(source).replace("\\", "/")  
        if rel_path.startswith("AV/"):
            rel_path = rel_path[len("AV/"):] 
        embed_url = f"{host_url}/Metadata/inlineav/{rel_path}/{short_name}.html"
    elif vis['type'] == "avembed":
        embed_url = f"{host_url}/OpenDSA/{source}"
    lti_url = f"{host_url}/lti/launch?custom_ex_short_name={short_name}&custom_ex_settings=%7B%7D"
    return {
        "catalog_type": "SLCItem",
        "platform_name": "OpenDSA",
        "url": host_url,
        "iframe_url": embed_url,
        "lti_instructions_url": lti_url,
        "license": "https://github.com/OpenDSA/OpenDSA/blob/master/MIT-license.txt",
        "description": metadata.get("Description", ""),
        "author": metadata.get("Author", []),
        "institution": metadata.get("Institution", []),
        "keywords": metadata.get("Keywords", []),
        "features": metadata.get("Features", []),
        "title": metadata.get("Title", short_name),
        "programming language": metadata.get("Programming Language", []),
        "natural language": metadata.get("Natural Language", [])

    }

def build_catalog_entry(mod_name, metadata, host_url="https://opendsa-server.cs.vt.edu"):
    html_file = f"{os.path.basename(mod_name)}.html"
    embed_url = f"{host_url}/OpenDSA/Books/Catalog/html/{html_file}"
    lti_url = f"{host_url}/lti/launch?custom_ex_short_name={mod_name}&custom_ex_settings=%7B%7D"
    return {
        "catalog_type": "Bundles",
        "platform_name": "OpenDSA",
        "url": host_url,
        "iframe_url": embed_url,
        "lti_instructions_url": lti_url,
        "license": "https://github.com/OpenDSA/OpenDSA/blob/master/MIT-license.txt",
        "description": metadata.get("Description", ""),
        "author": metadata.get("Author", []),
        "institution": metadata.get("Institution", []),
        "keywords": metadata.get("Keywords", []),
        "title": metadata.get("Title", os.path.basename(mod_name)),
        "programminglanguage": metadata.get("Programminglanguage", []),
        "naturallanguage": metadata.get("Naturallanguage", [])
    }
def collect_summary_from_existing_parsing(slc_entries, rst_entries, rst_files, config):
    summary = {
        "Author": set(),
        "Institution": set(),
        "Keywords": set(),
        "Features": set(),
        "Naturallanguage": set(),
        "Programminglanguage": set()
    }
    def update_summary(field, values):
        if isinstance(values, list):
         summary[field].update(v.strip() for v in values if v.strip())
        elif isinstance(values, str) and values.strip():
            summary[field].add(values.strip())

    for entry in slc_entries:
        update_summary("Author", entry.get("author", []))
        update_summary("Institution", entry.get("institution", []))
        update_summary("Keywords", entry.get("keywords", []))
        update_summary("Features", entry.get("features", []))
        update_summary("Naturallanguage", entry.get("natural language", ""))
        update_summary("Programminglanguage", entry.get("Programming Language", []))

    for _, meta in rst_entries:
        update_summary("Author", meta.get("Author", []))
        update_summary("Institution", meta.get("Institution", []))
        update_summary("Keywords", meta.get("Keywords", []))
        update_summary("Naturallanguage", meta.get("Naturallanguage", ""))
        update_summary("Programminglanguage", meta.get("Programminglanguage", []))

    for _, rst_path in rst_files:
        with open(rst_path, encoding="utf-8") as f:
            content = f.read()
        if contains_nocatalog_directive(content):
            continue
        lines = content.splitlines()
        inside_block = False
        for line in lines:
            stripped = line.strip()
            if stripped.startswith(".. avmetadata::"):
                inside_block = True
                continue
            if inside_block and stripped.startswith(":"):
                match = re.match(r":(\w+):\s*(.*)", stripped)
                if match:
                    key, value = match.groups()
                    key = key.strip().lower()
                    value = value.strip()
                  
            elif inside_block:
                break

    with open("summary_metadata.json", "w", encoding="utf-8") as f:
        json.dump({k: sorted(v) for k, v in summary.items()}, f, indent=2, ensure_ascii=False)
    print("Saved summary to summary_metadata.json")

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
        if metadata is None:
            continue
        missing = [field for field in ["Title", "Author", "Description", "Keywords","Features",  "Institution", "Programming Language", "Natural Language"] if not metadata.get(field)]
        if missing:
            slc_missing.append({"source_file": vis["source"], "missing_fields": missing})
        entry = build_splice_entry(vis, metadata)
        slc_metadata.append(entry)

    save_json(slc_metadata, "SLCItem_metadata.json")
    for vis, entry in zip(visualizations, slc_metadata):
        entry["source_file"] = os.path.join(config.odsa_dir, vis["source"]).replace("\\", "/")
    slc_duplicates = detect_duplicate_fields(slc_metadata, "source_file")
    slc_missing.extend(slc_duplicates)
    save_json(slc_missing, "missing_SLCItem_metadata.json")

    catalog_metadata, catalog_missing = parse_rst_metadata_block(rst_files, config)
    catalog_entries = [build_catalog_entry(mod, meta) for mod, meta in catalog_metadata]
    save_json(catalog_entries, "Catalog_metadata.json")
    for (mod_name, meta), entry in zip(catalog_metadata, catalog_entries):
        entry["rst_path"] = os.path.join(config.odsa_dir, "RST", config.lang, f"{mod_name}.rst").replace("\\", "/")
    catalog_duplicates = detect_duplicate_fields(catalog_entries, "rst_path")
    catalog_missing.extend(catalog_duplicates)
    save_json(catalog_missing, "missing_catalog_metadata.json")
    
    collect_summary_from_existing_parsing(slc_metadata, catalog_metadata, rst_files, config)



