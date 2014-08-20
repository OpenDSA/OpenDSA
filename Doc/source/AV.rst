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
control element styling whenever possible.
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
