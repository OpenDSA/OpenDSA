from unittest import TestCase

from docutils import nodes
from mock import patch
from sphinx import jinja2glue
from sphinx_testing import TestApp

from hieroglyph.tests import util

from hieroglyph.builder import SlideBuilder
from hieroglyph.writer import (
    SlideData,
    BaseSlideTranslator,
    SlideTranslator,
)


class SlideTranslationTests(TestCase):

    def setUp(self):

        self.app = TestApp(
            buildername='slides',
            copy_srcdir_to_tmpdir=True,
            srcdir=util.test_root,
        )
        self.builder = self.app.builder
        self.document = util.make_document(
            'testing',
            """\
Slide ``Title``
---------------

* Bullet 1
* Bullet 2

""",
        )
        self.translator = BaseSlideTranslator(
            self.builder,
            self.document,
        )

    def test_push_body(self):

        self.translator.body = [1, 2, 3]

        self.translator.push_body()

        self.assertEqual(self.translator.body, [])
        self.assertEqual(self.translator.body_stack, [[1, 2, 3]])

        self.translator.body.append('foo')
        self.translator.push_body()
        self.assertEqual(
            self.translator.body_stack,
            [
                [1, 2, 3, ],
                ['foo', ],
            ],
        )

    def test_pop_body(self):

        self.translator.body.append('a')
        self.translator.push_body()

        self.translator.body.append('1')
        self.translator.push_body()

        self.assertEqual(
            self.translator.body_stack,
            [
                ['a'],
                ['1'],
            ],
        )
        self.assertEqual(self.translator.body, [])

        self.translator.pop_body()
        self.assertEqual(
            self.translator.body_stack,
            [
                ['a'],
            ],
        )
        self.assertEqual(self.translator.body, ['1'])

    def test_visit_slide_creates_new_slide_data(self):

        # sanity checks
        self.assertIsNone(self.translator.current_slide)
        self.assertIsInstance(self.document[0], nodes.section)

        # visit the slide section
        self.translator.visit_slide(self.document[0])

        # verify the Slide was created
        self.assertIsNotNone(self.translator.current_slide)
        self.assertIsInstance(self.translator.current_slide, SlideData)
        self.assertEqual(
            self.translator.current_slide.level,
            self.document[0].attributes.get(
                'level',
                self.translator.section_level,
            ),
        )

    def test_section_classes_added_to_slidedata(self):

        self.document[0].set_class('fancy')

        # visit the slide section
        self.translator.visit_slide(self.document[0])

        self.assertEqual(
            self.translator.current_slide.classes,
            ['fancy'],
        )

    def test_prefixed_classes_added_to_slidedata_context_classes(self):

        self.document[0].set_class('fancy')
        self.document[0].set_class('content-inner')

        # visit the slide section
        self.translator.visit_slide(self.document[0])

        self.assertEqual(
            self.translator.current_slide.get_slide_context()['classes'],
            ['fancy', 'content-inner'],
        )
        self.assertEqual(
            self.translator.current_slide.get_slide_context()['slide_classes'],
            ['fancy', ],
        )
        self.assertEqual(
            self.translator.current_slide.get_slide_context()['content_classes'],
            ['inner'],
        )

    def test_depart_slide_clears_current_slide(self):

        # visit the slide section
        self.translator.visit_slide(self.document[0])
        self.assertIsNotNone(self.translator.current_slide)

        self.translator.depart_slide(self.document[0])
        self.assertIsNone(self.translator.current_slide)

    def test_visit_title_in_slide_sets_slide_title(self):

        # visit the slide section
        self.translator.visit_slide(self.document[0])

        # visit the title
        self.translator.visit_title(self.document[0][0])

        self.assertEqual(
            self.document[0][0].astext(),
            self.translator.current_slide.title,
        )

    def test_depart_slide_sets_slide_content(self):
        pass

    def test_slide_data_get_context(self):

        slide = SlideData(
            self.translator,
            title='My Pretty Slide',
            id='my-pretty-slide',
            level=1,
        )

        self.assertEqual(
            slide.get_slide_context(),
            {
                'title': 'My Pretty Slide',
                'level': 1,
                'content': '',
                'classes': [],
                'slide_classes': [],
                'content_classes': [],
                'id': 'my-pretty-slide',
                'slide_number': 0,
                'config': self.translator.builder.config,
            },
        )

    @patch.object(jinja2glue.BuiltinTemplateLoader, 'render')
    def test_depart_slide_calls_template_render(self, render_mock):

        self.translator.visit_slide(self.document[0])
        self.assertIsNotNone(self.translator.current_slide)
        current_slide = self.translator.current_slide

        self.translator.depart_slide(self.document[0])
        self.assertIsNone(self.translator.current_slide)

        render_mock.assert_called_once_with(
            'slide.html',
            current_slide.get_slide_context(),
        )

    @patch.object(
        jinja2glue.BuiltinTemplateLoader,
        'render',
        return_value='** SLIDE **',
    )
    def test_rendered_template_added_to_body(self, render_mock):

        self.translator.visit_slide(self.document[0])
        self.translator.depart_slide(self.document[0])

        self.assertIsNone(self.translator.current_slide)
        self.assertEqual(
            self.translator.body[-1],
            '** SLIDE **',
        )

    @patch.object(
        jinja2glue.BuiltinTemplateLoader,
        'render',
        return_value='** SLIDE **',
    )
    def test_only_rendered_template_added(self, render_mock):

        self.translator.visit_section = self.translator.visit_slide
        self.translator.depart_section = self.translator.depart_slide
        self.document.walkabout(self.translator)

        self.assertEqual(
            self.translator.body,
            ['** SLIDE **'],
        )

    def test_section_id_added_to_current_slide(self):
        self.document[0].set_class('fancy')

        # visit the slide section
        self.translator.visit_slide(self.document[0])

        self.assertEqual(
            self.translator.current_slide.id,
            'slide-title',
        )

    def test_inline_markup_in_title(self):

        self.translator.visit_section = self.translator.visit_slide
        self.translator.depart_section = self.translator.depart_slide
        self.document.walkabout(self.translator)

        self.assertIn(
            str(self.translator.slide_data[-1].title),
            [
                # Sphinx 1.1, 1.2
                'Slide <tt class="docutils literal">'
                '<span class="pre">Title</span></tt>',

                # Sphinx 1.3
                'Slide <code class="docutils literal">'
                '<span class="pre">Title</span></code>',

                # Sphinx 1.7 @Python3.7
                'Slide <code class="docutils literal notranslate">'
                '<span class="pre">Title</span></code>'

            ],
        )

    def test_non_section_titles_rendered_normally(self):
        document = util.make_document(
            'testing',
            """\
Section Title
-------------

Some Text

.. note:: Take note!

Another paragraph

""",
        )
        translator = SlideTranslator(
            self.builder,
            document,
        )

        document.walkabout(translator)

        self.assertEqual(
            translator.body,
            [
                u'\n<article class="slide level-1" id="section-title">\n\n'
                '<h1>Section Title</h1>\n\n'
                '<p>Some Text</p>\n'
                '<div class="admonition note">\n'
                '<p class="first admonition-title">Note</p>\n'
                '<p class="last">Take note!</p>\n'
                '</div>\n'
                '<p>Another paragraph</p>'
                '\n\n\n\n\n</article>',
            ],
        )

    def test_slide_titles(self):
        document = util.make_document(
            'testing',
            """\
.. slide:: Slide Title

   Slide Content

""",
        )
        translator = SlideTranslator(
            self.builder,
            document,
        )

        document.walkabout(translator)

        self.assertEqual(
            translator.body,
            [
                u'\n<article class="admonition-slide-title slide level-1">\n\n'
                '<h1>Slide Title</h1>\n\n'
                '<p>Slide Content</p>\n\n\n\n\n</article>',
            ],
        )


