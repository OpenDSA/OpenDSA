.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger, Mostafa Mohammed, Cliff Shaffer
   :satisfies: 
   :topic: Formal Languages Major Concepts


Introduction to Formal Languages
================================

Introduction
------------

In this module, we present the three major concepts for the semester:
Languages, Grammars, and Automata.
We also will introduce helpful notation that we will use throughout
our discussions.


Languages
---------

First we'll present the basic ideas related to a Language, as this
word is used in Formal Languages.

.. inlineav:: LanguagesFS ff
   :links: AV/PIFLAS21/LanguagesFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLAS21/LanguagesFS.js
   :output: show


Grammars
--------

The following frameset will provide an introduction to the concept of
a grammar, as used in Formal Languages.

.. inlineav:: GrammarIntroFS ff
   :links: AV/PIFLAS21/GrammarIntroFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLAS21/GrammarIntroFS.js
   :output: show


Practicing Grammars
-------------------

.. avembed:: Exercises/FLA/CharacterizeLang1.html ka
   :long_name: Characterizing a Language, Problem 1


.. avembed:: Exercises/FLA/CharacterizeLang2.html ka
   :long_name: Characterizing a Language, Problem 2


Automata
--------

.. inlineav:: AutomataCON dgm
   :links: AV/VisFormalLang/Intro/AutomataCON.css
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/Intro/AutomataCON.js
   :align: center

   Abstract model of a digital computer.
   Note that in the control unit, the numbers represent
   "states", which are the specific positions on the dial that the
   arrow may point to.
   While this picture shows the physical components of the "computer",
   it is not showing the control behavior (what to do when we are in a
   given state with a given symbol on the current square of the
   tape, and a given value is at the current position in the storage
   unit).
   This control behavior is like the "software" of the computer.


There is a program associated with the control unit,
and the input is processed once from left to right.
Some versions have an additional storage unit.
We will define specific automata throughout the semester.

This is the topic for the next chapter.
   


