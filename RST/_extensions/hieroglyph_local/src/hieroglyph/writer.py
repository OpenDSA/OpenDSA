"""Writer Support for Hieroglyph Slides."""

from docutils import nodes
from sphinx.locale import _
from docutils.writers.html4css1 import HTMLTranslator as BaseTranslator
from sphinx.writers.html import HTMLTranslator

from hieroglyph import html
from hieroglyph.directives import (
    slide,
    slideconf,
)


def depart_title(self, node):

    # XXX Because we want to inject our link into the title, this is
    # largely copy-pasta'd from sphinx.html.writers.HtmlTranslator.

    close_tag = self.context[-1]

    if (self.permalink_text and self.builder.add_permalinks and
            node.parent.hasattr('ids') and node.parent['ids']):
        aname = node.parent['ids'][0]

        if close_tag.startswith('</a></h'):
            self.body.append('</a>')

        self.body.append(u'<a class="headerlink" href="#%s" ' % aname +
                         u'title="%s">%s</a>' % (
                         _('Permalink to this headline'),
                         self.permalink_text))

        self.body.append(
            u'<a class="headerlink" href="%s#%s" ' % (
                html.slide_path(self.builder),
                aname,
            ) +
            u'title="%s">%s' % (
                _('Slides'),
                self.builder.app.config.slide_html_slide_link_symbol,
            ))

        if not close_tag.startswith('</a></h'):
            self.body.append('</a>')

    BaseTranslator.depart_title(self, node)


class SlideData(object):

    def __init__(self, translator, **kwargs):

        self._translator = translator

        self.level = 0
        self.title = ''
        self.content = ''
        self.classes = []
        self.slide_number = 0
        self.id = ''

        for name, value in kwargs.items():
            setattr(self, name, value)

    def _filter_classes(self, include=None, exclude=None):

        classes = self.classes[:]
        if include is not None:
            classes = [
                c[len(include):] for c in classes
                if c.startswith(include)
            ]

        if exclude is not None:
            classes = [
                c for c in classes
                if not c.startswith(exclude)
            ]

        return classes

    def get_slide_context(self):
        """Return the context dict for rendering this slide."""

        return {
            'title': self.title,
            'level': self.level,
            'content': self.content,
            'classes': self.classes,
            'slide_classes': self._filter_classes(exclude='content-'),
            'content_classes': self._filter_classes(include='content-'),
            'slide_number': self.slide_number,
            'config': self._translator.builder.config,
            'id': self.id,
        }


