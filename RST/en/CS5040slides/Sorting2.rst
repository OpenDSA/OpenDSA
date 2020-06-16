.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

=====================
Sorting: Faster Sorts
=====================

Faster Sorts
------------

.. slide:: Shellsort

   .. avembed:: AV/Sorting/shellsortAV.html ss


.. slide:: Shellsort (2)

   .. codeinclude:: Sorting/Shellsort
      :tag: Shellsort


.. slide:: Mergesort

   .. avembed:: AV/Sorting/mergesortAV.html ss


.. slide:: .

   .

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

   .. inlineav:: quicksortCON ss
      :long_name: Quicksort Partition Slideshow
      :links: AV/Sorting/quicksortCON.css
      :scripts: AV/Sorting/quicksortCODE.js AV/Sorting/quicksortCON.js
      :output: show


.. slide:: Quicksort Partition Cost

   .. inlineav:: QuickSortPartitionAnalysisCON ss
      :long_name: Quicksort Partition Analysis Slideshow
      :links: AV/Sorting/QuickSortPartitionAnalysisCON.css
      :scripts: AV/Sorting/QuickSortPartitionAnalysisCON.js
      :output: show


.. slide:: Quicksort Summary

   .. avembed:: AV/Sorting/quicksortAV.html ss


.. slide:: Quicksort Worst Case

   .. inlineav:: QuickSortWorstCaseCON ss
      :long_name: Quicksort Worst Case Analysis Slideshow
      :links: AV/Sorting/QuickSortWorstCaseCON.css
      :scripts: AV/Sorting/QuickSortWorstCaseCON.js
      :output: show


.. slide:: .

   .

.. slide:: Quicksort Best Case

   .. inlineav:: QuickSortBestCaseCON ss
      :long_name: Quicksort Best Case Analysis Slideshow
      :links: AV/Sorting/QuickSortBestCaseCON.css
      :scripts: AV/Sorting/QuickSortBestCaseCON.js
      :output: show


.. slide:: .

   .

.. slide:: Quicksort Average Case

   .. inlineav:: QuickSortAverageCaseCON ss 
      :long_name: Quicksort Average Case Analysis Slideshow
      :links: AV/Sorting/QuickSortAverageCaseCON.css
      :scripts: AV/Sorting/QuickSortAverageCaseCON.js
      :output: show

.. slide:: Optimizations for Quicksort

   * Better Pivot
   * Inline instead of function calls
   * Eliminate recursion
   * Better algorithm for small sublists: Insertion sort
      * Best: Don't sort small lists at all, do a final Insertion Sort to
        clean up.


.. slide:: Heapsort

   .. inlineav:: heapsortCON ss
      :long_name: Heapsort Slideshow
      :scripts: DataStructures/binaryheap.js AV/Sorting/heapsortCON.js
      :output: show


.. slide:: Heapsort Analysis

   .. inlineav:: HeapSortAnalysisCON ss
      :long_name: Heapsort Analysis Slideshow
      :links: AV/Sorting/HeapSortAnalysisCON.css
      :scripts: DataStructures/binaryheap.js AV/Sorting/HeapSortAnalysisCON.js
      :output: show
