.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

=============
General Trees
=============

.. slide:: General Trees

   .. odsalink:: AV/General/GenTreeCON.css
   .. inlineav:: GenTreeCON dgm
      :align: justify

   .. odsascript:: AV/General/GenTreeCON.js


.. slide:: General Tree ADT

   .. codeinclude:: General/GenTree
      :tag: GenTreeADT


.. slide:: General Tree Traversal

   .. inlineav:: GenTreePreTravCON ss
      :output: show

   .. odsascript:: AV/General/GenTreePreTravCON.js


.. slide:: Serialization

   Serialization is the process of storing an object as a series of
   bytes.

   A sequential tree serialization typically stores the node values as
   they would be enumerated by a preorder traversal, along with
   sufficient information to describe the tree's shape.


.. slide:: Binary tree serialization

   .. odsalink:: AV/General/SequentialTreeCON.css
   .. inlineav:: SequentialTreeCON ss
      :output: show

   .. odsascript:: AV/General/SequentialTreeCON.js


.. slide:: Alternate serialization

   .. inlineav:: SequentialTreeAltCON ss
      :output: show

   .. odsascript:: AV/General/SequentialTreeAltCON.js

.. slide:: Bit Vector Serialization

   .. inlineav:: SequentialTreeBitsCON ss
      :output: show

   .. odsascript:: AV/General/SequentialTreeBitsCON.js


.. slide:: General Tree Serialization

   .. inlineav:: SequentialGenTreeCON ss
      :output: show

   .. odsascript:: AV/General/SequentialGenTreeCON.js
