#!/usr/bin/env python3

import os
import sys
import json
import re
import simple2full
from ODSA_Config import ODSA_Config

def load_config(config_path, output_dir=None):
    conf_data = simple2full.generate_full_config(
        config_path,
        slides=False,
        verbose=True
    )
    config = ODSA_Config(
        config_file_path=config_path,
        output_directory=output_dir,
        no_lms=True,
        conf_data=conf_data
    )
    print("Book name:", config.book_name)
    print("Language:", config.lang)
    print("RST base path:", os.path.join(config.odsa_dir, 'RST', config.lang))
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
            else:
                print(f"  Missing .rst file: {rst_path}")
    print(f"\n Found {len(rst_files)} .rst files to process.\n")
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
            print(f" Error reading {rst_path}: {e}")
    print(f"\n Extracted {len(visualizations)} visualizations (inlineav + avembed)\n")
    return visualizations

def parse_metadata_block(filepath):
    if not os.path.isfile(filepath):
        return None

    base, ext = os.path.splitext(filepath)
    json_path = base + ".json"
    if os.path.isfile(json_path):
        try:
            with open(json_path, encoding='utf-8') as f:
                content = json.load(f)
            en_section = content.get("translations", {}).get("en", {})
            metadata = {
                "Exercise name": en_section.get(".avTitle", os.path.basename(filepath)),
                "Author": [author.strip() for author in en_section.get("av_Authors", "Cliff Shaffer").split(";")],
                "Keywords": ["sorting"],  
                "Description": en_section.get("av_c18", "No description available."),
                "Institution": "Virginia Tech"
            }
            return metadata
        except Exception as e:
            print(f" Failed to parse metadata JSON from {json_path}: {e}")
            return None

    metadata = {}
    try:
        with open(filepath, encoding='utf-8') as f:
            content = f.read()
        block_match = re.search(r"===\s*\n(.*?)\n===+", content, re.DOTALL)
        if not block_match:
            return None
        block = block_match.group(1)
        lines = block.strip().split('\n')
        for line in lines:
            line = line.strip().lstrip('*/#- ')
            if ':' in line:
                key, value = line.split(':', 1)
                key = key.strip()
                value = value.strip()
                if key.lower() in ['author', 'keywords']:
                    metadata[key] = [x.strip() for x in value.split(';') if x.strip()]
                else:
                    metadata[key] = value
        return metadata
    except Exception as e:
        print(f" Failed to parse metadata from {filepath}: {e}")
        return None


def build_splice_entry(vis, metadata, host_url="https://opendsa-server.cs.vt.edu"):
    source = vis['source']
    exercise_name = metadata.get("Exercise name", os.path.basename(source))
    author = metadata.get("Author", ["Cliff Shaffer"])
    description = metadata.get("Description", "")
    keywords = metadata.get("Keywords", [])
    short_name = os.path.splitext(os.path.basename(source))[0]

    embed_url = f"{host_url}/ODSA/Books/{vis['module']}.html#{short_name}"

    return {
        "catalog_type": "SLCItemCatalog",
        "platform_name": "OpenDSA",
        "url": embed_url,
        "iframe_url": embed_url,
        "lti_instructions_url": "https://opendsa-server.cs.vt.edu/guides/opendsa-canvas",
        "exercise_type": vis["type"],
        "license": "Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)",
        "description": description,
        "author": "; ".join(author),
        "institution": metadata.get("Institution", "Virginia Tech"),
        "keywords": keywords,
        "exercise_name": exercise_name,
    }

def save_metadata_to_json(data, output_file="metadata.json"):
    try:
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"\n Metadata saved to {output_file}")
    except Exception as e:
        print(f" Failed to save metadata: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python extract_metadata.py <path-to-config.json>")
        sys.exit(1)

    config_file_path = sys.argv[1]
    config = load_config(config_file_path)
    rst_files = collect_rst_paths(config)
    visualizations = extract_visualization_references(rst_files)

    final_metadata = []
    for vis in visualizations:
        file_path = os.path.join(config.odsa_dir, vis['source'])
        metadata = parse_metadata_block(file_path) or {}
        entry = build_splice_entry(vis, metadata)
        final_metadata.append(entry)

    save_metadata_to_json(final_metadata)
