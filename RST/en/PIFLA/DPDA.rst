.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Mostafa Mohammed and Cliff Shaffer
   :satisfies: PDA Module
   :topic: Deterministic Pushdown Automata

Deterministic Pushdown Automata
===============================

Deterministic Pushdown Automata
-------------------------------

We know that non-determinism adds no real power to DFAs.
That is, every NFA has an equivalent DFA.

How about for PDAs?
We have introduced the concept of non-determinism to PDAs (we call
these NPDAs), and we have shown that every CFG as an equivalent NPDA,
and vice versa.
Thus, NPDAs can recognize all CFL.

But, what about the distinction between deterministic and
non-deterministic PDAs?
Does non-determinism add real power to the PDA?

.. inlineav:: DPDAFS ff
   :links: AV/PIFLA/PDA/DPDAFS.css
   :scripts: lib/underscore.js DataStructures/FLA/FA.js DataStructures/FLA/PDA.js DataStructures/PIFrames.js AV/PIFLA/PDA/DPDAFS.js
   :output: show


Nondeterministic CFL proof
--------------------------

.. inlineav:: NCFLProofFS ff
   :links: AV/PIFLA/PDA/NCFLProofFS.css
   :scripts: lib/underscore.js DataStructures/FLA/FA.js DataStructures/FLA/PDA.js DataStructures/PIFrames.js AV/PIFLA/PDA/NCFLProofFS.js
   :output: show


Grammars for Deterministic Context-free Languages
-------------------------------------------------

.. inlineav:: GrammarsForDCFLFS ff
   :links: AV/PIFLA/PDA/GrammarsForDCFLFS.css
   :scripts: lib/underscore.js DataStructures/FLA/FA.js DataStructures/FLA/PDA.js DataStructures/PIFrames.js AV/PIFLA/PDA/GrammarsForDCFLFS.js
   :output: show
