.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: Heapsort
   :author: Cliff Shaffer
   :prerequisites: Sorting
   :topic: Sorting
   :short_name: Heapsort

.. _Heapsort:

.. include:: JSAVheader.rinc

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
Module <ODSAref "Heap" />.
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
Module <ODSAref "ExternalSort" />.

A sorting algorithm based on max-heaps is quite straightforward.
First we use the heap building algorithm of Module
<ODSAref "Heap" /> to convert the array into max-heap order.
Then we repeatedly remove the
maximum value from the heap, restoring the heap property each time
that we do so, until the heap is empty.
Note that each time we remove the maximum element from the heap, it is
placed at the end of the array.
Assume the :math:`n` elements are stored in array positions 0
through :math:`n-1`.
After removing the maximum value from the heap and
readjusting, the maximum value will now be placed in position
:math:`n-1` of the array.
The heap is now considered to be of size :math:`n-1`.
Removing the new maximum (root) value places the second largest value
in position :math:`n-2` of the array.
After removing each of the remaining values in turn, the array will be
properly sorted from least to greatest.
This is why Heapsort uses a max-heap rather than a min-heap as might
have been expected.
Figure <ODSAref "HeapSortFig" /> illustrates Heapsort.
The complete JAVA implementation is as follows.::

   static <E extends Comparable<? super E>>
   void heapsort(E[] A) {
     // The heap constructor invokes the buildheap method
     MaxHeap&lt;E> H = new MaxHeap<E>(A, A.length, A.length);
     for (int i=0; i<A.length; i++)  // Now sort
       H.removemax(); // Removemax places max at end of heap
   }

.. figure:: Images/Heapsort.png
   :width: 400
   :alt: Illustration of Heapsort

   <ODSAfig "HeapSortFig" />
   An illustration of Heapsort.
   The top row shows the values in their original order.
   The second row shows the values after building the heap.
   The third row shows the result of the first
   ``removefirst`` operation on key value 88.
   Note that 88 is now at the end of the array.
   The fourth row shows the result of the second ``removefirst``
   operation on key value 85.
   The fifth row shows the result of the third ``removefirst``
   operation on key value 83.
   At this point, the last three positions of the array hold the three
   greatest values in sorted order.
   Heapsort continues in this manner until the entire array is sorted.

Because building the heap takes :math:`\Theta(n)` time
(see Module <ODSAref "Heap" />), and because :math:`n` deletions
of the maximum element each take :math:`\Theta(\log n)` time,
we see that the entire Heapsort operation takes
:math:`\Theta(n \log n)` time in the worst, average, and best cases.
While typically slower than Quicksort by a constant factor, Heapsort
has one special advantage over the other sorts studied so far.
Building the heap is relatively cheap, requiring
:math:`\Theta(n)` time.
Removing the maximum element from the heap requires
:math:`\Theta(\log n)` time.
Thus, if we wish to find the :math:`k` largest
elements in an array, we can do so in time
:math:`\Theta(n + k \log n)`.
If :math:`k` is small, this is a substantial improvement over the time
required to find the :math:`k` largest elements using one of the other
sorting methods described earlier (many of which would require sorting
all of the array first).
One situation where we are able to take advantage of this concept is
in the implementation of Kruskal's minimum-cost spanning tree (MST)
algorithm of Module <ODSAref "Kruskal" />.
That algorithm requires that edges be visited in ascending
order (so, use a min-heap), but this process stops as soon as the MST
is complete.
Thus, only a relatively small fraction of the edges need be sorted.

Here is a warmup practice exercise for Heapsort.

.. avembed:: Exercises/Development/HeapSort.html
   :showbutton: hide
   :title: Heapsort Practice

Now test yourself to see how well you understand Heapsort.
Can you reproduce its behavior?

.. avembed:: AV/Development/heapsort-proficiency.html
   :showbutton: show
   :title: Heapsort Proficiency Exercise

Now here are summary questions.

.. avembed:: Exercises/Development/HeapSortSumm.html
   :showbutton: hide
   :title: Heapsort Review
