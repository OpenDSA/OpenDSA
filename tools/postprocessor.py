# postprocessor.py is a refactored version of the OpenDSA preprocessor created by efouh.
# This script is designed to be run after Sphinx has generated all the HTML files.
# It corrects the chapter and section numbers for titles and hyperlinks using the data
# contained in page_chapter.json

import sys
import os
import re
import json
import xml.dom.minidom as minidom
from collections.abc import Iterable

from xml.etree.ElementTree import ElementTree
from bs4 import BeautifulSoup
import shutil

__author__ = 'breakid'


# Reads the starting section number and section prefix from index.rst
def parse_index_rst(source_dir):
  # Read contents of index.rst
  with open(source_dir + 'index.rst', 'rt', encoding='utf-8') as index_rst_file:
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
    print('Error: No .. sectnum:: or .. chapnum:: directive in index.rst. Please include the directive and try again.')
    sys.exit(1)

  return (sectnum, prefix)


# Updates the index.html page
def update_index_html(dest_dir, sectnum):
  # Process index.html separately from the modules files
  with open(dest_dir + 'index.html', 'rt', encoding='utf-8') as index_html_file:
    index_html = index_html_file.readlines()

  for line_num, line in enumerate(index_html):
    #inject css rule to remove haiku's orange bullets
    if '</head>' in line:
      index_html[line_num] = line.replace('</head>','<style>\nul li {\n\tbackground: none;\n\tlist-style-type: none;\n}\n</style>\n</head>')
    elif 'class="section"' in line:
      sectnum += 1
    elif 'RegisterBook' in line:
      #remove registerbook page from TOC
      index_html[line_num] = ''
    elif 'hide-from-toc' in line:
      #remove stub chapter title
      if '<h1>' in index_html[line_num-1]:
        index_html[line_num-1] = ''
    elif 'class="toctree-l' in line and 'Gradebook' not in line and 'TODO List' not in line:
      title = re.split('>', re.split('</a>', line, re.IGNORECASE)[0], re.IGNORECASE)[-1]
      new_title = '%s.' % sectnum + title
      index_html[line_num] = line.replace(title, new_title)

  # Write the modified contents back to index.html
  with open(dest_dir + 'index.html', 'wt', encoding='utf-8') as index_html_file:
    index_html_file.writelines(index_html)


# Update the headers and navigation hyperlinks in module HTML files
def update_mod_html(file_path, data, prefix, standalone_modules):
  # Read contents of module HTML file
  with open(file_path, 'rt', encoding='utf-8') as html_file:
    html = html_file.readlines()

  mod_name = os.path.splitext(os.path.basename(file_path))[0]

  ignore_mods = ['index', 'Gradebook', 'search', 'RegisterBook']

  link_pattern = re.compile(r'<a.+href="(?P<href>.*).html">(?P<text>.*)</a>')
  title_pattern = re.compile(r'<title>(?P<title>.*)</title>')
  h2_pattern = re.compile(r'<span>(?P<header>.*)</span>')
  header_pattern = re.compile(r'<h\d>(?P<header>.*)<a')

  for line_num, line in enumerate(html):
    if 'id="prevmod"' in line or 'id="nextmod"' in line or 'id="prevmod1"' in line or 'id="nextmod1"' in line:
      m = re.search(link_pattern, line)
      link_text = m.group('text')
      link_mod = m.group('href')

      if link_mod in data and link_mod not in ['index', 'Gradebook', 'ToDo', 'RegisterBook']:
        new_link_text = '%s.' % data[link_mod][1] + link_text
        html[line_num] = line.replace(link_text, new_link_text)

      if link_mod in ['RegisterBook']:
        html[line_num] = line.replace(link_text, "")


    if '&lt;anchor-text&gt;' in line:
      line_args = re.split('&lt;anchor-text&gt;|&lt;/anchor-text&gt;', line)
      texts = re.split(':', line_args[1])
      if len(texts) == 2:
        html[line_num] = line.replace(texts[1] + '</em>', texts[0] + '</em>')
      html[line_num] = html[line_num].replace(line_args[1], '')
      html[line_num] = html[line_num].replace('&lt;anchor-text&gt;', '')
      html[line_num] = html[line_num].replace('&lt;/anchor-text&gt;', '')

    if mod_name in data and mod_name not in ignore_mods:
      (chap_title, chap_num) = data[mod_name]

      if '<title>' in line:
        title = re.search(title_pattern, line).group('title')
        if standalone_modules:
          # remove numbering and book name
          title_start = title.find(' ') + 1
          title_end = title.find(' &mdash;')
          new_title = title[title_start:title_end]
          html[line_num] = line.replace(title, new_title)
        else:
          numbered_title = '%s.' % chap_num + title
          html[line_num] = line.replace(title, numbered_title)
      elif '<h2 class="heading"><span>' in line:
        heading = re.search(h2_pattern, line).group('header')
        header = '%s %s %s' % (prefix, chap_num, chap_title)
        html[line_num] = line.replace(heading, header)

      if re.search(header_pattern, line):
        section_title = re.search(header_pattern, line).group('header')
        if standalone_modules:
          new_section_title = section_title[section_title.find('.')+1:]
          if new_section_title.startswith(' '):
            new_section_title = new_section_title[1:]
        else:
          new_section_title = '%s.' % chap_num + section_title
        html[line_num] = line.replace(section_title, new_section_title)

  # Replace original HTML file with modified contents
  with open(file_path, 'wt', encoding='utf-8') as html_file:
    html_file.writelines(html)


