from docutils import nodes
from docutils.parsers.rst import directives
from docutils.parsers.rst import Directive
import random
import os, sys
import urllib.request, urllib.parse, urllib.error
sys.path.append(os.path.abspath('./source'))
import conf

def setup(app):
  app.add_directive('splicetoolembed',splicetoolembed)

splicetoolembed_HTML = '''\
  <div style="text-align: center;">
  <iframe id="%(name)s"
      src="%(splicetoolembed_src)s"
      width="%(width)s" height="%(height)s"
      frameborder="1" marginwidth="0" marginheight="0"
    scrolling="no">
  </iframe>
  </div>
'''

class splicetoolembed(Directive):
  required_arguments = 1
  optional_arguments = 4
  final_argument_whitespace = True
  has_content = True
  option_spec = {
                  'height': directives.unchanged,
                  'width': directives.unchanged,
                  'name': directives.unchanged,
                  'absolute_url': directives.flag,
                  }

# Original splicetoolembed run method for setting splicetoolembed 
  # def run(self):
  #   splicetoolembed_src = self.arguments[0]

  #   if 'height' not in self.options:
  #     self.options['height'] = 650

  #   if 'width' not in self.options:
  #     self.options['width'] = 950

  #   if 'name' not in self.options:
  #     self.options['name'] = os.path.basename(splicetoolembed_src).partition('.')[0]

  #   if 'absolute_url' in self.options:
  #     self.options['splicetoolembed_src'] = splicetoolembed_src
  #   else:
  #     self.options['splicetoolembed_src'] = os.path.relpath(conf.exercises_dir, conf.ebook_path) + \
  #                                             '/%s' % splicetoolembed_src 

  #   res = splicetoolembed_HTML % (self.options)
  #   return [nodes.raw('', res, format='html')]
  
  # modified splicetoolembed run method for calling splicetoolembed origin instead of a path
  def run(self):
    splicetoolembed_src = self.arguments[0]

    # Initially assume the splicetoolembed_src is relative
    resolved_splicetoolembed_src = os.path.relpath(conf.exercises_dir, conf.ebook_path) + '/%s' % splicetoolembed_src

    # Check if the URL is absolute. If it is, use it directly without any modification.
    if splicetoolembed_src.startswith('http://') or splicetoolembed_src.startswith('https://'):
        resolved_splicetoolembed_src = splicetoolembed_src

    # Set the resolved splicetoolembed source
    self.options['splicetoolembed_src'] = resolved_splicetoolembed_src

    # Setting default options if not provided in the RST file
    if 'height' not in self.options:
        self.options['height'] = 650

    if 'width' not in self.options:
        self.options['width'] = 950

    if 'name' not in self.options:
        self.options['name'] = os.path.basename(splicetoolembed_src).partition('.')[0]

    res = splicetoolembed_HTML % self.options
    return [nodes.raw('', res, format='html')]


if __name__ == '__main__':
  from docutils.core import publish_parts

  directives.register_directive('splicetoolembed',splicetoolembed)

  doc_parts = publish_parts(source,
          settings_overrides={'output_encoding': 'utf8',
          'initial_header_level': 2},
          writer_name="html")

  print(doc_parts['html_body'])