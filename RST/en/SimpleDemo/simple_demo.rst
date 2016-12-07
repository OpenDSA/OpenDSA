.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Tom Naps

===============================================================================================
Illustrate slide shows and KA exercises in a Simple Demonstration of an OpenDSA learning module
===============================================================================================

Introduction
------------

To get you started, the following "learning module" illustrates how to
create some slideshows and exercises.  The slideshows you see here are
in the AV/SimpleDemo directory, and the the exercises are in the
Exercises/SimpleDemo directory.  No real "algorithm" is illustrated
here, but rather the slideshows and exercises are meant as starting
points for you to create your own content.

A slideshow to swap array elements displayed as an inline AV
------------------------------------------------------------


The following demonstrates how, once you have created a slideshow to
swap two array elements (see *simple_demo1* in the AV/SimpleDemo
directory), you can then incorporate it into a learning module as an
inline AV.

.. inlineav:: simple_demo1 ss
   :output: show

Swapping array elements with user input of the array and a reset button
-----------------------------------------------------------------------

Here we have the same visualization as in the previous inlineav, but
now as an embedded AV.  Although it is slightly more complicated this
way, it allows us to process input from the user on the embedded page.
Here the user can enter a space-separated list of numbers, or if they
choose to not do so, an OpenDSA utility randomly generates them for
the user.  (See *simple_demo2* in the AV/SimpleDemo
directory.)


.. avembed:: AV/SimpleDemo/simple_demo2.html ss


A Khan Academy Exercise with JSAV object
----------------------------------------

This example shows how to embed a Khan Academy exercise that has the user identify the 
maximum by clicking on a JSAV array cell.  (See *Simple_demo_ex1* in the Exercises/SimpleDemo
directory.)

.. avembed:: Exercises/SimpleDemo/Simple_demo_ex1.html ka

A Khan Academy Exercise with Fill-in-the-blank Question
-------------------------------------------------------

This example shows how to embed a Khan Academy exercise that has the user identify the 
maximum by typing the number into a text box.  (See *Simple_demo_ex2* in the Exercises/SimpleDemo
directory.)

.. avembed:: Exercises/SimpleDemo/Simple_demo_ex2.html ka

A Khan Academy Exercise with Multiple Choice Question
-----------------------------------------------------

This example shows how to embed a Khan Academy exercise that has the
user identify the maximum by picking it from a multiple-choice list.
(See *Simple_demo_ex3* in the Exercises/SimpleDemo directory.)

.. avembed:: Exercises/SimpleDemo/Simple_demo_ex3.html ka


.. odsascript:: AV/SimpleDemo/simple_demo1.js
