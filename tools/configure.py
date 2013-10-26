#! /usr/bin/python
#
# This script builds an OpenDSA textbook according to a specified configuration file
#   - Runs config_validator.py on the specified config file to detect and inform the user of any errors
#   - Reads the configuration information from the specified JSON config file
#   - Auto-detects the OpenDSA root directory location
#   - Sets sensible defaults for optional configuration settings
#   - Converts the OpenDSA root directory and specified code and output directories into Unix-style paths so that relative paths are calculated correctly
#     - Handles absolute or relative paths for output and code directories (relative paths are rooted at the OpenDSA directory)
#   - Optionally builds JSAV to make sure the library is up-to-date, if specified in the configuration file
#   - Creates a source directory in the output directory and generates a Makefile and conf.py file
#     - Makefile is configured to copy the original .htaccess file from lib to the html output directory
#     - conf.py is configured to point to the original ODSAextensions and _themes directories
#     - CONTROLLING INCLUSION OF GLOBAL JS AND CSS FILES - conf.py contains a dictionary called html_context
#       which controls what JS and CSS files are included on ALL module pages, please see the assoicated comment
#       for more information
#   - Reads the RST source file for each module which appears in the configuration file
#     - Appends the list of external JavaScript and CSS links and a Sphinx self reference directive to every module
#       - Ensures we can reference any module, without relying on the module author to correctly add the reference link
#     - Optionally, appends a raw JavaScript flag to each module indicating whether or not the module can be completed
#       This allows the configuration file to override the default behavior of the client-side framework which is to allow
#       module completion only if the module contains required exercises
#     - For each figure encountered in the RST file, adds the name to a list so that we only copy the images used in the book
#       to the output directory
#     - For each inlineav directive encountered, configure.py attempts to append additional information from the configuration file
#       - If the specified exercise does not appear in the configuration file, the Sphinx directive will be included, but no
#         additional information will be included so the defaults (specified in the Sphinx directive file) will be used.  The
#         name of the exercise is added to a list of missing exercises which will be displayed to the user
#       - Specifically adds 'long_name', 'points', 'required' and 'threshold'
#     - For each avembed directive encountered, configure.py attempts to append additional information from the configuration file
#       - UNLESS the 'remove' attribute is present and "true", in which case the entire avembed directive is removed
#       - If the specified exercise does not appear in the configuration file, the Sphinx directive will be included, but no
#         additional information will be included so the defaults (specified in the Sphinx directive file) will be used.  The
#         name of the exercise is added to a list of missing exercises which will be displayed to the user
#       - Specifically adds 'long_name', 'points', 'required', 'showhide' and 'threshold'
#     - The configured module RST file is written to the source directory in the output file
#   - Generates an index.rst file based on which modules were specified in the config file
#   - Prints out a list of any exercises encountered in RST source files that did not appear in the config file
#   - Copies _static directory and the images contained in the list of encountered images to the output source directory, also
#     creates a copy of the config file in the _static directory for use by the gradebook page
#   - Generates _static/config.js which contains settings needed by the client-side framework that can be configured
#     using the config file
#   - Generates an index.html file in the output directory of the new book which redirects (via JavaScript) to the html/ directory
#   - Optionally runs make on the output directory to build the textbook, if specified in the configuration file

import sys
import os
import shutil
import distutils.dir_util
import distutils.file_util
import json
import collections
import re
import subprocess
import datetime
from optparse import OptionParser
from config_validator import validate_config_file
from config_templates import *

# The location in the output directory where the built HTML files go
rel_ebook_path = 'html/'

# List of characters Sphinx uses for headers, the depth of a section header determines which character to use
sphinx_header_chars = ['=', '-', '`', "'", '.', '*', '+', '^']

# List of exercises encountered in RST files that do not appear in the configuration file
missing_exercises = []

# List of modules that have been processed, do not allow multiple modules with the same name (would cause a conflict in the database)
processed_modules = []

# List of images encountered while processing module files, these will be copied from the source/Images to Images in the output source directory
images = []

# Keeps a count of how many ToDo directives are encountered
todo_count = 0

# List of fulfilled prerequisite topics
satisfied_requirements = []


def process_path(path, abs_prefix):
  """Converts relative to absolute paths and all paths to Unix-style paths"""

  # If the path is relative, make it absolute
  if not os.path.isabs(path):
    path = ''.join([abs_prefix, path])

  # Convert to Unix path
  path = path.replace("\\", "/")
  # Ensure path ends with '/'
  if not path.endswith('/'):
    path += '/'

  return path

