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

def setup(app):
    app.add_directive('avembed',avembed)


CODE = """\
<div id="%(div_id)s">
<p></p>
<center> 
<iframe id="%(div_id)s_iframe" data-exer-name="%(div_id)s" data-points="%(points)s" data-required="%(required)s" data-threshold="%(threshold)s" data-type="%(type)s" src="%(av_address)s" type="text/javascript" width="%(width)s" height="%(height)s" frameborder="0" marginwidth="0" marginheight="0" scrolling="no">
</iframe>
</center>
</div>
"""


SHOWHIDE = """\
<input type="button" 
    id="%(div_id)s_showhide_btn"
    class="showHideLink"
    data-exer-name="%(div_id)s" 
    data-frame-src="%(av_address)s"
    data-frame-width="%(width)s"
    data-frame-height="%(height)s"
    data-points="%(points)s"
    data-required="%(required)s"
    data-threshold="%(threshold)s"
    data-type="%(type)s" 
    value="%(show_hide_text)s %(title)s"/>
"""


def embedlocal(av_path):
   embed=[]
   av_fullname = os.path.basename(av_path)    
   av_name = av_fullname.partition('.')[0]  
   the_path = conf.odsa_path + av_path

   xmlfile = conf.odsa_path + os.path.dirname(av_path)+ '/' + '/xml/' + av_name + '.xml' 
   av_fullpath =  conf.odsa_path + av_path  
   avwidth=0
   avheight=0
   try:
      dom = parse(xmlfile)
      node = dom.documentElement
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
      #link =os.path.abspath(address[1:])
      embed.append(av_name)
      embed.append( os.path.relpath(conf.odsa_path,conf.ebook_path)+'/' + av_path)
      embed.append(avwidth)
      embed.append(avheight)
      return embed     

   except IOError:
      print 'ERROR: No description file when embedding: ' + xmlfile 
      sys.exit()




def showbutton(argument):
    """Conversion function for the "showbutton" option."""
    return directives.choice(argument, ('show', 'hide'))


class avembed(Directive):
    required_arguments = 1
    optional_arguments = 6
    final_argument_whitespace = True
    has_content = True
    option_spec = {'showbutton':showbutton,
                   'title': directives.unchanged,
                   'required': directives.unchanged,
                   'points': directives.unchanged,
                   'threshold': directives.unchanged,
                   'type': directives.unchanged,
                   }

    def run(self):
                
        """ Restructured text extension for inserting embedded AVs with show/hide button """
        self.options['address'] = self.arguments[0] 

        embed = embedlocal(self.arguments[0])   
        self.options['div_id'] = embed[0]
        self.options['av_address'] = embed[1]
        self.options['width'] = embed[2]
        self.options['height'] = embed[3]
 
        if 'required' not in self.options:
          self.options['required'] = False
        
        if 'points' not in self.options:
          self.options['points'] = 0
        
        if 'threshold' not in self.options:
          self.options['threshold'] = 1.0
          
        if 'type' not in self.options:
          if 'Exercise' in self.options['av_address']:
            self.options['type'] = 'ka'
          else:
            self.options['type'] = 'pe'
 
        if 'showbutton' in self.options:
            if self.options['showbutton'] == "show":
                self.options['show_hide_text'] = "Hide"
                res = SHOWHIDE % (self.options)
                res += CODE % (self.options)
            else:
                self.options['show_hide_text'] = "Show"
                res = SHOWHIDE % (self.options)

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




 
