.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger, Cliff Shaffer, and Mostafa Mohammed
   :requires:
   :satisfies:
   :topic: NFA

.. slideconf::
   :autoslides: False

Properties Stuff
================

.. slide:: Properties and Proving: Problem 1(a)

   Consider the property Replace_one_a_with_b or R1awb for short.
   If :math:`L` is regular, prove that R1awb(:math:`L`) is regular. 

   The property R1awb applied to a language :math:`L` replaces one
   :math:`a` in each string with a :math:`b`.
   If a string does not have an :math:`a`, then the string is not in 
   R1awb(:math:`L`). 

   What does this mean? What are we trying to prove? 

   **Example 1**: Consider :math:`L = \{aaab, bbaa\}` 

   IS :math:`L` REGULAR? YES, you can apply the property. 

   :math:`\mathrm{R1awb}(L) = \{baab, abab, aabb, bbba, bbab\}`


.. slide:: Properties and Proving: Problem 1(b)

   **Example 2**: Consider :math:`\Sigma=\{a, b\}`,
   :math:`L = \{w \in \Sigma^{*} \mid w \mathrm{\ has\ an\ even\ number\ of\ } a's \mathrm{\ and\ an\ even\ number\ of\ } b's \}`

   Is :math:`L` regular? YES, How do you know?
   We built a DFA for this language. 

   :math:`\mathrm{R1awb}(L) = \{w \in \Sigma^{*} \mid w \mathrm{\ has\ an\ odd\ number\ of\ } a's \mathrm{\ and\ an\ odd\ number\ of\ } b's\}` 


.. slide:: Proof

   .. odsafig:: Images/ch2prob1proof.png
      :width: 400
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: Problem 1 proof


.. slide:: Properties and Proving: Problem 2

   Consider the property Truncate_all_preceeding_b's or TruncPreb for
   short.
   If :math:`L` is regular, prove TruncPreb(:math:`L`) is regular. 

   The property TruncPreb applied to a language :math:`L` removes all
   preceeding b's in each string.
   If a string does not have an preceeding b,
   then the string is the same in TruncPreb(:math:`L`).

   What does this mean? What are we trying to prove? 


.. slide:: Examples

   **Example 1**: Consider :math:`L = \{aaab, bbaa\}`

   IS :math:`L` REGULAR? YES, you can apply the property. 

   :math:`\mathrm{TruncPreb}(L) = \{aaab, aa\}`

   **Example 2**: Consider :math:`L = \{(bba)^n \mid n > 0\}`

   Is :math:`L` regular? YES.
   How do you know? We built a DFA for this language. 

   << List out possible strings in the language >>


.. slide:: Theorem and Proof (1)

   :math:`\mathrm{TruncPreb}(L)= \{a(bba)^n \mid n \ge 0\}` 

   .. odsafig:: Images/ch2prob2proof.png
      :width: 400
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: Problem 2 proof


.. slide:: Theorem and Proof (2)

   Make a copy of the DFA.
   For each a arc in the first copy, remove it and 
   instead have the :math:`a` arc go to the corresponding destination
   below.

   For each :math:`b` arc in the first copy, change the :math:`b` to lambda.
