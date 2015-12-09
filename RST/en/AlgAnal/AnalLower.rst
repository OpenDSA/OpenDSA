.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :satisfies: algorithm analysis lower bound
   :requires: growth rate; best and worst case
   :topic: Algorithm Analysis

.. odsalink:: AV/AlgAnal/LowerBoundCON.css

Lower Bounds and :math:`\Theta` Notation
========================================

Lower Bounds and Theta Notation
-------------------------------

Lower Bounds
~~~~~~~~~~~~

Big-Oh notation describes an upper bound.
In other words, big-Oh notation states a claim about the greatest
amount of some resource (usually time) that is required by an
algorithm for some class of inputs of size :math:`n` (typically
the worst such input, the average of all possible inputs, or the best
such input).

Similar notation is used to describe the least amount of a resource
that an algorithm needs for some class of input.
Like big-Oh notation, this is a measure of the algorithm's
growth rate.
Like big-Oh notation, it works for any resource, but
we most often measure the least amount of time required.
And again, like big-Oh notation, we are measuring the resource
required for some particular class of inputs: the worst-, average-,
or best-case input of size :math:`n`.
   
The :term:`lower bound` for an algorithm
(or a problem, as explained later) 
is denoted by the symbol :math:`\Omega`, pronounced "big-Omega" or
just "Omega".
The following definition for :math:`\Omega` is symmetric with the
definition of big-Oh.

   For :math:`\mathbf{T}(n)` a non-negatively valued function,
   :math:`\mathbf{T}(n)` is in set :math:`\Omega(g(n))` if there exist
   two positive constants :math:`c` and :math:`n_0` such that
   :math:`\mathbf{T}(n) \geq c g(n)` for all :math:`n > n_0`. [#]_

.. _AAnalEx:

.. topic:: Example

   Assume :math:`\mathbf{T}(n) = c_1 n^2 + c_2 n` for :math:`c_1` and
   :math:`c_2 > 0`. 
   Then,

   .. math::

      c_1 n^2 + c_2 n \geq c_1 n^2

   for all :math:`n > 1`.
   So, :math:`\mathbf{T}(n) \geq c n^2` for :math:`c = c_1` and
   :math:`n_0 = 1`.
   Therefore, :math:`\mathbf{T}(n)` is in :math:`\Omega(n^2)` by the
   definition. 

It is also true that the equation of the example above
is in :math:`\Omega(n)`.
However, as with big-Oh notation, we wish to get the "tightest"
(for :math:`\Omega` notation, the largest) bound possible.
Thus, we prefer to say that this running time is in :math:`\Omega(n^2)`.

Recall the sequential search algorithm to find a value :math:`K`
within an array of integers.
In the average and worst cases this algorithm is in :math:`\Omega(n)`,
because in both the average and worst cases we must examine
*at least* :math:`cn` values (where :math:`c` is 1/2 in the average
case and 1 in the worst case).

.. [#] An alternate (non-equivalent) definition for :math:`\Omega` is

          :math:`\mathbf{T}(n)` is in the set :math:`\Omega(g(n))` if
          there exists a positive constant :math:`c` such that
          :math:`\mathbf{T}(n) \geq c g(n)` for an infinite number of
          values for :math:`n`.

       This definition says that for an "interesting" number of
       cases, the algorithm takes at least :math:`c g(n)` time.
       Note that this definition is *not* symmetric with the
       definition of big-Oh.
       For :math:`g(n)` to be a lower bound,
       this definition *does not* require that
       :math:`\mathbf{T}(n) \geq c g(n)` for
       all values of :math:`n` greater than some constant.
       It only requires that this happen often enough, in particular
       that it happen for an infinite number of values for :math:`n`.
       Motivation for this alternate definition can be found in the
       following example.

       Assume a particular algorithm has the following behavior:


       .. math::

          \mathbf{T}(n) = \left\{ \begin{array}{ll}
          n  & \mbox{for all odd}\ n \geq 1\\
          n^2/100 & \mbox{for all even}\ n \geq 0
          \end{array}
          \right.

       From this definition, :math:`n^2/100 \geq \frac{1}{100} n^2`
       for all even :math:`n \geq 0`.
       So, :math:`\mathbf{T}(n) \geq c n^2` for an infinite number of
       values of :math:`n` (i.e., for all even :math:`n`)
       for :math:`c = 1/100`.
       Therefore, :math:`\mathbf{T}(n)` is in :math:`\Omega(n^2)` by
       the definition. 

       For this equation for :math:`\mathbf{T}(n)`, it is true that
       all inputs of size :math:`n` take at least :math:`cn` time.
       But an infinite number of inputs of size :math:`n` take
       :math:`cn^2` time, so we would like to say that the algorithm
       is in :math:`\Omega(n^2)`. 
       Unfortunately, using our first definition will
       yield a lower bound of :math:`\Omega(n)` because it is not
       possible to pick constants :math:`c` and :math:`n_0` such that
       :math:`\mathbf{T}(n) \geq c n^2` for all :math:`n>n_0`.
       The alternative definition does result in a lower
       bound of :math:`\Omega(n^2)` for this algorithm, which seems to
       fit common sense more closely.
       Fortunately, few real algorithms or computer programs display
       the pathological behavior of this example.
       Our first definition for :math:`\Omega` generally yields the
       expected result.

       As you can see from this discussion, asymptotic bounds notation
       is not a law of nature.
       It is merely a powerful modeling tool used to describe the
       behavior of algorithms.


Theta Notation
~~~~~~~~~~~~~~

The definitions for big-Oh and :math:`\Omega` give us ways to
describe the upper bound for an algorithm (if we can find an equation
for the maximum cost of a particular class of inputs of size
:math:`n`) and the lower bound for an algorithm
(if we can find an equation for the minimum cost for
a particular class of inputs of size :math:`n`).
When the upper and lower bounds are the same within a constant factor,
we indicate this by using :math:`\Theta` (big-Theta) notation.
An algorithm is said to be :math:`\Theta(h(n))` if it is in
:math:`O(h(n))` *and* it is in :math:`\Omega(h(n))`.
Note that we drop the word "in" for :math:`\Theta` notation,
because there is a strict equality for two equations with the
same :math:`\Theta`.
In other words, if :math:`f(n)` is :math:`\Theta(g(n))`, then
:math:`g(n)` is :math:`\Theta(f(n))`.

Because the sequential search algorithm is both in :math:`O(n)` and in
:math:`\Omega(n)` in the average case, we say it is :math:`\Theta(n)`
in the average case.

Given an algebraic equation describing the time requirement for
an algorithm, the upper and lower bounds always meet.
That is because in some sense we have a perfect analysis for the
algorithm, embodied by the running-time equation.
For many algorithms (or their instantiations as programs), it is easy
to come up with the equation that defines their runtime behavior.
The analysis for most commonly used algorithms is well understood and
we can almost always give a :math:`\Theta` analysis for them.
However, the class of :ref:`NP-Complete <NP-Complete> <LimComp>`
problems all have no definitive :math:`\Theta` analysis, just some
unsatisfying big-Oh and :math:`\Omega` analyses.
Even some "simple" programs are hard to analyze.
Nobody currently knows the true upper or lower bounds for the
following code fragment.

   .. codeinclude:: Misc/Anal 
      :tag: Collatz

While some textbooks and programmers will casually say that an
algorithm is "order of" or "big-Oh" of some cost function,
it is generally better to use :math:`\Theta` notation rather than
big-Oh notation whenever we have sufficient knowledge about an
algorithm to be sure that the upper and lower bounds indeed match.
OpenDSA modules use :math:`\Theta` notation in preference to 
big-Oh notation whenever our state of knowledge makes that possible.
Limitations on our ability to analyze certain algorithms may require
use of big-Oh or :math:`\Omega` notations.
In rare occasions when the discussion is explicitly about the upper or 
lower bound of a problem or algorithm, the corresponding notation will
be used in preference to :math:`\Theta` notation.

Classifying Functions
~~~~~~~~~~~~~~~~~~~~~

Given functions :math:`f(n)` and :math:`g(n)` whose growth rates are
expressed as algebraic equations, we might like to determine if one
grows faster than the other.
The best way to do this is to take the limit of the two
functions as :math:`n` grows towards infinity,

.. math::

   \lim_{n \rightarrow \infty} \frac{f(n)}{g(n)}.

If the limit goes to :math:`\infty`, then :math:`f(n)` is in
:math:`\Omega(g(n))` because :math:`f(n)` grows faster.
If the limit goes to zero, then :math:`f(n)` is in :math:`O(g(n))`
because :math:`g(n)` grows faster.
If the limit goes to some constant other than zero, then
:math:`f(n) = \Theta(g(n))` because both grow at the same rate.

.. topic:: Example

   If :math:`f(n) = 2n\log n` and :math:`g(n)=n^2`, is :math:`f(n)` in
   :math:`O(g(n))`, :math:`\Omega(g(n))`, or :math:`\Theta(g(n))`?
   Since

   .. math::

      \frac{n^2}{2n\log n} = \frac{n}{2\log n},

   we easily see that

   .. math::

      \lim_{n \rightarrow \infty} \frac{n^2}{2n\log n} = \infty

   because :math:`n` grows faster than :math:`2\log n`.
   Thus, :math:`n^2` is in :math:`\Omega(2n\log n)`.

.. inlineav:: LowerBoundCON ss
   :output: show

Summary Exercise
~~~~~~~~~~~~~~~~

.. avembed:: Exercises/AlgAnal/LowerThetaSumm.html ka

.. odsascript:: AV/AlgAnal/LowerBoundCON.js
