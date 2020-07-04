.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires: Deterministic Finite Automata
   :satisfies: Non-deterministic Finite Acceptor
   :topic: NDFA

.. slideconf::
   :autoslides: False


Non-Deterministic Finite Acceptor
=================================

.. slide:: Non-Deterministic Finite Acceptor (1)

   Define a NFA (or NDFA) as :math:`(Q, \Sigma, \delta, q_0, F)` where

   * :math:`Q` is a finite set of states
   * :math:`\Sigma` is the input alphabet (a finite set) 
   * :math:`q_0` is the initial state (:math:`q_0 \in Q`)
   * :math:`F \subseteq Q` is a set of final states
   * :math:`\delta: Q \times(\Sigma \cup \{\lambda\}) \rightarrow 2^Q`
     (:math:`2^Q` here means the power set of :math:`Q`)

   <<Hmmm... How is this different from a DFA?>>


.. slide:: Non-Deterministic Finite Acceptor (2)

   The specific difference from a DFA is that, while the result of
   :math:`\delta` for the DFA is some state :math:`q \in Q`, the
   result of :math:`\delta` for the NFA is any subset of :math:`Q`.

   **Non-deterministic** means that it allows choices.
   From a state on input :math:`b`, :math:`\delta` might include
   transitions to more than one state.

   | Other differences:
   |   We allow :math:`\lambda` transitions (a free
       ride to another state).
   |   We allow transitions to a null subset of states.
       Consider this as a failed path.


.. slide:: NFA Example 1

   .. inlineav:: NFAexampleCON dgm
      :links: DataStructures/FLA/FLA.css AV/VisFormalLang/FA/NFAexampleCON.css
      :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/FA/NFAexampleCON.js
      :align: center

   | In this example, :math:`\delta(q_0, a) =` << ?? >>.
   | (So, :math:`\delta` is no longer meets the mathematical definition
     of a function!)

   Hopefully this one is easy to understand: We two disjoint paths,
   effectively giving us the union of two languages:
   :math:`L =` << ?? >>.


.. slide:: NFA Example 2

   :math:`L = \{(ab)^n \mid n>0\} \cup \{a^nb \mid n>0\}`.


.. slide:: NFA Example 2

   :math:`L = \{(ab)^n \mid n>0\} \cup \{a^nb \mid n>0\}`.

   .. inlineav:: NFAexample2CON dgm
      :links: DataStructures/FLA/FLA.css AV/VisFormalLang/FA/NFAexample2CON.css
      :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/FA/NFAexample2CON.js
      :align: center

   | A simple "go this way or go the other way".
   | Unfortunately, they are not always so simple to understand!
            

.. slide:: Accepting a String (1)

   **Definition:** :math:`q_j \in {\delta}^{*}(q_i,w)` if and only if
   there exists some walk from :math:`q_i` to :math:`q_j` labeled
   :math:`w`.

   | From previous example:
   |   :math:`\delta^{*}(q_0, ab) =` << ?? >>.
   |   :math:`\delta^{*}(q_0, aba) =` << ?? >>.

   For an NFA :math:`M`,
   :math:`L(M)= \{w \in {\Sigma}^{*} \mid \delta^{*}(q_0,w) \cap F \neq \emptyset \}`.
   << What does this mean? >>


.. slide:: Accepting a String (2)

   **Definition:** :math:`q_j \in {\delta}^{*}(q_i,w)` if and only if
   there exists some walk from :math:`q_i` to :math:`q_j` labeled
   :math:`w`

   | From previous example:
   |   :math:`\delta^{*}(q_0, ab) =` << ?? >>.
   |   :math:`\delta^{*}(q_0, aba) =` << ?? >>.

   For an NFA :math:`M`,
   :math:`L(M)= \{w \in {\Sigma}^{*} \mid \delta^{*}(q_0,w) \cap F \neq \emptyset \}`.

   NFA accepts a string if it completes processing in a final state.
   However for an NFA, the string is accepted if
   **any** processing path gets us to end in a final state.
   It does not matter that there are paths where :math:`w` can go
   wrong.
   What matters is that there is at least one way for :math:`w` to be
   right.


.. slide:: Why nondeterminism?

   | It makes it "easier" to describe a FA.
   | << What might "easier" mean? >>
   
   From a performance point of view, to determine if a string is
   accepted can take a LONG time to try out all possibilities.
   But, all that we care about right now is existance, not performance.


