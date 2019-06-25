.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. Quick demo file to show off the arraytree versions of the 23-Tree slideshows

.. avmetadata::
   :author: Cliff Shaffer
   :satisfies: 2-3 tree
   :topic: Indexing

2-3 Trees Test
==============

2-3 Trees Test
--------------

.. inlineav:: TTTreeDgm dgm
   :links: DataStructures/ArrayTree.css AV/Obsolete/TTT/TTTreeCON.css
   :scripts: DataStructures/ArrayTree.js AV/Obsolete/TTT/TTTreeCON.js
   :align: center

   An example of a 2-3 tree.

|

.. inlineav:: TTTreeSimpleInsert ss
   :long_name: 2-3 Tree Insert Slideshow
   :links: DataStructures/ArrayTree.css AV/Obsolete/TTT/TTTreeCON.css
   :scripts: DataStructures/ArrayTree.js AV/Obsolete/TTT/TTTreeCON.js
   :output: show
   :align: justify

   Insert example.

Next example.
           
.. inlineav:: TTTreePromoteInsert ss
   :long_name: 2-3 Tree Insert Promotion Slideshow
   :links: DataStructures/ArrayTree.css AV/Obsolete/TTT/TTTreeCON.css
   :scripts: DataStructures/ArrayTree.js AV/Obsolete/TTT/TTTreeCON.js
   :output: show

Here is an illustration for what happens when promotions
require the root to split, adding a new level to the tree.
Note that all leaf nodes continue to have equal depth.

.. inlineav:: TTTreeSplitInsert ss
   :long_name: 2-3 Tree Insert Split Slideshow
   :links: DataStructures/ArrayTree.css AV/Obsolete/TTT/TTTreeCON.css
   :scripts: DataStructures/ArrayTree.js AV/Obsolete/TTT/TTTreeCON.js
   :output: show

Here is an implementation for the insertion process.
