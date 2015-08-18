.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Sally Hamouda
   :satisfies: binary tree as a recursive data Structures
   :topic: Binary Tree as a Recursive Data Structures

.. odsalink:: AV/Binary/RecursiveDSCON.css

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

.. inlineav:: SumBinaryTreeCON ss
   :output: show

.. odsascript:: AV/Binary/ListRecDSCON.js
.. odsascript:: AV/Binary/BinRecDSCON.js
.. odsascript:: AV/Binary/SumBinaryTreeCON.js
