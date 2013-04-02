.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Binary Trees

Binary Trees [Raw]
==================

Tree structures enable efficient access and efficient update to
large collections of data.
Binary trees in particular are widely used and relatively easy to
implement.
But binary trees are useful for many things besides searching.
Just a few examples of applications that trees can speed up include
prioritizing jobs, describing mathematical expressions and the
syntactic elements of computer programs,
or organizing the information needed to drive data compression
algorithms.

This module presents definitions and some key properties
for binary trees.
Module <ODSAref "BinTreeTraversal" />
discusses how to process all nodes of the
binary tree in an organized manner.
<ODSAif "BinTreeImp">
Module <ODSAref "BinTreeImp" />
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
Each of these representations has distinctive
structural features that affect their implementation and use.

Definitions and Properties
--------------------------

A :dfn:`binary tree` is made up of a finite set of elements
called :dfn:`nodes`.
This set either is empty or consists of a node called the
<dfn>root</dfn> together with two binary trees, called the left and
right 
<dfn>subtrees</dfn>, which are disjoint from each other and from the
root.
(Disjoint means that they have no nodes in common.)
The roots of these subtrees are
<dfn>children</dfn> of the root.
There is an <dfn>edge</dfn> from a node to each of its children,
and a node is said to be the <dfn>parent</dfn> of its children.

If <var>n<sub>1</sub></var>, <var>n<sub>2</sub></var>, ...,
<var>n<sub>k</sub></var>
is a sequence of nodes in the tree such
that <var>n<sub>i</sub></var> is the parent of
<var>n<sub><i>i</i>+1</sub></var> for 1 &le; <i>i</i> &lt; <i>k</i>,
then this sequence is called a <dfn>path</dfn> from
<var>n<sub>1</sub></var> to <var>n<sub>k</sub></var>.
The <dfn>length</dfn> of the path is <i>k</i>-1.
If there is a path from node <var>R</var> to node <var>M</var>,
then <var>R</var> is an <dfn>ancestor</dfn> of <var>M</var>, and
<var>M</var> is a <dfn>descendant</dfn> of <var>R</var>.
Thus, all nodes in the tree are descendants of the root of the tree,
while the root is the ancestor of all nodes.
The <dfn>depth</dfn> of a node <var>M</var> in the tree is the length
of the path from the root of the tree to <var>M</var>.
The <dfn>height</dfn> of a tree is one more than the depth of the
deepest node in the tree.
All nodes of depth <i>d</i> are at
<dfn>level</dfn> <i>d</i> in the tree.
The root is the only node at level 0, and its depth is 0.
A <dfn>leaf</dfn> node is any node that has two empty children.
An <dfn>internal</dfn> node is
any node that has at least one non-empty child.

<figure>
<center>
<img src="Images/BinExamp.png" alt="An example binary tree" />
</center>

<figcaption>
A binary tree.
Node <var>A</var> is the root.
Nodes <var>B</var> and <var>C</var> are <var>A</var>'s children.
Nodes <var>B</var> and <var>D</var> together form a subtree.
Node <var>B</var> has two children:
Its left child is the empty tree and its right child is <var>D</var>.
Nodes <var>A</var>, <var>C</var>, and <var>E</var> are ancestors of
<var>G</var>.
Nodes <var>D</var>, <var>E</var>, and <var>F</var> make up level 2 of
the tree;
node <var>A</var> is at level 0.
The edges from <var>A</var> to <var>C</var> to <var>E</var> to <var>G</var>
form a path of length 3.
Nodes <var>D</var>, <var>G</var>, <var>H</var>, and <var>I</var> are leaves.
Nodes <var>A</var>, <var>B</var>, <var>C</var>, <var>E</var>, and
<var>F</var> are internal nodes.
The depth of <var>I</var> is 3.
The height of this tree is 4.
</figcaption>
</figure>

<figure>
<center>
<img src="Images/BinDiff.png" alt="Two different binary trees" />
<br/>
</center>

<figcaption>
Two different binary trees.
(a) A binary tree whose root has a non-empty left child.
(b) A binary tree whose root has a non-empty right child.
(c) The binary tree of (a) with the missing right child made explicit.
(d) The binary tree of (b) with the missing left child made explicit.
</figcaption>
</figure>

Figure <ODSAref "BinExample" /> illustrates the various terms used to
identify parts of a binary tree.
Figure <ODSAref "BinDiff" /> illustrates an important point regarding the
structure of binary trees.
Because <em>all</em> binary tree nodes have two children
(one or both of which might be empty), the two binary
trees of Figure <ODSAref "BinDiff" /> are <em>not</em> the same.

Two restricted forms of binary tree are sufficiently
important to warrant special names.
Each node in a <dfn>full</dfn> binary tree
is either (1) an internal node with exactly two non-empty children or
(2) a leaf.
A <dfn>complete</dfn> binary tree has
a restricted shape obtained by starting at the root and filling the
tree by levels from left to right.
In the complete binary tree of height <i>d</i>, all levels
except possibly level <i>d</i>-1 are completely full.
The bottom level has its nodes filled in from the left side.

<figure>
<center>
<img src="Images/FullComp.png" alt="Full and complete binary trees" />
</center>

<figcaption>
Examples of full and complete binary trees.
(a) This tree is full (but not complete).
(b)~This tree is complete (but not full).
</figcaption>
</figure>

Figure <ODSAref "FullComplete" /> illustrates the differences between
full and complete binary trees. <sup><a href="#fn1" id="r1">[1]</a></sup>
There is no particular relationship between these two tree shapes;
that is, the tree of Figure <ODSAref "FullComplete" />(a) is full but
not complete while the tree of Figure <ODSAref "FullComplete" />(b) is
complete but not full.
The heap data structure (Module <ODSAref "Heap" />) is an example
of a complete binary tree.
The Huffman coding tree
<ODSAif "Huffman">
(Module <ODSAref "Huffman" />)
</ODSAif>
is an example of a full binary tree.

.. TODO::
   :type: Exercise

   EXERCISE HERE TO TEST KNOWLEDGE OF THE TERMINOLOGY.

Notes
-----

<p id="fn1"><a href="#r1">[1]</a>
While these definitions for full and complete binary tree are the ones
most commonly used, they are not universal.
Because the common meaning of the words "full" and "complete" are
quite similar, there is little that you can do to distinguish between
them other than to memorize the definitions.
Here is a memory aid that you might find useful:
"Complete" is a wider word than "full", and complete binary
trees tend to be wider than full binary trees because each level of a
complete binary tree is as wide as possible.
