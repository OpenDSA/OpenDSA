.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer, Eunoh Cho
   :satisfies: set notation
   :topic: Sets


Set Notation
============

Introduction to Sets
--------------------

The concept of a set in the mathematical sense is widely used in
computer science.
The notations and techniques of set theory are commonly used when
describing and implementing algorithms because the abstractions
associated with sets often help to clarify and simplify algorithm
design.

A :term:`set` is a collection of distinguishable
:term:`members <member>` or :term:`elements <element>`.
The members are typically drawn from some larger population known as
the :term:`base type`.
Each member of a set is either a :term:`primitive element` of the
base type or is a set itself.
There is no concept of duplication in a set.
Each value from the base type is either in the set or not in the set.
For example, a set named :math:`\mathbf{P}` might consist of the three
integers 7, 11, and 42.
In this case, :math:`\mathbf{P}`'s members are 7, 11, and 42, and the
base type is integer.

The following table shows the symbols commonly used to express sets
and their relationships.

.. _SetNotation:

.. topic:: Table

   .. math::

      \begin{array}{l|l}
      \{1, 4\}& \mbox{A set composed of the members 1 and 4}\\
      \{\mathsf{x}\, |\, \mathsf{x}\ \mbox{is a positive integer}\}&
         \mbox{A set definition using a set former}\\
      &\qquad \mbox{Example: the set of all positive integers}\\
      \mathsf{x} \in \mathbf{P}&\mathsf{x}\ \mbox{is a member of set}\ \mathbf{P}\\
      \mathsf{x} \notin \mathbf{P}&\mathsf{x}\ \mbox{is not a member of set}\ \mathbf{P}\\
      \emptyset&\mbox{The null or empty set}\\
      |\mathbf{P}|& \mbox{Cardinality: size of set}\ \mathbf{P}
                 \mbox{or number of members for set}\ \mathbf{P}\\
      \mathbf{P}\,\subseteq\,\mathbf{Q},
	\mathbf{Q}\,\supseteq\,\mathbf{P}&
	\mbox{Set}\ \mathbf{P}\ \mbox{is included in set}\ \mathbf{Q},\\
      &\qquad \mbox{set}\ \mathbf{P}\ \mbox{is a subset of set}\ \mathbf{Q},\\
      &\qquad \mbox{set}\ \mathbf{Q}\ \mbox{is a superset of set}\ \mathbf{P}\\
      \mathbf{P}\,\cup\,\mathbf{Q}	&
        \mbox{Set Union: all elements appearing in}
        \ \mathbf{P}\ \mbox{OR}\ \mathbf{Q}\\
      \mathbf{P}\,\cap\,\mathbf{Q}	&
        \mbox{Set Intersection: all elements appearing in}\ \mbox{P}
        \ \mbox{AND}\ \mathbf{Q}\\
      \mathbf{P}\,-\,\mathbf{Q} &
        \mbox{Set difference: all elements of set}
        \ \mathbf{P}\ \mbox{NOT in set}\ \mathbf{Q}\\
      \mathbf{P}\,\times\,\mathbf{Q} &
        \mbox{Set (Cartesian) Product: yields a set of ordered pairs}\\
      \end{array}

Here are some examples of this notation in use.
First define two sets, :math:`\mathbf{P}` and :math:`\mathbf{Q}`.

.. math::

   \mathbf{P} = \{2, 3, 5\}, \qquad \mathbf{Q} = \{5, 10\}.

:math:`|\mathbf{P}| = 3`  (because :math:`\mathbf{P}` has three
members) and :math:`|\mathbf{Q}| = 2`
(because :math:`\mathbf{Q}` has two members).
Both of these sets are finite in length.
Other sets can be infinite, for example, the set of integers.

The union of :math:`\mathbf{P}` and :math:`\mathbf{Q}`, written
:math:`\mathbf{P} \cup \mathbf{Q}`, is the set of elements in either
:math:`\mathbf{P}` or :math:`\mathbf{Q}`, which is {2, 3, 5, 10}.
The intersection of :math:`\mathbf{P}` and :math:`\mathbf{Q}`,
written :math:`\mathbf{P} \cap \mathbf{Q}`, is the set of elements that
appear in both :math:`\mathbf{P}` and :math:`\mathbf{Q}`, which is {5}.
The set difference of :math:`\mathbf{P}` and :math:`\mathbf{Q}`,
written :math:`\mathbf{P} - \mathbf{Q}`,
is the set of elements that occur in :math:`\mathbf{P}` but not in
:math:`\mathbf{Q}`, which is {2, 3}.
Note that
:math:`\mathbf{P} \cup \mathbf{Q} = \mathbf{Q} \cup \mathbf{P}`
and that
:math:`\mathbf{P} \cap \mathbf{Q} = \mathbf{Q} \cap \mathbf{P}`,
but in general
:math:`\mathbf{P} - \mathbf{Q} \neq \mathbf{Q} - \mathbf{P}`.
In this example,
:math:`\mathbf{Q} - \mathbf{P}  = \{10\}`.
Finally, the set {5, 3, 2} is indistinguishable from set
:math:`\mathbf{P}`, because sets have no concept of order.
Likewise, set {2, 3, 2, 5} is also indistinguishable from 
:math:`\mathbf{P}`, because sets have no concept of duplicate elements.

The :term:`set product` or :term:`Cartesian product` of two sets
:math:`\mathbf{Q} \times \mathbf{P}` is a set of ordered pairs.
For our example sets, the set product would be

.. math::

   \{(2, 5),\ (2, 10),\ (3, 5),\ (3, 10),\ (5, 5),\ (5, 10)\}.

The :term:`powerset` of a set :math:`\mathbf{S}` (denoted :math:`2^S`)
is the set of all possible subsets for :math:`\mathbf{S}`.
Consider the set :math:`\mathbf{S} = \{ a, b, c \}`.
The powerset of :math:`\mathbf{S}` is

.. math::

   \{ \emptyset,\ \{a\},\ \{b\},\ \{c\},\ \{a, b\},
   \ \{a, c\},\ \{b, c\},\ \{a, b, c\}\}.

A collection of elements with no order (like a set), but with
duplicate-valued elements is called a
:term:`bag`.
To distinguish bags from sets, we will use square brackets [] around
a bag's elements.
For example, bag [3, 4, 5, 4] is distinct from bag [3, 4, 5],
while set {3, 4, 5, 4} is indistinguishable from set
{3, 4, 5}.
However, bag [3, 4, 5, 4] is indistinguishable from bag
[3, 4, 4, 5].

A :term:`sequence` is a collection of elements with an order, and
which may contain duplicate-valued elements.
A sequence is also sometimes called a :term:`tuple` or a
:term:`vector`.
In a sequence, there is a 0th element, a 1st element, 2nd element, and
so on.
We will use angle brackets :math:`\langle\rangle` to enclose the
elements of a sequence.
For example, :math:`\langle3, 4, 5, 4\rangle` is a sequence.
Note that sequence :math:`\langle3, 5, 4, 4\rangle` is distinct from
sequence :math:`\langle3, 4, 5, 4\rangle`, and both are distinct from
sequence :math:`\langle3, 4, 5\rangle`. 
