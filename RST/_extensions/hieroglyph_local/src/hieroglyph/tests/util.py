import docutils.frontend
import docutils.parsers.rst
import docutils.writers.html4css1
import docutils.utils
from sphinx_testing.path import path
from sphinx_testing import with_app as with_sphinx_testing


test_root = path(__file__).parent.joinpath('root').abspath()
test_roots = path(__file__).parent.joinpath('roots').abspath()


def with_app(*args, **kwargs):
    """Decorator for passing a test Sphinx app to a function.

    Extends sphinx_testing's version by defaulting to a base test directory
    if none is specified. The test directory will be copied to a temporary
    directory before calling the function.

    """

    if 'srcdir' not in kwargs and 'create_new_srcdir' not in kwargs:
        kwargs['srcdir'] = test_root
        kwargs['copy_srcdir_to_tmpdir'] = True

    return with_sphinx_testing(*args, **kwargs)


def make_document(source_name, contents):
    """Parse ```contents``` into a docutils document."""

    parser = docutils.parsers.rst.Parser()
    document = docutils.utils.new_document(
        source_name,
        docutils.frontend.OptionParser(
            components=(
                docutils.parsers.rst.Parser,
                docutils.writers.html4css1.Writer,
            ),
        ).get_default_values(),
    )

    parser.parse(contents, document)

    return document
