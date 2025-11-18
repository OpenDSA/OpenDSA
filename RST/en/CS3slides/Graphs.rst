.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

======
Graphs
======

Graphs
------

.. revealjs-slide::

* A graph :math:`G = (V, E)` consists of a set of vertices :math:`V`,
  and a set of edges :math:`E`, such that each edge in :math:`E` is a
  connection between a pair of vertices in :math:`V`.

* The number of vertices is written :math:`|V|`, and the number
  edges is written :math:`|E|`.

.. inlineav:: GdirundirCON dgm 
   :links: AV/Graph/GraphDefCON.css
   :scripts: AV/Graph/GdirundirCON.js
   :output: show


Paths, Cycles
-------------

.. revealjs-slide::

.. inlineav:: GneighborCON dgm
   :links: AV/Graph/GraphDefCON.css
   :scripts: AV/Graph/GneighborCON.js
   :output: show

.. inlineav:: GpathDefCON dgm 
   :links: AV/Graph/GraphDefCON.css
   :scripts: AV/Graph/GpathDefCON.js
   :output: show 


Connected Components
--------------------

.. revealjs-slide::

.. inlineav:: GconcomCON dgm
      :links: AV/Graph/GraphDefCON.css
      :scripts: AV/Graph/GconcomCON.js
      :output: show

* The maximum connected subgraphs of an undirected graph are called
  connected components.


Directed Graph Representation
-----------------------------

.. revealjs-slide::

.. raw:: html

   <iframe src="../../../Metadata/inlineav/Graph/GdirRepCON.html" 
           width="960" 
           height="700" 
           frameborder="0"
           style="background: white; display: block; margin: 0 auto;">
   </iframe>


Undirected Graph Representation
-------------------------------

.. revealjs-slide::

.. raw:: html

   <iframe src="../../../Metadata/inlineav/Graph/GundirRepCON.html" 
           width="960" 
           height="700" 
           frameborder="0"
           style="background: white; display: block; margin: 0 auto;">
   </iframe>


Representation Space Costs
--------------------------

.. revealjs-slide::

* Adjacency Matrix Space:

  * :math:`|V|^2`
  * Small constants

* Adjacency List Space:

  * :math:`|V| + |E|`
  * Larger constants


Graph ADT
---------

.. revealjs-slide::

.. codeinclude:: Graphs/Graph
   :tag: GraphADT


Visiting Neighbors
------------------

.. revealjs-slide::

.. codeinclude:: Graphs/GraphDummy
   :tag: GraphNeighbor


Graph Traversals
----------------

.. revealjs-slide::

* Some applications require visiting every vertex in the graph exactly
  once.

* The application may require that vertices be visited in some special
  order based on graph topology.

* Examples:

  * Artificial Intelligence Search
  * Shortest paths problems


Graph Traversals (2)
--------------------

.. revealjs-slide::

* To insure visiting all vertices:

.. codeinclude:: Graphs/GraphTrav
   :tag: GraphTrav


Depth First Search (1)
----------------------

.. revealjs-slide::

.. codeinclude:: Graphs/DFS
   :tag: DFS


Depth First Search (2)
----------------------

.. revealjs-slide::

.. inlineav:: DFSCON ss
   :long_name: Depth-First Search Slideshow
   :links: AV/Graph/DFSCON.css
   :scripts: AV/Graph/DFSCON.js
   :output: show


Depth First Search (3)
----------------------

.. revealjs-slide::

* Cost: :math:`\Theta(|V| + |E|)`.


Breadth First Search (1)
------------------------

.. revealjs-slide::

* Like DFS, but replace stack with a queue.

  * Visit vertex’s neighbors before continuing deeper in the tree.

.. codeinclude:: Graphs/BFS
   :tag: BFS


Breadth First Search (3)
------------------------

.. revealjs-slide::

.. inlineav:: BFSCON ss
   :long_name: Breadth-First Search Slideshow
   :links: AV/Graph/BFSCON.css
   :scripts: AV/Graph/BFSCON.js
   :output: show


Topological Sort
----------------

.. revealjs-slide::

* Problem: Given a set of jobs, courses, etc., with prerequisite
  constraints, output the jobs in an order that does not violate
  any of the prerequisites.

.. inlineav:: topsortCON dgm
   :links: 
   :scripts: AV/Graph/topSortCON.js
   :align: center


Depth-First Topological Sort (1)
--------------------------------

.. revealjs-slide::

.. codeinclude:: Graphs/TopsortDFS
   :tag: TopsortDFS


Depth-First Topological Sort (2)
--------------------------------

.. revealjs-slide::

.. raw:: html

   <iframe src="../../../Metadata/inlineav/Graph/topSortCON.html" 
           width="960" 
           height="700" 
           frameborder="0"
           style="background: white; display: block; margin: 0 auto;">
   </iframe>


Depth-First Topological Sort (3)
--------------------------------

.. revealjs-slide::

.. raw:: html

   <iframe src="../../../Metadata/inlineav/Graph/topSortDFSCON.html" 
           width="960" 
           height="700" 
           frameborder="0"
           style="background: white; display: block; margin: 0 auto;">
   </iframe>


Queue-Based Topsort (1)
-----------------------

.. revealjs-slide::

.. codeinclude:: Graphs/TopsortBFS
   :tag: TopsortBFS


Queue-Based Topsort (2)
-----------------------

.. revealjs-slide::

.. raw:: html

   <iframe src="../../../Metadata/inlineav/Graph/topSortQCON.html" 
           width="960" 
           height="700" 
           frameborder="0"
           style="background: white; display: block; margin: 0 auto;">
   </iframe>


