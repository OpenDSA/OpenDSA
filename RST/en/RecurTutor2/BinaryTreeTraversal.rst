.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: binary tree terminology; recursion
   :satisfies: binary tree traversal
   :topic: Binary Trees

.. odsalink:: AV/Binary/BinExampCON.css
.. odsalink:: AV/Binary/BTCON.css
.. odsalink:: AV/RecurTutor2/AdvancedRecurTutor.css

Binary Tree Traversals
======================
Types of Traversals
-------------------
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

Here are some exercises to practice the traversals.

.. avembed:: AV/Binary/btTravInorderPRO.html pe

.. avembed:: AV/Binary/btTravPostorderPRO.html pe

.. avembed:: AV/Binary/btTravPreorderPRO.html pe


Writing a Recursive Method to Traverse a Binary Tree
----------------------------------------------------

When writing a recursive method to solve a problem that requires traversing a binary tree,
we want to make sure that we are visiting "exactly" the required nodes (no more and no less).

Recall that for any recursive function you should learn two skills:

 #. Formulate the base case and its action.
 #. Formulate the recursive case and its action.


Formulate the base case and its action
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In binary trees, in many binary tree types the base case is to check if we have an empty tree.
One of the common mistakes some people does is considering that the base case
action will be executed only after the recursive calls are executed.
This is not always the case because you may have your input as an empty tree
from the very beginning and in that case no recursive calls will be executed
before the base case action. Make sure when you write a program that traverse a binary tree
to check in the base case if the root of the binary is null (In that case the given tree is empty).

The action that the base case will execute is dependable on the given problem.
For example, if it is required to count the nodes then the base case action will be returning 0.
While, if it is required to check on the existence of a value or not then the base case action 
in this case will return false because the given binary tree is empty.


Formulate the recursive case and its action
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Always remember that you should not worry about the recursion details.
Admit that it will do it correctly. So, when your recursive case action
is to  visit recursively the right and left children this means that every node will do that.
You don't need to worry about making sure that every node will do it.

Some problems requires that you traverse the whole tree, in those
problems you must make sure that your function is working for the left and right sides of the tree.
Some other problems requires only traversing the left or the right side
of the tree. You have to make sure that you visit exactly the nodes that are needed by the problem.

An issue to consider when designing a traversal is how to
define the visitor function that is to be executed on every node.
One approach is simply to write a new version of the traversal for
each such visitor function as needed.
The disadvantage to this is that whatever function does the traversal
must have access to the ``BinNode`` class.
It is probably better design to permit only the tree class to have
access to the ``BinNode`` class.

Another approach is for the tree class to supply a generic traversal
function that takes the visitor as a function parameter.
This is known as the
:term:`visitor design pattern`.
A major constraint on this approach is that the
:term:`signature` for all visitor functions, that is,
their return type and parameters, must be fixed in advance.
Thus, the designer of the generic traversal function must be able to
adequately judge what parameters and return type will likely be needed
by potential visitor functions.

.. odsascript:: AV/Binary/BinExampCON.js
.. odsascript:: AV/Binary/inorderCON.js
.. odsascript:: AV/Binary/preorderCON.js
.. odsascript:: AV/Binary/postorderCON.js
