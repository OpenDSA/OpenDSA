"""
    html5
    ~~~~~

    Monkey-patch Sphinx HTML translator to emit HTML5.

    :copyright: Copyright 2011-2013 by Vlad Riscutia and contributors (see
    CONTRIBUTORS file)
    :license: FreeBSD, see LICENSE file.
"""



from sphinx.writers.html import HTMLTranslator as SphinxHTMLTranslator
from docutils.nodes import Text
import json 

def loadTable():
   try:
      table=open('table.json')
      data = json.load(table)
      table.close()
      return data
   except IOError:
      print 'ERROR: No table.json file.'


class HTMLTranslator(SphinxHTMLTranslator):
    def visit_desc_addname(self, node):
        '''
        Similar to Sphinx but using a <code> node instead of <tt>.
        '''
        self.body.append(self.starttag(node, 'code', '', CLASS='descclassname'))



    def depart_desc_addname(self, node):
        '''
        Similar to Sphinx but using a <code> node instead of <tt>.
        '''
        self.body.append('</code>')



    def visit_desc_name(self, node):
        '''
        Similar to Sphinx but using a <code> node instead of <tt>.
        '''
        self.body.append(self.starttag(node, 'code', '', CLASS='descname'))



    def depart_desc_name(self, node):
        '''
        Similar to Sphinx but using a <code> node instead of <tt>.
        '''
        self.body.append('</code>')
    


    def visit_literal(self, node):
        '''
        Similar to Sphinx but using a <code> node instead of <tt>.
        '''
        self.body.append(self.starttag(node, 'code', '',
                                       CLASS='docutils literal'))
        self.protect_literal_text += 1



    def depart_literal(self, node):
        '''
        Similar to Sphinx but using a <code> node instead of <tt>.
        '''
        self.protect_literal_text -= 1
        self.body.append('</code>')


    def visit_topic(self, node):
        json_data = loadTable()
        numbered_label = ''
        if len(node.attributes['ids']) > 0:
            for label in node.attributes['ids']: 
                if label in json_data:
                    xrefs = json_data[label]
                    if '#' in xrefs:
                      xrefs = xrefs[:-1]
                    numbered_label = ' %s' %xrefs
                    break 
        if 'example' in node.children[0].children[0].lower():
            title = str(node.children[0].children[0]) + numbered_label
            node.children[0].children[0] = Text(title)   
        self.body.append(self.starttag(node,'div', CLASS='topic'))
        self.topic_classes = node['classes']

    def depart_topic(self, node):
        self.body.append('</div>\n')
        self.topic_classes = []

    def visit_caption(self, node):
        atts = {'class': 'caption'}
        if node.get('align'):
            atts['style'] = 'text-align: %s' % node['align']
        self.body.append(self.starttag(node, 'p', '', **atts))

    def depart_caption(self, node):
        self.body.append('</p>\n')

    def patch_translator():
        '''
        Monkey-patch Sphinx translator to emit proper HTML5.
        '''
        HTMLTranslator.visit_desc_addname = visit_desc_addname
        HTMLTranslator.depart_desc_addname = depart_desc_addname
        HTMLTranslator.visit_desc_name = visit_desc_name
        HTMLTranslator.depart_desc_name = depart_desc_name
        HTMLTranslator.visit_literal = visit_literal
        HTMLTranslator.depart_literal = depart_literal
        HTMLTranslator.visit_caption = visit_caption
        HTMLTranslator.depart_caption = depart_caption
    

    def visit_citation(self, node):
        self.body.append(self.starttag(node, 'table',
                                       CLASS='docutils citation'))
        self.body.append('<colgroup><col class="label" /><col /></colgroup>\n'
                         '<tbody style="vertical-align: top">\n'
                         '<tr>')
        self.footnote_backrefs(node)



def setup(sphinx):
    sphinx.config.html_translator_class = 'html5.HTMLTranslator'    
