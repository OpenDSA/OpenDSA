import json
from pathlib import Path
import sys

print(__file__)

def build_mapping(catalog_json):
    chapters = catalog_json.get("chapters", {})
    return {title: title for title in sorted(chapters.keys())}

def write_outputs(mapping, out_dir):
    json_path = out_dir / "standalone_directories.json"
    json_path.write_text(json.dumps(mapping, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json_path)

if __name__ == "__main__":
    repo_root = Path(__file__).resolve().parents[1]
    catalog_path = repo_root / "config" / "Catalog.json"
    out_dir = Path(__file__).resolve().parent

    print(repo_root)
    print(catalog_path)

    if not catalog_path.exists():
        sys.exit(f"Cannot find {catalog_path}")

    catalog_json = json.loads(catalog_path.read_text(encoding="utf-8"))
    mapping = build_mapping(catalog_json)
    write_outputs(mapping, out_dir)
