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

import random
import os, sys
import re
import json
import re
import warnings

from docutils import nodes, utils
from docutils.parsers.rst import roles
from docutils.parsers.rst import directives
from docutils.parsers.rst.languages import en as _fallback_language_module

from sphinx import addnodes
from sphinx.locale import _
from sphinx.util import ws_re
from sphinx.util.nodes import split_explicit_title


def setup(app):
    roles.register_canonical_role('numref', numref_role)

def loadTable():
   try:
      table=open('table.json')
      data = json.load(table)
      table.close()
      return data
   except IOError:
      print 'ERROR: No table.json file.'


def numref_role(typ, rawtext, etext, lineno, inliner,
                     options={}, content=[]):
    """Role for numbered cross references"""
    env = inliner.document.settings.env
    if not typ:
        typ = env.config.default_role
    else:
        typ = typ.lower()
    text = utils.unescape(etext)
    targetid = 'index-%s' % env.new_serialno('index')
#    indexnode = addnodes.index()
    targetnode = nodes.target('', '', ids=[targetid])
    inliner.document.note_explicit_target(targetnode)
    syn = 0
    if '<' in text:
       syn = 1
    if '>' in text:
       syn +=1
    if syn != 0 and syn != 2 :
       msg = inliner.reporter.error('Syntax error label %s' % text,
                                         line=lineno)
       prb = inliner.problematic(rawtext, rawtext, msg)
       return [prb], [msg]
    if syn == 2:
       desc = re.split('<', text, re.IGNORECASE)[0].rstrip()
       lab = re.split('>',re.split('<', text, re.IGNORECASE)[1], re.IGNORECASE)[0]
    if syn == 0:
       desc=''
       lab = text
    if typ == 'numref':
#        indexnode['entries'] = [('single', 'ref %s' % text,
#                                 targetid, 'ref %s' % text)]
        level = 0
        try:
            json_data = loadTable()
            if lab in json_data:
                xrefs = json_data[lab]
                if '#' in xrefs:
                   level = 2
                   xrefs = xrefs[:-1]
                   v = xrefs.split('.')
                   if len(v) > 2:
                      pr = '%s.%s' %(v[0],v[1])
                      for obj, val in json_data.items():
                         if val == pr:
                            parent = obj

            else:
                msg = inliner.reporter.error('invalid reference label %s' % lab,
                                         line=lineno)
                prb = inliner.problematic(rawtext, rawtext, msg)
                return [prb], [msg]
        except ValueError:
            msg = inliner.reporter.error('invalid reference label %s' % text,
                                         line=lineno)
            prb = inliner.problematic(rawtext, rawtext, msg)
            return [prb], [msg]

        if level == 2:
           ref = '%s.html#%s' %(parent, lab)
        else:
           ref = '%s.html' % lab
        if not desc.isspace() and len(desc) > 1:
           sn = nodes.strong(' '+xrefs+' '+desc, ' '+xrefs+' '+desc)
        else:
           sn = nodes.strong(' '+xrefs, ' '+xrefs)
        rn = nodes.reference('', '', internal=False, refuri=ref,
                             classes=[typ])
        rn += sn
        return [rn], []

roles.register_canonical_role('numref', numref_role)


if __name__ == '__main__':

    roles.register_canonical_role('numref', numref_role)

