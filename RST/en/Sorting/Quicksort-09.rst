.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: sorting terminology; sort code tuning; insertion sort
   :satisfies: quicksort
   :topic: Sorting

.. odsalink:: AV/Development/QuickSortAverageCaseCON.css

.. index:: ! Quicksort

Quicksort-09
============

Quicksort's average-case behavior falls somewhere
between the extremes of worst and best case.
Average-case analysis considers the cost for all possible arrangements
of input, summing the costs and dividing by the number of cases.
We make one reasonable simplifying assumption:
At each partition step, the pivot is
equally likely to end in any position in the (sorted) array.
In other words, the pivot is equally likely to break an array into
partitions of sizes 0 and :math:`n-1`, or 1 and :math:`n-2`, and so
on.

Given this assumption, the average-case cost is computed from the
following equation:

.. math::

   {\bf T}(n) = cn + \frac{1}{n}\sum_{k=0}^{n-1}[{\bf T}(k) +
   {\bf T}(n - 1 - k)],
   \quad {\bf T}(0) = {\bf T}(1) = c.

This visualization will help you to understand how this recurrence
relation was formed.

.. inlineav:: QuickSortAverageCaseCON ss
   :output: show

.. odsascript:: AV/Development/QuickSortAverageCaseCON.js
