.. index:: ! Sorting

*******
Sorting
*******

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
We might use sorting as an intrinsic part of an algorithm to solve
some other problem, such as when computing the minimum-cost spanning
tree (see Module <ODSAref "MCST" />).

Because sorting is so important, naturally it has been studied
intensively and many algorithms have been devised.
Some of these algorithms are straightforward adaptations of schemes we
use in everyday life.
Others are totally alien to how humans do things, having been invented
to sort thousands or even millions of records stored on the computer.
After years of study, there are still unsolved problems related to
sorting.
New algorithms are still being developed and refined for
special-purpose applications.

While introducing this central problem in computer science,
collectively the sorting modules
has a secondary purpose of illustrating
issues in algorithm design and analysis.
For example, this collection of sorting algorithms shows multiple
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
(Quicksort).
We'll see how it is possible to speed up sorting algorithms
(both Shellsort and Quicksort) by taking advantage of the best case
behavior of another algorithm (Insertion sort).
We'll see several examples of how we can tune an algorithm for better
performance. 
We'll see that special case behavior by some algorithms makes them a
good solution for special niche applications (Heapsort).
Sorting provides an example of a significant technique for
analyzing the lower bound for a problem.
Sorting will also be used to motivate the introduction to file
processing presented in
Module <ODSAref "FileProc" \>.

The present chapter covers several standard algorithms appropriate
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
requires :math:`\Omega(n \log n)` time in the worst case.

Sorting Terminology and Notation
--------------------------------

.. todo::

   [Make this paragraph appropriate for non-JAVA consumption.]
   Except where noted otherwise, input to the sorting algorithms
   is a collection of records stored in an array.
   An important issue is how to compare two records.
   Records are compared to one another by requiring that their type
   extend the ``Comparable`` class.
   This will ensure that the class implements the ``compareTo``
   method, which returns a value less than zero, equal to zero, or
   greater than zero depending on its relationship to the record being
   compared to.
   The ``compareTo`` method is defined to extract the
   appropriate key field from the record.
   We also assume that for every record type there is a ``swap``
   function that can interchange the contents of two records in the
   array.

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

When comparing two sorting algorithms, the most straightforward
approach would seem to be simply program both and measure their
running times.
An example of such timings is presented in
Figure <ODSAref "SortComp" />.
However, such a comparison can be misleading because the running time
for many sorting algorithms depends on specifics of the input values.
In particular, the number of records, the size of the keys
and the records, the allowable range of the key values, and the amount
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
will benefit from a special-purpose sorting
technique.
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
