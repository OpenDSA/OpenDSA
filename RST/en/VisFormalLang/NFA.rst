.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger, Cliff Shaffer, and Mostafa Mohammed
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

.. inlineav:: NFAexampleCON dgm
   :links: DataStructures/FLA/FLA.css AV/VisFormalLang/FA/NFAexampleCON.css
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/FA/NFAexampleCON.js
   :align: center

   Example of NFA

In this example, :math:`\delta(q_0, a) = \{q_1, q_2\}`.
(So, :math:`\delta` is no longer meets the mathematical definition
of a function!)

Hopefully this one is easy to understand: We two disjoint paths,
effectively giving us the union of two languages:
:math:`L = \{aa\} \cup \{ab^nb \mid n \ge 0\}`.

**Example**:

:math:`L = \{(ab)^n \mid n>0\} \cup \{a^nb \mid n>0\}`.

.. inlineav:: NFAexample2CON dgm
   :links: DataStructures/FLA/FLA.css AV/VisFormalLang/FA/NFAexample2CON.css
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/FA/NFAexample2CON.js
   :align: center

   Second Example of NFA:
   A simple "go this way or go the other way" choice.

**Definition**: :math:`q_j \in {\delta}^{*}(q_i,w)` if and only if
there exists some walk from :math:`q_i` to :math:`q_j` labeled :math:`w`.

From previous example:

:math:`\delta^{*}(q_0, ab) = \{q_5, q_6, q_1\}`.

:math:`\delta^{*}(q_0, aba) = \{q_3\}`. 

**Definition**: For an NFA :math:`M`,
:math:`L(M)= \{w \in {\Sigma}^{*} \mid \delta^{*}(q_0,w) \cap F \neq \emptyset \}`

What does this mean?
It means that the machine accepts all strings :math:`w` from the set
of all possible strings (generated from the alphabet :math:`\Sigma`)
such that the states reachable on :math:`w` from the start state
(:math:`q_0`) is in the final state set.

Note that it does not matter that there are paths where :math:`w` can go
wrong.
What matters is that there is at least one way for :math:`w` to be
right.

Why nondeterminism? It makes it easier to describe a FA.
What does "easier" mean?
It could mean easier to comprehend when looking at it.
Or maybe easier for the developer to write it.
Or maybe smaller (in terms of the number of states).
Or maybe it is more efficient (but probably not because
non-determinism can be expensive to simulate).
From a performance point of view, to determine if a string is accepted
can take a LONG time to try out all possibilities.
But, all that we care about right now is existance, not performance.


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

Yes, because here is one. Note that the names of the states are chosen
to help see their relationships to the original NFA.

.. inlineav:: NFA2DFAbCON dgm
   :links: DataStructures/FLA/FLA.css AV/VisFormalLang/FA/NFA2DFACON.css
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/FA/NFA2DFAbCON.js
   :align: center

   A DFA that accepts the same language.

.. note::

   Q: Is this a proof?

   A: Yes. It is a proof by construction. The theorem is of the form
   "There exists X". (In our case, it was written as "Does there
   exist a DFA that corresponds to **this** NFA?") The proof is of the
   form "Here is an example of X". (In our case, "Here is an acceptable
   DFA that answers the question".)

.. note::

   Try this conversion out using JFLAP.
   JFLAP can convert a NFA to a DFA.

 
.. topic:: Theorem and Proof

   **Theorem**: Given an NFA
   :math:`M_N = (Q_N, \Sigma, \delta_N, q_0, F_N)`,
   there exists a DFA :math:`M_D = (Q_D, \Sigma, \delta_D, q_0, F_D)`
   such that :math:`L(M_N) = L(M_D)`.

   **Proof**:
   We can use an algorithm to convert :math:`M_N` to :math:`M_D`.

   * :math:`Q_D = 2^{Q_N}` 

   * :math:`F_D = \{Q\in Q_D \mid \exists q_i \in Q \mathrm{with} q_i \in F_N \}`
     
     Interpretation: A state :math:`q_D` in :math:`M_D` is final if
     **any** of the states from :math:`M_N` in the subset that
     :math:`q_D` corresponds to is final.
            
   * :math:`\delta_D : Q_D \times \Sigma \rightarrow Q_D`

   **Algorithm to construct** :math:`M_D`

   #. Start state is :math:`\{q_0\} \cup \mathrm{closure}(q_0)`
      (Note that "closure" of :math:`q_0` is a set of states defined as
      :math:`q_0` plus all states reachable from :math:`q_0` by
      :math:`\lambda` transitions.

   #. While can add an edge
      (that is, while missing a transition from :math:`\delta_D`)

      a) Choose a state :math:`A = \{q_i, q_j, ..., q_k\}` with
         missing edge for :math:`a \in \Sigma` 
      b) Compute :math:`B = \delta^{*}(q_i, a) \cup
         \delta^{*}(q_j, a) \cup \ldots \cup \delta^{*}(q_k, a)`
      c) Add state :math:`B` if it doesn't exist
      d) Add edge from :math:`A` to :math:`B` with label :math:`a`

   #. Identify final states.

      For a state in :math:`Q_D`, if any of its base :math:`Q_N`
      states are final, then it is final.

   #. If :math:`\lambda \in L(M_N)`, then make the start state final.

Intuition: Given a state in :math:`M_N` and a character, you can get
to some subset of the states in :math:`M_N`.
Consider **that** to be a state in :math:`M_D`.
There are only so many subsets of the set of :math:`M_N` states:
That would be members of the powerset of :math:`M_D` states.
      
**Example**:

.. inlineav:: NFA2DFAEx2aCON dgm
   :links: DataStructures/FLA/FLA.css AV/VisFormalLang/FA/NFA2DFAEx2CON.css
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/FA/NFA2DFAEx2aCON.js
   :align: center

   Another NFA to convert


Let's begin with the start state.
Closure(:math:`q_0`) in :math:`M_N` is :math:`\{q_0, q_1, q_2\}`.
So this is the start state.

| Now, keep repeating the steps of the algorithm:
|   While :math:`\delta_D` is not total, pick a missing transition and
    deal with it.

For example: From :math:`M_D` state :math:`q_0,q_1,q_2`, determine the
subset of states that can be reached from any of those states on
letter :math:`a`. This would be the subset :math:`q_3,q_4`.

.. note::

   Do this conversion using JFLAP. You should get the following result.

**Answer**:

.. inlineav:: NFA2DFAEx2bCON dgm
   :links: DataStructures/FLA/FLA.css AV/VisFormalLang/FA/NFA2DFAEx2CON.css
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/FA/NFA2DFAEx2bCON.js
   :align: center

   Converted DFA

.. inlineav:: NFA2DFATraceCON ss
   :links: DataStructures/FLA/FLA.css AV/VisFormalLang/FA/NFA2DFATraceCON.css
   :scripts: lib/underscore.js DataStructures/FLA/FA.js AV/VisFormalLang/FA/NFA2DFATraceCON.js
   :output: show


Conclusion: NFA adds no new capability. So why bother with the idea?

* First, it wasn't obvious that they are the same. NFA is a useful
  concept.
* An NFA tends to be "smaller" and "simpler" than the equivalent DFA.
  (At least in terms of the number of states and transition. But
  perhaps the language of a NFA is harder for a person to grasp.)
* Throughout the semester, we will do a lot of converting from one
  machine type to another.
  The conversion process might be easier to understand when the target
  is an NFA, and we know that this can always be converted in turn to
  a DFA.
