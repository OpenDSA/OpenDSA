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

How do I know if I have a good algorithm to solve a problem?
If my algorithm runs in :math:`\Theta(n \log n)` time, is that good?
It would be if I were sorting the records stored in an array.
But it would be terrible if I were searching the array for the largest
element.
The value of an algorithm must be determined in relation to the
inherent complexity of the problem at hand.

This module presents our first example of the end-to-end process for
analyzing a problem.
We will (1) define a simple problem, then (2) find an algorithm for it
(giving an opportunity to talk a bit about the process of problem
solving), and finally (3) analyze the relationship between the
algorithm and the problem to see if the algorithm is efficient or
not.
We will also solve a simple recurrence as part of the process.

The problem that we start with is one that you probably are
already quite familiar with: Towers of Hanoi.
As best you can, you should pretend that you have never seen the
Towers of Hanoi problem before, that you are approaching it for the
first time.
This problem is especially good for us to use as a starting
example for the analysis of a problem.
The reason is that there some simplifying aspects to it that make it
unusually easy to discuss its analysis.
First, there is only one problem instance of a given size.
Second, there is essentially only one optimal algorithm,
and it is simple for us to recognize this to be a fact.
This avoids a lot of the complication that we normally 
encounter in the analysis process, even when considering the simplest
of problems.
In other words, Towers of Hanoi is easy to analyze, which is different
from being easy to solve, and which is also different from 
having "easy cost" (that is, being cheap to run).
These three aspects of being easy or hard
(ability to analyze, ability to find a solution, and cost to run) are
completely independent.

.. topic:: TOWERS OF HANOI

   **Input:** Three poles (labeled A, B, and C) and $n$ disks of
   different sizes placed in order of size on Pole A.

   **Problem:** Move the disks to Pole B, given the following
   constraints:

   * A "move" takes the topmost disk from one pole and places it on
     another pole (the only action allowed).

   * A disk may never be on top of a smaller disk.

   **Output:** A series of moves that solves the problem.

.. inlineav:: TOHfigCON dgm
   :output: show 


The Model
~~~~~~~~~

Recall that to do analysis, we have to define a model with two parts:
a definition for the size of the input, and a definition for how to
measure the cost of a solution.

#. **The size of the input** is the number of disks.
#. **The cost of the solution** is the number of moves made.


Finding an Algorithm
~~~~~~~~~~~~~~~~~~~~

When trying to solve most problems, a good place to start is to try to
solve it for small instances.
How would we solve the problem when there are 0 disks, 1 disk, 2
disks, and so on?
Those should all be pretty easy for you to figure out.
How about 3 disks? This starts to get a bit harder.
Think about all the possible choices for a 3-disk series of
moves.
There a several possibilities, but you should find that there is only
one "reasonable" one.
Can we generalize the insight from solving for 3 disks?
How about when we solve for 4 disks?

Here is a useful observation: The largest disk has no effect on the
movements of the other disks.
Why?
Because it is always below the other disks, so they
can move around as though it did not exist.
Why is this useful? Because it essentially means that we can ignore
the biggest disk when we think about solving subproblems.
Most importantly, it means that we can use the pole that the biggest
disk is sitting on to solve the subproblems, just as if that disk was
not there at all.

Here is another observation that you should come to, if you actually
play around with the problem yourself.
This one is critical:
We can't move the bottom disk from Pole A to Pole B unless all other
disks are already on Pole C.
This critical observation almost immediately gives us a solution to
the problem.

Problem solving often relies on a "key insight" that lets you
"crack" the problem.
Similarly, *analysis* of the problem might rely on a
"key insight" on how to view the analysis.
This is often a simplification for the "states" or progess of the
algorithm, or a recognition of the key input classes for the problem.

When we generalize the problem to more disks, we must end up with
a process something like:

* Move all but the bottom disk to Pole C.
* Move the bottom disk from Pole A to Pole B.
* Move the remaining disks from Pole C to Pole B.

Notice that in this discussion, we used a number of problem-solving
heuristics to solve this problem, including:

