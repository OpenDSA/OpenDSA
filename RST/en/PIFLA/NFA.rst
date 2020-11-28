.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger, Cliff Shaffer, and Mostafa Mohammed, John Taylor
   :requires: Deterministic Finite Automata
   :satisfies: Non-deterministic Finite Automata
   :topic: Finite Automata

NFA: Non-Deterministic Finite Automata
======================================

Non-Deterministic Finite Automata
---------------------------------

Lots of times we have to make decisions.
Sometimes, once we make the decision, we cannot undo it.
Sometimes, we can go back, change our minds, make the other choice.
But even then, we still had to spend the time investigating the false
path.

Imagine that when we came to a decision point, we could clone
ourselves, follow both paths, and then just "become" the version that
turns out to be the better choice.
Wouldn't that be a hugely powerful upgrade to our lives?

That gets into some pretty complicated philosophy in real life.
But in the world of Finite Automata, the concept of
:term:`nondeterminism` turns out to be something that we can make
quite concrete.
In this module, we study what it means to make an FA nondeterministic,
and whether it really even matters in the end.

.. inlineav:: NFAFS ff
   :links:  DataStructures/FLA/FLA.css AV/PIFLA/FA/NFAFS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js AV/PIFLA/FA/NFAFS.js
   :output: show


NFA vs. DFA: Which is more powerful?
------------------------------------

Consider the following NFA.

.. inlineav:: NFA2DFAaCON dgm
   :links: DataStructures/FLA/FLA.css AV/VisFormalLang/FA/NFA2DFACON.css
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/FA/NFA2DFAaCON.js
   :align: center

   An NFA.

.. note::

   Q: What language is this?

   A: Alternating a's and b's, starting with a.

Can this NFA be converted to a DFA?

Yes, because here is one.
Note that the names of the states are chosen
to help you to see their relationships to the original NFA.

.. inlineav:: NFA2DFAbCON dgm
   :links: DataStructures/FLA/FLA.css AV/VisFormalLang/FA/NFA2DFACON.css
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/FA/NFA2DFAbCON.js
   :align: center

   A DFA that accepts the same language.

.. TODO::
   :type: Frameset

   Create a small frameset of the material above. Mostly to make the
   student think about what the language is.

Now we are ready for the main event: Proving that every NFA can be
converted to a DFA, and therefore the two machine types are equally
powerful.
We do this using Proof by Construction: We have an algorithm that
converts any NFA to an equivalent DFA.

.. topic:: Theorem and Proof

   **Theorem**: Given some NFA
   :math:`M_N = (Q_N, \Sigma, \delta_N, q_0, F_N)`,
   there exists a DFA :math:`M_D = (Q_D, \Sigma, \delta_D, q_0, F_D)`
   such that :math:`L(M_N) = L(M_D)`.

   **Proof**:
   We can use an algorithm to convert :math:`M_N` to :math:`M_D`.

   * :math:`Q_D = 2^{Q_N}` (the powerset of :math:`Q_N`)

   * :math:`F_D = \{Q\in Q_D \mid \exists q_i \in Q \mathrm{with} q_i \in F_N \}`
     
     Interpretation: A state :math:`q_D` in :math:`M_D` is final if
     **any** of the states from :math:`M_N` in the subset that
     :math:`q_D` corresponds to is final.
            
   * :math:`\delta_D : Q_D \times \Sigma \rightarrow Q_D`

   **Algorithm to construct** :math:`M_D`

   #. The start state for :math:`M_D` is
      :math:`\{q_0\} \cup \mathrm{closure}(q_0)`.
      ("Closure" of :math:`q_0` is a set of states defined as
      :math:`q_0` plus all states reachable from :math:`q_0` by
      :math:`\lambda` transitions.)

   #. While there is an edge to add
      (that is, while our DFA is missing a transition from
      :math:`\delta_D`):

      a) Choose a state :math:`A = \{q_i, q_j, ..., q_k\}` with a
         missing edge for :math:`a \in \Sigma` 
      b) Compute :math:`B = \delta^{*}(q_i, a) \cup
         \delta^{*}(q_j, a) \cup \ldots \cup \delta^{*}(q_k, a)`
      c) Add state :math:`B` to :math:`M_D` if it doesn't already exist
      d) Add an edge from :math:`A` to :math:`B` with label :math:`a`

   #. Identify final states.

      For a state in :math:`Q_D`, if any of its base :math:`Q_N`
      states are final, then it is final.

   #. If :math:`\lambda \in L(M_N)`, then make the start state final.

Intuition: Given a state in :math:`M_N` and a character, you can get
to some subset of the states in :math:`M_N`.
Consider **that** to be a state in :math:`M_D`.
There are only so many subsets of the set of :math:`M_N` states:
the members of the powerset of :math:`M_D` states.


NFA to DFA Conversion Example
-----------------------------

.. inlineav:: NFA2DFAlargeExFS ff
   :links: AV/PIFLA/FA/NFA2DFAlargeExFS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js AV/PIFLA/FA/NFA2DFAlargeExFS.js
   :output: show
