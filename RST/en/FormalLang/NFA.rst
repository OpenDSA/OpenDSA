.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires: Deterministic Finite Automata
   :satisfies: Non-deterministic Finite Automata
   :topic: Finite Automata

Non-Deterministic Finite Automata
=================================

NFA: Non-Deterministic Finite Automata
--------------------------------------

**Definition**:

Define a NFA as :math:`(Q, \Sigma, \delta, q_0, F)` where  

* :math:`Q` is a finite set of states
* :math:`\Sigma` is the input alphabet (a finite set) 
* :math:`q_0` is the initial state (:math:`q_0 \in Q`)
* :math:`F \subseteq Q` is a set of final states
* :math:`\delta: Q \times(\Sigma \cup \{\lambda\}) \rightarrow 2^Q`

The specific difference from a DFA is that, while the result of
:math:`\delta` for the DFA is some state :math:`q \in Q`, the result of
:math:`\delta` for the NFA is any subset of :math:`Q`.

:term:`Non-deterministic` means that it allows choices.
From a state on input :math:`b`, :math:`\delta` might include
transitions to more than one state.

**Example**:

.. odsafig:: Images/NFAexample.png
   :width: 400
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Basic NFA

   Example of NFA

In this example, :math:`\delta(q_0, a) = \{q_1, q_2\}`.
So, :math:`\delta` is no longer a function. 

:math:`L = \{aa\} \cup \{ab^nb \mid n \ge 0\}`.


**Example**:

:math:`L = \{(ab)^n \mid n>0\} \cup \{a^nb \mid n>0\}`.

.. odsafig:: Images/NFAexample2.png
   :width: 400
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Second NFA

   Second Example of NFA

**Definition**: :math:`q_j \in {\delta}^{*}(q_i,w)` if and only if
there exists some walk from :math:`q_i` to :math:`q_j` labeled :math:`w`.

.. note::

   It does not matter that there are paths where :math:`w` can go
   wrong.
   What matters is that there is at least one way for :math:`w` to be
   right.

From previous example:

:math:`\delta^{*}(q_0, ab) = \{q_5, q_6, q_1\}`.

:math:`\delta^{*}(q_0, aba) = \{q_3\}`. 

**Definition**: For an NFA :math:`M`,
:math:`L(M)= \{w \in {\Sigma}^{*} \mid \delta^{*}(q_0,w) \cap F \neq \emptyset \}`

The language accepted by NFA :math:`M` is all strings :math:`w` such
that there exists a walk labeled :math:`w` from the start state to
any accepting state.

Why nondeterminism? It makes it easier to describe a FA.

From a performance point of view, to determine if a string is accepted
can take a LONG time to try out all possibilities.
But, all that we care about right now is existance, not performance.


NFA vs. DFA: Which is more powerful?
------------------------------------

Consider the following NFA.
Can this NFA be converted to a DFA?

.. odsafig:: Images/NFA2DFA.png
   :width: 300
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: An NFA and equivalent DFA

   An NFA and equivalent DFA

.. note::

   Do this using JFLAP, explaining generally how to do the conversion.

.. topic:: Theorem and Proof

   **Theorem**: Given an NFA
   :math:`M_N = (Q_N, \Sigma, \delta_N, q_0, F_N)`,
   there exists a DFA :math:`M_D = (Q_D, \Sigma, \delta_D, q_0, F_D)`
   such that :math:`L(M_N) = L(M_D)`.

   **Proof**:
   We can use an algorithm to convert :math:`M_N` to :math:`M_D`.

   * :math:`Q_D = 2^{Q_N}` 

   * :math:`F_D = \{Q\in Q_D | \exists q_i \in Q \mathrm{with} q_i \in F_N \}` 

   * :math:`\delta_D : Q_D \times \Sigma \rightarrow Q_D`

   **Algorithm to construct** :math:`M_D`

   #. Start state is :math:`\{q_0\} \cup \mathrm{closure}(q_0)`

   #. While can add an edge

      a) Choose a state :math:`A = \{q_i, q_j, ..., q_k\}` with
         missing edge for :math:`a \in \Sigma` 
      b) Compute :math:`B = \delta^{*}(q_i, a) \cup
         \delta^{*}(q_j, a) \cup \ldots \cup \delta^{*}(q_k, a)`
      c) Add state :math:`B` if it doesn't exist
      d) Add edge from :math:`A` to :math:`B` with label :math:`a`

   #. Identify final states
   #. If :math:`\lambda \in L(M_N)`, then make the start state final.

.. TODO::
   :type: Question

   What does closure(q) mean? Presumeably, the set of states reachable
   from q with lambda transitions. Need to define, and maybe give a
   more precises or distinguishable name.

**Example**:

.. odsafig:: Images/NFA2DFA2a.png
   :width: 400
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Another NFA to convert

   Another NFA to convert

.. note::

   Do this using JFLAP.

**Answer**:

.. odsafig:: Images/NFA2DFA2b.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Converted DFA

   Converted DFA

Conclusion: NFA adds no new capability. So why bother with the idea?

* First, it wasn't obvious that they are the same. NFA is a useful
  concept.
* NFA tend to be "smaller" and "simpler" than the equivalent DFA.
  (At least morphologically, but perhaps the language of a NFA is hard
  to grasp.)
* We will see times when it is easier to see a conversion from
  something to a NFA,
  and we know that this can always be converted in turn to a DFA.


Properties and Proving: Problem 1
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
