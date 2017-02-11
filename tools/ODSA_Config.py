#! /usr/bin/python
#
# Given an OpenDSA config file as a parameter, this script ensures all required fields are present and no invalid options are present
#   - Reads the configuration information from the specified JSON config file
#   - Sets sensible defaults for optional configuration settings
#     - Auto-detects the OpenDSA root directory location
#   - Converts the OpenDSA root directory and specified code and output directories into Unix-style paths so that relative paths are calculated correctly
#     - Handles absolute or relative paths for output and code directories (relative paths are rooted at the OpenDSA directory)
#   - Performs validation
#     - Ensures all required fields are present
#     - Ensures all required or optional fields are configured properly
#       - URLs fit the expected format
#     - Ensures there are no additional fields other than the expected required or optional ones
#       - Helps detect mis-spellings when config files are created by hand
#     - Checks each chapter, module, and exercise to ensure the appropriate fields are present and configured properly

import re
import sys
import os
import json
import collections
import codecs
from collections import Iterable
from urlparse import urlparse

error_count = 0

required_fields = ['chapters']

optional_fields = ['assumes', 'av_origin', 'av_root_dir', 'build_cmap', 'build_dir', 'build_JSAV','code_dir',
'exercise_origin', 'exercises_root_dir', 'glob_mod_options', 'glob_exer_options', 'lang','req_full_ss', 'start_chap_num',
'suppress_todo', 'tabbed_codeinc', 'theme', 'theme_dir', 'dispModComp', 'tag', 'local_mode', 'title', 'desc', 'av_origin',
'av_root_dir', 'code_lang', 'course_id', 'LMS_url', 'module_map', 'inst_book_id','module_position','inst_exercise_id',
'inst_chapter_id','options','inst_module_id','id', 'total_points', 'last_compiled' ]


listed_modules = []
listed_chapters = []

# Prints the given string to standard error
def print_err(err_msg):
    sys.stderr.write('%s\n' % err_msg)


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


def get_mod_name(mod_config):
    """ Creates a list of the modules present in the book.
        The list will be used to convert :ref: directive to
        :term: directive if the module is not part of the book instance
    """

    mod_file = mod_config
    if '/' in mod_config:
        mod_file = re.split('/', mod_config)[1]
    if '.rst' in mod_file:
        mod_file = re.split('.rst', mod_file)[0]

    listed_modules.append(mod_file)


def get_odsa_dir():
    """Calculate the path to the OpenDSA root directory based on the location of this file"""

    # Auto-detect ODSA root directory by getting the directory where this
    # file is located and getting its parent directory (assumes
    # ODSA_Config.py is one level below root OpenDSA directory)
    # Convert to Unix-style path
    return os.path.dirname(os.path.dirname(os.path.abspath(__file__))).replace("\\", "/") + '/'

lang_file = get_odsa_dir() +  '/tools/language_msg.json'

# Error message handling based on validate_json.py (https://gist.github.com/byrongibson/1921038)
def parse_error(err):
    """
    "Parse" error string (formats) raised by (simple)json:
    '%s: line %d column %d (char %d)'
    '%s: line %d column %d - line %d column %d (char %d - %d)'
    """
    return re.match(r"""^
      (?P<msg>.+):\s+
      line\ (?P<lineno>\d+)\s+
      column\ (?P<colno>\d+)\s+
      (?:-\s+
        line\ (?P<endlineno>\d+)\s+
        column\ (?P<endcolno>\d+)\s+
      )?
      \(char\ (?P<pos>\d+)(?:\ -\ (?P<end>\d+))?\)
  $""", err, re.VERBOSE)


def validate_origin(origin, origin_type):
    """Validate the protocol, domain, and path of an origin"""
    global error_count

    parsed = urlparse(origin)
    if parsed.scheme not in ['http', 'https']:
        print_err('ERROR: Invalid %s_origin protocol, %s' % (origin_type, parsed.scheme))
        error_count += 1

    if parsed.netloc == '':
        print_err('ERROR: Invalid %s_origin domain, %s' % (origin_type, parsed.netloc))
        error_count += 1

    if parsed.path not in ['', '/']:
        print_err('ERROR: Invalid %s_origin path, %s' % (origin_type, parsed.path))
        error_count += 1


def validate_exercise(exer_name, exercise):
    """Validate an exercise object"""
    global error_count

    # Ensure exercise name is <= the max length of the Exercise name field in the database
    max_length = 50
    if len(exer_name) > max_length:
        print_err('ERROR: %s is greater than %d characters' % (exer_name, max_length))
        error_count += 1

    required_fields = []
    optional_fields = ['exer_options', 'long_name', 'points', 'remove', 'required', 'showhide', 'threshold', 'external_url'
                        'inst_book_id','module_position','inst_exercise_id',
                        'inst_chapter_id','options','inst_module_id','id', 'total_points']

    # Ensure required fields are present
    for field in required_fields:
        if field not in exercise:
            print_err('ERROR: Exercise, %s, is missing required field, %s' % (exer_name, field))
            error_count += 1

    # Ensure there are no invalid fields in the module
    for field in exercise:
        if field not in (required_fields + optional_fields):
            print_err('ERROR: Unknown field, %s, found in exercise %s' % (field, exer_name))
            error_count += 1


