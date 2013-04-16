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
from config_validator import validate_config_file

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

rst_header = '''\
.. _%(mod_name)s:
.. |--| unicode:: U+2013   .. en dash
.. |---| unicode:: U+2014  .. em dash, trimming surrounding whitespace
   :trim:

.. raw:: html

   <script>ODSA.SETTINGS.DISP_MOD_COMP = %(dispModComp)s;ODSA.SETTINGS.MODULE_NAME = "%(mod_name)s";ODSA.SETTINGS.MODULE_LONG_NAME = "%(long_name)s";</script>

%(orig_data)s'''

# Used to generate the index.rst file
index_header = '''\
.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. OpenDSA documentation master file, created by
   sphinx-quickstart on Sat Mar 17 18:07:39 2012.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

.. avmetadata:: OpenDSA Sample eTextbook
   :author: OpenDSA Contributors
   :prerequisites:
   :topic: Data Structures

.. chapnum::
   :start: 0
   :prefix: Chapter

'''

makefile_template = '''\
# Makefile for Sphinx documentation
#
# You can set these variables from the command line.
SPHINXBUILD   = sphinx-build
HTMLDIR       = %(rel_ebook_path)s
MINIMIZE      = java -jar "%(odsa_root)stools/yuicompressor-2.4.7.jar"

.PHONY: clean html

all: html min

clean:
	-rm -rf ./$(HTMLDIR)*
	-rm source/ToDo.rst

cleanbuild: clean html

min: min-underscore min-doctools min-searchtools

min-underscore:
	@echo 'Minimizing $(HTMLDIR)_static/underscore.js'
	-@$(MINIMIZE) $(HTMLDIR)_static/underscore.js -o $(HTMLDIR)_static/underscore.js

min-doctools:
	@echo 'Minimizing $(HTMLDIR)_static/doctools.js'
	-@$(MINIMIZE) $(HTMLDIR)_static/doctools.js -o $(HTMLDIR)_static/doctools.js

min-searchtools:
	@echo 'Minimizing $(HTMLDIR)_static/searchtools.js'
	-@$(MINIMIZE) $(HTMLDIR)_static/searchtools.js -o $(HTMLDIR)_static/searchtools.js

preprocessor:
	python "%(odsa_root)sRST/preprocessor.py" source/ $(HTMLDIR)

html: preprocessor
	%(remove_todo)s
	$(SPHINXBUILD) -b html source $(HTMLDIR)
	rm html/_static/jquery.js html/_static/websupport.js
	#rm -rf html/_sources/
	python "%(odsa_root)sRST/preprocessor.py" -p source/ $(HTMLDIR) 
	cp "%(odsa_root)slib/.htaccess" $(HTMLDIR)
	rm *.json
	@echo
	@echo "Build finished. The HTML pages are in $(HTMLDIR)."
'''


