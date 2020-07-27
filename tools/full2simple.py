''' Takes a full configuration file and converts it to a simplified one
'''

import sys, os, re, json
import simple2full
from ODSA_Config import read_conf_file
from collections import OrderedDict
from docutils.core import publish_parts


ex_re = re.compile('\s*\.\. (avembed|inlineav):: ([^\s]+/)*([^\s.]*)(\.html)? (ka|ss|ff|pe)')
extr_re = re.compile("\.\. extrtoolembed:: '(.*)'")

def get_exercise_types(conf_data):
  ''' Gets a dictionary where the key is the short name of the exercise
      and the value is the type of the exercise (ka, ss, ff, pe, extr)
  '''
  get_exercise_types.register_called = False
  if not get_exercise_types.register_called:
    simple2full.register
    get_exercise_types.register_called = True

  exercises = {}
  module_files = simple2full.get_chapter_module_files(conf_data)
  for chapter in module_files.values():
    for mod_file in chapter:
      rst_dir_name = mod_file.split(os.sep)[-2]
      rst_fname = os.path.basename(mod_file).partition('.')[0]
      if rst_dir_name == conf_data['lang']:
        mod_path = rst_fname
      else:
        mod_path = rst_dir_name + '/' + rst_fname

      with open(mod_file, 'r') as rstfile:
        source = rstfile.readlines()

      for line in source:
        matches = ex_re.match(line)
        if matches != None:
          ex_name = matches.group(3)
          ex_type = matches.group(5)
          exercises[ex_name] = ex_type
        else:
          matches = extr_re.match(line)
          if matches != None:
            ex_name = matches.group(1)
            ex_type = 'extr'
            exercises[ex_name] = ex_type

  return exercises


def decide_defaults(conf_data, ex_types):
  ''' Determines what the default options for each exercise type
      should be by choosing the options that occur most frequently
      in the full configuration
  '''
  option_freqs = {
    'ss': {
      'points': {},
      'threshold': {},
      'required': {}
    },
    'ff': {
      'points': {},
      'threshold': {},
      'required': {}
    },
    'ka': {
      'points': {},
      'threshold': {},
      'required': {}
    },
    'pe': {
      'points': {},
      'threshold': {},
      'required': {}
    },
    'extr': {
      'points': {}
    },
    'ae' : {
      'points': {},
      'threshold': {},
      'required': {}
    }
  }

  for modules in conf_data['chapters'].values():
    for module in modules.values():
      for section, children in module['sections'].iteritems():
        if 'learning_tool' in children:
          freqs = option_freqs['extr']
          lt = children['learning_tool']
          pts = children['points']
          if pts in freqs['points']:
              freqs['points'][pts] += 1
          else:
            freqs['points'][pts] = 1
          
          if lt in freqs:
            if pts in freqs[lt]['points']:
              freqs[lt]['points'][pts] += 1
            else:
              freqs[lt]['points'][pts] = 1
          else:
            freqs[lt] = {'points': {}}
            freqs[lt]['points'][pts] = 1
        else:
          for exer_name, options in children.iteritems():
            if exer_name not in ex_types:
              continue

            ex_type = ex_types[exer_name]
            freqs = option_freqs[ex_type]

            if options['points'] in freqs['points']:
              freqs['points'][options['points']] += 1
            else:
              freqs['points'][options['points']] = 1
            
            if options['threshold'] in freqs['threshold']:
              freqs['threshold'][options['threshold']] += 1
            else:
              freqs['threshold'][options['threshold']] = 1

            if options['required'] in freqs['required']:
              freqs['required'][options['required']] += 1
            else:
              freqs['required'][options['required']] = 1

  defaults = {
    'ss': {},
    'ff': {},
    'ka': {},
    'pe': {},
    'extr': {},
    'ae': {}
  }

  for ex_type, freqs in option_freqs.iteritems():
    if ex_type == 'extr':
      defaults[ex_type]['points'] = max(freqs['points'], key=freqs['points'].get)
      del freqs['points']
      for lt, options in freqs.iteritems():
        defaults[ex_type][lt] = {}
        for key, values in options.iteritems():
          defaults[ex_type][lt][key] = max(values)
    else:
      defaults[ex_type]['points'] = max(freqs['points'], key=freqs['points'].get)
      defaults[ex_type]['required'] = max(freqs['required'], key=freqs['required'].get)
      defaults[ex_type]['threshold'] = max(freqs['threshold'], key=freqs['threshold'].get)
  
  return defaults

def gen_simple_config(conf_data):
  ''' Generates a simplified configuration from a full configuration
  '''
  simple_conf = conf_data.copy()
  ex_types = get_exercise_types(conf_data)
  defaults = decide_defaults(conf_data, ex_types)

  for key, options in defaults.iteritems():
    simple_conf['glob_{0}_options'.format(key)] = options

  # remove and re-add chapters so that the default options appear before them
  chapters = simple_conf['chapters']
  del simple_conf['chapters']
  simple_conf['chapters'] = chapters

  # strip unnecessary info from config
  for chapter in simple_conf['chapters'].values():
    for mod_name, module in chapter.iteritems():
      if 'long_name' in module:
        del module['long_name']
      for section_name, section in module['sections'].iteritems():
        if 'learning_tool' in section:
          lt = section['learning_tool']
          if section['points'] == defaults['extr'][lt]['points']:
            del section['points']
          del section['learning_tool']
          del section['resource_type']
          del section['resource_name']
          if len(section) == 0:
            del module['sections'][section_name]
          else:
            module[section_name] = section
        else:
          for ex_name, exercise in section.iteritems():
            if ex_name not in ex_types:
              if type(exercise) is OrderedDict:
                if len(exercise) == 0:
                  del section[ex_name]
                if 'points' in exercise:
                  print("WARNING: exercise '{0}' does not exist in module '{1}'".format(ex_name, mod_name))
                  del section[ex_name]
              continue
            
            ex_type = ex_types[ex_name]
            del exercise['long_name']
            if exercise['required'] == defaults[ex_type]['required']:
              del exercise['required']
            if exercise['threshold'] == defaults[ex_type]['threshold']:
              del exercise['threshold']
            if exercise['points'] == defaults[ex_type]['points']:
              del exercise['points']

            if len(exercise) == 0:
              del section[ex_name]
            else:
              module[ex_name] = exercise
              del section[ex_name]
          
      for section_name, section in module['sections'].iteritems():
        if len(section) > 0:
          module[section_name] = section
      
      del module['sections']

  return simple_conf

if __name__ == '__main__':
  args = sys.argv
  if len(args) != 3:
      print('Usage: {0} config_file output_file', args[0])
      sys.exit(1)

  config_file = args[1]
  output_file = args[2]
  conf_data = read_conf_file(config_file)
  simple_conf = gen_simple_config(conf_data)

  with open(output_file, 'w') as outfile:
    json.dump(simple_conf, outfile, indent=2)