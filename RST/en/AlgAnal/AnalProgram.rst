.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: algorithm analysis; summation; recurrence
   :satisfies: analyzing programs
   :topic: Algorithm Analysis

.. odsalink:: AV/Searching/binarySearchCON.css
.. odsalink:: AV/AlgAnal/BsearchDandCRecurCON.css

Calculating Program Running Time
================================

Calculating Program Running Time
--------------------------------

This modules discusses the analysis for several simple code
fragments.
We will make use of the algorithm analysis simplifying rules:

#. If :math:`f(n)` is in :math:`O(g(n))` and :math:`g(n)` is in
   :math:`O(h(n))`, then :math:`f(n)` is in :math:`O(h(n))`.

#. If :math:`f(n)` is in :math:`O(k g(n))` for any constant
   :math:`k > 0`, then :math:`f(n)` is in :math:`O(g(n))`.

#. If :math:`f_1(n)` is in :math:`O(g_1(n))` and :math:`f_2(n)` is in
   :math:`O(g_2(n))`, then :math:`f_1(n) + f_2(n)` is in
   :math:`O(\max(g_1(n), g_2(n)))`.

#. If :math:`f_1(n)` is in :math:`O(g_1(n))` and :math:`f_2(n)` is in
   :math:`O(g_2(n))`, then :math:`f_1(n) f_2(n)` is in
   :math:`O(g_1(n) g_2(n))`.

.. _AssignAnal:

.. topic:: Example

   We begin with an analysis of a simple assignment to an integer
   variable.

   .. codeinclude:: Misc/Anal 
      :tag: c3p2

   Because the assignment statement takes constant time, it is
   :math:`\Theta(1)`.


.. _FLAnal:

.. topic:: Example

   Consider a simple ``for`` loop.

   .. codeinclude:: Misc/Anal 
      :tag: c3p3

   The first line is :math:`\Theta(1)`.
   The ``for`` loop is repeated :math:`n` times.
   The third line takes constant time so, by simplifying rule (4),
   the total cost for executing
   the two lines making up the ``for`` loop is :math:`\Theta(n)`.
   By rule (3), the cost of the entire code fragment is also
   :math:`\Theta(n)`.

.. topic:: Example

   We now analyze a code fragment with several ``for``
   loops, some of which are nested.

   .. codeinclude:: Misc/Anal 
      :tag: c3p4

   This code fragment has three separate statements: the
   first assignment statement and the two ``for`` loops.
   Again the assignment statement takes constant time;
   call it :math:`c_1`.
   The second ``for`` loop is just like the one in
   Example :num:`#FLAnal` and takes :math:`c_2 n = \Theta(n)` time.

   The first ``for`` loop is a double loop and requires a special
   technique.
   We work from the inside of the loop outward.
   The expression ``sum++`` requires constant time; call it
   :math:`c_3`.
   Because the inner ``for`` loop is executed :math:`i` times,
   by simplifying rule (4) it has cost :math:`c_3i`.
   The outer ``for`` loop is executed :math:`n` times, but each time
   the cost of the inner loop is different because it costs
   :math:`c_3i` with :math:`i` changing each time.
   You should see that for the first execution of the outer loop,
   :math:`i` is 1.
   For the second execution of the outer loop, :math:`i` is 2.
   Each time through the outer loop, :math:`i` becomes one greater,
   until the last time through the loop when :math:`i = n`.
   Thus, the total cost of the loop is :math:`c_3` times the sum of
   the integers 1 through :math:`n`.
   We know that

   .. math::

      \sum_{i = 1}^{n} i = \frac{n (n+1)}{2},

   which is :math:`\Theta(n^2)`.
   By simplifying rule (3), :math:`\Theta(c_1 + c_2 n + c_3 n^2)` is
   simply :math:`\Theta(n^2)`.

.. topic:: Example

   Compare the asymptotic analysis for the following two code
   fragments.

   .. codeinclude:: Misc/Anal 
      :tag: c3p5

   In the first double loop, the inner ``for`` loop always executes
   :math:`n` times.
   Because the outer loop executes :math:`n` times, it should be
   obvious that the statement ``sum1++`` is executed precisely
   :math:`n^2` times.
   The second loop is similar to the one analyzed in the previous
   example, with cost :math:`\sum_{j = 1}^{n} j`.
   This is approximately :math:`{1 \over 2} n^2`.
   Thus, both double loops cost :math:`\Theta(n^2)`, though the second
   requires about half the time of the first.

