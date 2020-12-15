.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger, Cliff Shaffer, and Mostafa Mohammed
   :requires: Deterministic Finite Automata
   :satisfies: DFA minimization
   :topic: Finite Automata

Minimizing the Number of States in a DFA
========================================

Minimizing the Number of States in a DFA
----------------------------------------

.. inlineav:: DFAMinFS ff
   :links: DataStructures/FLA/FLA.css AV/PIExample/DFAMinimizationFF.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js AV/PIFLA/FA/DFAMinFS.js
   :output: show

Unfortunately, this is not obviously an algorithm, since we cannot
actually test on all input strings.

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
We then look at each current leaf node of the tree, and check the
transitions from each of the states in that leaf.
We test a given character against the states in that subset to see if
they all go to the same subset.
Split them up when they do not go to the same place.

Minimization Example 1
----------------------

The following slideshow presents, step-by-step, the process of
minimizing the DFA.

.. inlineav:: DFAMinEx1FS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/FA/DFAMinEx1FS.css
   :scripts: lib/underscore.js DataStructures/FLA/FA.js DataStructures/PIFrames.js DataStructures/FLA/AddQuestions.js AV/PIFLA/FA/DFAMinEx1FS.js
   :output: show


Minimization Example 2
----------------------

.. inlineav:: DFAMinEx2FS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/FA/DFAMinEx2FS.css
   :scripts: lib/underscore.js DataStructures/FLA/FA.js DataStructures/PIFrames.js DataStructures/FLA/AddQuestions.js AV/PIFLA/FA/DFAMinEx2FS.js
   :output: show
