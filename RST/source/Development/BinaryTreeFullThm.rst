.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Binary Trees

The Full Binary Tree Theorem [Raw]
==================================

Some binary tree implementations store data only at the leaf nodes,
using the internal nodes to provide structure to the tree.
By definition, a leaf node does not need to store pointers to its
(empty) children.
More generally, binary tree implementations might require some amount
of space for internal nodes, and a different amount for leaf nodes.
Thus, to compute the space required by such implementations, it is
useful to know the minimum and maximum fraction of the nodes that are
leaves in a tree containing <i>n</i> internal nodes.

Unfortunately, this fraction is not fixed.
A binary tree of <i>n</i> internal nodes might have only one leaf.
This occurs when the internal nodes are arranged in a chain ending
in a single leaf as shown in Figure <ODSAref "OneLeaf" />.
In this example, the number of leaves is low because each
internal node has only one non-empty child.
To find an upper bound on the number of leaves for a tree of <i>n</i>
internal nodes, first note that the upper bound will occur when each
internal node has two non-empty children, that is, when the tree is
full.
However, this observation does not tell what shape of tree will yield
the highest percentage of non-empty leaves.
It turns out not to matter, because all full binary trees with
<i>n</i> internal nodes have the same number of leaves.
This fact allows us to compute the space requirements for a full
binary tree implementation whose leaves require a different amount of
space from its internal nodes.

<figure>
<center>
<img src="Images/OneLeaf.png"
alt="A tree containing many internal nodes and a single leaf." />
</center>

<figcaption>
<ODSAfig "OneLeaf" />
A tree containing many internal nodes and a single leaf.
</figcaption>
</figure>

<p class="theorem">
<ODSAtheorem "FullTree" />
<b>Full Binary Tree Theorem:</b>
The number of leaves in a non-empty full binary tree is one
more than the number of internal nodes.
</p>

<p class="proof">
The proof is by mathematical induction on <i>n</i>, the
number of internal nodes.
This is an example of an induction proof
where we reduce from an arbitrary instance of size <i>n</i> to an
instance of size <i>n</i>-1 that meets the induction hypothesis.

<ul>
<li>
<b>Base Cases</b>: The non-empty tree with zero internal nodes has
one leaf node.
A full binary tree with one internal node has two leaf nodes.
Thus, the base cases for <i>n</i> = 0 and <i>n</i> = 1 conform to the
theorem.
</li>

<li>
<b>Induction Hypothesis</b>: Assume that any full binary
tree <var class="cvar">T</var> containing <i>n</i>-1 internal nodes
has <i>n</i> leaves.
</li>

<li>
<b>Induction Step</b>:
Given tree <var class="cvar">T</var> with <i>n</i> internal nodes,
select an internal node <var>I</var> whose children are both leaf nodes.
Remove both of <var>I</var>'s children, making <var>I</var> a leaf node.
Call the new tree <var <class="cvar">T'</var>.
<var class="cvar">T'</var> has <i>n</i>-1 internal nodes.
From the induction hypothesis, <var class="cvar">T'</var> has <i>n</i>
leaves.
Now, restore <var>I</var>'s two children.
We once again have tree <var class="cvar">T</var> with <i>n</i>
internal nodes.
How many leaves does <var class="cvar">T</var> have?
Because <var class="cvar">T'</var> has <i>n</i> leaves, adding the two
children yields <i>n</i>+2.
However, node <var>I</var> counted as one of the leaves in
<var class="cvar">T'</var> and has now become an internal node.
Thus, tree <var class="cvar">T</var> has <i>n</i>+1 leaf nodes and
<i>n</i> internal nodes.
</i>

</ul>

<p class="proof">
By mathematical induction the theorem holds for all values of
<i>n</i> &ge; 0.
</p>

<p>
When analyzing the space requirements for a binary tree
implementation,
it is useful to know how many empty subtrees a tree contains.
A simple extension of the Full Binary Tree Theorem tells us exactly
how many empty subtrees there are in <em>any</em> binary tree, whether
full or not.
Here are two approaches to proving the following theorem, and
each suggests a useful way of thinking about binary trees.
</p>

<p class="theorem">
<ODSAtheorem "SubTreeThrm" />
The number of empty subtrees in a non-empty binary tree is one
more than the number of nodes in the tree.
</p>

<p class="proof">
<b>Proof 1</b>:
Take an arbitrary binary tree <var class="cvar">T</var> and replace
every empty subtree with a leaf node.
Call the new tree <var class="cvar">T'</var>.
All nodes originally in <var class="cvar">T</var> will be internal
nodes in <var class="cvar">T'</var> (because even the leaf nodes of
<var class="cvar">T</var> have children 
in <var class="cvar">T'</var>.
<var class="cvar">T'</var> is a full binary tree, because every
internal node of <var class="cvar">T</var> now must have two children
in <var class="cvar">T'</var>, and each leaf node 
in <var class="cvar">T</var> must have two children in
<var class="cvar">T'</var> (the leaves just added).
The Full Binary Tree Theorem tells us that the number of leaves
in a full binary tree is one more than the number of internal nodes.
Thus, the number of new leaves that were added to create
<var class="cvar">T'</var> is one more than the number of nodes in
<var class="cvar">T</var>.
Each leaf node in <var class="cvar">T'</var> corresponds to an
empty subtree in <var class="cvar">T</var>.
Thus, the number of empty subtrees in <var class="cvar">T</var> is one
more than the number of nodes in <var class="cvar">T</var>.
</p>

<p class="proof">
<b>Proof 2</b>:
By definition, every node in binary tree <var class="cvar">T</var> has
two children, for a total of 2<i>n</i> children in a tree of <i>n</i>
nodes.
Every node except the root node has one parent, for a total of
<i>n</i>-1 nodes with parents.
In other words, there are <i>n</i>-1 non-empty children.
Because the total number of children is <i>2n</i>, the remaining
<i>n</i>+1 children must be empty.
