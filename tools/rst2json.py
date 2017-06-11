# Copyright (C) 2017 Hossameldin Shahin
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
#

__author__ = 'Hossameldin Shahin'

import sys, os
import json
import xmltodict
from docutils import nodes, utils
from docutils.parsers.rst import Directive
from docutils.parsers.rst import directives, states
from collections import OrderedDict
from docutils.core import publish_parts


avembed_element= '''\
<avembed
    type="%(type)s"
    exer_name="%(exer_name)s"
    long_name="%(exer_name)s"
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
    long_name="%(exer_name)s"
    points="%(points)s"
    required="True"
    threshold="%(threshold)s">
</inlineav>
'''

odsalink_element = '''<odsalink>%(odsalink)s</odsalink>'''

odsascript_element = '''<odsascript>%(odsascript)s</odsascript>'''


# Prints the given string to standard error
def print_err(err_msg):
  sys.stderr.write('%s\n' % err_msg)


class avembed(Directive):
  required_arguments = 2
  optional_arguments = 0
  final_argument_whitespace = True
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

    res = avembed_element % (self.options)

    return [nodes.raw('', res, format='xml')]


class avmetadata(Directive):
    required_arguments = 0
    optional_arguments = 3
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
      self.options['points'] = 1

    res = extertool_element % (self.options)
    return [nodes.raw('', res, format='xml')]


