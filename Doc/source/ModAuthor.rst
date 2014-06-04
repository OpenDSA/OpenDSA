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
:ref:`Using OpenDSA with Khan Academy infrastructure <Exercise>`.

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
MathJax (which does the LaTeX conversion within an HTML page, you have
to use a double backslash for escaping the dollar sign symbol, such
as::

   This costs \\$5.00.


Translation Support
-------------------

OpenDSA supports a sophisticated internationalization framework that
attempts to make it as easy as possible to support compiling textbook
instances in various (natural) languages.
The configuration system allows a book compiler to specify the
language of choice, and the system will take module versions in the
target language whenever available (the fallback language is
English).

* Use the 'lang' variable in the configuration file to set up the book
  language. 
  A list of languages supported by sphinx can be found at
  http://sphinx-doc.org/config.html#confval-language.

* The translation ``.json`` file ``language_msg.json`` is located
  inside the ``tools`` directory.
  Each language is represented by its code in language_msg.json. Make
  sure that a translation is available in language_msg.json file
  before building a book in that language.

* The terms for each language are grouped in two categories in
  ``language_msg.json``:

  - ``jinja`` for the terms that will be added inside the configuration
    file. They will be passed by Sphinx to the templating system
    (jinja + haiku).
  - ``js`` for the terms processed by odsaMOD.js library and injected
    while the page is loading.

* Structure of language_msg.json::

   {
     "en"{
       "jinja": {
         "term1": "en_term1",
         ...
       },
       "js": {
         "term2": "en_term2",
         ...
       }
     },
     "fi"{
       "jinja": {
         "term1": "fi_term1",
         ...
       },
       "js": {
         "term2": "fi_term2",
         ...
       }
     }
   }

* The book configuration  program will read the language variable.
  If a translation for the entered language is not available, the
  default language english is used.
  The configuration process will then insert the language inside the
  onfiguration file and copy the translation file in the Book _static
  directory.

AVs and exercises also support internationalization through the use of
an associated ``.json`` file that provides the various translation
text for all strings that appear in the AV.
JSAV provides translations to many languages for its infrastructure
strings.


Compile a book instance
-----------------------

Here are instructions for how to compile a book instance.

TODO: CREATE INSTRUCTIONS.

If you are responsible for creating content for a specific class that
has a class instance set up at the OpenDSA backend server, then you
might be the one responsible for registering the various exercises
with the backend database.
See  "Registering a Book Instance" in the
:ref:`Instructor's Tools  <InstructorTools>` section.

Create Course Notes
-------------------
OpenDSA uses `hieroglyph <https://github.com/nyergler/hieroglyph/>`_ a Sphinx 
extension to build HTML slides.

The course notes infrastructures is similar to eTextBook creation, and uses
``OpenDSA/Makefile``. The only difference is the ``s`` option for slides
when calling the configuration, for example ``python tools/configure.py s config/OpenDSA.json``.
