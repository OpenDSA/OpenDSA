import os
import datetime
import re
from string import whitespace as ws
from config_templates import *

# Parses the arguments from a Sphinx directive, prints error messages if the directive doesn't match the expected format
def parse_directive_args(line, line_num, expected_num_args = -1, console_msg_prefix = ''):
  # Create a RegEx pattern that will match 1 or more whitespace characters
  p = re.compile('(%s)+' % ('|'.join([c for c in ws])))

  # Collapse multiple whitespaces inside the directive to ensure args will be split properly
  line = p.sub(' ', line).strip()

  # Print an error if the directive doesn't match what we expect
  directive = line[:line.find(':: ')].strip().split(' ')
  if len(directive) != 2 and directive[0] != '..':
    print console_msg_prefix + "ERROR: Invalid Sphinx directive declaration"

  # Isolates the arguments to the directive
  args = line[line.find(':: ') + 3:].split(' ')

  # Ensure the expected number of arguments was parsed (skip the check if -1)
  if expected_num_args > -1 and len(args) != expected_num_args:
    # Print a warning if inlineav is invoked without the minimum number of arguments
    print console_msg_prefix + "ERROR: Invalid directive arguments for object on line " + str(line_num) + ", skipping object"

  return args


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
    requirements_satisfied = []
    todo_list = []
    num_ref_map = {}
    # Initialize counters
    counters = {'figure': 1, 'anon_fig': 0, 'table': 1, 'example': 1, 'theorem': 1, 'equation': 1}

    exercises = mod_attrib['exercises']

    # Set a JS flag on the page, indicating whether or not the module can be completed
    if 'dispModComp' in mod_attrib:
      # Use the value specified in the configuration file to override the calculated value
      dispModComp = mod_attrib['dispModComp']
    else:
      dispModComp = False

      # Display 'Module Complete' only if the module contains at least one required exercise
      for exer_name, exer_obj in exercises.items():
        if 'required' in exer_obj and exer_obj['required']:
          dispModComp = True
          break

    filename = '{0}RST/source/{1}.rst'.format(config.odsa_dir, mod_path)

    if not os.path.exists(filename):
      print 'ERROR: Module does not exist: %s' % mod_path
    else:
      # Read the contents of the module file from the RST source directory
      with open(filename,'r') as mod_file:
        mod_data = mod_file.readlines()

      # Generate the RST header for the module
      header_data = {}
      header_data['mod_name'] = mod_name
      header_data['dispModComp'] = str(dispModComp).lower()
      header_data['long_name'] = mod_attrib['long_name'] if 'long_name' in mod_attrib else mod_name
      header_data['mod_chapter'] = chap
      header_data['mod_date'] = str(datetime.datetime.now()).split('.')[0]
      # Include an empty unicode directive when building slides
      header_data['unicode_directive'] = rst_header_unicode if os.environ.get('SLIDES', None) == "no" else ''
      # Prepend the header data to the exisiting module data
      mod_data.insert(0, rst_header % header_data)

      avmetadata_found = False

      # Alter the contents of the module based on the config file
      i = 0
      while i < len(mod_data):
        line = mod_data[i].strip().lower()

        # Determine the type of directive
        dir_type = get_directive_type(line)

        # Update figure, equation, theorem, table counters
        if dir_type in ['table', 'example', 'theorem', 'figure']:
          (num_ref_map, counters) = update_counters(mod_data[i - 2], dir_type, mod_num, num_ref_map, counters)

        if ':requires:' in mod_data[i]:
          # Parse the list of prerequisite topics from the module
          requires = [req.strip() for req in line.replace(':requires:', '').split(';')]

          # Print a warning message if a missing prereq is encountered
          for req in requires:
            if req != '' and req not in satisfied_requirements:
              print console_msg_prefix + "WARNING: " + req + " is an unsatisfied prerequisite for " + mod_name + ", line " + str(i + 1)
        elif line.startswith(':satisfies:'):
          # Parse the list of prerequisite topics this module satisfies and add them to a list of satisfied prereqs
          requirements_satisfied = [req.strip() for req in line.replace(':satisfies:', '').split(';')]
        elif line.startswith('.. figure::') or line.startswith('.. odsafig::'):
          # Pass -1 as the expected number of arguments because different directives have different numbers of args (-1 will ignore the check)
          args = parse_directive_args(mod_data[i], i, -1, console_msg_prefix)

          image_path = args[-1]
          images.append(os.path.basename(image_path))
        elif line.startswith('.. todo::'):
          if config.suppress_todo:
            # Remove TODO directives from the RST file
            mod_data[i] = ''
            i += 1

            while (i < len(mod_data) and (mod_data[i].startswith('   ') or mod_data[i].rstrip() == '')):
              mod_data[i] = ''
              i += 1

            # Back up one line so that when 'i' is incremented at the end of the loop it will point to the next directive
            i -= 1
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

                rst_options = ['   :%s: %s\n' % (option, str(exer_conf[option])) for option in options if option in exer_conf]
                mod_data[i] += ''.join(rst_options)
            elif av_type == 'dgm' and av_name in exercises and exercises[av_name] != {}:
              # If the configuration file contains attributes for diagrams, warn the user that attributes are not supported
              print console_msg_prefix + "WARNING: " + av_name + " is a diagram (attributes are not supported), line " + str(i + 1)
            elif av_type not in ['ss', 'dgm']:
              # If a warning if the exercise type doesn't match something we expect
              print console_msg_prefix + "WARNING: Unsupported type '" + av_type + "' specified for " + av_name + ", line " + str(i + 1)
        elif line.startswith('.. avembed::'):
          # Parse the arguments from the directive
          args = parse_directive_args(mod_data[i], i, 2, console_msg_prefix)

          if args:
            (av_name, av_type) = args
            av_name = os.path.splitext(os.path.basename(av_name))[0]

            # If the config file states the exercise should be removed, remove it
            if av_name in exercises and 'remove' in exercises[av_name] and exercises[av_name]['remove']:
              print console_msg_prefix + 'Removing: ' + av_name

              # Config file states exercise should be removed, remove it from the RST file
              while (i < len(mod_data) and mod_data[i].rstrip() != ''):
                mod_data[i] = ''
                i += 1
            else:
              # Append module name to embedded exercise
              mod_data[i] += '   :module: %s\n' % mod_name

              if av_name not in exercises:
                # Add the name to a list of missing exercises
                missing_exercises.append(av_name)
              else:
                # Add the necessary information from the configuration file
                exer_conf = exercises[av_name]

                # List of valid options for avembed directive
                options = ['long_name', 'points', 'required', 'showhide', 'threshold']

                rst_options = ['   :%s: %s\n' % (option, str(exer_conf[option])) for option in options if option in exer_conf]

                # JSAV grading options are not applicable to Khan Academy exercises or slideshows and will be ignored
                if av_type not in ['ka', 'ss']:
                  # Merge exercise-specific settings with the global settings (if applicable) so that the specific settings override the global ones
                  if 'jsav_exer_options' in exer_conf:
                    jxops = dict(config.glob_jsav_exer_options.items() + exer_conf['jsav_exer_options'].items())
                  else:
                    jxops = config.glob_jsav_exer_options

                  # URL-encode the string and append it to the RST options
                  jxop_str = '&amp;'.join(['JXOP-%s=%s' % (opt, str(jxops[opt])) for opt in jxops])
                  rst_options.append('   :jsav_exer_opt: %s\n' % jxop_str)

                mod_data[i] += ''.join(rst_options)
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
        print console_msg_prefix + 'WARNING: %s does not contain an ..avmetadata:: directive' % mod_name

      # Write the contents of the module file to the output src directory
      with open(''.join([config.book_src_dir, mod_name, '.rst']),'w') as mod_file:
        mod_file.writelines(mod_data)

    # Make public fields accessible
    self.images = images
    self.missing_exercises = missing_exercises
    self.requirements_satisfied = requirements_satisfied
    self.todo_list = todo_list
    self.num_ref_map = num_ref_map
