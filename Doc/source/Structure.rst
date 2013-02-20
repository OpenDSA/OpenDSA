.. _Structure:

Module Structure
================

Each module is basically a single ReST file.
However, the first thing that you should always include is an
`avembed` directive block.
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
