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
  startSectNum = 0
  prefix = ''

  for line in index_rst:
    if '.. sectnum::' in line or '.. chapnum::' in line:
      directive = True
    elif ':prefix:' in line:
      prefix = re.split('prefix:', line, re.IGNORECASE)[1].strip()
    elif ':start:' in line:
      startSectNum = int(re.split('start:', line, re.IGNORECASE)[1])

  if not directive:
    print('Error: No .. sectnum:: or .. chapnum:: directive in index.rst. Please include the directive and try again.')
    sys.exit(1)

  return (startSectNum, prefix)


# Updates the index.html page
def update_index_html(dest_dir, startSectNum):
  # Process index.html separately from the modules files
  sectNum = startSectNum - 1 # off by one when actually numbering
  with open(dest_dir + 'index.html', 'rt', encoding='utf-8') as index_html_file:
    index_html = index_html_file.readlines()

  for line_num, line in enumerate(index_html):
    #inject css rule to remove haiku's orange bullets
    if '</head>' in line:
      index_html[line_num] = line.replace('</head>','<style>\nul li {\n\tbackground: none;\n\tlist-style-type: none;\n}\n</style>\n</head>')
    elif 'class="sectnum"' in line:
      sectNum += 1 # the start of a new sub-TOC for chapter/section
    elif 'hide-from-toc' in line:
      #remove stub chapter title
      if '<h1>' in index_html[line_num-1]:
        index_html[line_num-1] = ''
    elif 'class="toctree-l' in line and 'Gradebook' not in line and 'TODO List' not in line:
      title = re.split('>', re.split('</a>', line, re.IGNORECASE)[0], re.IGNORECASE)[-1]
      new_title = '%s.' % sectNum + title
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

  ignore_mods = ['index', 'Gradebook', 'search']

  link_pattern = re.compile(r'<a.+href="(?P<href>.*).html">(?P<text>.*)</a>')
  title_pattern = re.compile(r'<title>(?P<title>.*)</title>')
  h2_pattern = re.compile(r'<span>(?P<header>.*)</span>')
  header_pattern = re.compile(r'<h\d>(?P<header>.*)<a')

  for line_num, line in enumerate(html):
    if 'id="prevmod"' in line or 'id="nextmod"' in line or 'id="prevmod1"' in line or 'id="nextmod1"' in line:
      m = re.search(link_pattern, line)
      link_text = m.group('text')
      link_mod = m.group('href')

      if link_mod in data and link_mod not in ['index', 'Gradebook', 'ToDo']:
        new_link_text = '%s.' % data[link_mod][1] + link_text
        html[line_num] = line.replace(link_text, new_link_text)

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
  # Not every theme has a header div
  header_tag = soup.find('div', class_='header')
  if header_tag is not None:
    for aScript in (header_tag.find_all('script')):
      soup.html.head.append(aScript)
    header_tag.extract()
  
  #for bit in reversed(header_tag.contents):
  #  print(bit)
  #  if bit.name in ('script', 'link'):
  #    header_tag.next_sibling.insert_before(bit.extract())
  #  header_tag.extract()
  #  soup.html.head.append(aScript)
  
  # Remove unnecessary parts of the HTML
  for class_name in ('topnav', 'bottomnav'):
    element = soup.find('div', class_=class_name)
    if element:
      element.extract()
  element = soup.find('img', alt='nsf')
  if element:
    element.extract()
  # Inject exercise widget for this module
  widget = create_exercise_widget(module_data, mod_name, config)
  if widget:
  # Find the body and inject widget at the beginning
    body = soup.find('body')
    if body and body.contents:
      # Insert at the beginning of body content
      body.insert(0, widget)
      print(f"✅ Injected exercise widget into {mod_name}")
  else:
    print(f"ℹ️  No exercises with points found in {mod_name}")

  
  
  filename = mod_name + '.html'
  single_file_path = os.path.join(os.path.dirname(path), '..', 'lti_html', filename)
  
  print('Outputting ' + single_file_path )
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
                  'genindex.html', 'index.html')
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