# Validate a module
def validate_module(mod_name, module, conf_data):
    """Validate a module object"""
    global error_count

    required_fields = []
    optional_fields = ['codeinclude', 'dispModComp', 'long_name', 'mod_options', 'sections', 'exercises',
                        'lms_module_item_id', 'lms_section_item_id','inst_book_id','module_position','inst_exercise_id',
                        'inst_chapter_id','options','inst_module_id','id', 'total_points']

    # Get module name
    get_mod_name(mod_name)

    # Ensure required fields are present
    for field in required_fields:
        if field not in module:
            print_err('ERROR: Module, %s, is missing required field, %s' % (mod_name, field))
            error_count += 1

    # Ensure there are no invalid fields in the module
    for field in module:
        if field not in (required_fields + optional_fields):
            print_err('ERROR: Unknown field, %s, found in module %s' % (field, mod_name))
            error_count += 1


    if 'codeinclude' in module:
        # Check whether every language specified for a codeinclude is supported in code_lang
        for lang in module['codeinclude'].values():
            if lang not in conf_data['code_lang']:
                print('ERROR: Unsupported language, %s, referenced in codeinclude' % lang)
                error_count += 1

            lang_dir = conf_data['code_dir'] + lang

            # Ensure the source code directory exists for the specified language
            if not os.path.isdir(lang_dir):
                print('ERROR: Language directory %s does not exist' % lang_dir)
                error_count += 1

    sections = module['sections']

    if sections != None:
        for section in sections:
            section_obj = sections[section]
            if isinstance(section_obj, dict):
              for attr in section_obj:
                if isinstance(section_obj[attr], dict):
                    validate_exercise(attr, section_obj[attr])

# get names of chapter
def get_chap_names(chapters):
    for k in chapters:
        listed_chapters.append(k)


# Validate a section
def validate_chapter(conf_data):
    """Validate a chapter by validating all its modules"""
    chapters = conf_data['chapters']
    for chapter in chapters:
        chapter_obj = chapters[chapter]
        for module in chapter_obj:
            module_obj = chapter_obj[module]
            if isinstance(module_obj, dict):
                validate_module(module, module_obj, conf_data)

# Validate an OpenDSA configuration file
def validate_config_file(config_file_path, conf_data):
    """Open the specified config file, parse it as JSON and validate the overall settings"""
    global error_count

    print "\nValidating " + config_file_path + '\n'

    # Ensure all required fields are present
    for field in required_fields:
        if field not in conf_data:
            print_err('ERROR: Required field missing, %s' % field)
            error_count += 1

    mod_opts = conf_data['glob_mod_options']
    exer_opts = conf_data['glob_exer_options']

    # Use lang option to automatically set natural language for the JSAV_OPTIONS object
    if 'JOP-lang' not in mod_opts:
        conf_data['glob_mod_options']['JOP-lang'] = conf_data['lang']

    if 'JOP-lang' not in exer_opts:
        conf_data['glob_exer_options']['JOP-lang'] = conf_data['lang']

    # Use first language provided in code_lang to set the code language attribute for JSAV_EXERCISE_OPTIONS (if code lang is not explicitly specified)
    if len(conf_data['code_lang'].keys()) > 0:
        if 'JXOP-code' not in mod_opts and 'JOP-code' not in mod_opts:
            conf_data['glob_mod_options']['JXOP-code'] = conf_data['code_lang'].keys()[0].lower()

        if 'JXOP-code' not in exer_opts and 'JOP-code' not in exer_opts:
            conf_data['glob_exer_options']['JXOP-code'] = conf_data['code_lang'].keys()[0].lower()

    # Ensure the config file doesn't have any unknown fields (catches mis-spelled fields when config file is manually edited)
    for field in conf_data:
        if field not in (required_fields + optional_fields):
            print_err('ERROR: Unknown field, %s' % field)
            error_count += 1

    validate_chapter(conf_data)
    get_chap_names(conf_data['chapters'])

    if error_count > 0:
        print_err('Errors found: %d\n' % error_count)
        sys.exit(1)


