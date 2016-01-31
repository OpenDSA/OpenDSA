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
from xml.dom.minidom import parse, parseString # Can be removed when embedlocal is gone
import urllib
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
    data-frame-src="%(av_address)s"
    data-frame-width="%(width)s"
    data-frame-height="%(height)s"
    data-external="%(external)s"
    data-points="%(points)s"
    data-required="%(required)s"
    data-showhide="%(showhide)s"
    data-threshold="%(threshold)s"
    data-type="%(type)s">
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

  with open(exer_path, 'r') as exer_file:
    lines = exer_file.readlines()

  # Loop through all the lines in the file until it find the body tag
  for line in lines:
    if line.strip().startswith('<body'):
      try:
        body = ET.fromstring(line + '</body>')
        attribs = body.attrib
      except Exception, err:
        return {'err': err}

      if 'data-height' not in attribs or 'data-width' not in attribs:
        return {'err': 'data-height or data-width not found'}

      return {'height': attribs['data-height'], 'width': attribs['data-width']}

  return {'err': 'No body tag detected'}

# Prints the given string to standard error
def print_err(err_msg):
  sys.stderr.write('%s\n' % err_msg)

# Loads translation file
def loadTable():
  try:
    table=open(conf.translation_file)
    data = json.load(table)
    table.close()
    if conf.language in data:
      return dict(data[conf.language]['jinja'].items() + data[conf.language]['js'].items())
    else:
      return dict(data['en']['jinja'].items() + data['en']['js'].items())
  except IOError:
    print 'ERROR: No table.json file.'

def embedlocal(av_path):
  embed=[]
  av_fullname = os.path.basename(av_path)
  av_name = av_fullname.partition('.')[0]

  xmlfile = conf.av_dir + os.path.dirname(av_path) + '/xml/' + av_name + '.xml'

  avwidth = 0
  avheight = 0
  try:
    dom = parse(xmlfile)
    #node = dom.documentElement
    widths = dom.getElementsByTagName("width")
    for width in widths:
      nodes = width.childNodes
      for node in nodes:
        if node.nodeType == node.TEXT_NODE:
          avwidth=node.data

    heights = dom.getElementsByTagName("height")
    for height in heights:
      nodes = height.childNodes
      for node in nodes:
        if node.nodeType == node.TEXT_NODE:
          avheight=node.data
    embed.append(av_name)
    embed.append(os.path.relpath(conf.av_dir,conf.ebook_path) + '/' + av_path)
    embed.append(avwidth)
    embed.append(avheight)
    return embed

  except IOError:
    print 'ERROR: No description file when embedding: ' + xmlfile
    sys.exit()


def showhide(argument):
  """Conversion function for the "showhide" option."""
  return directives.choice(argument, ('show', 'hide', 'none'))


class avembed(Directive):
  required_arguments = 2
  optional_arguments = 7
  final_argument_whitespace = True
  has_content = True
  option_spec = {
                 'exer_opts': directives.unchanged,
                 'long_name': directives.unchanged,
                 'module': directives.unchanged,
                 'points': directives.unchanged,
                 'required': directives.unchanged,
                 'showhide':showhide,
                 'threshold': directives.unchanged,
                 'external_url': directives.unchanged,
                 }

  def run(self):
    """ Restructured text extension for inserting embedded AVs with show/hide button """
    av_path = self.arguments[0]
    self.options['type'] = self.arguments[1]

    url_params = {}
    url_params['exerciseServer'] = conf.exercise_server
    url_params['loggingServer'] = conf.logging_server
    url_params['scoreServer'] = conf.score_server
    url_params['localMode'] = str(conf.local_mode).lower()
    url_params['moduleOrigin'] = conf.module_origin
    url_params['module'] = self.options['module']
    url_params['selfLoggingEnabled'] = 'false'

    self.options['content'] = ''
    self.options['exer_name'] = os.path.basename(av_path).partition('.')[0]

    # Use reasonable defaults
    self.options['width'] = 950
    self.options['height'] = 650

    # Set av_address and dimensions (depends on whether it is an AV or a KA exercise)
    if self.options['type'] == 'ka':
      self.options['av_address'] = os.path.relpath(conf.exercises_dir, conf.ebook_path)
      dimensions = getDimensions(conf.exercises_dir + av_path)

      if 'height' in dimensions and 'width' in dimensions:
        self.options['height'] = dimensions['height']
        self.options['width'] = dimensions['width']
      else:
        print_err('WARNING: Unable to parse dimensions of %s' % av_path)

        if 'err' in dimensions:
          print_err('  %s' % str(dimensions['err']))

        # Use XML files as a backup until data attributes have been implemented for all exercises
        # TODO: Remove embedlocal and replace this section after XML files have been removed
        embed = embedlocal(av_path)
        self.options['width'] = embed[2]
        self.options['height'] = embed[3]
    else:
      self.options['av_address'] = os.path.relpath(conf.av_dir, conf.ebook_path).replace('\\', '/')

    # Append AV path and URL parameters to base av_address
    self.options['av_address'] += '/%s' % av_path

    if '?' in self.options['av_address']:
      self.options['av_address'] += '&amp;'
    else:
      self.options['av_address'] += '?'

    self.options['av_address'] += urllib.urlencode(url_params).replace('&', '&amp;')

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

  print doc_parts['html_body']
