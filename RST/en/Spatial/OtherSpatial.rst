.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: Spatial data structures; PRquadtree; KD tree; Bintree
   :satisfies: PRquadtree
   :topic: Spatial Data Structures

Other Spatial Data Structures
=============================

The differences between the :term:`kd tree` and the
:term:`PR quadtree` illustrate many of the design choices encountered
when creating :term:`spatial data structures`. 
The kd tree provides an :term:`object space decomposition` of the
region, while the PR quadtree provides a :term:`key space decomposition`
(thus, it is a :term:`trie`).
The kd tree stores records at all nodes, while the
PR quadtree stores records only at the leaf nodes.
Finally, the two trees have different structures.
The kd tree is a binary tree (and need not be full),
while the PR quadtree is a :term:`full tree` with
:math:`2^d` branches (in the two-dimensional case, :math:`2^2 = 4`).
Consider the extension of this concept to three dimensions.
A kd tree for three dimensions would alternate the discriminator
through the :math:`x`, :math:`y`, and :math:`z` dimensions.
The three-dimensional equivalent of the PR quadtree would be a tree
with :math:`2^3` or eight branches.
Such a tree is called an :term:`octree`.

We can also devise a binary trie based on a key space decomposition in
each dimension, or a quadtree that uses the two-dimensional equivalent
to an object space decomposition.
The :term:`bintree` is a binary trie that
uses keyspace decomposition and alternates discriminators at each
level in a manner similar to the kd tree.
The bintree for the points of Figure :num:`Figure #kdExamp` is shown in
Figure :num:`Figure #BintreeFig2`.
Alternatively, we can use a four-way decomposition of space centered
on the data points.
The tree resulting from such a decomposition is called a
:term:`point quadtree`.
The point quadtree for the data points of Figure :num:`Figure #BintreeFig2`
is shown in Figure :num:`Figure #PtQuadFig`.

.. _BintreeFig2:

.. odsafig:: Images/Bintree.png
   :width: 500
   :align: center
   :capalign: center
   :figwidth: 90%
   :alt: Example of a Bintree.

   An example of the bintree, a binary tree using key space
   decomposition and discriminators rotating among the dimensions.
   Compare this with the kd tree of Figure :num:`Figure #kdExamp`,
   the PR quadtree of Figure :num:`Figure #PRExamp`, and
   the point quadtree of Figure :num:`Figure #PtQuadFig`.


.. _PtQuadFIg:

.. odsafig:: Images/PtQuad.png
   :width: 500
   :align: center
   :capalign: center
   :figwidth: 90%
   :alt: Example of a Point Quadtree

   An example of the point quadtree, a 4-ary tree using object space
   decomposition.
   Compare this with the PR quadtree of Figure :num:`Figure #PRExamp`.

Our discussion of spatial data structures for storing points
has barely scratched the surface of the field of spatial
data structures.
Dozens of distinct spatial data structures have been
invented, many with variations and alternate implementations.
Spatial data structures exist for storing many forms of spatial data
other than points.
The most important distinctions between are the tree structure
(binary or not, regular decompositions or not) and the decomposition
rule used to decide when the data contained within a region is so
complex that the region must be subdivided.

One such spatial data structure is the
:term:`Region Quadtree` for storing images where the pixel values tend
to be blocky, such as a map of the countries of the world.
The region quadtree uses a four-way regular decomposition scheme
similar to the PR quadtree
The decomposition rule is simply to divide any node containing pixels
of more than one color or value.

Spatial data structures can also be used to store line object,
rectangle object, or objects of arbitrary shape (such as polygons in
two dimensions or polyhedra in three dimensions).
A simple, yet effective, data structure for storing rectangles or
arbitrary polygonal shapes can be derived from the PR quadtree.
Pick a threshold value :math:`c`, and subdivide any region into four
quadrants if it contains more than :math:`c` objects.
A special case must be dealt with when more than :math:`c` objects
intersect.

Some of the most interesting developments in spatial data structures
have to do with adapting them for disk-based applications.
However, all such disk-based implementations boil down to storing the
spatial data structure within some variant
on either :term:`B-trees <B-tree>` or :term:`hashing`.
