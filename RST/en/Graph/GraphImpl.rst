.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: graph terminology
   :satisfies: graph implementation
   :topic: Graphs

Graph Implementations
=====================

We next turn to the problem of implementing a general-purpose
:term:`graph` class.
There are two traditional approaches to representing graphs:
The :term:`adjacency matrix` and the :term:`adjacency list`.
In this module we will show actual implementations for each approach.
We will begin with an abstract class defining an ADT for graphs that a
given implementation must meet.

.. codeinclude:: Graphs/Graph 
   :tag: GraphADT

This ADT assumes that the number of vertices is fixed
when the graph is created, but that edges can be added and removed.
The ``init`` method sets (or resets) the number of nodes in the graph,
and creates necessary space for the adjacency matrix or adjacency list.

Vertices are defined by an integer index value.
In other words, there is a Vertex 0, Vertex 1, and so on through
Vertex :math:`n-1`.
We can assume that the graph's client application stores any additional
information of interest about a given vertex elsewhere, such as a name
or application-dependent value.
Note that in a language like Java or C++, this ADT would not be
implemented using a language feature like a generic or template,
because it is the ``Graph`` class users' responsibility to maintain
information related to the vertices themselves.
The ``Graph`` class need have no knowledge of the type or content
of the information associated with a vertex, only the index number for
that vertex.

Abstract class ``Graph``
has methods to return the number of vertices and edges
(methods ``n`` and ``e``, respectively).
Function ``weight`` returns the weight of a given edge, with that
edge identified by its two incident vertices.
For example, calling ``weight(0, 4)`` on the graph of
Figure :num:`Figure #GraphTerms` (c) would return 4.
If no such edge exists, the weight is defined to be 0.
So calling ``weight(0, 2)`` on the graph of
Figure :num:`Figure #GraphTerms` (c) would return 0.

Functions ``addEdge`` and ``removeEdge`` add an edge (setting its
weight) and removes an edge from the graph, respectively.
Again, an edge is identified by its two incident vertices.
``addEdge`` does not permit the user to set the weight to be 0,
because this value is used to indicate a non-existent edge, nor are
negative edge weights permitted.
Functions ``getValue`` and ``setValue`` get and set, respectively,
a requested value for Vertex :math:`v`.
In our example applications the most frequent use of these methods
will be to indicate whether a given node has previously been visited
in the process of the algorithm

Nearly every graph algorithm presented in this chapter will require
visits to all neighbors of a given vertex.
The ``neighbors`` method returns an array containing the indices for
the neighboring vertices, in ascending order.
The following lines appear in many graph algorithms.

.. codeinclude:: Graphs/GraphDummy 
   :tag: GraphNeighbor

First, an array is generated that contains the indices of the nodes
that can be directly reached from node ``v``.
The ``for`` loop then iterates through this neighbor array to execute
some function on each.

It is reasonably straightforward to implement our graph ADT
using either the adjacency list or adjacency matrix.
The sample implementations presented here do not address the issue of
how the graph is actually created.
The user of these implementations must add functionality for
this purpose, perhaps reading the graph description from a file.
The graph can be built up by using the ``addEdge`` function
provided by the ADT.

Here is an implementation for the adjacency matrix.

.. codeinclude:: Graphs/GraphM 
   :tag: GraphM

Array ``nodeValues`` stores the information manipulated by the
``setValue`` and ``getValue`` functions.
The edge matrix is implemented as an integer array of size
:math:`n \times n` for a graph of :math:`n` vertices.
Position :math:`(i, j)` in the matrix stores the weight for edge
:math:`(i, j)` if it exists.
A weight of zero for edge :math:`(i, j)` is used to indicate that no
edge connects Vertices :math:`i` and :math:`j`.

Given a vertex :math:`v`, the ``neighbors`` method scans through row
``v`` of the matix to locate the positions of the various neighbors.
If no edge is incident on :math:`v`, then returned neighbor array will
have length 0.
Functions ``addEdge`` and ``removeEdge`` adjust the
appropriate value in the array.
Function ``weight`` returns the value stored in the
appropriate position in the array.

Here is an implementation of the adjacency list representation for
graphs.
Its main data structure is an array of linked lists, one linked list
for each vertex.
These linked lists store objects of type ``Edge``, which merely
stores the index for the vertex pointed to by the edge, along with the
weight of the edge.

.. codeinclude:: Graphs/GraphL 
   :tag: GraphL

Implementation for ``Graphl`` member functions is straightforward
in principle, with the key functions being ``addEdge``,
``removeEdge``, and ``weight``.
They simply start at the beginning of the adjacency list and move
along it until the desired vertex has been found.
Private method find is a utility for finding the last edge preceding
the one that holds vertex :math:`v` if that exists.

.. TODO::
   :type: Exercise

   Add a battery of questions to test knowledge of the
   implementations.
