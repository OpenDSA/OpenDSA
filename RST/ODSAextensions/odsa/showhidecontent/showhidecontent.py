from docutils.parsers.rst import Directive
from docutils.parsers.rst import directives
from docutils import nodes
import re
import json
import conf

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

content_html = "<div id='%s' style='display: %s' data-type='analysis_text'>%s</div>"

def showhide(argument):
  """Conversion function for the "showhide" option."""
  return directives.choice(argument, ('show', 'hide', 'none'))

class showhidecontent(Directive):
  required_arguments = 1
  optional_arguments = 2
  has_content = True
  final_argument_whitespace = True
  option_spec = {
   'long_name': directives.unchanged,
   'showhide': showhide
  }

  def run (self):
    # Load translation
    langDict = loadTable()
    res = ''

    section_id = self.arguments[0]

    # If a display name is provided, use that for the button text
    # If not, use the section identifier (converted from camelcase to space delimited)
    if 'long_name' in self.options:
      button_text = self.options['long_name']
    else:
      button_text = re.sub("([a-z])([A-Z])", "\g<1> \g<2>", section_id)

    # Set the content to display by default
    display = 'block'

    # If 'show', then a show/hide button is displayed and the content is displayed by default
    # If 'hide', then a show/hide button is displayed and the content is hidden by default
    # If 'none' or showhide is omitted, then the content is displayed with no button
    if 'showhide' not in self.options or self.options['showhide'] == 'none':
      button = ''
    elif self.options['showhide'] == 'show':
      button = button_html % (section_id, langDict['hide'], button_text)
    elif self.options['showhide'] == 'hide':
      button = button_html % (section_id, langDict['show'], button_text)
      display = 'none'

    res = anchor_html % section_id
    res += button + content_html % (section_id, display, '<br>'.join(self.content))

    return [nodes.raw('', res, format='html')]