def update_TOC(source_dir, dest_dir, data = None, standalone_modules=False):
  (sectnum, prefix) = parse_index_rst(source_dir)

  update_index_html(dest_dir, sectnum)

  if not data:
    # Load the JSON data used to store chapter number and title information
    with open('page_chapter.json', 'rt', encoding='utf-8') as page_chapter_file:
      data = json.load(page_chapter_file)

  html_files = [file for file in os.listdir(dest_dir) if file.endswith('.html')]

  for file in html_files:
    update_mod_html(dest_dir + file, data, prefix, standalone_modules)


def update_TermDef(glossary_file, terms_dict):
  with open(glossary_file, 'rt', encoding='utf-8') as html_glossary:
    mod_data = html_glossary.readlines()
  i = 0
  while i < len(mod_data):
    line = mod_data[i].strip()
    if line.startswith('<dt'):
      tokens = re.split('</dt>', line)
      token = re.split('>', tokens[0])
      term = token[len(token) -1]
      if term in terms_dict:
        term_def = ''
        i += 1
        endofdef = False
        while (i < len(mod_data) and not endofdef):
          if '</dd>' in  mod_data[i]:
            term_def += mod_data[i].split('</dd>')[0] + '</dd>'
            endofdef = True
          else:
            term_def += mod_data[i]
          i += 1
        terms_dict[term] = str(term_def)
        i-= 1
    i += 1


triple_up = re.compile(r'^((\.\.[\/\\])+)')
def break_up_sections(path, module_data, config, standalone_modules):
  print(path)
  book_name = config.book_name
  sections = module_data['sections']
  module_map = config['module_map']
  course_id = config.course_id
  if bool(module_map) and not standalone_modules:
    item_url = config.LMS_url+"/courses/{course_id}/modules/items/{module_item_id}"
    assignment_url = config.LMS_url+"/courses/{course_id}/assignments/{assignment_id}?module_item_id={module_item_id}"

  # Read contents of module HTML file
  try:
    with open(path, 'rt', encoding='utf-8') as html_file:
      html = html_file.read()
  except IOError:
    print("Error: Could not find HTML file for", path)
    return {}

  # Get the module name and create its subfolder
  mod_name = os.path.splitext(os.path.basename(path))[0]

  # Strip out the script, style, link, and meta tags

  soup = BeautifulSoup(html, "html.parser")

  verbose = False

  if verbose:
    print("Found HTML file:", mod_name)

  TAGS = [ ('script', 'src'), ('link', 'href'), ('img', 'src'), ('a', 'href'), ('iframe', 'src') ]

  # KILL MATHJAX
  #'''Helpful for debugging, because MathJax takes forever to load'''
  #for possible_math_jax in soup.find_all('script'):
  #  if possible_math_jax.has_attr('src') and possible_math_jax['src'].startswith('//cdnjs.cloudflare.com/ajax/libs/mathjax'):
  #    possible_math_jax.extract()


  # Find all of the scripts, links, images, etc. that we might need
  for tag_name, tag_url in TAGS+[('div', 'data-frame-src')]:
    for a_tag in soup(tag_name):
      if a_tag.has_attr(tag_url):
        match = triple_up.match(a_tag[tag_url])
        if match:
          a_tag[tag_url] = '/OpenDSA/' + a_tag[tag_url][len(match.group(0)):]
        elif a_tag[tag_url].startswith('_static/'):
          a_tag[tag_url] = '/OpenDSA/' + config.build_dir + '/'+book_name+'/html/'+a_tag[tag_url]
        elif a_tag[tag_url].startswith('_images/'):
          a_tag[tag_url] = '/OpenDSA/' + config.build_dir + '/'+book_name+'/html/'+a_tag[tag_url]

  '''
  Skip any sections that don't have points

  '''

  # Redirect href urls
  for link in soup.find_all('a'):
    if 'href' not in link.attrs:
        # Really? No href? Is that even valid HTML?
        continue
    href = link['href']
    if href == '#':
      # Skip dummy urls redirecting to itself
      continue
    elif href.startswith('#'):
      # Do something with an internal page link
      continue
    elif href.startswith('mailto:'):
      # Email
      continue
    elif href.startswith('http://'):
      # Offsite
      continue
    elif href.startswith('https://'):
      # Offsite
      continue
    elif href.startswith('../'):
      # Current directory
      continue
    elif href.endswith('.rst'):
      # The source reference
      continue
    else:
      if '#' in href:
        external, internal = href.split('#', 1)
      else:
        external, internal = href, ''
      if external.endswith('.html'):
        if standalone_modules:
          # remove links
          del link['href']
        else:
          # Snip off the ".html"
          external = external[:-5]

          # Map it to the proper folder in canvas
          if bool(module_map):
            if external in module_map:
              module_obj = module_map[external]
              if 'assignment_id' in module_map[external] and module_obj.get('assignment_id') != None:
                external = assignment_url.format(course_id=course_id, module_item_id=module_obj.get('module_item_id'), assignment_id=module_obj.get('assignment_id'))
              else:
                external = item_url.format(course_id=course_id, module_item_id=module_obj.get('module_item_id'))
          # Force it to approach it from the top
          link['href'] = '#'.join((external,internal))
      # Do something with the actual href

  # Move header scripts out of header, kill header
  header_tag = soup.find('div', class_='header')
  for bit in reversed(header_tag.contents):
    if bit.name in ('script', 'link'):
      header_tag.next_sibling.insert_before(bit.extract())
  header_tag.extract()

  # Remove unnecessary parts of the HTML
  for class_name in ('topnav', 'bottomnav'):
    element = soup.find('div', class_=class_name)
    if element:
      element.extract()
  element = soup.find('img', alt='nsf')
  if element:
    element.extract()

  filename = mod_name + '.html'
  single_file_path = os.path.join(os.path.dirname(path), '..', 'lti_html', filename)
  with open(single_file_path, 'wt', encoding='utf-8') as o:
    o.write(str(soup))
  return None

