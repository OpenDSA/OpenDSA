.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires:
   :satisfies:
   :topic: Sorting


Optimal Sorting
===============

What if we would like to find the sorting algorithm
with the absolute fewest possible comparisons?
It might well be that the result will not be practical for a
general-purpose use.
But consider this analogy to sports tournaments.
In sports, a "comparison" between two teams or individuals means
doing a competition between the two.
This is fairly expensive (at least compared to some minor book keeping
in a computer), and it might be worth trading a fair amount
of book keeping to cut down on the number of games that need to be
played.
What if we want to figure out how to hold a tournament that will give
us the exact ordering for all teams in the fewest number of total
games?
Of course, we are assuming that the results of each game will be
"accurate" in that we assume not only that the outcome of A
playing B would always be the same (at least over the time
period of the tournament), but that transitivity in
the results also holds.
In practice these are unrealistic assumptions, but such assumptions
are implicitly part of many tournament organizations.
Like most tournament organizers, we can simply accept these
assumptions and come up with an algorithm for playing the games that
gives us some rank ordering based on the results we obtain.

Recall Insertion Sort, where we put
element :math:`i` into a sorted sublist of the first :math:`i-1`
elements.
What if we modify the standard Insertion Sort algorithm to use binary
search to locate where the :math:`i` th element goes in the sorted
sublist?
This algorithm is called :term:`binary insert sort`.
As a general-purpose sorting algorithm, this is not practical because
we then have to (on average) move about :math:`i/2` elements to make
room for the newly inserted element in the sorted sublist.
But if we count *only* comparisons, binary insert sort is pretty
good.
And we can use some ideas from binary insert sort to get closer to an
algorithm that uses the absolute minimum number of comparisons needed
to sort.

Consider what happens when we run binary insert sort on five elements.
How many comparisons do we need to do?
We can insert the second element with one comparison, the third with
two comparisons,
and the fourth with 2 comparisons.
When we insert the fifth element into the sorted list of four
elements, we need to do three comparisons in the worst case.
Notice exactly what happens when we attempt to do this insertion.
We compare the fifth element against the second.
If the fifth is bigger, we have to compare it against the third, and
if it is bigger we have to compare it against the fourth.
In general, when is binary search most efficient?
When we have :math:`2^i - 1` elements in the list.
It is least efficient when we have :math:`2^i` elements in the list.
So, we can do a bit better if we arrange our insertions to avoid
inserting an element into a list of size :math:`2^i` if possible.

Figure :num:`Figure #BinInsert` illustrates a different organization
for the comparisons that we might do.
First we compare the first and second element, and the third and
fourth elements.
The two winners are then compared, yielding a binomial tree.
We can view this as a (sorted) chain of three elements, with element
:math:`A` hanging off from the root.
If we then insert element :math:`B` into the sorted chain of three
elements, we will end up with one of the two posets shown on the right
side of Figure :num:`Figure #BinInsert`, at a cost of 2 comparisons.
We can then merge :math:`A` into the chain, for a cost of two
comparisons (because we already know that it is smaller then either one
or two elements, we are actually merging it into a list of two or
three elements).
Thus, the total number of comparisons needed to sort the five elements
is at most seven instead of eight.

.. _BinInsert:

.. odsafig:: Images/BinInsert.png
   :width: 300
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Organizing comparisons for sorting five elements

   Organizing comparisons for sorting five elements.
   First we order two pairs of elements, and then compare the two
   winners to form a binomial tree of four elements.
   The original loser to the root is labeled :math:`A`, and the
   remaining three elements form a sorted chain.
   We then insert element :math:`B` into the sorted chain.
   Finally, we put :math:`A` into the resulting chain
   to yield a final sorted list.

If we have ten elements to sort, we can first make five pairs of
elements (using five compares) and then sort the five winners
using the algorithm just described (using seven more compares).
Now all we need to do is to deal with the original losers.
We can generalize this process for any number of elements as:

* Pair up all the nodes with :math:`\lfloor \frac{n}{2} \rfloor`
  comparisons.
* Recursively sort the winners.
* Fold in the losers.

We use binary insert to place the losers.
However, we are free to choose the best ordering for inserting,
keeping in mind the fact that binary search has the same cost for
:math:`2^i` through :math:`2^{i+1} -1` items.
For example, binary search requires three comparisons in the worst
case for lists of size 4, 5, 6, or 7.
So we pick the order of inserts to optimize the binary searches, which
means picking an order that avoids growing a sublist size such that it
crosses the boundary on list size to require an additional comparison.
This sort is called :term:`merge insert sort`, and also known as the
:term:`Ford and Johnson sort`.

For ten elements, given the poset shown in
Figure :num:`Figure #BinMerge10` we 
fold in the last four elements (labeled 1 to 4) in the order Element 3,
Element 4, Element 1, and finally Element 2.
Element 3 will be inserted into a list of size three, costing two
comparisons.
Depending on where Element 3 then ends up in the list, Element 4 will
now be inserted into a list of size 2 or 3, costing two comparisons in
either case.
Depending on where Elements 3 and 4 are in the list, Element 1 will
now be inserted into a list of size 5, 6, or 7, all of which requires
three comparisons to place in sort order.
Finally, Element 2 will be inserted into a list of size 5, 6, or 7.

.. _BinMerge10:

.. odsafig:: Images/BinMerge10.png
   :width: 50
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Merge insert sort for ten elements

   Merge insert sort for ten elements.
   First five pairs of elements are compared.
   The five winners are then sorted.
   This leaves the elements labeled 1-4 to be sorted into the chain made
   by the remaining six elements.

Merge insert sort is pretty good, but is it optimal?
We know from the
:ref:`sorting lower bound proof <sorting lower bound> <SortingLowerBound>`
that no sorting algorithm can be faster than :math:`\Omega(n \log n)`.
To be precise, the :term:`information theoretic lower bound` for
sorting can be proved to be :math:`\lceil \log n!\rceil`.
That is, we can prove a lower bound of exactly 
:math:`\lceil \log n!\rceil` comparisons.
Merge insert sort gives us a number of comparisons equal to this
information theoretic lower bound for all values up to
:math:`n = 12`. 
At :math:`n = 12`, merge insert sort requires 30 comparisons while the
information theoretic lower bound is only 29 comparisons.
However, for such a small number of elements, it is possible to do an
exhaustive study of every possible arrangement of comparisons.
It turns out that there is in fact no possible arrangement of
comparisons that makes the lower bound less than 30 comparisons when
:math:`n=12`.
Thus, the information theoretic lower bound is an underestimate in this
case, because 30 really is the best that can be done.

Call the optimal worst cost for :math:`n` elements :math:`S(n)`.
We know that :math:`S(n+1) \leq S(n) + \lceil \log (n+1)\rceil`
because we could sort :math:`n` elements and use binary insert for the
last one.
For all :math:`n` and :math:`m`,
:math:`S(n+m) \leq S(n) + S(m) + M(m, n)` where
:math:`M(m, n)` is the best time to merge two sorted lists.
For :math:`n = 47`, it turns out that we can do better by splitting the
list into pieces of size 5 and 42, and then merging.
Thus, merge sort is not quite optimal.
But it is extremely good, and nearly optimal for smallish numbers of
elements.