def process_section(conf_data, section, index_rst, depth, chap=None):
  for subsect in section:
    if 'exercises' in section[subsect]:
      process_module(conf_data, index_rst, subsect, section[subsect], depth, chap)
    else:
      print ("  " * depth) + subsect
      index_rst.write(subsect + '\n')
      index_rst.write((sphinx_header_chars[depth] * len(subsect)) + "\n\n")
      index_rst.write(".. toctree::\n")
      index_rst.write("   :numbered:\n")
      index_rst.write("   :maxdepth: 3\n\n")
      process_section(conf_data, section[subsect], index_rst, depth + 1, subsect)

  index_rst.write("\n")

def process_module(conf_data, index_rst, mod_path, mod_attrib={'exercises':{}}, depth=0, chap=None):
  global todo_count
  global satisfied_requirements

  odsa_dir = get_odsa_dir()

  mod_path = os.path.splitext(mod_path)[0]
  mod_name = os.path.basename(mod_path)
  mod_chapter = ''
  if chap:
     mod_chapter = chap

  mod_date = str(datetime.datetime.now()).split('.')[0]
  # Print error message and exit if duplicate module name is detected
  if mod_name in processed_modules:
    print 'ERROR: Duplicate module name detected, module: ' + mod_name
    sys.exit(1)

  # Add module to list of modules processed
  processed_modules.append(mod_name)

  print ("  " * depth) + mod_name
  index_rst.write("   %s\n" % mod_name)

  if mod_name == 'ToDo':
    return

  exercises = mod_attrib['exercises']

  # Read the contents of the module file from the RST source directory
  with open('{0}RST/source/{1}.rst'.format(odsa_dir, mod_path),'r') as mod_file:
    mod_data = mod_file.readlines()

  long_name = mod_attrib['long_name'] if 'long_name' in mod_attrib else mod_name

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

  # If these JavaScript variables are changed, be sure to change them in the index.rst file (above) and ToDo.rst file (preprocessor.py)
  header_data = {}
  header_data['mod_name'] = mod_name
  header_data['dispModComp'] = str(dispModComp).lower()
  header_data['long_name'] = long_name
  header_data['mod_chapter'] = mod_chapter
  header_data['mod_date'] = mod_date
  #no unicode directive when building course notes
  if os.environ.get('SLIDES', None) == "yes":
    header_data['unicode_directive'] = ''
  else:
    header_data['unicode_directive'] = rst_header_unicode
  header_data['orig_data'] = mod_data[0]
  mod_data[0] = rst_header % header_data

  avmetadata_found = False

  # Alter the contents of the module based on the config file
  i = 0
  while i < len(mod_data):
    if ':requires:' in mod_data[i]:
      # Parse the list of prerequisite topics from the module
      requires = [req.strip() for req in mod_data[i].replace(':requires:', '').split(';')]

      # Print a warning message if a missing prereq is encountered
      for req in requires:
        if req not in satisfied_requirements:
          print ("  " * (depth + 1 )) + "WARNING: " + req + " is an unsatisfied prerequisite for " + mod_name + ", line " + str(i + 1)
    elif ':satisfies:' in mod_data[i]:
      # Parse the list of prerequisite topics this module satisfies and add them to the list of satisfied prereqs
      satisfied_requirements += [req.strip() for req in mod_data[i].replace(':satisfies:', '').split(';')]
    elif '.. figure::' in mod_data[i] or '.. odsafig::' in mod_data[i]:
      l_image = len(mod_data[i].split(' '))
      image_path = mod_data[i].split(' ')[l_image-1].rstrip()
      images.append(os.path.basename(image_path))
    elif '.. TODO::' in mod_data[i]:
      if conf_data['suppress_todo']:
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
      args = mod_data[i].strip().split(' ')

      if len(args) < 4:
        # Print a warning if inlineav is invoked without the minimum number of arguments
        print ("  " * (depth + 1 )) + "ERROR: Invalid directive arguments for object on line " + str(i + 1) + ", skipping object"
      else:
        av_name = args[2].rstrip()
        type = args[3].rstrip()

        if type == 'ss':
          if av_name not in exercises:
            # If the SS is not listed in the config file, add its name to a list of missing exercises, ignore missing diagrams
            missing_exercises.append(av_name)
          else:
            # Add the necessary information from the slideshow from the configuration file
            # Diagrams (type == 'dgm') do not require this extra information
            exer_conf = exercises[av_name]

            # List of valid options for inlineav directive
            options = ['long_name', 'points', 'required', 'threshold']

            rst_options = ['   :%s: %s\n' % (option, str(exer_conf[option])) for option in options if option in exer_conf]
            mod_data[i] += ''.join(rst_options)
        elif type == 'dgm' and av_name in exercises and exercises[av_name] != {}:
          # If the configuration file contains attributes for diagrams, warn the user that attributes are not supported
          print ("  " * (depth + 1 )) + "WARNING: " + av_name + " is a diagram (attributes are not supported), line " + str(i + 1)
        elif type not in ['ss', 'dgm']:
          # If a warning if the exercise type doesn't match something we expect
          print ("  " * (depth + 1 )) + "WARNING: Unsupported type '" + type + "' specified for " + av_name + ", line " + str(i + 1)
    elif '.. avembed::' in mod_data[i]:
      # Parse the arguments from the directive
      args = mod_data[i].strip().split(' ')

      if len(args) < 4:
        # Print a warning if avembed is invoked without the minimum number of arguments
        print ("  " * (depth + 1 )) + "ERROR: Invalid directive arguments for embedded object on line " + str(i + 1) + ", skipping object"
      else:
        av_name = args[2].rstrip()
        av_name = av_name[av_name.rfind('/') + 1:].replace('.html', '')
        type = args[3].rstrip()

        # If the config file states the exercise should be removed, remove it
        if av_name in exercises and 'remove' in exercises[av_name] and exercises[av_name]['remove']:
          print ("  " * (depth + 1 )) + 'Removing: ' + av_name

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
            if type not in ['ka', 'ss']:
              # Merge exercise-specific settings with the global settings (if applicable) so that the specific settings override the global ones
              if 'jsav_exer_options' in exer_conf:
                jxops = dict(conf_data['glob_jsav_exer_options'].items() + exer_conf['jsav_exer_options'].items())
              else:
                jxops = conf_data['glob_jsav_exer_options']

              # URL-encode the string and append it to the RST options
              jxop_str = '&amp;'.join(['JXOP-%s=%s' % (opt, str(jxops[opt])) for opt in jxops])
              rst_options.append('   :jsav_exer_opt: %s\n' % jxop_str)

            mod_data[i] += ''.join(rst_options)
    elif '.. avmetadata::' in mod_data[i]:
      avmetadata_found = True

    i = i + 1

  if not avmetadata_found:
    print ("  " * (depth + 1)) + 'WARNING: %s does not contain an ..avmetadata:: directive' % mod_name

  # Write the contents of the module file to the output src directory
  with open('{0}{1}.rst'.format(get_src_dir(conf_data), mod_name),'w') as mod_file:
    mod_file.writelines(mod_data)

