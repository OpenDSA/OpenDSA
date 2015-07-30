.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: sorting terminology; sort code tuning; insertion sort
   :satisfies: quicksort
   :topic: Sorting

.. index:: ! Quicksort

Quicksort-01
============

While Mergesort uses the most obvious form of divide and conquer
(split the list in half then sort the halves), this is not the only way
that we can break down the sorting problem.
We saw that doing the merge step for Mergesort when using an array
implementation is not so easy.
So perhaps a different divide and conquer strategy might turn out to
be more efficient?

:term:`Quicksort` is aptly named because, when properly
implemented, it is the fastest known general-purpose in-memory sorting
algorithm in the average case.
It does not require the extra array needed by Mergesort, so it is
space efficient as well.
Quicksort is widely used, and is typically the algorithm implemented
in a library sort routine such as the UNIX ``qsort``
function.
Interestingly, Quicksort is hampered by exceedingly poor worst-case
performance, thus making it inappropriate for certain applications.

Before we get to Quicksort, consider for a moment the practicality
of using a Binary Search Tree for sorting.
You could insert all of the values to be sorted into the BST
one by one, then traverse the completed tree using an inorder traversal.
The output would form a sorted list.
This approach has a number of drawbacks, including the extra space
required by BST pointers and the amount of time required to insert
nodes into the tree.
However, this method introduces some interesting ideas.
First, the root of the BST (i.e., the first node inserted) splits the
list into two sublists:
The left subtree contains those values in the
list less than the root value while the right subtree contains those
values in the list greater than or equal to the root value.
Thus, the BST implicitly implements a "divide and conquer" approach
to sorting the left and right subtrees.
Quicksort implements this same concept in a much more efficient way.

.. index:: ! pivot

Quicksort first selects a value called the :term:`pivot`.
(This is conceptually like the root node's value in the BST.)
Assume that the input array contains :math:`k` records with key values
less than the pivot.
The records are then rearranged in such a way that the :math:`k`
values less than the pivot are placed in the first, or leftmost,
:math:`k` positions in the array, and the values greater than or equal
to the pivot are placed in the last, or rightmost, :math:`n-k`
positions.
This is called a :term:`partition` of the array.
The values placed in a given partition need not (and typically will
not) be sorted with respect to each other.
All that is required is that all values end up in the correct
partition.
The pivot value itself is placed in position :math:`k`.
Quicksort then proceeds to sort the resulting subarrays now on either
side of the pivot, one of size :math:`k` and the other of size
:math:`n-k-1`.
How are these values sorted?
Because Quicksort is such a good algorithm, using Quicksort on
the subarrays would be appropriate.

Unlike some of the sorts that we have seen earlier in this chapter,
Quicksort might not seem very "natural" in that it is not an
approach that a person is likely to use to sort real objects.
But it should not be too surprising that a really efficient sort for
huge numbers of abstract objects on a computer would be rather
different from our experiences with sorting a relatively few physical
objects.

Here is an implementation for Quicksort.
Parameters ``i`` and ``j`` define the left and right
indices, respectively, for the subarray being sorted.
The initial call to ``quicksort`` would be
``quicksort(array, 0, n-1)``. 

.. codeinclude:: Sorting/Quicksort
   :tag: Quicksort

Function ``partition`` will move records to the
appropriate partition and then return ``k``, the first
position in the right partition.
Note that the pivot value is initially placed at the end of the array
(position ``j``).
Thus, ``partition`` must not affect the value of array position ``j``.
After partitioning, the pivot value is placed in position ``k``,
which is its correct position in the final, sorted array.
By doing so, we guarantee that at least one value (the pivot) will not
be processed in the recursive calls to ``qsort``.
Even if a bad pivot is selected, yielding a completely empty
partition to one side of the pivot, the larger partition will contain
at most :math:`n-1` records.

Selecting a pivot can be done in many ways.
The simplest is to use the first key.
However, if the input is sorted or reverse sorted, this will produce a
poor partitioning with all values to one side of the pivot.
It is better to pick a value at random, thereby reducing the chance of
a bad input order affecting the sort.
Unfortunately, using a random number generator is relatively
expensive, and we can do nearly as well by selecting the middle
position in the array.
Here is a simple ``findpivot`` function.

.. codeinclude:: Sorting/Quicksort
   :tag: findpivot

Now you can have some practice.

.. avembed:: Exercises/Sorting/QuicksortPivotPRO.html ka
   