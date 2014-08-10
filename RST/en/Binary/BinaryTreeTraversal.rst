.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: binary tree terminology; recursion
   :satisfies: binary tree traversal
   :topic: Binary Trees

Binary Tree Traversals
======================

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

.. odsafig:: Images/BinExamp.png
   :width: 200
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: An example binary tree

   A binary tree for traversal examples.

.. topic:: Example

   The preorder enumeration for the tree of
   Figure :num:`Figure #BinTravExample` is
   **A B D C E G F H I**.

   The first node printed is the root.
   Then all nodes of the left subtree are printed (in preorder) before
   any node of the right subtree.

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

An important decision in the implementation of any recursive function
on trees is when to check for an empty subtree.
Function ``preorder`` first checks to see if the value for
``rt`` is ``null``.
If not, it will recursively call itself on the left and right children
of ``rt``.
In other words, ``preorder`` makes no attempt to avoid calling
itself on an empty child.
Some programmers use an alternate design in which the left and
right pointers of the current node are checked so that the recursive
call is made only on non-empty children.
Such a design typically looks as follows

.. codeinclude:: Binary/Preorder
   :tag: preorder2

At first it might appear that ``preorder2`` is more efficient
than ``preorder``, because it makes only half as many recursive
calls (since it won't try to call on a null pointer).
On the other hand, ``preorder2`` must access the left and right
child pointers twice as often.
The net result is that there is no performance improvement.

In reality, the design of ``preorder2`` is inferior to
that of ``preorder`` for two reasons.
First, while it is not apparent in this simple example,
for more complex traversals it can become awkward to place the check
for the ``null`` pointer in the calling code.
Even here we had to write two tests for ``null``,
rather than the one needed by ``preorder``.
The more important concern with ``preorder2`` is that it
tends to be error prone.
While ``preorder2`` insures that no recursive
calls will be made on empty subtrees, it will fail if the initial call
passes in a ``null`` pointer.
This would occur if the original tree is empty.
To avoid the bug, either ``preorder2`` needs
an additional test for a ``null`` pointer at the beginning
(making the subsequent tests redundant after all), or the caller of
``preorder2`` has a hidden obligation to
pass in a non-empty tree, which is unreliable design.
The net result is that many programmers forget to test for the
possibility that the empty tree is being traversed.
By using the first design, which explicitly supports processing of
empty subtrees, the problem is avoided.

Another issue to consider when designing a traversal is how to
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

Handling information flow between parts of a program can
be a significant design challenge, especially when dealing with
recursive functions such as tree traversals.
In general, we can run into trouble either with passing in the correct
information needed by the function to do its work,
or with returning information to the recursive function's caller.
We will see many examples throughout the book that illustrate methods
for passing information in and out of recursive functions as they
traverse a tree structure.
Here are a few simple examples.

First we consider the simple case where a computation requires
that we communicate information back up the tree to the end user.

.. topic:: Example

   We wish to count the number of nodes in a binary tree.
   The key insight is that the total count for any (non-empty) subtree is
   one for the root plus the counts for the left and right subtrees.
   Where do left and right subtree counts come from?
   Calls to function ``count`` on the subtrees will compute this for
   us.
   Thus, we can implement ``count`` as follows.

   .. codeinclude:: Binary/Traverse
      :tag: count

.. avembed:: Exercises/Development/BTLeafPROG.html ka


Another problem that occurs when recursively processing data
collections is controlling which members of the collection will be
visited.
For example, some tree "traversals" might in fact visit only some
tree nodes, while avoiding processing of others.
An example is trying to find nodes in a BST whose key value falls
within a specified range.
This function must visit only those children of a given node that
might possibly fall within a given range of values.
Fortunately, it requires only a simple local calculation to determine
which child(ren) to visit.

A more difficult situation is illustrated by the following problem.
Given an arbitrary binary tree we wish to determine if,
for every node :math:`A`, are all nodes in :math:`A`'s left
subtree less than the value of :math:`A`, and are all nodes in
:math:`A`'s right subtree greater than the value of :math:`A`?
(This happens to be the definition for a binary search tree.)
Unfortunately, to make this decision we need to know some context
that is not available just by looking at the node's parent or
children.

.. _BSTCheckFig:

.. odsafig:: Images/BSTCheckFig.png
   :width: 100
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Binary tree checking

   To be a binary search tree, the left child of the node with value
   40 must have a value between 20 and 40.

As shown by Figure :num:`Figure #BSTCheckFig`,
it is not enough to verify that :math:`A`'s left child has a value
less than that of :math:`A`, and that :math:`A`'s right child
has a greater value.
Nor is it enough to verify that :math:`A` has a value consistent
with that of its parent.
In fact, we need to know information about what range of values is
legal for a given node.
That information might come from any of the node's ancestors.
Thus, relevant range information must be passed down the tree.
We can implement this function as follows.

.. codeinclude:: Binary/checkBST
   :tag: checkBST

Here are some exercises to practice the traversals.

.. avembed:: AV/Binary/btTravInorderPRO.html pe

.. avembed:: AV/Binary/btTravPostorderPRO.html pe

.. avembed:: AV/Binary/btTravPreorderPRO.html pe
