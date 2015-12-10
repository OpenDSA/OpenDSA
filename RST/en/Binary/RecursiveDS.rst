.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Sally Hamouda
   :satisfies: binary tree as a recursive data Structures
   :topic: Binary Tree as a Recursive Data Structures

.. odsalink:: AV/Binary/RecursiveDSCON.css

Binary Tree as a Recursive Data Structure
=========================================

Binary Tree as a Recursive Data Structure
-----------------------------------------

A :term:`recursive data structure` is a data structure that is partially
composed of smaller or simpler instances of the same data structure.
For example, :term:`linked lists <linked list>` and
:term:`binary trees <binary tree>` can be viewed as recursive
data structures. 
A list is a recursive data structure because a list can be defined as
either (1) an empty list or (2) a node followed by a list.
A binary tree is typically defined as
(1) an empty tree or
(2) a node pointing to two binary trees, one its left child and the
other one its right child.

.. _ListRecDS:

.. inlineav:: ListRecDSCON dgm
   :align: justify


.. _BinRecDS:

.. inlineav:: BinRecDSCON dgm
   :align: justify
   
The recursive relationships used to define a structure provide a
natural model for any recursive algorithm on the structure.

.. inlineav:: SumBinaryTreeCON ss
   :output: show

.. odsascript:: AV/Binary/ListRecDSCON.js
.. odsascript:: AV/Binary/BinRecDSCON.js
.. odsascript:: AV/Binary/SumBinaryTreeCON.js
