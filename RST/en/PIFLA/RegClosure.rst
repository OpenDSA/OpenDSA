.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger, Mostafa Mohammed and Cliff Shaffer
   :satisfies: Closure Properties of Regular Grammars
   :requires: Regular Grammars
   :topic: Regular languages


Closure Properties of Regular Grammars
======================================

Closure Concept
---------------

In this module, we will discuss the concept of closure operators for
the set of regular languages.

**Definition:** A set is :term:`closed` over a (binary) operation if,
whenever that operation is applied to any two members of the set, the
result is a member of the set.

.. inlineav:: RLClosConceptFS ff
   :links: AV/PIFLA/Regular/RLClosConceptFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/Regular/RLClosConceptFS.js
   :output: show

Closure Properties of Regular Languages - Basic Operations
----------------------------------------------------------

.. inlineav:: RLClosPropFS ff
   :links: AV/PIFLA/Regular/RLClosPropFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/Regular/RLClosPropFS.js
   :output: show

Intersection between Regular Languages
--------------------------------------

.. inlineav:: RLClosInterFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/Regular/RLClosInterFS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js AV/PIFLA/Regular/RLClosInterFS.js
   :output: show


Right quotient
--------------

.. inlineav:: RLClosQuotientFS ff
   :links: DataStructures/FLA/FLA.css AV/PIFLA/Regular/RLClosQuotientFS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js AV/PIFLA/Regular/RLClosQuotientFS.js
   :output: show


Homomorphism
------------

.. inlineav:: RLHomomorphFS ff
   :links: AV/PIFLA/Regular/RLHomomorphFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/Regular/RLHomomorphFS.js
   :output: show


Questions about Regular Languages
---------------------------------

.. inlineav:: RLQuestionsFS ff
   :links: AV/PIFLA/Regular/RLQuestionsFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/Regular/RLQuestionsFS.js
   :output: show


Summary: How do we prove that a language is regular?
----------------------------------------------------

We have a number of approaches in our toolbox.

* Write a DFA that accepts the language.
* Write a NFA that accepts the language.
* Write a regular expression that accepts the language.
* Write a regular grammar that accepts the language.
* Define the language in terms of one or more known regular languages
  that are manipulated by operators known to be closed for
  regular languages.

This begs the questions: Are there languages that are **not** regular?
If so, how do we prove that a language is not regular?
Notice that everything in the list above is a construction or
simulation.
We probably can't prove that a language does **not** have some
property by construction, in the way that we can prove that it
**does** have that property by construction.
How to prove that a language is not regular is the topic of the next
chapter.
