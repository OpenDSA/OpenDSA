import os
import re
from pathlib import Path

script_dir = Path(__file__).resolve().parent
project_root = script_dir.parent
rst_root = project_root / "RST" / "en"
av_root = project_root / "AV"
output_dir = script_dir / "inlineav"
output_dir.mkdir(parents=True, exist_ok=True)

def fallback_title(av_name):
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
                    elif key in ("institution",):
                        metadata["Institution"] = [val.strip()]
                    elif key in ("keyword", "keywords"):
                        metadata["Keywords"] = [x.strip() for x in re.split(r";|,|\band\b", val)]
                    elif key in ("features",):
                        metadata["Features"] = [x.strip() for x in re.split(r";|,|\band\b", val)]
                    elif key in ("natural language",):
                        metadata["Natural Language"] = [val.strip()]
                    elif key in ("programming language",):
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

def generate_html(av_name, subfolder, title):
    html = f"""<html lang ="en">
<head>
  <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
  <title>{title}</title>
  <link href="/OpenDSA/RST/_themes/haiku/static/haiku.css_t" rel="stylesheet" type="text/css"/>
  <link href="/OpenDSA/lib/normalize.css" rel="stylesheet" type="text/css"/>
  <link href="/OpenDSA/JSAV/css/JSAV.css" rel="stylesheet" type="text/css"/>
  <link href="/OpenDSA/lib/odsaMOD-min.css" rel="stylesheet" type="text/css"/>
  <link href="https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css" rel="stylesheet" type="text/css"/>
  <link href="/OpenDSA/lib/odsaStyle-min.css" rel="stylesheet" type="text/css"/>
  <script type="text/x-mathjax-config">
    MathJax.Hub.Config({{
      tex2jax: {{
        inlineMath: [['$','$'], ['\\\\(','\\\\)']],
        displayMath: [['$$','$$'], ["\\\\[","\\\\]"]],
        processEscapes: true
      }},
      "HTML-CSS": {{
        scale: "80"
      }}
    }});
  </script>
</head>
<body>
  <script src="https://code.jquery.com/jquery-2.1.4.min.js" type="text/javascript"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
  <script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js" type="text/javascript"></script>
  <script src="/OpenDSA/JSAV/lib/jquery.transit.js" type="text/javascript"></script>
  <script src="/OpenDSA/JSAV/lib/raphael.js" type="text/javascript"></script>
  <script src="/OpenDSA/JSAV/build/JSAV-min.js" type="text/javascript"></script>
  <script src="/OpenDSA/lib/odsaUtils.js" type="text/javascript"></script>
  <script src="/OpenDSA/lib/odsaMOD.js" type="text/javascript"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js" type="text/javascript"></script>
  <script src="/OpenDSA/lib/dataStructures.js" type="text/javascript"></script>
  <div class="content">
    <link rel="stylesheet" href="/OpenDSA/AV/{subfolder}/{av_name}.css"/>
    <script src="/OpenDSA/AV/{subfolder}/{av_name}.js" type="text/javascript"></script>
    <div class="section">
      <div id="{av_name}" class="ssAV" data-points="0" data-type="ss" 
          data-required="true" data-long-name="{title}">
        <span class="jsavcounter"></span>
        <a class="jsavsettings" href="#">Settings</a>
        <div class="jsavcontrols"></div>
        <p class="jsavoutput jsavline"></p>
        <div class="jsavcanvas"></div>
        <div class="prof_indicators">
          <img id="{av_name}_check_mark" class="prof_check_mark" src="/OpenDSA/RST/_static/Images/green_check.png" alt="Proficient" />
          <span id="{av_name}_cm_saving_msg" class="cm_saving_msg">Saving...</span>
          <span id="{av_name}_cm_error_msg" class="cm_error_msg">
            <img id="{av_name}_cm_warning_icon" class="cm_warning_icon" src="/OpenDSA/RST/_static/Images/warning.png" alt="Error Saving"/>
            <br />Server Error<br />
            <a href="#" class="resubmit_link">Resubmit</a>
          </span>
        </div>
      </div>
      <p></p>
    </div>
  </div>
</body>
</html>"""
    (output_dir / f"{av_name}.html").write_text(html, encoding="utf-8")


def extract_inlineavs_from_rst(rst_file):
    inlineavs = []
    with rst_file.open(encoding='utf-8') as f:
        lines = f.readlines()

    for i, line in enumerate(lines):
        match = re.match(r"\.\. +inlineav:: +(.+)", line.strip())
        if match:
            tokens = match.group(1).strip().split()
            if tokens:
                av_name = tokens[0]
                rel_path = rst_file.parent.relative_to(rst_root).as_posix()
                inlineavs.append((av_name, rel_path))
    return inlineavs


for rst_file in rst_root.rglob("*.rst"):
    for av_name, rel_path in extract_inlineavs_from_rst(rst_file):
        js_path = av_root / rel_path / f"{av_name}.js"
        metadata = parse_metadata_block(js_path)
        title = metadata["Title"] if metadata and "Title" in metadata else fallback_title(av_name)

        print(f" Generating: {av_name}.html | Title: {title}")
        generate_html(av_name, rel_path, title)
