.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: binary tree terminology; binary tree traversal;
   :satisfies: BST
   :topic: Binary Trees

.. odsalink:: AV/Binary/BSTCON.css

Binary Search Trees
===================

Binary Search Tree Definition
-----------------------------

A :term:`binary search tree` (:term:`BST`)
is a :term:`binary tree` that conforms to the
following condition, known
as the :term:`binary search tree property`.
All :term:`nodes <node>` stored in the left subtree of a node whose
:term:`key` value is :math:`K` have key values
less than or equal to :math:`K`.
All nodes stored in the right subtree of a node whose key value
is :math:`K` have key values greater than :math:`K`.
Figure :num:`Figure #BSTShape` shows two BSTs for a collection of
values.
One consequence of the binary search tree property is that if the BST
nodes are printed using an
:ref:`inorder traversal <inorder traversal> <BinaryTreeTraversal>`,
then the resulting enumeration will be in
sorted order from lowest to highest.

.. _BSTShape:

.. odsafig:: Images/BSTShape2.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Two Binary Search Trees

   Two Binary Search Trees for a collection of values.
   Tree (a) results if values are inserted
   in the order 37, 24, 42, 7, 2, 40, 42, 32, 120.
   Tree (b) results if the same values are inserted in the
   order 120, 42, 42, 7, 2, 32, 37, 24, 40.

Here is a class declaration for the BST.
Recall that there are various ways to deal with
:term:`keys <key>` and
:ref:`comparing records <comparable> <Comparison>`
Three typical approaches are :term:`key-value pairs <key-value pair>`,
a special comparison method such as using the ``Comparator`` class,
and passing in a :term:`comparator function <comparator>`.
Our BST implementation will require that records implement the
``Comparable`` interface.

.. codeinclude:: Binary/BST
   :tag: BST


BST Search
~~~~~~~~~~

The first operation that we will look at in detail will find the
record that matches a given key.
Notice that in the BST class, public member function
``find`` calls private member function ``findhelp``.
Method ``find`` takes the search key as an explicit parameter
and its BST as an implicit parameter, and returns the record that
matches the key.
However, the find operation is most easily implemented as a
recursive function whose parameters are the root of a
subtree and the search key.
Member ``findhelp`` has the desired form for this recursive
subroutine and is implemented as follows.

.. inlineav:: BSTsearchCON ss
   :output: show

.. avembed:: AV/Binary/BSTsearchPRO.html pe


BST Insert
----------

Now we look at how to insert a new node into the BST.

.. inlineav:: BSTinsertCON ss
   :output: show

Note that, except for the last node in the path, ``inserthelp``
will not actually change the child pointer for any of the nodes that
are visited.
In that sense, many of the assignments seem redundant.
However, the cost of these additional assignments is worth paying to
keep the insertion process simple.
The alternative is to check if a given assignment is necessary, which
is probably more expensive than the assignment!

We have to decide what to do when the node that we want to
insert has has a key value equal to the key of some node already in
the tree.
If during insert we find a node that duplicates the key value to be
inserted, then we have two options.
If the application does not allow nodes with equal keys, then this
insertion should be treated as an error (or ignored).
If duplicate keys are allowed, our convention will be to insert the
duplicate in the left subtree.

The shape of a BST depends on the order in which elements are inserted.
A new element is added to the BST as a new leaf node,
potentially increasing the depth of the tree.
Figure :num:`Figure #BSTShape` illustrates two BSTs for a collection
of values.
It is possible for the BST containing :math:`n` nodes to be a chain of
nodes with height :math:`n`.
This would happen if, for example, all elements were inserted in
sorted order.
In general, it is preferable for a BST to be as shallow as
possible.
This keeps the average cost of a BST operation low.

.. avembed:: AV/Binary/BSTinsertPRO.html pe


BST Remove
----------

Removing a node from a BST is a bit trickier than inserting a node,
but it is not complicated if all of the possible cases are considered
individually.
Before tackling the general node removal process, we will first see
how to remove from a given subtree the node with the largest key
value.
This routine will be used later by the general node removal function.

.. inlineav:: BSTdeletemaxCON ss
   :output: show

The return value of the ``deletemax`` method is the subtree of
the current node with the maximum-valued node in the subtree removed.
Similar to the ``inserthelp`` method, each node on the path back to
the root has its right child pointer reassigned to the subtree
resulting from its call to the ``deletemax`` method.

A useful companion method is ``getmax`` which returns a
pointer to the node containing the maximum value in the subtree.

.. codeinclude:: Binary/BST
   :tag: getmax

