.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :prerequisites: GraphTrav
   :topic: Graphs

Shortest-Paths Problems [Text]
==============================

On a road map, a road connecting two towns is typically
labeled with its distance.
We can model a road network as a directed graph whose edges are
labeled with real numbers.
These numbers represent the distance (or other cost metric, such as
travel time) between two vertices.
These labels may be called :dfn:`weights`, :dfn:`costs`, or
:dfn:`distances`, depending on the application.
Given such a graph, a typical problem is to find the total
length of the shortest path between two specified vertices.
This is not a trivial problem, because the shortest path may not be
along the edge (if any) connecting two vertices, but rather may be
along a path involving one or more intermediate vertices.
For example, in Figure :num:`Figure #DistExamp`,
the cost of the path from :math:`A` to :math:`B` to :math:`D` is 15.
The cost of the edge directly from :math:`A` to :math:`D` is 20.
The cost of the path from :math:`A` to :math:`C` to :math:`B` to
:math:`D` is 10.
Thus, the shortest path from :math:`A` to :math:`D` is 10
(rather than along the edge connecting :math:`A` to :math:`D`).
We use the notation :math:`\mathbf{d}(A, D) = 10` to indicate that
the
shortest distance from :math:`A` to :math:`D` is 10.
In Figure :num:`Figure #DistExamp`, there is no path from :math:`E` to
:math:`B`, so we set :math:`\mathbf{d}(E, B) = \infty`.
We define :math:`\mathbf{w}(A, D) = 20` to be the weight of edge
:math:`(A, D)`, that is, the weight of the direct connection
from :math:`A` to :math:`D`. 
Because there is no edge from :math:`E` to :math:`B`,
:math:`\mathbf{w}(E, B) = \infty`.
Note that :math:`\mathbf{w}(D, A) = \infty` because the graph of
Figure :num:`Figure #DistExamp` is directed.
We assume that all weights are positive.

.. _DistExamp:

.. figure:: Images/GraphDef.png
   :width: 500
   :align: center
   :figwidth: 90%
   :alt: Example graph for shortest-path definitions

   Example graph for shortest-path definitions.

Single-Source Shortest Paths
----------------------------

We will now present an algorithm to solve the
:dfn:`single-source shortest-paths` problem.
Given Vertex :math:`S` in Graph :math:`\mathbf{G}`,
find a shortest path from :math:`S` to every other vertex in
:math:`\mathbf{G}`.
We might want only the shortest path between two vertices,
:math:`S` and :math:`T`.
However in the worst case, finding the shortest path from
:math:`S` to :math:`T` requires us to find the shortest paths from
:math:`S` to every other vertex as well.
So there is no better algorithm (in the worst case) for
finding the shortest path to a single vertex than to find shortest
paths to all vertices.
The algorithm described here will only compute the distance to every
such vertex, rather than recording the actual path.
Recording the path requires only simple modifications to the algorithm.

Computer networks provide an application for the single-source
shortest-paths problem.
The goal is to find the cheapest way for one computer to broadcast
a message to all other computers on the network.
The network can be modeled by a graph with edge weights indicating
time or
cost to send a message to a neighboring computer.

For unweighted graphs (or whenever all edges have the same cost), the
single-source shortest paths can be found using a simple breadth-first
search.
When weights are added, BFS will not give the correct answer.

One approach to solving this problem when the edges have
differing weights might be to process the
vertices in a fixed order.
Label the vertices :math:`v_0` to :math:`v_{n-1}`, with
:math:`S = v_0`.
When processing Vertex :math:`v_1`, we take the edge connecting
:math:`v_0` and :math:`v_1`.
When processing :math:`v_2`, we consider the shortest distance from
:math:`v_0` to :math:`v_2` and compare that to the shortest
distance from :math:`v_0` to :math:`v_1` to :math:`v_2`.
When processing Vertex :math:`v_i`, we consider the shortest
path for Vertices :math:`v_0` through :math:`v_{i-1}` that have
already been processed.
Unfortunately, the true shortest path to :math:`v_i` might go
through Vertex `v_j` for :math:`j > i`.
Such a path will not be considered by this algorithm.
However, the problem would not occur if we process the vertices in
order of distance from :math:`S`.
Assume that we have processed in order of distance from :math:`S` to
the first :math:`i-1` vertices that are closest to :math:`S`;
call this set of vertices :math:`\mathbf{S}`.
We are now about to process the :math:`i` th closest vertex; call
it :math:`X`.
A shortest path from :math:`S` to :math:`X` must have its next-to-last
vertex in :math:`S`. 
Thus,

