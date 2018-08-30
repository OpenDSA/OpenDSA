.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer

Major Concepts
==============

Automata
--------
.. _AutomataFig:

.. inlineav:: AutomataCON dgm
   :links: AV/OpenFLAP/AutomataCON.css
   :scripts: AV/OpenFLAP/AutomataCON.js
   :align: center


   Abstract model of a digital computer.
   Note that in the control unit, the numbers are symbolizing
   "states", which are the specific positions on the dial that the
   arrow may point to.
   While this picture shows the physical components of the "computer",
   it is not showing the control behavior (what to do if in a given
   state with a given symbol on the current square of the tape, and a
   given value at the current position in the storage unit).
   This control behavior is like the "software" of the computer.


There is a program associated with the control unit,
and the input is processed once from left to right.
Some versions have an additional storage unit.
We will define specific automata throughout the semester.

This is the topic for the next chapter.