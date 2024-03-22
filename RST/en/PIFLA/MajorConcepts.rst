.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger, Mostafa Mohammed, Cliff Shaffer
   :satisfies: FLA Introduction
   :topic: Formal Languages Major Concepts
   :keyword: Formal Languages and Automata; Grammars


Introduction to Formal Languages
================================

Introduction
------------

In this module, we present the three foundational concepts for the
semester: Languages, Grammars, and Automata.


Languages
---------

First we'll present the basic ideas related to a Language, as this
word is used in Formal Languages.

.. inlineav:: LanguagesFS ff
   :links: AV/PIFLA/Intro/LanguagesFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/Intro/LanguagesFS.js
   :output: show
   :keyword: Formal Languages and Automata


Grammars
--------

The following frameset provides an introduction to the concept of
a grammar, as used in Formal Languages.

.. inlineav:: GrammarIntroFS ff
   :links: AV/PIFLA/Intro/GrammarIntroFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/Intro/GrammarIntroFS.js
   :output: show
   :keyword: Formal Languages and Automata; Grammars

Practicing Grammars
-------------------

.. avembed:: Exercises/FLA/CharacterizeLang1.html ka
   :long_name: Characterizing a Language, Problem 1

.. avembed:: Exercises/FLA/CharacterizeLang2.html ka
   :long_name: Characterizing a Language, Problem 2


Automata
--------

Now we understand what a language is (some subset of strings over an
alphabet), and what a grammar is (a way of defining a language using
production rules).
Our third major concept is a family of computation models called
:term:`Automata`.
Automata should be thought of as simple computers.
The advantage to "simple" is that we can hope to completely understand
how "powerful" the various types of machines are.
Here "powerful" means what languages they can be programmed to
:term:`recognize`, which means to reliably determine if a
string is in the langauge or not.

.. inlineav:: AutomataCON dgm
   :links: AV/VisFormalLang/Intro/AutomataCON.css
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/Intro/AutomataCON.js
   :align: center
   :keyword: Formal Languages and Automata

   This diagram shows an abstract model of a digital computer.
   It has a tape (to store information), a tape head (to read the
   current square on the tape), a control unit, and possibly some
   optional storage in the form of a stack.
   Within the control unit, the numbers represent
   :term:`states <state>`, which are the specific positions on the
   dial that the arrow may point to.
   
While the picture above shows the physical components of the
"computer", it is not showing the control behavior (what to do when we
are in a given state with a given symbol on the current square of the
tape, and a given value is at the current position in the storage
unit).
This control behavior is like the "software" of the computer.
The "program" used to control this machine will be a set of rules
that check the current letter on the tape and the current state of
the machine, and then decide what state to move to.
Some machine types automatically move the tape head to the right at
each step.
Some machines are able to alter the symbol in the current
square, and maybe have a choice of whether to move right or left.

.. inlineav:: AutomataExCON dgm
   :links: DataStructures/FLA/FLA.css AV/VisFormalLang/FA/AutomataExCON.css
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/FA/AutomataExCON.js
   :align: center
   :keyword: Formal Languages and Automata

   This diagram shows an example of an automata in a form that shows
   its control behavior.
   This one accepts any string made of 1's and 0's that ends in 0
   (in other words, any even binary number).
   Can you figure out how it does that?
