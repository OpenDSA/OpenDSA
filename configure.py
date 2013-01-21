# This script builds an OpenDSA textbook according to a specified configuration file
#   - Reads the configuration information from the specified JSON config file
#   - Auto-detects the OpenDSA root directory location
#   - Converts the OpenDSA root directory and specified code and output directories into Unix-style paths so that relative paths are calculated correctly
#     - Handles absolute or relative paths for output and code directories (relative paths are rooted at the OpenDSA directory)
#   - Builds JSAV to make sure the library is up-to-date
#   - Initilizes necessary files and directories in the output directory
#     - Alters the Makefile to correctly point to the .htaccess file
#   - Copies additional files and directories to the output directory (if specified in the config file)
#     - Its possible for the output directory to be outside of the OpenDSA root directory and web-accessible when the ODSA root directory is not.  In this case, a several directories must be copied to the output directory in order for OpenDSA to function correctly.  These files / directories include:
#       - AV
#       - Exercises
#       - JSAV-min.js and supporting JS and CSS files
#       - Khan Academy files
#       - lib files
#   - Reads each module file and removes exercises or adds arguments to the directives that create them
#     - Specifically adds 'points', 'required' and 'threshold'
#   - Creates a conf.py file in the source directory
#   - Generates an index.rst file based on which modules were specified in the config file
#   - Updates the server_url variable in ODSA.js and khanexercise.js based on the value specified in the config file
#   - Runs make on the output directory to build the textbook

import sys
import os
import shutil
import distutils.dir_util
import distutils.file_util
import json
import collections
import re
import subprocess

sphinx_header_chars = ['=', '-', '`', "'", '.', '*', '+', '^']

# Used to generate the index.rst file
index_header = '''.. This file is part of the OpenDSA eTextbook project. See
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
   :short_name: index

.. _index:

.. include:: JSAVheader.rinc

.. chapnum::
   :start: 0
   :prefix: Chapter

'''

def process_path(path, abs_prefix):
  # If the path is relative, make it absolute
  if not os.path.isabs(path):
    path = abs_prefix + path

  # Convert to Unix path
  path = path.replace("\\", "/")
  # Ensure path ends with '/'
  if not path.endswith('/'):
    path += "/"
  
  return path

def process_section(section, index_file, depth):  
  if "modules" in section:
    process_modules(section["modules"], index_file, depth)
  else:
    for subsect in section:
      print ("  " * depth) + subsect
      index_file.write(subsect + '\n')
      index_file.write((sphinx_header_chars[depth] * len(subsect)) + "\n\n")
      index_file.write(".. toctree::\n")
      index_file.write("   :numbered:\n")
      index_file.write("   :maxdepth: 3\n\n")
      process_section(section[subsect], index_file, depth + 1)
  
  index_file.write("\n")

def process_modules(section, index_file, depth):
  for module in section:
    if module == 'Intro':
      continue
    
    print ("  " * depth) + module
    index_file.write("   " + module + "\n")
    
    with open(odsa_dir + 'RST/source/' + module + '.rst','r') as mod_file:
      # Read the contents of the module RST file from the ODST RST source directory
      mod_data = mod_file.readlines()
    mod_file.close()
    
    new_mod_data = []
    
    # Alter the module RST contents based on the RST file
    i = 0
    while i < len(mod_data):
      if '.. inlineav::' in mod_data[i] or '.. avembed::' in mod_data[i]:
        # Find the end-of-line character for the file
        eol = mod_data[i].replace(mod_data[i].rstrip(), '')
        
        # Parse the exercise name from the line
        av_name = mod_data[i].split(' ')[2]
        av_name = av_name.rstrip()
        if av_name.endswith('.html'):
          av_name = av_name[av_name.rfind('/') + 1:].replace('.html', '')
        
        if '.. avembed::' in mod_data[i] and av_name not in section[module]: 
          # Exercise not listed in config file, remove it from the RST file
          while (i < len(mod_data) and mod_data[i].rstrip() != ''):
            i = i + 1
        else:
          # Object is an exercise found in the config file or a 
          # slideshow which shouldn't be removed because its considered content
          new_mod_data.append(mod_data[i])
          
          if av_name in section[module]:
            # Add the necessary information from the configuration file
            exer_conf = section[module][av_name]
            
            for setting in exer_conf:
              new_mod_data.append('   :' + setting + ': ' + str(exer_conf[setting]) + eol)
            
      else:
        new_mod_data.append(mod_data[i])
      
      i = i + 1
    
    with open(src_dir + module + '.rst','w') as mod_file:
      # Write the contents of the module RST file to the output src directory
      mod_file.writelines(new_mod_data)
    mod_file.close()



