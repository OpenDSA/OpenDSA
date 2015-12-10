.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :requires: general trees
   :satisfies: Union/Find
   :topic: Union/Find
   
.. odsalink:: AV/General/UFCON.css

Union/Find and the Parent Pointer Implementation
================================================

The Union/Find Problem
----------------------

:term:`General trees <general tree>` are trees whose
:term:`internal nodes <internal node>` have no fixed number of
:term:`children <child>`.
Compared to general trees, :term:`binary trees <binary tree>` are
relatively easy to implement because each internal node of a binary
tree can just store two pointers to reach its (potential) children.
In a general tree, we have to deal with the fact that a given node
might have no children or few children or many children.

Even in a general tree, each node can have only one :term:`parent`.
If we didn't need to go from a node to its children, but instead only
needed to go from a node to its parent, then implementing a node would
be easy.
A simple way to represent such a general tree would be to store for
each node only a pointer to that node's parent.
We will call this the :term:`parent pointer representation` for
general trees.
Clearly this implementation is not general purpose, because it is
inadequate for such important operations as finding
the leftmost child or the right sibling for a node.
Thus, it may seem to be a poor idea to implement a general
tree in this way.
However, the parent pointer implementation stores precisely the
information required to answer the following, useful question:
**Given two nodes, are they in the same tree?**
To answer this question, we need only follow the series of parent
pointers from each node to its respective root.
If both nodes reach the same root, then they must be in the same tree.
If the roots are different, then the two nodes are not in the same
tree.
The process of finding the ultimate root for a given node we will call
:term:`FIND`.


Parent Pointer Trees
~~~~~~~~~~~~~~~~~~~~

The parent pointer representation is most often used to maintain a
collection of :term:`disjoint sets`.
Two disjoint sets share no members in common (their intersection is
empty).
A collection of disjoint sets partitions some objects
such that every object is in exactly one of the disjoint sets.
There are two basic operations that we wish to support:

1. Determine if two objects are in the same set (the FIND operation), and
2. Merge two sets together.

Because two merged sets are united, the merging operation is
called :term:`UNION` and the whole process of determining if two
objects are in the same set and then merging the sets goes by the name
:term:`UNION/FIND`.

To implement UNION/FIND, we represent each disjoint set with a
separate general tree.
Two objects are in the same disjoint set if they are in the same tree.
Every node of the tree (except for the root) has precisely one parent.
Thus, each node requires the same space to represent it.
The collection of objects is typically stored in an array, where each
element of the array corresponds to one object, and each element
stores the object's value (or a pointer to the object).
The objects also correspond to nodes in the various disjoint trees
(one tree for each disjoint set), so we also store the parent value
with each object in the array.
Those nodes that are the roots of their respective trees store an
appropriate indicator.
Note that this representation means that a single array is being used
to implement a collection of trees.
This makes it easy to merge trees together with UNION operations.

Here is an implementation for parent pointer trees and the UNION/FIND
process.

.. codeinclude:: General/ParPtrTree1
   :tag: UF1, UF2

The ``ParPtrTree`` class has an array where each array position
corresponds to one object in some collection.
Each array element stores the array index for its parent.
There are two main methods to implement.
Method ``UNION`` merges two sets together, where each set corresponds
to a tree.
Method ``FIND`` is used to find the ultimate root for a node.

An application using the UNION/FIND operations
should store a set of :math:`n` objects, where each object is assigned
a unique index in the range 0 to :math:`n-1`.
The indices refer to the corresponding parent pointers in the array.
Class ``ParPtrTree`` creates and initializes the
UNION/FIND array, and methods ``UNION`` and
``FIND`` take array indices as inputs.

.. _UFfig:

