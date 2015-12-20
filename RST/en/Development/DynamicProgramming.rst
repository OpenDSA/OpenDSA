.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :topic: Dynamic Programming

Dynamic Programming
===================

Computing Fibonnaci Numbers
---------------------------

Consider the recursive function for computing the :math:`n`'th
Fibonacci number.

.. codeinclude:: Misc/Fibonnaci 
   :tag: FibR

The cost of this algorithm (in terms of function calls) is the size of
the :math:`n`'th Fibonacci number itself, which our analysis of
Module :ref`summation <summation> <Summation>` showed to be exponential
(approximately :math:`1.62^n` ). 
Why is this so expensive?
Primarily because two recursive calls are made by the
function, and the work that they do is largely redundant.
That is, each of the two calls is recomputing most of the series, as
is each sub-call, and so on.
Thus, the smaller values of the function are being recomputed a huge
number of times.
If we could eliminate this redundancy, the cost would be greatly
reduced.
The approach that we will use can also improve any algorithm that
spends most of its time recomputing common subproblems.

One way to accomplish this goal is to keep a table of values, and
first check the table to see if the computation can be avoided.
Here is a straightforward example of doing so.

.. codeinclude:: Misc/Fibonnaci 
   :tag: FibRT

This version of the algorithm will not compute a value more than once,
so its cost should be linear.
Of course, we didn't actually need to use a table storing all of the
values, since future computations do not need access to all prior
subproblems.
Instead, we could build the value by working from 0 and 1 up to
:math:`n` rather than backwards from :math:`n` down to 0 and 1.
Going up from the bottom we only need to store the previous two values
of the function, as is done by our iterative version.

.. codeinclude:: Misc/Fibonnaci 
   :tag: FibI

Recomputing of subproblems comes up in many algorithms.
It is not so common that we can store only a few prior results as we
did for ``fibi``.
Thus, there are many times where storing a complete table of
subresults will be useful.

This approach to designing an algorithm that works by storing a table
of results for subproblems is called :term:`dynamic programming`.
The name is somewhat arcane, because it doesn't bear much obvious
similarity to the process that is taking place when storing subproblems
in a table.
However, it comes originally from the field of dynamic control
systems, which got its start before what we think of as computer
programming.
The act of storing precomputed values in a table for later reuse is
referred to as "programming" in that field.

Dynamic programming is a powerful alternative to the standard
principle of divide and conquer.
In divide and conquer, a problem is split into subproblems, the
subproblems are solved (independently), and then recombined into a
solution for the problem being solved.
Dynamic programming is appropriate whenever
(1) subproblems are solved repeatedly,
and (2) we can find a suitable way of doing the necessary
bookkeeping.
Dynamic programming algorithms are usually not implemented by simply
using a table to store subproblems for recursive calls (i.e., going
backwards as is done by ``fibrt``).
Instead, such algorithms are typically implemented by building the
table of subproblems from the bottom up.
Thus, ``fibi`` better represents the most common form of dynamic
programming than does ``fibrt``, even though it doesn't use the
complete table.

The Knapsack Problem
--------------------

We will next consider a problem that appears with many variations in a
variety of commercial settings.
Many businesses need to package items with the greatest efficiency.
One way to describe this basic idea is in terms of packing items into
a knapsack, and so we will refer to this as the Knapsack Problem.
We will first define a particular formulation of the knapsack problem,
and then we will discuss an algorithm to solve it based on dynamic
programming.
There are many other versions for the problem

Assume that we have a knapsack with a certain amount of space that we
will define using integer value :math:`K`.
We also have :math:`n` items each with a certain size such that
that item :math:`i` has integer size :math:`k_i`.
The problem is to find a subset of the :math:`n` items whose sizes
exactly sum to :math:`K`, if one exists.
For example, if our knapsack has capacity :math:`K = 5` and the two
items are of size :math:`k_1 = 2` and :math:`k_2 = 4`,
then no such subset exists.
But if we add a third item of size :math:`k_3 = 1`,
then we can fill the knapsack exactly with the second and third
items.
We can define the problem more formally as:
Find :math:`S \subset \{1, 2, ..., n\}` such that

.. math::

   \sum_{i \in S} k_i = K.

.. topic:: Example

   Assume that we are given a knapsack of size :math:`K = 163` and
   10 items of sizes 4, 9, 15, 19, 27, 44, 54, 68, 73, 101.
   Can we find a subset of the items that exactly fills the knapsack?
   You should take a few minutes and try to do this before reading on
   and looking at the answer.

   One solution to the problem is: 19, 27, 44, 73.

.. topic:: Example

   Having solved the previous example for knapsack of size 163, how
   hard is it now to solve for a knapsack of size 164?
   Try it.

   Unfortunately, knowing the answer for 163 is of almost no use at
   all when solving for 164.
   One solution is: 9, 54, 101.


