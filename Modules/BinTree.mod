<div id="content">
<ODSAsettitle>Binary Trees Terminology</ODSAsettitle>

<p>
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
</p>

<p>
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
</p>

<h2>Definitions and Properties</h2>

<p>
A <dfn>binary tree</dfn> is made up of a finite set of elements
called <dfn>nodes</dfn>.
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
</p>

<p>
If <i>n</i><sub>1</sub>, <i>n</i><sub>2</sub>, ...,
<i>n<sub>k</sub></i>
is a sequence of nodes in the tree such
that <i>n<sub>i</sub></i> is the parent of
<i>n</i><sub><i>i</i>+1</sub> for 1 &le; <i>i</i> &lt; <i>k</i>,
then this sequence is called a <dfn>path</dfn> from
<i>n</i><sub>1</sub> to <i>n<sub>k</sub></i>.
The <dfn>length</dfn> of the path is <i>k</i>-1.
If there is a path from node <i>R</i> to node <i>M</i>,
then <i>R</i> is an <dfn>ancestor</dfn> of <i>M</i>, and
<i>M</i> is a <dfn>descendant</dfn> of <i>R</i>.
Thus, all nodes in the tree are descendants of the root of the tree,
while the root is the ancestor of all nodes.
The <dfn>depth</dfn> of a node <i>M</i> in the tree is the length of
the path from the root of the tree to <i>M</i>.
The <dfn>height</dfn> of a tree is one more than the depth of the
deepest node in the tree.
All nodes of depth <i>d</i> are at
<dfn>level</dfn> <i>d</i> in the tree.
The root is the only node at level 0, and its depth is 0.
A <dfn>leaf</dfn> node is any node that has two empty children.
An <dfn>internal</dfn> node is
any node that has at least one non-empty child.
</p>

<figure>
<center>
<img src="Images/BinExamp.png" alt="An example binary tree" />
<br/>
</center>

<figcaption>
<ODSAfig "BinExample" />
A binary tree.
Node <i>A</i> is the root.
Nodes <i>B</i> and <i>C</i> are <i>A</i>'s children.
Nodes <i>B</i> and <i>D</i> together form a subtree.
Node <i>B</i> has two children:
Its left child is the empty tree and its right child is <i>D</i>.
Nodes <i>A</i>, <i>C</i>, and <i>E</i> are ancestors of <i>G</i>.
Nodes <i>D</i>, <i>E</i>, and <i>F</i> make up level 2 of the tree;
node <i>A</i> is at level 0.
The edges from <i>A</i> to <i>C</i> to <i>E</i> to <i>G</i>
form a path of length 3.
Nodes <i>D</i>, <i>G</i>, <i>H</i>, and <i>I</i> are leaves.
Nodes <i>A</i>, <i>B</i>, <i>C</i>, <i>E</i>, and <i>F</i> are
internal nodes.
The depth of <i>I</i> is 3.
The height of this tree is 4.
</figcaption>
</figure>

<figure>
<center>
<img src="Images/BinDiff.png" alt="Two different binary trees" />
<br/>
</center>

<figcaption>
<ODSAfig "BinDiff" />
Two different binary trees.
(a) A binary tree whose root has a non-empty left child.
(b) A binary tree whose root has a non-empty right child.
(c) The binary tree of (a) with the missing right child made explicit.
(d) The binary tree of (b) with the missing left child made explicit.
</figcaption>
</figure>

<p>
Figure <ODSAref "BinExample" /> illustrates the various terms used to
identify parts of a binary tree.
Figure <ODSAref "BinDiff" /> illustrates an important point regarding the
structure of binary trees.
Because <em>all</em> binary tree nodes have two children
(one or both of which might be empty), the two binary
trees of Figure <ODSAref "BinDiff" /> are <em>not</em> the same.
</p>

<p>
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
</p>

<figure>
<center>
<img src="Images/FullComp.png" alt="Full and complete binary trees" />
</center>

<figcaption>
<ODSAfig "FullComplete" />
Examples of full and complete binary trees.
(a) This tree is full (but not complete).
(b)~This tree is complete (but not full).
</figcaption>
</figure>

<p>
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
</p>

<p class="TODO">
[EXERCISE HERE TO TEST KNOWLEDGE OF THE TERMINOLOGY.]
</p>

<section>
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
</p>
</section>

</div>