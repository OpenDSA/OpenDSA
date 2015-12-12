.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :topic: Randomized Algorithms

Randomized Algorithms: Introduction
===================================

We now consider how introducing randomness into our
algorithms might speed things up, although perhaps at the expense of
accuracy.
But often we can reduce the possibility for error to be as low as we
like, while still speeding up the algorithm.

The :ref:`lower bound for maximum finding <maximum lower bound> <LowerBound>`
in an unsorted list is :math:`\Omega(n)`.
This is the least time needed to be certain that we have found the
maximum value.
But what if we are willing to relax our requirement for certainty?
The first question is: What do we mean by this?
There are many aspects to "certainty" and we might relax the
requirement in various ways.

There are several possible guarantees that we might require from an
algorithm that produces :math:`X` as the maximum value, when the true
maximum is :math:`Y`.
So far we have assumed that we require :math:`X` to equal :math:`Y`.
This is known as an exact or deterministic algorithm to solve the
problem.
We could relax this and require only that :math:`X` 's rank is
"close to" :math:`Y` 's rank (perhaps within a fixed distance or
percentage).
This is known as an approximation algorithm.
We could require that :math:`X` is "usually" :math:`Y`.
This is known as a probabilistic algorithm.
Finally, we could require only that :math:`X` 's rank is "usually"
"close" to :math:`Y` 's rank.
This is known as a heuristic algorithm.

There are also different ways that we might choose to sacrifice
reliability for speed.
These types of algorithms also have names.

#. :term:`Las Vegas Algorithms`:
   We always find the maximum value, and "usually" we find it fast.
   Such algorithms have a guaranteed result, but do not guarantee fast
   running time.

#. :term:`Monte Carlo Algorithms`:
   We find the maximum value fast, or we don't get an answer at all
   (but fast).
   While such algorithms have good running time, their result is not
   guaranteed.

Here is an example of an algorithm for finding a large value that
gives up its guarantee of getting the best value in exchange for an
improved running time.
This is an example of a :term:`probabilistic algorithm`, since it
includes steps that are affected by random events.
Choose :math:`m` elements at random, and pick the best one of those as
the answer.
For large :math:`n`, if :math:`m \approx \log n`, the answer is pretty
good.
The cost is :math:`m-1` compares (since we must find the maximum of
:math:`m` values).
But we don't know for sure what we will get.
However, we can estimate that the rank will be about
:math:`\frac{mn}{m+1}`.
For example, if :math:`n = 1,000,000` and :math:`m = \log n = 20`,
then we expect that the largest of the 20 randomly selected values be
among the top 5% of the :math:`n` values.

Next, consider a slightly different problem where the goal is to
pick a number in the upper half of :math:`n` values.
We would pick the maximum from among the first :math:`\frac{n+1}{2}`
values for a cost of :math:`n/2` comparisons.
Can we do better than this?
Not if we want to guarantee getting the correct answer.
But if we are willing to accept near certainty instead of absolute
certainty, we can gain a lot in terms of speed.

As an alternative, consider this probabilistic algorithm.
Pick 2 numbers and choose the greater.
This will be in the upper half with probability 3/4 (since it is not
in the upper half only when both numbers we choose happen to be in the
lower half).
Is a probability of 3/4 not good enough?
Then we simply pick more numbers!
For :math:`k` numbers, the greatest is in upper half with probability
:math:`1 - \frac{1}{2^k}`, regardless of the number :math:`n` that we
pick from, so long as :math:`n` is much larger than :math:`k`
(otherwise the chances might become even better).
If we pick ten numbers, then the chance of failure is only one in
:math:`2^{10} = 1024`.
What if we really want to be sure, because lives depend on drawing a
number from the upper half?
If we pick 30 numbers, we can fail only one time in a billion.
If we pick enough numbers, then the chance of picking a small
number is less than the chance of the power failing during the
computation.
Picking 100 numbers means that we can fail only one time in
:math:`10^{100}` which is less than the chance any plausible
disaster that you can imagine will disrupt the process.
