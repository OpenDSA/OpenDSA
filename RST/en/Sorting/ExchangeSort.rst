.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: insertion sort; bubble sort; selection sort
   :satisfies: exchange sort
   :topic: Sorting

.. index:: ! exchange sorting
.. index:: sorting; exchange

.. odsalink:: AV/Sorting/ExchangeSortCON.css

The Cost of Exchange Sorting
============================

The Cost of Exchange Sorting
----------------------------

.. TODO::
   :tag: Revision

   Rewrite along these lines: Here are two measures of "out of order":
   inversions and min-swaps. Selection sort (especially w/
   optimization) meets min-swaps, but that's not a useful measure in
   general. Insertion sort tracks inversions, it is I + n. Now, if we
   had an exchange sort, what would cost be? Go on to the proof.

Here is a summary for the cost of Insertion Sort,
Bubble Sort, and Selection Sort in terms of their required number of
comparisons and swaps in the best, average, and worst cases.
The running time for each of these sorts is
:math:`\Theta(n^2)` in the average and worst cases.

.. math::

   \begin{array}{rccc}
   &\textbf{Insertion}&\textbf{Bubble}&\textbf{Selection}\\
   \textbf{Comparisons:}\\
   \textrm{Best Case}&\Theta(n)&\Theta(n^2)&\Theta(n^2)\\
   \textrm{Average Case}&\Theta(n^2)&\Theta(n^2)&\Theta(n^2)\\
   \textrm{Worst Case}&\Theta(n^2)&\Theta(n^2)&\Theta(n^2)\\
   \\
   \textbf{Swaps:}\\
   \textrm{Best Case}&0&0&\Theta(n)\\
   \textrm{Average Case}&\Theta(n^2)&\Theta(n^2)&\Theta(n)\\
   \textrm{Worst Case}&\Theta(n^2)&\Theta(n^2)&\Theta(n)\\
   \end{array}

The remaining sorting algorithms presented in this tutorial are
significantly better than these three under typical conditions.
But before continuing on, it is instructive to investigate what makes
these three sorts so slow.
The crucial bottleneck is that only *adjacent* records are compared.
Thus, comparisons and moves (for Insertion and Bubble Sort) are by
single steps.
Swapping adjacent records is called an :term:`exchange`.
Thus, these sorts are sometimes referred to as an
:term:`exchange sort`.
The cost of any exchange sort can be at best the total number of
steps that the records in the array must move to reach their
"correct" location.
Recall that this is at least the number of
inversions for the record, where an :index:`inversion` occurs when a
record with key value greater than the current record's key value
appears before it.

.. avembed:: Exercises/Sorting/FindInversionsPRO.html ka


Analysis
--------

.. inlineav:: ExchangeSortCON ss
   :output: show

.. avembed:: Exercises/Sorting/ExchangeSumm.html ka

.. odsascript:: AV/Sorting/ExchangeSortCON.js
