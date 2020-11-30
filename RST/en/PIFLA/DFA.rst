.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger, Cliff Shaffer, Mostafa Mohammed, and John Taylor
   :satisfies: DFA Module
   :topic: Finite Automata


DFA: Deterministic Finite Acceptor
==================================

Introduction to the DFA
-----------------------

We start with the simplest of our machines:
The :term:`Deterministic Finite Acceptor` (:term:`DFA`).
This machine can process an input string (shown on a tape) from left
to right.
There is a control unit (with states), behavior defined for what to do
when the machine sees a given symbol on the current square of
the tape while in a given state.
All that the machine can "do" is change state before going to the next
symbol to the right.
That is, an acceptor cannot modify the contents of the tape.

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
should output "yes" if given 6789 as input, and "no" if given 67a89 or
67.89 as input.
A DFA that tests to see if a string is a valid C++ variable name
should output "yes" if given SUM as input, and "no" if given 1SUM as
input.

.. inlineav:: DFAExampleCON dgm
   :links: AV/VisFormalLang/FA/DFAExampleCON.css
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/FA/DFAExampleCON.js
   :align: center

   Schematic diagram for a DFA


.. inlineav:: DFAintroFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/FA/DFAintroFS.css
   :scripts: DataStructures/PIFrames.js DataStructures/FLA/FA.js AV/PIFLA/FA/DFAintroFS.js 
   :output: show

.. topic:: Definition
           
   Define a DFA as :math:`(Q, \Sigma, \delta, q_0, F)` where

   * :math:`Q` is a finite set of states
   * :math:`\Sigma` is the input alphabet (a finite set) 
   * :math:`\delta: Q \times\Sigma \rightarrow Q`.
     A set of transitions like :math:`(q_i, a) \rightarrow q_j`
     meaning that when in state :math:`q_i`, if you see letter :math:`a`,
     consume it and go to state :math:`q_j`.
   * :math:`q_0` is the initial state (:math:`q_0 \in Q`)
   * :math:`F \subseteq Q` is a set of final states


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

Now let's see how this machine accepts / rejects some strings.

.. inlineav:: TraceEvenBinaryDFACON ss
   :links: DataStructures/FLA/FLA.css AV/VisFormalLang/FA/TraceEvenBinaryDFACON.css
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/FA/TraceEvenBinaryDFACON.js
   :output: show
   

Next is an exercise to give you practice in building a machine using
the DFA machine editor.
You should not need to think too hard about what machine you need,
since you can simply recreate the machine that we have been using.
But doing this exercise will introduce you to the machine editor that
you will see a lot of in this book!

.. avembed:: AV/OpenFLAP/exercises/FLAssignments/FA/EvenBinary.html pe
   :long_name: Accept even binary numbers


Advanced Concepts
-----------------

.. inlineav:: DFAadvancedFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/FA/DFAadvancedFS.css
   :scripts: DataStructures/PIFrames.js DataStructures/FLA/FA.js AV/PIFLA/FA/DFAadvancedFS.js
   :output: show


Limits to DFAs
--------------
           
A given DFA can accept a set of strings, and a set of stings is a
language.
So a DFA :math:`M` accepts a language :math:`L`, written
:math:`L(M)`.

But go beyond this.
Think about all possible DFAs.
And each DFA accepts a language.
So all the DFAs, collectively, can accept some collection of
languages.
This is called a :term:`family <family of languages>`.
Therefore, the DFAs define a family of languages that they accept.
A language is :term:`regular <regular language>` if and only iff
there exists a DFA :math:`M` such that :math:`L = L(M)`.

The important question now is:
Are there languages that DFAs cannot accept?
That is, are there languages that are not regular?
We won't leave you guessing, the answer is yes.
We'll prove this later, and then introduce more powerful machines that
can accept larger families of languages.
