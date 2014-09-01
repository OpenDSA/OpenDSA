.. _AV:

Notes for AV and Exercise Developers
====================================

Configuration
-------------

Any JSAV-based AV (both standalone and in-lined slideshows) and
exercises can be associated with a configuration file.
This is a ``.json`` file whose default name is the same as the name of
the container for an inlined slideshow, or the same as the standalone
AV or exercise (that is, ``myAV.html``, ``myAV.js``, and
``myAV.json``).

Configuration files support sections for defining all strings (used
for internationalziation support), mapping logical names to code lines
(to support alternate programming language examples in JSAV code
objects), and setting defaults for configuration parameters.

Until we get proper documentation, see some of the ``.json`` files in
the ``AV`` directory for examples.

Equations
---------

Within ``jsav.umsg()`` text, all math should be done using LaTeX
format enclosed within ``$...$`` (for inline expressions) or
``$$ ... $$`` (for display equations).
MathJax will automatically recognize the dollar sign markup, and it
will automatically do the conversion from LaTeX format to HTML.
The only peculiarity that you should need to worry about is that
backslashes must be escaped by using two backslashes.
So a typical math markup within an AV or slideshow might look like::

   jsav.umsg("This takes $\\Theta(n)$ time.");

CSS
---

Anything related to visual element style that is static should be
defined in a CSS file.
For example, if a JSAV array is placed at a specific location that
never changes, then this location should be defined within a CSS file
for your AV or slideshow.

Some styling aspects are dynamic. For example, over the course of a
visualization, nodes in a tree might need to change color to emphasize
the action being visualized. Looking at the JSAV manual, you will
notice that most visual elements can be styled with a ``.css()``
method on the element.
But in nearly all cases, we wish to avoid using that method.
We prefer to use the ``.addClass()`` and ``.removeClass()`` methods to
control dynamic element styling whenever possible.
These methods will dynamically assign or remove a CSS class to the
element in the DOM.
You can define any necessary new class in your AV's CSS file.
But before doing so, you should first check to see if a suitable class
already exists in the OpenDSA style file at ``lib/odsaStyle.css``.
Given that we have developed a lot of visualizations already, the odds
are pretty high that whatever visual styling you want to do is
semantically equivalent to something that we already support.
If so, you should be using the same style definition.
For example, if you have a cell in an array or a node in a tree that
your AV is currently acting on, then you probably want to indicate
this by styling it using ``mynode.addClass("processing")`` for a tree
node object named ``mynode``, or using ``myarray.(index,
"processing")`` for array position ``index`` in JSAV array ``myarray``.


"Stand-alone" vs. "Inline" AVs and Exercises
--------------------------------------------

Structurally, there are two ways that we include AVs and exerices into
a module.
First is the "stand-alone" artifact, which has its own HTML pages.
In principle, this might be anything with its own URL, though in
practice we usually only include our own materials.
This is done using the ``avembed`` directive
(see :ref:`avembed`).
When converted to HTML, the mechanism used is a standard ``iframe``
tag to include the artifact.

"Inline" AVs are usually either a JSAV diagram or a JSAV slideshow
(a diagram is just a "slideshow" with no slide controls at the top).
These are included using the ``inlineav`` directive
(see :ref:`inlineav`).
The ``avID`` is the container name for the AV.
Of course, the final HTML page has to get access to the relevent
JavaScript and CSS files.
This is done by putting at the bottom of the .rst file an
``odsascript`` directive giving the path and name of the Javascript
file (see :ref:`odsascript`).
If a CSS file is used, then you put near the top of the .rst file
(right after the ``avmetadata`` block) an ``odsalink`` directive
giving the path and name of the CSS file (see :ref:`odsalink`).
Our naming convention is that all inlineavs use container names that
end in ``CON``, and that the .js and .css files use the container
name.
Further, our convention is that each individual slideshow or diagram
be in its own JavaScript file (though this is convention is violated
on occasion if there are a lot of very short slideshow files in a
given page).

The ``odsascript`` and ``odsalink`` directives do nothing more than
map down to ``<script></script>`` and ``<link></link>`` tags,
respectively, in the final HTML pages.
Their purpose is merely to keep module authors from needing to use raw
HTML code in an RST file.
