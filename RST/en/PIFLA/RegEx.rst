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
They are used a lot by practicing programmers for things like defining
simple search patterns.
This adds another way to define languages along with the ones that we
already know: Grammars, DFAs and NFAs.
Or, we could just describe the language using an English description.
Why do we need another one?

The problem with an English description (or any other language that
people speak) is that it is too imprecise, and not something that we
can easily implement.
Using a DFA or NFA typically requires some sort of graphical
editor, and it takes a bit of time to enter all the states and
transitions.
We will see that regular expressions are easy to type, and they
tend to use relatively short descriptions for common languages that we
want to represent.
Of course, even a relatively small and precise specification for a
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
  #. :math:`\lambda`, and all :math:`a \in \Sigma` are RE
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
   :links: DataStructures/FLA/FLA.css AV/PIFLA/Regular/RegEx2NFA1FS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js AV/PIFLA/Regular/RegEx2NFA1FS.js
   :output: show

**Summary:** We can convert any NFA to an equivalent NFA with a single
final state.
This simplifies the rest of the constructions that we will use.

.. inlineav:: RegEx2NFAorFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/Regular/RegEx2NFAorFS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js AV/PIFLA/Regular/RegEx2NFAorFS.js
   :output: show

|

.. inlineav:: RegEx2NFAcatFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/Regular/RegEx2NFAcatFS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js AV/PIFLA/Regular/RegEx2NFAcatFS.js
   :output: show

|

.. inlineav:: RegEx2NFAstarFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/Regular/RegEx2NFAstarFS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js AV/PIFLA/Regular/RegEx2NFAstarFS.js
   :output: show

**Summary:** We can convert any RE to an NFA.
So, all REs accept a regular language.

            

Regular Expression to NFA Conversion Example
--------------------------------------------

.. inlineav:: RegEx2NFAExampleFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/Regular/RegEx2NFAExampleFS.css
   :scripts:  DataStructures/FLA/FA.js DataStructures/PIFrames.js AV/PIFLA/Regular/RegEx2NFAExampleFS.js
   :output: show

Regular Expression to Minimized DFA Example
-------------------------------------------

.. inlineav:: REtoMinimizedDFACON ss
   :links:   DataStructures/FLA/FLA.css AV/VisFormalLang/Regular/REtoMinimizedDFACON.css
   :scripts: lib/underscore.js lib/paper-core.min.js DataStructures/FLA/FA.js DataStructures/FLA/Discretizer.js DataStructures/FLA/REtoFAController.js AV/VisFormalLang/Regular/REtoMinimizedDFACON.js
   :output: show


Converting Regular Languages to Regular Expressions
---------------------------------------------------

.. inlineav:: ConvertRLREFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/Regular/ConvertRLREFS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js DataStructures/FLA/PDA.js AV/Obsolete/FL_resources/ParseTree.js AV/PIFLA/Regular/ConvertRLREFS.js
   :output: show

Converting Regular Languages to Regular Expressions Example
-----------------------------------------------------------

.. inlineav:: NFAtoRECON ss
   :links: AV/VisFormalLang/Regular/NFAtoRECON.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js AV/VisFormalLang/Regular/NFAtoRECON.js
   :output: show

Summary
-------

We have now demonstrated several things:

* Any RegEx can be represented by an NFA or a DFA.
* Any NFA (or DFA) can be represented by a RegEx.

Thus, all languages that can be represented by regular
expression are regular, and all regular languages can be represented
by a regular expression.

As we noted at the start, regular expressions don't give us any more
power than we already had with DFAs.
But they are often easier to write down, as you will see in the
following exercises.
