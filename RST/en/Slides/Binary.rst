.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

============
Binary Trees
============

.. slide:: Binary Trees

   A binary tree is made up of a finite set of nodes that is either
   empty or consists of a node called the root together with two
   binary trees, called the left and right subtrees, which are
   disjoint from each other and from the root.

   Notation: Node, children, edge, parent, ancestor, descendant, path,
   depth, height, level, leaf node, internal node, subtree.


.. slide:: Full and Complete Binary Trees

   .. odsalink:: AV/Binary/FullCompCON.css

   Full binary tree: Each node is either a leaf or internal node with
   exactly two non-empty children.

   Complete binary tree: If the height of the tree is :math:`d`,
   then all leaves except possibly level :math:`d` are completely
   full.
   The bottom level has all nodes to the left side.

   .. inlineav:: FullCompCON dgm
      :align: center

   .. odsascript:: AV/Binary/FullCompCON.js

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


.. slide:: Binary Tree Node Class

   .. codeinclude:: Binary/BinNode
      :tag: BinNode


.. slide:: Traversals (1)

   .. rst-class:: build

   * Any process for visiting the nodes in some order is called a
     **traversal**.

   * Any traversal that lists every node in the tree exactly once is called
     an **enumeration** of the tree's nodes.

   * Preorder traversal: Visit each node before visiting its children.

   * Postorder traversal: Visit each node after visiting its children.

   * Inorder traversal: Visit the left subtree, then the node, then the
     right subtree.


.. slide:: Traversals (2)

   .. rst-class:: build

      .. codeinclude:: Binary/Preorder
         :tag: preorder

      .. codeinclude:: Binary/Preorder
         :tag: preorder2


.. slide:: Recursion Examples

   .. odsalink:: AV/Binary/WriteTrav.css

   .. rst-class:: build

      .. codeinclude:: Binary/Traverse
         :tag: count

      .. inlineav:: BinaryTreeMistakesCON ss
         :output: show

      .. odsascript:: AV/Binary/BinaryTreeMistakesCON.js


.. slide:: Binary Tree Implementation (1)

   .. odsafig:: Images/BinLink.png
      :width: 300
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: Binary tree node implementation


.. slide:: Binary Tree Implementation (2)

   .. odsafig:: Images/DiffNode.png
      :width: 300
      :align: center
      :capalign: center
      :figwidth: 90%
      :alt: Expression Tree


.. slide:: Inheritance (1)

   .. codeinclude:: Binary/ExpressionTree
      :tag: ExpressionTree1

.. slide:: Inheritance (2)

   .. codeinclude:: Binary/ExpressionTree
      :tag: ExpressionTree2


.. slide:: Inheritance (3)

   .. odsalink:: AV/Binary/BTCON.css

   .. inlineav:: expressionTraversalCON ss
      :output: show

   .. odsascript:: AV/Binary/expressionTraversalCON.js

.. slide:: Design Patterns

   Design patterns capture reusable pieces of design wisdom.

   Goals:

   * Quickly communicate design wisdom to new designers
   * Give a shared vocabulary to designers


.. slide:: Composite (1)

   .. codeinclude:: Binary/ExpressionTreeC
      :tag: Composite1


.. slide:: Composite (2)

   .. codeinclude:: Binary/ExpressionTreeC
      :tag: Composite2

.. slide:: Composite (3)

   .. codeinclude:: Binary/ExpressionTreeC
      :tag: Composite3
