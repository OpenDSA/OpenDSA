.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: graph traversal
   :topic: Graphs

Topological Sort
================

Topological Sort
----------------

Assume that we need to schedule a series of tasks, such as classes or
construction jobs, where we cannot start one task until after its
prerequisites are completed.
We wish to organize the tasks into a linear order that allows us to
complete them one at a time without violating any prerequisites.
We can model the problem using a DAG.
The graph is directed because one task is a prerequisite of
another -- the vertices have a directed relationship.
It is acyclic because a cycle would indicate a conflicting series of
prerequisites that could not be completed without violating at least
one prerequisite.
The process of laying out the vertices of a DAG in a linear order to
meet the prerequisite rules is called a :term:`topological sort`.

.. _TopSort:

.. inlineav:: topsortCON dgm
   :align: center

   An example graph for topological sort. Seven tasks have
   dependencies as shown by the directed graph.

.. TODO::
   :type: Slideshow

   Replace the above figure with a slideshow that incorporates the
   following paragraph.

Figure :num:`Figure #TopSort` illustrates the problem.
An acceptable topological sort for this example is J1,
J2, J3, J4, J5, J6, J7. However, other orders are also acceptable,
such as J1, J3, J2, J6, J4, J5, J7.


Depth-first solution
~~~~~~~~~~~~~~~~~~~~

A topological sort may be found by performing a DFS on the graph.
When a vertex is visited, no action is taken (i.e., function
``PreVisit`` does nothing).
When the recursion pops back to that vertex, function
``PostVisit`` prints the vertex.
This yields a topological sort in reverse order.
It does not matter where the sort starts, as long as all vertices
are visited in the end.
Here is implementation for the DFS-based algorithm.

.. codeinclude:: Graphs/TopsortDFS 
   :tag: TopsortDFS

.. TODO::
   :type: Slideshow

   Replace the following paragraph with a slideshow.

Using this algorithm starting at J1 and visiting adjacent
neighbors in alphabetic order, vertices of the graph in
Figure :num:`Figure #TopSort` are printed out in the order J7,
J5, J4, J6, J2, J3, J1.
Reversing this yields the topological sort
J1, J3, J2, J6, J4, J5, J7.

Here is another example.

.. avembed:: AV/Graph/topSort.html ss


Queue-based Solution
~~~~~~~~~~~~~~~~~~~~

We can implement topological sort using a queue
instead of recursion, as follows.

.. TODO::
   :type: Slideshow

   Incorporate the following into a slideshow.

First visit all edges, counting the number of
edges that lead to each vertex (i.e., count the number of
prerequisites for each vertex).
All vertices with no prerequisites are placed on the queue.
We then begin processing the queue.
When Vertex :math:`v` is taken off of the queue, it is printed, and all
neighbors of :math:`v` (that is, all vertices that have :math:`v` as a
prerequisite) have their counts decremented by one.
Place on the queue any neighbor whose count becomes zero.
If the queue becomes empty without printing all of the vertices, then
the graph contains a cycle (i.e., there is no possible ordering
for the tasks that does not violate some prerequisite).
The printed order for the vertices of the graph in
Applying the queue version of topological sort to the graph of
Figure :num:`Figure #TopSort` produces J1, J2, J3, J6, J4, J5, J7.
Here is an implementation for the algorithm.

Here is the code to implement the queue-based topological sort:

.. codeinclude:: Graphs/TopsortBFS 
   :tag: TopsortBFS

.. avembed:: AV/Graph/qTopSort.html ss

.. TODO::
   :type: Proficiency Exercise

   Provide a proficiency exercise that randomly alternates between
   proficiency for DFS-based and queue-based Topsort.

.. TODO::
   :type: Summary Questions

   Provide a summary battery of questions.

.. odsascript:: AV/Graph/topsortCON.js
