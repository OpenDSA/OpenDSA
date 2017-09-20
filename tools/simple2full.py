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
from ODSA_Config import read_conf_file

ex_options = None
default_ex_options = None

excluded_files = ['Intro', 'Status', 'Bibliography', 'Glossary', 'ToDo']

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

    self.options['required'] = default_ex_options[self.options['type']]['required']
    self.options['points'] = default_ex_options[self.options['type']]['points']
    self.options['threshold'] = default_ex_options[self.options['type']]['threshold']

    if self.options['exer_name'] in ex_options:
        for key, value in ex_options[self.options['exer_name']].iteritems():
            self.options[key] = value

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

    self.options['required'] = default_ex_options[self.options['type']]['required']
    self.options['points'] = default_ex_options[self.options['type']]['points']
    self.options['threshold'] = default_ex_options[self.options['type']]['threshold']

    if self.options['exer_name'] in ex_options:
        for key, value in ex_options[self.options['exer_name']].iteritems():
            self.options[key] = value

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
    if sec_title in ex_options:
      for k, v in ex_options[sec_title].iteritems():
        sections_config[sec_title][k] = v
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
        exs_config[exer_name]['required'] = True if ex_obj['@required'] == "True" else False
        exs_config[exer_name]['points'] = float(ex_obj['@points'])
        threshold = float(ex_obj['@threshold'])
        exs_config[exer_name]['threshold'] = threshold if ex_obj['@type'] == 'pe' else int(threshold)

        if exer_name in ex_options:
          for key, value in ex_options[exer_name].iteritems():
              exs_config[exer_name][key] = value

      if isinstance(x, dict) and 'extertool' in x.keys():
        ex_obj = x['extertool']
        exs_config['extertool'] = OrderedDict()
        exs_config['extertool']['learning_tool'] = ex_obj['@learning_tool']
        exs_config['extertool']['resource_type'] = ex_obj['@resource_type']
        exs_config['extertool']['resource_name'] = ex_obj['@resource_name']
        exs_config['extertool']['points'] = float(ex_obj['@points'])

      if isinstance(x, dict) and 'inlineav' in x.keys() and x['inlineav']['@type'] == "ss":
        ex_obj = x['inlineav']
        exer_name = ex_obj['@exer_name']
        exs_config[exer_name] = OrderedDict()
        exs_config[exer_name]['long_name'] = ex_obj['@long_name']
        exs_config[exer_name]['required'] = True if ex_obj['@required'] == "True" else False
        exs_config[exer_name]['points'] = float(ex_obj['@points'])
        exs_config[exer_name]['threshold'] = float(ex_obj['@threshold'])
        if exer_name in ex_options:
          for key, value in ex_options[exer_name].iteritems():
              exs_config[exer_name][key] = value

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
      exs_config[exer_name]['required'] = True if ex_obj['@required'] == "True" else False
      exs_config[exer_name]['points'] = float(ex_obj['@points'])
      threshold = float(ex_obj['@threshold'])
      exs_config[exer_name]['threshold'] = threshold if ex_obj['@type'] == 'pe' else int(threshold)
      if exer_name in ex_options:
          for key, value in ex_options[exer_name].iteritems():
              exs_config[exer_name][key] = value

    if 'extertool' in exs_json.keys():
      ex_obj = exs_json['extertool']
      exs_config['extertool'] = OrderedDict()
      exs_config['extertool']['learning_tool'] = ex_obj['@learning_tool']
      exs_config['extertool']['resource_type'] = ex_obj['@resource_type']
      exs_config['extertool']['resource_name'] = ex_obj['@resource_name']
      exs_config['extertool']['points'] = float(ex_obj['@points'])

    if 'inlineav' in exs_json.keys() and exs_json['inlineav']['@type'] == "ss":
      ex_obj = exs_json['inlineav']
      exer_name = ex_obj['@exer_name']
      exs_config[exer_name] = OrderedDict()
      exs_config[exer_name]['long_name'] = ex_obj['@long_name']
      exs_config[exer_name]['required'] = True if ex_obj['@required'] == "True" else False
      exs_config[exer_name]['points'] = float(ex_obj['@points'])
      exs_config[exer_name]['threshold'] = float(ex_obj['@threshold'])
      if exer_name in ex_options:
          for key, value in ex_options[exer_name].iteritems():
              exs_config[exer_name][key] = value

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

def remove_markup(source):
  '''
  remove unnecessary markups in the rst files
  '''
  source = source.replace(' --- ','')
  source = source.replace('|---|','')
  source = re.sub(r"\:[a-zA-Z]+\:", '',source, flags=re.MULTILINE)
  source = re.sub(r"\[.+\]\_", '',source, flags=re.MULTILINE)

  return source

def get_module_file_list(conf_data):
  ''' get a list of rst files for the modules in the config data '''
  files = OrderedDict()
  for chapter, modules in conf_data['chapters'].iteritems():
    files[chapter] = []
    for module in modules.keys():
      files[chapter].append(os.path.join(os.path.abspath('RST/{0}/'.format(conf_data['lang'])), module + ".rst"))
  return files

def get_exercises(conf_data):
  ''' gets exercises that have options specified in the config file '''
  exercises = {}
  for chapter in conf_data['chapters'].values():
    for module, children in chapter.iteritems():
      for ex_name, options in children.iteritems():
        exercises[ex_name] = options
  return exercises

def generate_full_config(config_file_path):
  global ex_options
  global default_ex_options
  register()

  conf_data = read_conf_file(config_file_path)
  ex_options = get_exercises(conf_data)
  default_ex_options = {
      "ka": conf_data["glob_ka_options"], 
      "ss": conf_data["glob_ss_options"], 
      "pe": conf_data["glob_pe_options"],
      "dgm": {
        "required": False,
        "points": 0,
        "threshold": 1
      }
  }

  everything_config = OrderedDict()
  everything_config = conf_data.copy()
  everything_config['chapters'] = OrderedDict()
  del everything_config['glob_ka_options']
  del everything_config['glob_ss_options']
  del everything_config['glob_pe_options']
  everything_config = add_chapter(everything_config, "Preface")

  mod_files = get_module_file_list(conf_data)
  for chapter, files in mod_files.iteritems():
    everything_config['chapters'][chapter] = OrderedDict()
    for x in files:
      rst_dir_name = x.split(os.sep)[-2]
      rst_fname = os.path.basename(x).partition('.')[0]
      if rst_dir_name == conf_data['lang']:
        mod_path = rst_fname
      else:
        mod_path = rst_dir_name + '/' + rst_fname

      if not os.path.isfile(x):
        print_err("ERROR: '{0}' is not a valid module path" % mod_path)
        sys.exit(1)

      with open(x, 'r') as rstfile:
        source = rstfile.read()

      source = remove_markup(source)

      rst_parts = publish_parts(source,
                  settings_overrides={'output_encoding': 'utf8',
                  'initial_header_level': 2},
                  writer_name="xml")

      mod_json = xmltodict.parse(rst_parts['whole'])
      mod_config = extract_mod_config(mod_json)

      everything_config['chapters'][chapter][mod_path] = mod_config

  everything_config = add_chapter(everything_config, "Appendix")

  return everything_config
