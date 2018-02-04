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

:term:`Right-linear grammar`:

.. math::
   
   \begin{array}{c}
   \mbox{all productions of form} \\
   A \rightarrow xB \\
   A \rightarrow x \\
   \mbox{where}\ A,B \in V, x \in T^*
   \end{array}

Note: :math:`x` is a string of length 0 or more.

:term:`Left-linear grammar`:

.. math::
   
   \begin{array}{c}
   \mbox{all productions of form} \\
   A \rightarrow Bx \\
   A \rightarrow x \\
   \mbox{where}\ A,B \in V, x \in T^*
   \end{array}

**Definition:**

A :term:`regular grammar` is a right-linear or left-linear grammar.

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

   The language is :math:`(ab)*`.
   
   However, cannot mix left/right rules!
   So this is not a regular grammar.
      
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

Our Next Step
~~~~~~~~~~~~~

|  What we have already done:
|      Definition: DFA represents regular language
|      Theorem: NFA :math:`\Longleftrightarrow` DFA
|      Theorem: RE :math:`\Longleftrightarrow` NFA
|  What we will do next:
|      Theorem: DFA :math:`\Longleftrightarrow` regular grammar


NFA from Regular Grammar
~~~~~~~~~~~~~~~~~~~~~~~~

**Theorem:** L is a regular language if and only if :math:`\exists` regular
grammar G such that :math:`L = L(G)`.

   | (Doing here for RR grammar, see book for proof sketch for LR
     grammar.)
   | (:math:`\Longleftarrow`) Given a regular grammar G, 
     Construct NFA M such that :math:`L(G)=L(M)`
   | Make a state for each non-terminal.
   | Make a transition on each terminal in that production rule.
   | Make it final if there is a production without non-terminals.
   | For rules with multiple terminals, need intermediate states.

.. topic:: Example

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

   What about a rule like :math:`S \rightarrow abB`?
   Make two states (S to intermediate state on a, then intermediate
   state to B on b).

   Or :math:`S \rightarrow ab`?
   Make two states (S to intermediate state on a, then intermediate
   state to an accepting state on B.



Right-linear Regular Grammar from DFA
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   **Theorem:** L is a regular language iff :math:`\exists` regular
   grammar G such that :math:`L = L(G)`.

   (:math:`\Longrightarrow`) Given a DFA :math:`M`,
   construct regular grammar :math:`G` such that :math:`L(G)=L(M)`

   | The process is pretty much the same as when we made an NFA from
     RRG:
   |    Each DFA state gets a non-terminal.
   |    Each transition gets a production rule.

   Construct the Regular Grammar for the NFA

   .. odsafig:: Images/stnfatorg.png
      :width: 200
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: stnfatorg

   |  :math:`G = (\{S,B\},\{a,b\},S,P)`,
   |    :math:`P =`
   |      :math:`Q0 \rightarrow a Q1`
   |      :math:`Q1 \rightarrow a Q0 | b Q1 | \lambda`


Something to Think About
~~~~~~~~~~~~~~~~~~~~~~~~

.. topic:: Example
   
   :math:`L = \{a^nb^n \mid n>0\}`

   Is language :math:`L` regular?
   Can you draw a DFA, regular expression, or Regular grammar for this
   language?

   Consider this grammar:

   :math:`S \rightarrow aSb \mid ab`

   Nice and easy... but this grammar is not regular!

   We will come back to this question later.
