from docutils.parsers.rst import Directive
from docutils import nodes
import conf
import json

def loadTable():
   try:
      table=open(conf.translation_file)
      data = json.load(table)
      table.close()
      if conf.language in data:
         return dict(data[conf.language]['jinja'].items() + data[conf.language]['js'].items())
      else:
         return dict(data['en']['jinja'].items() + data['en']['js'].items())
   except IOError:
      print 'ERROR: No table.json file.'
	  
def setup(app):
  app.add_directive('showhidecontent', showhidecontent)
 
class showhidecontent(Directive):
  required_arguments = 0
  optional_arguments = 1
  has_content = True
  def run (self):
    # Load translation
    langDict = loadTable() 
	
    res = ''
    button_html = "<input type='button' class = 'showHideLink' value='Show/hide content'/>"
    content_html = "<div>%s</div>" %(self.content) 
    if len(self.arguments) == 0:
	  res = button_html
    elif self.arguments[0] == 'showhide':
	  res = button_html
    elif self.arguments[0] == "show":
      res = content_html
    elif self.arguments[0] == "hide":
      pass	
    return [nodes.raw('', res, format='html')]
    
