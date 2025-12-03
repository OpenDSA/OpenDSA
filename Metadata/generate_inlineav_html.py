import os
import re
import json
from pathlib import Path

script_dir = Path(__file__).resolve().parent
project_root = script_dir.parent
rst_root = project_root / "RST" / "en"
av_root = project_root / "AV"
output_dir = script_dir / "inlineav"
output_dir.mkdir(parents=True, exist_ok=True)

catalog_json = (project_root / "config" / "Catalog.json").resolve()
with open(catalog_json, encoding='utf-8') as f:
    catalog = json.load(f)

catalog_rst_paths = []
for section in catalog.get("chapters", {}).values():
    for rst_relative_path in section:
        full_path = rst_root / (rst_relative_path + ".rst")
        if full_path.exists():
            catalog_rst_paths.append(full_path)

def fallback_title(av_name):
    if not av_name:
        return "Untitled Slideshow"
    name = re.sub(r'CON$', '', av_name)
    words = re.sub(r'(?<!^)(?=[A-Z])', ' ', name).split()
    return ' '.join(w.capitalize() for w in words) + " Slideshow"

def parse_inlineav_block(lines, index):
    av_name = None
    links = []
    scripts = []
    is_dgm = False
    title = None

    header = lines[index].strip()
    match = re.match(r"\.\. +inlineav:: +(.+)", header)
    if match:
        tokens = match.group(1).strip().split()
        if tokens:
            av_name = tokens[0]
            if 'dgm' in tokens:
                is_dgm = True

    for j in range(index + 1, min(index + 10, len(lines))):
        line = lines[j].strip()
        if line.startswith(':links:'):
            links = line.replace(':links:', '').strip().split()
        elif line.startswith(':scripts:'):
            scripts = line.replace(':scripts:', '').strip().split()
        elif line.startswith(':long_name:'):
            title = line.replace(':long_name:', '').strip()
        elif not line.startswith(':'):
            break

    return av_name, links, scripts, title, is_dgm

def extract_inlineavs_from_rst(rst_file):
    inlineavs = []
    with rst_file.open(encoding='utf-8') as f:
        lines = f.readlines()

    for i, line in enumerate(lines):
        if ".. inlineav::" in line:
            av_name, links, scripts, long_name, is_dgm = parse_inlineav_block(lines, i)
            if not av_name:
                continue
            rel_path = rst_file.parent.relative_to(rst_root).as_posix()
            inlineavs.append((av_name, rel_path, links, scripts, long_name, is_dgm))
    return inlineavs

def find_js_file(av_name):
    for js_file in av_root.rglob(f"{av_name}.js"):
        return js_file
    return None

def generate_html(av_name, title, links, scripts, is_dgm, output_path):
    output_path.parent.mkdir(parents=True, exist_ok=True)
    depth = len(output_path.relative_to(output_dir).parents) - 1
    relative_prefix = "../" * (depth + 2)

    link_tags = '\n    '.join([f'<link rel="stylesheet" href="{relative_prefix}{link}" type="text/css" />' for link in links])
    script_tags = '\n    '.join([f'<script src="{relative_prefix}{script}" type="text/javascript"></script>' for script in scripts])


    if is_dgm:
        av_div = f"""
        <div class="divdgm">
        <div id="{av_name}"></div>
        """
    else:
        av_div = f"""
        <div id="{av_name}" class="{('avcontainer' if is_dgm else 'ssAV')}" data-points="0" data-type="{('dgm' if is_dgm else 'ss')}"
            data-required="true" data-long-name="{title}">
          <span class="jsavcounter"></span>
          <a class="jsavsettings" href="#">Settings</a>
          <div class="jsavcontrols"></div>
          <p class="jsavoutput jsavline"></p>
          <div class="jsavcanvas"></div>
          <div class="prof_indicators">
            <img id="{av_name}_check_mark" class="prof_check_mark" src="{relative_prefix}RST/_static/Images/green_check.png" alt="Proficient" />
            <span id="{av_name}_cm_saving_msg" class="cm_saving_msg">Saving...</span>
            <span id="{av_name}_cm_error_msg" class="cm_error_msg">
              <img id="{av_name}_cm_warning_icon" class="cm_warning_icon" src="{relative_prefix}RST/_static/Images/warning.png" alt="Error Saving"/>
              <br />Server Error<br />
              <a href="#" class="resubmit_link">Resubmit</a>
            </span>
          </div>
        </div>
        """

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <title>{title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="{relative_prefix}lib/normalize.css" type="text/css" />
  <link rel="stylesheet" href="{relative_prefix}lib/JSAV.css" type="text/css" />
  <link rel="stylesheet" href="{relative_prefix}lib/odsaMOD-min.css" type="text/css" />
  <link rel="stylesheet" href="{relative_prefix}lib/odsaStyle-min.css" type="text/css" />
  <link rel="stylesheet" href="{relative_prefix}lib/jquery.ui.min.css" type="text/css" />
  {link_tags}

  <script type="text/javascript" src="{relative_prefix}lib/jquery.min.js"></script>
  <script type="text/javascript" src="{relative_prefix}lib/jquery.migrate.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/localforage/1.9.0/localforage.min.js"></script>
  <script type="text/javascript" src="{relative_prefix}lib/jquery.scrolldepth.js"></script>
  <script type="text/javascript" src="{relative_prefix}lib/timeme.js"></script>
  <script type="text/javascript" src="{relative_prefix}lib/jquery.ui.min.js"></script>
  <script type="text/javascript" src="{relative_prefix}lib/jquery.transit.js"></script>
  <script type="text/javascript" src="{relative_prefix}lib/raphael.js"></script>
  <script type="text/javascript" src="{relative_prefix}lib/JSAV-min.js"></script>
  <script type="text/javascript" src="{relative_prefix}lib/odsaUtils-min.js"></script>
  <script type="text/javascript" src="{relative_prefix}lib/odsaMOD-min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js"></script>
  <script type="text/javascript" src="https://d3js.org/d3-selection-multi.v1.min.js"></script>
  <script type="text/javascript" src="{relative_prefix}lib/dataStructures.js"></script>
  <script type="text/javascript" src="{relative_prefix}lib/conceptMap.js"></script>
  <script type="text/javascript" src="{relative_prefix}lib/splice-iframe.js"></script>
  <script type="text/javascript" src="{relative_prefix}RST/_static/config.js"></script>
  {script_tags}

  <script type="text/x-mathjax-config">
    MathJax.Hub.Config({{
      tex2jax: {{
        inlineMath: [['$','$'], ['\\\\(','\\\\)']],
        displayMath: [['$$','$$'], ['\\\\[','\\\\]']],
        processEscapes: true
      }},
      "HTML-CSS": {{
        scale: "80"
      }}
    }});
  </script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
</head>
<body>
  <div class="content">
    <div class="section">
      {av_div}
    </div>
  </div>
</body>
</html>"""

    output_path.write_text(html, encoding="utf-8")


for rst_file in catalog_rst_paths:
    for av_name, rel_path, links, scripts, long_name, is_dgm in extract_inlineavs_from_rst(rst_file):
        if not av_name:
            continue

        js_path = find_js_file(av_name)
        if not js_path:
            print(f"JS not found for {av_name}, skipping.")
            continue

        title = long_name or fallback_title(av_name)
        js_rel_path = js_path.relative_to(av_root).with_suffix(".html")
        output_html_path = output_dir / js_rel_path

        print(f"Generating: {output_html_path} — Title: {title}")
        generate_html(av_name, title, links, scripts, is_dgm, output_html_path)