# Used to generate the conf.py file
conf = '''\
# -*- coding: utf-8 -*-
#
# OpenDSA documentation build configuration file, created by
# sphinx-quickstart on Sat Mar 17 18:07:39 2012.
#
# This file is execfile()d with the current directory set to its containing dir.
#
# Note that not all possible configuration values are present in this
# autogenerated file.
#
# All configuration values have a default; values that are commented out
# serve to show the default.

import sys, os

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#sys.path.insert(0, os.path.abspath('.'))

# -- General configuration -----------------------------------------------------

# If your documentation needs a minimal Sphinx version, state it here.
#needs_sphinx = '1.0'

# Add any Sphinx extension module names here, as strings. They can be extensions
# coming with Sphinx (named 'sphinx.ext.*') or your custom ones.

sys.path.append(os.path.abspath('%(odsa_root)sRST/ODSAextensions/odsa/avembed'))
sys.path.append(os.path.abspath('%(odsa_root)sRST/ODSAextensions/odsa/avmetadata'))
sys.path.append(os.path.abspath('%(odsa_root)sRST/ODSAextensions/odsa/codeinclude'))
sys.path.append(os.path.abspath('%(odsa_root)sRST/ODSAextensions/odsa/numref'))
sys.path.append(os.path.abspath('%(odsa_root)sRST/ODSAextensions/odsa/chapnum'))
sys.path.append(os.path.abspath('%(odsa_root)sRST/ODSAextensions/odsa/odsalink'))
sys.path.append(os.path.abspath('%(odsa_root)sRST/ODSAextensions/odsa/odsascript'))
sys.path.append(os.path.abspath('%(odsa_root)sRST/ODSAextensions/odsa/sphinx-numfig'))
sys.path.append(os.path.abspath('%(odsa_root)sRST/ODSAextensions/odsa/inlineav'))
sys.path.append(os.path.abspath('%(odsa_root)sRST/ODSAextensions/odsa/html5'))
sys.path.append(os.path.abspath('%(odsa_root)sRST/ODSAextensions/odsa/odsafig'))
extensions = ['sphinx.ext.autodoc', 'sphinx.ext.doctest', 'sphinx.ext.todo', 'sphinx.ext.mathjax', 'sphinx.ext.ifconfig', 'avembed', 'avmetadata','codeinclude','numref','chapnum','odsalink','odsascript','numfig','inlineav','html5','odsafig']

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# The suffix of source filenames.
source_suffix = '.rst'

# The encoding of source files.
#source_encoding = 'utf-8-sig'

# The master toctree document.
master_doc = 'index'

# General information about the project.
project = u'OpenDSA'
copyright = u'2012 by OpenDSA Project Contributors'

# The version info for the project you're documenting, acts as replacement for
# |version| and |release|, also used in various other places throughout the
# built documents.
#
# The short X.Y version.
version = '0'
# The full version, including alpha/beta/rc tags.
release = '0.4.1'

# The language for content autogenerated by Sphinx. Refer to documentation
# for a list of supported languages.
#language = None

# There are two options for replacing |today|: either, you set today to some
# non-false value, then it is used:
#today = ''
# Else, today_fmt is used as the format for a strftime call.
#today_fmt = '%%B %%d, %%Y'

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
exclude_patterns = []

# The reST default role (used for this markup: `text`) to use for all documents.
#default_role = None

# If true, '()' will be appended to :func: etc. cross-reference text.
#add_function_parentheses = True

# If true, the current module name will be prepended to all description
# unit titles (such as .. function::).
#add_module_names = True

# If true, sectionauthor and moduleauthor directives will be shown in the
# output. They are ignored by default.
#show_authors = False

# The name of the Pygments (syntax highlighting) style to use.
pygments_style = 'sphinx'

# A list of ignored prefixes for module index sorting.
#modindex_common_prefix = []

# -- Options for HTML output ---------------------------------------------------
#The fully-qualified name of a HTML Translator, that is used to translate document
#trees to HTML.
html_translator_class = 'html5.HTMLTranslator' 


# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
sys.path.append(os.path.abspath('_themes'))
html_theme_path = ['%(odsa_root)sRST/source/_themes']
html_theme = 'haiku'

# Theme options are theme-specific and customize the look and feel of a theme
# further.  For a list of options available for each theme, see the
# documentation.
#html_theme_options = {}

# Add any paths that contain custom themes here, relative to this directory.
#html_theme_path = []

# The name for this set of Sphinx documents.  If None, it defaults to
# "<project> v<release> documentation".
html_title = '%(title)s'

# A shorter title for the navigation bar.  Default is the same as html_title.
#html_short_title = None

# The name of an image file (relative to this directory) to place at the top
# of the sidebar.
html_logo =  "_static/OpenDSALogoT64.png"

# The name of an image file (within the static path) to use as favicon of the
# docs.  This file should be a Windows icon file (.ico) being 16x16 or 32x32
# pixels large.
#html_favicon = None

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static']

# Manipulates the lists of scripts that jQuery automatically loads
# The Sphinx-generated search page is dependent on certain files being loaded in the head element whereas
# we normally want to load these scripts in the body to make the page load faster
# 'script_files' will be loaded in the head element on search.html and in the body on all other pages 
# (setting this value here overrides Sphinx's default script files, so we have to add 'underscore.js' and 'doctools.js')
# 'search_scripts' are only loaded on the search page
# 'odsa_scripts' will be loaded as part of the body on all pages
# 'css_files' adds our custom CSS files to be loaded in the head element so that page doesn't have to re-render 
# all the content that loaded before the CSS files
# 'odsa_root_path' specifies the relative path from the HTML output directory to the ODSA root directory and is used 
# to properly link to Privacy.html
# The code that appends these scripts can be found in RST/source/_themes/haiku/layout.html and basic/layout.html
html_context = {"script_files": [
                  '%(eb2root)slib/jquery.min.js',
                  'http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML.js'
                ],
                "search_scripts": [
                  '_static/underscore.js',
                  '_static/doctools.js'
                ],
                "odsa_scripts": [
                  '%(eb2root)slib/jquery-ui.min.js', 
                  '%(eb2root)sJSAV/lib/jquery.transform.light.js', 
                  '%(eb2root)sJSAV/lib/raphael.js', 
                  '%(eb2root)sJSAV/build/JSAV-min.js', 
                  '_static/config.js', 
                  '%(eb2root)slib/odsaUtils-min.js', 
                  '%(eb2root)slib/odsaMOD-min.js' 
                ], 
                "css_files": [
                  '%(eb2root)sJSAV/css/JSAV.css', 
                  '%(eb2root)slib/odsaMOD-min.css',
                  '%(eb2root)sAV/slideCON.css'
                ],
                "odsa_root_path": "%(eb2root)s"}


# If not '', a 'Last updated on:' timestamp is inserted at every page bottom,
# using the given strftime format.
html_last_updated_fmt = '%%b %%d, %%Y'

# If true, SmartyPants will be used to convert quotes and dashes to
# typographically correct entities.
#html_use_smartypants = True

# Custom sidebar templates, maps document names to template names.
#html_sidebars = {}

# Additional templates that should be rendered to pages, maps page names to
# template names.
#html_additional_pages = {}

# If false, no module index is generated.
#html_domain_indices = True

# If false, no index is generated.
#html_use_index = True

# If true, the index is split into individual pages for each letter.
#html_split_index = False

# If true, links to the reST sources are added to the pages.
#html_show_sourcelink = True

# If true, "Created using Sphinx" is shown in the HTML footer. Default is True.
#html_show_sphinx = True

# If true, "(C) Copyright ..." is shown in the HTML footer. Default is True.
#html_show_copyright = True

# If true, an OpenSearch description file will be output, and all pages will
# contain a <link> tag referring to it.  The value of this option must be the
# base URL from which the finished HTML is served.
#html_use_opensearch = ''

# This is the file name suffix for HTML files (e.g. ".xhtml").
#html_file_suffix = None

# Output file base name for HTML help builder.
htmlhelp_basename = 'OpenDSAdoc'


# -- My stuff ------------------------------------------------

todo_include_todos = True

#---- OpenDSA variables ---------------------------------------

# Name used to uniquely identify
book_name = '%(book_name)s'

# Protocol and domain of the backend server
server_url = '%(server_url)s'

# Protocol and domain of the server hosting the module files
module_origin = '%(module_origin)s'

#Absolute path to OpenDSA directory
odsa_path = '%(odsa_root)s'

#Absolute path of eTextbook (build) directory
ebook_path = '%(output_dir)s%(rel_ebook_path)s'

#path (from the RST home) to the sourcecode directory that I want to use
sourcecode_path = '%(code_dir)s'

# Path to AV/ directory (local or remote)
av_dir = '%(av_dir)s'

# Path to Exercises/ directory (local or remote)
exercises_dir = '%(exercises_dir)s'

'''

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

