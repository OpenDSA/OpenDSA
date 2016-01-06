.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: BST
   :satisfies:
   :topic: Splay Trees

The Splay Tree
==============

Like the AVL tree, the splay tree is not actually a distinct data
structure, but rather reimplements the BST insert, delete, and search
methods to improve the performance of a BST.
The goal of these revised methods is to provide guarantees on the time
required by a series of operations, thereby avoiding the worst-case
linear time behavior of standard BST operations.
No single operation in the splay tree is guaranteed to be efficient.
Instead, the splay tree access rules guarantee that a series of
:math:`m` operations will take :math:`O(m log n)` time for a tree of
:math:`n` nodes whenever :math:`m \geq n`.
Thus, a single insert or search operation could take :math:`O(n)`
time.
However, :math:`m` such operations are guaranteed to require a total
of :math:`O(m \log n)` time, for an average cost of
:math:`O(\log n)` per access operation.
This is a desirable performance guarantee for any search-tree
structure.

Unlike the AVL tree, the splay
tree is not guaranteed to be height balanced.
What is guaranteed is that the total cost of the entire series of
accesses will be cheap.
Ultimately, it is the cost of the series of operations that matters,
not whether the tree is balanced.
Maintaining balance is really done only for the sake of reaching this
time efficiency goal.

The splay tree access functions operate in a manner reminiscent of
the :term:`move-to-front` rule for
:ref:`self-organizing lists <self-organizing list> <SelfOrg>`,
and of the path compression technique for managing
a series of
:ref:`Union/Find <Union/Find> <UnionFind>` operations.
These access functions tend to make the tree more balanced, but an
individual access will not necessarily result in a more balanced
tree.

Whenever a node :math:`S` is accessed (e.g., when :math:`S` is
inserted, deleted, or is the goal of a search), the splay tree
performs a process called :term:`splaying`.
Splaying moves :math:`S` to the root of the BST.
When :math:`S` is being deleted, splaying
moves the parent of :math:`S` to the root.
As in the AVL tree, a splay of node :math:`S`
consists of a series of :term:`rotations <rotation>`.
A rotation moves :math:`S` higher in the tree by adjusting its
position with respect to its parent and grandparent.
A side effect of the rotations is a tendency to balance the tree.
There are three types of rotation.

A :term:`single rotation` is performed only if :math:`S`
is a child of the root node.
The single rotation is illustrated by Figure :num:`Figure #SingProm`.
It basically switches :math:`S` with its parent in a way that
retains the BST property.
While Figure :num:`Figure #SingProm` is slightly different from
Figure :num:`Figure #AVLsingle`, in fact the splay tree single
rotation is identical to the AVL tree single rotation.

.. _SingProm:

.. odsafig:: Images/SingRot.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Splay tree single rotation

   Splay tree single rotation.
   This rotation takes place only when the node being splayed is a
   child of the root.
   Here, node :math:`S` is promoted to the root, rotating with
   node :math:`P`.
   Because the value of :math:`S` is less than the value of :math:`P`,
   :math:`P` must become :math:`S` 's right child.
   The positions of subtrees :math:`A`, :math:`B`, and ;math:`C` are
   altered as appropriate to maintain the BST property, but the
   contents of these subtrees remains unchanged.
   (a) The original tree with :math:`P` as the parent.
   (b) The tree after a rotation takes place.
   Performing a single rotation a second time will return the tree to
   its original shape.
   Equivalently, if (b) is the initial configuration of the tree
   (i.e., :math:`S` is at the root and :math:`P` is its right child),
   then (a) shows the result of a single rotation to splay :math:`P` to
   the root.

Unlike the AVL tree, the splay tree requires two types of
double rotation.
Double rotations involve :math:`S`, its parent (call it :math:`P`),
and :math:`S` 's grandparent (call it :math:`G`).
The effect of a double rotation is to move :math:`S` up two levels in
the tree.

The first double rotation is called a :math:`zigzag rotation`.
It takes place when either of the following two conditions are met:

