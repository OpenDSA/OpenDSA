.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: BST; Spatial data structures
   :satisfies: Bintree
   :topic: Spatial Data Structures

.. odsalink:: AV/Development/bintreeCON.css

The Bintree
===========

The Bintree
-----------

This module presents a spatial data structure for storing
point data in two or more dimensions, called the Bintree.
The Bintree is a natural extension of the BST to
multiple dimensions.
The Bintree differs from the BST in two important ways.
First, being a data structure for multiple dimensions, at each level
of the tree the Bintree
makes branching decisions based on a particular search key associated
with that level, called the :term:`discriminator`.
Its splitting decisions alternate among the key dimensions.
Another difference from the BST is that the Bintree uses what is known
as :term:`key-space decomposition`, and so is a form of :term:`trie`.
A key-space decomposition splits the key space into equal halves,
rather than splitting at the key value of the object being stored.

In theory, the Bintree could be used to unify search across any
arbitrary set of keys such as name and zipcode.
But in practice, it is nearly always used to support search on
multidimensional coordinates, such as locations in 2D or 3D space.

.. _BintreeFig:

.. inlineav:: bintreeCONBTEX dgm
   :align: justify

   Example of a Bintree.


We define the discriminator at level :math:`i` to be :math:`i \bmod k`
for :math:`k` dimensions.
For example, assume that we store data organized by :math:`xy`
coordinates.
In this case, :math:`k` is 2 (there are two dimensions), with the
:math:`x` coordinate field arbitrarily designated key 0, and the
:math:`y` coordinate field designated key 1.
At each level, the discriminator alternates between :math:`x` and :math:`y`.
Thus, a node :math:`N` at level 0 (the root) would split
the world in half with a vertical split.
Records with :math:`x` coordinates in the lower half would be on the
left side of the dividing line, and thus in the left subtree.
Records with :math:`x` coordinates in the upper half would be on the
right side of the dividing line, and thus in the right subtree.
At this stage, the :math:`y` coordinate value would play no role.

At level 1, the :math:`y` coordinate becomes the descriminator.
In other words, the left half of the world will be split horizontally
in half if necessary.

A leaf node in the Bintree can either be empty, or it can contain one
data point (in which case it is referred to as being full).
Splitting takes place whenever a point is to be inserted into a leaf
node that already contains a point.

Searching a Bintree for the record with a specified :math:`xy`
coordinate is like searching a BST, except that each level of the
Bintree is associated with a particular discriminator.
If the search process reaches a ``null`` pointer, then
that point is not contained in the tree.

Inserting a new node into the Bintree is similar to
BST insertion.
The Bintree search procedure is followed until a leaf node is found.
If the leaf node is empty, then it can store the new point.
If the leaf node already contains a point, then some additional work
needs to be done.
Call the point already stored in the Bintree :math:`A`, and the new
node that we want to insert :math:`B`.
We must split the node containing A into two, replacing it with a new
internal node and two leaf children.
Record :math:`A` is then placed in the appropriate child, and we
restart the insertion from the new internal node.
If :math:`B` falls within in the newly created empty leaf node, then
it can be inserted there.
But if :math:`B` falls within the newly created leaf node that just
received :math:`A`, then the splitting process must repeat.
Depending on how far apart :math:`A` and :math:`B` are, it is possible
that many splits are required.

Deleting from a Bintree requires that sibling leaf nodes be merged
together if they are empty.
Just like an insert operation can cause many levels of splitting, a
delete operation can cause many levels of merging.

