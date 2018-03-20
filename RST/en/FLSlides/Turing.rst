.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires:
   :satisfies: Turing Machines
   :topic: Finite Automata

.. slideconf::
   :autoslides: False

                
Turing Machines
===============

.. slide:: A General Model of Computation

   | Want a general model of computation that is as simple as possible.
   |   Wish to be able to reason about the model.
   |   "State machines" are simple.

   | Necessary features:
   |   Read
   |   Write
   |   Compute

   .. note::

      Our key concern now is **ability** not **efficiency**.


.. slide:: Turing Machines (1)

   .. note::

      A Turing machine is sufficiently complex that a Turing machine
      can be built that can take as input a coding for an arbitrary
      Turing machine, along with an input, and simulate its execution
      on that input.

   A tape, divided into squares.

   | A single I/O head:
   |    Read current symbol
   |    Change current symbol

   States

   | Control Unit Actions:
   |   Put the control unit into a new state.
   |   Either:
   |      Write a symbol in current tape square.
   |      Move I/O head one square left or right.


.. slide:: Turing Machines (2)

   | Tape has a fixed left end, infinite right end.
   |    Machine ceases to operate if head moves off left end.
   |    By convention, input is placed on left end of tape.

   A *halt* state (:math:`h`) signals end of computation.

   "#" indicates a blank tape square.


