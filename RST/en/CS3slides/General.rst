.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

=============
General Trees
=============

General Trees
-------------

.. slide:: General Trees

   .. inlineav:: GenTreeCON dgm
      :links: AV/General/GenTreeCON.css
      :scripts: AV/General/GenTreeCON.js
      :align: justify


.. slide:: General Tree ADT

   .. codeinclude:: General/GenTree
      :tag: GenTreeADT


.. slide:: General Tree Traversal

   .. inlineav:: GenTreePreTravCON ss
      :long_name: General Tree Preorder Traversal Slideshow
      :links: AV/General/GenTreeCON.css
      :scripts: AV/General/GenTreePreTravCON.js
      :output: show


.. slide:: Rep: Lists of Children

   .. odsafig:: Images/ChildLst.png
      :width: 500
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: The "list of children" implementation for general trees.


.. slide:: Rep: Dynamic Node (Array)

   .. odsafig:: Images/GenLkFx.png
      :width: 500
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: A dynamic general tree with fixed-size arrays


.. slide:: Rep: Dynamic Node (linked list)

   .. odsafig:: Images/GenLkLk.png
      :width: 500
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: A dynamic general tree with linked lists of child pointers


.. slide:: Rep: Lift-Child/Right-Sibling

   .. odsafig:: Images/FortoBin.png
      :width: 600
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: Converting from a forest of general trees to a binary tree

           
.. slide:: Serialization

   Serialization is the process of storing an object as a series of
   bytes.

   A sequential tree serialization typically stores the node values as
   they would be enumerated by a preorder traversal, along with
   sufficient information to describe the tree's shape.


.. slide:: Binary tree serialization

   .. inlineav:: SequentialTreeCON ss
      :long_name: First sequential representation Slideshow
      :links: AV/General/SequentialTreeCON.css
      :scripts: AV/General/SequentialTreeCON.js
      :output: show


.. slide:: Alternate serialization

   .. inlineav:: SequentialTreeAltCON ss
      :long_name: Second sequential representation Slideshow
      :links: AV/General/SequentialTreeCON.css
      :scripts: AV/General/SequentialTreeAltCON.js
      :output: show


.. slide:: Bit Vector Serialization

   .. inlineav:: SequentialTreeBitsCON ss
      :long_name: Bit vector sequential representation Slideshow
      :links: AV/General/SequentialTreeCON.css
      :scripts: AV/General/SequentialTreeBitsCON.js
      :output: show


.. slide:: General Tree Serialization

   .. inlineav:: SequentialGenTreeCON ss
      :long_name: General Tree sequential representation Slideshow
      :links: AV/General/SequentialTreeCON.css
      :scripts: AV/General/SequentialGenTreeCON.js
      :output: show
