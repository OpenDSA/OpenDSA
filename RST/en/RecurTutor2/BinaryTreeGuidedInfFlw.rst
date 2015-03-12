.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :satisfies: information flow in a binary tree
   :topic: Information Flow in a Binary


Binary Tree Guided Information Flow
===================================

:term:`Guided traversal` refers to a problem that does not require
visiting every node in the tree.
This means that the recursive function is making some decision at each
node that sometimes lets it avoid visiting one or both of its
children.
The decision is typically based on the value of the current node.
Many problems that require information flow on binary search
trees are considered to be guided.


.. topic:: Example

Problem: Given a BST, find out the minimum value.
A bad solution to this problem would visit every node of the tree.
However, we can take advantage of the BST property to
avoid visiting most nods in the tree.
You know that the values greater than the root are always in the right
subtree, and those values less than the root are in the left subtree.
Thus, at each node we need only visit the left subtree until we reach
a leaf node.

.. inlineav:: IneffBinaryTreeRangeCON ss
   :output: show


Practice the guided information flow through the following programming
exercises.

.. avembed:: Exercises/RecurTutor2/BinaryTreeGuidedSumm.html ka


.. odsascript:: AV/RecurTutor2/IneffBinaryTreeRangeCON.js
