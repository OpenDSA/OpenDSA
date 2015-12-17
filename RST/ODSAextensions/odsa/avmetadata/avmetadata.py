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
import json  



chapter_items = {}   

def getChapter(pagename):   
   json_data=open('page_chapter.json')
   data = json.load(json_data)
   json_data.close()
   if pagename in data:
       chapter_items[pagename] =  'Chapter ' + str(data[pagename][1]) + ' ' +  data[pagename][0]    
   return chapter_items  

def html_page_context(app, pagename, templatename, context, doctree): 
     context['chapter_items'] = getChapter(pagename)   


class avmetadata(Directive):
    required_arguments = 0 
    optional_arguments = 3 
    final_argument_whitespace = True
    has_content = True
    option_spec = {'author':directives.unchanged,
                   #'title': directives.unchanged,
                   'topic': directives.unchanged,
                   'requires': directives.unchanged,
                   'satisfies': directives.unchanged,
                   #'short_name': directives.unchanged,
                   #'exercises': directives.unchanged,    
                   }

    def run(self):
                
        """ Restructured text extension for collecting  AVs metadata nothing is written in the output html file """
        return [nodes.raw('', '', format='html')]



def setup(app):
    #app.connect('getChapter',getChapter)   
    app.connect('html-page-context', html_page_context)   
    app.add_directive('avmetadata',avmetadata)


source = """\
This is some text.

.. avmetadata:: address 
   :author:
   :topic:
   :requires:
   :satisfies:   

This is some more text.
"""

if __name__ == '__main__':
    from docutils.core import publish_parts

    directives.register_directive('avmetadata',avmetadata)

    doc_parts = publish_parts(source,
            settings_overrides={'output_encoding': 'utf8',
            'initial_header_level': 2},
            writer_name="html")

    print doc_parts['html_body']




 
