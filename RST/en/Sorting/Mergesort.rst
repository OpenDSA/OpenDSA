.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: comparison; sorting terminology
   :satisfies: mergesort
   :topic: Sorting

.. odsalink:: AV/Sorting/mergeCON.css

.. index:: ! Mergesort

.. odsalink:: AV/Development/MergeSortAnalysisCON.css

Mergesort Concepts
==================

Mergesort Concepts
------------------

A natural approach to problem solving is divide and conquer.
To use divide and conquer when sorting, we might consider breaking the
list to be sorted into pieces, process the pieces, and then put them
back together somehow.
A simple way to do this would be to split the list in half, sort
the halves, and then merge the sorted halves together.
This is the idea behind :term:`Mergesort`.

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
        else if (L1.value() <= L2.value()) {
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

.. inlineav:: mergesortCON ss
   :output: show

Here is a mergesort warmup exercise to practice merging.

.. avembed:: Exercises/Sorting/MergesortMergePRO.html ka


Mergsort Practice Exercise
--------------------------

Now here is a full proficiency exercise to put it all together.

.. avembed:: AV/Sorting/mergesortPRO.html pe

This visualization provides a running time analysis for Merge Sort.

.. inlineav:: MergeSortAnalysisCON ss
   :output: show

.. odsascript:: AV/Sorting/mergesortCON.js
.. odsascript:: AV/Development/MergeSortAnalysisCON.js
