.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires: Non-deterministic Finite Automata
   :satisfies: NFA Minimization
   :topic: NFA

.. slideconf::
   :autoslides: False


Minimizing the Number of States in a DFA
========================================

.. slide:: Minimizing the Number of States in a DFA

   Why do we need to do this?

   If you have an NFA with :math:`n` states, what is the maximum number 
   of states in the equivalent DFA created?

   ..  :math:`2^n`


.. slide:: Minimization Algorithm Concept

   Identify states that are indistinguishable

   * These states will collectively form a new state in the minimized
     machine.


.. slide:: Distinguishable States (1)

   **Definition**: Two states :math:`p` and :math:`q` are
   indistinquishable if for all :math:`w \in \Sigma^*`

   | :math:`\delta^*(q, w) \in F \Rightarrow \delta^*(p, w) \in F`
   | :math:`\delta^*(p, w) \not\in F \Rightarrow \delta^*(q, w) \not\in F`

   **Definition**: Two states :math:`p` and :math:`q` are distinquishable
   if :math:`\exists w \in \Sigma^*` such that

   | :math:`\delta^*(q, w) \in F \Rightarrow \delta^*(p, w) \not \in F` OR
   | :math:`\delta^*(q, w) \not \in F \Rightarrow \delta^*(p, w) \in F`

   :math:`p` and :math:`q` appear to be different. 

   << What does this mean? >>

.. slide:: Distinguishable States (2)

   All that an acceptor cares about is accepting or rejecting strings.

   Select any pair of states, :math:`p` and :math:`q`.

   * If, in either case, we accept/reject the exact same set set of
     strings, then there is no difference between them.
   * So, we can combine them.
   * Remember the definition for :math:`\delta^*(p, w)`.
     Look at things this way:
     It is telling us that we don't care about the prior history before
     we got to the current state with whatever remains of the input.

   Distinguishability is an equivalence relation.


.. slide:: Example 1 (1)

   .. odsafig:: Images/stmindfa1spart.png
      :width: 400
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: Minimization 1

   Look at A on a, ab. Look at F on a, ab. Look at D on a, ab.

   .. A on a is non-final, and on ab is final.
   .. F on a is non-final, and on ab is non-final.
   .. D on a is non-final, and on ab is final.
   .. So clearly, F can't be grouped with A or D.


.. slide:: Algorithm

   #. Remove all inaccessible states.
   #. Consider all pairs of states :math:`(p, q)`.
      If :math:`p \in F` and :math:`q \not \in F` or vice versa, then
      mark the pair :math:`(p, q)` as distinguishable.
   #. | Repeat the following step until no previously unmarked pairs
        are marked:
      | For all pairs :math:`(p, q)` and all :math:`a \in \Sigma`,
        compute :math:`\delta(p, a) = p_a` and
        :math:`\delta(q, a) = q_a`.
      | If the pair :math:`(p_a, q_a)` is marked as distinguishable,
        mark :math:`(p, q)` as distinguishable.

   Gather together the indistingushable pairs into groups.
   Each group is a state in the new machine.

   Finally, a (new machine) state :math:`q_i` is final if and only if
   *any* of its base states (from the old machine) are final.


.. slide:: Example 1 (2)

   .. avembed:: AV/OpenFLAP/examples/dfaminimization2.html ss
      :long_name: Minimization example 1


.. slide:: Example 2

   .. avembed:: AV/OpenFLAP/examples/dfaminimization1.html ss
      :long_name: Minimization example 2
