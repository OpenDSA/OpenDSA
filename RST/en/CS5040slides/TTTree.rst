.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

=========
2-3 Trees
=========

2-3 Trees
---------

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

   .. inlineav:: twoThreedgmCON dgm
      :links: AV/Indexing/twoThreeTreeCON.css
      :scripts: AV/Indexing/twoThreeTreeCON.js AV/Indexing/twoThreedgmCON.js
      :align: center


.. slide:: 2-3 Tree Insertion (1)

   .. inlineav:: simpleInsertCON ss
      :long_name: 2-3 Tree Insert Slideshow
      :links: AV/Indexing/twoThreeTreeCON.css
      :scripts: AV/Indexing/twoThreeTreeCON.js AV/Indexing/simpleInsertCON.js
      :output: show


.. slide:: 2-3 Tree Insertion (2)

   .. inlineav:: promoteCON ss
      :long_name: 2-3 Tree Insert Promotion Slideshow
      :links: AV/Indexing/twoThreeTreeCON.css
      :scripts: AV/Indexing/twoThreeTreeCON.js AV/Indexing/promoteCON.js
      :output: show


.. slide:: 2-3 Tree Insertion (3)

   .. inlineav:: splitCON ss
      :long_name: 2-3 Tree Insert Split Slideshow
      :links: AV/Indexing/twoThreeTreeCON.css
      :scripts: AV/Indexing/twoThreeTreeCON.js AV/Indexing/splitCON.js
      :output: show


