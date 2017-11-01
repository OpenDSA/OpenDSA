.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires: Pushdown Automata
   :satisfies: Nondeterministic Pushdown Automata
   :topic: Finite Automata

Nondeterministic Pushdown Automata
==================================

Nondeterministic Pushdown Automata
----------------------------------

.. Chapter 7.2

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
   | :math:`F^' = \{q_f\}`.
     The only time the stack will be empty is in :math:`q_f`.
   | :math:`(q_f, z') \in \delta(q, \lambda, z')` for all
     :math:`q \in Q`. 

   .. odsafig:: Images/lt7pf2.png
      :width: 400
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt7pf2

   | If :math:`M` accepted in some state, then that means the stack
     was empty.
     In :math:`M'`, at the same state, the stack will contain only
     :math:`z'`, and the new transition can be followed to
     :math:`q_f`. QED 

.. note:: 

   Now we want to show that NPDA's and CFG both represent CFL's. 
   Show that we can take any CFG and construct a NPDA and vice versa. 

**Theorem:** For any CFL :math:`L` not containing :math:`\lambda`,
:math:`\exists` a NPDA :math:`M` such that :math:`L = L(M)`.

**Proof** (sketch)

   | Given (:math:`\lambda` -free) CFL :math:`L`.
   | :math:`\Rightarrow \exists` CFG :math:`G` such that :math:`L = L(G)`.
   | :math:`\Rightarrow \exists G'` in GNF, such that :math:`L(G) = L(G')`. 
   | :math:`G' = (V,T,S,P)`. All productions in :math:`P` are of the form:
   |   :math:`A \rightarrow ax`
   |   :math:`A \in V, a \in T, x \in V^*`
   | Construct NPDA :math:`M = (Q, \Sigma, \Gamma, \delta, q_0, z, F)`
   | :math:`Q = \{q_0, q_1, q_f\}, \Sigma = T, \Gamma = V \cup \{z\}, F = \{q_f\}`
   |   1. :math:`M` starts by putting :math:`S` on the stack 
   |   2. For each production 
   |         :math:`A \rightarrow a X_1 X_2 \ldots X_n`
   |      put :math:`(q_1, X_1 X_2 \ldots X_n)` in :math:`\delta(q_1, a, A)`
   |      (Pop :math:`A` from the stack, read "a" from tape,
          and push :math:`X_1 X_2 \ldots X_n` onto the stack) 

     .. note::

        Draw a picture of this! 

   |   3. Accept if :math:`S \stackrel{*}{\Rightarrow} w \in \Sigma^*`
          (all variables on the stack are replaced by terminals or
          :math:`\lambda`) 
   | Show :math:`w \in L(G')` iff :math:`w \in L(M)`. QED. 

.. topic:: Example

   Let :math:`G' = (V,T,S,P), P =`
   |   :math:`S \rightarrow aSA\ |\ aAA\ |\ b`
   |   :math:`A \rightarrow bBBB`
   |   :math:`B \rightarrow b`

   QUESTION: Is this grammar in GNF? Yes.

   .. odsafig:: Images/lt7pf3.png
      :width: 400
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt7pf3

   Trace abbbbb in grammar and pda. 

   .. note::

      Argue why :math:`w \in L(G')` iff :math:`w \in L(M)`. QED. 

.. note::

   Now want to show that given an NPDA, can construct a CFG. First 
   will show this to make it easier for the next proof. 

**Theorem:** Given a NPDA :math:`M`, :math:`\exists`
a NPDA :math:`M'` such that all transitions have the form
:math:`\delta(q_i, a, A) = \{c_1, c_2, \ldots c_n\}` where 

.. math::

   \begin{eqnarray*}
   c_i &=& (q_j, \lambda)\\
   \mbox{or}\ c_i &=& (q_j, BC)\\
   \end{eqnarray*}

Each move either increases or decreases stack contents by a single symbol.

**Proof:** (sketch)

   .. odsafig:: Images/lt7pf4.png
      :width: 400
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt7pf4

**Theorem:** If :math:`L = L(M)` for some NPDA :math:`M`,
then :math:`L` is a CFL.

.. note::

   Want to show that each NPDA represents a CFL, so we 
   will take a NPDA :math:`M` and convert it to a CFG. 

   It will be an easier construction if we take the NPDA and put all the 
   transitions in a simpler form. 

