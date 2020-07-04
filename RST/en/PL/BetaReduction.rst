.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps 

Beta-Reduction
==============

Beta-Redexes
------------

Now that we have rigorously defined substitution in the previous section, we can define a rule
for *evaluating a function application*, which is the main operation
for any :math:`\lambda` calculus interpreter. 
This rule is called :math:`\beta`-*reduction*. An expression to which
the rule can be applied is called a :math:`\beta`-*redex* (short for
:math:`\beta`-*reduction expression*).
So, a :math:`\beta`-*redex* is
formally defined as a :math:`\lambda` expression of a specific form,
namely, an application in which the first term is a function abstraction.

For example, :math:`(\lambda x.(x \; v) \;\; (z \; (v \; u)))` is a :math:`\beta`-redex
because :math:`\lambda x.(x \; v)` is a function abstraction.  On the other hand,
:math:`((\lambda x.(x \; v) \;\; y) \;\; (z \; (v \; u)))` is not because its
first term is a
function application and not a function abstraction.
However, the application that comprises the first term of this expression is a :math:`\beta`-redex.
This illustrates that it is possible for expressions that may not themselves be :math:`\beta`-redexes to contain sub-expressions that are.
 
A critical part of analyzing how any language evaluates function calls
is to examine its semantics from the perspective of
:math:`\beta`-reduction.

Identifying Beta-Redexes
------------------------

The following randomized problem will help you identify
:math:`\beta`-redexes.  To earn credit for it, you will have to solve
it correctly three times in a row.

.. avembed:: Exercises/PL/BetaRedex1.html ka
   :long_name: Identifying Beta Redexes 1


Beta-Reduction is a Substitution
--------------------------------

If we have a :math:`\beta`-redex of the form :math:`(\lambda x.E \;\;
E')`, then to :math:`\beta`-reduce this expression means to
substitute :math:`E'` for :math:`x` in :math:`E` using the
substitution algorithm developed in the preceding section.

In other words, to evaluate a :math:`\beta`-redex of the form

.. math::

      \begin{eqnarray*}(\lambda x.E \;\; E')\end{eqnarray*}

simply means to perform the following substitution:

.. math::

      \begin{eqnarray*} subst( E', x, E) \end{eqnarray*}

Again, this is just the algorithm that you learned in
:ref:`substitution-algorithm`. Note that the result of a
:math:`\beta`-reduction is what you get by first stripping off
the binding occurrence of the :math:`\lambda`-abstraction, leaving
just its body, and then substituting :math:`E'` for x in that body.

      
For example, to :math:`\beta`-reduce :math:`(\lambda x.(x \; v) \;\; (z
\; (v \; u)))`, you  would first strip off  :math:`\lambda x.`
to get :math:`(x \; v)` (that is, the body of the
:math:`\lambda`-abstraction), and then substitute
:math:`(z \; (v \; u))` for :math:`x` in that body,
yielding the expression :math:`((z \;\; (v \;\; u)) \;\; v)`.

Some Beta-Reductions Require Alpha-Conversion
---------------------------------------------

The following  randomized problem will help you identify :math:`\beta`-redexes
and prepare to reduce them by determining whether an
:math:`\alpha`-conversion is needed.  To earn credit for it, you will
have to solve it correctly three times in a row.

.. avembed:: Exercises/PL/BetaRedex2.html ka
   :long_name: Identifying Beta Redexes 2

Performing Beta-Reductions
--------------------------

The following randomized problem will provide practice performing
:math:`\beta`-reductions. To earn credit for it, you will have to
solve it correctly three times in a row.  *Be Careful*: remember that,
because :math:`\beta`-reducing uses the substitution algorithm, it may
be necessary to perform an :math:`\alpha`-conversion.  For example,
:math:`\beta`-reducing :math:`(\lambda x. \lambda u.(u \;\; x) \;\; (v
\;\; u))` yields :math:`\lambda a.(a \;\; (v \;\; u))`, where we must
do an :math:`\alpha`-conversion to avoid capturing the free variable
:math:`u`.
      

.. avembed:: Exercises/PL/BetaReduction.html ka
   :long_name: Performing Beta Reductions

