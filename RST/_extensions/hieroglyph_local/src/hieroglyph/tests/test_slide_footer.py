from __future__ import absolute_import

from unittest import TestCase

from bs4 import BeautifulSoup
from sphinx_testing import with_app

from hieroglyph.tests import util


class SlideFooterTests(TestCase):

    @with_app(
        buildername='slides',
        srcdir=util.test_root,
        confoverrides={
            'slide_footer': 'TEST FOOTER',
        },
    )
    def test_footer_added_to_all_slides(self, sphinx_app, status, warning):

        sphinx_app.build()

        slide_html = BeautifulSoup(
            open(sphinx_app.builddir/'slides'/'index.html').read(),
            "html.parser",
        )
        slides = slide_html.find_all('article', class_='slide')

        # sanity check
        self.assertEqual(
            len(slides),
            3,
        )

        for slide in slides:
            self.assertTrue(
                slide.find('div', class_='slide-footer',),
            )

            self.assertEqual(
                slide.find('div', class_='slide-footer',).text,
                sphinx_app.config.slide_footer,
            )

    @with_app(
        buildername='slides',
        srcdir=util.test_root,
        confoverrides={
            'slide_footer': None,
        },
    )
    def test_footer_not_added_when_not_configured(self, sphinx_app, status, warning):

        sphinx_app.build()

        slide_html = BeautifulSoup(
            open(sphinx_app.builddir/'slides'/'index.html').read(),
            "html.parser",
        )
        slides = slide_html.find_all('article', class_='slide')

        # sanity check
        self.assertEqual(
            len(slides),
            3,
        )

        for slide in slides:
            self.assertFalse(
                slide.find('div', class_='slide-footer',),
            )