.. inlineav:: UFfigCON dgm
   :align: fill

   The parent pointer array implementation.
   Each node corresponds to a position in the node array,
   which stores its value and a pointer to its parent.
   The parent pointers are represented by an array index corresponding
   to the position of the parent.
   The root of any tree stores a special value, such as -1.
   This is represented graphically in the figure by a
   slash in the "Parent's Index" box.
   This figure shows two trees stored in the same parent pointer array,
   one rooted at :math:`F` (with a total of 9 nodes),
   and the other rooted at :math:`J` (with a total of 1 node).


Equivalence Classes
~~~~~~~~~~~~~~~~~~~

Consider the problem of assigning the members of a set to
disjoint subsets called
:term:`equivalence classes <equivalence class>`.
Recall that an
:ref:`equivalence relation <equivalence relation> <SetDef>` is 
:term:`reflexive`, :term:`symmetric`, and :term:`transitive`.
Thus, if objects :math:`A` and :math:`B` are equivalent, and objects
:math:`B` and :math:`C` are equivalent, then we must be able to recognize
that objects :math:`A` and :math:`C` are also equivalent.
In this representation, since :math:`A` and :math:`B` are equivalent,
they must be in the same tree.
Likewise for :math:`B` and :math:`C`.
We can recognize that :math:`A` and :math:`C` are equivalent because
they must also be in the same tree.

There are many practical uses for disjoint sets and representing
equivalences.
For example, consider this graph of ten nodes labeled :math:`A` through
:math:`J`.

.. _UFconcom:

.. inlineav:: UFconcomCON dgm
   :align: left

   A graph with two connected components.
   The tree of Figure :num:`Figure #UFfig` shows the corresponding
   tree structure resulting form processing the edges to determine the
   connected components.

Notice that for nodes :math:`A` through :math:`I`, there is some
series of edges that connects any pair of these nodes, but node
:math:`J` is disconnected from the rest of the nodes.
Such a graph might be used to represent connections such as wires
between components on a circuit board, or roads between cities.
We can consider two nodes of the graph to be equivalent if there is a
path between them.
Thus, nodes :math:`A`, :math:`H`, and :math:`E` would
be considered as equivalent, but :math:`J` is not
equivalent to any other.
A subset of equivalent (connected) edges in a graph is called a
:term:`connected component`.
The goal is to quickly classify the objects
into disjoint sets that correspond to the connected components.

Another use for UNION/FIND occurs in :term:`Kruskal's algorithm` for
computing the
:ref:`minimal-cost spanning tree <minimal-cost spanning tree> <MCST>`
for a :term:`graph`.
That algorithm seeks to select the cheapest subset of the edges that
still connects all of the nodes in the graph.
It does so by processing all edges of the graph from shortest to
longest, only adding an edge to the connecting subset if it does not
connect two nodes that already have some series of edges connecting
them.

The input to the UNION/FIND algorithm is typically  a series of
equivalence pairs.
In the case of the connected components example, the equivalence pairs
would simply be the set of edges in the graph.
An equivalence pair might say that object :math:`C` is equivalent to
object :math:`A`.
If so, :math:`C` and :math:`A` are placed in the same subset.
If a later equivalence relates :math:`A` and :math:`B`, then
by implication :math:`C` is also equivalent to :math:`B`.
Thus, an equivalence pair may cause two subsets to merge, each of
which contains several objects.

Equivalence classes can be managed efficiently with the UNION/FIND
algorithm.
Initially, each object is at the root of its own tree.
An equivalence pair is processed by checking to see if both objects
of the pair are in the same tree by calling  ``FIND`` on each of them.
If their roots are the same, then no change need be made because the
objects are already in the same equivalence class.
Otherwise, the two equivalence classes should be merged by the
``UNION`` method.

The parent pointer representation places no limit on the number of
nodes that can share a parent.
To make equivalence processing as efficient as possible, 
the distance from each node to the root of its respective tree should
be as small as possible.
Thus, we would like to keep the height of the trees small when merging
two equivalence classes together.
Ideally, each tree would have all nodes pointing directly to the root.
Achieving this goal all the time would require too much additional
processing to be worth the effort, so we must settle for getting as
close as possible.


