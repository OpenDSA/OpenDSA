
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the MIT License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#

__author__ = 'Hossameldin Shahin'

import sys, os
import json
import xmltodict
import re
from docutils import nodes
from docutils.parsers.rst import Directive
from docutils.parsers.rst import directives
from collections import OrderedDict
from docutils.core import publish_parts
from argparse import ArgumentParser

folder_names = {
    "AlgAnal": "Algorithm Analysis",
    "Background": "Introduction and Mathematical Background",
    "Binary": "Binary Trees",
    "Biography": "Biographies",
    "Bounds": "Lower Bounds",
    "BTRecurTutor": "Binary Trees Recursion",
    "Design": "Design I and II",
    "Files": "File Processing",
    "FormalLang": "Formal Languages",
    "General": "General Trees",
    "Graph": "Graphs",
    "Hashing": "Hashing",
    "Indexing": "Indexing",
    "List": "Linear Structures",
    "MemManage": "Memory Management",
    "NP": "Limits to Computing",
    "PL": "Programming Languages",
    "PointersJava": "PointersJava",
    "RecurTutor": "Recursion",
    "Searching": "Searching I and II",
    "SearchStruct": "Search Structures",
    "SeniorAlgAnal": "Advanced Analysis",
    "Sorting": "Sorting",
    "Spatial": "Spatial Data Structures",
    "Tutorials": "Programming Tutorials",
    "Development": "Under Development"
    }

avembed_element= '''\
<avembed
    type="%(type)s"
    exer_name="%(exer_name)s"
    long_name="%(long_name)s"
    points="%(points)s"
    required="True"
    threshold="%(threshold)s">
</avembed>
'''

extertool_element= '''\
<extertool
    resource_name=%(resource_name)s
    resource_type="%(resource_type)s"
    learning_tool="%(learning_tool)s"
    points="%(points)s">
</extertool>
'''

inlineav_element = '''\
<inlineav
    type="%(type)s"
    exer_name="%(exer_name)s"
    long_name="%(long_name)s"
    points="%(points)s"
    required="True"
    threshold="%(threshold)s">
</inlineav>
'''

odsalink_element = '''<odsalink>%(odsalink)s</odsalink>'''
odsascript_element = '''<odsascript>%(odsascript)s</odsascript>'''


class avembed(Directive):
  required_arguments = 2
  optional_arguments = 1
  final_argument_whitespace = True
  option_spec = {
                  'long_name': directives.unchanged
                }
  has_content = True


  def run(self):
    """ Restructured text extension for inserting embedded AVs with show/hide button """
    av_path = self.arguments[0]
    self.options['type'] = self.arguments[1]
    self.options['exer_name'] = os.path.basename(av_path).partition('.')[0]

    if self.options['type'] == 'ka':
      self.options['points'] = 1.0
      self.options['threshold'] = 5
    elif self.options['type'] == 'pe':
      self.options['points'] = 1.0
      self.options['threshold'] = 0.9
    elif self.options['type'] == 'ss':
      self.options['points'] = 0.0
      self.options['threshold'] = 1.0
    elif self.options['type'] == 'ff':
      self.options['points'] = 0.0
      self.options['threshold'] = 1.0
    elif self.options['type'] == 'ae':
      self.options['points'] = 0.0
      self.options['threshold'] = 0.0

    if 'long_name' not in self.options:
      self.options['long_name'] = self.options['exer_name']

    res = avembed_element % (self.options)

    return [nodes.raw('', res, format='xml')]


class avmetadata(Directive):
  '''
  '''
  required_arguments = 0
  optional_arguments = 8
  final_argument_whitespace = True
  has_content = True
  option_spec = {'author':directives.unchanged,
                 'topic': directives.unchanged,
                 'requires': directives.unchanged,
                 'satisfies': directives.unchanged,
                 'prerequisites': directives.unchanged
                 }

  def run(self):
      """ Restructured text extension for collecting  AVs metadata nothing is written in the output html file """
      return [nodes.raw('', '<avmetadata>null</avmetadata>', format='xml')]


