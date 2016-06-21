.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

==============
Sorting Part 1
==============

Sorting
~~~~~~~

   * Each record contains a field called the key.
      * Linear order: comparison.

   * Measures of cost:
      * Comparisons
      * Swaps

Insertion Sort
~~~~~~~~~~~~~~

   .. inlineav:: insertionsortCON ss
      :output: show

   .. odsascript:: AV/Sorting/insertionsortCON.js

Analysis: Worst Case
~~~~~~~~~~~~~~~~~~~~~

   .. odsalink:: AV/Sorting/InsertionSortWorstCaseCON.css

   .. inlineav:: InsertionSortWorstCaseCON ss
      :output: show

   .. odsascript:: AV/Sorting/InsertionSortWorstCaseCON.js


Analysis: Best Case
~~~~~~~~~~~~~~~~~~~
   .. odsalink:: AV/Sorting/InsertionSortBestCaseCON.css

   .. inlineav:: InsertionSortBestCaseCON ss
      :output: show

   .. odsascript:: AV/Sorting/InsertionSortBestCaseCON.js


Analysis: Average Case
~~~~~~~~~~~~~~~~~~~~~~

   .. odsalink:: AV/Sorting/InsertionSortAverageCaseCON.css

   .. inlineav:: InsertionSortAverageCaseCON ss
      :output: show

   .. odsascript:: AV/Sorting/InsertionSortAverageCaseCON.js


Bubble Sort
~~~~~~~~~~~
   .. inlineav:: bubblesortS1CON ss
      :output: show

   .. inlineav:: bubblesortS2CON ss
      :output: show

   .. odsascript:: AV/Sorting/bubblesortS1CON.js
   .. odsascript:: AV/Sorting/bubblesortS2CON.js


Analysis
~~~~~~~~

   .. odsalink:: AV/Sorting/BubbleSortAnalysisCON.css

   .. inlineav:: BubbleSortAnalysisCON ss
      :output: show

   .. odsascript:: AV/Sorting/BubbleSortAnalysisCON.js


Selection Sort
~~~~~~~~~~~~~~

   .. inlineav:: selectionsortS1CON ss
      :output: show

   .. inlineav:: selectionsortS2CON ss
      :output: show

   .. odsascript:: AV/Sorting/selectionsortS1CON.js
   .. odsascript:: AV/Sorting/selectionsortS2CON.js


Analysis
~~~~~~~~

   .. odsalink:: AV/Sorting/SelectionSortAnalysisCON.css

   .. inlineav:: SelectionSortAnalysisCON ss
      :output: show

   .. odsascript:: AV/Sorting/SelectionSortAnalysisCON.js


Summary
~~~~~~~

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


==============
Sorting Part 2
==============

Code Tuning
~~~~~~~~~~~

   * General strategy: Test to avoid work
      * Balance test cost, success probability, work saved

   * "Optimizations" for quadratic sorts:
      * Insertion Sort shift vs swaps: Works
      * Selection Sort avoid self-swaps: Does not work
      * Bubble Sort avoid/count comparisions: Does not work
 
Exchange Sorting
~~~~~~~~~~~~~~~~

   * All of the sorts so far rely on exchanges of adjacent records.
   * Inversions
   * What is the average number of exchanges required?

   .. odsalink:: AV/Sorting/ExchangeSortCON.css
   
   .. inlineav:: ExchangeSortCON ss
      :output: show

   .. odsascript:: AV/Sorting/ExchangeSortCON.js


Shellsort
~~~~~~~~~

   .. avembed:: AV/Sorting/shellsortAV.html ss

Shellsort (2)
~~~~~~~~~~~~~

   .. codeinclude:: Sorting/Shellsort
      :tag: Shellsort


Mergesort
~~~~~~~~~

   .. avembed:: AV/Sorting/mergesortAV.html ss


Mergesort cost
~~~~~~~~~~~~~~

   * Mergesort cost:

   * Mergsort is also good for sorting linked lists.

   * Mergesort requires twice the space.


Quicksort
~~~~~~~~~

   .. codeinclude:: Sorting/Quicksort
      :tag: Quicksort

   .. codeinclude:: Sorting/Quicksort
      :tag: findpivot


Quicksort Partition
~~~~~~~~~~~~~~~~~~~

   .. odsalink:: AV/Sorting/quicksortCON.css

   .. inlineav:: quicksortCON ss
      :output: show

   .. odsascript:: AV/Sorting/quicksortCODE.js
   .. odsascript:: AV/Sorting/quicksortCON.js


Quicksort Partition Cost
~~~~~~~~~~~~~~~~~~~~~~~~

   .. odsalink:: AV/Development/QuickSortPartitionAnalysisCON.css

   .. inlineav:: QuickSortPartitionAnalysisCON ss
      :output: show

   .. odsascript:: AV/Development/QuickSortPartitionAnalysisCON.js


Quicksort Summary
~~~~~~~~~~~~~~~~~

   .. avembed:: AV/Sorting/quicksortAV.html ss


Quicksort Worst Case
~~~~~~~~~~~~~~~~~~~~

   .. odsalink:: AV/Development/QuickSortWorstCaseCON.css

   .. inlineav:: QuickSortWorstCaseCON ss
      :output: show

   .. odsascript:: AV/Development/QuickSortWorstCaseCON.js


