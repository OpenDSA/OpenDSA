.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger, Cliff Shaffer, and Mostafa Mohammed, John Taylor
   :requires: Deterministic Finite Automata
   :satisfies: Non-deterministic Finite Automata
   :topic: Finite Automata
   :keyword: Finite Automata; Non-Deterministic Finite Automata


NFA: Non-Deterministic Finite Automata
======================================

Non-Deterministic Finite Automata
---------------------------------

We often have to make decisions.
Sometimes, once we make the decision, we cannot undo it.
Sometimes, we can go back, change our minds, make the other choice.
But even then, we still had to spend time investigating the false
path.

Imagine that when we came to a decision point, we could clone
ourselves, follow both paths, and then just "become" the version that
turns out to be the better choice.
Wouldn't that be a hugely powerful upgrade to our lives?

That gets into some pretty complicated philosophy in real life.
But in the world of Finite Automata, the concept of
:term:`non-determinism <non-deterministic>` turns out to be something
that we can make quite concrete.
In this module, we study what it means to make an FA non-deterministic,
and whether it really even matters in the end.

.. inlineav:: NFAFS ff
   :links:  DataStructures/FLA/FLA.css AV/PIFLA/FA/NFAFS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js AV/PIFLA/FA/NFAFS.js
   :output: show
   :keyword: Finite Automata; Non-Deterministic Finite Automata


NFA vs. DFA: Which is more powerful?
------------------------------------

Now we are ready for the main event: Proving that every NFA can be
converted to a DFA, and therefore the two machine types are equally
powerful.
We do this using Proof by Construction: Here is an algorithm that
converts any NFA to an equivalent DFA.

.. topic:: Theorem and Proof

   **Theorem**: Given some NFA
   :math:`M_N = (Q_N, \Sigma, \delta_N, q_0, F_N)`,
   there exists a DFA :math:`M_D = (Q_D, \Sigma, \delta_D, q_0, F_D)`
   such that :math:`L(M_N) = L(M_D)`.

   **Proof**:
   We can use an algorithm to convert :math:`M_N` to :math:`M_D`.

   * :math:`Q_D = 2^{Q_N}` (the powerset of :math:`Q_N`)

   * :math:`F_D = \{Q\in Q_D \mid \exists\ q_i \in Q\ \mathrm{with}\ q_i \in F_N \}`
     
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
      Add this this state to $Q_D$.

   #. While there is an edge to add
      (that is, while our DFA is missing a transition from
      :math:`\delta_D`):

      a) Choose a state :math:`A = \{q_i, q_j, ..., q_k\}` from $Q_D$
         with a missing edge for :math:`a \in \Sigma` 
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
   :keyword: Finite Automata; Non-Deterministic Finite Automata


Conclusions
-----------

Adding the non-determinism capability to DFAs does not result in any
new capability to accept languages.
The set of languages that can be accepted by a NFA is exactly the same
as the set of languages that can be accepted by a DFA.
We proved this constructively:
Every DFA is automatically an NFA without non-determinism,
so DFAs obviously cannnot accept languages that NFAs cannot.
And any NFA can be converted using an algorithm to a DFA.
So NFAs cannot accept languages that DFAs cannot.
Since the collection of DFAs can accept exactly the same languages as
the class of NFAs, we say that these two are :term:`equivalent`.

So, is the NFA a useful concept? Why introduce them at all?
First, it was not obvious at the start that they add no new power in terms
of new languages that can be accepted.
(And sometimes non-determinism makes a functional
difference in other contexts.)
So, we had to work through that to convince ourselves that it is true.
Second, NFAs tend to be "simpler" to understand than the equivalent
DFA.
See the result of the conversion example, and decide for yourself
which one is easier for you to deduce the corresponding language.
Or, try writing the DFA for the language from scratch as a DFA.
Third, we will introduce some other conversion algorithms over the
course of the semester that are easier to understand if the target is
a NFA instead of a DFA.
And fourth, non-determinism is a useful concept to help simplify other
concepts that we will cover later.
A good example will be the study of so-called :term:`NP-Complete`
problems (where NP stands for nondeterministic polynomial).
