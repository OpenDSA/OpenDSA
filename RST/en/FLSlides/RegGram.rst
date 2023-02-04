.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires:
   :satisfies: Regular Grammar
   :topic: Finite Automata

.. slideconf::
   :autoslides: False


Regular Grammars
================

.. slide:: Regular Grammars

   Here is another way to describe a language: Use a grammar.

   Grammar :math:`G = (V, T, S, P)`

   | :math:`V`: Variables (nonterminals), represented by :math:`A, B, ..., Z`
   | :math:`T`: Terminals, reprsented by :math:`a, b, ..., z, 0, 1, ..., 9`
   | :math:`S`: Start symbol
   | :math:`P`: Productions (rules)

   :math:`V`, :math:`T`, and :math:`P` are finite sets.


.. slide:: Right-linear grammar

   | All productions are of the form:
   |    :math:`A \rightarrow xB`
   |    :math:`A \rightarrow x`
   | where :math:`A, B \in V, x \in T^*`

   Note: :math:`x` is a string of length 0 or more.


.. slide:: Left-linear grammar

   | All productions are of the form:
   |    :math:`A \rightarrow Bx`
   |    :math:`A \rightarrow x`
   | where :math:`A, B \in V, x \in T^*`

   **Definition:**

   Any right-linear or left-linear grammar is defined to be a regular grammar.

   (Some books use a more restrictive definition in which the length
   of :math:`x` is :math:`\leq 1`.)


.. slide:: Example 1

   | :math:`G = (\{S\},\{a,b\},S,P),`
   | :math:`P =`
   |     :math:`S \rightarrow abS`
   |     :math:`S \rightarrow \lambda`
   |     :math:`S \rightarrow Sab`

   << What language is this? >>

   .. .. :math:`(ab)^*`
      Of course, the first and third rules are redundant.
      We could drop either one to get a linear grammar.
      
.. slide:: Example 1

   | :math:`G = (\{S\},\{a,b\},S,P),`
   | :math:`P =`
   |     :math:`S \rightarrow abS`
   |     :math:`S \rightarrow \lambda`
   |     :math:`S \rightarrow Sab`

   Cannot mix left/right rules! This is not a regular grammar.

      
.. slide:: Example 2

   | :math:`G = (\{S\},\{a,b\},S,P),`
   | :math:`P =`
   |     :math:`S \rightarrow aB \mid bS \mid \lambda`
   |     :math:`B \rightarrow aS \mid bB`

   << What language is this? >>


.. slide:: Example 2

   | :math:`G = (\{S\},\{a,b\},S,P),`
   | :math:`P =`
   |     :math:`S \rightarrow aB \mid bS \mid \lambda`
   |     :math:`B \rightarrow aS \mid bB`

   This is a right linear grammar representing the language
   :math:`L = \{ \mbox{strings with an even number of a's}\}, \Sigma = \{a,b\}`


.. slide:: Our Next Step

   |  Done before:
   |      Definition:  DFA represents regular language
   |      Theorem:     RE :math:`\Longleftrightarrow` DFA
   |
   |  Next:
   |      Theorem:     DFA :math:`\Longleftrightarrow` regular grammar

   **Theorem:** L is a regular language iff :math:`\exists` regular
   grammar G such that :math:`L = L(G)`.


.. slide:: Proof: NFA from Regular Grammar

   **Theorem:** L is a regular language iff :math:`\exists` regular
   grammar G such that :math:`L = L(G)`.

   | (:math:`\Longleftarrow`) Given a regular grammar G, 
     Construct NFA M such that :math:`L(G)=L(M)`
   | Make a state for each non-terminal.
   | Make a transition on each terminal in that production rule.
   | Make it final if there is a production without non-terminals.
   | For rules with multiple terminals, need intermediate states.

   << What is the machine for Example 2? >>


.. slide:: RRG to NFA Example

   << See 4.4.2 >>


.. slide:: Proof: RR Grammar from DFA

   **Theorem:** L is a regular language iff :math:`\exists` regular
   grammar G such that :math:`L = L(G)`.

   (:math:`\Longrightarrow`) Given a DFA :math:`M`,
   construct regular grammar :math:`G` such that :math:`L(G)=L(M)`

   | The process is pretty much the same as when we made an NFA from
     RRG:
   |    Each DFA state gets a non-terminal.
   |    Each transition gets a production rule.


.. slide:: NFA to RRG Example

   <<See 4.4.3>>

   
.. slide:: Something to Think About

   :math:`L = \{a^nb^n \mid n>0\}`

   Is language :math:`L` regular?
   Can you draw a DFA, regular expression, or Regular grammar for this
   language?
