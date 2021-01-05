.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Mostafa Mohammed and Cliff Shaffer
   :satisfies: Regular Expressions
   :topic: Regular Expressions


Regular Expressions
===================

The :term:`Regular Expression` (also known as RegEx or RE) is another
way to define a language.
They are used a lot, especially by programmers for defining simple
search patterns.
This adds another way to define languages along with the ones that we
already know: Grammars, DFAs and NFAs.
Or, we could just describe the language using an English description.
Why do we need another one?

The problem with an English description (or any other language that
people speak) is that it is too imprecise, and not something that we
can easily implement.
Using a DFA or NFA requires typically requires some sort of graphical
editor, and this takes a bit of time to enter.
We will see that regular expressions are easy to just type, and they
tend to be relatively short descriptions for common languages that we
want to represent.
Of course, even a relatively small precise specification for a
language can be hard to come up with (or to understand).
But at least with a regular expression, it is usually quick and easy
to type once you have it.


Definition and Examples of Regular Expressions
----------------------------------------------

.. inlineav:: RegExFS ff
   :links: AV/PIFLA/Regular/RegExFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/Regular/RegExFS.js
   :output: show

**Definition** for Regular Expressions (RE): Given :math:`\Sigma`,
  #. :math:`\lambda`, and :math:`a \in \Sigma` are RE
  #. If :math:`r` and :math:`s` are regular expressions, then

      * :math:`r + s` is a RE
      * :math:`r s` is a RE
      * :math:`(r)` is a RE
      * :math:`r^*` is a RE
  #. :math:`r` is a RE if and only if it can be derived from (1) with
     a finite number of applications of (2). 

            
Converting a Regular Expression to a NFA
----------------------------------------

.. inlineav:: RegEx2NFA1FS ff
   :links: AV/PIFLA/Regular/RegEx2NFA1FS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js AV/PIFLA/Regular/RegEx2NFA1FS.js
   :output: show

**Summary:** We can convert any NFA to an equivalent NFA with a single
final state. This will be a useful first step.

.. inlineav:: RegEx2NFA2FS ff
   :links: AV/PIFLA/Regular/RegEx2NFA2FS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js AV/PIFLA/Regular/RegEx2NFA2FS.js
   :output: show

**Summary:** We can convert any RE to an NFA. So, all REs are
associated with a regular language.

            
Regular Expression VS Regular Language (ORing 2 RegEX)
------------------------------------------------------

.. inlineav:: RegEXandRegLangORFF ff
   :links: AV/PIExample/RegularLanguages/RegEXandRegLangORFF.css
   :scripts:AV/PIExample/RegularLanguages/RegEXandRegLangORFF.js DataStructures/FLA/FA.js DataStructures/PIFrames.js 
   :output: show

Regular Expression VS Regular Language (Concatenating 2 RegEX)
--------------------------------------------------------------

.. inlineav:: RegEXandRegLangConcatFF ff
   :links: AV/PIExample/RegularLanguages/RegEXandRegLangConcatFF.css
   :scripts:AV/PIExample/RegularLanguages/RegEXandRegLangConcatFF.js DataStructures/FLA/FA.js DataStructures/PIFrames.js 
   :output: show

Regular Expression VS Regular Language (Closure Operation)
----------------------------------------------------------

.. inlineav:: RegEXandRegLangStarFF ff
   :links: AV/PIExample/RegularLanguages/RegEXandRegLangStarFF.css
   :scripts:AV/PIExample/RegularLanguages/RegEXandRegLangStarFF.js DataStructures/FLA/FA.js DataStructures/PIFrames.js 
   :output: show

Regular Expression VS Regular Language Example
----------------------------------------------

.. inlineav:: RegEXtoNFAExampleFF ff
   :links: AV/PIExample/RegEXtoNFAExampleFF.css
   :scripts:AV/PIExample/RegEXtoNFAExampleFF.js DataStructures/FLA/FA.js DataStructures/PIFrames.js 
   :output: show

Regular Expression to Minimized DFA Example
-------------------------------------------

.. inlineav:: REtoMinimizedDFACON ss
   :links:   AV/VisFormalLang/Regular/REtoMinimizedDFACON.css
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/Regular/REtoMinimizedDFACON.js lib/paper-core.min.js DataStructures/FLA/REtoFAController.js lib/underscore.js DataStructures/FLA/Discretizer.js
   :output: show

Converting Regular Languages to Regular Expressions
---------------------------------------------------
.. inlineav:: ConvertRLREFF ff
   :links: AV/PIExample/RegularLanguages/ConvertRLREFF.css
   :scripts: AV/PIExample/RegularLanguages/ConvertRLREFF.js DataStructures/PIFrames.js DataStructures/FLA/FA.js DataStructures/FLA/PDA.js AV/Obsolete/FL_resources/ParseTree.js 
   :output: show

Converting Regular Languages to Regular Expressions Example
-----------------------------------------------------------
.. inlineav:: NFAtoRECON ff
   :links: AV/VisFormalLang/Regular/NFAtoRECON.css
   :scripts: AV/VisFormalLang/Regular/NFAtoRECON.js DataStructures/PIFrames.js DataStructures/FLA/FA.js DataStructures/FLA/PDA.js AV/Obsolete/FL_resources/ParseTree.js 
   :output: show
