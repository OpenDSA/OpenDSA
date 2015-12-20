.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :topic: Sorting

.. index:: ! sorting; empirical comparison

An Empirical Comparison of Sorting Algorithms
=============================================

An Empirical Comparison of Sorting Algorithms
---------------------------------------------

Which sorting algorithm is fastest?  Asymptotic complexity analysis
lets us distinguish between :math:`\Theta(n^2)` and
:math:`\Theta(n \log n)` algorithms, but it does not help distinguish
between algorithms with the same asymptotic complexity.
Nor does asymptotic analysis say anything about which algorithm is
best for sorting small lists.
For answers to these questions, we can turn to empirical testing.

.. _SortCompTable:

.. topic:: Table

   Empirical comparison of sorting algorithms run on a 3.4 GHz Intel
   Pentium 4 CPU running Linux.
   All times shown are milliseconds.

   .. math::

      \begin{array}{l|rrrrrrrr}
      \hline
      \textbf{Sort} & \textbf{10}& \textbf{100} & \textbf{1K}&
      \textbf{10K} & \textbf{100K}& \textbf{1M}& \textbf{Up} & \textbf{Down}\\
      \hline
      \textrm{Insertion} & .00023 & .007 & 0.66 &  64.98 &  7381.0 &  674420 & 0.04 & 129.05\\
      \textrm{Bubble}    & .00035 & .020 & 2.25 & 277.94 & 27691.0 & 2820680 &  70.64 & 108.69\\
      \textrm{Selection} & .00039 & .012 & 0.69 &  72.47 &  7356.0 &  780000 &  69.76 &  69.58\\
      \textrm{Shell}     & .00034 & .008 & 0.14 &   1.99 &    30.2 &     554 &   0.44 &   0.79\\
      \textrm{Shell/O}   & .00034 & .008 & 0.12 &   1.91 &    29.0 &     530 &   0.36 &   0.64\\
      \textrm{Merge}     & .00050 & .010 & 0.12 &   1.61 &    19.3 &     219 &   0.83 &   0.79\\
      \textrm{Merge/O}   & .00024 & .007 & 0.10 &   1.31 &    17.2 &     197 &   0.47 &   0.66\\
      \textrm{Quick}     & .00048 & .008 & 0.11 &   1.37 &    15.7 &     162 &   0.37 &   0.40\\
      \textrm{Quick/O}   & .00031 & .006 & 0.09 &   1.14 &    13.6 &     143 &   0.32 &   0.36\\
      \textrm{Heap}      & .00050 & .011 & 0.16 &   2.08 &    26.7 &     391 &   1.57 &   1.56\\
      \textrm{Heap/O}    & .00033 & .007 & 0.11 &   1.61 &    20.8 &     334 &   1.01 &   1.04\\
      \textrm{Radix/4}   & .00838 & .081 & 0.79 &   7.99 &    79.9 &     808 &   7.97 &   7.97\\
      \textrm{Radix/8}   & .00799 & .044 & 0.40 &   3.99 &    40.0 &     404 &   4.00 &   3.99\\
      \hline
      \end{array}

Table :num:`#SortCompTable` shows timing results for
actual implementations of the sorting algorithms presented in this
chapter.
The algorithms compared include
:ref:`Insertion Sort <insertion sort> <InsertionSort>`,
:ref:`Bubble Sort <bubble sort> <BubbleSort>`,
:ref:`Selection Sort <selection sort> <SelectionSort>`,
:ref:`Shellsort <Shellsort> <Shellsort>`,
:ref:`Quicksort <Quicksort> <Quicksort>`,
:ref:`Mergesort <Mergesort> <Mergesort>`,
:ref:`Heapsort <Heapsort> <Heapsort>`,
:ref:`Radix Sort <radix sort> <Radixsort>`.

Shellsort compares times for both the basic version and a version with
increments based on division by three.
Mergesort compares both the basic array-based implementation and an
optimized version (which includes calls to Insertion Sort for lists of
length below nine).
For Quicksort, two versions are compared: the basic implementation
and an optimized version that does not partition sublists below length
nine (with Insertion Sort performed at the end).
The first Heapsort version uses a standard class definition with
methods to implement access functions like "parent".
The second version removes all the method definitions and operates
directly on the array using inlined code for all access functions.

Except for the rightmost columns,
the input to each algorithm is a random array of integers.
This affects the timing for some of the sorting algorithms.
For example, Selection Sort is not being used to best advantage
because the record size is small, so it does not get the best possible
showing.
The Radix Sort implementation certainly takes advantage of this
key range in that it does not look at more digits than necessary.
On the other hand, it was not optimized to use bit shifting instead of 
division, even though the bases used would permit this.

The various sorting algorithms are shown for lists of sizes
10, 100, 1000, 10,000, 100,000, and 1,000,000.
The final two columns of each table show the performance for the
algorithms on inputs of size 10,000 where the numbers are in
ascending (sorted) and descending (reverse sorted) order,
respectively.
These columns demonstrate best-case performance for some
algorithms and worst-case performance for others.
They also show that for some algorithms, the order of input
has little effect.

These figures show a number of interesting results.
As expected, the :math:`O(n^2)` sorts are quite poor performers for
large arrays.
Insertion Sort is by far the best of this group, unless the array is
already reverse sorted.
Shellsort is clearly superior to any of these :math:`O(n^2)` sorts for
lists of even 100 records.
Optimized Quicksort is clearly the best overall algorithm for all but
lists of 10 records.
Even for small arrays, optimized Quicksort performs well because
it does one partition step before calling Insertion Sort.
Compared to the other :math:`O(n \log n)` sorts, unoptimized Heapsort
is quite slow due to the overhead of the class structure.
When all of this is stripped away and the algorithm is implemented to
manipulate an array directly, it is still somewhat slower than
mergesort.
In general, optimizing the various algorithms makes a
noticeable improvement for larger array sizes.

Overall, Radix Sort is a surprisingly poor performer.
If the code had been tuned to use bit shifting of the key value, it
would likely improve substantially;
but this would seriously limit the range of record types that the
sort could support.

Here are a few multiple choice questions that ask you to
compare the sorting algorithms that we learned about in this chapter.

.. avembed:: Exercises/Sorting/SortAlgCompSumm.html ka
