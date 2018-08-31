.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires: FL Concepts
   :satisfies: Deterministic Finite Acceptor
   :topic: Finite Automata

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

:term:`Deterministic` in this context has a particular meaning:
When the DFA is in a given state, there is only one thing that
it can do for any given input symbol.
This is in contrast to a :term:`non-deterministic` machine,
that might have some range of options on how to proceed when in a
given state with a given symbol.
We'll talk about non-deterministic automata later.


At the end of processing the letters of the string, the DFA can answer
"yes" or "no".
For example, "yes" if 6789 is a valid integer,
or if SUM is a valid variable name in C++.

.. odsafig:: Images/DFAexample.png
   :width: 350
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Basic DFA

   Example of DFA

.. note::

   Think about this before you read on: What information do we need to
   characterize/describe/define a given DFA?
   We want enough information so that we can "build" the machine.
   But no more.

Define a DFA as :math:`(Q, \Sigma, \delta, q_0, F)` where

* :math:`Q` is a finite set of states
* :math:`\Sigma` is the input alphabet (a finite set)
* :math:`\delta: Q \times\Sigma \rightarrow Q`.
  A set of transitions like :math:`(q_i, a) \rightarrow q_j`
  meaning that when in state :math:`q_i`, if you see letter :math:`a`,
  consume it and go to state :math:`q_j`.
* :math:`q_0` is the initial state (:math:`q_0 \in Q`)
* :math:`F \subseteq Q` is a set of final states

A DFA is a simple machine with not a lot of power.
We will see that there are many questions that it cannot answer about
strings.
For example, it cannot tell whether :math:`((9+5)+a)` is a valid
arithmetic expression or not.


Example
~~~~~~~

DFA that accepts even binary numbers.

.. inlineav:: EvenBinaryNums dgm
   :links: AV/OpenFLAP/EvenBinaryNums.css
   :scripts: AV/OpenFLAP/EvenBinaryNums.js
   :align: center

   DFA Example: Odd numbers

We can assign meaning to the states:
:math:`q_0` for odd numbers, :math:`q_1` for even numbers,

.. note::

   At this point, you should try building this machine in JFLAP.

Formal definition:
