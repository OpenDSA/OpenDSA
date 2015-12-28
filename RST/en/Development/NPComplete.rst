.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :topic: NP-completeness

NP-Completeness
===============

Hard Problems
-------------

There are several ways that a problem could be considered hard.
For example, we might have trouble understanding the definition of the
problem itself.
At the beginning of a large data collection and analysis project,
developers and their clients might have only a hazy notion of what
their goals actually are, and need to work that out over time.
For other types of problems, we might have trouble finding or
understanding an algorithm to solve the problem.
Understanding spoken English and translating it to written text is an
example of a problem whose goals are easy to define, but whose
solution is not easy to discover.
But even though a natural language processing algorithm might be
difficult to write, the program's running time might be fairly fast.
There are many practical systems today that solve aspects of this
problem in reasonable time.

None of these is what is commonly meant when a computer
theoretician uses the word "hard".
Throughout this section, "hard" means that the best-known algorithm
for the problem is expensive in its running time.
One example of a hard problem is
:term:`Towers of Hanoi <Towers of Hanoi problem>`.
It is easy to understand this problem and its solution.
It is also easy to write a program to solve this problem.
But, it takes an extremely long time to run for any "reasonably"
large value of :math:`n`.
Try running a program to solve Towers of Hanoi for only 30 disks!

The Towers of Hanoi problem takes exponential time, that is, its
running time is :math:`\Theta(2^n)`.
This is radically different from an algorithm that takes
:math:`\Theta(n \log n)` time or :math:`\Theta(n^2)` time.
It is even radically different from a problem that takes
:math:`\Theta(n^4)` time.
These are all examples of polynomial running time, because the
exponents for all terms of these equations are constants.
If we buy a new computer that runs twice as fast,
the size of problem with complexity :math:`\Theta(n^4)` that we can
solve in a certain amount of time is increased by the fourth root of
two.
In other words, there is a multiplicative factor increase, even if it
is a rather small one.
This is true for any algorithm whose running time can be represented
by a polynomial.

Consider what happens if you buy a computer that is twice as fast and
try to solve a bigger Towers of Hanoi problem in a given amount of
time.
Because its complexity is :math:`\Theta(2^n)`, we can solve a problem
only one disk bigger!
There is no multiplicative factor, and this is true for any
exponential algorithm:
A constant factor increase in processing
power results in only a fixed addition in problem-solving power.

There are a number of other fundamental differences between
polynomial running times and exponential running times that argues for
treating them as qualitatively different.
Polynomials are closed under composition and addition.
Thus, running polynomial-time programs in sequence, or having one
program with polynomial running time call another a polynomial number
of times yields polynomial time.
Also, all computers known are polynomially related.
That is, any program that runs in polynomial time on any computer
today, when transferred to any other computer, will still run in
polynomial time.

