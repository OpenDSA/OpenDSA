.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :topic: Advanced Algorithm Analysis

Amortized Analysis
==================

This module presents the concept of :term:`amortized analysis`,
which is the analysis for a series of operations taken as a whole.
In particular, amortized analysis allows us to deal with the
situation where the worst-case cost for :math:`n` operations is less
than :math:`n` times the worst-case cost of any one operation.
Rather than focusing on the individual cost of each operation
independently and summing them, amortized analysis looks at the
cost of the entire series and "charges" each individual operation
with a share of the total cost.

We can apply the technique of amortized analysis in the case of
a series of sequential searches in an unsorted array.
For :math:`n` random searches, the average-case cost for each search
is :math:`n/2`, and so the *expected* total cost for the series is
:math:`n^2/2`.
Unfortunately, in the worst case all of the searches would
be to the last item in the array.
In this case, each search costs :math:`n` for a total worst-case cost
of :math:`n^2`.
Compare this to the cost for a series of :math:`n` searches such that
each item in the array is searched for precisely once.
In this situation, some of the searches *must* be expensive, but
also some searches *must* be cheap.
The total number of searches, in the best, average, and worst case,
for this problem must be
:math:`\sum_{i=i}^n i \approx n^2/2`.
This is a factor of two better than the more pessimistic analysis that
charges each operation in the series with its worst-case cost.

As another example of amortized analysis, consider the process of
incrementing a binary counter.
The algorithm is to move from the lower-order (rightmost) bit toward
the high-order (leftmost) bit, changing 1s to 0s until the first 0
is encountered.
This 0 is changed to a 1, and the increment operation is done.
Below is an implementation for the increment operation,
assuming that a binary number of length :math:`n` is stored in array
`A` of length :math:`n`.

.. codeinclude:: Analysis/Increment