.. slide:: Formal definition of Turing Machine

   | A **Turing Machine** is a quadruple
     :math:`(K, \Sigma, \delta, s)` where
   |    :math:`K` is a finite set of states (not including :math:`h`).
   |    :math:`\Sigma is an alphabet (containing #, not :math:`L` or
        :math:`R`).
   |    :math:`s \in K` is the start
   |    :math:`\delta` is a function from :math:`K \times \Sigma` to
        :math:`(K \cup \{h\}) \times (\Sigma \cup \{L, R\})`.

   .. note::

      # is ``space.
      We include # in the language is for convenience only!
      We want to be able to read our specifications without being confused.

   | If :math:`q \in K`, :math:`a \in \Sigma`, and
     :math:`\delta(q, a) = (p, b)`,
     then when in state :math:`q` and scanning :math:`a`,
     enter state :math:`p` and
   |    If :math:`b \in \Sigma` then replace :math:`a` with :math:`b`.
   |    Else (:math:`b` is :math:`L` or :math:`R`): move head.


.. slide:: Turing Machine Example 1

   | :math:`M = (K, \Sigma, \delta, s)` where
   |    :math:`K = \{q_0, q_1\}`,
   |    :math:`\Sigma = \{a, \#\}`,
   |    :math:`s = q_0`,
   |    :math:`\delta =`

   .. math::

      \begin{array}{lll}
      \hline
      q&\sigma&\delta(q, \sigma)\\
      \hline
      q_0&a&(q_1, \#)\\
      q_0&\#&(h, \#)\\
      q_1&a&(q_0, a)\\
      q_1&\#&(q_0, R)\\
      \end{array}

   .. note::

      State (:math:`q_1, a`) cannot happen if the start state
      is :math:`q_0`. 
      This is included only for completness (to make :math:`\delta` a
      total function).

   Scan right, changing a's to #'s. When we hit first #, halt.


.. slide:: Turing Machine Example 2

   | :math:`M = (K, \Sigma, \delta, s)` where
   |    :math:`K = \{q_0\}`,
   |    :math:`\Sigma = \{a, \#\}`,
   |    :math:`s = q_0`,
   |    :math:`\delta =`

   .. math::

      \begin{array}{lll}
      \hline
      q&\sigma&\delta(q, \sigma)\\
      \hline
      q_0&a&(q_0, L)\\
      q_0&\#&(h, \#)\\
      \end{array}

   Scan left to #. Then halt.


.. slide:: Notation

   **Configuration:** :math:`(q, aaba\#\underline{\#}a)`

   .. note::

      First symbol after the comma is the leftmost square of the tape.
      The underscore shows placement of the head.
      After the last symbol is an infinte series of spaces.}


   **Halted configuration:** :math:`q` is :math:`h`.

   **Hanging configuration:** Move left from leftmost square.

   A **computation** is a sequence of configurations for
   some :math:`n \geq 0`.  Such a computation is of **length**
   :math:`n`.


.. slide:: Execution

   Execution on first machine example.


   .. math::

      \begin{eqnarray*}
      (q_0, \underline{a}aaa) &\vdash_M&(q_1, \underline{\#}aaa)\\
      &\vdash_M&(q_0, \#\underline{a}aa)\\
      &\vdash_M&(q_1, \#\underline{\#}aa)\\
      &\vdash_M&(q_0, \#\#\underline{a}a)\\
      &\vdash_M&(q_1, \#\#\underline{\#}a)\\
      &\vdash_M&(q_0, \#\#\#\underline{a})\\
      &\vdash_M&(q_1, \#\#\#\underline{\#})\\
      &\vdash_M&(q_0, \#\#\#\#\underline{\#})\\
      &\vdash_M&(h, \#\#\#\#\underline{\#})\\
      \end{eqnarray*}


.. slide:: Computations

   | :math:`M` is said to **halt on input** :math:`w` iff
     :math:`(s, \#w\underline{\#})` yields some halted configuration.
   | :math:`M` is said to **hang on input** :math:`w` if
     :math:`(s,\#w\underline{\#})` yields some hanging configuration.
   | Turing machines compute functions from strings to strings.
   | Formally: Let :math:`f` be a function from :math:`\Sigma^*_0` to
     :math:`\Sigma^*_1`.
   | Turing machine :math:`M` is said to **compute** :math:`f` if for
     any :math:`w \in \Sigma^*_0`, if :math:`f(w) = u` then
   |    :math:`(s, \#w\underline{\#}) \vdash^*_M (h, \#u\underline{\#})`.
   | :math:`f is said to be a **Turing-computable function**.
   | Multiple parameters: :math:`f(w_1, ..., w_k) = u`,
     :math:`(s, \#w_1\#w_2\#...\#w_k\underline{\#}) \vdash^*_M (h, \#u\underline{\#})`. 


.. slide:: Functions on Natural Numbers

   | Represent numbers in **unary** notation on symbol :math:`I`
     (zero is represented by the empty string).
   | :math:`f: \Nat \rightarrow \Nat` is computed by :math:`M` if
     :math:`M` computes
     :math:`f': \{I\}^* \rightarrow \{I\}^*$ where $f'(I^n) = I^{f(n)}`
     for each :math:`n \in \Nat`.
   | Example: :math:`f(n) = n + 1` for each :math:`n \in \Nat`.

   .. math::
      
      \begin{array}{lll}
      \hline
      q&\sigma&\delta(q, \sigma)\\
      \hline
      q_0&I&(h, R)\\
      q_0&\#&(q_0, I)\\
      \end{array}

   :math:`(q_0, \#II\underline{\#}) \vdash_M (q_0, \#II\underline{I}) \vdash_M
   (h, \#III\underline{\#})`.

   | In general,
     :math:`(q_0, \#I^n\underline{\#}) \vdash^*_M (h, \#I^{n+1}\underline{\#})`.
   | What about :math:`n = 0`?


.. slide:: Turing-decidable Languages

   A language :math:`L \subset \Sigma_0^*` is **Turing-decidable** iff
   function :math:`\chi_L: \Sigma^*_0 \rightarrow \{\fbox{Y}, \fbox{N}\}`
   is Turing-computable, where for each :math:`w \in \Sigma^*_0`,

   .. math::

      \chi_L(w) = \left\{
      \begin{array}{ll}
      \fbox{Y} & \mbox{if $w \in L$}\\
      \fbox{N}  & \mbox{otherwise}
      \end{array}
      \right.

   Ex: Let :math:`\Sigma_0 = \{a\}`, and let
   :math:`L = \{w \in \Sigma^*_0: |w|\ \mbox{is even}\}`.


   :math:`M` erases the marks from right to left, with current parity
   encode by state.
   Once blank at left is reached, mark :math:`\fbox{Y}` or
   :math:`\fbox{N}` as appropriate.

   .. note::

      There are many views of computation.
      One is functions mapping input to output
      (:math:`N \rightarrow N`, or 
      strings to strings, for examples.
      Another is deciding if a string is in a language.
