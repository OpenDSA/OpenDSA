.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Mostafa Mohammed and Cliff Shaffer
   :satisfies: Regular Expressions
   :topic: Regular Expressions


The Power of Regular Expressions
================================

Now that we know the definition for Regular Expressions and have a bit
of experience with writing them, the next order of business is
understanding how powerful they are.
In particular, a natural question to ask is:
What is the relationship between Regular Expressions and Regular
Languages?
Recall that a Regular Language is defined to be any langauge that can
be accepted by a DFA (and equivalently, any language that can be
accepted by a NFA).

In this section, we will use our standard approach of simulation to
show that Regular Expressions are equivalent to Regular Languages.
By this, we mean that a Regular Expression can be converted to a
representation for a Regular Language (in particular, a NFA).
Therefore, any Regular Expression represents a Regular Language.
Going the other way, any Regular Language (in the form of an NFA) can
be converted to a Regular Expression.
Thus, any Regular Language can be represented by a Reglar Language.
The conclusion is then that these are equivalent.


Every Regular Expression has an Equivalent NFA
----------------------------------------------

.. inlineav:: RegEx2NFA1FS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/Regular/RegEx2NFA1FS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js AV/PIFLA/Regular/RegEx2NFA1FS.js
   :output: show

**Summary:** We have now shown that (1) an RE consisting of
:math:`\lambda` or of a single symbol from the alphabet can be
represented by an NFA, and (2) we can convert any NFA to an equivalent
NFA with a single final state.
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

Now let's spell out the entire induction proof.

.. topic:: Theorem

   **Theorem:** Any RE can be converted to an equivalent NFA.

   **Proof:** We will prove this using induction.

   #. **Base Case:** REs :math:`\lambda` and symbols
      :math:`a \in \Sigma` can be all be converted to NFAs as
      demonstrated by the constructions in Part 1 above.

   #. **Induction Hypothesis:** When trying to build the NFA
      equivalent to :math:`t` that was created using one of the
      construction rules :math:`t = r + s`,
      :math:`t = rs`, or :math:`t = r^*`, we can assume that
      :math:`r` and :math:`s` can be converted to NFAs.

   #. **Induction Step:** By definition, any RE :math:`t` must
      either be a member of the base case or built by one of the three
      builder rules.
      If it can be formed using one of the builder rules,
      then from the induction hypothesis we can assume
      that :math:`r` and :math:`s` used to build :math:`t` can be
      converted to equivalent NFAs.
      From the constructions shown in Parts 1, 2, 3, and 4 above,
      :math:`t` can therefore also be converted to an equivalent NFA.

**Summary:** Using an inductive argument, we have now demonstrated
that we can convert any RE to an NFA.
So, all REs accept a regular language.


Converting a Regular Expression to a NFA
----------------------------------------

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


Converting NFAs to Regular Expressions
---------------------------------------------------

.. inlineav:: ConvertRLREFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/Regular/ConvertRLREFS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js DataStructures/FLA/PDA.js AV/Obsolete/FL_resources/ParseTree.js AV/PIFLA/Regular/ConvertRLREFS.js
   :output: show


Summary
-------

We have now demonstrated the following:

* Any RegEx can be represented by an NFA or a DFA.
* Any NFA (or DFA) can be represented by a RegEx.

Thus, all languages that can be represented by regular
expression are regular, and all regular languages can be represented
by a regular expression.
