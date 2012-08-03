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
This also gives you access to JSAV, jQuery, etc., for your
development.

Generally, exercises and visualizations are embedded from elsewhere.
The major exception is small slideshows, which are included directly
via raw HTML.
But the actual CSS code and JS code will be maintained
in separate files (so that the code can be validated).
These files are included as appropriate.
See some existing modules for examples.
