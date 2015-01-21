.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Sally Hamouda
   :satisfies: binary tree as a recursive data Structures
   :topic: Binary Tree as a Recursive Data Structures

.. odsalink:: AV/RecurTutor2/AdvancedRecurTutor.css

Binary Tree as a Recursive Data Structure
=========================================

Recursive data structure is a data structure that is partially composed of smaller or simpler
instances of the same data structure where the relationships identified by the structure 
provides a natural model for the recursive algorithm to work with that data. 
For example, lists and binary trees could be viewed as a recursive data structures. 
List is a recursive data structure because a list can be defined as an empty list or a node 
followed by a list. While, binary tree can be defined as an empty tree or a node 
pointing to two binary trees one on its right and the other one on its left. 
So, recursion is ideally suited to recursive data structures like lists and binary trees.


The following figure shows that a list  is a node followed by a list:
   
.. _ListRecDS:

.. inlineav:: ListRecDSCON dgm
   :align: justify


The following figure shows that a binary tree is a node 
pointing to two binary trees, one on its right and the other one on its left:

.. _BinRecDS:

.. inlineav:: BinRecDSCON dgm
   :align: justify
   
.. topic:: Example

   Suppose that we want to compute the sum of the values stored in a binary tree.
   Suppose that you are given this task. You ask two friends to help you. 
   The first one will take the left subtree to sum it.
   The second one will take the right sub tree to sum it 
   then you add the root's value and  you are done with your task.
   In order to write a recursive function that sums the values stored in a binary tree
   you need to think the same way. You don't need to think about the details of recursion.
   Just admit that your friends(In other words, the recursive calls) will return back to you
   the correct answer.

The following visualization shows the steps of computing
the sum of a binary tree by asking help from two friends.
   
.. inlineav:: SumBinaryTreeCON ss
   :output: show



.. odsascript:: AV/RecurTutor2/BinRecDSCON.js
.. odsascript:: AV/RecurTutor2/ListRecDSCON.js
.. odsascript:: AV/RecurTutor2/SumBinaryTreeCON.js
