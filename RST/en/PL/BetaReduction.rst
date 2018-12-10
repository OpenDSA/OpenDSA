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
the rule can be applied is called a :math:`\beta`-*redex* (short for
:math:`\beta` *reduction expression*).
So, a :math:`\beta`-*redex* is
formally defined as a :math:`\lambda` expression of a specific form,
namely, an application in which the first term is a function abstraction.

For example, :math:`(\lambda x.(x \; v) \;\; (z \; (v \; u)))` is a :math:`\beta` redex
because :math:`\lambda x.(x \; v)` is a function abstraction.  On the other hand,
:math:`((\lambda x.(x \; v) \;\; y) \;\; (z \; (v \; u)))` is not because its
first term is a
function application and not a function abstraction.
However, the application that comprises the first term of this expression is a :math:`\beta`-redex.
This illustrates that it is possible for expressions that may not themselves be :math:`beta`-redexes to contain sub-expressions that are.
 
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


Performing Beta Reductions
--------------------------

If we have a :math:`\beta`-redex of the form :math:`(\lambda x.E \;\; E')`, then to
:math:`\beta`-reduce this expression means that we substitute :math:`E'` for :math:`x`
in :math:`E` using the substitution algorithm developed in the preceding section.  For
example, :math:`beta`-reducing  :math:`(\lambda x.(x \; v) \;\; (z \; (v \; u)))` 
would yield the expression :math:`((z \;\; (v \;\; u)) \;\; v)`.


This randomized problem will provide practice performing
:math:`\beta`-reductions. To earn credit for it, you will have to
solve it correctly three times in a row.   *Careful* - remember that, because :math:`\beta`-reducing
uses the substitution algorithm, it may be necessary to perform an :math:`\alpha`-conversion.
For example, :math:`beta`-reducing
:math:`(\lambda x. \lambda u.(u \;\; x) \;\; (v \;\; u))`
yields :math:`\lambda a.(a \;\; (v \;\; u))`, where we must do an
:math:`\alpha`-conversion to avoid capturing the free variable :math:`u`.
      

.. avembed:: Exercises/PL/BetaReduction.html ka
   :long_name: Performing Beta Reductions

