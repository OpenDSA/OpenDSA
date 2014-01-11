.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: algorithm analysis
   :satisfies: analyzing problems
   :topic: Algorithm Analysis

Analyzing Problems
==================

You most often use the techniques of "algorithm" analysis to analyze
an algorithm, or the instantiation of an algorithm as a program.
You can also use these same techniques to analyze the cost of a
problem.
It should make sense to you to say that the upper bound for a problem
cannot be worse than the upper bound for the best algorithm that we
know for that problem.
But what does it mean to give a lower bound for a problem?

Consider a graph of cost over all inputs of a given size :math:`n` for
some algorithm for a given problem.
Define :math:`\mathcal{A}` to be the collection of all algorithms that
solve the problem (theoretically, there are an infinite number of such
algorithms).
Now, consider the collection of all the graphs for all of the
(infinitely many) algorithms in :math:`\mathcal{A}`.
The worst case lower bound is the *least* of all the
*highest* points on all the graphs.

It is much easier to show that an algorithm (or program) is in
:math:`\Omega(f(n))` than it is to show that a problem is in
:math:`\Omega(f(n))`. 
For a problem to be in :math:`\Omega(f(n))` means that *every*
algorithm that solves the problem is in :math:`\Omega(f(n))`,
even algorithms that we have not thought of!

So far all of our examples of algorithm analysis
give "obvious" results, with big-Oh always matching :math:`\Omega`.
To understand how big-Oh, :math:`\Omega`, and :math:`\Theta` notations
are properly used to describe our understanding of a problem or an
algorithm, it is best to consider an example where you do not already
know a lot about the problem.

Let us look ahead to analyzing the problem of sorting to see
how this process works.
What is the least possible cost for any sorting algorithm
in the worst case?
The algorithm must at least look at every element in the input, just
to determine that the input is truly sorted.
Thus, any sorting algorithm must take at least :math:`cn` time.
For many problems, this observation that each of the :math:`n` inputs
must be looked at leads to an easy :math:`\Omega(n)` lower bound.

In your previous study of computer science, you have probably
seen an example of a sorting algorithm whose running time is in
:math:`O(n^2)` in the worst case.
The simple Bubble Sort and Insertion Sort algorithms
typically given as examples in a first year programming course have
worst case running times in :math:`O(n^2)`.
Thus, the problem of sorting can be said to have an upper bound
in :math:`O(n^2)`.
How do we close the gap between :math:`\Omega(n)` and :math:`O(n^2)`?
Can there be a better sorting algorithm?
If you can think of no algorithm whose worst-case growth rate is
better than :math:`O(n^2)`, and if you have discovered no
analysis technique to show that the least cost for the problem of
sorting in the worst case is greater than :math:`\Omega(n)`,
then you cannot know for sure whether or not there is a better
algorithm.

Chapter :numref:`<InSort>` presents sorting algorithms whose
running time is in :math:`O(n \log n)` for the worst case.
This greatly narrows the gap.
With this new knowledge, we now have a lower bound in
:math:`\Omega(n)` and an upper bound in :math:`O(n \log n)`.
Should we search for a faster algorithm?
Many have tried, without success.
Fortunately (or perhaps unfortunately?), Chapter :numref:`<InSort>`
also includes a proof that any sorting algorithm must have running
time in :math:`\Omega(n \log n)` in the worst case. [#]_
This proof is one of the most important results in
the field of algorithm analysis, and it means that no sorting
algorithm can possibly run faster than :math:`c n \log n` for the
worst-case input of size :math:`n`.
Thus, we can conclude that the problem of sorting is
:math:`\Theta(n \log n)` in the worst case, because the upper and
lower bounds have met.

Knowing the lower bound for a problem does not give you a good
algorithm.
But it does help you to know when to stop looking.
If the lower bound for the problem matches the upper bound for the
algorithm (within a constant factor), then we know that we can find an
algorithm that is better only by a constant factor.

Notes
-----

.. [#] While it is fortunate to know the truth, it is unfortunate that
       sorting is :math:`\Theta(n \log n)` rather than :math:`\Theta(n)`!
