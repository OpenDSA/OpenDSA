#!/usr/bin/env python3
#
# Defines an object which represents an OpenDSA modules
#   - Checks to see if the RST module file exists
#   - Reads in the RST source file
#   - Appends a common header to all RST modules (based on the template found in config_templates.py) which includes a Sphinx self reference directive (so Sphinx can cross-link the module) and module-specific configuration settings
#     - Ensures we can reference any module, without relying on the module author to correctly add the reference link
#     - Optionally, appends a raw JavaScript flag to each module indicating whether or not the module can be completed
#       - This allows the configuration file to override the default behavior of the client-side framework which is to allow module completion only if the module contains required exercises
#   - Loops through each line of the RST file
#     - Keeps a count of labeled and unlabeled tables, examples, theorems, and figures (for numbering during postprocessing)
#     - Parses the list of prerequisite topics and checks to make sure each is satisfied by a previous module or assumed that the student knows
#     - Parses the list of topics the current module satisfies
#     - Records the path to any images loaded by the figure or odsafig directives (so only the images included in the book have to be copied to the final book)
#     - Identifies TODO directives and either removes them (if TODOs are suppressed) or records them for display on the ToDo.rst page
#     - Identifies inline and embedded AVs, either:
#       - Removes the entire directive if the 'remove' attribute is present and "true"
#       OR
#       - Appends additional information (specifically adds 'long_name', 'points', 'required' and 'threshold') from the configuration file to the directive
#       - If the specified exercise does not appear in the configuration file, the Sphinx directive will be included, but no additional information will be included so the defaults (specified in the Sphinx directive file) will be used.  The name of the exercise is added to a list of missing exercises which will be displayed to the user
#     - Verifies the existence of the avmetadata directive
#     - Keeps a count of labeled equations (for numbering during postprocessing)
#     - Increments the figure counter when RST directives with a 'target' parameter are encountered (for numbering during postprocessing)
#   - Writes the modified contents of the RST file out to the book's source directory
#   - Makes the various counters and lists publicly accessible so they can be read by 'configure.py'

import sys
import os
import datetime
import re
import codecs
from string import whitespace as ws
from config_templates import *
from collections import OrderedDict

# Prints the given string to standard error
def print_err(*args, **kwargs):
  print(*args, file=sys.stderr, **kwargs)

# Generates a string that will be appended to the RST module header that sets the module options appropriately
def format_mod_options(options):
  option_str = ''

  for option, value in options.items():
    # Convert Python booleans to JavaScript booleans and quote strings
    if str(value) in ['True', 'False']:
      value = str(value).lower()
    elif isinstance(value, str):
      value = "'%s'" % value

    # Set JSAV options as necessary and set all others as standard variables
    if option.startswith('JXOP-'):
      option_str += "JSAV_EXERCISE_OPTIONS['%s']=%s;" % (option[5:], value)
    elif option.startswith('JOP-'):
      option_str += "JSAV_OPTIONS['%s']=%s;" % (option[4:], value)
    else:
      option_str += "var %s=%s;" % (option, value)

  return option_str

# Returns a boolean indicating whether or not the module can be completed
def determine_module_completable(mod_attrib, dispModComp):
  # Set a JS flag on the page, indicating whether or not the module can be completed
  if 'dispModComp' in mod_attrib:
    # Use the value specified in the configuration file to override the calculated value
    dispModComp = mod_attrib['dispModComp']
  elif dispModComp:
    dispModComp = dispModComp
  else:
    dispModComp = False

    # Display 'Module Complete' only if the module contains at least one required exercise
    for exer_name, exer_obj in list(mod_attrib['exercises'].items()):
      if 'required' in exer_obj and exer_obj['required']:
        dispModComp = True
        break

  return dispModComp

