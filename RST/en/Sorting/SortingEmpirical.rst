.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :title: An Empirical Comparison of Sorting Algorithms
   :institution: Virginia Tech
   :author: Cliff Shaffer
   :topic: Sorting
   :keyword: Sorting; Empirical Comparison
   :naturallanguage: en
   :programminglanguage: N/A
   :description: An empirical runtime comparison of many sorting algorithms, including optimized versions.

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

   Empirical comparison of sorting algorithms run on an i7 Intel
   CPU running Linux.
   All times shown are microseconds.
   These sorting algorithms are implemented in Java, and run on
   ``int[]`` arrays of the given sizes.
   JIT compiler optimization is turned off to avoid confounding the
   comparisons with issues of how well the particular implementations
   allow for fine-grained code optimization.
   Mergesort and Quicksort optimized versions are run with a threshold
   value of 14.

   .. math::

      \begin{array}{l|rrrrrrrr}
      \hline
      \textbf{Sort} & \textbf{10}& \textbf{100} & \textbf{1K}&
      \textbf{10K} & \textbf{100K}& \textbf{1M}& \textbf{Up} & \textbf{Down}\\
      \hline
      \textrm{Insertion}   &  1.021 & 58.14 & 6,671 & 644,270 &  63,703,025 &        ** &      69 & 1,284,286\\
      \textrm{Insertion/O} &  0.598 & 27.09 & 2,873 & 280,844 &  27,711,032 &        ** &     143 &   555,493\\
      \textrm{Bubble}      &  1.227 & 93.17 & 9,912 & 979,661 &  97,683,649 &        ** & 297,880 & 1,384,555\\
      \textrm{Bubble/O}    &  1.151 & 84.41 & 9,044 & 902,090 &  89,864,060 &        ** &      67 & 1,278,335\\
      \textrm{Selection}   &  0.835 & 42.67 & 3,622 & 342,452 &  34,181,164 &        ** & 273,981 &   308,332\\
      \textrm{Shell}       &  0.660 & 20.87 &   366 &   6,064 &     103,307 & 1,688,346 &   1,617 &     3,559\\
      \textrm{Merge}       &  1.137 & 18.21 &   254 &   3,299 &      39,935 &   473,512 &   2,679 &     2,683\\
      \textrm{Merge/O}     &  0.625 & 14.13 &   193 &   2,608 &      32,576 &   372,076 &   1,722 &     2,854\\
      \textrm{Quick}       &  0.874 & 12.40 &   183 &   2,376 &      29,557 &   338,423 &     958 &     1,177\\
      \textrm{Quick/O}     &  0.682 &  7.83 &   133 &   1,762 &      21,736 &   254,271 &     568 &       765\\
      \textrm{Heap}        &  2.188 & 40.47 &   586 &   7,869 &      99,056 & 1,193,675 &   8,131 &     7,406\\
      \textrm{Radix}       & 10.253 & 24.17 &   163 &   1,540 &      15,357 &   153,086 &   1,539 &     1,542\\
      \textrm{Radix/O}     & 13.674 & 26.54 &   154 &   1,432 &      14,220 &   143,758 &   1,431 &     1,428\\
      \textrm{Radix/Link}  & 14.158 & 26.91 &   143 &   1,223 &      12,113 &   131,386 &   1,192 &     1,191\\
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
:ref:`Radix Sort <radix sort> <Radixsort>`,
all run on simple ``int[]`` arrays.

Two versions of Insertion Sort are timed, the standard algorithm and
the optimized version using that shifts values down the array instead
of simple swaps.
Bubblesort shows times for the standard algorithm and one that
monitors the last position swapped in an attempt to optimize
performance.
Mergesort compares both the basic array-based implementation and an
optimized version (which includes calls to Insertion Sort for lists of
length below a threshold value of 14).
For Quicksort, two versions are compared: the basic implementation
and an optimized version that does not partition sublists below length
14 (with Insertion Sort performed at the end).
Times for three versions of Radixsort are shown:
the array-based version (one using divide and mod, the other using
shift and mask) and the linked-list version (using divide and mod).

Except for the rightmost columns,
the input to each algorithm is a random array of integers.
This affects the timing for some of the sorting algorithms.
For example, Selection Sort is not being used to best advantage
because the record size is small (cheap swaps), so it does not get the
best possible showing.
The Radix Sort implementation certainly takes advantage of knowing
that integer keys, and does not look at more bits than necessary.

