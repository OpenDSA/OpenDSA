.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :satisfies: 2-3 tree
   :topic: Indexing

.. odsalink:: AV/Indexing/twoThreeTreeCON.css

2-3 Trees
=========

2-3 Trees
---------

This section presents a data structure called the 2-3 tree.
The 2-3 tree is not a binary tree, but instead its shape
obeys the following definition:

#. A node contains one or two keys.

#. Every internal node has either two children (if it contains one key)
   or three children (if it contains two keys).  Hence the name.

#. All leaves are at the same level in the tree, so
   the tree is always height balanced.

In addition to these shape properties, the 2-3 tree has a search tree
property analogous to that of a BST.
For every node, the values of all descendants in the left subtree are
less than the value of the first key, while values in the center
subtree are greater than or equal to the value of the first key.
If there is a right subtree (equivalently, if the node stores two
keys), then the values of all descendants in the center subtree are
less than the value of the second key, while values in the right
subtree are greater than or equal to the value of the second key.
To maintain these shape and search properties requires that special
action be taken when nodes are inserted and deleted.
The 2-3 tree has the advantage over the BST in that the 2-3 tree can
be kept height balanced at relatively low cost.
Here is an example 2-3 tree.

.. _TTexamp:

.. inlineav:: twoThreedgmCON dgm
   :align: center

   An example of a 2-3 tree.

Nodes are shown as rectangular boxes with two key fields.
(These nodes actually would contain complete records or pointers to
complete records, but the figures will show only the keys.)
Internal nodes with only two children have an empty right key field.
Leaf nodes might contain either one or two keys.
Here is an implementation for the 2-3 tree node class.

.. codeinclude:: Indexing/TTNode

Note that this sample declaration does not distinguish
between leaf and internal nodes and so is space inefficient, because
leaf nodes store three pointers each.
We can use a :ref:`class hierarcy <class hierarchy> <BinaryTreeImpl>`
to implement separate internal and leaf node types.

From the defining rules for 2-3 trees we can derive relationships
between the number of nodes in the tree and the depth of the tree.
A 2-3 tree of height :math:`k` has at least :math:`2^{k-1}` leaves,
because if every internal node has two children it degenerates to the
shape of a complete binary tree.
A 2-3 tree of height :math:`k` has at most :math:`3^{k-1}` leaves,
because each internal node can have at most three children.

Searching for a value in a 2-3 tree is similar to searching in a BST.
Search begins at the root.
If the root does not contain the search key :math:`K`, then the search
progresses to the only subtree that can possibly contain :math:`K`.
The value(s) stored in the root node determine which is the correct
subtree.
For example, if searching for the value 30 in the tree of
Figure :num:`Figure #TTexamp`, we begin with the root node.
Because 30 is between 18 and 33, it can only be in the middle
subtree.
Searching the middle child of the root node yields the desired
record.
If searching for 15, then the first step is again to search the root
node.
Because 15 is less than 18, the first (left) branch is taken.
At the next level, we take the second branch to the leaf node
containing 15.
If the search key were 16, then upon encountering the leaf
containing 15 we would find that the search key is not in the tree.
Here is an implementation for the 2-3 tree search method.

.. codeinclude:: Indexing/TTfind

Insertion into a 2-3 tree is similar to insertion into a BST to the
extent that the new record is placed in the appropriate leaf node.
Unlike BST insertion, a new child is not created to hold the record
being inserted, that is, the 2-3 tree does not grow downward.
The first step is to find the leaf node that would contain the record
if it were in the tree.
If this leaf node contains only one value, then the new record can be
added to that node with no further modification to the tree, as
illustrated in the following visualization.

.. _TTEasyIn:

.. inlineav:: simpleInsertCON ss
   :output: show
   :align: justify

