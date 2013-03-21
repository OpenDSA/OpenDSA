"""
    html5
    ~~~~~

    Monkey-patch Sphinx HTML translator to emit HTML5.

    :copyright: Copyright 2011-2013 by Vlad Riscutia and contributors (see
    CONTRIBUTORS file)
    :license: FreeBSD, see LICENSE file.
"""
from sphinx.writers.html import HTMLTranslator as SphinxHTMLTranslator


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
    
    def visit_citation(self, node):
        self.body.append(self.starttag(node, 'table',
                                       CLASS='docutils citation'))
        self.body.append('<colgroup><col class="label" /><col /></colgroup>\n'
                         '<tbody style="vertical-align: top">\n'
                         '<tr>')
        self.footnote_backrefs(node)

def setup(sphinx):
    sphinx.config.html_translator_class = 'html5.HTMLTranslator'    
