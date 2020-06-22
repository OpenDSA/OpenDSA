.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
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

-  Boolean constants (true, false)
-  logical operators (and, or, not)
-  conditionals (if)
-  integers (0, 1, 2, 3, etc.)
-  arithmetic operators (:math:`+`, :math:`-`, etc.)
-  mathematical functions (factorial, etc.)

Alonzo Church, the creator of the :math:`\lambda` calculus, realized
this and consequently set about to make a series of encodings of
:math:`\lambda` expressions designed to satisfy the properties we expect from
the items in the preceding list.  Let's first examine some of the encodings for the
*Church Boolean* constants and operations.

-  TRUE = :math:`\lambda x.  \lambda y.x`
-  FALSE = :math:`\lambda x.  \lambda y.y`
-  AND = :math:`\lambda p. \lambda q.((p \; q) \; FALSE)`

Note that AND is a curried function of the two variables *p* and *q*.  The following slide show indicates how TRUE AND FALSE, which is ((AND TRUE) FALSE) in curried form, is :math:`\beta`-reduced.
   
.. inlineav:: church_boolCON ss
   :long_name: Church boolean slide show
   :links:  AV/PL/AV/church_string.css
   :scripts: AV/PL/AV/church_boolCON.js
   :output: show

Just as one would expect for Boolean operations, TRUE AND FALSE reduces to FALSE.  You are encouraged to try similar reductions for FALSE AND TRUE, FALSE AND FALSE, TRUE AND TRUE to convince yourself that our definition of AND does exactly what it needs to do for all four possibilities. 
   

Encoding If-Then-Else
---------------------

The following problem is about a possible representation for the
ternary IF/THEN/ELSE operator.

.. avembed:: Exercises/PL/ChurchIfThen.html ka
   :long_name: If Then Else in Church Encoding

Encoding OR
-----------

The following problem is about a possible representation for the binary OR
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

To help you see how the successor function works, watch the following slide show of how the successor of THREE is reduced to FOUR.
   
.. inlineav:: church_numeralCON ss
   :long_name: Church numeral slide show
   :links: AV/PL/AV/church_string.css
   :scripts: AV/PL/AV/church_numeralCON.js
   :output: show

Addition and multiplication can be encoded as curried functions:
	    
-  PLUS = :math:`\lambda m. \lambda n. \lambda f. \lambda x.((n \;f) \; ((m \; f) \; x))`

-  MULT = :math:`\lambda m. \lambda n. \lambda f.(m \; (n \; f))`

To see how the multiplication function works, watch the following slide show of how (MULT TWO THREE) is reduced to SIX.
   
.. inlineav:: church_multCON ss
   :long_name: Church multiplication slide show
   :links: AV/PL/AV/church_string.css
   :scripts: AV/PL/AV/church_multCON.js
   :output: show

We add a Church encoding for an operation that computes the predecessor of a Church numeral *n*:

PRED = :math:`\lambda n. \lambda f. \lambda x.(((n \; \lambda g. \lambda h.(h \; (g \; f)))\; \lambda u.x) \; \lambda u.u)`

And finally, we add an operation to test for zero, which can be used in the **if-then-else** you identified in the previous practice problem (see above).    

ISZERO = :math:`\lambda n.((n \; \lambda x.FALSE) \; TRUE)`

Just as we did in the preceding slide shows, you should do some
:math:`\beta`-reductions using these defined operations to convince
yourself that they work as expected.
	    

Church Numerals with Addition and Multiplication
------------------------------------------------

The following  problem will help you recognize and use the Church numerals as
well as the representation of the corresponding addition and
multiplication operators. To get credit for this randomized problem,
you must solve it correctly three times in a row.

.. avembed:: Exercises/PL/ChurchNumerals.html ka
   :long_name: Church Numerals


