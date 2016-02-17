.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Justin Gottschalk

============================================================
Illustrate Array Randomization
============================================================

How JustinRandom works
----------------------
The randomization of the array is based off a traversal of the elements swapping each one with a randomly chosen index of another element.
The code is controlled with a for loop and the random index value is controlled by the Javascript funtion Math.random and formatted with Math.floor



Visualization of the Algorithm
------------------------------

.. inlineav:: JustinRandom ss
   :output: show


.. odsascript:: AV/Development/JustinRandom.js
