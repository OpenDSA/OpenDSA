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

Quicksort-10
============

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

.. TODO::
   :type: Exercise

   Consider the Quicksort implementation for this module, where the
   pivot is selected as the middle value of the partition.
   Give a permutation for the values 0 through 7 that will cause
   Quicksort to have its worst-case behavior.

   There are a number of possible correct answers. To assess the
   answer, will need to run Quicksort over student's 
   partition, and verify that at each step it will generate new
   partitions of size 6, 5, 4, 3, 2, then 1.

Now for review questions.

.. avembed:: Exercises/Sorting/QuicksortSumm.html ka
