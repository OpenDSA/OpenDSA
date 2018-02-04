.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires:
   :satisfies:
   :topic: Finite Automata

Closure Properties of Regular Grammars
======================================

Closure Properties of Regular Grammars
--------------------------------------

Closure Concept
~~~~~~~~~~~~~~~

**Definition:** A set is :term:`closed` over a (binary) operation if,
whenever the operation is applied to two members of the set, the
result is a member of the set.

.. topic:: Example

   :math:`L = \{x | x \mbox{is a positive even integer}\}`

   Is :math:`L` is closed under the following?

   * addition? Yes. [How do you know? Need a proof.]
   * multiplication? Yes. [How do you know? Need a proof.]
   * subtraction? No. :math:`6 - 10 = -4`. [Now you know!]
   * division? No. :math:`4 / 4 = 1`. [Now you know!]


Closure of Regular Languages
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Consider regular languages :math:`L_1` and :math:`L_2`.
In other words, :math:`\exists` regular expressions :math:`r_1` and
:math:`r_2` such that :math:`L_1 = L(r_1)` and :math:`L_2 = L(r_2)`.

These we already know: [Ask yourself: Why do we know this?]

* :math:`r_1 + r_2` is a regular expression denoting :math:`L_1 \cup L_2`
  So, regular languages are closed under union.

* :math:`r_1r_2` is a regular expression denoting :math:`L_1 L_2`.
  So, regular languages are closed under concatenation.

* :math:`r_1^*` is a regular expression denoting :math:`L_1^*`.
  So, regular languages are closed under star-closure.

**Proof:** Regular languages are closed under complementation.

| :math:`L_1` is a regular language :math:`\Rightarrow \exists` a DFA
  :math:`M` such that :math:`L_1 = L(M)`.
| Construct DFA :math:`M'` such that:
|   final states in :math:`M` are nonfinal states in :math:`M'`.
|   nonfinal states in :math:`M` are final states in :math:`M'`.
| :math:`w \in L(M') \Longleftrightarrow w \in \bar{L} \Rightarrow` closed
  under complementation.

.. note::
   Why a DFA, will an NFA work? With difficulty: It must be a complete
   NFA with trap states added.

**Proof:** Regular languages are closed under intersection.

One simple way to prove this is using DeMorgan's Law:

.. math::

   L_1 \cap L_2 = \overline{\overline{L_1} \cup \overline{L_2}}

Here is another approach by construction.

| :math:`L_1` and :math:`L_2` are regular languages :math:`\Rightarrow \exists` DFAs
  :math:`M_1` and :math:`M_2` such that :math:`L_1 = L(M_1)` and :math:`L_2 = L(M_2)`.
| :math:`L_1 = L(M_1)` and  :math:`L_2 = L(M_2)`
| :math:`M_1 = (Q, \Sigma, \delta_1, q_0, F_1)`
| :math:`M_2 = (Q, \Sigma, \delta_2, p_0, F_2)`

.. note::

   The idea is to construct a DFA so that it accepts only if
   both :math:`M_1` and :math:`M_2` accept
   
| Now, construct :math:`M' = (Q', \Sigma, \delta', (q_0, p_0), F')`
|   :math:`Q' = (Q \times P)`
|   :math:`\delta'`:
|     :math:`\delta'((q_i, p_j), a) = (q_k, p_l)` if
|       :math:`\delta_1((q_i, a) = q_k) \in M_1` and
        :math:`\delta_2((p_j, a) = p_l) \in M_1`.
|   :math:`F' = \{(q_i, p_j) \in Q' | q_i \in F_1` and :math:`p_j \in F_2\}`
| :math:`w \in L(M') \Longleftrightarrow w \in L_1 \cap L_2 \Rightarrow`
  is closed under intersection 

.. topic:: Example
           
   Create the DFA for the intersection of two DFAs:

   :math:`L_1 = a^*b` and :math:`L_2 = aa\{a|b\}^*`

   .. odsafig:: Images/stnfaints.png
      :width: 400
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: stnfaints


Regular languages are closed under these operations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Reversal:** :math:`L^R`

**Difference:** :math:`L_1 - L_2`

**Right quotient:**

Definition:
:math:`L_1 \backslash L_2 = \{x | xy \in L_1\ \mbox{for some}\ y \in L_2\}`

In other words, it is prefixs of appropriate strings in :math:`L_1`.

