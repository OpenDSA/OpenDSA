# Copyright (C) 2012 Eric Fouh
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

__author__ = 'hshahin'

import sys, os
from docutils import nodes, utils
from docutils.parsers.rst import Directive
from docutils.parsers.rst import directives, states
import json
import xmltodict
from collections import OrderedDict

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
    resource_name="%(resource_name)s"
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
  has_content = False

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
                   'satisfies': directives.unchanged
                   }

    def run(self):
        """ Restructured text extension for collecting  AVs metadata nothing is written in the output html file """
        return [nodes.raw('', '<avmetadata>null</avmetadata>', format='xml')]


class extrtoolembed(Directive):
  required_arguments = 0
  optional_arguments = 3
  final_argument_whitespace = True
  has_content = True
  option_spec = {
                 'resource_name': directives.unchanged,
                 'resource_type': directives.unchanged,
                 'learning_tool': directives.unchanged,
                 'points': directives.unchanged
                 }

  def run(self):
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

class odsafig(Directive):
    '''
    '''
    # option_spec = Image.option_spec.copy()
    option_spec = {
                  'figwidth_value': directives.unchanged,
                  'figclass': directives.unchanged,
                  'align': directives.unchanged,
                  'capalign': directives.unchanged,
                  'figwidth': directives.unchanged,
                  'alt': directives.unchanged,
                  'width': directives.unchanged
                  }

    has_content = True

    def run(self):
      # """ Restructured text extension for including CSS and other libraries """
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

    if k == 'raw' and one_sec_only = True:
      mod_config['sections'][one_sec_name] = extract_exs_config(v)

    if k == 'section' and one_sec_only = False:
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

      if k == 'raw':
        sections_config[sec_title] = OrderedDict()
        sections_config[sec_title] = extract_exs_config(v)

  return sections_config

def extract_exs_config(exs_json):
  '''
  '''
  exs_config = OrderedDict()
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

    if isinstance(x, dict) and 'inlineav' in x.keys() and x['inlineav']['@type'] == "ss":
      ex_obj = x['inlineav']
      exer_name = ex_obj['@exer_name']
      exs_config[exer_name] = OrderedDict()
      exs_config[exer_name]['long_name'] = ex_obj['@long_name']
      exs_config[exer_name]['required'] = True if ex_obj['@required'] == "True" else False
      exs_config[exer_name]['points'] = float(ex_obj['@points'])
      exs_config[exer_name]['threshold'] = float(ex_obj['@threshold'])

    if isinstance(x, dict) and 'inlineav' in x.keys() and x['inlineav']['@type'] == "dgm":
      ex_obj = x['inlineav']
      exer_name = ex_obj['@exer_name']
      exs_config[exer_name] = OrderedDict()

  return exs_config

def absoluteFilePaths(directory):
  '''
  '''
  files = []
  for dirpath,_,filenames in os.walk(directory):
    for f in filenames:
      files.append(os.path.abspath(os.path.join(dirpath, f)))
  return files

if __name__ == '__main__':
  from docutils.core import publish_parts

  directives.register_directive('avembed',avembed)
  directives.register_directive('avmetadata',avmetadata)
  directives.register_directive('extrtoolembed',extrtoolembed)
  directives.register_directive('inlineav',inlineav)
  directives.register_directive('odsalink',odsalink)
  directives.register_directive('odsascript',odsascript)
  directives.register_directive('index',index)
  directives.register_directive('codeinclude',codeinclude)
  directives.register_directive('todo',todo)
  directives.register_directive('odsafig',odsafig)

  rst_fname = "/home/hshahin/workspaces/OpenDSA-DevStack/OpenDSA/RST/en/Sorting/Quicksort.rst"
  rst_dir = "/home/hshahin/workspaces/OpenDSA-DevStack/OpenDSA/RST/en/Sorting"

  files = absoluteFilePaths(rst_dir)
  # print(files)

  everything_config = OrderedDict()
  everything_config['chapters'] = OrderedDict()
  everything_config['chapters']['Sorting'] = OrderedDict()

  for x in files:
    with open(x, 'r') as rstfile:
      source=rstfile.read()

    doc_parts = publish_parts(source,
                settings_overrides={'output_encoding': 'utf8',
                'initial_header_level': 2},
                writer_name="xml")

    mod_json = xmltodict.parse(doc_parts['whole'])
    mod_config = extract_mod_config(mod_json)

    rst_fname = os.path.basename(x).partition('.')[0]
    rst_dir_name = x.split('/')[-2]

    # print(rst_fname)
    # print(rst_dir_name)

    everything_config['chapters']['Sorting'][rst_dir_name+'/'+rst_fname] = mod_config

    basename = "/home/hshahin/workspaces/OpenDSA-DevStack/OpenDSA/tools/json_xml/"
    json_fname = basename+rst_fname+".json"
    with open(json_fname, 'w') as outfile:
      json.dump(mod_json, outfile)
    xml_fname = basename+rst_fname+".xml"
    with open(xml_fname, 'w') as outfile:
      outfile.write(doc_parts['whole'])

  print(json.dumps(everything_config))