# Used to generate the conf.py file
conf= """\
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

sys.path.append(os.path.abspath('../ODSAextensions/odsa/avembed'))
sys.path.append(os.path.abspath('../ODSAextensions/odsa/avmetadata'))
sys.path.append(os.path.abspath('../ODSAextensions/odsa/codeinclude'))
sys.path.append(os.path.abspath('../ODSAextensions/odsa/numref'))
sys.path.append(os.path.abspath('../ODSAextensions/odsa/chapnum'))
sys.path.append(os.path.abspath('../ODSAextensions/odsa/odsalink'))
sys.path.append(os.path.abspath('../ODSAextensions/odsa/odsascript'))
sys.path.append(os.path.abspath('../ODSAextensions/odsa/sphinx-numfig')) 
sys.path.append(os.path.abspath('../ODSAextensions/odsa/inlineav')) 
extensions = ['sphinx.ext.autodoc', 'sphinx.ext.doctest', 'sphinx.ext.todo', 'sphinx.ext.mathjax', 'sphinx.ext.ifconfig', 'avembed', 'avmetadata','codeinclude','numref','chapnum','odsalink','odsascript','numfig','inlineav']

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

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
sys.path.append(os.path.abspath('_themes'))
html_theme_path = ['_themes']
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


# -- Options for LaTeX output --------------------------------------------------

latex_elements = {
# The paper size ('letterpaper' or 'a4paper').
#'papersize': 'letterpaper',

# The font size ('10pt', '11pt' or '12pt').
#'pointsize': '10pt',

# Additional stuff for the LaTeX preamble.
#'preamble': '',
}

# Grouping the document tree into LaTeX files. List of tuples
# (source start file, target name, title, author, documentclass [howto/manual]).
latex_documents = [
  ('index', 'OpenDSA.tex', u'OpenDSA Documentation',
   u'OpenDSA Project Contributors', 'manual'),
]

# The name of an image file (relative to this directory) to place at the top of
# the title page.
#latex_logo = None

# For "manual" documents, if this is true, then toplevel headings are parts,
# not chapters.
#latex_use_parts = False

# If true, show page references after internal links.
#latex_show_pagerefs = False

# If true, show URL addresses after external links.
#latex_show_urls = False

# Documents to append as an appendix to all manuals.
#latex_appendices = []

# If false, no module index is generated.
#latex_domain_indices = True

# -- Options for manual page output --------------------------------------------

# One entry per manual page. List of tuples
# (source start file, name, description, authors, manual section).
man_pages = [
    ('index', 'opendsa', u'OpenDSA Documentation',
     [u'OpenDSA Project Contributors'], 1)
]

# If true, show URL addresses after external links.
#man_show_urls = False


# -- Options for Texinfo output ------------------------------------------------

# Grouping the document tree into Texinfo files. List of tuples
# (source start file, target name, title, author,
#  dir menu entry, description, category)
texinfo_documents = [
  ('index', 'OpenDSA', u'OpenDSA Documentation',
   u'OpenDSA Project Contributors', 'OpenDSA', 'One line description of project.',
   'Miscellaneous'),
]

# Documents to append as an appendix to all manuals.
#texinfo_appendices = []

# If false, no module index is generated.
#texinfo_domain_indices = True

# How to display URL addresses: 'footnote', 'no', or 'inline'.
#texinfo_show_urls = 'footnote'

# -- My stuff ------------------------------------------------

todo_include_todos = True

#---- OpenDSA variables ---------------------------------------

#Absolute path to OpenDSA directory
odsa_path = '%(odsa_dir)s'

#Absolute path of eTextbook (build) directory
ebook_path = '%(ebook_dir)s'

#path (from the RST home) to the sourcecode directory that I want to use
sourcecode_path = '%(code_dir)s'


"""









# Process script arguments
if len(sys.argv) != 2:
  print "Invalid config filename"
  print "Usage: " + sys.argv[0] + " config_file"
  sys.exit(1)

config_file = sys.argv[1]

# Throw an error if the specified config files doesn't exist
if not os.path.exists(config_file):
  print "Error: File " + config_file + " doesn't exist"
  sys.exit(1)

print "Configuring OpenDSA, using " + config_file + '\n'

