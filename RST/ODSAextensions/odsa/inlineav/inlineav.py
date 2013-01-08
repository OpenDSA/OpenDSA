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

__author__ = 'breakid'

from docutils import nodes
from docutils.parsers.rst import directives
from docutils.parsers.rst import Directive
import os, sys
sys.path.append(os.path.abspath('./source'))
import conf

def setup(app):
    app.add_directive('inlineav',inlineav)


DIAGRAM = """\
<div id="%(avId)s">
</div>
"""


SLIDESHOW = """\
<div id="%(avId)s" class="ssAV" data-points="%(points)s" data-threshold="%(threshold)s" data-required="%(required)s">
 <span class="jsavcounter"></span>
 <a class="jsavsettings" href="#">Settings</a>
 <div class="jsavcontrols"></div>
 <img id="%(avId)s_check_mark" class="prof_check_mark" src="%(odsa_path)s/lib/Images/green_check.png" />
 <span id="%(avId)s_prof_warning" class="prof_warning">
  <img class="prof_warning_img" src="_static/Images/warning.png">
  <span id="%(avId)s_warning_msg">Saving...</span>
 </span>
</div>
"""


SSOUTPUT = """\
<div id="%(avId)s" class="ssAV" data-points="%(points)s" data-threshold="%(threshold)s" data-required="%(required)s">
 <span class="jsavcounter"></span>
 <a class="jsavsettings" href="#">Settings</a>
 <div class="jsavcontrols"></div>
 <p class="jsavoutput jsavline" readonly="readonly"></p>
 <img id="%(avId)s_check_mark" class="prof_check_mark" src="%(odsa_path)s/lib/Images/green_check.png" />
 <span id="%(avId)s_prof_warning">
  <img class="prof_warning" src="_static/Images/warning.png">
  <div id="%(avId)s_warning_msg">Saving...</div>
 </span>
</div>
"""


def output(argument):
    """Conversion function for the "output" option."""
    return directives.choice(argument, ('show', 'hide'))

class inlineav(Directive):
    required_arguments = 2
    optional_arguments = 4
    final_argument_whitespace = True
    option_spec = {
                   'output':output,
                   'required': directives.unchanged,
                   'points': directives.unchanged,
                   'threshold': directives.unchanged,
                  }

    def run(self):
        """ Restructured text extension for including inline JSAV content on module pages """
        self.options['avId'] = self.arguments[0]
        self.options['type'] = self.arguments[1]
        self.options['odsa_path'] = os.path.relpath(conf.odsa_path,conf.ebook_path)
        
        if 'required' not in self.options:
          self.options['required'] = False
        
        if 'points' not in self.options:
          self.options['points'] = 0
        
        if 'threshold' not in self.options:
          self.options['threshold'] = 1.0
        
        if self.options['type'] == "diagram":
            res = DIAGRAM % self.options
        else:
            if 'output' in self.options:
                if self.options['output'] == "show":
                    res = SSOUTPUT % self.options
                else:
                    res = SLIDESHOW % self.options
            else:
                res = SLIDESHOW % self.options
        return [nodes.raw('', res, format='html')]


source = """\
This is some text.

.. inlineav:: avId type
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

