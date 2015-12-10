.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: MCST; Union/Find
   :topic: Graphs


Kruskal's Algorithm
===================

Kruskal's Algorithm
-------------------

Our next MCST algorithm is commonly referred to as
:term:`Kruskal's algorithm`.
Kruskal's algorithm is also a simple, greedy algorithm.
First partition the set of vertices into :math:`|\mathbf{V}|`
:ref:`disjoint sets <UNION/FIND> <UnionFind>`,
each consisting of one vertex.
Then process the edges in order of weight.
An edge is added to the MCST, and two disjoint sets combined,
if the edge connects two vertices in different disjoint sets.
This process is repeated until only one disjoint set remains.

.. avembed:: AV/Development/KruskalUFAV.html ss

The edges can be processed in order of weight by using a
min-heap.
This is generally faster than sorting the edges first, because in
practice we need only visit a small fraction of the edges before
completing the MCST.
This is an example of finding only a
:ref:`few smallest elements <HeapSort>` in a list.

The only tricky part to this algorithm is determining if two vertices
belong to the same equivalence class.
Fortunately, the ideal algorithm is available for the purpose ---
the :ref:`UNION/FIND <UNION/FIND> <UnionFind>`.
Here is an implementation for Kruskal's algorithm.
Class ``KruskalElem`` is used to store the edges on the min-heap.

.. codeinclude:: Graphs/Kruskal
   :tag: Kruskal

Kruskal's algorithm is dominated by the time required to
process the edges.
The ``differ`` and ``UNION`` functions are nearly
constant in time if path compression and weighted union is used.
Thus, the total cost of the algorithm is
:math:`\Theta(|\mathbf{E}| \log |\mathbf{E}|)` in the worst case,
when nearly all edges must be processed before all the edges of the
spanning tree are found and the algorithm can stop.
More often the edges of the spanning tree are the shorter ones,and
only about :math:`|\mathbf{V}|` edges must be processed.
If so, the cost is often close to
:math:`\Theta(|\mathbf{V}| \log |\mathbf{E}|)` in the average case.

.. avembed:: AV/Development/KruskalPE.html pe

.. TODO::
   :type: Exercise

    Summary battery of questions for Prim's and Kruskal's algorithms.

.. odsascript:: AV/Development/MCSTCON.js