# Read the configuration data
with open(config_file) as config:
  # Force python to maintain original order of JSON objects
  conf_data = json.load(config, object_pairs_hook=collections.OrderedDict)
config.close()

# If 'name' is not specified in the config file, parse and use the name of the config file itself
if not conf_data['name']:
  conf_data['name'] = os.path.basename(config_file).replace('.json', '')


# Auto-detect ODSA directory
(odsa_dir, script) = os.path.split( os.path.abspath(__file__))
odsa_dir = odsa_dir.replace("Scripts/", "")
odsa_dir = odsa_dir.replace("\\", "/") + '/'

# Process the code and output directory paths
code_dir = process_path(conf_data['code_dir'], odsa_dir)
output_dir = process_path(conf_data['output_dir'], odsa_dir)


if output_dir == (odsa_dir) or output_dir == (odsa_dir + "RST/"):
  print "Unable to build in this location, please select a different directory"
  sys.exit(1)

src_dir = output_dir + "source/"

cwd = os.getcwd()
  
if conf_data['build_JSAV']:
  # Rebuild JSAV
  print "Building JSAV\n"
  status = 0
  try:
    os.chdir('JSAV/')
    with open(os.devnull, "w") as fnull:
      status = subprocess.check_call('make', stdout=fnull)
    fnull.close()
  finally:
    os.chdir(cwd)

  if status != 0:
    print "JSAV make failed"
    print status
    sys.exit(1)

# Initialize options for conf.py
options = {}
options['title'] = conf_data['title']
options['odsa_dir'] = odsa_dir
options['ebook_dir'] = output_dir + "build/html/"
options['code_dir'] = code_dir


# Initialize output directory
distutils.dir_util.mkpath(src_dir)
distutils.dir_util.copy_tree(odsa_dir + 'RST/ODSAextensions/', output_dir + 'ODSAextensions/', update=1)
distutils.file_util.copy_file(odsa_dir + 'RST/preprocessor.py', output_dir, update=1)
distutils.file_util.copy_file(odsa_dir + 'RST/config.py', output_dir, update=1)

with open(odsa_dir + 'RST/Makefile','r') as makefile:
  make_data = makefile.readlines()
makefile.close()

with open(output_dir + 'Makefile','w') as makefile:
  for i in range(len(make_data)):
    if '.htaccess $(BUILDDIR)/html' in make_data[i]:
      make_data[i] = re.sub(r'(cp )../(lib/.htaccess)(.*)', r'\1' + '"' + odsa_dir + r'\2"\3', make_data[i])
      break
  makefile.writelines(make_data)
makefile.close()


# Copy all non-RST source files and directories
for src_file in os.listdir(odsa_dir + 'RST/source/'):
  src_file_path = odsa_dir + 'RST/source/' + src_file
  if os.path.isdir(src_file_path):
    distutils.dir_util.copy_tree(src_file_path, src_dir + src_file, update=1)
  elif not src_file.endswith('.rst'):
    distutils.file_util.copy_file(src_file_path, src_dir)

# Copy static files to output directory
if conf_data['copy_static_files']:
  # Set the base ODSA directory for conf.py to be the output directory to ensure the copied files get referenced in the build
  options['odsa_dir'] = output_dir
  # Calculate the relative path between the code directory and the root OpenDSA directory in order to reference the correct sourcecode in the external build directory
  options['code_dir'] = process_path(os.path.relpath(code_dir, odsa_dir), output_dir)

  # Copy static files to output directory, creating directories as necessary
  distutils.dir_util.copy_tree(odsa_dir + 'AV/', output_dir + 'AV/', update=1)
  distutils.dir_util.copy_tree(odsa_dir + 'Exercises/', output_dir + 'Exercises/', update=1)
  distutils.dir_util.copy_tree(odsa_dir + 'lib/', output_dir + 'lib/', update=1)
  distutils.dir_util.copy_tree(odsa_dir + 'ODSAkhan-exercises/', output_dir + 'ODSAkhan-exercises/', update=1)
  distutils.dir_util.copy_tree(code_dir, options['code_dir'], update=1)
  distutils.dir_util.copy_tree(odsa_dir + 'JSAV/lib/', output_dir + 'JSAV/lib/', update=1)
  distutils.dir_util.copy_tree(odsa_dir + 'JSAV/css/', output_dir + 'JSAV/css/', update=1)
  distutils.dir_util.mkpath(output_dir + 'JSAV/build/')
  distutils.file_util.copy_file(odsa_dir + 'JSAV/build/JSAV-min.js', output_dir + 'JSAV/build/JSAV-min.js')