class inlineav(Directive):
  required_arguments = 2
  optional_arguments = 7
  final_argument_whitespace = True
  option_spec = {
                  'output': directives.unchanged,
                  'long_name': directives.unchanged,
                  'points': directives.unchanged,
                  'required': directives.unchanged,
                  'threshold': directives.unchanged,
                  'align': directives.unchanged
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

    res = inlineav_element % (self.options)
    return [nodes.raw('', res, format='xml')]

class odsalink(Directive):
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
    required_arguments = 1
    optional_arguments = 0
    final_argument_whitespace = True
    option_spec = {}

    def run(self):
      # """ Restructured text extension for including CSS and other libraries """
      return [nodes.raw('', '<index>null</index>', format='xml')]

class codeinclude(Directive):
    required_arguments = 1
    optional_arguments = 0
    final_argument_whitespace = True
    option_spec = {}

    def run(self):
      # """ Restructured text extension for including CSS and other libraries """
      return [nodes.raw('', '<codeinclude>null</codeinclude>', format='xml')]

class todo(Directive):
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
    optional_arguments = 1
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

def extract_mod_config(mod_json):
  '''
  '''
  # validate mod_json
  mod_config = {}
  mod_config['long_name'] = ""
  mod_config['sections'] = OrderedDict()
  one_sec_only = False
  one_sec_name = None

  for k, v in mod_json['document'].iteritems():
    if k == 'title':
      mod_config['long_name'] = v

    if k == 'subtitle':
      one_sec_only = True
      one_sec_name = v['#text']
      mod_config['sections'][one_sec_name] = OrderedDict()

    if k == 'raw' and one_sec_only == True:
      mod_config['sections'][one_sec_name] = extract_exs_config(v)

    if k == 'section' and one_sec_only == False:
      mod_config['sections'] = extract_sec_config(v)

  return mod_config

def extract_sec_config(sec_json):
  '''
  '''
  sections_config = OrderedDict()
  for x in sec_json:
    sec_title = None
    for k, v in x.iteritems():
      if k == 'title':
        sec_title = v
        sections_config[sec_title] = OrderedDict()

      if k == 'raw':
        sections_config[sec_title].update(extract_exs_config(v))

      if k == 'section':
        if isinstance(v, list):
          for sub_sec_v in v:
            if 'raw' in sub_sec_v.keys():
              sections_config[sec_title].update(extract_exs_config(sub_sec_v['raw']))
        elif isinstance(v, dict):
          if 'raw' in v.keys():
            sections_config[sec_title].update(extract_exs_config(v['raw']))
    if 'extertool' in sections_config[sec_title].keys():
      sections_config[sec_title] = sections_config[sec_title]['extertool']

  return sections_config

def extract_exs_config(exs_json):
  '''
  '''
  exs_config = OrderedDict()
  if isinstance(exs_json, list):
    for x in exs_json:
      if isinstance(x, dict) and 'avembed' in x.keys():
        ex_obj = x['avembed']
        exer_name = ex_obj['@exer_name']
        exs_config[exer_name] = OrderedDict()
        threshold = float(ex_obj['@threshold'])
        exs_config[exer_name]['threshold'] = threshold if ex_obj['@type'] == 'pe' else int(threshold)
        exs_config[exer_name]['long_name'] = ex_obj['@long_name']
        exs_config[exer_name]['required'] = True if ex_obj['@required'] == "True" else False
        exs_config[exer_name]['points'] = float(ex_obj['@points'])

      if isinstance(x, dict) and 'extertool' in x.keys():
        ex_obj = x['extertool']
        exs_config['extertool'] = OrderedDict()
        exs_config['extertool']['learning_tool'] = ex_obj['@learning_tool']
        exs_config['extertool']['points'] = float(ex_obj['@points'])
        exs_config['extertool']['resource_name'] = ex_obj['@resource_name']
        exs_config['extertool']['resource_type'] = ex_obj['@resource_type']

      if isinstance(x, dict) and 'inlineav' in x.keys() and x['inlineav']['@type'] == "ss":
        ex_obj = x['inlineav']
        exer_name = ex_obj['@exer_name']
        exs_config[exer_name] = OrderedDict()
        exs_config[exer_name]['threshold'] = float(ex_obj['@threshold'])
        exs_config[exer_name]['long_name'] = ex_obj['@long_name']
        exs_config[exer_name]['required'] = True if ex_obj['@required'] == "True" else False
        exs_config[exer_name]['points'] = float(ex_obj['@points'])

      if isinstance(x, dict) and 'inlineav' in x.keys() and x['inlineav']['@type'] == "dgm":
        ex_obj = x['inlineav']
        exer_name = ex_obj['@exer_name']
        exs_config[exer_name] = OrderedDict()
  elif isinstance(exs_json, dict):
    if 'avembed' in exs_json.keys():
      ex_obj = exs_json['avembed']
      exer_name = ex_obj['@exer_name']
      exs_config[exer_name] = OrderedDict()
      threshold = float(ex_obj['@threshold'])
      exs_config[exer_name]['threshold'] = threshold if ex_obj['@type'] == 'pe' else int(threshold)
      exs_config[exer_name]['long_name'] = ex_obj['@long_name']
      exs_config[exer_name]['required'] = True if ex_obj['@required'] == "True" else False
      exs_config[exer_name]['points'] = float(ex_obj['@points'])

    if 'extertool' in exs_json.keys():
      ex_obj = exs_json['extertool']
      exs_config['extertool'] = OrderedDict()
      exs_config['extertool']['learning_tool'] = ex_obj['@learning_tool']
      exs_config['extertool']['points'] = float(ex_obj['@points'])
      exs_config['extertool']['resource_name'] = ex_obj['@resource_name']
      exs_config['extertool']['resource_type'] = ex_obj['@resource_type']

    if 'inlineav' in exs_json.keys() and exs_json['inlineav']['@type'] == "ss":
      ex_obj = exs_json['inlineav']
      exer_name = ex_obj['@exer_name']
      exs_config[exer_name] = OrderedDict()
      exs_config[exer_name]['threshold'] = float(ex_obj['@threshold'])
      exs_config[exer_name]['long_name'] = ex_obj['@long_name']
      exs_config[exer_name]['required'] = True if ex_obj['@required'] == "True" else False
      exs_config[exer_name]['points'] = float(ex_obj['@points'])

    if 'inlineav' in exs_json.keys() and exs_json['inlineav']['@type'] == "dgm":
      ex_obj = exs_json['inlineav']
      exer_name = ex_obj['@exer_name']
      exs_config[exer_name] = OrderedDict()


  return exs_config

def register():
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

def absoluteFilePaths(directory):
  '''
  '''
  files = []
  for dirpath,_,filenames in os.walk(directory):
    for f in filenames:
      if f.partition('.')[2] != 'rst':
        continue
      files.append(os.path.abspath(os.path.join(dirpath, f)))

  return files

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
  '''
  new_dct = OrderedDict({})
  for key, val in sorted(dct.items(), key=lambda (key, val): key):
      if isinstance(val, dict):
          new_dct[key] = sort_by_keys(val)
      else:
          new_dct[key] = val
  return new_dct


if __name__ == '__main__':

  register()

  chapters_names = {
      "Background": "Introduction and Mathematical Background",
      "Biography": "Biographies",
      "Tutorials": "Programming Tutorials",
      "Design": "Design I and II",
      "Pointers": "Pointers",
      "Searching": "Searching I and II",
      "AlgAnal": "Algorithm Analysis",
      "List": "Linear Structures",
      "RecurTutor": "Recursion",
      "Binary": "Binary Trees",
      "BTRecurTutor": "Binary Trees Recursion",
      "Sorting": "Sorting",
      "Files": "File Processing",
      "Hashing": "Hashing",
      "MemManage": "Memory Management",
      "Indexing": "Indexing",
      "General": "General Trees",
      "Graph": "Graphs",
      "PL": "Programming Languages",
      "Spatial": "Spatial Data Structures",
      "SeniorAlgAnal": "Advanced Analysis",
      "Development": "Under Development",
      "SearchStruct": "Search Structures",
      "Bounds": "Lower Bounds",
      "NP": "Limits to Computing"
      }
  # rst_chapter = 'Hashing'


  # rst_dir = "/home/hshahin/workspaces/OpenDSA-DevStack/OpenDSA/RST/en/"
  rst_dir = os.path.abspath('../RST/en/')
  # json_xml_path = "/home/hshahin/workspaces/OpenDSA-DevStack/OpenDSA/tools/json_xml/"
  json_xml_path = os.path.abspath('json_xml/')
  execluded_files = ['Intro', 'Status', 'Bibliography', 'Glossary', 'ToDo']
  files = absoluteFilePaths(rst_dir)

  everything_config = OrderedDict()
  everything_config['chapters'] = OrderedDict()

  everything_config = add_chapter(everything_config, "Preface")

  for x in files:
    with open(x, 'r') as rstfile:
      source=rstfile.read()

    source = source.replace(':numref:', '').replace(':term:', '').replace(':dfn:', '')
    source = source.replace(':chap:', '').replace(':ref:', '').replace(':num:', '')
    source = source.replace(':abbr:','').replace(':eq:', '')
    source = source.replace('[KnuthV3]_','').replace(':index:','').replace('|---|','')
    source = source.replace(' --- ','').replace('[Tarjan75]_','').replace('[GalilItaliano91]_','')
    source = source.replace('[Booch]_','').replace('[Bloch]_','').replace('[Bacon]_', '')
    source = source.replace('[Gauss65]_','')

    rst_fname = os.path.basename(x).partition('.')[0]
    if rst_fname in execluded_files:
      continue

    rst_dir_name = x.split('/')[-2]
    if rst_dir_name not in chapters_names.keys():
      continue

    print('Processing '+rst_dir_name+'/'+rst_fname+'.rst')

    rst_parts = publish_parts(source,
                settings_overrides={'output_encoding': 'utf8',
                'initial_header_level': 2},
                writer_name="xml")

    mod_json = xmltodict.parse(rst_parts['whole'])
    mod_config = extract_mod_config(mod_json)

    # print(rst_dir_name)
    # print(rst_fname)
    everything_config['chapters'][chapters_names[rst_dir_name]] = OrderedDict()
    everything_config['chapters'][chapters_names[rst_dir_name]][rst_dir_name+'/'+rst_fname] = mod_config

    xml_fname = json_xml_path+rst_fname+".xml"

    # if rst_fname == 'StringSearchBoyerMoore':
    #   print(rst_parts['whole'])

    with open(xml_fname, 'w') as outfile:
      outfile.write(rst_parts['whole'].encode('utf8'))

    json_fname = json_xml_path+rst_fname+".json"
    with open(json_fname, 'w') as outfile:
      json.dump(mod_json, outfile)


  everything_config = add_chapter(everything_config, "Appendix")
  everything_config = sort_by_keys(everything_config)

  # out_fname = "/home/hshahin/workspaces/OpenDSA-DevStack/OpenDSA/tools/json_xml/quicksort_json_gen.json"
  out_fname = os.path.abspath('json_xml/quicksort_json_gen.json')
  with open(out_fname, 'w') as outfile:
    json.dump(everything_config, outfile)

  # orig_config_path = "/home/hshahin/workspaces/OpenDSA-DevStack/OpenDSA/tools/json_xml/Everything.json"
  orig_config_path = os.path.abspath('json_xml/Everything.json')
  with open(orig_config_path) as data_file:
      orig_config_fname = json.load(data_file)

  orig_config_fname = sort_by_keys(orig_config_fname)

  with open(orig_config_path, 'w') as outfile:
    json.dump(orig_config_fname, outfile)


