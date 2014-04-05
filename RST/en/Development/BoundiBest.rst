.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires:
   :satisfies:
   :topic: Lower Bounds

Finding the :math:`i` th Best Element
=====================================

We now tackle the problem of finding the :math:`i` th best element in
a list.
One solution is to sort the list and simply look
in the :math:`i` th position.
However, this process provides considerably more information than we
need to solve the problem.
The minimum amount of information that we actually need to know can be
visualized as shown in Figure :num:`Figure #MedPoset`.
That is, all we need to know is the :math:`i-1` items less than our
desired value, and the :math:`n-i` items greater.
We do not care about the relative order within the upper and lower
groups.
So can we find the required information faster than by first sorting?
Looking at the lower bound, can we tighten that beyond the
trivial lower bound of :math:`n` comparisons?
We will focus on the specific question of finding the median element
(i.e., the element with rank :math:`n/2`), because the resulting
algorithm can easily be modified to find the :math:`i` th largest
value for any :math:`i`. 

.. _ MedPoset:

.. odsafig:: Images/MedPoset.png
   :width: 150
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: The poset for finding the :math:`i` th element}

   The poset that represents the minimum information necessary to
   determine the :math:`i` th element in a list.
   We need to know which element has :math:`i-1` values less and
   :math:`n-i` values more, but we do not need to know the
   relationships among the elements with values less or greater than
   the :math:`i` th element.

Looking at the Quicksort algorithm might give us some insight into
solving the median problem.
Recall that Quicksort works by selecting a pivot value, partitioning
the array into those elements less than the pivot and those greater
than the pivot, and moving the pivot to its proper location in the
array.
If the pivot is in position :math:`i`, then we are done.
If not, we can solve the subproblem recursively by only considering
one of the sublists.
That is, if the pivot ends up in position :math:`k > i`, then we
simply solve by finding the :math:`i` th best element in the left
partition.
If the pivot is at position :math:`k < i`, then we wish to find the
:math:`i-k` th element in the right partition.

What is the worst case cost of this algorithm?
As with Quicksort, we get bad performance if the pivot is the first or
last element in the array.
This would lead to possibly :math:`O(n^2)` performance.
However, if the pivot were to always cut the array in half, then our
cost would be modeled by the recurrence
:math:`\mathbf{T}(n) = \mathbf{T}(n/2) + n = 2n` or :math:`O(n)`
cost.

Finding the average cost requires us to use a recurrence with full
history, similar to the one we used to model the cost of Quicksort.
If we do this, we will find that :math:`\mathbf{T}n` is in
:math:`O(n)` in the average case. 

Is it possible to modify our algorithm to get worst-case linear time?
To do this, we need to pick a pivot that is guaranteed to discard a
fixed fraction of the elements.
We cannot just choose a pivot at random, because doing so will not meet
this guarantee.
The ideal situation would be if we could pick the median value for the
pivot each time.
But that is essentially the same problem that we are trying to solve
to begin with.

Notice, however, that if we choose any constant :math:`c`,
and then if we pick the median from a sample of size :math:`n/c`,
then we can guarantee that we will discard at least :math:`n/2c`
elements.
Actually, we can do better than this by selecting small subsets of a
constant size (so we can find the median of each in constant time),
and then taking the median of these medians.
Figure :num:`Figure #Median` illustrates this idea.

.. _Median:

.. odsafig:: Images/Median.png
   :width: 300
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Finding a median value

   A method for finding a pivot for partitioning a list that
   guarantees at least a fixed fraction of the list will be in each
   partition.
   We divide the list into groups of five elements, and find the
   median for each group.
   We then recursively find the median of these :math:`n/5` medians.
   The median of five elements is guaranteed to have at least two in
   each partition.
   The median of three medians from a collection of 15 elements is
   guaranteed to have at least five elements in each partition.

This observation leads directly to the following algorithm.

* Choose the :math:`n/5` medians for groups of five elements from the
  list. Choosing the median of five items can be done in constant time.
* Recursively, select :math:`M`, the median of the :math:`n/5`
  medians-of-fives.
* Partition the list into those elements larger and smaller than
  :math:`M`.

While selecting the median in this way is guaranteed to eliminate a
fraction of the elements
(leaving at most :math:`\lceil (7n - 5)/10\rceil` elements left),
we still need to be sure that our recursion yields a linear-time
algorithm.
We model the algorithm by the following recurrence.

.. math::

   {\bf T}(n) \leq {\bf T}(\lceil n/5 \rceil) +
   {\bf T}(\lceil (7n - 5)/10\rceil) + 6\lceil n/5 \rceil + n - 1.

The :math:`\mathbf{T}(\lceil n/5 \rceil)` term comes from computing
the median of the medians-of-fives,
the :math:`6\lceil n/5 \rceil` term comes from the cost to calculate
the median-of-fives (exactly six comparisons for each group of five
element),
and the :math:`\mathbf{T}(\lceil (7n - 5)/10\rceil)` term comes from
the recursive call of the remaining (up to) 70% of the elements that
might be left.

We will prove that this recurrence is linear by assuming
that it is true for some constant :math:`r`, and then show
that :math:`\textbf{T}(n) \leq rn` for all :math:`n` greater than some
bound.

.. math::

   \begin{eqnarray*}
   \mathbf{T}(n) &\leq& {\bf T}(\lceil \frac{n}{5} \rceil) +
           \mathbf{T}(\lceil \frac{7n - 5}{10}\rceil) +
           6\lceil \frac{n}{5} \rceil + n - 1\\
   &\leq&r(\frac{n}{5} + 1) + r(\frac{7n-5}{10} + 1) + 6(\frac{n}{5} + 1) + n - 1\\
   &\leq&(\frac{r}{5} + \frac{7r}{10} + \frac{11}{5})n + \frac{3r}{2} + 5\\
   &\leq&\frac{9r + 22}{10}n + \frac{3r + 10}{2}.
   \end{eqnarray*}

This is true for :math:`r \geq 23` and :math:`n \geq 380`.
This provides a base case that allows us to use induction to prove
that :math:`\forall n \geq 380, \mathbf{T}(n) \leq 23n`.

In reality, this algorithm is not practical
because its constant factor costs are so high.
So much work is being done to guarantee linear time performance that
it is more efficient on average to rely on chance to select the pivot,
perhaps by picking it at random or picking the middle value out of the
current subarray.
