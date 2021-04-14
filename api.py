import subprocess
from flask import Flask, jsonify, request
from flask_autoindex import AutoIndex
import os
import logging
from tools.compress_output import compress_lines

api = Flask(__name__)

############################## Direct File Index ###############################

AutoIndex(api, browse_root=os.path.curdir)


################################## API calls ###############################

@api.route('/api/configure/', methods=['POST'])
def configure():
    if request.method != 'POST':
        return jsonify({"ok", False})
    script_path = "tools/configure.py"
    config_file_path = request.form['config_file_path']
    build_path = request.form['build_path']
    cmd = f"python3 {script_path} {config_file_path} -b {build_path}"
    if request.form['rake'] != 'false':
        cmd += " --standalone-modules"
    api.logger.info("API call for run command: {cmd}")
    proc = subprocess.run(cmd.split(), capture_output=True)
    resp = {"ok":True, "message": proc.returncode}
    resp['stdout'] = proc.stdout
    resp['stderr'] = proc.stderr
    resp['stdout_compressed'] = compress_lines(proc.stdout)
    resp['stderr_compressed'] = compress_lines(proc.stderr)
    if proc.returncode:
        api.logger.error(f"API: configure failure for: {cmd}")
        api.logger.error(resp['stderr_compressed'])
    else:
        api.logger.info("configure command success, responding via API...")
    return jsonify(resp)


@api.route('/api/simple2full/', methods=['POST'])
def simple2full():
    if request.method != 'POST':
        return jsonify({"ok", False})

    script_path = "tools/simple2full.py"
    input_path = request.form['input_path']
    output_path = request.form['output_path']
    cmd = f"python3 {script_path} {input_path} {output_path}"
    if request.form['rake'] != 'false':
        cmd += " --expanded --verbose"
    api.logger.info("API call for run command: {cmd}")
    proc = subprocess.run(cmd.split(), capture_output=True)
    resp = {"ok":True, "message": proc.returncode}
    resp['stdout'] = proc.stdout
    resp['stderr'] = proc.stderr
    resp['stdout_compressed'] = compress_lines(proc.stdout)
    resp['stderr_compressed'] = compress_lines(proc.stderr)
    if proc.returncode:
        api.logger.error(f"API: simple2full failure for: {cmd}")
        api.logger.error(resp['stderr_compressed'])
    else: 
        api.logger.info("simple2full command success, responding via API...")
    return jsonify(resp)


if __name__ == '__main__':
    api.run(host="0.0.0.0", port=8082, debug=True)
