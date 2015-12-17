.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: binary tree terminology
   :satisfies: full binary tree theorem
   :topic: Binary Trees

The Full Binary Tree Theorem
============================

Some binary tree implementations store data only at the
:term:`leaf nodes <leaf node>`,
using the :term:`internal nodes <internal node>` to provide structure
to the tree.
By definition, a leaf node does not need to store pointers to its
(empty) :term:`children <child>`.
More generally, binary tree implementations might require some amount
of space for internal nodes, and a different amount for leaf nodes.
Thus, to compute the space required by such implementations, it is
useful to know the minimum and maximum fraction of the nodes that are
leaves in a tree containing :math:`n` internal nodes.

Unfortunately, this fraction is not fixed.
A binary tree of :math:`n` internal nodes might have only one leaf.
This occurs when the internal nodes are arranged in a chain ending
in a single leaf as shown in Figure :num:`Figure #OneLeaf`.
In this example, the number of leaves is low because each
internal node has only one non-empty child.
To find an upper bound on the number of leaves for a tree of :math:`n`
internal nodes, first note that the upper bound will occur when each
internal node has two non-empty children, that is, when the tree is
full.
However, this observation does not tell what shape of tree will yield
the highest percentage of non-empty leaves.
It turns out not to matter, because all full binary trees with
:math:`n` internal nodes have the same number of leaves.
This fact allows us to compute the space requirements for a full
binary tree implementation whose leaves require a different amount of
space from its internal nodes.

.. _OneLeaf:

.. odsafig:: Images/OneLeaf.png
   :width: 150
   :align: center
   :capalign: center
   :figwidth: 90%
   :alt: A tree containing many internal nodes and a single leaf.

   A tree containing many internal nodes and a single leaf.

.. TODO::
   :type: Figure

   Replace with proper figure (OneLeaf).

.. _FullTree:

.. topic:: Theorem

   **Full Binary Tree Theorem:**
   The number of leaves in a non-empty full binary tree is one
   more than the number of internal nodes.

   **Proof:**
   The proof is by :term:`mathematical induction <proof by induction>`
   on :math:`n`, the number of internal nodes.
   This is an example of the style of induction proof
   where we reduce from an arbitrary instance of size :math:`n` to an
   instance of size :math:`n-1` that meets the induction hypothesis.

   i) **Base Cases:** The non-empty tree with zero internal nodes has
      one leaf node.
      A full binary tree with one internal node has two leaf nodes.
      Thus, the base cases for :math:`n = 0` and :math:`n = 1` conform
      to the theorem.

   ii) **Induction Hypothesis:** Assume that any full binary
       tree :math:`\mathbf{T}` containing :math:`n-1` internal nodes
       has :math:`n` leaves.

   iii) **Induction Step:**
        Given tree :math:`\mathbf{T}` with :math:`n` internal nodes,
        select an internal node :math:`I` whose children are both leaf
        nodes. 
        Remove both of :math:`I`'s children, making :math:`I` a leaf
        node.
        Call the new tree :math:`\mathbf{T}'`.
        :math:`\mathbf{T}'` has :math:`n-1` internal nodes.
        From the induction hypothesis, :math:`\mathbf{T}'` has
	:math:`n` leaves.
        Now, restore :math:`I`'s two children.
        We once again have tree :math:`\mathbf{T}` with :math:`n`
        internal nodes.
        How many leaves does :math:`\mathbf{T}` have?
        Because :math:`\mathbf{T}'` has :math:`n` leaves, adding the two
        children yields :math:`n+2`.
        However, node :math:`I` counted as one of the leaves in
        :math:`\mathbf{T}'` and has now become an internal node.
        Thus, tree :math:`\mathbf{T}` has :math:`n+1` leaf nodes and
        :math:`n` internal nodes.

   By mathematical induction the theorem holds for all values of
   :math:`n > 0`.

When analyzing the space requirements for a binary tree
implementation,
it is useful to know how many empty subtrees a tree contains.
A simple extension of the Full Binary Tree Theorem tells us exactly
how many empty subtrees there are in *any* binary tree, whether
full or not.
Here are two approaches to proving the following theorem, and
each suggests a useful way of thinking about binary trees.

.. _SubTreeThrm:

.. topic:: Theorem

   The number of empty subtrees in a non-empty binary tree is one
   more than the number of nodes in the tree.

   **Proof 1:**
   Take an arbitrary binary tree :math:`\mathbf{T}` and replace
   every empty subtree with a leaf node.
   Call the new tree :math:`\mathbf{T}'`.
   All nodes originally in :math:`\mathbf{T}` will be internal
   nodes in :math:`\mathbf{T}'` (because even the leaf nodes of
   :math:`\mathbf{T}` have children in :math:`\mathbf{T}'`).
   :math:`\mathbf{T}'` is a full binary tree, because every
   internal node of :math:`\mathbf{T}` now must have two children
   in :math:`\mathbf{T}'`, and each leaf node 
   in :math:`\mathbf{T}` must have two children in
   :math:`\mathbf{T}'` (the leaves just added).
   The Full Binary Tree Theorem tells us that the number of leaves
   in a full binary tree is one more than the number of internal
   nodes.
   Thus, the number of new leaves that were added to create
   :math:`\mathbf{T}'` is one more than the number of nodes in
   :math:`\mathbf{T}`.
   Each leaf node in :math:`\mathbf{T}'` corresponds to an
   empty subtree in :math:`\mathbf{T}`.
   Thus, the number of empty subtrees in :math:`\mathbf{T}` is one
   more than the number of nodes in :math:`\mathbf{T}`.

   **Proof 2:**
   By definition, every node in binary tree :math:`\mathbf{T}` has
   two children, for a total of :math:`2n` children in a tree of
   :math:`n` nodes.
   Every node except the root node has one parent, for a total of
   :math:`n-1` nodes with parents.
   In other words, there are :math:`n-1` non-empty children.
   Because the total number of children is :math:`2n`, the remaining
   :math:`n+1` children must be empty.
