.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps

.. odsalink::  AV/PL/AV/church_string.css

Church Numerals and Booleans
============================

Church Booleans
---------------

To turn the  :math:`\lambda` calculus into a "real" programming language, we
need to be able to manipulate:

-  boolean constants (true, false)
-  logical operators (and, or, not)
-  conditionals (if)
-  integers (0, 1, 2, 3, etc.)
-  arithmetic operators (:math:`+`, :math:`-`, etc.)
-  mathematical functions (factorial, etc.)

Alonzo Church, the creator of the :math:`lambda` calculus, realized
this and consequently set about to make a series of definitions of
lamdba expressions designed to satisfy the properties we expect from
the items in the preceding list.  Let's first examine some of the
*church boolean* constants and operations.

-  TRUE = :math:`\lambda x. \; \lambda y.x`
-  FALSE = :math:`\lambda x. \; \lambda y.y`
-  AND = :math:`\lambda`\ p.\ :math:`\lambda`\ q.((p q) FALSE)

.. inlineav:: church_bool ss
   :long_name: Church boolean slideshow
   :links: 
   :scripts: AV/PL/AV/church_bool.js
   :output: show


   

RP 18 Part 2
------------

This problem is about a possible representation for the ternary IF/THEN/ELSE
operator.

.. avembed:: Exercises/PL/RP18part2.html ka
   :long_name: RP set #18, question #2

RP 18 Part 3
------------

This problem is about a possible representation for the binary OR
operator.

.. avembed:: Exercises/PL/RP18part3.html ka
   :long_name: RP set #18, question #3


Church Numerals
---------------

Text forthcoming

RP 18 Part 1
------------

This problem will help you recognize and use the Church numerals as
well as the representation of the corresponding addition and
multiplication operators. To get credit for this randomized problem,
you must solve it correctly three times in a row.

.. avembed:: Exercises/PL/RP18part1.html ka
   :long_name: RP set #18, question #1


