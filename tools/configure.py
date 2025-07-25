#!/usr/bin/env python3
#
# This script builds an OpenDSA textbook according to a specified configuration file
#   - Creates an ODSA_Config object from the specified configuration file
#     - Validates the configuration file and sets appropriate defaults for omitted fields (see ODSA_Config.py for more information)
#     - Makes it easy to reference configuration options
#   - Optionally builds JSAV to make sure the library is up-to-date, if specified in the configuration file
#   - Initializes the output directory
#     - Creates the output directory and a source directory inside it
#     - Copies _static directory to the source directory
#     - Creates a copy of the config file in the _static directory for use by the gradebook page
#   - Generates an index.html file in the output directory of the new book which redirects (via JavaScript) to the book_output_dir (html/)
#   - Traverses the 'chapters' section of the configuration file
#     - For each chapter and module, maps the name to its chapter or module number (used for numbering during postprocessing)
#     - Keeps track of modules encountered and prints an error message if a duplicate module name is detected
#     - Creates an ODSA_RST_Module object for each module (see ODSA_RST_Module for more information)
#     - Keeps track of the ToDo directives, images, and missing exercises encountered, as well as requirements that are satisfied
#     - Maps the module name and number to the chapter its part of (used for correcting the chapter number during postprocessing)
#   - Prints out a list of any exercises encountered in RST source files that did not appear in the config file
#   - Generates ToDo.rst, if any TODO directives were encountered when processing the book AND if the configuration file does not suppress them
#   - Creates table.json and page_chapter.json which are used by Sphinx during the building process
#   - Generates a Makefile and conf.py based on templates found in config_templates.py
#     - conf.py is configured to point to the original ODSAextensions and _themes directories
#     - CONTROLLING INCLUSION OF GLOBAL JS AND CSS FILES - conf.py contains a dictionary called html_context
#       which controls what JS and CSS files are included on ALL module pages, please see the assoicated comment
#       for more information
#   - Copies the images encountered while processing the book to the output source directory
#   - Runs 'make' on the output directory to build the book using Sphinx
#   - Calls update_TOC in postprocessor.py to update the chapter, section and module numbers

import sys
import os
import shutil
import distutils.dir_util
import distutils.file_util
import json
import subprocess
import codecs
import datetime
import simple2full

from collections.abc import Iterable
from argparse import ArgumentParser
import config_templates
from ODSA_RST_Module import ODSA_RST_Module
from ODSA_Config import ODSA_Config
from postprocessor import update_TOC, update_TermDef, make_lti

# Register revealjs-slide directive to prevent parse errors
from docutils import nodes
from docutils.parsers.rst import Directive, directives

class RevealJSSlideStub(Directive):
    has_content = True
    def run(self):
        return []

directives.register_directive('revealjs-slide', RevealJSSlideStub)

# List ocanvas_module_idf exercises encountered in RST files that do not appear in the
# configuration file
missing_exercises = []

# List of modules that have been processed, do not allow multiple modules
# with the same path (would cause a conflict in the database)
processed_modules = []

# List of images encountered while processing module files, these will be
# copied from the RST/Images to Images in the output source directory
images = []

# Stores information about ToDo directives
todo_list = []

# List of fulfilled prerequisite topics
satisfied_requirements = []

# Maps the chapter name and number to each module, used for correcting the
# numbers during postprocessing
module_chap_map = {}

# Dictionary which stores a mapping of sections to modules, modules to
# their numbers, and figures, tables, theorems, and equations to their
# numbers
num_ref_map = {}

# Prints the given string to standard error
def print_err(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)

# Processes a chapter or section of the book
#   - config - a dictionary containing all the configuration options
#   - section - a dictionary where all the keys are sections or modules
#   - index_rst - the index.rst file being generated
#   - depth - the depth of the recursion; 0 for the main chapters, 1 for any subsections, ..., N for the modules
#   - current_section_numbers - a list that contains the numbering scheme for each section or module ([chapter].[section].[...].[module])
#   - section_name - a string passed to modules for inclusion in the RST header that specifies which chapter / section the module belongs to


