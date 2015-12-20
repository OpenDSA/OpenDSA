.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: binary tree terminology; binary tree space requirements
   :satisfies: complete tree
   :topic: Binary Trees


Array Implementation for Complete Binary Trees
==============================================

Array Implementation for Complete Binary Trees
----------------------------------------------

From the :ref:`full binary tree theorem <BinaryTreeFullThm>`, we know
that a large fraction of the space in a typical binary tree node
implementation is devoted to structural :term:`overhead`, not to
storing data.
This module presents a simple, compact implementation
for :term:`complete binary trees <complete binary tree>`.
Recall that complete binary trees have all levels except the bottom
filled out completely, and the bottom level has all of its nodes filled
in from left to right.
Thus, a complete binary tree of :math:`n` nodes has only one possible
shape.
You might think that a complete binary tree is such an unusual
occurrence that there is no reason to develop a special
implementation for it.
However, the complete binary tree has practical uses, the most
important being the :ref:`heap <heap> <Heap>` data structure.
Heaps are often used to implement
:term:`priority queues <priority queue>` and for
:ref:`external sorting algorithms <external sort> <ExternalSort>`. 

We begin by assigning numbers to the node positions in the complete
binary tree, level by level, from left to right as shown in
Figure :num:`Figure #BinArray`.
An array can store the tree's data values efficiently, placing
each data value in the array position corresponding to that node's
position within the tree.
The table lists the array indices for the
children, parent, and siblings of each node in
Figure :num:`Figure #BinArray`.

.. _BinArray:

.. odsafig:: Images/BinArray.png
   :width: 400
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Complete binary tree node numbering

   A complete binary tree of 12 nodes, numbered starting from 0.

Here is a table that lists, for each node position, the positions of
the parent, sibling, and children of the node.

.. math::

   \begin{array}{|c|c|c|c|c|c|c|c|c|c|c|c|c|}
   \hline
   \textrm{Position} & 0  & 1 & 2 & 3 &  4 &  5 & 6 & 7 & 8 &  9 & 10 & 11\\
   \hline
   \hline
   \textrm{Parent} & \,--\, & 0 & 0 & 1 &  1 &  2 &  2 & 3 & 3 & 4 & 4 & 5\\
   \hline
   \textrm{Left Child} & 1  & 3 & 5 & 7 &  9 & 11 & \,--\, & \,--\, & \,--\, &
   \,--\, & \,--\, &  \,--\,\\
   \hline
   \textrm{Right Child} & 2  & 4 & 6 & 8 & 10 & \,--\, & \,--\, & \,--\, &
   \,--\, & \,--\, & \,--\, &  \,--\,\\
   \hline
   \textrm{Left Sibling} & \,--\, & \,--\, & 1 & \,--\, &  3 & \,--\, & 5 &
   \,--\, & 7 & \,--\, &  9 &  \,--\,\\
   \hline
   \textrm{Right Sibling} & \,--\, & 2 & \,--\, & 4 & \,--\, &  6 & \,--\, & 8 &
   \,--\, & 10 & \,--\, & \,--\,\\
   \hline
   \end{array}

Looking at the table, you should see a pattern
regarding the positions of a node's relatives within the array.
Simple formulas can be derived for calculating the array index
for each relative of a node :math:`R` from :math:`R`'s index.
No explicit pointers are necessary to reach a node's left or
right child.
This means there is no overhead to the array implementation if the
array is selected to be of size :math:`n` for a tree of :math:`n`
nodes.

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

.. avembed:: Exercises/Binary/CompleteFIB.html ka
