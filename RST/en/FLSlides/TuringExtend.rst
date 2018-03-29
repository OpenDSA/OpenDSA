.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
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

   | 2-way infinite tape
   |    Just bend infinite tape in the middle to get back to one-way
        tape, but with two layers.
        Now, expand the language. The new language is ordered pairs of the
        old language, to encode two levels of tape.

   .. inlineav:: TuringExt1CON dgm
      :links: AV/SeniorAlgAnal/TuringExt1CON.css
      :scripts: AV/SeniorAlgAnal/TuringExt1CON.js
      :align: center

   | Linz model: Write to tape AND move L or R
   |    My machine can use a second state to do the move.
   |    Linz machine can use a second state to "move back" to
        implement "stay"


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
       the input (or :math:`c*n` for constant :math:`c` and input length
       :math:`n`) [LBA]
   | Linz shows that, for example,
     :math:`L = \{a^nb^nc^n \mid n \geq 1\}` can be accepted by an
     LBA.
   | So, LBA more powerful than pushdown automata.
   | But turns out to be less powerful than TM (but this is hard to
     prove)
   

.. slide:: A Universal Turing Machine

   A Turing Machine that takes a program for a Turing Machine and an
   input string, and simulates the behavior of that machine on that
   string.
