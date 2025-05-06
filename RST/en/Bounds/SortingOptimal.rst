.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires:
   :satisfies:
   :topic: Sorting
   :keyword: Sorting; Optimal Sorting Algorithms


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
This algorithm is called :term:`binary insertion sort`.
As a general-purpose sorting algorithm, this is not practical because
we then have to (on average) move about :math:`i/2` elements to make
room for the newly inserted element in the sorted sublist.
But if we count *only* comparisons, binary insertion sort is pretty
good.
And we can use some ideas from binary insertion sort to get closer to an
algorithm that uses the absolute minimum number of comparisons needed
to sort.

Consider what happens when we run binary insertion sort on five elements.
How many comparisons do we need to do?
We can add the second element to the first with one comparison,
then add in the third with two comparisons.
Adding the fourth needs only two 2 comparisons, since we first compare
against the middle of three we already sorted, and then look at either
the first or third as appropriate.
But when we insert the fifth element into the sorted list of four
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

.. inlineav:: binaryinsertsortCON ss
   :long_name: Binary Insertion Sort Slideshow
   :links: AV/bounds/binaryinsertsortCON.css
   :scripts: AV/bounds/binaryinsertsortCON.js
   :output: show
   :keyword: Sorting; Optimal Sorting; Binary Insertion Sort

If we have ten elements to sort, we can first make five pairs of
elements (using five compares) and then sort the five winners
using the algorithm just described (using seven more compares).
Now all we need to do is to deal with the original losers.
We can generalize this process for any number of elements as:

* Pair up all the nodes with :math:`\lfloor \frac{n}{2} \rfloor`
  comparisons.
* Recursively sort the winners.
* Fold in the losers.

We use binary insertion to place the losers.
However, we are free to choose the best ordering for inserting,
keeping in mind the fact that binary search has the same cost for
:math:`2^i` through :math:`2^{i+1} -1` items.
For example, binary search requires three comparisons in the worst
case for lists of size 4, 5, 6, or 7.
So we pick the order of inserts to optimize the binary searches, which
means picking an order that avoids growing a sublist size such that it
crosses the :math:`2^{i+1}` boundary on list size to require an
additional comparison.
This sort is called :term:`merge insertion sort`, and also known as the
:term:`Ford and Johnson sort`.

.. inlineav:: mergeinsertsortCON ss
   :long_name: Merge Insertion Sort Slideshow
   :links: AV/bounds/mergeinsertsortCON.css
   :scripts: AV/bounds/mergeinsertsortCON.js
   :output: show
   :keyword: Sorting; Optimal Sorting; Merge Insertion Sort; Ford and
             Johnson Sort

Merge insertion sort is pretty good for minimizing the number of
comparisons, but is it optimal?
We know from the
:ref:`sorting lower bound proof <sorting lower bound> <SortingLowerBound>`
that no sorting algorithm can be faster than :math:`\Omega(n \log n)`.
To be precise, the :term:`information theoretic lower bound` for
sorting can be proved to be :math:`\lceil \log n!\rceil`.
That is, we can prove a lower bound of exactly 
:math:`\lceil \log n!\rceil` comparisons.
Merge insertion sort gives us a number of comparisons equal to this
information theoretic lower bound for all values up to
:math:`n = 12`. 
At :math:`n = 12`, merge insertion sort requires 30 comparisons while the
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
because we could sort :math:`n` elements and use binary insertion for the
last one.
For all :math:`n` and :math:`m`,
:math:`S(n+m) \leq S(n) + S(m) + M(m, n)` where
:math:`M(m, n)` is the best time to merge two sorted lists.
For :math:`n = 47`, it turns out that we can do better by splitting the
list into pieces of size 5 and 42, and then merging.
Thus, merge insertion sort is not quite optimal.
But it is extremely good, and nearly optimal for smallish numbers of
elements.
