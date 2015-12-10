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

Graph Traversals
----------------

Many graph applications need to visit the vertices of a graph in some
specific order based on the graph's topology.
This is known as a graph :term:`traversal` and is similar in concept
to a :ref:`tree traversal <BinaryTreeTraversal>`.
Recall that tree traversals visit every node exactly once, in some
specified order such as preorder, inorder, or postorder.
Multiple tree traversals exist because various applications require
the nodes to be visited in a particular order.
For example, to print a BST's nodes in ascending order requires an
inorder traversal as opposed to some other
traversal.
Standard graph traversal orders also exist.
Each is appropriate for solving certain problems.
For example, many problems in artificial intelligence programming
are modeled using graphs.
The problem domain might consist of a large collection of states,
with connections between various pairs of states.
Solving this sort of problem requires getting from a specified start
state to a specified goal state by moving between states only
through the connections.
Typically, the start and goal states are not directly connected.
To solve this problem, the vertices of the graph must be searched in
some organized manner.

Graph traversal algorithms typically begin with a start vertex and
attempt to visit the remaining vertices from there.
Graph traversals must deal with a number of troublesome cases.
First, it might not be possible to reach all vertices from the start
vertex.
This occurs when the graph is not connected.
Second, the graph might contain cycles, and we must make sure that
cycles do not cause the algorithm to go into an infinite loop.

Graph traversal algorithms can solve both of these problems
by flagging vertices as ``VISITED`` when appropriate.
At the beginning of the algorithm, no vertex is flagged as ``VISITED``.
The flag for a vertex is set when the vertex is first visited
during the traversal.
If a flagged vertex is encountered during traversal, it is not visited
a second time.
This keeps the program from going into an infinite loop when it
encounters a cycle.

Once the traversal algorithm completes, we can check to see if all
vertices have been processed by checking whether they have the
``VISITED`` flag set.
If not all vertices are flagged,
we can continue the traversal from another unvisited vertex.
Note that this process works regardless of whether the graph is
directed or undirected.
To ensure visiting all vertices, ``graphTraverse`` could be called
as follows on a graph :math:`\mathbf{G}`:

.. codeinclude:: Graphs/GraphTrav 
   :tag: GraphTrav

Function ``doTraversal`` might be implemented by using
one of the graph traversals described next.

Depth-First Search
------------------

.. TODO::
   :type: Slideshow

   Replace the following paragraph with a slideshow.

The first method of organized graph traversal is called
:term:`depth-first search` (DFS).
Whenever a vertex :math:`v` is visited during the search,
DFS will recursively visit all of :math:`v` 's unvisited neighbors.
Equivalently, DFS will add all edges leading out of :math:`v` to a
stack.
The next vertex to be visited is determined by popping the stack and
following that edge.
The effect is to follow one branch through the graph to its
conclusion, then it will back up and follow another branch, and so on.
The DFS process can be used to define a
:term:`depth-first search tree`.
This tree is composed of the edges that were followed to any new
(unvisited) vertex during the traversal, and leaves out the edges that
lead to already visited vertices.
DFS can be applied to directed or undirected graphs.

Here is an implementation for the DFS algorithm.

.. codeinclude:: Graphs/DFS 
   :tag: DFS

This implementation contains calls to functions ``PreVisit`` and
``PostVisit``.
These functions specify what activity should take place during the
search.
Just as a preorder tree traversal requires action before the subtrees
are visited, some graph traversals require that a vertex be processed
before ones further along in the DFS.
Alternatively, some applications require activity *after* the
remaining vertices are processed; hence the call to function
``PostVisit``.
This would be a natural opportunity to make use of the
:ref:`visitor design pattern <visitor design pattern> <DesignPatterns>`.

This visualization shows a graph and the result of performing a DFS on
it, resulting in a depth-first search tree.
 
.. avembed:: AV/Graph/graphDFS.html ss

DFS processes each edge once in a directed graph.
In an undirected graph, DFS processes each edge from both
directions.
Each vertex must be visited, but only once, so the total cost is
:math:`\Theta(|\mathbf{V}| + |\mathbf{E}|)`.

Here is an exercise to practice DFS.

.. avembed:: AV/Graph/graphDFSPE.html pe


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

.. TODO::
   :type: Slideshow

   Provide a slideshow to demonstrate BFS.

Here is an implementation for BFS.

.. codeinclude:: Graphs/BFS 
   :tag: BFS

Here is an AV for you to try it on other graphs.

.. avembed:: AV/Graph/graphBFS.html ss

Here is an exercise to practice BFS.

.. avembed:: AV/Graph/graphBFSPE.html pe

.. TODO::
   :type: Exercise

   Summary exercise for graph traversals.