If we insert the new record into a leaf node :math:`L` that already
contains two records, then more space must be created.
Consider the two records of node :math:`L` and the record to be
inserted without further concern for which two
were already in :math:`L` and which is the new record.
The first step is to split :math:`L` into two nodes.
Thus, a new node |---| call it :math:`L'` |---| must be created from
free store.
:math:`L` receives the record with the least of the three key values.
:math:`L'` receives the greatest of the three.
The record with the middle of the three key value is passed up to the
parent node along with a pointer to :math:`L'`.
This is called a :term:`promotion`.
The promoted key is then inserted into the parent.
If the parent currently contains only one record (and thus has only
two children), then the promoted record and the pointer to
:math:`L'` are simply added to the parent node.
If the parent is full, then the split-and-promote process is repeated.
Here is an example of a a simple promotion.

.. _TTPromote:

.. inlineav:: promoteCON ss
   :output: show

Here is an illustration for what happens when promotions
require the root to split, adding a new level to the tree.
Note that all leaf nodes continue to have equal depth.

.. _TTSplit:

.. inlineav:: splitCON ss
   :output: show

Here is an implementation for the insertion process.

.. codeinclude:: Indexing/TTins

Note that ``inserthelp`` takes three parameters.
The first is a pointer to the root of the current subtree, named
``rt``.
The second is the key for the record to be
inserted, and the third is the record itself.
The return value for ``inserthelp`` is a pointer to a 2-3 tree node.
If ``rt`` is unchanged, then a pointer to ``rt`` is returned.
If ``rt`` is changed (due to the insertion causing the node to
split), then a pointer to the new subtree root is returned, with the
key value and record value in the leftmost fields, and a pointer to
the (single) subtree in the center pointer field.
This revised node will then be added to the parent as illustrated by
the splitting visualization above.

When deleting a record from the 2-3 tree, there are three cases to
consider.
The simplest occurs when the record is to be removed from a leaf node
containing two records.
In this case, the record is simply removed, and no other nodes are
affected.
The second case occurs when the only record in a leaf node is to be
removed.
The third case occurs when a record is to be removed from an internal
node.
In both the second and the third cases, the deleted record is replaced
with another that can take its place while maintaining the correct
order, similar to removing a node from a BST.
If the tree is sparse enough, there is no such record available that
will allow all nodes to still maintain at least one record.
In this situation, sibling nodes are merged together.
The delete operation for the 2-3 tree is excessively complex and
will not be described further.
Instead, a complete discussion of deletion will be postponed until the
next section, where it can be generalized for a particular variant of
the B-tree.

The 2-3 tree insert and delete routines do not add new nodes at the
bottom of the tree.
Instead they cause leaf nodes to split or merge, possibly causing a
ripple effect moving up the tree to the root.
If necessary the root will split, causing a new root node to be
created and making the tree one level deeper.
On deletion, if the last two children of the root merge,
then the root node is removed and the tree will lose a level.
In either case, all leaf nodes are always at the same level.
When all leaf nodes are at the same level, we say that a tree is
:term:`height balanced`.
Because the 2-3 tree is height balanced, and every internal node has
at least two children, we know that the maximum depth of the tree
is :math:`\log n`.
Thus, all 2-3 tree insert, find, and delete operations require
:math:`\Theta(\log n)` time.

Here is a visualization for the 2-3 tree.
Actually, the visualization is more general than just a 2-3 tree.
To see how a 2-3 would behave, be sure to use the "Max Degree = 3"
setting.

.. raw:: html

   <center>
   <iframe id="BT_iframe"
        src="//www.cs.usfca.edu/~galles/visualization/BTree.html"
        width="1100" height="800"
        frameborder="1" marginwidth="0" marginheight="0"
	scrolling="no">
   </iframe>
   </center>

This visualization was written by David Galles of the University of
San Francisco as part of his |external_link| package.

.. |external_link| raw:: html

   <a href="http://www.cs.usfca.edu/~galles/visualization/Algorithms.html" target="_blank">Data Structure Visualizations</a>

.. odsascript:: AV/Indexing/twoThreeTreeCON.js
.. odsascript:: AV/Indexing/twoThreedgmCON.js
.. odsascript:: AV/Indexing/simpleInsertCON.js
.. odsascript:: AV/Indexing/promoteCON.js
.. odsascript:: AV/Indexing/splitCON.js
