.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :satisfies: set notation; relations
   :topic: Sets

Sets and Relations
==================

Set Notation
------------

The concept of a set in the mathematical sense has wide
application in computer science.
The notations and techniques of set theory are commonly used
when describing and implementing algorithms because the abstractions
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
      \end{array}

Here are some examples of this notation in use.
First define two sets, :math:`\mathbf{P}` and :math:`\mathbf{Q}`.

.. math::

   \mathbf{P} = \{2, 3, 5\}, \qquad \mathbf{Q} = \{5, 10\}.

:math:`|\mathbf{P}| = 3`  (because :math:`\mathbf{P}` has three
members) and :math:`|\mathbf{Q}| = 2`
(because :math:`\mathbf{Q}` has two members).
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

The :term:`powerset` of a set :math:`\mathbf{S}` is the set of all
possible subsets for :math:`\mathbf{S}`.
Consider the set :math:`\mathbf{S} = \{ a, b, c \}`.
The powerset of :math:`\mathbf{S}` is

.. math::

   \{ \emptyset,\ \{a\},\ \{b\},\ \{c\},\ \{a, b\},
   \ \{a, c\},\ \{b, c\},\ \{a, b, c\}\}.

A collection of elements with no order (like a set), but with
duplicate-valued elements is called a
:term:`bag` [#]_.
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

.. [#] The object referred to here as a
       bag is sometimes called a
       :ref:`multilist <multilist> <Multilists>`.
       But, the term multilist also refers to a list that may contain
       sublists.


Relations
---------

A :term:`relation` :math:`R` over set :math:`\mathbf{S}` is a set of
ordered pairs from :math:`\mathbf{S}`.
As an example of a relation, if :math:`\mathbf{S}` is
:math:`\{a, b, c\}`, then

.. math::

   \{ \langle a, c\rangle, \langle b, c\rangle, \langle c, b\rangle \}

is a relation, and

.. math::

   \{ \langle a, a\rangle, \langle a, c\rangle, \langle b, b\rangle,
   \langle b, c\rangle, \langle c, c\rangle \}

is a different relation.
If tuple :math:`\langle x, y\rangle` is in relation :math:`R`, we may
use the infix notation :math:`xRy`.
We often use relations such as the less than operator (:math:`<`) on
the natural numbers, which includes ordered pairs such as
:math:`\langle1, 3\rangle` and 
:math:`\langle2, 23\rangle`, but not :math:`\langle3, 2\rangle` or
:math:`\langle2, 2\rangle`.
Rather than writing the relationship in terms of ordered pairs, we
typically use an infix notation for such relations, writing :math:`1<3`.

Define the properties of relations as follows, with :math:`R` a
binary relation over set :math:`\mathbf{S}`.

* :math:`R` is :term:`reflexive` if :math:`aRa`
  for all :math:`a \in \mathbf{S}`.

* :math:`R` is :term:`irreflexive` if :math:`aRa` is not true
  for all :math:`a \in \mathbf{S}`.

* :math:`R` is :term:`symmetric` if whenever :math:`aRb`,
  then :math:`bRa`, for all :math:`a, b \in \mathbf{S}`.

* :math:`R` is :term:`antisymmetric` if whenever :math:`aRb`
  and :math:`bRa`, then :math:`a = b`, for all
  :math:`a, b \in \mathbf{S}`.

* :math:`R` is :term:`transitive` if whenever :math:`aRb` and
  :math:`bRc`, then :math:`aRc`, for all
  :math:`a, b, c \in \mathbf{S}`.

As examples, for the natural numbers, :math:`<` is
irreflexive (because :math`aRa` is never true),
antisymmetric (because there is no case where :math:`aRb` and
:math:`bRa`), and transitive.
Relation :math:`\leq` is reflexive, antisymmetric, and transitive.
Relation :math:`=` is reflexive, symmetric (and antisymmetric!),
and transitive.
For people, the relation "is a sibling of" is symmetric and
transitive.
If we define a person to be a sibling of himself, then it is
reflexive; if we define a person not to be a sibling of himself, then
it is not reflexive.

.. avembed:: Exercises/Background/SetTFrelation.html ka


Equivalence Relations
---------------------

:math:`R` is an :term:`equivalence relation` on set :math:`\mathbf{S}`
if it is reflexive, symmetric, and transitive.
An equivalence relation can be used to partition a set into
:term:`equivalence classes <equivalence class>`.
If two elements :math:`a` and :math:`b` are equivalent to each other,
we write :math:`a \equiv b`.
A :term:`partition` of a set :math:`\mathbf{S}` is a collection of
subsets that are :term:`disjoint` from each other and whose union is
:math:`\mathbf{S}`.
An :term:`equivalence relation` on set :math:`\mathbf{S}` partitions
the set into disjoint subsets whose elements are equivalent.
The :ref:`UNION/FIND <UNION/FIND> <UnionFind>` algorithm efficiently
maintains equivalence classes on a set.
One application for such :term:`disjoint sets` 
computing a :ref:`minimal cost spanning tree <MCST> <MCST>`.

.. topic:: Example

   For the integers, :math:`=` is an equivalence relation that
   partitions each element into a distinct subset.
   In other words, for any integer :math:`a`, three things are true.

   #. :math:`a = a`,

   #. if :math:`a = b` then :math:`b = a`, and

   #. if :math:`a = b` and :math:`b = c`, then :math:`a = c`.

   Of course, for distinct integers :math:`a`, :math:`b`, and :math:`c`
   there are never cases where :math:`a = b`, :math:`b = a`, or
   :math:`b = c`.
   So the requirements for symmetry and transitivity are never
   violated, and therefore the relation is symmetric and transitive.

.. topic:: Example

   If we clarify the definition of sibling to mean that a person is
   a sibling of him- or herself, then the sibling relation is an
   equivalence relation that partitions the set of people. 

.. topic:: Example

   We can use the :ref:`modulus <MiscMath>` function
   to define an equivalence relation.
   For the set of integers, use the modulus function 
   to define a binary relation such that two numbers
   :math:`x` and :math:`y` are in the relation if and only if
   :math:`x \bmod m = y \bmod m`.
   Thus, for :math:`m = 4`, :math:`\langle1, 5\rangle` is in the
   relation because :math:`1 \bmod 4 = 5 \bmod 4`.
   We see that modulus used in this way defines an equivalence
   relation on the integers, and this relation can be used to
   partition the integers into :math:`m` equivalence classes.
   This relation is an equivalence relation because

   #. :math:`x \bmod m = x \bmod m` for all :math:`x`;

   #. if :math:`x \bmod m = y \bmod m`,
      then :math:`y \bmod m = x \bmod m`; and 

   #. if :math:`x \bmod m = y \bmod m` and
      :math:`y \bmod m = z \bmod m`, then
      :math:`x \bmod m = z \bmod m`.

.. avembed:: Exercises/Background/SetTFequivrel.html ka


Partial Orders
--------------

A binary relation is called a
:term:`partial order` if it is antisymmetric and transitive.
If the relation is reflexive, it is called a
:term:`non-strict partial order`.
If the relation is :term:`irreflexive`, it is called a
:term:`strict partial order`.
The set on which the partial order is defined is called a
:term:`partially ordered set` or a :term:`poset`.
Elements :math:`x` and :math:`y` of a set are :term:`comparable` under
a given relation :math:`R` if either :math:`xRy` or :math:`yRx`.
If every pair of distinct elements in a partial order are comparable,
then the order is called a :term:`total order` or :term:`linear order`.

.. topic:: Example

   For the integers, relations :math:`<` and :math:`\leq` define
   partial orders. 
   Operation :math:`<` is a total order because, for every pair of
   integers :math:`x` and :math:`y` such that :math:`x \neq y`,
   either :math:`x < y` or :math:`y < x`.
   Likewise, :math:`\leq` is a total order because,
   for every pair of integers :math:`x` and :math:`y` such that
   :math:`x \neq y`, either :math:`x \leq y` or :math:`y \leq x`.

.. topic:: Example

   For the powerset of the integers, the subset
   operator defines a partial order (because it is antisymmetric and
   transitive).
   For example, :math:`\{1, 2\}\subseteq\{1, 2, 3\}`.
   However, sets {1, 2} and {1, 3} are not comparable by the
   subset operator, because neither is a subset of the other.
   Therefore, the subset operator does not define a total order on the
   powerset of the integers.

.. avembed:: Exercises/Background/SetTFpartialorder.html ka