.. slide:: Which is more powerful?

   .. inlineav:: NFA2DFAaCON dgm
      :links: DataStructures/FLA/FLA.css AV/VisFormalLang/FA/NFA2DFACON.css
      :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/FA/NFA2DFAaCON.js
      :align: center

   Can this NFA be converted to a DFA?

   .. inlineav:: NFA2DFAbCON dgm
      :links: DataStructures/FLA/FLA.css AV/VisFormalLang/FA/NFA2DFACON.css
      :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/FA/NFA2DFAbCON.js
      :align: center


.. slide:: Key Question

   Does non-determinism increase the collection of languages that can
   be accepted?
   That is, can any language be accepted by an NFA that has no DFA
   that accepts it?

   Here is a bit of intution that might give some insight:

     Nondeterminism gives branches. If we are trying to create a
     non-determinism simulator in a computer, we can simulate it by
     alternating between all of the branches, pushing each branch
     forward by a step. This will eventually terminate.


.. slide:: Key Theorem

   **Theorem**: Given an NFA
   :math:`M_N = (Q_N, \Sigma, \delta_N, q_0, F_N)`,
   there exists a DFA :math:`M_D = (Q_D, \Sigma, \delta_D, q_0, F_D)`
   such that :math:`L(M_N) = L(M_D)`.


.. slide:: Class(DFA) == Class(NFA) Proof

   We can use an algorithm to convert :math:`M_N` to :math:`M_D`.

   * :math:`Q_D = 2^{Q_N}` << What does this mean? How big is this set
     of states? >>

     [Right here, this is what I consider the key insight.
     Given a state in :math:`M_N` and a character,
     you can get to some subset of the states in :math:`M_N`.
     Consider THAT to be a state in :math:`M_D`.]

   * :math:`F_D = \{Q\in Q_D \mid \exists q_i \in Q` with :math:`q_i \in F_N \}`
     << What does this mean?? >>

   * :math:`\delta_D : Q_D \times \Sigma \rightarrow Q_D`
     << What does this mean?? >>

     Of course this begs the question: HOW?


.. slide:: Algorithm to construct :math:`M_D` (1)

   #. Start state is :math:`\{q_0\} \cup \mathrm{closure}(q_0)`

      What does closure(q) mean?

      The set of states reachable
      from :math:`q` with :math:`\lambda` transitions.


.. slide:: Algorithm to construct :math:`M_D` (2)

   #. Start state is :math:`\{q_0\} \cup \mathrm{closure}(q_0)`

   #. While missing a transition in :math:`\delta_D`:

      a) Choose a state :math:`A = \{q_i, q_j, ..., q_k\}` with
         missing edge for :math:`a \in \Sigma` 
      b) Compute :math:`B = \delta^{*}(q_i, a) \cup
         \delta^{*}(q_j, a) \cup \ldots \cup \delta^{*}(q_k, a)`
      c) Add state :math:`B` if it doesn't exist
      d) Add edge from :math:`A` to :math:`B` with label :math:`a`

   #. Identify final states
   #. If :math:`\lambda \in L(M_N)`, then make the start state final.


.. slide:: Example: NFA to DFA

   .. inlineav:: NFA2DFAEx2aCON dgm
      :links: DataStructures/FLA/FLA.css AV/VisFormalLang/FA/NFA2DFAEx2CON.css
      :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/FA/NFA2DFAEx2aCON.js
      :align: center


.. slide:: Example: NFA to DFA Result

   .. odsafig:: Images/NFA2DFA2a.png
      :width: 500
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: Another NFA to convert

   |

   .. odsafig:: Images/NFA2DFA2b.png
      :width: 500
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: Converted DFA

.. slide:: Step by Step

   .. inlineav:: NFA2DFATraceCON ss
      :links: DataStructures/FLA/FLA.css AV/VisFormalLang/FA/NFA2DFATraceCON.css
      :scripts: lib/underscore.js DataStructures/FLA/FA.js AV/VisFormalLang/FA/NFA2DFATraceCON.js
      :output: show

.. slide:: Lets do an exercise

   .. avembed:: AV/OpenFLAP/examples/nfatodfa.html ss
      :long_name: draw a DFA for a language example

.. slide:: Harder exercise

   .. avembed:: AV/OpenFLAP/examples/nfatodfa2.html ss
      :long_name: draw a DFA for a language example

.. slide:: So, why NFA?

   Conclusion: NFA adds no new capability. So why bother with the idea?

   * First, it wasn't obvious that they are the same.
     NFA is a useful concept.
   * NFA tend to be "smaller" and "simpler" than the equivalent DFA.
     (At least morphologically, but perhaps the language of a NFA is
     hard to grasp.)
   * We will see times when it is easier to see a conversion from
     something to a NFA,
     and we know that this can always be converted in turn to a DFA.