.. topic:: Example

   | :math:`L_1 = \{a^*b^* \cup b^*a^*\}`
   | :math:`L_2 = \{b^n | n` is even, :math:`n > 0 \}`
   | :math:`L_1/L_2 = \{a^*b^*\}`

**Theorem:** If :math:`L_1` and :math:`L_2` are regular, then
:math:`L_1 \backslash L_2` is regular.

**Proof:** (sketch)

:math:`\exists` DFA :math:`M = (Q, \Sigma, \delta, q_0, F)` such that
:math:`L_1 = L(M)`.

Construct DFA :math:`M'=(Q, \Sigma, \delta, q_0, F')`
(equivalent to :math:`M` except for final states). 

| For each state :math:`i` do
|   Make :math:`i` the start state (representing :math:`L_i'`)
|   if :math:`L_i' \cap L_2 \ne \emptyset` then
|     put :math:`q_i` in :math:`F'` in :math:`M'`

.. note::

   Not empty means there's a path between start and a final state.

QED.

**Homomorphism:**

**Definition:** Let :math:`\Sigma, \Gamma` be alphabets.
A homomorphism is a function :math:`h : \Sigma \rightarrow \Gamma^*`

Homomorphism means to substitute a single letter with a string.

.. topic:: Example

   | :math:`\Sigma=\{a, b, c\}, \Gamma = \{0,1\}`
   |   :math:`h(a) = 11`
   |   :math:`h(b) = 00`
   |   :math:`h(c) = 0`
   |
   | :math:`h(bc) = h(b)h(c) = 000`
   | :math:`h(ab^*) = h(a)h(b^*) = 11(h(b))^* = 11(00)^*`


Questions about regular languages
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

:math:`L` is a regular language.

* Given :math:`L, \Sigma, w \in \Sigma^*`, is :math:`w \in L`?

  Answer: Construct a FA and test if it accepts :math:`w`. 

* Is :math:`L` empty?

  Example: :math:`L = \{a^nb^m | n > 0, m > 0\} \cap \{b^na^m | n > 1, m > 1\}` is empty. 

  Construct a FA. If there is a path from start state to a final state, then 
  :math:`L` is not empty. 

  .. note::

     Perform depth first search. 

  This was easy! But we will see that in other contexts that
  complement is not so simple to decide.


* Is :math:`L` infinite?

  Construct a FA. Determine if any of the vertices on a path from 
  the start state to a final state are the base of some cycle.
  If so, then :math:`L` is infinite. 

* Does :math:`L_1 = L_2`?

  Construct :math:`L_3 = (L_1 \cap \bar{L_2}) \cup (\bar{L_1} \cap L_2)`.
  If :math:`L_3 = \emptyset`, then :math:`L_1 = L_2`. 

  Again, in other contexts, this is impossible.
  For example, we will prove that its not possible to decide, in
  general, if two programs do the same thing.


Identifying Nonregular Languages
--------------------------------

If a language :math:`L` is finite, is :math:`L` regular?

* Yes! All the strings unioned together form a regular expression. 

If :math:`L` is infinite, is :math:`L` regular? 

* It might be and it might not. 

* :math:`L_1 = \{a^nb^m | n > 0, m > 0 \} = aa^*bb^*` 
  is an infinite regular language. 

* :math:`L_2 = \{a^nb^n | n > 0 \}` 
  is an infinite language that is not regular. 

