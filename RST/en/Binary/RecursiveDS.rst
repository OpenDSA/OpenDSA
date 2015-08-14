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

A recursive data structure is a data structure that is partially
composed of smaller or simpler instances of the same data structure
where the relationships identified by the structure provides a natural
model for the recursive algorithm to work with that data.
For example, lists and binary trees could be viewed as a recursive
data structures. 
A list is a recursive data structure because a list can be defined as
either (1) an empty list or (2) a node followed by a list.
A binary tree can be defined as (1) an empty tree or
(2) a node pointing to two binary trees, one on its right and the
other one on its left.
Here are examples of a recursive view of data structures.

.. _ListRecDS:

.. inlineav:: ListRecDSCON dgm
   :align: justify


.. _BinRecDS:

.. inlineav:: BinRecDSCON dgm
   :align: justify
   
Recursive definitions for data structures naturally lead to recursive
implementations for algorithms on those data structures.

.. topic:: Example

   Suppose that we want to compute the sum of the values for all nodes
   in a binary tree. 
   You could ask two friends to help you. 
   The first one will take the left subtree and sum its nodes' values.
   The second one will take the right sub tree and sum its nodes' values.
   Then you add the root's value to those two sums, and you are done
   with your task.
   A recursive function to sum the values for all nodes in a binary
   tree works in exactly this way.
   You don't need to think about the details of recursion.
   Just accept that your friends (the recursive calls) will return
   back to you the correct answer for what they do.

.. inlineav:: SumBinaryTreeCON ss
   :output: show

.. odsascript:: AV/RecurTutor2/BinRecDSCON.js
.. odsascript:: AV/RecurTutor2/ListRecDSCON.js
.. odsascript:: AV/RecurTutor2/SumBinaryTreeCON.js