.. math::
   \mathbf{d}(S, X) =
   \min_{U \in \mathbf{S}}(\mathbf{d}(S, U) + \mathbf{w}(U, X)).

In other words, the shortest path from :math:`S` to :math:`X` is the
minimum over all paths that go from :math:`S` to :math:`U`, then have an
edge from :math:`U` to :math:`X`, where :math:`U` is some vertex
in :math:`\mathbf{S}`.

This solution is usually referred to as Dijkstra's algorithm.
It works by maintaining a distance estimate
:math:`\mathbf{D}(X)` for all vertices :math:`X` in :math:`\mathbf{V}`.
The elements of :math:`\mathbf{D}` are initialized to the value
``INFINITE``.
Vertices are processed in order of distance from :math:`S`.
Whenever a vertex :math:`v` is processed, :math:`\mathbf{D}(X)` is
updated for every neighbor :math:`X` of :math:`V`.
Here is an implementation for Dijkstra's
algorithm.
At the end, array ``D`` will contain the shortest distance values.

.. TODO::
   :type: CODE

   Dijkstra's algorithm code goes here.

There are two reasonable solutions to the key issue of finding the
unvisited vertex with minimum distance value during each pass through
the main ``for`` loop.
The first method is simply to scan through the list of
:math:`|\mathbf{V}|` vertices searching for the minimum value, as
follows:

.. TODO::
   :type: CODE

   MinVert.book code goes here

.. TODO::
   :type: CODE

   Why does the code look for an unvisited value first?
   Is there an easier way?

Because this scan is done :math:`|\mathbf{V}|` times,
and because each edge requires a constant-time update to ``D``,
the total cost for this approach 
is :math:`\Theta(|\mathbf{V}|^2 + |\mathbf{E}|) =
\Theta(|\mathbf{V}|^2)`,
because :math:`|\mathbf{E}|` is in :math:`O(|\mathbf{V}|^2)`.

The second method is to store unprocessed vertices in a
min-heap ordered by distance values.
The next-closest vertex can be found in the heap in
:math:`\Theta(\log |\mathbf{V}|)` time.
Every time we modify :math:`\mathbf{D}(X)`,
we could reorder :math:`X` in
the heap by deleting and reinserting it.
This is an example of a priority queue with
priority update, as described in Module :numref: `<Heaps>`.
To implement true priority updating, we would need to store with each
vertex its array index within the heap.
A simpler approach is to add the new (smaller) distance value
for a given vertex as a new record in the heap.
The smallest value for a given vertex currently in the heap will be
found first, and greater distance values found later will be ignored
because the vertex will already be marked as ``VISITED``.
The only disadvantage to repeatedly inserting distance values is that
it will raise the number of elements in the heap from
:math:`\Theta(|\mathbf{V}|)` to :math:`\Theta(|\mathbf{E}|)`
in the worst case. 
The time complexity is
:math:`\Theta((|\mathbf{V}| + |\mathbf{E}|) \log |\mathbf{E}|)`,
because for each edge we must reorder the heap.
Because the objects stored on the heap need to know both their vertex
number and their distance, we create a simple class for the purpose
called ``DijkElem``, as follows.
``DijkElem`` is quite similar to the ``Edge`` class used by the
adjacency list representation.

.. TODO::
   :type: CODE

   DijkElem.book code here

Next we show an implementation for Dijkstra's
algorithm using the priority queue.

.. TODO::
   :type: CODE

   Grdijk2.book code here

Using ``MinVertex`` to scan the vertex list for the minimum value
is more efficient when the graph is dense, that is, when
:math:`|\mathbf{E}|` approaches :math:`|\mathbf{V}|^2`.
Using a priority queue is more efficient when the graph is sparse
because its cost is
:math:`\Theta((|\mathbf{V}| + |\mathbf{E}|) \log |\mathbf{E}|)`.
However, when the graph is dense, this cost can become as great as
:math:`\Theta(|\mathbf{V}|^2 \log |\mathbf{E}|) = \Theta(|V|^2 \log |V|)`.

.. TODO::
   :type: Slideshow

   This slideshow illustrates Dijkstra's algorithm.
   The start vertex is A.
   All vertices except A have an initial value of :math:`\infty`.
   After processing Vertex A, its neighbors have their D estimates
   updated to be the direct distance from A.
   After processing C (the closest vertex to A),
   Vertices B and E are updated to reflect the shortest
   path through C.
   The remaining vertices are processed in order B, D,
   and E.
   Changes in the D array should be shown along with this.
