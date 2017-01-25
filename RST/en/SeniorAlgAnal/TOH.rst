.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires:
   :satisfies:
   :topic:

.. odsalink:: AV/RecurTutor/TOHfigCON.css

Introduction to Analyzing a Problem
===================================

Towers of Hanoi
---------------

This is an exercise first in the process of problem solving, and
second in the process of analyzing a problem in detail.

Pretend that you have never seen the Towers of Hanoi problem before,
that you are approaching it for the first time.

Given: 3 pegs and $n$ disks of different sizes placed in order of size
on Peg 1.

This problem is especially good for us to use as a starting
example for the analysis of a problem.
The reason is that there is essentially only one optimal algorithm,
and its simple enough to recognize this to be a fact.
This avoids a lot of the complication that we normally 
encounter in the analysis process, even when considering the simplest
of problems.

As a bonus, we can talk a bit about the creative aspects of problem
solving, as separate from the mechanics of analyzing the efficiency of
the solution.

.. inlineav:: TOHfigCON dgm
   :output: show 

Problem: Move the disks to Peg B, given the following constraints:

* A "move" takes the topmost disk from one peg and places it on
  another peg (the only action allowed).

* A disk may never be on top of a smaller disk.


The Model
~~~~~~~~~

Recall that to do analysis, we have to define a model with two parts:

#. **The size of the input** is the number of disks.
#. **The cost of the solution** is the number of moves.


Finding an Algorithm
~~~~~~~~~~~~~~~~~~~~

Start by trying to solve the problem for small instances.

* 0 disks, 1 disk, 2 disks...
* When we get to 3 disks, it starts to get harder.

Think about all the possible choices for a 3-disk series of
moves.

Can we generalize the insight from solving for 3 disks? 4 disks?

Observation 1: The largest disk has no effect on the movements of the
other disks.  Why? Because it is always below the other disks, so they
can move around as though it did not exist.

Observation 2 (Key!): We can't move the bottom disk from Pole A to
Pole B unless all other disks are on Pole C.

Problem solving often relies on a "key insight" that lets you
"crack" the problem.

Similarly, *analysis* of the problem might rely on a
"key insight" on how to view the analysis.
Often a simplification for the "states" or progess of the algorithm,
or a recognition of the key input classes for the problem.

When we generalize the problem to more disks, we end up with
something like:

* Move all but the bottom disk to Peg C.
* Move the bottom disk from Peg A to Peg B.
* Move the remaining disks from Peg C to Peg B.

We used a number of problem-solving heuristics, including:

* Get our hands dirty: Try playing with some simple examples
* Go to the extremes: Check the small cases first
* Penultimate step: Key insight is that we can't solve the problem
  until we move the bottom disk.

How do we deal with the :math:`n-1` disks (twice)?
Use recursion.

Forward-backward strategy: Solve simple special cases and generalize
their solution, then test the generalization on other special cases::

   void Tower1(int n, POLE start, POLE goal, POLE temp) {
     if (n == 0) return;             // Base case
     Tower1(n-1, start, temp, goal); // Recurse: n-1 rings
     move(start, goal);              // Move one disk
     Tower1(n-1, temp, goal, start); // Recurse: n-1 rings
   }


Analysis of the Algorithm
~~~~~~~~~~~~~~~~~~~~~~~~~

There is only one input instance of size :math:`n`.
Worst/best/average cost are the same, so it doesn't matter which
you do. This is one of the reasons why we picked this algorithm to
discuss -- we don't have the complexity of a range of inputs for a
given size :math:`n`.

The second reason why we picked this problem to start with is
because it is "obvious" what the lower bound cost is.
So now we can focus entirely on the technique of proving the math, not
figuring out what to analyze.

We want to count the number of moves required as a function of :math:`n`.

Some facts:

* :math:`f(1) = 1`.
* :math`f(2) = 3`.
* :math:`f(3) = 7`.
* :math:`f(n) = f(n-1) + 1 + f(n-1) = 2f(n-1) + 1, \forall n \geq 4`.

Actually, we can simplify our list of facts.
We only need f(1) and f(n), facts f(2) and f(3) are redundant
information.
But spelling them out might help us to see the pattern.

If we have a recursive algorithm, then we model its cost with a
:term:`recurrence relation`.
What is the recurrence relation for ``Tower1``?

