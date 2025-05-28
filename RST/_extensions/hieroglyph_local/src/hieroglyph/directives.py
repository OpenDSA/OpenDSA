from docutils import nodes

from sphinx.util.nodes import set_source_info
from docutils.nodes import SkipNode
from docutils.parsers.rst import Directive, directives
from docutils.parsers.rst.directives import (
    admonitions,
)
from docutils.parsers.rst.roles import set_classes
from docutils.transforms import Transform


def raiseSkip(self, node):
    raise SkipNode()


class if_slides(nodes.Element):
    pass


class IfBuildingSlides(Directive):

    has_content = True
    required_arguments = 0
    optional_arguments = 0
    final_argument_whitespace = True
    option_spec = {}

    def run(self):
        if self.name in ('slides', 'notslides',):
            import warnings

            # these are deprecated, print a warning
            warnings.warn(
                "The %s directive has been deprecated; replace with if%s" % (
                    self.name, self.name,
                ),
                stacklevel=2,
            )

        node = if_slides()
        node.document = self.state.document
        set_source_info(self, node)

        node.attributes['ifslides'] = self.name in ('slides', 'ifslides',)

        self.state.nested_parse(self.content, self.content_offset,
                                node, match_titles=1)
        return [node]


class TransformSlideConditions(Transform):

    default_priority = 550

    def apply(self, *args, **kwargs):

        app = self.document.settings.env.app
        from hieroglyph import builder

        need_reread = False
        is_slides = builder.building_slides(app)

        # this is a slide builder, remove notslides nodes
        for node in self.document.traverse(if_slides):

            need_reread = True
            keep_content = is_slides == node.attributes.get('ifslides', False)

            if keep_content:
                node.replace_self(node.children)
            else:
                node.replace_self([])

        if need_reread:
            self.document.settings.env.note_reread()



class nextslide(nodes.Element):

    def __repr__(self):
        return 'nextslide: %s' % self.args


class NextSlideDirective(Directive):

    has_content = False
    required_arguments = 0
    optional_arguments = 1
    final_argument_whitespace = True
    option_spec = {
        'increment': directives.flag,
        'classes': directives.class_option,
    }

    def run(self):

        node = nextslide(**self.options)
        node.args = self.arguments
        node.state = self.state
        node.document = self.state.document
        set_source_info(self, node)

        return [node]


class TransformNextSlides(Transform):

    default_priority = 550

    def apply(self, *args, **kwargs):

        app = self.document.settings.env.app

        from hieroglyph import builder

        is_slides = builder.building_slides(app)

        return self.apply_to_document(
            self.document,
            env=self.document.settings.env,
            building_slides=is_slides,
        )

    def apply_to_document(self, document, env, building_slides):

        need_reread = False

        for node in document.traverse(nextslide):
            need_reread = True
            self.visit_nextslide(node, building_slides)

        if need_reread:
            env.note_reread()

    def _make_title_node(self, node, increment=True):
        """Generate a new title node for ``node``.

        ``node`` is a ``nextslide`` node. The title will use the node's
        parent's title, or the title specified as an argument.

        """

        parent_title_node = node.parent.next_node(nodes.title)
        nextslide_info = getattr(
            parent_title_node, 'nextslide_info',
            (parent_title_node.deepcopy().children, 1),
        )
        nextslide_info = (
            nextslide_info[0],
            nextslide_info[1] + 1,
        )

        if node.args:
            textnodes, messages = node.state.inline_text(
                node.args[0],
                1,
            )
            new_title = nodes.title(node.args[0], '', *textnodes)

        else:

            title_nodes = nextslide_info[0][:]

            if 'increment' in node.attributes:
                title_nodes.append(
                    nodes.Text(' (%s)' % nextslide_info[1])
                )

            new_title = nodes.title(
                '', '',
                *title_nodes
            )

        new_title.nextslide_info = nextslide_info
        return new_title

    def visit_nextslide(self, node, building_slides):

        index = node.parent.index(node)

        if (not building_slides or
                not node.parent.children[index+1:]):
            node.parent.replace(node, [])

            # nothing else to do
            return

        # figure out where to hoist the subsequent content to
        parent = node.parent
        grandparent = node.parent.parent
        insertion_point = grandparent.index(node.parent) + 1

        # truncate siblings, storing a reference to the rest of the
        # content
        new_children = parent.children[index+1:]
        parent.children = parent.children[:index+1]

        # create the next section
        new_section = nodes.section()
        new_section += self._make_title_node(node)
        new_section.extend(new_children)
        self.document.set_id(new_section)

        # add classes, if needed
        if node.get('classes'):
            new_section['classes'].extend(node.get('classes'))

        # attach the section and delete the nextslide node
        grandparent.insert(insertion_point, new_section)
        del node.parent[index]


