#! /usr/bin/python
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

# Prints the given string to standard error
def print_err(err_msg):
  sys.stderr.write('%s\n' % err_msg)

# Generates a string that will be appended to the RST module header that sets the module options appropriately
def format_mod_options(options):
  option_str = ''

  for option, value in options.iteritems():
    # Convert Python booleans to JavaScript booleans and quote strings
    if str(value) in ['True', 'False']:
      value = str(value).lower()
    elif isinstance(value, basestring):
      value = "'%s'" % value;

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
    for exer_name, exer_obj in mod_attrib['exercises'].items():
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
  args = line[line.find(':: ') + 3:].split(' ')

  # Ensure the expected number of arguments was parsed (skip the check if -1)
  if expected_num_args > -1 and len(args) != expected_num_args:
    # Print a warning if inlineav is invoked without the minimum number of arguments
    print_err("%sERROR: Invalid directive arguments for object on line %d, skipping object" % (console_msg_prefix, line_num))

  return args

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
    if args[2].replace(" ", "") not in cmap_dict['linking_phrase']:
      #size_lp = len(cmap_dict['linking_phrase'])
      #cmap_dict['linking_phrase']['lp-' + str(size_lp + 1)] = args[2]
      cmap_dict['linking_phrase'][args[2].replace(" ", "").strip().rstrip('\n')] = args[2]
    size_c = len(cmap_dict['connections'])
    #cmap_dict['linking_phrase']['lp-' + str(size_lp + 1)] = args[2]
    cmap_dict['connections']['con-' + str(size_c + 1)] = {'from': term, 'to': args[2].replace(" ", "").strip().rstrip('\n')}
    cmap_dict['connections']['con-' + str(size_c + 2)] = {'from': args[2].replace(" ", "").strip().rstrip('\n'), 'to': args[1]}
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


def get_directive_type(directive):
  if isTable(directive):
    return 'table'

  elif isExample(directive):
    return 'example'

  elif isTheorem(directive):
    return 'theorem'

  elif isFigure(directive):
    return 'figure'

  return ''

def update_counters(label_line, dir_type, mod_num, num_ref_map, counters):
  label = ''

  # Parse the label from format '.. _Label:' (if it exists)
  if label_line.startswith('.. _'):
    label = label_line.strip()[4:-1]

  if label != '':
    # If the item is labeled, record its number and increment its counter
    num_ref_map[label] = mod_num + '.%s#' % counters[dir_type]
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


