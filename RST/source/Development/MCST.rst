.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :prerequisites: GraphShortest
   :topic: Graphs

Minimal Cost Spanning Trees [Storyboard]
========================================

The :dfn:`minimum-cost spanning tree` (MST)
problem takes as input a connected, undirected graph
:math:`\mathbf{G}`, where each edge has a distance or weight measure
attached.
The MST is the graph containing the vertices of :math:`\mathbf{G}`
along with the subset of :math:`\mathbf{G}` 's edges that
(1) has minimum total cost as measured by summing the values for all
of the edges in the subset, and
(2) keeps the vertices connected.
Applications where a solution to this problem is
useful include soldering the shortest set of wires needed to connect a
set of terminals on a circuit board, and connecting a set of cities by
telephone lines in such a way as to require the least amount of cable.

The MST contains no cycles.
If a proposed MST did have a cycle, a cheaper MST could be
had by removing any one of the edges in the cycle.
Thus, the MST is a free tree with :math:`|\mathbf{V}| - 1` edges.
The name "minimum-cost spanning tree" comes from the fact that the
required set of edges forms a tree, it spans the vertices (i.e., it
connects them together), and it has minimum cost.
Figure :num:`Figure #MCSTdgm` shows the MST for an example graph.

.. inlineav:: MCSTCON1 dgm
   :target: MCSTdgm
   :align: justify

   A graph and its MST.
   All edges appear in the original graph.
   Those edges drawn with heavy lines indicate
   the subset making up the MST.
   Note that edge :math:`(C, F)` could be replaced with edge
   :math:`(D, F)` to form a different MST with equal cost.

.. TODO::
   :type: Slideshow

   Replace the previous disagram with a slideshow illustrating the
   concept of MCST.


Prim's Algorithm
----------------

The first of our two algorithms for finding MSTs is commonly
referred to as Prim's algorithm.
Prim's algorithm is very simple.
Start with any Vertex :math:`N` in the graph, setting the MST
to be :math:`N` initially.
Pick the least-cost edge connected to :math:`N`.
This edge connects :math:`N` to another vertex; call this :math:`M`.
Add Vertex :math:`M` and Edge :math:`(N, M)` to the MST.
Next, pick the least-cost edge coming from either :math:`N` or
:math:`M` to any other vertex in the graph.
Add this edge and the new vertex it reaches to the MST.
This process continues, at each step expanding the MST by selecting
the least-cost edge from a vertex currently in the MST to a vertex not
currently in the MST. 

Prim's algorithm is quite similar to Dijkstra's algorithm for finding
the single-source shortest
paths.
The primary difference is that we are seeking not the next closest
vertex to the start vertex, but rather the next closest vertex to any
vertex currently in the MST.
Thus we replace the lines::

   if (D[w] > (D[v] + G.weight(v, w)))
     D[w] = D[v] + G.weight(v, w);

in Djikstra's algorithm with the lines::

    if (D[w] > G.weight(v, w))
      D[w] = G.weight(v, w);

in Prim's algorithm.

The following code shows an implementation for Prim's algorithm
that searches the distance matrix for the next closest vertex.

.. codeinclude:: Graphs/Prim.pde
   :tag: Prims

For each vertex :math:`I`, when :math:`I` is processed by Prim's
algorithm, an edge going to :math:`I` is added to the MST that we are
building.
Array ``V[I]`` stores the previously visited vertex that is
closest to Vertex `I`.
This information lets us know which edge goes into the MST when
Vertex :math:`I` is processed.
The implementation above also contains calls to
``AddEdgetoMST`` to indicate which edges are actually added to the
MST.

.. TODO::
   :type: Slideshow

   Put this example into a slideshow:

   For the graph of Figure :num:`Figure #MCSTdgm`, assume that we
   begin by marking Vertex :math:`A`.
   From :math:`A`, the least-cost edge leads to Vertex :math:`C`.
   Vertex :math:`C` and edge :math:`(A, C)` are added to the MST.
   At this point, our candidate edges connecting the MST
   (Vertices :math:`A` and :math:`C`) with the rest of the graph are
   :math:`(A, E), (C, B), (C, D)`, and :math:`(C, F)`.
   From these choices, the least-cost edge from the MST is
   :math:`(C, D)`. 
   So we add Vertex :math:`D` to the MST.
   For the next iteration, our edge choices are
   :math:`(A, E), (C, B), (C, F)`, and :math:`(D, F)`.
   Because edges :math:`(C, F)` and :math:`(D, F)` happen to
   have equal cost, it is an arbitrary decision as to which gets
   selected.
   Say we pick :math:`(C, F)`.
   The next step marks Vertex :math:`E` and adds edge
   :math:`(F, E)` to the MST.
   Following in this manner, Vertex :math:`B`
   (through edge :math:`(C, B)`) is marked.
   At this point, the algorithm terminates.

Alternatively, we can implement Prim's algorithm using a priority
queue to find the next closest vertex, as
shown next.
As with the priority queue version of Dijkstra's algorithm, the heap
stores ``DijkElem`` objects.

.. codeinclude:: Graphs/PrimPQ.pde
   :tag: PrimsPQ

