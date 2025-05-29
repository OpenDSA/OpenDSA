"""Support for interacting with HTML builds."""

import os

import sphinx
from sphinx.jinja2glue import SphinxFileSystemLoader

HTML_BUILDERS = ('html', 'dirhtml', 'singlehtml',)
SLIDELINK_TEMPLATE = 'slidelink.html'


def inspect_config(app):
    """Inspect the Sphinx configuration and update for slide-linking.

    If links from HTML to slides are enabled, make sure the sidebar
    configuration includes the template and add the necessary theme
    directory as a loader so the sidebar template can be located.

    If the sidebar configuration already includes ``slidelink.html``
    (in any key), the configuration will not be changed. If the
    configuration is not specified, we'll attempt to emulate what
    Sphinx does by default.
    """

    # avoid import cycles :/
    from hieroglyph import writer

    # only reconfigure Sphinx if we're generating HTML
    if app.builder.name not in HTML_BUILDERS:
        return

    if app.config.slide_link_html_to_slides:

        # add the slide theme dir as a Loader
        app.builder.templates.loaders.append(
            SphinxFileSystemLoader(
                os.path.join(
                    os.path.dirname(__file__), 'themes', 'slides',
                )
            )
        )

        # add the "show slides" sidebar template
        if not app.config.html_sidebars:
            # no sidebars explicitly defined, mimic the old style
            # behavior + slide links
            app.config.html_sidebars = {
                '**': [
                    'localtoc.html',
                    'relations.html',
                    'sourcelink.html',
                    SLIDELINK_TEMPLATE,
                    'searchbox.html',
                ],
            }
        else:
            # sidebars defined, add the template if needed
            included = False
            for glob, templates in app.config.html_sidebars:
                if SLIDELINK_TEMPLATE in templates:
                    included = True
                    break

            if not included:
                # the slidelink template was not included; append it
                # to the list of sidebars for all templates
                app.config.html_sidebars.setdefault('**', []).append(
                    SLIDELINK_TEMPLATE,
                )

    if app.config.slide_link_html_sections_to_slides:
        # fix up the HTML Translator
        override_translator = type(
            'SlideLinkTranslator',
            (app.builder.get_translator_class(), object),
            {
                'depart_title': writer.depart_title,
            },
        )
        app.set_translator(app.builder, override_translator)


def slide_path(builder, pagename=None):
    """Calculate the relative path to the Slides for pagename."""

    return builder.get_relative_uri(
        pagename or builder.current_docname,
        os.path.join(
            builder.app.config.slide_relative_path,
            pagename or builder.current_docname,
        ))


def html_path(builder, pagename=None):
    """Calculate the relative path to the Slides for pagename."""

    return builder.get_relative_uri(
        pagename or builder.current_docname,
        os.path.join(
            builder.app.config.slide_html_relative_path,
            pagename or builder.current_docname,
        ))


def add_link(app, pagename, templatename, context, doctree):
    """Add the slides link to the HTML context."""

    # we can only show the slidelink if we can resolve the filename
    context['show_slidelink'] = (
        app.config.slide_link_html_to_slides and
        hasattr(app.builder, 'get_outfilename')
    )

    if context['show_slidelink']:
        context['slide_path'] = slide_path(app.builder, pagename)
