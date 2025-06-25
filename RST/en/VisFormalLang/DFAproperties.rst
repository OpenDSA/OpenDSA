.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :title: Two Closure Properties for Regular Languages
   :author: Susan Rodger; Cliff Shaffer
   :institution: Duke University; Virginia Tech
   :requires: Deterministic Finite Automata
   :satisfies:
   :topic: Finite Automata
   :keyword: Regular Language; Closure Properties
   :naturallanguage: en
   :programminglanguage: N/A
   :description: Presents two unusual closure properties for Regular Languages: Replacing one a with b, and truncate preceeding b's.


Properties
==========

.. .. This is not ready for use in a course!

Introduction
------------

Here are two more (slightly odd) properties that are closed for
regular languages.


Properties and Proving: Problem 1
---------------------------------

Consider the property Replace_one_a_with_b or R1awb for short.
If :math:`L` is regular, prove that R1awb(:math:`L`) is regular. 

The property R1awb applied to a language :math:`L` replaces one
:math:`a` in each string with one :math:`b`.
If a string does not have an :math:`a`, then the string is not in 
R1awb(:math:`L`). 

What does this mean? What are we trying to prove? 

**Example 1**: Consider :math:`L = \{aaab, bbaa\}` 

IS :math:`L` REGULAR? YES, you can apply the property. 

:math:`\mathrm{R1awb}(L) = \{baab, abab, aabb, bbba, bbab\}`

**Example 2**: Consider :math:`\Sigma=\{a, b\}`,
:math:`L = \{w \in \Sigma^{*} \mid w \mathrm{\ has\ an\ even\ number\ of\ } a's \mathrm{\ and\ an\ even\ number\ of\ } b's \}`

Is :math:`L` regular? YES, How do you know?
We built a DFA for this language. 

:math:`\mathrm{R1awb}(L) = \{w \in \Sigma^{*} \mid w \mathrm{\ has\ an\ odd\ number\ of\ } a's \mathrm{\ and\ an\ odd\ number\ of\ } b's\}` 

Proof:

.. odsafig:: Images/ch2prob1proof.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Problem 1 proof

   Problem 1 proof


Properties and Proving - Problem 2
----------------------------------

Consider the property Truncate_all_preceeding_b's or TruncPreb for
short.
If :math:`L` is regular, prove TruncPreb(:math:`L`) is regular. 

The property TruncPreb applied to a language :math:`L` removes all
preceeding b's in each string.
If a string does not have an preceeding b,
then the string is the same in TruncPreb(:math:`L`).

What does this mean? What are we trying to prove? 

**Example 1**: Consider :math:`L = \{aaab, bbaa\}`

IS :math:`L` REGULAR? YES, you can apply the property. 

:math:`\mathrm{TruncPreb}(L) = \{aaab, aa\}`

**Example 2**: Consider :math:`L = \{(bba)^n \mid n > 0\}`

Is :math:`L` regular? YES.
How do you know? We built a DFA for this language. 

.. note::

   List out possible strings in the language 

:math:`\mathrm{TruncPreb}(L)= \{a(bba)^n \mid n \ge 0\}` 

**Proof**:

.. odsafig:: Images/ch2prob2proof.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Problem 2 proof

   Problem 2 proof

Make a copy of the DFA.
For each a arc in the first copy, remove it and 
instead have the :math:`a` arc go to the corresponding destination
below.

For each :math:`b` arc in the first copy, change the :math:`b` to lambda.
