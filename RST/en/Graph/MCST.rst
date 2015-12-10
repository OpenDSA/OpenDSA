.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :satisfies: Prim's algorithm; MCST
   :requires: graph shortest path
   :topic: Graphs

Minimal Cost Spanning Trees
===========================

Minimal Cost Spanning Trees
---------------------------

The :term:`minimal-cost spanning tree` (MCST)
problem takes as input a connected, undirected graph
:math:`\mathbf{G}`, where each edge has a distance or weight measure
attached.
The MCST is the graph containing the vertices of :math:`\mathbf{G}`
along with the subset of :math:`\mathbf{G}` 's edges that
(1) has minimum total cost as measured by summing the values for all
of the edges in the subset, and
(2) keeps the vertices connected.
Applications where a solution to this problem is
useful include soldering the shortest set of wires needed to connect a
set of terminals on a circuit board, and connecting a set of cities by
telephone lines in such a way as to require the least amount of cable.

The MCST contains no cycles.
If a proposed MCST did have a cycle, a cheaper MCST could be
had by removing any one of the edges in the cycle.
Thus, the MCST is a free tree with :math:`|\mathbf{V}| - 1` edges.
The name "minimum-cost spanning tree" comes from the fact that the
required set of edges forms a tree, it spans the vertices (i.e., it
connects them together), and it has minimum cost.
Figure :num:`Figure #MCSTdgm` shows the MCST for an example graph.

.. _MCSTdgm:

.. inlineav:: MCSTCON dgm
   :align: justify

   A graph and its MCST.
   All edges appear in the original graph.
   Those edges drawn with heavy lines indicate
   the subset making up the MCST.
   Note that edge :math:`(C, F)` could be replaced with edge
   :math:`(D, F)` to form a different MCST with equal cost.

.. TODO::
   :type: Slideshow

   Replace the previous diagram with a slideshow illustrating the
   concept of MCST.


Prim's Algorithm
----------------

The first of our two algorithms for finding MCSTs is commonly
referred to as :term:`Prim's algorithm`.
Prim's algorithm is very simple.
Start with any Vertex :math:`N` in the graph, setting the MCST
to be :math:`N` initially.
Pick the least-cost edge connected to :math:`N`.
This edge connects :math:`N` to another vertex; call this :math:`M`.
Add Vertex :math:`M` and Edge :math:`(N, M)` to the MCST.
Next, pick the least-cost edge coming from either :math:`N` or
:math:`M` to any other vertex in the graph.
Add this edge and the new vertex it reaches to the MCST.
This process continues, at each step expanding the MCST by selecting
the least-cost edge from a vertex currently in the MCST to a vertex
not currently in the MCST. 

Prim's algorithm is quite similar to Dijkstra's algorithm for finding
the single-source shortest
paths.
The primary difference is that we are seeking not the next closest
vertex to the start vertex, but rather the next closest vertex to any
vertex currently in the MCST.
Thus we replace the lines::

   if (D[w] > (D[v] + G.weight(v, w)))
     D[w] = D[v] + G.weight(v, w);

in Djikstra's algorithm with the lines::

    if (D[w] > G.weight(v, w))
      D[w] = G.weight(v, w);

in Prim's algorithm.

The following code shows an implementation for Prim's algorithm
that searches the distance matrix for the next closest vertex.

.. codeinclude:: Graphs/Prim
   :tag: Prims

For each vertex :math:`I`, when :math:`I` is processed by Prim's
algorithm, an edge going to :math:`I` is added to the MCST that we are
building.
Array ``V[I]`` stores the previously visited vertex that is
closest to Vertex `I`.
This information lets us know which edge goes into the MCST when
Vertex :math:`I` is processed.
The implementation above also contains calls to
``AddEdgetoMST`` to indicate which edges are actually added to the
MCST.

.. avembed:: AV/Graph/PrimAV.html ss


