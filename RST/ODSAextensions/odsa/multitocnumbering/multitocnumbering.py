# -*- coding: utf-8 -*-
"""
    multitocnumbering
    ~~~~~~~~~~~~~~~~~
    A sphinx extension for continuous numbering of sections across toctrees.
    
    Inspired by https://github.com/executablebooks/sphinx-multitoc-numbering

    Author: Patrick Sullivan sublime@vt.edu
"""

# Sphinx doesn't like having multiple Table-of-Content trees (tocs)
# in one page, like our index.rst file.  It mis-numbers them.  
# Here we hack in a way to fix it.

from typing import Dict, List, Set, Tuple
from typing import cast

from docutils import nodes
from docutils.nodes import Element

from sphinx import addnodes
from sphinx.environment import BuildEnvironment
from sphinx.locale import __
from sphinx.util import url_re, logging

logger = logging.getLogger(__name__)

__version__ = "0.1.4"
"""multitocnumbering version"""

numberingStart = 0  # this is what ALL section numbering ALWAYS starts with
# Does NOT modify or read from the chapter numbering in index.rst
# TODO: make both numberings configurable from the JSON config

def build_init_handler(app):
    from sphinx.util.console import bold
    logger.info(bold(f"multitocnumbering v{__version__}: Loaded"))


def assign_section_numbers(self, env: BuildEnvironment) -> List[str]:
    """Assign a section number to each heading under a numbered toctree."""
    # a list of all docnames whose section numbers changed
    rewrite_needed = []
    assigned = set()  # type: Set[str]
    old_secnumbers = env.toc_secnumbers
    env.toc_secnumbers = {}

    def _walk_toc(node: Element, secnums: Dict, depth: int, titlenode: nodes.title = None) -> None:
        # breakpoint()
        # titlenode is the title of the document, it will get assigned a
        # secnumber too, so that it shows up in next/prev/parent rellinks
        for subnode in node.children:
            if isinstance(subnode, nodes.bullet_list):
                numstack.append(numberingStart - 1) # a nested level!
                _walk_toc(subnode, secnums, depth - 1, titlenode)
                numstack.pop()
                titlenode = None
            elif isinstance(subnode, nodes.list_item):
                _walk_toc(subnode, secnums, depth, titlenode)
                titlenode = None
            elif isinstance(subnode, addnodes.only):
                # at this stage we don't know yet which sections are going
                # to be included; just include all of them, even if it leads
                # to gaps in the numbering
                _walk_toc(subnode, secnums, depth, titlenode)
                titlenode = None
            elif isinstance(subnode, addnodes.compact_paragraph):
                reference = cast(nodes.reference, subnode[0])
                if depth > 0:
                    numstack[-1] += 1 # increase to the actual number
                    number = list(numstack)
                    secnums[reference["anchorname"]] = tuple(numstack)
                else:
                    number = None
                    secnums[reference["anchorname"]] = None
                reference["secnumber"] = number
                if titlenode:
                    titlenode["secnumber"] = number
                    titlenode = None
            elif isinstance(subnode, addnodes.toctree):
                _walk_toctree(subnode, depth)

    def _walk_toctree(toctreenode: addnodes.toctree, depth: int) -> None:
        # breakpoint()
        if depth == 0:
            return
        for (title, ref) in toctreenode["entries"]:
            if url_re.match(ref) or ref == "self":
                # don't mess with those
                continue
            elif ref in assigned:
                logger.warning(f"{ref} is already assigned sections numbers; location={toctreenode}")
            elif ref in env.tocs:
                secnums = {}  # type: Dict[str, Tuple[int, ...]]
                env.toc_secnumbers[ref] = secnums
                assigned.add(ref)
                _walk_toc(env.tocs[ref], secnums, depth, env.titles.get(ref))
                if secnums != old_secnumbers.get(ref):
                    rewrite_needed.append(ref)

    # rearrange it to respect ordering in toctree directives
    rearranged_numbered_toctrees = []
    for toc in env.tocs:
        if toc in env.numbered_toctrees:
            rearranged_numbered_toctrees.append(toc)

    chapterNum = numberingStart
    for docname in rearranged_numbered_toctrees:
        assigned.add(docname)
        doctree = env.get_doctree(docname)
        for toctreenode in doctree.traverse(addnodes.toctree):
            depth = toctreenode.get("numbered", 0)
            if depth:
                # every numbered toctree continues the numbering
                numstack = [chapterNum, numberingStart - 1]
                _walk_toctree(toctreenode, depth)
                chapterNum += 1

    return rewrite_needed


def setup(app):
    from sphinx.environment.collectors.toctree import TocTreeCollector
    if TocTreeCollector.assign_section_numbers != assign_section_numbers:
        app.connect("builder-inited", build_init_handler)
        TocTreeCollector.assign_section_numbers = assign_section_numbers

