.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :prerequisites: Sorting, InsertionSort, BubbleSort, SelectionSort
   :topic: Sorting

.. _ExchangeSort:

.. index:: ! exchange sorting

.. index:: sorting; exchange

.. include:: JSAVheader.rinc

The Cost of Exchange Sorting
============================

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
The crucial bottleneck is that only *adjacent*
records are compared.
Thus, comparisons and moves (in all but Selection Sort) are by single
steps.
Swapping adjacent records is called an :dfn:`exchange`.
Thus, these sorts are sometimes referred to as
:dfn:`exchange sorts`.
The cost of any exchange sort can be at best the total number of
steps that the records in the array must move to reach their
"correct" location.
Recall that this is at least the number of
inversions for the record, where an :index:`inversion` occurs when a
record with key value greater than the current record's key value
appears before it.

.. avembed:: Exercises/Sorting/FindInversionsPRO.html ka

What is the average number of inversions?
Consider a list **L** containing
:math:`n` values.
Define **L**:math:`_R`
to be **L** in reverse.
For example, if we have input list 3 4 1 2, the reverse list is 2 1 4 3.
**L** has :math:`n(n-1)/2` distinct pairs of
values, each of which could potentially be an inversion.
Each such pair must either be an inversion in
**L** or in **L**:math:`_R`.
In the example list and its reverse above, 3 comes before 4 in the
original list, and 4 comes before 3 in the reverse list.
Thus, the total number of inversions in **L** and
**L**:math:`_R` together is exactly
:math:`n(n-1)/2`.
This means that the average number of inversions must be half of that,
or :math:`n(n-1)/4` per list.
We therefore know with certainty that any sorting algorithm which
limits comparisons to adjacent items will cost at least
:math:`n(n-1)/4 = \Omega(n^2)` in the average case.

Here are the module review questions.

.. avembed:: Exercises/Sorting/ExchangeSumm.html ka