class extrtoolembed(Directive):
  required_arguments = 1
  optional_arguments = 0
  final_argument_whitespace = True
  has_content = True
  option_spec = {
                 'resource_name': directives.unchanged,
                 'resource_type': directives.unchanged,
                 'learning_tool': directives.unchanged,
                 'points': directives.unchanged
                 }

  def run(self):

    resource_name = self.arguments[0]
    if 'resource_name' not in self.options or self.options['resource_name'] == '':
      self.options['resource_name'] = resource_name
    if 'resource_type' not in self.options or self.options['resource_type'] == '':
      self.options['resource_type'] = 'external_assignment'
    if 'learning_tool' not in self.options or self.options['learning_tool'] == '':
      self.options['learning_tool'] = 'code-workout'
    if 'points' not in self.options or self.options['points'] == '':
      self.options['points'] = 2.0

    res = extertool_element % (self.options)
    return [nodes.raw('', res, format='xml')]


class inlineav(Directive):
  required_arguments = 2
  optional_arguments = 6
  final_argument_whitespace = True
  option_spec = {
                  'long_name': directives.unchanged,
                  'output': directives.unchanged,
                  'align': directives.unchanged,
                  'points': directives.unchanged,
                  'required': directives.unchanged,
                  'threshold': directives.unchanged
                }
  has_content = True


  def run(self):
    """ Restructured text extension for including inline JSAV content on module pages """
    self.options['exer_name'] = self.arguments[0]
    self.options['type'] = self.arguments[1]

    # Set defaults for any values that aren't configured
    if 'required' not in self.options:
      self.options['required'] = False

    if 'points' not in self.options:
      self.options['points'] = 0

    if 'threshold' not in self.options:
      self.options['threshold'] = 1.0

    if 'long_name' not in self.options:
      self.options['long_name'] = self.options['exer_name']

    self.options['align'] = None
    self.options['output'] = None

    res = inlineav_element % (self.options)
    return [nodes.raw('', res, format='xml')]


class odsalink(Directive):
  '''
  '''
  required_arguments = 1
  optional_arguments = 0
  final_argument_whitespace = True
  option_spec = {}

  def run(self):
    # """ Restructured text extension for including CSS and other libraries """
    self.options['odsalink'] = self.arguments[0]
    res = odsalink_element % (self.options)
    return [nodes.raw('', res, format='xml')]


class odsascript(Directive):
  '''
  '''
  required_arguments = 1
  optional_arguments = 0
  final_argument_whitespace = True
  option_spec = {}

  def run(self):
    # """ Restructured text extension for including CSS and other libraries """
    self.options['odsascript'] = self.arguments[0]
    res = odsascript_element % (self.options)
    return [nodes.raw('', res, format='xml')]


class index(Directive):
  '''
  '''
  required_arguments = 1
  optional_arguments = 0
  final_argument_whitespace = True
  option_spec = {}

  def run(self):
    # """ Restructured text extension for including CSS and other libraries """
    return [nodes.raw('', '<index>null</index>', format='xml')]


class codeinclude(Directive):
  '''
  '''
  required_arguments = 1
  optional_arguments = 0
  final_argument_whitespace = True
  option_spec = {}

  def run(self):
    # """ Restructured text extension for including CSS and other libraries """
    return [nodes.raw('', '<codeinclude>null</codeinclude>', format='xml')]


class todo(Directive):
  '''
  '''
  required_arguments = 0
  optional_arguments = 3
  final_argument_whitespace = True
  has_content = True
  option_spec = {
                'type': directives.unchanged,
                'tag': directives.unchanged
                }

  def run(self):
    # """ Restructured text extension for including CSS and other libraries """
    return [nodes.raw('', '<todo>null</todo>', format='xml')]


class glossary(Directive):
  '''
  '''
  required_arguments = 0
  optional_arguments = 3
  final_argument_whitespace = True
  has_content = True
  option_spec = {
                'sorted': directives.unchanged
                }

  def run(self):
    # """ Restructured text extension for including CSS and other libraries """
    return [nodes.raw('', '<glossary>null</glossary>', format='xml')]


class only(Directive):
  '''
  '''
  required_arguments = 1
  optional_arguments = 0
  required_arguments = 1
  optional_arguments = 0
  final_argument_whitespace = True
  has_content = True

  def run(self):
    # """ Restructured text extension for including CSS and other libraries """
    return [nodes.raw('', '<only>null</only>', format='xml')]


