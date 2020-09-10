.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger, Cliff Shaffer, and Mostafa Mohammed
   :requires: FL Introduction
   :satisfies: FL Concepts
   :topic: Introduction

.. slideconf::
   :autoslides: False


Key Concepts
============

.. slide:: Key Concept: Language

   * :math:`\Sigma`: A set of symbols, an alphabet

     * Notation: Usually we use for examples: :math:`a, b, c`

   * **String:** Finite sequence of symbols (from some alphabet)

     * Notation: usually we use for exampls: :math:`u, v, w`

   * **Language:** A subset of the strings defined over :math:`\Sigma`

   So, a language is a sets of strings, in particular, some subset of
   the powerset of :math:`\Sigma`.


.. slide:: Language Examples

   * | :math:`\Sigma = \{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\}`
     | :math:`L = \{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, ... \}`

   * | :math:`\Sigma = \{a, b, c\}`
     | :math:`L = \{ab, ac, cabb\}`
     | :math:`L` is a language with 3 strings, each string is a sequence of
       strings formed over the alphabet.

   * | :math:`\Sigma = \{a, b\}`
     | :math:`L = \{a^n b^n | n > 0\}`
     | This is an example of an infinite language.
     | What are the strings in the language? :math:`\{ab, aabb, aaabbb, aaaabbbb, . . .\}`


.. slide:: Key Concept: Grammars

   | A tiny subset of the english language, not complete!
   |   <sentence> :math:`\rightarrow` <subject><verb><d.o.>
   |   <subject> :math:`\rightarrow` <noun> | <article><noun>
   |   <verb> :math:`\rightarrow` hit | ran | ate
   |   <d.o.> :math:`\rightarrow` <article><noun> | <noun>
   |   <noun> :math:`\rightarrow` Fritz | ball
   |   <article> :math:`\rightarrow` the | an | a

   Variables vs. Terminals


.. slide:: Deriving a sentence

   A variable in the grammar can be replaced by the right hand side of
   its rule::

      Fritz hit the ball

      <sentence> -> <subject><verb><d.o> 
                 -> <noun><verb><d.o>
                 -> Fritz <verb><d.o.>
                 -> Fritz hit <d.o.>
                 -> Fritz hit <article><noun>
                 -> Fritz hit the <noun>
                 -> Fritz hit the ball

   Can we derive these sentences? If not, can we change the grammar?::

      The ball hit Fritz

      The ball ate the ball


.. slide:: Formal definition of a grammar

   | A grammar :math:`G = (V, T, S, P)` where
   |   :math:`V` is a finite set of variables (nonterminals).
   |   :math:`T` is a finite set of terminals (generally, these are strings).
   |   :math:`S` is the start variable (:math:`S \in V`).
   |   :math:`P` is a set of productions (rules).

   :math:`x \rightarrow y` means to replace :math:`x` by :math:`y`.

   Here, :math:`x \in (V \cup T)^+, y \in (V \cup T)^*`.

.. slide:: Example

    .. avembed:: AV/OpenFLAP/examples/braces.html ss
       :long_name: write a grammar for a language example


.. slide:: Grammar Notation

   | :math:`w \Rightarrow z: \qquad w` derives :math:`z`
   | :math:`w \stackrel{*}{\Rightarrow} z: \qquad` derives in 0 or more steps
   | :math:`w \stackrel{+}{\Rightarrow} z: \qquad` derives in 1 or more steps

   | Given grammar :math:`G = (V, T, S, P)`, define
   |   :math:`L(G)= \{w \in T{}^{*} \mid S \stackrel{*}{\Rightarrow} w\}`

   | **Example**
   |   :math:`G=(\{S\}, \{a,b\}, S, P)`
   |   :math:`P=\{S \rightarrow aaS, S \rightarrow b\}`
   |   :math:`L(G) =` ?


.. slide:: Another Grammar Example

   | :math:`G=(\{S, B\}, \{a\}, S, P)`
   | :math:`P=\{S \rightarrow a \mid aB, B \rightarrow aa \mid aaB\}`
   | :math:`L(G) =` ?


.. slide:: Key Concept: Automata

   .. inlineav:: AutomataCON dgm
      :links: AV/VisFormalLang/Intro/AutomataCON.css
      :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/Intro/AutomataCON.js
      :align: center

   Numbers in control unit symbolize "states", which are the specific
   positions on the dial that the arrow may point to.


