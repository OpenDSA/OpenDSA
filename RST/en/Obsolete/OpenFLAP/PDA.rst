.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires: Regular Grammar
   :satisfies: Pushdown Automata
   :topic: Finite Automata

Pushdown Automata
=================

Pushdown Automata
-----------------

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

We are now going to give the DFA a stack.
This new machine is called a Pushdown Automata (PDA). 
Obviously it gets this name from its new ability to **pushdown** and
store symbols on the stack.
This adds a form of additional memory, letting the machine store and
retrieve data from the stack.

   .. odsafig:: Images/lt6pda1.png
      :width: 400
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: stnfaints

The old limitations still apply: The tape is read only, the head moves
only to the right.

Recall that we could add the concept of nondeterminism to the DFA.
This turned out not to change the set of languages that could be
recognized by DFAs.
What if we add nondeterminism to the PDA?

**Definition:** A nondeterministic PDA (NPDA) is defined by
:math:`M = (Q, \Sigma, \Gamma, \delta, q_0, z, F)` where

   | :math:`Q` is a finite set of states
   | :math:`\Sigma` is the tape (input) alphabet (a finite set)
   | :math:`\Gamma` is the stack alphabet (a finite set) 
   | :math:`q_0` is the initial state, :math:`q_0 \in Q`
   | :math:`z` is the start stack symbol
     (marks the bottom of the stack), :math:`z \in \Gamma`
   | :math:`F \subseteq Q` is the set of final states.
   | :math:`\delta : Q \times (\Sigma \cup \{\lambda\}) \times \Gamma \rightarrow` finite subsets of :math:`Q \times \Gamma^*`

Transition function :math:`\delta` is a mapping to a finite subset of 
:math:`Q \times \Gamma^*` 

Example of transitions
~~~~~~~~~~~~~~~~~~~~~~

:math:`\delta(q_1, a, b) = \{(q_3, b),(q_4, ab), (q_6, \lambda)\}`

Meaning: If in state :math:`q_1` with ``a`` the current tape symbol and 
``b`` the symbol on top of the stack, then pop ``b``, and either 

   | move to :math:`q_3` and push ``b`` on stack
   | move to :math:`q_4` and push ``ab`` on stack (``a`` on top)
   | move to :math:`q_6` 

Transitions can be represented using a transition diagram. 
The diagram for the above transitions is:

   .. odsafig:: Images/lt6trans.png
      :width: 300
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: stnfaints

Each arc is labeled by a triple :math:`<x, y; z>` where :math:`x` is
the current input symbol, :math:`y` is the top of stack symbol which
is popped from the stack, and :math:`z` is a string that is pushed
onto the stack.

**Instantaneous Description:**
:math:`(q, w, u)`

This is notation to describe the current state of the machine
:math:`q`, unread portion of the input string :math:`w`,
and the current contents of the stack :math:`u`. 
(This is a configuration in JFLAP.)

**Description of a Move:**

.. math::

   \begin{eqnarray*}
   (q_1, aw, bx) &\vdash& (q_2, w, yx)\\
   &\mbox{iff}&\\
   (q_2, y) &\in& \delta(q_1, a, b)
   \end{eqnarray*}

**Definition:** Let :math:`M = (Q, \Sigma, \Gamma, \delta, q_0, z, F)`
be a NPDA.
:math:`L(M) = \{w \in \Sigma^* | (q_0, w, z) \stackrel{*}{\vdash} (p, \lambda, u), p \in F, u \in \Gamma^*\}`.
The NPDA accepts all strings that start in :math:`q_0` and end in a
final state.

NOTE: Stack contents are irrelevant if it ends the string in a final
state.

.. topic:: Example

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

**Another Definition for Language Acceptance:**
NPDA :math:`M` accepts :math:`L(M)` by empty stack:

   :math:`L(M) = \{w \in \Sigma^* | (q_0, w, z) \stackrel{*}{\vdash} (p, \lambda, \lambda)\}`

NOTE: 3-tuples above are configurations. Moving from one to another. 

.. topic:: Example
   
   :math:`L = \{a^nb^mc^{n+m} | n,m > 0\}, \Sigma = \{a, b, c\}, \Gamma =\{0, z\}`

   Note: What is the smallest length string that is accepted? 

   .. odsafig:: Images/lt7pda4.png
      :width: 400
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: stnfaints

.. topic:: Example
            
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

.. topic:: Example
           
   :math:`L = \{ww | w \in \Sigma^*\}, \Sigma =\{a, b\}, \Gamma = ?`
         
   L is not a CFL, so there is no NPDA! 

**Examples for you to try on your own:** (solutions are at the
end of this section).

