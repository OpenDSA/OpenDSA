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
