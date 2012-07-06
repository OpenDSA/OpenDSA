.. _ExchangeSort:

.. index:: ! Exchange Sorting

.. include:: JSAVheader.rinc

The Cost of Exchange Sorting
============================

Figure <ODSAref "SlowSort" \> summarizes the cost of Insertion,
Bubble, and Selection Sort in terms of their required number of
comparisons and swaps in the best, average, and worst cases.
The running time for each of these sorts is
:math:`\Theta(n^2)` in the average and worst cases.

Here is a comparison of the asymptotic complexities for three simple
sorting algorithms.

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

The remaining sorting algorithms presented in this chapter are
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
"correct" location
(i.e., the number of inversions for each record).

What is the average number of inversions?
Consider a list **L** containing
:math:`n` values.
Define **L**:math:`_R`
to be **L** in reverse.
**L** has :math:`n(n-1)/2` distinct pairs of
values, each of which could potentially be an inversion.
Each such pair must either be an inversion in
**L** or in **L**:math:`_R`.
Thus, the total number of inversions in **L** and
**L**:math:`_R` together is exactly
:math:`n(n-1)/2` for an average of
:math:`n(n-1)/4` per list.
We therefore know with certainty that any sorting algorithm which
limits comparisons to adjacent items will cost at least
:math:`n(n-1)/4 = \Omega(n^2)` in the average case.

Notes
-----

There is a slight anomaly with the cost analysis of Selection Sort.
The supposed advantage for Selection Sort is its low number of swaps
required, yet Selection Sort's best-case number of swaps is worse than
that for Insertion Sort or Bubble Sort.
This is because the implementation given for Selection Sort does not
avoid a swap in the case where the :math:`i`'th smallest record is
already in position :math:`i`.
One could put in a test to avoid swapping in this situation.
But it usually takes more time to do the tests
than would be saved by avoiding such swaps.
This would be an example of an "optimization" that does not improve
performance. <ODSAref "CodeTuning" \>

.. avembed:: Exercises/ExchangeMC.html
   :showbutton: hide
   :title: Question 1
