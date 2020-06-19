.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger, Cliff Shaffer, and Mostafa Mohammed
   :requires:
   :satisfies: Regular Grammar
   :topic: Finite Automata

Regular Grammars
================

Regular Grammars
----------------

Regular grammars are another way to describe regular languages.
Recall that a grammar is made of of terminals, variables, and
production rule.
As the name implies, a **regular** grammar is a special type of
grammar (we will see plenty of grammars later that are not regular).
Which begs the question: What makes a grammar regular?
Before we can properly answer that, we need some definitions.

Suppose we have the following Grammar :math:`G = (V, T, S, P)` where,

.. math::

   \begin{array}{lll}
   & & \mbox{represented by} \\
   V & \mbox{variables (nonterminals)} & A,B,..,Z (that is, capital letters)\\
   T & \mbox{terminals}  & a,b,..,z,0,1,...9 (lower case letters and numbers)\\
   S & \mbox{start symbol} \\
   P & \mbox{productions (rules)}\\
   \end{array}

:math:`V`, :math:`T`, and :math:`P` are finite sets.

:term:`Linear grammar`:
A grammar is linear if has a single variable
in the RHS of every production rule.

.. math::

   \begin{array}{c}
   \mbox{All productions are of the form} \\
   A \rightarrow xB \\
   A \rightarrow Cx \\
   A \rightarrow x \\
   \mbox{where}\ A,B,C \in V, x \in T^*
   \end{array}

In this grammar, each production rule has at most one variable on the
RHS.
(Note: It does not need to be the same terminal :math:`x` in every production!)

:term:`Right-linear grammar`: This is a special case of linear
grammar.
If a grammar is linear and any variable, if it exists, always occurs at
the right end of the RHS, then the grammar is called a Right-linear grammar.
For example, the grammar:

.. math::

   \begin{array}{c}
   A \rightarrow xB \\
   A \rightarrow xC \\
   A \rightarrow y \\
   \mbox{where}\ A,B,C \in V, x,y \in T^*
   \end{array}

Note: :math:`x` or :math:`y` is a string of length 0 or more.
Each production has at most one variable, so the grammar is linear.
The variables (B and C) are at the end of the RHS,
so it is a right linear grammar.

:term:`Left-linear grammar`: This is the same as :term:`Right-linear grammar`,
but the occurance of any variable, if it exists, is at the begining of each
production RHS.
For example,

.. math::

   \begin{array}{c}
   A \rightarrow Bx \\
   A \rightarrow Cy \\
   A \rightarrow x \\
   \mbox{where}\ A,B,C \in V, x,y \in T^*
   \end{array}

Each production has at most one variable, so the grammar is linear.
The variables (B and C) are at the start of the RHS,
so it is a left linear grammar.

OK, so now we have the definitions that  we need to define a regular
grammar.

**Definition:**

A :term:`regular grammar` is a right-linear or left-linear grammar.

.. 
.. .. note::
.. 
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

**Theorem:** L is a regular language if and only if there exists a regular
grammar :math:`G` such that :math:`L = L(G)`.

   | (Doing here for RR grammar)
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

   .. inlineav:: RILinearGramNFACON dgm
      :links:   AV/VisFormalLang/Regular/RILinearGramNFACON.css
      :scripts: AV/VisFormalLang/Regular/RILinearGramNFACON.js
      :align: center
      :output: show

   What about a rule like :math:`S \rightarrow abB`?
   Make two states (S to intermediate state on a, then intermediate
   state to B on b).

   Or :math:`S \rightarrow ab`?
   Make two states (S to intermediate state on a, then intermediate
   state to an accepting state on B.


.. inlineav:: REtoFACON ss
   :links:   DataStructures/FLA/FLA.css AV/VisFormalLang/Regular/REtoFACON.css
   :scripts: lib/underscore.js DataStructures/FLA/Discretizer.js DataStructures/FLA/FA.js AV/VisFormalLang/Regular/REtoFACON.js
   :output: show


Right-linear Regular Grammar from DFA
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Theorem:** L is a regular language if and only if there exists a
regular grammar G such that :math:`L = L(G)`.

(:math:`\Longrightarrow`) Given a DFA :math:`M`,
construct regular grammar :math:`G` such that :math:`L(G)=L(M)`

| The process is pretty much the same as when we made an NFA from
  RRG:
|    Each DFA state gets a non-terminal.
|    Each transition gets a production rule.

Construct the Regular Grammar for the NFA

.. inlineav:: RlRegGramDFACON dgm
   :links:   AV/VisFormalLang/Regular/RlRegGramDFACON.css
   :scripts: AV/VisFormalLang/Regular/RlRegGramDFACON.js
   :align: center
   :output: show

|  :math:`G = (\{S,B\},\{a,b\},S,P)`,
|    :math:`P =`
|      :math:`Q0 \rightarrow a Q1`
|      :math:`Q1 \rightarrow a Q0 | b Q1 | \lambda`


.. inlineav:: FAtoRegGrammmarCON ss
   :links:   AV/VisFormalLang/Regular/FAtoRegGrammmarCON.css
   :scripts: AV/VisFormalLang/Regular/FAtoRegGrammmarCON.js
   :output: show



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
