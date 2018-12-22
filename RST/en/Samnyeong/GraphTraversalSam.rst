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

This visualization shows a graph and the result of performing a BFS on
it, resulting in a breadth-first search tree.

.. inlineav:: BFSCON ss
   :long_name: Breadth-First Search Slideshow
   :links: AV/Samnyeong/BFSCON.css
   :scripts: AV/Samnyeong/BFSCON.js
   :output: show

Here is an implementation for BFS.

.. codeinclude:: Graphs/BFS
   :tag: BFS

The following visualization shows a random graph each time that you
start it, so that you can see the behavior on different examples.
It can show you BFS run on a directed graph or an undirected graph.
Be sure to look at an example for each type of graph.

.. avembed:: AV/Graph/BFSAV.html ss
    :long_name: BFS AV

Here is an exercise for you to practice BFS.

.. avembed:: AV/Graph/BFSPE.html pe
   :long_name: BFS Proficiency Exercise

.. TODO::
   :type: Exercise

   Summary exercise for graph traversals.
