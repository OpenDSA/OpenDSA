.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires:
   :satisfies: Turing Machines
   :topic: Finite Automata

.. slideconf::
   :autoslides: False

                
Decideability vs. Acceptability
===============================

.. slide:: Turing-decidable Languages

   | A language :math:`L \subset \Sigma_0^*` is **Turing-decidable** iff
     function :math:`\chi_L: \Sigma^*_0 \rightarrow \{\fbox{Y}, \fbox{N}\}`
     is Turing-computable, where for each :math:`w \in \Sigma^*_0`,
   |    :math:`\chi_L(w) = \left\{ \begin{array}{ll} \fbox{Y} & \mbox{if $w \in L$}\\ \fbox{N}  & \mbox{otherwise} \end{array} \right.`

   Example: Let :math:`\Sigma_0 = \{a\}`, and let
   :math:`L = \{w \in \Sigma^*_0: |w|\ \mbox{is even}\}`.


   :math:`M` erases the marks from right to left, with current parity
   encode by state.
   Once the string is finished, mark :math:`\fbox{Y}` or
   :math:`\fbox{N}` as appropriate.


.. slide:: Turing-acceptable Languages (1)

   | :math:`M` **accepts** a string :math:`w` if :math:`M` halts on a final state for the
     input :math:`w`.
   |    :math:`M` accepts a language iff :math:`M` halts on :math:`w`
        iff :math:`w \in L`. 
   | A language is **Turing-acceptable** if some Turing machine accepts it.


.. slide:: Turing-acceptable Languages (2)

   | Can a Turing acceptable be rewritten to be Turing decidable?
   |    Of course. Instead of just accepting a string in the
        language, print :math:`\fbox{Y}`.
   |    Otherwise, print :math:`\fbox{N}`.
   |    Need to "clean up" either way.

   | Every Turing-decidable language is Turing-acceptable.
   |    If we would have printed :math:`\fbox{Y}`, then halt on an accept state.
   |    If we would have printed :math:`\fbox{N}`, then do not halt on an accept state.


.. slide:: Turing-acceptable Languages (3)

   | Is every Turing-acceptible language Turing decidable?
   |    This is the Halting Problem.

   | Of course, if the TA language would halt, we write :math:`\fbox{Y}`.
   | But if the TA lang would not halt on an accept state, it may loop forever, can we always replace it with
     logic to write :math:`\fbox{N}` instead?
   |    Example: Collatz function.

   | Does the following loop terminate for ALL positive integers n?
      while (n > 1)
        if (even(n))          n = n/2;
        else          n = 3n + 1;

