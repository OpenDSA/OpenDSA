.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

===================
Binary Trees Part 1
===================

Binary Trees Part 1
-------------------

.. slide:: Binary Trees

   .. odsalink:: AV/Binary/BinExampCON.css

   A binary tree is made up of a finite set of nodes that is either
   empty or consists of a node called the root together with two
   binary trees, called the left and right subtrees, which are
   disjoint from each other and from the root.

   Notation: Node, children, edge, parent, ancestor, descendant, path,
   depth, height, level, leaf node, internal node, subtree.

   .. inlineav:: BinExampCON dgm
      :align: justify

   .. odsascript:: AV/Binary/BinExampCON.js


.. slide:: A Recursive Data Structure

   .. odsalink:: AV/Binary/RecursiveDSCON.css

   .. inlineav:: ListRecDSCON dgm
      :align: justify

   .. inlineav:: BinRecDSCON dgm
      :align: justify

   .. odsascript:: AV/Binary/ListRecDSCON.js
   .. odsascript:: AV/Binary/BinRecDSCON.js


.. slide:: Binary Tree Node Class

   .. codeinclude:: Binary/BinNode
      :tag: BinNode


.. slide:: Question

   * Write a recursive function named **count** that, given the root to a
     binary tree, returns a count of the number of nodes in the
     tree. Function **count** should have the following prototype::

        int count(BinNode root)


.. slide:: Traversals

   * Any process for visiting the nodes in some order is called a
     **traversal**.

   * Any traversal that lists every node in the tree exactly once is called
     an **enumeration** of the tree's nodes.

   * Preorder traversal: Visit each node before visiting its children.

   * Postorder traversal: Visit each node after visiting its children.

   * Inorder traversal: Visit the left subtree, then the node, then the
     right subtree.


.. slide:: Preorder Traversal (1)

   .. codeinclude:: Binary/Preorder
      :tag: preorder

.. slide:: Preorder Traversal (2)

   .. odsalink:: AV/Binary/BTCON.css

   .. inlineav:: preorderCON ss
      :output: show

   .. odsascript:: AV/Binary/preorderCON.js


.. slide:: How not to write a traversal

   .. codeinclude:: Binary/Preorder
      :tag: preorder2


.. slide:: Recursion Examples

   .. odsalink:: AV/Binary/WriteTrav.css

   .. codeinclude:: Binary/Traverse
      :tag: count

   .. inlineav:: BinaryTreeMistakesCON ss
      :output: show

   .. odsascript:: AV/Binary/BinaryTreeMistakesCON.js
