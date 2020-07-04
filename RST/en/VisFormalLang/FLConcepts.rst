.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Mostafa Mohammed, Susan Rodger and Cliff Shaffer
   :requires: FL Introduction
   :satisfies: FL Concepts
   :topic: Formal Languages Concepts

Major Concepts
==============

Introduction
------------

In this module, we present basic notation needed to discuss the three
major concepts for the semester:

* Languages
* Grammars
* Automata

Languages
---------

Now we give a formal definition of our most important concept:
Language.

* First we need the alphabet set, :math:`\Sigma`, which is a set of symbols.
* Given some :math:`\Sigma`, a string is a finite sequence of symbols from :math:`Sigma`.
* language: A set of strings defined over :math:`\Sigma`

:term:`Languages <language>` are sets, a subset of the powerset of
:math:`\Sigma`.
("Powerset of :math:`\Sigma`" just means all strings made from letters of
the alphabet :math:`\Sigma`.
And so a language is just some subset of these strings.)

Examples
~~~~~~~~

* :math:`\Sigma = \{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\}`
  
  :math:`L = \{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, ... \}`

* :math:`\Sigma = \{a, b, c\}`

  :math:`L = \{ab, ac, cabb\}`

  How any strings could be in :math:`L`?
  :math:`L` is a language with 3 strings, each string is a sequence of
  strings formed over the alphabet.

* :math:`\Sigma = \{a, b\}`

  :math:`L = \{a^n b^n | n > 0\}`

  This is an example of an infinite language.

  What are the strings in the language? :math:`\{ab, aabb, aaabbb, aaaabbbb, . . .\}`

Notation
~~~~~~~~
Useful notations: We usually use these symbols in our course.

* For symbols in some alphabet :math:`\Sigma`,
  we typically use either digits or letters near the start of the
  common English alphabet: :math:`a, b, c, d, 0, 1`.
* For string names (that is, a variable name that is meant to refer to
  a string), we usually use letters near the end of the common English
  alphabet: :math:`u, v, w, x, y, z`.


Definition of concatenation
~~~~~~~~~~~~~~~~~~~~~~~~~~~
The concatenation of two strings :math:`u`, and :math:`v` will be the string that contains all symbols of :math:`u` followed by all symbols og :math:`v`.

Example: 

Let :math:`w = a_1a_2...a_n` and :math:`v=b_1b_2...b_n`

Then, :math:`w \circ v` OR :math:`wv=a_1a_2...a_nb_1b_2...b_m`.

String Operations
~~~~~~~~~~~~~~~~~

Strings: :math:`w=abbc`, :math:`v=ab`, :math:`u=c`

* Size of string

  :math:`|w| + |v| = 6`

* Concatenation

  :math:`v^3 = vvv = v \circ v \circ v = ababab`

* :math:`v^0 = \lambda` (the empty string)

* Reverse of the string

  :math:`w^R = cbba`

* :math:`|vv^Rw|= 8`

* :math:`ab \circ λ = λ \circ ab = ab`

* :math:`\Sigma^∗ =` set of strings obtained by concatenating 0 or more
  symbols from :math:`\Sigma`

  Examples:

  * :math:`\Sigma = \{a, b\}`

  * :math:`\Sigma^* = \{\lambda, a, b, aa, ab, ba, bb, ...\}`

    Note: Easiest to list out all the strings of length 0, then length
    1, then length 2, etc.

  * :math:`\Sigma^+ = \Sigma^* - \{\lambda\}`

  More Examples:

  :math:`\Sigma = \{a, b, c\}, L_1=\{ab, bc, aba\}, L_2 = \{c, bc, bcc\}`

  * :math:`L_1 \cup L_2 = \{ab, bc, aba, c, bcc\}`

  * :math:`L_1 \cap L_2 = \{bc\}`

  * :math:`\overline{L_1} = \Sigma{}^{*} - L`

  * :math:`\overline{L_1 \cap L_2} = \Sigma{}^{*} - \{bc\}`

  * :math:`L_1 \circ L_2 = \{xy \mid x \in L_1` and
    :math:`y\in L_2\} = \{abc, abbc, abbcc, bcc, bcbc, bcbcc, abac, ababc, ababcc\}`

Definitions
~~~~~~~~~~~

:math:`L^0 = \{\lambda\}`

:math:`L^2 = L \circ L`

:math:`L^3 = L \circ L \circ L`

:math:`L^{*} = L^0 \cup L^1 \cup L^2 \cup L^3 \ldots`

:math:`L^{+} = L^1 \cup L^2 \cup L^3 \ldots`


Grammars
--------

One way to describe a language (that is, a collection of strings) is
in the form of a grammar.
Before looking at formal grammars to define formal languages and 
programming languages, let's look at a grammar you can maybe relate
to, a grammar for english.
This will be a tiny subset of the english language, not complete by
far!

   <sentence> :math:`\rightarrow` <subject><verb><d.o.>

   <subject> :math:`\rightarrow` <noun> | <article><noun>

   <verb> :math:`\rightarrow` hit | ran | ate

   <d.o.> :math:`\rightarrow` <article><noun> | <noun>

   <noun> :math:`\rightarrow` Fritz | ball

   <article> :math:`\rightarrow` the | an | a