class BaseSlideTranslator(HTMLTranslator):

    def __init__(self, *args, **kwargs):

        HTMLTranslator.__init__(self, *args, **kwargs)

        self.section_count = 0
        self.body_stack = []
        self.current_slide = None
        self.slide_data = []

    def push_body(self):
        """Push the current body onto the stack and create an empty one."""

        self.body_stack.append(self.body)
        self.body = []

    def pop_body(self):
        """Replace the current body with the last one pushed to the stack."""

        self.body = self.body_stack.pop()

    def visit_slideconf(self, node):
        pass

    def depart_slideconf(self, node):
        pass

    def _add_slide_number(self, slide_no):
        """Add the slide number to the output if enabled."""

        if self.builder.config.slide_numbers:
            self.body.append(
                '\n<div class="slide-no">%s</div>\n' % (slide_no,),
            )

    def _add_slide_footer(self, slide_no):
        """Add the slide footer to the output if enabled."""

        if self.builder.config.slide_footer:
            self.body.append(
                '\n<div class="slide-footer">%s</div>\n' % (
                    self.builder.config.slide_footer,
                ),
            )

    def visit_slide(self, node):

        from hieroglyph import builder

        slide_level = node.attributes.get('level', self.section_level)

        if slide_level > self.builder.config.slide_levels:
            # dummy for matching div's
            self.body.append(
                self.starttag(
                    node, 'div', CLASS='section level-%s' % slide_level)
            )
            node.tag_name = 'div'
        else:

            slide_conf = slideconf.get_conf(self.builder, node.document)
            if (builder.building_slides(self.builder.app) and
                    slide_conf['autoslides'] and
                    isinstance(node.parent, nodes.section) and
                    not getattr(node.parent, 'closed', False)):

                # we're building slides and creating slides from
                # sections; close the previous section, if needed
                self.depart_slide(node.parent)

            # don't increment section_count until we've (potentially)
            # closed the previous slide
            self.section_count += 1

            node.closed = False

            classes = node.get('classes')
            if not classes:
                classes = slide_conf['slide_classes']

            # self.body.append(
            #     self.starttag(
            #         node, 'article',
            #         CLASS='%s slide level-%s' % (
            #             ' '.join(classes),
            #             slide_level,
            #         ),
            #     )
            # )
            node.tag_name = 'article'

            slide_id = node.get('ids')
            if slide_id:
                slide_id = slide_id[0]
            else:
                slide_id = ''

            assert self.current_slide is None
            self.current_slide = SlideData(
                self,
                id=slide_id,
                level=slide_level,
                classes=classes,
                slide_number=self.section_count,
            )
            self.push_body()

    def depart_slide(self, node):

        if self.current_slide and not getattr(node, 'closed', False):

            # mark the slide closed
            node.closed = True

            # self._add_slide_footer(self.section_count)
            # self._add_slide_number(self.section_count)
            # self.body.append(
            #     '\n</%s>\n' % getattr(node, 'tag_name', 'article')
            # )

            self.current_slide.content = ''.join(self.body)
            self.pop_body()
            rendered_slide = self.builder.templates.render(
                'slide.html',
                self.current_slide.get_slide_context(),
            )
            self.body.append(rendered_slide)
            self.slide_data.append(self.current_slide)
            self.current_slide = None

    def visit_title(self, node):

        self.push_body()

        if (isinstance(node.parent, slide) or
                node.parent.attributes.get('include-as-slide', False)):
            slide_level = node.parent.attributes.get(
                'level',
                self.section_level)
            level = max(
                slide_level + self.initial_header_level - 1,
                1,
            )
            self.current_slide.level = level

            # tag = 'h%s' % level
            # self.body.append(self.starttag(node, tag, ''))
            # self.context.append('</%s>\n' % tag)

        if self.current_slide and isinstance(node.parent, (nodes.section, slide)):
            self.current_slide.title = node.astext().strip()
        else:
            HTMLTranslator.visit_title(self, node)


    def depart_title(self, node):

        if self.current_slide and isinstance(node.parent, (nodes.section, slide)):
            self.current_slide.title = ''.join(self.body)
            self.pop_body()
        else:
            HTMLTranslator.depart_title(self, node)
            title = ''.join(self.body)
            self.pop_body()
            self.body.append(title)

    def visit_block_quote(self, node):
        quote_slide_tags = ['paragraph', 'attribution']

        # see if this looks like a quote slide
        if (len(node.children) <= 2 and
            [c.tagname for c in node.children] == quote_slide_tags[:len(node.children)]):

            # process this as a quote slide

            # first child must be a paragraph, process it as a <q> element
            p = node.children[0]
            self.body.append(self.starttag(node, 'q'))
            for text_item in p:
                text_item.walkabout(self)
                self.body.append('</q>\n')

            # optional second child must be an attribution, processing as a <div>
            # following the <q>
            if len(node.children) > 1:
                attr = node.children[1]

                self.body.append(self.starttag(attr, 'div', CLASS="author"))
                for text_item in attr:
                    text_item.walkabout(self)
                    self.body.append('</div>\n')

            # skip all normal processing
            raise nodes.SkipNode

        else:
            return HTMLTranslator.visit_block_quote(self, node)


class SlideTranslator(BaseSlideTranslator):

    def visit_section(self, node):

        # XXX: We're actually removing content that's not in slide
        # nodes with autoslides is false, so it's not clear that we
        # even need this guard.
        if (slideconf.get_conf(self.builder, node.document)['autoslides'] or
                node.attributes.get('include-as-slide', False)):

            self.section_level += 1
            return self.visit_slide(node)

    def depart_section(self, node):

        if (slideconf.get_conf(self.builder, node.document)['autoslides'] or
                node.attributes.get('include-as-slide', False)):

            if self.section_level > self.builder.config.slide_levels:
                self.body.append('</div>')
            else:
                self.depart_slide(node)

            self.section_level -= 1

    def depart_title(self, node):

        if node.parent.hasattr('ids') and node.parent['ids']:
            aname = node.parent['ids'][0]

            if self.builder.app.config.slide_link_to_html:
                self.body.append(
                    u'<a class="headerlink" href="%s#%s" ' % (
                        html.html_path(self.builder),
                        aname,
                    ) +
                    u'title="%s">%s</a>' % (
                        _('View HTML'),
                        self.builder.app.config.slide_html_slide_link_symbol,
                    ))

        BaseSlideTranslator.depart_title(self, node)

    def visit_start_of_file(self, node):
        previous = node.parent
        if isinstance(previous, nodes.compound):
            # step up one more level
            previous = previous.parent

        self.depart_slide(previous)
        self.section_level -= 1

        BaseSlideTranslator.visit_start_of_file(self, node)


class SingleFileSlideTranslator(SlideTranslator):

    def visit_compound(self, node):
        if not 'toctree-wrapper' in node['classes']:
            SlideTranslator.visit_compound(self, node)

    def depart_compound(self, node):
        if not 'toctree-wrapper' in node['classes']:
            SlideTranslator.depart_compound(self, node)
