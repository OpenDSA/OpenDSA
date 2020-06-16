.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

=======
B-Trees
=======

B-Trees
-------


.. slide:: B-Trees (1)

   * The B-Tree is an extension of the 2-3 Tree.

   * The B-Tree is now the standard file organization for applications
     requiring insertion, deletion, and key range searches.
      * Databases
      * File Systems


.. slide:: B-Trees (2)

   #. B-Trees are always balanced.
   #. B-Trees keep similar-valued records together on a disk page,
      which takes advantage of locality of reference.
   #. B-Trees guarantee that every node in the tree will be full at
      least to a certain minimum percentage.  This improves space
      efficiency while reducing the typical number of disk fetches
      necessary during a search or update operation.

   .. odsafig:: Images/BTexamp.png
      :width: 600
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: A B-tree of order four


.. slide:: B-Tree Definition

   * A B-Tree of order :math:`m` has these properties:
      * The root is either a leaf or has two children.
      * Each node, except for the root and the leaves, has between
        :math:`\lceil m/2 \rceil` and :math:`m` children.
      * All leaves are at the same level in the tree, so the tree is
        always height balanced.

   * A B-Tree node is usually selected to match the size of a disk
     block.
      * A B-Tree node could have hundreds of children.


.. slide:: B-Tree Search

   * Generalizes search in a 2-3 Tree.
      #. Do binary search on keys in current node.  If search key is
         found, then return record.  If current node is a leaf node
         and key is not found, then report an unsuccessful search.
      #. Otherwise, follow the proper branch and repeat the process.


.. slide:: B+-Trees

   * The most commonly implemented form of the B-Tree is the B+-Tree.

   * Internal nodes of the B+-Tree do not store record -- only key
     values to guild the search.

   * Leaf nodes store records or pointers to records.

   * A leaf node may store more or less records than an internal node
     stores keys.


.. slide:: 23+-Tree Build Example

   .. inlineav:: TTPbuildCON ss
      :links: AV/Indexing/BPTree.css AV/Indexing/TTPTreeCON.css
      :scripts: AV/Indexing/BPlusTreeNode.js AV/Indexing/BPlusTree.js AV/Indexing/TTPbuildCON.js
      :output: show

      An example of building a ":math:`2-3^+` tree

.. slide:: 23+-Tree Search Example

   .. inlineav:: TTPfindCON ss
      :links: AV/Indexing/BPTree.css AV/Indexing/TTPTreeCON.css
      :scripts: AV/Indexing/BPlusTreeNode.js AV/Indexing/BPlusTree.js AV/Indexing/TTPfindCON.js
      :output: show
      :align: center

      An example of searching a ":math:`2-3^+` tree

.. slide:: 23+-Tree Delete Example

   .. inlineav:: TTPdeleteCON ss
      :links: AV/Indexing/BPTree.css AV/Indexing/TTPTreeCON.css
      :scripts: AV/Indexing/BPlusTreeNode.js AV/Indexing/BPlusTree.js AV/Indexing/TTPdeleteCON.js
      :output: show
      :align: center

      An example of deleting from a ":math:`2-3^+` tree


.. slide:: B+-Tree Find

   .. inlineav:: BPfindCON ss
      :links: AV/Indexing/BPTree.css AV/Indexing/BPTreeCON.css
      :scripts: AV/Indexing/BPlusTreeNode.js AV/Indexing/BPlusTree.js AV/Indexing/BPfindCON.js
      :output: show
      :align: center

      An example of search in a B+ tree of order four.
      Internal nodes must store between two and four children.


.. slide:: B+-Tree Insert

   .. inlineav:: BPbuildCON ss
      :links: AV/Indexing/BPTree.css AV/Indexing/BPTreeCON.css
      :scripts: AV/Indexing/BPlusTreeNode.js AV/Indexing/BPlusTree.js AV/Indexing/BPbuildCON.js
      :output: show

      An example of building a B+ tree of order four.


.. slide:: B+-Tree Deletion

   .. inlineav:: BPdeleteCON ss
      :links: AV/Indexing/BPTree.css AV/Indexing/BPTreeCON.css
      :scripts: AV/Indexing/BPlusTreeNode.js AV/Indexing/BPlusTree.js AV/Indexing/BPdeleteCON.js
      :output: show
      :align: center

      An example of deletion in a B+ tree of order four.

.. slide:: B+-Tree Insert (Degree 5)

   .. inlineav:: BPbuild5CON ss
      :links: AV/Indexing/BPTree.css AV/Indexing/BPTreeCON.css
      :scripts: AV/Indexing/BPlusTreeNode.js AV/Indexing/BPlusTree.js AV/Indexing/BPbuild5CON.js
      :output: show

      An example of building a B+ tree of degree 5


.. slide:: B-Tree Space Analysis (1)

   * B+-Trees nodes are always at least half full.

   * The B*-Tree splits two pages for three, and combines three pages into
     two. In this way, nodes are always 2/3 full.

   * Asymptotic cost of search, insertion, and deletion of nodes from
     B-Trees is :math:`\Theta(log n)`.
   * Base of the log is the (average) branching factor of the tree.


.. slide:: B-Tree Space Analysis (2)

   * Example: Consider a B+-Tree of order 100 with leaf nodes
     containing 100 records.
   * 1 level B+-tree:
   * 2 level B+-tree:
   * 3 level B+-tree:
   * 4 level B+-tree:

   * Ways to reduce the number of disk fetches:
      * Keep the upper levels in memory.
      * Manage B+-Tree pages with a buffer pool.


.. slide:: B-Trees: The Big Idea

   * B-trees are really good at managing a sorted list

      * They break the list into manageable chunks
      * The leaves of the B+-tree form the list
      * The internal nodes of the B+-tree merely help find the right chunk
