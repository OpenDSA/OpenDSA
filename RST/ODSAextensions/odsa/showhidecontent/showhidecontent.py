from docutils.parsers.rst import Directive
from docutils.parsers.rst import directives
from docutils import nodes
from docutils.nodes import Element
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

BUTTON_HTML = '''
<input type="button" id="%(section_id)s_showhide_btn" data-target="%(section_id)s_content" class="showHideLink" value="%(value)s" />
'''

HEADER_HTML = '''
<div id="%(section_id)s" class="hideable_content_container">
  %(button)s
  <div id="%(section_id)s_content" style="display: %(display)s">
'''

FOOTER_HTML = '''
  </div>
</div>
'''

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

    template_args = {
      'button': '',
      'display': 'block',       # Set the content to display by default
      'section_id': section_id
    }

    if 'showhide' in self.options:
      if self.options['showhide'] == 'show':
        template_args['value'] = '%s %s' %( langDict['hide'], button_text)
        template_args['button'] = BUTTON_HTML % template_args
      elif self.options['showhide'] == 'hide':
        template_args['value'] = '%s %s' %( langDict['show'], button_text)
        template_args['button'] = BUTTON_HTML % template_args
        template_args['display'] = 'none'
    else:
      self.options['showhide'] = 'none'


    node_list = []

    # Parse the contents of the directive with Sphinx
    # node.children will be an array of raw HTML nodes containing the parsed text
    if self.content:
      node = nodes.Element()          # anonymous container for parsing
      self.state.nested_parse(self.content, self.content_offset, node)
      node_list = node.children

    # Add raw HTML nodes for the header and footer to the list
    node_list.insert(0, nodes.raw('', HEADER_HTML % template_args, format='html'))
    node_list.append(nodes.raw('', FOOTER_HTML, format='html'))

    return node_list
