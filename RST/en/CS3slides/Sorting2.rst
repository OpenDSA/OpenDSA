.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

==============
Sorting Part 2
==============

Shellsort
---------

.. revealjs-slide::

.. avembed:: AV/Sorting/shellsortAV.html ss


Shellsort (2)
-------------

.. revealjs-slide::

.. codeinclude:: Sorting/Shellsort
   :tag: Shellsort


Mergesort
---------

.. revealjs-slide::

.. avembed:: AV/Sorting/mergesortAV.html ss


Mergesort cost
--------------

.. revealjs-slide::

* Mergesort cost:

* Mergesort is also good for sorting linked lists.

* Mergesort requires twice the space.


Quicksort
---------

.. revealjs-slide::

.. codeinclude:: Sorting/Quicksort
   :tag: Quicksort

.. codeinclude:: Sorting/Quicksort
   :tag: findpivot


Quicksort Partition
-------------------

.. revealjs-slide::

.. inlineav:: quicksortCON ss
   :long_name: Quicksort Partition Slideshow
   :links: AV/Sorting/quicksortCON.css
   :scripts: AV/Sorting/quicksortCODE.js AV/Sorting/quicksortCON.js
   :output: show


Quicksort Partition Cost
------------------------

.. revealjs-slide::

.. inlineav:: QuickSortPartitionAnalysisCON ss
   :long_name: Quicksort Partition Analysis Slideshow
   :links: AV/Sorting/QuickSortPartitionAnalysisCON.css
   :scripts: AV/Sorting/QuickSortPartitionAnalysisCON.js
   :output: show


Quicksort Summary
-----------------

.. revealjs-slide::

.. avembed:: AV/Sorting/quicksortAV.html ss


Quicksort Worst Case
--------------------

.. revealjs-slide::

.. inlineav:: QuickSortWorstCaseCON ss
   :long_name: Quicksort Worst Case Analysis Slideshow
   :links: AV/Sorting/QuickSortWorstCaseCON.css
   :scripts: AV/Sorting/QuickSortWorstCaseCON.js
   :output: show


Quicksort Best Case
-------------------

.. revealjs-slide::

.. inlineav:: QuickSortBestCaseCON ss
   :long_name: Quicksort Best Case Analysis Slideshow
   :links: AV/Sorting/QuickSortBestCaseCON.css
   :scripts: AV/Sorting/QuickSortBestCaseCON.js
   :output: show


Quicksort Average Case
----------------------

.. revealjs-slide::

.. inlineav:: QuickSortAverageCaseCON ss 
   :long_name: Quicksort Average Case Analysis Slideshow
   :links: AV/Sorting/QuickSortAverageCaseCON.css
   :scripts: AV/Sorting/QuickSortAverageCaseCON.js
   :output: show


Optimizations for Quicksort
---------------------------

.. revealjs-slide::

* Better Pivot
* Inline instead of function calls
* Eliminate recursion
* Better algorithm for small sublists: Insertion sort

  * Best: Don't sort small lists at all, do a final Insertion Sort to
    clean up.


Heapsort
--------

.. revealjs-slide::

.. inlineav:: heapsortCON ss
   :long_name: Heapsort Slideshow
   :scripts: DataStructures/binaryheap.js AV/Sorting/heapsortCON.js
   :output: show


Heapsort Analysis
-----------------

.. revealjs-slide::

.. inlineav:: HeapSortAnalysisCON ss
   :long_name: Heapsort Analysis Slideshow
   :links: AV/Sorting/HeapSortAnalysisCON.css
   :scripts: DataStructures/binaryheap.js AV/Sorting/HeapSortAnalysisCON.js
   :output: show


Binsort
-------

.. codeinclude:: Sorting/Binsort
   :tag: simplebinsort

.. inlineav:: binsortS1CON ss
   :long_name: Binsort Slideshow 1
   :links: 
   :scripts: AV/Sorting/binsortS1CON.js
   :output: show


Radix Sort: Linked List
-----------------------

.. revealjs-slide::

.. avembed:: AV/Sorting/radixLinkAV.html ss


Radix Sort: Array
-----------------

.. revealjs-slide::

.. avembed:: AV/Sorting/radixArrayAV.html ss


Radix Sort Implementation
-------------------------

.. revealjs-slide::

.. codeinclude:: Sorting/Radixsort
   :tag: Radixsort


Radix Sort Analysis
-------------------

.. revealjs-slide::

.. inlineav:: RadixSortAnalysisCON ss
   :long_name: Radix Sort Analysis Slideshow
   :links: AV/Sorting/RadixSortAnalysisCON.css
   :scripts: AV/Sorting/RadixSortAnalysisCON.js
   :output: show


Empirical Analysis
------------------

.. revealjs-slide::

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


Sorting Lower Bound (1)
-----------------------

.. revealjs-slide::

* We would like to know a lower bound for the problem of sorting

* Sorting is :math:`O(n \log n)` (average, worst cases) because we know of
  algorithms with this upper bound.

* Sorting I/O takes :math:`\Omega(n)` time. You have to look at all records
  to tell if the list is sorted.

* We will now prove :math:`\Omega(n log n)` lower bound for sorting.


Sorting Lower Bound (2)
-----------------------

.. revealjs-slide::

.. inlineav:: SortingLowerBoundCON ss
   :long_name: Sorting Lower Bound
   :links: AV/Sorting/SortingLowerBoundCON.css
   :scripts: AV/Sorting/SortingLowerBoundCON.js
   :output: show