(#) :math:`S` is the left child of :math:`P`, and :math:`P` is the
    right child of :math:`G`.

(#) :math:`S` is the right child of :math:`P`, and :math:`P` is the
    left child of :math:`G`.

In other words, a zigzag rotation is used when :math:`G`,
:math:`P`, and :math:`S` form a zigzag.
The zigzag rotation is illustrated by Figure :num:`Figure #ZigZag`.

.. _ZigZag:

.. odsafig:: Images/ZigZag.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Splay tree zigzag rotation

   Splay tree zigzag rotation.
   (a) The original tree with :math:`S`, :math:`P`, and :math:`G` in
   zigzag formation.
   (b) The tree after the rotation takes place.
   The positions of subtrees :math:`A`, :math:`B`, :math:`C`, and
   :math:`D` are altered as appropriate to maintain the BST
   property.

The other double rotation is known as a :term:`zigzig` rotation.
A zigzig rotation takes place when either of the following two
conditions are met:

(#) :math:`S` is the left child of :math:`P`, which is in turn the
    left child of :math:`G`.

(#) :math:`S` is the right child of :math:`P`, which is in turn the
    right child of :math:`G`.

Thus, a zigzig rotation takes place in those
situations where a zigzag rotation is not appropriate.
The zigzig rotation is illustrated by Figure :num:`Figure #ZigZig`.
While Figure :num:`Figure #ZigZig` appears somewhat different from
Figure :num:`Figure #AVLdouble`, in fact the zigzig rotation is
identical to the AVL tree double rotation.

.. _ZigZig:

.. odsafig:: Images/ZigZig.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Splay tree zigzig rotation

   Splay tree zigzig rotation.
   (a) The original tree with :math:`S`, :math:`P`, and :math:`G` in
   zigzig formation.
   (b) The tree after the rotation takes place.
   The positions of subtrees :math:`A`, :math:`B`, :math:`C`, and
   :math:`D` are altered as appropriate to maintain the BST
   property.

Note that zigzag rotations tend to make the tree more balanced,
because they bring subtrees :math:`B`  and :math:`C` up one level
while moving subtree :math:`D` down one level.
The result is often a reduction of the tree's height by one.
Zigzig promotions and single rotations do not typically reduce the
height of the tree; they merely bring the newly accessed record toward
the root.

Splaying node :math:`S` involves a series of double rotations until
:math:`S` reaches either the root or the child of the root.
Then, if necessary, a single rotation makes :math:`S` the root.
This process tends to re-balance the tree.
Regardless of balance, splaying will make frequently accessed nodes
stay near the top of the tree, resulting in reduced access cost.
Proof that the splay tree meets the guarantee of
:math:`O(m \log n)` is beyond the scope of our study.

.. topic:: Example

   Consider a search for value 89 in the splay tree of
   Figure :num:`Figure #SplayEx` (a).
   The splay tree's search operation is identical to searching in
   a BST.
   However, once the value has been found, it is splayed to the root.
   Three rotations are required in this example.
   The first is a zigzig rotation, whose result is shown in
   Figure :num:`Figure #SplayEx` (b).
   The second is a zigzag rotation, whose result is shown in
   Figure :num:`Figure #SplayEx` (c).
   The final step is a single rotation resulting in the tree of
   Figure :num:`Figure #SplayEx` (d).
   Notice that the splaying process has made the tree shallower.

.. _SplayEx:

.. odsafig:: Images/SplayEx.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Example of search in a splay tree

   Example of splaying after performing a search in a splay tree.
   After finding the node with key value 89, that node is splayed to
   the root by performing three rotations.
   (a) The original splay tree.
   (b) The result of performing a zigzig rotation on the node with
   key value 89 in the tree of (a).
   (c) The result of performing a zigzag rotation on the node with
   key value 89 in the tree of (b).
   (d) The result of performing a single rotation on the node with
   key value 89 in the tree of (c).
   If the search had been for 91, the search would have been
   unsuccessful with the node storing key value 89 being that last one
   visited. 
   In that case, the same splay operations would take place.
