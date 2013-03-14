.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :prerequisites: GraphIntro
   :topic: Graphs

Graph Implementations [Text]
============================

We next turn to the problem of implementing a general-purpose graph
class.
Here is an abstract class defining an ADT for graphs.

.. codeinclude:: Graphs/GraphADT/GraphADT.pde 
   :tag: GraphADT

This ADT assumes that the number of vertices is fixed
when the graph is created, but that edges can be added and removed.
It also supports a mark array to aid graph traversal algorithms.

Vertices are defined by an integer index value.
In other words, there is a Vertex 0, Vertex 1, and so on.
We can assume that a graph application stores any additional
information of interest about a given vertex elsewhere, such as a name
or application-dependent value.
Note that in a language like Java or C++, this ADT is not implemented
using a language feature like a generic or template,
because it is
the ``Graph`` class users' responsibility to maintain information
related to the vertices themselves.
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

Functions ``setEdge`` and ``delEdge`` set the weight of an edge
and remove an edge from the graph, respectively.
Again, an edge is identified by its two incident vertices.
``setEdge`` does not permit the user to set the weight to be 0,
because this value is used to indicate a non-existent edge, nor are
negative edge weights permitted.
Functions ``getMark`` and ``setMark`` get and set, respectively,
a requested value in the ``Mark`` array (described below) for
Vertex :math:`v`.

Nearly every graph algorithm presented in this chapter will require
visits to all neighbors of a given vertex.
Two methods are provided to support this.
They work in a manner similar to linked list access functions.
Function ``first`` takes as input a vertex :math:`v`, and returns
the edge to the first neighbor for :math:`V` (we assume the neighbor
list is sorted by vertex number).
Function ``next`` takes as input Vertices :math:`v1` and :math:`v2`
and returns the index for the vertex forming the next edge with
:math:`v1` after :math:`v2` on :math:`v1` 's edge list.
Function ``next`` will return a value of :math:`n = |\mathbf{V}|` once
the end of the edge list for :math:`v1` has been reached.
The following line appears in many graph algorithms::

   for (w = G=>first(v); w < G->n(); w = G->next(v,w))

This ``for`` loop gets the first neighbor of ``v``, then
works through the remaining neighbors of ``v`` until a value equal
to ``G->n()`` is returned, signaling that all neighbors of ``v``
have been visited.
For example, ``first(1)`` in Figure :num:`Figure #Undirected` would
return 0.
``next(1, 0)`` would return 3.
``next(0, 3)`` would return 4.
``next(1, 4)`` would return 5, which is not a vertex in the graph.

It is reasonably straightforward to implement our graph and edge ADTs
using either the adjacency list or adjacency matrix.
The sample implementations presented here do not address the issue of
how the graph is actually created.
The user of these implementations must add functionality for
this purpose, perhaps reading the graph description from a file.
The graph can be built up by using the ``setEdge`` function
provided by the ADT.

Here is an implementation for the adjacency matrix.

.. codeinclude:: Graphs/GraphM/GraphM.pde 
   :tag: GraphM

Array ``Mark`` stores the information manipulated by the
``setMark`` and ``getMark`` functions.
The edge matrix is implemented as an integer array of size
:math:`n \times n` for a graph of :math:`n` vertices.
Position :math:`(i, j)` in the matrix stores the weight for edge
:math:`(i, j)` if it exists.
A weight of zero for edge :math:`(i, j)` is used to indicate that no
edge connects Vertices :math:`i` and :math:`j`.

Given a vertex :math:`v`, function ``first`` locates the position in
``matrix`` of the first edge (if any) of :math:`v` by beginning with
edge :math:`(v, 0)` and scanning through row :math:`v` until an edge
is found.
If no edge is incident on :math:`v`, then ``first`` returns :math:`n`.

Function ``next`` locates the edge following edge :math:`(i, j)`
(if any) by continuing down the row of Vertex :math:`i` starting at
position :math:`j+1`, looking for an edge.
If no such edge exists, ``next`` returns :math:`n`.
Functions ``setEdge`` and ``delEdge`` adjust the
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

.. codeinclude:: Graphs/GraphL/GraphL.pde 
   :tag: GraphL

Implementation for ``Graphl`` member functions is straightforward
in principle, with the key functions being ``setEdge``,
``delEdge``, and ``weight``.
They simply start at the beginning of the adjacency list and move
along it until the desired vertex has been found.
Note that ``isEdge`` checks to see if :math:`j` is already the
current neighbor in :math:`i` 's adjacency list, since this will often
be true when processing the neighbors of each vertex in turn.
