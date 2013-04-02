.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Binary Trees


Array Implementation for Complete Binary Trees [Raw]
====================================================

Module <ODSAref "BinTreeImp" /> explains how a large
fraction of the space in a typical binary tree node implementation is
devoted to structural overhead, not to storing data.
This module presents a simple, compact implementation
for complete binary trees.
Recall that complete binary trees have all levels except the bottom
filled out completely, and the bottom level has all of its nodes filled
in from left to right.
Thus, a complete binary tree of <i>n</i> nodes has only one possible
shape.
You might think that a complete binary tree is such an unusual
occurrence that there is no reason to develop a special
implementation for it.
However, the complete binary tree has practical uses, the most
important being the heap data structure discussed in
Module <ODSAref "Heap" />.
Heaps are often used to implement priority queues
and for external sorting algorithms.

We begin by assigning numbers to the node positions in the complete
binary tree, level by level, from left to right as shown in
Figure <ODSAref "BinArray" />(a). 
An array can store the tree's data values efficiently, placing
each data value in the array position corresponding to that node's
position within the tree.
Figure <ODSAref "BinArray" />(b) lists the array indices for the
children, parent, and siblings of each node in
Figure <ODSAref "BinArray" />(a).
From Figure <ODSAref "BinArray" />(b), you should see a pattern
regarding the positions of a node's relatives within the array.
Simple formulas can be derived for calculating the array index
for each relative of a node <var>R</var> from <var>R</var>'s index.
No explicit pointers are necessary to reach a node's left or
right child.
This means there is no overhead to the array implementation if the
array is selected to be of size <i>n</i> for a tree of <i>n</i>
nodes.

<figure>
<center>
<img src="Images/BinArray.png" alt="Complete binary tree stored in an array" />
</center>

<p class="TODO">
Generate image for Figure 5.12(b) from table.
</p>

<figcaption>
A complete binary tree and its array implementation.
(a) The complete binary tree with twelve nodes.
Each node has been labeled with its position in the tree.
(b) The positions for the relatives of each node.
A dash indicates that the relative does not exist.
</figcaption>
</figure>

The formulae for calculating the array indices of the various
relatives of a node are as follows.
The total number of nodes in the tree is <i>n</i>.
The index of the node in question is <i>r</i>,
which must fall in the range 0 to <i>n</i>-1.

<ul>
<li>
Parent(<i>r</i>) = &lfloor;(<i>r</i> - 1)/2&rfloor;
if <i>r</i> &ne; 0.

<li>
Left child(<i>r</i>) = 2<i>r</i> + 1 if 2<i>r</i> + 1 &lt; <i>n</i>.

<li>
Right child(<i>r</i>) = 2<i>r</i> + 2 if 2<i>r</i> + 2 &lt; <i>n</i>.

<li>
Left sibling(<i>r</i>) = <i>r</i> - 1 if <i>r</i> is even.

<li>
Right sibling(<i>r</i>) = <i>r</i> + 1 if <i>r</i>
is odd and <i>r</i> + 1 &lt; <i>n</i>.
</ul>