* :math:`L = \{a^nb^m | m > n, m, n > 0\}, \Sigma = \{a, b\}, \Gamma = \{z, a\}`
* :math:`L = \{a^nb^{n+m}c^m | n, m> 0\}, \Sigma=\{a, b, c\}`
* :math:`L = \{a^nb^{2n} | n > 0\}, \Sigma=\{a,b\}`

**Reminder:** The acceptance definition is that we accept if we end in a
final state.
The contents of the stack are irrelevent. 

**Definition:** A PDA :math:`M = (Q, \Sigma, \Gamma, \delta, q_0, z, F)`
is *deterministic* if for every :math:`q \in Q, a \in \Sigma \cup \{\lambda\},
b \in \Gamma`

1. :math:`\delta(q, a, b)` contains at most 1 element
2. if :math:`\delta(q, \lambda, b) \neq \emptyset` then
   :math:`\delta(q, c, b) = \emptyset` for all :math:`c \in \Sigma`.

**Definition:** :math:`L` is DCFL iff :math:`\exists` DPDA :math:`M`
such that :math:`L = L(M)`.

**Examples:**

1. Previous PDA for :math:`\{a^nb^n | n\ge 0\}` is deterministic.
2. Previous PDA for :math:`\{a^nb^mc^{n+m} | n, m> 0\}` is 
   probably deterministic 
3. Previous PDA for :math:`\{ww^R | w \in \Sigma^+\}, \Sigma = \{a, b\}`
   is nondeterministic.

.. topic:: Example

   :math:`L = \{a^nb^m | m > n, m, n > 0\}, \Sigma =\{a, b\}, \Gamma = \{z, a\}`

   .. odsafig:: Images/lt7pda2.png
      :width: 400
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: stnfaints

.. topic:: Example
           
   :math:`L = \{a^nb^{n+m}c^m | n, m > 0\}, \Sigma = \{a, b, c\}`

   .. odsafig:: Images/lt7pda5.png
      :width: 400
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: stnfaints

.. topic:: Example
           
   :math:`L = \{a^nb^{2n} | n > 0\}, \Sigma=\{a, b\}` 

   .. odsafig:: Images/lt7pda6.png
      :width: 400
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: stnfaints


Equivalence of Acceptance Definitions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Theorem** Given NPDA M that accepts by final state, :math:`\exists`
NPDA :math:`M'` that accepts by empty stack such that :math:`L(M) = L(M')`.

**Proof** (sketch)

   | :math:`M = (Q, \Sigma, \Gamma, \delta, q_0, z, F)`
   | Construct :math:`M' = (Q', \Sigma, {\Gamma}^{'}, {\delta}^{'}, q_s, z', F')`
     (NOTE: :math:`z'` is a new symbol) 
   | :math:`Q' = Q \cup \{q_s, q_f\}` 
   | :math:`{\Gamma}^{'} = \Gamma \cup \{z'\}`
     (NOTE: :math:`z' \not\in \Gamma`, never popped in old machine)
   | :math:`q_s` is new start state. 
   | :math:`F = \{\}`. Irrelevant.
     The only time the stack will be empty is in :math:`q_f`.

   .. odsafig:: Images/lt7pf1.png
      :width: 500
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt7pf1
      
   .. inlineav:: PDA dgm
      :links: AV/OpenFLAP/PDA.css
      :scripts: AV/OpenFLAP/PDA.js
      :align: center

   | Here, :math:`x` is any symbol in :math:`{\Gamma}^{'}`.
     (:math:`l` represents :math:`\lambda`).

   | Don't really need the concept of a final state in this case. QED. 


**Theorem:** Given NPDA :math:`M` that accepts by empty stack,
:math:`\exists` NPDA :math:`M'` that accepts by final state.

**Proof:**

   | :math:`M = (Q, \Sigma, \Gamma, \delta, q_0, z, F)`
   | Construct :math:`M' = (Q', \Sigma, \Gamma^{'}, \delta^{'}, q_s, z', F')`
   | :math:`Q' = Q \cup \{q_s, q_f\}`
   | :math:`\Gamma^{'} = \Gamma \cup \{z'\}`
   | :math:`q_s` is new start state. 
   | :math:`F^ = \{q_f\}`.
     The only time the stack will be empty is in :math:`q_f`.
   | :math:`(q_f, z') \in \delta(q, \lambda, z')` for all
     :math:`q \in Q`. 

   .. odsafig:: Images/lt7pf2.png
      :width: 400
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt7pf2
      
   .. inlineav:: PDA2 dgm
      :links: AV/OpenFLAP/PDA2.css
      :scripts: AV/OpenFLAP/PDA2.js
      :align: center

   | If :math:`M` accepted in some state, then that means the stack
     was empty.
     In :math:`M'`, at the same state, the stack will contain only
     :math:`z'`, and the new transition can be followed to
     :math:`q_f`. QED 
