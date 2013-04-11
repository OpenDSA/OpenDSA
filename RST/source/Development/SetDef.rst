.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :prerequisites: Sets
   :topic: Sets

Sets and Relations [RAW]
========================

The concept of a set in the mathematical sense has wide
application in computer science.
The notations and techniques of set theory are commonly used
when describing and implementing algorithms because the abstractions
associated with sets often help to clarify and simplify algorithm
design.

A :dfn:`set` is a collection of distinguishable
:dfn:`members` or :dfn:`elements`.
The members are typically drawn from some larger population known as
the :dfn:`base type`.
Each member of a set is either a :dfn:`primitive element` of the
base type or is a set itself.
There is no concept of duplication in a set.
Each value from the base type is either in the set or not in the set.
For example, a set named :math:`\mathbf{P}` might consist of the three
integers 7, 11, and 42.
In this case, :math:`\mathbf{P}`'s members are 7, 11, and 42, and the
base type is integer.

.. _SetNotation:

.. figure:: Images/PtrSwap.png
   :width: 1
   :align: center
   :figwidth: 90%

   SetNotation

.. math::

   \begin{array}{l|l}
   \{1, 4\}& \mbox{A set composed of the members 1 and 4}\\
   \{\mathsf{x}\, |\, \mathsf{x}\ \mbox{is a positive integer}\}&
	\mbox{A set definition using a set former}\\
   &\qquad \mbox{Example: the set of all positive integers}\\
   \mathsf{x} \in \mathbf{P}&\mathsf{x}\ \mbox{is a member of set}\ \mathbf{P}\\
   \mathsf{x} \notin \mathbf{P}&\mathsf{x}\ \mbox{is not a member of set}\ \mathbf{P}\\
   \emptyset&\mbox{The null or empty set}\\
   |\mathbf{P}|& \mbox{Cardinality: size of set}\ \mathbf{P}\\
   &\qquad \mbox{or number of members for set}\ \mathbf{P}\\
   \mathbf{P}\,\subseteq\,\mathbf{Q},
	\mathbf{Q}\,\supseteq\,\mathbf{P}&
	\mbox{Set}\ \mathbf{P}\ \mbox{is included in set}\ \mathbf{Q},\\
   &\qquad \mbox{set}\ \mathbf{P}\ \mbox{is a subset of set}\ \mathbf{Q},\\
   &\qquad \mbox{set}\ \mathbf{Q}\ \mbox{is a superset of set}\ \mathbf{P}\\
   \mathbf{P}\,\cup\,\mathbf{Q}
	&\mbox{Set Union:}\\
   &\qquad mbox{all elements appearing in}\ \mathbf{P}\ \mbox{OR}\ \mathbf{Q}\\
   \mathbf{P}\,\cap\,\mathbf{Q}
	&\mbox{Set Intersection:}\\
   &\qquad \mbox{all elements appearing in}\ \mbox{P}\ \mbox{AND}\ \mathbf{Q}\\
   \mathbf{P}\,-\,\mathbf{Q}
	&\mbox{Set difference:}\\
   &\qquad \mbox{all elements of set}\ \mathbf{P}\ \mbox{NOT in set}\ \mathbf{Q}\\
   \end{array}