# read lti_config.json
def read_conf_file(config_file_path):
    """read configuration file as json"""

    # Throw an error if the specified config files doesn't exist
    if not os.path.exists(config_file_path):
        print_err("INFO: course will be created for the first time")
        return False

    # Try to read the configuration file data as JSON
    try:
        with open(config_file_path) as config:
            # Force python to maintain original order of JSON objects (or else the chapters and modules will appear out of order)
            # conf_data = json.load(config, object_pairs_hook=collections.OrderedDict)
            conf_data = json.load(config)
    except json.JSONDecodeError as err:
        print_err("ERROR when parsing config JSON file: "+ config_file_path)
        print_err("    " + str(err) + "\n")
        sys.exit(1)

    return conf_data

def process_section(config, section, index_rst, depth, current_section_numbers=[], section_name='', standalone_modules=False):
    # Initialize the section number for the current depth
    if depth >= len(current_section_numbers):
        current_section_numbers.append(config.start_chap_num)

    for subsect in section:
        # Parse the subsection name by eliminating the path and file extension
        # if its a module
        subsect_name = os.path.splitext(os.path.basename(subsect))[0]
        num_ref_map[subsect_name] = -1  # Add the section name to num_ref_map

        if not isinstance(section[subsect], Iterable):
            continue

        if 'exercises' in section[subsect]:
            process_module(config, index_rst, subsect, section[
                           subsect], depth, current_section_numbers, section_name, standalone_modules)
        else:
            # List of characters Sphinx uses for headers, the depth of a
            # section header determines which character to use
            sphinx_header_chars = ['=', '-', '`', "'", '.', '*', '+', '^']

            print(("  " * depth) + subsect)
            index_rst.write(subsect + '\n')
            index_rst.write(
                (sphinx_header_chars[depth] * len(subsect)) + "\n\n")
            # if the chapter is hidden we use odsatoctree
            # the div wrapping the chapter and module will have the
            # 'hide-from-toc' class and will be deleted from the TOC
            if 'hidden' in section[subsect]:
                index_rst.write(".. odsatoctree::\n")
            else:
                index_rst.write(".. toctree::\n")
            index_rst.write("   :numbered:\n")
            index_rst.write("   :maxdepth: 3\n\n")
            process_section(config, section[
                            subsect], index_rst, depth + 1, current_section_numbers, subsect_name, standalone_modules)

        # Increments the section count at the current depth
        current_section_numbers[depth] += 1

    # Reset the section number when done processing the current level
    if depth >= 0:
        current_section_numbers[depth] = config.start_chap_num

    index_rst.write("\n")

# Processes a module
#   - config - a dictionary containing all the configuration options
#   - index_rst - the index.rst file being generated
#   - mod_path - the path to the module relative to the RST/<lang> directory
#   - mod_attrib - dictionary containing the module data, 'exercises' is a mandatory field (even if its empty)
#   - depth - the depth of the recursion, used to determine the number of spaces to print before the module name to ensure proper indentation
#   - current_section_numbers - a list that contains the numbering scheme for each section or module ([chapter].[section].[...].[module])
#   - section_name - a string passed to modules for inclusion in the RST header that specifies which chapter / section the module belongs to
def process_module(config, index_rst, mod_path, mod_attrib={'exercises': {}}, depth=0, current_section_numbers=[], section_name='', standalone_modules=False):
    global todo_list
    global images
    global missing_exercises
    global satisfied_requirements
    global module_chap_map
    global num_ref_map
    global cmap_map
    
    # Parse the name of the module from mod_path and remove the file extension
    # if it exists
    mod_name = os.path.splitext(os.path.basename(mod_path))[0]

    # Update the reference for each section to point to the first module in
    # the section
    if section_name != '' and num_ref_map[section_name] == -1:
        num_ref_map[section_name] = mod_name

    # Print error message and exit if duplicate module path is detected
    if mod_path in processed_modules:
        print_err(
            'ERROR: Duplicate module name detected, module: %s' % mod_name)
        sys.exit(1)

    # Add module to list of modules processed
    processed_modules.append(mod_path)

    print(("  " * depth) + mod_name)
    index_rst.write("   %s\n" % mod_name)

    # Initialize the module
    module = ODSA_RST_Module(
        config, mod_path, mod_attrib, satisfied_requirements, section_name, depth, current_section_numbers, standalone_modules)

    # Append data from the processed module to the global variables
    todo_list += module.todo_list
    images += module.images
    #missing_exercises += module.missing_exercises
    satisfied_requirements += module.requirements_satisfied
    num_ref_map = dict(list(num_ref_map.items()) + list(module.num_ref_map.items()))
    if len(module.cmap_dict['concepts']) > 0:
        cmap_map = module.cmap_dict

    # Maps the chapter name and number to each module, used for correcting the numbers during postprocessing
    # Have to ignore the last number because that is the module number (which
    # is already provided by Sphinx)
    module_chap_map[mod_name] = [
        section_name, '.'.join(str(i) for i in current_section_numbers[:-1])]

    # Hack to maintain the same numbering scheme as the old preprocessor
    mod_num = ''
    if len(current_section_numbers) > 0 and not standalone_modules:
        mod_num = '%s.%d' % ('.'.join(
            str(j) for j in current_section_numbers[:-1]), (current_section_numbers[-1] + 1))

    num_ref_map[mod_name] = mod_num