**Prove** that :math:`L_2 = \{a^nb^n | n > 0 \}` is not regular.
(Proof by contradiction)

   | Proof: Suppose that :math:`L_2` is regular. 
   | Then  :math:`\exists` DFA :math:`M` that recognizes :math:`L_2`.
   | :math:`M` has a finite number of states, say :math:`k` states. 
   | Consider a long string :math:`a^kb^k \in L_2`. 
   | Since there are :math:`k` states and :math:`k` a's,
     some state in :math:`M` must be reached more than once when
     following the path of :math:`a^k`. 
   | In that case, there is a loop with one or more a's
     (say :math:`t` a's for some :math:`t > 1`) along the path. 
   | Suppose we start at the initial state, traverse the same path for
     :math:`a^kb^k`, but we traverse the loop of a's one additional time
     ("pump" the loop).
     We will end up in the same final state that :math:`a^kb^k` did. 
   | Therefore, the string :math:`a^{k+t}b^k` is accepted by :math:`M`,
     but this string is not in :math:`L_2`. Contradiction! 
   | Thus, :math:`L_2` is not regular. QED 


Pumping Lemma
~~~~~~~~~~~~~

Let :math:`L` be an infinite regular language. 
:math:`\exists` a constant :math:`m > 0` such that any
:math:`w \in L` with :math:`|w| \ge m` can be decomposed into three
parts as :math:`w=xyz` with:

   |  :math:`|xy| \le m`
   |  :math:`|y| \ge 1`
   |  :math:`xy^iz \in L` for all :math:`i\ge 0`

**Meaning:** Every sufficiently long string in :math:`L`
(the constant :math:`m` corresponds to the finite number of states in
:math:`M`)
can be partitioned into three parts such that the middle 
part can be "pumped", resulting in strings that must be in :math:`L`. 

**How To Use the Pumping Lemma to prove L is not regular:**

   | Proof by Contradiction.
   | Assume L is regular.
   | Therefore :math:`L` satisfies the pumping lemma. 
   | Choose a long string :math:`w \in L`, :math:`|w| \ge m`.
     (The choice of the string is crucial.
     We must pick a string that will yield a contradiction). 
   | Show that there is NO division of :math:`w` into :math:`xyz`
     (must consider all possible divisions) such that
     :math:`|xy| \le m`, :math:`|y| \ge 1` and :math:`xy^iz \in L \forall i \ge 0`.
   | The pumping lemma does not hold. Contradiction!
   | :math:`\Rightarrow L` is not regular. QED.

.. topic:: Example

   :math:`L = \{a^ncb^n | n > 0\}`

   **Theorem:** :math:`L` is not regular.

   **Proof:**

      | Assume :math:`L` is regular, therefore the pumping lemma holds. 
      | Choose :math:`w = a^mcb^m`
        where :math:`m` is the constant in the pumping lemma. 
        (Note that :math:`w` must be choosen such that :math:`|w|\ge m`.) 
      | The only way to partition :math:`w` into three parts,
        :math:`w=xyz`, is such that :math:`x` contains 0 or more a's,
        :math:`y` contains 1 or more a's, and :math:`z` contains 0 or
        more a's concatenated with :math:`cb^m`.
        This is because of the restrictions :math:`|xy| \le m` and
        :math:`|y|> 0`.
      | So the partition is: 

        .. math::

           x=a^k\quad |\quad y=a^j\quad |\quad z=a^{m-k-j}cb^m

      where :math:`k \ge 0`, :math:`j > 0`, and :math:`k + j \le m`
      for some constants :math:`k` and :math:`j`. 

      | It should be true that :math:`xy^iz \in L` for all :math:`i\ge 0`.
      | :math:`xy^0z = a^{m-j}cb^{m} \not \in L`. Contradiction! 
      | (Note that :math:`xy^2z` would also give a contradiction,
        but you only need to find one contradiction.)
      | :math:`\Rightarrow L` is not regular. QED. 

.. topic:: Example

   :math:`L = \{a^nb^{n+s}c^s | n,s > 0\}`

   **Theorem:** L is not regular.

   **Proof:**

      | Assume :math:`L` is regular, therefore the pumping lemma holds. 
      | Choose :math:`w = a^mb^{m+s}c^s` where :math:`m` is the
        constant in the pumping lemma.
        (Note: :math:`s` could be replaced by any constant here, 5, 9, etc.) 
      | The only way to partition :math:`w` into three parts,
        :math:`w=xyz`, is such that :math:`x` contains 0 or more a's,
        :math:`y` contains 1 or more a's, and 
        :math:`z` contains 0 or more a's concatenated with the rest of 
        the string :math:`b^{m+s}c^s`.
        This is because of the restrictions :math:`|xy| \le m` and :math:`|y|> 0`. 
      | So the partition is: 

        .. math::

           x=a^k\quad |\quad y=a^j\quad |\quad z=a^{m-k-j}b^{m+s}c^s

      where :math:`k \ge 0`, :math:`j > 0`, and :math:`k + j \le m`
      for some constants :math:`k` and :math:`j`. 

      | It should be true that :math:`xy^iz \in L` for all :math:`i \ge 0`. 
      | :math:`xy^2z = a^{m+j}b^{m+s}c^s \not\in L`. :math:`n_a + n_c > n_b`. Contradiction! 
      | :math:`\Rightarrow L` is not regular. QED. 


.. topic:: Example

   :math:`\Sigma=\{a,b\}, L = \{w\in{\Sigma}^{*}\mid n_a(w) > n_b(w)\}`

   **Theorem:** L is not regular.

   **Proof:**

      | Assume :math:`L` is regular, therefore the pumping lemma holds. 
      | Choose :math:`w = a^{m+1}b^{m}` where :math:`m` is the
        constant in the pumping lemma.
      | The only way to partition :math:`w` into three parts,
        :math:`w=xyz`, is such that :math:`x` contains 0 or more a's,
        :math:`y` contains 1 or more a's, and 
        :math:`z` contains 1 or more a's concatenated with the rest of 
        the string :math:`ab^{m}`.
        This is because of the restrictions :math:`|xy| \le m` and
        :math:`|y| \ge 0`. 
      | So the partition is: 

        .. math::

           x=a^k\quad |\quad y=a^j\quad |\quad z=a^{m+1-k-j}b^{m}

      where :math:`k \ge 0`, :math:`j > 0`, and :math:`k + j \le m`
      for some constants :math:`k` and `j`. 

      | It should be true that :math:`xy^iz \in L` for all :math:`i \ge 0`. 
      | :math:`xy^2z = a^{m+1+j}b^{m} \in L`. Not a contradiction.
      | :math:`xy^0z = a^{m+1-j}b^{m} \in L`.
        Since :math:`j > 0`, :math:`n_a \le n_b`. Contradiction! 
      | :math:`\Rightarrow L` is not regular. QED. 

.. topic:: Example

   :math:`L = \{a^3b^nc^{n-3} | n > 3 \}`

   **Theorem:** L is not regular.

   **Proof:**

      | Assume :math:`L` is regular, therefore the pumping lemma holds. 
      | Choose :math:`w = a^3b^mc^{m-3}` where :math:`m` is the
        constant in the pumping lemma.
        There are three ways to partition :math:`w` into three parts,
        :math:`w=xyz`.
      |   1) :math:`y` contains only a's 
      |   2) :math:`y` contains only b's, and
      |   3) :math:`y` contains a's and b's 
      | We must show that each of these possible partitions lead to a
        contradiction.
        (Then, there would be no way to divide :math:`w` into three
        parts such that the pumping lemma contraints were true).

      | **Case 1:** (:math:`y` contains only a's).
        Then :math:`x` contains 0 to 2 a's, 
        :math:`y` contains 1 to 3 a's, and 
        :math:`z` contains 0 to 2 a's concatenated with the rest of
        the string :math:`b^{m}c^{m-3}`, such that there are exactly 3
        a's.  
        So the partition is: 

        .. math::

           x=a^k\quad |\quad y=a^j\quad |\quad z=a^{3-k-j}b^{m}c^{m-3}

      where :math:`k \ge 0, j > 0`, and :math:`k + j \le 3` for some
      constants :math:`k` and :math:`j`.

      | It should be true that :math:`xy^iz \in L` for all :math:`i\ge 0`. 

      | :math:`xy^2z = (x)(y)(y)(z) = (a^k)(a^j)(a^j)(a^{3-j-k}b^mc^{m-3}) 
               = a^{3+j}b^{m}c^{m-3} \not\in L` since :math:`j>0`,
        there are too many a's. Contradiction.

      | **Case 2:** (:math:`y` contains only b's) 
      | Then :math:`x` contains 3 a's followed by 0 or more b's, 
        :math:`y` contains 1 to :math:`m-3` b's, and 
        :math:`z` contains 3 to :math:`m-3` b's concatenated with the
        rest of the string :math:`c^{m-3}`. 
        So the partition is: 

        .. math::

           x=a^3b^k\quad |\quad y=b^j\quad |\quad z=b^{m-k-j}c^{m-3}

      where :math:`k \ge 0`, :math:`j > 0`, and
      :math:`k + j \le m-3` for some constants :math:`k` and :math:`j`. 

      | It should be true that :math:`xy^iz \in L` for all :math:`i\ge 0`.

      | :math:`xy^0z = a^{3}b^{m-j}c^{m-3} \not\in L` since
        :math:`j > 0`, there are too few b's. Contradiction.

      | **Case 3:** (:math:`y` contains a's and b's) 
      | Then :math:`x` contains 0 to 2 a's, 
        :math:`y` contains 1 to 3 a's, and 1 to :math:`m-3` b's, 
        :math:`z` contains 3 to :math:`m-1` b's concatenated with the
        rest of the string :math:`c^{m-3}`.
        So the partition is: 

        .. math::

           x=a^{3-k}\quad |\quad y=a^{k}b^j\quad |\quad z=b^{m-j}c^{m-3}

      where :math:`3 \ge k > 0`, and :math:`m-3 \ge j > 0` for some
      constants :math:`k` and :math:`j`.

      | It should be true that :math:`xy^iz \in L` for all :math:`i\ge 0`. 
      | :math:`xy^2z = a^{3}b^ja^kb^mc^{m-3} \not\in L` since
        :math:`j, k > 0`, there are b's before a's. Contradiction.
      | :math:`\Rightarrow` There is no partition of :math:`w`. 
      | :math:`\Rightarrow L` is not regular. QED. 


**Use Closure Properties** to prove :math:`L` is not regular
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Using closure properties of regular languages, construct a language 
that should be regular, but for which you have already shown is 
not regular. Contradiction.

   | **Proof Outline:**
   | Assume :math:`L` is regular.
   | Apply closure properties to :math:`L` and other regular
     languages, constructing :math:`L'` that you know is not regular.
   | Closure properties :math:`\Rightarrow L'` is regular.
   | Contradiction. So :math:`L` is not regular. QED.

.. topic:: Example

   :math:`L = \{a^3b^nc^{n-3} | n > 3 \}`

   **Theorem:** :math:`L` is not regular.

   **Proof:** (proof by contradiction)

      | Assume :math:`L` is regular.
      | Define a homomorphism :math:`h: \Sigma \rightarrow \Sigma^*`

        .. math::
        
           h(a) = a\quad |\quad h(b) = a\quad |\quad h(c) = b

      | :math:`h(L) = \{a^3a^nb^{n-3} | n > 3 \} = \{a^{n+3}b^{n-3} | n > 3\}`
      | :math:`L` is regular and closure under homomorphism
        :math:`\Rightarrow h(L)` is regular. 
      | The language :math:`\{b^6\}` is a regular language. 
      | By closure under concatenation,
        :math:`L' = h(L)\{b^6\} = \{a^{n+3}b^{n+3} | n > 3\}`
        is regular. 
      | The language :math:`L'' = \{ab, aabb, aaabbb, aaaabbbb, aaaaabbbbb, aaaaaabbbbbb\}` is regular. 
      | By closure under union, :math:`L' \cup L'' = \{a^nb^n | n > 0\}`
        is regular. 
      | But, we showed earlier that :math:`\{a^nb^n | n > 0 \}` is not
        regular! Contradiction.
      | :math:`\Rightarrow L` is not regular. QED. 

      
.. topic:: Example

   :math:`L = \{a^nb^ma^{m}\ |\ m \ge 0, n \ge 0 \}`

   **Theorem:** :math:`L` is not regular.

   **Proof:** (proof by contradiction)

      | Assume :math:`L` is regular.
      | :math:`L1 = \{ bb^{*}aa^{*}\}`
      | :math:`L2 = L \cap L1 = \{b^na^n \mid n > 0\}`
      | Define a homomorphism :math:`h: \Sigma \rightarrow \Sigma^*` 

        .. math::
      
           h(a) = b\quad |\quad h(b) = a

      | :math:`h(L2) = \{a^nb^n | n>0 \}` should be regular.
      | We showed earlier that :math:`\{a^nb^n | n > 0 \}` is not
        regular. Contradiction.
      | :math:`\Rightarrow L` is not regular. QED. 


.. topic:: Example

   :math:`L_1 = \{a^nb^na^n\ |\ n > 0\}`

   **Theorem:** :math:`L_1` is not regular.

   **Proof:** (proof by contradiction)

      | Assume :math:`L_1` is regular.
      | The goal is to try to construct :math:`\{a^nb^n | n > 0\}` which
        we know is not regular. 
      | NOTE: Trying to intersect with :math:`\{a^{*}b^{*} \}` does not work. 
      | Let :math:`L_2 = \{a^{*}\}`. :math:`L_2` is regular. 
      | By closure under right quotient,
        :math:`L_3 = L_1 \backslash L_2 = \{a^nb^na^p | 0 \le p \le n, n > 0\}`
        is regular. 
      | By closure under intersection,
        :math:`L_4 = L_3 \cap \{a^{*}b^{*}\} = \{a^nb^n | n > 0\}` is regular. 
      | We already proved that :math:`L_4` is not regular. Contradiction.
      | :math:`\Rightarrow L_1` is not regular. QED. 
