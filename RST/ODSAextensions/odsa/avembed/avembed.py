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

__author__ = 'efouh'

from docutils import nodes
from docutils.parsers.rst import directives
from docutils.parsers.rst import Directive
import random
import os, sys
import re
sys.path.append(os.path.abspath('./source'))
import conf
import xml.etree.ElementTree as ET
import urllib.request, urllib.parse, urllib.error, urllib.parse
import json

def setup(app):
    app.add_directive('avembed',avembed)

# Must use the exercise name as the ID of the container (required for
# client-side framework processing and as an anchor for hyperlinking
# directly to the exercise)
# The div with ID '[exer_name]_iframe' is a placeholder that is replaced after the page finishes loading
CONTAINER_HTML= '''\
<div
    id="%(exer_name)s"
    class="embedContainer"
    data-exer-name="%(exer_name)s"
    data-long-name="%(long_name)s"
    data-short-name="%(short_name)s"
    data-frame-src="%(av_address)s"
    data-frame-width="%(width)s"
    data-frame-height="%(height)s"
    data-vertical-scrolling="%(vscroll)s"
    data-external="%(external)s"
    data-points="%(points)s"
    data-required="%(required)s"
    data-showhide="%(showhide)s"
    data-threshold="%(threshold)s"
    data-type="%(type)s"
    data-exer-id="%(id)s">
  %(content)s
  <div class="center">
    <div id="%(exer_name)s_iframe"></div>
  </div>
</div>
'''

BUTTON_HTML = '''\
<input type="button"
  id="%(exer_name)s_showhide_btn"
  class="showHideLink"
  data-target="%(exer_name)s_iframe"
  value="%(show_hide_text)s %(long_name)s"/>
<span id="%(exer_name)s_shb_error_msg" class="shb_msg">
  <img src="_static/Images/warning.png" class="shb_warning_icon" />
  &nbsp;Server Error&nbsp;<a class="resubmit_link" href="#">Resubmit</a>
</span>
<span id="%(exer_name)s_shb_saving_msg" class="shb_msg">Saving...</span>
<img id="%(exer_name)s_spinner" class="loading-spinner" src="_static/Images/spinner.gif" />
'''


def getDimensions(exer_path):
  """Read the specified KA exercise HTML file and extract the height and width from the body's data attributes"""
  # Originally used xml.etree.ElementTree to parse the entire file, but
  # JavaScript conditionals interfered with the parsing, so I reverted
  # to reading the file line-by-line and just looking for and parsing
  # the body tag
  if '?' in exer_path:
    exer_path = exer_path[:exer_path.index('?')]

  try:
    with open(exer_path, 'r') as exer_file:
      lines = exer_file.readlines()
  except:
    return {'err': 'failed to open exercise file. Check that it exists.'}

  # Loop through all the lines in the file until it find the body tag
  for line in lines:
    if line.strip().startswith('<body'):
      try:
        body = ET.fromstring(line + '</body>')
        attribs = body.attrib
      except Exception as err:
        return {'err': err}

      if 'data-height' not in attribs or 'data-width' not in attribs :
        return {'err': 'data-height or data-width not found'}

      if 'data-vertical-scrolling' not in attribs :
        attribs['data-vertical-scrolling'] = "no"

      return {'height': attribs['data-height'], 'width': attribs['data-width'], 'vscroll': attribs['data-vertical-scrolling']}

  return {'err': 'No body tag detected'}

def print_err(*args, **kwargs):
  '''Prints the given string to standard error'''
  print(*args, file=sys.stderr, **kwargs)

def loadTable():
  '''Loads translation file'''
  try:
    table=open(conf.translation_file)
    data = json.load(table)
    table.close()
    if conf.language in data:
      return dict(list(data[conf.language]['jinja'].items()) + list(data[conf.language]['js'].items()))
    else:
      return dict(list(data['en']['jinja'].items()) + list(data['en']['js'].items()))
  except IOError:
    print('ERROR: No table.json file.')


def showhide(argument):
  """Conversion function for the "showhide" option."""
  return directives.choice(argument, ('show', 'hide', 'none'))


