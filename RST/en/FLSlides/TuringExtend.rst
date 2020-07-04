.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: Turing Machines Intro
   :satisfies:
   :topic: Turing Machines

.. slideconf::
   :autoslides: False

Turing Machine Extensions
=========================

.. slide:: More Powerful Machines?

   | Turing's Thesis claims that TM is as powerful as "any machine"
   | We might add features to a TM.
   |    If the features let us do something that we could not do
        before, that disproves Turing's Thesis
   |    If we can simulate the new feture with the standard model,
        this adds support to (but does not prove) the Turing thesis.
   | As usual, we say that two machine types are equivalent if they
   |    Accept the same languages
   |    Each can simulate the other (one direction is often trival)


.. slide:: Extensions (1)

   | 2-way infinite tape (Our model)
   |    Just bend infinite tape in the middle to get back to one-way
        tape, but with two layers.
        Now, expand the language. The new language is ordered pairs of the
        old language, to encode two levels of tape.

   .. inlineav:: TuringExt1CON dgm
      :links: AV/SeniorAlgAnal/TuringExt1CON.css
      :scripts: AV/SeniorAlgAnal/TuringExt1CON.js
      :align: center


.. slide:: Extensions (2)

   | Multiple tapes
   |    Again, expanded alphabet collapses multipe symbols to 1.


   .. inlineav:: TuringExt2CON dgm
      :links: AV/SeniorAlgAnal/TuringExt2CON.css
      :scripts: AV/SeniorAlgAnal/TuringExt2CON.js
      :align: center

   | Multiple heads on one tape
   |    Encode the heads onto the tape, and simulate moving them around.


.. slide:: Extensions (3)

   | Two-dimensional "tape"
   |    Convert to 1D, by diagonals.

   .. inlineav:: TuringExt3CON dgm
      :links: AV/SeniorAlgAnal/TuringExt3CON.css
      :scripts: AV/SeniorAlgAnal/TuringExt3CON.js
      :align: center


.. slide:: Extensions (4)

   | Non-determinism
   |    Simulate nondeterministic behavior in sequence, doing all length
        -1 computations, then length -2, etc., until we reach a halt
        state for one of the non-deteriministic choices.
   |    Non-determinism gives us speed, not ability.


.. slide:: Linear Bounded Automata

   | We could restrict the general model for a TM:
   |   Instead of an infinite tape, the tape might be only as long as
       the input
   |   Alternatively: :math:`c*n` for constant :math:`c` and input length
       :math:`n`
   |      (can double space by simulating two tracks by
          augmenting the alphabet)
   | Linear Bounded Automata [LBA]
   | Linz shows that, for example,
     :math:`L = \{a^nb^nc^n \mid n \geq 1\}` can be accepted by an
     LBA.
   | So, LBA more powerful than pushdown automata.
   | But turns out to be less powerful than TM (but this is hard to
     prove)
   

.. slide:: A Universal Turing Machine

   | A Turing Machine that takes a description for a Turing Machine
     and an input string, and simulates the behavior of that machine
     on that string.
   | Need three things:
   |    We need to encode the input machine as a string
   |    We need to encode the input *to* the machine as a string
   |    We need to encode the current state of operations on the input
        machine.
   | Might be easiest to think of these as being on separate tapes.


.. slide:: Recursive Enumerable vs. Recursive

   | **Definition:** A language is **Recursively Enumerable** if there
     is a Turing Machine that accepts it. [Turing Acceptable]

   | **Definition:** A language is **Recursive** if there is a Turing
     Machine that accepts it and that halts on every input string.
     [Turing Decideable]

   | The terminology of "enumerable" comes from the fact that it is
     possible to both "count" the number of strings in the language
     (countably infinite) and to put them in some order.
   |    More on this later!


.. slide:: More-general Grammars

   **Unrestricted Grammars**: Has productions :math:`u \rightarrow v`
   where :math:`u` is in :math:`(V \cup T)^+` and :math:`v` is in
   :math:`(V \cup T)^*`.

   | **Context Sensitive Grammars**: All productions are of the form
     :math:`u \rightarrow v` where :math:`u, v \in (V \cup T)^+` and
     :math:`|u| \leq |v|`.
   |    "Noncontracting"
   |    Called "context sensitive" because they can always be
        rewritten so that all productions are in the form
        :math:`xAy \rightarrow xvy` for :math:`v \in (V \cup T)^*`.
   | We already know that CSG is "richer" than CFG.


.. slide:: The Language Hierarchy

   | Turing Acceptable (Recur Enum) Language == Unrestricted Grammar (Turing Acceptable)
   | Turing Decideable (Recursive) Language == Turing Decideable
   | Context-sensitive Grammar == Linear Bounded Automata
   | Context-free Grammar == Non-deterministic Pushdown Automata
   | Deterministic Context-free Grammar == Deterministic Pushdown Automata
   | Regular Expression == Regular Grammar == DFA == NFA

   These are all proper subset relationships
