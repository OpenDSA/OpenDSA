.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: Quicksort
   :author: Cliff Shaffer
   :prerequisites: Sorting
   :topic: Sorting
   :short_name: Quicksort

.. _Quicksort:

.. include:: JSAVheader.rinc

.. index:: ! Quicksort

Quicksort
=========

While Mergesort uses the most obvious form of divide and conquer
(split the list in half then sort the halves), this is not the only way
that we can break down the sorting problem.
We saw that doing the merge step for Mergesort when using an array
implementation is not so easy.
So perhaps a different divide and conquer strategy might turn out to
be more efficient?

:dfn:`Quicksort` is aptly named because, when properly
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

Quicksort first selects a value called the :dfn:`pivot`.
(This is conceptually like the root node's value in the BST.)
Assume that the input array contains :math:`k` records with key values
less than the pivot.
The records are then rearranged in such a way that the :math:`k`
values less than the pivot are placed in the first, or leftmost,
:math:`k` positions in the array, and the values greater than or equal
to the pivot are placed in the last, or rightmost, :math:`n-k`
positions.
This is called a :dfn:`partition` of the array.
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
The initial call to Quicksort would be
``quicksort(array, 0, n-1)``.::

.. literalinclude:: ../../SourceCode/Processing/Sorting/Quicksort/Quicksort.pde
   :start-after: /* *** ODSATag: Quicksort *** */
   :end-before: /* *** ODSAendTag: Quicksort *** */

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
Here is a simple ``findpivot`` function.::

.. literalinclude:: ../../SourceCode/Processing/Sorting/Quicksort/Quicksort.pde
   :start-after: /* *** ODSATag: findpivot *** */
   :end-before: /* *** ODSAendTag: findpivot *** */

Now you can have some practice.

.. avembed:: Exercises/Development/QuickSortFindPivot.html
   :showbutton: hide
   :title: Quicksort Find Pivot Exercise

We now turn to function ``partition``.
If we knew in advance how many keys are less than the pivot,
``partition`` could simply copy records with key values less
than the pivot to the low end of the array, and records with larger
keys to the high end.
Because we do not know in advance how many keys are less than
the pivot,
we use a clever algorithm that moves indices inwards from the
ends of the subarray, swapping values as necessary until the two
indices meet.
Here is a Java implementation for the partition step.::

.. literalinclude:: ../../SourceCode/Processing/Sorting/Quicksort/Quicksort.pde
   :start-after: /* *** ODSATag: partition *** */
   :end-before: /* *** ODSAendTag: partition *** */

Figure :num:`Figure #PartitionFig` illustrates ``partition``.
Initially, variables ``l`` and ``r`` are immediately
outside the actual bounds of the subarray being partitioned.
Each pass through the outer ``do`` loop moves the counters
``l`` and ``r`` inwards, until eventually they meet.
Note that at each iteration of the inner ``while`` loops, the
bounds are moved prior to checking against the pivot value.
This ensures that progress is made by each ``while`` loop,
even when the two values swapped on the last iteration of the
``do`` loop were equal to the pivot.
Also note the check that ``r > l`` in the second
``while`` loop.
This ensures that ``r`` does not run off the low end of the
partition in the case where the pivot is the least value in that
partition.
Function ``partition`` returns the first index of the right
partition so that the subarray bound for the recursive calls to
``qsort`` can be determined.
Figure :num:`Figure #QuickSortPic` illustrates the complete Quicksort
algorithm.

.. _PartitionFig:

.. figure:: Images/Partit.png
   :width: 400
   :align: center
   :figwidth: 90%
   :alt: The Quicksort partition step

   The Quicksort partition step.
   The first row shows the initial positions for a collection of ten
   key values.
   The pivot value is 60, which has been swapped to the end of the
   array.
   The ``do`` loop makes three iterations, each time moving
   counters ``l`` and ``r`` inwards until they meet in
   the third pass.
   In the end, the left partition contains four values and the right
   partition contains six values.
   Function ``qsort`` will place the pivot value into
   position 4.

.. _QuickSortPic:

.. figure:: Images/Qsort.png
   :width: 400
   :align: center
   :figwidth: 90%
   :alt: An illustration of Quicksort

   An illustration of the Quicksort array decomposition.

Here is a visualization for the entire Quicksort algorithm.

.. avembed:: AV/Development/quicksort-av.html

Now for some partition practice.

.. avembed:: Exercises/Development/QuickSortPartitionElement.html
   :showbutton: hide
   :title: Quicksort Partition Exercise

Here is a complete proficiency exercise to see how well you understand
Quicksort.

.. avembed:: AV/Development/quicksort-proficiency.html

To analyze Quicksort, we first analyze the ``findpivot`` and
``partition`` functions when operating on a subarray of length
:math:`k`.
Clearly, ``findpivot`` takes constant time.
Function ``partition`` contains a ``do`` loop with
two nested ``while`` loops.
The total cost of the partition operation is constrained by
how far ``l`` and ``r`` can move inwards.
In particular, these two bounds variables together can move a total of
:math:`s` steps for a subarray of length :math:`s`.
However, this does not directly tell us how much work is done by the
nested ``while`` loops.
The ``do`` loop as a whole is guaranteed to move both
``l`` and ``r`` inward at least one position on each
first pass.
Each ``while`` loop moves its variable at least once (except
in the special case where ``r`` is at the left edge of the
array, but this can happen only once).
Thus, we see that the ``do`` loop can be executed at most
:math:`s` times, the total amount of work done moving ``l`` and
``r`` is :math:`s`, and
each ``while`` loop can fail its test at most :math:`s` times.
The total work for the entire ``partition`` function is
therefore :math:`\Theta(s)` when the subarray length is :math:`s`.

Knowing the cost of ``findpivot`` and ``partition``,
we can determine the cost of Quicksort.
We begin with a worst-case analysis.
The worst case will occur when the pivot does a poor job of breaking
the array, that is, when there are no records in one partition, and
:math:`n-1` records in the other.
In this case, the divide and conquer
strategy has done a poor job of
dividing, so the conquer phase will work on a subproblem only one
less than the size of the original problem.
If this happens at each partition step, then the total cost of the
algorithm will be

.. math::

   \sum_{k=1}^n k = \Theta(n^2).

So in the worst case, Quicksort is :math:`\Theta(n^2)`.
This is terrible, no better than Bubble Sort.
When will this worst case occur?
Only when each pivot yields a bad partitioning of the array.
If the pivot values are selected at random, then this is extremely
unlikely to happen.
When selecting the middle position of the current subarray, it is
still unlikely to happen.
It does not take many good partitionings for Quicksort to
work fairly well.

Quicksort's best case occurs when ``findpivot`` always breaks
the array into two equal halves.
Quicksort repeatedly splits the array into
smaller partitions, as shown in Figure :num:`Figure #QuickSortPic`.
In the best case, the result will be :math:`\log n` levels of
partitions,
with the top level having one array of size :math:`n`, the second
level two arrays of size :math:`n/2`, the next with four arrays of
size :math:`n/4`,  and so on.
Thus, at each level, all partition steps for that level do a total of
:math:`n` work, for an overall cost of :math:`n \log n` work when
Quicksort finds perfect pivots.

Quicksort's average-case behavior falls somewhere
between the extremes of worst and best case.
Average-case analysis considers the cost for all possible arrangements
of input, summing the costs and dividing by the number of cases.
We make one reasonable simplifying assumption:
At each partition step, the pivot is
equally likely to end in any position in the (sorted) array.
In other words, the pivot is equally likely to break an array into
partitions of sizes 0 and :math:`n-1`, or 1 and :math:`n-2`, and so
on.

Given this assumption, the average-case cost is computed from the
following equation:

.. math::

   {\bf T}(n) = cn + \frac{1}{n}\sum_{k=0}^{n-1}[{\bf T}(k) +
   {\bf T}(n - 1 - k)],
   \quad {\bf T}(0) = {\bf T}(1) = c.

This equation is in the form of a recurrence relation.
Recurrence relations are discussed in Module :numref:`<Recurrence>`.
This equation says that there is one chance in :math:`n` that the
pivot breaks the array into subarrays of size 0 and :math:`n-1`,
one chance in :math:`n` that the pivot breaks the array into
subarrays of size 1 and :math:`n-2`, and so on.
The expression ":math:`{\bf T}(k) + {\bf T}(n - 1 - k)`" is the cost
for the two recursive calls to Quicksort on two arrays of size
:math:`k` and :math:`n-1-k`.
The initial :math:`cn` term is the cost of doing the
``findpivot`` and ``partition`` steps, for some
constant :math:`c`.
The closed-form solution to this recurrence relation is
:math:`\Theta(n \log n)`.
Thus, Quicksort has average-case cost :math:`\Theta(n \log n)`.

This is an unusual situation that the average case cost and the worst
case cost have asymptotically different growth rates.
Consider what "average case" actually means.
We compute an average cost for inputs of size :math:`n` by summing up
for every possible input of size :math:`n` the product of the running
time cost of that input times the probability that that input will
occur.
To simplify things, we assumed that every permutation is equally
likely to occur.
Thus, finding the average means summing up the cost for every
permutation and dividing by the number of permuations
(which is :math:`n!`).
We know that some of these :math:`n!` inputs cost :math:`O(n^2)`.
But the sum of all the permutation costs has to be
:math:`(n!)(O(n \log n))`. 
Given the extremely high cost of the worst inputs, there must be
very few of them.
In fact, there cannot be a constant fraction of the inputs with cost
:math:`O(n^2)`.
If even, say, 1% of the inputs have cost :math:`O(n^2)`, this would
lead to an average cost of :math:`O(n^2)`.
Thus, as :math:`n` grows, the fraction of inputs with high cost must
be going toward a limit of zero.
We can conclude that Quicksort will run fast if
we can avoid those very few bad input permutations.
This is why picking a good pivot is so important.

The running time for Quicksort can be improved (by a constant factor),
and much study has gone into optimizing this algorithm.
Since Quicksort's worst case behavior arises when the pivot does a
poor job of splitting the array into equal size subarrays,
improving ``findpivot`` seems like a good place to start.
If we are willing to do more work searching for a better pivot, the
effects of a bad pivot can be decreased or even eliminated.
Hopefully this will save more time than was added by the additional
work needed to find the pivot.
One widely-used choice is to use the "median of three" algorithm,
which uses as a pivot the middle of three randomly selected values.
Using a random number generator to choose the positions is relatively
expensive, so a common compromise is to look at the first, middle, and
last positions of the current subarray.
However, our simple ``findpivot`` function that takes the
middle value as its pivot has the virtue of making it highly unlikely
to get a bad input by chance, and it is quite cheap to implement.
This is in sharp contrast to selecting the first or last record as
the pivot, which would yield bad performance for many permutations
that are nearly sorted or nearly reverse sorted.

A significant improvement can be gained by recognizing that
Quicksort is relatively slow when :math:`n` is small.
This might not seem to be relevant if most of the time we sort
large arrays, nor should it matter how long Quicksort takes in the
rare instance when a small array is sorted because it will be fast
anyway.
But you should notice that Quicksort itself sorts many, many small
arrays!
This happens as a natural by-product of the divide and conquer
approach.

A simple improvement might then be to replace Quicksort with a faster
sort for small numbers, say Insertion Sort or Selection Sort.
However, there is an even better---and still simpler---optimization.
When Quicksort partitions are below a certain size, do nothing!
The values within that partition will be out of order.
However, we do know that all values in the array to the left of the
partition are smaller than all values in the partition.
All values in the array to the right of the partition are greater than
all values in the partition.
Thus, even if Quicksort only gets the values to
"nearly" the right locations, the array will be close to sorted.
This is an ideal situation in which to take advantage of the best-case
performance of Insertion Sort.
The final step is a single call to Insertion Sort to process the
entire array, putting the records into final sorted order.
Empirical testing shows that the subarrays should be left unordered
whenever they get down to nine or fewer records.

The last speedup to be considered reduces the cost of making
recursive calls.
Quicksort is inherently recursive, because each Quicksort operation
must sort two sublists.
Thus, there is no simple way to turn Quicksort into an iterative
algorithm.
However, Quicksort can be implemented using a stack
to imitate recursion, as the amount of information that must
be stored is small.
We need not store copies of a subarray, only the subarray bounds.
Furthermore, the stack depth can be kept small if care is taken on
the order in which Quicksort's recursive calls are executed.
We can also place the code for ``findpivot`` and
``partition`` inline to eliminate the remaining function
calls.
Note however that by not processing sublists of size nine or
less as suggested above, about three quarters of the function calls
will already have been eliminated.
Thus, eliminating the remaining function calls will yield only a
modest speedup.

Now for review questions.

.. avembed:: Exercises/Development/QuickSortSumm.html
   :showbutton: hide
   :title: Quicksort Review Questions
