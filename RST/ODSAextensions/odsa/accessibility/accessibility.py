from sphinx.writers.html import HTMLTranslator as SphinxHTMLTranslator
from docutils.nodes import Text
from docutils import nodes
import json

def loadTable():
   try:
      table=open('table.json')
      data = json.load(table)
      table.close()
      return data
   except IOError:
      print('ERROR: No table.json file.')


class HTMLTranslator(SphinxHTMLTranslator):
    def visit_literal_block(self, node):
        try:
            SphinxHTMLTranslator.visit_literal_block(self, node)
        except nodes.SkipNode:
            if self.body:
                self.body[-1] = self.body[-1].replace('<pre', '<pre tabindex="0"')
            raise nodes.SkipNode

def setup(app):
    app.set_translator('html', HTMLTranslator)