# Parses the arguments from a Sphinx directive, prints error messages if the directive doesn't match the expected format
def parse_directive_args(line, line_num, expected_num_args = -1, console_msg_prefix = ''):
  # Create a RegEx pattern that will match 1 or more whitespace characters
  p = re.compile('(%s)+' % ('|'.join([c for c in ws])))

  # Collapse multiple whitespaces inside the directive to ensure args will be split properly
  line = p.sub(' ', line).strip()

  # Print an error if the directive doesn't match what we expect
  directive = line[:line.find(':: ')].strip().split(' ')
  if len(directive) != 2 and directive[0] != '..':
    print_err("%sERROR: Invalid Sphinx directive declaration" % console_msg_prefix)

  # Isolates the arguments to the directive
  if "'" in line:
    args = [line[line.find(':: ') + 3:]]
  else:
    args = line[line.find(':: ') + 3:].split(' ')

  # Ensure the expected number of arguments was parsed (skip the check if -1)
  if expected_num_args > -1 and len(args) != expected_num_args:
    # Print a warning if inlineav is invoked without the minimum number of arguments
    print_err("%sERROR: Invalid directive arguments for object on line %d, skipping object" % (console_msg_prefix, line_num))

  return args

# Parses the options from a Sphinx directive
def parse_directive_options(mod_data, line_num):
  line_num += 1
  mod_len = len(mod_data)
  rxp = re.compile('^[\t ]+:([^:]+): (.+)$')
  options = {}
  while True:
    if line_num >= mod_len:
      break
    line = mod_data[line_num]
    match = rxp.match(line)
    if match == None:
      break
    options[match.group(1)] = match.group(2)
    line_num += 1

  return options

#parses the glossary terms relationships. prints error message if the format is not correct
#format    :to-term: term1 :lable: label :alt-text: alternate text in case the to-term is not a glossary term
def parse_term_relationship(line, term, line_num, cmap_dict, console_msg_prefix = ''):
  if line.strip().startswith(':to-term:') and ':label:' in line.lower():
    args = re.split(':to-term:|:label:', line)
    term = term.strip().rstrip('\n')
    cmap_dict['concepts'][term] = ''

    if (args[1] not in cmap_dict['concepts']):
      if len(args) == 3:
        args[1] = args[1].strip().rstrip('\n')
        cmap_dict['concepts'][args[1]] = ''
    if args[2].replace(" ", "").strip().strip('\n') not in cmap_dict['linking_phrase']:
      #size_lp = len(cmap_dict['linking_phrase'])
      #cmap_dict['linking_phrase']['lp-' + str(size_lp + 1)] = args[2]
      cmap_dict['linking_phrase'][args[2].replace(" ", "").strip().rstrip('\n')] = args[2]
    if args[1].replace(" ", "").strip().strip('\n') not in cmap_dict['linking_phrase']:
      size_c = len(cmap_dict['connections'])
      #cmap_dict['linking_phrase']['lp-' + str(size_lp + 1)] = args[2]
      cmap_dict['connections']['con-' + str(size_c + 1)] = {'from': term, 'to': args[1], 'label': args[2]}
      #cmap_dict['connections']['con-' + str(size_c + 2)] = {'from': args[2].replace(" ", "").strip().rstrip('\n'), 'to': args[1]}
  else:
    print_err("%sWARNING: Glossary terms relationship declaration on line %d" % (console_msg_prefix, line_num))


def isExample(topic):
  if 'example' in topic.lower() and topic.startswith('.. topic::'):
    return True
  else:
    return False

def isTable(line):
  if line.startswith('.. table::') or line.startswith('.. odsatab') or ('table' in line.lower() and line.startswith('.. topic::')):
    return True

  return False

def isTheorem(topic):
  if 'theorem' in topic.lower() and topic.startswith('.. topic::'):
    return True
  else:
    return False

def isFigure(item):
  if item.startswith('.. figure::') or item.startswith('.. odsafig::') or (item.startswith('.. inlineav::') and 'dgm' in item):
    return True

  return False

def isSlide(item):
  if item.startswith('.. slide::'):
    return True

  return False

def isSlideConf(item):
  if item.startswith('.. slideconf::'):
    return True

  return False

def is_index_option(mod_data, i, line):
  if re.match(r'^\w+:.+$', line) != None:
    i -= 1
    while i >= 0:
      line = mod_data[i].strip()
      if re.match(r'^\w+:.+$', line) != None:
        i -= 1
      elif line.startswith('.. index::'):
        return True
      else:
        return False
  return False

