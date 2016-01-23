.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires:
   :satisfies:
   :topic: Search

Search in Sorted Arrays
=======================

For large collections of records that are searched repeatedly,
sequential search is unacceptably slow.
One way to reduce search time is to preprocess the records by
sorting them.
Given a sorted array,
an obvious improvement over simple linear search is to test if the
current element in **L** is greater than :math:`K`.
If it is, then we know that :math:`K` cannot appear later in the
array, and we can quit the search early.
But this still does not improve the worst-case cost of the algorithm.

We can also observe that if we look first at position 1 in sorted
array **L** and find that `K` is bigger, then we rule out
position 0 as well as position 1.
Because more is often better, what if we look at position 2 in
**L** and find that :math:`K` is bigger yet?
This rules out positions 0, 1, and 2 with one comparison.
What if we carry this to the extreme and look first at the last
position in **L** and find that :math:`K` is bigger?
Then we know in one comparison that :math:`K` is not in **L**.
This is useful to know, but what is wrong with the conclusion
that we should always start by looking at the last position?
The problem is that, while we learn a lot sometimes (in one comparison
we might learn that :math:`K` is not in the list), usually we learn
only a little bit (that the last element is not :math:`K`).

The question then becomes: What is the right amount to jump?
This leads us to an algorithm known as :term:`Jump Search`.
For some value :math:`j`, we check every :math:`j` 'th element in
**L**, that is, we check elements :math:`\mathbf{L}[j]`,
:math:`\mathbf{L}[2j]`, and so on.
So long as :math:`K` is greater than the values we are checking, we
continue on.
But when we reach a value in **L** greater than :math:`K`, we do a
linear search on the piece of length :math:`j-1` that we know brackets
:math:`K` if it is in the list.

If we define :math:`m` such that :math:`mj \leq n < (m+1)j`,
then the total cost of this algorithm is at most :math:`m + j - 1`
3-way comparisons.
(They are 3-way because at each comparison of :math:`K` with some
:math:`\mathbf{L}[i]` we need to know if :math:`K` is less than,
equal to, or greater than :math:`\mathbf{L}[i]`.)
Therefore, the cost to run the algorithm on :math:`n` items with a
jump of size :math:`j` is

.. math::

   \mathbf{T}(n, j) = m + j - 1 =
   \left\lfloor \frac{n}{j} \right\rfloor + j - 1.

What is the best value that we can pick for :math:`j`?
We want to minimize the cost:

.. math::

   \min_{1 \leq j \leq n} \left\{\left\lfloor\frac{n}{j}\right\rfloor +
   j - 1\right\}

Take the derivative and solve for :math:`f'(j) = 0` to find the
minimum, which is :math:`j = \sqrt{n}`.
In this case, the worst case cost will be
roughly :math:`2\sqrt{n}`.

This example invokes a basic principle of algorithm design.
We want to balance the work done while selecting a sublist with the
work done while searching a sublist.
In general, it is a good strategy to make subproblems of equal effort.
This is an example of a
:term:`divide and conquer` algorithm.

What if we extend this idea to three levels?
We would first make jumps of some size :math:`j` to find a sublist of
size :math:`j-1` whose end values bracket value :math:`K`.
We would then work through this sublist by making jumps of some
smaller size, say :math:`j_1`.
Finally, once we find a bracketed sublist of size :math:`j_1 - 1`, we
would do sequential search to complete the process.

This probably sounds convoluted to do two levels of jumping to be
followed by a sequential search.
While it might make sense to do a two-level algorithm (that is, jump
search jumps to find a sublist and then does sequential search on the
sublist),
it almost never seems to make sense to do a three-level algorithm.
Instead, when we go beyond two levels, we nearly always generalize by
using recursion.
This leads us to the most commonly used search algorithm for sorted
arrays, the :ref:`binary search <binary search> <AnalProgram>`.

