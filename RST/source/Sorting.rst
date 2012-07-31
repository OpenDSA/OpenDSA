.. avmetadata:: Sorting Introduction
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Sorting
   :short_name: SortingIntro

.. _Sorting:

.. index:: ! sorting

Introduction
============

We sort many things in our everyday lives:
A handful of cards when playing Bridge;
bills and other piles of paper; jars of spices; and so on.
And we have many intuitive strategies that we can use to do the
sorting, depending on how many objects we have to sort and how hard
they are to move around.
Sorting is also one of the most frequently performed computing tasks.
We might sort the records in a database so that we can search the
collection efficiently.
We might sort the records by zip code so that we can print and mail
them more cheaply.
We might use sorting to help an algorithm to solve
some other problem.
For example, Kruskal's algorthm to solve the minimum-cost spanning
tree problem (see Module :ref:`MCST <MCST>` :odsaref:`MCST`) must sort the edges of
a graph by length before it can process them.

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
For example, no normal person would use Quicksort to order a pile of
bills by date, even though :ref:`Quicksort <Quicksort>` :odsaref:`Quicksort` is the
standard sorting algorithm of choice that you would find in a
programming environment's utility library.
After years of study, there are still unsolved problems related to
sorting.
New algorithms are still being developed and refined for
special-purpose applications.

Along with introducing this central problem in computer science,
studying sorting algorithms has a secondary purpose of illustrating
issues in algorithm design and analysis.
For example, the sorting algorithms in this chapter show multiple
approaches to using divide-and-conquer.
In particular, there are multiple ways to do the dividing:
Mergesort divides a list in half;
Quicksort divides a list into big values and small values;
and Radix Sort divides the problem by working on one digit of the key
at a time.
Sorting algorithms can also illustrate a wide variety of
analysis techniques.
We'll find that it is possible for an algorithm to have an average
case whose growth rate is significantly smaller than its worse case
(:ref:`Quicksort <Quicksort>`  :odsaref:`Quicksort`).
We'll see how it is possible to speed up sorting algorithms
(both :ref:`Shellsort <Shellsort>` and :ref:`Quicksort <Quicksort>`)
by taking advantage of the best case behavior of another algorithm
(:ref:`Insertion Sort <InsertionSort>`).
We'll see several examples of how we can tune an algorithm for better
performance. 
We'll see that special case behavior by some algorithms makes them a
good solution for special niche applications (:ref:`Heapsort <Heapsort>`).
Sorting provides an example of a significant technique for
analyzing the lower bound for a problem.
Sorting will also be used to motivate the introduction to file
processing presented in
Module :ref:`File Processing <FileProc>`.

This chapter covers several standard algorithms appropriate
for sorting a collection of records that fit in the computer's
main memory.
It begins with a discussion of three simple, but relatively slow,
algorithms requiring :math:`\Theta(n^2)`
time in the average and worst cases.
Several algorithms with considerably better performance are then
presented, some with :math:`\Theta(n \log n)` worst-case running
time.
The final sorting method presented requires only
:math:`\Theta(n)` worst-case time under special conditions.
The chapter concludes with a proof that sorting in general
requires :math:`\Omega(n \log n)` time in the worst case
(see Module :ref:`Sorting Lower Bounds <SortingLowerBound>`).

Sorting Terminology and Notation
--------------------------------

Given a set of records :math:`r_1`, :math:`r_2`, ..., :math:`r_n`
with key values :math:`k_1`, :math:`k_2`, ..., :math:`k_n`,
the :dfn:`Sorting Problem` is to
arrange the records into any order :math:`s` such that records
:math:`r_{s_1}`, :math:`r_{s_2}`, ..., :math:`r_{s_n}`
have keys obeying the property
:math:`k_{s_1} \leq k_{s_2} \leq ... \leq k_{s_n}`.
In other words, the sorting problem is to arrange a set of records so
that the values of their key fields are in non-decreasing order.

As defined, the Sorting Problem allows input with two or more
records that have the same key value.
Certain applications require that input not contain
duplicate key values.
Typically, sorting algorithms can handle duplicate key values unless
noted otherwise.

When duplicate key values are allowed, there might be an implicit
ordering to the duplicates, typically based on their order of
occurrence within the input.
It might be desirable to maintain this initial ordering among
duplicates.
A sorting algorithm is said to be :dfn:`stable` if it does not
change the relative ordering of records with identical key values.
Many, but not all, of the sorting algorithms presented in this chapter
are stable, or can be made stable with minor changes.

When comparing two sorting algorithms, the simplest approach would be to
program both and measure their running times.
An example of such timings is presented in
Module :ref:`Empirical Comparsion of Sorting Algorithms <SortingEmpirical>`.
However, you must be careful when doing empirical comparisons because
the running time for many sorting algorithms depends on specifics of
the input values.
The number of records, the size of the keys and the records,
the allowable range of the key values, and the amount
by which the input records are "out of order" can all greatly affect
the relative running times for sorting algorithms.

When analyzing sorting algorithms, it is traditional to measure
the number of comparisons made between keys.
This measure is usually closely related to the running time for
the algorithm and has the advantage of being machine and data-type
independent.
However, in some cases records might be so large that their physical
movement might take a significant fraction of the total running time.
If so, it might be appropriate to measure the number of
swap operations performed by the algorithm.
In most applications we can assume that all records and keys are of
fixed length, and that a single comparison or a single swap operation
requires a constant amount of time regardless of which keys are
involved.
Some special situations "change the rules" for comparing sorting
algorithms.
For example, an application with records or keys having widely
varying length (such as sorting a sequence of variable length strings)
will benefit from a special-purpose sorting technique.
Some applications require that a small number of records be
sorted, but that the sort be performed frequently.
An example would be an application that repeatedly sorts groups of
five numbers.
In such cases, the constants in the runtime equations that are usually
ignored in an asymptotic analysis now become crucial.
Finally, some situations require that a sorting algorithm use as
little memory as possible.
We will note which sorting algorithms require significant extra memory
beyond the input array.
