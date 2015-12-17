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

def print_err(err_msg):
  sys.stderr.writelines('CODEINCLUDE ERROR: %s\n' % err_msg)


def setup(app):
  app.add_directive('codeinclude',codeinclude)


class codeinclude(Directive):
  """
  The codeinclude directive simply match to ReST directive ``.. literalinclude``.
  """

  has_content = False
  required_arguments = 1
  optional_arguments = 1
  final_argument_whitespace = False
  option_spec = {
    'tag': directives.unchanged_required,
    'lang': directives.unchanged_required,
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

    rel_filename = self.arguments[0]
    filename = conf.sourcecode_path + rel_filename
    file_found = False
    code_nodes = []

    # If the codeinclude is given the full path to a specific file load that file rather than attempting to use multiple languages
    if os.path.isfile(filename):
      # Parse the code language from the relative filename
      path_components = rel_filename.split('/')
      lang = path_components[0] if len(path_components) > 0 and os.path.isdir(path_components[0]) else 'guess'

      code_nodes.append(self.create_node(filename, rel_filename, lang))
      file_found = True
    else:
      # Search for the code in multiple different languages
      # Remove the extension from the file, if it exists
      rel_path = os.path.splitext(rel_filename)[0]
      html_strs = []
      tag_str = ''

      if 'tag' in self.options:
        tag_str = '_' + self.options.get('tag').replace(" ", "-").replace(",", "_")

      # Use the name of the code file and the tag name (if it exists) to create a unique ID
      # The ID must be unique per module page (even if there are other codeincludes
      # on the same module) so that the jQuery call to tabs() will work properly
      tab_id = '%s%s_code' % (os.path.basename(rel_path), tag_str)
      tab_header = '<div id="%s"><ul>' % tab_id

      # Load the code_lang object from conf.py and maintain the order so that the preferred languages and extensions come first
      code_lang = json.loads(conf.code_lang, object_pairs_hook=collections.OrderedDict)

      # Loop through each language and associated extension (in order)
      for lang in code_lang:
        # If a specific language was provided as a parameter, set lang to the language provided before looping through extensions
        if 'lang' in self.options:
          lang = self.options['lang']

        if 'lang' in code_lang[lang]:
          code_color = code_lang[lang]['lang']
        else:
          print_err('Failed to find language name in configuration file ("lang" option)')
          return [document.reporter.warning('Missing "lang" option in code_lang configuration',
                        line=self.lineno)]

        if 'ext' not in code_lang[lang]:
          print_err('Failed to find language extentions in configuration file ("ext" option)')
          return [document.reporter.warning('Missing "ext" option in code_lang configuration',
                        line=self.lineno)]

        for ext in code_lang[lang]['ext']:
          # Craft the filename given the code_dir, code_lang, rel_path (with any existing extension stripped), and a file extension
          filename = '%s%s/%s.%s' % (conf.sourcecode_path, lang, rel_path, ext)

          if os.path.isfile(filename):
            # Append a list element with a link which will allow switching between the tabs
            block_id = '_'.join([tab_id, lang.replace('+', 'p')])
            tab_label = lang
            if 'label' in code_lang[lang]:
              tab_label = code_lang[lang]['label']
            tab_header += '<li><a href="#%s">%s</a></li>' % (block_id, tab_label.title())

            if len(html_strs) == 0:
              html_strs.append('<div id="%s">' % block_id)
            else:
              html_strs[-1] += '<div id="%s">' % block_id

            html_strs.append('</div>')

            new_node = self.create_node(filename, rel_filename, code_color)

            # If the new_node returned is a list, an error occurred in create_node
            # Return the list containing the error info
            if type(new_node) is list:
              return new_node

            code_nodes.append(new_node)
            file_found = True

            # Stop after finding one code file if tabbed code is not enabled or if we are only searching for a single language
            if not conf.tabbed_codeinc or 'lang' in self.options:
              break

        # If a file is found and tabbed code is not enabled or if the code language was specified by a parameter to the directive, break out of the loop
        if (file_found and not conf.tabbed_codeinc) or 'lang' in self.options:
          break

      # Print an error message if no file is found for any language
      if not file_found:
        print_err('File %r not found for any language' % filename)
        return [document.reporter.warning(
          'File %r not found for any language' % filename, line=self.lineno)]

      # Append the rest of the HTML for the header of the tabbed container and the JavaScript necessary to create the tabs
      if len(html_strs) > 0:
        html_strs[0] = tab_header + '</ul>' + html_strs[0]
        # Link to additional jQuery UI libraries, so we don't load it on pages where its not needed
        lib_path = os.path.relpath(conf.odsa_path,conf.ebook_path) + '/lib'
        html_strs[-1] += '</div><script>$(function() {$( "#%s" ).tabs();});</script>' % (tab_id)

    # If only one code block exists, print the code normally
    if len(code_nodes) == 1:
      return code_nodes

    # If multiple code blocks exist, wrap each one in the HTML nodes that will form the tabbed container
    node_list = []
    node_num = 0

    for html_str in html_strs:
      node_list.append(nodes.raw('', html_str, format='html'))

      if node_num < len(code_nodes):
        node_list.append(code_nodes[node_num])
        node_num += 1

    return node_list


  def create_node(self, filename, rel_filename, lang):
    document = self.state.document
    env = document.settings.env

    # Read the contents of the file to include
    encoding = self.options.get('encoding', env.config.source_encoding)
    codec_info = codecs.lookup(encoding)

    try:
      f = codecs.StreamReaderWriter(open(filename, 'rb'),
          codec_info[2], codec_info[3], 'strict')
      lines = f.readlines()
      f.close()
    except (IOError, OSError):
      print_err('Failed to read %r' % filename)
      return [document.reporter.warning(
        'Include file %r not found or reading it failed' % filename,
        line=self.lineno)]
    except UnicodeError:
      print_err('Encoding %r used for reading included file %r seems to '
        'be wrong, try giving an :encoding: option' %
        (encoding, filename))
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
      # If no :tag: is specified, print the entire code file
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
      tags_counter = 0

      for tag in tags:
        use = False
        startafter = '/* *** ODSATag: %s *** */' % tag
        endbefore  = '/* *** ODSAendTag: %s *** */' % tag

        for line in lines:
          if startafter in line:
            use = True
            tags_counter += 1
          elif endbefore in line:
            use = False
            tags_counter += 1
          elif '/* *** ODSA' in line:
            # Ignore tag comments
            pass
          elif use:
            res.append(line)

        if tags_counter == 0:
          print_err('Tag "%s" not found in %s. Make sure the tag in your module file matches the delimiter in the source code file.' % (tag, filename))
          return [document.reporter.warning('Tag "%s" not found in %s. Make sure the tag in your module file matches the delimiter in the source code file.' % (tag, filename), line=self.lineno)]
        elif tags_counter == 1:
          print_err('Begin or end tag (%s) missing from %s. Please verify your source code file.' % (tag, filename))
          return [document.reporter.warning('Begin or end tag (%s) missing from %s. Please verify your source code file.' % (tag, filename), line=self.lineno)]

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
    # Likewise for "Java_Generic" -- this is meant to be a temporary hack
    #lang = 'java' if ((lang == 'processing') or (lang == 'java_generic')) else lang
    retnode['language'] = lang #self.options['language']

    if 'linenos' in self.options:
      retnode['linenos'] = True

    if hl_lines is not None:
      retnode['highlight_args'] = {'hl_lines': hl_lines}

    env.note_dependency(rel_filename)

    return retnode

source = """\
This is some text.

.. codeinclude:: address
   :lang:
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