else:
  print "Since you chose not to copy static files to your output directory, you must make sure your OpenDSA directory is web-accessible in order for these files to be loaded properly\n"




# Create conf.py file in src directory
try:
  cfile = open(src_dir + 'conf.py','w')  
  cfile.writelines(conf %options)  
  cfile.close()  
except IOError:
  print 'ERROR: Could not save conf.py' 




# Create the index.rst file
with open(src_dir + 'index.rst', 'w+') as index_file:
  print "Generating index.rst\n"
  print "Processing..."
  index_file.write(index_header)
  
  process_section(conf_data['chapters'], index_file, 0)

  index_file.write("* :ref:`genindex`\n")
  index_file.write("* :ref:`search`\n")
index_file.close()




# Replace the backend server address in ODSA.js
with open(odsa_dir + 'lib/ODSA.js','r') as odsa:
  odsa_data = odsa.readlines()
odsa.close()

# options['odsa_dir'] is used as a base for relative paths to static files,
# changes depending on whether static files are copied or not
with open(options['odsa_dir'] + 'lib/ODSA.js','w') as odsa:
  for i in range(len(odsa_data)):
    if 'var server_url = "' in odsa_data[i]:
      odsa_data[i] = re.sub(r'(.+ = ").*(";.*)', r'\1' + conf_data['backend_address'].rstrip('/') + r'\2', odsa_data[i])
      break

  for i in range(len(odsa_data)):
    if 'var moduleOrigin = "' in odsa_data[i]:
      odsa_data[i] = re.sub(r'(.+ = ").*(";.*)', r'\1' + conf_data['module_origin'] + r'\2', odsa_data[i])
      break
  odsa.writelines(odsa_data)
odsa.close()

# TODO: If static files are copied, run minifier on ODSA.JS


# Replace 'exerciseOrigin' and 'bookName' in opendsaMOD.js
with open(odsa_dir + 'RST/source/_static/opendsaMOD.js','r') as odsaMOD:
  odsaMOD_data = odsaMOD.readlines()
odsaMOD.close()

# opendsaMOD.js is always copied to the build location, so write the updated data to the output source directory
with open(src_dir + '_static/opendsaMOD.js','w') as odsaMOD:
  replaced = 0
  total_replacements = 2
  
  for i in range(len(odsaMOD_data)):
    if 'var exerciseOrigin = "' in odsaMOD_data[i]:
      odsaMOD_data[i] = re.sub(r'(.+ = ").*(";.*)', r'\1' + conf_data['exercise_origin'] + r'\2', odsaMOD_data[i])
      replaced = replaced + 1
      if replaced == total_replacements:
        break
      
    if 'modData.book = "' in odsaMOD_data[i]:
      odsaMOD_data[i] = re.sub(r'(.+ = ").*(";.*)', r'\1' + conf_data['name'] + r'\2', odsaMOD_data[i])
      replaced = replaced + 1
      if replaced == total_replacements:
        break
  odsaMOD.writelines(odsaMOD_data)
odsaMOD.close()


# Replace the backend server address in khan-exercise.js
with open(odsa_dir + 'ODSAkhan-exercises/khan-exercise.js','r') as khan_exer:
  ke_data = khan_exer.readlines()
khan_exer.close()

# options['odsa_dir'] is used as a base for relative paths to static files,
# changes depending on whether static files are copied or not
with open(options['odsa_dir'] + 'ODSAkhan-exercises/khan-exercise.js','w') as khan_exer:
  for i in range(len(ke_data)):
    if 'testMode ? "' in ke_data[i]:
      ke_data[i] = re.sub(r'(.+ ? ").*(" :.*)', r'\1' + conf_data['backend_address'].rstrip('/') + r'\2', ke_data[i])
      break
  khan_exer.writelines(ke_data)
khan_exer.close()



if conf_data['build_ODSA']:
  print '\nBuilding textbook...'

  make_path = conf_data['output_dir'].replace('\\', '/')

  # Run make on the output directory
  try:
    os.chdir(make_path)
    proc = subprocess.Popen('make', stdout=subprocess.PIPE)
    for line in iter(proc.stdout.readline,''):
       print line.rstrip()
  finally:
    os.chdir(cwd)

  # TODO: Run a minifier on opendsaMOD.js