Shortest Paths Problems
-----------------------

.. revealjs-slide::

* Input: A graph with weights or costs associated with each edge.

* Output: The list of edges forming the shortest path.

* Sample problems:

  * Find shortest path between two named vertices
  * Find shortest path from S to all other vertices
  * Find shortest path between all pairs of vertices

* Will actually calculate only distances.


Shortest Paths Definitions
--------------------------

.. revealjs-slide::

* :math:`d(A, B)` is the shortest distance from vertex :math:`A` to
  :math:`B`.

* :math:`w(A, B)` is the weight of the edge connecting :math:`A` to
  :math:`B`.

* If there is no such edge, then :math:`w(A, B) = \infty`.

.. inlineav:: DistanceExampCON dgm
   :links:
   :scripts: AV/Graph/DistanceExampCON.js
   :align: center


Single-Source Shortest Paths
----------------------------

.. revealjs-slide::

* Given start vertex :math:`s`, find the shortest path from
  :math:`s` to all other vertices.

* Try 1: Visit vertices in some order, compute shortest paths for
  all vertices seen so far, then add shortest path to next
  vertex :math:`x`.

* Problem: Shortest path to a vertex already processed might go
  through :math:`x`.

* Solution: Process vertices in order of distance from :math:`s`.


Dijkstra’s Algorithm Example
----------------------------

.. revealjs-slide::


.. inlineav:: DijkstraCON ss
   :links: AV/Graph/DijkstraCON.css
   :scripts: AV/Graph/DijkstraCON.js
   :output: show


Dijkstra’s Implementation
-------------------------

.. revealjs-slide::

.. codeinclude:: Graphs/Dijkstra
   :tag: GraphDijk1


Implementing minVertex
----------------------

.. revealjs-slide::

* Issue: How to determine the next-closest vertex? (I.e., implement
  ``minVertex``)

* Approach 1: Scan through the table of current distances.

  * Cost: :math:`\Theta(|V|^2 + |E|) = \Theta(|V|^2)`.

* Approach 2: Store unprocessed vertices using a min-heap to
  implement a priority queue ordered by :math:`D` value.  Must
  update priority queue for each edge.

  * Cost: :math:`\Theta((|V| + |E|)log|V|)`


Approach 1
----------

.. revealjs-slide::

.. codeinclude:: Graphs/Dijkstra
   :tag: MinVertex


Approach 2
----------

.. revealjs-slide::

.. codeinclude:: Graphs/DijkstraPQ
   :tag: DijkstraPQ


All-pairs Shortest Paths (1)
----------------------------

.. revealjs-slide::

* We could run Shortest Paths starting at each vertex.

* Better is to use Floyd's algorithm.

  * An example of Dynamic Programming
  * Simpler than it sounds: A trivial triple loop

* Define a k-path from vertex :math:`v` to vertex :math:`u` to be
  any path whose intermediate vertices (aside from :math:`v` and
  :math:`u`) all have indices less than :math:`k`.


All-pairs Shortest Paths (2)
----------------------------

.. revealjs-slide::

.. image:: /Images/Floyd.png
   :width: 400
   :align: center
   :alt: An example of :math:`k`-paths in Floyd's algorithm


Floyd's Algorithm
-----------------

.. revealjs-slide::

.. codeinclude:: Graphs/Floyd
   :tag: Floyd


Minimal Cost Spanning Trees
---------------------------

.. revealjs-slide::

* Minimal Cost Spanning Tree (MST) Problem:

* Input: An undirected, connected graph G.

  * Output: The subgraph of G that

    1. has minimum total cost as measured by summing the values of all
       the edges in the subset, and
    2. keeps the vertices connected.


MST Example
-----------

.. revealjs-slide::

.. inlineav:: MCSTCON dgm
   :links:
   :scripts: AV/Graph/MCSTCON.js
   :align: justify


Prim’s MST Algorithm
--------------------

.. revealjs-slide::

.. inlineav:: primCON ss
   :links: AV/Graph/primCON.css
   :scripts: AV/Graph/primCON.js
   :output: show


Implementation 1
----------------

.. revealjs-slide::

.. codeinclude:: Graphs/Prim
   :tag: Prims


Alternate Implementation
------------------------

.. revealjs-slide::

* As with Dijkstra’s algorithm, the key issue is determining which
  vertex is next closest.

* As with Dijkstra’s algorithm, the alternative is to use a
  priority queue.

* Running times for the two implementations are identical to the
  corresponding Dijkstra’s algorithm implementations.


Kruskal’s MST Algorithm (1)
---------------------------

.. revealjs-slide::

* Initially, each vertex is in its own MST.

* Merge two MST’s that have the shortest edge between them.

  * Use a priority queue to order the unprocessed edges.  Grab
    next one at each step.

* How to tell if an edge connects two vertices already in the same
  MST?

  * Use the UNION/FIND algorithm with parent-pointer representation.


Kruskal’s MST Algorithm (2)
---------------------------

.. revealjs-slide::

.. inlineav:: kruskalCON ss
   :long_name: Kruskal Slideshow
   :links: AV/Graph/kruskalCON.css
   :scripts: AV/Graph/kruskalCON.js
   :output: show


Kruskal’s MST Algorithm (3)
---------------------------

.. revealjs-slide::

* Cost is dominated by the time to remove edges from the heap.

  * Can stop processing edges once all vertices are in the same MST

* Total cost: :math:`\Theta(|V| + |E| log |E|)`.