**Proof:**

   | Given NPDA :math:`M`, first, construct an equivalent NPDA
     :math:`M'` that will be easier to work with.
     Construct :math:`M'` such that
   |   1. :math:`M'` accepts if stack is empty
   |   2. Each move increases or decreases stack content by a single
       symbol.
      (Can only push 2 variables or no variables with each transition.)
   | :math:`M' = (Q, \Sigma, \Gamma, \delta, q_0, z, F)`
   | Construct :math:`G = (V,\Sigma, S, P)` where
   | :math:`V = \{(q_icq_j)\ |\ q_i, q_j \in Q, c \in \Gamma \}`

     .. note::

        Some of these variables will be useless. 

   | :math:`(q_icq_j)` represents "starting at state :math:`q_i` the
     stack contents are :math:`cw, w \in \Gamma^*`,
     some path is followed to state :math:`q_j` and the 
     contents of the stack are now :math:`w`". 
   | Goal: \ \ :math:`(q_0zq_f)` \ \ which will be the start symbol in
     the grammar. 
   | Meaning: We start in state :math:`q_0` with :math:`z` on the
     stack and process the input tape. 
     Eventually we will reach the final state :math:`q_f` and the
     stack will be empty. (Along the way we may push symbols on the
     stack, but these symbols will be popped from the stack). 
   | (NOTE: Machine accepts by empty stack, but it is such that there
     is only 1 final state in which the machine accepts by final state.)
   | To construct the productions in P: 

   | 1) Replace 

     .. odsafig:: Images/lt8pf5.png
        :width: 200
        :align: center
        :capalign: justify
        :figwidth: 90%
        :alt: lt8pf5

   | by 

     .. math::

        (q_iAq_j) \rightarrow a

   | where the stack changes are: 

     .. math::
        
        \begin{array}{lcclc} 
        & q_i & \ \ (\mbox{some path}\ \rightarrow) \ \ & &q_j \\ 
        \\ 
        \mbox{stack:} & A && \mbox{stack:} & \\ 
        & X_1 & && X_1 \\ 
        & X_2 &&& X_2 \\ 
        & \underline{X_n} &&& \underline{X_n} \\ 
        \end{array}

   | 2) Replace 

     .. odsafig:: Images/lt8pf6.png
        :width: 200
        :align: center
        :capalign: justify
        :figwidth: 90%
        :alt: lt8pf6

   | by 

     .. math::
        
        (q_iAq_k) \rightarrow a(q_jBq_l)(q_lCq_k)\ \mbox{for all}\ q_l,
        q_k \in Q 


     .. math::

        \begin{array}{ccccccc} 
        q_i & \ \ (\mbox{path}\ \rightarrow) \ \ & q_j &\ \ (\mbox{path}\ \rightarrow) \ \ 
        & q_l &\ \ (\mbox{path}\ \rightarrow) \ \ & q_k \\ 
        \\ 
        &&B&& \\ 
        A && C &&C \\ 
        X_1 & & X_1 & & X_1 & & X_1 \\ 
        X_2 && X_2 && X_2 && X_2 \\ 
        \underline{X_n} &&\underline{X_n} &&\underline{X_n} &&\underline{X_n}\\ 
        \end{array} 

   | This will create some useless variables, but that's ok. 

     .. note::

        Mention and then come back to this. 

   | Must show that the constructed grammar :math:`G` is such that
     :math:`L(G) = L(M')`.
     That is, :math:`w \in L(G) \mbox{iff}\ w \in L(M)`. (see book) QED. 

