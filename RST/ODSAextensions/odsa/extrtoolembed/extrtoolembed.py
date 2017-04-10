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

__author__ = 'hshahin'

from docutils import nodes
from docutils.parsers.rst import directives
from docutils.parsers.rst import Directive
import random
import os, sys
import urllib

# dictionary of all avalibale external learning tools

extrenal_tools_urls = {
  "code-workout": {
          "url": "https://codeworkoutdev.cs.vt.edu/gym/workouts/embed",
          "width": 1000,
          "height": 900
    }
}

def setup(app):
    app.add_directive('extrtoolembed',extrtoolembed)

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
    data-frame-src="%(tool_address)s"
    data-frame-width="%(width)s"
    data-frame-height="%(height)s"
    data-type="%(type)s">
  %(content)s
  <div class="center">
    <div id="%(exer_name)s_iframe"></div>
  </div>
</div>
'''

# Prints the given string to standard error
def print_err(err_msg):
  sys.stderr.write('%s\n' % err_msg)

class extrtoolembed(Directive):
  required_arguments = 0
  optional_arguments = 3
  final_argument_whitespace = True
  has_content = True
  option_spec = {
                 'long_name': directives.unchanged,
                 'module': directives.unchanged,
                 'learning_tool': directives.unchanged
                 }

  def run(self):
    """ Restructured text extension for inserting embedded external learning tools """
    if 'long_name' not in self.options or self.options['long_name'] == '' :
        print 'ERROR: External learning tool is not properly configured'
        sys.exit()

    if 'learning_tool' not in self.options or self.options['learning_tool'] =='' :
        print 'ERROR: External learning tool is not properly configured'
        sys.exit()

    self.options['type'] = 'external_tool'

    url_params = {}
    url_params['resource_name'] = self.options['long_name']

    self.options['content'] = ''
    self.options['exer_name'] = self.options['long_name'].replace(":", "").replace(" ", "_")

    external_tool = extrenal_tools_urls[self.options['learning_tool']]
    self.options['tool_address'] = external_tool['url']
    self.options['width'] = external_tool['width']
    self.options['height'] = external_tool['height']
    self.options['tool_address'] += '?'
    self.options['tool_address'] += urllib.urlencode(url_params).replace('&', '&amp;')

    res = CONTAINER_HTML % (self.options)

    return [nodes.raw('', res, format='html')]



source = """\
This is some text.

.. extrtoolembed:: address type

This is some more text.
"""

if __name__ == '__main__':
  from docutils.core import publish_parts

  directives.register_directive('extrtoolembed',extrtoolembed)

  doc_parts = publish_parts(source,
          settings_overrides={'output_encoding': 'utf8',
          'initial_header_level': 2},
          writer_name="html")

  print doc_parts['html_body']
