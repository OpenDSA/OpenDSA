.. _Style:

House Style Rules
=================

The following guidelines should be observed when writing content for
the OpenDSA project.

Content Types
-------------

OpenDSA content can generally be divided into the following types:

- modules: written in ReST and whose source resides in the
  OpenDSA/RST/source directory,
- exercises: implemented using the Khan Academy Infrastructure and
  residing in the OpenDSA/Exercises directory,
- mini-slideshows and diagrams: directly embedded into modules using the
  ``inlineav`` directive and whose source resides in the OpenDSA/AV
  directory, and
- visualizations and activities: embedded as iframes using the
  ``avembed`` directive, and residing in the OpenDSA/AV directory.

Algorithm Visualizations and slideshows
---------------------------------------

New content always should begin development within the
OpenDSA/AV/Development directory. Once the implementation is completed
and validated, then it will be moved by the project managers to a
topic sub-directory.

Directly embedded content (slideshows and diagrams) should have no
width set so that it will naturally expand to the page width as
appropriate.

Nothing should require a width greater than 850px.
This keeps all visual elements within the minimum page size enforced
by the Haiku template.

The typical classroom projector provides a vertical screen resolution
of 800 pixels, and that fits the limits of many laptops and tablets.
Given the requirements for browser toolbars, etc., the most that you
can count on for the vertical space shown for an actual browser page
is about 650 pixels, so that it the absolute maximum height for any
given visual element such as an AV or an exercise.
It is better to stay under 600 pixels if possible, so that the
show/hide button is also visible (this provides important feedback
when working an exercise).

HTML, CSS, and JavaScript should all be kept in separatea files. Each
should pass its respective validation tools without complaint. See the
developer's "Getting Started" guide for details on using the
validation tools.

Modules
-------

A big reason why we chose to use ReStructuredText for authoring is its
ability to pass raw HTML through, allowing us to embed dynamic content
(i.e., JavaScript) into our HTML pages while still having the
advantage of a markup language for authoring.
However, we don't ever want to actually use the ``raw`` directive in
our modules if we can avoid it.
At this point use of ``raw`` should never be needed, as we have a
number of directives to use instead:
``avembed``, ``inlineav``, ``odsalink``, and ``odsascript``.

One of the hardest things I find when writing modules is making sure
that all of the variables and expressions are marked up correctly.
In nearly all cases, any variable is either "mathy" or "codey". Mathy
variables and expressions should use LaTeX markup embedded in a ``:math:``
directive. "Codey" variables and expressions should be marked up as::

    ``code``

All variables (and expressions) should always get their appropriate
typeface.
Avoid using physical markup such as italics or bold for such things,
we prefer to use logical markup (that is, math markup or code markup).
Sometimes it can be difficult to decide which is appropriate.
For example, you might have a function with a variable ``n`` for the
array size.
When it comes time to discuss the analysis of the function, it is
probably going to be done in terms of :math:`n`, a quantity that
expresses the array size (as opposed to the function variable ``n``).
It can be a subtle point whether the variable or the quantity is
intended.
Having to typeset it (and so make a conscious decision) helps you to
think through what you are trying to convey.

Code Snippet Support
--------------------

OpenDSA and JSAV provide an extensive framework for integrating code
snippets into your modules and visualizations.
JSAV provides support through the Pseudocode API for displaying and
manipulating your code snippets within an AV.
See the JSAV manual for details.
Within a module, code snippets are meant to be embedded from a
sourcecode file using the ``codeinclude`` directive.

The OpenDSA framework and configuration support makes it as easy as
possible to be able to compile book instances with code snippets from
your desired programming language(s), assuming that the code snippets
have been provided by a content developer.
The basic concept for managing code snippets is that they should be 
taken from working programs that can properly support testing of the
code that you included into your modules.

All such sourcecode should appear in the ``SourceCode`` directory
within OpenDSA, with each coding language having its own
subdirectory.
A given AV can have an associated ``.json`` file that defines the
configuration for alternate coding languages, including such things as
the filename.

Note that in the ``.json`` file, a given section of the ``code`` block
should match the subdirectory name within the ``SourceCode`` directory
for that language.
