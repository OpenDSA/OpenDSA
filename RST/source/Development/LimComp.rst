.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Limits to Computing

Limits to Computing
===================

By now you have studied many data structures that can be used in a
wide variety of problems, and many examples of efficient algorithms.
In general, our search algorithms strive to be at worst in
:math:`O(\log n)` to find a record,
and our sorting algorithms strive to be in :math:`O(n \log n)`.
You might have come across a few algorithms have higher asymptotic
complexity.
Both Floyd's all-pairs shortest-paths algorithm 
(Module :numref:`<DynamicProgramming>`)
and standard matrix multiply
have running times of :math:`\Theta(n^3)`
(though for both, the amount of data being processed is
:math:`\Theta(n^2)` since they both act on :math:`n \times n`
matricies).

We can solve many problems efficiently because we have available 
(and choose to use) efficient algorithms.
Given any problem for which you know *some* algorithm, it is
always possible to write an inefficient algorithm to
"solve" the problem.
For example, consider a sorting algorithm that tests every possible
permutation of its input until it finds the correct permutation that
provides a sorted list.
The running time for this algorithm would be unacceptably
high, because it is proportional to the number of permutations which
is :math:`n!` for :math:`n` inputs.
When solving the minimum-cost spanning tree problem
(Module :numref:`<MCST>`), if we were to
test every possible subset of edges to see which forms the shortest
minimum spanning tree, the amount of work would be proportional to
:math:`2^{|{\rm E}|}` for a graph with :math:`|{\rm E}|` edges.
Fortunately, for both of these problems we have more clever
algorithms that allow us to find answers (relatively) quickly without
explicitly testing every possible solution.

Unfortunately, there are many computing problems for which the best
possible algorithm takes a long time to run.
A simple example is the Towers of Hanoi problem
(Module :numref:`<Recursion>`),
which requires :math:`2^n` moves to "solve" a tower with :math:`n`
disks.
It is not possible for any computer program that solves the Towers of
Hanoi problem to run in less than :math:`\Omega(2^n)` time, because
that many moves must be printed out.

Besides those problems whose solutions *must* take a long time
to run, there are also many problems for which we simply do not know if
there are efficient algorithms or not.
The best algorithms that we know for such problems are very slow, but
perhaps there are better ones waiting to be discovered.
Of course, while having a problem with high running time is bad, it is
even worse to have a problem that cannot be solved at all!
Such problems do exist, and are discussed in
Module :numref:`<Computability>`.

The following series of modules presents a brief introduction to the
theory of expensive and impossible problems.
Module :numref:`<Reduction>` presents the concept of a reduction,
which is the central tool used for analyzing the difficulty of a
problem (as opposed to analyzing the cost of an algorithm).
Reductions allow us to relate the difficulty of various problems,
which is often much easier than doing the analysis for a problem from
first principles.
Module :numref:`<NPComplete>` discusses "hard" problems, by which we
mean problems that require, or at least appear to require,
time exponential on the input size.
Module :numref:`<NPCoping>` talks about how to cope with such
problems when we cannot avoid them.
Finally, Module :numref:`<Computability>` considers various problems
that, while often simple to define and comprehend, are in fact
impossible to solve using a computer program.
The classic example of such a problem is deciding whether an arbitrary 
computer program will go into an infinite loop when processing a
specified input.
This is known as the halting problem.