There is a practical reason for recognizing a distinction.
In practice, most polynomial time algorithms are "feasible" in that
they can run reasonably large inputs in reasonable time.
In contrast, most algorithms requiring exponential time are not
practical to run even for fairly modest sizes of input.
One could argue that a program with high polynomial degree
(such as :math:`n^{100}`) is not practical, while an exponential-time
program with cost :math:`1.001^n` is practical.
But the reality is that we know of almost no problems where the best
polynomial-time algorithm has high degree (they nearly all have
degree four or less), while almost no exponential-time algorithms
(whose cost is :math:`(O(c^n))` have their constant :math:`c` close to
one.
So there is not much gray area between polynomial and
exponential time algorithms in practice.

For the purposes of this Module, we define a :term:`hard algorithm`
to be one that runs in exponential time, that is, in
:math:`\Omega(c^n)` for some constant :math:`c > 1`.
A definition for a hard *problem* will be presented soon.

The Theory of NP-Completeness
-----------------------------

Imagine a magical computer that works by guessing the correct
solution from among all of the possible solutions to a problem.
Another way to look at this is to imagine a super parallel computer
that could test all possible solutions simultaneously.
Certainly this magical (or highly parallel) computer can do anything a
normal computer can do.
It might also solve some problems more quickly than a normal computer
can.
Consider some problem where, given a guess for a solution, checking
the solution to see if it is correct can be done in polynomial time.
Even if the number of possible solutions is exponential,
any given guess can be checked in polynomial time (equivalently, all
possible solutions are checked simultaneously in polynomial time),
and thus the problem can be solved in polynomial time by our
hypothetical magical computer.
Another view of this concept is this: If you cannot get the answer
to a problem in polynomial time by guessing the right answer and then
checking it, then you cannot do it in polynomial time in any other way.

The idea of "guessing" the right answer to a problem |---| or checking
all possible solutions in parallel to determine which is correct |---|
is a called a :term:`non-deterministic choice`.
An algorithm that works in this manner is called a
:term:`non-deterministic algorithm`,
and any problem with an algorithm that runs on a non-deterministic
machine in polynomial time is given a special name:
It is said to be a problem in NP.
Thus, problems in NP are those problems that can be solved
in polynomial time on a non-deterministic machine.

Not all problems requiring exponential time on a regular
computer are in NP.
For example, Towers of Hanoi is *not* in NP, because it must
print out :math:`O(2^n)` moves for :math:`n` disks.
A non-deterministic machine cannot "guess" and print the correct
answer in less time.

On the other hand, consider the TRAVELING SALESMAN problem.

.. topic:: Problem

   TRAVELING SALESMAN (1)

   **Input:** A complete, directed graph :math:`G` with
   positive distances assigned to each edge in the graph.

   **Output:** The shortest simple cycle that includes every vertex.

Figure :num:`Figure #Sales` illustrates this problem.
Five vertices are shown, with edges and associated costs between each
pair of edges.
(For simplicity Figure :num:`Figure #Sales` shows an undirected graph,
assuming that the cost is the same in both
directions, though this need not be the case.)
If the salesman visits the cities in the order ABCDEA, he will travel
a total distance of 13.
A better route would be ABDCEA, with cost 11.
The best route for this particular graph would be ABEDCA, with cost 9.

.. _Sales:

.. odsafig:: Images/Sales.png
   :width: 175
   :alt: Illustration of the TRAVELING SALESMAN problem
   :capalign: justify
   :figwidth: 90%
   :align: center

   An illustration of the TRAVELING SALESMAN problem.
   Five vertices are shown, with edges between each pair of cities.
   The problem is to visit all of the cities exactly once,
   returning to the start city, with the least total cost.

We cannot solve this problem in polynomial time with a guess-and-test
non-deterministic computer.
The problem is that, given a candidate cycle, while we can quickly
check that the answer is indeed a cycle of the appropriate form,
and while we can quickly calculate the length of the cycle,
we have no easy way of knowing if it is in fact the <em>shortest</em>
such cycle.
However, we can solve a variant of this problem cast in the form
of a :term:`decision problem`.
A decision problem is simply one whose answer is either YES or NO.
The decision problem form of TRAVELING SALESMAN is as follows.

.. topic:: Problem

   TRAVELING SALESMAN (2)

   **Input:** A complete, directed graph :math:`G` with
   positive distances assigned to each edge in the graph, and an
   integer :math:`k`.

   **Output:** YES if there is a simple cycle with total
   distance :math:`\leq k` containing every vertex in :math:`G`,
   and NO otherwise.

We can solve this version of the problem in polynomial time with a
non-deterministic computer.
The non-deterministic algorithm simply checks all of the possible
subsets of edges in the graph, in parallel.
If any subset of the edges is an appropriate cycle of total length
less than or equal to :math:`k`, the answer is YES; otherwise the
answer is NO.
Note that it is only necessary that *some* subset meet the
requirement; it does not matter how many subsets fail.
Checking a particular subset is done in polynomial time by adding the
distances of the edges and verifying that the edges form a cycle that
visits each vertex exactly once.
Thus, the checking algorithm runs in polynomial time.
Unfortunately, there are :math:`2^{|{\mathrm E}|}` subsets to check,
so this algorithm cannot be converted to a polynomial time algorithm
on a regular computer.
Nor does anybody in the world know of any other polynomial time
algorithm to solve TRAVELING SALESMAN on a regular computer, despite
the fact that the problem has been studied extensively by many
computer scientists for many years.

It turns out that there is a large collection of
problems with this property:
We know efficient non-deterministic algorithms, but we do not know if
there are efficient deterministic algorithms.
At the same time, we have not been able to prove that any of these
problems do *not* have efficient deterministic algorithms.
This class of problems is called :term:`NP-complete`.
What is truly strange and fascinating about NP-complete problems is
that if anybody ever finds the solution to any one of them that runs
in polynomial time on a regular computer, then by a series of
reductions, every other problem that is in NP can also be
solved in polynomial time on a regular computer!

Define a problem to be :term:`NP-hard` if *any* problem in NP
can be reduced to :math:`X` in polynomial time.
Thus, :math:`X` is *as hard as* any problem in NP.
A problem :math:`X` is defined to be NP-complete if

#. :math:`X` is in NP, and
#. :math:`X` is NP-hard.

The requirement that a problem be NP-hard might seem to be impossible,
but in fact there are hundreds of such problems,
including TRAVELING SALESMAN. 
Another such problem is called K-CLIQUE.

.. topic:: Problem

   K-CLIQUE

   **Input:** An arbitrary undirected graph :math:`G` and an
   integer :math:`k`.

   **Output:** YES if there is a complete subgraph of at
   least :math:`k` vertices, and NO otherwise.

.. avembed:: AV/Development/clique.html ss

Nobody knows whether there is a polynomial time solution for
K-CLIQUE, but if such an algorithm is found for K-CLIQUE *or*
for TRAVELING SALESMAN, then that solution can be modified to solve
the other, or any other problem in NP, in polynomial time.

The primary theoretical advantage of knowing that a problem P1 is
NP-complete is that it can be used to show that another problem
P2 is NP-complete.
This is done by finding a polynomial time reduction of
P1 to P2.
Because we already know that all problems in NP can be reduced to P1
in polynomial time (by the definition of NP-complete), we now know
that all problems can be reduced to P2 as well by the simple algorithm
of reducing to P1 and then from there reducing to P2.

There is a practical advantage to knowing that a problem is
NP-complete.
It relates to knowing that if a polynomial time solution can be found
for *any* problem that is NP-complete, then a polynomial
solution can be found for *all* such problems.
The implication is that, 

#. Because no one has yet found such a solution,
   it must be difficult or impossible to do; and

#. Effort to find a polynomial time solution for one
   NP-complete problem can be considered to have been expended for all
   NP-complete problems.

How is NP-completeness of practical significance for typical
programmers?
Well, if your boss demands that you provide a fast algorithm to solve
a problem, she will not be happy if you come back saying that the
best you could do was an exponential time algorithm.
But, if you can prove that the problem is NP-complete, while she
still won't be happy, at least she should not be mad at you!
By showing that her problem is NP-complete, you are in effect saying
that the most brilliant computer scientists for the last 50 years
have been trying and failing to find a polynomial time algorithm for
her problem.

Problems that are solvable in polynomial time on a regular computer
are said to be in class P.
Clearly, all problems in P are solvable in polynomial time on a
non-deterministic computer simply by neglecting to use the
non-deterministic capability.
Some problems in NP are NP-complete.
We can consider all problems solvable in exponential time or better as
an even bigger class of problems because all problems solvable in
polynomial time are solvable in exponential time.
Thus, we can view the world of exponential-time-or-better problems in
terms of Figure :num:`Figure #Complex`.

.. _Complex:

.. odsafig:: Images/Complex.png
   :width: 400
   :alt: The world of exponential time problems
   :capalign: justify
   :figwidth: 90%
   :align: center

   Our knowledge regarding the world of problems requiring exponential
   time or less.
   Some of these problems are solvable in polynomial time by a
   non-deterministic computer.
   Of these, some are known to be NP-complete, and some are known to be
   solvable in polynomial time on a regular computer.

The most important unanswered question in theoretical computer
science is whether :math:`P = NP`.
If they are equal, then there is a polynomial time
algorithm for TRAVELING SALESMAN and all related problems.
Because TRAVELING SALESMAN is known to be NP-complete, if a
polynomial time algorithm were to be found for this problem, then
*all* problems in NP would also be solvable in polynomial
time.
Conversely, if we were able to prove that TRAVELING SALESMAN has an
exponential time lower bound, then we would know that
:math:`P \neq NP`.

NP-Completeness Proofs
----------------------

To start the process of being able to prove problems are NP-complete,
we need to prove just one problem :math:`H` is NP-complete.
After that, to show that any problem :math:`X` is NP-hard, we just
need to reduce :math:`H` to :math:`X`.
When doing NP-completeness proofs, it is very important not to get
this reduction backwards!
If we reduce candidate problem :math:`X` to known hard problem
:math:`H`, this means that we use :math:`H` as a step to solving
:math:`X`.
All that means is that we have found a (known) hard way to
solve :math:`X`.
However, when we reduce known hard problem :math:`H` to candidate
problem :math:`X`, that means we are using :math:`X` as a step to
solve :math:`H`.
And if we know that :math:`H` is hard, that means :math:`X` must also
be hard (because if :math:`X` were not hard, then neither would
:math:`H` be hard).

So a crucial first step to getting this whole theory off the ground is
finding one problem that is NP-hard.
The first proof that a problem is NP-hard (and because it is in NP,
therefore NP-complete) was done by Stephen Cook.
For this feat, Cook won the first Turing award, which is the closest
Computer Science equivalent to the Nobel Prize.
The "grand-daddy" NP-complete problem that Cook used is call
SATISFIABILITY (or SAT for short).

A :term:`Boolean expression` includes Boolean variables combined
using the operators AND (:math:`\cdot`), OR (:math:`+`), and NOT
(to negate Boolean variable :math:`x` we write :math:`\overline{x}`).
A :term:`literal` is a Boolean variable or its negation.
A :term:`clause` is one or more literals OR'ed together.
Let :math:`E` be a Boolean expression over variables
:math:`x_1, x_2, ..., x_n`.
Then we define :term:`Conjunctive Normal Form` (CNF) to be a Boolean
expression written as a series of clauses that are AND'ed together.
For example,

.. math::

   E = (x_5 + x_7 + \overline{x_8} + x_{10}) \cdot (\overline{x_2} + x_3)
   \cdot (x_1 + \overline{x_3} + x_6)

is in CNF, and has three clauses.
Now we can define the problem SAT.

.. topic:: Problem

   SATISFIABILITY (SAT)

   **Input:** A Boolean expression :math:`E` over variables
   :math:`x_1, x_2, ...` in Conjunctive Normal Form.

   **Output:** YES if there is an assignment to the
   variables that makes :math:`E` true, NO otherwise.

Cook proved that SAT is NP-hard.
Explaining Cook's proof is beyond the scope of this course.
But we can briefly summarize it as follows.
Any decision problem :math:`F` can be recast as some language
acceptance problem :math:`L`:

.. math::

   F(I) = \mbox{YES} \Leftrightarrow L(I') = \mbox{ACCEPT}.

That is, if a decision problem :math:`F` yields YES on
input :math:`I`, then there is a language :math:`L` containing 
string :math:`I'` where :math:`I'` is some suitable
transformation of input :math:`I`.
Conversely, if :math:`F` would give answer NO for input :math:`I`,
then :math:`I` 's transformed version :math:`I'` is not in the
language :math:`L`.

Turing machines are a simple model of computation for writing
programs that are language acceptors.
There is a "universal" Turing machine that can take as input a
description for a Turing machine, and an input string, and return the
execution of that machine on that string.
This Turing machine in turn can be cast as a Boolean expression such
that the expression is satisfiable if and only if the Turing machine
yields ACCEPT for that string.
Cook used Turing machines in his proof because they are simple enough
that he could develop this transformation of Turing machines to
Boolean expressions, but rich enough to be able to compute any
function that a regular computer can compute.
The significance of this transformation is that *any* decision
problem that is performable by the Turing machine is transformable to
SAT.
Thus, SAT is NP-hard.

As explained above, to show that a decision problem :math:`X`
is NP-complete, we prove that :math:`X` is in NP (normally easy, and
normally done by giving a suitable polynomial-time, non-deterministic
algorithm) and then prove that :math:`X` is NP-hard.
To prove that :math:`X` is NP-hard, we choose a known NP-complete
problem, say :math:`A`. 
We describe a polynomial-time transformation that takes an
*arbitrary* instance :math:`I` of :math:`A` to an instance
:math:`I'` of :math:`X`.
We then describe a polynomial-time transformation from
:math:`SLN'`to :math:`SLN` such that :math:`SLN` is the solution
for :math:`I`.
The following example provides a model for how an
NP-completeness proof is done.

.. topic:: Problem

   3-SATISFIABILITY (3 SAT)

   **Input:** A Boolean expression E in CNF such that each
   clause contains exactly 3 literals.

   **Output:** YES if the expression can be satisfied, NO
   otherwise.

.. avembed:: AV/Development/sat.html ss

.. topic:: Example

   3 SAT is a special case of SAT.
   Is 3 SAT easier than SAT?
   Not if we can prove it to be NP-complete.

   **Theorem:** 3 SAT is NP-complete.

   **Proof:**

   Prove that 3 SAT is in NP:
   Guess (non-deterministically) truth values for the variables.
   The correctness of the guess can be verified in polynomial time.

   Prove that 3 SAT is NP-hard:
   We need a polynomial-time reduction from SAT to 3 SAT.
   Let :math:`E = C_1 \cdot C_2 \cdot ... \cdot C_k` be any instance
   of SAT.
   Our strategy is to replace any clause :math:`C_i` that does not
   have exactly three literals with a set of clauses each having
   exactly three literals.
   (Recall that a literal can be a variable such as :math:`x`, or the
   negation of a variable such as :math:`\overline{x}`.)
   Let :math:`C_i = x_1 + x_2 + ... + x_j` where :math:`x_1, ..., x_j`
   are literals.

   #. :math:`j = 1`, so :math:`C_i = x_1`.
      Replace :math:`C_i` with :math:`C_i'`:

      .. math::

         (x_1 + y + z) \cdot (x_1 + \overline{y} + z) \cdot
         (x_1 + y + \overline{z}) \cdot (x_1 + \overline{y} +
         \overline{z})

      where :math:`y` and :math:`z` are variables not appearing
      in :math:`E`.
      Clearly, :math:`C_i'` is satisfiable if and only if
      :math:`(x_1)` is satisfiable, meaning that :math:`x_1` is TRUE.

   #. :math:`J = 2`, so :math:`C_i = (x_1 + x_2)`.
      Replace :math:`C_i` with

      .. math::

         (x_1 + x_2 + z) \cdot (x_1 + x_2 + \overline{z})

      where :math:`z` is a new variable not appearing in :math:`E`.
      This new pair of clauses is satisfiable if and only if
      :math:`(x_1 + x_2)` is satisfiable, that is, either :math:`x_1`
      or :math:`x_2` must be true.

   #. :math:`j > 3`.
      Replace :math:`C_i = (x_1 + x_2 + \cdots + x_j)` with

      .. math::

         (x_1 + x_2 + z_1) \cdot (x_3 + \overline{z_1} + z_2) \cdot
         (x_4 + \overline{z_2} + z_3) \cdot ...

      .. math::

         \cdot (x_{j-2} +
         \overline{z_{j-4}} + z_{j-3}) \cdot (x_{j-1} + x_j +
         \overline{z_{j-3}})

      where :math:`z_1, ..., z_{j-3}` are new variables.

   After appropriate replacements have been made for each :math:`C_i`,
   a Boolean expression results that is an instance of 3 SAT.
   Each replacement is satisfiable if and only if the original clause
   is satisfiable.
   The reduction is clearly polynomial time.

   For the first two cases it is fairly easy to see that the original
   clause is satisfiable if and only if the resulting clauses are
   satisfiable.
   For the case were we replaced a clause with more than three literals,
   consider the following.

   #. If :math:`E` is satisfiable, then :math:`E'` is satisfiable:
      Assume :math:`x_m` is assigned TRUE.
      Then assign :math:`z_t, t\leq m-2` as TRUE and
      :math:`z_k, t \geq m-1` as FALSE.
      Then all clauses in Case (3) are satisfied.

   #. If :math:`x_1, x_2, ..., x_j` are all FALSE, then
      :math:`z_1, z_2, ..., z_{j-3}` are all TRUE.
      But then :math:`(x_{j-1} + x_{j-2} + \overline{z_{j-3}})` is FALSE.

Next we define the problem VERTEX COVER for use in further examples.

.. topic:: Problem

   VERTEX COVER:

   **Input:** A graph :math:`G` and an integer :math:`k`.

   **Output:** YES if there is a subset :math:`S` of the
   vertices in :math:`G` of size :math:`k` or less such that every
   edge of :math:`G` has at least one of its endpoints in :math:`S`,
   and NO otherwise.

.. avembed:: AV/Development/vertexcover.html ss

.. topic:: Example

   In this example, we make use of a simple conversion between two graph
   problems.

   **Theorem:** VERTEX COVER is NP-complete.

   **Proof:**

   Prove that VERTEX COVER is in NP:
   Simply guess a subset of the graph and determine in polynomial time
   whether that subset is in fact a vertex cover of size :math:`k` or
   less.

   Prove that VERTEX COVER is NP-hard:
   We will assume that K-CLIQUE is already known to be NP-complete.
   (We will see this proof in the next example.
   For now, just accept that it is true.)

   Given that K-CLIQUE is NP-complete, we need to find a
   polynomial-time transformation from the input to K-CLIQUE to the
   input to VERTEX COVER,
   and another polynomial-time transformation from the output for
   VERTEX COVER to the output for K-CLIQUE.
   This turns out to be a simple matter, given the following
   observation.
   Consider a graph :math:`G` and a vertex cover :math:`S` on
   :math:`G`.
   Denote by :math:`S'` the set of vertices in :math:`G` but not in
   :math:`S`.
   There can be no edge connecting any two vertices in :math:`S'`
   because, if there were, then :math:`S` would not be a vertex
   cover.
   Denote by :math:`G'` the inverse graph for :math:`G`, that is, the
   graph formed from the edges not in :math:`G`.
   If :math:`S` is of size :math:`k`, then :math:`S'` forms a clique
   of size :math:`n - k` in graph :math:`G'`.
   Thus, we can reduce K-CLIQUE to VERTEX COVER simply by converting
   graph :math:`G` to :math:`G'`, and asking if :math:`G'` has a
   VERTEX COVER of size :math:`n-k` or smaller.
   If YES, then there is a clique in :math:`G` of size :math:`k`;
   if NO then there is not.

.. topic:: Example

   So far, our NP-completeness proofs have involved
   transformations between inputs of the same "type", such as from
   a Boolean expression to a Boolean expression or from a graph to a
   graph.
   Sometimes an NP-completeness proof involves a transformation between
   types of inputs, as shown next.

   **Theorem:** K-CLIQUE is NP-complete.

   **Proof:** K-CLIQUE is in NP, because we can just guess a
   collection of :math:`k` 
   vertices and test in polynomial time if it is a clique.
   Now we show that K-CLIQUE is NP-hard by using a reduction
   from SAT.
   An instance of SAT is a Boolean expression

   .. math::

      B = C_1 \cdot C_2 \cdot ... \cdot C_m

   whose clauses we will describe by the notation

   .. math::

      C_i = y[i, 1] + y[i, 2] + ... + y[i, k_i]

   where :math:`k_i` is the number of literals in Clause :math:`c_i`.
   We will transform this to an instance of K-CLIQUE as follows.
   We build a graph

   .. math::

       G = \{v[i, j] | 1 \leq i \leq m, 1 \leq j \leq k_i\},

   that is, there is a vertex in :math:`G` corresponding to
   every literal in Boolean expression :math:`B`.
   We will draw an edge between each pair of vertices
   :math:`v[i_1, j_1]` and :math:`v[i_2, j_2]` unless
   (1) they are two literals within the same clause
   (:math:`i_1 = i_2`) or
   (2) they are opposite values for the same variable
   (i.e., one is negated and the other is not). 
   Set :math:`k = m`.
   Figure :num:`Figure #BEgraph` shows an example of this transformation.

   .. _BEgraph:

   .. odsafig:: Images/BEgraph.png
      :width: 150
      :alt: Converting a Boolean expression to a graph
      :capalign: justify
      :figwidth: 90%
      :align: center

      The graph generated from Boolean expression
      :math:`B = (x_1 + x_2) \cdot (\overline{x_1} + x_2 + x_3) \cdot
      (\overline{x_1} + x_3)`.
      Literals from the first clause are labeled C1, and literals from
      the second clause are labeled C2.
      There is an edge between every pair of vertices except when both
      vertices represent instances of literals from the same clause,
      or a negation of the same variable.
      Thus, the vertex labeled :math:`C1\!:\!y_1` does not connect to
      the vertex labeled :math:`C1\!:\!y_2` (because they are literals
      in the same clause) or the vertex labeled
      :math:`C2\!:\!\overline{y_1}` (because they are opposite
      values for the same variable).

   :math:`B` is satisfiable if and only if :math:`G` has a clique of
   size :math:`k` or greater.
   :math:`B` being satisfiable implies that there is a truth assignment
   such that at least one literal :math:`y[i, j_i]` is true for
   each :math:`i`.
   If so, then these :math:`m` literals must correspond to :math:`m`
   vertices in a clique of size :math:`k = m`.
   Conversely, if :math:`G` has a clique of size :math:`k` or greater,
   then the clique must have size exactly :math:`k` (because no two
   vertices corresponding to literals in the same clause can be in the
   clique) and there is one vertex :math:`v[i, j_i]` in the clique for
   each :math:`i`.
   There is a truth assignment making each :math:`y[i, j_i]` true.
   That truth assignment satisfies :math:`B`.

   We conclude that K-CLIQUE is NP-hard, therefore NP-complete.

.. avembed:: AV/Development/3satToClique.html ss

