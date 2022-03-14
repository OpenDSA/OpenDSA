.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires: Closure Properties of Regular Grammars
   :satisfies: Identifying Non-regular Languages
   :topic: Finite Automata

.. slideconf::
   :autoslides: False


Using Closure Properties to Prove a Language Non-Regular
========================================================

.. slide:: Using Closure Properties

   Using closure properties of regular languages, construct a language 
   that should be regular, but for which you have already shown is 
   not regular. Contradiction.

   | **Proof Outline:**
   | Assume :math:`L` is regular.
   | Apply closure properties to :math:`L` and other regular
     languages, constructing :math:`L'` that you know is not regular.
   | Closure properties :math:`\Rightarrow L'` is regular.
   | Contradiction. So :math:`L` is not regular.


.. slide:: Example

   | Prove that :math:`L = \{a^3b^nc^{n-3} | n > 3 \}` is not regular.
   |   Assume :math:`L` is regular.
   |   Define a homomorphism :math:`h: \Sigma \rightarrow \Sigma^*`
       such that :math:`h(a) = a\quad |\quad h(b) = a\quad |\quad h(c) = b`.
   |   :math:`h(L) = \{a^3a^nb^{n-3} | n > 3 \} = \{a^{n+3}b^{n-3} | n > 3\}`
   |   :math:`L` is regular and closure under homomorphism
       :math:`\Rightarrow h(L)` is regular. 
   |   The language :math:`\{b^6\}` is a regular language. 
   |   By closure under concatenation,
       :math:`L' = h(L)\{b^6\} = \{a^{n+3}b^{n+3} | n > 3\}`
       is regular. 
   |   The language
       :math:`L'' = \{ab, aabb, aaabbb, aaaabbbb, aaaaabbbbb, aaaaaabbbbbb\}` is regular. 
   |   By closure under union, :math:`L' \cup L'' = \{a^nb^n | n > 0\}`
       is regular. 
   |   But, we showed earlier that :math:`\{a^nb^n | n > 0 \}` is not
       regular! Contradiction.

      
.. slide:: Example

   | Prove that :math:`L = \{a^nb^ma^{m}\ |\ m \ge 0, n \ge 0 \}` is not regular.
   |   Assume :math:`L` is regular.
   |   :math:`L1 = \{ bb^{*}aa^{*}\}`
   |   :math:`L2 = L \cap L1 = \{b^na^n \mid n > 0\}`
   |   Define a homomorphism :math:`h: \Sigma \rightarrow \Sigma^*` 
       such that :math:`h(a) = b\quad |\quad h(b) = a`.
   |   :math:`h(L2) = \{a^nb^n | n>0 \}` should be regular.
   |   We showed earlier that :math:`\{a^nb^n | n > 0 \}` is not
       regular. Contradiction.


.. slide:: Example

   | Prove that :math:`L_1 = \{a^nb^na^n\ |\ n > 0\}` is not regular.
   |   Assume :math:`L_1` is regular.
   |   The goal is to try to construct :math:`\{a^nb^n | n > 0\}` which
       we know is not regular. 
   |   NOTE: Trying to intersect with :math:`\{a^{*}b^{*} \}` does not work. 
   |   Let :math:`L_2 = \{a^{*}\}`. :math:`L_2` is regular. 
   |   By closure under right quotient,
       :math:`L_3 = L_1 \backslash L_2 = \{a^nb^na^p | 0 \le p \le n, n > 0\}`
       is regular. 
   |   By closure under intersection,
       :math:`L_4 = L_3 \cap \{a^{*}b^{*}\} = \{a^nb^n | n > 0\}` is regular. 
   |   We already proved that :math:`L_4` is not regular. Contradiction.


.. slide:: Things to Think About

   | Is every language either regular or not regular?

   | Regardless of "truth", can **we know** for every language if it is
     regular or not regular?

   | There are more infinite sets of strings than there are finite sets
     of strings.
   |   (Really? Aren't there an infinite number of finite
       sets of strings?)

   | Since any "description" of a language (as a RegEx, in English, as
     a DFA) is ultimately a string, that means there are more
     languages than we can describe!
     
