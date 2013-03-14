#! /usr/bin/python
#
# Given an OpenDSA config file as a parameter, this script ensures all required fields are present and no invalid options are present
import sys
import os
import simplejson as json
import collections
from urlparse import urlparse

error_count = 0

def validate_origin(origin, origin_type):
  global error_count
  
  parsed = urlparse(origin)
  if parsed.scheme not in ['http', 'https']:
    print 'ERROR: Invalid ' + origin_type + '_origin protocol, ' + parsed.scheme
    error_count += 1
  
  if parsed.netloc == '':
    print 'ERROR: Invalid ' + origin_type + '_origin netloc, ' + parsed.netloc
    error_count += 1
  
  if parsed.path not in ['', '/']:
    print 'ERROR: Invalid ' + origin_type + '_origin path' + parsed.path
    error_count += 1

# Validate an exercise
def validate_exercise(exer_name, exercise):
  global error_count
  required_fields = []
  optional_fields = ['long_name', 'points', 'remove', 'required', 'showhide', 'threshold']
  
  # Ensure required fields are present
  for field in required_fields:
    if field not in exercise:
      print 'ERROR: Exercise, ' + exer_name + ', is missing required field, ' + field
      error_count += 1

  # Ensure there are no invalid fields in the module
  for field in exercise:
    if field not in (required_fields + optional_fields):
      print 'ERROR: Unknown field, ' + field + ', found in exercise ' + exer_name
      error_count += 1

# Validate a module
def validate_module(mod_name, module):
  global error_count
  required_fields = ['exercises']
  optional_fields = ['long_name', 'dispModComp']
  
  # Ensure required fields are present
  for field in required_fields:
    if field not in module:
      print 'ERROR: Module, ' + mod_name + ', is missing required field, ' + field
      error_count += 1

  # Ensure there are no invalid fields in the module
  for field in module:
    if field not in (required_fields + optional_fields):
      print 'ERROR: Unknown field, ' + field + ', found in module ' + mod_name
      error_count += 1
  
  # Check validity of exercises
  if 'exercises' in module:
    for exer in module['exercises']:
      validate_exercise(exer, module['exercises'][exer])

# Validate a section
def validate_section(section):
  for subsect in section:
    is_mod = 'exercises' in section[subsect]
    
    if section[subsect] == {}:
      print 'WARNING: Section ' + subsect + ' is empty'
      continue
    elif not is_mod:
      for field in section[subsect]:
        if type(section[subsect][field]) != type(collections.OrderedDict()):
          is_mod = True
          break
    
    if is_mod:
      # Subsect is a module
      validate_module(subsect, section[subsect])
    else:
      validate_section(section[subsect])

# Validate an OpenDSA configuration file
def validate_config_file(config_file):
  global error_count
  # Throw an error if the specified config files doesn't exist
  if not os.path.exists(config_file):
    print "ERROR: File " + config_file + " doesn't exist\n"
    sys.exit(1)

  print "\nValidating " + config_file + '\n'

  # Read the configuration data
  with open(config_file) as config:
    try:
      # Force python to maintain original order of JSON objects
      conf_data = json.load(config, object_pairs_hook=collections.OrderedDict)
    except ValueError:
      print 'ERROR: ' + config_file + ' is not a valid JSON file or does not use a supported encoding\n'
      # TODO: Figure out how to get simplejson to accept different encodings
      sys.exit(1)

  required_fields = ['title', 'code_dir', 'module_origin', 'chapters']

  optional_fields = ['book_dir', 'backend_address', 'av_root_dir', 'av_origin', 'exercises_root_dir', 'exercise_origin', 'build_JSAV', 'build_ODSA', 'allow_anonymous_credit', 'suppress_todo']

  # Ensure all required fields are present
  for field in required_fields:
    if field not in conf_data:
      print 'ERROR: Required field missing, ' + field
      error_count += 1
  
  if 'module_origin' in conf_data:
    validate_origin(conf_data['module_origin'], 'module');
  else:
    # Create a default module_origin for later processing
    conf_data['module_origin'] = ''
  
  # Ensure optional fields are configured properly
  if 'backend_address' in conf_data and not conf_data['backend_address'].startswith('https'):
    print 'WARNING: "backend_address" should use HTTPS'
  
  if 'av_origin' in conf_data:
    validate_origin(conf_data['av_origin'], 'av');
    
    # av_root_dir does not exist or does not point to a remote system but av_origin does not match the module origin
    if ('av_root_dir' not in conf_data or not conf_data['av_root_dir'].startswith('http')) and conf_data['av_origin'] != conf_data['module_origin']:
      print 'ERROR: av_root_dir is local but av_origin does not match module_origin'
      error_count += 1
  
  if 'exercise_origin' in conf_data:
    validate_origin(conf_data['exercise_origin'], 'exercise');
    
    # exercise_origin does not exist or does not point to a remote system but exercise_origin does not match the module origin
    if ('exercise_root_dir' not in conf_data or not conf_data['exercise_root_dir'].startswith('http')) and conf_data['exercise_origin'] != conf_data['module_origin']:
      print 'ERROR: exercise_root_dir is local but exercise_origin does not match module_origin'
      error_count += 1
  
  # Display an error message and exit if 'av_root_dir' is an absolute pathname to a remote system and its domain doesn't match 'module_origin' or 'av_origin' (or 'av_origin' isn't specified)
  if 'av_root_dir' in conf_data and conf_data['av_root_dir'].startswith('http') and not conf_data['av_root_dir'].startswith(conf_data['module_origin']) and ('av_origin' not in conf_data or not conf_data['av_root_dir'].startswith(conf_data['av_origin'])):
    error_count += 1
    
    if 'av_origin' not in conf_data:
      print 'ERROR: "av_origin" not specified when "av_root_dir" points to a remote system'
    else:
      print 'ERROR: "av_origin" does not match domain of remote "av_root_dir"'
  
  # Display an error message and exit if 'exercises_root_dir' is an absolute pathname to a remote system and its domain doesn't match 'module_origin' or 'exercise_origin' (or 'exercise_origin' isn't specified)
  if 'exercises_root_dir' in conf_data and conf_data['exercises_root_dir'].startswith('http') and not conf_data['exercises_root_dir'].startswith(conf_data['module_origin']) and ('exercise_origin' not in conf_data or not conf_data['exercises_root_dir'].startswith(conf_data['exercise_origin'])):
    error_count += 1
    
    if 'exercise_origin' not in conf_data:
      print 'ERROR: "exercise_origin" not specified when "exercises_root_dir" points to a remote system'
    else:
      print 'ERROR: "exercise_origin" does not match domain of remote "exercises_root_dir"'
  
  # Ensure the config file doesn't have any unknown fields (catches mis-spelled fields when config file is manually edited)
  for field in conf_data:
    if field not in (required_fields + optional_fields):
      print 'ERROR: Unknown field, ' + field
      error_count += 1
  
  validate_section(conf_data['chapters'])
  
  if error_count > 0:
    print 'Errors found: ' + str(error_count) + '\n'
    sys.exit(1)



# Code to execute when run as a standalone program
if __name__ == "__main__":
  # Process script arguments
  if len(sys.argv) != 2:
    print "Invalid config filename"
    print "Usage: " + sys.argv[0] + " config_file\n"
    sys.exit(1)

  config_file = sys.argv[1]
  
  validate_config_file(config_file)