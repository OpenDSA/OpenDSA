.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Austin Hoefs

============================================================
Array Scrambling
============================================================

Random Array Scramble
-----------------------


This algorithm starts with a sorted list and scrambles them in a random order. 
The scrambling is done by looping through the length of the array. In the loop it 
swaps the index with a random generated number. If the random generated number is the same
as the value of the current index it chooses a new number. It also chooses a new number if the
random generated number is the same as the previous number.

.. inlineav:: AustinArrayScramble ss
   :output: show


.. odsascript:: AV/Development/hoefsa97/js/ArrayScramble.js