Assume that we want to print out a list of all records that are within
a certain distance :math:`d` of a given point :math:`P`.
We will use Euclidean distance, that is, point :math:`P` is defined to
be within distance :math:`d` of point :math:`N` if
:math:`\sqrt{(P_x - N_x)^2 + (P_y - N_y)^2} \leq d`. [#]_

Search proceeds by means of a "directed" traversal.
When we visit a node of the tree, we only proceed if
the bounding box for the search circle intersects the bounding box for
the node.
If it does not, we stop and return.
If it does intersect an internal node, we visit the node's children.
If it is a leaf node, then we ask whether the data point it contains
is within distance :math:`d` of the search point.
In the average case, the number of nodes that must be visited during a
range query is linear on the number of data records that fall within
the query circle.

Implementation Concerns
~~~~~~~~~~~~~~~~~~~~~~~

Let us now consider how the structure of the Bintree affects the
design of its node representation.
The Bintree is actually a :term:`trie`.
This means that decomposition takes place at the mid-points for
internal nodes,
regardless of where the data points actually fall.
The placement of the data points does determine `whether` a
decomposition for a node takes place, but not `where` the
decomposition for the node takes place.
Internal nodes of the Bintree are quite different from leaf nodes, in
that internal nodes have children (leaf nodes do not) and leaf nodes
have data fields (internal nodes do not).
Thus, it is likely to be beneficial to represent internal nodes
differently from leaf nodes.
Finally, there is the fact that approximately half of the leaf nodes
will contain no data field.

Another issue to consider is: How does a routine traversing the
Bintree get the coordinates for the rectangle represented by the current 
Bintree node?
One possibility is to store with each node its spatial description
(such as upper-left corner and width).
However, this will take a lot of space |---| perhaps as much as the
space needed for the data records, depending on what information is
being stored.

Another possibility is to pass in the coordinates when the recursive
call is made.
For example, consider the search process.
Initially, the search visits the root node of the tree, which has
upper left corner defined to be (0, 0) and whose width and height is
the full size of the space being  covered.
When the appropriate child is visited, it is a simple matter for the
search routine to determine the origin for the child, and the length
of the descriminator dimention simply becomes 
half that of the parent.
Not only does passing in the size and position information for a node
save considerable space, but avoiding storing such information
in the nodes enables a good design choice for
empty leaf nodes, as discussed next.

How should we represent empty leaf nodes?
On average, half of the leaf nodes in a Bintree are empty
(i.e., do not store a data point). 
One implementation option is to use a ``null`` pointer in internal
nodes to represent empty nodes.
This will solve the problem of excessive space requirements.
There is an unfortunate side effect that using a ``null`` pointer
requires the Bintree processing methods to understand this convention.
In other words, you are breaking encapsulation on the node
representation because the tree now must know things about how the
nodes are implemented.
This is not too horrible for this particular application, because the
node class can be considered private to the tree class, in which case
the node implementation is completely invisible to the outside world.
However, it is undesirable if there is another reasonable alternative.

Fortunately, there is a good alternative.
It is called the Flyweight design pattern.
In the Bintree, a flyweight is a single empty leaf node that
is reused in all places where an empty leaf node is needed.
You simply have `all` of the internal nodes with empty leaf
children point to the same node object.
This node object is created once at the beginning of the program,
and is never removed.
The node class recognizes from the pointer value that the flyweight is
being accessed, and acts accordingly.

Note that when using the Flyweight design pattern, you `cannot`
store coordinates for the node in the node.
This is an example of the concept of intrinsic versus extrinsic state.
Intrinsic state for an object is state information stored in the object.
If you stored the coordinates for a node in the node object, those
coordinates would be intrinsic state.
Extrinsic state is state information about an object stored elsewhere
in the environment, such as in global variables or passed to the
method.
If your recursive calls that process the tree pass in the coordinates
for the current node, then the coordinates will be extrinsic state.
A flyweight can have in its intrinsic state `only`
information that is accurate for `all` instances of the flyweight.
Clearly coordinates do not qualify, because each empty
leaf node has its own location.
So, if you want to use a flyweight, you must pass in coordinates.

Another design choice is: Who controls the work, the node
class or the tree class?
For example, on an insert operation, you could have the tree class
control the flow down the tree, looking at (querying) the nodes to see
their type and reacting accordingly.
This is the approach used by the BST implementation in
Module :numref`BST`.
An alternate approach is to have the node class do the work.
That is, you have an insert method for the nodes.
If the node is internal, it passes the city record to the appropriate
child (recursively).
If the node is a flyweight, it replaces itself with a new leaf node.
If the node is a full node, it replaces itself with a subtree.
This is an example of the :term:`composite design pattern`,
discussed in Module :numref:`Composite`.
Use of the composite design would be difficult if null pointers are
used to represent empty leaf nodes.
It turns out that the Bintree insert and delete methods are easier to
implement when using the composite design.

Below is a visualization of the Bintree. Use this visualization to
help understand how the Bintree data structure works.

.. avembed:: AV/Development/bintreeAV.html ss

.. [#] A more efficient computation is
       :math:`(P_x - N_x)^2 + (P_y - N_y)^2 \leq d^2`.
       This avoids performing a square root function.

.. odsascript:: AV/Development/bintreeCON.js
