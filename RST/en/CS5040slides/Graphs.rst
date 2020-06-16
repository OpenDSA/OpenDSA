.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

======
Graphs
======

Graphs
------

.. slide:: Graphs

   * A graph :math:`G = (V, E)` consists of a set of vertices :math:`V`,
     and a set of edges :math:`E`, such that each edge in :math:`E` is a
     connection between a pair of vertices in :math:`V`.

   * The number of vertices is written :math:`|V|`, and the number
     edges is written :math:`|E|`.


   .. inlineav:: GdirundirCON dgm 
      :links: AV/Graph/GraphDefCON.css
      :scripts: AV/Graph/GdirundirCON.js
      :output: show


.. slide:: Paths, Cycles

   .. inlineav:: GneighborCON dgm
      :links: AV/Graph/GraphDefCON.css
      :scripts: AV/Graph/GneighborCON.js
      :output: show

   .. inlineav:: GpathDefCON dgm 
      :links: AV/Graph/GraphDefCON.css
      :scripts: AV/Graph/GpathDefCON.js
      :output: show 


.. slide:: Connected Components

   .. inlineav:: GconcomCON dgm
      :links: AV/Graph/GraphDefCON.css
      :scripts: AV/Graph/GconcomCON.js
      :output: show

   * The maximum connected subgraphs of an undirected graph are called
     connected components.


.. slide:: Directed Graph Representation

   .. inlineav:: GdirRepCON dgm 
      :links: AV/Graph/GraphDefCON.css
      :scripts: AV/Graph/GdirRepCON.js
      :output: show


.. slide:: Undirected Graph Representation

   .. inlineav:: GundirRepCON dgm 
      :links: AV/Graph/GraphDefCON.css
      :scripts: AV/Graph/GundirRepCON.js
      :output: show 


.. slide:: Representation Space Costs

   * Adjacency Matrix Space:
      * :math:`|V|^2`
      * Small constants

   * Adjacency List Space:
      * :math:`|V| + |E|`
      * Larger constants


.. slide:: Graph ADT

   .. codeinclude:: Graphs/Graph
      :tag: GraphADT


.. slide:: .

   .


.. slide:: Visiting Neighbors

   .. codeinclude:: Graphs/GraphDummy
      :tag: GraphNeighbor


.. slide:: Graph Traversals

   * Some applications require visiting every vertex in the graph exactly
     once.

   * The application may require that vertices be visited in some special
     order based on graph topology.

   * Examples:
      * Artificial Intelligence Search
      * Shortest paths problems


.. slide:: Graph Traversals (2)

   * To insure visiting all vertices:

   .. codeinclude:: Graphs/GraphTrav
      :tag: GraphTrav


.. slide:: Depth First Search (1)

   .. codeinclude:: Graphs/DFS
      :tag: DFS


.. slide:: Depth First Search (2)

   .. inlineav:: DFSCON ss
      :long_name: Depth-First Search Slideshow
      :links: AV/Graph/DFSCON.css
      :scripts: AV/Graph/DFSCON.js
      :output: show


.. slide:: Depth First Search (3)

   Cost: :math:`\Theta(|V| + |E|)`.


.. slide:: Breadth First Search (1)

   * Like DFS, but replace stack with a queue.
      * Visit vertex’s neighbors before continuing deeper in the tree.

   .. codeinclude:: Graphs/BFS
      :tag: BFS


.. slide:: Breadth First Search (3)

   .. inlineav:: BFSCON ss
      :long_name: Breadth-First Search Slideshow
      :links: AV/Graph/BFSCON.css
      :scripts: AV/Graph/BFSCON.js
      :output: show


.. slide:: Topological Sort

   * Problem: Given a set of jobs, courses, etc., with prerequisite
     constraints, output the jobs in an order that does not violate
     any of the prerequisites.


.. slide:: Depth-First Topological Sort (1)

   .. codeinclude:: Graphs/TopsortDFS
      :tag: TopsortDFS

.. slide:: Depth-First Topological Sort (2)

   .. inlineav:: topSortDFSCON ss
      :long_name: TopSort Slideshow
      :links: AV/Graph/topSortDFSCON.css
      :scripts: AV/Graph/topSortDFSCON.js
      :output: show



.. slide:: .

   .
               
               
.. slide:: Queue-Based Topsort (1)

   .. codeinclude:: Graphs/TopsortBFS
      :tag: TopsortBFS


.. slide:: .

   .


.. slide:: Queue-Based Topsort (2)
   
   .. inlineav:: topSortQCON ss
      :links: AV/Graph/topSortQCON.css
      :scripts: AV/Graph/topSortQCON.js
      :output: show

.. slide:: .

   .


.. slide:: Shortest Paths Problems

   * Input: A graph with weights or costs associated with each edge.

   * Output: The list of edges forming the shortest path.

   * Sample problems:
      * Find shortest path between two named vertices
      * Find shortest path from S to all other vertices
      * Find shortest path between all pairs of vertices

   * Will actually calculate only distances.


