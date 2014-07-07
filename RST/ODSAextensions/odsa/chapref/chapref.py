from sphinx.roles import XRefRole 
from docutils.nodes import reference, SkipNode
import json 
import sys

# Prints the given string to standard error
def print_err(err_msg):
  sys.stderr.write('%s\n' % err_msg)


def loadTable():
   try:
      table=open('table.json')
      data = json.load(table)
      table.close()
      return data
   except IOError:
      print_err( 'ERROR: No table.json file.')



class chap_ref(reference):
    pass

class chap_num(reference):
    pass

def html_visit_chap_ref(self, node):
    target = node['reftarget']   #.split('#')
    json_data = loadTable()
    caption = ''
    target_file = ''
    chapter = ''
    if target in json_data:
        chapter = str(json_data[json_data[target]]).split('.')[0]
        target_file = json_data[target]
        if node['refdoc']==target_file:   #target file and curent file are the same  
            link = "#" 
        else:
            link = "%s.html" %(target_file)
        if isinstance( node, chap_ref):
            caption = target
        if isinstance( node, chap_num):
            caption = chapter 
        html = '<a href="%s">%s</a>' %(link,  caption)
        self.body.append(html)
    else:
        print_err( 'WARNING: Missing object reference %s' %target)

    raise SkipNode


def setup(app):
    app.add_node(chap_ref, html=(html_visit_chap_ref, None))
    app.add_node(chap_num, html=(html_visit_chap_ref, None))
    app.add_role('chap', XRefRole(nodeclass=chap_ref))
    app.add_role('numchap', XRefRole(nodeclass=chap_num))
