from docutils import nodes
from docutils.parsers.rst import directives
from docutils.parsers.rst import Directive

def setup(app):
    """Register stub directives for RevealJS"""
    app.add_directive('revealjs-slide', StubRevealJSDirective)
    app.add_directive('revealjs-fragments', StubRevealJSDirective)
    app.add_directive('revealjs-section', StubRevealJSDirective)
    app.add_directive('revealjs-break', StubRevealJSDirective)

class StubRevealJSDirective(Directive):
    """Stub directive to preserve content for sphinx-revealjs to process later"""
    has_content = True
    optional_arguments = 100  # Allow any arguments
    option_spec = {}  # Accept any options

    def run(self):
        # container preserves all content
        container = nodes.container()
        if self.content:
            self.state.nested_parse(self.content, self.content_offset, container)
        return [container]