Weighted Union
~~~~~~~~~~~~~~

A low-cost approach to reducing the height is to be smart about how
two trees are joined together.
One simple technique, called the
:term:`weighted union rule`,
joins the tree with fewer nodes to the tree with more nodes by making
the smaller tree's root point to the root of the bigger tree.
This will limit the total depth of the tree to :math:`O(\log n)`,
because the depth of nodes only in the smaller tree will now increase
by one, and the depth of the deepest node in the combined tree can
only be at most one deeper than the deepest node before the trees were
combined.
The total number of nodes in the combined tree is therefore at least
twice the number in the smaller subtree.
Thus, the depth of any node can be increased at most :math:`\log n`
times when :math:`n` equivalences are processed
(since each addition to the depth must be accompanied by at least
doubling the size of the tree).

Here is an implementation for the UNION method when using weighted
union.

.. codeinclude:: General/ParPtrTree2
   :tag: UnionFind

The following slideshow illustrates a series of UNION operations with
weighted union.

.. inlineav:: ufCON ss
   :output: show


Path Compression
~~~~~~~~~~~~~~~~

The weighted union rule helps to minimize the depth of the tree, but
we can do better than this.
:term:`Path compression <path compression>` is a method that tends to
create extremely shallow trees.
Path compression takes place while finding the root
for a given node :math:`X`.
Call this root :math:`R`.
Path compression resets the parent of every node on the path from
:math:`X` to :math:`R` to point directly to :math:`R`.
This can be implemented by first finding :math:`R`.
A second pass is then made along the path from :math:`X` to :math:`R`,
assigning the parent field of each node encountered to :math:`R`.
Alternatively, a recursive algorithm can be implemented as follows.
This version of ``FIND`` not only returns the root of the
current node, but also makes all ancestors of the current node point
to the root.

.. codeinclude:: General/ParPtrTree2
   :tag: PathCompress

The following slide show illustrates path compression using the last
step in the previous example.
   
.. inlineav:: pathcompCON ss
   :output: show

Path compression keeps the cost of each FIND operation very
close to constant.

To be more precise about what is meant by "very close to constant",
the cost of path compression for :math:`n` FIND operations on
:math:`n` nodes (when combined with the weighted union rule for
joining sets) is approximately
:math:`\Theta(n \log^* n)`.
The notation :math:`\log^* n` means the number of times that
the log of :math:`n` must be taken before :math:`n \leq 1`.
For example, :math:`\log^* 65536` is 4 because
:math:`\log 65536 = 16, \log 16 = 4, \log 4 = 2`, and finally
:math:`\log 2 = 1`.
Thus, :math:`\log^* n` grows *very* slowly, so the cost for a series
of :math:`n` FIND operations is very close to :math:`n`.

Note that this does not mean that the tree resulting from
processing :math:`n` equivalence pairs necessarily has depth
:math:`\Theta(\log^* n)`.
One can devise a series of equivalence operations that yields
:math:`\Theta(\log n)` depth for the resulting tree.
However, many of the equivalences in such a series will look only at
the roots of the trees being merged, requiring little processing time.
The *total* amount of processing time required for :math:`n`
operations will be :math:`\Theta(n \log^* n)`,
yielding nearly constant time for each equivalence operation.
This is an example of
:ref:`amortized analysis <amortized analysis> <AmortAnal>`.

The expression :math:`\log^* n` is closely related to the inverse of
Ackermann's function.
For more information about Ackermann's function and the cost of path
compression for UNION/FIND, see [Tarjan75]_.
The survey article by Galil & Italiano [GalilItaliano91]_
covers many aspects of the equivalence class problem.

.. avembed:: AV/Development/UnionFindPRO.html pe

.. odsascript:: AV/General/UFfigCON.js
.. odsascript:: AV/General/UFconcomCON.js
.. odsascript:: AV/General/ufCON.js
.. odsascript:: AV/General/pathcompCON.js
