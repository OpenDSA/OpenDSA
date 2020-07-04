.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires:
   :satisfies: Regular Languages Closure Properties
   :topic: Finite Automata

.. slideconf::
   :autoslides: False


Closure Properties of Regular Languages
=======================================

.. slide:: Closure Properties

   **Definition:** A set is *closed* over a (binary) operation if,
   whenever the operation is applied to two members of the set, the
   result is a member of the set.

   | Consider :math:`L = \{x \mid x` is a positive even integer :math:`\}`
   | Is :math:`L` is closed under the following?
   |    addition? Yes. [How do you know?]
   |    multiplication? Yes. [How do you know?]
   |    subtraction? No. :math:`6 - 10 = -4`. [Now you know!]
   |    division? No. :math:`4 / 4 = 1`. [Now you know!]


.. slide:: Closure of Regular Languages (1)

   Consider regular languages :math:`L_1` and :math:`L_2`.
   In other words, :math:`\exists` regular expressions :math:`r_1` and
   :math:`r_2` such that :math:`L_1 = L(r_1)` and :math:`L_2 = L(r_2)`.

   | These we already know:
   |    :math:`r_1 + r_2` is a regular expression denoting :math:`L_1 \cup L_2`.
        So, regular languages are closed under union.
   |    :math:`r_1r_2` is a regular expression denoting :math:`L_1 L_2`.
        So, regular languages are closed under concatenation.
   |    :math:`r_1^*` is a regular expression denoting :math:`L_1^*`.
        So, regular languages are closed under star-closure.


.. slide:: Proof: Complementation

   **Proof:** Regular languages are closed under complementation.

   | :math:`L_1` is a regular language :math:`\Rightarrow \exists` a DFA
     :math:`M` such that :math:`L_1 = L(M)`.
   | Construct DFA :math:`M'` such that:
   |   final states in :math:`M` are nonfinal states in :math:`M'`.
   |   nonfinal states in :math:`M` are final states in :math:`M'`.
   | :math:`w \in L(M') \Longleftrightarrow w \in \bar{L} \Rightarrow` closed
     under complementation.

   Why a DFA, will an NFA work? Must be NFA with trap states. 


.. slide:: Proof: Intersection

   **Proof:** Regular languages are closed under intersection.

   (1) DeMorgan's Law:
       :math:`L_1 \cap L_2 = \overline{\overline{L_1} \cup \overline{L_2}}`

   | (2) :math:`L_1` and :math:`L_2` are regular languages
         :math:`\Rightarrow \exists` DFAs :math:`M_1` and :math:`M_2`
               such that :math:`L_1 = L(M_1)` and :math:`L_2 = L(M_2)`. 
   |    :math:`L_1 = L(M_1)` and  :math:`L_2 = L(M_2)`
   |    :math:`M_1 = (Q, \Sigma, \delta_1, q_0, F_1)`
   |    :math:`M_2 = (Q, \Sigma, \delta_2, p_0, F_2)`

   The idea is to construct a DFA so that it accepts only if
   both :math:`M_1` and :math:`M_2` accept. There is an algorithm for that.


.. slide:: More Closure Properties (1)

   Regular languages are closed under these operations

   **Reversal:** :math:`L^R`

   **Difference:** :math:`L_1 - L_2`


.. slide:: More Closure Properties (2)

   | **Right quotient:**
     :math:`L_1 / L_2 = \{x \mid xy \in L_1\ \mbox{for some}\ y \in L_2\}`.
   | In other words, it is prefixs of appropriate strings in
     :math:`L_1`. Example:
   |    :math:`L_1 = \{a^*b^* \cup b^*a^*\}`
   |    :math:`L_2 = \{b^n \mid n` is even, :math:`n > 0 \}`
   |    :math:`L_1/L_2 = \{a^*b^*\}`


   **Theorem:** If :math:`L_1` and :math:`L_2` are regular, then
   :math:`L_1 / L_2` is regular.

   | **Proof:** (sketch)
   |   :math:`\exists` DFA :math:`M = (Q, \Sigma, \delta, q_0, F)` such that
       :math:`L_1 = L(M)`.
   |   Construct this DFA from the DFAs for :math:`L_1` and :math:`L_2`.
   |   There is an algorithm for that.


.. slide:: More Closure Properties (3)

   **Homomorphism:** Let :math:`\Sigma, \Gamma` be alphabets.
   A homomorphism is a function :math:`h : \Sigma \rightarrow \Gamma^*`

   Homomorphism means to substitute a single letter with a string.

   | Example
   |    :math:`\Sigma=\{a, b, c\}, \Gamma = \{0,1\}`
   |       :math:`h(a) = 11`
   |       :math:`h(b) = 00`
   |       :math:`h(c) = 0`
   |    :math:`h(bc) = h(b)h(c) = 000`
   |    :math:`h(ab^*) = h(a)h(b^*) = 11(h(b))^* = 11(00)^*`


.. slide:: Questions about Reg Languages (1)

   | :math:`L` is a regular language.
   |    Given :math:`L, \Sigma, w \in \Sigma^*`, is :math:`w \in L`?
   |       Answer: Construct a FA and test if it accepts :math:`w`. 
   |    Is :math:`L` empty?
   |    Example: :math:`L = \{a^nb^m | n > 0, m > 0\} \cap \{b^na^m |
        n > 1, m > 1\}` is empty.  
   |       Construct a FA. If there is a path from start state to a final state, then 
           :math:`L` is not empty. 


.. slide:: Questions about Reg Languages (2)

   | Is :math:`L` infinite?
   |    Construct a FA. Determine if any of the vertices on a path from 
        the start state to a final state are the base of some cycle.
        If so, then :math:`L` is infinite. 
   | Does :math:`L_1 = L_2`?
   |    Construct :math:`L_3 = (L_1 \cap \bar{L_2}) \cup (\bar{L_1} \cap L_2)`.
        If :math:`L_3 = \emptyset`, then :math:`L_1 = L_2`. 


