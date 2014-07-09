from docutils.parsers.rst import Directive
from docutils import nodes



def setup(app):
  app.add_directive('test1',test1)

class test1(Directive):
  def run (self):
    return [nodes.raw('', "<input type='submit' value='test'/>", format='html')]
    