def set_defaults(conf_data):
  """Assign default values to optional config attributes"""

  odsa_dir = get_odsa_dir()

  # Parse the name of the config file to use as the book name
  conf_data['name'] = os.path.basename(config_file).replace('.json', '')

  if 'book_dir' not in conf_data:
    conf_data['book_dir'] = 'Books'

  if 'theme_dir' not in conf_data:
    conf_data['theme_dir'] = '%sRST/source/_themes' % odsa_dir
  if 'theme' not in conf_data:
    conf_data['theme'] = 'haiku'

  # If no backend address is specified, use an empty string to specify a disabled server
  if 'backend_address' not in conf_data:
    conf_data['backend_address'] = ''

  # Strip the '/' from the end of the SERVER_URL
  conf_data['backend_address'] = conf_data['backend_address'].rstrip('/')

  if 'suppress_todo' not in conf_data:
    conf_data['suppress_todo'] = False

  # Assume exercises are hosted on same domain as modules
  if 'av_origin' not in conf_data:
    conf_data['av_origin'] = conf_data['module_origin']

  # Assume exercises are hosted on same domain as modules
  if 'exercise_origin' not in conf_data:
    conf_data['exercise_origin'] = conf_data['module_origin']

  # If not global exercise options are specified, defer to exercise-specific options or the defaults in odsaAV.js
  if 'glob_jsav_exer_options' not in conf_data:
    conf_data['glob_jsav_exer_options'] = {}

  # 'exercises_root_dir' should default to the OpenDSA root directory
  if 'av_root_dir' not in conf_data:
    conf_data['av_root_dir'] = odsa_dir

  # 'exercises_root_dir' should default to the OpenDSA root directory
  if 'exercises_root_dir' not in conf_data:
    conf_data['exercises_root_dir'] = odsa_dir

  # Require slideshows to be fully completed for credit by default
  if 'req_full_ss' not in conf_data:
    conf_data['req_full_ss'] = True

  # Allow anonymous credit by default
  if 'allow_anonymous_credit' not in conf_data:
    conf_data['allow_anonymous_credit'] = True