Prim's Algorithm Alternative Implementation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alternatively, we can implement Prim's algorithm using a
:term:`priority queue` to find the next closest vertex, as
shown next.
As with the priority queue version of Dijkstra's algorithm,
the :term:`heap` stores ``DijkElem`` objects.

.. codeinclude:: Graphs/PrimPQ
   :tag: PrimsPQ

.. TODO::
   :type: Slideshow

   Implement a slideshow demonstrating the Priority Queue version of
   Prim's algorithm

Here is an AV that lets you try Prim's algorithm on other graphs.

.. avembed:: AV/Graph/PrimAVPQ.html ss

Prim's algorithm is an example of a greedy
algorithm.
At each step in the ``for`` loop, we select the least-cost edge that
connects some marked vertex to some unmarked vertex.
The algorithm does not otherwise check that the MCST really should
include this least-cost edge.
This leads to an important question:
Does Prim's algorithm work correctly?
Clearly it generates a spanning tree (because each pass through the
``for`` loop adds one edge and one unmarked vertex to the spanning tree
until all vertices have been added), but does this tree have minimum
cost?

   **Theorem:** Prim's algorithm produces a minimum-cost spanning tree.

   **Proof:** We will use a proof by contradiction.
   Let :math:`\mathbf{G} = (\mathbf{V}, \mathbf{E})` be a graph for which
   Prim's algorithm does *not* generate an MCST.
   Define an ordering on the vertices according to the order in which
   they were added by Prim's algorithm to the MCST:
   :math:`v_0, v_1, ..., v_{n-1}`. 
   Let edge :math:`e_i` connect :math:`(v_x, v_i)` for
   some :math:`x < i` and :math:`i \leq 1`.
   Let :math:`e_j` be the lowest numbered (first) edge added
   by Prim's algorithm such that the set of edges selected so
   far *cannot* be extended to form an MCST for :math:`\mathbf{G}`.
   In other words, :math:`e_j` is the first edge where Prim's algorithm
   "went wrong."
   Let :math:`\mathbf{T}` be the "true" MCST.
   Call :math:`\v_p (p<j)` the vertex connected by edge
   :math:`e_j`, that is, :math:`e_j = (v_p, v_j)`.

   Because :math:`\mathbf{T}` is a tree, there exists some path in
   :math:`\mathbf{T}` connecting :math:`v_p` and :math:`v_j`.
   There must be some edge :math:`e'` in this path connecting vertices
   :math:`v_u` and :math:`v_w`, with :math:`u < j` and :math:`w \geq j`.
   Because :math:`e_j` is not part of :math:`\mathbf{T}`, adding edge
   :math:`e_j` to :math:`\mathbf{T}` forms a cycle.
   Edge :math:`e'` must be of lower cost than
   edge :math:`e_j`, because Prim's algorithm did not generate an MCST.
   This situation is illustrated in Figure :num:`Figure #PrimProof`.
   However, Prim's algorithm would have selected the least-cost edge
   available.
   It would have selected :math:`e'`, not :math:`e_j`.
   Thus, it is a contradiction that Prim's algorithm would have selected
   the wrong edge, and thus, Prim's algorithm must be correct. BOX HERE

.. _PrimProof:

.. odsafig:: Images/PrimMST.png
   :width: 400
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Prim's MCST algorithm proof

   Prim's MCST algorithm proof.
   The left oval contains that portion of the graph where Prim's MCST
   and the "true" MCST :math:`\mathbf{T}` agree.
   The right oval contains the rest of the graph.
   The two portions of the graph are connected by (at least) edges 
   :math:`e_j` (selected by Prim's algorithm to be in the MCST) and
   :math:`e'` (the "correct" edge to be placed in the MCST).
   Note that the path from :math:`v_w` to :math:`v_j` cannot
   include any marked vertex :math:`v_i, i \leq j`, because to do so
   would form a cycle.

.. avembed:: AV/Graph/PrimAVPE.html pe

.. TODO::
   :type: Exercise

   Proficiency exercise for Prim's algorithm.

.. odsascript:: AV/Graph/MCSTCON.js
