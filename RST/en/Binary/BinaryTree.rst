.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: binary tree intro
   :satisfies: binary tree terminology
   :topic: Binary Trees

.. odsalink:: AV/Binary/BinExampCON.css
.. odsalink:: AV/Binary/BinDiffCON.css
.. odsalink:: AV/Binary/FullCompCON.css

Binary Trees
============

Definitions and Properties
--------------------------

A :term:`binary tree` is made up of a finite set of elements
called :term:`nodes <node>`.
This set either is empty or consists of a node called the
:term:`root` together with two binary trees, called the left and
right 
:term:`subtrees <subtree>`, which are disjoint from each other and
from the root.
(Disjoint means that they have no nodes in common.)
The roots of these subtrees are
:term:`children <child>` of the root.
There is an :term:`edge` from a node to each of its children,
and a node is said to be the :term:`parent` of its children.

If :math:`n_1, n_2, ..., n_k`
is a sequence of nodes in the tree such
that :math:`n_i` is the parent of
:math:`n_i+1` for :math:`1 \leq i < k`,
then this sequence is called a :term:`path` from
:math:`n_1` to :math:`n_k`.
The :term:`length` of the path is :math:`k-1`.
If there is a path from node :math:`R` to node :math:`M`,
then :math:`R` is an :term:`ancestor` of :math:`M`, and
:math:`M` is a :term:`descendant` of :math:`R`.
Thus, all nodes in the tree are descendants of the root of the tree,
while the root is the ancestor of all nodes.
The :term:`depth` of a node :math:`M` in the tree is the length
of the path from the root of the tree to :math:`M`.
The :term:`height` of a tree is one more than the depth of the
deepest node in the tree.
All nodes of depth :math:`d` are at
:term:`level` :math:`d` in the tree.
The root is the only node at level 0, and its depth is 0.
A :term:`leaf node` is any node that has two empty children.
An :term:`internal node` is
any node that has at least one non-empty child.

.. _BinExample:

.. inlineav:: BinExampCON dgm
   :align: justify

   A binary tree.
   Node :math:`A` is the root.
   Nodes :math:`B` and :math:`C` are :math:`A`'s children.
   Nodes :math:`B` and :math:`D` together form a subtree.
   Node :math:`B` has two children:
   Its left child is the empty tree and its right child is :math:`D`.
   Nodes :math:`A`, :math:`C`, and :math:`E` are ancestors of
   :math:`G`.
   Nodes :math:`D`, :math:`E`, and :math:`F` make up level 2 of
   the tree;
   node :math:`A` is at level 0.
   The edges from :math:`A` to :math:`C` to :math:`E` to :math:`G`
   form a path of length 3.
   Nodes :math:`D`, :math:`G`, :math:`H`, and :math:`I` are leaves.
   Nodes :math:`A`, :math:`B`, :math:`C`, :math:`E`, and
   :math:`F` are internal nodes.
   The depth of :math:`I` is 3.
   The height of this tree is 4.

.. _BinDiff:

.. inlineav:: BinDiffCON dgm
   :align: justify

   Two different binary trees.
   (a) A binary tree whose root has a non-empty left child.
   (b) A binary tree whose root has a non-empty right child.
   (c) The binary tree of (a) with the missing right child made explicit.
   (d) The binary tree of (b) with the missing left child made explicit.

Figure :num:`Figure #BinExample` illustrates the various terms used to
identify parts of a binary tree.
Figure :num:`Figure #BinDiff` illustrates an important point regarding
the structure of binary trees.
Because *all* binary tree nodes have two children
(one or both of which might be empty), the two binary
trees of Figure :num:`Figure #BinDiff` are *not* the same.

Two restricted forms of binary tree are sufficiently
important to warrant special names.
Each node in a :term:`full binary tree <full tree>`
is either (1) an internal node with exactly two non-empty children or
(2) a leaf.
A :term:`complete binary tree` has a restricted shape obtained by
starting at the root and filling the tree by levels from left to
right.
In the complete binary tree of height :math:`d`, all levels
except possibly level :math:`d-1` are completely full.
The bottom level has its nodes filled in from the left side.

.. _FullComplete:

.. inlineav:: FullCompCON dgm
   :align: center

   Examples of full and complete binary trees.

Figure :num:`Figure #FullComplete` illustrates the differences between
full and complete binary trees. [#]_
There is no particular relationship between these two tree shapes;
that is, the tree of Figure :num:`Figure #FullComplete` (a) is full
but not complete while the tree of Figure :num:`Figure #FullComplete`
(b) is 
complete but not full.
The :ref:`heap <heap> <Heaps>` data structure is an example
of a complete binary tree.
The :ref:`Huffman coding tree <Huffman coding tree> <Huffman>`
is an example of a full binary tree.

.. [#] While these definitions for full and complete binary tree are
       the ones most commonly used, they are not universal.
       Because the common meaning of the words "full" and "complete"
       are quite similar, there is little that you can do to
       distinguish between them other than to memorize the
       definitions.
       Here is a memory aid that you might find useful:
       "Complete" is a wider word than "full", and complete binary
       trees tend to be wider than full binary trees because each
       level of a complete binary tree is as wide as possible.

.. avembed:: Exercises/Binary/DefSumm.html ka


Practice Questions
------------------

.. avembed:: Exercises/Binary/Treeprobs.html ka

.. odsascript:: AV/Binary/BinExampCON.js
.. odsascript:: AV/Binary/BinDiffCON.js
.. odsascript:: AV/Binary/FullCompCON.js
