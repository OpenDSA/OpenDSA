#! /usr/local/bin/python2
''' Converts a simplified configuration file to a full configuration file
''' 

import sys, os
import json
import xmltodict
import re

from docutils import nodes, utils
from docutils.parsers.rst import Directive
from docutils.parsers.rst import directives, states
from collections import OrderedDict
from docutils.core import publish_parts
from optparse import OptionParser
from ODSA_Config import read_conf_file, get_odsa_dir

mod_options = None    # custom options specified for modules
ex_options = None     # custom options specified for exercises/slideshows
sect_options = None   # custom options specified for sections
current_module = None # the path of the current module being processed

default_ex_options = {
    'ka': {
      'required': True,
      'points': 1,
      'threshold': 5
    }, 
    'ss': {
      'required': False,
      'points': 0,
      'threshold': 1
    }, 
    'ff': {
      'required': False,
      'points': 0,
      'threshold': 1
    }, 
    'pe': {
      'required': True,
      'points': 1,
      'threshold': 0.9
    },
    'dgm': {
      'required': False,
      'points': 0,
      'threshold': 1
    },
    'extr': {
      'points': 1.0
    }
}

EXERCISE_FIELDS = ['points', 'required', 'long_name', 'threshold', 'exer_options', 'showhide']
MODULE_FIELDS = ['dispModComp', 'mod_options', 'codeinclude']
REQUIRED_EXERCISE_FIELDS = ['points', 'required', 'threshold']

avembed_element = '''\
<avembed
    type="%(type)s"
    exer_name="%(exer_name)s"
    long_name="%(long_name)s"
    points="%(points)s"
    required="True"
    threshold="%(threshold)s">
</avembed>
'''