Any grammar has variables (also called "non-terminals") and terminals.
Terminals are generally strings.
Variables are things that ultimately are replaced by terminals.
In this example, we put :math:`<>` brackets around all of the
variables to make them easier to recognize.
We won't always do this.
The grammar has a collection of productions.
In this example, each production replaces a variable with some
series of variables and terminals.
Ultimately, all "sentences" in the "language" are generated by
starting with the <sentence> variable, and using productions to reach
the desired sentence.

Examples
~~~~~~~~

Deriving a sentence:
To derive a sentence, start at the starting point of the grammar and
do replacements until you can do no more replacements.
A variable in the grammar can be replaced by the right hand side of
its rule::

   Fritz hit the ball

   <sentence> -> <subject><verb><d.o> 
              -> <noun><verb><d.o>
              -> Fritz <verb><d.o.>
              -> Fritz hit <d.o.>
              -> Fritz hit <article><noun>
              -> Fritz hit the <noun>
              -> Fritz hit the ball

Can we derive these sentences? If not, can we change the grammar?::

   The ball hit Fritz

   The ball ate the ball

* A sentence is syntactically correct if it follows the rules
  (the grammar can dervive it)

* A sentence is semantically correct if it has "meaning"


Formal definition of a grammar
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A grammar :math:`G = (V, T, S, P)` where

* :math:`V` is a finite set of variables (nonterminals).
* :math:`T` is a finite set of terminals (generally, these are strings).
* :math:`S` is the start variable (:math:`S \in V`).
* :math:`P` is a set of productions (rules).

  :math:`x \rightarrow y` means to replace :math:`x` by :math:`y`.

  Here, :math:`x \in (V \cup T)^+, y \in (V \cup T)^*`.

Question: What are :math:`S, T, V, P` in the "english" grammar example above?


Notation
~~~~~~~~

.. math::

   \begin{array}{ll}
     w \Rightarrow z & w\ \mbox{derives}\ z\\
     w \stackrel{*}{\Rightarrow} z & \mbox{derives in 0 or more steps}\\
     w \stackrel{+}{\Rightarrow} z & \mbox{derives in 1 or more steps}\\
   \end{array}

Given grammar :math:`G = (V, T, S, P)`, define

.. math::

   L(G)= \{w \in T{}^{*} \mid S \stackrel{*}{\Rightarrow} w\}

Now, try to describe in words: What is the language of the grammar?
Answer: It is all strings formed over the alphabet (or set of
terminals, note that :math:`T^*` is all possible strings over T),
SUCH THAT if you start with S (the start symbol in the grammar),
you can derive the string.

**Example**

:math:`G=(\{S\}, \{a,b\}, S, P)`

:math:`P=\{S \rightarrow aaS, S \rightarrow b\}`

:math:`L(G) =` ?

Answer: :math:`\{b, aab, aaaab, ... \} = \{(aa)^nb | n \ge 0\}`


**Example**

:math:`L(G) = \{a^nccb^n | n > 0\}`

:math:`G =` ?

Answer:

   :math:`S \rightarrow aSb | aAb`

   :math:`A \rightarrow cc`


**Example**

:math:`G = (\{S\}, \{a,b\}, S, P)`

:math:`P = \{S \rightarrow aSb, S \rightarrow SS, S \rightarrow ab\}`

Which of these strings :math:`aabb, abab, abba, babab` can be
generated by this grammar? Show the derivations.

:math:`L(G) =` ?

Answer:

   The language of matching parenthesis where :math:`a` is left paren,
   and :math:`b` is right paren. 

   :math:`S \rightarrow aSb  \rightarrow aabb`

   :math:`S \rightarrow SS  \rightarrow abS \rightarrow abab`

   Cannot derive :math:`abba, babab`. WHY?
   Nothing ends with :math:`a`, nothing starts with :math:`b`.

.. avembed:: Exercises/FLA/CharacterizeLang1.html ka
   :long_name: Characterizing a Language, Problem 1


.. avembed:: Exercises/FLA/CharacterizeLang2.html ka
   :long_name: Characterizing a Language, Problem 2

Automata
--------

.. inlineav:: AutomataCON dgm
   :links: AV/VisFormalLang/Intro/AutomataCON.css
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/Intro/AutomataCON.js
   :align: center

   Abstract model of a digital computer.
   Note that in the control unit, the numbers represent
   "states", which are the specific positions on the dial that the
   arrow may point to.
   While this picture shows the physical components of the "computer",
   it is not showing the control behavior (what to do when we are in a
   given state with a given symbol on the current square of the
   tape, and a given value is at the current position in the storage
   unit).
   This control behavior is like the "software" of the computer.


There is a program associated with the control unit,
and the input is processed once from left to right.
Some versions have an additional storage unit.
We will define specific automata throughout the semester.

This is the topic for the chapter on :ref:`DFAs <DFA> <DFA>`.