* Get our hands dirty: Try playing with some simple examples
* Go to the extremes: Check the small cases first
* Penultimate step: Key insight is that we can't solve the problem
  until we move the bottom disk. So to solve the whole problem, we
  first clear off the bottom disk, then we move the bottom disk, then
  we solve the rest of the problem. Reducing the full problem to these
  pieces is hopefully easier to solve than the original problem was.

As a practical matter, how do we deal with the fact that we have to
move :math:`n-1` disks (twice)?
As programmers, we are used to packaging tasks into subroutines of
some sort.
In this case, since solving the problem on :math:`n-1` disks looks
just like a smaller version of solving the original problem,
it seems natural to use recursion.

Generalizing the problem-solving approach a bit, we can say that we
used a forward-backward strategy:
First we solved simple special cases and generalized
their solution, then we tested the generalization on other special
cases.

Here is the algorithm, cast as a program::

   void Tower1(int n, POLE start, POLE goal, POLE tmp) {
     if (n == 0) return;             // Base case
     Tower1(n-1, start, tmp, goal); // Recurse: n-1 disk
     move(start, goal);              // Move one disk
     Tower1(n-1, tmp, goal, start); // Recurse: n-1 disk
   }


Analysis of the Algorithm
~~~~~~~~~~~~~~~~~~~~~~~~~

Since the input to the problem is the number of disks, and the size of
the problem is also the number of disks, there is only one input
instance of size :math:`n`.
So we do not need to worry about complicating issues related to
whether we are concerned with the worst, best, or average case costs.
This is one of the reasons why we picked this problem to discuss first
|---| we don't have the complexity of a range of inputs for a
given size :math:`n`.

Given an algorithm to solve the problem, we want to know what the
cost of that algorithm is as a function of the input size.
In particular, we want to know the :term:`growth rate` for the
algorithm as the input size grows.
In particular, our cost model says that our cost is the number of
moves that are made to solve the problem.
So, we want to count the number of moves required as a function of
:math:`n`.

To do this, we will need a mathematical model, some equation that
defines the number of moves as a function of :math:`n`.
How do we get there?
We can either deduce this from the structure of the algorithm, or by
observing its behavior.
Let's start with behavior (though with a bit of proficiency we will
find that the structure of this particular algorithm makes the
equation fairly straightforward).
Here are some facts to get us started, by counting the number of moves
that the algorithm makes for some small inputs.

* :math:`f(0) = 0`.
* :math:`f(1) = 1`.
* :math:`f(2) = 3`.
* :math:`f(3) = 7`.

Now, how do we generalize this?
If we look at the algorithm, we see that there are two recursive
calls, and one move is made.
We don't know what the cost of a recursive call actually is.
But if we give a name to the cost of our algorithm, then we can use
that same name to identify the cost of the subproblem.
So, for an arbitrary input size of :math:`n`, we can generalize the
cost as:

* :math:`f(n) = f(n-1) + 1 + f(n-1) = 2f(n-1) + 1, \forall n \geq 4`.

This is using a :term:`recurrence relation`, and we will need to
"solve" it by finding a :term:`closed-form solution` for the
recurrence.

Actually, we can simplify our list of facts.
We only need f(1) and f(n), facts f(2) and f(3) are redundant
information.
But spelling them out might help us to see the pattern.
We only need one base case in this case.
So here is the formal recurrence relation that defines the
mathematical model for our algorithm's cost:

.. math::

   f(n) = \left\{
   \begin{array}{ll}
   1 & n = 1\\
   2f(n-1) + 1& n > 1
   \end{array}
   \right.

How can we find a closed-form solution for this recurrence?
Normally, we can't get anywhere with one of these analysis problems
until we "get our hands dirty" with some small examples of the
behavior of the equation.
So here is a small table with the first few values.

.. math::

   \begin{array}{r|rrrrrrr}
   n   &1&2&3&4 &5 &6\\
   \hline
   f(n)&1&3&7&15&31&63\\
   \end{array}

Can we see a pattern here?
It looks like each time we add a disk, we roughly double the cost |---|
something like :math:`2^n`.
If we examine some simple cases, we see that they appear to fit the
exact equation :math:`f(n) = 2^n - 1`.

This really is a common way to go about figuring out the closed-form
solution for many recurrence relations and summation:
Look at what happens, try to find (or guess) a pattern, and then test
the pattern.
This is so common that it has its own  name: :term:`Guess and test`.
We will use this a lot to help us with analysis.

Now that we have a pretty good guess,
how do we prove that this **always** works?
This is the "test" part of "guess and test".

Let's **assume** that :math:`f(n-1) = 2^{n-1} - 1`, and see what
happens.
Take the recurrence, and simply replace :math:`f(n-1)` with our guess
that it is :math:`2^{n-1} - 1`.
Doing this gives us
:math:`f(n) = 2f(n-1) + 1 = 2(2^{n-1} - 1) + 1 = 2^n - 1`.

The implication here is that if there is **ever** an :math:`n` for
which :math:`f(n) = 2^n - 1`, then for all greater values of
:math:`n`, :math:`f` conforms to this rule.
This is the essence of :term:`proof by induction`.
To prove by induction, we need to show two things:

#. We can get started (:term:`base case`).
#. Being true for :math:`k` implies that it is true also for
   :math:`k+1`.

Here is the complete induction proof for ``Tower1``:

.. topic:: Proof by Induction

   #. **Check the base case.**
      For :math:`n = 0`, :math:`f(0) = 0`, so :math:`f(0) = 2^0 - 1`.

   #. **State the induction hypothesis.**
      The induction hypothesis is
      :math:`f(k) = 2^k - 1`, for :math:`k<n`.

   #. **Use the assumption from the induction hypothesis for**
      :math:`n-1` **to show that the result is true for** :math:`n`.

      From the recurrence we have

      .. math::

         \begin{eqnarray*}
         f(n) &=& 2f(n-1) + 1\\
         &=& 2(2^{n-1} - 1) + 1 = 2^n - 1
         \end{eqnarray*}

   Thus, we conclude that formula is correct for all :math:`n\geq 0`.


Lower Bound for the Problem
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Is this a good algorithm?
That would depend on what?
On the intrinsic difficulty of the problem!

To decide if the algorithm is good, we need a lower bound on the
cost of the PROBLEM.
The lower bound for the problem is the tightest (highest) lower bound
that we can prove **for all possible algorithms** that solve the
problem.
This can be a difficult bar, given that we cannot possibly know all
algorithms for any problem, because there are theoretically an
infinite number.

Lower bounds don't give you a good algorithm.
They only help you know when to stop looking.
If the lower bound for the problem matches the upper bound for the
algorithm (within a constant factor), then we know that we can find an
algorithm that is better only by a constant factor.

Can a lower bound tell us if an algorithm is NOT optimal?
No, sorry!
Why not?
Because we might not have the tightest possible lower bound!

Let's determine the lower bounds for Towers of Hanoi.
Another reason why we picked this problem to start with is
because it is "obvious" what the lower bound cost to the problem is.
So now we can focus entirely on the technique of proving the math, not
figuring out what to analyze.

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
Thus, our algorithm is optimal.


New Models
~~~~~~~~~~

New model #1: We can move a stack of disks in one move.
This is a big help! :math:`O(n)` or even :math:`O(1)`.

New model #2: Not all disks start on Pole A.
This doesn't seem to change the cost of the problem. (Why?)

Combining these two things, the cost looks to be :math:`O(n)`.

New model #3: Different numbers of poles.

New model #4: We want to know what the :math:`k` th move is.


Putting it all Together
~~~~~~~~~~~~~~~~~~~~~~~

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

Which brings us back to the argument that we used to justify our lower
bound for Towers of Hanoi.
This is essentially an argument about necessary behavior.
Towers of Hanoi is rather rare in that we do have some specific
behavior that we know must happen.
In this particular case the problem is so constrained
that there really is no (better) alternative to this particular
sequence of events.
This approach will not work for most problems.

Does our "problem solving algorithm" always terminate?
No.
You might get stuck in a loop if you go through and make no
progress.
So, is it an algorithm?

.. [#] This is a minor reformulation of the "algorithm" given by
       Gregory J.E. Rawlins in his book *Compared to What?*

.. odsascript:: AV/RecurTutor/TOHfigCON.js