extertool_element = '''\
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
    output="%(output)s"
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
                  'long_name': directives.unchanged,
                  'url_params': directives.unchanged
                }
  has_content = True


  def run(self):
    """ Restructured text extension for inserting embedded AVs with show/hide button """
    av_path = self.arguments[0]
    self.options['type'] = self.arguments[1]
    self.options['exer_name'] = os.path.basename(av_path).partition('.')[0]

    self.options['required'] = default_ex_options[self.options['type']]['required']
    self.options['points'] = default_ex_options[self.options['type']]['points']
    self.options['threshold'] = default_ex_options[self.options['type']]['threshold']

    if self.options['exer_name'] in ex_options[current_module]:
      for key, value in ex_options[current_module][self.options['exer_name']].iteritems():
        self.options[key] = value
      #del ex_options[current_module][self.options['exer_name']]

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


odsalink_element = '''<odsalink>%(odsalink)s</odsalink>'''
odsascript_element = '''<odsascript>%(odsascript)s</odsascript>'''


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
      if self.options['learning_tool'] in default_ex_options['extr'] \
          and 'points' in default_ex_options['extr'][self.options['learning_tool']]:

        self.options['points'] = default_ex_options['extr'][self.options['learning_tool']]['points']
      else:
        self.options['points'] = default_ex_options['extr']['points']

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
                  'threshold': directives.unchanged,
                }
  has_content = True


  def run(self):
    """ Restructured text extension for including inline JSAV content on module pages """
    self.options['exer_name'] = self.arguments[0]
    self.options['type'] = self.arguments[1]

    self.options['required'] = default_ex_options[self.options['type']]['required']
    self.options['points'] = default_ex_options[self.options['type']]['points']
    self.options['threshold'] = default_ex_options[self.options['type']]['threshold']

    if self.options['exer_name'] in ex_options[current_module]:
        for key, value in ex_options[current_module][self.options['exer_name']].iteritems():
            self.options[key] = value
        #del ex_options[current_module][self.options['exer_name']]

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

class slide(Directive):
  '''
  '''
  required_arguments = 1
  optional_arguments = 0
  final_argument_whitespace = True
  has_content = True
  option_spec = {}

  def run(self):
    # """ Restructured text extension for including CSS and other libraries """
    # for line in self.content:
    #   matches = re.match('\.\. (inlineav|avembed)::\s+(\w+\/)*(\w+)\s+\w+', self.content[0])
    #   if matches is None or matches.group(3) is None:
    #     continue
    #   exer_name = matches.group(3)
    #   if exer_name in ex_options[current_module]:
    #       for key, value in ex_options[current_module][exer_name].iteritems():
    #           exs_config[exer_name][key] = value
    #       del ex_options[current_module][exer_name]
    return [nodes.raw('', '<slide>null</slide>', format='xml')]

class slideconf(Directive):
  '''
  '''
  required_arguments = 1
  optional_arguments = 0
  final_argument_whitespace = True
  option_spec = {}

  def run(self):
    # """ Restructured text extension for including CSS and other libraries """
    return [nodes.raw('', '<slideconf>null</slideconf>', format='xml')]

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

def print_err(err_msg):
  '''
  '''
  sys.stderr.write('%s\n' % err_msg)

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
          if 'raw' in sub_sec_v.keys():
            mod_config['sections'][one_sec_name].update(extract_exs_config(sub_sec_v['raw']))

          # Sometimes exercises are defined under a topic directive
          if 'topic' in sub_sec_v.keys() and isinstance(sub_sec_v['topic'], list):
            for topic in sub_sec_v['topic']:
              if 'raw' in topic.keys():
                mod_config['sections'][one_sec_name].update(extract_exs_config(topic['raw']))
          elif 'topic' in sub_sec_v.keys() and isinstance(sub_sec_v['topic'], dict):
              if 'raw' in sub_sec_v['topic'].keys():
                mod_config['sections'][one_sec_name].update(extract_exs_config(sub_sec_v['topic']['raw']))

      elif isinstance(v, dict):
        if 'raw' in v.keys():
          mod_config['sections'][one_sec_name].update(extract_exs_config(v['raw']))

    if k == 'section' and one_sec_only == False:
      mod_config['sections'] = extract_sec_config(v)

    if one_sec_only and one_sec_name in sect_options[current_module]:
      del sect_options[current_module][one_sec_name]

  return mod_config


def extract_sec_config(sec_json):
  '''
  '''
  sections_config = OrderedDict()
  for x in sec_json:
    if not type(x) is OrderedDict:
        continue
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
    if sec_title in sect_options[current_module]:
      for k, v in sect_options[current_module][sec_title].iteritems():
        sections_config[sec_title][k] = v
      del sect_options[current_module][sec_title]
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
        exs_config[exer_name]['long_name'] = ex_obj['@long_name']
        exs_config[exer_name]['required'] = default_ex_options[ex_obj['@type']]['required']
        exs_config[exer_name]['points'] = float(ex_obj['@points'])
        threshold = float(ex_obj['@threshold'])
        exs_config[exer_name]['threshold'] = threshold if ex_obj['@type'] == 'pe' else int(threshold)

        if exer_name in ex_options[current_module]:
          for key, value in ex_options[current_module][exer_name].iteritems():
              exs_config[exer_name][key] = value
          del ex_options[current_module][exer_name]

      if isinstance(x, dict) and 'extertool' in x.keys():
        ex_obj = x['extertool']
        exs_config['extertool'] = OrderedDict()
        exs_config['extertool']['learning_tool'] = ex_obj['@learning_tool']
        exs_config['extertool']['resource_type'] = ex_obj['@resource_type']
        exs_config['extertool']['resource_name'] = ex_obj['@resource_name']
        exs_config['extertool']['points'] = float(ex_obj['@points'])
        if ex_obj['@resource_name'] in ex_options[current_module]:
          for key, value in ex_options[current_module][ex_obj['@resource_name']].iteritems():
              exs_config['extertool'][key] = value
          del ex_options[current_module][ex_obj['@resource_name']]

      if isinstance(x, dict) and 'inlineav' in x.keys() and x['inlineav']['@type'] == "ss":
        ex_obj = x['inlineav']
        exer_name = ex_obj['@exer_name']
        exs_config[exer_name] = OrderedDict()
        exs_config[exer_name]['long_name'] = ex_obj['@long_name']
        exs_config[exer_name]['required'] = default_ex_options[ex_obj['@type']]['required']
        exs_config[exer_name]['points'] = float(ex_obj['@points'])
        exs_config[exer_name]['threshold'] = float(ex_obj['@threshold'])
        if exer_name in ex_options[current_module]:
          for key, value in ex_options[current_module][exer_name].iteritems():
              exs_config[exer_name][key] = value
          del ex_options[current_module][exer_name]

      if isinstance(x, dict) and 'inlineav' in x.keys() and x['inlineav']['@type'] == "ff":
        ex_obj = x['inlineav']
        exer_name = ex_obj['@exer_name']
        exs_config[exer_name] = OrderedDict()
        exs_config[exer_name]['long_name'] = ex_obj['@long_name']
        exs_config[exer_name]['required'] = default_ex_options[ex_obj['@type']]['required']
        exs_config[exer_name]['points'] = float(ex_obj['@points'])
        exs_config[exer_name]['threshold'] = float(ex_obj['@threshold'])
        if exer_name in ex_options[current_module]:
          for key, value in ex_options[current_module][exer_name].iteritems():
              exs_config[exer_name][key] = value
          del ex_options[current_module][exer_name]

      if isinstance(x, dict) and 'inlineav' in x.keys() and x['inlineav']['@type'] == "dgm":
        ex_obj = x['inlineav']
        exer_name = ex_obj['@exer_name']
        exs_config[exer_name] = OrderedDict()

  elif isinstance(exs_json, dict):
    if 'avembed' in exs_json.keys():
      ex_obj = exs_json['avembed']
      exer_name = ex_obj['@exer_name']
      exs_config[exer_name] = OrderedDict()
      exs_config[exer_name]['long_name'] = ex_obj['@long_name']
      exs_config[exer_name]['required'] = default_ex_options[ex_obj['@type']]['required']
      exs_config[exer_name]['points'] = float(ex_obj['@points'])
      threshold = float(ex_obj['@threshold'])
      exs_config[exer_name]['threshold'] = threshold if ex_obj['@type'] == 'pe' else int(threshold)
      if exer_name in ex_options[current_module]:
        for key, value in ex_options[current_module][exer_name].iteritems():
          exs_config[exer_name][key] = value
        del ex_options[current_module][exer_name]

    if 'extertool' in exs_json.keys():
      ex_obj = exs_json['extertool']
      exs_config['extertool'] = OrderedDict()
      exs_config['extertool']['learning_tool'] = ex_obj['@learning_tool']
      exs_config['extertool']['resource_type'] = ex_obj['@resource_type']
      exs_config['extertool']['resource_name'] = ex_obj['@resource_name']
      exs_config['extertool']['points'] = float(ex_obj['@points'])
      if ex_obj['@resource_name'] in ex_options[current_module]:
          for key, value in ex_options[current_module][ex_obj['@resource_name']].iteritems():
              exs_config['extertool'][key] = value
          del ex_options[current_module][ex_obj['@resource_name']]

    if 'inlineav' in exs_json.keys() and exs_json['inlineav']['@type'] == "ss":
      ex_obj = exs_json['inlineav']
      exer_name = ex_obj['@exer_name']
      exs_config[exer_name] = OrderedDict()
      exs_config[exer_name]['long_name'] = ex_obj['@long_name']
      exs_config[exer_name]['required'] = default_ex_options[ex_obj['@type']]['required']
      exs_config[exer_name]['points'] = float(ex_obj['@points'])
      exs_config[exer_name]['threshold'] = float(ex_obj['@threshold'])
      if exer_name in ex_options[current_module]:
          for key, value in ex_options[current_module][exer_name].iteritems():
              exs_config[exer_name][key] = value
          del ex_options[current_module][exer_name]

    if 'inlineav' in exs_json.keys() and exs_json['inlineav']['@type'] == "ff":
      ex_obj = exs_json['inlineav']
      exer_name = ex_obj['@exer_name']
      exs_config[exer_name] = OrderedDict()
      exs_config[exer_name]['long_name'] = ex_obj['@long_name']
      exs_config[exer_name]['required'] = default_ex_options[ex_obj['@type']]['required']
      exs_config[exer_name]['points'] = float(ex_obj['@points'])
      exs_config[exer_name]['threshold'] = float(ex_obj['@threshold'])
      if exer_name in ex_options[current_module]:
          for key, value in ex_options[current_module][exer_name].iteritems():
              exs_config[exer_name][key] = value
          del ex_options[current_module][exer_name]

    if 'inlineav' in exs_json.keys() and exs_json['inlineav']['@type'] == "dgm":
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
  directives.register_directive('slide', slide)
  directives.register_directive('slideconf', slideconf)


def remove_markup(source):
  '''
  remove unnecessary markups in the rst files
  '''
  source = source.replace(' --- ','')
  source = source.replace('|---|','')
  source = re.sub(r"\s+:links:.+\n", '\n', source, flags=re.MULTILINE)
  source = re.sub(r"\s+:scripts:.+\n", '\n', source, flags=re.MULTILINE)
  source = re.sub(r"\:(?!output)[a-zA-Z]+\:", '',source, flags=re.MULTILINE)
  source = re.sub(r"\[.+\]\_", '',source, flags=re.MULTILINE)

  return source

def get_chapter_module_files(conf_data):
  ''' get a dictionary where the keys are the chapter names and the values are 
      the paths to the rst files of the modules in the chapter
  '''
  files = OrderedDict()
  odsa_dir = get_odsa_dir()
  for chapter, modules in conf_data['chapters'].iteritems():
    files[chapter] = []
    for module in modules.keys():
      module = module.replace('/', os.sep)
      files[chapter].append(os.path.join(os.path.abspath('{0}RST{2}{1}{2}'.format(odsa_dir, conf_data['lang'], os.sep)), module + ".rst"))
  return files

def get_options(conf_data):
  ''' 
  gets a tuple where: 
    the first item is a dictionary where the keys are the 
      short names of exercises (or sections) and the values are the options that 
      were specified for each exercise
    the second item is a dictionary where the keys are the names of sections and
     the values are options for each section
    the third item is a dictionary where the keys are the names of modules
      and the values are options for each module
  '''
  exercises = {}
  sections = {}
  mod_opts = {}
  for chapter in conf_data['chapters'].values():
    for module, children in chapter.iteritems():
      mod_opts[module] = {}
      mod_ex = {}
      mod_sect = {}
      exercises[module] = mod_ex
      sections[module] = mod_sect
      if 'sections' in children:
        for section_name, exercise_objs in children['sections'].iteritems():
          mod_sect[section_name] = {}
          for key, value in exercise_objs.iteritems():
              if type(value) is OrderedDict and any(k in EXERCISE_FIELDS for k in value):
                if 'long_name' in value:
                  del value['long_name']
                mod_ex[key] = value
              elif 'learning_tool' in exercise_objs:
                mod_ex[section_name] = exercise_objs
              elif key != 'long_name':
                mod_sect[section_name][key] = value
          if len(mod_sect[section_name]) == 0:
            del mod_sect[section_name]
        del children['sections']

      if 'long_name' in children:
        del children['long_name']
      for key, value in children.iteritems():
        if key in MODULE_FIELDS:  
          mod_opts[module][key] = value
        elif any(k in EXERCISE_FIELDS for k in value):
          mod_ex[key] = value
        else:
          mod_sect[key] = value
      if len(mod_opts[module]) == 0:
        del mod_opts[module]
  
  return (exercises, sections, mod_opts)

def validate_glob_config(conf_data):
  global ex_options, default_ex_options, sect_options, mod_options

  for ex_type in ['ka', 'ff', 'ss', 'pe']:
      field = 'glob_{0}_options'.format(ex_type)
      if field not in conf_data:
        print_err('WARNING: Missing "{0}", using default values instead.'.format(field))
        conf_data[field] = default_ex_options[ex_type]
      else:
        for field_name in REQUIRED_EXERCISE_FIELDS:
          if field_name not in conf_data[field]:
            print_err('WARNING: "{0}" is missing field "{1}". Using default value.'.format(field, field_name))
            conf_data[field][field_name] = default_ex_options[ex_type][field_name]

  if 'glob_extr_options' not in conf_data:
    print_err('WARNING: Missing "glob_extr_options", using default values instead.')
    conf_data['glob_extr_options'] = default_ex_options['extr']
  else:
    if 'points' not in conf_data['glob_extr_options']:
      print_err('WARNING: "glob_extr_options" is missing field "points". Using default value.')
      conf_data['glob_extr_options']['points'] = 1.0

  ex_options, sect_options, mod_options = get_options(conf_data)
  default_ex_options = {
      'ka': conf_data['glob_ka_options'], 
      'ss': conf_data['glob_ss_options'], 
      'ff': conf_data['glob_ff_options'], 
      'pe': conf_data['glob_pe_options'],
      'extr': conf_data['glob_extr_options'],
      'dgm': {
        'required': False,
        'points': 0,
        'threshold': 1
      }
  }

def generate_full_config(config_file_path, slides):
  ''' Generates a full configuration from a simplified configuration
  '''
  global current_module
  register()

  conf_data = read_conf_file(config_file_path)
  validate_glob_config(conf_data)

  full_config = OrderedDict()
  full_config = conf_data.copy()
  full_config['chapters'] = OrderedDict()
  del full_config['glob_ka_options']
  del full_config['glob_ss_options']
  del full_config['glob_ff_options']
  del full_config['glob_pe_options']
  del full_config['glob_extr_options']

  mod_files = get_chapter_module_files(conf_data)
  for chapter, files in mod_files.iteritems():
    full_config['chapters'][chapter] = OrderedDict()
    for x in files:
      rst_dir_name = x.split(os.sep)[-2]
      rst_fname = os.path.basename(x).partition('.')[0]
      if rst_dir_name == conf_data['lang']:
        mod_path = rst_fname
      else:
        mod_path = rst_dir_name + '/' + rst_fname
      
      current_module = mod_path

      if not os.path.isfile(x):
        print_err("ERROR: '{0}' is not a valid module path".format(mod_path))
        sys.exit(1)

      with open(x, 'r') as rstfile:
        source = rstfile.read()

      source = remove_markup(source)

      rst_parts = publish_parts(source,
                  settings_overrides={'output_encoding': 'utf8',
                  'initial_header_level': 2},
                  writer_name="xml",
      source_path=mod_path)

      mod_json = xmltodict.parse(rst_parts['whole'])
      mod_config = extract_mod_config(mod_json)

      full_config['chapters'][chapter][mod_path] = mod_config

  if not slides:
    for mod_name, exercises in ex_options.iteritems():
      for exer in exercises:
        print_err('WARNING: the exercise "{0}" does not exist in module "{1}"'.format(exer, mod_name))
    for mod_name, sections in sect_options.iteritems():
      for sect in sections:
        print_err('WARNING: the section "{0}" does not exist in module "{1}"'.format(sect, mod_name))
  return full_config

if __name__ == '__main__':
  args = sys.argv
  if len(args) != 3:
      print('Usage: {0} config_file output_file', args[0])
      sys.exit(1)

  config_file = args[1]
  output_file = args[2]
  full_conf = generate_full_config(config_file, False)

  with open(output_file, 'w') as outfile:
    json.dump(full_conf, outfile, indent=2)