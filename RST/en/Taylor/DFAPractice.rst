.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author:Susan Rodger, Cliff Shaffer, Mostafa Mohammed, John Taylor
   :satisfies: DFA Module
   :topic: Finite Automata


Practice Problems
=================================
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
For example, a DFA that tests to see if a string is a valid integer
should output "yes" if given 6789 as input.
A DFA that tests to see if a string is a valid C++ variable name
should output "yes" if given SUM input.


.. inlineav:: DFAPracticeA ff
   :links: AV/Taylor/Practice/DFAPractice.css
   :scripts: DataStructures/FLA/FA.js AV/Taylor/Practice/DFAPracticeA.js DataStructures/PIFrames.js
   :output: show

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

We interpret the DFA as outputting a value of "yes" on a given
input string if the DFA ends processing of that string in a final
state, and we say that the DFA outputs "no" if it is not in a final
state at the end of processing that string.

A DFA is a simple machine with not a lot of power.
We will see that there are many questions that it cannot answer about
strings.
For example, it cannot tell whether :math:`((9+5)+a)` is a valid
arithmetic expression or not.

.. inlineav:: DFAPracticeB ff
   :links: AV/Taylor/Practice/DFAPracticeB.css
   :scripts: DataStructures/FLA/FA.js AV/Taylor/Practice/DFAPracticeB.js DataStructures/PIFrames.js
   :output: show
   


