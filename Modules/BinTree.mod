<ODSAsettitle "Binary Trees">
<ODSAprereq "List">
<ODSAprereq "LinkedList">
<ODSAprereq "ArrayBasedList">

<p>
Lists have a fundamental limitation:
Either search or insert can be made efficient, but not both at the
same time.
For example, a linked list representation
(Module <ODSAref "LinkedList">)
can support fast insert
(just stick it at the end), but does not support fast search.
An array-based list
(Module <ODSAref "ArrayBasedList">
can support binary search, but this requires that
the insert operation can keep the elements sorted.
</p>

<p>
Tree structures permit both efficient access and update to
large collections of data.
Binary trees in particular are widely used and relatively easy to
implement.
But binary trees are useful for many things besides searching.
Just a few examples of applications that trees can speed up include
prioritizing jobs, describing mathematical expressions and the
syntactic elements of computer programs,
or organizing the information needed to drive data compression
algorithms.
</p>

<p>
This module presents definitions and some key properties
for binary trees.
Module <ODSAref "BinTreeTraversal">
discusses how to process all nodes of the
binary tree in an organized manner.
<ODSAif "BinTreeImp">
Module <ODSAref "BinTreeImp">
presents various methods for implementing binary
trees and their nodes.
</ODSAif>
Other modules present examples of binary trees used in specific
applications.
The Binary Search Tree (BST) is used for implementing dictionaries.
Heaps are used for implementing priority queues.
<ODSAif "Huffman">
Huffman coding trees are used for text compression.
</ODSAif>
Each of these trees has distinctive
structural features that affect their implementation and use.
</p>

<h2>Definitions and Properties</h2>

<p>
A <ODSAdef "binary tree"> is made up of a finite set of elements
called <ODSA "nodes">.
This set either is empty or consists of a node called the
<ODSAdef "root"> together with two binary trees, called the left and
right 
<ODSAdef "subtrees">, which are disjoint from each other and from the
root.
(Disjoint means that they have no nodes in common.)
The roots of these subtrees are
<ODSAdef "children"> of the root.
There is an <ODSAdef "edge"> from a node to each of its children, and a
node is said to be the <ODSAdef "parent"> of its children.
</p>

<p>
If <i>n</i><sub>1</sub>, <i>n</i><sub>2</sub>, ...,
<i>n</i><sub>k</sub>
is a sequence of nodes in the tree such
that <i>n</i><sub>i</sub> is the parent of
<i>n</i><sub><i>i</i>+1</sub> for 1 &#8804; <i>i</i> &lt; <i>k</i>,
then this sequence is called a <ODSAdef "path"> from
<i>n</i><sub>1</sub> to <i>n<sub>k</sub></i>.
The <ODSAdef "length"> of the path is <i>k</i>-1.
If there is a path from node <i>R</i> to node <i>M</i>,
then <i>R</i> is an <ODSAdef "ancestor"> of <i>M</i>, and
<i>M</i> is a <ODSAdef "descendant"> of <i>R</i>.
Thus, all nodes in the tree are descendants of the root of the tree,
while the root is the ancestor of all nodes.
The <ODSAdef "depth"> of a node <i>M</i> in the tree is the length of
the path from the root of the tree to <i>M</i>.
The <ODSAdef "height"> of a tree is one more than the depth of the
deepest node in the tree.
All nodes of depth <i>d</i> are at
<ODSAdef "level"> <i>d</i> in the tree.
The root is the only node at level 0, and its depth is 0.
A <ODSAdef "leaf"> node is any node that has two empty children.
An <ODSAdef "internal"> node is
any node that has at least one non-empty child.
</p>

\begin{figure}
\pdffig{BinExamp}

\medskip
\capt{4.5in}{An example binary tree}
{A binary tree.
Node~\svar{A} is the root.
Nodes~\svar{B} and~\svar{C} are \svar{A}'s children.
Nodes~\svar{B} and~\svar{D} together form a subtree.
Node~\svar{B} has two children: Its left child is the empty tree and
its right child is~\svar{D}.
Nodes~\svar{A}, \svar{C}, and~\svar{E} are ancestors of~\svar{G}.
Nodes~\svar{D}, \svar{E}, and~\svar{F} make up level~2 of the tree;
node~\svar{A} is at level~0.
The edges from~\svar{A} to~\svar{C} to~\svar{E} to~\svar{G}
form a path of length~3.
Nodes~\svar{D}, \svar{G}, \svar{H}, and~\svar{I} are leaves.
Nodes~\svar{A}, \svar{B}, \svar{C}, \svar{E}, and~\svar{F} are internal
nodes.
The depth of~\svar{I} is~3.
The height of this tree is~4.}{BinExample}
\bigskip\smallskip
\end{figure}

\vspace{-\smallskipamount}
Figure~\ref{BinExample} illustrates the various terms used to identify 
parts of a binary tree.
Figure~\ref{BinDiff} illustrates an important point regarding the
structure of binary trees.
Because \emph{all} binary tree nodes have two children
(one or both of which might be empty), the two binary
trees of Figure~\ref{BinDiff} are \emph{not} the same.

\begin{figure}
\pdffig{BinDiff}
\vspace{-\medskipamount}

\capt{4.5in}{Two different binary trees}
{Two different binary trees.
(a)~A binary tree whose root has a non-empty left child.
(b)~A binary tree whose root has a non-empty right child.
(c)~The binary tree of (a) with the missing right child made explicit.
(d)~The binary tree of (b) with the missing left child made explicit.}
{BinDiff}
\bigskip
\end{figure}

Two restricted forms of binary tree are sufficiently
important to warrant special names.
Each node in a \defit{full} binary tree\index{binary tree!full|(}
is either (1) an internal node with exactly two non-empty children or
(2) a leaf.
A \defit{complete} binary tree\index{binary tree!complete} has
a restricted shape obtained by starting at the root and filling the
tree by levels from left to right.
In the complete binary tree of height \(d\), all levels
except possibly level \(d-1\) are completely full.
The bottom level has its nodes filled in from the left side.

\begin{figure}
\pdffig{FullComp}
\vspace{-\bigskipamount}\vspace{-\medskipamount}

\capt{4.5in}{Full and complete binary trees}
{Examples of full and complete binary trees.
(a)~This tree is full (but not complete).\index{binary tree!complete}
(b)~This tree is complete (but not full).}{FullComplete}
\medskip
\end{figure}

Figure~\ref{FullComplete} illustrates the differences between full and
complete binary trees.\footnote{
While these definitions for full and complete binary tree are the ones
most commonly used, they are not universal.
Because the common meaning of the words ``full'' and ``complete'' are
quite similar, there is little that you can do to distinguish between
them other than to memorize the definitions.
Here is a memory aid that you might find useful:
``Complete'' is a wider word than ``full,'' and complete binary
trees tend to be wider than full binary trees because each level of a
complete binary tree is as wide as possible.}
There is no particular relationship between these two tree shapes;
that is, the tree of Figure~\ref{FullComplete}(a) is full but not
complete while the tree of Figure~\ref{FullComplete}(b) is complete
but not full.
The heap data structure (Section~\ref{HeapSec}) is an example
of a\index{heap}\index{binary tree!complete}
complete binary tree.
The Huffman coding tree (Section~\ref{Huffman}) is an example of a
full binary tree.\index{huffman coding tree@Huffman coding tree}
\index{binary tree!terminology|)}


\subsection{The Full Binary Tree Theorem}
\label{BinSpace}

Some\index{full binary tree theorem|(}
binary tree\index{binary tree!implementation}
implementations store data only at the leaf nodes,
using the internal nodes to provide structure to the tree.
More generally, binary tree implementations might require some amount
of space for internal nodes, and a different amount for leaf nodes.
Thus, to analyze the space required by such implementations, it is
useful to know the minimum and maximum fraction of the nodes that are
leaves in a tree containing \(n\) internal nodes.

Unfortunately, this fraction is not fixed.
A binary tree of \(n\)~internal nodes might have only one leaf.
This occurs when the internal nodes are arranged in a chain ending
in a single leaf as shown in Figure~\ref{OneLeaf}.
In this case, the number of leaves is low because each
internal node has only one non-empty child.
To find an upper bound on the number of leaves for a tree of \(n\)
internal nodes, first note that the upper bound will occur when each
internal node has two non-empty children, that is, when the tree is
full.
However, this observation does not tell what shape of tree will yield
the highest percentage of non-empty leaves.
It turns out not to matter, because all full binary trees with
\(n\) internal nodes have the same number of leaves.
This fact allows us to compute the space requirements for a full
binary tree implementation whose leaves require a different amount of
space from its internal nodes.

\begin{figure}
\pdffig{OneLeaf}
\vspace{-\bigskipamount}\vspace{-\bigskipamount}

\capt{4.5in}{A tree containing many internal nodes and a single leaf}
{A tree containing many internal nodes and a single leaf.}{OneLeaf}
\end{figure}

\begin{theorem}
{\bf Full Binary Tree Theorem:}
The number of leaves in a non-empty full binary tree is one
more than the number of internal nodes.
\end{theorem}

\begin{proof}
\index{proof!induction|(}
The proof is by mathematical induction on~\(n\), the
number of internal nodes.
This is an example of an induction proof
where we reduce from an arbitrary instance of size \(n\) to an instance
of size \(n-1\) that meets the induction hypothesis.

\begin{itemize}

\item
{\bf Base Cases}: The non-empty tree with zero internal nodes has
one leaf node.
A full binary tree with one internal node has two leaf nodes.
Thus, the base cases for \(n = 0\) and \(n = 1\) conform to the theorem.

\item
{\bf Induction Hypothesis}: Assume that any full binary
tree~\cvar{T} containing \(n-1\) internal nodes has \(n\) leaves.

\item
{\bf Induction Step}:
Given tree \cvar{T} with \(n\) internal nodes, select an internal
node~\svar{I} whose children are both leaf nodes.
Remove both of \svar{I}'s children, making \svar{I} a leaf node.
Call the new tree \(\cvar{T}'\).
\(\cvar{T}'\) has \(n-1\) internal nodes.
From the induction hypothesis, \(\cvar{T}'\) has \(n\) leaves.
Now, restore \svar{I}'s two children.
We once again have tree \cvar{T} with \(n\) internal nodes.
How many leaves does \cvar{T} have?
Because \(\cvar{T}'\) has \(n\) leaves, adding the two children yields
\(n+2\).
However, node \svar{I} counted as one of the leaves in \(\cvar{T}'\)
and has now become an internal node.
Thus, tree \cvar{T} has \(n+1\) leaf nodes and \(n\) internal
nodes.

\end{itemize}

By mathematical induction the theorem holds for all values of
\(n \geq 0\).
\index{proof!induction|)}
\end{proof}
\medskip

When analyzing the space requirements for a binary tree
implementation,\index{binary tree!space requirements}
it is useful to know how many empty subtrees a tree contains.
A simple extension of the Full Binary Tree Theorem tells us exactly
how many empty subtrees there are in \emph{any} binary tree, whether
full or not.
Here are two approaches to proving the following theorem, and
each suggests a useful way of thinking about binary trees.

\begin{theorem}
\label{SubTreeThrm}
\index{binary tree!null pointers@\NULL\ pointers}
The number of empty subtrees in a non-empty binary tree is one
more than the number of nodes in the tree.
\end{theorem}

\noindent{\sffamily\textbf{Proof 1}}:
Take an arbitrary binary tree \cvar{T} and replace every
empty subtree with a leaf node.
Call the new tree \(\cvar{T}'\).
All nodes originally in~\cvar{T} will be internal nodes in
\(\cvar{T}'\) (because even the leaf nodes of \cvar{T} have children
in~\(\cvar{T}'\)).
\(\cvar{T}'\) is a full binary tree, because every internal node of
\cvar{T} now must have two children in \(\cvar{T}'\), and each leaf node
in \cvar{T} must have two children in \(\cvar{T}'\)
(the leaves just added).
The Full Binary Tree Theorem tells us that the number of leaves
in a full binary tree is one more than the number of internal nodes.
Thus, the number of new leaves that were added to create
\(\cvar{T}'\) is one more than the number of nodes in \cvar{T}.
Each leaf node in \(\cvar{T}'\) corresponds to an
empty subtree in \cvar{T}.
Thus, the number of empty subtrees in \cvar{T} is one more
than the number of nodes in \cvar{T}.
\hfill\(\Box\)
\bigskip

\noindent{\sffamily\textbf{Proof 2}}:
By definition, every node in binary tree~\cvar{T} has two children,
for a total of \(2n\) children in a tree of \(n\) nodes.
Every node except the root node has one parent, for a total of
\(n-1\) nodes with parents.
In other words, there are \(n-1\) non-empty children.
Because the total number of children is \(2n\), the remaining \(n+1\)
children must be empty.
\hfill\(\Box\)
\index{full binary tree theorem|)}
\index{binary tree!full|)}

\subsection{A Binary Tree Node ADT}
\label{BinADT}

\index{binary tree!node|(}
Just as a linked list is comprised of a collection of link objects, a
tree is comprised of a collection of node objects.
Figure~\ref{BinNodeADT} shows an ADT for binary tree nodes, called
\Cref{BinNode}.\index{abstract data type (ADT)}
This class will be used by some of the binary tree structures presented
later.
Class \Cref{BinNode} is a \Gen\ with parameter \Cref{E}, which
is the type for the data record stored in the node.
Member functions are provided that set or return the element value,
set or return a \pointref\ to the left child,
set or return a \pointref\ to the right child,
or indicate whether the node is a leaf.

\begin{figure}
\xprogfig{BinNode.book}
\vspace{-\bigskipamount}
\vspace{-\medskipamount}
\capt{4.5in}{A binary tree node ADT}
{A binary tree node ADT.}{BinNodeADT}
\end{figure}
\index{binary tree!node|)}
