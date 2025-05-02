from docutils import nodes
from docutils.parsers.rst import directives
from docutils.parsers.rst import Directive
import random
import os, sys
import urllib.request, urllib.parse, urllib.error
sys.path.append(os.path.abspath('./source'))
import conf

def setup(app):
  app.add_directive('iframe',iframe)

IFRAME_HTML = '''\
  <div style="text-align: center;">
  <iframe id="%(name)s"
      src="%(iframe_src)s"
      width="%(width)s" height="%(height)s"
      frameborder="1" marginwidth="0" marginheight="0"
    scrolling="no">
  </iframe>
  </div>
'''

class iframe(Directive):
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

  def run(self):
    iframe_src = self.arguments[0]

    if 'height' not in self.options:
      self.options['height'] = 650

    if 'width' not in self.options:
      self.options['width'] = 950

    if 'name' not in self.options:
      self.options['name'] = os.path.basename(iframe_src).partition('.')[0]

    if 'absolute_url' in self.options:
      self.options['iframe_src'] = iframe_src
    else:
      self.options['iframe_src'] = os.path.relpath(conf.exercises_dir, conf.ebook_path) + \
                                              '/%s' % iframe_src 

    res = IFRAME_HTML % (self.options)
    return [nodes.raw('', res, format='html')]


if __name__ == '__main__':
  from docutils.core import publish_parts

  directives.register_directive('iframe',iframe)

  doc_parts = publish_parts(source,
          settings_overrides={'output_encoding': 'utf8',
          'initial_header_level': 2},
          writer_name="html")

  print(doc_parts['html_body'])