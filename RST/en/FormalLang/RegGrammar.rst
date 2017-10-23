.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires:
   :satisfies: Regular Grammar
   :topic: Finite Automata

Regular Grammars
================

Regular Grammars
----------------

Here is another way to describe a regular language.

Grammar :math:`G = (V, T, S, P)`

.. math::

   \begin{array}{lll}
   & & \mbox{represented by} \\
   V & \mbox{variables (nonterminals)} & A,B,..,Z \\ 
   T & \mbox{terminals}  & a,b,..,z,0,1,...9 \\ 
   S & \mbox{start symbol} \\
   P & \mbox{productions (rules)}\\
   \end{array}

:math:`V`, :math:`T`, and :math:`P` are finite sets.

**Right-linear grammar:**

.. math::
   
   \begin{array}{c}
   \mbox{all productions of form} \\
   A \rightarrow xB \\
   A \rightarrow x \\
   \mbox{where}\ A,B \in V, x \in T^*
   \end{array}

Note: :math:`x` is a string of length 0 or more.

**Left-linear grammar:**

.. math::
   
   \begin{array}{c}
   \mbox{all productions of form} \\
   A \rightarrow Bx \\
   A \rightarrow x \\
   \mbox{where}\ A,B \in V, x \in T^*
   \end{array}

**Definition:**

A regular grammar is a right-linear or left-linear grammar.

.. note::

   There is a more restrictive definition in which the length of
   :math:`x` is :math:`\leq 1`. (Exercise in book.)

.. topic:: Example

   .. math::

      \begin{eqnarray*}
      G &=& (\{S\},\{a,b\},S,P),\\
      P &=& \\
      &&S \rightarrow abS \\
      &&S \rightarrow \lambda \\
      &&S \rightarrow Sab \\
      \end{eqnarray*}

   Cannot mix left/right rules! This is not a regular grammar.
      
.. topic:: Example

   .. math::

      \begin{eqnarray*}
      G &=& (\{S\},\{a,b\},S,P),\\
      P &=& \\
      &&S \rightarrow aB | bS | \lambda \\
      &&B \rightarrow aS | bB \\
      \end{eqnarray*}

   This is a right linear grammar representing the language
   :math:`L = \{ \mbox{strings with an even number of a's}\}, \Sigma = \{a,b\}`

**Goal:**

|  Before:
|      definition   DFA represents regular language
|      theorem      RE :math:`\Longleftrightarrow` DFA
|  Goal:
|      theorem      DFA :math:`\Longleftrightarrow` regular grammar

**Theorem:** L is a regular language iff :math:`\exists` regular
grammar G such that :math:`L = L(G)`.

Outline of proof:

|  (:math:`\Longleftarrow`) Given a regular grammar G
|      Construct NFA M
|      Show :math:`L(G)=L(M)`
|      Show :math:`w \in L(G) \Longrightarrow w \in L(M)`
|      Show :math:`w \in L(M) \Longrightarrow w \in L(G)`
|      NFA :math:`\rightarrow` DFA :math:`\rightarrow` regular language
|  (:math:`\Longrightarrow`) Given a regular language
|      :math:`\exists` DFA M such that :math:`L=L(M)`
|      Construct regular grammar G
|      Show  :math:`L(G) = L(M)`
|      Show :math:`w \in L(G) \Longrightarrow w \in L(M)`
|      Show :math:`w \in L(M) \Longrightarrow w \in L(G)`

**Proof of Theorem:**

|  (:math:`\Longleftarrow`) Given a regular grammar G
|    :math:`G = (V,T,S,P)`
|      :math:`V= \{V_0,V_1,\ldots , V_y \}`
|      :math:`T = \{v_o,v_1,\ldots, v_z\}`
|      :math:`S = V_0`
|    Assume :math:`G` is right-linear
|      (see book for left-linear case).
|    Construct NFA :math:`M` such that :math:`L(G) = L(M)`
|    If :math:`w \in L(G), w = v_1v_2\ldots v_k`
|      Derivation:

