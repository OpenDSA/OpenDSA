import os
import datetime
import re
from string import whitespace as ws
from config_templates import *


def parse_directive_args(line, line_num, expected_args, console_msg_prefix = ''):
  # Create a RegEx pattern that will match 1 or more whitespace characters
  p = re.compile('(%s)+' % ('|'.join([c for c in ws])))

  # Collapse multiple whitespaces inside the directive to ensure args will be split properly
  line = p.sub(' ', line.strip())

  args = line.split(' ')

  # Eliminiate the '..' and directive name
  args = args[2:]

  # Ensure the expected number of arguments was parsed
  if len(args) < expected_args:
    # Print a warning if inlineav is invoked without the minimum number of arguments
    print console_msg_prefix + "ERROR: Invalid directive arguments for object on line " + str(line_num) + ", skipping object"
    return None

  return args


class ODSA_RST_Module:

  def __init__(self, config, mod_path, mod_attrib = {'exercises': {} }, satisfied_requirements = [], chap = None, depth = 0):
    todo_count = 0 # TODO: figure out what to do with TODOs

    console_msg_prefix = '  ' * (depth + 1)

    mod_path = os.path.splitext(mod_path)[0]
    mod_name = os.path.basename(mod_path)

    images = []
    missing_exercises = []
    requirements_satisfied = []

    exercises = mod_attrib['exercises']

    # Read the contents of the module file from the RST source directory
    with open('{0}RST/source/{1}.rst'.format(config.odsa_dir, mod_path),'r') as mod_file:
      mod_data = mod_file.readlines()

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

    # If these JavaScript variables are changed, be sure to change them in ToDo.rst file (preprocessor.py)
    header_data = {}
    header_data['mod_name'] = mod_name
    header_data['dispModComp'] = str(dispModComp).lower()
    header_data['long_name'] = mod_attrib['long_name'] if 'long_name' in mod_attrib else mod_name
    header_data['mod_chapter'] = chap if chap else ''
    header_data['mod_date'] = str(datetime.datetime.now()).split('.')[0]
    # Include an empty unicode directive when building slides
    header_data['unicode_directive'] = rst_header_unicode if os.environ.get('SLIDES', None) == "no" else ''
    # Prepend the header data to the exisiting module data
    mod_data.insert(0, rst_header % header_data)

    avmetadata_found = False

    # Alter the contents of the module based on the config file
    i = 1
    while i < len(mod_data):
      if ':requires:' in mod_data[i]:
        # Parse the list of prerequisite topics from the module
        requires = [req.strip() for req in mod_data[i].replace(':requires:', '').split(';')]

        # Print a warning message if a missing prereq is encountered
        for req in requires:
          if req not in satisfied_requirements:
            print console_msg_prefix + "WARNING: " + req + " is an unsatisfied prerequisite for " + mod_name + ", line " + str(i + 1)
      elif ':satisfies:' in mod_data[i]:
        # Parse the list of prerequisite topics this module satisfies and add them to a list of satisfied prereqs
        requirements_satisfied = [req.strip() for req in mod_data[i].replace(':satisfies:', '').split(';')]
      elif '.. figure::' in mod_data[i] or '.. odsafig::' in mod_data[i]:
        args = parse_directive_args(mod_data[i], i + 1, 0, console_msg_prefix)
        image_path = args[-1]
        images.append(os.path.basename(image_path))
      elif '.. TODO::' in mod_data[i]:
        if config.suppress_todo:
          # Remove TODO directives from the RST file
          mod_data[i] = ''
          i += 1

          while (i < len(mod_data) and (mod_data[i].startswith('   ') or mod_data[i].rstrip() == '')):
            mod_data[i] = ''
            i += 1
        else:
          # Increment the TODO directive counter
          todo_count += 1
      elif '.. inlineav::' in mod_data[i]:
        # Parse the arguments from the directive
        args = parse_directive_args(mod_data[i], i + 1, 2, console_msg_prefix)

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
      elif '.. avembed::' in mod_data[i]:
        # Parse the arguments from the directive
        args = parse_directive_args(mod_data[i], i + 1, 2, console_msg_prefix)

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
      elif '.. avmetadata::' in mod_data[i]:
        avmetadata_found = True

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
