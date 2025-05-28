"""Tests for the Sphinx event handlers."""

from unittest import TestCase
from mock import MagicMock

from hieroglyph import slides


class TestGetExtraPages(TestCase):

    def _get_mock_app(self, context=None):

        if context is None:
            context = {}

        app = MagicMock()
        app.builder.globalcontext = context

        return app

    def test_extra_pages_returned(self):

        context = {
            'theme_extra_pages_console': 'console.html',
        }
        app = self._get_mock_app(context)

        self.assertEqual(
            slides.get_extra_pages(app),
            [
                ('console', context, 'console.html'),
            ],
        )

    def test_no_pages_returns_if_no_context(self):

        self.assertEqual(
            slides.get_extra_pages(self._get_mock_app()),
            [],
        )
