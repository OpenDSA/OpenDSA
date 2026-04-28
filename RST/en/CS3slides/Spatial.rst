.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

=======================
Spatial Data Structures
=======================

Spatial Data Structures
-----------------------

.. revealjs-slide::

* BST can take any comparable type, but is a one-dimensional key.

  * XY coords are 2-dimensional. Could combine? Would help for exact
    match, but not ranges (find in a search circle).
  * Could use two BSTs? Of narrow search on X? (would find everything
    in a vertical band, each would have to be checked for distance)

* These same issues apply for any other search structure that takes a
  one-dimensional key.


KD Trees
--------

KD Trees are identical to BSTs, except they store multi-dimensional
data and rotate through the keys at each level.

* Each level has a "discriminator" value.
* The levels rotate through the dimensions of the multi-dimensional
  key.

.. odsafig:: Images/KDtree.png
   :width: 600
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Example of a kd tree


K-D Tree Visualization
----------------------

.. revealjs-slide::

.. avembed:: AV/Spatial/kd-treeAV.html ss
   :keyword: Spatial Data Structures, KD Tree


Bintree 1
---------

.. revealjs-slide::

The Bintree is similar to the KD-tree in that each level has splits
and direction-finding driven by one dimension in the key, and it
alternates through the dimensions.

* But, the split is in the middle of the key range (image space
  vs. object space splitting)
* The Bintree is a trie: No data at the internal nodes, and some leaf
  nodes can be empty.


Bintree 2
---------

.. revealjs-slide::

.. raw:: html

   <iframe src="../../../Metadata/inlineav/Spatial/bintreeCON.html" 
           width="960" 
           height="550"
           frameborder="0"
           style="background: white; display: block; margin: 0 auto;">
   </iframe>


Bintree 2
---------

.. revealjs-slide::

.. avembed:: AV/Spatial/BintreeAV.html ss
   :keyword: Spatial Data Structures, Bintree


PR Quadtrees
------------

.. revealjs-slide::

Like the Bintree, but splits in all dimensions at once. For two
dimensions, this means 4 children (three dimensions would mean 8 children).

Some similarity to DNA trees.

.. avembed:: AV/Spatial/PRquadtreeInter.html ss
   :keyword: Spatial Data Structures, PR Quadtree


Point Quadtree
--------------

.. revealjs-slide::

* Like PR Quadtree, but using Object Space Decomposition.
* Not a trie
* Fills out our last data structure in the design space.

.. odsafig:: Images/PtQuad.png
   :width: 500
   :align: center
   :capalign: center
   :figwidth: 90%
   :alt: Example of a Point Quadtree


Extending the Concept
---------------------

.. revealjs-slide::

Spatial data structures have a **Decomposition Rule**.

* The rule might be to allow more than one point in a node.


Going Beyond Points
-------------------

.. revealjs-slide::


* We can store any objects, not just points.

* A sensible decomposition rule can make this efficient.

* For example, we could store boxes in 2D.

  * But what about boxes that overlap? Splitting can't separate them.

  * So, the system has to allow for an arbirary number of overlapping
    boxes.

  * Since we need to allow for storing a list of boxes anyway, we
    might as well allow more than one even when there is no split.

  * Example rule: A node can store a list of up to three boxes, or
    as many boxes as required if they all share a common intersection.

  * If the boxes in the node violate this rule, then split it (during
    insertion).

  * If an internal node has two leaf children that, together, pass the
    rule, then merge them (on deletion).

* This approach supports efficient detection of box intersections.