def generate_index_rst(config, slides=False, standalone_modules=False):
    """Generates the index.rst file, calls process_section() on config.chapters to recursively process all the modules in the book (in order), as each is processed it is added to the index.rst"""

    print ("Generating index.rst\n")
    print ("Processing...")

    header_data = {}
    header_data['mod_name'] = 'index'
    header_data['dispModComp'] = 'false'
    header_data['long_name'] = 'Contents'
    header_data['mod_chapter'] = ''
    header_data['mod_date'] = str(datetime.datetime.now()).split('.')[0]
    header_data['mod_options'] = ''
    header_data['build_cmap'] = str(config.build_cmap).lower()
    header_data['unicode_directive'] = config_templates.rst_header_unicode if not slides else ''

    # Generate the index.rst file
    with codecs.open(config.book_src_dir + 'index.rst', 'w+', "utf-8") as index_rst:
        index_rst.write(config_templates.index_header.format(config.start_chap_num, config.chapter_name))
        if slides:
            # implicit hyperlink from '.. _%(mod_name)s:' creates a critical error when building slides
            config_templates.rst_header = config_templates.rst_header.replace('.. _%(mod_name)s:', '.. removed from slides: .. _%(mod_name)s:')
        index_rst.write(config_templates.rst_header % header_data)

        # Process all the chapter and module information
        process_section(config, config.chapters, index_rst, 0, standalone_modules=standalone_modules)

        index_rst.write(".. toctree::\n")
        index_rst.write("   :maxdepth: 3\n\n")

        # Process the Gradebook and Registerbook as well
        # if not slides:
        #     process_module(config, mod_path='Gradebook', index_rst=index_rst)
        #     process_module(config, mod_path='RegisterBook', index_rst=index_rst)

        # If a ToDo file will be generated, append it to index.rst
        if len(todo_list) > 0:
            index_rst.write("   ToDo\n")

        index_rst.write("\n")
        index_rst.write("* :ref:`genindex`\n")
        index_rst.write("* :ref:`search`\n")


def generate_todo_rst(config, slides=False):
    """Sorts the list of ToDo directives (generated while recursively processing each module) by type and writes them all out to a file"""
    print ('\nGenerating ToDo file...')

    # Sort the list of todo items by type (module_name, type, todo_directive)
    sorted_todo_list = sorted(todo_list, key=lambda todo: todo[2])

    with open(''.join([config.book_src_dir, 'ToDo.rst']), 'w') as todo_file:
        header_data = {}
        header_data['mod_name'] = 'ToDo'
        header_data['long_name'] = 'ToDo'
        header_data['dispModComp'] = False
        header_data['mod_chapter'] = ''
        header_data['mod_date'] = str(datetime.datetime.now()).split('.')[0]
        header_data['mod_options'] = ''
        header_data['build_cmap'] = str(config.build_cmap).lower()
        header_data['unicode_directive'] = config_templates.rst_header_unicode if not slides else ''
        if slides:
            # implicit hyperlink from '.. _%(mod_name)s:' creates a critical error when building slides
            config_templates.rst_header = config_templates.rst_header.replace('.. _%(mod_name)s:', '.. removed from slides: .. _%(mod_name)s:')
            
        todo_file.write(config_templates.rst_header % header_data)
        todo_file.write(config_templates.todo_rst_template)

        current_type = ''

        for (todo_id, mod_name, todo_type, todo_directive) in sorted_todo_list:
            if todo_type == '':
                todo_type = 'No Category'

            # Whenever a new type is encountered, print a header for that type
            if current_type != todo_type:
                todo_file.write(
                    '.. raw:: html\n\n   <hr /><h1>%s</h1><hr />\n\n' % todo_type)
                current_type = todo_type

            # Write a header with the name of the file where the ToDo
            # originated that hyperlinks directly to the original ToDo
            todo_file.write('.. raw:: html\n\n   <h2><a href="' + mod_name +
                            '.html#' + todo_id + '">source: ' + mod_name + '</a></h2>\n\n')

            # Clean up and write the TODO directive itself
            todo_file.write('\n'.join(todo_directive).strip() + '\n\n')


