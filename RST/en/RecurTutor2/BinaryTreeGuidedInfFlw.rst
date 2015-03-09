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

Guided traversal problems does not require visiting every node.
What you really want to get at is that some problems do not require visiting 
every node. This means that they don't go down certain branches. 
In such a case, a decision is being made about whether to process a subtree, or not to 
process that subtree. That is often based on the value of the current node.
Most of the problems that requires information flow on binary search  trees are considered 
to be guided.


.. topic:: Example

   Given a binary search tree, find out the minimum value. Your solution to this problem
   can visit every single node in the binary search tree without benefiting from the binary
   search tree property that can make you avoid visiting many nodes in most of the cases.
   So, you know that the values greater than the root are always on the right sub-tree.
   Given that you want the minimum so why will you ever need to traverse any of the right sub-trees
   when you know that the minimum value is in a left sub-tree. 
   This was explained in the previous visulization.
   

The following visualization shows an example of a code that does redundant visit to solve the problem
of getting the number of nodes falling in a certain given range in a binary search tree (BST).
The code in the visualization works correctly but it is NOT an efficient code because
it does redundant/unnecessary nodes visits.

.. inlineav:: IneffBinaryTreeRangeCON ss
   :output: show


Practice the guided information flow through the following programming exercises.

.. avembed:: Exercises/RecurTutor2/BinaryTreeGuidedSumm.html ka


.. odsascript:: AV/RecurTutor2/IneffBinaryTreeRangeCON.js
