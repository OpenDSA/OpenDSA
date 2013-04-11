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

A \defit{set} is a collection of distinguishable
\defit{members} or \defit{elements}.\index{element}
The members are typically drawn from some larger population known as
the \defit{base type}.
Each member of a set is either a \defit{primitive element} of the
base type or is a set itself.
There is no concept of duplication in a set.
Each value from the base type is either in the set or not in the set.
For example, a set named \cvar{P} might consist of the three
integers~7, 11, and~42.
In this case, \cvar{P}'s members are~7, 11, and~42, and the base type is
integer.

\begin{mytable}
\begin{center}

{\sffamily
\begin{tabular}{l|l}
\{1, 4\}& A set composed of the members 1 and 4\\
\{\(\mathsf{x}\, |\, \mathsf{x}\) is a positive integer\}&
	A set definition using a \defit{set former}\\
&\qquad Example: the set of all positive integers\\
\(\mathsf{x} \in \cvar{P}\)&\(\mathsf{x}\) is a member of
	set~\cvar{P}\\
\(\mathsf{x} \notin \cvar{P}\)&\(\mathsf{x}\) is not a member of
	set~\cvar{P}\\
\(\emptyset\)&The null or empty set\\
\(|\cvar{P}|\)& Cardinality: size of set~\cvar{P}\\
&\qquad or number of members for set~\cvar{P}\\
\(\cvar{P}\,\subseteq\,\cvar{Q}\),
	\(\cvar{Q}\,\supseteq\,\cvar{P}\)&
	Set~\cvar{P} is included in set~\cvar{Q},\\
&\qquad set~\cvar{P} is a subset\index{set!subset, superset} of set~\cvar{Q},\\
&\qquad set~\cvar{Q} is a superset\index{set!subset, superset} of set~\cvar{P}\\
\(\cvar{P}\,\cup\,\cvar{Q}\)
	&Set Union\index{set!union, intersection, difference}:\\
&\qquad all elements appearing in \cvar{P} OR \cvar{Q}\\
\(\cvar{P}\,\cap\,\cvar{Q}\)
	&Set Intersection\index{set!union, intersection, difference}:\\
&\qquad all elements appearing in \cvar{P} AND \cvar{Q}\\
\(\cvar{P}\,-\,\cvar{Q}\)
	&Set difference\index{set!union, intersection, difference}:\\
&\qquad all elements of set~\cvar{P} NOT in set~\cvar{Q}\\
\end{tabular}
}
\end{center}

\capt{4.5in}{Set notation}{Set notation.}{SetNotation}
\end{mytable}

Figure~\ref{SetNotation} shows the symbols commonly used to express sets
and their relationships.
Here are some examples of this notation in use.
First define two sets, \cvar{P} and \cvar{Q}.
\[ \cvar{P} = \{2, 3, 5\}, \qquad \cvar{Q} = \{5, 10\}. \]
\noindent \(|\cvar{P}| = 3\)  (because \cvar{P} has three members) and
\(|\cvar{Q}| = 2\) (because \cvar{Q} has two members).
The union\index{set!union, intersection, difference}
of \cvar{P} and \cvar{Q}, written
\( \cvar{P} \cup \cvar{Q} \), is the set of elements in either~\cvar{P}
or~\cvar{Q}, which is \{2, 3, 5, 10\}.
The intersection of \cvar{P} and~\cvar{Q},
written \( \cvar{P} \cap \cvar{Q} \), is the set of elements that
appear in both~\cvar{P} and~\cvar{Q}, which is \{5\}.
The set difference of \cvar{P} and~\cvar{Q},
written \( \cvar{P} - \cvar{Q} \),
is the set of elements that occur in \cvar{P} but not in~\cvar{Q}, which
is \{2,~3\}.
Note that \( \cvar{P} \cup \cvar{Q} = \cvar{Q} \cup \cvar{P} \) and that
\( \cvar{P} \cap \cvar{Q} = \cvar{Q} \cap \cvar{P} \), but in general
\( \cvar{P} - \cvar{Q} \neq \cvar{Q} - \cvar{P} \).
In this example,
\( \cvar{Q} - \cvar{P}  = \{10\} \).\index{set!terminology|)}
Note that the set \( \{4, 3, 5\} \) is indistinguishable from set
\cvar{P}, because sets have no concept of order.
Likewise, set \(\{4, 3, 4, 5\}\) is also indistinguishable from 
\cvar{P}, because sets have no concept of duplicate elements.

The \defit{powerset} of a set \cvar{S} is the set of all
possible subsets for \cvar{S}.\index{set!powerset}
Consider the set \( \cvar{S} = \{ a, b, c \}\).
The powerset of \cvar{S} is
\[ \{ \emptyset,\ \{a\},\ \{b\},\ \{c\},\ \{a, b\},
\ \{a, c\},\ \{b, c\},\ \{a, b, c\}\}.\]
A collection of elements with no order (like a set), but with
duplicate-valued elements is called a\index{bag}
\defit{bag}.\footnote{The object referred to here as a
bag is sometimes called a \defit{multilist}.\index{multilist}
But, I~reserve the term multilist for a list that may contain sublists
(see Section~\ref{Multilists}).}
To distinguish bags from sets, I~use square brackets [] around
a bag's elements.
For example, bag [3, 4, 5, 4] is distinct from bag [3, 4, 5],
while set \(\{3, 4, 5, 4\}\) is indistinguishable from set
\(\{3, 4, 5\}\).
However, bag [3, 4, 5, 4] is indistinguishable from bag
[3, 4, 4, 5].

A \defit{sequence} is a collection of elements with an order, and
which may contain duplicate-valued elements.\index{sequence}
A sequence is also sometimes called a \defit{tuple} or a
\defit{vector}.\index{tuple}\index{vector}
In a sequence, there is a 0th element, a 1st element, 2nd element, and 
so on.
I~indicate a sequence by using angle brackets \(\langle\rangle\)
to enclose its elements.
For example, \(\langle3, 4, 5, 4\rangle\) is a sequence.
Note that sequence \(\langle3, 5, 4, 4\rangle\) is distinct from
sequence \(\langle3, 4, 5, 4\rangle\), and both are distinct from
sequence \(\langle3, 4, 5\rangle\). 

\index{relation|(}
A \defit{relation} \(R\) over set \cvar{S} is a set of ordered 
pairs from \cvar{S}.
As an example of a relation, if \cvar{S} is \(\{a, b, c\}\), then
\[\{ \langle a, c\rangle, \langle b, c\rangle, \langle c, b\rangle \}\]
is a relation, and
\[\{ \langle a, a\rangle, \langle a, c\rangle, \langle b, b\rangle,
\langle b, c\rangle, \langle c, c\rangle \}\]
is a different relation.
If tuple \(\langle x, y\rangle\) is in relation \(R\), we may use the
infix notation \(xRy\).
We often use relations such as the less than operator (\(<\)) on the
natural numbers, which includes ordered pairs such as
\(\langle1, 3\rangle\) and 
\(\langle2, 23\rangle\), but not \(\langle3, 2\rangle\) or
\(\langle2, 2\rangle\).
Rather than writing the relationship in terms of ordered pairs, we
typically use an infix notation for such relations, writing \(1<3\).

Define the properties of relations as follows, with \(R\) a
binary relation over set~\cvar{S}.
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