.. topic:: Example

   :math:`L(M) = \{aa^*b\}`,
   :math:`M = (Q, \Sigma, \Gamma, \delta, q_0, z, F)`,
   :math:`Q = \{q_0, q_1, q_2, q_3\}`,
   :math:`\Sigma = \{a, b\}, \Gamma = \{A, z\}`,
   :math:`F = \{\}`. 
   :math:`M` accepts by empty stack. 


   .. odsafig:: Images/lt8pda7.png
      :width: 400
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt8pda7

   | Construct the grammar :math:`G = (V,T,S,P)`,
   | :math:`V = \{(q_0Aq_0), (q_0zq_0), (q_0Aq_1), (q_0zq_1), \ldots \}`
   | NOTE: some variables may be useless. 
   | :math:`T = \Sigma`
   | :math:`S = (q_0zq_2)`

   | :math:`P =`

     .. math::
        
        \begin{array}{crl}
        \mbox{From transition 1} & (q_0Aq_1) \rightarrow & b \\
        \\
        \mbox{From transition 2} & (q_1zq_2) \rightarrow & \lambda \\
        \\
        \mbox{From transition 3} & (q_0Aq_3) \rightarrow & a \\
        \\
        \mbox{From transition 4} & (q_0zq_0) \rightarrow & a(q_0Aq_0)(q_0zq_0)| \\
        & & a(q_0Aq_1)(q_1zq_0)| \\
        & & a(q_0Aq_2)(q_2zq_0)| \\
        & & a(q_0Aq_3)(q_3zq_0) \\
        & (q_0zq_1) \rightarrow & a(q_0Aq_0)(q_0zq_1)| \\
        & & a(q_0Aq_1)(q_1zq_1)| \\
        & & a(q_0Aq_2)(q_2zq_1)| \\
        & & a(q_0Aq_3)(q_3zq_1) \\
        & (q_0zq_2) \rightarrow & a(q_0Aq_0)(q_0zq_2)| \\
        & & a(q_0Aq_1)(q_1zq_2)| \\
        & & a(q_0Aq_2)(q_2zq_2)| \\
        & & a(q_0Aq_3)(q_3zq_2) \\
        & (q_0zq_3) \rightarrow & a(q_0Aq_0)(q_0zq_3)| \\
        & & a(q_0Aq_1)(q_1zq_3)| \\
        & & a(q_0Aq_2)(q_2zq_3)| \\
        & & a(q_0Aq_3)(q_3zq_3) \\
        \mbox{From transition 5} & (q_3zq_0) \rightarrow & (q_0Aq_0)(q_0zq_0)| \\
        & & (q_0Aq_1)(q_1zq_0)| \\
        & & (q_0Aq_2)(q_2zq_0)| \\
        & & (q_0Aq_3)(q_3zq_0) \\
        & (q_3zq_1) \rightarrow & (q_0Aq_0)(q_0zq_1)| \\
        & & (q_0Aq_1)(q_1zq_1)| \\
        & & (q_0Aq_2)(q_2zq_1)| \\
        & & (q_0Aq_3)(q_3zq_1) \\
        & (q_3zq_2) \rightarrow & (q_0Aq_0)(q_0zq_2)| \\
        & & (q_0Aq_1)(q_1zq_2)| \\
        & & (q_0Aq_2)(q_2zq_2)| \\
        & & (q_0Aq_3)(q_3zq_2) \\
        & (q_3zq_3) \rightarrow & (q_0Aq_0)(q_0zq_3)| \\
        & & (q_0Aq_1)(q_1zq_3)| \\
        & & (q_0Aq_2)(q_2zq_3)| \\
        & & (q_0Aq_3)(q_3zq_3) \\
        \end{array}


   | **Recognizing aaab in M:**

     .. math::
        
        \begin{eqnarray*}
        (q_0,aaab,z) & \vdash & (q_0,aab,Az) \\
        & \vdash & (q_3,ab,z) \\
        & \vdash & (q_0,ab,Az) \\
        & \vdash & (q_3,b,z) \\
        & \vdash & (q_0,b,Az) \\
        & \vdash & (q_1, \lambda, z) \\
        & \vdash & (q_2, \lambda, \lambda) \\
        \end{eqnarray*}

   | At this point stack is empty. 

   | **Derivation of string aaab in G:**


     .. math ::

        \begin{eqnarray*}
        (q_0zq_2) & \Rightarrow & a(q_0Aq_3)(q_3zq_2) \\
        & \Rightarrow & aa(q_3zq_2) \\
        & \Rightarrow & aa(q_0Aq_3)(q_3zq_2) \\
        & \Rightarrow & aaa(q_3zq_2) \\
        & \Rightarrow & aaa(q_0Aq_1)(q_1zq_2) \\
        & \Rightarrow & aaab(q_1zq_2) \\
        & \Rightarrow & aaab \\
        \end{eqnarray*}

   | Meaning of first line in derivation is: 
     :math:`(q_0zq_2) \stackrel{*}{\Rightarrow} axy` where
     :math:`(q_0Aq_3)\stackrel{*} {\Rightarrow} x`
     (which in the example above will eventually derive :math:`a`) 
     and :math:`(q_3zq_2)\stackrel{*}{\Rightarrow} y`
     (which in the example above will eventually derive :math:`ab`).

   | Must show that the constructed grammar :math:`G` is such that
     :math:`L(G) = L(M')`. 
     That is, :math:`w \in L(G)` iff :math:`w \in L(M)`. (see book) QED. 


