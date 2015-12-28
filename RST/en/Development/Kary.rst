.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :topic: General Trees

:math:`K`-ary Trees
===================

:math:`K`-ary trees are trees whose internal nodes all have exactly
:math:`K` children.
Thus, a full binary tree is a 2-ary tree.
The PR Quadtree discussed in Module :numref:`<Spatial>` is an example
of a 4-ary tree.
Because :math:`K`-ary tree nodes have a fixed number of children,
unlike general trees, they are relatively easy to implement.
In general, :math:`K`-ary trees bear many similarities to binary
trees, and similar implementations can be used for :math:`K`-ary tree
nodes.
Note that as :math:`K` becomes large, the potential number of ``null``
pointers grows, and the difference between the required sizes for
internal nodes and leaf nodes increases.
Thus, as :math:`K` becomes larger, the need to choose separate
implementations for the internal and leaf nodes becomes more
pressing.

:term:`Full K-ary trees <full K-ary tree>` and
:term:`complete K-ary trees <complete K-ary tree>` are analogous
to full and complete binary trees, respectively.

.. TODO::
   :type: Slideshow

   Slideshow of Book Figure 6.16: shows full and complete \Kary\ trees
   for K=3. In practice, most applications of \Kary\ trees limit them
   to be either full or complete.

   Full and complete 3-ary trees.
   (a)~This tree is full (but not complete).
   (b)~This tree is complete (but not full).}{ThreeTree}

Many of the properties of binary trees extend to :math:`K`-ary trees.
Equivalent theorems to those in Module numref`<BinSpace>` regarding the
number of ``null`` pointers in a :math:`K`-ary tree and the
relationship between the number of leaves and the number of internal
nodes in a :math:`K`-ary tree can be derived.
We can also store a complete :math:`K`-ary tree in an array,
using simple formulas to compute a node's relations in a manner
similar to that used in
Section :numref:`<CompleteTree>`.