If we know nothing about the distribution of
key values, then binary search is the best
algorithm available for searching a sorted array.
However, sometimes we do know something about the expected
key distribution.
Consider the typical behavior of a person looking up a word in
a large dictionary.
Most people certainly do not use sequential search!
Typically, people use a modified form of binary search, at least until
they get close to the word that they are looking for.
The search generally does not start at the middle of the dictionary.
A person looking for a word starting with 'S'
generally assumes that entries beginning with 'S' start about three
quarters  of the way through the dictionary.
Thus, he or she will first open the dictionary about three quarters of
the way through and then make a decision based on what is found as to
where to look next.
In other words, people typically use some knowledge about the
expected distribution of key values to "compute" where to look next.
This form of "computed" binary search is called a
:term:`dictionary search` or :term:`interpolation search`.
In a dictionary search, we search **L** at a position :math:`p` that
is appropriate to the value of :math:`K` as follows.

.. math::

   p = \frac{K - \mathbf{L}[1]}{\mathbf{L}[n] - \mathbf{L}[1]}

This equation is computing the position of :math:`K` as a fraction of
the distance between the smallest and largest key values.
This will next be translated into that position which is the same
fraction of the way through the array,
and this position is checked first.
As with binary search, the value of the key found eliminates
all records either above or below that position.
The actual value of the key found can then be used to
compute a new position within the remaining range of the array.
The next check is made based on the new computation.
This proceeds until either the desired record is found, or the array
is narrowed until no records are left.

A variation on dictionary search is known as 
:math:`Quadratic Binary Search` (QBS),
and we will analyze this in detail because its analysis is easier than
that of the general dictionary search.
QBS will first compute \(p\) and then examine
:math:`\mathbf{L}[\lceil pn\rceil]`.
If :math:`K < \mathbf{L}[\lceil pn\rceil]` then QBS will sequentially
probe to the left by steps of size :math:`\sqrt{n}`, that is, we step
through

.. math::

   \mathbf{L}[\lceil pn - i\sqrt{n}\rceil], i = 1, 2, 3, ...

until we reach a value less than or equal to :math:`K`.
Similarly for :math:`K > \mathbf{L}[\lceil pn\rceil]`
we will step to the right by :math:`\sqrt{n}` until we reach a value
in **L** that is greater than :math:`K`.
We are now within :math:`\sqrt{n}` positions of :math:`K`.
Assume (for now) that it takes a constant number of comparisons to
bracket :math:`K` within a sublist of size :math:`\sqrt{n}`.
We then take this sublist and repeat the process recursively.
That is, at the next level we compute an interpolation to start
somewhere in the subarray.
We then step to the left or right (as appropriate) by steps of size
:math:`\sqrt{\sqrt{n}}`.

What is the cost for QBS?
Note that :math:`\sqrt{c^n} =c^{n/2}`, and we will be repeatedly
taking square roots of the current sublist size until we find the item
that we are looking for.
Because :math:`n = 2^{\log n}` and we can cut :math:`\log n` in half
only :math:`\log \log n` times, the cost is :math:`\Theta(\log \log n)`
*if* the number of probes on jump search is constant.

Say that the number of comparisons needed is :math:`i`, in which case
the cost is :math:`i` (since we have to do :math:`i` comparisons).
If :math:`\mathbf{P}_i` is the probability of needing exactly :math:`i`
probes, then

.. math::

   \sum_{i=1}^{\sqrt{n}} i \mathbf{P}(\mbox{need exactly $i$ probes})\\
   = 1 \mathbf{P}_1 + 2 \mathbf{P}_2 + 3 \mathbf{P}_3 + \cdots +
     \sqrt{n} \mathbf{P}_{\sqrt{n}}

We now show that this is the same as

.. math::

   \sum_{i=1}^{\sqrt{n}} \mathbf{P}(\mbox{need at least $i$ probes})

.. math::

   &=& 1 + (1-\mathbf{P}_1) + (1-\mathbf{P}_1-\mathbf{P}_2) +
       \cdots + \mathbf{P}_{\sqrt{n}}\\
   &=& (\mathbf{P}_1 + ... + \mathbf{P}_{\sqrt{n}}) +
    (\mathbf{P}_2 + ... + \mathbf{P}_{\sqrt{n}}) +\\
   && \qquad    (\mathbf{P}_3 + ... + \mathbf{P}_{\sqrt{n}}) + \cdots\\
   &=& 1 \mathbf{P}_1 + 2 \mathbf{P}_2 + 3 \mathbf{P}_3 + \cdots +
       \sqrt{n} \mathbf{P}_{\sqrt{n}}

