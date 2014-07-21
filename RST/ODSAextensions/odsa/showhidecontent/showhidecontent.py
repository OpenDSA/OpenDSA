from docutils.parsers.rst import Directive
from docutils.parsers.rst import directives
from docutils import nodes
from docutils.nodes import Element
import re
import json
import conf


class anchorsection(Element) : pass
class buttonsection(Element) : pass
class showhidesection(Element) : pass
class containersection(Element): pass

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
  app.add_node(anchorsection, html=(html_visit_anchorsection, html_depart_anchorsection))
  app.add_node(buttonsection, html=(html_visit_buttonsection, html_depart_buttonsection))
  app.add_node(showhidesection, html=(html_visit_showhidecontent, html_depart_showhidecontent))
  app.add_node(containersection, html=(html_visit_containersection, html_depart_containersection))


def showhide(argument):
  """Conversion function for the "showhide" option."""
  return directives.choice(argument, ('show', 'hide', 'none'))

def html_visit_containersection(self, node):
   self.body.append(self.starttag(node, 'div', ))

def html_depart_containersection(self, node):
    self.body.append('</div>\n')

def html_visit_anchorsection(self, node):
    self.body.append('<a id="%s">' %node.attributes['ids'])

def html_depart_anchorsection(self, node):
    self.body.append('</a>\n')

def html_visit_buttonsection(self, node):
    atts = {}
    atts['type'] = node.attributes['type']
    atts['ids'] = node.attributes['ids']
    atts['class'] = node.attributes['class']
    atts['value'] = node.attributes['value']
    self.body.append('<input type="%(type)s" id="%(ids)s" class="%(class)s" value="%(value)s">' %node.attributes)


def html_depart_buttonsection(self, node):
    self.body.append('</input>\n')




def html_visit_showhidecontent(self, node):
    self.body.append('<div id="%(ids)s" style="%(style)s" data-type="analysis_text">' %node.attributes)


def html_depart_showhidecontent(self, node):
    self.body.append('</div>\n')


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

     #Set the content to display by default
    display = 'block'

    if 'showhide' in self.options and self.options['showhide'] == 'hide':
      display = 'none'



    anchor_node = anchorsection()
    anchor_node.attributes['ids'] = section_id
 
    button_node = buttonsection()
    button_node.attributes['type'] ='button'
    button_node.attributes['ids'] = "%s_showhide_btn" %section_id
    button_node.attributes['class'] = 'showHideLink'

    showhide_node = showhidesection()
    showhide_node.attributes['section_id'] = section_id
    showhide_node.attributes['long_name'] = button_text
    showhide_node.attributes['showhide'] = showhide
    showhide_node.attributes['ids'] = section_id
    showhide_node.attributes['style'] = 'display:%s' %display 
    showhide_node.attributes['data-type'] ='analysis_text'

    super_node = containersection()
    super_node += anchor_node
    if 'showhide' in self.options and self.options['showhide'] == 'show':
      button_node.attributes['value'] = '%s %s' %( langDict['hide'], button_text)
      super_node += button_node
    if 'showhide' in self.options and self.options['showhide'] == 'hide':
      button_node.attributes['value'] = '%s %s' %( langDict['show'], button_text)
      super_node += button_node    
    
    if self.content:
      node = nodes.Element()          # anonymous container for parsing
      self.state.nested_parse(self.content, self.content_offset, node)
      showhide_node +=  nodes.description('', *node)
      super_node += showhide_node
    return  [super_node]    

 
