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
from xml.dom.minidom import parse, parseString
import urllib
import json

#translation_file

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


def setup(app):
    app.add_directive('avembed',avembed)


ANCHOR_HTML = '''\
<a id="%(exer_name)s_exer"></a>
'''

BUTTON_HTML = '''\
<input type="button"
    id="%(exer_name)s_showhide_btn"
    class="showHideLink"
    value="%(show_hide_text)s %(long_name)s"/>
'''

CONTAINER_HTML= '''\
<div
    id="%(exer_name)s"
    class="embedContainer"
    data-exer-name="%(exer_name)s"
    data-long-name="%(long_name)s"
    data-frame-src="%(av_address)s"
    data-frame-width="%(width)s"
    data-frame-height="%(height)s"
    data-points="%(points)s"
    data-required="%(required)s"
    data-threshold="%(threshold)s"
    data-type="%(type)s"
    data-oembed="%(oembed)s">
  %(content)s
</div>
<p></p>
'''

IFRAME_HTML = '''\
<iframe id="%(exer_name)s_iframe" src="%(av_address)s" width="%(width)s" height="%(height)s" scrolling="no">Your browser does not support iframes.</iframe>
'''

OEMBED_HTML = '''\
<div class="warning">
    <p>Failed to load exercise. Log in to <a href="%(oembed_server)s">%(oembed_server)s</a> to see all the exercises.</p>
</div>
<script>
    ODSA.MOD.initOembedAV($("#%(exer_name)s"));
</script>
'''


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
                 'oembed_url': directives.unchanged,
                 }

  def run(self):

    """ Restructured text extension for inserting embedded AVs with show/hide button """
    self.options['address'] = self.arguments[0]
    self.options['type'] = self.arguments[1]

    url_params = {}
    url_params['serverURL'] = conf.server_url
    url_params['moduleOrigin'] = conf.module_origin
    url_params['module'] = self.options['module']
    url_params['selfLoggingEnabled'] = 'false'

    embed = embedlocal(self.arguments[0])
    self.options['exer_name'] = embed[0]
    self.options['av_address'] = embed[1] + '?' + urllib.urlencode(url_params).replace('&', '&amp;')
    self.options['width'] = embed[2]
    self.options['height'] = embed[3]
    self.options['content'] = ''


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

    if 'oembed_url' not in self.options:
      self.options['oembed'] = False
    else:
      self.options['oembed'] = True
      self.options['av_address'] = self.options['oembed_url']
      parts = self.options['oembed_url'].split("//", 1)
      self.options['oembed_server'] = parts[0] + "//" + parts[1].split("/", 1)[0]

    res = ANCHOR_HTML % self.options

    if self.options['oembed']:
      if 'showhide' in self.options and self.options['showhide'] == "none":
        self.options['content'] = OEMBED_HTML % (self.options)
      elif 'showhide' in self.options and self.options['showhide'] == "show":
        self.options['show_hide_text'] = langDict["hide"]
        self.options['content'] = OEMBED_HTML % (self.options)
        res += BUTTON_HTML % (self.options)
      else:
        self.options['show_hide_text'] = langDict["show"]
        res += BUTTON_HTML % (self.options)
    else:
      if 'showhide' in self.options and self.options['showhide'] == "none":
        self.options['content'] = IFRAME_HTML % (self.options)
      elif 'showhide' in self.options and self.options['showhide'] == "show":
        self.options['show_hide_text'] = langDict["hide"]
        self.options['content'] = IFRAME_HTML % (self.options)
        res += BUTTON_HTML % (self.options)
      else:
        self.options['show_hide_text'] = langDict["show"]
        res += BUTTON_HTML % (self.options)

    res += CONTAINER_HTML % (self.options)

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