We require at least two probes to set the bounds, so the cost is 

.. math::

   2 + \sum_{i=3}^{\sqrt{n}} \mathbf{P}(\mbox{need at least \(i\) probes}).

We now make take advantage of a useful fact known as Chebyshev's
Inequality.
Chebyshev's inequality states that
:math:`\mathbf{P}(\mbox{need exactly}\ i\ \mbox{probes})`,
or :math:`\mathbf{P}_i`, is

.. math::

   \mathbf{P}_i \leq \frac{p(1 - p)n}{(i - 2)^2 n} \leq
   \frac{1}{4(i-2)^2}

because :math:`p(1-p) \leq 1/4` for any probability :math:`p`.
This assumes uniformly distributed data.
Thus, the expected number of probes is

.. math::

   2 + \sum_{i=3}^{\sqrt{n}} \frac{1}{4(i-2)^2}
   < 2 + \frac{1}{4}\sum_{i=1}^\infty \frac{1}{i^2} =
   2 + \frac{1}{4}\frac{\pi}{6} \approx 2.4112

Is QBS better than binary search?
Theoretically yes, because :math:`O(\log \log n)` grows slower than
:math:`O(\log n)`.
However, we have a situation here which illustrates the limits to the
model of asymptotic complexity in some practical situations.
Yes, :math:`c_1 \log n` does grow faster than :math:`c_2 \log \log n`.
In fact, it is exponentially faster!
But even so, for practical input sizes, the absolute cost difference
is fairly small.
Thus, the constant factors might play a role.
First we compare :math:`\log \log n` to :math:`\log n`.

.. math::

   \begin{array}{llll}
   &&&{\rm Factor}\\
   n  &\log n&\log \log n&{\rm Difference}\\
   \hline
   16 &4    &2        &2\\
   256&8    &3        &2.7\\
   2^{16}&16   &4        &4\\
   2^{32}&32  &5      &6.4\\
   \end{array}

It is not always practical to reduce an algorithm's growth rate.
There is a "practicality window" for every problem, in that we have
a practical limit to how big an input we wish to solve for.
If our problem size never grows too big, it might not matter if we can
reduce the cost by an extra log factor, because the constant factors
in the two algorithms might differ by more than the log of the log of
the input size.

For our two algorithms, let us look further and check the actual
number of comparisons used. 
For binary search, we need about :math:`\log n-1` total comparisons.
Quadratic binary search requires about :math:`2.4 \log \log n`
comparisons.
If we incorporate this observation into our table, we get a different
picture about the relative differences.

.. math::

   \begin{array}{llll}
   &&&{\rm Factor}\\
   n  &\log n -1&2.4 \log \log n&{\rm Difference}\\
   \hline
   16&3&4.8&{\rm worse}\\
   256&7&7.2&\approx {\rm same}\\
   64K&15&9.6&1.6\\
   2^{32}&31&12&2.6
   \end{array}

But we still are not done.
This is only a count of raw comparisons.
Binary search is inherently much simpler than QBS,
because binary search only needs to calculate the midpoint position of
the array before each comparison, while quadratic binary search must
calculate an interpolation point which is more expensive.
So the constant factors for QBS are even higher.

Not only are the constant factors worse on average, but QBS
is far more dependent than binary search on good data
distribution to perform well.
For example, imagine that you are searching a telephone directory for
the name "Young".
Normally you would look near the back of the book.
If you found a name beginning with 'Z', you might look just a little
ways toward the front.
If the next name you find also begins with 'Z' you would look a
little further toward the front.
If this particular telephone directory were unusual in that half of
the entries begin with 'Z', then you would need to move toward
the front many times, each time eliminating relatively few records
from the search.
In the extreme, the performance of interpolation search might not be
much better than sequential search if the distribution of key values
is badly calculated.

While it turns out that QBS is not a practical algorithm,
this is not a typical situation.
Fortunately, algorithm growth rates are usually well behaved, so that
asymptotic algorithm analysis nearly always gives us a practical
indication for which of two algorithms is better.
