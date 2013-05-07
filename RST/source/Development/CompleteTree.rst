.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Binary Trees


Array Implementation for Complete Binary Trees [Text]
=====================================================

Module :numref:`<BinaryTreeImpl>` explains how a large
fraction of the space in a typical binary tree node implementation is
devoted to structural overhead, not to storing data.
This module presents a simple, compact implementation
for complete binary trees.
Recall that complete binary trees have all levels except the bottom
filled out completely, and the bottom level has all of its nodes filled
in from left to right.
Thus, a complete binary tree of :math:`n<` nodes has only one possible
shape.
You might think that a complete binary tree is such an unusual
occurrence that there is no reason to develop a special
implementation for it.
However, the complete binary tree has practical uses, the most
important being the heap data structure discussed in
Module :numref:`<Heaps>`.
Heaps are often used to implement priority queues
and for external sorting algorithms.

We begin by assigning numbers to the node positions in the complete
binary tree, level by level, from left to right as shown in
Figure :num:`Figure #BinArray` (a). 
An array can store the tree's data values efficiently, placing
each data value in the array position corresponding to that node's
position within the tree.
Figure :num:`Figure #BinArray` (b) lists the array indices for the
children, parent, and siblings of each node in
Figure :num:`Figure #BinArray` (a).
From Figure :num:`Figure #BinArray` (b), you should see a pattern
regarding the positions of a node's relatives within the array.
Simple formulas can be derived for calculating the array index
for each relative of a node :math:`R` from :math:`R`'s index.
No explicit pointers are necessary to reach a node's left or
right child.
This means there is no overhead to the array implementation if the
array is selected to be of size :math:`n` for a tree of :math:`n`
nodes.

.. _BinArray:

.. odsafig:: Images/BinArray.png
   :width: 400
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Complete binary tree stored in an array

   A complete binary tree and its array implementation.
   (a) The complete binary tree with twelve nodes.
   Each node has been labeled with its position in the tree.
   (b) The positions for the relatives of each node.
   A dash indicates that the relative does not exist.

.. TODO::
   :type: Figure

   Generate image for Figure 5.12(b) from table.


The formulae for calculating the array indices of the various
relatives of a node are as follows.
The total number of nodes in the tree is :math:`n`.
The index of the node in question is :math:`r`,
which must fall in the range 0 to :math:`n-1`.

* Parent(:math:`r`) :math:`= \lfloor(r - 1)/2\rfloor`
  if :math:`r \neq 0`.

* Left child(:math:`r`) :math:`= 2r + 1` if :math:`2r + 1 \leq n`.

* Right child(:math:`r`) :math:`= 2r + 2` if :math:`2r + 2 \leq n`.

* Left sibling(:math:`r`) :math:`= r - 1` if :math:`r` is even.

* Right sibling(:math:`r`) :math:`= r + 1` if :math:`r`
  is odd and :math:`r + 1 \leq n`.
