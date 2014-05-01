# Copyright (C) 2012 Eric Fouh
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the MIT License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
#

__author__ = 'breakid, efouh'

from docutils import nodes
from docutils.parsers.rst import directives
from docutils.parsers.rst import Directive
from sphinx import addnodes
from sphinx.util import parselinenos
from sphinx.util.nodes import set_source_info
import json
import collections
import os, sys
import codecs
sys.path.append(os.path.abspath('./source'))
import conf


def setup(app):
  app.add_directive('codeinclude',codeinclude)


class codeinclude(Directive):
  """
  The codeinclude directive simply match to ReST directive ``.. literalinclude``.
  """

  has_content = False
  required_arguments = 1
  optional_arguments = 0
  final_argument_whitespace = False
  option_spec = {
    'tag': directives.unchanged_required,
  }

  def run(self):
    document = self.state.document

    if not document.settings.file_insertion_enabled:
      return [document.reporter.warning('File insertion disabled',
                        line=self.lineno)]

    if 'pyobject' in self.options and 'lines' in self.options:
      return [document.reporter.warning(
        'Cannot use both "pyobject" and "lines" options',
        line=self.lineno)]

    env = document.settings.env
    rel_filename = self.arguments[0]
    file_found = False

    # Load the code_lang object from conf.py and maintain the order so that the preferred languages and extensions come first
    code_lang = json.loads(conf.code_lang, object_pairs_hook=collections.OrderedDict)

    # Loop through each language and associated extension (in order)
    for lang in code_lang:
      for ext in code_lang[lang]:
        filename = '%s%s/%s.%s' % (conf.sourcecode_path, lang, rel_filename, ext)

        if os.path.exists(filename) and os.path.isfile(filename):
          file_found = True
          break

      if file_found:
        break

    # Print an error message if no file is found for any language
    if not file_found:
      return [document.reporter.warning(
        'Include file %r not found for any language' % filename, line=self.lineno)]

    # Read the contents of the file to include
    encoding = self.options.get('encoding', env.config.source_encoding)
    codec_info = codecs.lookup(encoding)

    try:
      f = codecs.StreamReaderWriter(open(filename, 'rb'),
          codec_info[2], codec_info[3], 'strict')
      lines = f.readlines()
      f.close()
    except (IOError, OSError):
      return [document.reporter.warning(
        'Include file %r not found or reading it failed' % filename,
        line=self.lineno)]
    except UnicodeError:
      return [document.reporter.warning(
        'Encoding %r used for reading included file %r seems to '
        'be wrong, try giving an :encoding: option' %
        (encoding, filename))]

    objectname = self.options.get('pyobject')

    if objectname is not None:
      from sphinx.pycode import ModuleAnalyzer
      analyzer = ModuleAnalyzer.for_file(filename, '')
      tags = analyzer.find_tags()

      if objectname not in tags:
        return [document.reporter.warning(
          'Object named %r not found in include file %r' %
          (objectname, filename), line=self.lineno)]
      else:
        lines = lines[tags[objectname][1]-1 : tags[objectname][2]-1]

    linespec = self.options.get('lines')
    if linespec is not None:
      try:
        linelist = parselinenos(linespec, len(lines))
      except ValueError, err:
        return [document.reporter.warning(str(err), line=self.lineno)]

      # just ignore nonexisting lines
      nlines = len(lines)
      lines = [lines[i] for i in linelist if i < nlines]

      if not lines:
        return [document.reporter.warning(
          'Line spec %r: no lines pulled from include file %r' %
          (linespec, filename), line=self.lineno)]

    linespec = self.options.get('emphasize-lines')
    if linespec:
      try:
        hl_lines = [x+1 for x in parselinenos(linespec, len(lines))]
      except ValueError, err:
        return [document.reporter.warning(str(err), line=self.lineno)]
    else:
      hl_lines = None

    tag_ = self.options.get('tag')
    tags = []
    res  = []
    prepend = self.options.get('prepend')
    append  = self.options.get('append')

    if tag_ is None:
      for line in lines:
        if not line.startswith('/* *** ODSA'):
          res.append(line)
    else:
      tag_ = tag_.replace(" ","")
      tags = tag_.split(',')

      # Extract code snippets from the file based on named tag(s)
      # i.e.
      # /* *** ODSATag: [tag_name] *** */
      # [code_to_be_displayed]
      # /* *** ODSAendTag: [tag_name] *** */
      for tag in tags:
        startafter = '/* *** ODSATag: %s *** */' % tag
        endbefore  = '/* *** ODSAendTag: %s *** */' % tag

        if startafter is not None or endbefore is not None:
          use = not tag  #startafter
          tags_counter = 0
          for line in lines:
            if not use and startafter and startafter in line:
              use = True
              tags_counter = tags_counter + 1
            elif use and endbefore and endbefore in line:
              use = False
              tags_counter = tags_counter + 1
              break
            elif use and '/* *** ODSA' in line and startafter not in line:
              pass
            elif use:
              res.append(line)

          if tags_counter == 0:
            return [document.reporter.warning(str("Tag not found. Make sure the tag in your module file matches the delimiter in the source code file."), line=self.lineno)]
          elif tags_counter == 1:
            return [document.reporter.warning(str("Begin or end tag missing. Please verify your source code file."), line=self.lineno)]

    lines = res
    if prepend:
       lines.insert(0, prepend + '\n')
    if append:
       lines.append(append + '\n')

    text = ''.join(lines)

    if self.options.get('tab-width'):
      text = text.expandtabs(self.options['tab-width'])

    retnode = nodes.literal_block(text, text, source=filename)
    set_source_info(self, retnode)

    # Set the highlighting language based on the language of the file that was actually loaded
    lang = lang.lower()
    # Pygments doesn't understand 'processing' so set the highlight language to 'java'
    lang = 'java' if lang == 'processing' else lang
    retnode['language'] = lang #self.options['language']

    if 'linenos' in self.options:
      retnode['linenos'] = True

    if hl_lines is not None:
      retnode['highlight_args'] = {'hl_lines': hl_lines}

    env.note_dependency(rel_filename)
    return [retnode]


source = """\
This is some text.

.. codeinclude:: address
   :tag:


This is some more text.
"""

if __name__ == '__main__':
  from docutils.core import publish_parts

  directives.register_directive('codeinclude',codeinclude)

  doc_parts = publish_parts(source,
      settings_overrides={'output_encoding': 'utf8',
      'initial_header_level': 2},
      writer_name="html")

  print doc_parts['html_body']
