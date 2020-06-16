.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

==========================
Sorting: Limits to Sorting
==========================

Limits to Sorting
-----------------



.. slide:: Binsort

   .. codeinclude:: Sorting/Binsort
      :tag: simplebinsort

   .. inlineav:: binsortS1CON ss
      :long_name: Binsort Slideshow 1
      :links: 
      :scripts: AV/Sorting/binsortS1CON.js
      :output: show


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

   .. inlineav:: RadixSortAnalysisCON ss
      :long_name: Radix Sort Analysis Slideshow
      :links: AV/Sorting/RadixSortAnalysisCON.css
      :scripts: AV/Sorting/RadixSortAnalysisCON.js
      :output: show


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


.. slide:: Sorting Lower Bound (1)

   * We would like to know a lower bound for the problem of sorting

   * Sorting is :math:`O(n \log n)` (average, worst cases) because we know of
     algorithms with this upper bound.

   * Sorting I/O takes :math:`\Omega(n)` time. You have to look at all records
     to tell if the list is sorted.

   * We will now prove :math:`\Omega(n log n)` lower bound for sorting.


.. slide:: Sorting Lower Bound (2)

   .. inlineav:: SortingLowerBoundCON ss
      :long_name: Sorting Lower Bound
      :links: AV/Sorting/SortingLowerBoundCON.css
      :scripts: AV/Sorting/SortingLowerBoundCON.js
      :output: show
