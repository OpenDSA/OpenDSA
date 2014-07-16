from docutils.parsers.rst import Directive
from docutils.parsers.rst import directives
from docutils import nodes
from docutils.nodes import Element, Text
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

#Define the HTML output
anchor_html = "<a id='%s_anchor'></a>"

button_html = '''<input type='button'
                   id="%s_showhide_btn"
                   class = 'showHideLink' value='%s %s'/>'''

content_html = "<div id='%s' style='display: %s' data-type='analysis_text'>%s</div>"

def showhide(argument):
  """Conversion function for the "showhide" option."""
  return directives.choice(argument, ('show', 'hide', 'none'))

def html_visit_containersection(self, node):
   self.body.append(self.starttag(node, 'div', ))

def html_depart_containersection(self, node):
    self.body.append('</div>\n')

def html_visit_anchorsection(self, node):
    self.body.append(self.starttag(node, 'a', **node.attributes))


def html_depart_anchorsection(self, node):
    self.body.append('</a>\n')

def html_visit_buttonsection(self, node):
    self.body.append(self.starttag(node, 'input', **node.attributes))


def html_depart_buttonsection(self, node):
    self.body.append('</input>\n')




def html_visit_showhidecontent(self, node):
    print "*******MMMM*****\n" *5
    print node
    self.body.append(self.starttag(node, 'div', **node.attributes))


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

    # If 'show', then a show/hide button is displayed and the content is displayed by default
    # If 'hide', then a show/hide button is displayed and the content is hidden by default
    # If 'none' or showhide is omitted, then the content is displayed with no button
    #if 'showhide' not in self.options or self.options['showhide'] == 'none':
    #  button = ''
    #elif self.options['showhide'] == 'show':
    #  button = button_html % (section_id, langDict['hide'], button_text)
    if self.options['showhide'] == 'hide':
    #  button = button_html % (section_id, langDict['show'], button_text)
      display = 'none'



    anchor_node = anchorsection()
    anchor_node.attributes['ids'] = section_id
 
    button_node = buttonsection()
    button_node.attributes['type'] ='button'
    button_node.attributes['ids'] = "%s_showhide_btn" %section_id

    showhide_node = showhidesection()
    showhide_node.attributes['section_id'] = section_id
    showhide_node.attributes['long_name'] = button_text
    showhide_node.attributes['showhide'] = showhide
    showhide_node.attributes['ids'] = section_id
    showhide_node.attributes['style'] = 'display: %s' %display 
    showhide_node.attributes['data-type'] ='analysis_text'

    super_node = containersection()
    super_node += anchor_node
    if self.options['showhide'] == 'show':
      button_node.attributes['value'] = '%s %s' %( langDict['hide'], button_text)
      super_node += button_node
    if self.options['showhide'] == 'hide':
      button_node.attributes['value'] = '%s %s' %( langDict['show'], button_text)
      super_node += button_node    
    
    if self.content:
      node = nodes.Element()          # anonymous container for parsing
      self.state.nested_parse(self.content, self.content_offset, node)
      showhide_node +=  nodes.legend('', *node)
      super_node += showhide_node
    return  [super_node] #[showhide_node]   

 
    #res = anchor_html % section_id
    #@res += button + content_html % (section_id, display, '<br>'.join(self.content))

    #return [nodes.raw('', res, format='html')]
