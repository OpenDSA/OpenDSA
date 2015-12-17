.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires:
   :satisfies: Spatial data structures
   :topic: Spatial Data Structures

Spatial Data Structures:
========================

Search trees such as :term:`BSTs <BST>`, :term:`AVL trees <AVL Tree>`,
:term:`splay trees <Splay Tree>`, :term:`2-3 Trees <2-3 tree>`,
:term:`B-trees <B-tree>`, and :term:`tries <trie>` are designed for
searching on a one-dimensional key.
A typical example is an integer key, whose one-dimensional range
can be visualized as a number line.
These various tree structures can be viewed as dividing this
one-dimensional number line into pieces.

Some databases require support for multiple keys.
In other words, records can be searched for using any one of several
key fields, such as name or ID number.
Typically, each such key has its own one-dimensional index,
and any given search query searches one of these independent
indices as appropriate.

Multdimensional Keys
~~~~~~~~~~~~~~~~~~~~

A multidimensional search key presents a rather different concept.
Imagine that we have a database of city records, where
each city has a name and an :math:`xy` coordinate.
A BST or splay tree provides good performance for searches on city
name, which is a one-dimensional key.
Separate BSTs could be used to index the :math:`x` and :math:`y`
coordinates.
This would allow us to insert and delete cities, and locate them by
name or by one coordinate.
However, search on one of the two coordinates is not a natural way to
view search in a two-dimensional space.
Another option is to combine the :math:`xy` coordinates into a single
key, say by concatenating the two coordinates, and
index cities by the resulting key in a BST.
That would allow search by coordinate, but would not allow for an
efficient two-dimensional :term:`range query` such as searching for
all cities within a given distance of a specified point.
The problem is that the BST only works well for one-dimensional keys,
while a coordinate is a two-dimensional key where neither dimension
is more important than the other.

Multidimensional range queries are the defining feature
of a :term:`spatial application`.
Because a coordinate gives a position in space, it is called
a :term:`spatial attribute`.
To implement spatial applications efficiently requires the use of a
:term:`spatial data structure`.
Spatial data structures store data objects organized by position and
are an important class of data structures used in geographic
information systems, computer graphics, robotics, and many other
fields.

A number of spatial data structures are used for storing
point data in two or more dimensions.
The :term:`kd tree` is a natural extension
of the BST to multiple dimensions.
It is a binary tree whose splitting decisions alternate among the
key dimensions.
Like the BST, the kd tree uses :term:`object space decomposition`.
The :term:`PR quadtree` uses
:term:`key space decomposition` and so is a form
of :term:`trie`.
It is a binary tree only for one-dimensional keys (in which case it
is a trie with a binary alphabet).
For :math:`d` dimensions it has :math:`2^d` branches.
Thus, in two dimensions, the PR quadtree
has four branches (hence the name "quadtree"), splitting space into
four equal-sized quadrants at each branch.
Two other variations on these data structures are the
:ref:`bintree <bintree> <Bintree>` and the
:term:`point quadtree`.
These four structures cover all four combinations of object versus key
space decomposition on the one hand, and multi-level binary versus
:math:`2^d`-way branching on the other.