class QuoteSlideTests(TestCase):

    def setUp(self):

        self.app = TestApp(
            buildername='slides',
            copy_srcdir_to_tmpdir=True,
            srcdir=util.test_root,
        )
        self.builder = self.app.builder

    def test_rst_quote_makes_quote_slide(self):
        document = util.make_document(
            'quoted',
            """\
.. slide:: Quotes
 :level: 2

   reStructuredText quotes are automatically converted

   -- The Sign Painter

""",
        )
        translator = SlideTranslator(
            self.builder,
            document,
        )

        document.walkabout(translator)

        self.assertEqual(
            translator.body,
            [
                u'\n<article class="admonition-quotes slide level-2">\n\n'
                '<h2>Quotes</h2>\n\n'
                '<q>\n'
                'reStructuredText quotes are automatically converted</q>\n'
                '<div class="author">\n'
                'The Sign Painter</div>'
                '\n\n\n\n\n</article>',
            ],
        )

    def test_unattributed_rst_quote_makes_quote_slide(self):
        document = util.make_document(
            'quoted',
            """\
.. slide:: Quotes
 :level: 2

   reStructuredText quotes are automatically converted

""",
        )
        translator = SlideTranslator(
            self.builder,
            document,
        )

        document.walkabout(translator)

        self.assertEqual(
            translator.body,
            [
                u'\n<article class="admonition-quotes slide level-2">\n\n'
                '<h2>Quotes</h2>\n\n'
                '<q>\n'
                'reStructuredText quotes are automatically converted</q>\n'
                '\n\n\n\n</article>',
            ],
        )

    def test_rst_quote_processes_normally_with_extra_content(self):
        document = util.make_document(
            'quoted',
            """\
.. slide:: Indented RST
 :level: 2

   This text is over indented.

   As is this text.

   They look like quotes but they're not.

""",
        )
        translator = SlideTranslator(
            self.builder,
            document,
        )

        document.walkabout(translator)

        self.assertEqual(
            translator.body,
            [
                u'\n<article class="admonition-indented-rst slide level-2">\n\n'
                '<h2>Indented RST</h2>\n\n'
                '<blockquote>\n'
                '<div><p>This text is over indented.</p>\n'
                '<p>As is this text.</p>\n'
                '<p>They look like quotes but they\'re not.</p>\n'
                '</div></blockquote>\n'
                '\n\n\n\n</article>',
            ],
        )