class slideconf(nodes.Element):

    def apply(self, builder):
        """Apply the Slide Configuration to a Builder."""

        if 'theme' in self.attributes:
            builder.apply_theme(
                self.attributes['theme'],
                builder.theme_options,
            )

    def restore(self, builder):
        """Restore the previous Slide Configuration for the Builder."""

        if 'theme' in self.attributes:
            builder.pop_theme()

    @classmethod
    def get(cls, doctree):
        """Return the first slideconf node for the doctree."""

        conf_nodes = doctree.traverse(cls)
        try:
            return next(iter(conf_nodes))
        except StopIteration:
            pass

    @classmethod
    def get_conf(cls, builder, doctree=None):
        """Return a dictionary of slide configuration for this doctree."""

        # set up the default conf
        result = {
            'theme': builder.config.slide_theme,
            'autoslides': builder.config.autoslides,
            'slide_classes': [],
        }

        # now look for a slideconf node in the doctree and update the conf
        if doctree:
            conf_node = cls.get(doctree)
            if conf_node:
                result.update(conf_node.attributes)

        return result


def boolean_option(argument):

    return str(argument.strip().lower()) in ('true', 'yes', '1')


class SlideConf(Directive):

    has_content = False
    required_arguments = 0
    optional_arguments = 0
    final_argument_whitespace = True
    option_spec = {
        'theme': directives.unchanged,
        'autoslides': boolean_option,
        'slide_classes': directives.class_option,
    }

    def run(self):
        node = slideconf(**self.options)
        node.document = self.state.document
        set_source_info(self, node)

        return [node]


def no_autoslides_filter(node):

    if isinstance(node, (if_slides, slideconf, slide)):
        return True

    if (isinstance(node, nodes.section) and
            'include-as-slide' in node.attributes.get('classes', [])):
        node.attributes['include-as-slide'] = True

        remove_classes = ['include-as-slide']
        # see if there's a slide-level class, too
        for cls_name in node.attributes['classes']:
            if cls_name.startswith('slide-level-'):
                node.attributes['level'] = int(cls_name.rsplit('-', 1)[-1])
                remove_classes.append(cls_name)

        ## for cls_name in remove_classes:
        ##     node.attributes['classes'].remove(cls_name)

        return True

    return False


def filter_doctree_for_slides(doctree):
    """Given a doctree, remove all non-slide related elements from it."""

    current = 0
    num_children = len(doctree.children)
    while current < num_children:

        child = doctree.children[current]
        child.replace_self(
            child.traverse(no_autoslides_filter)
        )

        if len(doctree.children) == num_children:
            # nothing removed, increment current
            current += 1
        else:
            # a node was removed; retain current and update length
            num_children = len(doctree.children)


def process_slideconf_nodes(app, doctree, docname):

    from hieroglyph import builder

    is_slides = builder.building_slides(app)

    # if autoslides is disabled and we're building slides,
    # replace the document tree with only explicit slide nodes
    if (is_slides and
        not slideconf.get_conf(
            app.builder, doctree)['autoslides']):
        filter_doctree_for_slides(doctree)


class slide(nodes.admonition):
    pass


class SlideDirective(admonitions.Admonition):

    required_arguments = 0
    optional_arguments = 1
    node_class = slide
    option_spec = {
        'class': directives.class_option,
        'name': directives.unchanged,
        'level': directives.nonnegative_int,
        'inline-contents': boolean_option,
    }

    def run(self):

        # largely lifted from the superclass in order to make titles work
        set_classes(self.options)
        # self.assert_has_content()
        text = '\n'.join(self.content)
        admonition_node = self.node_class(text, **self.options)
        self.add_name(admonition_node)

        if self.arguments:
            title_text = self.arguments[0]
            textnodes, messages = self.state.inline_text(title_text,
                                                         self.lineno)
            admonition_node += nodes.title(title_text, '', *textnodes)
            admonition_node += messages
        else:
            # no title, make something up so we have an ID
            title_text = str(hash(' '.join(self.content)))

        if not 'classes' in self.options:
            admonition_node['classes'] += ['admonition-' +
                                           nodes.make_id(title_text)]
        self.state.nested_parse(self.content, self.content_offset,
                                admonition_node)

        return [admonition_node]


def process_slide_nodes(app, doctree, docname):

    from hieroglyph import builder

    supports_slide_nodes = (
        builder.building_slides(app) or
        isinstance(app.builder, builder.AbstractInlineSlideBuilder)
    )

    if supports_slide_nodes:
        return

    # this builder does not understand slide nodes; remove them
    for node in doctree.traverse(slide):
        if node.attributes.get('inline-contents', False):
            node.replace_self(node.children[1:])
        else:
            node.replace_self(nodes.inline())