def create_exercise_widget(module_data, mod_name, config):
    """
    Creates exercise widget HTML for a specific module to display exercise overview
    Widget dynamically populates with exercises from API and config
    """
    import json
    
    exercises_dict = module_data.get('exercises', {})
    
    glob_extr_options = getattr(config, 'glob_extr_options', {})
    default_cw_points = glob_extr_options.get('code-workout', {}).get('points', 2)
    
    regular_exercises_config = []
    for name, data in exercises_dict.items():
        if data.get('learning_tool') != 'code-workout':
            points = data.get('points', 0)
            if points > 0:
                regular_exercises_config.append({
                    'name': data.get('long_name', name),
                    'points': points,
                    'id': data.get('id')
                })
    
    codeworkout_exercises = []
    for name, data in exercises_dict.items():
        if data.get('learning_tool') == 'code-workout':
            launch_url = data.get('launch_url', '')
            exercise_id = launch_url.split('/')[-1] if launch_url else None
            
            points = data.get('points', default_cw_points)
            
            codeworkout_exercises.append({
                'name': data.get('long_name', name),
                'id': exercise_id,
                'points': points
            })
    
    regular_exercises_json = json.dumps(regular_exercises_config)
    codeworkout_json = json.dumps(codeworkout_exercises)
    
    widget_id = f"exercise-widget-{mod_name.replace(' ', '-')}"
    
    widget_html = f'''
<div id="exercise-summary-widget" style="border: 2px solid #0056b3; padding: 10px 15px; margin: 15px 0; background-color: #f8f9fa; border-radius: 8px;">
    <!-- Hamburger Header (Always Visible) -->
    <div id="{widget_id}-header" style="cursor: pointer; display: flex; align-items: center; justify-content: space-between;" onclick="toggleExerciseWidget('{widget_id}')">
        <div style="display: flex; align-items: center;">
            <span id="{widget_id}-icon" style="font-size: 18px; margin-right: 10px; color: #0056b3;">☰</span>
            <span style="color: #0056b3; font-weight: bold;">Exercise Overview</span>
            <span id="{widget_id}-progress" style="margin-left: 10px; color: #495057;">Loading...</span>
        </div>
        <span id="{widget_id}-arrow" style="color: #0056b3; font-size: 14px; transform: rotate(0deg); transition: transform 0.3s;">▼</span>
    </div>
    
    <!-- Exercise Details (Initially Hidden) -->
    <div id="{widget_id}-content" style="display: none; margin-top: 15px; padding-top: 10px; border-top: 1px solid #dee2e6;">
        <h4 style="margin: 0 0 10px 0; color: #0056b3;">📊 {mod_name} - Exercise Details</h4>
        <div id="{widget_id}-regular-section">
            <ul id="{widget_id}-exercise-list" style="margin: 0; padding-left: 20px; list-style: none;">
                <li style="color: #999;">Loading exercises...</li>
            </ul>
        </div>
        <div id="{widget_id}-codeworkout-container"></div>
    </div>
</div>

<script>
// Config data
var regularExercisesConfig = {regular_exercises_json};
var codeWorkoutConfigExercises = {codeworkout_json};

function toggleExerciseWidget(widgetId) {{
    var content = document.getElementById(widgetId + '-content');
    var icon = document.getElementById(widgetId + '-icon');
    var arrow = document.getElementById(widgetId + '-arrow');
    
    if (content.style.display === 'none') {{
        content.style.display = 'block';
        icon.innerHTML = '✕';  
        arrow.style.transform = 'rotate(180deg)';  
    }} else {{
        content.style.display = 'none';
        icon.innerHTML = '☰';  
        arrow.style.transform = 'rotate(0deg)';   
    }}
}}

if (typeof ODSA !== 'undefined' && ODSA.TP && ODSA.TP.courseOfferingId) {{
    var hasCodeWorkout = codeWorkoutConfigExercises.length > 0;
    
    fetch('/course_offerings/' + ODSA.TP.courseOfferingId + '/exercise_list?check_proficiency=true')
        .then(function(response) {{ return response.json(); }})
        .then(function(data) {{
            var exerciseAttempts = data.odsa_exercise_attempts;
            var urlParams = new URLSearchParams(window.location.search);
            var moduleTitle = decodeURIComponent(urlParams.get('custom_module_title') || '');
            var moduleNumber = moduleTitle.match(/^(\d+\.\d+)/);
            
            if (moduleNumber) {{
                moduleNumber = moduleNumber[1];
                
                // Get API exercises for this module (in order)
                var apiExercises = [];
                Object.keys(exerciseAttempts).forEach(function(sectionId) {{
                    var exerciseTitle = exerciseAttempts[sectionId][0];
                    if (exerciseTitle.indexOf(moduleNumber) === 0) {{
                        var isComplete = exerciseAttempts[sectionId].indexOf('complete_flag') !== -1;
                        apiExercises.push({{
                            title: exerciseTitle,
                            isComplete: isComplete,
                            sectionId: sectionId
                        }});
                    }}
                }});
                
                // Sort API exercises by title to ensure consistent order
                apiExercises.sort(function(a, b) {{
                    return a.title.localeCompare(b.title);
                }});
                
                // Match by order: pair config exercises with API exercises
                var moduleExercises = [];
                var totalPoints = 0;
                var earnedPoints = 0;
                
                for (var i = 0; i < Math.max(regularExercisesConfig.length, apiExercises.length); i++) {{
                    var configEx = regularExercisesConfig[i];
                    var apiEx = apiExercises[i];
                    
                    if (configEx && apiEx) {{
                        totalPoints += configEx.points;
                        if (apiEx.isComplete) {{
                            earnedPoints += configEx.points;
                        }}
                        
                        moduleExercises.push({{
                            title: configEx.name,
                            isComplete: apiEx.isComplete,
                            points: configEx.points
                        }});
                    }} else if (configEx) {{
                        totalPoints += configEx.points;
                        moduleExercises.push({{
                            title: configEx.name,
                            isComplete: false,
                            points: configEx.points
                        }});
                    }} else if (apiEx) {{
                        moduleExercises.push({{
                            title: apiEx.title,
                            isComplete: apiEx.isComplete,
                            points: 0
                        }});
                    }}
                }}
                
                var progressSpan = document.getElementById('{widget_id}-progress');
                var exerciseList = document.getElementById('{widget_id}-exercise-list');
                var regularSection = document.getElementById('{widget_id}-regular-section');
                
                if (moduleExercises.length > 0) {{
                    exerciseList.innerHTML = '';
                    moduleExercises.forEach(function(exercise) {{
                        var li = document.createElement('li');
                        li.style.marginBottom = '8px';
                        li.style.position = 'relative';
                        li.style.paddingLeft = '25px';
                        
                        var icon = document.createElement('span');
                        icon.style.position = 'absolute';
                        icon.style.left = '0';
                        icon.style.fontSize = '16px';
                        
                        if (exercise.isComplete) {{
                            icon.innerHTML = '✓';
                            icon.style.color = '#28a745';
                            icon.style.fontWeight = 'bold';
                            li.style.color = '#28a745';
                        }} else {{
                            icon.innerHTML = '○';
                            icon.style.color = '#6c757d';
                        }}
                        
                        li.appendChild(icon);
                        
                        var text = document.createElement('span');
                        text.innerHTML = '<strong>' + exercise.title + '</strong>' + 
                                        (exercise.points > 0 ? ' (' + exercise.points + ' pts)' : '');
                        li.appendChild(text);
                        
                        exerciseList.appendChild(li);
                    }});
                    
                    // Only show points if there are regular exercises with points
                    if (totalPoints > 0) {{
                        progressSpan.textContent = '(' + earnedPoints + '/' + totalPoints + ' points)';
                    }} else {{
                        progressSpan.textContent = '';
                    }}
                }} else {{
                    if (hasCodeWorkout) {{
                        regularSection.style.display = 'none';
                        progressSpan.textContent = '';
                    }} else {{
                        exerciseList.innerHTML = '<li style="color: #999;">No exercises found for this module</li>';
                        progressSpan.textContent = '(0 points)';
                    }}
                }}
                
                // Handle CodeWorkout exercises
                if (hasCodeWorkout) {{
                    var cwContainer = document.getElementById('{widget_id}-codeworkout-container');
                    
                    var cwHeader = document.createElement('h5');
                    cwHeader.textContent = 'CodeWorkout Exercises';
                    cwHeader.style.marginTop = moduleExercises.length > 0 ? '15px' : '0';
                    cwHeader.style.color = '#0056b3';
                    cwContainer.appendChild(cwHeader);
                    
                    var cwList = document.createElement('ul');
                    cwList.style.margin = '0';
                    cwList.style.paddingLeft = '20px';
                    cwList.style.listStyle = 'none';
                    cwContainer.appendChild(cwList);
                    
                    var codeWorkoutTotalPoints = 0;
                    var codeWorkoutEarnedPoints = 0;
                    var codeWorkoutChecked = 0;
                    
                    // Calculate total CodeWorkout points
                    codeWorkoutConfigExercises.forEach(function(ex) {{
                        codeWorkoutTotalPoints += ex.points;
                    }});
                    
                    codeWorkoutConfigExercises.forEach(function(exercise, index) {{
                        var li = document.createElement('li');
                        li.id = '{widget_id}-cw-' + index;
                        li.style.marginBottom = '8px';
                        li.style.position = 'relative';
                        li.style.paddingLeft = '25px';
                        li.style.color = '#999';
                        li.innerHTML = '<span style="position: absolute; left: 0;">○</span>Loading...';
                        cwList.appendChild(li);
                    }});
                    
                    codeWorkoutConfigExercises.forEach(function(exercise, index) {{
                        if (!exercise.id) {{
                            codeWorkoutChecked++;
                            var li = document.getElementById('{widget_id}-cw-' + index);
                            if (li) {{
                                li.innerHTML = '<span style="position: absolute; left: 0;">○</span><strong>' + 
                                              exercise.name + '</strong>' + 
                                              (exercise.points > 0 ? ' (' + exercise.points + ' pts)' : '');
                            }}
                            return;
                        }}
                        
                        fetch('/course_offerings/' + ODSA.TP.courseOfferingId + '/codeworkout_progress?inst_book_section_exercise_id=' + exercise.id)
                            .then(function(response) {{ return response.json(); }})
                            .then(function(cwData) {{
                                var isComplete = cwData.proficient_date && cwData.proficient_date !== null;
                                if (isComplete) {{
                                    codeWorkoutEarnedPoints += exercise.points;
                                }}
                                codeWorkoutChecked++;
                                
                                var li = document.getElementById('{widget_id}-cw-' + index);
                                if (li) {{
                                    li.style.paddingLeft = '25px';
                                    
                                    var icon = document.createElement('span');
                                    icon.style.position = 'absolute';
                                    icon.style.left = '0';
                                    icon.style.fontSize = '16px';
                                    
                                    if (isComplete) {{
                                        icon.innerHTML = '✓';
                                        icon.style.color = '#28a745';
                                        icon.style.fontWeight = 'bold';
                                        li.style.color = '#28a745';
                                    }} else {{
                                        icon.innerHTML = '○';
                                        icon.style.color = '#6c757d';
                                        li.style.color = '';
                                    }}
                                    
                                    var text = document.createElement('span');
                                    text.innerHTML = '<strong>' + exercise.name + '</strong>' + 
                                                    (exercise.points > 0 ? ' (' + exercise.points + ' pts)' : '');
                                    
                                    li.innerHTML = '';
                                    li.appendChild(icon);
                                    li.appendChild(text);
                                }}
                                
                                if (codeWorkoutChecked === codeWorkoutConfigExercises.length) {{
                                    var finalEarned = earnedPoints + codeWorkoutEarnedPoints;
                                    var finalTotal = totalPoints + codeWorkoutTotalPoints;
                                    if (progressSpan && finalTotal > 0) {{
                                        progressSpan.textContent = '(' + finalEarned + '/' + finalTotal + ' points)';
                                    }} else if (finalTotal === 0) {{
                                        progressSpan.textContent = '';
                                    }}
                                }}
                            }})
                            .catch(function(error) {{
                                codeWorkoutChecked++;
                                
                                var li = document.getElementById('{widget_id}-cw-' + index);
                                if (li) {{
                                    li.innerHTML = '<span style="position: absolute; left: 0;">○</span><strong>' + 
                                                  exercise.name + '</strong>' + 
                                                  (exercise.points > 0 ? ' (' + exercise.points + ' pts)' : '');
                                    li.style.color = '';
                                }}
                                
                                if (codeWorkoutChecked === codeWorkoutConfigExercises.length) {{
                                    var finalEarned = earnedPoints + codeWorkoutEarnedPoints;
                                    var finalTotal = totalPoints + codeWorkoutTotalPoints;
                                    if (progressSpan && finalTotal > 0) {{
                                        progressSpan.textContent = '(' + finalEarned + '/' + finalTotal + ' points)';
                                    }} else if (finalTotal === 0) {{
                                        progressSpan.textContent = '';
                                    }}
                                }}
                            }});
                    }});
                }}
            }}
        }})
        .catch(function(error) {{
            var progressSpan = document.getElementById('{widget_id}-progress');
            if (progressSpan) {{
                progressSpan.textContent = 'Error loading exercises';
            }}
        }});
}} else {{
    var progressSpan = document.getElementById('{widget_id}-progress');
    if (progressSpan) {{
        progressSpan.textContent = 'Not available';
    }}
}}
</script>'''
    
    return BeautifulSoup(widget_html, 'html.parser')