.. TODO::
   :type: Slideshow

   Implement a slideshow demonstrating the Priority Queue version of
   Prim's algorithm

Here is an AV that lets you try Prim's algorithm on other graphs.

.. avembed:: AV/Development/PrimAV.html ss

Prim's algorithm is an example of a greedy
algorithm.
At each step in the ``for`` loop, we select the least-cost edge that
connects some marked vertex to some unmarked vertex.
The algorithm does not otherwise check that the MST really should
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
   Prim's algorithm does *not* generate an MST.
   Define an ordering on the vertices according to the order in which
   they were added by Prim's algorithm to the MST:
   :math:`v_0, v_1, ..., v_{n-1}`. 
   Let edge :math:`e_i` connect :math:`(v_x, v_i)` for
   some :math:`x < i` and :math:`i \leq 1`.
   Let :math:`e_j` be the lowest numbered (first) edge added
   by Prim's algorithm such that the set of edges selected so
   far *cannot* be extended to form an MST for :math:`\mathbf{G}`.
   In other words, :math:`e_j` is the first edge where Prim's algorithm
   "went wrong."
   Let :math:`\mathbf{T}` be the "true" MST.
   Call :math:`\v_p (p<j)` the vertex connected by edge
   :math:`e_j`, that is, :math:`e_j = (v_p, v_j)`.

   Because :math:`\mathbf{T}` is a tree, there exists some path in
   :math:`\mathbf{T}` connecting :math:`v_p` and :math:`v_j`.
   There must be some edge :math:`e'` in this path connecting vertices
   :math:`v_u` and :math:`v_w`, with :math:`u < j` and :math:`w \geq j`.
   Because :math:`e_j` is not part of :math:`\mathbf{T}`, adding edge
   :math:`e_j` to :math:`\mathbf{T}` forms a cycle.
   Edge :math:`e'` must be of lower cost than
   edge :math:`e_j`, because Prim's algorithm did not generate an MST.
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
   :alt: Prim's MST algorithm proof

   Prim's MST algorithm proof.
   The left oval contains that portion of the graph where Prim's MST
   and the "true" MST :math:`\mathbf{T}` agree.
   The right oval contains the rest of the graph.
   The two portions of the graph are connected by (at least) edges 
   :math:`e_j` (selected by Prim's algorithm to be in the MST) and
   :math:`e'` (the "correct" edge to be placed in the MST).
   Note that the path from :math:`v_w` to :math:`v_j` cannot
   include any marked vertex :math:`v_i, i \leq j`, because to do so
   would form a cycle.

.. TODO::
   :type: Exercise

   Proficiency exercise for Kruskal's algorithm.

Kruskal's Algorithm
-------------------

Our next MST algorithm is commonly referred to as Kruskal's
algorithm.
Kruskal's algorithm is also a simple, greedy algorithm.
First partition the set of vertices into :math:`|\mathbf{V}|`
equivalence classes (see Module :numref:`<UnionFind>`)
each consisting of one vertex.
Then process the edges in order of weight.
An edge is added to the MST, and two equivalence classes combined,
if the edge connects two vertices in different equivalence classes.
This process is repeated until only one equivalence class remains.

.. TODO::
   :type: Slideshow

   Put this example into a slideshow:

   Figure :num:`Figure #KruskalFig` shows the first three steps of
   Kruskal's Algorithm for the graph of
   Figure :num:`Figure #MCSTdgm`.
   Edge (C, D) has the least cost, and because
   C and D are currently in separate MSTs, they are combined.
   We next select edge (E, F) to process, and combine these
   vertices into a single MST.
   The third edge we process is (C, F), which causes the
   MST containing Vertices C and D to merge with the MST
   containing Vertices E and F.
   The next edge to process is (D, F).
   But because Vertices D and F are currently in the same
   MST, this edge is rejected.
   The algorithm will continue on to accept edges (B, C)
   and (A, C) into the MST.

.. _KruskalFig:

.. odsafig:: Images/Kruskal.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Illustration of Kruskal's MST algorithm

   Illustration of the first three steps of Kruskal's MST algorithm as
   applied to the graph of Figure :num:`Figure #MCSTdgm`.

The edges can be processed in order of weight by using a
min-heap.
This is generally faster than sorting the edges first, because in
practice we need only visit a small fraction of the edges before
completing the MST.
This is an example of finding only a few smallest elements in a list,
as discussed in Module :numref:`<Heaps>`.

The only tricky part to this algorithm is determining if two vertices
belong to the same equivalence class.
Fortunately, the ideal algorithm is available for the purpose ---
the UNION/FIND algorithm based on
the parent pointer representation for trees described in
Module :numref:`<UnionFind>`.
Here is an implementation for the algorithm.
Class ``KruskalElem`` is used to store the edges on the min-heap.

.. codeinclude:: Graphs/Kruskal.pde
   :tag: Kruskal

.. TODO::
   :type: AV

   Provide AV to demonstrate Kruskal's algorithm

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

.. TODO::
   :type: Exercise

   Proficiency exercise for Kruskal's algorithm.

.. TODO::
   :type: Exercise

   Summary battery of questions for Prim's and Kruskal's algorithms.

.. odsascript:: AV/Development/MCSTCON.js
