.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Mostafa Mohammed and Cliff Shaffer
   :satisfies: PDA Module
   :topic: Pushdown Automaton


Pushdown Automata
=================

PDA: Pushdown Automata
----------------------

A significant characteristic of DFAs and NFAs is that they have no
memory.
So there is no history or way to store information aside from the
state that they are currently in.
This restricts what languages they can recognize.

Consider what even the addition of the ability to make use of a single
counter variable can do.
For example, it is easy to recognize the language of balanced
parentheses with a counter.
Simply increment the counter when a left parenthesis is seen,
and decrement when a right parenthesis is seen.
If the counter ever goes negative, then reject.
If it is zero after processing the string then accept, otherwise
reject.
Likewise, a counter will allow recognizing the language comprised of
strings of the form :math:`a^nb^n`.

But another alternative to storing a counter is to use a stack.
Balanced parentheses can be recognized by pushing left parentheses
onto the stack, and popping the top of the stack when encountering a
right parentheses.
Strings of the form :math:`a^nb^n` can likewise be recognized by
pushing the initial a's onto the stack, and then popping them off as
the b's are processed.

In the next few chapters we will study two types of machine with
memory.
The Pushdown Automata (PDA) uses a stack for its memory,
and we will see that this allows it to recognize a wider range of
languages than can the DFA or NFA.
The Turing Machine has a more flexible form of memory than does the
PDA, which will allow it to recognize an even broader range of
languages.

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


Something to Think About
------------------------

The PDA with its stack can easily recognize the language comprised of
strings of the form :math:`a^nb^n`.
Can it also recognize the language comprised of
strings of the form :math:`a^nb^nc^n`?
