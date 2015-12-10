.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :topic: General Trees


.. odsalink:: AV/Binary/BinExampCON.css
.. odsalink:: AV/General/SequentialTreeCON.css

Sequential Tree Representations
===============================

Sequential Tree Representations
-------------------------------

Next we consider a fundamentally different approach to implementing
trees.
The goal is to store a series of node values with the minimum
information needed to reconstruct the tree structure.
This approach, known as a :term:`sequential tree representation`, has
the advantage of saving space because no pointers are stored.
It has the disadvantage that accessing any node in the tree requires
sequentially processing all nodes that appear before 
it in the node list.
In other words, node access must start at the beginning of the node
list, processing nodes sequentially in whatever order they are stored
until the desired node is reached.
Thus, one primary virtue of the other implementations discussed in
this section is lost: efficient access
(typically :math:`\Theta(\log n)` time) to arbitrary nodes in the
tree.
Sequential tree implementations are ideal for archiving trees on disk
for later use because they save space, and the tree structure can
be reconstructed as needed for later processing.

Sequential tree implementations can be used to
:term:`serialize <serialization>` a tree structure.
Serialization is the process of storing an object as a series of
bytes, typically so that the data structure can be transmitted between
computers.
This capability is important when using data structures in a
distributed processing environment.

A sequential tree implementation typically stores the node values as
they would be enumerated by a preorder
traversal, along with sufficient information to describe the tree's
shape.
If the tree has restricted form, for example if it is a full binary
tree, then less information about structure typically needs to be
stored.
A general tree, because it has the most flexible shape, tends to require
the most additional shape information. 
There are many possible sequential tree implementation schemes.
We will begin by describing methods appropriate to binary trees,
then generalize to an implementation appropriate to a general tree
structure.

Because every node of a binary tree is either a leaf or has two
(possibly empty) children, we can take advantage of this fact to
implicitly represent the tree's structure.
The most straightforward sequential tree implementation lists every
node value as it would be enumerated by a preorder traversal.
Unfortunately, the node values alone do not provide enough information 
to recover the shape of the tree.
In particular, as we read the series of node values, we do not
know when a leaf node has been reached.
However, we can treat all non-empty nodes as internal nodes with two
(possibly empty) children.
Only NULL values will be interpreted as leaf nodes, and these can be 
listed explicitly.
Such an augmented node list provides enough information to recover
the tree structure.

.. _BinExampb:

.. inlineav:: BinExampCON dgm
   :align: center

   Sample binary tree for sequential tree implementation examples.

.. inlineav:: SequentialTreeCON ss
   :output: show

.. avembed:: Exercises/General/SequentialTreePRO.html ka


Alternative Sequential Representation
-------------------------------------

To illustrate the difficulty involved in using the sequential tree
representation for processing, consider searching for the right child
of the root node.
We must first move sequentially through the node list of the left
subtree.
Only at this point do we reach the value of the root's right child.
Clearly the sequential representation is space efficient, but not time
efficient for descending through the tree along some arbitrary path.

Assume that each node value takes a constant amount of space.
An example would be if the node value is a positive integer and
``null`` is indicated by the value zero.
From the
:ref:`Full Binary Tree Theorem <full binary tree theorem> <BinaryTreeFullThm>`,
we know that the size of the node list will be about twice the number
of nodes (i.e., the overhead fraction is 1/2).
The extra space is required by the ``null`` pointers.
We should be able to store the node list more compactly.
However, any sequential implementation must recognize when a leaf node
has been reached, that is, a leaf node indicates the end of a subtree.
One way to do this is to explicitly list with each node whether it is
an internal node or a leaf.
If a node :math:`X` is an internal node, then we know that its two
children (which may be subtrees) immediately follow :math:`X` in the
node list.
If :math:`X` is a leaf node, then the next node in the list is the
right child of some ancestor of :math:`X`, not the right child
of :math:`X`.
In particular, the next node will be the child of :math:`X` 's most
recent ancestor that has not yet seen its right child.
However, this assumes that each internal node does in fact have two
children, in other words, that the tree is
full.
Empty children must be indicated in the node list explicitly.
Assume that internal nodes are marked with a prime (') and that
leaf nodes show no mark.
Empty children of internal nodes are indicated by "/", but the (empty)
children of leaf nodes are not represented at all.
Note that a full binary tree stores no ``null`` values with this
implementation, and so requires less overhead.

.. inlineav:: SequentialTreeAltCON ss
   :output: show

Storing :math:`n` extra bits can be a considerable savings over
storing :math:`n` ``null`` values.
In the example above, each node was shown with a
mark if it is internal, or no mark if it is a leaf.
This requires that each node value has space to store the mark bit.
This might be true if, for example, the node value were stored as a
4-byte integer but the range of the values sored was small enough so
that not all bits are used.
An example would be if all node values must be positive.
Then the high-order (sign) bit of the integer value could be used as
the mark bit.

.. avembed:: Exercises/General/SequentialTreeAltPRO.html ka


Bit Vector Representation
-------------------------

Another approach is to store a separate bit vector to represent the
status of each node.
In this case, each node of the tree corresponds to one bit in the bit
vector.
A value of "1" could indicate an internal node, and "0" could indicate
a leaf node.

.. inlineav:: SequentialTreeBitsCON ss
   :output: show

.. avembed:: Exercises/General/SequentialTreeBitVectorPRO.html ka


General Tree Sequential Representation
--------------------------------------

Storing general trees by means of a sequential implementation requires
that more explicit structural information be included with the node
list.
Not only must the general tree implementation indicate whether a node
is leaf or internal, it must also indicate how many children the
node has.
Alternatively, the implementation can indicate when a node's child
list has come to an end.
The next example dispenses with marks for internal or leaf nodes.
Instead it includes a special mark (we will use the ")" symbol) to
indicate the end of a child list.
All leaf nodes are followed by a ")" symbol because they have no
children.
A leaf node that is also the last child for its parent would indicate
this by two or more successive ")" symbols.

.. inlineav:: SequentialGenTreeCON ss
   :output: show

Note that this representation for serializing general trees cannot be
used for binary trees.
This is because a binary tree is not merely a restricted form of
general tree with at most two children.
Every binary tree node has a left and a right child, though either or
both might be empty.
So this representation cannot let us distinguish whether node
:math:`D` in Figure :num:`Figure #BinExampb` is the left or right
child of node :math:`B`.

.. avembed:: Exercises/General/SequentialTreeGenTreePRO.html ka

.. odsascript:: AV/Binary/BinExampCON.js
.. odsascript:: AV/General/SequentialTreeCON.js
.. odsascript:: AV/General/SequentialTreeAltCON.js
.. odsascript:: AV/General/SequentialTreeBitsCON.js
.. odsascript:: AV/General/SequentialGenTreeCON.js
