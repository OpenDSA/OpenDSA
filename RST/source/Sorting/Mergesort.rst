.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :prerequisites: Sorting
   :topic: Sorting

.. odsalink:: AV/Sorting/mergeCON.css

.. index:: ! Mergesort

Mergesort Concepts
==================

A natural approach to problem solving is divide and conquer.
To use divide and conquer when sorting, we might consider breaking the
list to be sorted into pieces, process the pieces, and then put them
back together somehow.
A simple way to do this would be to split the list in half, sort
the halves, and then merge the sorted halves together.
This is the idea behind Mergesort.

Mergesort is one of the simplest sorting algorithms conceptually,
and has good performance both in the asymptotic 
sense and in empirical running time.
Unfortunately, even though it is based on a simple concept,
it is relatively difficult to implement in practice.
Here is a pseudocode sketch of Mergesort::

    List mergesort(List inlist) {
      if (inlist.length() <= 1) return inlist;;
      List L1 = half of the items from inlist;
      List L2 = other half of the items from inlist;
      return merge(mergesort(L1), mergesort(L2));
    }

Here is a visualization that illustrates how Mergesort works.

.. avembed:: AV/Sorting/mergesortAV.html ss

The hardest step to understand about Mergesort is the merge function.
The merge function starts by examining the first record of each
sublist and picks the smaller value as the smallest record overall.
This smaller value is removed from its sublist and placed into the
output list.
Merging continues in this way, comparing the front
records of the sublists and continually appending the smaller to the
output list until no more input records remain.

Here is pseudocode for merge on lists::

    List merge(List L1, List L2) {
      List answer = new List();
      while (L1 != NULL || L2 != NULL) {
        if (L1 == NULL) { // Done L1
          answer.append(L2);
          L2 = NULL;
        }
        else if (L2 == NULL) { // Done L2
          answer.append(L1);
          L1 = NULL;
        }
        else if (L1.value() < L2.value()) {
          answer.append(L1.value());
          L1 = L1.next();
        }
        else {
          answer.append(L2.value());
          L2 = L2.next();
        }
      }
      return answer;
    }

Here is a visualization for the merge operation.

.. inlineav:: mergesortCON1 ss
   :output: show

Here is a mergesort warmup exercise to practice merging.

.. avembed:: Exercises/Sorting/MergesortPRO.html ka

Now here is a full proficiency exercise to put it all together.

.. avembed:: AV/Sorting/mergesortProficiency.html pe

Analysis of Mergesort is straightforward, despite the fact that it is
a recursive algorithm.
The merging part takes time :math:`\Theta(i)` where :math:`i`
is the total length of the two sublists being merged.

.. _MergeSortFig:

.. figure:: Images/MrgSort.png
   :width: 250
   :alt: Mergesort
   :figwidth: 90%
   :align: center

   Mergesort example to illustrate analysis.

As we can see in Figure :num:`Figure #MergeSortFig`,
the list to be sorted is repeatedly split in half until sublists of
size 1 are reached.
These lists of size 1 are merged to be of size 2.
Lists of size 2 are then merged to become sublists of size 4,
and so on.
Thus, the depth of the recursion is :math:`\log n` for :math:`n`
records (assume for simplicity that :math:`n` is a power of two).
The first level of recursion can be thought of as working on one list
of size :math:`n`, the next level working on two lists of size
:math:`n/2`, the next on four lists of size :math:`n/4`, and so on.
The bottom of the recursion has :math:`n` lists of size 1.
Thus, :math:`n` lists of size 1 are merged (requiring
:math:`\Theta(n)` total steps), :math:`n/2` lists of size 2
(again requiring :math:`\Theta(n)` total steps), :math:`n/4` lists of
size 4, and so on.
At each of the :math:`\log n` levels of recursion, :math:`\Theta(n)`
work is done, for a total cost of :math:`\Theta(n \log n)`.
This cost is unaffected by the relative order of the
values being sorted, thus this analysis holds for the best, average,
and worst cases.

.. odsascript:: AV/Sorting/mergesortCON.js
