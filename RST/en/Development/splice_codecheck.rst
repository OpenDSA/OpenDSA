.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: graph traversal
   :satisfies: graph shortest path
   :topic: Graphs

Shortest-Paths Problems
=======================

Shortest-Paths Problems
-----------------------

On a road map, a road connecting two towns is typically
labeled with its distance.
We can model a road network as a directed graph whose edges are
labeled with real numbers.
These numbers represent the distance (or other cost metric, such as
travel time) between two vertices.
These labels may be called :term:`weights <weight>`,
:term:`costs <cost>`, or :term:`distances <distance>`,
depending on the application.
Given such a graph, a typical problem is to find the total
length of the shortest path between two specified vertices.
This is not a trivial problem, because the shortest path may not be
along the edge (if any) connecting two vertices, but rather may be
along a path involving one or more intermediate vertices.

Here is a pratice question from CodeCheck

.. splicetoolembed:: https://horstmann.com/codecheck/examples/dijkstra.html
   :height: 1050
   :width: 1050
   :name: exampleFrame


