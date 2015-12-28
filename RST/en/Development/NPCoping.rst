.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :topic: NP-completeness

Coping with NP-Complete Problems
================================

Finding that your problem is NP-complete might not mean
that you can just forget about it.
Traveling salesmen need to find reasonable sales routes regardless of
the complexity of the problem.
What do you do when faced with an NP-complete problem that you must
solve?

There are several techniques to try.
One approach is to run only small instances of the problem.
For some problems, this is not acceptable.
For example, TRAVELING SALESMAN grows so quickly that it cannot be
run on modern computers for problem sizes much over 30 cities, which
is not an unreasonable problem size for real-life situations.
However, some other problems in NP, while requiring exponential
time, still grow slowly enough that they allow solutions for
problems of a useful size.

Consider the
:ref:`Knapsack problem <knapsack problem> <DynamicProgramming>`.
We have a
:ref:`dynamic programming <dynamic programming> <DynamicProgramming>`
algorithm whose cost is :math:`\Theta(nK)` for :math:`n` objects being
fit into a knapsack of size :math:`K`. 
But it turns out that Knapsack is NP-complete.
Isn't this a contradiction?
Not when we consider the relationship between :math:`n` and
:math:`K`.
How big is :math:`K`?
Input size is typically :math:`O(n \lg K)` because the item sizes are
smaller than :math:`K`.
Thus, :math:`\Theta(nK)` is exponential on input size.

This dynamic programming algorithm is tractable if the numbers are
"reasonable".
That is, we can successfully find solutions to the problem when
:math:`nK` is in the thousands.
Such an algorithm is called a :term:`pseudo-polynomial` time
algorithm.
This is different from TRAVELING SALESMAN which cannot possibly be
solved when :math:`n = 100` given current algorithms.

A second approach to handling NP-complete problems is to solve a
special instance of the problem that is not so hard.
For example, many problems on graphs are NP-complete, but the same
problem on certain restricted types of graphs is not as difficult.
For example, while the VERTEX COVER
and K-CLIQUE problems are
NP-complete in general, there are polynomial time
solutions for bipartite graphs (i.e., graphs whose vertices can be
separated into two subsets such that no pair of vertices within one
of the subsets has an edge between them).
2-SATISFIABILITY (where every clause in a Boolean expression has at
most two literals) has a polynomial time
solution.
Several geometric problems require only polynomial time in two
dimensions, but are \NP-complete in three dimensions or more.
KNAPSACK is considered to run in polynomial time if the numbers
(and :math:`K`) are "small".
Small here means that they are polynomial on :math:`n`,
the number of items.

In general, if we want to guarantee that we get the correct answer for
an NP-complete problem, we potentially need to examine all of the 
(exponential number of) possible solutions.
However, with some organization, we might be able to either examine
them quickly, or avoid examining a great many of the possible answers
in some cases.
For example,
:ref:`dynamic programming <dynamic programming> <DynamicProgramming>`
attempts to organize the processing of all the subproblems to a
problem so that the work is done efficiently.

If we need to do a brute-force search of the entire solution space, we
can use :term:`backtracking` to visit all of the possible solutions
organized in a solution tree.
For example, SATISFIABILITY has :math:`2^n` possible ways to assign
truth values to the :math:`n` variables contained in the Boolean
expression being satisfied.
We can view this as a tree of solutions by considering that we have a
choice of making the first variable TRUE or FALSE.
Thus, we can put all solutions where the first variable is TRUE on
one side of the tree, and the remaining solutions on the other.
We then examine the solutions by moving down one branch of the tree,
until we reach a point where we know the solution cannot be correct
(such as if the current partial collection of assignments yields an
unsatisfiable expression).
At this point we backtrack and move back up a node in the tree, and
then follow down the alternate branch.
If this fails, we know to back up further in the tree as necessary and
follow alternate branches, until finally we either find a solution
that satisfies the expression or exhaust the
tree.
In some cases we avoid processing many potential solutions, or find a
solution quickly.
In others, we end up visiting a large portion of the :math:`2^n`
possible solutions.