def pretty_print_xml(data, file_path):
    ElementTree(data).write(file_path)
    xml = minidom.parse(file_path)
    with open(file_path, 'wt', encoding='utf-8') as resaved_file:
        # [23:] omits the stupid xml header
        resaved_file.write(xml.toprettyxml()[23:])


def make_lti(config, no_lms = False, standalone_modules = False):
  if not no_lms:
    config['module_map'] = get_module_map(config)
  dest_dir = config.book_dir + config.rel_book_output_path
  # Iterate through all of the existing files
  ignore_files = ('Gradebook.html', 'search.html', 'conceptMap.html',
                  'genindex.html', 'RegisterBook.html', 'index.html')
  html_files = [path for path in os.listdir(dest_dir)
                if path.endswith('.html') and path not in ignore_files]

  lti_folder = os.path.join(dest_dir, '..', 'lti_html')
  shutil.rmtree(lti_folder, ignore_errors=True)
  os.makedirs(lti_folder)

  for chapter_name, chapter_data in list(config.chapters.items()):
    for module_name, module_data in list(chapter_data.items()):
      if isinstance(module_data, dict):
        name = module_name.split('/')[1] if '/' in module_name else module_name
        path = os.path.join(dest_dir, name+".html")
        break_up_sections(path, module_data, config, standalone_modules)

  # save config object to use ut later for course update
  config_file_path = os.path.join(dest_dir, '..', 'lti_html', 'lti_config.json')
  with open(config_file_path, 'wt', encoding='utf-8') as o:
    o.write(json.dumps(config.__dict__))


def get_module_map(config):
    """extract module map from config object"""
    module_map = {}
    chapters = config['chapters']

    for chapter in chapters:
        chapter_obj = chapters[chapter]

        if not isinstance(chapter_obj, Iterable):
            continue

        for module in chapter_obj:
            module_obj = chapter_obj[module]

            if not isinstance(module_obj, Iterable):
                continue

            module_name = module.split('/')[1] if '/' in module else module
            module_map[module_name] = {}
            module_map[module_name]['module_item_id'] = module_obj['lms_module_item_id'] if 'lms_module_item_id' in module_obj else None
            module_map[module_name]['assignment_id'] = module_obj['lms_assignment_id'] if 'lms_assignment_id' in module_obj else None

    return module_map


def main(argv):
  if len(argv) != 3:
    print("ERROR. Usage: %s <source directory> <destination directory>\n" % argv[0])
    sys.exit(1)

  update_TOC(argv[1], argv[2])


if __name__ == "__main__":
   sys.exit(main(sys.argv))
