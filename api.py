import subprocess
from flask import Flask, jsonify, request

api = Flask(__name__)


@api.route('/configure/', methods=['POST'])
def configure():
    if request.method == 'POST':
        script_path = "tools/configure.py"
        config_file_path = request.form['config_file_path']
        build_path = request.form['build_path']
        if request.form['rake']:
            list_files = subprocess.run(["python3", script_path, config_file_path, "--standalone-modules", "-b", build_path])
        else:
            list_files = subprocess.run(["python3", script_path, config_file_path, "-b", build_path])
        return jsonify({"ok": True, "message": list_files.returncode})
    else:
        return jsonify({"ok", False})


@api.route('/simple2full/', methods=['POST'])
def simple2full():
    if request.method == 'POST':
        script_path = "tools/simple2full.py"
        input_path = request.form['input_path']
        output_path = request.form['output_path']
        if request.form['rake']:
            list_files = subprocess.run(["python3", script_path, input_path, output_path, "--expanded", "--verbose"])
        else:
            list_files = subprocess.run(["python3", script_path, input_path, output_path])
        return jsonify({"ok": True, "message": list_files.returncode})
    else:
        return jsonify({"ok", False})


if __name__ == '__main__':
    api.run(host="0.0.0.0", port=8082, debug=True)
