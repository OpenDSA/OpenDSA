.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer, Nabanita Maji
   :topic: NP-completeness

NP-Completeness Proofs
======================



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
The "grand-daddy" NP-complete problem that Cook used is called
SATISFIABILITY (or SAT for short).

A :term:`Boolean expression` is comprised of
:term:`Boolean variables <Boolean variable>` combined
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

To show that a decision problem :math:`X`
is NP-complete, we prove that :math:`X` is in NP (normally easy, and
normally done by giving a suitable polynomial-time, non-deterministic
algorithm) and then prove that :math:`X` is NP-hard.
To prove that :math:`X` is NP-hard, we choose a known NP-complete
problem, say :math:`A`. 
We describe a polynomial-time transformation that takes an
*arbitrary* instance :math:`I` of :math:`A` to an instance
:math:`I'` of :math:`X`.
We then describe a polynomial-time transformation from
:math:`SLN'` to :math:`SLN` such that :math:`SLN` is the solution
for :math:`I`.

The following modules show a number of known NP-complete problems, and
also some proofs that they are NP-complete.
The various proofs will link the problems together as shown here:

.. _NPCreduction:

.. inlineav:: NPCProofDiagramCON dgm
   :links: 
   :scripts: AV/NP/NPCProofDiagramCON.js
   :align: center

   We will use this sequence of reductions for the NP Complete Proof
