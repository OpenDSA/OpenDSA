.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :prerequisites:
   :topic: General Trees

General Tree Implementations [Raw]
==================================

We now tackle the problem of devising an implementation for general
trees that allows efficient processing for all member functions of the
ADTs shown in Figure~\ref{GenTreeADT}.\index{abstract data type (ADT)}
This section presents several approaches to implementing general
trees.
Each implementation yields  advantages and disadvantages in the amount
of space required to store a node and the relative ease with which
key operations can be performed.
General tree implementations should place no restriction on how many
children a node may have.
In some applications, once a node is created the number of children
never changes.
In such cases, a fixed amount of space can be allocated for the
node when it is created, based on the number of children for the node.
Matters become more complicated if children can be added to or deleted
from a node, requiring that the node's space allocation be adjusted
accordingly.

\subsection{List of Children}
\label{LOChild}

\index{general tree!list of children|(}
Our first attempt to create a general tree implementation is called
the "list of children" implementation for general trees.
It simply stores with each internal node a
linked list of its children.
This is illustrated by Figure~\ref{ChildList}.

\begin{figure}
\pdffig{ChildLst}
\smallskip
\capt{4.5in}{The "list of children" implementation for general trees.}
{The "list of children" implementation for general trees.
The column of numbers to the left of the node array labels the array
indices.
The column labeled "Val" stores node values.
The column labeled "Par" stores indices (or pointers) to the
parents.
The last column stores pointers to the linked list of children for
each internal node.
Each element of the linked list stores a pointer to
one of the node's children (shown as the array index of the target
node).}{ChildList}
\bigskip
\end{figure}

The "list of children" implementation stores the tree nodes in an
array.
Each node contains a value, a pointer (or index) to its parent, and a
pointer to a linked list of the node's children, stored in order from
left to right.
Each linked list element contains a pointer to one child.
Thus, the leftmost child of a node can be found directly because it is
the first element in the linked list.
However, to find the right sibling for a node is more difficult.
Consider the case of a node~\svar{M} and its parent~\svar{P}.
To find \svar{M}'s~right sibling, we must move down the child list
of~\svar{P} until the linked list element storing the pointer
to~\svar{M} has been found.
Going one step further takes us to the linked list element that stores
a pointer to \svar{M}'s~right sibling.
Thus, in the worst case, to find \svar{M}'s~right sibling requires
that all children of \svar{M}'s~parent be searched.

Combining trees using this representation is difficult if each tree
is stored in a separate node array.
If the nodes of both trees are stored in a single node array, then
adding tree~\cvar{T} as a subtree of node~\svar{R} is done by
simply adding the root of~\cvar{T} to \svar{R}'s list of children.
\index{general tree!list of children|)}

\subsection{The Left-Child/Right-Sibling Implementation}
\label{LeftRight}

\index{general tree!left-child/right-sibling}
With the "list of children" implementation, it is difficult to
access a node's right sibling.\index{general tree!list of children}
Figure~\ref{Explicit} presents an improvement.
Here, each node stores its value and pointers to its parent, leftmost
child, and right sibling.
Thus, each of the basic ADT operations can be implemented by reading a
value directly from the node.\index{abstract data type (ADT)}
If two trees are stored within the same node array, then adding one
as the subtree of the other simply requires setting three pointers.
Combining trees in this way is illustrated by
Figure~\ref{AddExplicit}.
This implementation is more space efficient than the
"list of children" implementation, and each node requires a fixed
amount of space in the node
array.\index{general tree!left-child/right-sibling}

\begin{figure}
\pdffig{Explicit}
\vspace{-\bigskipamount}\vspace{-\bigskipamount}
\vspace{-\smallskipamount}

\capt{4.5in}{The left-child/right-sibling implementation}
{The "left-child/right-sibling" implementation.}{Explicit}
\end{figure}

\begin{figure}
\pdffig{ExpliAdd}
\vspace{-\medskipamount}

