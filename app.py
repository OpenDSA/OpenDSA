import subprocess
from flask import Flask, jsonify, request, redirect
from flask_autoindex import AutoIndex
import os
import logging
from tools.compress_output import compress_lines
from argparse import ArgumentParser

app = Flask(__name__)

############################## Direct File Index ###############################

AutoIndex(app, browse_root=os.path.curdir)

@app.route('/Books/<book>/')
def redirect_to_rendered_index(book):
    '''Quickly access a book instead of browsing to the exact file'''
    return redirect(f"/Books/{book}/html/index.html", code=302)

################################## API calls ###############################

def run_command(cmd: str):
    app.logger.info("API call for command: {cmd}")
    proc = subprocess.run(cmd.split(), capture_output=True)
    if proc.returncode:
        app.logger.error(f"API: command failure: {cmd}")
        app.logger.error(proc.stderr)
    else:
        app.logger.info("API command success, responding via API..")
    resp = {"ok": True, "message": proc.returncode}
    resp['stdout_compressed'] = compress_lines(proc.stdout)
    resp['stderr_compressed'] = compress_lines(proc.stderr)
    return resp


@app.route('/api/configure/', methods=['POST'])
def configure():
    if request.method != 'POST':
        return jsonify({"ok", False})
    script_path = "tools/configure.py"
    config_file_path = request.form['config_file_path']
    build_path = request.form['build_path']
    cmd = f"python3 {script_path} {config_file_path} -b {build_path}"
    if request.form['rake'] != 'false':
        cmd += " --standalone-modules"
    resp = run_command(cmd)
    return jsonify(resp)


@app.route('/api/simple2full/', methods=['POST'])
def simple2full():
    if request.method != 'POST':
        return jsonify({"ok", False})
    script_path = "tools/simple2full.py"
    input_path = request.form['input_path']
    output_path = request.form['output_path']
    cmd = f"python3 {script_path} {input_path} {output_path}"
    if request.form['rake'] != 'false':
        cmd += " --expanded --verbose"
    resp = run_command(cmd)
    return jsonify(resp)


@app.route('/api/irtcurve/', methods=['POST'])
def irt_curve():
    if request.method != 'POST':
        return jsonify({"ok", False})
    script_path = "tools/irt_curve.py"
    bookID = request.form['bookID']
    cmd = f"python3 {script_path} {bookID}"
    resp = run_command(cmd)
    return jsonify(resp)


@app.route('/deforms/api/deformsfeedback/', methods=['POST'])
def deforms_feedback():
    if request.method != 'POST':
        return jsonify({"ok": False})
    script_path = "tools/tafe"
    problem_attempt = request.json
    str_problem_attempt = str(problem_attempt).replace(" ","")
    cmd = f"python3 {script_path} -j \"{str_problem_attempt}\""
    resp = run_command(cmd)
    return jsonify(resp)

if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('--host', default="0.0.0.0", nargs=1, help='Specify host [default: 0.0.0.0]')
    parser.add_argument('--port', default=8080, type=int, nargs=1, help='Specify port [default: 8080]')
    parser.add_argument('--debug', action='store_true', help='Debug flag for Flask')
    args = parser.parse_args()
    # print(f"OpenDSA API is starting with Flask {args=}")
    print('If Traefik proxy is working, URL will be: https://opendsa.localhost.devcom.vt.edu')
    app.run(**vars(args))
