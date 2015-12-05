.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :topic:

All-Pairs Shortest Paths
========================

We next consider the problem of finding the shortest distance
between all pairs of vertices in the graph, called
the :term:`all-pairs shortest paths problem`.
To be precise, for every :math:`u, v \in \mathbf{V}`,
calculate :math:`d(u, v)`.

One solution is to run :term:`Dijkstra's algorithm`
for finding the :term:`shortest path <single-source shortest paths problem>`
:math:`|\mathbf{V}|` times, each
time computing the shortest path from a different start vertex.
If :math:`\mathbf{G}` is sparse
(that is, :math:`|\mathbf{E}| = \Theta(|\mathbf{V}|)`)
then this is a good solution, because the total cost will be
:math:`\Theta(|\mathbf{V}|^2 + |\mathbf{V}||\mathbf{E}| \log
|\mathbf{V}|) = \Theta(|\mathbf{V}|^2 \log |\mathbf{V}|)`
for the version of Dijkstra's algorithm based on priority queues.
For a dense graph, the priority queue version of Dijkstra's algorithm
yields a cost of :math:`\Theta(|\mathbf{V}|^3 \log |\mathbf{V}|)`,
but the version using ``MinVertex`` yields a cost
of :math:`\Theta(|\mathbf{V}|^3)`.

Another solution that limits processing time to
:math:`\Theta(|\mathbf{V}|^3)`
regardless of the number of edges is known as Floyd's algorithm.
It is an example of dynamic programming.
The chief problem with solving this problem is organizing the search
process so that we do not repeatedly solve the same subproblems.
We will do this organization through the use of the :math:`k`-path.
Define a :term:`k-path` from vertex :math:`v` to vertex
:math:`u` to be any path whose intermediate vertices (aside from
:math:`v` and :math:`u`) all have indices less than :math:`k`.
A 0-path is defined to be a direct edge from :math:`v` to :math:`u`.
Figure :num:`Figure #FloydExamp` illustrates the concept of
:math:`k`-paths.

.. _FloydExamp:

.. odsafig:: Images/Floyd.png
   :width: 400
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: An example of :math:`k`-paths in Floyd's algorithm

   An example of :math:`k`-paths in Floyd's algorithm.
   Path 1, 3 is a 0-path by definition.
   Path 3, 0, 2 is not a 0-path, but it is a 1-path (as well as a
   2-path, a 3-path, and a 4-path) because the largest intermediate
   vertex is 0. 
   Path 1, 3, 2 is a 4-path, but not a 3-path because the intermediate
   vertex is 3.
   All paths in this graph are 4-paths.

Define :math:`{\rm D}_k(v, u)` to be the length of the shortest
:math:`k`-path from vertex :math:`v` to vertex :math:`u`. 
Assume that we already know the shortest :math:`k`-path from :math:`v`
to :math:`u`.
The shortest :math:`(k+1)`-path either goes through vertex :math:`k`
or it does not.
If it does go through :math:`k`, then the best path is
the best :math:`k`-path from :math:`v` to :math:`k` followed by the
best :math:`k`-path from :math:`k` to :math:`u`.
Otherwise, we should keep the best :math:`k`-path seen before.
Floyd's algorithm simply checks all of the possibilities in a triple
loop.
Here is the implementation for Floyd's algorithm.
At the end of the algorithm, array ``D`` stores the all-pairs shortest
distances.

.. codeinclude:: Graphs/Floyd 
   :tag: Floyd

Clearly this algorithm requires :math:`\Theta(|\mathbf{V}|^3)` running
time, and it is the best choice for dense graphs because it is
(relatively) fast and easy to implement.
