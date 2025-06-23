.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :title: State Space Lower Bounds Proofs
   :author: Cliff Shaffer
   :institution: Virginia Tech
   :requires:
   :satisfies:
   :topic: Lower Bounds
   :keyword: Lower Bound Proof; State Space Lower Bound
   :naturallanguage: en
   :programminglanguage: N/A
   :description: Introduces the concept of a state space for use in finding the lower bound for a problem. Uses the problem of finding the min and max values in an unsorted list together as an example.

State Space Lower Bounds Proofs
===============================

We now consider the problem of finding both the minimum and the
maximum from an (unsorted) list of values.
This might be useful if we want to know the range of a collection of
values to be plotted, for the purpose of drawing the plot's scales.
Of course we could find them independently in :math:`2n-2`
comparisons.
A slight modification is to find the maximum in :math:`n-1`
comparisons, remove it from the list, and then find the minimum in
:math:`n-2` further comparisons for a total of :math:`2n-3`
comparisons.
Can we do better than this?

Before continuing, think a moment about how this problem of finding
the minimum and the maximum compares to the problem of the last
section, that of finding the second biggest value
(and by implication, the maximum).
Which of these two problems do you think is harder?
It is probably not at all obvious to you that one problem is harder or
easier than the other.
There is intuition that argues for either case.
On the one hand intuition might argue that the process of finding the
maximum should tell you something about the second biggest value, more
than that process should tell you about the minimum value.
On the other hand, any given comparison tells you something about
which of two can be a candidate for maximum value, and which can be a
candidate for minimum value, thus making progress in both directions.

We will start by considering a simple divide-and-conquer approach to
finding the minimum and maximum.
Split the list into two parts and find the minimum and
maximum elements in each part.
Then compare the two minimums and maximums to each other with a
further two comparisons to get the final result.
The algorithm is as follows:

.. codeinclude:: Misc/MinMax

The cost of this algorithm can be modeled by the following recurrence.