class odsafig(Directive):
  '''
  '''
  required_arguments = 0
  optional_arguments = 9
  final_argument_whitespace = True
  has_content = True
  option_spec = {
                'figwidth_value': directives.unchanged,
                'figclass': directives.unchanged,
                'align': directives.unchanged,
                'capalign': directives.unchanged,
                'figwidth': directives.unchanged,
                'alt': directives.unchanged,
                'scale': directives.unchanged,
                'width': directives.unchanged,
                'height': directives.unchanged
                }

  has_content = True

  def run(self):
    return [nodes.raw('', '<odsafig>null</odsafig>', format='xml')]


def print_err(*args, **kwargs):
  '''
  '''
  print(*args, file=sys.stderr, **kwargs)


def extract_mod_config(mod_json):
  '''
  '''
  # validate mod_json
  mod_config = {}
  mod_config['long_name'] = ""
  mod_config['sections'] = OrderedDict()
  one_sec_only = False
  one_sec_name = None

  for k, v in mod_json['document'].items():
    if k == '@title':
      mod_config['long_name'] = v.replace('\\','')

    # 'subtitle' is used when the rst file contains only one section
    if k == 'subtitle':
      one_sec_only = True
      one_sec_name = v['#text']
      mod_config['sections'][one_sec_name] = OrderedDict()

    # The rst file contains only one section and all exercises are defined
    # directly under this section
    if k == 'raw' and one_sec_only == True:
      mod_config['sections'][one_sec_name] = extract_exs_config(v)

    # The rst file contains only one section which has in one or more subsections
    if k == 'section' and one_sec_only == True:
      # mod_config['sections'][one_sec_name] = extract_exs_config(v)
      if isinstance(v, list):
        for sub_sec_v in v:
          if 'raw' in list(sub_sec_v.keys()):
            mod_config['sections'][one_sec_name].update(extract_exs_config(sub_sec_v['raw']))

          # Sometimes exercises are defined under a topic directive
          if 'topic' in list(sub_sec_v.keys()) and isinstance(sub_sec_v['topic'], list):
            for topic in sub_sec_v['topic']:
              if 'raw' in list(topic.keys()):
                mod_config['sections'][one_sec_name].update(extract_exs_config(topic['raw']))
          elif 'topic' in list(sub_sec_v.keys()) and isinstance(sub_sec_v['topic'], dict):
              if 'raw' in list(sub_sec_v['topic'].keys()):
                mod_config['sections'][one_sec_name].update(extract_exs_config(sub_sec_v['topic']['raw']))

      elif isinstance(v, dict):
        if 'raw' in list(v.keys()):
          mod_config['sections'][one_sec_name].update(extract_exs_config(v['raw']))

    if k == 'section' and one_sec_only == False:
      mod_config['sections'] = extract_sec_config(v)


  return mod_config


def extract_sec_config(sec_json):
  '''
  '''
  sections_config = OrderedDict()
  for x in sec_json:
    if not type(x) is OrderedDict:
      continue
    sec_title = None
    for k, v in x.items():
      if k == 'title':
        sec_title = v
        sections_config[sec_title] = OrderedDict()

      if k == 'raw':
        sections_config[sec_title].update(extract_exs_config(v))

      if k == 'section':
        if isinstance(v, list):
          for sub_sec_v in v:
            if 'raw' in list(sub_sec_v.keys()):
              sections_config[sec_title].update(extract_exs_config(sub_sec_v['raw']))
        elif isinstance(v, dict):
          if 'raw' in list(v.keys()):
            sections_config[sec_title].update(extract_exs_config(v['raw']))
    if 'extertool' in list(sections_config[sec_title].keys()):
      sections_config[sec_title] = sections_config[sec_title]['extertool']

  return sections_config


