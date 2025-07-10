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

catalog_json = project_root / "config" / "Catalog.json"
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

def parse_metadata_block(filepath):
    metadata = {}
    if not os.path.isfile(filepath):
        print(f"JS file not found: {filepath}")
        return None
    try:
        with open(filepath, encoding='utf-8') as f:
            lines = f.readlines()

        for line in lines:
            stripped = line.strip()
            if stripped.startswith("//") and ":" in stripped:
                try:
                    key, val = stripped[2:].split(":", 1)
                    key = key.strip().lower()
                    val = val.strip()
                    if key == "title":
                        metadata["Title"] = val
                    elif key in ("author", "authors"):
                        metadata["Author"] = [x.strip() for x in re.split(r";|,|\band\b", val)]
                    elif key == "institution":
                        metadata["Institution"] = [val.strip()]
                    elif key in ("keyword", "keywords"):
                        metadata["Keywords"] = [x.strip() for x in re.split(r";|,|\band\b", val)]
                    elif key == "features":
                        metadata["Features"] = [x.strip() for x in re.split(r";|,|\band\b", val)]
                    elif key == "natural language":
                        metadata["Natural Language"] = [val.strip()]
                    elif key == "programming language":
                        metadata["Programming Language"] = [val.strip()]
                except ValueError:
                    continue
            elif stripped.startswith("/*") and "Description:" in stripped:
                try:
                    _, val = stripped.split("Description:", 1)
                    metadata["Description"] = val.strip(" */\n\t")
                except ValueError:
                    continue
        return metadata if metadata else None
    except Exception as e:
        print(f"Failed to parse metadata from {filepath}: {e}")
        return None

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

def generate_html(av_name, subfolder, title, links, scripts, is_dgm=False):
    depth = len(Path(subfolder).parts)
    relative_prefix = "../" * (depth + 2)
    link_tags = '\n    '.join([f'<link rel="stylesheet" href="{relative_prefix}{link}"/>' for link in links])
    script_tags = '\n    '.join(
        ['<script src="https://code.jquery.com/jquery-2.1.4.min.js" type="text/javascript"></script>'] +
        [f'<script src="{relative_prefix}{script}" type="text/javascript"></script>' for script in scripts]
    )

    av_div = f"""
      <div id="{av_name}" class="{('avcontainer' if is_dgm else 'ssAV')}" data-points="0" data-type="{('dgm' if is_dgm else 'ss')}"
           data-required="true" data-long-name="{title}">
        {'<div class="jsavcanvas"></div>' if is_dgm else '''
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
        '''}
      </div>
    """

    html = f"""<html lang="en">
<head>
  <meta charset="utf-8"/>
  <title>{title}</title>
  <link rel="stylesheet" href="{relative_prefix}lib/normalize.css" />
  <link rel="stylesheet" href="{relative_prefix}lib/JSAV.css" />
  <link rel="stylesheet" href="{relative_prefix}lib/odsaMOD-min.css" />
  <link rel="stylesheet" href="{relative_prefix}lib/odsaStyle-min.css" />
  <link rel="stylesheet" href="https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css" />

  <script type="text/x-mathjax-config">
    MathJax.Hub.Config({{
      tex2jax: {{
        inlineMath: [['$','$'], ['\\\\(','\\\\)']],
        displayMath: [['$$','$$'], ['\\\\[','\\\\]']],
        processEscapes: true,
        ignoreClass: "no-mathjax"
      }},
      "HTML-CSS": {{
        scale: "80"
      }}
    }});
  </script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

  {link_tags}
  {script_tags}
</head>
<body>
  <script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js" type="text/javascript"></script>
  <script src="{relative_prefix}lib/jquery.transit.js" type="text/javascript"></script>
  <script src="{relative_prefix}lib/raphael.js" type="text/javascript"></script>
  <script src="{relative_prefix}lib/JSAV-min.js" type="text/javascript"></script>
  <script src="{relative_prefix}lib/odsaUtils.js" type="text/javascript"></script>
  <script src="{relative_prefix}lib/odsaMOD.js" type="text/javascript"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js" type="text/javascript"></script>
  <script src="{relative_prefix}lib/dataStructures.js" type="text/javascript"></script>

  <div class="content">
    <div class="section">
      {av_div}
    </div>
  </div>
</body>
</html>"""

    output_path = output_dir / subfolder / f"{av_name}.html"
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(html, encoding="utf-8")

for rst_file in catalog_rst_paths:
    for av_name, rel_path, links, scripts, long_name, is_dgm in extract_inlineavs_from_rst(rst_file):
        if not av_name:
            continue
        title = long_name
        if not title:
            js_path = av_root / rel_path / f"{av_name}.js"
            metadata = parse_metadata_block(js_path)
            title = metadata.get("Title") if metadata and "Title" in metadata else fallback_title(av_name)

        print(f" Generating: {av_name}.html , Title: {title}, DGM: {is_dgm}")
        generate_html(av_name, rel_path, title, links, scripts, is_dgm)