def process_section(conf_data, section, index_rst, depth):
  for subsect in section:
    if 'exercises' in section[subsect]:
      process_module(conf_data, index_rst, subsect, section[subsect], depth)
    else:
      print ("  " * depth) + subsect
      index_rst.write(subsect + '\n')
      index_rst.write((sphinx_header_chars[depth] * len(subsect)) + "\n\n")
      index_rst.write(".. toctree::\n")
      index_rst.write("   :numbered:\n")
      index_rst.write("   :maxdepth: 3\n\n")
      process_section(conf_data, section[subsect], index_rst, depth + 1)

  index_rst.write("\n")

def process_module(conf_data, index_rst, mod_path, mod_attrib={'exercises':{}}, depth=0):
  global todo_count
  
  odsa_dir = get_odsa_dir()
  
  mod_path = mod_path.replace('.rst', '')
  mod_name = os.path.basename(mod_path)

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
  header_data['orig_data'] = mod_data[0]
  mod_data[0] = rst_header % header_data
  
  avmetadata_found = False

  # Alter the contents of the module based on the config file
  i = 0
  while i < len(mod_data):
    if '.. figure::' in mod_data[i] or '.. odsafig::' in mod_data[i]:
      image_path = mod_data[i].split(' ')[2].rstrip()
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
      # Parse the AV name from the line
      av_name = mod_data[i].split(' ')[2].rstrip()
      type = mod_data[i].split(' ')[3].rstrip()

      if av_name not in exercises:
        # If the AV is not listed in the config file, add its name to a list of missing exercises
        missing_exercises.append(av_name)
      elif type == 'ss':
        # Add the necessary information from the slideshow from the configuration file
        # Diagrams (type == 'dgm') do not require this extra information
        exer_conf = exercises[av_name]

        # List of valid options for inlineav directive
        options = ['long_name', 'points', 'required', 'threshold']

        rst_options = ['   :%s: %s\n' % (option, str(exer_conf[option])) for option in options if option in exer_conf]
        mod_data[i] += ''.join(rst_options)
    elif '.. avembed::' in mod_data[i]:
      # Parse the exercise name from the line
      av_name = mod_data[i].split(' ')[2].rstrip()
      av_name = av_name[av_name.rfind('/') + 1:].replace('.html', '')
      type = mod_data[i].split(' ')[3].rstrip()

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

  # 'exercises_root_dir' should default to the OpenDSA root directory
  if 'av_root_dir' not in conf_data:
    conf_data['av_root_dir'] = odsa_dir

  # 'exercises_root_dir' should default to the OpenDSA root directory
  if 'exercises_root_dir' not in conf_data:
    conf_data['exercises_root_dir'] = odsa_dir


