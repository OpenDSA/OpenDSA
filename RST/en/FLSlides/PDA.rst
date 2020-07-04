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

   .. odsafig:: Images/lt6dfa.png
      :width: 400
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: stnfaints

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

   .. odsafig:: Images/lt6pda1.png
      :width: 370
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: stnfaints

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
     :math:`M = (Q, \Sigma, \Gamma, \delta, q_0, z, F)`
   |   :math:`Q` is a finite set of states
   |   :math:`\Sigma` is the tape (input) alphabet (a finite set)
   |   :math:`\Gamma` is the stack alphabet (a finite set)
       (:math:`\Leftarrow` **new**)
   |   :math:`q_0` is the initial state, :math:`q_0 \in Q`
   |   :math:`z` is the start stack symbol 
       (marks the bottom of the stack), :math:`z \in \Gamma`
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
   |   move to :math:`q_6` (now stack is one character shorter)

   :math:`z` (the initial stack bottom marker) is priviledged: It
   never comes off, stack is never empty.


.. slide:: Example of Transitions (2)

   Transitions can be represented using a transition diagram. 
   The diagram for the above transitions is:

   .. odsafig:: Images/lt6trans.png
      :width: 300
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: stnfaints

   | Each arc is labeled by a triple :math:`<x, y, z>` where :math:`x` is
     the current input symbol, :math:`y` is the top of stack symbol which
     is popped from the stack, and :math:`z` is a string that is pushed
     onto the stack.
   | << **Warning**: What is a character, and what is a string? >>

.. slide:: Instantaneous Descriptions

   **Instantaneous Description:**
   :math:`(q, w, u)`

   | This describes the current state :math:`q`,
     unread portion of the input string :math:`w`,
     and the current contents of the stack :math:`u`.
   | (Like DFA, there is no history for how we got to this.)
   | This is a configuration in JFLAP.

   | **Description of a Move:**
   | :math:`(q_1, aw, bx) \vdash (q_2, w, yx)`
     is possible if and only iff
     :math:`(q_2, y) \in \delta(q_1, a, b)`.

   | :math:`(q_1, w_1, x_1) \stackrel{*}{\vdash} (q_2, w_2, x_2)`
     indicates possible configuration change over multiple steps.
   | << "Possible" because this is non-deterministic >>

.. slide:: Definition for Language Acceptance

   | **Definition:** Let :math:`M = (Q, \Sigma, \Gamma, \delta, q_0, z, F)`
     be a NPDA.
   |   :math:`L(M) = \{w \in \Sigma^* \mid (q_0, w, z) \stackrel{*}{\vdash} (p, \lambda, u), p \in F, u \in \Gamma^*\}`.
   | The NPDA accepts all strings that start in :math:`q_0` and end in a
     final state.

   NOTE: Stack contents are irrelevant, just need to end the string in a final
   state.


.. slide:: Example

   :math:`L = \{a^nb^n | n \ge 0\}, \Sigma = \{a, b\}, \Gamma = \{z,a\}`

   .. odsafig:: Images/lt7pda1.png
      :width: 400
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: stnfaints

   Trace aaabbb 

   .. math::

      \begin{array}{lcccccccc} 
      &&&&a \\ 
      &&&a&a &a \\ 
      & &a&a&a&a &a \\ 
      \mbox{Stack:} &\underline{z} &\underline{z} &\underline{z} &\underline{z} 
      &\underline{z} & \underline{z} &\underline{z} &\underline{\ \ \ } \\ 
      \\ 
      \mbox{Unread} \\ 
      \mbox{input:} & aaabbb &aabbb &abbb &bbb & bb & b \\ 
      \end{array} 


.. slide:: Language Acceptance in PDA

   **Another Definition for Language Acceptance:**
   NPDA :math:`M` accepts :math:`L(M)` by empty stack:

   :math:`L(M) = \{w \in \Sigma^* \mid (q_0, w, z) \stackrel{*}{\vdash} (p, \lambda, \lambda)\}`


.. slide:: Example
   
   :math:`L = \{a^nb^mc^{n+m} \mid n,m > 0\}, \Sigma = \{a, b, c\}, \Gamma =\{0, z\}`

   Note: What is the smallest length string that is accepted? 

   .. odsafig:: Images/lt7pda4.png
      :width: 400
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: stnfaints


.. slide:: Example
            
   :math:`L = \{ww^R | w \in \Sigma^+ \}, \Sigma = \{a, b\}, \Gamma = ?`

   .. odsafig:: Images/lt7pda3.png
      :width: 400
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: stnfaints

   Trace abbbba 

   .. math::
      
      \begin{array}{lcccccccc} 
      &&&&b \\ 
      &&&b&b &b \\ 
      & &a&a&a&a &a \\ 
      \mbox{Stack:} &\underline{z} &\underline{z} &\underline{z} &\underline{z} 
      &\underline{z} & \underline{z} &\underline{z} &\underline{\ \ \ } \\ 
      \\ 
      \mbox{Unread} \\ 
      \mbox{input:} & abbbba & bbbba & bbba & bba & ba & a \\ 
      \end{array} 


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
