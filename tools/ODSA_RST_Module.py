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
from datetime import datetime
import re
import codecs
from string import whitespace as ws
import config_templates

# Regular Expression patterns helpful for parsing RST markup
WHITESPACE_PATTERN = re.compile(r"(\s)+") # matches 1 or more whitespace chars
DIRECTIVE_PATTERN = re.compile(r"\s*\.\. (\S+)::(.*)") # matches and groups RST directives
DIRECTIVE_OPT_PATTERN = re.compile(r"[\t ]+:(.+): (.+)") # matches directive options
CHAPTER_PATTERN = re.compile(r'=+')
SECTION_PATTERN = re.compile(r'-+')
SUBSECTION_PATTERN = re.compile(r'~+')

VALID_DIR_ARG_AMOUNTS = dict(inlineav=2, avembed=2, extrtoolembed=1, 
                             showhidecontent=1, codeinclude=1, odsalink=1, odsascript=1)


def print_err(*args, **kwargs):
    '''Prints the given string to standard error'''
    print(*args, file=sys.stderr, **kwargs)


def format_mod_options(options):
    '''Generates a string that will be appended to the RST module header that sets the module options appropriately'''
    option_str = ''
    for option, value in options.items():
        # Convert Python booleans to JavaScript booleans and quote strings
        if str(value) in ['True', 'False']:
            value = str(value).lower()
        elif isinstance(value, str):
            value = f"'{value}'"
        # Set JSAV options as necessary and set all others as standard variables
        if option.startswith('JXOP-'):
            option_str += "JSAV_EXERCISE_OPTIONS['%s']=%s;" % (option[5:], value)
        elif option.startswith('JOP-'):
            option_str += "JSAV_OPTIONS['%s']=%s;" % (option[4:], value)
        else:
            option_str += f"var {option}={value};"
    return option_str

def determine_module_completable(mod_attrib, dispModComp):
    '''Returns a boolean indicating whether or not the module can be completed'''
    # Set a JS flag on the page, indicating whether or not the module can be completed
    if 'dispModComp' in mod_attrib:
        # Use the value specified in the configuration file to override the calculated value
        return mod_attrib['dispModComp']
    elif dispModComp:
        return True
    else:
        # Display 'Module Complete' only if the module contains at least one required exercise
        for exer_name, exer_obj in list(mod_attrib['exercises'].items()):
            if 'required' in exer_obj and exer_obj['required']:
                return True
    return True

def is_index_option(mod_data, i, line):
    if re.match(r'^\w+:.+$', line) != None:
        i -= 1
        while i >= 0:
            line = mod_data[i].strip()
            if re.match(r'^\w+:.+$', line) != None:
                i -= 1
            else:
                return line.startswith('.. index::')
    return False

def process_ref_chap(extension, line, book_objects, lead_space, standalone_modules=False):
    '''method responsible of converting :ref: and :chap: to :term: when reference / chapter is missing.'''
    # lower case modules names
    lower_listed_modules = [x.lower() for x in book_objects]
    last = '\n' if line.endswith('\n') else ''
    line_t = line.strip()
    separator = f'{extension}|`'
    rel_tokens = re.split(separator, line_t)
    if len(rel_tokens) == 4:
        rel_labels = rel_tokens[2]
        rel_tags = re.split('<|>', rel_labels)
        # We encountered the alternate :ref:/:chap: syntax
        if len(rel_tags) == 3:
            if (rel_tags[1].strip().lower() not in lower_listed_modules) or standalone_modules:
                # just output anchor text
                line_t = line_t.replace(extension, '')
                line_t = line_t.replace(f'`{rel_labels}`', rel_tags[0])
        if len(rel_tags) == 5:
            if (rel_tags[3].strip().lower() in lower_listed_modules) and not standalone_modules:
                # module is present swith to standard :rel: syntax
                newDir = f'{rel_tags[0]} <{rel_tags[3]}>'
                if extension == ':chap:':
                    newDir = str(rel_tags[3])
            else:
                # module absent swith to :term:
                line_t = line_t.replace(extension, ':term:')
                newDir = f'{rel_tags[0]} <{rel_tags[1]}>'
            line_t = line_t.replace(rel_labels, newDir)
    return lead_space + line_t + last



