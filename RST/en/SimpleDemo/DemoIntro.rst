.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Tom Naps and Cliff Shaffer

Slide Shows and KA Exercises in OpenDSA
=======================================

Introduction
------------

To get you started, the following "learning module" illustrates how to
create some slideshows and exercises.
The source files for the visualizations that you see here can be found
by looking at the source for the reStructuredText (RST) file that holds
the prose for this tutorial (including the directives for embedding
the visualizations) at ``RST/en/SimpleDemo/DemoIntro``.
The configuration file that lets you compile this "book" is in
``config/SimpleDemo.json``.

No particular "algorithm" is being illustrated here, we are showing
slideshows and exercises as starting points for you to create your own
content.


A simple diagram
----------------

The simplest thing to do in terms of an OpenDSA visual is called a
"diagram".
This is just a static picture, and it has no interface.
To keep things simple for devlopers, diagrams are automatically
incorporated into the compiled HTML page for a book using the
``inlineav`` directive in the RST file.
That means there is no explicit HTML file that a developer creates for
a diagram, just a JavaScript file and perhaps a CSS file.
Note use of the ``dgm`` tag to tell the OpenDSA framework not to
provide any interface such as buttons to control a slideshow.

Figure :num:`Figure #TwoColor` shows a two-coloring for the plane
with three lines. 

.. _TwoColor:

.. inlineav:: twoColorCON dgm
   :links: AV/background/twoColorCON.css
   :scripts: AV/Background/twoColorCON.js
   :align: center

   A two-coloring for the regions formed by three lines in the plane.


A slideshow to swap array elements displayed as an inline AV
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following demonstrates a basic slideshow to swap two array
elements (see ``AV/SimpleDemo/simple_demo1.js``).
Note use of the ``ss`` tag to the ``inlineav`` directive, telling the
framework to embed this with basic slideshow controls.
Again, the developer does not make an explicit HTML page to hold the
slideshow.

.. inlineav:: simple_demo1 ss
   :long_name: Simple demo slideshow 1
   :links: 
   :scripts: AV/SimpleDemo/simple_demo1.js
   :output: show

A slideshow that has been "internationalized"
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Our next example shows a simple slideshow to demonstrate a standard
Insertion Sort.
What is new here is that all of the strings from the slideshow's
interface are moved into a ``.json`` file.
This allows for a simple mechanism to compile books in various natural
languages (English, French, Finnish, etc.).
This same mechanism is also used to compile books that use different
programming languages for its examples.

.. inlineav:: insertionsortCON ss
   :long_name: Insertion Sort Slideshow
   :links: 
   :scripts: AV/Sorting/insertionsortCON.js
   :output: show


Swapping array elements with user input of the array and a reset button
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Here we have the same visualization as in the previous inlineav, but
now as an embedded AV (and so it is embedded into the module using the
``avembed`` directive).
Although it is slightly more complicated this way (for one thing, the
developer has to make an explicit HTML file), it allows the developer
to specify the visualization's interface.
This allows the visualization to do things like
process input from the user on the embedded page.
Here the user can enter a space-separated list of numbers, or if they
choose to not do so, an OpenDSA utility randomly generates them for
the user.
(See *simple_demo2* in the AV/SimpleDemo directory.)

.. avembed:: AV/SimpleDemo/simple_demo2.html ss

The general rule is: If there is no user input or interaction beyond
clicking through slides, then do it as a "slideshow" with the
``inlineav`` directive.
If you want user input or interaction, then do it as a standalone AV
embedded with the ``avembed`` directive.


A Khan Academy Exercise with JSAV object
----------------------------------------

This example shows how to embed a Khan Academy exercise that has the
user identify the maximum by clicking on a JSAV array cell.
(See *Simple_demo_ex1* in the Exercises/SimpleDemo directory.)

.. avembed:: Exercises/SimpleDemo/Simple_demo_ex1.html ka


A Khan Academy Exercise with Fill-in-the-blank Question
-------------------------------------------------------

This example shows how to embed a Khan Academy exercise that has the
user identify the maximum by typing the number into a text box.
(See *Simple_demo_ex2* in the Exercises/SimpleDemo directory.)

.. avembed:: Exercises/SimpleDemo/Simple_demo_ex2.html ka


A Khan Academy Exercise with Multiple Choice Question
-----------------------------------------------------

This example shows how to embed a Khan Academy exercise that has the
user identify the maximum by picking it from a multiple-choice list.
(See *Simple_demo_ex3* in the Exercises/SimpleDemo directory.)

.. avembed:: Exercises/SimpleDemo/Simple_demo_ex3.html ka