class avembed(Directive):
  required_arguments = 2
  optional_arguments = 10
  final_argument_whitespace = True
  has_content = True
  option_spec = {
                 'exer_name': directives.unchanged,
                 'exer_opts': directives.unchanged,
                 'long_name': directives.unchanged,
                 'url_params': directives.unchanged,
                 'module': directives.unchanged,
                 'points': directives.unchanged,
                 'required': directives.unchanged,
                 'showhide':showhide,
                 'threshold': directives.unchanged,
                 'external_url': directives.unchanged,
                 'id': directives.unchanged,
                 }

  def run(self):
    """ Restructured text extension for inserting embedded AVs with show/hide button """
    av_path = self.arguments[0]
    self.options['type'] = self.arguments[1]

    url_params = {}
    url_params['localMode'] = str(conf.local_mode).lower()
    url_params['module'] = self.options['module']
    url_params['selfLoggingEnabled'] = 'false'

    if 'url_params' in self.options:
      url_params.update(urllib.parse.parse_qs(self.options['url_params']))

    self.options['content'] = ''
    if 'exer_name' not in self.options:
      self.options['exer_name'] = os.path.basename(av_path).partition('.')[0]
    self.options['short_name'] = self.options['exer_name']

    # Use reasonable defaults
    self.options['width'] = 950
    self.options['height'] = 650
    self.options['vscroll'] = "no"

    # Set av_address and dimensions (depends on whether it is an AV or a KA exercise)
    if self.options['type'] == 'ka':
      self.options['av_address'] = os.path.relpath(conf.exercises_dir, conf.ebook_path)
      dimensions = getDimensions(conf.exercises_dir + av_path)

      if 'height' in dimensions and 'width' in dimensions:
        self.options['height'] = dimensions['height']
        self.options['width'] = dimensions['width'] 
      else:
        print_err(f'WARNING: Unable to parse dimensions of {av_path}')

        if 'err' in dimensions:
          print_err(f"  {dimensions['err']}")
      
      # Temporary support for vertical scrolling in KA exercises
      if 'vscroll' in dimensions:
        self.options['vscroll'] = dimensions['vscroll']

    else:
      self.options['av_address'] = os.path.relpath(conf.av_dir, conf.ebook_path).replace('\\', '/')

    # Append AV path and URL parameters to base av_address
    self.options['av_address'] += f'/{av_path}'

    if '?' in self.options['av_address']:
      self.options['av_address'] += '&amp;'
    else:
      self.options['av_address'] += '?'

    self.options['av_address'] += urllib.parse.urlencode(url_params, True).replace('&', '&amp;')

    # Load translation
    langDict = loadTable()

    # Add the JSAV exercise options to the AV address
    if 'exer_opts' in self.options and self.options['exer_opts'] != '':
      self.options['av_address'] += '&amp;' + self.options['exer_opts']

    if 'required' not in self.options:
      self.options['required'] = False
    if 'points' not in self.options:
      self.options['points'] = 0
    if 'threshold' not in self.options:
      self.options['threshold'] = 1.0
    if 'long_name' not in self.options:
      self.options['long_name'] = self.options['exer_name']
    if 'showhide' not in self.options:
      self.options['showhide'] = 'show'
    if 'id' not in self.options:
      self.options['id'] = ''

    if self.options['showhide'] == "show":
      self.options['show_hide_text'] = langDict["hide"]
    elif self.options['showhide'] == "hide":
      self.options['show_hide_text'] = langDict["show"]

    if 'external_url' not in self.options:
      # Exercise does not use external source
      self.options['external'] = 'false'
    else:
      # Exercise uses external source
      self.options['external'] = 'true'
      self.options['av_address'] = self.options['external_url']

    # if self.options['showhide'] != "none":
    #   self.options['content'] = BUTTON_HTML % (self.options)

    res = CONTAINER_HTML % (self.options)

    return [nodes.raw('', res, format='html')]


source = """\
This is some text.

.. avembed:: address type

This is some more text.
"""

if __name__ == '__main__':
  from docutils.core import publish_parts

  directives.register_directive('avembed',avembed)

  doc_parts = publish_parts(source,
          settings_overrides={'output_encoding': 'utf8',
          'initial_header_level': 2},
          writer_name="html")

  print(doc_parts['html_body'])
