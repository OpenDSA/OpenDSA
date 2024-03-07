.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Sally Hamouda and Cliff Shaffer
   :requires:  recursive function information flow
   :satisfies:
   :topic: Advanced Recursion
   :keyword: Binary Tree Traversals; Recursive Tree Functions


A Hard Information Flow Problem
===============================

Sometimes, passing the right information up and down the tree to
control a recursive function gets complicated.
The information flow itself is simple enough, but deciding what to
pass might be tricky.

A more difficult example is illustrated by the following problem.
Given an arbitrary binary tree we wish to determine if,
for every node :math:`A`, are all nodes in :math:`A`'s left
subtree less than the value of :math:`A`, and are all nodes in
:math:`A`'s right subtree greater than the value of :math:`A`?
(This happens to be the definition for a binary search tree.)
Unfortunately, to make this decision we need to know some context
that is not available just by looking at the node's parent or
children.

.. _BSTCheckFig:

.. inlineav:: BSTCheckCON dgm
   :links: AV/BTRecurTutor/BSTCheckCON.css
   :scripts: AV/BTRecurTutor/BSTCheckCON.js
   :align: justify
   :keyword: Binary Tree Traversals; Recursive Tree Functions

   To be a binary search tree, the left child of the node with value
   40 must have a value between 20 and 40.

As shown by Figure :num:`Figure #BSTCheckFig`,
it is not enough to verify that :math:`A`'s left child has a value
less than that of :math:`A`, and that :math:`A`'s right child
has a greater value.
Nor is it enough to verify that :math:`A` has a value consistent
with that of its parent.
In fact, we need to know information about what range of values is
legal for a given node.
That information might come from any of the node's ancestors.
Thus, relevant range information must be passed down the tree.
We can implement this function as follows.

.. codeinclude:: Binary/checkBST
   :tag: checkBST
