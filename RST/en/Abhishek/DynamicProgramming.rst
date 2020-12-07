.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer, Abhishek Jha, and Angel Velazquez
   :topic: Dynamic Programming

Dynamic Programming
===================

Dynamic Programming
-------------------

Dynamic programming is an algorithm design technique that can improve
the efficiency of any inherently recursive algorithm that repeatedly
re-solves the same subproblems.
Using dynamic programming requires two steps:

#. You find a recursive solution to a problem where subproblems are
   redundantly solved many times.
#. Optimize the recursive algorithm to eliminate re-solving
   subproblems.
   The resulting algorithm may be recursive or iterative.
   The iterative form is commonly referred to by the term dynamic
   programming.

We will see first how to remove redundancy with a simple problem,
computing Fibonacci numbers.
Then we introduce the knapsack problem, and show how it can be
solved efficiently with dynamic programming.

Computing Fibonacci Numbers
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Consider the recursive function for computing the :math:`n`'th
Fibonacci number.

.. codeinclude:: Misc/Fibonnaci 
   :tag: FibR

The cost of this recursive algorithm (in terms of function calls) is
the size of the :math:`n`'th Fibonacci number itself, which is
exponential on :math:`n` (approximately :math:`1.62^n` ).
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

The following slideshow explains the redundancy problem.

.. inlineav:: FibTreeCON ss
   :links:   /AV/Abhishek/FibTreeCON.css
   :scripts: /AV/Abhishek/FibTreeCON.js
   :align: center
   :output: show

Looking at the final tree, we see that there are only seven unique
subproblems to solve (for Fibonacci values 0 through 6).
The graphical representation below is called a dependency graph, and
shows the dependencies for the subproblems.

.. inlineav:: FibGraphCON dgm
   :links:   /AV/Abhishek/FibGraphCON.css
   :scripts: /AV/Abhishek/FibGraphCON.js
   :align: center
   :output: show

Note that the dependency graph was laid out on in a one dimensional
table of size seven, corresponding to the unique subproblems invoked
by the algorithm.
This table can simply store the value of each subproblem.
In this way, redundant calls can be avoided because the value of a
subproblem which was previously computed can be read from its
corresponding cell in the table without the need to recompute it
again. 

The table can be used to derive two alternative, but efficient,
algorithms.
One way to accomplish this goal is to keep a table of values, and
first check the table to see if the computation can be avoided.
This technique is called :term:`memoization`.
Here is a straightforward example of doing so.
Note that it mirrors the original version of the Fibonacci recursive
algorithm.

.. codeinclude:: Misc/Fibonnaci 
   :tag: FibRT

This version of the algorithm will not compute a value more than once,
so its cost is linear.
The corresponding recursion tree is shown below.
Note that the first occurrence of each recursive call invokes
two recursive calls.
However, subsequent occurrences of such a call do
not produce additional calls because they just read the contents of
its corresponding cell.

.. TODO::
   :type: Figure

   Put the figure here that was specified in the original document
   (top of the 3rd page), showing the recursion tree.

A second technique is called :term:`tabulation`.
The dependency graph must be analyzed to infer an alternative
computation order for the subproblems.
The only restriction is that a subproblem can only be
computed when the subproblems it depends on have been computed.
In addition, the value of each subproblem must be stored in the table.
In the case of computing a value in the Fibonacci series,
we reverse the order to calculate the series from the starting point,
and implement this  by a simple loop.
Unfortunately, since it does not have any similarity to the original
recursive algorithm, there is no mechanical way to get from the
original recursive form to the dynamic programming form.

An additional optimization can be made.
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

The approach shown above to designing an algorithm that works by
storing a table of results for subproblems is called
:term:`dynamic programming` when it is applied to optimization
algorithms.
The name is somewhat arcane, because it doesn't bear much obvious
similarity to the process that is taking place when storing subproblems
in a table.
However, it comes originally from the field of dynamic control
systems, which got its start before what we think of as computer
programming.
The act of storing precomputed values in a table for later reuse is
referred to as "programming" in that field.
Dynamic programming algorithms are usually implemented with the
tabulation technique described above.
Thus, ``fibi`` better represents the most common form of dynamic
programming than does ``fibrt``, even though it doesn't use the
complete table.

The Knapsack Problem
~~~~~~~~~~~~~~~~~~~~

We will next consider a problem that appears with many variations in a
variety of commercial settings.
Many businesses need to package items with the greatest efficiency.
One way to describe this basic idea is in terms of packing items into
a knapsack, and so we will refer to this as the
:term:`Knapsack Problem <knapsack problem>`.
We will first define a particular formulation of the knapsack problem,
and then we will discuss an algorithm to solve it based on dynamic
programming.
There are many other versions for the problem.
Some versions ask for the greatest amount that will fit, others
introduce values to the items along with size.
We will look at a fairly easy to understand variation.

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
recursion?
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

Continuing this idea, to solve any subproblem of size :math:`n-1`,
we need only to solve two subproblems of size :math:`n-2`.
And so on, until we are down to only one item that either fits the
knapsack or not.
Assuming that :math:`P(i, S)` represents the problem for object i and
after, and with size s still free in the knapsack, the following
algorithm expresses the ideas.

