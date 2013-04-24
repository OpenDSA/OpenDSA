from docutils import nodes
from docutils.nodes import figure, caption, Text, reference, raw, SkipNode, Element, topic
from sphinx.roles import XRefRole
from docutils.parsers.rst import Directive
from docutils.parsers.rst import directives
import json


class odsatable(Element): pass

def loadTable():
   try:
      table=open('table.json')
      data = json.load(table)
      table.close()
      return data
   except IOError:
      print 'ERROR: No table.json file.'

def setup(app):
    app.connect('doctree-read', doctree_read)
    app.add_directive('odsatab',odsatab)
    app.add_node(odsatable, html=(html_visit_odsatable, html_depart_odsatable))


def doctree_read(app, doctree):
    #generate numbers for each table caption 
    env = app.builder.env

    json_data = loadTable()
    i = 0
    module = ''
    num_module = 0
    for odsat_info in doctree.traverse(Element):  
        if env.docname != module:
           i = 1
        if  env.docname in json_data:
            module = env.docname
            num_module = json_data[env.docname]
        if isinstance( odsat_info, odsatable ):
            for cap in odsat_info.traverse(caption):
                cap[0] = Text(" %s %s.%d: %s" % ('Table', num_module, i, cap[0]))
            i += 1

def html_visit_odsatable(self, node):
    self.body.append(self.starttag(node, 'div', CLASS='divdgm'))


def html_depart_odsatable(self, node):
    self.body.append('</div>\n')

class odsatab(Directive):

    #caption text-align CSS rule
    def capalign(argument):
        # This is not callable as self.align.  We cannot make it a
        # staticmethod because we're saving an unbound method in
        # option_spec below.
        return directives.choice(argument, ['left','right','center','justify','inherit'])

    def align(argument):
        return directives.choice(argument, Figure.align_h_values)


    option_spec = {} 
    option_spec['align'] = align
    option_spec['capalign'] = capalign
    has_content = True
    required_arguments = 0
    optional_arguments = 2

    def run(self):
        required_arguments = 0 
        optional_arguments = 2

        align = self.options.pop('align', None)
        capalign = self.options.pop('capalign', None)
        odsatable_node = odsatable()
        odsatable_node['align'] = align
        odsatable_node['capalign'] = capalign
        if align:
            odsatable_node['align'] = align
        if self.content:
            node = nodes.Element()          # anonymous container for parsing
            self.state.nested_parse(self.content, self.content_offset, node)
            first_node = node[0]
            if isinstance(first_node, nodes.paragraph):
                caption = nodes.caption(first_node.rawsource, '',
                                        *first_node.children)
                caption['align']= capalign
                odsatable_node += caption
            elif not (isinstance(first_node, nodes.comment)
                      and len(first_node) == 0):
                error = self.state_machine.reporter.error(
                      'Table caption must be a paragraph or empty comment.',
                      nodes.literal_block(self.block_text, self.block_text),
                      line=self.lineno)
                return [odsatable_node, error]
            if len(node) > 1:
                odsatable_node += nodes.legend('', *node[1:])
        return [odsatable_node]
