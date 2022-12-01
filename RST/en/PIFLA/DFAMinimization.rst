.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger, Cliff Shaffer, and Mostafa Mohammed
   :requires: Non-deterministic Finite Automata
   :satisfies: DFA minimization
   :topic: Finite Automata

Minimizing the Number of States in a DFA
========================================

Minimizing the Number of States in a DFA
----------------------------------------

Recall that we now have an algorithm that converts any NFA to an
equivalent DFA.
The problem with this algorithm is that it has a worst case behavior
of creating up to :math:`2^n` nodes in the DFA from an NFA with
:math:`n` nodes.
Why is this a problem?
If all we want to do is answer the abstract question "Are NFAs more
powerful than DFAs?" then it really does not matter.
Having this algorithm is enough to answer that question.
But to the extent that DFAs are useful models of computation, this
does matter.

It turns out that DFAs are useful models of computation in real life.
Historically, many physical machines with control mechanisms have been
implemented in hardware based on using a DFA to model their control
behavior.
Things like vending machines or microwaves can be conceptually modeled
using the concept of a state machine.
Recall that sometimes it is easiest on a designer to initially design
using an NFA.
But we would not want then to implement the resulting system as an
NFA.
We would want to make it into a DFA first.
But then, we also don't want to include all the extra hardware
needed for an overly complex DFA.
This is where minimizing the states of the DFA is userful.

You might already be at least a little bit familiar with Regular
Expressions, since so many programmers use these all the time.
No matter if you are not, we are going to cover those soon.
The point is that another real-life use of NFAs,
and consequently of minimized DFAs,
is in the underlying implementation for tools that use regular
expressions.
So these Finite Automata do have practical uses.

.. inlineav:: DFAMinFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/FA/DFAMinFS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js AV/PIFLA/FA/DFAMinFS.js
   :output: show

Unfortunately, this is not an algorithm, since we cannot actually test
on all input strings if the language is infinite.

* But remember the definition for :math:`\delta^*(p, w)`.
  Look at things this way:
  It is telling us that we don't care about the prior history before
  we got to the current state with whatever remains of the input.
* So, we can look at each transition out of two subsets being
  considered, and verify that they lead to "equivalent" places (which
  is not the same as leading to the same state in the
  non-minimized machine).
* We will start with the maximum possible joining of states as a
  potential equivalence class, and see if we find evidence that forces
  us to break them apart as we consider the various transitions.

We will build a tree, whose root has all states in the original machine.
The first step will always be to split the states into the subset of
non-final vs. the subset of final states, so these are the children of
the root.
We then look at some current leaf node of the tree, and check the
transitions from each of the states in that leaf.
We test a given character against the states in that subset to see if
they all go to the same subset.
We split them up when they do not go to the same place.


Minimization Example 1
----------------------

The following slideshow presents, step-by-step, the process of
minimizing a DFA.

.. inlineav:: DFAMinEx1FS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/FA/DFAMinEx1FS.css
   :scripts: lib/underscore.js DataStructures/FLA/FA.js DataStructures/PIFrames.js DataStructures/FLA/AddQuestions.js AV/PIFLA/FA/DFAMinEx1FS.js
   :output: show


Minimization Example 2
----------------------

The following slideshow presents, step-by-step, the process of
minimizing a DFA for another example.

.. inlineav:: DFAMinEx2FS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/FA/DFAMinEx2FS.css
   :scripts: lib/underscore.js DataStructures/FLA/FA.js DataStructures/PIFrames.js DataStructures/FLA/AddQuestions.js AV/PIFLA/FA/DFAMinEx2FS.js
   :output: show


Decideability
-------------

Given two DFAs, do they accept the same language?
In general, is it possible to answer that question for two arbitrary
DFAs?
Questions of this kind are in the realm of a branch of Computer
Science called :term:`Computability <computability>` Theory.
The terminology used is:
Is it :term:`decideable <decideability>` whether two DFAs accept the
same language?

It turns out that there are systems where one can answer this
question, and systems where one cannot.
We'll tell you right now that it is not, in general, possible to tell
if two computer programs compute the same function (that is, both
programs always give the same output for any given input).
This is a variation of the :term:`halting problem`, that we will talk
about later.

In contrast, it turns out that one **can** decide if two DFAs accept
the same language.
Proving this is something that you might cover in a course on
Computability.
For now, we will just suggest this idea for your consideration:
Minimize the two DFAs.
If the resulting machines have the same number of nodes, and their
graphs are isomorphic (that is, identical in their structure and
their transition labelings), then they must accept the same language.
