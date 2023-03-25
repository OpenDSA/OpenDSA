.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger, Cliff Shaffer, and Mostafa Mohammed
   :requires: Nondeterministic Pushdown Automata
   :satisfies: Deterministic Pushdown Automata
   :topic: Finite Automata

.. slideconf::
   :autoslides: False


Deterministic Pushdown Automata
===============================

.. slide:: Deterministic Pushdown Automata

   **Definition:** A PDA
   :math:`M = (Q, \Sigma, \Gamma, \delta, q_0, z, F)` is
   *deterministic* if for every 
   :math:`q \in Q`, :math:`a \in \Sigma \cup \{\lambda\}`,
   :math:`b \in \Gamma`:

      | 1. :math:`\delta(q, a, b)` contains at most one element
      | 2. if :math:`\delta(q, \lambda, b)` is not empty, then
           :math:`\delta(q, c, b)` must be empty for every
           :math:`c \in \Sigma`. 

   **Definition:** :math:`L` is a *deterministic context-free language*
   (DCFL) if and only if there exists a deterministic PDA
   :math:`M` such that :math:`L = L(M)`.


.. slide:: Deterministic Example (1)

   The language :math:`L = \{a^nb^n | n \ge 1\}` is a deterministic CFL.

   | **Proof**: The PDA
     :math:`M = (\{q_0, q_1, q_2, q_3\}, \{a, b\}, \{0, 1\}, \delta, q_0, Z, \{q_3\})`
     with
   |    :math:`\delta(q_0, a, Z) = \{(q_1, 1Z)\}`,
   |    :math:`\delta(q_1, a, 1) = \{(q_1, 11)\}`,
   |    :math:`\delta(q_1, b, 1) = \{(q_2, \lambda)\}`,
   |    :math:`\delta(q_2, b, 1) = \{(q_2, \lambda)\}`,
   |    :math:`\delta(q_2, \lambda, Z) = \{(q_3, \lambda)\}`
   | accepts the given language.
   | It satisfies the conditions for being deterministic.


.. slide:: Deterministic Example (2)

   | Note that this machine DOES have :math:`\lambda` transitions.
   | The key point is that there is still only one choice (because of what
     is sitting on the top of the stack).
   |    In that sense, it is not merely a "free ride" transition.


.. slide:: Non-deterministic Example
           
   Our previous PDA for :math:`\{ww^R | w\in{\Sigma}^{+}\}, \Sigma = \{a, b\}`
   is nondeterministic.

   | It contains these transitions:
   |   :math:`\delta(q_0, a, a) = \{(q_0, aa)\}`
   |   :math:`\delta(q_0, \lambda, a) = \{(q_1, a)\}`

   This violates our conditions for determinism. << Do you see why? >>

   Now, this fact that we have a PDA that is not deterministic certainly
   does **not** prove that 
   :math:`\{ww^R | w\in{\Sigma}^{+}\}, \Sigma = \{a, b\}`
   is not a deterministic CFL.

   But, there are CFL's that are not deterministic.
   This is one of them.


.. slide:: Another Non-deterministic Example

   :math:`L = \{a^nb^n|n \ge 1\} \cup \{a^nb^{2n}| n\ge 1\}` is a CFL and
   not a DCFL.

   | Obviously, both languages are CFL.
   | And obviously, their union is CFL.
   | But imagine how the "obvious" NPDA works:
   |    The start state transitions to the "correct" machine to recognize a
        string in either language.
   |    But how can we do this deterministically?
   |    We would need a completely different approach to be deterministic.
   | This is not a proof that the language is not deterministic, but next
     is one.


   
.. slide:: Proof (1)

   | **Theorem**:
     :math:`L = \{a^nb^n: n \ge 1\} \cup \{a^nb^{2n}: n \ge 1\}` is not
     a DCFL
   |    (because :math:`a^nb^nc^n` is not a CFL).

   | **Proof:**
   |    Assume that there is a deterministic PDA :math:`M` such that
        :math:`L = L(M)`.
   |    We will construct a PDA that recognizes a language that is not a CFL and
        derive a contradiction.

  
.. slide:: Proof (2)

   | Construct a PDA :math:`M'` as follows:
   |   1. Create two copies of :math:`M: M_1` and :math:`M_2`.
          The same state in :math:`M_1` and :math:`M_2` are called cousins.
   |   2. Remove accept status from accept states in :math:`M_1`,
          remove initial status from initial state in :math:`M_2`.
          In new PDA, we will start in :math:`M_1` and accept in :math:`M_2`.
   |   3. Outgoing arcs from old accept states in :math:`M_1`,
          change to end up in the cousin of its destination in
          :math:`M_2`.
          This joins :math:`M_1` and :math:`M_2` into one PDA.
          There must be an outgoing arc since you must recognize
          both :math:`a^nb^n` and :math:`a^nb^{2n}`.
          After reading :math:`n` b's, must accept if no more b's and 
          continue if there are more b's.
   |   4. Modify all transitions that read :math:`b`, have their
          destinations in :math:`M_2` to read :math:`c`. 
   | This is the construction of our new PDA. 


.. slide:: Proof (3)

   | When we read :math:`a^nb^n` and end up in an old accept state in
     :math:`M_1`, then we will transfer to :math:`M_2` and read the
     rest of :math:`a^nb^{2n}`.
     Only the b's in :math:`M_2` have been replaced by c's,
     so the new machine accepts :math:`a^nb^nc^n`.

   | The language accepted by our new PDA is :math:`a^nb^nc^n`.
     But this is not a CFL. Contradiction! Thus there is no
     deterministic PDA :math:`M` such that :math:`L(M) = L`. 


.. slide:: A New Model of the FL Universe

   Based on this information, we now can update our model of the Formal
   Languages Universe.

   .. odsafig:: Images/lt8hier.png
      :width: 300
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt8hier