.. math::

   f(n) = \left\{
   \begin{array}{ll}
   1 & n = 1\\
   2f(n-1) + 1& n > 1
   \end{array}
   \right.

How can we find a closed form solution for this recurrence?
Normally, we can't get anywhere with one of these analysis problems
until we "get our hands dirty". Usually like this:

.. math::

   \begin{array}{r|rrrrrrr}
   n   &1&2&3&4 &5 &6\\
   \hline
   f(n)&1&3&7&15&31&63\\
   \end{array}

It looks like each time we add a disk, we roughly double the cost --
something like :math:`2^n`.
If we examine some simple cases, we see that they appear to fit the
equation :math:`f(n) = 2^n - 1`.

In practice, this is a common way to start: look for a pattern.
It is so common, it has its own name: Guess and Test.
We will use this a lot to help us with analysis.

How do we prove that this ALWAYS works?
Let's ASSUME that :math:`f(n-1) = 2^{n-1} - 1`, and see what happens.
From the recurrence,
:math:`f(n) = 2f(n-1) + 1 = 2(2^{n-1} - 1) + 1 = 2^n - 1.`

Implication: if there is EVER an :math:`n` for which
:math:`f(n) = 2^n - 1`, then for all greater values of :math:`n`,
:math:`f` conforms to this rule.

This is the essence of :term:`proof by induction`.
To prove by induction, we need to show two things:

#. We can get started (:term:`base case`).
#. Being true for :math:`k` implies that it is true also for
   :math:`k+1`.

Here is the complete induction proof for ``Tower1``:

* For :math:`n = 1`, :math:`f(1) = 1`, so :math:`f(1) = 2^1 - 1`.
* Assume :math:`f(k) = 2^k - 1`, for :math:`k<n`.
* Then, from the recurrence we have

   .. math::

      \begin{eqnarray*}
      f(n) &=& 2f(n-1) + 1\\
      &=& 2(2^{n-1} - 1) + 1 = 2^n - 1
      \end{eqnarray*}

* Thus, being true for :math:`k-1` implies that it is also true for
  :math:`k`.
* Thus, we conclude that formula is correct for all :math:`n\geq 1`.

Lower Bound for the Problem
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Is this a good algorithm?
That would depend on what?
On the intrinsic difficulty of the problem!

To decide if the algorithm is good, we need a lower bound on the
cost of the PROBLEM.
We are fortunate for this problem that we have insight about the most
efficient way POSSIBLE to solve this problem. So we can reason about
that.
We know that we must move all disks off the bottom disk, move the
bottom disk, then move all disks again. Any other algorithm can only
add work.

Lower bounds (of problems) are harder than upper bounds (of
algorithms) because we must consider ALL of the possible algorithms --
including the ones we don't know!
Since we cannot even enumerate all the algorithms and check all
the bounds, we need a different approach!

* Upper bound: How bad is the algorithm?
* Lower bound: How hard is the problem?

Lower bounds don't give you a good algorithm.  They only help you know
when to stop looking.

If the lower bound for the problem matches the upper bound for the
algorithm (within a constant factor), then we know that we can find an
algorithm that is better only by a constant factor.

Can a lower bound tell us if an algorithm is NOT optimal?
No, sorry!
Why not? Because we might not have the tightest possible lower bound!

Let's determine the lower bounds for Towers of Hanoi.

Try #1: We must move each disk at least twice, except for the largest
we move once. This leads to :math:`f(n) = 2n - 1`.
Is this a good match to the cost of our algorithm?
No! :math:`\Omega(n)` isn't close to :math:`O(2^n)`.

Where is the problem: the lower bound or the algorithm?

Insight #1: :math:`f(n) > f(n-1)`.
Seems obvious, but why?
We must move :math:`n-1` disks off the bottom disk first.
\item Is this true for all problems?
No! For example, sorting cost depends on particular problem
instances.

Try #2: To move the bottom disk to Peg B, we MUST move :math:`n-1`
disks to Peg C.
Then, we MUST move :math:`n-1` disks back to Peg B.

:math:`f(n) \geq 2f(n-1) + 1`.

Thus, ``Tower1`` is optimal (for our model),
since it does nothing more than the minimum required by the
observation.

Warning: Normally we cannot "prove" anything about a problem in
general with this sort of behavioristic argument. Usually, we cannot
say so much about **how** an algorithm **must** work.

New Models
~~~~~~~~~~

New model #1: We can move a stack of disks in one move.
This is a big help! :math:`O(n)` or even :math:`O(1)`.

New model #2: Not all disks start on Peg A.
This doesn't seem to change the cost of the problem. (Why?)

Combining these two things, the cost looks to be :math:`O(n)`.

New model #3: Different numbers of pegs.

New model #4: We want to know what the :math:`k` th move is.


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

Does this "algorithm" always terminate?
No -- you might get stuck in a loop if you go through and make no
progress.

So, is it an algorithm?

.. [#] Recalling the advice to be suspicious of any lower bounds proof
       that argues a given behavior "must" happen, this proof should
       be raising red flags.
       However, in this particular case the problem is so constrained
       that there really is no (better) alternative to this particular
       sequence of events.

.. odsascript:: AV/RecurTutor/TOHfigCON.js
