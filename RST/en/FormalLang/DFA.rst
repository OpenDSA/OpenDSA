.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires: FL Concepts
   :satisfies: Deterministic Finite Automata
   :topic: Finite Automata

Deterministic Finite Automata
=============================

DFA: Deterministic Finite Automata
----------------------------------

(Also called Deterministic Finite Acceptor)

Define a DFA as :math:`(Q, \Sigma, \delta, q_0, F)` where

* :math:`Q` is finite set of states
* :math:`\Sigma` is input alphabet (a finite set) 
* :math:`q_0` is the initial state (:math:`q_0 \in Q`)
* :math:`F \subseteq Q` is a set of final states
* :math:`\delta: Q \times\Sigma \rightarrow Q`

.. odsafig:: Images/DFAexample.png
   :width: 400
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Basic DFA

   Example of DFA

A DFA is a simple machine with not a lot of power.

It can answer yes or no (for example, if 6789 is a valid integer, or
SUM is a valid variable name in C++). 

It cannot tell whether ((9+5)+a) is a valid arithmetic expression. 

Example
~~~~~~~

DFA that accepts even binary numbers.

.. note::

   At this point, should demonstrate building the machine in JFLAP or
   OpenDSA.

Assign meaning to the states: q0 - odd numbers, q1 - even numbers, 

Transition Diagram:

.. odsafig:: Images/stnfaEx1.png
   :width: 400
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: DFA Example

   DFA Example: Odd numbers

:math:`M = (Q, \Sigma, \delta, q0, F) =`

.. note::

   :math:`(\{q0,q1\}, \{0,1\}, \delta, q0, \{q1\})`

Tabular Format

.. math::

   \begin{array}{r|cc}
   & 0  & 1 \\
   \hline
   q0 &  &  \\
   q1 &  &  \\
   \end{array}

.. note::

   Answer:

   .. math::

      \begin{array}{r|cc} 
      & 0 & 1 \\
      \hline 
      q0 & q1 & q0 \\ 
      q1 & q1 & q0 \\ 
      \end{array} 

Example of a move: :math:`\delta(q0, 1) = q0`


Algorithm for DFA:
~~~~~~~~~~~~~~~~~~

| Start in start state with input on tape
| q = current state
| s = current symbol on tape
| while (s != blank) do
|    :math:`q = \delta(q,s)`
|    s = next symbol to the right on tape
| if :math:`q \in F` then accept

Example of a trace: 11010

Pictorial Example of a trace for 100:

.. odsafig:: Images/stnfapict.png
   :width: 400
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: DFA Example

   DFA Example: Odd numbers


Definitions
~~~~~~~~~~~

* :math:`{\delta}^{*}(q,\lambda)=q`

  You didn't go anywhere, you are still in state :math:`q`

* :math:`{\delta}^{*}(q,wa)={\delta}({\delta}^{*}(q,w),a)`

  Apply :math:`\delta` to all of :math:`w` first (some string) and
  then to :math:`a`

* The language accepted by a DFA
  :math:`M = (Q, \Sigma, \delta, q_0, F)` is set of all strings on
  :math:`\Sigma` accepted by :math:`M`.
  Formally,

  .. math::

     L(M) = \{w\in{\Sigma}^{*}\mid {\delta}^{*}(q_0,w)\in F\}

  .. note::

     Draw a picture: q0 arc ... some final state, any path to a final
     state is a string that is accepted. 

     Say this: This is the language accepted by DFA M.
     All strings formed of the alphabet such that if you start in q0
     and process all the symbols in w, then you end up in a final (or
     accepting) state

* Set of strings not accepted:

  .. math::

     \overline{L(M)} = \{w\in{\Sigma}^{*}\mid {\delta}^{*}(q_0,w)\not\in F\}

Trap State
~~~~~~~~~~
