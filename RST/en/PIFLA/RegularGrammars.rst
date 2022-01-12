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

.. .. Leave this one out, another example is unnecessary
   .. .. inlineav:: NFAToReExampleFS ff
..   :links: DataStructures/FLA/FLA.css AV/PIFLA/Regular/NFAToReExampleFS.css
..   :scripts: lib/underscore.js DataStructures/FLA/AddQuestions.js DataStructures/FLA/FA.js DataStructures/PIFrames.js DataStructures/FLA/GrammarMatrix.js AV/PIFLA/Regular/NFAToReExampleFS.js 
..   :output: show


Converting between Left-linear and Right-linear Grammars
--------------------------------------------------------

.. inlineav:: LeftLinearGrammarFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/Regular/LeftLinearGrammarFS.css
   :scripts: lib/underscore.js DataStructures/FLA/FA.js DataStructures/PIFrames.js DataStructures/FLA/AddQuestions.js AV/PIFLA/Regular/LeftLinearGrammarFS.js
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
