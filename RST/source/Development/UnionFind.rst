.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :prerequisites: GenTreeIntro
   :topic: Union/Find
   
.. odsalink:: AV/Development/UFCON.css

Union/Find and the Parent Pointer Implementation
================================================

:term:`General trees` are trees whose internal nodes have no fixed
number of children.
Compared to general trees, binary trees are fairly easy to implement
because each internal node of a binary tree can just store two
pointers to reach its (potential) children.
In a general tree, we have to deal with the fact that a given node
might have no children or 100 children.

In contrast, even in a general tree, each node can have only one
parent.
If we didn't need to go from a node to its children, but instead only
needed to go from a node to its parent, then implementing a node would
be easy.
A simple way to represent such a general tree would be to store for
each node only a pointer to that node's parent.
We will call this the :term:`parent pointer implementation` for
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

The parent pointer representation is most often used to maintain a
collection of disjoint sets.
Two disjoint sets share no members in common (their intersection is
empty).
A collection of disjoint sets partitions some objects
such that every object is in exactly one of the disjoint sets.
There are two basic operations that we wish to support:

1. Determine if two objects are in the same set (the FIND operation), and
2. Merge two sets together.

Because two merged sets are united, the merging operation is
called UNION and the whole process of determining if two
objects are in the same set and then merging the sets goes by the name
"UNION/FIND."

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

Here is the implementation for parent pointer trees and UNION/FIND.

.. codeinclude:: General/ParPtrTree1.pde
   :tag: UF1, UF2

This class simply has an array where each position stores the array
index for its parent.
There are two main methods to implement.
Method ``UNION`` merges two sets together, where the two sets are each
defined by a node.
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
   The parent pointers are represented by the position in the array
   of the parent.
   The root of any tree stores -1, represented graphically by a
   slash in the "Parent's Index" box.
   This figure shows two trees stored in the same parent pointer array,
   one rooted at :math:`R`, and the other rooted at :math:`W`.

Consider the problem of assigning the members of a set to
disjoint subsets called
:term:`equivalence classes`.
Recall from Section :numref:`<SetDef>` that an equivalence relation is
reflexive, symmetric, and transitive.
Thus, if objects :math:`A` and :math:`B` are equivalent, and objects
:math:`B` and :math:`C` are equivalent, we must be able to recognize
that objects :math:`A` and :math:`C` are also equivalent.

There are many practical uses for disjoint sets and representing
equivalences.
For example, consider the graph of ten nodes labeled :math:`A` through
:math:`J`.

.. _UFconcom:

.. inlineav:: UFconcomCON dgm
   :align: center

   A graph with two connected components.

Notice that for nodes :math:`A` through :math:`I`, there is some
series of edges that connects any pair of the nodes, but node
:math:`J` is disconnected from the rest of the nodes.
Such a graph might be used to represent connections such as wires
between components on a circuit board, or roads between cities.
We can consider two nodes of the graph to be equivalent if there is a
path between them.
Thus, nodes :math:`A`, :math:`H`, and :math:`E` would
be equivalent in Figure :num:`Figure #UFexamp`, but :math:`J` is not
equivalent to any other.
A subset of equivalent (connected) edges in a graph is called a
:term:`connected component`.
The goal is to quickly classify the objects
into disjoint sets that correspond to the connected components.

Another application for UNION/FIND occurs in Kruskal's algorithm for
computing the minimal cost spanning tree for a graph
(Module :numref:`<MCST>`).

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

Here is a slideShow to illustrate a series of UNION operations.

.. inlineav:: ufCON ss
   :output: show

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

A low-cost approach to reducing the height is to be smart about how
two trees are joined together.
One simple technique, called the
:dfn:`weighted union rule`,
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
times when :math:`n` equivalences are processed.

.. TODO::
   :type: Slideshow

   Illustration of Weighted Union Rule.

   When processing equivalence pair :math:`(I, F)` in
   Figure :num:`Figure #EquivEx` (b), :math:`F` is the root of a
   tree with two nodes while :math:`I` is the root of a tree with only
   one node.
   Thus, :math:`I` is set to point to :math:`F` rather than the other
   way around.
   Figure :num:`Figure #EquivEx` (c) shows the result of processing
   two more equivalence pairs: :math:`(H, A)` and
   :math:`(E, G)`.
   For the first pair, the root for :math:`H` is :math:`C` while the
   root for :math:`A` is itself.
   Both trees contain two nodes, so it is an arbitrary decision as to
   which node is set to be the root for the combined tree.
   In the case of equivalence pair :math:`(E, G)`,
   the root of :math:`E` is :math:`D` while the
   root of :math:`G` is :math:`F`.
   Because :math:`F` is the root of the larger tree, node :math:`D` is
   set to point to :math:`F`.

.. TODO::
   :type: Slideshow

   Illustration of equivalence:

   Not all equivalences will combine two trees.
   If equivalence :math:`(F, G)` is processed when the
   representation is in the state shown in
   Figure :num:`Figure #EquivEx` (c),
   no change will be made because :math:`F` is already the root
   for :math:`G`.

The weighted union rule helps to minimize the depth of the tree, but
we can do better than this.
:dfn:`Path compression` is a method that tends to create extremely
shallow trees.
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

.. TODO::
   :type: Code

   Resolve the fact that the current code presentation already shows
   Path Compression, but we need to explain it somehow.

.. _PathCompFig:

.. odsafig:: Images/PathComp.png
   :width: 500
   :align: center
   :capalign: center
   :figwidth: 90%

   Example of Path Compression

The following slide show illustrates path compression using the last step in the previous example 
   
.. inlineav:: pathcompCON ss
   :output: show

Path compression keeps the cost of each FIND operation very
close to constant.

Notes
-----

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
This is an example of amortized analysis, discussed
further in Module :numref:`<AmortAnal>`.

The expression :math:`\log^* n` is closely related to the inverse of
Ackermann's function.
For more information about Ackermann's function and the cost of path
compression for UNION/FIND, see Robert E. Tarjan's paper
"On the efficiency of a good but not linear set merging algorithm"
\cite{Tarjan}.
The article "Data Structures and Algorithms for Disjoint Set Union
Problems" by Galil and Italiano \cite{UFind} covers many aspects of the
equivalence class problem.

.. odsascript:: AV/Development/UFCON.js