def set_defaults(conf_data):
    """Assign default values to optional config attributes"""

    odsa_dir = get_odsa_dir()

    if 'code_dir' not in conf_data:
        conf_data['code_dir'] = 'SourceCode/'

    conf_data['code_dir'] = process_path(conf_data['code_dir'], odsa_dir)


    # 'exercises_root_dir' should default to the OpenDSA root directory
    if 'av_root_dir' not in conf_data:
        conf_data['av_root_dir'] = odsa_dir

    # 'exercises_root_dir' should default to the OpenDSA root directory
    if 'exercises_root_dir' not in conf_data:
        conf_data['exercises_root_dir'] = odsa_dir


    # 'assumes' does not need to be initialized

    if 'build_dir' not in conf_data:
        conf_data['build_dir'] = 'Books'

    # 'build_JSAV' does not need to be initialized

    # If no global module options are specified, defer to module-specific options or the defaults in odsaUtils.js
    if 'glob_mod_options' not in conf_data:
        conf_data['glob_mod_options'] = {}

    # If no global exercise options are specified, defer to exercise-specific options or the defaults in odsaUtils.js
    if 'dispModComp' not in conf_data:
        conf_data['dispModComp'] = True

    if 'glob_exer_options' not in conf_data:
        conf_data['glob_exer_options'] = {}

    if 'lang' not in conf_data:
        conf_data['lang'] = 'en'

    if 'build_cmap' not in conf_data:
        conf_data['build_cmap'] = False

    if 'tabbed_codeinc' not in conf_data:
        conf_data['tabbed_codeinc'] = True

    if not isinstance(conf_data['tabbed_codeinc'], bool):
        conf_data['tabbed_codeinc'] = True
        print_err('WARNING: tabbed_codeinc must be a boolean')

    if 'start_chap_num' not in conf_data:
        conf_data['start_chap_num'] = 0  # 1

    if 'suppress_todo' not in conf_data:
        conf_data['suppress_todo'] = False

    # Require slideshows to be fully completed for credit by default
    if 'req_full_ss' not in conf_data:
        conf_data['req_full_ss'] = True

    if 'theme' not in conf_data:
        conf_data['theme'] = 'haiku'

    if 'theme_dir' not in conf_data:
        conf_data['theme_dir'] = '%sRST/_themes' % odsa_dir

    conf_data['av_origin'] = ''
    conf_data['av_root_dir'] = odsa_dir
    conf_data['exercises_root_dir'] = odsa_dir

    if 'code_lang' not in conf_data or not bool(conf_data['code_lang']) or conf_data['code_lang'] == '{}':
        conf_data['code_lang'] ={
                                  "Java": {"ext": ["java"],"label": "Java","lang": "java"
                                  },
                                  "Processing": {"ext": ["pde"],"label": "Processing","lang": "java"
                                  },
                                  "Java_Generic": {"ext": [  "java"],"label": "Java (Generic)","lang": "java"
                                  },
                                  "C++": {"ext": [  "cpp",  "h"],"label": "C++","lang": "C++"
                                  }
                                }

def group_exercises(conf_data, no_lms):
    """group all exercises of one module in exercises attribute"""
    chapters = conf_data['chapters']

    for chapter in chapters:
        chapter_obj = chapters[chapter]

        if not isinstance(chapter_obj, Iterable):
            continue

        for module in chapter_obj:
            module_obj = chapter_obj[module]

            if not isinstance(module_obj, Iterable):
                continue

            conf_data['chapters'][chapter][module]['exercises'] = {}

            sections = module_obj.get("sections")
            if bool(sections) and sections != None:
                for section in sections:
                    section_obj = sections[section]
                    if section_obj != None and isinstance(section_obj, dict):
                      for attr in section_obj:
                          if isinstance(section_obj[attr], dict):
                              exercise_obj = section_obj[attr]
                              conf_data['chapters'][chapter][module]['exercises'][attr] = exercise_obj
                    if 'learning_tool' in section_obj.keys():
                        exercise_obj = {}
                        exercise_obj['long_name'] = section
                        exercise_obj['learning_tool'] = section_obj['learning_tool']
                        conf_data['chapters'][chapter][module]['exercises'][section] = exercise_obj

