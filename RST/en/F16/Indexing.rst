.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

========
Indexing
========

.. slide:: Indexing

   * Goals:
      * Store large files
      * Support multiple search keys
      * Support efficient insert, delete, and range queries


.. slide:: Files and Indexing

   * **Entry sequenced file**: Order records by time of insertion.
      * Search with sequential search

   * **Index file**: Organized, stores pointers to actual records.
      * Could be organized with a tree or other data structure.


.. slide:: Keys and Indexing

   * **Primary Key** : A unique identifier for records.  May be
     inconvenient for search.

   * **Secondary Key**: An alternate search key, often not unique for
     each record.  Often used for search key.


.. slide:: Linear Indexing (1)

   * **Linear index**: Index file organized as a simple sequence of
     key/record pointer pairs with key values are in sorted order.

   * Linear indexing is good for searching variable-length records.

   .. odsalink:: AV/Indexing/linearIndexingCON.css

   .. inlineav:: varindexCON ss
      :output: show

   .. odsascript:: AV/Indexing/varindexCON.js


.. slide:: Linear Indexing (2)

   * If the index is too large to fit in main memory, a second-level index
     might be used.

   .. inlineav:: linindexCON ss
      :output: show

   .. odsascript:: AV/Indexing/linindexCON.js


.. slide:: Tree Indexing (1)

   * Linear index is poor for insertion/deletion.

   * Tree index can efficiently support all desired operations:
      * Insert/delete
      * Multiple search keys (multiple indices)
      * Key range search


.. slide:: Tree Indexing (2)

   .. odsalink:: AV/Indexing/treeIndexingCON.css

   .. inlineav:: pagedBSTCON ss
      :output: show

   .. odsascript:: AV/Indexing/pagedBSTCON.js


.. slide:: Tree Indexing (3)

   * Difficulties when storing tree index on disk:
      * Tree must be balanced.
      * Each path from root to leaf should cover few disk pages.

.. slide:: Tree Indexing (4)

   .. inlineav:: rebalanceBSTCON ss
      :output: show

   .. odsascript:: AV/Indexing/rebalanceBSTCON.js


.. slide:: 2-3 Tree

   * A 2-3 Tree has the following properties:
      #. A node contains one or two keys
      #. Every internal node has either two children (if it contains
         one key) or three children (if it contains two keys).
      #. All leaves are at the same level in the tree, so the tree is
         always height balanced.

   * The 2-3 Tree has a search tree property analogous to the BST.


.. slide:: 2-3 Tree Example

   * The advantage of the 2-3 Tree over the BST is that it can be
     updated at low cost.

   .. odsalink:: AV/Indexing/twoThreeTreeCON.css

   .. inlineav:: twoThreedgmCON dgm
      :align: center

   .. odsascript:: AV/Indexing/twoThreeTreeCON.js
   .. odsascript:: AV/Indexing/twoThreedgmCON.js


.. slide:: 2-3 Tree Insertion (1)

   .. inlineav:: simpleInsertCON ss
      :output: show

   .. odsascript:: AV/Indexing/simpleInsertCON.js


.. slide:: 2-3 Tree Insertion (2)

   .. inlineav:: promoteCON ss
      :output: show

   .. odsascript:: AV/Indexing/promoteCON.js


.. slide:: 2-3 Tree Insertion (3)

   .. inlineav:: splitCON ss
      :output: show

   .. odsascript:: AV/Indexing/splitCON.js


.. slide:: B-Trees (1)

   * The B-Tree is an extension of the 2-3 Tree.

   * The B-Tree is now the standard file organization for applications
     requiring insertion, deletion, and key range searches.


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


.. slide;: B-Tree Definition

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


.. slide:: B+-Tree Example

   .. odsafig:: Images/BPexamp.png
      :width: 800
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: Example of a :math:`\mathrm{B}^+` tree.

   * In this example, an internal node can have 2 to 4 children
   * A leaf node can hold 3 to 5 keys

.. slide:: B+-Tree Insertion

   .. odsafig:: Images/BPins.png
      :width: 600
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: Examples of :math:`\mathrm{B}^+` tree insertion.


.. slide:: B+-Tree Deletion (1)

   .. odsafig:: Images/BPexamp.png
      :width: 800
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: Example of a :math:`\mathrm{B}^+` tree.

   * Delete 18

   .. odsafig:: Images/BPsimDel.png
      :width: 800
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: Simple deletion from a :math:`\mathrm{B}^+` tree.


.. slide:: B+-Tree Deletion (2)

   .. odsafig:: Images/BPexamp.png
      :width: 800
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: Example of a :math:`\mathrm{B}^+` tree.

   * Delete 12

   .. odsafig:: Images/BPborrow.png
      :width: 800
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: Deletion from a :math:`\mathrm{B}^+` tree via borrowing from
            a sibling.


.. slide:: B+-Tree Deletion (3)

   .. odsafig:: Images/BPexamp.png
      :width: 800
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: Example of a :math:`\mathrm{B}^+` tree.

   * Delete 33

   .. odsafig:: Images/BPmerge.png
      :width: 800
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: Deletion from a :math:`\mathrm{B}^+` tree via collapsing siblings

.. slide:: .

   .

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