def get_directive_type(directive):
  if isTable(directive):
    return 'table'

  elif isExample(directive):
    return 'example'

  elif isTheorem(directive):
    return 'theorem'

  elif isFigure(directive):
    return 'figure'

  elif isSlide(directive):
    return 'slide'

  elif isSlideConf(directive):
    return 'slideconf'

  return ''

def update_counters(label_line, dir_type, mod_num, num_ref_map, counters):
  label = ''
  # Parse the label from format '.. _Label:' (if it exists)
  if label_line.startswith('.. _'):
    label = label_line.strip()[4:-1]

  if label != '':
    # If the item is labeled, record its number and increment its counter
    pattern = '%s#'
    if mod_num:
      pattern = '.' + pattern
    num_ref_map[label] = mod_num + pattern % counters[dir_type]
    counters[dir_type] += 1
  elif dir_type not in ['table', '']:
    # If the directive is for an unlabeled figure, record its number and increment the 'anon_fig' counter (in addition to the standard figure counter)
    if dir_type == 'figure' and label == '':
      fig_label = 'anon_fig%s' % counters['anon_fig']
      num_ref_map[fig_label] = counters['figure']
      counters['anon_fig'] += 1

    # If the item is not labeled, increment the counter anyway (unless the directive is a 'table')
    counters[dir_type] += 1

  return (num_ref_map, counters)

def process_ref_chap(extension, line, book_objects, start_space, last, standalone_modules=False):
  """
    method responsible of converting :ref: and :chap: to :term: when
    reference / chapter is missing.
  """
  #lower case modules names
  lower_listed_modules = [x.lower() for x in book_objects]
  line_t = line.strip()
  separator = '%s|`' % extension
  rel_tokens = re.split(separator, line_t)
  if len(rel_tokens) == 4:
    rel_labels = rel_tokens[2]
    rel_tags = re.split('<|>', rel_labels)
    #We encountered the alternate :ref:/:chap: syntax
    if len(rel_tags) == 3:
      if (not rel_tags[1].strip().lower() in lower_listed_modules) or standalone_modules:
        #just output anchor text
        line_t = line_t.replace(extension,'')
        line_t = line_t.replace('`' + rel_labels + '`', rel_tags[0])
    if len(rel_tags) == 5:
      if (rel_tags[3].strip().lower() in lower_listed_modules) and not standalone_modules:
        #module is present swith to standard :rel: syntax
        newDir = '%s <%s>' %(rel_tags[0], rel_tags[3])
        if extension == ':chap:':
          newDir = '%s' %(rel_tags[3])
        line_t = line_t.replace(rel_labels, newDir)
      else:
        #module absent swith to :term:
        line_t = line_t.replace(extension,':term:')
        newDir = '%s <%s>' %(rel_tags[0], rel_tags[1])
        line_t = line_t.replace(rel_labels, newDir)
    line_t = ' ' * start_space + line_t + last
  return line_t