:term:`Banch-and-Bounds` is an extension of backtracking that applies
to :term:`optimization problems` such as TRAVELING SALESMAN where we
are trying to find the shortest tour through the
cities.
We traverse the solution tree as with backtracking.
However, we remember the best value found so far.
Proceeding down a given branch is equivalent to deciding which order
to visit cities.
So any node in the solution tree represents some collection of cities
visited so far.
If the sum of these distances exceeds the best tour found so far, then
we know to stop pursuing this branch of the tree.
At this point we can immediately back up and take another branch.
If we have a quick method for finding a good (but not necessarily
best) solution, we can use this as an initial bound value to
effectively prune portions of the tree.

Another coping strategy is to find an approximate solution to the
problem.
There are many approaches to finding approximate solutions.
One way is to use a :term:`heuristic` to solve the problem, that is,
an algorithm based on a "rule of thumb" that does not always give the
best answer.
For example, the TRAVELING SALESMAN problem can be solved
approximately by using the heuristic that we start at an arbitrary
city and then always proceed to the next unvisited city that is
closest.
This rarely gives the shortest path, but the solution might be good
enough.
There are many other heuristics for TRAVELING SALESMAN that do a
better job.

Some approximation algorithms have guaranteed performance,
such that the answer will be within a certain
percentage of the best possible answer.
For example, consider this simple heuristic for the VERTEX COVER
problem:
Let :math:`M` be a maximal (not necessarily maximum) :term:`matching`
in :math:`G`.
A matching pairs vertices (with connecting edges) so that no
vertex is paired with more than one partner.
Maximal means to pick as many pairs as possible, selecting them in
some order until there are no more available pairs to select.
Maximum means the matching that gives the most pairs possible for a
given graph.
If OPT is the size of a minimum vertex cover, then
:math:`|M| \leq 2 \cdot \mbox{OPT}`
because at least one endpoint of every matched edge must be in
*any* vertex cover.

A better example of a guaranteed bound on a solution comes
from simple heuristics to solve the BIN PACKING
problem.

.. topic: BIN PACKING

   **Input:** Numbers \(x_1, x_2, ..., x_n\) between 0 and
   1, and an unlimited supply of bins of size 1
   (no bin can hold numbers whose sum exceeds 1).

   **Output</b>** An assignment of numbers to bins that
   requires the fewest possible bins.

BIN PACKING in its decision form (i.e., asking if the items can be
packed in less than :math:`k` bins) is known to be NP-complete.
One simple heuristic for solving this problem is to use a
"first fit" approach.
We put the first number in the first bin.
We then put the second number in the first bin if it fits, otherwise
we put it in the second bin.
For each subsequent number, we simply go through the bins in the order
we generated them and place the number in the first bin that fits.
The number of bins used is no more than twice the sum of the
numbers, because every bin (except perhaps one) must be at least half
full.
However, this "first fit" heuristic can give us a result that is
much worse than optimal.
Consider the following collection of numbers: 6 of
:math:`1/7 + \epsilon`, 6 of :math:`1/3 + \epsilon`,
and 6 of :math:`1/2 + \epsilon`, where
:math:`\epsilon` is a small, positive number.
Properly organized, this requires 6 bins.
But if done wrongly, we might end up putting the numbers into 10 bins.

A better heuristic is to use decreasing first fit.
This is the same as first fit, except that we keep the bins sorted
from most full to least full.
Then when deciding where to put the next item, we place it in the
fullest bin that can hold it.
This is similar to the :ref:`best fit <best fit> <BestFit>` heuristic
for :ref:`memory management <dynamic memory allocation> <Dynamic>`.
The significant thing about this heuristic is not just that it tends
to give better performance than simple first fit.
This decreasing first fit heuristic 
can be proven to require no more than 11/9 the optimal number
of bins.
Thus, we have a guarantee on how much inefficiency can result when
using the heuristic.

The theory of NP-completeness gives a technique for separating
tractable from (probably) intractable problems.
When faced with a new problem, we might alternate between
checking if it is tractable (that is, we try to find a polynomial-time
solution) and checking if it is intractable (we try to prove the
problem is NP-complete).
While proving that some problem is NP-complete does not actually make
our upper bound for our algorithm match the lower bound for the
problem with certainty, it is nearly as good.
Once we realize that a problem is NP-complete, then we know that our
next step must either be to redefine the problem to make it easier, or
else use one of the "coping" strategies discussed in this section.
