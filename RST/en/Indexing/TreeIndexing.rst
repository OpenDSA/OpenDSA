.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: comparison; insertion sort
   :satisfies: shellsort
   :topic: Indexing

.. odsalink:: AV/Indexing/treeIndexingCON.css

Tree-based Indexing
===================

Tree-based Indexing
-------------------

Linear indexing is efficient when the database is static,
that is, when records are inserted and deleted rarely or never.
ISAM is adequate for a limited number of updates, but not for frequent
changes.
Because it has essentially two levels of indexing, ISAM will also break
down for a truly large database where the number of cylinders is too
great for the top-level index to fit in main memory.

In their most general form, database applications have the following
characteristics:

#. Large sets of records that are frequently updated.

#. Search is by one or a combination of several keys.

#. Key range queries or min/max queries are used.

For such databases, a better organization must be found.
One approach would be to use the binary search tree (BST) to store
primary and secondary key indices.
BSTs can store duplicate key values, they provide efficient insertion
and deletion as well as efficient search, and they can perform
efficient range queries.
When there is enough main memory, the BST is a viable
option for implementing both primary and secondary key indices.

Unfortunately, the BST can become unbalanced.
Even under relatively good conditions, the depth of leaf nodes
can easily vary by a factor of two.
This might not be a significant concern when the tree is stored in
main memory because the time required is still :math:`\Theta(\log n)`
for search and update.
When the tree is stored on disk, however, the depth of nodes in the
tree becomes crucial.
Every time a BST node :math:`B` is visited, it is necessary to visit
all nodes along the path from the root to :math:`B`.
Each node on this path must be retrieved from disk.
Each disk access returns a block of information.
If a node is on the same block as its parent, then the cost to find
that node is trivial once its parent is in main memory.
Thus, it is desirable to keep subtrees together on the same
block.
Unfortunately, many times a node is not on the same block as its
parent.
Thus, each access to a BST node could potentially require that another
block to be read from disk.
Using a buffer pool to store multiple blocks in
memory can mitigate disk access problems if BST accesses display good
locality of reference.
But a buffer pool cannot eliminate disk I/O entirely.
The problem becomes greater if the BST is unbalanced, because nodes deep
in the tree have the potential of causing many disk blocks to be read.
Thus, there are two significant issues that must be addressed
to have efficient search from a disk-based BST.
The first is how to keep the tree balanced.
The second is how to arrange the nodes on blocks so as to keep the
number of blocks encountered on any path from the root to the leaves at
a minimum.

We could select a scheme for balancing the BST and allocating BST
nodes to blocks in a way that minimizes disk I/O, as illustrated by
the first slideshow.
However, maintaining such a scheme in the face of insertions and
deletions is difficult.
In particular, the tree should remain balanced when an update takes
place, but doing so might require much reorganization.
Each update should affect only a few blocks, or its cost will be
too high.

.. inlineav:: pagedBSTCON ss
   :output: show

As you can see from this slideshow,
adopting a rule such as requiring the BST to be complete can cause a
great deal of rearranging of data within the tree.

.. inlineav:: rebalanceBSTCON ss
   :output: show

We can solve these problems by selecting another tree structure that
automatically remains balanced after updates, and which is amenable
to storing in blocks.
There are a number of balanced tree data structures, and
there are also techniques for keeping BSTs balanced.
Examples are the AVL and splay trees.
As an alternative,
the :ref:`2-3 Tree <2-3 tree> <TwoThreeTree>` has the property that its leaves
are always at the same level.
The main reason for discussing the 2-3 Tree here in preference to the
other balanced search trees is that it naturally
leads to the :ref:`B-tree <B-tree> <BTree>`, which is by far the
most widely used indexing method today.

.. avembed:: Exercises/Indexing/TreeIndexing.html ka

.. odsascript:: AV/Indexing/pagedBSTCON.js
.. odsascript:: AV/Indexing/rebalanceBSTCON.js

