.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :title: Introduction to Turing Machines
   :author: Mostafa Mohammed; Cliff Shaffer
   :institution: Virginia Tech
   :requires:
   :satisfies:
   :topic: Turing Machines
   :keyword: Turing Machine
   :naturallanguage: en
   :programminglanguage: N/A
   :description: Introduction to Turing machines.

Introduction to Turing Machines
===============================

A General Model of Computation
------------------------------

So far we have seen a few simple machine types, such as DFAs, NFAs,
and PDAs.
And we have seen corresponding grammars:
Regular grammars, context-free grammars, etc.
We have investigated the concept of non-determinism.
Nondeterminism does not affect the power of a DFA (the languages that
are accepted by NFAs are the same as for DFAs).
But nondeterminism does affect the power of PDAs
(nondetermistic PDAs recognize more languages than do determistic PDAs).

These machines all have some similarities.
They all take an input string.
They all march across the string from left to right, one character at
each step.
They stop when they reach the end of the string and then make a
simple decision: If the machine is in a final state, then it accepts
the string, and otherwise it rejects the string.
In other words, they are :term:`acceptors <acceptor>` for some language.
All that they can do is determine if a string is a member of the
language (of course that is a pretty useful ability),
and the "more powerful" machines can accept or reject strings
from more "complicated" languages.

But there is a lot more that we typically expect when we talk about
"computation".
Like, well, the ability to "compute" rather than simply accept.
What does "compute" actually mean?
For example, we would like to be able to take as input the arithmetic
expression ":math:`2 + 3`" and do more than decide if it is a
syntactically correct arithmetic statement.
We would like to be able to compute the answer: 5.
This means that we need to be able to output that computed value.
Or to be precise, we "compute" a value by taking the input
string ":math:`2 + 3`" and replacing it with the output string "5".

In its most general form, we can think of everything that a computer
does as taking some string as input, and then providing some string as
output.
Of course, modern peripheral devices like keyboards, mice, and computer
monitors give us rich ways to express input strings (perhaps as button
presses), and rich ways to interpret output strings (say, as
pictures).
But it's not a huge stretch of the imagination to see that there is no
loss of ability if we abstract all computation
as converting an input string to an output string.

This concept of converting is far more powerful than simple accepting.
A machine that takes an input and provides an output is called a
:term:`transducer`.

In the next section, we will introduce a simple machine,
called the :term:`Turing Machine`, that is a transducer.
It is only slightly more complicated than the machines that we have
seen so far, and only slightly different in its operation.
These differences might appear suprisingly small considering how
significant they are.
Ultimately, we will see that a Turing Machine can do any computation
(in its fundamental abilty to convert one string into another)
that even the most sophisticated modern computer can do.

The first difference is memory.
DFAs (and NFAs) have no memory beyond whatever process took them to
their current state.
PDAs have a stack.
This made a huge difference in the languages that can be accepted:
DFAs only accept regular languages, while (nondeterministic) PDAs
accept any CFL.

Consider these three languages:

* :math:`L_1 = \{wcw^R\}` for :math:`w` in :math:`\Sigma^*, \Sigma = \{a, b\}`.
* :math:`L_2 = \{ww^R\}` for :math:`w` in :math:`\Sigma^*, \Sigma = \{a, b\}`.
* :math:`L_1 = \{ww\}` for :math:`w` in :math:`\Sigma^*, \Sigma = \{a, b\}`.

The differences seem pretty minor, but the outcomes are quite
different.
:math:`L_1` is a deterministic CFL.
:math:`L_2` is a non-determistic CFL.
:math:`L_3` is not a CFL at all.

The difference between :math:`L_3` and the others seems to relate to
the limitiations of the stack.
As we read the first :math:`w` and load it into the stack, we don't
have a good way to get to the bottom of the stack to see the first
letter to compare it against the first letter of the second :math:`w`.
But what if we considered other memory models?
For example, a queue would solve our problem nicely.
But then, a queue would not be able to handle :math:`L_2`.
Two stacks could simulate a queue (do you see how?), and so a machine
with two stacks can handle both :math:`L_1` and :math:`L_2`.
Perhaps we should investigate what class of languages a two stack
machine can handle?
Perhaps we should consider other memory models?

As it turns out, none of these ideas are as effective as the simple
memory model that the Turing Machine uses.


Turing Machines
---------------

.. inlineav:: TMGeneralFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/TM/TMGeneralFS.css
   :scripts: lib/underscore.js DataStructures/FLA/FA.js DataStructures/FLA/TuringMachine.js DataStructures/PIFrames.js AV/PIFLA/TM/TMGeneralFS.js
   :output: show
   :keyword: Turing Machines


Interpreting Turing Machines
----------------------------

Next we will look at notation for discussing the concept of
configurations and transistions between configurations for Turing
machines.
We will investigate more about the conventions of halting, accepting,
and computing for Turing machines.
Finally, we will present notation for doing real computation on numbers.

.. inlineav:: TMInterpretingFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/TM/TMInterpretingFS.css
   :scripts: lib/underscore.js DataStructures/FLA/FA.js DataStructures/FLA/TuringMachine.js DataStructures/PIFrames.js AV/PIFLA/TM/TMInterpretingFS.js
   :output: show
   :keyword: Turing Machines


Turing-Decidable vs. Turing-Acceptable Languages
------------------------------------------------

.. inlineav:: TMDecidableFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/TM/TMDecidableFS.css
   :scripts:  lib/underscore.js DataStructures/FLA/FA.js DataStructures/FLA/TuringMachine.js DataStructures/PIFrames.js AV/PIFLA/TM/TMDecidableFS.js
   :output: show
   :keyword: Turing Machines
