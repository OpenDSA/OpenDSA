.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Mostafa Mohammed and Cliff Shaffer
   :satisfies: Properties of Context-Free Languages
   :topic: Properties of Context-Free Languages


Ways to Prove that a Language is not a Context-Free Language
============================================================

Introduction
------------

We now have a lot of evidence that there are languages that are not in
the class of CFLs.
So, just like we have ways to prove whether a language is regular or
not, we now would like to find ways to prove whether a language is
context-free or not.
When we studied regular languages, we developed two tools to help us
tell whether a language is regular.
One was closure properties on regular languages.
Used correctly, they could help us both to prove that languages are
regular and to prove that they are not rebular.
In particular, we can prove that a language is regular by generating
it from known regular languages operated on by closed properties.
And, we could prove that a language is not regular by operating on it
using known regular languages and known closed properties to generate
a known non-regular language.

In a similar way, there exist closure properties for CFLs.
And so we can use these properties in appropriate cases both to prove
that a certain language is CFL, and also to prove that other
languages are not CFL.

We used a pumping lemma for regular languages to prove that
certain languages are not regular (because we were able to prove that
they could not be pumped).
Likewise, we will see that there is a pumping lemma for CFLs
(though it is somewhat different from the pumping lemma for regular
languages), and that this pumping lemma for CFLs can be used to prove
that certain languages are not CFL.


Closure Properties for Context-Free Languages
---------------------------------------------

.. inlineav:: CFLClosurePropFS ff
   :links: AV/PIFLA/PDA/CFLClosurePropFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/PDA/CFLClosurePropFS.js
   :output: show


Proving a language is not CFL by Using a Pumping Lemma
------------------------------------------------------

.. inlineav:: CFLPumpingLemmaFS ff
   :links: AV/PIFLA/PDA/CFLPumpingLemmaFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/PDA/CFLPumpingLemmaFS.js
   :output: show


Pumping Lemma Example 1
-----------------------

.. inlineav:: CFLPumpingEx1FS ff
   :links: AV/PIFLA/PDA/CFLPumpingEx1FS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/PDA/CFLPumpingEx1FS.js
   :output: show


Pumping Lemma Example 2
-----------------------

.. inlineav:: CFLPumpingEx2FS ff
   :links: AV/PIFLA/PDA/CFLPumpingEx2FS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/PDA/CFLPumpingEx2FS.js
   :output: show


Pumping Lemma Example 3
-----------------------

.. inlineav:: CFLPumpingEx3FS ff
   :links: AV/PIFLA/PDA/CFLPumpingEx3FS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/PDA/CFLPumpingEx3FS.js
   :output: show


Pumping Lemma Example 4
-----------------------

.. inlineav:: CFLPumpingEx4FS ff
   :links: AV/PIFLA/PDA/CFLPumpingEx4FS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/PDA/CFLPumpingEx4FS.js
   :output: show


Pumping Lemma Example 5
-----------------------

.. inlineav:: CFLPumpingEx5FS ff
   :links: AV/PIFLA/PDA/CFLPumpingEx5FS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/PDA/CFLPumpingEx5FS.js
   :output: show
