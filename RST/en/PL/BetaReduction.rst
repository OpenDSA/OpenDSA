.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps 

Beta-Reduction
==============

Beta-redexes
------------

Now that we have rigorously defined substitution in the previous section, we can define a rule
for *evaluating a function application*, which is the main operation
for any :math:`\lambda` calculus interpreter. 
This rule is called :math:`\beta` *reduction*. An expression to which
the rule can be applied is called a :math:`\beta` *redex* (short for
:math:`\beta` *reduction expression*).
So, a :math:`\beta` *redex* is
formally defined as a :math:`\lambda` expression of a specific form,
namely, an application in which the first term is a function abstraction.
A critical part of analyzing how any language evaluates function calls
is to examine its semantics from the perspective of
:math:`\beta` reduction.

Identifying Beta-redexes (1)
----------------------------

This randomized problem will help you identify :math:`\beta`-redexes.  To earn
credit for it, you will have to solve it correctly three times in a
row.

.. avembed:: Exercises/PL/BetaRedex1.html ka
   :long_name: Identifying Beta Redexes 1

Identifying Beta-redexes (2)
----------------------------

This randomized problem will help you identify :math:`\beta`-redexes
and prepare to reduce them by determining whether an
:math:`\alpha`-conversion is needed.  To earn credit for it, you will
have to solve it correctly three times in a row.

.. avembed:: Exercises/PL/BetaRedex2.html ka
   :long_name: Identifying Beta Redexes 2


RP 16 Part 3
------------

This randomized problem will make you practice performing
:math:`\beta`-reductions. To earn credit for it, you will have to
solve it correctly three times in a row.

.. avembed:: Exercises/PL/RP16part3.html ka
   :long_name: RP set #16, question #3

