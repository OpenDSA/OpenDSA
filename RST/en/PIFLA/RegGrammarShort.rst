.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger, Cliff Shaffer, and Mostafa Mohammed
   :requires: FLA Introduction
   :satisfies: Regular Grammars
   :topic: Regular Languages
   :keyword: Regular Languages; Regular Grammars


Regular Grammars
================

.. .. The difference between this and RegularGrammars is that this
      leaves out the conversions of RegEx to regular grammars
   
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
   :keyword: Regular Languages; Regular Grammars

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
   :keyword: Regular Languages; Regular Grammars

.. .. Leave this one out, another example is unnecessary
   .. .. inlineav:: REtoFAExampleFS ff
..   :links: DataStructures/FLA/FLA.css AV/PIFLA/Regular/REtoFAExampleFS.css
..   :scripts: lib/underscore.js DataStructures/FLA/FA.js DataStructures/FLA/AddQuestions.js DataStructures/PIFrames.js DataStructures/FLA/GrammarMatrix.js AV/PIFLA/Regular/REtoFAExampleFS.js
..   :output: show

            
Converting NFAs to Regular Grammars
-----------------------------------

.. inlineav:: NFAtoRGFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/Regular/NFAtoRGFS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js AV/PIFLA/Regular/NFAtoRGFS.js 
   :output: show
   :keyword: Regular Languages; Regular Grammars

.. .. Leave this one out, another example is unnecessary
   .. .. inlineav:: NFAToReExampleFS ff
..   :links: DataStructures/FLA/FLA.css AV/PIFLA/Regular/NFAToReExampleFS.css
..   :scripts: lib/underscore.js DataStructures/FLA/AddQuestions.js DataStructures/FLA/FA.js DataStructures/PIFrames.js DataStructures/FLA/GrammarMatrix.js AV/PIFLA/Regular/NFAToReExampleFS.js 
..   :output: show


Converting between Left-linear and Right-linear Grammars
--------------------------------------------------------

.. inlineav:: LLGrammarFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/Regular/LLGrammarFS.css
   :scripts: lib/underscore.js DataStructures/FLA/FA.js DataStructures/PIFrames.js DataStructures/FLA/AddQuestions.js AV/PIFLA/Regular/LLGrammarFS.js
   :output: show
   :keyword: Regular Languages; Regular Grammars


Summary
-------

In this module we introduced regular grammars, defined to be either
left-regular or right-regular grammars.
We confirmed that we can convert between left- and right-regular
grammars are really equivalent (by showing how to convert between
them).
We showed that NFAs can be converted to/from regular grammars, which
means that regular grammars have the same power as our other
representations for regular languages.
