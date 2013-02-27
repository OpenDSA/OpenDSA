.. _ODSAModAuthor:

Authoring OpenDSA Modules
=========================

This documentation describes the support infrastructure for authoring
OpenDSA modules.
We author using
`reStructuredText <http://docutils.sourceforge.net/rst.html>`_ (also
known as ReST).
ReST files are converted to HTML (or other formats) by the
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
