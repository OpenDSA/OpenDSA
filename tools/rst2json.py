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

from docutils import nodes
from docutils.parsers.rst import directives
from docutils.parsers.rst import Directive
import os, sys
from xml.dom.minidom import parse, parseString # Can be removed when embedlocal is gone
import json

def setup(app):
    app.add_directive('avembed',avembed)

# Must use the exercise name as the ID of the container (required for
# client-side framework processing and as an anchor for hyperlinking
# directly to the exercise)
# The div with ID '[exer_name]_iframe' is a placeholder that is replaced after the page finishes loading
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

avmetadata_element= '''\
<avmetadata
    author="%(author)s"
    topic="%(topic)s"
    requires="%(requires)s"
    satisfies="%(satisfies)s">
</avmetadata>
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
        res = avmetadata_element % (self.options)
        return [nodes.raw('', res, format='xml')]


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


source = """\
.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: algorithm analysis; analyzing programs; analyzing problems; analysis misunderstandings; space analysis introduction
   :satisfies: algorithm analysis review
   :topic: Algorithm Analysis


Algorithm Analysis Summary Exercises
====================================

Summary Exercise: CS2
---------------------

.. avembed:: Exercises/AlgAnal/AlgAnalCS2Summ.html ka

Summary Exercise: CS3
---------------------

.. avembed:: Exercises/AlgAnal/AlgAnalCS3Summ.html ka

.. extrtoolembed::
   :resource_name: List ADT Programming Exercise
   :resource_type: external_assignment
   :learning_tool: code-workout
   :points: 1.0

.. inlineav:: BinExampCON dgm
.. inlineav:: preorderCON ss
.. inlineav:: postorderCON ss
.. inlineav:: inorderCON ss

"""

if __name__ == '__main__':
  from docutils.core import publish_parts

  directives.register_directive('avembed',avembed)
  directives.register_directive('avmetadata',avmetadata)
  directives.register_directive('extrtoolembed',extrtoolembed)
  directives.register_directive('inlineav',inlineav)

  doc_parts = publish_parts(source,
          settings_overrides={'output_encoding': 'utf8',
          'initial_header_level': 2},
          writer_name="xml")

  print doc_parts['whole']

