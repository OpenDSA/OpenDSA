.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer Nabanita Maji
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

For our proofs we will use the *Circuit Satisfiability* Problem as the
first NP-Complete problem. We will take it for a fact that Circuit 
Satisfiability is an NP Complete Problem.

.. _NPCreduction:

.. inlineav:: NPCProofDiagramCON  dgm
   :align: center

   We will use this sequence of reductions for the NP Complete Proofs.

The next few modules provide examples of reductions that can be used
to prove that a particular problem is NP Complete.


.. odsascript:: AV/Development/NP/NPCProofDiagramCON.js
