from __future__ import print_function
from __future__ import absolute_import

from argparse import ArgumentParser
import datetime
import os

import pkg_resources
import sphinx.cmd.quickstart as sphinx_quickstart
from sphinx.util.console import bold

from hieroglyph import version


def ask_user(d):
    """Wrap sphinx.cmd.quickstart.ask_user, and add additional questions."""

    # Print welcome message
    msg = bold('Welcome to the Hieroglyph %s quickstart utility.') % (
        version(),
    )
    print(msg)
    msg = """
This will ask questions for creating a Hieroglyph project, and then ask
some basic Sphinx questions.
"""
    print(msg)

    # set a few defaults that we don't usually care about for Hieroglyph
    d.update({
        'version': datetime.date.today().strftime('%Y.%m.%d'),
        'release': datetime.date.today().strftime('%Y.%m.%d'),
        'make_mode': True,
    })

    if 'project' not in d:
        print('''
The presentation title will be included on the title slide.''')
        d['project'] = sphinx_quickstart.do_prompt('Presentation title')
    if 'author' not in d:
        d['author'] = sphinx_quickstart.do_prompt('Author name(s)')

    # slide_theme
    theme_entrypoints = pkg_resources.iter_entry_points('hieroglyph.theme')

    themes = [
        t.load()
        for t in theme_entrypoints
    ]

    msg = """
Available themes:

"""

    for theme in themes:
        msg += '\n'.join([
            bold(theme['name']),
            theme['desc'],
            '', '',
        ])

    msg += """Which theme would you like to use?"""
    print(msg)

    d['slide_theme'] = sphinx_quickstart.do_prompt(
        'Slide Theme',
        themes[0]['name'],
        sphinx_quickstart.choice(
            *[t['name'] for t in themes]
        ),
    )

    # Ask original questions
    print("")
    sphinx_quickstart.ask_user(d)


def quickstart(path=None):

    templatedir = os.path.join(os.path.dirname(__file__), 'templates')

    d = sphinx_quickstart.DEFAULTS.copy()
    d['extensions'] = ['hieroglyph']
    d.update(dict(("ext_" + ext, False) for ext in sphinx_quickstart.EXTENSIONS))
    if path:
        d['path'] = path

    ask_user(d)
    sphinx_quickstart.generate(d, templatedir=templatedir)


def main():
    parser = ArgumentParser(
        description='Run hieroglyph -q to start a presentation',
    )

    parser.add_argument('-v', '--version', action='store_true',
                        help="Print current version of hieroglyph")
    parser.add_argument('-q', '--quickstart', action='store_true',
                        help="Start a hieroglyph project")

    parser.add_argument('path', nargs='?', default=None,
                        help='Output directory for new presentation.')

    args = vars(parser.parse_args())

    if (args['version']):
        print(version())
    elif (args['quickstart']):
        quickstart(args['path'])
