.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
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
   | The letters that can appear on the tape are an important part of the definition for a given Turing machine.
   | The alphabet of the machine is these letters that may appear in the input.
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

   * :math:`Q = \{q_0, q_1\}`,
   * :math:`\Sigma = \{a\}`,
   * :math:`\Gamma = \Sigma \cup \{\#\}`,
   * :math:`s = q_0`,
   * :math:`F = {q_1}`,
   * :math:`\delta =`

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
      :scripts: lib/underscore.js DataStructures/FLA/FA.js AV/Development/formal_language/TuringMachine.js AV/VisFormalLang/TM/RClearCON.js
      :align: center
      :output: show


.. slide:: Turing Machine Example 2

   .. inlineav:: TMabcCON dgm
      :links: DataStructures/FLA/FLA.css AV/VisFormalLang/TM/TMabcCON.css
      :scripts: lib/underscore.js DataStructures/FLA/FA.js AV/Development/formal_language/TuringMachine.js AV/VisFormalLang/TM/TMabcCON.js
      :align: center


.. slide:: Notation

   A :term:`configuration` for a Turing machine looks like this:

   .. math::
      (q, aaba\#\underline{\#}a)

   This means that the TM is on state :math:`q`,
   the tape contains :math:`aaba\#\underline{\#}a` and read / write
   head position is on the underlined :math:`a`. In this book, any TM
   starts running with the read/write head position is on the first Tape letter
   from the left.

.. slide:: Notation

   A :term:`halted configuration` occurs when the machine do not find
   a move from the given state using the tape letter (the current configuration).
   In other words, TM halts if there is no :math:`\Delta` defined. That is why
   in this book we always assume that there are no transitions defined
   out of the final state. Therefore, any TM will halt once it entered a
   final state.

.. slide:: Notation

   | A :term:`computation` is a sequence of configurations for some
     length :math:`n \geq 0`.
   | Recall the TM example that earases all a's from the tape.
     Here are the cofigurations for the input aaaa


   | :math:`(q_0, \underline{a}aaa) \vdash_M\ (q_0, \underline{\#}aaa)`
   | :math:`\vdash_M\ (q_0, \#\underline{\#}aa)`
   | :math:`\vdash_M\ (q_0, \#\#\underline{\#}a)`
   | :math:`\vdash_M\ (q_0, \#\#\#\underline{\#})`
   | :math:`\vdash_M\ (q_1, \#\#\#\#\underline{\#})`
   |    :math:`\ `

.. 
.. slide:: Computations
/
   | :math:`M` is said to **halt on input** :math:`w` iff
     :math:`(s,\ \#w\underline{\#})` yields some halted configuration.
   | :math:`M` is said to **hang on input** :math:`w` if
     :math:`(s,\ \#w\underline{\#})` yields some hanging configuration.
   | Turing machines compute functions from strings to strings.
   | Formally: Let :math:`f` be a function from :math:`\Sigma^*_0` to
     :math:`\Sigma^*_1`.
   | Turing machine :math:`M` is said to **compute** :math:`f` if:
   |    For any :math:`w \in \Sigma^*_0`, if :math:`f(w) = u` then
        :math:`(s,\ \#w\underline{\#}) \vdash^*_M (h,\ \#u\underline{\#})`.
   | :math:`f` is said to be a **Turing-computable function**.
   | Multiple parameters: :math:`f(w_1, ..., w_k) = u`,
     :math:`(s,\ \#w_1\#w_2\#...\#w_k\underline{\#}) \vdash^*_M (h,\ \#u\underline{\#})`. 
/
/
.. slide:: Functions on Natural Numbers
/
   | Represent numbers in **unary** notation on symbol :math:`I`
     (zero is represented by the empty string).
   | :math:`f: \mathbb{N} \rightarrow \mathbb{N}`
     is computed by :math:`M` if :math:`M` computes
     :math:`f': \{I\}^* \rightarrow \{I\}^*` where :math:`f'(I^n) = I^{f(n)}`
     for each :math:`n \in \mathbb{N}`.
   | Example: :math:`f(n) = n + 1` for each :math:`n \in \mathbb{N}`.
   |    :math:`\begin{array}{lll} \hline q&\sigma&\delta(q, \sigma)\\ \hline q_0&I&(h, R)\\ q_0&\#&(q_0, I)\\ \end{array}`
   |
   | :math:`(q_0,\ \#II\underline{\#}) \vdash_M (q_0,\ \#II\underline{I}) \vdash_M
     (h,\ \#III\underline{\#})`.
   | In general,
     :math:`(q_0,\ \#I^n\underline{\#}) \vdash^*_M (h,\ \#I^{n+1}\underline{\#})`.
     What about :math:`n = 0`?
/
   .. There are many views of computation.
      One is functions mapping input to output
      (:math:`\mathbb{N} \rightarrow \mathbb{N}`), or 
      strings to strings, for examples.
      Another is deciding if a string is in a language.