def extract_exs_config(exs_json):
  '''
  '''
  exs_config = OrderedDict()
  if isinstance(exs_json, list):
    for x in exs_json:
      if isinstance(x, dict) and 'avembed' in list(x.keys()):
        ex_obj = x['avembed']
        exer_name = ex_obj['@exer_name']
        exs_config[exer_name] = OrderedDict()
        exs_config[exer_name]['long_name'] = ex_obj['@long_name']
        exs_config[exer_name]['required'] = True if ex_obj['@required'] == "True" else False
        exs_config[exer_name]['points'] = float(ex_obj['@points'])
        threshold = float(ex_obj['@threshold'])
        exs_config[exer_name]['threshold'] = threshold if ex_obj['@type'] == 'pe' else int(threshold)

      if isinstance(x, dict) and 'extertool' in list(x.keys()):
        ex_obj = x['extertool']
        exs_config['extertool'] = OrderedDict()
        exs_config['extertool']['learning_tool'] = ex_obj['@learning_tool']
        exs_config['extertool']['resource_type'] = ex_obj['@resource_type']
        exs_config['extertool']['resource_name'] = ex_obj['@resource_name']
        exs_config['extertool']['points'] = float(ex_obj['@points'])

      if isinstance(x, dict) and 'inlineav' in list(x.keys()) and x['inlineav']['@type'] == "ss":
        ex_obj = x['inlineav']
        exer_name = ex_obj['@exer_name']
        exs_config[exer_name] = OrderedDict()
        exs_config[exer_name]['long_name'] = ex_obj['@long_name']
        exs_config[exer_name]['required'] = True if ex_obj['@required'] == "True" else False
        exs_config[exer_name]['points'] = float(ex_obj['@points'])
        exs_config[exer_name]['threshold'] = float(ex_obj['@threshold'])

      if isinstance(x, dict) and 'inlineav' in list(x.keys()) and x['inlineav']['@type'] == "ff":
        ex_obj = x['inlineav']
        exer_name = ex_obj['@exer_name']
        exs_config[exer_name] = OrderedDict()
        exs_config[exer_name]['long_name'] = ex_obj['@long_name']
        exs_config[exer_name]['required'] = True if ex_obj['@required'] == "True" else False
        exs_config[exer_name]['points'] = float(ex_obj['@points'])
        exs_config[exer_name]['threshold'] = float(ex_obj['@threshold'])

      if isinstance(x, dict) and 'inlineav' in list(x.keys()) and x['inlineav']['@type'] == "dgm":
        ex_obj = x['inlineav']
        exer_name = ex_obj['@exer_name']
        exs_config[exer_name] = OrderedDict()
  elif isinstance(exs_json, dict):
    if 'avembed' in list(exs_json.keys()):
      ex_obj = exs_json['avembed']
      exer_name = ex_obj['@exer_name']
      exs_config[exer_name] = OrderedDict()
      exs_config[exer_name]['long_name'] = ex_obj['@long_name']
      exs_config[exer_name]['required'] = True if ex_obj['@required'] == "True" else False
      exs_config[exer_name]['points'] = float(ex_obj['@points'])
      threshold = float(ex_obj['@threshold'])
      exs_config[exer_name]['threshold'] = threshold if ex_obj['@type'] == 'pe' else int(threshold)

    if 'extertool' in list(exs_json.keys()):
      ex_obj = exs_json['extertool']
      exs_config['extertool'] = OrderedDict()
      exs_config['extertool']['learning_tool'] = ex_obj['@learning_tool']
      exs_config['extertool']['resource_type'] = ex_obj['@resource_type']
      exs_config['extertool']['resource_name'] = ex_obj['@resource_name']
      exs_config['extertool']['points'] = float(ex_obj['@points'])

    if 'inlineav' in list(exs_json.keys()) and exs_json['inlineav']['@type'] == "ss":
      ex_obj = exs_json['inlineav']
      exer_name = ex_obj['@exer_name']
      exs_config[exer_name] = OrderedDict()
      exs_config[exer_name]['long_name'] = ex_obj['@long_name']
      exs_config[exer_name]['required'] = True if ex_obj['@required'] == "True" else False
      exs_config[exer_name]['points'] = float(ex_obj['@points'])
      exs_config[exer_name]['threshold'] = float(ex_obj['@threshold'])

    if 'inlineav' in list(exs_json.keys()) and exs_json['inlineav']['@type'] == "ff":
      ex_obj = exs_json['inlineav']
      exer_name = ex_obj['@exer_name']
      exs_config[exer_name] = OrderedDict()
      exs_config[exer_name]['long_name'] = ex_obj['@long_name']
      exs_config[exer_name]['required'] = True if ex_obj['@required'] == "True" else False
      exs_config[exer_name]['points'] = float(ex_obj['@points'])
      exs_config[exer_name]['threshold'] = float(ex_obj['@threshold'])

    if 'inlineav' in list(exs_json.keys()) and exs_json['inlineav']['@type'] == "dgm":
      ex_obj = exs_json['inlineav']
      exer_name = ex_obj['@exer_name']
      exs_config[exer_name] = OrderedDict()


  return exs_config


