.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: linear indexing; 2-3 tree
   :satisfies: B tree
   :topic: Indexing

B-Trees Test
============

2-3+ Tree Build Example

.. inlineav:: TTPbuildCON ss
   :links: AV/Indexing/BPTree.css AV/Indexing/TTPTreeCON.css
   :scripts: AV/Indexing/BPlusTreeNode.js AV/Indexing/BPlusTree.js AV/Indexing/TTPbuildCON.js
   :output: show

   An example of building a 2-3+ tree


2-3+ Tree Search Example

.. inlineav:: TTPfindCON ss
   :links: AV/Indexing/BPTree.css AV/Indexing/TTPTreeCON.css
   :scripts: AV/Indexing/BPlusTreeNode.js AV/Indexing/BPlusTree.js AV/Indexing/TTPfindCON.js
   :output: show

   An example of searching in a 2-3+ tree


2-3+ Tree Delete Example

.. inlineav:: TTPdeleteCON ss
   :links: AV/Indexing/BPTree.css AV/Indexing/TTPTreeCON.css
   :scripts: AV/Indexing/BPlusTreeNode.js AV/Indexing/BPlusTree.js AV/Indexing/TTPdeleteCON.js
   :output: show

   An example of deleting from a 2-3+ tree


Now, let's see examples of higher-order B+ Trees.

First we insert.

.. inlineav:: BPbuildCON ss
   :links: AV/Indexing/BPTree.css AV/Indexing/BPTreeCON.css
   :scripts: AV/Indexing/BPlusTreeNode.js AV/Indexing/BPlusTree.js AV/Indexing/BPbuildCON.js
   :output: show

   An example of building a B+ tree

Next, we find.

.. inlineav:: BPfindCON ss
   :links: AV/Indexing/BPTree.css AV/Indexing/BPTreeCON.css
   :scripts: AV/Indexing/BPlusTreeNode.js AV/Indexing/BPlusTree.js AV/Indexing/BPfindCON.js
   :output: show
   :align: center

   An example of search in a B+ tree

Finally, we delete.

.. inlineav:: BPdeleteCON ss
   :links: AV/Indexing/BPTree.css AV/Indexing/BPTreeCON.css
   :scripts: AV/Indexing/BPlusTreeNode.js AV/Indexing/BPlusTree.js AV/Indexing/BPdeleteCON.js
   :output: show
   :align: center

   An example of deletion in a B+ tree


Now insert into a tree of degree 5.

.. inlineav:: BPbuild5CON ss
   :links: AV/Indexing/BPTree.css AV/Indexing/BPTreeCON.css
   :scripts: AV/Indexing/BPlusTreeNode.js AV/Indexing/BPlusTree.js AV/Indexing/BPbuild5CON.js
   :output: show

   An example of building a B+ tree of degree 5

