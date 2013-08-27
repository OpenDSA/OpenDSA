.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: binary tree terminology; binary tree traversal; dictionary
   :satisfies: BST
   :topic: Binary Trees


Binary Search Trees
===================

Module :numref:`<Dictionary>` presented the dictionary ADT,
along with dictionary implementations based on sorted and unsorted
lists.
When implementing the dictionary with an unsorted list,
inserting a new record into the dictionary can be performed quickly by
putting it at the end of the list.
However, searching an unsorted list for a particular record
requires :math:`\Theta(n)` time in the average case.
For a large database, this is probably much too slow.
Alternatively, the records can be stored in a sorted list.
If the list is implemented using a linked list, then no speedup to the
search operation will result from storing the records in sorted order.
On the other hand, if we use a sorted array-based list to implement
the dictionary, then binary search can be used to find a record in
only :math:`\Theta(\log n)` time.
However, insertion will now require :math:`\Theta(n)` time on average
because, once the proper location for the new record in the sorted
list has been found, many records might be shifted to make room for
the new record.

Is there some way to organize a collection of records so
that inserting records and searching for records can both be done
quickly?
This module presents the binary search tree (BST),
which allows an improved solution to this problem.

A BST is a binary tree that conforms to the following condition, known
as the :dfn:`Binary Search Tree Property`.
All nodes stored in the left
subtree of a node whose key value is :math:`K` have key values less
than :math:`K`.
All nodes stored in the right subtree of a node whose key value
is :math:`K` have key values greater than or equal to :math:`K`.
Figure :num:`Figure #BSTShape` shows two BSTs for a collection of
values.
One consequence of the Binary Search Tree Property is that if the BST
nodes are printed using an inorder traversal
(see Module :numref:`<BinaryTreeTraversal>`)
the resulting enumeration will be in
sorted order from lowest to highest.

.. _BSTShape:

.. odsafig:: Images/BSTShape.png
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

Here is a class declaration for the BST
that implements the dictionary ADT.
The public member functions include those required by the dictionary
ADT, along with a constructor and destructor.
Recall from the discussion in Module :numref:`<Dictionary>` that
there are various ways to deal with keys and comparing records
(three approaches being key/value pairs, a special comparison
method such as using the ``Comparator`` class,
and passing in a comparator function).
Our BST implementation will handle comparison by explicitly storing
a key separate from the data value at each node of the tree.

.. codeinclude:: Trees/BST.pde
   :tag: BST

To find a record with key value :math:`K` in a BST, begin at the root.
If~the root stores a record with key value :math:`K`,
then the search is over.
If not, then we must search deeper in the tree.
What makes the BST efficient during search is that we need search only
one of the node's two subtrees.
If :math:`K` is less than the root node's key value,
we search only the left subtree.
If :math:`K` is greater than the root node's key value, we search only
the right subtree.
This process continues until a record with key value :math:`K` is
found, or we reach a leaf node.
If we reach a leaf node without encountering :math:`K`, then
no record exists in the BST whose key value is :math:`K`.

.. topic:: Example

   Consider searching for the node with key value 32 in the tree of
   Figure :num:`Figure #BSTShape` (a).
   Because 32 is less than the root value of 37, the search
   proceeds to the left subtree.
   Because 32 is greater than 24, we search in 24's right subtree.
   At this point the node containing 32 is found.
   If the search value were 35, the same path would be followed to the
   node containing 32.
   Because this node has no children, we know that 35 is not
   in the BST.

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

.. codeinclude:: Trees/BST.pde
   :tag: findhelp

Once the desired record is found, it is passed through
return values up the chain of recursive calls.
If a suitable record is not found, NULL is returned.

.. avembed:: AV/Development/BST-search-proficiency.html pe