def register():
  '''
  '''
  directives.register_directive('avembed',avembed)
  directives.register_directive('avmetadata',avmetadata)
  directives.register_directive('extrtoolembed',extrtoolembed)
  directives.register_directive('inlineav',inlineav)
  directives.register_directive('odsalink',odsalink)
  directives.register_directive('odsascript',odsascript)
  directives.register_directive('index',index)
  directives.register_directive('codeinclude',codeinclude)
  directives.register_directive('todo',todo)
  directives.register_directive('only',only)
  directives.register_directive('glossary',glossary)
  directives.register_directive('odsafig',odsafig)


def absoluteFilePaths(directory, file_extension):
  '''
  '''
  files = []
  for dirpath,_,filenames in os.walk(directory):
    for f in filenames:
      if f.partition('.')[2] != file_extension:
        continue
      files.append(os.path.abspath(os.path.join(dirpath, f)))

  return files


def add_header(config):
  '''
  '''
  config['title'] = "OpenDSA entire modules"
  config['desc'] = "OpenDSA entire modules"
  config['build_dir'] = "Books"
  config['code_dir'] = "SourceCode/"
  config['code_lang'] = {
                        "Java": {"ext": ["java"], "label": "Java", "lang": "java"},
                        "Processing": {"ext": ["pde"],"label": "Processing", "lang": "java"},
                        "Java_Generic": {"ext": ["java"],"label": "Java (Generic)","lang": "java"},
                        "C++": {"ext": ["cpp","h"],"label": "C++","lang": "C++"}
                        }
  config['lang'] = "en"
  config['build_JSAV'] = False
  config['build_cmap'] = False
  config['suppress_todo'] = True
  config['dispModComp'] = False
  config['glob_exer_options'] = {"JXOP-debug": "true"}

  return config


def add_chapter(config, chapter_name):
  '''
  '''
  if chapter_name == "Preface":
    config['chapters']["Preface"] = {
            "Intro": {
                "long_name": "How to Use this System",
                "sections": {}
            },
            "Status": {
                "long_name": "OpenDSA Content Status",
                "sections": {}
            }
          }

  elif chapter_name == "Appendix":
    config["chapters"]["Appendix"] = {
        "Glossary": {
            "long_name": "Glossary",
            "sections": {}
        },
        "Bibliography": {
            "long_name": "Bibliography",
            "sections": {}
        }
      }

  return config


def sort_by_keys(dct,):
  '''
  Sort dict recursively by keys. Used during development to compare
  the generated file with the original file
  '''
  new_dct = OrderedDict({})
  for key, val in sorted(list(dct.items()), key=lambda key_val: key_val[0]):
      if isinstance(val, dict):
          new_dct[key] = sort_by_keys(val)
      else:
          new_dct[key] = val
  return new_dct


def remove_markup(source):
  '''
  remove unnecessary markups in the rst files
  '''
  source = source.replace(' --- ','')
  source = source.replace('|---|','')
  source = re.sub(r"\:[a-zA-Z]+\:", '',source, flags=re.MULTILINE)
  source = re.sub(r"\[.+\]\_", '',source, flags=re.MULTILINE)

  return source


def reorder_orig_config():
  '''
  '''
  orig_config_path = os.path.abspath('tools/json_xml/CS2.json')
  with open(orig_config_path) as data_file:
      orig_config_fname = json.load(data_file)

  orig_config_fname = sort_by_keys(orig_config_fname)

  with open(orig_config_path, 'w') as outfile:
    json.dump(orig_config_fname, outfile, indent=2)


def save_debug_files(xml_str, json_str, rst_fname):
  '''
  '''
  json_xml_path = os.path.abspath('tools/json_xml')

  xml_fname = json_xml_path+'/'+rst_fname+".xml"
  json_fname = json_xml_path+'/'+rst_fname+".json"

  with open(xml_fname, 'w') as outfile:
    outfile.write(xml_str.encode('utf8'))

  with open(json_fname, 'w') as outfile:
    json.dump(json_str, outfile, indent=2)


