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
    name="%(name)s" 
    value="Show %(val)s" 
    id="%(divID)s+show"
    class="showLink" 
    style="background-color:#f00;"/>
<div id="%(divID)s" 
    class="more">
"""

HIDE = """\
<input type="button"
    name="%(name)s"
    value="Hide %(val)s"
    id="%(divID)s+hide"
    class="hideLink"
    style="background-color:#f00;"/>
</div> 
"""



def avembed(name, args, options, content, lineno,
            contentOffset, blockText, state, stateMachine):
    """ Restructured text extension for inserting embedded AVs with show/hide button """
    if len(content) == 0:
        return
    string_vars = {
        'address': content[0],
        'name': '',
        'val': '',
        'divID': '' 
        }
    extra_args = content[1:] # Because content[0] is ID
    extra_args = [ea.strip().split("=") for ea in extra_args] # key=value
    extra_args = [ea for ea in extra_args if len(ea) == 2] # drop bad lines
    extra_args = dict(extra_args)
    if 'showbutton' in extra_args:
        string_vars['divID']="Example"+random.randint() 

        if 'name' in extra_args:
            string_vars['name'] = extra_args.pop('name')
            string_vars['val'] = extra_args.pop('name')
        return [nodes.raw('', SHOW % (string_vars) + HIDE % (string_vars) + CODE % (string_vars), format='html')]

    else:
        return [nodes.raw('', CODE % (string_vars), format='html')]  

avembed.content = True   
directives.register_directive('avembed', avembed)   





 
