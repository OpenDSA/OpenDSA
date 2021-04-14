import subprocess
from flask import Flask, jsonify, request
from flask_autoindex import AutoIndex
import logging

api = Flask(__name__)


@api.route('/api/configure/', methods=['POST'])
def configure():
    if request.method == 'POST':
        script_path = "tools/configure.py"
        config_file_path = request.form['config_file_path']
        build_path = request.form['build_path']
        if request.form['rake'] != 'false':
            list_files = subprocess.run(["python3", script_path, config_file_path, "--standalone-modules", "-b", build_path], capture_output=True)
        else:
            list_files = subprocess.run(["python3", script_path, config_file_path, "-b", build_path], capture_output=True)
            api.logger.info(list_files.stderr)
            api.logger.info(list_files.returncode)
        # return jsonify({"ok": True, "message": list_files.returncode, "stdout": list_files.stdout, "stderr": list_files.stderr})
        return jsonify({"ok": True, "message": list_files.returncode})
    else:
        return jsonify({"ok", False})


@api.route('/api/simple2full/', methods=['POST'])
def simple2full():
    if request.method == 'POST':
        script_path = "tools/simple2full.py"
        input_path = request.form['input_path']
        output_path = request.form['output_path']
        if request.form['rake'] != 'false':
            list_files = subprocess.run(["python3", script_path, input_path, output_path, "--expanded", "--verbose"], capture_output=True)
        else:
            list_files = subprocess.run(["python3", script_path, input_path, output_path], capture_output=True)
            api.logger.info(list_files.stderr)
            api.logger.info(list_files.returncode)
        # return jsonify({"ok": True, "message": list_files.returncode, "stdout": list_files.stdout, "stderr": list_files.stderr})
        return jsonify({"ok": True, "message": list_files.returncode})
    else:
        return jsonify({"ok", False})


AutoIndex(api, browse_root=os.path.curdir)


if __name__ == '__main__':
    api.run(host="0.0.0.0", port=8082, debug=True)
