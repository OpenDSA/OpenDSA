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

def setup(app):
    app.add_directive('inlineav',inlineav)


DIAGRAM = """\
<div id="%(avId)s">
</div>
"""


SLIDESHOW = """\
<div id="%(avId)s">
 <span class="jsavcounter"></span>
 <a class="jsavsettings" href="#">Settings</a>
 <div class="jsavcontrols"></div>
 <img id="%(avId)s_check_mark" class="prof_check_mark" src="_static/Images/green_check.png" />
</div>
"""


SSOUTPUT = """\
<div id="%(avId)s">
 <span class="jsavcounter"></span>
 <a class="jsavsettings" href="#">Settings</a>
 <div class="jsavcontrols"></div>
 <p class="jsavoutput jsavline" readonly="readonly"></p>
 <img id="%(avId)s_check_mark" class="prof_check_mark" src="_static/Images/green_check.png" />
</div>
"""


def output(argument):
    """Conversion function for the "type" option."""
    return directives.choice(argument, ('show', 'hide'))


class inlineav(Directive):
    required_arguments = 2
    optional_arguments = 1 
    final_argument_whitespace = True
    option_spec = {
                   'output':output,
                  }

    def run(self):
        """ Restructured text extension for including inline JSAV content on module pages """
        self.options['avId'] = self.arguments[0]
        self.options['type'] = self.arguments[1]
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

