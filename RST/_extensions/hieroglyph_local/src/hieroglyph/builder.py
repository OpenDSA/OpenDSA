"""Available slide building classes."""

import json
import os

from docutils import nodes
import sphinx
from sphinx.builders.html import StandaloneHTMLBuilder
from sphinx.builders.singlehtml import SingleFileHTMLBuilder
from sphinx.builders.dirhtml import DirectoryHTMLBuilder

from hieroglyph import writer
from hieroglyph import directives

from sphinx.theming import HTMLThemeFactory
from sphinx.util.fileutil import copy_asset

def building_slides(app):
    """Returns True if building Slides."""

    return isinstance(app.builder, AbstractSlideBuilder)


class AbstractSlideBuilder(object):

    add_permalinks = False
    default_translator_class = writer.SlideTranslator

    def get_builtin_theme_dirs(self):
        return [
            os.path.join(os.path.dirname(__file__), 'themes',)
        ]

    def get_theme_config(self):
        """Return the configured theme name and options."""

        return self.config.slide_theme, self.config.slide_theme_options

    def get_theme_options(self):
        """Return a dict of theme options, combining defaults and overrides."""

        overrides = self.get_theme_config()[1]
        return self.theme.get_options(overrides)

    def init_templates(self):
        themename, themeoptions = self.get_theme_config()

        self.create_template_bridge()
        self._theme_stack = []
        self._additional_themes = []

        self.theme = self.theme_options = None
        self.apply_theme(themename, themeoptions)

    def apply_theme(self, themename, themeoptions):
        """Apply a new theme to the document.

        This will store the existing theme configuration and apply a new one.

        """

        # push the existing values onto the Stack
        self._theme_stack.append(
            (self.theme, self.theme_options)
        )

        theme_factory = HTMLThemeFactory(self.app)
        # theme_factory.load_additional_themes(self.get_builtin_theme_dirs() + self.config.slide_theme_path)
        # commented out for Sphinx 8 compatibility/patch

        self.theme = theme_factory.create(themename)
        self.theme_options = themeoptions.copy()
        self.templates.init(self, self.theme)
        self.templates.environment.filters['json'] = json.dumps

        if self.theme not in self._additional_themes:
            self._additional_themes.append(self.theme)

    def pop_theme(self):
        """Disable the most recent theme, and restore its predecessor."""

        self.theme, self.theme_options = self._theme_stack.pop()

    def prepare_writing(self, docnames):

        super(AbstractSlideBuilder, self).prepare_writing(docnames)

        # override items in the global context if needed
        if self.config.slide_title:
            self.globalcontext['docstitle'] = self.config.slide_title

    def get_doc_context(self, docname, body, metatags):

        context = super(AbstractSlideBuilder, self).get_doc_context(
            docname, body, metatags,
        )

        if self.theme:
            context.update(dict(
                style=self.theme.get_config('theme', 'stylesheet'),
            ))

        return context

    def write_doc(self, docname, doctree):

        slideconf = directives.slideconf.get(doctree)
        if slideconf:
            slideconf.apply(self)

        result = super(AbstractSlideBuilder, self).write_doc(docname, doctree)

        if slideconf:
            # restore the previous theme configuration
            slideconf.restore(self)

        return result

    def post_process_images(self, doctree):
        """Pick the best candidate for all image URIs."""

        super(AbstractSlideBuilder, self).post_process_images(doctree)

        # figure out where this doctree is in relation to the srcdir
        relative_base = (
            ['..'] *
            doctree.attributes.get('source')[len(self.srcdir) + 1:].count('/')
        )

        for node in doctree.traverse(nodes.image):

            if node.get('candidates') is None:
                node['candidates'] = ('*',)

            # fix up images with absolute paths
            if node['uri'].startswith(str(self.outdir)):
                node['uri'] = '/'.join(
                    relative_base + [
                        node['uri'][len(str(self.outdir)) + 1:]
                    ]
                )

    def copy_static_files(self):
        result = super(AbstractSlideBuilder, self).copy_static_files()

        # add context items for search function used in searchtools.js_t
        ctx = self.globalcontext.copy()
        ctx.update(self.indexer.context_for_searchtool())

        from sphinx.jinja2glue import BuiltinTemplateLoader
        templateRenderer = BuiltinTemplateLoader()
        staticdir = os.path.join(self.outdir, '_static')

        for theme in self._additional_themes[1:]:
            themeentries = [os.path.join(themepath, 'static')
                            for themepath in theme.get_theme_dirs()[::-1]]
            templateRenderer.init(self, dirs=themeentries)
            for entry in themeentries:
                copy_asset(entry, staticdir, context=ctx, renderer=templateRenderer)

        return result


class DirectorySlideBuilder(AbstractSlideBuilder, DirectoryHTMLBuilder):
    """This is the standard Directory Slide HTML builder.

    Its output is a directory with HTML files, where each file is
    called ``index.html`` and placed in a subdirectory named like its
    page name. For example, the document ``markup/rest.rst`` will not
    result in an output file ``markup/rest.html``, but
    ``markup/rest/index.html``. When generating links between pages,
    the ``index.html`` is omitted, so that the URL would look like
    ``markup/rest/``.

    The output directry will include any needed style sheets, slide
    table, and presenter's console JavaScript.

    Its name is ``dirslides``.

    """

    name = 'dirslides'


class SlideBuilder(AbstractSlideBuilder, StandaloneHTMLBuilder):
    """This is the standard Slide HTML builder.

    Its output is a directory with HTML, along with the needed style
    sheets, slide table, and presenter's console JavaScript.

    Its name is ``slides``.

    """

    name = 'slides'


class SingleFileSlideBuilder(AbstractSlideBuilder, SingleFileHTMLBuilder):
    """This is the single file Slide HTML builder.

    Its output is a directory with a single HTML file, along with the
    needed style sheets and JavaScript.

    Its name is ``singlefile-slides``.

    """

    name = 'singlefile-slides'
    default_translator_class = writer.SingleFileSlideTranslator


class AbstractInlineSlideBuilder(object):

    name = 'inlineslides'
    default_translator_class = writer.BaseSlideTranslator

    def __init__(self, *args, **kwargs):
        super(AbstractInlineSlideBuilder, self).__init__(*args, **kwargs)

        self.config.html_static_path.append(
            os.path.relpath(
                os.path.join(
                    os.path.dirname(__file__),
                    'themes',
                    'inline-slides',
                    'static',
                ),
                self.confdir,
            )
        )

        self.css_files.append('_static/slides.css')


class DirectoryInlineSlideBuilder(
        AbstractInlineSlideBuilder,
        DirectoryHTMLBuilder):
    """This is the Inline Slide Directory HTML builder.

    The inline slide builder add support for the ``slide`` directive
    to Sphinx's :py:class:`DirectoryHTMLBuilder`, and adds an
    additional stylesheet to the output for basic inline display.

    When using an inline builder :confval:`autoslides` is disabled.

    Its name is ``dirinlineslides``.

    .. versionadded:: 0.5

    """

    name = 'dirinlineslides'


class InlineSlideBuilder(AbstractInlineSlideBuilder, StandaloneHTMLBuilder):
    """This is the Inline Slide HTML builder.

    The inline slide builder add support for the ``slide`` directive
    to Sphinx's :py:class:`StandaloneHTMLBuilder`, and adds an
    additional stylesheet to the output for basic inline display.

    When using an inline builder :confval:`autoslides` is disabled.

    Its name is ``inlineslides``.

    .. versionadded:: 0.5

    """

    name = 'inlineslides'
