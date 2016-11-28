.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

==========
Union/FIND
==========

Union/FIND
----------

.. slide:: Disjoint Sets and Equivalence Classes

   Sometimes we have a collection of objects that we want to divide
   into separate sets.

   .. odsalink:: AV/General/UFCON.css

   .. inlineav:: UFconcomCON dgm
      :align: left

   .. odsascript:: AV/General/UFconcomCON.js


.. slide:: Approach

   Each object initially is a separate node in its own tree.

   When two objects are "equivalent", then add them to the same tree.

   Key question: **Given two nodes, are they in the same tree?**


.. slide:: Parent Pointer Implementation

   .. inlineav:: UFfigCON dgm
      :align: fill

   .. odsascript:: AV/General/UFfigCON.js


.. slide:: Union/FIND

   .. codeinclude:: General/ParPtrTree1
      :tag: UF1, UF2


.. slide:: Weighted Union

   A key goal is to keep the depth of nodes as shallow as possible
   (consistent with efficient processing).

   Weighted Union rule:
    * When two trees are union'ed, add one with fewer nodes as a child
      of the root of the tree with more nodes.
    * Depth is :math:`O(\log n)`


.. slide:: Algorithm Visualization

   .. inlineav:: ufCON ss
      :output: show

   .. odsascript:: AV/General/ufCON.js


.. slide:: .

   .


.. slide:: Path Compression

   .. inlineav:: pathcompCON ss
      :output: show

   .. odsascript:: AV/General/pathcompCON.js
