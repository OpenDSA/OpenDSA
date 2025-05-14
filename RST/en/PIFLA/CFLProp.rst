.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :title: Proving that a Language is not Context-Free
   :author: Mostafa Mohammed; Cliff Shaffer
   :institution: Virginia Tech
   :satisfies: Properties of Context-Free Languages
   :topic: Properties of Context-Free Languages
   :keyword: Context-Free Language
   :naturallanguage: en
   :programminglanguage: N/A
   :description: Presents ways that a language can be shown to not be a context-free language. This includes using closure properties for CFL, and the pumping lemma for CFL.


Proving that a Language is not Context-Free
===========================================

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
   :keyword: Properties of Context-Free Languages


A Pumping Lemma for Context-Free Languages
------------------------------------------

.. inlineav:: CFLPumpingLemmaFS ff
   :links: AV/PIFLA/PDA/CFLPumpingLemmaFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/PDA/CFLPumpingLemmaFS.js
   :output: show
   :keyword: Properties of Context-Free Languages

| **The Pumping Lemma for Context Free Languages**
|   Let :math:`L` be any infinite CFL.
    Then there is a constant :math:`m` depending only on :math:`L`,
    such that for every string :math:`w` in :math:`L`,
    with :math:`|w| \ge m`, we may partition :math:`w = uvxyz`
    such that:
|   :math:`|vxy| \le m`, (limit on size of substring)
|   :math:`|vy| \ge 1`, (:math:`v` and :math:`y` not both empty)
|   For all :math:`i \ge 0`, :math:`uv^ixy^iz \in L`.

As an example, consider the language :math:`L = a^nb^n`.
The string :math:`a^mb^m` for any :math:`m` can be decomposed such that
:math:`u = a^{m-1}`, :math:`v = a`,  :math:`x = \lambda`,
:math:`x = b`, and :math:`z = b^{m-1}`.
Clearly, the last :math:`a` and first :math:`b` in the string can be
pumped an arbitrary number of times such that they are each pumped the
same amount of times.
In terms of the PDA, this means an arbitrary number of :math:`a`'s can be put
onto the stack and then matched to an equal number of :math:`b`'s.


Using the CFL Pumping Lemma to Prove a Language Not CFL: Example 1
------------------------------------------------------------------

We were able to use the pumping lemma for regular languages to prove
that a language is not regular by showing that it did not obey the
pumping lemma.
In a similar way, we can prove that a language is not a CFL by showing
that it does not obey the CFL pumping lemma.

The pumping lemma implies that a CFL can include strings that must
coordinate the behavior of two of its parts.
This is a frequent idiom in CFG productions (such as
:math:`S \rightarrow aSb`), and it fits the concept of loading and
then later unloading a stack.
But at the same time, we can see from the pumping lemma's formulation
that requiring the coordination of three parts is impossible.
So it should be no surprise that :math:`L = \{a^nb^nc^n : n \ge 1\}`
is not a CFL.
This intuition is presented formally in our first example of a CFL
pumping lemma proof.

.. inlineav:: CFLPumpingEx1FS ff
   :links: AV/PIFLA/PDA/CFLPumpingEx1FS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/PDA/CFLPumpingEx1FS.js
   :output: show
   :keyword: Properties of Context-Free Languages


Pumping Lemma Example 2
-----------------------

.. inlineav:: CFLPumpingEx2FS ff
   :links: AV/PIFLA/PDA/CFLPumpingEx2FS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/PDA/CFLPumpingEx2FS.js
   :output: show
   :keyword: Properties of Context-Free Languages


Pumping Lemma Example 3
-----------------------

.. inlineav:: CFLPumpingEx3FS ff
   :links: AV/PIFLA/PDA/CFLPumpingEx3FS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/PDA/CFLPumpingEx3FS.js
   :output: show
   :keyword: Properties of Context-Free Languages


Pumping Lemma Example 4
-----------------------

.. inlineav:: CFLPumpingEx4FS ff
   :links: AV/PIFLA/PDA/CFLPumpingEx4FS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/PDA/CFLPumpingEx4FS.js
   :output: show
   :keyword: Properties of Context-Free Languages


.. Pumping Lemma Example 5
.. -----------------------
.. This next example does not add anything new, and is tedious.
   So just skip it.

.. .. inlineav:: CFLPumpingEx5FS ff
   :links: AV/PIFLA/PDA/CFLPumpingEx5FS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/PDA/CFLPumpingEx5FS.js
   :output: show
   :keyword: Properties of Context-Free Languages
