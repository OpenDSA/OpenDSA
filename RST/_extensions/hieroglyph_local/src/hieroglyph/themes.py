"""
Bundled theme metadata.

The hieroglyph command-line utility uses this metadata to present
theme options to the user.

"""

import os
from os import path

# sphinx 8 compatibility
try:
    from sphinx.theming import load_additional_themes
except ImportError:
    def load_additional_themes(path):
        return {}


SINGLE_LEVEL = dict(
    name='single-level',
    desc='All slides are styled the same, with the heading at the top.',
)


SLIDES = dict(
    name='slides',
    desc='The default theme, with different styling for first, second, and third level headings.',
)


SLIDES2 = dict(
    name='slides2',
    desc='Theme based on the updated templates from Google I/O (beta).',
)
