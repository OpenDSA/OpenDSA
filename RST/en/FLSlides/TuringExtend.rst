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

.. slide:: Extensions (1)

   The following extensions do not increase the power of Turing Machines.

   | 2-way infinite tape
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
