.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :prerequisites: Sorting
   :topic: Sorting

.. odsascript:: JSAV/extras/binaryheap.js
.. odsalink:: AV/slideCON.css

.. index:: ! Heapsort

Heapsort
========

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

Heapsort is based on the heap data structure presented in
Module :numref:`Heaps <Heaps>`.
Heapsort has all of the advantages just listed.
The complete binary tree is balanced, its array representation is
space efficient, and we can load all values into the tree at once,
taking advantage of the efficient ``buildheap`` function.
The asymptotic performance of Heapsort is
:math:`\Theta(n \log n)` in the best, average, and worst cases.
It is not as fast as Quicksort in the average case (by a constant
factor), but Heapsort has special properties that will make it
particularly useful when sorting data sets too large to fit in main
memory, as discussed in
Module :numref:`External Sorting <ExternalSort>`.

.. inlineav:: heapsortCON ss
   :output: show

A complete implementation is as follows.

.. codeinclude:: Sorting/Heapsort/Heapsort.pde 
   :tag: Heapsort        

Because building the heap takes :math:`\Theta(n)` time
(see Module :numref:`Heaps <Heaps>`)
and because :math:`n` deletions
of the maximum-valued record each take :math:`\Theta(\log n)` time,
we see that the entire Heapsort operation takes
:math:`\Theta(n \log n)` time in the worst, average, and best cases.
While typically slower than Quicksort by a constant factor
(because loading and unloading the heap is somewhat slower than
Quicksort's series of partitions), Heapsort
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
in the implementation of Kruskal's minimal cost spanning tree (MST)
algorithm of (see Module :numref:`Minimal Cost Spanning Trees <MCST>`).
That algorithm requires that edges be visited in ascending
order (so, use a min-heap), but this process stops as soon as the MST
is complete.
Thus, only a relatively small fraction of the edges need be sorted.

Here is a warmup practice exercise for Heapsort.

.. avembed:: Exercises/Sorting/HeapsortPRO.html ka

Now test yourself to see how well you understand Heapsort.
Can you reproduce its behavior?

.. avembed:: AV/Sorting/heapsortProficiency.html pe

Now here are summary questions.

.. avembed:: Exercises/Sorting/HeapsortSumm.html ka

.. odsascript:: AV/Sorting/heapsortCON.js