def save_generated_config(everything_config, simple_configs):
  '''
  '''
  print('\nGenerating configuration files ...\n')

  config_dir = os.path.abspath('config')
  if simple_configs != None:
    config_files = [config_dir+'/'+s+'_simple.json' for s in simple_configs]
  else:
    config_files = absoluteFilePaths(config_dir, "json")

  for config_path in config_files:
    config_fname = os.path.basename(config_path).partition('.')[0]
    if config_fname.endswith("_simple"):

      print('Processing %s configuration file' %config_fname)

      with open(config_path) as data_file:
        ref_config = json.load(data_file, object_pairs_hook=OrderedDict)

      if options.dev_mode:
        out_fname = os.path.abspath('tools/json_xml/' + config_fname + '.json')
      else:
        out_fname = os.path.abspath('config/' + config_fname.partition('_')[0] + '_generated.json')

      for ch_k, ch_obj in ref_config['chapters'].items():
        chapter_obj = OrderedDict()
        if isinstance(ch_obj, list):
          chapter_obj = collect_mods(everything_config, ch_obj)
        ref_config['chapters'][ch_k] = chapter_obj

      with open(out_fname, 'w') as outfile:
        json.dump(ref_config, outfile, indent=2)


def collect_mods(everything_config, mod_list):
  '''
  '''
  ch_config = OrderedDict()
  for mod in mod_list:
    for ch_k, ch_obj in everything_config['chapters'].items():
      if mod in list(ch_obj.keys()):
        ch_config[mod] = ch_obj[mod]

  return ch_config


if __name__ == '__main__':

  parser = ArgumentParser()
  configHelp = 'simple config JSON files'
  parser.add_argument("config", action="extend", nargs="*", type=str, help=configHelp)
  devHelp = "Causes rst2json.py to run in development mode"
  parser.add_argument("-d", "--dev", help=devHelp, dest="dev_mode", action="store_true", default=False)
  args = parser.parse_args()

  for config in args.config:
    simple_config_path = "config/" + config + "_simple.json"
    if not os.path.exists(simple_config_path):
      print_err("Error: Simple configuration file doesn't exist:", simple_config_path)
      sys.exit(1)

  register()

  rst_dir = os.path.abspath('RST/en/')
  execluded_files = ['Intro', 'Status', 'Bibliography', 'Glossary', 'ToDo']

  files = absoluteFilePaths(rst_dir, "rst")

  everything_config = OrderedDict()
  everything_config = add_header(everything_config)
  everything_config['chapters'] = OrderedDict()
  everything_config = add_chapter(everything_config, "Preface")

  current_dir = None

  for x in files:
    with open(x, 'r') as rstfile:
      source=rstfile.read()

    source = remove_markup(source)

    rst_fname = os.path.basename(x).partition('.')[0]
    if rst_fname in execluded_files:
      continue

    rst_dir_name = x.split(os.sep)[-2]

    if rst_dir_name not in list(folder_names.keys()):
      continue

    if not current_dir == rst_dir_name:
      current_dir = rst_dir_name
      print('Processing directory '+ rst_dir_name )

    rst_parts = publish_parts(source,
                settings_overrides={'output_encoding': 'utf8',
                'initial_header_level': 2},
                writer_name="xml")

    mod_json = xmltodict.parse(rst_parts['whole'])
    mod_config = extract_mod_config(mod_json)

    if folder_names[rst_dir_name] not in list(everything_config['chapters'].keys()):
      everything_config['chapters'][folder_names[rst_dir_name]] = OrderedDict()
    everything_config['chapters'][folder_names[rst_dir_name]][rst_dir_name+'/'+rst_fname] = mod_config

    if args.dev_mode:
      save_debug_files(rst_parts['whole'], mod_json, rst_fname)

  everything_config = add_chapter(everything_config, "Appendix")
  if args.dev_mode:
    everything_config = sort_by_keys(everything_config)

  save_generated_config(everything_config, simple_configs)

  if args.dev_mode:
    reorder_orig_config()