class ODSA_RST_Module:

    def __init__(self, config, mod_path, mod_attrib={'exercises': {}}, satisfied_requirements=[], chap='', depth=0, current_section_numbers=[], standalone_modules=False):

        mod_path = os.path.splitext(mod_path)[0]
        mod_name = os.path.basename(mod_path)
        mod_num = ''

        # Hack to maintain the same numbering scheme as the old preprocessor
        if len(current_section_numbers) > 0 and not standalone_modules:
            mod_num = '%s.%d' % ('.'.join(
                str(j) for j in current_section_numbers[:-1]), (current_section_numbers[-1] + 1))

        '''Public Fields:'''
        self.console_msg_prefix = '  ' * (depth + 1)
        self.images = []
        self.missing_exercises = []
        self.processed_sections = []
        self.requirements_satisfied = []
        self.todo_list = []
        self.num_ref_map = {}
        self.cmap_dict = {} # concept map dictionary for glossary
        
        self.cmap_dict['concepts'] = {}
        self.cmap_dict['linking_phrase'] = {}
        self.cmap_dict['connections'] = {}
        # Initialize counters
        counters = {'figure': 1, 'anon_fig': 0, 'table': 1,
                    'example': 1, 'theorem': 1, 'equation': 1}

        exercises = mod_attrib['exercises']

        dispModComp = determine_module_completable(mod_attrib, config.dispModComp)

        filename = f'{config.odsa_dir}RST/{config.lang}/{mod_path}.rst'

        # If the specified RST file doesn't exist in the specified language, default to English
        if config.lang != 'en' and not os.path.exists(filename):
            filename = f'{config.odsa_dir}RST/en/{mod_path}.rst'

        if not os.path.exists(filename):
            print_err(f'ERROR: Module does not exist: {mod_path}')
            return

        # Read the contents of the module file from the RST source directory
        with codecs.open(filename, 'r', encoding='utf-8') as mod_file:
            mod_data = mod_file.readlines()

        # Merge global module options with local modules options, if applicable, so that local options override the global options
        if 'mod_options' in mod_attrib:
            mod_options = dict(
                list(config.glob_mod_options.items()) + list(mod_attrib['mod_options'].items()))
        else:
            mod_options = config.glob_mod_options

        # Generate the RST header for the module
        header_data = {}
        header_data['mod_name'] = mod_name
        header_data['dispModComp'] = str(dispModComp).lower()
        header_data['long_name'] = mod_attrib['long_name'] if 'long_name' in mod_attrib else mod_name
        header_data['mod_chapter'] = chap
        header_data['mod_date'] = str(datetime.now()).split('.')[0]
        header_data['mod_options'] = format_mod_options(mod_options)
        header_data['build_cmap'] = str(config.build_cmap).lower()
        # Include an empty unicode directive when building slides
        header_data['unicode_directive'] = config_templates.rst_header_unicode if os.environ.get(
            'SLIDES', None) == "no" else ''
        # Prepend the header data to the exisiting module data

        if os.environ.get('SLIDES', None) == "yes":
            # implicit hyperlink from '.. _%(mod_name)s:' creates a critical error when building slides
            config_templates.rst_header = config_templates.rst_header.replace('.. _%(mod_name)s:', '.. LINK REMOVED for slides')
        mod_data.insert(0, config_templates.rst_header % header_data)

        avmetadata_found = False

        links = {}
        scripts = {}

        # Alter the contents of the module based on the config file
        i = -1 # i is effectively the line number within the rst file. 
        module_title_found = False
        section_title_found = False
        content_before_module = False
        content_before_section = False

        errors = []
        while i + 1 < len(mod_data):
            i += 1 # line number is incremented first to ensuring continues go to next line

            line = mod_data[i].strip()
            lead_space = ' ' * (len(mod_data[i]) - len(mod_data[i].lstrip()))

            next_line = mod_data[i+1].strip() if i+1 < len(mod_data) else ''

            is_chapter = re.match(CHAPTER_PATTERN, next_line)
            is_section = re.match(SECTION_PATTERN, next_line)
            is_sub_section = re.match(SUBSECTION_PATTERN, next_line)


            ############# chapter / section / subsection processing ##############
            if is_chapter or is_section or is_sub_section:
                self.processed_sections.append(line)
                module_title_found = True
            elif not module_title_found:
                if not content_before_module \
                        and not (line == '' or line.startswith('.. ') or line.startswith(':')) \
                        and not is_index_option(mod_data, i, line):
                    content_before_module = True
                    errors.append((f"ERROR: {mod_path}: line {i} ('{line}') - should not have content before module title", True))
            # check if the current line is a section title
            # and if so, check if the configuration and remove the section
            # if the configuration indicates to do so
            if is_section \
                    and mod_attrib["sections"] != None \
                    and line in mod_attrib["sections"] \
                    and "showsection" in mod_attrib["sections"][line] \
                    and not mod_attrib["sections"][line]["showsection"]:
                print(f'{self.console_msg_prefix}Removing section: {line}')
                mod_data[i] = ''
                for i in range(i, len(mod_data)-2):
                    next_line = mod_data[i+2] if i+2 < len(mod_data) else ''
                    if re.match(SECTION_PATTERN, next_line):  
                        break  # found new section, so stop removing last section...
                    mod_data[i] = ''

            if is_chapter:
                module_title_found = True
            else:
                if is_section:
                    section_title_found = True
                elif module_title_found and not section_title_found \
                    and not content_before_section \
                    and (re.match(r'^(\.\. )+(avembed|inlineav):: [^\s]+( )?(pe|ka)?$', line) != None
                            or re.match(r'^(\.\. )+(extrtoolembed):: [^\r\n]+$', line) != None):
                    content_before_section = True
                    errors.append((f"ERROR: {mod_path}: line {i} ('{line}') - exercises must be inside a section", True))

            ################### :OPTION: PROCESSING #########################

            if line.startswith(':ref:'):
                mod_data[i] = process_ref_chap(
                    ':ref:', mod_data[i], config.listed_modules, lead_space, standalone_modules)
            elif line.startswith(':chap:'):
                mod_data[i] = process_ref_chap(
                    ':chap:', mod_data[i], config.listed_chapters, lead_space, standalone_modules)

            elif ':target:' in line:
                trgt = re.split('target:', mod_data[i], re.IGNORECASE)[1]
                # Remove all whitespace from the target
                trgt = "".join(trgt.split())
                pattern = '%s#'
                if mod_num:
                    pattern = '.' + pattern
                self.num_ref_map[trgt] = mod_num + pattern % counters['figure']
                counters['figure'] += 1

            elif line.startswith(':requires:'):
                # Parse the list of prerequisite topics from the module
                requires = [req.strip() for req in line.replace(':requires:', '').split(';')]
                # Print a warning message if a missing prereq is encountered
                for req in requires:
                    if req != '' and req not in satisfied_requirements:
                        self.print_err_prefix(f"WARNING: {req} is an unsatisfied prerequisite for {mod_name}, line {i+1}")
            elif line.startswith(':satisfies:'):
                # Parse the list of prerequisite topics this module satisfies and add them to a list of satisfied prereqs
                rest_of_line = line.replace(':satisfies:', '')
                self.requirements_satisfied = [req.strip() for req in rest_of_line.split(';')]
                
            elif line.startswith(':to-term:'):
                # process concept map relationships
                term = mod_data[i-1]
                term_rel = line
                line_num = i
                # Remove concept map config from the RST file
                mod_data[i] = ''
                i += 1
                # We allow alt-text to span multiple lines
                while (i < len(mod_data) and (mod_data[i].strip() != '' or mod_data[i] not in ['\n', '\r\n'])):
                    if mod_data[i].strip().startswith(':to-term:'):
                        self.parse_term_relationship(term_rel, term, line_num, self.cmap_dict)
                        term_rel = mod_data[i]
                        line_num = i
                    else:
                        term_rel += mod_data[i]
                    mod_data[i] = ''
                    i += 1

                self.parse_term_relationship(term_rel, term, line_num, self.cmap_dict)
                i -= 1

            if line.startswith(':autoslides:') and os.environ['SLIDES'] == 'no':
                mod_data[i] = ''

                
            ################### DIRECTIVE PROCESSING #########################

            # Determine the type of directive, grabbing valid arguments and options
            dir_type, dir_args, dir_opts = self.parse_directive(mod_data, i)

            if dir_type is not None:
                # Update any counters linked to this directive
                self.update_counters(mod_data[i - 2], dir_type, dir_args, mod_num, counters)

            if dir_type is None: # most lines are not directives, so check first
                pass
            # Code to change the ..slide directive to a header when the -s option is not added
            elif dir_type == 'slideconf' and os.environ['SLIDES'] == 'no':
                # Remove the slideConf Directive
                mod_data[i] = ''
            elif dir_type == 'slide' and  os.environ['SLIDES'] == 'no':
                # Change the slide directive into subsection instead
                header = line.partition("::")[2].strip()
                underline = '~' * len(header)
                mod_data[i] = f"{header}\n{underline}"
            elif dir_type == 'figure' or dir_type == 'odsafig':
                image_path = dir_args[-1]
                self.images.append(os.path.basename(image_path))

            elif dir_type.lower() == 'todo':
                if config.suppress_todo:
                    # Remove ToDo directives from the RST file
                    mod_data[i] = ''
                    i += 1
                    while (i < len(mod_data) and (mod_data[i].startswith('   ') or mod_data[i].rstrip() == '')):
                        mod_data[i] = ''
                        i += 1
                else:
                    # Process the ToDo directive and save it as an entry in 'todo'
                    todo_type = ''
                    todo_directive = [mod_data[i]]
                    todo_num = len(self.todo_list)
                    # Prepend an anchor to the todo directive so that we can hyperlink to it from the ToDo page
                    todo_id = f'todo{todo_num}'
                    mod_data[i] = f'.. raw:: html\n\n   <a id="{todo_id}"></a>\n\n{mod_data[i]}'
                    i += 1
                    while (i < len(mod_data) and (mod_data[i].startswith('   ') or mod_data[i].rstrip() == '')):
                        if ':type:' in mod_data[i]:
                            todo_type = mod_data[i].split(': ')[1].strip()
                            # This must be modified because the :type: option doesn't exist for the todo directive
                            mod_data[i] = '  type: ' + todo_type
                        todo_directive.append(mod_data[i].rstrip())
                        i += 1
                    self.todo_list.append((todo_id, mod_name, todo_type, todo_directive))
                # Back up one line so that when 'i' is incremented at the end of the loop it will point to the next directive
                i -= 1
                
            elif dir_type == 'inlineav':
                av_name, av_type = dir_args
                if av_type in ['ss', 'ff', 'dgm']:
                    links_found = False
                    scripts_found = False

                    for j in range(i+1, len(mod_data)):
                        strip_line = mod_data[j].strip()
                        if not strip_line.startswith(':'):
                            break # options are done, resume regular parsing...
                        elif strip_line.startswith(':links:'):
                            links_opt = strip_line.partition(':links:')[2].strip().split()
                            for link in links_opt:
                                links_found = True
                                if link not in links:
                                    links[link] = False
                            mod_data[j] = ''
                        elif strip_line.startswith(':scripts:'):
                            scipts_opt = strip_line.partition(':scripts:')[2].strip().split()
                            for script in scipts_opt:
                                scripts_found = True
                                if script not in scripts:
                                    scripts[script] = False
                            mod_data[j] = ''

                    if not scripts_found and os.environ['SLIDES'] == 'no':
                        self.print_err_prefix(f"WARNING: Module '{mod_path}' -- inlineav '{av_name}' missing :scripts: option")

                if av_type == 'ss' or av_type == 'ff':
                    if av_name not in exercises:
                        # If the SS is not listed in the config file, add its name to a list of missing exercises, ignore missing diagrams
                        self.missing_exercises.append(av_name)
                    else:
                        # Add the necessary information from the slideshow from the configuration file
                        # Diagrams (av_type == 'dgm') do not require this extra information
                        exer_conf = exercises[av_name]

                        # List of valid options for inlineav directive
                        options = ['points', 'required', 'threshold', 'id']
                        for option in options:
                            if option in exer_conf:
                                mod_data[i] += f"\n{lead_space}   :{option}: {str(exer_conf[option])}"

                elif av_type == 'dgm' and av_name in exercises and exercises[av_name] != {}:
                    # If the configuration file contains attributes for diagrams, warn the user that attributes are not supported
                    self.print_err_prefix(f"WARNING: {av_name} is a diagram (attributes are not supported), line {i}")
                elif av_type not in ['ff', 'ss', 'dgm']:
                    # If a warning if the exercise type doesn't match something we expect
                    self.print_err_prefix(f"WARNING: Unsupported type '{av_type}' specified for {av_name}, line {i}")
            ### done with .. inlineav:: 

            elif dir_type == 'avembed':
                av_path, av_type = dir_args

                # check that the av file exists
                if not os.path.exists(f'{config.odsa_dir}/{av_path}'):
                    self.print_err_prefix(f"WARNING: In module '{mod_path}' -- the avembed file '{av_path}' does not exist.")

                av_name = os.path.splitext(os.path.basename(av_path))[0]

                # If the config file states the exercise should be removed, remove it
                if av_name in exercises and 'remove' in exercises[av_name] and exercises[av_name]['remove']:
                    print(f'{self.console_msg_prefix}Removing: {av_name}')

                    # Config file states exercise should be removed, remove it from the RST file
                    while (i < len(mod_data) and mod_data[i].rstrip() != ''):
                        mod_data[i] = ''
                        i += 1
                else:
                    # Append module name to embedded exercise
                    mod_data[i] += f'{lead_space}   :module: {mod_name}\n'

                    if av_name not in exercises:
                        # look in :options: to find out if we are using a template exercise
                        if 'exer_name' in dir_opts:
                            # we are using template! Replace av_name
                            av_name = dir_opts['exer_name']
                    if av_name not in exercises:
                        # Add the name to a list of missing exercises
                        self.missing_exercises.append(av_name)
                    else:
                        # Add the necessary information from the configuration file
                        exer_conf = exercises[av_name]

                        # List of valid options for avembed directive
                        options = ['points', 'required', 'showhide', 'threshold', 'external_url', 'id']
                        rst_options = []
                        for option in options:
                            if option in exer_conf:
                                rst_options.append(f"{lead_space}   :{option}: {str(exer_conf[option])}\n")

                        # JSAV grading options are not applicable to Khan Academy exercises or slideshows and will be ignored
                        # if av_type not in ['ka', 'ss']:
                        # Merge exercise-specific settings with the global settings (if applicable) so that the specific settings override the global ones

                        xops = config.glob_exer_options
                        if 'exer_options' in exer_conf:
                            xops.update(exer_conf['exer_options']) ## overwrite global options with more specific ones

                        # Convert python booleans to JavaScript booleans, URL-encode the string and append it to the RST options
                        xop_str = '&amp;'.join([f'{option}={value}' for option, value in xops.items()])
                        xop_str = xop_str.replace("=True", "=true")
                        xop_str = xop_str.replace("=False", "=false")
                        rst_options.append(f'{lead_space}   :exer_opts: {xop_str}\n')
                        mod_data[i] += ''.join(rst_options)
            # done with .. avembed::

            elif dir_type == 'extrtoolembed':
                external_tool_name = dir_args[0].replace("'", "")

                # Append module name to embedded exercise
                mod_data[i] += f'{lead_space}   :module: {mod_name}\n'

                if external_tool_name not in exercises:
                    # Add the name to a list of missing exercises
                    self.missing_exercises.append(external_tool_name)
                else:
                    # Add the necessary information from the configuration file
                    exer_conf = exercises[external_tool_name]
                    # List of valid options for avembed directive
                    options = ['long_name', 'enable_scrolling',
                                'frame_width', 'frame_height',
                                'learning_tool', 'launch_url', 'id']
                                        
                    options = [o for o in options if o not in dir_opts]
                    options = [o for o in options if o in exer_conf]
                    rst_options = [f"{lead_space}   :{o}: {str(exer_conf[o])}\n" for o in options]
                    mod_data[i] += ''.join(rst_options)

            elif dir_type == 'showhidecontent':
                section_id = dir_args[0]
                self.processed_sections.append(section_id)

                if 'sections' in mod_attrib and section_id in mod_attrib['sections']:
                    section_data = mod_attrib['sections'][section_id]
                    if 'remove' in section_data and section_data['remove']:
                        print(f'{self.console_msg_prefix}Removing section: {section_id}')

                        # Config file states section should be removed, remove it from the RST file
                        mod_data[i] = ''
                        for i in range(i+1, len(mod_data)):
                            if mod_data[i].startswith('   ') or mod_data[i].rstrip() == '':
                                mod_data[i] = ''
                            else:
                                break
                        # Back up one line so that when 'i' is incremented at the end of the loop it will point to the next directive
                        i -= 1
                    else:
                        # Append all options provided in the section configuration unless they are on the ignore list
                        ignore_opts = ['remove']
                        rst_options = [f'   :{o}: {v}\n' for o, v in section_data.items() if o not in ignore_opts]
                        mod_data[i] += ''.join(rst_options)

            elif dir_type == 'codeinclude':
                code_name = dir_args[0]
                # If the config file specifies a lang argument for this codeinclude, append it to the directive
                if 'codeinclude' in mod_attrib and code_name in mod_attrib['codeinclude']:
                    mod_data[i] += f"   :lang: {mod_attrib['codeinclude'][code_name]}\n"
            elif dir_type == 'avmetadata':
                avmetadata_found = True

            ##### Above here is cleaned up!!!!!!

            elif dir_type == 'math':
                # Looks for math equations (with a label on the next line), increments the equation counter, and saves the information in 'num_ref_map'
                if 'label' in dir_opts:
                    equation = dir_opts['label']
                    dot = '.' if mod_num else ''
                    eq_num = str(counters['equation'])
                    self.num_ref_map[f'equation-{equation}'] = f"{mod_num}{dot}{eq_num}#"
                    counters['equation'] += 1

            elif dir_type == 'odsalink':
                links[dir_args[0]] = True
            elif dir_type == 'odsascript':
                scripts[dir_args[0]] = True

        ##### NOW DONE WITH PROCESSING EACH LINE OF MOD_DATA

        error_shown = False
        for (msg, module_error) in errors:
            if module_error or section_title_found:
                self.print_err_prefix(msg)
                error_shown = True

        if not avmetadata_found:
            self.print_err_prefix(f"WARNING: {mod_name} does not contain an ..avmetadata:: directive")

        # the odsascript directive needs to be indented when compiling slides, otherwise
        # the directive will be stripped during compilation
        indent = '' if os.environ['SLIDES'] == 'no' else '   '
        mod_data.append('\n')
        for script, has_directive in scripts.items():
            if not os.path.exists(f'{config.odsa_dir}/{script}'):
                self.print_err_prefix(f'WARNING: "{script}" does not exist.')
            if not has_directive:
                mod_data.append(f'{indent}.. odsascript:: {script}\n')

        for link, has_directive in reversed(list(links.items())):
            if not os.path.exists(f'{config.odsa_dir}/{link}'):
                self.print_err_prefix(f'WARNING: "{link}" does not exist.')
            if not has_directive:
                if os.environ['SLIDES'] == 'no':
                    mod_data.insert(1, f'\n.. odsalink:: {link}\n')
                else:
                    mod_data.append(f'\n{indent}.. odsalink:: {link}')

        mod_sections = []
        if 'sections' in mod_attrib and mod_attrib['sections'] != None:
            mod_sections = list(mod_attrib['sections'].keys())

        # Print a list of sections that appear in the config file but not the module
        missing_sections = list(set(mod_sections) - set(self.processed_sections))

        for section in missing_sections:
            self.print_err_prefix(f'WARNING: Section "{section}" not found in module "{mod_path}"')

        # TODO: Should we print the missing exercises with each module or at the end like we do now?

        if error_shown:
            sys.exit(1)

        # Add Timeme script tag
        pattern = "[?/.!()@,]"
        footer_data = {}
        module_name = mod_attrib['long_name'] if 'long_name' in mod_attrib else mod_name
        sections = [sec for sec in self.processed_sections if sec != module_name]
        sections = [sec.lower().replace(' ', '-').replace('\'', '-') for sec in sections]
        footer_data['sections'] = [re.sub(pattern, "", sec) for sec in sections]
        mod_data.insert(0, config_templates.rst_footer % footer_data)

        # Write the contents of the module file to the output src directory
        with codecs.open(f'{config.book_src_dir}{mod_name}.rst', 'w', 'utf-8') as mod_file:
            mod_file.writelines(mod_data)

    #### End of __init__ for ODSA_RST_Module


    def update_counters(self, label_line, dir_type, dir_args, mod_num, counters):
        '''Update figure, equation, theorem, table counters'''
        counter_name = None
        if dir_type == 'topic':
            for topic_kind in "table example theorem".split():
                if topic_kind in ''.join(dir_args).lower():
                    counter_name = topic_kind
        elif dir_type == 'table' or dir_type == 'odsatab':
            counter_name = 'table'
        elif dir_type == 'figure' or dir_type == 'odsafig':
            counter_name = 'figure'
        elif dir_type == 'inlineav' and 'dgm' in dir_args:
            counter_name = 'figure'
            
        if counter_name is None:
            return  # not a valid counter! 

        label = ''
        # Parse the label from format '.. _Label:' (if it exists)
        if label_line.startswith('.. _'):
            label = label_line.strip()[4:-1]

        if label != '':
            # If the item is labeled, record its number and increment its counter
            dot = '.' if mod_num else ''
            count = counters[counter_name]   # '' is not valid key....................................
            self.num_ref_map[label] = f"{mod_num}{dot}{count}#"
            counters[counter_name] += 1
        elif counter_name not in ['table', '']:
            # If the directive is for an unlabeled figure, record its number and increment 
            # the 'anon_fig' counter (in addition to the standard figure counter)
            if counter_name == 'figure' and label == '':
                fig_label = f"anon_fig{counters['anon_fig']}"
                self.num_ref_map[fig_label] = counters['figure']
                counters['anon_fig'] += 1
            # If the item is not labeled, increment the counter anyway (unless the directive is a 'table')
            counters[counter_name] += 1


    def parse_directive(self, mod_data, i):
        '''Parses a line into a RST directive and valid arguments and options; returning None if not possible'''
        match = re.match(DIRECTIVE_PATTERN, mod_data[i])
        if not match:
            return (None, None, None)
        directive_type = match.group(1).strip()
        directive_args = match.group(2).strip()
        if "'" in directive_args:
            directive_args = [directive_args]
        else:
            directive_args = directive_args.split()

        # Do checks for valid number of arguments for each directive type:
        if directive_type in VALID_DIR_ARG_AMOUNTS:
            if len(directive_args) != VALID_DIR_ARG_AMOUNTS[directive_type]:
                self.print_err_prefix(f"ERROR: Invalid directive arguments on line {i}, skipping object")
                return (None, None, None)
            
        directive_options = {}
        for i in range(i+1, len(mod_data)):
            match = re.match(DIRECTIVE_OPT_PATTERN, mod_data[i])
            if not match:
                break
            directive_options[match.group(1).strip()] = match.group(2).strip()

        return (directive_type, directive_args, directive_options)
    

    def parse_term_relationship(self, line, term, line_num, cmap_dict):
        '''parses the glossary terms relationships. prints error message if the format is not correct.  
        format    :to-term: term1 :label: label :alt-text: alternate text in case the to-term is not a glossary term
        '''
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
                cmap_dict['linking_phrase'][args[2].replace(
                    " ", "").strip().rstrip('\n')] = args[2]
            if args[1].replace(" ", "").strip().strip('\n') not in cmap_dict['linking_phrase']:
                size_c = len(cmap_dict['connections'])
                #cmap_dict['linking_phrase']['lp-' + str(size_lp + 1)] = args[2]
                cmap_dict['connections']['con-' +
                                        str(size_c + 1)] = {'from': term, 'to': args[1], 'label': args[2]}
                #cmap_dict['connections']['con-' + str(size_c + 2)] = {'from': args[2].replace(" ", "").strip().rstrip('\n'), 'to': args[1]}
        else:
            self.print_err_prefix(f"WARNING: Glossary terms relationship declaration on line {line_num}")
        

    def print_err_prefix(self, *args, **kwargs):
        '''Prints the given string to standard error, using the module's console prefix'''
        print(self.console_msg_prefix, *args, file=sys.stderr, **kwargs)
