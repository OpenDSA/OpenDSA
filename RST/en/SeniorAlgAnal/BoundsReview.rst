.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires:
   :satisfies:
   :topic:

.. odsalink:: AV/SeniorAlgAnal/SimpleCostsCON.css

Bounds Review
=============

Introduction
------------

We define the :term:`upper bound <problem upper bound>` for a problem
to be the upper bound of the best algorithm we know for that
problem, and the
:term:`lower bound <problem lower bound>` to be the tightest lower
bound that we can prove over all algorithms for that problem.
While we usually can recognize the upper bound for a given algorithm,
finding the tightest lower bound for all possible algorithms is often
difficult, especially if that lower bound is more than the
"trivial" lower bound determined by measuring the amount
of input that must be processed.

The benefits of being able to discover a strong lower bound are
significant.
In particular, when we can make the upper and lower bounds for a
problem meet, this means that we truly understand our problem in a
theoretical sense.
It also saves us the effort of attempting to discover more
(asymptotically) efficient algorithms when no such algorithm can
exist.

Often the most effective way to determine the lower bound for a
problem is to find a :ref:`reduction <reduction> <Reduction>` to
another problem whose lower bound is already known.
However, this approach does not help us when we cannot find a suitable
"similar problem".
One thing that we will focus on is discovering and proving lower bounds
from first principles.
Our most  significant example of a lower bounds argument so far is the
:ref:`sorting lower bound proof <sorting lower bound> <SortingLowerBound>`,
which shows that the problem of sorting has a lower bound of
:math:`O(n \log n)` in the :term:`worst case`.

