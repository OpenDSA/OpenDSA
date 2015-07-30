.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: sorting terminology; sort code tuning; insertion sort
   :satisfies: quicksort
   :topic: Sorting

.. odsalink:: AV/Development/QuickSortBestCaseCON.css


.. index:: ! Quicksort

Quicksort-08
============

This is terrible, no better than Bubble Sort.
When will this worst case occur?
Only when each pivot yields a bad partitioning of the array.
If the pivot values are selected at random, then this is extremely
unlikely to happen.
When selecting the middle position of the current subarray, it is
still unlikely to happen.
It does not take many good partitionings for Quicksort to
work fairly well.

This visualization explains the best-case running time of Quick Sort

.. inlineav:: QuickSortBestCaseCON ss
   :output: show

.. odsascript:: AV/Development/QuickSortBestCaseCON.js