Now we are ready for the ``removehelp`` method.
Removing a node with given key value :math:`R` from the BST
requires that we first find :math:`R` and then remove it from the
tree.
So, the first part of the remove operation is a search to find
:math:`R`.
Once :math:`R` is found, there are several possibilities.
If :math:`R` has no children, then :math:`R`'s parent has its
pointer set to NULL.
If :math:`R` has one child, then :math:`R`'s parent has
its pointer set to :math:`R`'s child (similar to ``deletemax``).
The problem comes if :math:`R` has two children.
One simple approach, though expensive, is to set :math:`R`'s parent to
point to one of :math:`R`'s subtrees, and then reinsert the remaining
subtree's nodes one at a time.
A better alternative is to find a value in one of the
subtrees that can replace the value in :math:`R`.

Thus, the question becomes:
Which value can substitute for the one being removed?
It cannot be any arbitrary value, because we must preserve the BST
property without making major changes to the structure of the tree.
Which value is most like the one being removed?
The answer is the least key value greater than the one
being removed, or else the greatest key value less than (or equal to)
the one being removed.
If either of these values replace the one being removed,
then the BST property is maintained.

.. inlineav:: BSTremoveCON ss
   :output: show

When duplicate node values do not appear in the tree, it makes no
difference whether the replacement is the greatest value from the
left subtree or the least value from the right subtree.
If duplicates are stored in the left subtree, then we must select
the replacement from the *left* subtree. [#]_
To see why, call the least value in the right subtree :math:`L`.
If multiple nodes in the right subtree have value :math:`L`,
selecting :math:`L` as the replacement value for the root of the
subtree will result in a tree with equal values to the right of the
node now containing :math:`L`.
Selecting the greatest value from the left subtree does not
have a similar problem, because it does not violate the Binary Search
Tree Property if equal values appear in the left subtree.

.. [#] Alternatively, if we prefer to store duplicate values in the
       right subtree, then we must replace a deleted node with the
       least value from its right subtree.

.. avembed:: AV/Binary/BSTremovePRO.html ss


BST Analysis
------------

The cost for ``findhelp`` and ``inserthelp`` is the depth of
the node found or inserted.
The cost for ``removehelp`` is the depth of the node being
removed, or in the case when this node has two children,
the depth of the node with smallest value in its right subtree.
Thus, in the worst case, the cost for any one of these operations is
the depth of the deepest node in the tree.
This is why it is desirable to keep BSTs
:term:`balanced <balanced tree>`, that is, with least possible
height.
If a binary tree is balanced, then the height for a tree of :math:`n`
nodes is approximately :math:`\log n`.
However, if the tree is completely unbalanced, for example in the
shape of a linked list, then the height for a tree with :math:`n`
nodes can be as great as :math:`n`.
Thus, a balanced BST will in the average case have operations costing
:math:`\Theta(\log n)`, while a badly unbalanced BST can have
operations in the worst case costing :math:`\Theta(n)`.
Consider the situation where we construct a BST of :math:`n` nodes
by inserting records one at a time.
If we are fortunate to have them arrive in an order that results in a
balanced tree (a "random" order is likely to be good
enough for this purpose), then each insertion will cost on average
:math:`\Theta(\log n)`, for a total cost of
:math:`\Theta(n \log n)`.
However, if the records are inserted in order of increasing value,
then the resulting tree will be a chain of height :math:`n`.
The cost of insertion in this case will be
:math:`\sum_{i=1}^{n} i = \Theta(n^2)`.

Traversing a BST costs :math:`\Theta(n)` regardless of the shape of
the tree.
Each node is visited exactly once, and each child pointer
is followed exactly once.

Below is an example traversal, named ``printhelp``.
It performs an inorder traversal on the BST to print the node values
in ascending order.

.. codeinclude:: Binary/BST
   :tag: printhelp

While the BST is simple to implement and efficient when the tree is
balanced, the possibility of its being unbalanced is a serious
liability.
There are techniques for organizing a BST to guarantee good performance.
Two examples are the
:ref:`AVL tree <AVL tree> <AVL>` and the
:ref:`splay tree <splay tree> <Splay>`.
There also exist other types of search trees that are guaranteed to
remain balanced, such as the :ref:`2-3 Tree <2-3 tree> <TwoThreeTree>`.

.. avembed:: Exercises/Binary/BSTSumm.html ka

.. odsascript:: AV/Binary/BSTsearchCON.js
.. odsascript:: AV/Binary/BSTinsertCON.js
.. odsascript:: AV/Binary/BSTdeletemaxCON.js
.. odsascript:: AV/Binary/BSTremoveCON.js
