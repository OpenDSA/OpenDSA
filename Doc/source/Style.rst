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

HTML, CSS, and JavaScript should all be kept in separate files.
Each should pass its respective validation tools without
complaint.
See the developer's "Getting Started" guide for details on using the
validation tools.
