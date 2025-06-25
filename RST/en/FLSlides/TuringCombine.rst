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

Combining Turing Machines
=========================

.. slide:: An Important TM

   .. inlineav:: TManbncnCON ss
      :links: DataStructures/FLA/FLA.css AV/VisFormalLang/TM/TManbncnCON.css
      :scripts: lib/underscore.js DataStructures/FLA/FA.js AV/Development/formal_language/TuringMachine.js AV/VisFormalLang/TM/TManbncnCON.js
      :align: center
      :output: show


.. slide:: .

   .


.. slide:: Combining Turing Machines

   | Turing machine computations can be combined into larger machines:
   |    :math:`M_2` prepares string as input to :math:`M_1`.
   |    :math:`M_2` passes control to :math:`M_1` with I/O head at start
        of input. 
   |    :math:`M_2` retrieves control when :math:`M_1` has completed.


.. slide:: Some Basic Machines and Notation

   | :math:`|\Sigma|` symbol-writing machines (one for each symbol)
   |    Any give letter :math:`\sigma` has a symbol-writing machine named
        :math:`\sigma`
   | Head-moving machines, name R and L, move the head appropriately
   | Start state indicated with >
   | Transitions on anything other than the given symbol (for example, #) are
     labeled :math:`\overline{\#}`
   | Multiple copies of a machine get a superscript: :math:`R^2` means
     move right twice.


.. slide:: More Machines

   First do :math:`M_1`, then do :math:`M_2` or :math:`M_3` depending
   on current symbol.

   .. inlineav:: Turing1CON dgm
      :links: AV/SeniorAlgAnal/Turing1CON.css
      :scripts: AV/SeniorAlgAnal/Turing1CON.js
      :align: center

   (For :math:`\Sigma = \{a, b,c\}`) Move head to the right until a
   blank is found.

   .. inlineav:: Turing2CON dgm
      :links: AV/SeniorAlgAnal/Turing2CON.css
      :scripts: AV/SeniorAlgAnal/Turing2CON.js
      :align: center


.. slide:: More Machines (2)

   Find first blank square to left: :math:`L_{\#}`

   .. inlineav:: Turing3CON dgm
      :links: AV/SeniorAlgAnal/Turing3CON.css
      :scripts: AV/SeniorAlgAnal/Turing3CON.js
      :align: center


.. slide:: More Machines (2)

   Shift a string left.

   .. inlineav:: TuringShiftCON dgm
      :links: AV/SeniorAlgAnal/TuringShiftCON.css
      :scripts: AV/SeniorAlgAnal/TuringShiftCON.js
      :align: center

   Notice: The last step is "L#", NOT with # a
   subscript! Meaning, "move left, then write #". NOT "Move left
   until you see a #".


.. slide:: More Machines (3)

   | Copy Machine: Transform :math:`\#w\underline{\#}` into
     :math:`\#w\#w\underline{\#}`.

   .. inlineav:: TuringCopyCON dgm
      :links: AV/SeniorAlgAnal/TuringCopyCON.css
      :scripts: AV/SeniorAlgAnal/TuringCopyCON.js
      :align: center


.. slide:: Turing's Thesis

   | You now have some intuition for what can be accomplished by a
     Turing Machine
   |    Acceptor, transducer, math computations
   |    Might be painful to write in "machine code", but possible
   |    And we have the beginnings of a more powerful graphical
        language to express our ideas

   | **Turing Thesis:** Any computation that can be carried out by
     mechanical means can be performed by some Turing machine.
   |    How would we prove or disprove this?
   |    [Technically, we can't, unless we could really nail down the
        meaning of "mechanical means"]


.. slide:: Formal Concept of Algorithm

   | A useful working definition:
   |    An **algorithm** to compute a function **is** a Turing Machine
        program that solves it.
   |    Using this definition lets us reason formally about what
        problems (functions) do or do not have algorithms.

   .. Example: We can write an algorithm (TM program) to compute the
      Collitz sequence for a number n, but we do not know (at this
      time) how to write an algorithm to determine whether such a
      program will always halt (is Turing decideable).

      This is not unequivicable. Maybe someday we could make this
      Turing decideable.

      But other problems are definitely NOT Turing Decideable.
