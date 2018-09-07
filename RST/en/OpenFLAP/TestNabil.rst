.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires: FL Concepts
   :satisfies: Deterministic Finite Acceptor
   :topic: Finite Automata

Deterministic Finite Acceptors
==============================

Trap State
~~~~~~~~~~

Example: Consider the language :math:`L(M) = \{b^na | n > 0\}`

.. note::

   What language is this?
   Answer: One or more "b" followed by one "a".

So, here is one way to make a drawing:


Note that this is technically incomplete, in that there are
transitions not being show here.
The idea is that if we CAN reach and accepting state, then the string
is accepted. But if we make a transition not shown in the diagram (or
end up somewhere other than accepting state), then the string is not
accepted.

To be complete, we can add one or more "trap" states, and put in all
of the "extra" transitions. As follows.

.. inlineav:: trapDFA dgm
   :links: AV/OpenFLAP/trapDFA.css
   :scripts: AV/OpenFLAP/trapDFA.js
   :align: center

   DFA Example: Complete

Note that there is nothing "special" about the trap state.

Its a good idea to have states with meaningful names!
