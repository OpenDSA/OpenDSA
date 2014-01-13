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

Create Course Notes
-------------------
OpenDSA uses `hieroglyph <https://github.com/nyergler/hieroglyph/>`_ a Sphinx 
extension to build HTML slides.

The course notes infrastructures is similar to eTextBook creation, and uses
``OpenDSA/Makefile``. The only difference is the ``s`` option for slides
when calling the configuration, for example ``python tools/configure.py s config/OpenDSA.json``.


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

Teacher View Configuration
==========================
To configure a view for a specific course/book instance, it is required to 
create a course and an assignement for that course through the backend 
administration `console <http://opendsa.cc.vt.edu/admin/>`_. Only Django
administration account can perform these tasks.

Course Creation
---------------

Select ``course``, then ``Add course``, and fill in the form and assign teacher(s) to the course.

Select ``course instance`` to create an instance of the course you just created. Fill in the 
form and eventually assign teaching assistants. 

Select ``Books``, and click on the url of the OpenDSA book instance you want to associate to the
course. In the book's form select the appropriate course.

Assignment Creation
-------------------

At this point it is necessary to create an assignment after configuring a course.

Select ``Assignments``, then ``Add assignments``. In the creation form, select any course module,
then the corresponding book. There is no need to add exercises to the assignement at this point, 
it will be done by the teacher through the teacher view.















