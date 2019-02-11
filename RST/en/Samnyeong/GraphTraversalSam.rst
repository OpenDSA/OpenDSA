.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: graph implementation
   :satisfies: graph traversal
   :topic: Graphs

Graph Traversals
================

Breadth-First Search
--------------------

Our second graph traversal algorithm is known as a
:term:`breadth-first search` (BFS).
BFS examines all vertices connected to the start vertex
before visiting vertices further away.
BFS is implemented similarly to DFS, except that a queue
replaces the recursion stack.
Note that if the graph is a tree and the start vertex is at the root,
BFS is equivalent to visiting vertices level by level from top to
bottom.

The following visualization shows a random graph each time that you
start it, so that you can see the behavior on different examples.
It can show you BFS run on a directed graph or an undirected graph.
Be sure to look at an example for each type of graph.

.. avembed:: AV/Samnyeong/BFSAV.html ss
    :long_name: BFS AV


