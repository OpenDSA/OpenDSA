.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: binary tree terminology; recursion
   :satisfies: binary tree traversal
   :topic: Binary Trees

.. odsalink:: AV/Binary/BinExampCON.css
.. odsalink:: AV/Binary/BTCON.css

Binary Tree Traversals
======================

Binary Tree Traversals
----------------------

Often we wish to process a binary tree by "visiting" each of its
nodes, each time performing a specific action such as printing the
contents of the node.
Any process for visiting all of the nodes in some order is
called a :term:`traversal`.
Any traversal that lists every node in the tree exactly once is
called an :term:`enumeration` of the tree's nodes.
Some applications do not require that the nodes be visited in any
particular order as long as each node is visited precisely once.
For other applications, nodes must be visited in an order that
preserves some relationship.


Preorder Traversal
~~~~~~~~~~~~~~~~~~

For example, we might wish to make sure that we visit any given node
*before* we visit its children.
This is called a :term:`preorder traversal`.

.. _BinTravExample:

.. inlineav:: BinExampCON dgm
   :align: center

   A binary tree for traversal examples.


.. topic:: Example

   The preorder enumeration for the tree of
   Figure :num:`Figure #BinTravExample` is
   **A B D C E G F H I**.

   The first node printed is the root.
   Then all nodes of the left subtree are printed (in preorder) before
   any node of the right subtree.

.. inlineav:: preorderCON ss
   :output: show


Postorder Traversal
~~~~~~~~~~~~~~~~~~~

Alternatively, we might wish to visit each node only
*after* we visit its children (and their subtrees).
For example, this would be necessary if we wish to return all nodes
in the tree to free store.
We would like to delete the children of a node before deleting the
node itself.
But to do that requires that the children's children be deleted
first, and so on.
This is called a :term:`postorder traversal`.

.. topic:: Example

   The postorder enumeration for the tree of
   Figure :num:`Figure #BinTravExample` is
   **D B G E H I F C A**.

.. inlineav:: postorderCON ss
   :output: show


Inorder Traversal
~~~~~~~~~~~~~~~~~

An :term:`inorder traversal` first visits the left child
(including its entire subtree), then visits the node, and finally
visits the right child (including its entire
subtree).
The :ref:`binary search tree <binary search tree> <BST>` makes use of
this traversal to print all nodes in ascending order of value.

.. topic:: Example

   The inorder enumeration for the tree of
   Figure :num:`Figure #BinTravExample` is
   **B D A G E C H F I**.

.. inlineav:: inorderCON ss
   :output: show


Implementation
--------------

Now we will discuss some implementations for the traversals, but we
need to define a node ADT to work with.
Just as a linked list is composed of a collection of link objects, a
tree is composed of a collection of node objects.
Here is an ADT for binary tree nodes, called ``BinNode``.
This class will be used by some of the binary tree structures
presented later.
Member functions are provided that set or return the element value,
return a pointer to the left child,
return a pointer to the right child,
or indicate whether the node is a leaf.

.. codeinclude:: Binary/BinNode
   :tag: BinNode

A traversal routine is naturally written as a recursive
function.
Its input parameter is a pointer to a node which we will call
``rt`` because each node can be viewed as the root of a some
subtree.
The initial call to the traversal function passes in a pointer to the
root node of the tree.
The traversal function visits ``rt`` and its children (if any) 
in the desired order.
For example, a preorder traversal specifies that ``rt`` be
visited before its children.
This can easily be implemented as follows.

.. codeinclude:: Binary/Preorder
   :tag: preorder

Function ``preorder`` first checks that the tree is not
empty (if it is, then the traversal is done and ``preorder``
simply returns).
Otherwise, ``preorder`` makes  a call to ``visit``,
which processes the root node (i.e., prints the value or performs
whatever computation as required by the application).
Function ``preorder`` is then called recursively on the left
subtree, which will visit all nodes in that subtree.
Finally, ``preorder`` is called on the right subtree,
visiting all nodes in the right subtree.
Postorder and inorder traversals are similar.
They simply change the order in which the node and its children are
visited, as appropriate.

.. avembed:: AV/Binary/btTravInorderPRO.html pe


Postorder Traversal Practice
----------------------------

.. avembed:: AV/Binary/btTravPostorderPRO.html pe


Preorder Traversal Practice
---------------------------

.. avembed:: AV/Binary/btTravPreorderPRO.html pe


Summary Questions
-----------------

.. avembed:: Exercises/Binary/TravSumm.html ka

.. odsascript:: AV/Binary/BinExampCON.js
.. odsascript:: AV/Binary/inorderCON.js
.. odsascript:: AV/Binary/preorderCON.js
.. odsascript:: AV/Binary/postorderCON.js