If you tried solving these examples, you probably found yourself doing
a lot of trial-and-error and a lot of backtracking.
To come up with an algorithm, we want an organized way to go through
the possible subsets.
Is there a way to make the problem smaller, so that we can apply
divide and conquer?
We essentially have two parts to the input: The knapsack size
:math:`K` and the :math:`n` items.
It probably will not do us much good to try and break the knapsack
into pieces and solve the sub-pieces (since we already saw that
knowing the answer for a knapsack of size 163 did nothing to help us
solve the problem for a knapsack of size 164).

So, what can we say about solving the problem with or without the
:math:`n`'th item?
This seems to lead to a way to break down the problem.
If the :math:`n`'th item is not needed for a solution (that is, if we
can solve the problem with the first :math:`n-1` items) then we can
also solve the problem when the :math:`n`'th item is available
(we just ignore it). 
On the other hand, if we do include the :math:`n`'th item as a member
of the solution subset, then we now would need to solve the problem
with the first :math:`n-1` items and a knapsack of size
:math:`K - k_n` (since the :math:`n`'th
item is taking up :math:`k_n` space in the knapsack).

To organize this process, we can define the problem in terms of
two parameters: the knapsack size :math:`K` and the number of items
:math:`n`. 
Denote a given instance of the problem as :math:`P(n, K)`.
Now we can say that :math:`P(n, K)` has a solution if and only if
there exists a solution for either :math:`P(n-1, K)` or
:math:`P(n-1, K-k_n)`.
That is, we can solve :math:`P(n, K)` only if we can solve one of the
sub problems where we use or do not use the :math:`n` th item.
Of course, the ordering of the items is arbitrary.
We just need to give them some order to keep things straight.

Continuing this idea, to solve any subproblem of size :math:`n-1`,
we need only to solve two subproblems of size :math:`n-2`.
And so on, until we are down to only one item that either fills the
knapsack or not.
This naturally leads to a cost expressed by the recurrence relation 
:math:`\mathbf{T}(n) = 2\mathbf{T}(n-1) + c = \Theta(2^n)`.
That can be pretty expensive!

But... we should quickly realize that there are only :math:`n(K+1)`
subproblems to solve!
Clearly, there is the possibility that many subproblems are being
solved repeatedly.
This is a natural opportunity to apply dynamic programming.
We simply build an array of size :math:`n \times K+1` to contain the
solutions for all subproblems
:math:`P(i, k), 1 \leq i \leq n, 0 \leq k \leq K`. 

There are two approaches to actually solving the problem.
One is to start with our problem of size :math:`P(n, K)` and make
recursive calls to solve the subproblems, each time checking the array
to see if a subproblem has been solved, and filling in the
corresponding cell in the array whenever we get a new subproblem
solution.
The other is to start filling the array for row 1 (which indicates a
successful solution only for a knapsack of size :math:`k_1`).
We then fill in the succeeding rows
from :math:`i=2` to :math:`n`, left to right, as follows.


| **if** :math:`P(n-1, K)` has a solution,
|   **then** :math:`P(n, K)` has a solution
|   **else if** :math:`P(n-1, K-k_n)` has a solution
|     **then** :math:`P(n, K)` has a solution
|     **else** :math:`P(n, K)` has no solution.

In other words, a new slot in the array gets its solution by looking
at two slots in the preceding row.
Since filling each slot in the array takes constant time, the total
cost of the algorithm is :math:`\Theta(nK)`.

.. topic:: Example

   Solve the Knapsack Problem for :math:`K = 10` and five items with
   sizes 9, 2, 7, 4, 1. 
   We do this by building the following array.

   .. math::

      \begin{array}{l|ccccccccccc}
      &0&1&2&3&4&5&6&7&8&9&10\\
      \hline
      k_1\!=\!9&O&-&-&-&-&-&-&-&-&I&-\\
      k_2\!=\!2&O&-&I&-&-&-&-&-&-&O&-\\
      k_3\!=\!7&O&-&O&-&-&-&-&I&-&I/O&-\\
      k_4\!=\!4&O&-&O&-&I&-&I&O&-&O&-\\
      k_5\!=\!1&O&I&O&I&O&I&O&I/O&I&O&I
      \end{array}


   | Key:
   |   -:  No solution for :math:`P(i, k)`.
   |   O: Solution(s) for :math:`P(i, k)` with :math:`i` omitted.
   |   I: Solution(s) for :math:`P(i, k)` with :math:`i` included.
   |   I/O: Solutions for :math:`P(i, k)` with :math:`i` included AND omitted.

   For example, :math:`P(3, 9)` stores value I/O.
   It contains O because :math:`P(2, 9)` has a solution.
   It contains I because :math:`P(2,2) = P(2, 9-7)` has a solution.
   Since :math:`P(5, 10)` is marked with an I, it has a solution.
   We can determine what that solution actually is by recognizing that
   it includes the 5th item (of size 1), which then leads us to look at
   the solution for :math:`P(4, 9)`.
   This in turn has a solution that omits the 4th item,
   leading us to :math:`P(3, 9)`.
   At this point, we can either use the third item or not.
   We can find a solution by taking one branch.
   We can find all solutions by following all branches when there is a
   choice.
