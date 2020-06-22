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

.. slide:: Combining Turing Machines (1)

   | **Lemma:** If
   |    :math:`(q_1,\ w_1\underline{a_1}u_1) \vdash_M^* (q_2,\ ww_2\underline{a_2}u_2)`
   | for string $w$ and
   |    :math:`(q_2,\ w_2\underline{a_2}u_2) \vdash^*_M (q_3,\ w_3\underline{a_3}u_3)`,
   | then
   |   :math:`(q_1,\ w_1\underline{a_1}u_1) \vdash^*_M (q_3,\ ww_3\underline{a_3}u_3)`.

   | Insight: Since :math:`(q_2,\ w_2\underline{a_2}u_2) \vdash^*_M (q_3,\ w_3\underline{a_3}u_3)`, 
     this computation must take place without moving the head left of :math:`w_2`.
   |    The machine cannot "sense" the left end of the tape.
   |    And if it had moved left, it would have hung.


.. slide:: Combining Turing Machines (2)

   | Thus, the head won't move left of :math:`w_2` even if it is
     **not** at the left end of the tape.
   | This means that Turing machine computations can be combined into
     larger machines:
   |    :math:`M_2` prepares string as input to :math:`M_1`.
   |    :math:`M_2` passes control to :math:`M_1` with I/O head at end
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

   | Shift a string left.

   .. inlineav:: TuringShiftCON dgm
      :links: AV/SeniorAlgAnal/TuringShiftCON.css
      :scripts: AV/SeniorAlgAnal/TuringShiftCON.js
      :align: center

   .. Notice this subtle point: The last step is "L#", NOT with # a
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

   **Turing Thesis:** Any computation that can be carried out by
   mechanical means can be performed by some Turing machine.

   | How would we prove or disprove this?
   |    What is the technical meaning of the word "thesis"?


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
