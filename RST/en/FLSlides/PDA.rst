.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires: Context-free grammars
   :satisfies: Pushdown Automata
   :topic: PDA

.. slideconf::
   :autoslides: False


Pushdown Automata
=================

.. WARNING: This material is presented completely backwards. There is
   this long stacking up of concepts that is finally unpacked at the
   end when examples of PDAs are given. Need to have an example PDA
   shown much earlier, and then that gets used to explain the
   formalisms and concerns.

.. TODO: Should put in example using \lambda for the "stack" symbol to
   ignore what is on the stack, and not consume it

.. slide:: Our Current Model of the FL Universe

   | Regular Languages:
   |   Regular Grammars
   |   DFA/NFA
   |   Regular Expressions

   | Context Free Languages:
   |   Context Free Grammars
   |   Implementation?

.. slide:: DFA Review

   Recall: A DFA :math:`=(Q, \Sigma, \delta, q_0, F)`.

   .. inlineav:: DFAExampleCON dgm
      :links: AV/VisFormalLang/FA/DFAExampleCON.css
      :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/FA/DFAExampleCON.js
      :align: center

   In a DFA, the tape is read only, the head moves to the right only.
   DFAs are limited in power.
   They recognize regular languages but cannot recognize many other
   "simple" langages like :math:`a^nb^n`. 

.. slide:: Pushdown Automata

   | Give the DFA a stack: 
     This is called a Pushdown Automata (PDA). 
   |    Name comes from new ability to **push down** and
        store symbols on stack
   | Adds memory: The machine stores and retrieves data from the stack

   .. inlineav:: PDAExampleCON dgm
      :links: AV/VisFormalLang/PDA/PDAExampleCON.css
      :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/PDA/PDAExampleCON.js
      :align: center

   Old limitations still apply: Tape is read only, head moves only to
   the right


.. slide:: Non-deterministic PDA (1)

   | We gave DFAs the concept of nondeterminism:
   |    Multiple edges out of a state on same input condition,
        :math:`\lambda` transitions
   |    This did not change the set of languages that could be
        recognized by DFAs.
   | For convenience (at the moment), we will also add non-determinism
     to PDAs.


.. slide:: Non-deterministic PDA (2)

   | **Definition:** A nondeterministic PDA (NPDA) is defined by
     :math:`M = (Q, \Sigma, \Gamma, \delta, q_0, Z, F)`
   |   :math:`Q` is a finite set of states
   |   :math:`\Sigma` is the tape (input) alphabet (a finite set)
   |   :math:`\Gamma` is the stack alphabet (a finite set)
       (:math:`\Leftarrow` **new**)
   |   :math:`q_0` is the initial state, :math:`q_0 \in Q`
   |   :math:`Z` is the start stack symbol 
       (marks the bottom of the stack), :math:`Z \in \Gamma`
       (:math:`\Leftarrow` **new**)
   |   :math:`F \subseteq Q` is the set of final states.
   |   :math:`\delta : Q \times (\Sigma \cup \{\lambda\}) \times \Gamma \rightarrow`
       finite subsets of :math:`Q \times \Gamma^*`

   << You need to really pay attention to exactly what is going on with
   this transition function notation! >>


.. slide:: Example of Transitions (1)

   :math:`\delta(q_1, a, b) = \{(q_3, b),(q_4, ab), (q_6, \lambda)\}`

   | Meaning: If in state :math:`q_1` with :math:`a` the current tape
     symbol and :math:`b` the symbol on top of the stack,
     then pop :math:`b`, and either 
   |   move to :math:`q_3` and push :math:`b` back onto the stack
   |   move to :math:`q_4` and push :math:`ab` onto stack (:math:`a` on top)
   |   move to :math:`q_6` (now stack is one symbol shorter)

   | :math:`Z` (the initial stack bottom marker) is priviledged: It
     never comes off, stack is never empty.
   |   (At least in the basic definition)

.. slide:: Example of Transitions (2)

   Transitions can be represented using a transition diagram, such as:

   .. odsafig:: Images/lt6trans.png
      :width: 300
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: stnfaints

   | Edge is labeled by a triple :math:`<t, u, v>` where :math:`t` is
     the current input symbol, :math:`u` is the top of stack symbol
     (it is popped from the stack), :math:`v` is a string that is pushed
     onto the stack.
   | << **Warning**: What is a symbol, and what is a string? >>


.. slide:: Instantaneous Descriptions

   **Instantaneous Description:**
   :math:`(q, w, u)`

   | This describes the current state :math:`q`,
     unread portion of the input string :math:`w`,
     and the current contents of the stack :math:`u`.
   | (Like DFA, there is no history for how we got to this.)

   | **Description of a Move:**
   | :math:`(q_1, aw, bx) \vdash (q_2, w, yx)`
     is possible if and only iff
     :math:`(q_2, y) \in \delta(q_1, a, b)`.

   | :math:`(q_1, w_1, x_1) \stackrel{*}{\vdash} (q_2, w_2, x_2)`
     indicates possible configuration change over multiple steps.
   | << "Possible" because this is non-deterministic >>


.. slide:: Definition for Language Acceptance

   | **Definition:** Let :math:`M = (Q, \Sigma, \Gamma, \delta, q_0, Z, F)`
     be a NPDA.
   |   :math:`L(M) = \{w \in \Sigma^* \mid (q_0, w, Z) \stackrel{*}{\vdash} (p, \lambda, u), p \in F, u \in \Gamma^*\}`.
   | The NPDA accepts all strings that start in :math:`q_0` and end in a
     final state.

   NOTE: Stack contents are irrelevant, just need to end the string in a final
   state.


.. slide:: Example

   :math:`L = \{a^nb^n | n \ge 0\}, \Sigma = \{a, b\}, \Gamma = \{Z, a\}`

   .. inlineav:: PDAAnBnTraceCON ss
      :links: DataStructures/FLA/FLA.css AV/VisFormalLang/PDA/PDAAnBnTraceCON.css
      :scripts: lib/underscore.js DataStructures/FLA/FA.js DataStructures/FLA/PDA.js AV/VisFormalLang/PDA/PDAAnBnTraceCON.js
      :output: show


.. slide:: .

.


.. slide:: Language Acceptance in PDA

   **Another Definition for Language Acceptance:**
   NPDA :math:`M` accepts :math:`L(M)` by empty stack:

   :math:`L(M) = \{w \in \Sigma^* \mid (q_0, w, Z) \stackrel{*}{\vdash} (p, \lambda, \lambda)\}`

   Notice that stack-empty symbol :math:`Z` has come off.
   
   
.. slide:: Example
   
   :math:`L = \{a^nb^mc^{n+m} \mid n,m > 0\}, \Sigma = \{a, b, c\}, \Gamma =\{0, Z\}`

   Note: What is the smallest length string that is accepted? 

   .. inlineav:: example_7_1_2 dgm
      :links: AV/VisFormalLang/PDA/example_7_1_2.css
      :scripts: AV/VisFormalLang/PDA/example_7_1_2.js
      :align: center


.. slide:: Example
           
   :math:`L = \{ww | w \in \Sigma^*\}, \Sigma =\{a, b\}, \Gamma = ?`
         
   L is not a CFL, so there is no NPDA! 


.. slide:: Two Acceptance Definitions

   | We defined two forms of acceptance:
   |   1. Accept by finishing string in some final state (on some choice
          of transitions), no concern with stack state
   |      Oh, and the stack can never actually be empty, there is a
          start symbol on stack.
   |   2. Finish string with an empty stack.

   We can show that these two are equivalent. (What does equivalent mean?)
