.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

========
Indexing
========

Indexing
--------

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

   .. inlineav:: varindexCON ss
      :long_name: Simple linear index Slideshow
      :links: AV/Indexing/linearIndexingCON.css
      :scripts: AV/Indexing/varindexCON.js
      :output: show


.. slide:: Linear Indexing (2)

   * If the index is too large to fit in main memory, a second-level index
     might be used.

   .. inlineav:: linindexCON ss
      :long_name: Two-level linear index Slideshow
      :links: AV/Indexing/linearIndexingCON.css
      :scripts: AV/Indexing/linindexCON.js
      :output: show
      :align: justify


.. slide:: Tree Indexing (1)

   * Linear index is poor for insertion/deletion.

   * Tree index can efficiently support all desired operations:
      * Insert/delete
      * Multiple search keys (multiple indices)
      * Key range search


.. slide:: Tree Indexing (2)

   .. inlineav:: pagedBSTCON ss
      :long_name: Paged BST Slideshow
      :links: AV/Indexing/treeIndexingCON.css
      :scripts: AV/Indexing/pagedBSTCON.js
      :output: show


.. slide:: Tree Indexing (3)

   * Difficulties when storing tree index on disk:
      * Tree must be balanced.
      * Each path from root to leaf should cover few disk pages.

.. slide:: Tree Indexing (4)

   .. inlineav:: rebalanceBSTCON ss
      :long_name: Paged BST With Disk Accesses Slideshow
      :links: AV/Indexing/treeIndexingCON.css
      :scripts: AV/Indexing/rebalanceBSTCON.js
      :output: show
