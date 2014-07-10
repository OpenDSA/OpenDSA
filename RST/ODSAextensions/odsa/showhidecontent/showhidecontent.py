from docutils.parsers.rst import Directive
from docutils.parsers.rst import directives
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
  
#Define the HTML output
anchor_html = "<a id='%s_anchor'></a>"
button_html = '''<input type='button' 
                   id="%s_showhide_btn" 
                   class = 'showHideLink' value='%s %s'/>'''              
content_html = "<div id='%s' hidden='hidden' data-type='analysis_text'>%s</div>"  
def output(argument):
  """Conversion function for the "showhide" option."""
  return directives.choice(argument, ('show', 'hide', 'showhide','none'))
 
class showhidecontent(Directive):
  required_arguments = 1
  optional_arguments = 1
  has_content = True
  final_argument_whitespace = True
  option_spec = {
                 'output': output
                }
  def run (self):
    # Load translation
    langDict = loadTable() 
    res = ''
    if 'output' not in self.options:
      res = anchor_html %(self.arguments[0]) + button_html %(self.arguments[0], langDict['show'], self.arguments[0]) 
    elif self.options['output'] == 'showhide':  
      res = anchor_html %(self.arguments[0]) + button_html %(self.arguments[0], langDict['show'], self.arguments[0]) + content_html %(self.arguments[0], '<br>'.join(self.content) ) 
    elif self.options['output'] == 'show':
      res = anchor_html %(self.arguments[0]) + content_html %(self.arguments[0], '<br>'.join(self.content))
    elif self.options['output'] == 'hide':
      pass 	
    return [nodes.raw('', res, format='html')]
    
