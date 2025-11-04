.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

========
Indexing
========

Indexing
--------

.. revealjs-slide::

* Goals:

  * Store large files
  * Support multiple search keys
  * Support efficient insert, delete, and range queries


Files and Indexing
------------------

.. revealjs-slide::

* **Entry sequenced file**: Order records by time of insertion.

  * Search with sequential search

* **Index file**: Organized, stores pointers to actual records.

  * Could be organized with a tree or other data structure.


Keys and Indexing
-----------------

.. revealjs-slide::

* **Primary Key** : A unique identifier for records.  May be
  inconvenient for search.

* **Secondary Key**: An alternate search key, often not unique for
  each record.  Often used for search key.


Linear Indexing (1)
-------------------

.. revealjs-slide::

* **Linear index**: Index file organized as a simple sequence of
  key/record pointer pairs with key values are in sorted order.

* Linear indexing is good for searching variable-length records.

.. inlineav:: varindexCON ss
   :long_name: Simple linear index Slideshow
   :links: AV/Indexing/linearIndexingCON.css
   :scripts: AV/Indexing/varindexCON.js
   :output: show


Linear Indexing (2)
-------------------

.. revealjs-slide::

* If the index is too large to fit in main memory, a second-level index
  might be used.

.. inlineav:: linindexCON ss
   :long_name: Two-level linear index Slideshow
   :links: AV/Indexing/linearIndexingCON.css
   :scripts: AV/Indexing/linindexCON.js
   :output: show
   :align: justify


Tree Indexing (1)
-----------------

.. revealjs-slide::

* Linear index is poor for insertion/deletion.

* Tree index can efficiently support all desired operations:

  * Insert/delete
  * Multiple search keys (multiple indices)
  * Key range search


Tree Indexing (2)
-----------------

.. inlineav:: pagedBSTCON ss
   :long_name: Paged BST Slideshow
   :links: AV/Indexing/treeIndexingCON.css
   :scripts: AV/Indexing/pagedBSTCON.js
   :output: show


Tree Indexing (3)
-----------------

.. revealjs-slide::

* Difficulties when storing tree index on disk:

  * Tree must be balanced.
  * Each path from root to leaf should cover few disk pages.


Tree Indexing (4)
-----------------

.. revealjs-slide::

.. inlineav:: rebalanceBSTCON ss
   :long_name: Paged BST With Disk Accesses Slideshow
   :links: AV/Indexing/treeIndexingCON.css
   :scripts: AV/Indexing/rebalanceBSTCON.js
   :output: show


2-3 Tree
--------

.. revealjs-slide::

* A 2-3 Tree has the following properties:

  #. A node contains one or two keys
  #. Every internal node has either two children (if it contains
     one key) or three children (if it contains two keys).
  #. All leaves are at the same level in the tree, so the tree is
     always height balanced.

* The 2-3 Tree has a search tree property analogous to the BST.


2-3 Tree Example
----------------

.. revealjs-slide::

* The advantage of the 2-3 Tree over the BST is that it can be
  updated at low cost.

.. inlineav:: twoThreedgmCON dgm
   :links: AV/Indexing/twoThreeTreeCON.css
   :scripts: AV/Indexing/twoThreeTreeCON.js AV/Indexing/twoThreedgmCON.js
   :align: center


2-3 Tree Insertion (1)
----------------------

.. revealjs-slide::

.. inlineav:: simpleInsertCON ss
   :long_name: 2-3 Tree Insert Slideshow
   :links: AV/Indexing/twoThreeTreeCON.css
   :scripts: AV/Indexing/twoThreeTreeCON.js AV/Indexing/simpleInsertCON.js
   :output: show


2-3 Tree Insertion (2)
----------------------

.. revealjs-slide::

.. inlineav:: promoteCON ss
   :long_name: 2-3 Tree Insert Promotion Slideshow
   :links: AV/Indexing/twoThreeTreeCON.css
   :scripts: AV/Indexing/twoThreeTreeCON.js AV/Indexing/promoteCON.js
   :output: show


2-3 Tree Insertion (3)
----------------------

.. revealjs-slide::

.. inlineav:: splitCON ss
   :long_name: 2-3 Tree Insert Split Slideshow
   :links: AV/Indexing/twoThreeTreeCON.css
   :scripts: AV/Indexing/twoThreeTreeCON.js AV/Indexing/splitCON.js
   :output: show


B-Trees (1)
-----------

.. revealjs-slide::

* The B-Tree is an extension of the 2-3 Tree.

* The B-Tree is now the standard file organization for applications
  requiring insertion, deletion, and key range searches.


B-Trees (2)
-----------

.. revealjs-slide::

#. B-Trees are always balanced.
#. B-Trees keep similar-valued records together on a disk page,
   which takes advantage of locality of reference.
#. B-Trees guarantee that every node in the tree will be full at
   least to a certain minimum percentage.  This improves space
   efficiency while reducing the typical number of disk fetches
   necessary during a search or update operation.

.. image:: /Images/BTexamp.png
   :width: 600
   :align: center
   :alt: A B-tree of order four


B-Tree Definition
-----------------

.. revealjs-slide::

