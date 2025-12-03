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

.. raw:: html

   <iframe src="../../../Metadata/inlineav/Sorting/quicksortCON.html" 
           width="960" 
           height="550" 
           frameborder="0"
           style="background: white; display: block; margin: 0 auto;">
   </iframe>


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
