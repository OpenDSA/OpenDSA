import sys
import urllib
from docutils import nodes, utils
from docutils.parsers.rst import Directive
from docutils.parsers.rst import directives, states
from docutils.nodes import fully_normalize_name, whitespace_normalize_name
from docutils.parsers.rst.roles import set_classes
from docutils.parsers.rst.directives.images import Figure, Image


try: # check for the Python Imaging Library
    import PIL.Image
except ImportError:
    try:  # sometimes PIL modules are put in PYTHONPATH's root
        import Image
        class PIL(object): pass  # dummy wrapper
        PIL.Image = Image
    except ImportError:
        PIL = None


def setup(app):
    app.add_directive('odsafig',odsafig)



class odsafig(Figure):

    #caption text-align CSS rule
    def capalign(argument):
        # This is not callable as self.align.  We cannot make it a
        # staticmethod because we're saving an unbound method in
        # option_spec below.
        return directives.choice(argument, ['left','right','center','justify','inherit'])

    def align(argument):
        return directives.choice(argument, Figure.align_h_values)

    def figwidth_value(argument):
        if argument.lower() == 'image':
            return 'image'
        else:
            return directives.length_or_percentage_or_unitless(argument, 'px')

    option_spec = Image.option_spec.copy()
    option_spec['figwidth'] = figwidth_value
    option_spec['figclass'] = directives.class_option
    option_spec['align'] = align
    option_spec['capalign'] = capalign
    has_content = True

    def run(self):
        figwidth = self.options.pop('figwidth', None)
        figclasses = self.options.pop('figclass', None)
        align = self.options.pop('align', None)
        capalign = self.options.pop('capalign', None)
        (image_node,) = Image.run(self)
        if isinstance(image_node, nodes.system_message):
            return [image_node]
        figure_node = nodes.figure('', image_node)
        if figwidth == 'image':
            if PIL and self.state.document.settings.file_insertion_enabled:
                imagepath = urllib.url2pathname(image_node['uri'])
                try:
                    img = PIL.Image.open(
                            imagepath.encode(sys.getfilesystemencoding()))
                except (IOError, UnicodeEncodeError):
                    pass # TODO: warn?
                else:
                    self.state.document.settings.record_dependencies.add(
                        imagepath.replace('\\', '/'))
                    figure_node['width'] = img.size[0]
                    del img
        elif figwidth is not None:
            figure_node['width'] = figwidth
        if figclasses:
            figure_node['classes'] += figclasses
        if align:
            figure_node['align'] = align
        if self.content:
            node = nodes.Element()          # anonymous container for parsing
            self.state.nested_parse(self.content, self.content_offset, node)
            first_node = node[0]
            if isinstance(first_node, nodes.paragraph):
                caption = nodes.caption(first_node.rawsource, '',
                                        *first_node.children)
                caption['align']= capalign 
                figure_node += caption
            elif not (isinstance(first_node, nodes.comment)
                      and len(first_node) == 0):
                error = self.state_machine.reporter.error(
                      'Figure caption must be a paragraph or empty comment.',
                      nodes.literal_block(self.block_text, self.block_text),
                      line=self.lineno)
                return [figure_node, error]
            if len(node) > 1:
                figure_node += nodes.legend('', *node[1:])
        return [figure_node]

