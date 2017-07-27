.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires: FL Introduction
   :satisfies:
   :topic: Introduction

Set Theory Notes
================

Basic Notation and Examples
---------------------------

A Set is a collection of elements. (There are no duplicate elements)

.. math::

   A=\{1,4,6,8\}, B=\{2,4,8\}, C=\{3,6,9,12,...\}, D=\{4,8,12,16,...\}

.. note::

   Point out that some sets are finite and some are infinite.
   Infinite sets are more interesting

.. note::

   Ask them to work through these, and then go over them in class.

• (union) :math:`A \cup B =`

  .. note::

     :math:`\{1,2,4,6,8\}`

• (intersection) :math:`A \cap B =`

  .. note::

     :math:`\{4,8\}`

• :math:`C \cap D =`

  .. note::

     :math:`\{ 12,24,...\}` OR :math:`\{12 ∗ x | x` is a positive
     integer :math:`\}`

• (member of) :math:`42 \in C`?

  .. note::

     No

• (subset) :math:`B \subset C`?

   .. note::

      No

      Proper subset means cannot be equal :math:`\subset`,
      so a set cannot be a proper subset of itself

• :math:`B \cap A \subseteq D`?

   .. note::

      YES. Notice what :math:`\subseteq` means.

• :math:`|B| =`

  .. note::

     3

• (product) :math:`A \times B =`

   .. note::

      :math:`\{ (1,2),(1,4), (1,8), (4,2), (4,4), (4,8), (6,2), (6,4), (6,8), (8,2), (8,4), (8,8) \}`

   Note that the elements must be tuples! Tuples are ordered, sets are not.

• :math:`|A \times B| =`

   .. note::

      12

• :math:`\emptyset \in  B \cap C`?

   .. note::

      NO

      Note the intersection is empty, there are no elements in the set.

• (powerset) :math:`2^B =`

  .. note::

     :math:`\{\emptyset, \{2\}, \{4\}, \{8\}, \{2, 4\}, \{2, 8\}, \{4, 8\}, \{2, 4, 8\}\}`

     Set of all subsets, including empty set. What is size of this set? 8


Proofs
------

Example: What are all the subsets of :math:`\{3, 5\}`?

:math:`\emptyset, \{3\}, \{5\}, \{3, 5\}`

How many subsets does a set :math:`S` have?

.. math::

   \begin{array}{ll}
   |S| & \mbox{number of subsets} \\
   \hline
   0 & 1 \\
   1 & 2 \\
   2 & 4 \\
   3 & 8 \\
   4 & 16 \\
   \end{array}

How do you prove? Set S has :math:`2^{|S|}` subsets.

Technique: Proof by Induction
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Basis: P(1)? Prove smallest instance is true.

2. Induction Hypothesis - I.H.

   Assume P(n) is true for 1,2,...,n

3. Induction Step - I.S.

   Show P(n+1) is true (using I.H.)

Proof of Example
~~~~~~~~~~~~~~~~

1. Basis:

   What is smallest thing in this case?

   :math:`|S| = 0`, has 1 element. Check: :math:`2^0 = 1`

2. I.H. Assume :math:`2^|S|` is equal to the number of subsets in

   :math:`S` for all :math:`|S| \leq n`.

3. I.S. Show for :math:`|S| = n+1` that there are :math:`2^{n+1}`
   subsets.

   Take one element out of :math:`S`.
   :math:`T \cup {a} = S`.
   There are :math:`2^n` subsets in :math:`T`.

   :math:`S` has all the subsets in :math:`T`, plus a copy of each
   subset in :math:`T` with :math:`a` added,
   or :math:`2 *` number of subsets in :math:`T = 2*2^n = 2^{n+1}`.

