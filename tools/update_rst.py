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
import fileinput, re
from docutils import nodes, utils
from docutils.parsers.rst import Directive
from docutils.parsers.rst import directives, states
from collections import OrderedDict
from docutils.core import publish_parts
from optparse import OptionParser

folder_names = {
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
        exer_name = ex_obj['@lexer_name']
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
  for key, val in sorted(dct.items(), key=lambda (key, val): key):
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
    json.dump(orig_config_fname, outfile)


def save_debug_files(xml_str, json_str, rst_fname):
  '''
  '''
  json_xml_path = os.path.abspath('tools/json_xml')

  xml_fname = json_xml_path+'/'+rst_fname+".xml"
  json_fname = json_xml_path+'/'+rst_fname+".json"

  with open(xml_fname, 'w') as outfile:
    outfile.write(xml_str.encode('utf8'))

  with open(json_fname, 'w') as outfile:
    json.dump(json_str, outfile)

def load_config(config_fname):
  '''
  '''
  config_path = os.path.abspath('config/' + config_fname)
  with open(config_path) as data_file:
    config_json = json.load(data_file, object_pairs_hook=OrderedDict)

  return config_json

def  modify_rst_file(file_name, ex_id, value=""):
  '''
  '''
  fh = fileinput.input(file_name, inplace=True)
  for line in fh:
      replacement = line + '\n '+ ':long_name: ' + value

      if ".. inlineav::" in line and ex_id in line:
        line = replacement
      # pattern = r"\.\. inlineav\:\: .*" + re.escape(ex_id)

      # line = re.sub(pattern, replacement, line)

      sys.stdout.write(line)
  fh.close()


# dev_line_searchterm = "^.+"+devname+".+$"
# dev_line_to_replace = str(os.path.join(start_dir, "Downloads", devname, filename))
# find_dev_line = re.compile(dev_line_searchterm, re.MULTILINE)
# string1= re.sub(find_dev_line, dev_line_to_replace, string1)

if __name__ == '__main__':

  # load everything.json
  everything_json = load_config('Everything.json')
  rst_path = os.path.abspath("RST/en")

  # loop and update

  for k, v in everything_json['chapters'].iteritems():
    for mod_k, mod_obj in v.iteritems():
      if '/' in mod_k:
        mod_dir, mod_fname = re.split('/', mod_k)[0], re.split('/', mod_k)[1]
        rst_fname = rst_path + '/' + mod_dir + '/' + mod_fname + '.rst'

        # print(rst_fname)
        if not os.path.exists(rst_fname):
            print_err("WARNING: File %s doesn't exist\n" % rst_fname)
            continue

        with open(rst_fname, 'r') as rstfile:
          rst_source = rstfile.read()

        for sec_id, sec_obj in mod_obj['sections'].iteritems():
          for ex_id, ex_obj in sec_obj.iteritems():
            if isinstance(ex_obj, dict) and 'long_name' in ex_obj.keys():
              # print ex_obj['long_name']
              # print rst_fname
              modify_rst_file(rst_fname, ex_id, value = ex_obj['long_name'])






        # with open(out_fname, 'w') as outfile:
        #   json.dump(everything_config, outfile)





  # parser = OptionParser()
  # parser.add_option("-d", "--dev", help="Causes rst2json.py to run in development mode",dest="dev_mode", action="store_true", default=False)
  # (options, args) = parser.parse_args()

  # register()

  # rst_dir = os.path.abspath('RST/en/')
  # execluded_files = ['Intro', 'Status', 'Bibliography', 'Glossary', 'ToDo',
  #                    'cs342_uwosh', 'Quicksort_exs', 'NPComplete_old',
  #                    'LambdaCalculus', 'ListDataStructure']

  # files = absoluteFilePaths(rst_dir)

  # everything_config = OrderedDict()
  # everything_config = add_header(everything_config)
  # everything_config['chapters'] = OrderedDict()
  # everything_config = add_chapter(everything_config, "Preface")

  # for x in files:
  #   with open(x, 'r') as rstfile:
  #     source=rstfile.read()

  #   source = remove_markup(source)

  #   rst_fname = os.path.basename(x).partition('.')[0]
  #   if rst_fname in execluded_files:
  #     continue

  #   rst_dir_name = x.split('/')[-2]
  #   if rst_dir_name not in folder_names.keys():
  #     continue

  #   print('Processing '+rst_dir_name+'/'+rst_fname+'.rst')

  #   rst_parts = publish_parts(source,
  #               settings_overrides={'output_encoding': 'utf8',
  #               'initial_header_level': 2},
  #               writer_name="xml")

  #   mod_json = xmltodict.parse(rst_parts['whole'])
  #   mod_config = extract_mod_config(mod_json)

  #   if folder_names[rst_dir_name] not in everything_config['chapters'].keys():
  #     everything_config['chapters'][folder_names[rst_dir_name]] = OrderedDict()
  #   everything_config['chapters'][folder_names[rst_dir_name]][rst_dir_name+'/'+rst_fname] = mod_config

  #   if options.dev_mode:
  #     save_debug_files(rst_parts['whole'], mod_json, rst_fname)

  # everything_config = add_chapter(everything_config, "Appendix")
  # if options.dev_mode:
  #   everything_config = sort_by_keys(everything_config)


  # if options.dev_mode:
  #   out_fname = os.path.abspath('tools/json_xml/Everything_generated.json')
  # else:
  #   out_fname = os.path.abspath('config/Everything_generated.json')

  # with open(out_fname, 'w') as outfile:
  #   json.dump(everything_config, outfile)

  # if options.dev_mode:
  #   reorder_orig_config()