def get_translated_text(lang_):
    """ Loads appropriate text from language_msg.json file based on book language  """

    # Throw an error if the specified config files doesn't exist
    if not os.path.exists(lang_file):
        print_err("ERROR: File %s doesn't exist\n" % lang_file)
        sys.exit(1)

    final_lang = lang_
    # Try to read the language file data as JSON
    try:
        with open(lang_file, "r") as msg_trans:
                # Force python to maintain original order of JSON objects (or else the chapters and modules will appear out of order)
            lang_text_json = json.load(msg_trans)
            if lang_ in lang_text_json:
                lang_text = lang_text_json[lang_]["jinja"]
            else:
                print_err('WARNING: Translation for "' + lang_ + '" not found, the language has been switched to english')
                lang_text = lang_text_json["en"]["jinja"]
                final_lang = "en"
    except ValueError, err:
        # Error message handling based on validate_json.py (https://gist.github.com/byrongibson/1921038)
        msg = err.message
        print_err(msg)

        if msg == 'No JSON object could be decoded':
            print_err('ERROR: %s is not a valid JSON file or does not use a supported encoding\n' % lang_file)
        else:
            err = parse_error(msg).groupdict()
            # cast int captures to int
            for k, v in err.items():
                if v and v.isdigit():
                    err[k] = int(v)

            with open(lang_file) as lang_lines:
                lines = lang_lines.readlines()

            for ii, line in enumerate(lines):
                if ii == err["lineno"] - 1:
                    break

            print_err("""
        %s
        %s^-- %s
        """ % (line.replace("\n", ""), " " * (err["colno"] - 1), err["msg"]))

        # TODO: Figure out how to get (simple)json to accept different encodings
        sys.exit(1)
    return lang_text, final_lang


def read_conf_file(config_file_path):
    """read configuration file as json"""

    # Throw an error if the specified config files doesn't exist
    if not os.path.exists(config_file_path):
        print_err("ERROR: File %s doesn't exist\n" % config_file_path)
        sys.exit(1)

    # Try to read the configuration file data as JSON
    try:
        with open(config_file_path) as config:
            # Force python to maintain original order of JSON objects (or else the chapters and modules will appear out of order)
            conf_data = json.load(config, object_pairs_hook=collections.OrderedDict)
    except ValueError, err:
        # Error message handling based on validate_json.py (https://gist.github.com/byrongibson/1921038)
        msg = err.message
        print_err(msg)

        if msg == 'No JSON object could be decoded':
            print_err('ERROR: %s is not a valid JSON file or does not use a supported encoding\n' % config_file_path)
        else:
            err = parse_error(msg).groupdict()
            # cast int captures to int
            for k, v in err.items():
                if v and v.isdigit():
                    err[k] = int(v)

            with open(config_file_path) as config:
                lines = config.readlines()

            for ii, line in enumerate(lines):
                if ii == err["lineno"] - 1:
                    break

            print_err("""
    %s
    %s^-- %s
    """ % (line.replace("\n", ""), " " * (err["colno"] - 1), err["msg"]))

        # TODO: Figure out how to get (simple)json to accept different encodings
        sys.exit(1)

    return conf_data


class ODSA_Config:

    def __getitem__(self, key):
        return self.__dict__[key]

    def __setitem__(self, key, value):
        self.__dict__[key] = value

    def __init__(self, config_file_path, output_directory=None, no_lms=None):

        """Initializes an ODSA_Config object by reading in the JSON config file, setting default values, and validating the configuration"""

        conf_data = read_conf_file(config_file_path)

        # group exercises
        group_exercises(conf_data, no_lms)
        # print(json.dumps(conf_data))

        # Assign defaults to optional settings
        set_defaults(conf_data)

        # Make sure the config file is valid
        validate_config_file(config_file_path, conf_data)

        conf_data['req_full_ss'] = str(conf_data['req_full_ss']).lower()

        # Make conf_data publicly available
        for field in required_fields:
            self[field] = conf_data[field]

        for field in optional_fields:
            self[field] = conf_data[field] if field in conf_data else None

        # Loads translated text
        self['text_translated'], self['lang'] = get_translated_text(self['lang'])
        self['lang_file'] = lang_file

        # Make the list of modules publicly available
        self['listed_modules'] = listed_modules
        self['listed_chapters'] = listed_chapters

        # Saves the path to the config file used to create the book
        self.config_file_path = config_file_path

        # Parse the name of the config file to use as the book name
        if output_directory is None:
            self.book_name = os.path.basename(config_file_path).replace('.json', '')
        else:
            self.book_name = output_directory

        self.odsa_dir = get_odsa_dir()

        # Set the output directories needed for the build process
        # The directory for the entire book
        self.book_dir = '%s%s/' % (process_path(self.build_dir, self.odsa_dir), self.book_name)

        # The directory from which Sphinx will read the RST files
        self.book_src_dir = self.book_dir + 'source/'

        # The directory within the book directory where Sphinx will write the HTML files
        self.rel_book_output_path = 'html/'

        # The Unix-style relative path between the build directory and the OpenDSA root directory
        self.rel_build_to_odsa_path = os.path.relpath(self.odsa_dir, self.book_dir + self.rel_book_output_path).replace("\\", "/") + '/'

        # module canvas id map, will be filled later while course creation.
        self.module_map = {}


# Code to execute when run as a standalone program
if __name__ == "__main__":
    # Process script arguments
    if len(sys.argv) != 2:
        print_err("Invalid config filename")
        print_err("Usage: %s config_file_path\n" % sys.argv[0])
        sys.exit(1)

    ODSA_Config(sys.argv[1])