**Definition:** A PDA :math:`M = (Q, \Sigma, \Gamma, \delta, q_0, z, F)` is
*deterministic* if for every :math:`q \in Q`, :math:`a \in \Sigma \cup \{\lambda\}`,
:math:`b \in \Gamma`:

   | 1. :math:`\delta(q, a, b)` contains at most 1 element
   | 2. if :math:`\delta(q, \lambda, b) \not= \emptyset` then
        :math:`\delta(q, c, b) = \emptyset` for all :math:`c \in \Sigma`.

**Definition:** :math:`L` is DCFL iff :math:`\exists` DPDA :math:`M`
such that :math:`L = L(M)`.

Examples:

   #. Previous PDA for :math:`\{a^nb^n | n \ge 0\}` is deterministic.

   #. Previous PDA for :math:`\{a^nb^mc^{n+m} | n,m> 0\}` is deterministic.

   #. Previous PDA for :math:`\{ww^R | w\in{\Sigma}^{+}\}, \Sigma = \{a, b\}`
      is nondeterministic.

There are CFL's that are not deterministic.

:math:`L = \{a^nb^n|n \ge 1\} \cup \{a^nb^{2n}| n\ge 1\}` is a CFL and not a DCFL.

NOTE: :math:`a^nb^nc^n` is not a CFL! (we'll see this in the next chapter) 

**Proof:**

   | :math:`L = \{a^nb^n: n \ge 1\} \cup \{a^nb^{2n}: n \ge 1\}`

   | It is easy to construct a NPDA for :math:`\{a^nb^n: n\ge 1\}` and 
     a NPDA for :math:`\{a^nb^{2n}: n \ge 1\}`.
     These two can be joined together by a new start state and
     :math:`\lambda`-transitions to create a NPDA for L. 
     Thus, L is CFL.

   | Now show :math:`L` is not a DCFL.
     Assume that there is a deterministic PDA :math:`M` such that
     :math:`L = L(M)`.
     We will construct a PDA that recognizes a language that is not a CFL and
     derive a contradiction.

   | Construct a PDA :math:`M'` as follows:

   .. note::

      Show figure 

   |   1. Create two copies of :math:`M: M_1` and :math:`M_2`.
          The same state in :math:`M_1` and :math:`M_2` are called cousins.

   |   2. Remove accept status from accept states in :math:`M_1`,
          remove initial status from initial state in :math:`M_2`.
          In our new PDA, we will start in :math:`M_1` and accept in :math:`M_2`.

   |   3. Outgoing arcs from old accept states in :math:`M_1`,
          change to end up in the cousin of its destination in
          :math:`M_2`.
          This joins :math:`M_1` and :math:`M_2` into one PDA.
          There must be an outgoing arc since you must recognize
          both :math:`a^nb^n` and :math:`a^nb^{2n}`.
          After reading :math:`n` b's, must accept if no more b's and 
          continue if there are more b's.

   |   4. Modify all transitions that read a b and have their
          destinations in :math:`M_2` to read a c. 

   | This is the construction of our new PDA. 

   | When we read :math:`a^nb^n` and end up in an old accept state in
     :math:`M_1`, then we will transfer to :math:`M_2` and read the
     rest of :math:`a^nb^{2n}`.
     Only the b's in :math:`M_2` have been replaced by c's,
     so the new machine accepts :math:`a^nb^nc^n`.

   | The language accepted by our new PDA is :math:`a^nb^nc^n`.
     But this is not a CFL. Contradiction! Thus there is no
     deterministic PDA :math:`M` such that :math:`L(M) = L`. 
     Q.E.D.

.. odsafig:: Images/lt8hier.png
   :width: 300
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: lt8hier
