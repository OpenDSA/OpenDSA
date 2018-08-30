.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer (& Nick Eda)

Deterministic Finite Acceptors
==============================

DFA: Deterministic Finite Acceptor
----------------------------------


We start with the simplest of our machines:
The :term:`Deterministic Finite Acceptor` (:term:`DFA`).
This machine can process an input string (shown on a tape) from left
to right.
There is a control unit (with states), behavior defined for what to do
when in a given state and with a given symbol on the current square of
the tape.
All that we can "do" is change state before going to the next letter
to the right.
That is, an acceptor does not modify the contents of the tape.

For example:

.. _DFAFig:

.. inlineav:: DFACON dgm
   :links: AV/OpenFLAP/DFACON.css
   :scripts: AV/OpenFLAP/DFACON.js
   :align: center

This is a DFA that accepts even binary numbers that have an even number of 1's.

