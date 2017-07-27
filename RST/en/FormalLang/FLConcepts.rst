.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
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

* :math:`\Sigma`: A set of symbols, an alphabet
* string: Finite sequence of symbols (from some alphabet)
* language: A set of strings defined over :math:`\Sigma`

Languages are sets, a subset of the powerset of :math:`\Sigma`

Examples
~~~~~~~~

.. note::

   For each of these, mention first the alphabet, and second the the
   language that is a subset of strings formed over the alphabet.

* :math:`\Sigma = \{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\}`
  
  :math:`L = \{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, ... \}`

* :math:`\Sigma = \{a, b, c\}`

  :math:`L = \{ab, ac, cabb\}`

  :math:`L` is a language with 3 strings, each string is a sequence of
  strings formed over the alphabet.

  How any strings could be in :math:`L`?

* :math:`\Sigma = \{a, b\}`

  :math:`L = \{a^n b^n | n > 0\}`

  This is an example of an infinite language.

  What are the strings in the language? :math:`\{ab, aabb, aaabbb, aaaabbbb, . . .\}`

Notation
~~~~~~~~

* Symbols in alphabet: :math:`a, b, c, d, ...`
* String names: :math:`u,v,w,...`

Definition of concatenation
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Let :math:`w = a_1a_2...a_n` and :math:`v=b_1b_2...b_n`

Then, :math:`w \circ v` OR :math:`wv=a_1a_2...a_nb_1b_2...b_m`.

.. note::

   See Linz for formal definitions of other operations

String Operations
~~~~~~~~~~~~~~~~~

Strings: :math:`w=abbc`, :math:`v=ab`, :math:`u=c`

* Size of string

  :math:`|w| + |v| = 6`

* Concatenation

  :math:`v^3 = vvv = v \circ v \circ v = ababab`

* :math:`v^0 = \lambda`

* :math:`w^R = cbba`

* :math:`|vv^Rw|= 8`

* :math:`ab \circ λ = ab`

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