.. slide:: Shortest Paths Definitions

   * :math:`d(A, B)` is the shortest distance from vertex :math:`A` to
     :math:`B`.

   * :math:`w(A, B)` is the weight of the edge connecting :math:`A` to
     :math:`B`.
   * If there is no such edge, then :math:`w(A, B) = \infty`.


   .. inlineav:: DijkstraCON dgm
      :scripts: AV/Graph/DijkstraCON.js
      :align: center
      :output: show


.. slide:: Single-Source Shortest Paths

   * Given start vertex :math:`s`, find the shortest path from
     :math:`s` to all other vertices.

   * Try 1: Visit vertices in some order, compute shortest paths for
     all vertices seen so far, then add shortest path to next
     vertex :math:`x`.

   * Problem: Shortest path to a vertex already processed might go
     through :math:`x`.

   * Solution: Process vertices in order of distance from :math:`s`.


.. slide:: Dijkstra’s Algorithm Example

   .. inlineav:: DijkstraCON ss
      :links: AV/Graph/DijkstraCON.css
      :scripts: AV/Graph/DijkstraCON.js
      :output: show

.. slide:: .

   .

.. slide:: Dijkstra’s Implementation

   .. codeinclude:: Graphs/Dijkstra
      :tag: GraphDijk1


.. slide:: Implementing minVertex

   * Issue: How to determine the next-closest vertex? (I.e., implement
     ``minVertex``)

   * Approach 1: Scan through the table of current distances.
      * Cost: :math:`\Theta(|V|^2 + |E|) = \Theta(|V|^2)`.

   * Approach 2: Store unprocessed vertices using a min-heap to
     implement a priority queue ordered by :math:`D` value.  Must
     update priority queue for each edge.
   * Cost: :math:`\Theta((|V| + |E|)log|V|)`


.. slide:: Approach 1

   .. codeinclude:: Graphs/Dijkstra
      :tag: MinVertex


.. slide:: Approach 2

   .. codeinclude:: Graphs/DijkstraPQ
      :tag: DijkstraPQ


.. slide:: .

   .


.. slide:: All-pairs Shortest Paths (1)

   * We could run Shortest Paths starting at each vertex.

   * Better is to use Floyd's algorithm.
      * An example of Dynamic Programming
      * Simpler than it sounds: A trivial triple loop

   * Define a k-path from vertex :math:`v` to vertex :math:`u` to be
     any path whose intermediate vertices (aside from :math:`v` and
     :math:`u`) all have indices less than :math:`k`.


.. slide:: All-pairs Shortest Paths (2)

   .. odsafig:: Images/Floyd.png
      :width: 400
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: An example of :math:`k`-paths in Floyd's algorithm


.. slide:: Floyd's Algorithm

   .. codeinclude:: Graphs/Floyd
      :tag: Floyd


.. slide:: Minimal Cost Spanning Trees

   * Minimal Cost Spanning Tree (MST) Problem:

      * Input: An undirected, connected graph G.
      * Output: The subgraph of G that
         1. has minimum total cost as measured by summing the values of all
            the edges in the subset, and
         2. keeps the vertices connected.


.. slide:: MST Example

   .. inlineav:: MCSTCON dgm
      :links:
      :scripts: AV/Graph/MCSTCON.js
      :align: justify


.. slide:: Prim’s MST Algorithm

   .. inlineav:: primCON ss
      :links: AV/Graph/primCON.css
      :scripts: AV/Graph/primCON.js
      :output: show


.. slide:: .

   .


.. slide:: Implementation 1

   .. codeinclude:: Graphs/Prim
      :tag: Prims


.. slide:: Alternate Implementation

   * As with Dijkstra’s algorithm, the key issue is determining which
     vertex is next closest.

   * As with Dijkstra’s algorithm, the alternative is to use a
     priority queue.

   * Running times for the two implementations are identical to the
     corresponding Dijkstra’s algorithm implementations.


.. slide:: Kruskal’s MST Algorithm (1)

   * Initially, each vertex is in its own MST.

   * Merge two MST’s that have the shortest edge between them.
      * Use a priority queue to order the unprocessed edges.  Grab
        next one at each step.

   * How to tell if an edge connects two vertices already in the same
     MST?
   * Use the UNION/FIND algorithm with parent-pointer
        representation.


.. slide:: Kruskal’s MST Algorithm (2)

   .. inlineav:: kruskalCON ss
      :long_name: Kruskal Slideshow
      :links: AV/Graph/kruskalCON.css
      :scripts: AV/Graph/kruskalCON.js
      :output: show


.. slide:: .

   .


.. slide:: Kruskal’s MST Algorithm (3)

   * Cost is dominated by the time to remove edges from the heap.
      * Can stop processing edges once all vertices are in the same MST

   * Total cost: :math:`\Theta(|V| + |E| log |E|)`.
