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

Introduction to regular grammar
-------------------------------

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
|      Theorem: RE :math:`\Longleftrightarrow` NFA
|  What we will do next:
|      Theorem: DFA :math:`\Longleftrightarrow` regular grammar

Of course, this will mean that DFAs, NFAs, REs, regular languages, and
regular grammars all have exactly the same power.


Regular Grammars to NFAs
------------------------

.. inlineav:: NFAToREFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/Regular/NFAToREFS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js DataStructures/FLA/GrammarMatrix.js AV/PIFLA/Regular/NFAToREFS.js
   :output: show

|

.. inlineav:: REtoFAExampleFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/Regular/REtoFAExampleFS.css
   :scripts: lib/underscore.js DataStructures/FLA/FA.js DataStructures/FLA/AddQuestions.js DataStructures/PIFrames.js DataStructures/FLA/GrammarMatrix.js AV/PIFLA/Regular/REtoFAExampleFS.js
   :output: show


Regular Grammars from NFAs
--------------------------

.. inlineav:: RightLinearRGFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/Regular/RightLinearRGFS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js AV/PIFLA/Regular/RightLinearRGFS.js 
   :output: show

|

.. inlineav:: NFAToReExampleFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/Regular/NFAToReExampleFS.css
   :scripts: lib/underscore.js DataStructures/FLA/AddQuestions.js DataStructures/FLA/FA.js DataStructures/PIFrames.js DataStructures/FLA/GrammarMatrix.js AV/PIFLA/Regular/NFAToReExampleFS.js 
   :output: show


Left Regular Grammars
---------------------

.. inlineav:: LeftLinearGrammarFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/Regular/LeftLinearGrammarFS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js AV/PIFLA/Regular/LeftLinearGrammarFS.js
   :output: show


RegEx and Regular Grammars
--------------------------

.. inlineav:: RegEXtoRegGrammarFS ff
   :links: AV/PIFLA/Regular/RegEXtoRegGrammarFS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js AV/PIFLA/Regular/RegEXtoRegGrammarFS.js
   :output: show

|

.. inlineav:: RegEXtoLeftRegGrammarFS ff
   :links: AV/PIFLA/Regular/RegEXtoLeftRegGrammarFS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js AV/PIFLA/Regular/RegEXtoLeftRegGrammarFS.js
   :output: show


Something to Think About
------------------------

.. inlineav:: STAFS ff
   :links: AV/PIFLA/Regular/STAFS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js AV/PIFLA/Regular/STAFS.js
   :output: show