Inserting a record with key value :math:`K` requires that we first
find where that record would have been if it were in the tree.
This takes us to either a leaf node, or to an internal node with no
child in the appropriate direction. [#]_

.. _BSTAdd:

.. odsafig:: Images/BSTAdd.png
   :width: 300
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Inserting a node into a BST

   An example of BST insertion.
   A record with value 35 is inserted into the BST of
   Figure :num:`Figure #BSTShape` (a).
   The node with value 32 becomes the parent of the new node
   containing 35.

Call this node :math:`R'`.
We then add a new node containing the new record as a child
of :math:`R'`.
Figure :num:`Figure #BSTAdd` illustrates this operation.
The value 35 is added as the right child of the node with value 32.
Here is the implementation for ``inserthelp``.

.. codeinclude:: Trees/BST.pde
   :tag: inserthelp

You should pay careful attention to the implementation for
``inserthelp``.
Note that ``inserthelp`` returns a pointer to a
``BSTNode``.
What is being returned is a subtree identical to the old subtree,
except that it has been modified to contain the new record being
inserted.
Each node along a path from the root to the parent of the new node
added to the tree will have its appropriate child pointer assigned to
it.
Except for the last node in the path, none of these nodes will
actually change their child's pointer value.
In that sense, many of the assignments seem redundant.
However, the cost of these additional assignments is worth paying to
keep the insertion process simple.
The alternative is to check if a given assignment is necessary, which
is probably more expensive than the assignment!

.. avembed:: AV/Development/BST-insert.html ss

.. TODO::
   :type: Slideshow

   Get this AV working

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

.. avembed:: AV/Development/BST-insert-proficiency.html pe

Removing a node from a BST is a bit trickier than inserting a node,
but it is not complicated if all of the possible cases are considered
individually.
Before tackling the general node removal process, let us first discuss
how to remove from a given subtree the node with the smallest key
value.
This routine will be used later by the general node removal function.
To~remove the node with the minimum key value from a subtree,
first find that node by continuously moving down the left link until
there is no further left link to follow.
Call this node :math:`S`.
To remove :math:`S`, simply have the parent of :math:`S` change
its pointer to point to the right child of :math:`S`.
We know that :math:`S` has no left child (because if :math:`S`
did have a left child, :math:`S` would not be the node with minimum
key value).
Thus, changing the pointer as described will maintain a BST, with
:math:`S` removed.
The code for this method, named ``deletemin``, is as follows

.. codeinclude:: Trees/BST.pde
   :tag: deletemin

Here is an example

.. topic:: Example

   Figure :num:`Figure #DelMin` illustrates the ``deletemin``
   process.
   Beginning at the root node with value 10,
   ``deletemin`` follows the left link until there is no further
   left link, in this case reaching the node with value 5.
   The node with value10 is changed to point to the right child of the
   node containing the minimum value.
   This is indicated in Figure :num:`Figure #DelMin` by a dashed line.

.. _DelMin:

.. odsafig:: Images/DelMin.png
   :width: 200
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Deleting the node with minimum value

   An example of deleting the node with minimum value.
   In this tree, the node with minimum value, 5, is the left child
   of the root.
   Thus, the root's ``left`` pointer is changed to point to 5's
   right child.

.. avembed:: AV/Development/BST-delete.html pe

A pointer to the node containing the minimum-valued element is stored
in parameter ``S``.
The return value of the ``deletemin`` method is the subtree of
the current node with the minimum-valued node in the subtree removed.
As with method ``inserthelp``, each node on the path back to the
root has its left child pointer reassigned to the subtree resulting
from its call to the ``deletemin`` method.

A useful companion method is ``getmin`` which returns a
pointer to the node containing the minimum value in the subtree.

.. codeinclude:: Trees/BST.pde
   :tag: getmin

Removing a node with given key value :math:`R` from the BST
requires that we first find :math:`R` and then remove it from the
tree.
So, the first part of the remove operation is a search to find
:math:`R`.
Once :math:`R` is found, there are several possibilities.
If :math:`R` has no children, then :math:`R`'s parent has its
pointer set to NULL.
If :math:`R` has one child, then :math:`R`'s parent has
its pointer set to :math:`R`'s child (similar to ``deletemin``).
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
The answer is the least key value greater than (or equal to) the one
being removed, or else the greatest key value less than the one being
removed.
If either of these values replace the one being removed,
then the BST property is maintained.

.. topic:: Example

   Assume that we wish to remove the value 37 from the BST
   of Figure :num:`Figure #BSTShape` (a).
   Instead of removing the root node, we remove the node with the
   least value in the right subtree (using the ``deletemin`` 
   operation).
   This value can then replace the value in the root.
   In this example we first remove the node with value 40,
   because it contains the least value in the right subtree.
   We then substitute 40 as the new value for the root node.
   Figure :num:`Figure #Remove` illustrates this process.

.. _Remove:

.. odsafig:: Images/Remove.png
   :width: 300
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Removing a node from the BST

   An example of removing the value 37 from the BST.
   The node containing this value has two children.
   We replace value 37 with the least value from the
   node's right subtree, in this case 40.

.. avembed:: AV/Development/BST-delete-proficiency.html ss

.. TODO::
   :type: Slideshow

   Get this AV working.

When duplicate node values do not appear in the tree, it makes no
difference whether the replacement is the greatest value from the
left subtree or the least value from the right subtree.
If duplicates are stored, then we must select
the replacement from the *right* subtree.
To see why, call the greatest value in the left subtree :math:`G`.
If multiple nodes in the left subtree have value :math:`G`,
selecting :math:`G` as the replacement value for the root of the
subtree will result in a tree with equal values to the left of the
node now containing :math:`G`.
Precisely this situation occurs if we replace value 120 with the
greatest value in the left subtree of Figure
:num:`Figure #BSTShape` (b).
Selecting the least value from the right subtree does not
have a similar problem, because it does not violate the Binary Search
Tree Property if equal values appear in the right subtree.

From the above, we see that if we want to remove the record stored in
a node with two children, then we simply call ``deletemin`` on
the node's right subtree and substitute the record returned for the
record being removed.
Here is an implementation for ``removehelp``.

.. codeinclude:: Trees/BST.pde
   :tag: removehelp

The cost for ``findhelp`` and ``inserthelp`` is the depth of
the node found or inserted.
The cost for ``removehelp`` is the depth of the node being
removed, or in the case when this node has two children,
the depth of the node with smallest value in its right subtree.
Thus, in the worst case, the cost for any one of these operations is
the depth of the deepest node in the tree.
This is why it is desirable to keep BSTs :dfn:`balanced`,
that is, with least possible height.
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

Below is an example traversal, named :math:`printhelp`.
It performs an inorder traversal on the BST to print the node values
in ascending order.

.. codeinclude:: Trees/BST.pde
   :tag: printhelp

While the BST is simple to implement and efficient when the tree is
balanced, the possibility of its being unbalanced is a serious
liability.
There are techniques for organizing a BST to guarantee good performance.
Two examples are the AVL tree and the splay tree.
Other search trees are guaranteed to remain
balanced, such as the 2-3 Tree.

Notes
-----

.. [#] This assumes that no node
       has a key value equal to the one being inserted.
       If we find a node that duplicates the key value to be inserted,
       we have two options.
       If the application does not allow nodes with equal keys, then this
       insertion should be treated as an error (or ignored).
       If duplicate keys are allowed, our convention will be to insert the
       duplicate in the right subtree.
