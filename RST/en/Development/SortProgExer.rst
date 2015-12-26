.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Sally Hamouda and Cliff Shaffer
   :requires: Sorting; InsertionSort; BubbleSort; SelectionSort; MergeSort
   :topic: Sorting

Sorting Chapter Programming Exercises [SB]
==========================================

.. todo::
   :type: Coding Exercise

   Rewrite the Insertion Sort algorithm to sort the records in
   descending order.

.. todo::
   :type: Coding Exercise

   Revise Insertion Sort to use the shift approach described in
   Module :numref:`<SortOpt>`.
   Compare the time required by this implementation to the original
   version.

.. todo::
   :type: Coding Exercise

   Write an Insertion Sort implementation for integer key values.
   However, here's the catch:
   The input is a stack (**not** an array), and the only variables
   that your algorithm may use are a fixed number of integers and a
   fixed number of stacks.
   The algorithm should return a stack containing the records in
   sorted order (with the least value being at the top of the stack).
   Your algorithm should be :math:`Thetantwo` in the worst case.

.. todo::
   :type: Coding Exercise

   Our implementation for the Selection Sort algorithm does not check
   to see if the :math:`i` th record is already in the :math:`i` th
   position; that is, it might perform unnecessary swaps.
   Modify the implementation so that it does not make unnecessary
   swaps.
   What is your prediction regarding whether this modification
   actually improves the running time?
   Compare the actual running times of the original Selection Sort and
   the modified implementation. Which one is actually faster in the
   average case?

.. todo::
   :type: Coding Exercise

   During each pass of Bubble Sort, the largest element is moved
   to the rightmost position of the array. Modify the Bubble Sort
   implementation so that in each pass, the smallest element is
   moved to the leftmost position of the array. At the end, the array
   should still be sorted in ascending order.

.. todo::
   :type: Coding Exercise

   The Selection Sort algorithm selects from the smallest value
   (putting it in the leftmost position) to the largest. Modify the
   implementation so that it begins by putting the largest value in
   the rightmost position, and works down to the smallest.

.. todo::
   :type: Coding Exercise

   Write a version of Mergesort that takes as input a linked list, and
   outputs a linked list with the values in sorted order. Your
   algorithm should not allocate additional linked lists or link
   nodes.

.. todo::
   :type: Coding Exercise

   Modify Quicksort to find the smallest :math:`k`
   values in an array of records.
   Your output should be the array modified so that the :math:`k`
   smallest values are sorted in the first :math:`k` positions of the
   array.
   Your algorithm should do the minimum amount of work necessary, that
   is, no more of the array than necessary should be sorted.
