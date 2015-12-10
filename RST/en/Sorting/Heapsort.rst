.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: heap
   :satisfies: heapsort
   :topic: Sorting

.. index:: ! Heapsort

.. odsalink:: AV/Development/HeapSortAnalysisCON.css

Heapsort
========

Heapsort
--------

Our discussion of Quicksort began by considering the practicality of
using a BST for sorting.
The BST requires more space than the other sorting methods and will
be slower than Quicksort or Mergesort due to the relative expense of
inserting values into the tree.
There is also the possibility that the BST might be unbalanced,
leading to a :math:`\Theta(n^2)` worst-case running time.
Subtree balance in the BST is closely related to Quicksort's partition
step.
Quicksort's pivot serves roughly the same purpose as the BST root
value in that the left partition (subtree) stores values less than
the pivot (root) value, while the right partition (subtree) stores
values greater than or equal to the pivot (root).

A good sorting algorithm can be devised based on a tree structure more
suited to the purpose.
In particular, we would like the tree to be balanced, space efficient,
and fast.
The algorithm should take advantage of the fact that sorting is a
special-purpose application in that all of the values to be stored are
available at the start.
This means that we do not necessarily need to insert one value at a
time into the tree structure.

:term:`Heapsort` is based on the
:ref:`heap <heap> <Heaps>` data structure.
Heapsort has all of the advantages just listed.
The complete binary tree is balanced, its array representation is
space efficient, and we can load all values into the tree at once,
taking advantage of the efficient ``buildheap`` function.
The asymptotic performance of Heapsort when all of the records have
unique key values is :math:`\Theta(n \log n)` in the best, average,
and worst cases.
It is not as fast as Quicksort in the average case (by a constant
factor), but Heapsort has special properties that will make it
particularly useful for
:ref:`external sorting <external sort> <ExternalSort>` algorithms,
used when sorting data sets too large to fit in main memory.

.. inlineav:: heapsortCON ss
   :output: show

A complete implementation is as follows.

.. codeinclude:: Sorting/Heapsort 
   :tag: Heapsort 

Here is a warmup practice exercise for Heapsort.

.. avembed:: Exercises/Sorting/HeapsortStepPRO.html ka


Heapsort Proficiency Practice
-----------------------------

Now test yourself to see how well you understand Heapsort.
Can you reproduce its behavior?

.. avembed:: AV/Sorting/heapsortPRO.html pe


Heapsort Analysis
-----------------

This visualization presents the running time analysis of Heap Sort       

.. inlineav:: HeapSortAnalysisCON ss
   :output: show

While typically slower than Quicksort by a constant factor
(because unloading the heap using ``removemax`` is somewhat slower
than Quicksort's series of partitions), Heapsort
has one special advantage over the other sorts studied so far.
Building the heap is relatively cheap, requiring
:math:`\Theta(n)` time.
Removing the maximum-valued record from the heap requires
:math:`\Theta(\log n)` time.
Thus, if we wish to find the :math:`k` records with the largest
key values in an array, we can do so in time
:math:`\Theta(n + k \log n)`.
If :math:`k` is small, this is a substantial improvement over the time
required to find the :math:`k` largest-valued records using one of the
other sorting methods described earlier (many of which would require
sorting all of the array first).
One situation where we are able to take advantage of this concept is
in the implementation of 
:ref:`Kruskal's algorithm <Kruskal's algorithm> <MCST>` for
:term:`minimal-cost spanning trees <minimal-cost spanning tree>`.
That algorithm requires that edges be visited in ascending
order (so, use a min-heap), but this process stops as soon as the MST
is complete.
Thus, only a relatively small fraction of the edges need be sorted.

.. avembed:: Exercises/Sorting/HeapsortSumm.html ka

.. odsascript:: DataStructures/binaryheap.js
.. odsascript:: AV/Sorting/heapsortCON.js
.. odsascript:: AV/Development/HeapSortAnalysisCON.js
