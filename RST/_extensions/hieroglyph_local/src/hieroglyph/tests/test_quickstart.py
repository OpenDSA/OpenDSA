"""Tests for Hieroglyph Quickstart"""

import os
import shutil
import tempfile
import time
from unittest import TestCase

from sphinx.cmd import quickstart as sphinx_quickstart
from sphinx.util.pycompat import execfile_
from sphinx.util.console import nocolor, coloron

from hieroglyph import quickstart


# mock_input is cribbed from sphinx.tests.test_quickstart, since sphinx does
# not bundle its test suite with the package
def mock_input(answers, needanswer=False):
    called = set()

    def input_(prompt):
        if prompt in called:
            raise AssertionError('answer for %r missing and no default '
                                 'present' % prompt)
        called.add(prompt)
        prompt = str(prompt)  # Python3.x input emulation
        # `input` decode prompt by default encoding before print.

        for question in answers:
            if prompt.startswith(sphinx_quickstart.PROMPT_PREFIX + question):
                return answers[question]
        if needanswer:
            raise AssertionError('answer for %r missing' % prompt)
        return ''
    return input_


class TestQuickstart(TestCase):

    def setUp(self):
        nocolor()

    def tearDown(self):
        coloron()

    def test_hieroglyph_quickstart(self):
        tempdir = tempfile.mkdtemp()

        answers = {
            'Root path': tempdir,
            'Author name(s)': 'Marcia Brady',
            'Presentation title': 'Hieroglyph Test',
        }
        sphinx_quickstart.term_input = mock_input(answers)
        quickstart.quickstart(path=tempdir)

        conffile = os.path.join(tempdir, 'conf.py')
        assert os.path.exists(conffile)
        ns = {}
        execfile_(conffile, ns)

        # XXX why is there a list in the list?!
        # Apparently introduced between Sphinx 1.6.7 and 1.7.0b1
        if type(ns['extensions']) is list:
            # let's make sure there is nothing we don't expect
            self.assertEqual(len(ns['extensions']), 1)
            ns['extensions'] = ns['extensions'][0]

        self.assertIn('hieroglyph', ns['extensions'])
        self.assertEqual(ns['templates_path'], ['_templates'])
        self.assertEqual(ns['project'], 'Hieroglyph Test')
        self.assertEqual(ns['author'], 'Marcia Brady')
        self.assertEqual(ns['html_static_path'], ['_static'])

        self.assertTrue(os.path.isdir(os.path.join(tempdir, '_static')))
        self.assertTrue(os.path.isdir(os.path.join(tempdir, '_templates')))
        self.assertTrue(os.path.exists(os.path.join(tempdir, 'index.rst')))
        self.assertTrue(os.path.exists(os.path.join(tempdir, 'Makefile')))
        self.assertTrue(os.path.exists(os.path.join(tempdir, 'make.bat')))

        shutil.rmtree(tempdir)