def initialize_output_directory(config):
    """Creates the output directory (if applicable) and copies the necesssary files to it"""
    # Create the output directory if it doesn't exist
    # Will actually create '<build_dir>/<book_name>/source/Images/'
    distutils.dir_util.mkpath(config.book_src_dir + 'Images/')

    # Copy _static from RST/ to the book source directory
    distutils.dir_util.copy_tree(
        config.odsa_dir + 'RST/_static/', config.book_src_dir + '_static', update=1)

    # Copy config file to _static directory
    distutils.file_util.copy_file(
        config.config_file_path, config.book_src_dir + '_static/')

    # Copy translation file to _static directory
    distutils.file_util.copy_file(
        config.lang_file, config.book_src_dir + '_static/')

    # Create source/_static/config.js in the output directory
    # Used to set global settings for the client-side framework
    with open(config.book_src_dir + '_static/config.js', 'w') as config_js:
        config_js.writelines(config_templates.config_js_template % config)

    # Create an index.html page in the book directory that redirects the user
    # to the book_output_dir
    with open(config.book_dir + 'index.html', 'w') as index_html:
        index_html.writelines(
            config_templates.index_html_template % config.rel_book_output_path)


def initialize_conf_py_options(config, slides):
    """Initializes the options used to generate conf.py"""
    options = {}
    options['title'] = config.title
    options['book_name'] = config.book_name
    options['theme_dir'] = config.theme_dir
    if config.theme == "":
        options['theme'] = "haiku"
    else:
        options['theme'] = config.theme
    options['html_theme_options'] = "'{}'"
    if config.html_theme_options:
      options['html_theme_options'] = "'" + json.dumps(config.html_theme_options).replace("'", "\\'") + "'"
    options['html_css_files'] = ""
    if config.html_css_files:
      options['html_css_files'] = ", '" + "', '".join(config.html_css_files) + "'"
    options['html_js_files'] = ""
    if config.html_js_files:
      options['html_js_files'] = ", '" + "', '".join(config.html_js_files) + "'"
    options['chapter_name'] = config.chapter_name
    options['odsa_dir'] = config.odsa_dir
    options['book_dir'] = config.book_dir
    options['code_dir'] = config.code_dir
    options['tag'] = config.tag
    options['tabbed_code'] = config.tabbed_codeinc
    options['code_lang'] = json.dumps(config.code_lang)
    options['text_lang'] = json.dumps(config.lang)
    if config.sphinx_debug:
        options['sphinx_options'] = '-E -P -vv'
    else:
        options['sphinx_options'] = ''

    #Adding multiple tags support
    if config.tag:
        tags_string = ""
        tags_array = []
        tags_array += [a.strip() for a in config.tag.split(';')]
        for tag in tags_array:
            tags_string += " -t "+tag
            options["tag"] = tags_string
    else:
      options["tag"] = ""

    # convert the translation text into unicode sstrings
    tmpSTR = ''
    for k, v in config.text_translated.items():
        tmpSTR = tmpSTR + '"%s":u"%s",' % (k, v)
    options['text_translated'] = tmpSTR
    options['av_root_dir'] = config.av_root_dir
    options['exercises_root_dir'] = config.exercises_root_dir
    # The relative path between the ebook output directory (where the HTML
    # files are generated) and the root ODSA directory
    options['eb2root'] = config.rel_build_to_odsa_path
    options['rel_book_output_path'] = config.rel_book_output_path
    options['slides_lib'] = 'revealjs' if slides else ''
    options['local_mode'] = str(config.local_mode).title()

    # makes sure the ebook uses the same python exec as this script
    options['python_executable'] = sys.executable

    if config.include_tree_view:
        if options['html_js_files'] != "":
            options['html_js_files'] = options['html_js_files'] + ", '" + options['eb2root']+"lib/accessibility.js" + "'"
        else:
            options['html_js_files'] = ",'" + options['eb2root'] + "lib/accessibility.js" + "'"
        if options['html_css_files'] != "":
            options['html_css_files'] = options['html_css_files'] + ", '" + options['eb2root']+"lib/accessibility.css" + "'"
        else:
            options['html_css_files'] = ",'" + options['eb2root']+"lib/accessibility.css" + "'"

    # Sets the value to be used to indicate book sections.
    options['chapnum'] = config.chapter_name

    return options


