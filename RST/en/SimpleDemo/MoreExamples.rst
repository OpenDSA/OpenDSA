.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer

Click Handlers and Special Features
===================================

Click Handlers
--------------

Occasionally in an interactive visualization, and certainly in any
interactive exercise you will need a click handler to support the
interaction with graphical elements on the canvas. Here is a variety
of examples.

.. avembed:: AV/SimpleDemo/ClickHandlerTest.html ss

Exercise Stack
--------------

Demo for a special stack display style that gets used in some
exercises to show the user input values to be dealt with.

.. avembed:: AV/SimpleDemo/stackTest.html ss

Automatic node resize
---------------------

Nodes more-or-less automatically resize to match the value
string.

.. avembed:: AV/SimpleDemo/autonodes.html ss

.. TODO::
   :type: Visualization

   This would be better if there was padding on the string, and if it
   were better centered vertically. It also only works because we
   leave out lib/odsaStyle.css. This should get fixed to work with
   that. Finally, it ought to be a diagram, not a standalone AV.
   
MathJAX
-------

Examples of using MathJAX.

.. avembed:: AV/SimpleDemo/mathjax_test.html ss

.. TODO::
   :type: Visualization

   This could be cleaned up a bit.

