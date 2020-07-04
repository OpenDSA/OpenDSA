.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires: Nondeterministic Pushdown Automata
   :satisfies: Deterministic Pushdown Automata
   :topic: Finite Automata

Deterministic Pushdown Automata
===============================

Deterministic Pushdown Automata
-------------------------------

**Definition:** A PDA :math:`M = (Q, \Sigma, \Gamma, \delta, q_0, z,
F)` is *deterministic* if for every
:math:`q \in Q`, :math:`a \in \Sigma \cup \{\lambda\}`,
:math:`b \in \Gamma`:

   | 1. :math:`\delta(q, a, b)` contains at most one element
   | 2. if :math:`\delta(q, \lambda, b)` is not empty, then
        :math:`\delta(q, c, b)` must be empty for every
        :math:`c \in \Sigma`. 

**Definition:** :math:`L` is a *deterministic context-free language*
(DCFL) if and only if there exists a deterministic PDA
:math:`M` such that :math:`L = L(M)`.

**Example**

The language :math:`L = \{a^nb^n | n \ge 0\}` is a deterministic CFL.

| **Proof**: The PDA
  :math:`M = (\{q_0, q_1, q_2\}, \{a, b\}, \{0, 1\}, \delta, q_0, 0, \{q_0\})`
  with
|   :math:`\delta(q_0, a, 0) = \{(q_1, 10)\}`,
|   :math:`\delta(q_1, a, 1) = \{(q_1, 11)\}`,
|   :math:`\delta(q_1, b, 1) = \{(q_2, \lambda)\}`,
|   :math:`\delta(q_2, b, 1) = \{(q_2, \lambda)\}`,
|   :math:`\delta(q_2, \lambda, 0) = \{(q_0, \lambda)\}`

accepts the given language.
It satisfies the conditions for being deterministic.

Note that this machine DOES have :math:`\lambda` transitions.
The key point is that there is still only one choice (because of what
is sitting on the top of the stack).
In that sense, it is not merely a "free ride" transition.

**Example**

Our previous PDA for :math:`\{ww^R | w\in{\Sigma}^{+}\}, \Sigma = \{a, b\}`
is nondeterministic.

| It contains these transitions:
|   :math:`\delta(q_0, a, a) = \{(q_0, aa)\}`
|   :math:`\delta(q_0, \lambda, a) = \{(q_1, a)\}`

This violates our conditions for determinism. (Do you see why?)

Now, this fact that we have a PDA that is not deterministic certainly
does **not** prove that 
:math:`\{ww^R | w\in{\Sigma}^{+}\}, \Sigma = \{a, b\}`
is not a deterministic CFL.

But, there are CFL's that are not deterministic.
And we will see that this is one of them.
This makes intuitive sense.
How can we, deterministically, know when to switch from :math:`w` to
:math:`w^R` when scanning from left to right through the input?

**Example**:

:math:`L = \{a^nb^n|n \ge 1\} \cup \{a^nb^{2n}| n\ge 1\}` is a CFL and
not a DCFL.

Obviously, both languages are CFL.
And obviously, their union is CFL.
But imagine how the "obvious" PDA works:
The start state transitions to the "correct" machine to recognize a
sting in either language.
But how can we do this deterministically?
We would need a completely different approach.

While that is not a proof that the language is not deterministic, here
is one.

**Theorem**:
:math:`L_1 \cup L_2` is not a DCFL
(because :math:`a^nb^nc^n` is not a CFL).

**Proof:**:

| :math:`L = \{a^nb^n: n \ge 1\} \cup \{a^nb^{2n}: n \ge 1\}`

| It is easy to construct a NPDA for :math:`\{a^nb^n: n\ge 1\}` and 
  a NPDA for :math:`\{a^nb^{2n}: n \ge 1\}`.
  These two can be joined together by a new start state and
  :math:`\lambda`-transitions to create a NPDA for L. 
  Thus, L is CFL.

| Now show :math:`L` is not a DCFL.
  Assume that there is a deterministic PDA :math:`M` such that
  :math:`L = L(M)`.
  We will construct a PDA that recognizes a language that is not a CFL and
  derive a contradiction.

| Construct a PDA :math:`M'` as follows:

.. TODO::
   :type: Figure

   Show figure 

|   1. Create two copies of :math:`M: M_1` and :math:`M_2`.
       The same state in :math:`M_1` and :math:`M_2` are called cousins.

|   2. Remove accept status from accept states in :math:`M_1`,
       remove initial status from initial state in :math:`M_2`.
       In our new PDA, we will start in :math:`M_1` and accept in :math:`M_2`.