def get_odsa_dir():
  """Calculate the path to the OpenDSA root directory based on the location of this file"""
  
  # Auto-detect ODSA directory
  (odsa_dir, script) = os.path.split( os.path.abspath(__file__))
  
  # Convert to Unix-style path and move up a directory 
  # (assumes configure.py is one level below root OpenDSA directory)
  return os.path.abspath(odsa_dir.replace("\\", "/") + '/..') + '/'

def get_output_dir(conf_data):
  odsa_dir = get_odsa_dir()
  return '%s%s/' % (process_path(conf_data['book_dir'], odsa_dir), conf_data['name'])

def get_src_dir(conf_data):
  return get_output_dir(conf_data) + 'source/'


def configure(config_file):
  """Configure an OpenDSA textbook based on a validated configuration file"""
  
  print "Configuring OpenDSA, using " + config_file + '\n'

  # Read the configuration data
  with open(config_file) as config:
    # Force python to maintain original order of JSON objects
    conf_data = json.load(config, object_pairs_hook=collections.OrderedDict)

  odsa_dir = get_odsa_dir()

  # Assign defaults to optional settings
  set_defaults(conf_data)

  # Process the code and output directory paths
  code_dir = process_path(conf_data['code_dir'], odsa_dir)
  output_dir = get_output_dir(conf_data)

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
    index_rst.write(rst_header % header_data)

    # Process all the chapter and module information
    process_section(conf_data, conf_data['chapters'], index_rst, 0)

    index_rst.write(".. toctree::\n")
    index_rst.write("   :maxdepth: 3\n\n")
    
    # Process the Gradebook as well
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
  options['odsa_root'] = odsa_dir
  options['output_dir'] = output_dir
  options['rel_ebook_path'] = rel_ebook_path
  options['code_dir'] = code_dir
  options['av_dir'] = conf_data['av_root_dir']
  options['exercises_dir'] = conf_data['exercises_root_dir']
  # TODO: Temporary fix until preprocessor.py stops creating a ToDo.rst file when were are no TODO directives
  options['remove_todo'] = 'rm source/ToDo.rst'
  # The relative path between the ebook output directory (where the HTML files are generated) and the root ODSA directory
  options['eb2root'] = os.path.relpath(odsa_dir, output_dir + rel_ebook_path) + '/'

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


  config_js_template = '''\
  "use strict";
  (function () {
    var settings = {};
    // Stores the name of the book, used to uniquely identify a book in the database
    settings.BOOK_NAME = "%(book_name)s";
    // The (protocol and) domain address of the backend server
    // Set SERVER_URL = "" in order to disable server communication and logging
    settings.SERVER_URL = "%(server_url)s";
    settings.MODULE_ORIGIN = "%(module_origin)s";
    settings.EXERCISE_ORIGIN = "%(exercise_origin)s";
    settings.AV_ORIGIN = "%(av_origin)s";
    // Flag controlling whether or not the system will assign credit (scores) obtained by anonymous users to the next user to log in
    settings.ALLOW_ANON_CREDIT = "%(allow_anon_credit)s";
    // Flag which controls debugMode
    // When set to true, the framework will print a full stacktrace to the console, allowing developers to easily trace execution
    // This value can be changed at runtime via the JavaScript console
    settings.DEBUG_MODE = false;

    window.ODSA = {};
    window.ODSA.SETTINGS = settings;
  }());
  '''

  # Create source/_static/config.js in the output directory
  # Used to set global settings for the client-side framework
  with open(src_dir + '_static/config.js','w') as config_js:
    conf_js_data = {}
    conf_js_data['book_name'] = conf_data['name']
    conf_js_data['server_url'] = conf_data['backend_address']
    conf_js_data['module_origin'] = conf_data['module_origin']
    conf_js_data['exercise_origin'] = conf_data['exercise_origin']
    conf_js_data['av_origin'] = conf_data['av_origin']

    if 'allow_anonymous_credit' in conf_data:
      conf_js_data['allow_anon_credit'] = str(conf_data['allow_anonymous_credit']).lower()
    else:
      conf_js_data['allow_anon_credit'] = 'true'

    config_js.writelines(config_js_template % conf_js_data)

  # Add the index.html file that redirects to the build/html directory
  index_html_template = '''\
  <html>
  <head>
    <script>
      window.location.replace(window.location.href.replace(/\/(index.html)?$/, '/%s'));
    </script>
  </head>
  </html>
  '''

  with open(output_dir + 'index.html','w') as index_html:
    index_html.writelines(index_html_template % rel_ebook_path)

  # Optionally run make on the output directory
  if 'build_ODSA' not in conf_data or conf_data['build_ODSA']:
    print '\nBuilding textbook...'

    try:
      os.chdir(output_dir)
      proc = subprocess.Popen('make', stdout=subprocess.PIPE)
      for line in iter(proc.stdout.readline,''):
        print line.rstrip()
    finally:
      os.chdir(cwd)



# Code to execute when run as a standalone program
if __name__ == "__main__":
  # Process script arguments
  if len(sys.argv) != 2:
    print "Invalid config filename"
    print "Usage: " + sys.argv[0] + " config_file"
    sys.exit(1)

  config_file = sys.argv[1]

  validate_config_file(config_file)
  
  configure(config_file)
