.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

==============
Sorting Part 2
==============

.. slide:: Code Tuning

   * General strategy: Test to avoid work
      * Balance test cost, success probability, work saved

   * "Optimizations" for quadratic sorts:
      * Insertion Sort shift vs swaps: Works
      * Selection Sort avoid self-swaps: Does not work
      * Bubble Sort avoid/count comparisions: Does not work
 
.. slide:: Exchange Sorting

   * All of the sorts so far rely on exchanges of adjacent records.
   * Inversions
   * What is the average number of exchanges required?

   .. odsalink:: AV/Sorting/ExchangeSortCON.css
   
   .. inlineav:: ExchangeSortCON ss
      :output: show

   .. odsascript:: AV/Sorting/ExchangeSortCON.js


.. slide:: Shellsort

   .. avembed:: AV/Sorting/shellsortAV.html ss


.. slide:: Shellsort (2)

   .. codeinclude:: Sorting/Shellsort
      :tag: Shellsort


.. slide:: Mergesort

   .. avembed:: AV/Sorting/mergesortAV.html ss


.. slide:: Mergesort cost

   * Mergesort cost:

   * Mergsort is also good for sorting linked lists.

   * Mergesort requires twice the space.


.. slide:: Quicksort

   .. codeinclude:: Sorting/Quicksort
      :tag: Quicksort

   .. codeinclude:: Sorting/Quicksort
      :tag: findpivot


.. slide:: Quicksort Partition

   .. odsalink:: AV/Sorting/quicksortCON.css

   .. inlineav:: quicksortCON ss
      :output: show

   .. odsascript:: AV/Sorting/quicksortCODE.js
   .. odsascript:: AV/Sorting/quicksortCON.js


.. slide:: Quicksort Partition Cost

   .. odsalink:: AV/Development/QuickSortPartitionAnalysisCON.css

   .. inlineav:: QuickSortPartitionAnalysisCON ss
      :output: show

   .. odsascript:: AV/Development/QuickSortPartitionAnalysisCON.js


.. slide:: Quicksort Summary

   .. avembed:: AV/Sorting/quicksortAV.html ss


.. slide:: Quicksort Worst Case

   .. odsalink:: AV/Development/QuickSortWorstCaseCON.css

   .. inlineav:: QuickSortWorstCaseCON ss
      :output: show

   .. odsascript:: AV/Development/QuickSortWorstCaseCON.js


.. slide:: .

   .

.. slide:: Quicksort Best Case

   .. odsalink:: AV/Development/QuickSortBestCaseCON.css

   .. inlineav:: QuickSortBestCaseCON ss
      :output: show

   .. odsascript:: AV/Development/QuickSortBestCaseCON.js


.. slide:: .

   .

.. slide:: Quicksort Average Case

   .. odsalink:: AV/Development/QuickSortAverageCaseCON.css

   .. inlineav:: QuickSortAverageCaseCON ss
      :output: show

   .. odsascript:: AV/Development/QuickSortAverageCaseCON.js


.. slide:: Optimizations for Quicksort

   * Better Pivot
   * Inline instead of function calls
   * Eliminate recursion
   * Better algorithm for small sublists: Insertion sort
      * Best: Don't sort small lists at all, do a final Insertion Sort to
        clean up.


.. slide:: Heapsort

   .. inlineav:: heapsortCON ss
      :output: show

   .. odsascript:: DataStructures/binaryheap.js
   .. odsascript:: AV/Sorting/heapsortCON.js


.. slide:: Heapsort Analysis

   .. odsalink:: AV/Development/HeapSortAnalysisCON.css

   .. inlineav:: HeapSortAnalysisCON ss
      :output: show

   .. odsascript:: AV/Development/HeapSortAnalysisCON.js


.. slide:: Sorting Lower Bounds

   .. odsalink:: AV/Development/SortingLowerBoundCON.css

   .. inlineav:: SortingLowerBoundCON ss
      :output: show

   .. odsascript:: AV/Development/SortingLowerBoundCON.js


.. slide:: Binsort

   .. codeinclude:: Sorting/Binsort 
      :tag: simplebinsort

   .. inlineav:: binsortS1CON ss
      :output: show

   .. odsascript:: AV/Sorting/binsortS1CON.js


.. slide:: Radix Sort: Linked List

   .. avembed:: AV/Sorting/radixLinkAV.html ss


.. slide:: .

   .


.. slide:: Radix Sort: Array

   .. avembed:: AV/Sorting/radixArrayAV.html ss


.. slide:: Radix Sort Implementation

   .. codeinclude:: Sorting/Radixsort
      :tag: Radixsort


.. slide:: .

   .

.. slide:: Radix Sort Analysis

   .. odsalink:: AV/Development/RadixSortAnalysisCON.css

   .. inlineav:: RadixSortAnalysisCON ss
      :output: show

   .. odsascript:: AV/Development/RadixSortAnalysisCON.js


.. slide:: Empirical Analysis

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
