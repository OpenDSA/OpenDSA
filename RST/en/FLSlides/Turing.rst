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

                
Turing Machines
===============

.. slide:: A General Model of Computation

   | Want a general model of computation that is as simple as possible.
   |   Our key concern now is **ability** (we want to do "anything),
       but not **efficiency**.
   |   **Transducer**: Change the value of a string (convert input to output)
   |   Wish to be able to reason about the model.
   |   "State machines" are simple.
   |
   | Necessary features:
   |   Read
   |   Write
   |   Compute

   .. So far, we have only looked at the ability to "accept"
      strings. This is only one way to look at
      computation. Fundamentally, we want to be able to modify
      strings. We will see that this also gives us the ability to
      compute mathematical functions.


.. slide:: Turing Machines (1)

   .. A Turing machine is sufficiently complex that a Turing machine
      can be built that can take as input a coding for an arbitrary
      Turing machine, along with an input, and simulate its execution
      on that input.

   | A tape, divided into squares.
   | A single I/O head:
   |    Read current symbol
   |    Change current symbol
   | States
   | Control Unit Actions:
   |   (1) Put the control unit into a new state.
   |   (2) And
   |      (a) Write a symbol in current tape square.
   |      (b) Move I/O head one square left, right, or stay at the current cell.


.. slide:: Turing Machines (2)

   | Tape has an infinite left end, and right end.
   | The symbols that can appear on the tape are an important part of the definition for a given Turing machine.
   | The alphabet of the machine is these symbols that may appear in the input.
   | There is also the blank character ''#''



.. slide:: Formal definition of Turing Machine

   | A Turing machine is formally defined as
    (:math:`Q`, :math:`\Sigma`, :math:`\Gamma`, $s$,
    :math:`F`, :math:`\delta`) where

   |    :math:`Q` is a finite set of states.
   |    :math:`\Sigma` is an alphabet. This is used to define the input.
   |    :math:`\Gamma` is another alphabet that at least includes :math:`\Sigma` and
        :math:`\#`. It might include other symbols, and is the alphabet used
         by the computational process.
   |    :math:`s \in Q` is the :term:`initial state`.
   |    :math:`F \subset Q` is the set of :term:`final states <final state>`.
   |    :math:`\delta` is a partial function from :math:`Q \times \Gamma` to
        
.. slide:: Formal definition of Turing Machine

   The machine operates as follows: For :math:`q \in Q`, :math:`a \in \Sigma` and
   :math:`\delta(q, a) = (p, b, m)`,
   when in state :math:`q` and scanning :math:`a`,
   enter state :math:`p`, replace :math:`a` with :math:`b`, and move the head
   (:math:`m` is :math:`L`, :math:`R`, or :math:`S`).

.. slide:: Formal definition of Turing Machine

   To do computation, we have to have some conventions about starting and
   ending the process.
   The machine stops immediately if (1) it enters any :term:`final state`,
   or (2) it is in a state and scans a character for which there is no
   transition.
   (Note that there are many ways to define Turing Machines, and some
   definitions require an explicit reject state. We do not.)

.. slide:: Turing Machine Example 1

   :math:`M = (Q, \Sigma, \Gamma, s, F, \delta)` where

   | :math:`Q = \{q_0, q_1\}`,
   | :math:`\Sigma = \{a\}`,
   | :math:`\Gamma = \Sigma \cup \{\#\}`,
   | :math:`s = q_0`,
   | :math:`F = {q_1}`,
   | :math:`\delta =`

     .. math::

        \begin{array}{lll}
        \hline
        q&\gamma&\delta(q, \gamma)\\
        \hline
        q_0&a&(q_0, \#, R)\\
        q_0&\#&(q_1, \#, S)\\
        \end{array}

.. slide:: Turing Machine Example 1

   .. inlineav:: RClearCON ss
      :long_name: Turing Machine RClear
      :links: DataStructures/FLA/FLA.css AV/VisFormalLang/TM/RClearCON.css
      :scripts: DataStructures/FLA/FA.js DataStructures/FLA/TuringMachine.js AV/VisFormalLang/TM/RClearCON.js
      :align: center
      :output: show


.. slide:: Turing Machine Example 2

   .. inlineav:: TMabcCON dgm
      :links: DataStructures/FLA/FLA.css AV/VisFormalLang/TM/TMabcCON.css
      :scripts: lib/underscore.js DataStructures/FLA/FA.js AV/Development/formal_language/TuringMachine.js AV/VisFormalLang/TM/TMabcCON.js
      :align: center


.. slide:: Notation

   A :term:`configuration` for a Turing machine looks like this:
   :math:`(q, \#\underline{a}aba\#)`.

   This means that the TM is on state :math:`q`,
   the tape contains :math:`\#aaba\#` and read / write
   head position is on the underlined :math:`a`.

   Any TM starts with the read/write head position on
   the first tape symbol from the left.

.. slide:: Notation

   A :term:`halted configuration` occurs when the machine do not find
   a move from the given state using the tape symbols
   (the current configuration).

   In other words, TM halts if there is no :math:`\delta` defined.
   That is why we always assume that there are no transitions defined
   out of the final state.
   Therefore, any TM will halt once it entered a final state.

   
.. slide:: Notation

   | A :term:`computation` is a sequence of configurations for some
     length :math:`n \geq 0`.
   | Recall the TM example that earases all a's from the tape.
     Here are the cofigurations for the input aaaa.


   | :math:`(q_0, \underline{a}aaa) \vdash_M\ (q_0, \#\underline{a}aa)`
   | :math:`\vdash_M\ (q_0, \#\#\underline{a}a)`
   | :math:`\vdash_M\ (q_0, \#\#\#\underline{a})`
   | :math:`\vdash_M\ (q_0, \#\#\#\#\underline{\#})`
   | :math:`\vdash_M\ (q_1, \#\#\#\#\underline{\#})`
   |    :math:`\ `


.. slide:: Hanging
           
   The machine **hangs** when it goes into an infinite loop

   This machine processes strings of a's and b's. It scans right until
   it sees (the first) 'b'.

   .. inlineav:: TMabCON dgm
      :links: DataStructures/FLA/FLA.css AV/VisFormalLang/TM/TMabCON.css
      :scripts: lib/underscore.js DataStructures/FLA/FA.js AV/Development/formal_language/TuringMachine.js AV/VisFormalLang/TM/TMabCON.js
      :align: center
      :output: show

   
.. slide:: Acceptors and Transducers

   We have become used to machines that act as acceptors. We gave a
   definition for accept vs. reject for Turing machines.

   A **Transducer** converts one string to another.

.. slide:: Transducers

   | Formally: Let :math:`f` be a function from :math:`\Sigma^*_0`
     to :math:`\Sigma^*_1`. Turing machine :math:`M` is said to compute
     :math:`f` when, for any string :math:`w \in \Sigma^*_0`,
     if :math:`f(w) = u` then
   |    :math:`\qquad (s, \#\underline{w}) \vdash^*_M (h, \#u\underline{\#})`
   | for some state :math:`h \\in F` (that is, a Final State for :math:`M`).
   | Such a function :math:`f` is said to be a **Turing-computable function**.

   Notice that we require the machine to start with the head under the
   first symbol of the input string, and end in the first space after
   the output string.


.. slide:: Multiple Parameters

   Here is how we express multiple parameters for a function
   :math:`f(w_1, ..., w_k) = u`:

       
   :math:`\qquad (s, \#\underline{w_1}\#w_2\#...\#w_k) \vdash^*_M (h, \#u\underline{\#})`.


.. slide:: Numbers

   .. inlineav:: TMPlusoneCON ss
      :long_name: Turing Machine Replace
      :links: DataStructures/FLA/FLA.css AV/VisFormalLang/TM/TMPlusoneCON.css
      :scripts: lib/underscore.js DataStructures/FLA/FA.js AV/Development/formal_language/TuringMachine.js AV/VisFormalLang/TM/TMPlusoneCON.js
      :align: center
      :output: show
           

