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
this and consequently set about to make a series of encodings of
lamdba expressions designed to satisfy the properties we expect from
the items in the preceding list.  Let's first examine some of the encodings for the
*church boolean* constants and operations.

-  TRUE = :math:`\lambda x.  \lambda y.x`
-  FALSE = :math:`\lambda x.  \lambda y.y`
-  AND = :math:`\lambda p. \lambda q.((p \; q) \; FALSE)`

The following slideshow indicates how TRUE AND FALSE is :math:`\beta` reduced.
   
.. inlineav:: church_bool ss
   :long_name: Church boolean slideshow
   :links: 
   :scripts: AV/PL/AV/church_bool.js
   :output: show

As one would expect for boolean operations, TRUE AND FALSE reduces to FALSE. 
   

Encoding If-Then-Else
---------------------

This problem is about a possible representation for the ternary IF/THEN/ELSE
operator.

.. avembed:: Exercises/PL/ChurchIfThen.html ka
   :long_name: If Then Else in Church Encoding

Encoding OR
-----------

This problem is about a possible representation for the binary OR
operator.

.. avembed:: Exercises/PL/ChurchOR.html ka
   :long_name: Church Encoding for OR


Church Numerals
---------------

To encode the non-negative integers, Church used the following encoding:

-  ZERO = :math:`\lambda f. \lambda\ x.x`

-  A successor function SUCC = :math:`\lambda n. \lambda f. \lambda x.(f \; ((n \; f) \; x))`

-  ONE = (SUCC ZERO) = :math:`\lambda f. \lambda\ x.(f \; x)`

-  TWO = (SUCC ONE) = :math:`\lambda f. \lambda\ x.(f \; (f \; x))`

-  THREE = (SUCC TWO) = :math:`\lambda f. \lambda\ x.(f \; (f \; (f \; x)))`

-  FOUR = (SUCC THREE) = ???

-  FIVE = (SUCC FOUR) = ???

-  SIX = (SUCC FIVE) = ???

-  SEVEN = (SUCC SIX) = ???

-  EIGHT = (SUCC SEVEN) = ???

-  NINE = (SUCC EIGHT) = ???

-  TEN = (SUCC NINE) = ???

To help you see how the successor function works, watch the following slideshow of how the successor of THREE is reduced to FOUR.
   
.. inlineav:: church_numeral ss
   :long_name: Church numeral slideshow
   :links: 
   :scripts: AV/PL/AV/church_numeral.js
   :output: show

Addition and multiplication can be encoded as:
	    
-  PLUS = :math:`\lambda m. \lambda n. \lambda f. \lambda x.((n \;f) \; ((m \; f) \; x))`

-  MULT = :math:`\lambda m. \lambda n. \lambda f.(m \; (n \; f))`

To see how the multiplication function works, watch the following slideshow of how (MULT TWO THREE) reduced to SIX.
   
.. inlineav:: church_mult ss
   :long_name: Church multiplication slideshow
   :links: 
   :scripts: AV/PL/AV/church_mult.js
   :output: show

An encoding for a predeccessor operation:

PRED = :math:`\lambda n. \lambda f. \lambda x.(((n \; \lambda g. \lambda h.(h \; (g \; f))) \lambda u.x) \; \lambda u.u)`

And an operation to test for zero in an **if-then-else**    

ISZERO = :math:`\lambda n.((n \; \lambda x.FALSE) \; TRUE)`

	    

Church numerals with addition and multiplication
------------------------------------------------

This problem will help you recognize and use the Church numerals as
well as the representation of the corresponding addition and
multiplication operators. To get credit for this randomized problem,
you must solve it correctly three times in a row.

.. avembed:: Exercises/PL/ChurchNumerals.html ka
   :long_name: Church Numerals


