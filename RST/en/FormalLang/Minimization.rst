.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires: Deterministic Finite Automata
   :satisfies: DFA minimization
   :topic: Finite Automata


Minimizing the Number of States in a DFA
========================================

Minimizing the Number of States in a DFA
----------------------------------------

Why do we need to do this?

If you have an NFA with :math:`n` states, what is the maximum number 
of states in the equivalent DFA created? :math:`2^n` 

**Algorithm**

Identify states that are indistinguishable

* These states form a new state


**Definition**: Two states :math:`p` and :math:`q` are
indistinquishable if for all :math:`w \in \Sigma^*`

.. math::

   \begin{eqnarray*}
   \delta^*(q, w) \in F &\Rightarrow& \delta^*(p, w) \in F\\
   \delta^*(p, w) \not\in F &\Rightarrow& \delta^*(q, w) \not\in F\\
   \end{eqnarray*}

**Definition**: Two states :math:`p` and :math:`q` are distinquishable
if :math:`\exists w \in \Sigma^*` such that

.. math::

   \begin{eqnarray*}
   \delta^*(q, w)\in F &\Rightarrow& \delta^*(p, w) \not\in F \mathrm{OR}\\
   \delta^*(q, w) \not\in F &\Rightarrow& \delta^*(p, w) \in F
   \end{eqnarray*}

:math:`p` and :math:`q` appear to be different. 

**Example**:

Look at A on a, ab 

Look at F on a, ab 

Look at D on a, ab 

.. note::

   This is in file ~rodger/cl/cps140/jflapex/chap2mindfa1.jff 

.. odsafig:: Images/stmindfa1s.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Minimization 1

   Minimization 1


**Example**:

.. note::
   
   This is in file ~rodger/cl/cps140/jflapex/chap2mindfa2.jff 

.. odsafig:: Images/stmindfa2s.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Minimization 2

   Minimization 2