Figure :num:`#SetNotation` shows the symbols commonly used to express sets
and their relationships.
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
The set difference of :math:\mathbf{P}` and :math:`\mathbf{Q}`,
written :math:`\mathbf{P} - \mathbf{Q}`,
is the set of elements that occur in :math:`\mathbf{P}` but not in
:math:`\mathbf{Q}`, which is {2, 3}.
Note that
:math:`\mathbf{P} \cup \mathbf{Q} = \mathbf{Q} \cup \mathbf{P}`
and that
:math:`\mathbf{P} \cap \mathbf{Q} = \matbhf{Q} \cap \mathbf{P}`,
but in general
:math:`\mathbf{P} - \mathbf{Q} \neq \mathbf{Q} - \mathbf{P}`.
In this example,
:math:`\mathbf{Q} - \mathbf{P}  = \{10\}`.
Note that the set {4, 3, 5} is indistinguishable from set
:math:`\mathbf{P}`, because sets have no concept of order.
Likewise, set {4, 3, 4, 5} is also indistinguishable from 
:math:`\mathbf{P}`, because sets have no concept of duplicate elements.

The :dfn:`powerset` of a set :math:`\mathbf{S}` is the set of all
possible subsets for :math:`\mathbf{S}`.
Consider the set :math:`\matbhf{S} = \{ a, b, c \}`.
The powerset of :math:`\mathbf{S}` is

.. math::

   \{ \emptyset,\ \{a\},\ \{b\},\ \{c\},\ \{a, b\},
   \ \{a, c\},\ \{b, c\},\ \{a, b, c\}\}.

A collection of elements with no order (like a set), but with
duplicate-valued elements is called a
:dfn:`bag`. [#]_
To distinguish bags from sets, we will use square brackets [] around
a bag's elements.
For example, bag [3, 4, 5, 4] is distinct from bag [3, 4, 5],
while set {3, 4, 5, 4} is indistinguishable from set
{3, 4, 5}.
However, bag [3, 4, 5, 4] is indistinguishable from bag
[3, 4, 4, 5].

A :dfn:`sequence` is a collection of elements with an order, and
which may contain duplicate-valued elements.
A sequence is also sometimes called a :dfn:`tuple` or a
:dfn:`vector`.
In a sequence, there is a 0th element, a 1st element, 2nd element, and
so on.
We will use angle brackets :math:`\langle\rangle` to enclose the
elements of a sequence.
For example, :math:`\langle3, 4, 5, 4\rangle` is a sequence.
Note that sequence :math:`\langle3, 5, 4, 4\rangle` is distinct from
sequence :math:`\langle3, 4, 5, 4\rangle`, and both are distinct from
sequence :math:`\langle3, 4, 5\rangle`. 

A :dfn:`relation` :math:`R` over set :math:`\mathbf{S}` is a set of
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
\begin{itemize}
\item \(R\) is \defit{reflexive} if \(aRa\)
	for all \(a \in \cvar{S}\).
\item \(R\) is \defit{symmetric} if whenever \(aRb\), then
	\(bRa\), for all \(a, b \in \cvar{S}\).
\item \(R\) is \defit{antisymmetric} if whenever \(aRb\) and
	\(bRa\), then \(a = b\), for all \(a, b \in \cvar{S}\).
\item \(R\) is \defit{transitive} if whenever \(aRb\) and
	\(bRc\), then \(aRc\), for all \(a, b, c \in \cvar{S}\).
\end{itemize}

As examples, for the natural numbers, \(<\)~is antisymmetric
(because there is no case where \(aRb\) and \(bRa\)) and
transitive; \(\leq\)~is reflexive, antisymmetric, and transitive,
and \(=\)~is reflexive, symmetric (and antisymmetric!),
and transitive.
For people, the relation ``is a sibling of'' is symmetric and
transitive.
If we define a person to be a sibling of himself, then it is
reflexive; if we define a person not to be a sibling of himself, then
it is not reflexive.

\index{equivalence|(}
\(R\) is an \defit{equivalence relation} on set \cvar{S} if it is
reflexive, symmetric, and transitive.\index{equivalence!relation}
An equivalence relation can be used to partition a set into
\defit{equivalence classes}.\index{equivalence!class}
If two elements \(a\) and \(b\) are equivalent to each other,
we write \(a \equiv b\).
A \defit{partition} of a set \cvar{S} is a collection of subsets that
are disjoint from each other and whose union is~\cvar{S}.
An equivalence relation on set \cvar{S} partitions the set into
subsets whose elements are equivalent.
See Section~\ref{ParentPointer} for a discussion on how to represent
equivalence classes on a set.
One application for disjoint sets appears in Section~\ref{Kruskal}.

\begin{example}
For the integers, \(=\) is an equivalence relation that partitions
each element into a distinct subset.
In other words, for any integer \(a\), three things are true.
\begin{enumerate}
\item \(a = a\),
\item if \(a = b\) then \(b = a\), and
\item if \(a = b\) and \(b = c\), then \(a = c\).
\end{enumerate}

Of course, for distinct integers \(a\), \(b\), and \(c\) there are
never cases where \(a = b\), \(b = a\), or \(b = c\).
So the claims that \(=\) is symmetric and transitive are vacuously
true (there are never examples in the relation where these events
occur).
But because the requirements for symmetry and transitivity are not
violated, the relation is symmetric and transitive.
\end{example}

\begin{example}
If we clarify the definition of sibling to mean that a person is
a sibling of him- or herself, then the sibling
relation is an equivalence relation that partitions the set of people.
\end{example}

\begin{example}
We can use the modulus function (defined in the next section) to
define an equivalence relation.\index{modulus function}
For the set of integers, use the modulus function 
to define a binary relation such that two numbers
\(x\) and \(y\) are in the relation if and only if
\(x \bmod m = y \bmod m\).
Thus, for \(m = 4\), \(\langle1, 5\rangle\) is in the relation because
\(1 \bmod 4 = 5 \bmod 4\).
We see that modulus used in this way defines an equivalence relation
on the integers, and this relation can be used to partition the
integers into \(m\) equivalence classes.
This relation is an equivalence relation because
\begin{enumerate}
\item \(x \bmod m = x \bmod m\) for all \(x\);
\item if \(x \bmod m = y \bmod m\), then \(y \bmod m = x \bmod m\); and 
\item if \(x \bmod m = y \bmod m\) and \(y \bmod m = z \bmod m\), then
	\(x \bmod m = z \bmod m\).
\end{enumerate}
\end{example}
\index{equivalence|)}

A binary relation is called a
\defit{partial order}\index{partial order}
if it is antisymmetric and transitive.\footnote{Not all authors use
this definition for partial order.
I~have seen at least three significantly different definitions in the
literature.
I~have selected the one that lets \(<\) and \(\leq\) both define
partial orders on the integers, because this seems the most natural to
me.}
The set on which the partial order is defined is called a
\defit{partially ordered set} or a
\defit{poset}.\index{partial order!poset}
Elements \(x\) and \(y\) of a set are \defit{comparable} under a
given relation if either \(xRy\) or \(yRx\).
If every pair of distinct elements in a partial order are comparable,
then the order is called a \defit{total order} or
\defit{linear order}.\index{total order}

\begin{example}
For the integers, relations \(<\) and \(\leq\) define partial orders.
Operation \(<\) is a total order because, for every pair of integers
\(x\) and \(y\) such that \(x \neq y\), either \(x < y\) or \(y < x\).
Likewise, \(\leq\) is a total order because, for every pair of integers
\(x\) and \(y\) such that \(x \neq y\), either \(x \leq y\) or
\(y \leq x\).
\end{example}

\begin{example}
For the powerset\index{set!powerset} of the integers, the subset
operator defines a partial order (because it is antisymmetric and
transitive).
For example, \(\{1, 2\}\subseteq\{1, 2, 3\}\).
However, sets \(\{1, 2\}\) and \(\{1, 3\}\) are not comparable by the
subset operator, because neither is a subset of the other.
Therefore, the subset operator does not define a total order on the
powerset of the integers.
\end{example}

Notes
-----

.. [#] The object referred to here as a
       bag is sometimes called a :dfn:`multilist`.
       But, multilist is also refers to a list that may contain
       sublists (see Module :numref:`<Multilists>`).
