.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Mostafa Mohammed and Cliff Shaffer
   :satisfies: Properties of Context-Free Languages
   :topic: Properties of Context-Free Languages


Properties of Context-Free Languages
====================================

Introduction
------------

We now have a lot of evidence that there are languages that are not in
the class of CFLs.
So, we want ways to be able to tell the difference.
When we studied regular languages, we developed two tools to help us
tell if a language is regular or not.
One was closure properties on regular languages, that could help us
both to prove in some cases that a language is regular, and could help
us to prove in other cases that a language is not regular.

In a similar way, there exist closure properties for CFLs, and so we
can use these properties in appropriate cases both to prove a language
is a CFL, and also prove that other languages are not CFL.

We used a pumping lemma for regular languages to prove that
certain languages are not regular (because they could not be pumped).
Likewise, we will see that there is a pumping lemma for CFLs (though
it is somewhat different from the pumping lemma for regular
languages), and that it can be used to prove that certain languages
are not a CFL.


Closure Properties for Context-Free Languages
---------------------------------------------

.. inlineav:: CFLClosurePropFS ff
   :links: AV/PIFLA/PDA/CFLClosurePropFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/PDA/CFLClosurePropFS.js
   :output: show


Proving a language is not CFL - Using a Pumping Lemma
-----------------------------------------------------

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
