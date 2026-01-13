.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

=============
General Trees
=============

General Trees
-------------

.. revealjs-slide::

.. inlineav:: GenTreeCON dgm
   :links: AV/General/GenTreeCON.css
   :scripts: AV/General/GenTreeCON.js
   :align: justify


General Tree ADT
----------------

.. revealjs-slide::

.. codeinclude:: General/GenTree
   :tag: GenTreeADT


General Tree Traversal
----------------------

.. revealjs-slide::

.. raw:: html

   <iframe src="../../../Metadata/inlineav/General/GenTreePreTravCON.html" 
           width="960" 
           height="700" 
           frameborder="0"
           style="background: white; display: block; margin: 0 auto;">
   </iframe>


Representation: Lists of Children
---------------------------------

.. revealjs-slide::

.. odsafig:: Images/ChildLst.png
   :width: 500
   :align: center
   :alt: The "list of children" implementation for general trees.


Representation: Dynamic Node (Array)
------------------------------------

.. revealjs-slide::

.. odsafig:: Images/GenLkFx.png
   :width: 500
   :align: center
   :alt: A dynamic general tree with fixed-size arrays


Representation: Dynamic Node (linked list)
------------------------------------------

.. revealjs-slide::

.. odsafig:: Images/GenLkLk.png
   :width: 500
   :align: center
   :alt: A dynamic general tree with linked lists of child pointers


Representation: Left-Child/Right-Sibling
----------------------------------------

.. revealjs-slide::

.. odsafig:: Images/FortoBin.png
   :width: 600
   :align: center
   :alt: Converting from a forest of general trees to a binary tree

           
Serialization
-------------

.. revealjs-slide::

* Serialization is the process of storing an object as a series of
  bytes.

* A sequential tree serialization typically stores the node values as
  they would be enumerated by a preorder traversal, along with
  sufficient information to describe the tree's shape.


Binary tree serialization
-------------------------

.. revealjs-slide::

.. inlineav:: SequentialTreeCON ss
   :long_name: First sequential representation Slideshow
   :links: AV/General/SequentialTreeCON.css
   :scripts: AV/General/SequentialTreeCON.js
   :output: show


Alternate serialization
-----------------------

.. revealjs-slide::

.. inlineav:: SequentialTreeAltCON ss
   :long_name: Second sequential representation Slideshow
   :links: AV/General/SequentialTreeCON.css
   :scripts: AV/General/SequentialTreeAltCON.js
   :output: show


Bit Vector Serialization
------------------------

.. revealjs-slide::

.. inlineav:: SequentialTreeBitsCON ss
   :long_name: Bit vector sequential representation Slideshow
   :links: AV/General/SequentialTreeCON.css
   :scripts: AV/General/SequentialTreeBitsCON.js
   :output: show


General Tree Serialization
--------------------------

.. revealjs-slide::

.. inlineav:: SequentialGenTreeCON ss
   :long_name: General Tree sequential representation Slideshow
   :links: AV/General/SequentialTreeCON.css
   :scripts: AV/General/SequentialGenTreeCON.js
   :output: show


