.. _ModAuthor:

Module Authoring
================
We author modules using
`reStructuredText <http://docutils.sourceforge.net/rst.html>`_
(also known as ReST).
ReST files are converted to HTML (or, in theory, other formats -- but
we do not support that) by the
`sphinx compiler <http://sphinx.pocoo.org/contents.html>`_.
Module source files are currently at ``OpenDSA/RST/source``.
A "book" is created by running some configuration file against the
script ``OpenDSA/lib/configure.py``.
We normally store sample configuration files in ``OpenDSA/config``.
Sample books can be compiled using ``OpenDSA/Makefile``.
A sample command (run from the OpenDSA toplevel directory)
looks like: ``python lib/configure.py config/OpenDSA.json``.

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
However, the first thing that you should always include is an
`avmetadata` directive block.
Among other things, this will define the module within the
prerequisite structure, which is important when generating a full
textbook.
It is also important to add the line::

    .. include:: JSAVheader.rinc

This allows the "About" link used on every page to get access to the
JSAV library (which it uses to post the version number).
This also provides access to JSAV, jQuery, etc. to any JavaScript
files that you want to include to control dynamic components on the
page.

Generally, exercises and visualizations are embedded from elsewhere.
The major exception is small slideshows, which are included directly
via an ``inlineav`` directive.
The actual CSS code and JS code will be maintained in separate files
and included using ``odsalink`` and ``odsascript`` directives,
respectively.
