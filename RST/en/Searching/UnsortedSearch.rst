.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires:
   :satisfies:
   :topic: Search

Analyzing Search in Unsorted Lists
==================================


Analysis
--------

You already know the simplest form of search:
the sequential search algorithm.
Sequential search on an unsorted list requires :math:`\Theta(n)` time
in the worst case.

How many comparisons does linear search do on average?
A major consideration is whether :math:`K` is in list **L** at
all.
We can simplify our analysis by ignoring everything about the input
except the position of :math:`K` if it is found in **L**.
Thus, we have :math:`n+1` distinct possible events:
That :math:`K` is in one of positions 0 to :math:`n-1` in **L**
(each position having its own probability), or that it is not in
:math:`L` at all.
We can express the probability that :math:`K` is not in **L** as

.. math::

  \mathbf{P}(K \notin \mathbf{L}) =
  1 - \sum_{i=1}^n \mathbf{P}(K = \mathbf{L}[i])

where :math:`\mathbf{P}(x)` is the probability of event
:math:`x`.

Let :math:`p_i` be the probability that :math:`K` is in position
:math:`i` of **L** (indexed from 0 to :math:`n-1`.
For any position :math:`i` in the list, we must look at :math:`i+1`
records to reach it.
So we say that the cost when :math:`K` is in position :math:`i` is
:math:`i+1`.
When :math:`K` is not in **L**, sequential search will require
:math:`n` comparisons.
Let :math:`p_n` be the probability that :math:`K` is not in **L**.
Then the average cost :math:`\mathbf{T}(n)` will be

.. math::

   \mathbf{T}(n) = n p_n + \sum_{i=0}^{n-1} (i+1) p_i.

What happens to the equation if we assume all the :math:`p_i` 's
are equal (except :math:`p_n`)?

.. math::

   \mathbf{T}(n) &=& p_n n + \sum_{i=0}^{n-1} (i+1) p\\
   &=& p_n n + p\sum_{i=1}^n i\\
   &=& p_n n + p\frac{n(n+1)}{2}\\
   &=& p_n n + \frac{1 - p_n}{n}\frac{n(n+1)}{2}\\
   &=& \frac{n + 1 + p_n(n-1)}{2}

Depending on the value of :math:`p_n`,
:math:`\frac{n+1}{2} \leq \mathbf{T}(n) \leq n`.


Lower Bounds Proofs
-------------------

Given an (unsorted) list **L** of :math:`n` elements and 
a search key :math:`K`, we seek to identify one element in **L**
which has key value :math:`k`, if any exists. 
For the rest of this discussion, we will assume that the key values
for the elements in **L** are unique, that the set of all possible
keys is totally ordered (that is, the operations 
:math:`<`, :math:`=`, and :math:`>` are defined for all pairs of key
values),
and that comparison is our only way to find the relative ordering of
two keys.
Our goal is to solve the problem using the minimum number of
comparisons.

Given this definition for searching, we can easily come up with the
standard sequential search algorithm, and we can also see that the
lower bound for this problem is "obviously" :math:`n` comparisons.
(Keep in mind that the key :math:`K` might not actually appear in the
list.)
However, lower bounds proofs are a bit slippery, and it is instructive
to see how they can go wrong.

.. topic:: Theorem

   The lower bound for the problem of searching in an unsorted list is
   :math:`n` comparisons. 

Here is our first attempt at proving the theorem.

.. topic:: Proof 1

   We will try a proof by contradiction.
   Assume an algorithm :math:`A` exists that requires only :math:`n-1`
   (or less) comparisons of :math:`K` with elements of **L**.
   Because there are :math:`n` elements of **L**, :math:`A` must have
   avoided comparing :math:`K` with **L** [:math:`n`].
   We can feed the algorithm an input with :math:`K` in position
   :math:`n`. 
   Such an input is legal in our model, so the algorithm is
   incorrect.

Is this proof correct? Hopefully it is reasonably obvious to you that
not all algorithms must search through the list in a specific order,
so not all algorithms have to look at position **L** [:math:`n`] last.

OK, so we can try to dress up the proof by making the process a bit more
flexible.

.. topic:: Proof 2

   We will try a proof by contradiction.
   Assume an algorithm :math:`A` exists that requires only :math:`n-1`
   (or less) comparisons of :math:`K` with elements of **L**.
   Because there are :math:`n` elements of **L**, :math:`A` must have
   avoided comparing :math:`K` with **L** [:math:`i`] for some value
   :math:`i`.
   We can feed the algorithm an input with :math:`K` in position
   :math:`i`. 
   Such an input is legal in our model, so the algorithm is
   incorrect.

Is this proof correct? Still, no.
First of all, any given algorithm need not necessarily consistently 
skip any given position :math:`i` in its :math:`n-1` searches.
For example, it is not necessary that all algorithms search the list
from left to right.
It is not even necessary that all algorithms search the same
:math:`n-1` positions first each time through the list.
Perhaps it picks them at random.

Again, we can try to dress up the proof as follows.

.. topic:: Proof 3

   On any given run of the algorithm,
   if :math:`n-1` elements are compared against :math:`K`, then
   *some* element position (call it position :math:`i`) gets skipped.
   It is possible that :math:`K` is in position :math:`i` at that
   time, and will not be found.
   Therefore, :math:`n` comparisons are required.

Unfortunately, there is another error that needs to be fixed.
It is not true that all algorithms for solving the problem must work
by comparing elements of **L** against :math:`K`.
An algorithm might make useful progress by comparing elements of
**L** against each other.
For example, if we compare two elements of **L**, then compare the
greater against :math:`K` and find that this element is less than
:math:`K`, we know that the other element is also less than
:math:`K`.
It seems intuitively obvious that such comparisons won't actually lead
to a faster algorithm, but how do we know for sure?
We somehow need to generalize the proof to account for this approach.

We will now present a useful abstraction for expressing the state of
knowledge for the value relationships among a set of objects.
A :term:`total order` defines relationships within a
collection of objects such that for every pair of objects, one is
greater than the other.
A :term:`partially ordered set` or :term:`poset` is a set on which
only a partial order is defined.
That is, there can be pairs of elements for which we cannot decide
which is "greater".
For our purpose here, the partial order is the state of our current
knowledge about the objects,
such that zero or more of the order relations between pairs of
elements are known.
We can represent this knowledge by drawing directed acyclic graphs
(DAGs) showing the known relationships, as illustrated by
Figure :num:`Figure #Poset`.

.. _Poset:

.. odsafig:: Images/Poset.png
   :width: 200
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Illustration of using a poset

   Illustration of using a poset to model our current knowledge of the
   relationships among a collection of objects.
   A directed acyclic graph (DAG) is used to draw the poset
   (assume all edges are directed downward).
   In this example, our knowledge is such that we don't know how
   :math:`A` or :math:`B` relate to any of the other objects.
   However, we know that both :math:`C` and :math:`G` are greater than
   :math:`E` and :math:`F`.
   Further, we know that :math:`C` is greater than :math:`D`, and that
   :math:`E` is greater than :math:`F`

.. topic:: Proof 4

   Initially, we know nothing about the relative order of the
   elements in **L**, or their relationship to :math:`K`.
   So initially, we can view the :math:`n` elements in **L** as being
   in :math:`n` separate partial orders.
   Any comparison between two elements in **L** can affect the
   structure of the partial orders.

   Now, every comparison between elements in **L** can at best combine
   two of the partial orders together.
   Any comparison between :math:`K` and an element, say :math:`A`, in
   **L** can at best eliminate the partial order that contains
   :math:`A`.
   Thus, if we spend :math:`m` comparisons comparing elements in **L**
   we have at least :math:`n-m` partial orders.
   Every such partial order needs at least one comparison against
   :math:`K` to make sure that :math:`K` is not somewhere in that
   partial order.
   Thus, any algorithm must make at least :math:`n` comparisons in the
   worst case.