def process_ref_chap(extension, line, book_objects, start_space, last):
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
      if not rel_tags[1].strip().lower() in lower_listed_modules:
        #just output anchor text
        line_t = line_t.replace(extension,'')
        line_t = line_t.replace('`' + rel_labels + '`', rel_tags[0])
    if len(rel_tags) == 5:
      if rel_tags[3].strip().lower() in lower_listed_modules:
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

  def __init__(self, config, mod_path, mod_attrib = {'exercises': {} }, satisfied_requirements = [], chap = '', depth = 0, current_section_numbers = []):
    console_msg_prefix = '  ' * (depth + 1)

    mod_path = os.path.splitext(mod_path)[0]
    mod_name = os.path.basename(mod_path)
    mod_num = ''

    # Hack to maintain the same numbering scheme as the old preprocessor
    if len(current_section_numbers) > 0:
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
        mod_options = dict(config.glob_mod_options.items() + mod_attrib['mod_options'].items())
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

      # Alter the contents of the module based on the config file
      i = 0
      while i < len(mod_data):
        start_space = 0
        for s in mod_data[i]:
          if s.isspace():
            start_space += 1
          else:
             break

        line = mod_data[i].strip()
        next_line =  mod_data[i+1].strip() if i+1 < len(mod_data) else ''
        is_chapter = next_line == "="*len(line) or next_line == "-"*len(line)
        if is_chapter:
          processed_sections.append(line)

        # Determine the type of directive
        dir_type = get_directive_type(line)

        # Update figure, equation, theorem, table counters
        if dir_type in ['table', 'example', 'theorem', 'figure']:
          (num_ref_map, counters) = update_counters(mod_data[i - 2], dir_type, mod_num, num_ref_map, counters)

        if ':ref:' in line:
          if mod_data[i].endswith('\n'):
             last = '\n'
          else:
             last = ' '
          mod_data[i] = process_ref_chap(':ref:', line, config.listed_modules, start_space, last)
          line = mod_data[i].strip().lower()

        if ':chap:' in line:
          if mod_data[i].endswith('\n'):
             last = '\n'
          else:
             last = ' '
          mod_data[i] = process_ref_chap(':chap:', line, config.listed_chapters, start_space, last)
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

            if av_type == 'ss':
              if av_name not in exercises:
                # If the SS is not listed in the config file, add its name to a list of missing exercises, ignore missing diagrams
                missing_exercises.append(av_name)
              else:
                # Add the necessary information from the slideshow from the configuration file
                # Diagrams (av_type == 'dgm') do not require this extra information
                exer_conf = exercises[av_name]

                # List of valid options for inlineav directive
                options = ['long_name', 'points', 'required', 'threshold']

                rst_options = [' '*start_space + '   :%s: %s\n' % (option, str(exer_conf[option])) for option in options if option in exer_conf]
                mod_data[i] += ''.join(rst_options)
            elif av_type == 'dgm' and av_name in exercises and exercises[av_name] != {}:
              # If the configuration file contains attributes for diagrams, warn the user that attributes are not supported
              print_err("%sWARNING: %s is a diagram (attributes are not supported), line %d" %(console_msg_prefix, av_name, i + 1))
            elif av_type not in ['ss', 'dgm']:
              # If a warning if the exercise type doesn't match something we expect
              print_err("%sWARNING: Unsupported type '%s' specified for %s, line %d" % (console_msg_prefix, av_type, av_name, i + 1))
        elif line.startswith('.. avembed::'):
          # Parse the arguments from the directive
          args = parse_directive_args(mod_data[i], i, 2, console_msg_prefix)

          if args:
            (av_name, av_type) = args
            av_name = os.path.splitext(os.path.basename(av_name))[0]

            # If the config file states the exercise should be removed, remove it
            if av_name in exercises and 'remove' in exercises[av_name] and exercises[av_name]['remove']:
              print '%sRemoving: %s' % (console_msg_prefix, av_name)

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
                options = ['long_name', 'points', 'required', 'showhide', 'threshold', 'external_url']

                rst_options = [' '*start_space + '   :%s: %s\n' % (option, str(exer_conf[option])) for option in options if option in exer_conf]

                # JSAV grading options are not applicable to Khan Academy exercises or slideshows and will be ignored
                #if av_type not in ['ka', 'ss']:
                # Merge exercise-specific settings with the global settings (if applicable) so that the specific settings override the global ones
                if 'exer_options' in exer_conf:
                  xops = dict(config.glob_exer_options.items() + exer_conf['exer_options'].items())
                else:
                  xops = config.glob_exer_options

                # Convert python booleans to JavaScript booleans, URL-encode the string and append it to the RST options
                xop_str = '&amp;'.join(['%s=%s' % (option, value) if str(value) not in ['True', 'False'] else '%s=%s' % (option, str(value).lower()) for option, value in xops.iteritems()])
                rst_options.append(' '*start_space +'   :exer_opts: %s\n' % xop_str)

                mod_data[i] += ''.join(rst_options)
        elif line.startswith('.. showhidecontent::'):
          # Parse the arguments from the directive
          args = parse_directive_args(mod_data[i], i, 1, console_msg_prefix)
          section_id = args[0]

          processed_sections.append(section_id)

          if 'sections' in mod_attrib and section_id in mod_attrib['sections']:
            section_data = mod_attrib['sections'][section_id]

            if 'remove' in section_data and section_data['remove']:
              print '%sRemoving section: %s' % (console_msg_prefix, section_id)

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
              rst_options = ['   :%s: %s\n' % (option, value) for option, value in section_data.items() if option not in ignore_opts]
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
          num_ref_map['equation-' + equation] = mod_num + '.%s#' % str(counters['equation'])
          counters['equation'] += 1
        elif ':target:' in line:
          trgt =  re.split('target:', mod_data[i], re.IGNORECASE)[1]
          # Remove all whitespace from the target
          trgt = "".join(trgt.split())
          num_ref_map[trgt] = mod_num + '.%s#' % counters['figure']
          counters['figure'] += 1

        i = i + 1

      if not avmetadata_found:
        print_err("%sWARNING: %s does not contain an ..avmetadata:: directive" % (console_msg_prefix, mod_name))

      mod_sections = mod_attrib['sections'].keys() if 'sections' in mod_attrib else []

      # Print a list of sections that appear in the config file but not the module
      missing_sections = list(set(mod_sections) - set(processed_sections))

      for section in missing_sections:
        print_err('%sWARNING: Section "%s" not found in module' % (console_msg_prefix, section))

      # TODO: Should we print the missing exercises with each module or at the end like we do now?


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
