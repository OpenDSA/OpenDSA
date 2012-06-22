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


def setup(app):
    app.add_directive('avembed',avembed)


CODE = """\
<center>
   <div id="embedHere"></div>
   <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
   <script>$(function() { $.getJSON("http://algoviz.org/oembed/?url="%(address)s"    
      , function(data) {
      $("#embedHere").html(data.html); })});
   </script>
</center>
"""

SHOW = """\
<input type="button" 
    name="%(title)s" 
    value="Show %(title)s" 
    id="%(divID)s+show"
    class="showLink" 
    style="background-color:#f00;"/>
<div id="%(divID)s" 
    class="more">
"""

HIDE = """\
<input type="button"
    name="%(title)s"
    value="Hide %(title)s"
    id="%(divID)s+hide"
    class="hideLink"
    style="background-color:#f00;"/>
</div> 
"""

def showbutton(argument):
    """Conversion function for the "showbutton" option."""
    return directives.choice(argument, ('show', 'hide'))

class avembed(Directive):
    required_arguments = 1
    optional_arguments = 2 
    final_argument_whitespace = True
    has_content = True
    option_spec = {'showbutton':showbutton,
                   'title': title 
                   }

    def run(self):
                
        """ Restructured text extension for inserting embedded AVs with show/hide button """
        self.options['address'] = self.arguments[0] 

        if 'showbutton' in self.options:

            if 'title' in self.options:
                self.options['title'] = 'title' 
           
            divID = "Example%s"%random.randint(1,1000) 
            self.options['divID'] = divID 
            res = SHOW % (self.options) 
            res += HIDE % (self.options)
            res += CODE % self.options      
            return [nodes.raw('', res, format='html')]

        else:
            res = CODE % self.options 
            return [nodes.raw('', res, format='html')]



source = """\
This is some text.

.. avembed:: address 
   :showbutton:
   :title: 


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




 
