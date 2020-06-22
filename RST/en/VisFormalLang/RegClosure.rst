.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires:
   :satisfies: Closure Properties of Regular Grammars
   :topic: Finite Automata

Closure Properties of Regular Grammars
======================================

Closure Properties of Regular Grammars
--------------------------------------

Closure Concept
~~~~~~~~~~~~~~~

**Definition:** A set is :term:`closed` over a (binary) operation if,
whenever that operation is applied to any two members of the set, the
result is a member of the set.

.. topic:: Example

   :math:`L = \{x\ |\ x\ \mbox{is a positive even integer}\}`

   Is :math:`L` is closed under the following?

   * addition? Yes. [How do you know? You need a proof.]
   * multiplication? Yes. [How do you know? You need a proof.]
   * subtraction? No. :math:`6 - 10 = -4`. [Now you know!]
   * division? No. :math:`4 / 4 = 1`. [Now you know!]

   Notice the difference between the requirement to determine that an
   operation **is** closed (need a proof covering all cases) and
   versus recognizing that the operation **is not** closed
   (just need a counter-example).
  


Closure of Regular Languages
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Consider regular languages :math:`L_1` and :math:`L_2`.
Since they are regular languages, we know that there exist
regular expressions :math:`r_1` and :math:`r_2`
such that :math:`L_1 = L(r_1)` and :math:`L_2 = L(r_2)`.

These we already know: [Ask yourself: Why do we know this?]

* :math:`r_1 + r_2` is a regular expression denoting :math:`L_1 \cup L_2`
  So, regular languages are closed under union.

* :math:`r_1r_2` is a regular expression denoting :math:`L_1 L_2`.
  So, regular languages are closed under concatenation.

* :math:`r_1^*` is a regular expression denoting :math:`L_1^*`.
  So, regular languages are closed under star-closure.

**Theorem:** Regular languages are closed under complementation.

**Proof:**  

| :math:`L_1` is a regular language :math:`\Rightarrow \exists` a DFA
  :math:`M` such that :math:`L_1 = L(M)`.
| Construct DFA :math:`M'` such that:
|   final states in :math:`M` are nonfinal states in :math:`M'`.
|   nonfinal states in :math:`M` are final states in :math:`M'`.
| :math:`w \in L(M') \Longleftrightarrow w \in \bar{L} \Rightarrow` closed
  under complementation.

.. note::
   Q: Why a DFA, will an NFA work?
   A: With difficulty. It must be a complete NFA with trap states added.

**Theorem:** Regular languages are closed under intersection.

**Proof:**

One simple way to prove this is using DeMorgan's Law:

.. math::

   L_1 \cap L_2 = \overline{\overline{L_1} \cup \overline{L_2}}

Here is another approach, by construction.

| :math:`L_1` and :math:`L_2` are regular languages, therefore there
  exist DFAs :math:`M_1` and :math:`M_2` such that
  :math:`L_1 = L(M_1)` and :math:`L_2 = L(M_2)`.
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
           
   .. inlineav:: DFAIntersectionCON ss
      :links: DataStructures/FLA/FLA.css AV/VisFormalLang/Regular/DFAIntersectionCON.css
      :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/Regular/DFAIntersectionCON.js
      :align: justify
      :output: show


Regular languages are closed under these operations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Reversal:** :math:`L^R`

**Difference:** :math:`L_1 - L_2`

**Right quotient:**

Definition:
:math:`L_1 \backslash L_2 = \{x\ |\ xy \in L_1\ \mbox{for some}\ y \in L_2\}`

In other words, it is prefixs of appropriate strings in :math:`L_1`.

.. topic:: Example

   | :math:`L_1 = \{a^*b^* \cup b^*a^*\}`
   | :math:`L_2 = \{b^n\ |\ n` is even, :math:`n > 0 \}`
   | :math:`L_1/L_2 = \{a^*b^*\}`

**Theorem:** If :math:`L_1` and :math:`L_2` are regular, then
:math:`L_1 \backslash L_2` is regular.

**Proof:** (sketch)

There exists a DFA :math:`M = (Q, \Sigma, \delta, q_0, F)` such that
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

  Example: :math:`L = \{a^nb^m | n > 0, m > 0\} \cap \{b^na^m | n > 1, m > 1\}`
  is empty. 

  Construct a FA. If there is a path from the start state to any final
  state, then :math:`L` is not empty. 

  .. note::

     Perform depth first search on the graph beginning with the start state.

* Is the complement of :math:`L` regular?
       
  Answer: Simply take the DFA and reverse the final and non-final states.

  This was easy! But we will see in other contexts that
  complement is not so simple to decide.


* Is :math:`L` infinite?

  Construct a FA. Determine if any of the vertices on a path from 
  the start state to a final state are the base of some cycle.
  If so, then :math:`L` is infinite.

  Note: This idea of cycles in DFAs will be important later!

* Does :math:`L_1 = L_2`?

  Construct :math:`L_3 = (L_1 \cap \bar{L_2}) \cup (\bar{L_1} \cap L_2)`.
  If :math:`L_3 = \emptyset`, then :math:`L_1 = L_2`. 

  Again, in other contexts, whether two representations for
  computation do the same thing can be impossible to answer.
  For example, we will prove that its not possible to decide, in
  general, if two programs do the same thing.


Summary: How do we prove that a language is regular?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

We have a number of approaches in our toolbox.

* Write a DFA that accepts the language.
* Write a NFA that accepts the language.
* Write a regular expression that accepts the language.
* Write a regular grammar that accepts the language.
* Define the language in terms of one or more known regular languages
  that are manipulated by operators known to be closed for
  regular languages.