The various sorting algorithms are shown for lists of sizes
10, 100, 1000, 10,000, 100,000, and 1,000,000.
(Note that the :math:`O(n^2)` sorts are not times on input arrays of
size 1,000,000 due to their exessive time requirements).
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
Insertion Sort is by far the best of this group.
Shellsort is clearly superior to any of these :math:`O(n^2)` sorts for
lists of even 100 records.
Optimized Quicksort is generally the best overall algorithm aside from
Radix sort.
Even for small arrays, optimized Quicksort performs well because
it does one partition step before calling Insertion Sort.
Compared to the other :math:`O(n \log n)` sorts, unoptimized Heapsort
is quite slow due to the overhead of the class structure.
When all of this is stripped away and the algorithm is implemented to
manipulate an array directly, it is still somewhat slower than
mergesort.
In general, optimizing the various algorithms makes a
noticeable improvement for larger array sizes.

Overall, Radix Sort is a surprisingly strong performer.
This is true for both the array version and the linked-list version.
However, its requirements for being able to properly manipulate the
digits of its key might limit the range of record types (and thus, the
applications) that the sort could support.

It is certainly important to consider the fact that the sorting times
above are for simple arrays of ``int`` values.
This affects the relative time required for key value access and
comparison, and swap times.
Table :num:`#SortCompTable` shows timing results for for the same set
of algorithms written to support records of Key-Value Pair objects
(where the keys and values are Integer objects).
A few algorithms perform relatively better or worse.
The most noticeable change is that the optimized versions of Quicksort
and Mergesort have effectively identical runtimes.

.. _SortCompTable2:

.. topic:: Table

   Empirical comparison of sorting algorithms run on an i7 Intel
   CPU running Linux.
   All times shown are microseconds.
   These sorting algorithms are implemented in Java, and run on
   arrays storing Key-Value Pair objects.
   JIT compiler optimization is turned off to avoid confounding the
   comparisons with issues of how well the particular implementations
   allow for fine-grained code optimization.
   Mergesort and Quicksort optimized versions are run with a threshold
   value of 12.

   .. math::

      \begin{array}{l|rrrrrrrr}
      \hline
      \textbf{Sort} & \textbf{10}& \textbf{100} & \textbf{1K}&
      \textbf{10K} & \textbf{100K}& \textbf{1M}& \textbf{Up} & \textbf{Down}\\
      \hline
      \textrm{Insertion}   &  2.218 & 140.8 & 15,645 & 1,624,109 & 160,376,213 &        ** &       459 & 3,145,708\\
      \textrm{Insertion/O} &  1.829 & 107.0 & 11,720 & 1,236,696 & 124,648,756 &        ** &       506 & 2,327,967\\
      \textrm{Bubble}      &  2.980 & 281.8 & 28,722 & 2,901,530 & 299,724,228 &        ** & 2,216,133 & 3,324,352\\
      \textrm{Bubble/O}    &  2.898 & 264.0 & 27,198 & 2,773,346 & 287,162,845 &        ** &       425 & 3,207.521\\
      \textrm{Selection}   &  2.612 & 215.7 & 20,836 & 2,096,068 & 223,411,871 &        ** & 2,231,149 & 2,158,924\\
      \textrm{Shell}       &  1.355 &  51.5 &    927 &    15,902 &     276,410 & 4,895,720 &     5,601 &     9,447\\
      \textrm{Merge}       &  2.140 &  42.4 &    582 &     7,873 &     100,485 & 1,465,125 &     5,457 &     5,315\\
      \textrm{Merge/O}     &  1.535 &  35.8 &    525 &     7,471 &      96,140 & 1,283,238 &     5,574 &     7,918\\
      \textrm{Quick}       &  2.322 &  40.1 &    628 &     9,339 &     121,552 & 1,605,892 &     4,712 &     5,258\\
      \textrm{Quick/O}     &  2.052 &  31.7 &    490 &     7,243 &      98,590 & 1,309,377 &     4,051 &     4,518\\
      \textrm{Heap}        &  3.691 &  76.1 &  1,166 &    16,733 &     217,564 & 2,950,913 &    16,647 &    15,456\\
      \textrm{Radix}       & 12.749 &  47.7 &    398 &     3,943 &      41,139 &   817,696 &     3,949 &     3,979\\
      \textrm{Radix/O}     & 15.910 &  50.1 &    389 &     3,831 &      40,975 &   761,813 &     3,936 &     3,823\\
      \textrm{Radix/Link}  & 14.957 &  34.1 &    220 &     2,037 &      22,776 &   635,555 &     2,028 &     2,028\\
      \hline
      \end{array}

Here are a few multiple choice questions that ask you to
compare the sorting algorithms that we learned about in this chapter.

.. avembed:: Exercises/Sorting/SortAlgCompSumm.html ka
   :long_name: Sort Comparison Summary Exercise
   :keyword: Sorting; Comparison of Sorting Algorithms


