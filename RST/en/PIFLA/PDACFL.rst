.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Mostafa Mohammed
   :satisfies: PDA Module
   :topic: PDAs and Context Free Languages
   :keyword: Pushdown Automaton; Context Free Languages


PDAs and Context Free Languages
===============================

PDAs and Context Free Languages
-------------------------------

In this module, we address the relationship between NPDAs and CFLs.
Spoiler alert: NPDAs recognize CFLs.


Convert a CFG to a NPDA
-----------------------

.. inlineav:: PDACFLFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/PDA/PDACFLFS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/FLA/PDA.js DataStructures/FLA/GrammarMatrix.js DataStructures/PIFrames.js AV/PIFLA/PDA/PDACFLFS.js
   :output: show
   :keyword: Pushdown Automaton; Context Free Languages


Convert a NPDA to a CFG
-----------------------

Now we want to show that given an NPDA, we can construct a CFG.
But first, we will show a result to make the next proof easier.

**Theorem:** Given a NPDA :math:`M`, there exists
a NPDA :math:`M'` such that all transitions have the form
:math:`\delta(q_i, a, A) = \{c_1, c_2, \ldots c_n\}` where 

.. math::

   \begin{eqnarray*}
   c_i &=& (q_j, \lambda)\\
   \mbox{or}\ c_i &=& (q_j, BC)\\
   \end{eqnarray*}

The consequence of this restriction is that each move either increases
or decreases the stack contents by a single symbol.

**Proof:** (sketch)

We can achieve our desired restricted form by replacing any transition
in the PDA that has too many or too few variables as follows.

   .. odsafig:: Images/lt7pf4.png
      :width: 400
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt7pf4

**Theorem:** If :math:`L = L(M)` for some NPDA :math:`M`,
then :math:`L` is a CFL.

Want to show that each NPDA represents a CFL, so we 
will take a NPDA :math:`M` and convert it to a CFG. 
It will be an easier construction if we take the NPDA and put all the 
transitions in a simpler form.

   | **Proof Sketch:**
   | Given NPDA :math:`M`, first, construct an equivalent NPDA
     :math:`M'` that meets the simplifying assumptions.
   | Reverse the process used to generate a PDA from a grammar
     to simulate the PDA in the grammar
   |   The content of the stack should be reflected in the variable
       part of the sentential form
   |   The processed input is the terminal prefix of the sentential
       form

.. ..

   The remaining material was derived originally from Susan Rodger's
   notes.
   Unfortunately, at this point this is mostly gibberish.
   And even so far as it goes, it leaves a lot "to the book".
   So not useful.
   What we need at a minimum is to modify the example so that it
   clearly shows something that is easily recognizeable as the
   resulting grammar.
   The example here might be interpretable as a grammar, but
   it causes too much confusion due to the unexplained notation to
   actually work as an example.
   So for now, I have commented this out, and we won't even pretend to
   give the proof.
   Thus, the brief sketch above replaces all of this for now
   (which makes this module match the course slides).

   **Proof:**

   | Given NPDA :math:`M`, first, construct an equivalent NPDA
     :math:`M'` that will be easier to work with.
     Construct :math:`M'` such that
   |   1. :math:`M'` accepts if stack is empty. (We have already seen
       how to do this.)
   |   2. Each move increases or decreases stack content by a single
       symbol.
       (Because of the modification that we made to the transitions, we
       can only push 2 variables or no variables with each transition.)
   | :math:`M' = (Q, \Sigma, \Gamma, \delta, q_0, z, F)`
   | Construct :math:`G = (V,\Sigma, S, P)` where
   | :math:`V = \{(q_icq_j)\ |\ q_i, q_j \in Q, c \in \Gamma \}`
   |    (Some of these variables will be useless.)
   | :math:`(q_icq_j)` means "starting at state :math:`q_i`, with the
     stack contents at :math:`cw`, :math:`w \in \Gamma^*`,
     some path is followed to state :math:`q_j` and the 
     contents of the stack are now :math:`w`". 
   | Goal: \ \ :math:`(q_0Zq_f)` which will be the start symbol in
     the grammar. 
   | Meaning: We start in state :math:`q_0` with :math:`Z` on the
     stack and process the input tape. 
     Eventually we will reach the final state :math:`q_f` and the
     stack will be empty. (Along the way we may push symbols on the
     stack, but these symbols will also be popped from the stack). 
   | The machine accepts by empty stack, but it is designed so that
     there is only one state in which the machine accepts.
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
   | Must show that the constructed grammar :math:`G` is such that
     :math:`L(G) = L(M')`.
     That is, :math:`w \in L(G)` iff :math:`w \in L(M)`. QED. 

.. .. topic:: Example

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
     That is, :math:`w \in L(G)` iff :math:`w \in L(M)`. QED.
