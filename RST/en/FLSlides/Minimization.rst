.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
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
   of states in the equivalent DFA created? :math:`2^n` 


.. slide:: Minimization Algorithm (1)

   Identify states that are indistinguishable

   * These states form a new state


.. slide:: Minimization Algorithm (2)

   **Definition**: Two states :math:`p` and :math:`q` are
   indistinquishable if for all :math:`w \in \Sigma^*`

   | :math:`\delta^*(q, w) \in F \Rightarrow \delta^*(p, w) \in F`
   | :math:`\delta^*(p, w) \not\in F \Rightarrow \delta^*(q, w) \not\in F`

   **Definition**: Two states :math:`p` and :math:`q` are distinquishable
   if :math:`\exists w \in \Sigma^*` such that

   | :math:`\delta^*(q, w) \in F \Rightarrow \delta^*(p, w) \not \in F` OR
   | :math:`\delta^*(q, w) \not \in F \Rightarrow \delta^*(p, w) \in F`

   :math:`p` and :math:`q` appear to be different. 


.. slide:: Example

   Look at A on a, ab 

   Look at F on a, ab 

   Look at D on a, ab 

   << This is in file ~rodger/cl/cps140/jflapex/chap2mindfa1.jff >>


.. slide:: Result
           
   .. odsafig:: Images/stmindfa1s.png
      :width: 500
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: Minimization 1


.. slide:: Example 2

   .. odsafig:: Images/stmindfa2s.png
      :width: 500
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: Minimization 2
