.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger, Mostafa Mohammed and Cliff Shaffer
   :satisfies: Closure Properties of Regular Grammars
   :requires: Regular Grammars
   :topic: Regular languages


Closure Properties of Regular Languages
=======================================

Closure Concept
---------------

In this module, we will prove that a number of operations are closed
for the set of regular languages.

**Definition:** A set is :term:`closed` over a binary operation if,
whenever that operation is applied to any two members of the set, the
result is a member of the set.
A set is closed over a unary operation if, when that operation is
appied to any member of the set, the result is a member of the set.

.. inlineav:: ClosureConceptFS ff
   :links: AV/PIFLA/Regular/ClosureConceptFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/Regular/ClosureConceptFS.js
   :output: show


Closure Properties of Regular Languages - Basic Operations
----------------------------------------------------------

.. inlineav:: RLClosPropFS ff
   :links: AV/PIFLA/Regular/RLClosPropFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/Regular/RLClosPropFS.js
   :output: show


.. .. We don't need this, its covered (briefly) in the previous slideshow
.. Intersection between Regular Languages
.. --------------------------------------

.. ..
   .. .. inlineav:: RLClosInterFS ff
..    :links: DataStructures/FLA/FLA.css AV/PIFLA/Regular/RLClosInterFS.css
..    :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js AV/PIFLA/Regular/RLClosInterFS.js
..    :output: show


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


Some Answerable Questions about Regular Languages
-------------------------------------------------

.. inlineav:: RLQuestionsCON ss
   :links: AV/PIFLA/Regular/RLQuestionsCON.css
   :scripts: AV/PIFLA/Regular/RLQuestionsCON.js
   :output: show


Summary: How do we prove that a language is regular?
----------------------------------------------------

We just discussed a bunch of questions related to regular languages
that we know how to answer.
Now, what about the most important question of all that we could ask
about a language (at least, in the context of regular langauges)?
If I describe a language to you (in English, for example),
is that language regular?
This is a practical question because, if a language is known to be
regular, then we have ways to formally define it.
This means that key uses of the language
(like deciding if a given string is in the language)
can be implemented on a computer.
So, a fundamental way to prove that a language is regular is to
implement it using one of these ways:

* Write a DFA that accepts the language.
* Write a NFA that accepts the language.
* Write a regular expression that describes the language.
* Write a regular grammar that describes the language.

A slightly indirect way to prove that a language is regular is to
define it in terms of one or more known regular languages 
that are manipulated by operators known to be closed for
regular languages.
Which is why we have spent this entire module defining a useful
collection of such operators.

This begs some questions!
Are there languages that are **not** regular?
If so, how do we prove whether a language is regular or not?
Notice that everything in the list above is a construction or
simulation.
We probably can't prove that a language does **not** have some
property by construction, in the way that we can prove that it
**does** have that property by construction.
Some techniques for proving that a language is not regular is the
topic of the next chapter.
Spoiler alert: Unfortunately, we will see that we have no definitive
way to always be able to prove whether a language is regular or not.
We simply have tools that sometimes let us prove that the language is
regular (typically by constructing one of the representations already
described) or that let us prove the language is not regular.