|   3. Outgoing arcs from old accept states in :math:`M_1`,
       change to end up in the cousin of its destination in
       :math:`M_2`.
       This joins :math:`M_1` and :math:`M_2` into one PDA.
       There must be an outgoing arc since you must recognize
       both :math:`a^nb^n` and :math:`a^nb^{2n}`.
       After reading :math:`n` b's, must accept if no more b's and 
       continue if there are more b's.

|   4. Modify all transitions that read a b and have their
       destinations in :math:`M_2` to read a c. 

| This is the construction of our new PDA. 

| When we read :math:`a^nb^n` and end up in an old accept state in
  :math:`M_1`, then we will transfer to :math:`M_2` and read the
  rest of :math:`a^nb^{2n}`.
  Only the b's in :math:`M_2` have been replaced by c's,
  so the new machine accepts :math:`a^nb^nc^n`.

| The language accepted by our new PDA is :math:`a^nb^nc^n`.
  But this is not a CFL. Contradiction! Thus there is no
  deterministic PDA :math:`M` such that :math:`L(M) = L`. 
  Q.E.D.

Based on this information, we now can update our model of the Formal
Languages Universe.

.. odsafig:: Images/lt8hier.png
   :width: 300
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: lt8hier


Grammars for Deterministic Context-free Languages
-------------------------------------------------

Now we know that:

* All CFL can be generated by a CFG, and implemented
  by a NPDA.
* Not all CFL can be generated using a DPDA.
* So some CFG are associated with only non-deterministic PDAs.
  Nondeterminism gives us something more in terms of capability.


Why do we care?
Because we want to parse efficiently.
This means, we want to quickly determine if a given string can
be generated from a given grammar.
Determinism seems to be a fundamental requirement if we hope
to do this.

Think of a PDA as a parsing device.
No backtracking requires that we can make a decision at
every step on what to do next.
This is the same as knowing which grammar production comes next.
Clearly this is linear time when the grammar has been simplified (no
unit productions), because every derivation step consumes an
input character.
Well... except for :math:`\lambda` productions.
But we will see soon that these are not really a problem for
linear-time processing.


Top-down Parsing with Lookahead
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Start with the start symbol
Scan left-to-right through the string.
At each step, we want only to follow one rule when we look at the
current character.
Perhaps we don't see a production for the current character, but
instead pop something off the stack (:math:`\lambda` production).
This is why :math:`\lambda` productions are still
linear, if we don't put too much on the stack when we process
a character.


S-grammars
~~~~~~~~~~

| Recall that an S-grammar has all productions of the form:
|    :math:`A \rightarrow ax`
| where :math:`A \in V`, :math:`a \in T`, and :math:`x \in V^*` AND any
  pair :math:`(A, a)` can occur in at most one rule.

Obviously this can be parsed efficiently.
But, s-grammars are more restrictive than we want.
Lots of useful language constructs cannot be defined using an
s-grammar.
We want to generalize as much as we can to capture a broader
subset of CFLs

LL(k) Grammars
~~~~~~~~~~~~~~

LL means "left-to-right" and "left-most derivation" is
constructed.
:math:`k` means that we can look ahead at most :math:`k-1`
characters.
Every s-grammar is LL, but so are more grammars.

| Consider this grammar:
|    :math:`S \rightarrow aSb \mid ab`

This is not an s-grammar.
But, this **is** an LL grammar.
By looking at the next two characters, we always know which rule
to apply.

| If we see :math:`ab`, then apply :math:`S \rightarrow ab`.
|      << What gets consumed, what goes on the stack? >>
|    Otherwise, apply :math:`S \rightarrow aSb`
|      << What gets consumed, what goes on the stack? >>


| Consider this grammar:
|    :math:`S \rightarrow SS \mid aSb \mid ab`

This is a useful grammar! It captures nested parentheses.
This is **not** an LL(k) grammar for any :math:`k`.
(Can you see why not?)

Just because the grammar is not LL(k) does not mean that the
language might not be deterministic.
The reasoning for why this was not LL(k) should help you to see
how to fix the grammar.

| Consider this grammar: :math:`S \rightarrow aSbS \mid \lambda`
|    This is LL.

| Example: Derive :math:`w = abab`.
|    :math:`S \Rightarrow aSbS \Rightarrow abS \Rightarrow abaSbS \Rightarrow ababS \Rightarrow abab`.
|    When the input next input symbol is :math:`a`, we must use
     :math:`S \rightarrow aSbS`.
|    When the input next input symbol is :math:`b` or string is
     empty, we must use :math:`S \rightarrow \lambda`.

| One last problem: This grammar accepts the empty string.
  If we don't like that, then there is an easy fix.
  Just define a new start symbol that avoids the :math:`\lambda`
  production.
|    :math:`S_0 \rightarrow aSbS`
|    :math:`S \rightarrow aSbS \mid \lambda`
