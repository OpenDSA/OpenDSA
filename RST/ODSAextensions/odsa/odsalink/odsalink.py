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

def setup(app):
    app.add_directive('odsalink',odsalink)


CODE = """\
<link href="%(address)s" rel="stylesheet" type="text/css" />
"""


class odsalink(Directive):
    required_arguments = 1
    optional_arguments = 0
    final_argument_whitespace = True
    option_spec = {}

    def run(self):

        """ Restructured text extension for including CSS and other libraries """
        self.options['address'] = os.path.relpath(conf.odsa_path,conf.ebook_path).replace('\\', '/') + '/' + self.arguments[0]
        res = CODE % self.options
        return [nodes.raw('', res, format='html')]


source = """\
This is some text.

.. odsalink:: address


This is some more text.
"""

if __name__ == '__main__':
    from docutils.core import publish_parts

    directives.register_directive('odsalink',odsalink)

    doc_parts = publish_parts(source,
            settings_overrides={'output_encoding': 'utf8',
            'initial_header_level': 2},
            writer_name="html")

    print doc_parts['html_body']
