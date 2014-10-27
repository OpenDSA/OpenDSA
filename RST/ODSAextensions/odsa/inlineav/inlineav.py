# Copyright (C) 2012 Daniel Breakiron
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

__author__ = 'breakid, efouh'

from docutils import nodes
from docutils.nodes import General, Element, caption, Text, figure
from docutils.parsers.rst import directives
from docutils.parsers.rst import Directive
from docutils.parsers.rst.directives.images import Figure, Image
import os, sys
sys.path.append(os.path.abspath('./source'))
import conf
import re
import json


#InlineAV diagram Element class
class av_dgm(Element): pass
class av_anchor(Element): pass
class av_ss(Element):pass


def visit_av_dgm_html(self, node):
  self.body.append(self.starttag(node, 'div', CLASS='divdgm'))

def depart_av_dgm_html(self, node):
  self.body.append('</div>\n')

def visit_av_ss_html(self, node):
  self.body.append(self.starttag(node, 'div', CLASS='' ))
  self.body.append(node['res'])

def depart_av_ss_html(self, node):
  self.body.append('</div>\n')

def visit_av_anchor_html(self, node):
  self.body.append(self.starttag(node, 'div', CLASS=''))

def depart_av_anchor_html(self, node):
  self.body.append('</div>\n')

def doctree_read(app, doctree):
  # first generate figure numbers for each figure
  env = app.builder.env

  json_data = loadTable()
  i = getattr(env, 'i', 1)
  figids = getattr(env, 'figids', {})
  figid_docname_map = getattr(env, 'figid_docname_map', {})
  module = ''
  num_module = 0
  for avdgm_info in doctree.traverse(Element):  #av_dgm):
    if env.docname != module:
      i = 1
    if env.docname in json_data:
      module = env.docname
      num_module = json_data[env.docname]
    if isinstance( avdgm_info, av_dgm ) or ( isinstance( avdgm_info, av_ss ) and len(avdgm_info['ids'])>0 ):
      for cap in avdgm_info.traverse(caption):
        cap[0] = Text(" %s %s.%d: %s" % (app.config.figure_caption_prefix, num_module, i, cap[0]))
      for id in avdgm_info['ids']:
        figids[id] = i
        figid_docname_map[id] = env.docname
      i += 1
    if isinstance( avdgm_info, figure ):
      i += 1

  env.figid_docname_map = figid_docname_map
  env.i = i
  env.figids = figids

def setup(app):
  app.connect('doctree-read', doctree_read)
  app.add_node(av_dgm,html=(visit_av_dgm_html, depart_av_dgm_html))
  app.add_node(av_anchor,html=(visit_av_anchor_html, depart_av_anchor_html))
  app.add_node(av_ss,html=(visit_av_ss_html, depart_av_ss_html))
  app.add_directive('inlineav',inlineav)

def loadTable():
  try:
    table=open('table.json')
    data = json.load(table)
    table.close()
    return data
  except IOError:
    print 'ERROR: No table.json file.'

# div.jsavcanvas is required to ensure it appears before the error message otherwise the container appears over top of the message, blocking the 'Resubmit' link from being clicked
SLIDESHOW = '''\
<div id="%(exer_name)s" class="ssAV" data-points="%(points)s" data-threshold="%(threshold)s" data-type="%(type)s" data-required="%(required)s" data-long-name="%(long_name)s">
 <span class="jsavcounter"></span>
 <a class="jsavsettings" href="#">Settings</a>
 <div class="jsavcontrols"></div>
 %(output_code)s
 <div class="jsavcanvas"></div>
 <div class="prof_indicators">
  <img id="%(exer_name)s_check_mark" class="prof_check_mark" src="_static/Images/green_check.png" alt="Proficient" />
  <span id="%(exer_name)s_cm_saving_msg" class="cm_saving_msg">Saving...</span>
  <span id="%(exer_name)s_cm_error_msg" class="cm_error_msg">
   <img id="%(exer_name)s_cm_warning_icon" class="cm_warning_icon" src="_static/Images/warning.png" alt="Error Saving" /><br />
   Server Error<br />
   <a href="#" class="resubmit_link">Resubmit</a>
  </span>
 </div>
</div>
<p></p>
'''

def output(argument):
  """Conversion function for the "output" option."""
  return directives.choice(argument, ('show', 'hide'))

class inlineav(Directive):
  required_arguments = 2
  optional_arguments = 7
  final_argument_whitespace = True
  option_spec = {
                  'output': output,
                  'required': directives.unchanged,
                  'long_name': directives.unchanged,
                  'points': directives.unchanged,
                  'threshold': directives.unchanged,
                  'align': directives.unchanged,
                }
  has_content = True

  def run(self):
    """ Restructured text extension for including inline JSAV content on module pages """
    self.options['exer_name'] = self.arguments[0]
    self.options['type'] = self.arguments[1]
    self.options['odsa_path'] = os.path.relpath(conf.odsa_path,conf.ebook_path)

    # Set defaults for any values that aren't configured
    if 'required' not in self.options:
      self.options['required'] = False

    if 'points' not in self.options:
      self.options['points'] = 0

    if 'threshold' not in self.options:
      self.options['threshold'] = 1.0

    if 'long_name' not in self.options:
      self.options['long_name'] = self.options['exer_name']

    if 'align' not in self.options:
      self.options['align'] = 'center'

    if 'output' in self.options and self.options['output'] == "show":
      self.options['output_code'] = '<p class="jsavoutput jsavline"></p>'
    else:
      self.options['output_code'] = ''

    if self.options['type'] == "dgm":
      avdgm_node = av_dgm()
      anchor_node = av_anchor()

      avdgm_node['exer_name'] = self.options['exer_name']
      anchor_node['ids'].append(self.options['exer_name'])
      avdgm_node += anchor_node
      if self.content:
        node = nodes.Element()          # anonymous container for parsing
        self.state.nested_parse(self.content, self.content_offset, node)
        first_node = node[0]
        if isinstance(first_node, nodes.paragraph):
          caption = nodes.caption(first_node.rawsource, '', *first_node.children)
          caption['align']= self.options['align']
          avdgm_node += caption

      return [avdgm_node]
    elif self.options['type'] == "ss" and self.content:
      avss_node = av_ss()
      avss_node['res'] = SLIDESHOW % self.options
      node = nodes.Element()          # anonymous container for parsing
      self.state.nested_parse(self.content, self.content_offset, node)
      first_node = node[0]
      if isinstance(first_node, nodes.paragraph):
        caption = nodes.caption(first_node.rawsource, '', *first_node.children)
        caption['align']= self.options['align']
        avss_node += caption
      return [avss_node]
    else:
      res = SLIDESHOW % self.options
      return [nodes.raw('', res, format='html')]


source = """\
This is some text.

.. inlineav:: exer_name type
   :output:

This is some more text.
"""

if __name__ == '__main__':
  from docutils.core import publish_parts

  directives.register_directive('inlineav',inlineav)

  doc_parts = publish_parts(source,
          settings_overrides={'output_encoding': 'utf8',
          'initial_header_level': 2},
          writer_name="html")

  print doc_parts['html_body']