def get_odsa_dir():
  """Calculate the path to the OpenDSA root directory based on the location of this file"""

  # Auto-detect ODSA directory
  (odsa_dir, script) = os.path.split(os.path.abspath(__file__))

  # Convert to Unix-style path and move up a directory
  # (assumes configure.py is one level below root OpenDSA directory)
  return os.path.abspath(odsa_dir.replace("\\", "/") + '/..') + '/'

def get_output_dir(conf_data):
  odsa_dir = get_odsa_dir()
  return '%s%s/' % (process_path(conf_data['book_dir'], odsa_dir), conf_data['name'])

def get_src_dir(conf_data):
  return get_output_dir(conf_data) + 'source/'


def configure(config_file, slides = False):
  """Configure an OpenDSA textbook based on a validated configuration file"""
  global satisfied_requirements

  print "Configuring OpenDSA, using " + config_file + '\n'

  # Read the configuration data
  with open(config_file) as config:
    # Force python to maintain original order of JSON objects
    conf_data = json.load(config, object_pairs_hook=collections.OrderedDict)

  odsa_dir = get_odsa_dir()

  # Assign defaults to optional settings
  set_defaults(conf_data)

  # Add the list of topics the book assumes students know to the list of fulfilled prereqs
  if 'assumes' in conf_data:
    satisfied_requirements += [a.strip() for a in conf_data['assumes'].split(';')]

  # Process the code and output directory paths, get code language
  code_dir = process_path(conf_data['code_dir'], odsa_dir)
  output_dir = get_output_dir(conf_data)
  code_lang = conf_data['code_dir'].rsplit('/',1)[1].lower()
  #special case treats Processing as Java
  if code_lang =='processing':
    code_lang = 'java'

  # Prevent user from setting the output directory where the configuration process
  # would overwrite important things
  if output_dir == odsa_dir or output_dir == (odsa_dir + "RST/"):
    print "Unable to build in this location, please select a different directory"
    sys.exit(1)

  cwd = os.getcwd()

  if 'build_JSAV' in conf_data and conf_data['build_JSAV']:
    # Rebuild JSAV
    print "Building JSAV\n"
    status = 0
    try:
      os.chdir(odsa_dir + 'JSAV/')
      with open(os.devnull, "w") as fnull:
        status = subprocess.check_call('make', shell=True, stdout=fnull)
    finally:
      os.chdir(cwd)

    if status != 0:
      print "JSAV make failed"
      print status
      sys.exit(1)

  print "Writing files to " + output_dir + "\n"

  # Initialize output directory
  src_dir = get_src_dir(conf_data)
  distutils.dir_util.mkpath(src_dir)

  # Generate the index.rst file
  with open(src_dir + 'index.rst', 'w+') as index_rst:
    print "Generating index.rst\n"
    print "Processing..."

    header_data = {}
    header_data['mod_name'] = 'index'
    header_data['dispModComp'] = 'false'
    header_data['long_name'] = 'Contents'
    header_data['orig_data'] = index_header
    header_data['mod_chapter'] = ''
    header_data['mod_date'] = ''
    slides_lib = ''
    if slides:
      header_data['unicode_directive'] = ''
      slides_lib = 'hieroglyph'
    else:
      header_data['unicode_directive'] = rst_header_unicode

    index_rst.write(rst_header % header_data)

    # Process all the chapter and module information
    process_section(conf_data, conf_data['chapters'], index_rst, 0)

    index_rst.write(".. toctree::\n")
    index_rst.write("   :maxdepth: 3\n\n")

    # Process the Gradebook as well
    if not slides:
      process_module(conf_data, mod_path='Gradebook', index_rst=index_rst)

    if todo_count > 0:
      index_rst.write("   ToDo\n")

    index_rst.write("\n")
    index_rst.write("* :ref:`genindex`\n")
    index_rst.write("* :ref:`search`\n")


  # Print out a list of any exercises found in RST files that do not appear in the config file
  if len(missing_exercises) > 0:
    print "\nExercises Not Listed in Config File:"

    for exercise in missing_exercises:
      print '  ' + exercise

  # Initialize options for conf.py
  options = {}
  options['title'] = conf_data['title']
  options['book_name'] = conf_data['name']
  options['server_url'] = conf_data['backend_address']
  options['module_origin'] = conf_data['module_origin']
  options['theme_dir'] = conf_data['theme_dir']
  options['theme'] = conf_data['theme']
  options['odsa_root'] = odsa_dir
  options['output_dir'] = output_dir
  options['rel_ebook_path'] = rel_ebook_path
  options['code_dir'] = code_dir
  options['code_lang'] = code_lang
  options['av_dir'] = conf_data['av_root_dir']
  options['exercises_dir'] = conf_data['exercises_root_dir']
  # TODO: Temporary fix until preprocessor.py stops creating a ToDo.rst file when were are no TODO directives
  options['remove_todo'] = 'rm source/ToDo.rst'
  # The relative path between the ebook output directory (where the HTML files are generated) and the root ODSA directory
  options['eb2root'] = os.path.relpath(odsa_dir, output_dir + rel_ebook_path) + '/'
  options['slides_lib'] = slides_lib

  if todo_count > 0:
    options['remove_todo'] = ''

  # Create a Makefile in the output directory
  with open(output_dir + 'Makefile','w') as makefile:
    makefile.writelines(makefile_template % options)

  # Create conf.py file in output source directory
  with open(src_dir + 'conf.py','w') as conf_py:
    conf_py.writelines(conf % options)

  # Copy _static and select images from RST/source/Images/ to the output source directory
  distutils.dir_util.copy_tree(odsa_dir + 'RST/source/_static/', src_dir + '_static', update=1)

  distutils.dir_util.mkpath(src_dir + 'Images/')

  for image in images:
    distutils.file_util.copy_file(odsa_dir + 'RST/source/Images/' + image, src_dir + 'Images/')

  # Copy config file to _static directory
  distutils.file_util.copy_file(config_file, src_dir + '_static/')


  # Create source/_static/config.js in the output directory
  # Used to set global settings for the client-side framework
  with open(src_dir + '_static/config.js','w') as config_js:
    conf_js_data = {}
    conf_js_data['book_name'] = conf_data['name']
    conf_js_data['server_url'] = conf_data['backend_address']
    conf_js_data['module_origin'] = conf_data['module_origin']
    conf_js_data['exercise_origin'] = conf_data['exercise_origin']
    conf_js_data['av_origin'] = conf_data['av_origin']
    conf_js_data['allow_anon_credit'] = str(conf_data['allow_anonymous_credit']).lower()
    conf_js_data['req_full_ss'] = str(conf_data['req_full_ss']).lower()

    config_js.writelines(config_js_template % conf_js_data)


  with open(output_dir + 'index.html','w') as index_html:
    index_html.writelines(index_html_template % rel_ebook_path)

  # Optionally run make on the output directory
  if 'build_ODSA' not in conf_data or conf_data['build_ODSA']:
    print '\nBuilding textbook...'

    try:
      os.chdir(output_dir)
      if slides:
        proc = subprocess.Popen(['make','slides'], stdout=subprocess.PIPE)
      else:
        proc = subprocess.Popen('make', stdout=subprocess.PIPE)
      for line in iter(proc.stdout.readline,''):
        print line.rstrip()
    finally:
      os.chdir(cwd)



# Code to execute when run as a standalone program
if __name__ == "__main__":
  parser = OptionParser()
  parser.add_option("-s", "--slides", help="causes configure.py to create slides", dest="slides", action="store_true")
  (options, args) = parser.parse_args()

  if options.slides:
    os.environ['SLIDES'] = 'yes'
  else:
    os.environ['SLIDES'] = 'no'

  # Process script arguments
  if len(sys.argv) > 3:
    print "Invalid config filename"
    print "Usage: " + sys.argv[0] + " [-s] config_file"
    sys.exit(1)

  config_file = args[0]

  validate_config_file(config_file)

  configure(config_file, options.slides)
