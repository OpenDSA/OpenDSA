.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger, Cliff Shaffer, and Mostafa Mohammed
   :requires: FLA Introduction
   :satisfies: Regular Grammars
   :topic: Regular Languages


Regular Grammars
================

Introduction to Regular Grammars
--------------------------------

Regular grammars are another way to describe regular languages.
Recall that a grammar is made of of terminals, variables, and
production rule.
As the name implies, a **regular** grammar is a special type of
grammar (we will see plenty of grammars later that are not regular).
Which begs the question: What makes a grammar regular?

.. inlineav:: RegularGrammarFS ff
   :links: AV/PIFLA/Regular/RegularGrammarFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/Regular/RegularGrammarFS.js
   :output: show

|  What we have already done this semester:
|      Definition: DFA represents regular language
|      Theorem: NFA :math:`\Longleftrightarrow` DFA
|      Theorem: RegEx :math:`\Longleftrightarrow` NFA
|  What we will do next:
|      Theorem: DFA :math:`\Longleftrightarrow` regular grammar

Of course, this will mean that DFAs, NFAs, REs, regular languages, and
regular grammars all have exactly the same power.
By this, we mean that DFAs, NFAs, Regular Expressions, and Regular
Grammars all can recognize, or if you perfer they
can all represent, exactly the same set of languages:
the regular languages.


Converting Regular Grammars to NFAs
-----------------------------------

.. inlineav:: RGtoNFAFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/Regular/RGtoNFAFS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js DataStructures/FLA/GrammarMatrix.js AV/PIFLA/Regular/RGtoNFAFS.js
   :output: show

            
Converting NFAs to Regular Grammars
-----------------------------------

.. inlineav:: NFAtoRGFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/Regular/NFAtoRGFS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js AV/PIFLA/Regular/NFAtoRGFS.js 
   :output: show

Actually, we have only shown that right-linear grammars are equivalent
to regular languages.
This might leave us with some doubts about the relationship between
left-linear and right-linear grammars.
However, similar constructions can be used to show the ability to
convert to/from left-linear grammars as well.


Something to Think About
------------------------

Consider the language :math:`L = \{a^nb^n \mid n>0\}`.
Is language :math:`L` regular?
Do you think that you can draw a DFA, regular expression, or Regular
grammar for this language?
Think about it for a moment |---| but don't spend a long time trying.

Consider this grammar: :math:`G = \{S \rightarrow aSb \mid ab\}`.
This is a nice and easy solution to finding a grammar for this
language.
There is just one problem: This grammar is not regular!
We will come back to this question later.
