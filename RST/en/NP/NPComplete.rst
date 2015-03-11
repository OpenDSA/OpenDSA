.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :prerequisites:
   :topic: NP-completeness

.. odsalink:: AV/Development/circuitSATCON.css

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

Given below are some problems that are NP Complete.

Examples of NP-Complete Problems
--------------------------------

.. topic:: CIRCUIT SATISFIABILITY PROBLEM 

  .. inlineav:: circuitSATCON ss
     :output: show

  In the above problem, given a particular assignment, while we can 
  quickly check whether the assignment satisfies the circuit or not,
  we have no easy way of knowing whether it has any satisfying 
  assignment.


.. topic:: Problem

   Formula Satisfiability Problem (SAT) 

The following slideshow explains the Formula Satisfiability Problem.



.. avembed:: AV/Development/SAT.html ss


.. topic:: Problem

   3-CNF Satisfiability Problem (3-SAT)

The following slideshow explains the 3-CNF Satisfiability Problem.

.. avembed:: AV/Development/3sat.html ss

Try out an instance of the 3-SAT problem on your own.

.. avembed:: Exercises/Development/3sat_Ex.html ka


.. topic:: Problem

   The Clique Problem.

The following slideshow explains the Clique Problem.

.. avembed:: AV/Development/clique.html ss

Try out an instance of the Clique problem on your own.

.. avembed:: Exercises/Development/clique_Ex.html ka


.. topic:: Problem

   The Independent Set Problem.

The following slideshow explains the Independent Set Problem.

.. avembed:: AV/Development/IS.html ss

Try out an instance of the Independent Set problem on your own.

.. avembed:: Exercises/Development/IS_Ex.html ka


.. topic:: Problem

   The Vertex Cover Problem.

The following slideshow explains the Vertex Cover Problem.

.. avembed:: AV/Development/vertexcover.html ss

Try out an instance of the Vertex Cover problem on your own.

.. avembed:: Exercises/Development/vertexCover_Ex.html ka


.. topic:: Problem

   The Hamiltonian Cycle Problem.

The following slideshow explains the Hamiltonian Cycle Problem.

.. avembed:: AV/Development/hamiltonianCycle.html ss

Try out an instance of the Hamiltonian Cycle problem on your own.

.. avembed:: Exercises/Development/hamiltonianCycle_Ex.html ka


.. topic:: Problem

   The Traveling Salesman Problem.

The following slideshow explains the Traveling Salesman Cycle Problem.

.. avembed:: AV/Development/TSP.html ss

Try out an instance of the Traveling Salesman problem on your own.

.. avembed:: Exercises/Development/TSP_Ex.html ka



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

For our proofs we will use the *Circuit Satisfiability* Problem as the
first NP-Complete problem. We will take it for a fact that Circuit 
Satisfiability is an NP Complete Problem.

.. _NPCreduction:

.. odsafig:: Images/reduction.png
   :width: 400
   :alt: The Reduction of NP-Complete Problems.
   :capalign: justify
   :figwidth: 90%
   :align: center

   We will use this sequence of reductions for the NP Complete Proofs.

.. topic:: Reduction for Proof of NP-Completness

   SAT is NP Complete. 

The following slideshow shows that an instance of Circuit Satisfiability 
problem can be reduced to an instance of SAT problem in polynomial time.
 
.. avembed:: AV/Development/circuitSATtoSat.html ss

.. topic:: Reduction for Proof of NP-Completness

   3-SAT is NP Complete. 

The following slideshow shows that an instance of SAT problem can be 
reduced to an instance of 3-SAT problem in polynomial time.

.. avembed:: AV/Development/satTo3sat.html ss

.. topic:: Reduction for Proof of NP-Completness

   Clique problem is NP Complete. 

The following slideshow shows that an instance of 3-SAT problem can be 
reduced to an instance of Clique problem in polynomial time.

.. avembed:: AV/Development/3satToClique.html ss

.. topic:: Reduction for Proof of NP-Completness

   Independent Set problem is NP Complete. 

The following slideshow shows that an instance of Clique problem can be 
reduced to an instance of Independent Set problem in polynomial time.

.. avembed:: AV/Development/cliqueToIS.html ss

.. topic:: Reduction for Proof of NP-Completness

   Vertex Cover problem is NP Complete. 

The following slideshow shows that an instance of Independent Set problem can
 be reduced to an instance of Vertex Cover problem in polynomial time.

.. avembed:: AV/Development/IStoVC.html ss

.. topic:: Reduction for Proof of NP-Completness

   Hamiltonian Cycle problem is NP Complete. 

The following slideshow shows that an instance of 3-SAT problem can
 be reduced to an instance of Independent Set problem in polynomial time.


.. avembed:: AV/Development/3satToHC.html ss

.. topic:: Reduction for Proof of NP-Completness

   Traveling Salesman problem is NP Complete. 

The following slideshow shows that an instance of Hamiltonian Cycle problem 
can be reduced to an instance of Traveling Salesman problem in polynomial time.

.. avembed:: AV/Development/HCtoTSP.html ss

.. odsascript:: AV/Development/circuit/circuit.js
.. odsascript:: AV/Development/circuitSATCON.js

