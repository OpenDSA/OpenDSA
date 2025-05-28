import glob
from unittest import TestCase

from bs4 import BeautifulSoup
from sphinx_testing import (
    TestApp,
)
from hieroglyph.tests import util
from hieroglyph.tests.util import with_app
import hieroglyph.builder


class SlideBuilderTests(TestCase):

    @with_app()
    def test_get_theme_options(self, app, *args):

        builder = hieroglyph.builder.SlideBuilder(app)
        builder.init()

        resolved_theme_options = builder.get_theme_options()
        self.assertIsInstance(
            resolved_theme_options,
            dict,
        )

        self.assertIn(
            'custom_css',
            resolved_theme_options,
        )
        self.assertIn(
            'custom_js',
            resolved_theme_options,
        )

    @with_app()
    def test_get_theme_options_with_overrides(self, app, *args):

        builder = hieroglyph.builder.SlideBuilder(app)
        builder.init()
        resolved_theme_options = builder.get_theme_options()

        self.assertEqual(
            resolved_theme_options['custom_css'],
            '',
        )

        app = TestApp(
            srcdir=util.test_root,
            copy_srcdir_to_tmpdir=True,
            confoverrides={
                'slide_theme_options': {
                    'custom_css': 'testing.css',
                },
            },
        )
        builder = hieroglyph.builder.SlideBuilder(app)
        builder.init()
        resolved_theme_options = builder.get_theme_options()

        self.assertEqual(
            resolved_theme_options['custom_css'],
            'testing.css',
        )

    @with_app(
        buildername='slides',
    )
    def test_html_static_dir_contents_override_theme(self, sphinx_app, status, warning):

        self.assertIsInstance(
            sphinx_app.builder,
            hieroglyph.builder.AbstractSlideBuilder,
        )

        sphinx_app.build()

        built_styles = open(sphinx_app.builddir/'slides'/'_static'/'styles.css').read()
        static_styles = open(sphinx_app.srcdir/'_static'/'styles.css').read()

        self.assertEqual(
            built_styles,
            static_styles,
        )

    @with_app(
        buildername='slides',
        confoverrides={
            'slide_title': 'SLIDES TITLE',
        },
    )
    def test_docstitle_uses_slidetitle(self, app, *args):

        builder = app.builder
        builder.prepare_writing([])

        self.assertEqual(
            builder.globalcontext['docstitle'],
            'SLIDES TITLE',
        )

    @with_app(buildername='slides')
    def test_docstitle_fallback_to_html_title(self, app, status, warning):

        builder = app.builder
        builder.prepare_writing([])

        self.assertEqual(
            builder.globalcontext['docstitle'],
            builder.config.html_title,
        )


class SingleFileBuilderTests(TestCase):

    @with_app(
        buildername='singlefile-slides',
        srcdir=util.test_root.parent/'singlefile',
    )
    def test_builds_single_file(self, app, *args):

        app.build()

        self.assertEqual(
            len(glob.glob(app.builddir/'singlefile-slides'/'*.html')),
            1,
        )

    @with_app(
        buildername='singlefile-slides',
        srcdir=util.test_root.parent/'singlefile',
    )
    def test_adjusts_section_levels_to_account_for_toctree(self, app, *args):
        """The TOCTREE pushes sections/slides down a level if not handled."""

        app.build()

        with open(app.builddir/'singlefile-slides'/'index.html') as html_file:
            tree = BeautifulSoup(html_file.read(), "html.parser")
            contents = tree.find_all('article')

            self.assertEqual(len(contents), 4)

    @with_app(
        buildername='singlefile-slides',
        srcdir=util.test_root.parent/'singlefile',
    )
    def test_slide_directive_closes_correctly_at_end_of_source_file(self, app, *args):
        app.build()

        with open(app.builddir/'singlefile-slides'/'index.html') as html_file:
            tree = BeautifulSoup(html_file.read(), "html.parser")

            # test to see that all the slides are siblings
            slides = [
                s for s in tree.section.children
                if s.name == 'article'
            ]

            self.assertEqual(len(slides), 4)
