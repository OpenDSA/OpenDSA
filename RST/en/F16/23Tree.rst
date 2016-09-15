.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

=========
2-3 Trees
=========

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