The lower bound for the problem is the tightest (highest) lower bound
that we can prove **for all possible algorithms** that solve the
problem. [#]_
This can be a difficult bar, given that we cannot possibly know all
algorithms for any problem, because there are theoretically an
infinite number.
However, we can often recognize a simple lower bound based on the
amount of input that must be examined.
For example, we can argue that the lower bound for any algorithm to
find the maximum-valued element in an unsorted list must be
:math:`\Omega(n)` because any algorithm must examine all of the inputs
to be sure that it actually finds the maximum value.

In the case of maximum finding, the fact that we know of a simple
algorithm that runs in :math:`O(n)` time, combined with the fact that
any algorithm needs :math:`\Omega(n)` time, is significant.
Because our upper and lower bounds meet (within a constant factor),
we know that we indeed have a "good" algorithm for solving the
problem.
It is possible that someone can develop an implementation that is a
"little" faster than an existing one, by a constant factor.
But we know that its not possible to develop one that is
asymptotically better.

We must be careful about how we interpret this last statement,
however.
The world is certainly better off for the invention of Quicksort,
even though Mergesort was available at the time.
Quicksort is not asymptotically faster than Mergesort, yet is not
merely a "tuning" of Mergesort either.
Quicksort is a substantially different approach to sorting.
So even when our upper and lower bounds for a problem meet,
there are still benefits to be gained from a new, clever algorithm.


Analyzing Problems
------------------

Our first example for analyzing a problem was Towers of Hanoi.
This had the advantage that for a given input size :math:`n`, there
was only one input (the value :math:`n`).
Of course, this is not always true.
For example, there are a number of ways to think about the input to
the problem of finding the maximum value in an array of :math:`n`
records.
We could consider an array of :math:`n` arbitrary values,
in which there are an infinite number of inputs of size :math:`n`.
It might be hard for us to understand the analysis of some problem if
we cannot even enumerate all of the possible inputs.
So we might prefer a simpler model that we believe will not change the
underlying behavor.
For example, we could assume that the input is some permutation of the
values from 1 to :math:`n`.
While we probably do not want to restrict our find algorithm to such
input, if all we care about for analysis purposes is the position of
the biggest value within the array, then a permutation of the values
from 1 to :math:`n` might make it easier for us to think through all
of the possibilities.

Another complicating factor that might or might not arise is that
different inputs of a given size might have different costs.
For example, we probably realize that to find the maximum value in the
array, we need to look at all values of the array.
So, the order of the values does not really affect the time required.
However, consider if our problem is to find where in the array the
record with value :math:`X` appears, if any such record exists.
Now, not only are there many possible inputs of size :math:`n`, but
those inputs have different costs when using, for example, a simple
sequential search from the start of the array.
This is why we need the concepts of best, average, and worst case
inputs.

To make things even worse, the cost to solve the problem for a
given input depends on the algorithm that we use!
For example, which input of size :math:`n` is the worst is different
for the algorithm that moves sequentially through the array from the
start to the end, as opposed to the algorithm that moves sequentially
through the array from the end to the start.

The :term:`worst-case cost <worst case>` (for all input of size $n$)
is the maximum cost for the algorithm over all problem instances of
size :math:`n`.
The :term:`best-case cost <best case>` (for all input of size $n$)
is the minimum cost for the algorithm over all problem instances of
size :math:`n`.
It is possible that the \{best, worst\} case cost changes
radically with :math:`n`.
That is, even :math:`n` might have a very different cost from odd
:math:`n`.

We will use the following notation at varous times this semester.
:math:`\mathcal{A}` is an algorithm.
:math:`I_n` is the set of all possible inputs to :math:`\mathcal{A}`
of size :math:`n`.
:math:`I` is an input in :math:`I_n`.
:math:`f_\mathcal{A}` is a function that expresses the resource cost
of algorithm :math:`\mathcal{A}`.
Using this notation, we can define the worst and best case costs as:

.. math::

   \mbox{worst cost}(\mathcal{A}) = \max_{I \in I_n}
   f_{\mathcal{A}}(I).

   \mbox{best cost}(\mathcal{A}) = \min_{I \in I_n}
   f_{\mathcal{A}}(I).

This point that we are considering all of the inputs of size :math:`n`
is crucial.
In other words, we don't pick the :math:`n` for which the best
(or worst) case occurs.
So it would be wrong to say something like
"The best case is when :math:`n=1`."

.. inlineav:: SimpleCostsCON dgm
   :output: show

If we want the :term:`average-case cost <average case>`,
it is even more complicated.
We might model this as half way between the best and worst case costs,
but this is not often correct.
(Think about what circumstances would make it correct, and some
situations where it would not be correct.)
To account for the true average cost for input of size :math:`n`,
we have to consider the entire collection of such inputs.
For each one of these, we need its relative frequency, and its cost.
Frequencies for inputs can be hard to determine!
For example, the average cost of sequential search is :math:`(n+1)/2`,
but **only** if every position of the array is equally likely to hold
the value that we are looking for.
And what do we do about the situation where the value is not even in
the array?

However, ideally we have all the information that we need to calcluate
the average case cost.
Then we can calculate the weighted average:

.. math::

   \frac{\sum_{I\in I_n} \mathrm{freq}(I) *
   \mathrm{cost}(I)}{\mathrm{total\ count\ of\ frequencies}}

Think about this: Can the average cost be worse than the worst cost?
Or better than the best cost?

So now we are ready to give a more precise definition for the lower
bound of a problem.
As always, we have to define it for some class of inputs.
We also have to consider that there are many (infinitely many in
theory) algorithms that solve the problem.
Recall that to analyze any problem, we have to define a model that
includes the definition for problem size and the definition for
solution cost.
Call such a model :math:`\mathcal{M}`.
Then, :math:`\mathcal{A_M}` is the set of all algorithms that solve
the problem under model :math:`\mathcal{M}`.
Then, the lower bound of a problem in the **worst case** is:

.. math::

   \min_{{\mathcal A} \in {\mathcal A}_M} \left\{
   \max_{I \in I_n} f_{\mathcal A}(I)\right\}


Modeling the Inputs
~~~~~~~~~~~~~~~~~~~

Especially when trying to come to grips with what the average case
cost of the algorithm will be, it might be easier to think about what
is going on if we simplify the model that we use for the class of
inputs that we are considering.

Think about the seemingly simple problem of finding the value
:math:`X` in an (unsorted) array of :math:`n` records.
What are the inputs to this problem?
Of course, an array of :math:`n` records!
But what does that mean if we try to enumerate all of the inputs of
size :math:`n`?
How many such inputs are there?

Well, if each position in the array can take any value, then there are
an infinite number of values for each position.
Even if we restrict these values to something like a 64-bit integer,
it is still a lot of possibilities to consider!

Given the cognative load involved in thinking about all of those
inputs, we might want to consider instead analyzing a simpler set of
inputs.
For example, we might decide to only consider (for analysis purposes)
that the input is a permuation of the numbers 1 to :math:`n`.
The argument here might be that we don't care about the actual values
in the array. We only care about whether a given value is :math:`X` or
not, and so we can simplify the inputs that we consider.

There are two dangers that we have to be aware of when doing such a
simplification.
First, our simplification has to still reflect reality.
If we simplify an array of :math:`n` numbers as a permutation of the
numbers 1 to :math:`n`, then we eliminate the inputs that have
duplicates.
That might make for a wrong analysis.
Second, we have to separate the issue of inputs for the purpose of
analysis from inputs for the purpose of solving a problem.
In the case of sorting, we might want to analyze behavior on a
collection of :math:`n` records each with a unique key value.
Since we don't care about the actual key values, we might simplify
this to some permuation of a set of records with key values 1 to
:math:`n`.
But, sorting a collection of records whose keys are known to be a
permuation of the values 1 to :math:`n` is much simpler than sorting a
collection of :math:`n` arbitrary records!
For example, we can sort the permutation in linear time with a simple
Binsort.

Going back to the example of finding value :math:`X` in an array of
:math:`n` records,
we might want to consider a model that only considers the position of
the first occcurance of :math:`X` in the array.
In other words, we lump all inputs whose first occurance of :math:`X`
is in the first position into one input.
All inputs whose first occurance of :math:`X` is in the second
position is another input.
And so on.
Then we can analyze the cost only for those "groups" of inputs that we
care about.
Of course, we might have difficulty deciding what the proper
frequencies are for each of these synthetic input groups.
Perhaps it is reasonable to say that each position in the array has
equal probability of holding the first occurrance of :math:`X`.
Or perhaps it is not.

.. [#] Throughout this discussion, it should be
       understood that any mention of bounds must specify what class
       of inputs are being considered.
       Do we mean the bound for the worst case input?
       The average cost over all inputs?
       Regardless of which class of inputs we
       consider, all of the issues raised apply equally.

.. odsascript:: AV/SeniorAlgAnal/SimpleCostsCON.js