.. topic:: Example

   Not all doubly nested ``for`` loops are :math:`\Theta(n^2)`.
   The following pair of nested loops illustrates this fact.

   .. codeinclude:: Misc/Anal
      :tag: c3p6

   When analyzing these two code fragments, we will assume that
   :math:`n` is a power of two.
   The first code fragment has its outer ``for`` loop executed
   :math:`\log n+1` times because on each iteration :math:`k` is
   multiplied by two until it reaches :math:`n`.
   Because the inner loop always executes :math:`n` times,
   the total cost for the first code fragment can be expressed as

   .. math::

      \sum_{i=0}^{\log n} n = n \log n.

   So the cost of this first double loop is :math:`\Theta(n \log n)`.
   Note that a variable substitution takes place here to create the
   summation, with :math:`k = 2^i`.

   In the second code fragment, the outer loop is also executed
   :math:`\log n+1` times.
   The inner loop has cost :math:`k`, which doubles each time.
   The summation can be expressed as

   .. math::

      \sum_{i=0}^{\log n} 2^i = \Theta(n)

   where :math:`n` is assumed to be a power of two and again
   :math:`k = 2^i`.

.. todo::
   :type: Slideshow

   We need to think about a technique for visualizing the running time
   of some loop constructs. This can be very similar to how we
   visualize reaching the closed form solution of summations.

What about other control statements?
``While`` loops are analyzed in a manner similar to ``for``
loops.
The cost of an ``if`` statement in the worst case is the greater of
the costs for the ``then`` and ``else`` clauses.
This is also true for the average case, assuming that
the size of :math:`n` does not affect the probability of executing one
of the clauses (which is usually, but not necessarily, true).
For ``switch`` statements, the worst-case cost is that of the most
expensive branch.
For subroutine calls, simply add the cost of executing the subroutine.

There are rare situations in which the probability for executing the
various branches of an ``if`` or ``switch`` statement are
functions of the input size.
For example, for input of size :math:`n`, the ``then`` clause of an
``if`` statement might be executed with probability :math:`1/n`.
An example would be an ``if`` statement that executes the
``then`` clause only for the smallest of :math:`n` values.
To perform an average-case analysis for such programs,
we cannot simply count the cost of the ``if``
statement as being the cost of the more expensive branch.
In such situations, the technique of
:ref:`amortized analysis <amortized analysis> <AmortAnal>` can come to
the rescue.

Determining the execution time of a recursive
subroutine can be difficult.
The running time for a recursive subroutine is
typically best expressed by a recurrence relation.
For example, the recursive factorial function
calls itself with a value one less than its input value.
The result of this recursive call is then multiplied by the input
value, which takes constant time.
Thus, the cost of the factorial function, if we wish to measure cost
in terms of the number of multiplication operations,
is one more than the number of multiplications made by the recursive
call on the smaller input.
Because the base case does no multiplications, its cost is zero.
Thus, the running time for this function can be expressed as

.. math::

   \Theta(n) = \Theta(n-1) + 1 \ \mbox{for}\ n>1;\ \ T(1) = 0.

The closed-form solution for this
recurrence relation is :math:`\Theta(n)`.


Case Study: Two Search Algorithms
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The final example of algorithm analysis for this section will compare
two algorithms for performing search in an array.
Earlier, we determined that the running time for sequential search on
an array where the search value :math:`K` is equally likely to appear
in any location is :math:`\Theta(n)` in both the average and worst
cases.
We would like to compare this running time to that required to perform
a :term:`binary search` on an array whose values are stored in order
from lowest to highest.
Here is a visualization of the binary search method.

.. inlineav:: binarySearchCON ss
   :output: show

Binary Search Practice Exercise
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. avembed:: AV/Searching/binarySearchPRO.html ss


Analyzing Binary Search
~~~~~~~~~~~~~~~~~~~~~~~

.. inlineav:: BsearchDandCRecurCON ss
   :output: show

Function ``binarySearch`` is designed to find the (single) occurrence of
:math:`K` and return its position. 
A special value is returned if :math:`K` does not appear in the array.
This algorithm can be modified to implement variations 
such as returning the position of the first
occurrence of :math:`K` in the array if multiple occurrences are
allowed, and returning the position of the greatest value less than
:math:`K` when :math:`K` is not in the array.

Comparing sequential search to binary search, we see that as :math:`n`
grows, the :math:`\Theta(n)` running time for sequential search in the
average and worst cases quickly becomes much greater than the
:math:`\Theta(\log n)` running time for binary search.
Taken in isolation, binary search appears to be much more
efficient than sequential search.
This is despite the fact that the constant factor for binary search is 
greater than that for sequential search, because the calculation for
the next search position in binary search is more expensive than just
incrementing the current position, as sequential search does.

Note however that the running time for sequential search will be
roughly the same regardless of whether or not the array values are
stored in order.
In contrast, binary search requires that the array values be ordered
from lowest to highest.
Depending on the context in which binary search is to be used, this
requirement for a sorted array could be detrimental to the running
time of a complete program, because  maintaining the values in sorted
order requires a greater cost when inserting new elements into the
array.
This is an example of a tradeoff between the
advantage of binary search during search and the disadvantage related
to maintaining a sorted array.
Only in the context of the complete problem to be solved can we know
whether the advantage outweighs the disadvantage.

Summary Exercise
----------------

.. avembed:: Exercises/AlgAnal/AnalProgramSumm.html ka

.. odsascript:: AV/Searching/binarySearchCON.js
.. odsascript:: AV/AlgAnal/BsearchDandCRecurCON.js

