.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

===================
Binary Trees Part 1
===================

Binary Trees
------------

.. revealjs-slide::

* A binary tree is made up of a finite set of nodes that is either
  empty or consists of a node called the root together with two
  binary trees, called the left and right subtrees, which are
  disjoint from each other and from the root.

* Notation: Node, children, edge, parent, ancestor, descendant, path,
  depth, height, level, leaf node, internal node, subtree.

.. inlineav:: BinExampCON dgm
   :links: AV/Binary/BinExampCON.css
   :scripts: AV/Binary/BinExampCON.js
   :align: center


A Recursive Data Structure
--------------------------

.. revealjs-slide::

.. inlineav:: ListRecDSCON dgm
   :links: AV/Binary/RecursiveDSCON.css
   :scripts: AV/Binary/ListRecDSCON.js
   :align: justify

.. inlineav:: BinRecDSCON dgm
   :links: AV/Binary/RecursiveDSCON.css
   :scripts: AV/Binary/BinRecDSCON.js
   :align: justify


Binary Tree Node Class
----------------------

.. revealjs-slide::

.. codeinclude:: Binary/BinNode
   :tag: BinNode


Question
--------

.. revealjs-slide::

* Write a recursive function named **count** that, given the root to a
  binary tree, returns a count of the number of nodes in the
  tree. Function **count** should have the following prototype::

     int count(BinNode root)


Traversals
----------

.. revealjs-slide::

* Any process for visiting the nodes in some order is called a
  **traversal**.

* Any traversal that lists every node in the tree exactly once is called
  an **enumeration** of the tree's nodes.

* Preorder traversal: Visit each node before visiting its children.

* Postorder traversal: Visit each node after visiting its children.

* Inorder traversal: Visit the left subtree, then the node, then the
  right subtree.


Preorder Traversal (1)
----------------------

.. revealjs-slide::

.. codeinclude:: Binary/Preorder
   :tag: preorder

Preorder Traversal (2)
----------------------

.. revealjs-slide::

.. inlineav:: preorderCON ss
   :long_name: Preorder Traversal Slideshow
   :links: AV/Binary/BTCON.css
   :scripts: AV/Binary/preorderCON.js
   :output: show


How not to write a traversal
----------------------------

.. revealjs-slide::

.. codeinclude:: Binary/Preorder
   :tag: preorder2

* Problems:

  * This has a major bug
  * It puts the focus in the wrong place: Should focus on the
    current node, not the children. This version is therefore more
    complicated. 

Recursion Examples
------------------

.. revealjs-slide::

.. codeinclude:: Binary/Traverse
   :tag: count

.. inlineav:: BinaryTreeMistakesCON ss
   :long_name: Binary Tree Common Mistakes Slideshow
   :links: AV/Binary/WriteTrav.css
   :scripts: AV/Binary/BinaryTreeMistakesCON.js
   :output: show