.. math::
   
   \begin{eqnarray*}
     V_0 &\Rightarrow& v_1V_i\\ 
         &\Rightarrow& v_1v_2V_j\\ 
         &\stackrel{*}{\Rightarrow}& v_1v_2\ldots v_{k-1}V_n\\ 
         &\Rightarrow& v_1v_2\ldots v_{k-1}v_k\\ 
     \end{eqnarray*}
         
|    Process string the same way in NFA

.. odsafig:: Images/lt1string1.png
   :width: 400
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: lt1string1

|    :math:`M = (V\cup\{V_f\},T,\delta,V_0,\{V_f\})`
|  NOTE: :math:`M = (Q,\Sigma,\delta,q_0,F)`
|      :math:`V_0` is the start (initial) state
|  NOTE: only consider productions with one terminal
|      For each production, :math:`V_i \rightarrow aV_j`
|        :math:`\delta(V_i, a) = V_j`

.. odsafig:: Images/lt1string2.png
   :width: 150
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: lt1string2

|      For each production, :math:`V_i \rightarrow a`
|        :math:`\delta(V_i, a) = V_f` in :math:`F`

.. odsafig:: Images/lt1string3.png
   :width: 150
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: lt1string3

|  Show :math:`L(G) = L(M)`
|    Show :math:`w \in L(G) \Longrightarrow w \in L(M)`
|      By construction there is a path in the NFA :math:`M`
|    Show :math:`w \in L(M) \Longrightarrow w \in L(G)`
|      Must pass thru a sequence of states, start at :math:`V_0`,
|        and end at a final state between any two states represents
|        a production in grammar so there must be a derivation of :math:`w`
|    NFA :math:`\rightarrow` DFA :math:`\rightarrow` regular language
|    Thus, given regular grammar :math:`G`, :math:`L(G)` is regular.

BREAK FOR EXAMPLE BELOW

| (:math:`\Longrightarrow`) Given a regular language L
|   :math:`\exists` DFA :math:`M` such that :math:`L = L(M)`
|     :math:`M = (Q,\Sigma,\delta,q_0,F)`
|     :math:`Q = \{q_0,q_1,\ldots,q_n\}`
|     :math:`\Sigma = \{a_1,a_2,\ldots,a_m\}`
|   Construct regular grammar :math:`G` such that :math:`L(G) = L(M)`
|     :math:`G = (Q,\Sigma,q_0,P)`
|     NOTE: :math:`G =(V,T,P,S)`
|     If :math:`\delta(q_i,a_j) = q_k` then
|       :math:`q_i \rightarrow a_jq_k \in P`
|     If :math:`q_k\in F` then
|       :math:`q_k \rightarrow \lambda\in P`
|   Show :math:`w \in L(M) \Longleftrightarrow w \in L(G)`
|   Show :math:`w \in L(M) \Longrightarrow w \in L(G)`
|     then there is a path from :math:`q_0` to some final state
|     so there is a derivation of :math:`w` in :math:`G`.
|   Show :math:`w \in L(G) \Longrightarrow w \in L(M)`
|     there is a derivation of :math:`G`, start at :math:`q_0`
|     and end at a final state (since end by rule with no variables on
|     right hand side). Thus, there must be a path in :math:`M` to final state.
|   Thus, :math:`L(G) =L(M)`.
| QED.


.. topic:: Example

   | Construct the NFA for the following :math:`G`. 
   |
   |   :math:`G =(\{S,B\},\{a,b\},S,P)`,
   |     :math:`P =`
   |       :math:`S \rightarrow aB | bS | \lambda`
   |       :math:`B \rightarrow aS | bB`
   |
   |   This is a right linear grammar representing the language
   |   :math:`L = \{` strings with an even number of a's :math:`\}, \Sigma = \{a,b\}`

   .. odsafig:: Images/strgtonfa.png
      :width: 200
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: strgtonfa

.. topic:: Example

   Construct the Regular Grammar for the NFA

   .. odsafig:: Images/stnfatorg.png
      :width: 200
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: stnfatorg

   |  :math:`G = (\{S,B\},\{a,b\},S,P)`,
   |    :math:`P =`
   |      :math:`q0 \rightarrow a q1`
   |      :math:`q1 \rightarrow a q0 | b q1 | \lambda`
