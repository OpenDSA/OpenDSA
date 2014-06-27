.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: comparison
   :satisfies: sorting introduction
   :topic: Sorting

Chapter Introduction: Sorting
=============================

We sort many things in our everyday lives:
A handful of cards when playing Bridge;
bills and other piles of paper; jars of spices; and so on.
And we have many intuitive strategies that we can use to do the
sorting, depending on how many objects we have to sort and how hard
they are to move around.
Sorting is also one of the most frequently performed computing tasks.
We might sort the records in a database so that we can search the
collection efficiently.
We might sort customer records by zip code so that when we print an
advertisement we can then mail them more cheaply.
We might use sorting to help an algorithm to solve some other
problem.
For example, :term:`Kruskal's algorithm` to find a
:ref:`minimum-cost spanning tree <MCST>`
must sort the edges of a graph by their lengths before it can process
them.

Because sorting is so important, naturally it has been studied
intensively and many algorithms have been devised.
Some of these algorithms are straightforward adaptations of schemes we
use in everyday life.
For example, a natural way to sort your cards in a bridge hand is to
go from left to right, and place each card in turn in its correct
position relative to the other cards that you have already sorted.
This is the idea behind :ref:`Insertion Sort <InsertionSort>`.
Other sorting algorithms are totally alien to how humans do things,
having been invented to sort thousands or even millions of records
stored on the computer.
For example, no normal person would use :ref:`Quicksort <Quicksort>`
to order a pile of bills by date, even though
:ref:`Quicksort <Quicksort>` is the standard sorting algorithm of
choice for most software libraries.
After years of study, there are still unsolved problems related to
sorting.
New algorithms are still being developed and refined for
special-purpose applications.

Along with introducing this central problem in computer science,
studying sorting algorithms helps us to understand
issues in algorithm design and analysis.
For example, the sorting algorithms in this chapter show multiple
approaches to using :term:`divide and conquer`.
In particular, there are multiple ways to do the dividing.
:ref:`Mergesort <Mergesort>` divides a list in half.
:ref:`Quicksort <Quicksort>` divides a list into big values and small
values.
:ref:`Radix Sort <RadixSort>` divides the problem by working on one
digit of the key at a time.
Sorting algorithms can also illustrate a wide variety of
algorithm analysis techniques.
We will find that it is possible for an algorithm to have an
:term:`average case` whose growth rate is significantly smaller than
its :term:`worst case` (:ref:`Quicksort <Quicksort>`).
We will see how it is possible to speed up one sorting algorithm
(:ref:`Shellsort <Shellsort>` or :ref:`Quicksort <Quicksort>`)
by taking advantage of the :term:`best case` behavior of another
algorithm (:ref:`Insertion Sort <InsertionSort>`).
We will see several examples of how we can tune an algorithm for
better performance.
We will see that special case behavior by some algorithms makes them a
good solution for special niche applications
(:ref:`Heapsort <Heapsort>`). 
Sorting provides an example of an important technique for
analyzing the lower bound for a problem.
:ref:`External Sorting <ExternalSort>` refers to the process of
sorting large files stored on disk.

This chapter covers several standard algorithms appropriate
for sorting a collection of records that fit into the computer's
main memory.
It begins with a discussion of three simple, but relatively slow,
algorithms that require :math:`\Theta(n^2)`
time in the average and worst cases to sort :math:`n` records.
Several algorithms with considerably better performance are then
presented, some with :math:`\Theta(n \log n)` worst-case running
time.
The final sorting method presented requires only
:math:`\Theta(n)` worst-case time under special conditions
(but it cannot run that fast in the general case).
The chapter concludes with a proof that sorting in general
requires :math:`\Omega(n \log n)` time in the worst case.
