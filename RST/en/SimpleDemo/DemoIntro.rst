.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Tom Naps and Cliff Shaffer

Slide Shows, KA and JSAV Exercises in OpenDSA
=============================================

Introduction
------------

To get you started, this module illustrates how to create some
slideshows and exercises.
The slideshows and exercises shown here can serve as starting points
for you to create your own content.
The source files for the visualizations that you see here can be found
by looking at the source for the reStructuredText (RST) file that holds
the prose for this tutorial (including the directives for embedding
the visualizations) at ``RST/en/SimpleDemo/DemoIntro.rst``.
The configuration file that lets you compile this "book" is in
``config/SimpleDemo.json``.

If you haven't done so already, you probabably should read the Getting
Started documentation for setting up the OpenDSA environment on your
own computer:
See https://opendsa.readthedocs.io/en/latest/GettingStarted.html.
You will probably also want to have handy the documentation on the
JSAV graphics library that we use, available at
http://jsav.io/.


A simple diagram
----------------

The simplest thing to do in terms of an OpenDSA visual is called a
"diagram".
This is just a static picture, and it has no interface.
To keep things simple for developers, diagrams are automatically
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
   :links: AV/Background/twoColorCON.css
   :scripts: AV/Background/twoColorCON.js
   :align: center

   A two-coloring for the regions formed by three lines in the plane.


There is a certain amount of art and judgment to writing even
something as simple as this diagram.
Imagine that we decided that the whole thing should be moved to the
right 100 pixels, maybe because we want to add some more content.
Look in the OpenDSA repository at the file
``[OpenDSA]/AV/Background/twoColorCON.js``.
Notice that the "x" coordinates for all of the objects include the
variable ``left``.
Simply increasing the value of ``left`` by 100 would shift the entire
image.
This code still has room for improvement.
It neglects to give a similar offset for the "y" coordinates, so it
would be hard to move the content up or down.


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

This slideshow also shows the power of the JSAV library, which was
written explicitly to help with developing algorithm visualizations.
JSAV "understands" a number of data structures and basic
infrastructure that we use for most of our work.
The two-coloring diagram did not make much use of the power of JSAV,
since there were no data structures.
But this simple slideshow is using JSAV to support the slideshow
controls at the top (notice that you don't have to do anything to get
these).
For that matter, its JSAV that provides all of the infrastructure for
the concept of a "slideshow" that users can move back and forth in.
It also provides the interface for adding the messages at each
slide, and the display for the array logical object
(including the boxes, the data values, and the index values).
JSAV has support for a variety of trees, graphs, list structures, code
snippets with line highlighting, and basic animation effects.


A slideshow that has been "internationalized"
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Our next example shows a simple slideshow to demonstrate a standard
Insertion Sort.
What is new here is that all of the strings from the slideshow's
interface are moved into a ``.json`` file.
This allows for a simple mechanism to compile books in various natural
languages (English, French, Finnish, etc.).

.. inlineav:: insertionsortCON ss
   :long_name: Insertion Sort Slideshow
   :links: 
   :scripts: AV/Sorting/insertionsortCON.js
   :output: show

This same mechanism is also used to compile books that use different
programming languages for its examples.
To see a good example of how the code from different languages can be
included, and how the resulting line highlighting is altered to match
changes in the line numbers that results, see
``[OpenDSA]/AV/List/alistInsertCON.json``.


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


Displaying data structures
--------------------------

One of JSAV's most important jobs is to support content developers by
displaying standard data structures for them.
Here is diagram that uses the linked list ADT.

.. inlineav:: llistRepCON dgm
   :links: AV/List/llistCON.css
   :scripts: AV/List/llist.js AV/List/llistRepCON.js
   :align: center

And here is a slideshow that shows how to insert into a linked list.
It also shows a code display object.

.. inlineav:: llistInsertCON ss
   :long_name: Linked List Insert Slideshow
   :links: AV/List/llistCON.css
   :scripts: AV/List/llist.js AV/List/llistInsertCON.js
   :output: show

Here is an example of using the binary tree API, along with a pointer
object and ``addClass`` to color some nodes.

.. inlineav:: BSTsearchCON ss
   :long_name: BST Search Slideshow
   :links: AV/Binary/BSTCON.css
   :scripts: AV/Binary/BSTsearchCON.js
   :output: show

            
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


Simple JSAV Proficiency Exercise
--------------------------------

JSAV exercises don't use the KA infrastructure but instead rely on an
exercise API incorporated directly into JSAV.  This API is described
at http://jsav.io/exercises/exercise/.  The essence of a JSAV
proficiency exercise is that a user is asked to trace each successive
step in some algorithm.  At any given stage they may ask to see a
"model answer", but upon doing so will be notified that their current
attempt at the exercise will now not be officially graded.

JSAV provides a tutorial on how to use this API at
http://jsav.io/exercises/tutorial-exercise/.  In this tutorial the
user is asked to successively click on each element of an array in
left-to-right fashion and then click on the first and last elements to
swap them.  In the simple demo example below, we extend that example
by also asking the user to increment each array element by one before
clicking on it.  We also organize the example to be more consistent
with the exercise guideline described at
https://opendsa.readthedocs.io/en/latest/AV.html#stand-alone-vs-inline-avs-and-exercises by breaking up the code for the example into five separate files:

- simpledemoPRO.css -- style file
- simpledemoPRO.html -- HTML for the iframe that contains the exercise in the book module
- simpledemoPRO.js -- Java Script code.  Here we provide the function
  for initialization/reset, the function for the model solution, the
  handler for the user's clicking on an array element, and the
  function to "fix" an erroneous response provided by a user so that
  user can continue on from this step (without receiving credit for
  the step).
- simpledemoPRO.json -- configuration file
 

.. avembed:: AV/SimpleDemo/simpledemoPRO.html pe
   :long_name: SimpleDemo Proficiency Exercise
   