.. math::

   \mathbf{T}(n) = \left\{\begin{array}{ll}
		0       & n = 1\\
		1       & n = 2\\
		{\bf T}(\lfloor n/2 \rfloor) + {\bf T}(\lceil n/2
		\rceil) + 2    & n > 2
               \end{array}
        \right.

This is a rather interesting recurrence,
in that we can think of it as having a range of closed form solutions.
First let's solve this for :math:`n = 2^k`.

Let's expand the recurrence a bit.

.. math::
   
   f(n) &=& 2 f(n/2) + 2\\
   &=& 2 [ 2 f(n/4) + 2 ] + 2\\
   &=& 4 f(n/4) + 4 + 2\\
   &=& 4 [2 f(n/8) + 2] + 4 + 2\\
   &=& 8 f(n/8) + 8 + 4 + 2\\
   &=& 2^i f(n/2^i) + \sum_{j=1}^i 2^j\\

We can continue to get the final closed form:

.. math::
   
   f(n) &=& 2^{k-1} f(n/2^{k-1}) + \sum_{j=1}^{k-1} 2^j\\
   &=& 2^{k-1} f(2) + \sum_{j=1}^{k-1} 2^j\\
   &=& 2^{k-1} + \sum_{j=1}^{k-1} 2^j\\
   &=& n/2 + 2^k - 2\\
   &=& 3n/2 - 2

But the input is not always a power of two, and this really does
matter.
One way to view the issue is that odd input size helps if the cost is
the floor of :math:`n/2`, but it hurts if the cost is the ceiling of
:math:`n/2`.
If you always do both, maybe it doesn't matter.
But in this case, we end up doing one or the other in practice,
which means that the cost can change.
Consider this:

.. math::

   \begin{array}{l|rrrrrrrrrr}
   n&2&3&4&5&6&7&8&9&10&11\\
   \hline
   f(n)&1&2&4&6&8&9&10&12&14&16\\
   3n/2-2&1&2.5&4&5.5&7&8.5&10&11.5&13&14.5\\
   \end{array}

The true cost for $f(n)$ ranges between :math:`3n/2 - 2`
(when :math:`n = 2^i` or :math:`n=2^1 \pm 1`)
and :math:`5n/3 - 2` (when :math:`n = 3 \times 2^i`).
We can infer from this behavior that how we divide the list affects
the performance of the algorithm.
For example, what if we have six items in the list?
If we break the list into two sublists of three elements, the cost
would be 8.
If we break the list into a sublist of size two and another of size
four, then the cost would only be 7.

With divide and conquer, the best algorithm is the one that minimizes
the work, not necessarily the one that balances the input sizes.
One lesson to learn from this example is that it can be important to
pay attention to what happens for small sizes of :math:`n`, because
any division of the list will eventually produce many small lists.

We can calculate the minimum for all possible divide-and-conquer
strategies for this problem with the following recurrence.

.. math::

   \mathbf{T}(n) = \left\{
   \begin{array}{ll}
   0&n=1\\
   1&n=2\\
   \min_{1\leq k\leq n-1} \{{\bf T}(k) + {\bf T}(n-k)\} + 2&n>2
   \end{array}\right.

That is, we want to find a way to break up the
list that will minimize the total work.
It might help us to investigate what happens for a few small cases.

.. math::

   \begin{array}{l|cccccccc}
   n&1&2&3&4&5&6&7&8\\
   \hline
   3&\underline{3}&\underline{3}\\
   4&5&\underline{4}&5\\
   5&7&\underline{6}&\underline{6}&7\\
   6&9&\underline{7}&8&\underline{7}&9\\
   7&11&\underline{9}&\underline{9}&\underline{9}&\underline{9}&11\\
   8&13&\underline{10}&11&\underline{10}&11&\underline{10}&&13\\
   9&15&\underline{12}&\underline{12}&\underline{12}&\underline{12}&\underline{12}&\underline{12}&15\\
   \end{array}


If we examine various ways of breaking up small lists, we will
eventually recognize that breaking the list into a sublist of size 2
and a sublist of size \(n-2\) will always produce results as good as
any other division.
This strategy yields the following recurrence.

.. math::

   \mathbf{T}(n) = \left\{
   \begin{array}{ll}
   0&n=1\\
   1&n=2\\
   {\bf T}(n-2) + 3&n>2
   \end{array}\right.

This recurrence (and the corresponding algorithm) yields
:math:`\mathbf{T}(n) = \lceil 3n/2 \rceil - 2` comparisons.
Is this optimal?
We now introduce yet another tool to our collection of lower bounds
proof techniques: The state space proof. 

We will model our algorithm by defining a :term:`state` that the
algorithm must be in at any given instant.
We can then define the start state, the end state, and the
transitions between states that any algorithm can support.
From this, we will reason about the minimum number of states that the
algorithm must go through to get from the start to the end, to reach
a state space lower bound.

At any given instant, we can track the following four categories of
elements based on their prior history of comparisons:

* Untested: Elements that have not been compared.
* Winners: Elements that have won at least one comparison, and never lost.
* Losers: Elements that have lost at least one comparison, and never won.
* Middle: Elements that have both won and lost at least once.

We define the current state to be a vector of four values,
:math:`(U, W, L, M)` for untested, winners, losers, and middles,
respectively.
For a set of :math:`n` elements, the initial state of the algorithm is
:math:`(n, 0, 0, 0)` and the end state is :math:`(0, 1, 1, n-2)`.
Thus, every run for any algorithm must go from
state :math:`(n, 0, 0, 0)` to state :math:`(0, 1, 1, n-2)`.
We also observe that once an element is identified to be a middle,
it can then be ignored because it can neither be the minimum nor the
maximum.

Given that there are four types of elements, there are 10 types of
comparison.
Comparing with an element in the middle state cannot be more efficient
than other comparisons, so we should ignore those.
This leaves six types of comparison of interest.
We can enumerate the effects of each comparison type as follows.
If we are in state :math:`(i, j, k, l)` and we have a comparison, then
the state changes are as follows.

.. math::

   \begin{array}{lllll}
   U:U&(i-2,&j+1,&k+1,&l)\\
   W:W&(i,&j-1,&k,&l+1)\\
   L:L&(i,&j,&k-1,&l+1)\\
   L:U&(i-1,&j+1,&k,&l)\\
   \quad or&(i-1,&j,&k,&l+1)\\
   W:U&(i-1,&j,&k+1,&l)\\
   \quad or&(i-1,&j,&k,&l+1)\\
   W:L&(i,&j,&k,&l)\\
   \quad or&(i,&j-1,&k-1,&l+2)
   \end{array}

Now, let us make use of the adversary concept and consider what an
adversary will do for the various comparisons.
The adversary will make sure that each comparison does the least
possible amount of work in taking the algorithm toward the goal
state.
For example, comparing a winner to a loser is of no value because the
worst case result is always to learn nothing new (the winner remains a
winner and the loser remains a loser).
And we might compare an untested against a winner or loser (we have to
if the number of competitors is odd), but the adversary will never
take the choice that adds to the number of middles.
Thus, only the following five transitions are of interest:

.. math::

   \begin{array}{lllll}
   U:U&(i-2,&j+1,&k+1,&l)\\
   L:U&(i-1,&j+1,&k,&l)\\
   W:U&(i-1,&j,&k+1,&l)\\
   \hline
   W:W&(i,&j-1,&k,&l+1)\\
   L:L&(i,&j,&k-1,&l+1)
   \end{array}

In the table we have separated the ones that increase the number of
middles from those that do not, since that is a critical part of the
total process.
Only the last two transition types increase the number of middles,
each by one at a time, so there must be :math:`n-2` of these
comparisons.
The number of untested elements  must go to 0, and the first
transition is the most efficient way to do this.
Thus, :math:`\lceil n/2 \rceil` of these are required.
Our conclusion is that the minimum possible number of transitions
(comparisons) is :math:`n + \lceil n/2 \rceil - 2`.
This gives us a simple, optimal algorithm:

* First, pair up all the inputs and compare them to generate winners
  and losers.
* Then compare winners to winners or losers to losers to generate
  :math:`n-2` middles.

Acknowledgement
---------------

This page borrows heavily from  presentation in Section 3.4 of
*Compared to What?* by Gregory J.E. Rawlins.
