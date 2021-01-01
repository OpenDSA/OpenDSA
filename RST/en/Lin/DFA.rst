.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger, Cliff Shaffer, Mostafa Mohammed, and John Taylor
   :satisfies: Deterministic Finite Automata
   :topic: Finite Automata


DFA: Deterministic Finite Acceptor
==================================

Introduction to the DFA
-----------------------


Some Examples
-------------
The algorithm for how a DFA processes a string:

| Start in :term:`start state` with input on tape
| q = current state
| s = current symbol on tape
| while (s != blank) do
|    :math:`q = \delta(q,s)`
|    s = next symbol to the right on tape
| if :math:`q \in F`
|    then accept
|    else reject

Here is a detailed trace on a simple input.

.. inlineav:: MachineTraceCON ss
   :long_name: Machine Trace Slideshow
   :links: DataStructures/FLA/FLA.css AV/VisFormalLang/FA/MachineTraceCON.css 
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/FA/MachineTraceCON.js
   :output: show

