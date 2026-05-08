import subprocess
from flask import Flask, jsonify, request, redirect, render_template_string, send_from_directory, abort
from werkzeug.utils import safe_join
import os
import logging
from tools.compress_output import compress_lines
from argparse import ArgumentParser

app = Flask(__name__)

############################## Direct File Index ###############################

INDEX_TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
    <title>Index of /{{ req_path }}</title>
    <style>
        body { font-family: monospace; padding: 20px; line-height: 1.5; }
        ul { list-style-type: none; padding: 0; }
        li { margin: 2px 0; }
        .dir { font-weight: bold; color: #0066cc; text-decoration: none; }
        .file { color: #333; text-decoration: none; }
        .dir:hover, .file:hover { text-decoration: underline; }
        hr { border: 0; border-top: 1px solid #ccc; margin: 10px 0; }
    </style>
</head>
<body>
    <h2>Index of /{{ req_path }}</h2>
    <hr>
    <ul>
        {% if req_path %}
            <li><a href=".." class="dir">.. / (Parent Directory)</a></li>
        {% endif %}
        {% for file in files %}
            <li>
                <a href="/{{ file.rel_path }}" class="{{ 'dir' if file.is_dir else 'file' }}">
                    {{ file.name }}{{ '/' if file.is_dir else '' }}
                </a>
            </li>
        {% endfor %}
    </ul>
    <hr>
</body>
</html>
"""

@app.route('/', defaults={'req_path': ''})
@app.route('/<path:req_path>')
def dir_listing(req_path):
    base_dir = os.path.abspath(os.path.curdir)
    abs_path = safe_join(base_dir, req_path)

    if not abs_path or not os.path.exists(abs_path):
        return abort(404)

    if os.path.isdir(abs_path):
        if req_path and not req_path.endswith('/'):
            return redirect(f"/{req_path}/", code=301)

        files = []
        try:
            with os.scandir(abs_path) as it:
                for entry in it:
                    if entry.name.startswith('.'):
                        continue

                    files.append({
                        'name': entry.name,
                        'is_dir': entry.is_dir(),
                        'rel_path': os.path.normpath(os.path.join(req_path, entry.name)).replace('\\', '/')
                    })
        except PermissionError:
            return abort(403)

        files.sort(key=lambda x: (not x['is_dir'], x['name'].lower()))

        return render_template_string(INDEX_TEMPLATE, req_path=req_path, files=files)

    return send_from_directory(base_dir, req_path)

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
    script_path = "tools.tafe"
    problem_attempt = request.json
    str_problem_attempt = str(problem_attempt).replace(" ","")
    cmd = f"python3 -m {script_path} -j \"{str_problem_attempt}\""
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