| **if** :math:`P(n-1, K)` has a solution,
|   **then** :math:`P(n, K)` has a solution
|   **else if** :math:`P(n-1, K-k_n)` has a solution
|     **then** :math:`P(n, K)` has a solution
|     **else** :math:`P(n, K)` has no solution.

Although this algorithm is correct, it naturally leads to a cost
expressed by the recurrence relation
:math:`\mathbf{T}(n) = 2\mathbf{T}(n-1) + c = \Theta(2^n)`.
That can be pretty expensive!

But... we should quickly realize that there are only :math:`n(K+1)`
subproblems to solve!
Clearly, there is the possibility that many subproblems are being
solved repeatedly.
This is a natural opportunity to apply dynamic programming.
If we draw the recursion tree of this naive recursive algorithm and
derive its corresponding dependency graph, we notice that all the
recursive calls can be laid out on
an array of size :math:`n \times K+1` to contain the
solutions for all subproblems
:math:`P(i, k), 0 \leq i \leq n-1, 0 \leq k \leq K`. 

.. topic:: Example

   Consider the instance of the Knapsack Problem for :math:`K=10` and five items
   with sizes 9, 2, 7, 4, 1.
   The recursion tree generated by the recursive algorithm follows, where
   each node contains the index of the object under consideration (from 0
   to 4) and the size available of the knapsack.

   .. inlineav:: KnapTreeCON ss
      :links:   /AV/Abhishek/KnapTreeCON.css
      :scripts: /AV/Abhishek/KnapTreeCON.js
      :align: center
      :output: show

   The dependency graph for this problem instance, laid out in a table of
   size :math:`n × K + 1`, follows:

.. inlineav:: KnapGraphCON dgm
   :links:   /AV/Abhishek/KnapGraphCON.css
   :scripts: /AV/Abhishek/KnapGraphCON.js
   :align: center
   :output: show

As mentioned above, there are two approaches to actually solving the
problem.
One is memoization, that is, to start with our problem of size
:math:`P(n, K)` and make recursive calls to solve the subproblems,
each time checking the array 
to see if a subproblem has been solved, and filling in the
corresponding cell in the array whenever we get a new subproblem
solution.
The other is tabulation.
Conceivably we could adopt one of several computation orders,
although the most "natural" is to start filling the array for row 0
(which indicates a successful solution only for a knapsack of size
:math:`k_0`).	
We then fill in the succeeding rows
from :math:`i=1` to :math:`n`.

.. codeinclude:: Dynamic/Knapsack
   :tag: Knapsack

In other words, a new slot in the array gets its solution by looking
at most at two slots in the preceding row.
Since filling each slot in the array takes constant time, the total
cost of the algorithm is :math:`\Theta(nK)`.

.. topic:: Example
   
   Consider again the instance of the Knapsack Problem for K=10 and
   five items with sizes 9, 2, 7, 4, 1.
   A tabulation algorithm will fill a table of size n×K+1 starting
   from object i=0 up to object i=4, filling all the cells in the
   table in a top-down fashion. 

   .. math::

      \begin{array}{l|ccccccccccc}
      &0&1&2&3&4&5&6&7&8&9&10\\
      \hline
      k_0\!=\!9&O&-&-&-&-&-&-&-&-&I&\\
      k_1\!=\!2&O&-&I&-&-&-&-&-&-&O&-\\
      k_2\!=\!7&O&-&O&-&-&-&-&I&-&I/O&-\\
      k_3\!=\!4&O&-&O&-&I&-&I&O&-&O&-\\
      k_4\!=\!1&O&I&O&I&O&I&O&I/O&I&O&I
      \end{array}

   | Key:
   |   -:  No solution for :math:`P(i, k)`.
   |   O: Solution(s) for :math:`P(i, k)` with :math:`i` omitted.
   |   I: Solution(s) for :math:`P(i, k)` with :math:`i` included.
   |   I/O: Solutions for :math:`P(i, k)` with :math:`i` included AND omitted.

   For example, :math:`P(2, 9)` stores value I/O.
   It contains O because :math:`P(1, 9)` has a solution (so, this item
   is not needed along that path).
   It contains I because :math:`P(1,2) = P(1, 9-7)` has a solution
   (so, this item is needed along that path).
   Since :math:`P(4, 10)` is marked with I, it has a solution.
   We can determine what that solution actually is by recognizing that
   it includes :math:`k_4` (of size 1), which then leads us to look at
   the solution for :math:`P(3, 9)`.
   This in turn has a solution that omits :math:`k_3` (of size 4),
   leading us to :math:`P(2, 9)`.
   At this point, we can either use item :math:`k_2` or not.
   We can find a solution by taking one valid path through the table.
   We can find all solutions by following all branches when there is a
   choice.

   Note that the table is first filled with the values of the
   different subproblems, and later we inferred the sequence of
   decisions that allows computing an optimal solution from the values
   stored in the table.
   This last phase of the algorithm precludes the possibility of
   actually reducing the size of the table.
   Otherwise, the table for the knapsack problem could have been
   reduced to a one dimensional array.

Matrix Chain Multiplication 
~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. inlineav:: MatMulCON ss
   :links:   /AV/Abhishek/MatMulCON.css
   :scripts: /AV/Abhishek/MatMulCON.js
   :align: center
   :output: show