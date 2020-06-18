.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires: Deterministic Finite Automata
   :satisfies: Non-deterministic Finite Automata
   :topic: Finite Automata

Non-Deterministic Finite Automata
=================================

NFA: Non-Deterministic Finite Automata
--------------------------------------

**Definition**:

Define a NFA as :math:`(Q, \Sigma, \delta, q_0, F)` where  

* :math:`Q` is a finite set of states
* :math:`\Sigma` is the input alphabet (a finite set) 
* :math:`q_0` is the initial state (:math:`q_0 \in Q`)
* :math:`F \subseteq Q` is a set of final states
* :math:`\delta: Q \times(\Sigma \cup \{\lambda\}) \rightarrow 2^Q`
  (:math:`2^Q` here means the power set of :math:`Q`)

The specific difference from a DFA is that, while the result of
:math:`\delta` for the DFA is some state :math:`q \in Q`, the result of
:math:`\delta` for the NFA is any subset of :math:`Q`.

:term:`Non-deterministic` means that it allows choices.
From a state on input :math:`b`, :math:`\delta` might include
transitions to more than one state.

| Other differences:
|   We allow :math:`\lambda` transitions (a free
    ride to another state).
|   We allow transitions to a null subset of states.
    Consider this as a failed path.

**Example**:

.. inlineav:: test1 dgm
   :links: AV/OpenFLAP/test1.css
   :scripts: DataStructures/FL_resources/FA.js AV/OpenFLAP/test1.js
   :align: center

   Example of NFA

In this example, :math:`\delta(q_0, a) = \{q_1, q_2\}`.
(So, :math:`\delta` is no longer meets the mathematical definition
of a function!)

.. inlineav:: test2 dgm
   :links: AV/OpenFLAP/test2.css
   :scripts: AV/OpenFLAP/tape.js AV/OpenFLAP/test2.js
   :align: center

   Example of NFA

Hopefully this one is easy to understand: We two disjoint paths,
effectively giving us the union of two languages:
:math:`L = \{aa\} \cup \{ab^nb \mid n \ge 0\}`.
