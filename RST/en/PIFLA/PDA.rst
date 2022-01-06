.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Mostafa Mohammed and Cliff Shaffer
   :satisfies: PDA Module
   :topic: Pushdown Automaton


Pushdown automaton
==================

PDA: Pushdown Automata
----------------------

One of defining characteristics of DFAs and NFAs is that they have no
memory.
So there is no history or way to store information aside from what
state they are currently in.
In this and future chapters, we will study two types of machine with
memory: The Pushdown Automata (or PDA, so-called because it has a
stack) and the Turing Machine (that has a somewhat more flexible form
of memory).
Not coincidentally, we will find that these machines have more
capability than do DFAs in terms of the languages that they can
recognize.

.. inlineav:: PDAFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/PDA/PDAFS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js AV/PIFLA/PDA/PDAFS.js
   :output: show


Transitions Types for PDAs
--------------------------

.. inlineav:: PDATransitionsFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/PDA/PDATransitionsFS.css
   :scripts: lib/underscore.js DataStructures/FLA/FA.js DataStructures/FLA/PDA.js DataStructures/PIFrames.js AV/PIFLA/PDA/PDATransitionsFS.js
   :output: show


PDA Acceptace Models - Final State Acceptace
--------------------------------------------

.. inlineav:: PDAAcceptanceFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/PDA/PDAAcceptanceFS.css
   :scripts: lib/underscore.js DataStructures/FLA/FA.js DataStructures/FLA/PDA.js DataStructures/PIFrames.js AV/PIFLA/PDA/PDAAcceptanceFS.js
   :output: show


PDA Acceptace Models - Empty Stack Acceptace
--------------------------------------------
   
.. inlineav:: PDAEmptyStackFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/PDA/PDAEmptyStackFS.css
   :scripts: lib/underscore.js DataStructures/FLA/FA.js DataStructures/FLA/PDA.js DataStructures/PIFrames.js AV/PIFLA/PDA/PDAEmptyStackFS.js
   :output: show


Equivalence of Acceptance Definitions
-------------------------------------

.. inlineav:: PDAAcceptEquivFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/PDA/PDAAcceptEquivFS.css
   :scripts: lib/underscore.js DataStructures/FLA/FA.js DataStructures/FLA/PDA.js DataStructures/PIFrames.js AV/PIFLA/PDA/PDAAcceptEquivFS.js
   :output: show