Quicksort Best Case
~~~~~~~~~~~~~~~~~~~

   .. odsalink:: AV/Development/QuickSortBestCaseCON.css

   .. inlineav:: QuickSortBestCaseCON ss
      :output: show

   .. odsascript:: AV/Development/QuickSortBestCaseCON.js


Quicksort Average Case
~~~~~~~~~~~~~~~~~~~~~~

   .. odsalink:: AV/Development/QuickSortAverageCaseCON.css

   .. inlineav:: QuickSortAverageCaseCON ss
      :output: show

   .. odsascript:: AV/Development/QuickSortAverageCaseCON.js


Optimizations for Quicksort
~~~~~~~~~~~~~~~~~~~~~~~~~~~

   * Better Pivot
   * Inline instead of function calls
   * Eliminate recursion
   * Better algorithm for small sublists: Insertion sort
      * Best: Don't sort small lists at all, do a final Insertion Sort to
        clean up.


Heapsort
~~~~~~~~

   .. inlineav:: heapsortCON ss
      :output: show

   .. odsascript:: DataStructures/binaryheap.js
   .. odsascript:: AV/Sorting/heapsortCON.js


Heapsort Analysis
~~~~~~~~~~~~~~~~~

   .. odsalink:: AV/Development/HeapSortAnalysisCON.css

   .. inlineav:: HeapSortAnalysisCON ss
      :output: show

   .. odsascript:: AV/Development/HeapSortAnalysisCON.js


Binsort
~~~~~~~

   .. codeinclude:: Sorting/Binsort 
      :tag: simplebinsort

   .. inlineav:: binsortS1CON ss
      :output: show

   .. odsascript:: AV/Sorting/binsortS1CON.js


Radix Sort: Linked List
~~~~~~~~~~~~~~~~~~~~~~~

   .. avembed:: AV/Sorting/radixLinkAV.html ss


Radix Sort: Array
~~~~~~~~~~~~~~~~~

   .. avembed:: AV/Sorting/radixArrayAV.html ss


Radix Sort Implementation
~~~~~~~~~~~~~~~~~~~~~~~~~

   .. codeinclude:: Sorting/Radixsort
      :tag: Radixsort


Radix Sort Analysis
~~~~~~~~~~~~~~~~~~~

   .. odsalink:: AV/Development/RadixSortAnalysisCON.css

   .. inlineav:: RadixSortAnalysisCON ss
      :output: show

   .. odsascript:: AV/Development/RadixSortAnalysisCON.js


Empirical Analysis
~~~~~~~~~~~~~~~~~~

   .. math::

      \begin{array}{l|rrrrrrrr}
      \hline
      \textbf{Sort} & \textbf{10}& \textbf{100} & \textbf{1K}&
      \textbf{10K} & \textbf{100K}& \textbf{1M}& \textbf{Up} &
      \textbf{Down}\\
      \hline
      \textrm{Insertion} & .00023 & .007 & 0.66 &  64.98 &  7381.0 &
      674420 & 0.04 & 129.05\\
      \textrm{Bubble}    & .00035 & .020 & 2.25 & 277.94 & 27691.0 &
      2820680 &  70.64 & 108.69\\
      \textrm{Selection} & .00039 & .012 & 0.69 &  72.47 &  7356.0 &
      780000 &  69.76 &  69.58\\
      \textrm{Shell}     & .00034 & .008 & 0.14 &   1.99 &    30.2 &
      554 &   0.44 &   0.79\\
      \textrm{Shell/O}   & .00034 & .008 & 0.12 &   1.91 &    29.0 &
      530 &   0.36 &   0.64\\
      \textrm{Merge}     & .00050 & .010 & 0.12 &   1.61 &    19.3 &
      219 &   0.83 &   0.79\\
      \textrm{Merge/O}   & .00024 & .007 & 0.10 &   1.31 &    17.2 &
      197 &   0.47 &   0.66\\
      \textrm{Quick}     & .00048 & .008 & 0.11 &   1.37 &    15.7 &
      162 &   0.37 &   0.40\\
      \textrm{Quick/O}   & .00031 & .006 & 0.09 &   1.14 &    13.6 &
      143 &   0.32 &   0.36\\
      \textrm{Heap}      & .00050 & .011 & 0.16 &   2.08 &    26.7 &
      391 &   1.57 &   1.56\\
      \textrm{Heap/O}    & .00033 & .007 & 0.11 &   1.61 &    20.8 &
      334 &   1.01 &   1.04\\
      \textrm{Radix/4}   & .00838 & .081 & 0.79 &   7.99 &    79.9 &
      808 &   7.97 &   7.97\\
      \textrm{Radix/8}   & .00799 & .044 & 0.40 &   3.99 &    40.0 &
      404 &   4.00 &   3.99\\
      \hline
      \end{array}


Sorting Lower Bounds
~~~~~~~~~~~~~~~~~~~~

   .. odsalink:: AV/Development/SortingLowerBoundCON.css

   .. inlineav:: SortingLowerBoundCON ss
      :output: show

   .. odsascript:: AV/Development/SortingLowerBoundCON.js
