.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires:
   :satisfies:
   :topic: Lower Bounds

Chapter Introduction: Lower Bounds
==================================

How do I know if I have a good algorithm to solve a problem?
If my algorithm runs in :math:`\Theta(n \log n)` time, is that good?
It would be if I were sorting the records stored in an array.
But it would be terrible if I were searching the array for the largest
element.
The value of an algorithm must be determined in relation to the
inherent complexity of the problem at hand.

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
Our focus in this chapter is discovering and proving lower bounds
from first principles.
Our most  significant example of a lower bounds argument so far is the
:ref:`sorting lower bound proof <sorting lower bound> <SortingLowerBound>`,
which shows that the problem of sorting has a lower bound of
:math:`O(n \log n)` in the worst case.

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

So now we have an answer to the question
"How do I know if I have a good algorithm to solve a problem?"
An algorithm is good (asymptotically speaking) if its upper bound
matches the problem's lower bound.
If they match, then we know to stop trying to find an (asymptotically)
faster algorithm.
What if the (known) upper bound for our algorithm does not
match the (known) lower bound for the problem?
In this case, we might not know what to do.
Is our upper bound flawed, and the algorithm is really faster than we
can prove?
Is our lower bound weak, and the true lower bound for the problem is
greater?
Or is our algorithm simply not the best?

Now we know precisely what we are aiming for when designing an
algorithm:
We want to find an algorithm who's upper bound matches the lower bound
of the problem.
Putting together all that we know so far about algorithms, we can
organize our thinking into the following "algorithm for designing
algorithms". [#]_

| **If** the upper and lower bounds match,
|   **then** stop,
|   **else if** the bounds are close or the problem isn't important,
|     **then** stop,
|     **else if** the problem definition focuses on the wrong thing,
|       **then** restate it,
|       **else if** the algorithm is too slow,
|         **then** find a faster algorithm,
|         **else if** lower bound is too weak,
|           **then** generate a stronger bound.

We can repeat this process until we are either satisfied or
exhausted.

This brings us smack up against one of the toughest tasks in
analysis.
Lower bounds proofs are notoriously difficult to construct.
The problem is coming up with arguments that truly cover all of the
things that *any* algorithm possibly *could* do.
The most common fallacy is to argue from the point of view of what
some good algorithm actually *does* do, and claim that any
algorithm must do the same.
This simply is not true, and any lower bounds proof that refers to
specific behavior that must take place should be viewed with some
suspicion.

Let us consider the :term:`Towers of Hanoi problem`.
Our basic algorithm is to move :math:`n-1` disks (recursively) to the
middle pole, move the bottom disk to the third pole, and then move
:math:`n-1` disks (again recursively) from the middle to the third
pole.
This algorithm generates the recurrence
:math:`\mathbf{T}(n) = 2\mathbf{T}(n-1) + 1 = 2^n - 1`.
So, the upper bound for our algorithm is :math:`2^n - 1`.
But is this the best algorithm for the problem?
What is the lower bound for the problem?

For our first try at a lower bounds proof, the "trivial" lower bound
is that we must move every disk at least once, for a minimum cost
of :math:`n`.
Slightly better is to observe that to get the bottom disk to the third
pole, we must move every other disk at least twice (once to get them
off the bottom disk, and once to get them over to the third pole).
This yields a cost of :math:`2n - 1`, which still is not a good match
for our algorithm.
Is the problem in the algorithm or in the lower bound?

We can get to the correct lower bound by the following reasoning:
To move the biggest disk from first to the last pole, we must first
have all of the other :math:`n-1` disks out of the way, and the only
way to do that is to move them all to the middle pole (for a cost of
at least :math:`\textbf{T}(n-1)`).
We then must move the bottom disk (for a cost of at least one).
After that, we must move the :math:`n-1` remaining disks from the
middle pole to the third pole (for a cost of at least
:math:`\textbf{T}(n-1)`).
Thus, no possible algorithm can solve the problem in less than
:math:`2^n-1` steps.
Thus, our algorithm is optimal. [#]_

Of course, there are variations to a given problem.
Changes in the problem definition might or might not lead to changes
in the lower bound.
Two possible changes to the standard Towers of Hanoi problem are:

(#) Not all disks need to start on the first pole.
(#) Multiple disks can be moved at one time.

The first variation does not change the lower bound (at
least not asymptotically).
The second one does.

.. [#] Throughout this discussion, it should be
       understood that any mention of bounds must specify what class
       of inputs are being considered.
       Do we mean the bound for the worst case input?
       The average cost over all inputs?
       Regardless of which class of inputs we
       consider, all of the issues raised apply equally.

.. [#] This is a minor reformulation of the "algorithm" given by
       Gregory J.E. Rawlins in his book *Compared to What?*

.. [#] Recalling the advice to be suspicious of any lower bounds proof
       that argues a given behavior "must" happen, this proof should
       be raising red flags.
       However, in this particular case the problem is so constrained
       that there really is no (better) alternative to this particular
       sequence of events.