If we count from 0 through :math:`2^n - 1`, (requiring a counter with
at least "math:`n` bits), what is the average cost for an increment
operation in terms of the number of bits processed?
Naive worst-case analysis says that if all :math:`n` bits are 1
(except for the high-order bit), then :math:`n` bits need to be
processed.
Thus, if there are :math:`2^n` increments, then the cost is
:math:`n 2^n`.
However, this is much too high, because it is rare for so many bits to
be processed.
In fact, half of the time the low-order bit is 0, and so only that
bit is processed.
One quarter of the time, the low-order two bits are 01, and so
only the low-order two bits are processed.
Another way to view this is that the low-order bit is always flipped,
the bit to its left is flipped half the time,
the next bit one quarter of the time, and so on.
We can capture this with the summation (charging costs to bits going
from right to left)

.. math::

   \sum_{i=0}^{n-1} \frac{1}{2^i} < 2.

In other words, the average number of bits flipped on each
increment is 2, leading to a total cost of only :math:`2 \cdot 2^n`
for a series of :math:`2^n` increments.

A useful concept for amortized analysis is illustrated by a simple
variation on the stack data structure, where the `pop` function
is slightly modified to take a second parameter :math:`k` indicating
that :math:`k` pop operations are to be performed.

The "local" worst-case analysis for `multipop` is :math:`\Theta(n)`
for :math:`n` elements in the stack.
Thus, if there are :math:`m_1` calls to `push` and :math:`m_2` calls
to `multipop`, then the naive worst-case cost for the series of
operation is :math:`m_1 + m_2\cdot n = m_1 + m_2 \cdot m_1`.
This analysis is unreasonably pessimistic.
Clearly it is not really possible to pop :math:`m_1` elements each
time `multipop` is called.
Analysis that focuses on single operations cannot deal with this
global limit, and so we turn to amortized analysis to model the
entire series of operations.

The key to an amortized analysis of this problem lies in the concept
of :term:`potential`.
At any given time, a certain number of items may be on the stack.
The cost for `multipop` can be no more than this number of items.
Each call to `push` places another item on the stack, which can
be removed by only a single `multipop` operation.
Thus, each call to `push` raises the potential of the stack by
one item.
The sum of costs for all calls to `multipop` can never be more
than the total potential of the stack (aside from a constant time cost
associated with each call to `multipop` itself).

The amortized cost for any series of `push` and `multipop`
operations is the sum of three costs.
First, each of the `push` operations takes constant time.
Second, each `multipop` operation takes a constant time in
overhead, regardless of the number of items popped on that call.
Finally, we count the sum of the potentials expended by all
`multipop` operations, which is at most :math:`m_1`, the number of
`push` operations.
This total cost can therefore be expressed as

.. math::

   m_1 + (m_2 + m_1) = \Theta(m_1 + m_2).


A similar argument was used in our analysis for the partition function
in the :ref:`Quicksort <Quicksort> <Quicksort>` algorithm.
While on any given pass through the while loop the left or right
pointers might move all the way through the remainder of the
partition, doing so would reduce the number of times that the while
loop can be further executed.

Our final example uses amortized analysis to prove a relationship
between the cost of the
:ref:`move-to-front <move-to-front> <SelfOrg>` self-organizing list
heuristic and the cost for the optimal static ordering of the list.

Recall that, for a series of search operations, the minimum cost for a
static list results when the list is sorted by
frequency of access to its records.
This is the optimal ordering for the records if we never allow the
positions of records to change, because the most-frequently accessed
record is first (and thus has least cost), followed by the next most
frequently accessed record, and so on.

.. _MTFThm:

.. topic:: Theorem

   **Theorem:**
   The total number of comparisons required by any series
   :math:`S` of :math:`n` or more searches on a self-organizing list
   of length :math:`n` using the  move-to-front heuristic is never
   more than twice the total number of comparisons required when
   series :math:`S` is applied to the list stored in its optimal
   static order. 

   **Proof:**
   Each comparison of the search key with a record in the list is
   either successful or unsuccessful.
   For :math:`m` searches, there must be exactly :math:`m` successful
   comparisons for both the self-organizing list and the static list.
   The total number of unsuccessful comparisons in the self-organizing
   list is the sum, over all pairs of distinct keys, of the number of
   unsuccessful comparisons made between that pair.

   Consider a particular pair of keys: :math:`A` and :math:`B`.
   For any sequence of searches :math:`S`, the total number of
   (unsuccessful) comparisons between :math:`A` and :math:`B` is
   identical to the number of comparisons between :math:`A` and
   :math:`B` required for the subsequence of :math:`S` made up only of
   searches for :math:`A` or :math:`B`.
   Call this subsequence :math:`S_{AB}`.
   In other words, including searches for other keys does not
   affect the relative position of :math:`A` and :math:`B` and so does
   not affect the relative contribution to the total cost of the
   unsuccessful comparisons between :math:`A` and :math:`B`.

   The number of unsuccessful comparisons between :math:`A` and
   :math:`B` made by the move-to-front heuristic on subsequence
   :math:`S_{AB}` is at most twice the number of unsuccessful
   comparisons between :math:`A` and :math:`B` required 
   when :math:`S_{AB}` is applied to the optimal static
   ordering for the list.
   To see this, assume that :math:`S_{AB}` contains
   :math:`i` :math:`A` s and :math:`j` :math:`B` s,
   with :math:`i \leq j`.
   Under the optimal static ordering, :math:`i` unsuccessful
   comparisons are required because :math:`B` must appear before
   :math`A` in the list (because its access frequency is higher).
   Move-to-front will yield an unsuccessful comparison whenever the
   request sequence changes from :math:`A` to :math:`B` or from
   :math:`B` to :math:`A`.
   The total number of such changes possible is :math:`2i` because
   each change involves an :math:`A` and each :math:`A` can be part of
   at most two changes.

   Because the total number of unsuccessful comparisons required by
   move-to-front for any given pair of keys is at most twice that
   required by the optimal static ordering, the total number of
   unsuccessful comparisons required by move-to-front for all pairs of
   keys is also at most twice as high.
   Because the number of successful comparisons is the same for both
   methods, the total number of comparisons required by move-to-front is
   less than twice the number of comparisons required by the optimal
   static ordering.