* A B-Tree of order :math:`m` has these properties:

  * The root is either a leaf or has two children.
  * Each node, except for the root and the leaves, has between
    :math:`\lceil m/2 \rceil` and :math:`m` children.
  * All leaves are at the same level in the tree, so the tree is
    always height balanced.

* A B-Tree node is usually selected to match the size of a disk
  block.

  * A B-Tree node could have hundreds of children.


B-Tree Search
-------------

.. revealjs-slide::

* Generalizes search in a 2-3 Tree.

  #. Do binary search on keys in current node.  If search key is
     found, then return record.  If current node is a leaf node
     and key is not found, then report an unsuccessful search.
  #. Otherwise, follow the proper branch and repeat the process.


B+-Trees
--------

.. revealjs-slide::

* The most commonly implemented form of the B-Tree is the B+-Tree.

* Internal nodes of the B+-Tree do not store record -- only key
  values to guild the search.

* Leaf nodes store records or pointers to records.

* A leaf node may store more or less records than an internal node
  stores keys.


23+-Tree Build Example
----------------------

.. inlineav:: TTPbuildCON ss
   :links: AV/Indexing/BPTree.css AV/Indexing/TTPTreeCON.css
   :scripts: AV/Indexing/BPlusTreeNode.js AV/Indexing/BPlusTree.js AV/Indexing/TTPbuildCON.js
   :output: show

* An example of building a ":math:`2-3^+` tree

  
23+-Tree Search Example
-----------------------

.. revealjs-slide::

.. inlineav:: TTPfindCON ss
   :links: AV/Indexing/BPTree.css AV/Indexing/TTPTreeCON.css
   :scripts: AV/Indexing/BPlusTreeNode.js AV/Indexing/BPlusTree.js AV/Indexing/TTPfindCON.js
   :output: show
   :align: center

* An example of searching a ":math:`2-3^+` tree

  
23+-Tree Delete Example
-----------------------

.. revealjs-slide::

.. inlineav:: TTPdeleteCON ss
   :links: AV/Indexing/BPTree.css AV/Indexing/TTPTreeCON.css
   :scripts: AV/Indexing/BPlusTreeNode.js AV/Indexing/BPlusTree.js AV/Indexing/TTPdeleteCON.js
   :output: show
   :align: center

* An example of deleting from a ":math:`2-3^+` tree


B+-Tree Find
------------

.. revealjs-slide::

.. inlineav:: BPfindCON ss
   :links: AV/Indexing/BPTree.css AV/Indexing/BPTreeCON.css
   :scripts: AV/Indexing/BPlusTreeNode.js AV/Indexing/BPlusTree.js AV/Indexing/BPfindCON.js
   :output: show
   :align: center

* An example of search in a B+ tree of order four.
  Internal nodes must store between two and four children.


B+-Tree Insert
--------------

.. revealjs-slide::

.. inlineav:: BPbuildCON ss
   :links: AV/Indexing/BPTree.css AV/Indexing/BPTreeCON.css
   :scripts: AV/Indexing/BPlusTreeNode.js AV/Indexing/BPlusTree.js AV/Indexing/BPbuildCON.js
   :output: show

* An example of building a B+ tree of order four.


B+-Tree Deletion
----------------

.. revealjs-slide::

.. inlineav:: BPdeleteCON ss
   :links: AV/Indexing/BPTree.css AV/Indexing/BPTreeCON.css
   :scripts: AV/Indexing/BPlusTreeNode.js AV/Indexing/BPlusTree.js AV/Indexing/BPdeleteCON.js
   :output: show
   :align: center

* An example of deletion in a B+ tree of order four.


B+-Tree Insert (Degree 5)
-------------------------

.. revealjs-slide::

.. inlineav:: BPbuild5CON ss
   :links: AV/Indexing/BPTree.css AV/Indexing/BPTreeCON.css
   :scripts: AV/Indexing/BPlusTreeNode.js AV/Indexing/BPlusTree.js AV/Indexing/BPbuild5CON.js
   :output: show

* An example of building a B+ tree of degree 5


B-Tree Space Analysis (1)
-------------------------

.. revealjs-slide::

* B+-Trees nodes are always at least half full.

* The B*-Tree splits two pages for three, and combines three pages into
  two. In this way, nodes are always 2/3 full.

* Asymptotic cost of search, insertion, and deletion of nodes from
  B-Trees is :math:`\Theta(log n)`.

  * Base of the log is the (average) branching factor of the tree.


B-Tree Space Analysis (2)
-------------------------

.. revealjs-slide::

* Example: Consider a B+-Tree of order 100 with leaf nodes
  containing 100 records.

  * 1 level B+-tree:
  * 2 level B+-tree:
  * 3 level B+-tree:
  * 4 level B+-tree:

* Ways to reduce the number of disk fetches:

  * Keep the upper levels in memory.
  * Manage B+-Tree pages with a buffer pool.


B-Trees: The Big Idea
---------------------

.. revealjs-slide::

* B-trees are really good at managing a sorted list

  * They break the list into manageable chunks
  * The leaves of the B+-tree form the list
  * The internal nodes of the B+-tree merely help find the right chunk
