.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: sorting introduction
   :satisfies: sorting terminology
   :topic: Sorting

Sorting Terminology and Notation
================================

Sorting Terminology and Notation
--------------------------------

.. index:: key, search key

Given a set of records :math:`r_1`, :math:`r_2`, ..., :math:`r_n`
with associated key values :math:`k_1`, :math:`k_2`, ..., :math:`k_n`,
the :term:`Sorting Problem` is to
arrange the records into any order :math:`s` such that records
:math:`r_{s_1}`, :math:`r_{s_2}`, ..., :math:`r_{s_n}`
have keys obeying the property
:math:`k_{s_1} \leq k_{s_2} \leq ... \leq k_{s_n}`.
In other words, the sorting problem is to arrange a set of records so
that the values of their key fields are in non-decreasing order.

.. TODO::
   :type: Slideshow

   The preceding paragraph could be turned into a slideshow.

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
A sorting algorithm is said to be :term:`stable` if it does not
change the relative ordering of records with identical key values.
Many, but not all, of the sorting algorithms presented in this chapter
are stable, or can be made stable with minor changes.

When comparing two sorting algorithms, the simplest approach would be to
program both and measure their running times.
This is an example of
:ref:`empirical comparison <empirical comparison> <SortingEmpirical>`.
However, doing fair empirical comparisons can be tricky because
the running time for many sorting algorithms depends on specifics of
the input values.
The number of records, the size of the keys and the records,
the allowable range of the key values, and the amount
by which the input records are "out of order" can all greatly affect
the relative running times for sorting algorithms.

When analyzing sorting algorithms, it is traditional to measure the
cost by counting the number of comparisons made between keys.
This measure is usually closely related to the actual running time for
the algorithm and has the advantage of being machine and data-type
independent.
However, in some cases records might be so large that their physical
movement might take a significant fraction of the total running time.
If so, it might be appropriate to measure the cost by counting the
number of swap operations performed by the algorithm.
In most applications we can assume that all records and keys are of
fixed length, and that a single comparison or a single swap operation
requires a constant amount of time regardless of which keys are
involved.
However, some special situations "change the rules" for comparing
sorting algorithms.
For example, an application with records or keys having widely
varying length (such as sorting a sequence of variable length strings)
cannot expect all comparisons to cost roughly the same.
Not only do such situations require special measures for analysis,
they also will usually benefit from a special-purpose sorting
technique.

Other applications require that a small number of records be
sorted, but that the sort be performed frequently.
An example would be an application that repeatedly sorts groups of
five numbers.
In such cases, the constants in the runtime equations that usually
get ignored in asymptotic analysis now become crucial.
Note that recursive sorting algorithms end up sorting lots of small
lists as well.

Finally, some situations require that a sorting algorithm use as
little memory as possible.
We will call attention to sorting algorithms that require significant
extra memory beyond the input array.

.. avembed:: Exercises/Sorting/SortIntroSumm.html ka
