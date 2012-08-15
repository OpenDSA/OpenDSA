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
<div class="start%(div_id)s">
<center> 
<iframe src="%(av_address)s" type="text/javascript" width="%(width)s" height="%(height)s" frameborder="0" marginwidth="0" marginheight="0" scrolling="no">
</iframe>
</center>
</div>
"""

CODE1= """\
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
<script>document.getElementById("%(divID)s+show").style.display ="none"; document.getElementById("%(divID)s").style.display ="block";</script>
"""



SHOW = """\
<input type="button" 
    name="%(av_address)s+%(width)s+%(height)s" 
    value="Show %(title)s" 
    id="%(divID)s+show"
    class="showLink" 
    style="background-color:#f00;"/>
<div id="%(divID)s" 
    class="more">
"""


HIDE = """\
<input type="button"
    name="%(av_address)s+%(width)s+%(height)s+hide"
    value="Hide %(title)s"
    id="%(divID)s+hide"
    class="hideLink"
    style="background-color:#f00;"/>
</div><p></p>
"""



def embedlocal(av_path):
   embed=[]
   av_fullname = os.path.basename(av_path)    
   av_name = av_fullname.partition('.')[0]  
   the_path = conf.odsa_path + av_path

#   xmlfile = os.path.abspath('../'+ os.path.dirname(av_path)+'/') + '/xml/' + av_name + '.xml'    
   xmlfile = conf.odsa_path + os.path.dirname(av_path)+ '/' + '/xml/' + av_name + '.xml' 
#   av_fullpath = os.path.abspath('../'+av_path) 
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
#      embed.append('../../../'+av_path)
      embed.append(conf.odsa_relpath + av_path)
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
    optional_arguments = 2 
    final_argument_whitespace = True
    has_content = True
    option_spec = {'showbutton':showbutton,
                   'title': directives.unchanged,
                   }

    def run(self):
                
        """ Restructured text extension for inserting embedded AVs with show/hide button """
        self.options['address'] = self.arguments[0] 

        embed = embedlocal(self.arguments[0])   
        self.options['av_address'] = embed[0]
        self.options['width'] = embed[1]
        self.options['height'] = embed[2]
        self.options['div_id'] = random.randint(1,1000)   
 
        if 'showbutton' in self.options:
            divID = "Example%s"%self.options['div_id']     #random.randint(1,1000)
            self.options['divID'] = divID

            if self.options['showbutton'] == "show":
                res = SHOW % (self.options)
                res += HIDE % (self.options)
                res += CODE1 % (self.options)     
                res += CODE % (self.options)
                return [nodes.raw('', res, format='html')]
            else:
                res = SHOW % (self.options) 
                res += HIDE % (self.options)
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




 
