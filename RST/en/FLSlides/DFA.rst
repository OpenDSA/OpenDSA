.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires:
   :satisfies: FL Introduction
   :topic: Introduction

.. slideconf::
   :autoslides: False


Deterministic Finite Automata
=============================

.. slide:: Introduction: Terminology

   | Finite State Machine
   | Finite Automata
   | Automata
   |   All names for a simple model of computation that has:
   |   * States that the machine can be in (nodes)
   |   * Input (string)
   |   * Transitions on a character between states (edges)
   |   * Some machine types have memory


.. slide:: Deterministic Finite Automata

   | Our simplest machine.
   |   Deterministic: In a state, when given a specific letter,
       only one thing to do.
   |   Finite: Finite number of states
   |   Automata: A "machine"

   .. odsafig:: Images/DFAexample.png
      :width: 350
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: Basic DFA


.. slide:: DFA: Formal Definition

   Define a DFA as :math:`(Q, \Sigma, \delta, q_0, F)` where

   * :math:`Q` is a finite set of states
   * :math:`\Sigma` is the input alphabet (a finite set) 
   * :math:`\delta: Q \times\Sigma \rightarrow Q`.
     A set of transitions like :math:`(q_i, a) \rightarrow q_j`
     meaning that when in state :math:`q_i`, if you see letter :math:`a`,
     consume it and go to state :math:`q_j`.
   * :math:`q_0` is the initial state (:math:`q_0 \in Q`)
   * :math:`F \subseteq Q` is a set of final states


.. slide:: Concept: Accepting a String

   Example: A DFA that accepts even binary numbers.

   .. odsafig:: Images/stnfaEx1.png
      :width: 250
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: DFA Example

   | Assign meaning to the states: q0 - odd numbers, q1 - even numbers, 
   | Note the arrow: Start State
   | Note the double circle: Accepting State

   We accept the string if we halt (finish the string) in an accepting
   state.


.. slide:: Formal Definition

   :math:`M = (Q, \Sigma, \delta, q0, F) =`

   |
   |

   Tabular Format

   .. math::

      \begin{array}{r|cc}
      & 0  & 1 \\
      \hline
      q0 &  &  \\
      q1 &  &  \\
      \end{array}


.. slide:: Concept: Power of DFAs
           
   | A given DFA can accept a set of strings: A language.
   | All of the possible DFAs form a class of machines.
   | So DFAs (as a class of machines) can accept certain languages
     (as a matching class of langauges).

.. slide:: Algorithm for DFA


   | Start in :term:`start state` with input on tape
   | q = current state
   | s = current symbol on tape
   | while (s != blank) do
   |    :math:`q = \delta(q,s)`
   |    s = next symbol to the right on tape
   | if :math:`q \in F` then accept


.. slide:: Trace

   Example of a trace: 11010

   .. odsafig:: Images/stnfapict.png
      :width: 450
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: DFA Example


.. slide:: Definitions

   | :math:`\lambda` (lambda): The empty string
   | :math:`{\delta}^{*}(q,\lambda)=q`
   |   You didn't go anywhere, you are still in state :math:`q`
   | :math:`{\delta}^{*}(q,wa)={\delta}({\delta}^{*}(q,w),a)`
   |   Apply :math:`\delta` to all of :math:`w` first (some string) and
       then to :math:`a`
   | The language accepted by a DFA
     :math:`M = (Q, \Sigma, \delta, q_0, F)` is set of all strings on
     :math:`\Sigma` accepted by :math:`M`.
   |   Formally,
       :math:`L(M) = \{w\in{\Sigma}^{*}\mid {\delta}^{*}(q_0,w)\in F\}`
   | Set of strings not accepted:
       :math:`\overline{L(M)} = \{w\in{\Sigma}^{*}\mid {\delta}^{*}(q_0,w)\not\in F\}`


.. slide:: Incomplete DFA

   | Note that our DFA for even binary numbers is "complete".
   |   We always know what to do on any input.

   What about this one?

   .. TODO:: Example

      Need example here for :math:`L(M) = \{b^na | n > 0\}`
      This is the top three circles and their transitions from next
      figure.

      Ask what language this is.

   This is technically incomplete. It shows all ways that we **can**
   reach an accepting state.


.. slide:: Trap State

   To be complete, we can add one or more "trap" states, and put in all
   of the "extra" transitions. As follows.

   .. odsafig:: Images/stnfaEx3.png
      :width: 350
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: DFA Example: Complete


.. slide:: Another Example

   Example: Create a DFA that accepts even binary numbers that have an
   even number of 1's.

   | Assign labels:
   |   :math:`q_0` - start, 
   |   :math:`q_1` - even binary number: even number of 1's, 
   |   :math:`q_2` - odd number, odd number of 1's, 
   |   :math:`q_3` - odd number, even number of 1's 


.. slide:: Regular Languages

   **Definition**: A language is regular if and only if
   there exists a DFA :math:`M` such that :math:`L = L(M)`.
