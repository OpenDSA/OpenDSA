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
import fileinput, re
from collections import OrderedDict

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
  inline = ".. inlineav:: "
  avembed = ".. avembed:: "
  indent_str = "   "

  fh = fileinput.input(file_name, inplace=True)
  for line in fh:

      if inline in line and (ex_id+'.' in line or ex_id+' ' in line):
        indent = line.index(inline)
        while indent > 0:
          indent_str += " "
          indent -= 1

        replacement = line + indent_str + ':long_name: ' + value + '\n'
        line = replacement

      if avembed in line and (ex_id+'.' in line or ex_id+' ' in line):
        indent = line.index(avembed)
        while indent > 0:
          indent_str += " "
          indent -= 1

        replacement = line + indent_str + ':long_name: ' + value + '\n'
        line = replacement

      sys.stdout.write(line)
  fh.close()


if __name__ == '__main__':

  everything_json = load_config('Everything.json')
  rst_path = os.path.abspath("RST/en")

  for k, v in everything_json['chapters'].iteritems():
    for mod_k, mod_obj in v.iteritems():
      if '/' in mod_k:
        mod_dir, mod_fname = re.split('/', mod_k)[0], re.split('/', mod_k)[1]
        rst_fname = rst_path + '/' + mod_dir + '/' + mod_fname + '.rst'

        if not os.path.exists(rst_fname):
            print_err("WARNING: File %s doesn't exist\n" % rst_fname)
            continue

        with open(rst_fname, 'r') as rstfile:
          rst_source = rstfile.read()

        for sec_id, sec_obj in mod_obj['sections'].iteritems():
          for ex_id, ex_obj in sec_obj.iteritems():
            if isinstance(ex_obj, dict) and 'long_name' in ex_obj.keys():
              modify_rst_file(rst_fname, ex_id, value = ex_obj['long_name'])