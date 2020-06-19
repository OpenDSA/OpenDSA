.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger, Cliff Shaffer, and Mostafa Mohammed
   :requires: FL Concepts
   :satisfies: Deterministic Finite Automata
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
For example, a DFA that tests to see if a string is a valid integer
should output "yes" if given 6789 as input.
A DFA that tests to see if a string is a valid C++ variable name
should output "yes" if given SUM input.

.. inlineav:: DFAExampleCON dgm
   :links: AV/VisFormalLang/FA/DFAExampleCON.css
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/FA/DFAExampleCON.js
   :align: center

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

We interpret the DFA as outputting a value of "yes" on a given
input string if the DFA ends processing of that string in a final
state, and we say that the DFA outputs "no" if it is not in a final
state at the end of processing that string.

A DFA is a simple machine with not a lot of power.
We will see that there are many questions that it cannot answer about
strings.
For example, it cannot tell whether :math:`((9+5)+a)` is a valid
arithmetic expression or not.


Example
~~~~~~~

Here is a graphical presentation for a DFA that accepts even binary
numbers.

.. inlineav:: EvenBinaryDFACON dgm
   :links: DataStructures/FLA/FLA.css AV/VisFormalLang/FA/EvenBinaryDFACON.css
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/FA/EvenBinaryDFACON.js
   :align: center

   DFA Example: Even numbers. The start state is :math:`q_0`.
   State :math:`q_1` is a final state.

We can assign semantic meaning to the states:
the machine is in state :math:`q_0` when the digits proccessed so far
make an odd number, and the machine is in state :math:`q_1` when the
digits processed so far make an even number.
Of course, our thinking about them in this way is just to help with
our understanding of what is going on.
Saying that this is what the states "mean" does not change the actual
behavior of the machine.

.. note::

   At this point, you should try building this machine in OpenFLAP.

Formal definition:

:math:`M = (Q, \Sigma, \delta, q0, F) =`

   :math:`(\{q0,q1\}, \{0,1\}, \delta, q0, \{q1\})`

Here is a tabular format for :math:`\delta`:

.. note::

   See if you can write this table without looking at the answer.

   .. math::

      \begin{array}{r|cc}
      & 0  & 1 \\
      \hline
      q0 &  &  \\
      q1 &  &  \\
      \end{array}


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

| Start in :term:`start state` with input on tape
| q = current state
| s = current symbol on tape
| while (s != blank) do
|    :math:`q = \delta(q,s)`
|    s = next symbol to the right on tape
| if :math:`q \in F` then accept


.. inlineav:: MachineTraceCON ss
   :long_name: Machine Trace Slideshow
   :links: DataStructures/FLA/FLA.css AV/VisFormalLang/FA/MachineTraceCON.css 
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/FA/MachineTraceCON.js
   :output: show

   DFA Example: Even numbers trace

Now let's see how this machine accepts / rejects some strings.

.. inlineav:: TraceEvenBinaryDFACON ss
   :links: DataStructures/FLA/FLA.css AV/VisFormalLang/FA/TraceEvenBinaryDFACON.css
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/FA/TraceEvenBinaryDFACON.js
   :output: show

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

     This is the language accepted by DFA M.
     All strings formed of the alphabet such that if you start in q0
     and process all the symbols in w, then you end up in a final (or
     accepting) state

* Set of strings not accepted:

  .. math::

     \overline{L(M)} = \{w\in{\Sigma}^{*}\mid {\delta}^{*}(q_0,w)\not\in F\}


Trap State
~~~~~~~~~~

Example: Consider the language :math:`L(M) = \{b^na | n > 0\}`

.. note::

   What language is this?
   Answer: One or more "b" followed by one "a".

So, here is one way to make a drawing:

.. inlineav:: DFA_noTrapStateCON dgm
   :links: DataStructures/FLA/FLA.css AV/VisFormalLang/FA/DFA_noTrapStateCON.css
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/FA/DFA_noTrapStateCON.js
   :align: center

   DFA Example: Incomplete

.. note::

   Question: Did we need state :math:`q_0`?

   Answer: Yes, to force at least one "b".

Note that this is technically incomplete, in that there are
transitions not being show here.
The idea is that if we CAN reach an accepting state, then the string
is accepted.
But if we make a transition not shown in the diagram (or
end up somewhere other than accepting state), then the string is not
accepted.

To be complete, we can add one or more "trap" states, and put in all
of the "extra" transitions.
As follows.

.. inlineav:: DFA_withTrapStateCON dgm
   :links: DataStructures/FLA/FLA.css AV/VisFormalLang/FA/DFA_withTrapStateCON.css
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/FA/DFA_withTrapStateCON.js
   :align: center

   DFA Example: Complete


Note that there is nothing "special" about the trap state.

Its a good idea to have states with meaningful names!

Example: :math:`L = \{ w \in \Sigma^* | w` has an even number of a's
and an even number of b's }.

.. note::

   Other examples to consider: Can create a DFA for real numbers,
   integers, variable names (depending on the rules), etc.

Example: Create a DFA that accepts even binary numbers that have an
even number of 1's.

| Assign labels:
|   :math:`q_0` - start, 
|   :math:`q_1` - even binary number: even number of 1's, 
|   :math:`q_2` - odd number, odd number of 1's, 
|   :math:`q_3` - odd number, even number of 1's 

.. inlineav:: EvenBinaryEvenOnesDFACON dgm
   :links: DataStructures/FLA/FLA.css AV/VisFormalLang/FA/EvenBinaryEvenOnesDFACON.css
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/FA/EvenBinaryEvenOnesDFACON.js
   :align: center

   More complicated DFA Example

Determinism means that there is only one choice about what to do when
in a given state and the machine sees a given character.


Concept: Power of DFAs
~~~~~~~~~~~~~~~~~~~~~~
           
A given DFA can accept a set of strings (which is all that a language is).
All of the possible DFAs form a class of machines.
Given some class or type of Finite Automata, the
set of languages accepted by that class of Finite Automata is
called a :term:`family <family of languages>`.
Therefore, the DFAs define a family of languages that they accept.
A language is :term:`regular <regular language>` if and only iff
there exists a DFA :math:`M` such that :math:`L = L(M)`.
