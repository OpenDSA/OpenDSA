.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

=============
Tree Indexing
=============

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

