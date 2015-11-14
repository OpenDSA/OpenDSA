.. _ModAuthor:

Module Authoring
================

OpenDSA modules are authored using 
`reStructuredText <http://docutils.sourceforge.net/rst.html>`_
(also known as ReST).  The source files for these modules (which 
can be found in ``OpenDSA/RST/source``) are compiled to HTML 
(or, in theory, other formats -- but we do not support that) by 
`Sphinx <http://sphinx.pocoo.org/contents.html>`_.
To create a "book", you must invoke ``OpenDSA/tools/configure.py``, 
being sure to specify a configuration file (sample of which can be 
found in ``OpenDSA/config``.
Sample books can be compiled using ``OpenDSA/Makefile``.
A sample command (run from the OpenDSA toplevel directory)
looks like: ``python tools/configure.py config/OpenDSA.json``.

A number of special directives have been created, which are documented
in :ref:`OpenDSA ReST Extensions <ODSAExtensions>`.

Documentation for writing OpenDSA exercises using the Khan Academy
infrastructure is in
:ref:`Using OpenDSA with Khan Academy infrastructure <KAExercise>`.

Documentation for writing pure JSAV-based proficiency exercises
is in
:ref:`Using OpenDSA with Khan Academy infrastructure <KAExercise>`.

The best way to get a sense for how things work is to look at some
existing modules.

Module Structure
----------------

Each module is basically a single ReST file.
The first thing that will normally appear is the 
``avmetadata`` directive block.
Among other things, this will define the module within the
prerequisite structure, which is important when
generating a full textbook.

A big reason why we chose to use ReStructuredText for authoring is its
ability to pass raw HTML through, allowing us to embed dynamic content
(i.e., JavaScript) into our HTML pages while still having the
advantage of a markup language for authoring.
However, we don't ever want to actually use the ``raw`` directive in
our modules if we can avoid it.
At this point use of ``raw`` should never be needed, as we have a
number of directives to use instead:
``avembed``, ``inlineav``, ``odsalink``, and ``odsascript``.

Most exercises and visualizations are embedded into the module from
elsewhere  using the ``avembed`` directive, but small slideshows and
dynamically generated diagrams can be included directly using the
``inlineav`` directive.
Any CSS or JS code that is unique to a specific module page should be 
maintained in separate files and included using ``odsalink`` and 
``odsascript`` directives, respectively.

Defining which modules will be used in a given book, which exercises
are included for credit, and various other aspects of module use are
defined with the
:ref:`Configuration system <Configuration>`.

Math and Symbol Escapes
-----------------------

All equations within a module are created using LaTeX syntax embedded
in a ``:math:`` inline directive.
This will be converted to appropriate math layout in the resulting
HTML file.
Note that due to various interactions between reStructuredText and
MathJax (which does the LaTeX conversion within an HTML page),
you have to use a double backslash for escaping the dollar sign
symbol, such as::

   This costs \\$5.00.


Math and Code
-------------

One of the hardest things when writing modules is making sure
that all of the variables and expressions are marked up correctly.
In nearly all cases, any variable is either "mathy" or "codey". Mathy
variables and expressions should use LaTeX markup embedded in a
``:math:`` directive.
"Codey" variables and expressions should be marked up as::

   ``my codey text``

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
The default coding language(s) used by a textbook instance is
controlled by the ``code_lang`` setting in the corresponding OpenDSA
:ref:`configuration <Configuration>` file.

The OpenDSA framework and configuration support makes it as easy as
possible to be able to compile book instances with code snippets from
your desired programming language(s), assuming that the code snippets
have been provided by a content developer.
The most important principle for managing code snippets is that they
should be taken from working programs that can properly support
testing of the code that you include into your modules.

All such sourcecode should appear in the ``SourceCode`` directory
within OpenDSA, with each coding language having its own
subdirectory.
A given AV can have an associated ``.json`` file that defines the
configuration for alternate coding languages, including such things as
the filename.

Note that in the ``.json`` file, a given section of the ``code`` block
should match the subdirectory name within the ``SourceCode`` directory
for that language.


Creating Course Notes
---------------------
OpenDSA uses `hieroglyph <https://github.com/nyergler/hieroglyph/>`_ a Sphinx 
extension to build HTML slides.

The course notes infrastructures is similar to eTextBook creation, and uses
``OpenDSA/Makefile``. The only difference is the ``s`` option for slides
when calling the configuration, for example ``python tools/configure.py s config/OpenDSA.json``.


Internationalization Support
----------------------------

OpenDSA supports a sophisticated internationalization framework that
attempts to make it as easy as possible to support compiling textbook
instances in various (natural) languages.
The configuration system allows a book compiler to specify the
language of choice, and the system will take module versions in the
target language whenever available (the fallback language is
English).

As a module author, your ``.rst`` files will always appear in a
subdirectory of the ``RST`` directory coded to the language that you
are writing for.
Like every other aspect of internationalization, we define these
subdirectories using the two-letter
`ISO 639-1 <http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes>`_
language codes.
Thus, all English-language RST files appear in the ``RST/en``
directory.
