.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Sally Hamouda
   :satisfies: recursive sorting
   :topic: Recursive Sorting

Recursive Sorting
=================

In looking for a recursive solution, you should first discover what characteristics of sorting make it a recursive problem. In order for any problem to be solved recursively it must satisfy:

1- There must be some way to break large problems down into simpler instances of the same problem.

2- Assuming that each of those subproblems can be solved by successive applications of the recursive procedure, there must be some way to generate a solution to  the original problem from the solution to each of these smaller parts.

3- We must be able to determine a set of simple cases which can be solved diectly, without any further decomposition.


.. Todo::
   Visulaization Let us consider  the simple case first, suppose that our problem is to sort array of size 
   N and consider the case where N=1. So for the sorting algorithm no work is required at all. Now, we will consider a more complicated task of a large array so will subdivide 
   the problem.  So we will divide the problem into sorting smaller subarrays. The array will be divided into two halves. Sort each of the subarrays using a recursive call    
   then find some way to reassemble the two subarrays into a fully sorted array. Show the pseudo code step by step then the java code.

.. Todo::
   Visulization of tracing a merge sort algorithm on an array.


The next exercises will ask you to implement variations of merge sort.

.. Todo::

   Programming Exercise
   In place merger sort

   Since merge sort uses a temporary array, the algorithm will require twice as much storage as an 
   algorithm which sorts the array "in place". Also, merge sort does have a realtively high constant of 
   proportionalitly and that leads to a relative poor performance on small lists. Implement a variation of 
   merge sort that  avoid the space complexity required by having a scratch array, you can use the merge 
   sort algorithm, but then move the data around within the original array.

.. Todo::
   Programming Exercise
   Tiled merge sort

   algorithm stops partitioning subarrays when subarrays of size S are reached, where S is the number of data items fitting into a CPU's cache. Each of these subarrays is    
   sorted    with an in-place sorting algorithm such as insertion sort, to discourage memory swaps, and normal merge sort is then completed in the standard recursive fashion. 
   This algorithm has demonstrated better performance on machines that benefit from cache optimization.


.. Todo::
    Programming Exercise
    Adaptive sort

    Adaptive sort might be viewed as a kind of variation on mergesort. You will recall that mergesort splits data in half at the middle, sorts each half (recursively) and then   
    merges the two sorted halves. Well, adaptive sort also splits the dataset in two, but then it tries to merge the two halves straight away, and only if the merge fails does 
    it sort each half (recursively), then it merges the two sorted halves just like mergesort. Adaptive sort does the same as mergesort, except that it more or less doubles the 
    number of merge operations by optimistically attempting to merge the two halves at the outset. Surely only a very fortuitous ordering of the data would allow such a merge to 
    succeed without some additional sorting. So each halving of the data would simply lead to two merge operations: the optimistic one that probably fails, followed by the one 
    needed to merge the two halves together after they have been sorted. Plain old mergesort just needs the last one.The key to adaptive sort is in the way it splits the data. 
    Instead of crudely splitting the dataset in half at the mid-point, adaptive sort treats every other datum as belonging to the same half-set; such that every even-indexed 
    item in the original dataset ends up in one half-set, and all the odd-indexed items go in the other half-set. This is called a modulo-2 split. 
