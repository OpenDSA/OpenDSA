.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps


Reduction Strategies
====================

Applicative Order
-----------------

How many :math:`\beta`-redexes are in
:math:`(\lambda x.m \; (\lambda x.(x \; x) \; \lambda x.(x \; x)))`?
You should be able to find two.   Depending on which one you choose to reduce first,
you may find that you end up with :math:`m` as your "answer" or that you end up
with the same expression that you started with,
that is, the :math:`\beta`-reduction equivalent of an infinite loop.

We have seen that evaluation of expressions in the
:math:`\lambda` calculus is essentially :math:`\beta`-reduction, which
can be defined simply in terms of substitution:
:math:`(\lambda p.b \; a) \equiv subst(a,p,b)` 

But there is an additional consideration involved: :math:`a` and :math:`b` in the preceding :math:`\beta`-redex
can each contain
:math:`\beta`-redexes themselves. We then need to recursively reduce them,
which raises the following questions:

#.  Which redex should we reduce first, the top-level redex, or a nested
    one?

#.  Does it matter which one we do first? What are the consequences of these two strategies?

#.  Do different reduction strategies lead to different results?

A key to partially answering the second and third questions above is
the **Church-Rosser Theorem**, which we will merely state and not
prove.  According to the Church-Rosser theorem, *if two different
reduction strategies both lead to an answer, then they will lead to
the same answer.*

So the answers to the second and third questions are no with the
following caveat: any reduction strategy that leads to an answer will
give the same answer.  The key here is whether or not the strategy
leads to an answer, and the Church-Rosser theorem neither guarantees
termination nor does it guarantee that an answer will be found if it
exists.   In instances where the strategy leads to an answer that cannot be further reduced, we say that the expression is in **beta-normal form** (or :math:`\beta`-normal form).

The strategy that JavaScript uses in the substitution model of
computation is called **applicative order reduction**. With this
strategy, to evaluate an expression of the form 
``f(arg1, arg2, arg3, ...)``, we:

#. Evaluate each one of the sub-expressions from left to right, including *f*
   if it requires evaluation. (How could it require evaluation?)

#. Apply the leftmost result, which should be a function, to the rest of
   the evaluated sub-expressions.

The applicative order strategy is characterized by proceeding
left-to-right, evaluating the innermost sub-expressions first.  That
is, we only perform an application when each of the sub-expressions has
been reduced and there are no redexes remaining except the topmost
application. Consider:

:math:`(\lambda x.((x \; y) \; (y \; x)) \; (\lambda w.(w \;  w) \; z))`

Applicative order evaluation will first reduce :math:`(\lambda w.(w \;  w) \; z)`,
getting :math:`(z \; z)`.   This result will then be substituted in for :math:`x` in
:math:`((x \; y) \; (y \; x))`, yielding  :math:`(((z \; z) \; y) \; (y \; (z \; z)))`
as the final answer.

Although applicative order reduction finds its answer to the preceding problem in two reductions,
when it is used for the first example we considered in this section, that is,

:math:`(\lambda x.m \; (\lambda x.(x \; x) \; \lambda x.(x \; x)))`

we end up in the infinite loop we referred to earlier.      

Normal Order
------------

**Normal order reduction** reduces the leftmost :math:`\beta`-redex
first before reducing the sub-expressions inside of it and those that
follow it. While applicative order proceeds by evaluating the
sub-expressions and then applying the function, normal order evaluation
proceeds by applying the function first and then evaluating the
sub-expressions.  In other words, normal order reduction always seeks
the leftmost outermost reduction whereas applicative order always
seeks the leftmost innermost reduction.


Because normal order reduction delays its evaluation
of the arguments to a function, it correctly gets :math:`m` when
applied to the example
:math:`(\lambda`\ x.m (:math:`\lambda x.(x \; x) \; \lambda x.(x \; x)))`
on which applicative order looped
infinitely.

Now, when applied to 
:math:`(\lambda x.((x \; y) \; (y \; x)) \; (\lambda w.(w \;  w) \; z))`,
normal order will substitute       
:math:`(\lambda w.(w \;  w) \; z)`
for both occurrences of :math:`x` in
:math:`((x \; y) \; (y \; x))`.
It will then have to evaluate :math:`(\lambda w.(w \;  w) \; z)` **twice** before getting the final answer
:math:`(((z \; z) \; y) \; (y \; (z \; z)))`.      
      
If you are still not certain of the exact difference between
applicative and normal order, use the following visualization to watch
them go through their respective steps on a variety of randomized
:math:`\lambda` expressions.  Once you feel confident that you can
always predict what the next step of the visualization will be, you
are ready to tackle the practice problems that follow.

.. avembed:: AV/PL/LCPractice.html ss


      
      
Beta-Reduction Order (1)
------------------------

The following problem focuses on the first step (i.e., :math:`\beta`-reduction)
in the evaluation of a :math:`\lambda` expression with the two
evaluation strategies that we discussed. To get credit for this
randomized exercise, you must solve it correctly three times in a row.

.. avembed:: Exercises/PL/BetaReductionOrder1.html ka
   :long_name: Beta Reduction Order 1

Beta-Reduction Order (2)
------------------------

In the following problem, you have to study the complete evaluation of a
:math:`\lambda` expression with the two evaluation strategies that we
discussed. To get credit for this randomized exercise, you must solve
it correctly three times in a row.

.. avembed:: Exercises/PL/BetaReductionOrder2.html ka
   :long_name: Beta Reduction Order 2

Applicative Order Proficiency Exercise
--------------------------------------

In the following  problem, you have to perform a full evaluation of a randomly
selected :math:`\lambda` expression, that is, perform as many
:math:`\beta`-reductions as it takes until a :math:`\beta`-normal form
is reached. For this problem, you must use the *applicative-order*
reduction strategy. To get credit for this problem, you only need to
solve one problem instance correctly. However, each problem
instance contains several steps that you must perform correctly (in
this case, each step is a :math:`\beta`-reduction). Read and follow
the directions carefully. Note that the correct answer (called the
*model answer*) is available. However, if you look it up, you will not
get credit for the current problem instance. To get another chance for
credit, start a new problem instance by clicking the *Reset* button.
	 
.. avembed:: AV/PL/applicativeOrderPRO.html pe
   :long_name: Applicative-order reduction Proficiency Exercise

Normal Order Proficiency Exercise
---------------------------------

In the following problem, you have to perform a full evaluation of a randomly
selected :math:`\lambda` expression, that is, perform as many
:math:`\beta`-reductions as it takes until a :math:`\beta`-normal form
is reached. For this problem, you must use the **normal-order**
reduction strategy. To get credit for this problem, you only need to
solve one problem instance  correctly. However, each problem instance contains
several steps that you must perform correctly (in this case, each step
is a :math:`\beta`-reduction). Read and follow the directions
carefully. Note that the correct answer (called the *model answer*) is
available. However, if you look it up, you will not get credit for the
current problem instance. To get another chance for credit, start a
new problem instance by clicking the *Reset* button.

.. The PE below was not working because it seemingly didn't pick up the
.. strategy PARAM from the HTML file.  The temp replacement fixes the
.. problem with a kludge until further debugging can be done.  See the
.. README file in the AV/PL directory for more information.
.. T.N. (March 2018)

.. .. avembed:: AV/PL/normalOrderPRO.html pe
.. avembed:: AV/PL/tempNormalOrderPRO.html pe
   :long_name: Normal-order reduction Proficiency Exercise


