# postprocessor.py is a refactored version of the OpenDSA preprocessor created by efouh.
# This script is designed to be run after Sphinx has generated all the HTML files.
# It corrects the chapter and section numbers for titles and hyperlinks using the data
# contained in page_chapter.json

import sys
import os
import re
import json

__author__ = 'breakid'


# Reads the starting section number and section prefix from index.rst
def parse_index_rst(source_dir):
  # Read contents of index.rst
  with open(source_dir + 'index.rst', 'r') as index_rst_file:
    index_rst = index_rst_file.readlines()

  directive = False
  sectnum = 0
  prefix = ''

  for line in index_rst:
    if '.. sectnum::' in line or '.. chapnum::' in line:
      directive = True
    elif ':prefix:' in line:
      prefix = re.split('prefix:', line, re.IGNORECASE)[1].strip()
    elif ':start:' in line:
      sectnum = int(re.split('start:', line, re.IGNORECASE)[1]) - 1

  if not directive:
    print 'Error: No .. sectnum:: or .. chapnum:: directive in index.rst. Please include the directive and try again.'
    sys.exit(1)

  return (sectnum, prefix)


# Updates the index.html page
def update_index_html(dest_dir, sectnum):
  # Process index.html separately from the modules files
  with open(dest_dir + 'index.html', 'r') as index_html_file:
    index_html = index_html_file.readlines()

  for line_num, line in enumerate(index_html):
    #inject css rule to remove haiku's orange bullets
    if '</head>' in line:
      index_html[line_num] = line.replace('</head>','<style>\nul li {\n\tbackground: none;\n\tlist-style-type: none;\n}\n</style>\n</head>')
    elif 'class="section"' in line:
      sectnum += 1
    elif 'class="toctree-l' in line and 'Gradebook' not in line and 'TODO List' not in line:
      title = re.split('>', re.split('</a>', line, re.IGNORECASE)[0], re.IGNORECASE)[-1]
      new_title = '%s.' % sectnum + title
      index_html[line_num] = line.replace(title, new_title)

  # Write the modified contents back to index.html
  with open(dest_dir + 'index.html', 'wb') as index_html_file:
    index_html_file.writelines(index_html)


# Update the headers and navigation hyperlinks in module HTML files
def update_mod_html(file_path, data, prefix):
  # Read contents of module HTML file
  with open(file_path, 'r') as html_file:
    html = html_file.readlines()

  mod_name = os.path.splitext(os.path.basename(file_path))[0]

  if mod_name in data:
    (chap_title, chap_num) = data[mod_name]
    header = '%s %s %s' % (prefix, chap_num, chap_title)

    for line_num, line in enumerate(html):
      if 'id="prevmod"' in line or 'id="nextmod"' in line or 'id="prevmod1"' in line or 'id="nextmod1"' in line:
        link_text = re.split('">',re.split('</a>', line, re.IGNORECASE)[0],re.IGNORECASE)[1]
        link_mod = os.path.splitext(re.split('href="',re.split('">', line, re.IGNORECASE)[0],re.IGNORECASE)[1])[0]

        if link_mod in data and link_mod not in ['index', 'Gradebook', 'ToDo']:
          new_link_text = '%s.' % data[link_mod][1] + link_text
          html[line_num] = line.replace(link_text, new_link_text)

      if mod_name not in ['index', 'Gradebook']:
        if '<title>' in line:
          title = re.split('<title>',re.split('</title>', line, re.IGNORECASE)[0],re.IGNORECASE)[1]
          numbered_title = '%s.' % chap_num + title
          html[line_num] = line.replace(title, numbered_title)
        elif '<h2 class="heading"><span>' in line:
          heading = re.split('<span>',re.split('</span>', line, re.IGNORECASE)[0],re.IGNORECASE)[1]
          html[line_num] = line.replace(heading, header)

        for i in range(1, 7):
          if ('<h%s>' % i) in line:
            section_title = re.split('<h%s>' % i, re.split('<a', line, re.IGNORECASE)[0],re.IGNORECASE)[1]
            new_section_title = '%s.' % chap_num + section_title
            html[line_num] = line.replace(section_title, new_section_title)

  # Replace original HTML file with modified contents
  with open(file_path, 'wb') as html_file:
    html_file.writelines(html)


def update_TOC(source_dir, dest_dir, data = None):
  (sectnum, prefix) = parse_index_rst(source_dir)

  update_index_html(dest_dir, sectnum)

  if not data:
    # Load the JSON data used to store chapter number and title information
    with open('page_chapter.json', 'r') as page_chapter_file:
      data = json.load(page_chapter_file)

  html_files = [file for file in os.listdir(dest_dir) if file.endswith('.html')]
  html_files.remove('index.html')

  for file in html_files:
    update_mod_html(dest_dir + file, data, prefix)


def main(argv):
  if len(argv) != 3:
    print "ERROR. Usage: %s <source directory> <destination directory>\n" % argv[0]
    sys.exit(1)

  update_TOC(argv[1], argv[2])


if __name__ == "__main__":
   sys.exit(main(sys.argv))
