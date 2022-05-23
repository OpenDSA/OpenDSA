.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :satisfies: Limits to Computing
   :topic: Limits to Computing (FLA)

Limits to Computing
===================

Limits to Computing
-------------------

Over the course of the semester, you have studied a number of models
of computation or language representation:
Finite state machines (DFAs, NFAs, PDAs), regular expressions,
grammars, and Turing machines.
Generally, our key questions have been:
Is a given string a member of a given language?
How do we classify a given language?
And, what is the relative power of two models |---| do they recognize
the same set of languages, or not?

All of these questions are related to "Can we...?"
Generally, what has been absent is any consideration for how long it
takes to do something.

In prior courses, you have probably studied many data structures that
can be used in a wide variety of problems, and many examples of
efficient algorithms.
In general, our search algorithms strive to be at worst in
:math:`O(\log n)` to find a record,
and our sorting algorithms strive to be in :math:`O(n \log n)`.
You might have come across a few algorithms have higher asymptotic
complexity.
Both
:ref:`Floyd's all-pairs shortest-paths algorithm <Floyd's algorithm> <Floyd>`
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
high, because it is proportional to the number of permutations, which
is :math:`n!` for :math:`n` inputs.
When solving the 
:ref:`minimum-cost spanning tree problem <MCST> <MCST>`,
if we were to
test every possible subset of edges to see which forms the shortest
minimum spanning tree, the amount of work would be proportional to
:math:`2^{|{\rm E}|}` for a graph with :math:`|{\rm E}|` edges.
Fortunately, for both of these problems we have more clever
algorithms that allow us to find answers (relatively) quickly without
explicitly testing every possible solution.

Unfortunately, there are many computing problems for which the best
possible algorithm takes a long time to run.
A simple example is the
:ref:`Towers of Hanoi problem <Towers of Hanoi problem> <Recursion>`
which requires :math:`2^n` moves to "solve" a tower with :math:`n`
disks.
It is not possible for any computer program that solves the Towers of
Hanoi problem to run in less than :math:`\Omega(2^n)` time, because
that many moves must be printed out.

In this chapter, we are going to consider some aspects to the limits
of computing.
First, we will consider the concept of a :term:`reduction`,
which tells us how to relate the cost of one problem to another.
Then, we will use the concept of reduction to help us understand a
collection of problems called :term:`NP-Complete`.
These problems are interesting for many reasons:
There are a lot of them, they have many practical, real-world
applications, and we don't know whether or not there exist
efficient algorithms to solve them.
Even more strange than this: If even one of them had an efficient
solution, then **all** of them would have an efficient solution.
The study of these topics is called
:term:`computational complexity theory`.

Of course while having a problem with high running time is bad, it is
even worse to have a problem that cannot be solved at all!
Such problems
(which are called
:ref:`unsolveable problems <unsolveable problem> <Computability>`)
do exist.
The classic example of such a problem is deciding whether an arbitrary 
computer program will go into an infinite loop when processing a
specified input.
This is known as the :term:`halting problem`.
To close this chapter, we will do a brief exploration of the theory of
such problems.
