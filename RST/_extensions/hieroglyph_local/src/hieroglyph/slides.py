from hieroglyph.builder import building_slides


def __fix_context(context):
    """Return a new context dict based on original context.

    The new context will be a copy of the original, and some mutable
    members (such as script and css files) will also be copied to
    prevent polluting shared context.
    """

    COPY_LISTS = ('script_files', 'css_files',)

    for attr in COPY_LISTS:
        if attr in context:
            context[attr] = context[attr][:]

    return context


def get_extra_pages(app):
    """

    """

    result = []
    context = app.builder.globalcontext

    for context_key in context:
        if context_key.startswith('theme_extra_pages_'):
            page_name = context_key.split('theme_extra_pages_')[-1]
            result.append(
                (page_name, context, context[context_key],)
            )

    return result
