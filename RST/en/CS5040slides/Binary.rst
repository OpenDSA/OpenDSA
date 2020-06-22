.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
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

   A binary tree is made up of a finite set of nodes that is either
   empty or consists of a node called the root together with two
   binary trees, called the left and right subtrees, which are
   disjoint from each other and from the root.

   Notation: Node, children, edge, parent, ancestor, descendant, path,
   depth, height, level, leaf node, internal node, subtree.

   .. inlineav:: BinExampCON dgm
      :links: AV/Binary/BinExampCON.css
      :scripts: AV/Binary/BinExampCON.js
      :align: center


.. slide:: A Recursive Data Structure

   .. inlineav:: ListRecDSCON dgm
      :links: AV/Binary/RecursiveDSCON.css
      :scripts: AV/Binary/ListRecDSCON.js
      :align: justify

   .. inlineav:: BinRecDSCON dgm
      :links: AV/Binary/RecursiveDSCON.css
      :scripts: AV/Binary/BinRecDSCON.js
      :align: justify


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
      :long_name: Preorder Traversal Slideshow
      :links: AV/Binary/BTCON.css
      :scripts: AV/Binary/preorderCON.js
      :output: show


.. slide:: How not to write a traversal

   .. codeinclude:: Binary/Preorder
      :tag: preorder2

   | Problems:
   |    1. This has a major bug
   |    2. It puts the focus in the wrong place: Should focus on the
           current node, not the children. This version is therefore more
           complicated. 

.. slide:: Recursion Examples

   .. odsalink:: AV/Binary/WriteTrav.css

   .. codeinclude:: Binary/Traverse
      :tag: count

   .. inlineav:: BinaryTreeMistakesCON ss
      :long_name: Binary Tree Common Mistakes Slideshow
      :links: AV/Binary/WriteTrav.css
      :scripts: AV/Binary/BinaryTreeMistakesCON.js
      :output: show


.. slide:: Full and Complete Binary Trees

   Full binary tree: Each node is either a leaf or internal node with
   exactly two non-empty children.

   Complete binary tree: If the height of the tree is :math:`d`,
   then all leaves except possibly level :math:`d` are completely
   full.
   The bottom level has all nodes to the left side.

   .. inlineav:: FullCompCON dgm
      :links: AV/Binary/FullCompCON.css
      :scripts: AV/Binary/FullCompCON.js
      :align: center


.. slide:: Full Binary Tree Theorem (1)

   **Theorem:** The number of leaves in a non-empty full binary tree
   is one more than the number of internal nodes.

   **Proof** (by Mathematical Induction):

   **Base case:** A full binary tree with 1 internal node must have
   two leaf nodes.

   **Induction Hypothesis:** Assume any full binary tree **T** containing
   :math:`n-1` internal nodes has :math:`n` leaves.


.. slide:: Full Binary Tree Theorem (2)

   **Induction Step:** Given tree **T** with :math:`n` internal nodes,
   pick internal node :math:`I` with two leaf children.
   Remove :math:`I`'s children, call resulting tree **T'**.

   By induction hypothesis, **T'** is a full binary tree with :math:`n`
   leaves.

   Restore :math:`I`'s two children.
   The number of internal nodes has now gone up by 1 to reach
   :math:`n`.
   The number of leaves has also gone up by 1.


.. slide:: Full Binary Tree Corollary

   **Theorem:** The number of null pointers in a non-empty tree is one
   more than the number of nodes in the tree.

   **Proof:** Replace all null pointers with a pointer to an empty leaf
   node.  This is a full binary tree.


.. slide:: Dictionary

   .. codeinclude:: Design/Dictionary
      :tag: DictionaryADT


.. slide:: .

   .


.. slide:: Dictionary (2)

   * How can we implement a dictionary?

      * We know about array-based lists and linked lists.
      * They might be sorted or unsorted.
      * What are the pros and cons?