def identical_dict(prev_org, current):
    prev = prev_org.copy()
    if "item_id" in prev:
        del prev["item_id"]
    if "module_item_id" in prev:
        del prev["module_item_id"]
    if "canvas_module_id" in prev:
        del prev["canvas_module_id"]

    prev_keys = set(prev.keys())
    current_keys = set(current.keys())
    intersect_keys = prev_keys.intersection(current_keys)
    added = prev_keys - current_keys
    removed = current_keys - prev_keys
    modified = {o : (prev[o], current[o]) for o in intersect_keys if prev[o] != current[o]}
    same = set(o for o in intersect_keys if prev[o] == current[o])
    return not modified


def configure(config_file_path, options):
    """Configure an OpenDSA textbook based on a validated configuration file"""
    global satisfied_requirements

    slides = options.slides
    no_lms = options.no_lms
    isVerbose = options.verbose
    standalone_modules = options.standalone_modules
    conf_data = None

    if no_lms or slides:
        conf_data = simple2full.generate_full_config(config_file_path, slides, verbose=isVerbose)

    print(("Configuring OpenDSA, using " + config_file_path))

    # Load and validate the configuration
    config = ODSA_Config(config_file_path, options.output_directory, options.no_lms, conf_data=conf_data)

    # Delete everything in the book's HTML directory, otherwise the
    # post-processor can sometimes append chapter numbers to the existing HTML
    # files, making the numbering incorrect
    html_dir = config.book_dir + config.rel_book_output_path
    if os.path.isdir(html_dir):
        print ("Clearing HTML directory")
        shutil.rmtree(html_dir, ignore_errors=True)
        # ignore_errors needed to delete files marked readonly or busy

    # Add the list of topics the book assumes students know to the list of
    # fulfilled prereqs
    if config.assumes:
        satisfied_requirements += [a.strip()
                                   for a in config.assumes.split(';')]

    # Optionally rebuild JSAV
    if config.build_JSAV:
        print ("We don't build JSAV anymore!\n")

    print(("Writing files to " + config.book_dir + "\n"))

    # local mode option
    config.local_mode = str(options.local).lower()


    # Initialize output directory, create index.rst, and process all of the
    # modules
    initialize_output_directory(config)
    generate_index_rst(config, slides, standalone_modules)

    # Print out a list of any exercises found in RST files that do not appear
    # in the config file
    if len(missing_exercises) > 0:
        print_err("\nExercises Not Listed in Config File:")

        for exercise in missing_exercises:
            print_err('  ' + exercise)

        # Print an extra line to separate this section from any additional
        # errors
        print_err('')

    # Stop if we are just running a dry-run
    if options.dry_run:
        return

    # Entries are only added to todo_list if config.suppress_todo is False
    if len(todo_list) > 0:
        generate_todo_rst(config, slides)

    # Dump num_ref_map to table.json to be used by the Sphinx directives
    with open(config.book_dir + 'table.json', 'w') as num_ref_map_file:
        json.dump(num_ref_map, num_ref_map_file)

    # Dump module_chap_map to page_chapter.json to be used by the avmetadata directive
    # NOTE: avmetadata is deprecated (it was used to generate the concept map but is no longer used)
    # If avmetadata is eventually removed, we can stop writing this file
    with open(config.book_dir + 'page_chapter.json', 'w') as page_chapter_file:
        json.dump(module_chap_map, page_chapter_file)

    # Initialize options for conf.py
    conf_py_options = initialize_conf_py_options(config, slides)

    # Create a Makefile in the output directory
    with codecs.open(config.book_dir + 'Makefile', 'w') as makefile:
        makefile.writelines(config_templates.makefile_template % conf_py_options)

    # Create conf.py file in output source directory
    with codecs.open(config.book_src_dir + 'conf.py', 'w', "utf-8") as conf_py:
        conf_py.writelines(config_templates.conf % conf_py_options)

    # Copy only the images used by the book from RST/Images/ to the book
    # source directory
    for image in images:
        distutils.file_util.copy_file(
            '%sRST/Images/%s' % (config.odsa_dir, image), config.book_src_dir + 'Images/')

    # Run make on the output directory
    print ('\nBuilding textbook...')

    job = ['make', '-C', config.book_dir]
    if slides:
        job.append('slides')
    else:
        job.append("html")

    # if make is visible to shutil, then no need to use shell
    ''' TODO: Test if shell_needed is always false, which would make some of the below code useless
    With the odsa docker update, we could safely assume 'make' to be usable and visible to shutil  
    '''
    shell_needed = shutil.which('make') is None
    if shell_needed:
        print("WARNING: 'make' command is not visible from python... Doing leap of faith...")

    print("$$$ Subprocess Started: " + " ".join(job), flush=True)
    proc = subprocess.run(job, shell=shell_needed, stdout=sys.stdout, stderr=sys.stderr)
    if proc.returncode != 0:
        print_err("Creating eBook failed.  See above error")
        exit(1)
    print("$$$ Subprocess Complete: " + " ".join(job), flush=True)

    ''' TODO: Keep looking for encoding errors.
    These are because python 2.7 implicitly converted string encodings.
    python2.7 encodes strings IMplicitly, python3 does this EXplicitly instead.
    '''

    # Calls the postprocessor to update chapter, section, and module numbers,
    # and glossary terms definition

    book_dest_dir = config.book_dir + config.rel_book_output_path
    update_TOC(config.book_src_dir, book_dest_dir, module_chap_map, standalone_modules)
    if 'Glossary' in processed_modules:
        update_TermDef(
            config.book_dir + config.rel_book_output_path + 'Glossary.html', cmap_map['concepts'])

        # Create the concept map definition file in _static html directory
        with codecs.open(config.book_dir + 'html/_static/GraphDefs.json', 'w', 'utf-8') as graph_defs_file:
            json.dump(cmap_map, graph_defs_file)

    if not slides and not no_lms:
        make_lti(config, no_lms, standalone_modules)

# Code to execute when run as a standalone program
if __name__ == "__main__":
    parser = ArgumentParser(description="Generate an OpenDSA eBook using a config file.")
    parser.add_argument("config_file_path", help="A JSON file that selects the content and layout of the eBook")
    parser.add_argument("-s", "--slides", help="Causes configure.py to create slides", action="store_true", default=False)
    parser.add_argument("--dry-run", help="Causes configure.py to configure the book but stop before compiling it", action="store_true", default=False)
    parser.add_argument("-b", "--output-directory", help="Accepts a custom directory name instead of using the config file's name.", default=None)
    parser.add_argument("--local", help="Causes the compiled book to work in local mode, which means no communication with the server", action="store_true", default=True)
    parser.add_argument("--no-lms", help="Compile book without changing internal links required by LMS", action="store_true", default=False)
    parser.add_argument("--standalone-modules", help="Compile all modules such that each module has no links to other modules.",action="store_true", default=False)
    parser.add_argument("--verbose", help="Shows more output during building",action="store_true", default=False)
    args = parser.parse_args()

    if args.slides:
        os.environ['SLIDES'] = 'yes'
    else:
        os.environ['SLIDES'] = 'no'

    configure(args.config_file_path, args)