class ODSA_RST_Module:

  def __init__(self, config, mod_path, mod_attrib = {'exercises': {} }, satisfied_requirements = [], chap = '', depth = 0, current_section_numbers = [], standalone_modules=False):
    console_msg_prefix = '  ' * (depth + 1)

    mod_path = os.path.splitext(mod_path)[0]
    mod_name = os.path.basename(mod_path)
    mod_num = ''

    # Hack to maintain the same numbering scheme as the old preprocessor
    if len(current_section_numbers) > 0 and not standalone_modules:
      mod_num = '%s.%d' % ('.'.join(str(j) for j in current_section_numbers[:-1]), (current_section_numbers[-1] + 1))

    images = []
    missing_exercises = []
    processed_sections = []
    requirements_satisfied = []
    todo_list = []
    num_ref_map = {}
    #concept map dictionary for glossary
    cmap_dict = {}
    cmap_dict['concepts'] = {}
    cmap_dict['linking_phrase'] = {}
    cmap_dict['connections'] = {}
    # Initialize counters
    counters = {'figure': 1, 'anon_fig': 0, 'table': 1, 'example': 1, 'theorem': 1, 'equation': 1}

    exercises = mod_attrib['exercises']

    dispModComp = determine_module_completable(mod_attrib, config.dispModComp)

    filename = '{0}RST/{1}/{2}.rst'.format(config.odsa_dir, config.lang, mod_path)

    # If the specified RST file doesn't exist in the specified language, default to English
    if config.lang != 'en' and not os.path.exists(filename):
      filename = '{0}RST/en/{1}.rst'.format(config.odsa_dir, mod_path)

    if not os.path.exists(filename):
      print_err('ERROR: Module does not exist: %s' % mod_path)
    else:
      # Read the contents of the module file from the RST source directory
      with codecs.open(filename,'r', encoding='utf-8') as mod_file:
        mod_data = mod_file.readlines()

      # Merge global module options with local modules options, if applicable, so that local options override the global options
      if 'mod_options' in mod_attrib:
        mod_options = dict(list(config.glob_mod_options.items()) + list(mod_attrib['mod_options'].items()))
      else:
        mod_options = config.glob_mod_options

      # Generate the RST header for the module
      header_data = {}
      header_data['mod_name'] = mod_name
      header_data['dispModComp'] = str(dispModComp).lower()
      header_data['long_name'] = mod_attrib['long_name'] if 'long_name' in mod_attrib else mod_name
      header_data['mod_chapter'] = chap
      header_data['mod_date'] = str(datetime.datetime.now()).split('.')[0]
      header_data['mod_options'] = format_mod_options(mod_options)
      header_data['build_cmap'] = str(config.build_cmap).lower()
      # Include an empty unicode directive when building slides
      header_data['unicode_directive'] = rst_header_unicode if os.environ.get('SLIDES', None) == "no" else ''
      # Prepend the header data to the exisiting module data
      mod_data.insert(0, rst_header % header_data)

      avmetadata_found = False

      links = OrderedDict()
      scripts = OrderedDict()

      # Alter the contents of the module based on the config file
      i = 0
      module_title_found = False
      section_title_found = False
      content_before_module = False
      content_before_section = False
      errors = []
      while i < len(mod_data):
        start_space = 0
        for s in mod_data[i]:
          if s.isspace():
            start_space += 1
          else:
             break

        line = mod_data[i].strip()
        next_line =  mod_data[i+1] if i+1 < len(mod_data) else ''
        if next_line.startswith("=") or next_line.startswith("-"):
          next_line = next_line.strip()
          is_chapter = next_line == "="*len(next_line) and len(next_line) > 0
          is_section = next_line == "-"*len(next_line) and len(next_line) > 0
        else:
          next_line = next_line.strip()
          is_chapter = False
          is_section = False
          
        if is_chapter or is_section:
          processed_sections.append(line)
          module_title_found = True
          processed_sections.append(line)
        elif not module_title_found:
          if not content_before_module \
          and not (line == '' or line.startswith('.. ') or line.startswith(':')) \
          and not is_index_option(mod_data, i, line):
            content_before_module = True
            errors.append(("%sERROR: %s: line %s ('%s') - should not have content before module title" % (console_msg_prefix, mod_path, i, line), True))

        # check if the current line is a section title
        # and if so, check if the configuration and remove the section
        # if the configuration indicates to do so
        if is_section \
        and mod_attrib["sections"] != None \
        and line in mod_attrib["sections"] \
        and "showsection" in mod_attrib["sections"][line] \
        and not mod_attrib["sections"][line]["showsection"]:
          print('%sRemoving section: %s' % (console_msg_prefix, line))
          del mod_data[i]
          del mod_data[i]
          line = mod_data[i].strip()
          next_line =  mod_data[i+1].strip() if i+1 < len(mod_data) else ''
          while (len(next_line) == 0 or next_line != "-"*len(next_line)) and i < len(mod_data):
            del mod_data[i]
            if i < len(mod_data):
              del mod_data[i]
            if i < len(mod_data):
              line = mod_data[i].strip()
              next_line =  mod_data[i+1].strip() if i+1 < len(mod_data) else ''
          continue

        if is_chapter:
          module_title_found = True
        else:
          if is_section:
            section_title_found = True
          elif module_title_found and not section_title_found \
          and not content_before_section \
          and (re.match(r'^(\.\. )+(avembed|inlineav):: [^\s]+( )?(pe|ka)?$', line) != None \
               or re.match(r'^(\.\. )+(extrtoolembed):: [^\r\n]+$', line) != None):
              content_before_section = True
              errors.append(("%sERROR: %s: line %s ('%s') - exercises must be inside a section" % (console_msg_prefix, mod_path, i, line), True))
          
        # Determine the type of directive
        dir_type = get_directive_type(line)

        #Code to change the ..slide directive to a header when the -s option
        # is not added
        if (os.environ['SLIDES'] == 'no'):
          #Remove the slideConf Directive
          if dir_type == 'slideconf' or line.startswith(':autoslides:'):
            mod_data[i] = ''

          #Change the slide directive
          if dir_type == 'slide':
            line_split = line.split('::')
            header = line_split[1].strip()
            underline = ''
            for c in range(0, len(header)):
              underline += '~'
            mod_data[i] =  header + '\n' + underline


        # Update figure, equation, theorem, table counters
        if dir_type in ['table', 'example', 'theorem', 'figure']:
          (num_ref_map, counters) = update_counters(mod_data[i - 2], dir_type, mod_num, num_ref_map, counters)

        if ':ref:' in line:
          if mod_data[i].endswith('\n'):
             last = '\n'
          else:
             last = ' '
          mod_data[i] = process_ref_chap(':ref:', line, config.listed_modules, start_space, last, standalone_modules)
          line = mod_data[i].strip().lower()

        if ':chap:' in line:
          if mod_data[i].endswith('\n'):
             last = '\n'
          else:
             last = ' '
          mod_data[i] = process_ref_chap(':chap:', line, config.listed_chapters, start_space, last, standalone_modules)
          line = mod_data[i].strip().lower()


        if ':requires:' in mod_data[i]:
          # Parse the list of prerequisite topics from the module
          requires = [req.strip() for req in line.replace(':requires:', '').split(';')]

          # Print a warning message if a missing prereq is encountered
          for req in requires:
            if req != '' and req not in satisfied_requirements:
              print_err("%sWARNING: %s is an unsatisfied prerequisite for %s, line %d" % (console_msg_prefix, req, mod_name, i + 1))
        elif line.startswith(':satisfies:'):
          # Parse the list of prerequisite topics this module satisfies and add them to a list of satisfied prereqs
          requirements_satisfied = [req.strip() for req in line.replace(':satisfies:', '').split(';')]
        elif line.startswith('.. figure::') or line.startswith('.. odsafig::'):
          # Pass -1 as the expected number of arguments because different directives have different numbers of args (-1 will ignore the check)
          args = parse_directive_args(mod_data[i], i, -1, console_msg_prefix)

          image_path = args[-1]
          images.append(os.path.basename(image_path))

        elif line.startswith(':to-term:'):
          #process concept map relationships
          term = mod_data[i-1]
          term_rel = line
          line_num = i
          # Remove concept map config from the RST file
          mod_data[i] = ''
          i += 1
          #We allow alt-text to span multiple lines
          while (i < len(mod_data) and ( mod_data[i].strip() != '' or mod_data[i] not in ['\n', '\r\n'])):
            if mod_data[i].strip().startswith(':to-term:'):
              parse_term_relationship(term_rel, term, line_num, cmap_dict, console_msg_prefix = '')
              term_rel = mod_data[i]
              line_num = i
            else:
              term_rel += mod_data[i]
            mod_data[i] = ''
            i += 1

          parse_term_relationship(term_rel, term, line_num, cmap_dict, console_msg_prefix = '')
          i-= 1

        elif line.lower().startswith('.. todo::'):
          if config.suppress_todo:
            # Remove TODO directives from the RST file
            mod_data[i] = ''
            i += 1

            while (i < len(mod_data) and (mod_data[i].startswith('   ') or mod_data[i].rstrip() == '')):
              mod_data[i] = ''
              i += 1
          else:
            # Process the TODO directive and save it as an entry in 'todo'
            todo_type = ''
            todo_directive = [mod_data[i]]

            # Prepend an anchor to the todo directive so that we can hyperlink to it from the ToDo page
            todo_id = 'todo%d' % len(todo_list)
            mod_data[i] = '.. raw:: html\n\n   <a id="%s"></a>\n\n%s' % (todo_id, mod_data[i])

            i += 1

            while (i < len(mod_data) and (mod_data[i].startswith('   ') or mod_data[i].rstrip() == '')):
              if ':type:' in mod_data[i]:
                todo_type = mod_data[i].split(': ')[1].strip()
                # This must be modified because the :type: option doesn't exist for the todo directive
                mod_data[i] = '  type: ' + todo_type

              todo_directive.append(mod_data[i].rstrip())

              i += 1

            todo_list.append((todo_id, mod_name, todo_type, todo_directive))

          # Back up one line so that when 'i' is incremented at the end of the loop it will point to the next directive
          i -= 1
        elif line.startswith('.. inlineav::'):
          # Parse the arguments from the directive
          args = parse_directive_args(mod_data[i], i, 2, console_msg_prefix)

          if args:
            (av_name, av_type) = args

            if av_type in ['ss','ff', 'dgm']:
              j = i + 1
              opt_line = next_line
              links_found = False
              scripts_found = False
              while opt_line.startswith(':'):
                if opt_line.startswith(':links:'):
                  link_opts = opt_line[len(':links:'):].split()
                  if len(link_opts) > 0:
                    links_found = True
                    for link in link_opts:
                      if link not in links:
                        links[link] = False 
                  del mod_data[j]
                  j -= 1

                elif opt_line.startswith(':scripts:'):
                  script_opts = opt_line[len(':scripts:'):].split()
                  if len(script_opts) > 0:
                    scripts_found = True
                    for script in script_opts:
                      if script not in scripts:
                        scripts[script] = False
                  del mod_data[j]
                  j -=1

                j += 1
                opt_line = mod_data[j].strip() if j < len(mod_data) else ''

              if not scripts_found and os.environ['SLIDES'] == 'no':
                print_err("{0}WARNING: Module '{1}' -- inlineav '{2}' missing :scripts: option".format(console_msg_prefix, mod_path, av_name))

            if av_type == 'ss':
              if av_name not in exercises:
                # If the SS is not listed in the config file, add its name to a list of missing exercises, ignore missing diagrams
                missing_exercises.append(av_name)
              else:
                # Add the necessary information from the slideshow from the configuration file
                # Diagrams (av_type == 'dgm') do not require this extra information
                exer_conf = exercises[av_name]

                # List of valid options for inlineav directive
                options = ['points', 'required', 'threshold', 'id']

                rst_options = [' '*start_space + '   :%s: %s\n' % (option, str(exer_conf[option])) for option in options if option in exer_conf]
                mod_data[i] += ''.join(rst_options)

            if av_type == 'ff':
              if av_name not in exercises:
                # If the SS is not listed in the config file, add its name to a list of missing exercises, ignore missing diagrams
                missing_exercises.append(av_name)
              else:
                # Add the necessary information from the slideshow from the configuration file
                # Diagrams (av_type == 'dgm') do not require this extra information
                exer_conf = exercises[av_name]

                # List of valid options for inlineav directive
                options = ['points', 'required', 'threshold', 'id']

                rst_options = [' ' * start_space + '   :%s: %s\n' % (option, str(exer_conf[option])) for option in
                               options if option in exer_conf]
                mod_data[i] += ''.join(rst_options)


            elif av_type == 'dgm' and av_name in exercises and exercises[av_name] != {}:
              # If the configuration file contains attributes for diagrams, warn the user that attributes are not supported
              print_err("%sWARNING: %s is a diagram (attributes are not supported), line %d" %(console_msg_prefix, av_name, i + 1))
            elif av_type not in ['ff', 'ss', 'dgm']:
              # If a warning if the exercise type doesn't match something we expect
              print_err("%sWARNING: Unsupported type '%s' specified for %s, line %d" % (console_msg_prefix, av_type, av_name, i + 1))
        elif line.startswith('.. avembed::'):
          # Parse the arguments from the directive
          args = parse_directive_args(mod_data[i], i, 2, console_msg_prefix)

          if args:
            (av_path, av_type) = args

            # check that the av file exists
            if not os.path.exists('{0}/{1}'.format(config.odsa_dir,av_path)):
              print_err("{0}WARNING: In module '{1}' -- the avembed file '{2}' does not exist.".format(console_msg_prefix, mod_path, av_path))

            av_name = os.path.splitext(os.path.basename(av_path))[0]

            # If the config file states the exercise should be removed, remove it
            if av_name in exercises and 'remove' in exercises[av_name] and exercises[av_name]['remove']:
              print('%sRemoving: %s' % (console_msg_prefix, av_name))

              # Config file states exercise should be removed, remove it from the RST file
              while (i < len(mod_data) and mod_data[i].rstrip() != ''):
                mod_data[i] = ''
                i += 1
            else:
              # Append module name to embedded exercise
              mod_data[i] += ' '*start_space + '   :module: %s\n' % mod_name

              if av_name not in exercises:
                # Add the name to a list of missing exercises
                missing_exercises.append(av_name)
              else:
                # Add the necessary information from the configuration file
                exer_conf = exercises[av_name]

                # List of valid options for avembed directive
                options = ['points', 'required', 'showhide', 'threshold', 'external_url', 'id']

                rst_options = [' '*start_space + '   :%s: %s\n' % (option, str(exer_conf[option])) for option in options if option in exer_conf]

                # JSAV grading options are not applicable to Khan Academy exercises or slideshows and will be ignored
                #if av_type not in ['ka', 'ss']:
                # Merge exercise-specific settings with the global settings (if applicable) so that the specific settings override the global ones
                if 'exer_options' in exer_conf:
                  xops = dict(list(config.glob_exer_options.items()) + list(exer_conf['exer_options'].items()))
                else:
                  xops = config.glob_exer_options

                # Convert python booleans to JavaScript booleans, URL-encode the string and append it to the RST options
                xop_str = '&amp;'.join(['%s=%s' % (option, value) if str(value) not in ['True', 'False'] else '%s=%s' % (option, str(value).lower()) for option, value in xops.items()])
                rst_options.append(' '*start_space +'   :exer_opts: %s\n' % xop_str)

                mod_data[i] += ''.join(rst_options)
        elif line.startswith('.. extrtoolembed::'):
          # Parse the arguments from the directive

          args = parse_directive_args(mod_data[i], i, 1, console_msg_prefix)
          if args:
            external_tool_name = args[0].replace("'", "")

            # Append module name to embedded exercise
            mod_data[i] += ' '*start_space + '   :module: %s\n' % mod_name

            if external_tool_name not in exercises:
              # Add the name to a list of missing exercises
              missing_exercises.append(external_tool_name)
            else:
              # Add the necessary information from the configuration file
              exer_conf = exercises[external_tool_name]
              # List of valid options for avembed directive
              options = ['long_name', 'learning_tool', 'launch_url', 'id']
              dir_opts = parse_directive_options(mod_data, i)
              options = [option for option in options if option not in dir_opts]
             
              rst_options = [' '*start_space + '   :%s: %s\n' % (option, str(exer_conf[option])) for option in options if option in exer_conf]

              mod_data[i] += ''.join(rst_options)
        elif line.startswith('.. showhidecontent::'):
          # Parse the arguments from the directive
          args = parse_directive_args(mod_data[i], i, 1, console_msg_prefix)
          section_id = args[0]

          processed_sections.append(section_id)

          if 'sections' in mod_attrib and section_id in mod_attrib['sections']:
            section_data = mod_attrib['sections'][section_id]

            if 'remove' in section_data and section_data['remove']:
              print('%sRemoving section: %s' % (console_msg_prefix, section_id))

              # Config file states section should be removed, remove it from the RST file
              mod_data[i] = ''
              i += 1

              while (i < len(mod_data) and (mod_data[i].startswith('   ') or mod_data[i].rstrip() == '')):
                mod_data[i] = ''
                i += 1

              # Back up one line so that when 'i' is incremented at the end of the loop it will point to the next directive
              i -= 1
            else:
              # Append all options provided in the section configuration unless they are on the ignore list
              ignore_opts = ['remove']
              rst_options = ['   :%s: %s\n' % (option, value) for option, value in list(section_data.items()) if option not in ignore_opts]
              mod_data[i] += ''.join(rst_options)
        elif line.startswith('.. codeinclude::'):
          code_name = mod_data[i].split(' ')[2].strip()

          # If the config file specifies a lang argument for this codeinclude, append it to the directive
          if 'codeinclude' in mod_attrib and code_name in mod_attrib['codeinclude']:
            mod_data[i] += '   :lang: %s\n' % mod_attrib['codeinclude'][code_name]
        elif line.startswith('.. avmetadata::'):
          avmetadata_found = True
        elif line.startswith('.. math::') and (i + 1) < len(mod_data) and ':label:' in mod_data[i + 1]:
          # Looks for math equations (with a label on the next line), increments the equation counter, and saves the information in 'num_ref_map'
          i += 1
          equation = re.split(':label:', mod_data[i], re.IGNORECASE)[1].strip()
          pattern = '%s#'
          if mod_num:
            pattern = '.' + pattern
          num_ref_map['equation-' + equation] = mod_num + pattern % str(counters['equation'])
          counters['equation'] += 1
        elif ':target:' in line:
          trgt =  re.split('target:', mod_data[i], re.IGNORECASE)[1]
          # Remove all whitespace from the target
          trgt = "".join(trgt.split())
          pattern = '%s#'
          if mod_num:
            pattern = '.' + pattern
          num_ref_map[trgt] = mod_num + pattern % counters['figure']
          counters['figure'] += 1
        elif line.startswith('.. odsalink::'):
          args = parse_directive_args(line, i, 1, console_msg_prefix)
          if args:
            links[args[0]] = True
        elif line.startswith('.. odsascript::'):
          args = parse_directive_args(line, i, 1, console_msg_prefix)
          if args:
            scripts[args[0]] = True

        i = i + 1

      error_shown = False
      for (msg, module_error) in errors:
        if module_error or section_title_found:
          print_err(msg)
          error_shown = True

      if not avmetadata_found:
        print_err("%sWARNING: %s does not contain an ..avmetadata:: directive" % (console_msg_prefix, mod_name))

      # the odsascript directive needs to be indented when compiling slides, otherwise
      # the directive will be stripped during compilation
      indent = '' if os.environ['SLIDES'] == 'no' else '   '
      mod_data.append('\n')
      for script, has_directive in scripts.items():
        if not os.path.exists('{0}/{1}'.format(config.odsa_dir,script)):
          print_err('%sWARNING: "%s" does not exist.' % (console_msg_prefix, script))
        if not has_directive:
          mod_data.append('{0}.. odsascript:: {1}\n'.format(indent, script))

      for link, has_directive in reversed(list(links.items())):
        if not os.path.exists('{0}/{1}'.format(config.odsa_dir, link)):
          print_err('%sWARNING: "%s" does not exist.' % (console_msg_prefix, link))
        if not has_directive:
          if os.environ['SLIDES'] == 'no':
            mod_data.insert(1, '\n.. odsalink:: {0}\n'.format(link))
          else:
            mod_data.append('\n{0}.. odsalink:: {1}'.format(indent, link))

      mod_sections = list(mod_attrib['sections'].keys()) if 'sections' in mod_attrib and mod_attrib['sections'] != None else []

      # Print a list of sections that appear in the config file but not the module
      missing_sections = list(set(mod_sections) - set(processed_sections))

      for section in missing_sections:
        print_err('%sWARNING: Section "%s" not found in module "%s"' % (console_msg_prefix, section, mod_path))

      # TODO: Should we print the missing exercises with each module or at the end like we do now?

      if error_shown:
        sys.exit(1)

      # Write the contents of the module file to the output src directory
      with codecs.open(''.join([config.book_src_dir, mod_name, '.rst']),'w', 'utf-8') as mod_file:
        mod_file.writelines(mod_data)

    # Make public fields accessible
    self.images = images
    self.missing_exercises = missing_exercises
    self.requirements_satisfied = requirements_satisfied
    self.todo_list = todo_list
    self.num_ref_map = num_ref_map
    self.cmap_dict = cmap_dict