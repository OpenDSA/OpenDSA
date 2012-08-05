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

__docformat__ = 'reStructuredText'


import re
import sys
from docutils import nodes, utils
from docutils.transforms import TransformError, Transform
from docutils.parsers.rst import directives
from docutils.parsers.rst import Directive
from docutils import nodes, languages
from docutils.transforms import parts



def setup(app):
    app.add_directive('chapnum',chapnum)


class chapnum(Directive):

    """Automatic section numbering. with space at the end"""

    option_spec = {'depth': int,
                   'start': int,
                   'prefix': directives.unchanged_required,
                   'suffix': directives.unchanged_required}

    def run(self):
        tmp = self.options['prefix']
        tmp += ' '
        self.options['prefix'] = tmp     
        pending = nodes.pending(parts.SectNum)
        pending.details.update(self.options)
        self.state_machine.document.note_pending(pending)
        return [pending]


if __name__ == '__main__':

    directives.register_directive('chapnum',chapnum)


