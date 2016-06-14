.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Tom NAos

=====================================================================
Illustrate slide shows and KA exercises in an OpenDSA learning module
=====================================================================

Swapping array elements
-----------------------


The following slideshow demonstrates how, starting with a slideshow
like you worked with in the first week's lab, you can incorporate it into a
learning module as an inlineav.

.. inlineav:: simple_demo1 ss
   :output: show

Swapping array elements with a reset button 
-------------------------------------------

Here we have the same visualization as in the previous inlineav, but
now as an embedded AV.  Although it is slightly more complicated this
way, it allows us to process input from the user on the embedded page.
Here the user can enter a space-separated list of numbers, or if they
choose to not do so, an OpenDSA utility randomly generates them for
the user.


.. avembed:: AV/SimpleDemo/simple_demo2.html ss


A Khan Academy Exericse with JSAV object
----------------------------------------

This example shows how to embed a Khan Academy exercise that has the user identify the 
maximum by clicking on a JSAV array cell.

.. avembed:: Exercises/SimpleDemo/Simple_demo_ex1.html ka

A Khan Academy Exericse with Fill-in-the-blank Question
-------------------------------------------------------

This example shows how to embed a Khan Academy exercise that has the user identify the 
maximum by typing the number into a text box.

.. avembed:: Exercises/SimpleDemo/Simple_demo_ex2.html ka

A Khan Academy Exericse with Multiple Choice Question
-----------------------------------------------------

This example shows how to embed a Khan Academy exercise that has the user identify the 
maximum by picking it from a multiple-choice list.

.. avembed:: Exercises/SimpleDemo/Simple_demo_ex3.html ka


.. odsascript:: AV/SimpleDemo/simple_demo1.js