\capt{4.5in}{Combining two trees}
{Combining two trees that use the "left-child/right-sibling"
implementation.
The subtree rooted at~\svar{R} in Figure~\ref{Explicit} now becomes
the first child of~\svar{R}\('\).
Three pointers are adjusted in the node array:
The left-child field of~\svar{R}\('\) now points to node~\svar{R}, while
the right-sibling field for~\svar{R} points to node~\svar{X}.
The parent field of node~\svar{R} points to
node~\svar{R}\('\).}{AddExplicit}
\bigskip
\end{figure}

\subsection{Dynamic Node Implementations}
\label{LinkedSec}

The two general tree implementations just described use an
array to store the collection of nodes.
In contrast, our standard implementation for binary trees stores each
node as a separate dynamic object containing its value and pointers to
its two children.
Unfortunately, nodes of a general tree can have any number of
children, and this number may change during the life of the node.
A general tree node implementation must support these properties.
One solution is simply to limit the number of children permitted for
any node and allocate pointers for exactly that number of children.
There are two major objections to this.
First, it places an undesirable limit on the number of children, which
makes certain trees unrepresentable by this implementation.
Second, this might be extremely wasteful of space because most
nodes will have far fewer children and thus leave some pointer
positions empty.

The alternative is to allocate variable space for each node.
There are two basic approaches.
One is to allocate an array of child pointers as part of the node.
In essence, each node stores an array-based list of child pointers.
Figure~\ref{GenLinkedFixed} illustrates the concept.
This approach assumes that the number of children is known when the
node is created, which is true for some applications but not for
others.
It also works best if the number of children does not change.
If the number of children does change (especially if it increases),
then some special recovery mechanism must be provided to support
a change in the size of the child pointer array.
One possibility is to allocate a new node of the correct size from
free store and return the old copy of the node to free store for
later reuse.
This works especially well in a language with built-in garbage
collection such as \LangJava.
For example, assume that a node~\svar{M} initially has two children,
and that space for two child pointers is allocated when \svar{M} is
created.
If a third child is added to~\svar{M}, space for a new node with three
child pointers can be allocated, the contents of \svar{M} is copied
over to the new space, and the old space is then returned to free
store.
As an alternative to relying on the system's garbage collector,
a memory manager for variable size storage units can be implemented,
as described in Section~\ref{MemMan}.
Another possibility is to use a collection of free lists, one for each
array size, as described in Section~\ref{freelist}.
Note in Figure~\ref{GenLinkedFixed} that the current number of
children for each node is stored explicitly in a \Cref{size} field.
The child pointers are stored in an array with \Cref{size} elements.

\begin{figure}
\pdffig{GenLkFx}
\vspace{-\medskipamount}

\capt{4.5in}{A dynamic general tree with fixed-size arrays}
{A dynamic general tree representation with fixed-size arrays for the
child pointers.
(a)~The general tree.
(b)~The tree representation.
For each node, the first field stores the node value while the second
field stores the size of the child pointer array.}
{GenLinkedFixed}
\medskip
\end{figure}

Another approach that is more flexible, but which requires more space, 
is to store a linked list of child pointers with each node
as illustrated by Figure~\ref{GenLinkedLinked}.
This implementation is essentially the same as the "list of
children" implementation of Section~\ref{LOChild}, but with
dynamically allocated nodes rather than storing the nodes in an
array.

\begin{figure}
\pdffig{GenLkLk}
\vspace{-\bigskipamount}\vspace{-\medskipamount}

\capt{4.5in}{A dynamic general tree with linked lists of child pointers}
{A dynamic general tree representation with linked lists of child
pointers.
(a)~The general tree.
(b)~The tree representation.}{GenLinkedLinked} 
\end{figure}

\newpage

\subsection{Dynamic "Left-Child/Right-Sibling" Implementation}
\label{DynamicLR}

\index{general tree!converting to binary tree}
The "left-child/right-sibling" implementation of
Section~\ref{LeftRight} stores a fixed number of pointers with each
node.
This can be readily adapted to a dynamic implementation.
In essence, we substitute a binary tree for a
general tree.
Each node of the "left-child/right-sibling" implementation points to
two "children" in a new binary tree structure.
The left child of this new structure is the node's first child
in the general tree.
The right child is the node's right sibling.
We can easily extend this conversion to a forest of general trees,
because the roots of the trees can be considered siblings.
Converting from a forest of general trees to a single binary tree is
illustrated by Figure~\ref{FortoBin}.
Here we simply include links from each node to its right sibling and
remove links to all children except the leftmost child.
Figure~\ref{GenBin} shows how this might look in an implementation
with two pointers at each node.
Compared with the implementation illustrated by
Figure~\ref{GenLinkedLinked} which requires overhead of three
pointers/node, the implementation of Figure~\ref{GenBin} only requires
two pointers per node.
The representation of Figure~\ref{GenBin} is likely to be easier
to implement, space efficient, and more flexible than the other
implementations presented in this section.
\begin{figure}
\pdffig{FortoBin}
\vspace{-\bigskipamount}\vspace{-\smallskipamount}

\capt{4.5in}{Converting from a forest of general trees to a binary tree}
{Converting from a forest of general trees to a single binary tree.
Each node stores pointers to its left child and right sibling.
The tree roots are assumed to be siblings for the purpose of
converting.}{FortoBin}
\medskip\smallskip
\end{figure}

\begin{figure}
\pdffig{GenBin}
\vspace{-\bigskipamount}

\capt{4.5in}{Dynamic "left-child/right-sibling" representation}
{A general tree converted to the dynamic "left-child/right-sibling"
representation.
Compared to the representation of Figure~\ref{GenLinkedLinked}, this
representation requires less space.}{GenBin}
\medskip
\end{figure}
