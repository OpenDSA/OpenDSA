.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: Spatial data structures
   :satisfies: KD tree
   :topic: Spatial Data Structures

KD Trees
========

KD Trees
--------

The :term:`kd tree` is a modification to the :term:`BST` that allows
for efficient processing of
:term:`multi-dimensional search keys <multi-dimensional search key>`.
The kd tree differs from the BST in that each level of the kd tree
makes branching decisions based on a particular search key associated
with that level, called the :term:`discriminator`.
In principle, the kd tree could be used to unify key searching across
any arbitrary set of keys such as name and zipcode.
But in practice, it is nearly always used to support search on
multi-dimensional coordinates, such as locations in 2D or 3D space.
We define the discriminator at level :math:`i` to be
:math:`i` mod :math:`k` for :math:`k` dimensions.
For example, assume that we store data organized by
:math:`xy`-coordinates.
In this case, :math:`k:math:` is 2 (there are two coordinates),
with the :math:`x`-coordinate field arbitrarily designated key 0,
and the :math:`y`-coordinate field designated key 1.
At each level, the discriminator alternates between :math:`x` and
:math:`y`.
Thus, a node :math:`N` at level 0 (the root) would have in its left
subtree only nodes whose :math:`x` values are less than
:math:`N_x` (because :math:`x` is search key 0, and
:math:`0 \mod 2 = 0`).
The right subtree would contain nodes whose :math:`x` values are
greater than :math:`N_x`.
A node :math:`M` at level 1 would have in its left subtree only
nodes whose :math:`y` values are less than :math:`M_y`.
There is no restriction on the relative values of :math:`M_x` and the
:math:`x` values of :math:`M` 's descendants, because branching
decisions made at :math:`M` are based solely on the :math:`y`
coordinate.
Figure :num:`Figure #kdExamp` shows an example of how a collection
of two-dimensional points would be stored in a kd tree.

.. _kdExamp:

.. odsafig:: Images/KDtree.png
   :width: 300
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Example of a kd tree

   Example of a kd tree.
   (a) The kd tree decomposition for a :math:`128 \times 128`-unit
   region containing seven data points.
   (b) The kd tree for the region of (a).

In Figure :num:`Figure #kdExamp`, the region containing the points
is (arbitrarily) restricted to a :math:`128 \times 128` square, and
each internal node splits the search space.
Each split is shown by a line, vertical for nodes with
:math:`x` discriminators and horizontal for nodes with :math:`y`
discriminators.
The root node splits the space into two parts;
its children further subdivide the space into smaller parts.
The children's split lines do not cross the root's split line.
Thus, each node in the kd tree helps to decompose the space into
rectangles that show the extent of where nodes can fall in the
various subtrees.

Searching a kd tree for the record with a specified xy-coordinate
is like searching a BST, except that each level of the
kd tree is associated with a particular discriminator.

.. topic:: Example

   Consider searching the kd tree for a
   record located at :math:`P = (69, 50)`.
   First compare :math:`P` with the point stored at
   the root (record :math:`A` in Figure :num:`Figure #kdExamp`).
   If :math:`P` matches the location of :math:A`,
   then the search is successful.
   In this example the positions do not match
   (:math:`A` 's location (40, 45) is not the same as (69, 50)),
   so the search must continue.
   The :math:`x` value of :math:`A` is compared with that of
   :math:`P` to determine in which direction to branch.
   Because :math:`A_x`'s value of 40 is less than
   :math:`P`'s :math:`x` value of 69, we branch to the right subtree
   (all cities with :math:`x` value greater than or equal to 40 are in
   the right subtree).
   :math:`A_y` does not affect the decision on which way to
   branch at this level.
   At the second level, :math:`P` does not match record :math:`C`'s
   position, so another branch must be taken.
   However, at this level we branch based on the relative :math:`y`
   values of point :math:`P` and record :math:`C`
   (because :math:`1 \mod 2 = 1`, which corresponds to the
   :math:`y`-coordinate).
   Because :math:`C_y`'s value of 10 is less than :math:`P_y`'s value
   of 50, we branch to the right.
   At this point, :math:`P` is compared against the position
   of :math:`D`. 
   A match is made and the search is successful.

   If the search process reaches a ``NULL`` pointer, then
   that point is not contained in the tree.
   Here is a kd tree search implementation,
   equivalent to the ``findhelp`` function of the BST class.
   ``KD`` class private member ``D`` stores the key's dimension.

::

   private E findhelp(KDNode<E> rt, int[] key, int level) {
     if (rt == null) return null;
     E it = rt.element();
     int[] itkey = rt.key();
     if ((itkey[0] == key[0]) && (itkey[1] == key[1]))
       return rt.element();
     if (itkey[level] > key[level])
       return findhelp(rt.left(), key, (level+1)%D);
     else
       return findhelp(rt.right(), key, (level+1)%D);
   }

Inserting a new node into the kd tree is similar to
BST insertion.
The kd tree search procedure is followed until a ``NULL`` pointer is
found, indicating the proper place to insert the new node.

.. topic:: Example

   Inserting a record at location (10, 50) in the
   kd tree of Figure :num:`Figure #kdExamp` first requires a search
   to the node containing record :math:`B`.
   At this point, the new record is inserted into :math:`B`'s left
   subtree.

Deleting a node from a kd tree is similar to deleting from a BST,
but slightly harder.
As with deleting from a BST, the first step is to find the node
(call it :math:`N`) to be deleted.
It is then necessary to find a descendant of :math:`N` which can be
used to replace :math:`N` in the tree.
If :math:`N` has no children, then :math:`N` is replaced with a
``NULL`` pointer.
Note that if :math:`N` has one child that in turn has children, we
cannot simply assign :math:`N`'s parent to point to :math:`N`'s
child as would be done in the BST.
To do so would change the level of all nodes in the subtree, and thus
the discriminator used for a search would also change.
The result is that the subtree would no longer be a kd tree because a
node's children might now violate the BST property for that
discriminator.

Similar to BST deletion, the record stored in :math:`N` should
be replaced either by the record in :math:`N`'s right subtree with
the least value of <var>N</var>'s discriminator, or by the record in
:math:`N`'s left subtree with the greatest value for this
discriminator.
Assume that :math:`N` was at an odd level and therefore :math:`y` is
the discriminator.
:math:`N` could then be replaced by the record in its right subtree
with the least :math:`y` value (call it :math:`Y_{min}`).
The problem is that <var>Y</var><sub>min</sub> is not necessarily the
leftmost node, as it would be in the BST.
A modified search procedure to find the least :math:`y` value in the
left subtree must be used to find it instead.
The implementation for ``findmin`` is shown next.
A recursive call to the delete routine will then remove
:math`Y_{min}` from the tree.
Finally, :math:`Y_{min}`'s record is substituted for the
record in node :math:`N`.

::

   private KDNode<E>
   findmin(KDNode<E> rt, int descrim, int level) {
     KDNode<E> temp1, temp2;
     int[] key1 = null;
     int[] key2 = null;
     if (rt == null) return null;
     temp1 = findmin(rt.left(), descrim, (level+1)%D);
     if (temp1 != null) key1 = temp1.key();
     if (descrim != level) {
       temp2 = findmin(rt.right(), descrim, (level+1)%D);
       if (temp2 != null) key2 = temp2.key();
       if ((temp1 == null) || ((temp2 != null) &&
                      (key1[descrim] > key2[descrim])))
       temp1 = temp2;
       key1 = key2;
     } // Now, temp1 has the smaller value
     int[] rtkey = rt.key();
     if ((temp1 == null) || (key1[descrim] > rtkey[descrim]))
       return rt;
     else
       return temp1;
   }


In ``findmin``, on levels using the minimum value's discriminator,
branching is to the left.
On other levels, both children's subtrees must be visited.
Helper function ``min`` takes two nodes and a discriminator as
input, and returns the node with the smaller value in that
discriminator.

Note that we can replace the node to be deleted with the least-valued
node from the right subtree only if the right subtree exists.
If it does not, then a suitable replacement must be found in the left
subtree.
Unfortunately, it is not satisfactory to replace :math:`N`'s record
with the record having the greatest value for the discriminator in the
left subtree, because this new value might be duplicated.
If so, then we would have equal values for the discriminator in
:math:`N`'s left subtree, which violates the ordering rules for the
kd tree.
Fortunately, there is a simple solution to the problem.
We first move the left subtree of node :math:`N` to become the
right subtree (i.e., we simply swap the values of :math:`N`'s left
and right child pointers).
At this point, we proceed with the normal deletion process, replacing
the record of <var>N</var> to be deleted with the record containing
the **least** value of the discriminator from what is now
:math:`N`'s right subtree.

Assume that we want to print out a list of all records that are within
a certain distance :math:`d` of a given point :math:`P`.
We will use Euclidean distance, that is, point :math:`P` is defined
to be within distance :math:`d` of point :math:`N`
if :math:`\sqrt{(P_x - N_x)^2 + (P_y - N_y)^2} \leq d.` [#]_

If the search process reaches a node whose key value for the
discriminator is more than :math:`d` above the corresponding value in
the search key, then it is not possible that any record in the right
subtree can be within distance :math:`d` of the search key because all
key values in that dimension are always too great.
Similarly, if the current node's key value in the discriminator
is :math:`d` less than that for the search key value, then no record in
the left subtree can be within the radius.
In~such cases, the subtree in question need not be searched,
potentially saving much time.
In the average case, the number of nodes that must be visited during a
range query is linear on the number of data records that fall within
the query circle.

.. topic:: Example

   We will now find all cities in the kd tree of
   Figure :num:`Figure #kdSearch` within 25 units of the point
   (25, 65). 
   The search begins with the root node, which contains record
   :math:`A`.
   Because (40, 45) is exactly 25 units from the search point, it will
   be reported.
   The search procedure then determines which branches of the tree to
   take.
   The search circle extends to both the left and the right of
   :math:`A`'s (vertical) dividing line, so both branches of the tree
   must be searched.
   The left subtree is processed first.
   Here, record :math:`B` is checked and found to fall within the
   search circle.
   Because the node storing :math:`B` has no children, processing of
   the left subtree is complete.
   Processing of :math:`A<`'s right subtree now begins.
   The coordinates of record :math:`C` are checked and found not to
   fall within the circle.
   Thus, it should not be reported.
   However, it is possible that cities within :math:`C`'s subtrees
   could fall within the search circle even if :math:`C` does not.
   As :math:`C` is at level 1, the discriminator at this level is the
   :math:`y`-coordinate.
   Because :math:`65-25 > 10`, no record in :math:`C`'s left subtree
   (i.e., records above :math:`C`) could possibly be in the search
   circle.
   Thus, :math:`C`'s left subtree (if it had one) need not be
   searched.
   However, cities in :math:`C`'s right subtree could fall within the
   circle.
   Thus, search proceeds to the node containing record :math:`D`.
   Again, :math:`D` is outside the search circle.
   Because :math:`25+25 < 69`, no record in :math:`D<`'s right subtree
   could be within the search circle.
   Thus, only :math:`D`'s left subtree need be searched.
   This leads to comparing record :math:`E`'s coordinates against the
   search circle.
   Record :math:`E` falls outside the search circle, and processing is
   complete.
   So we see that we only search subtrees whose rectangles fall within
   the search circle.

.. _kdSearch:

.. odsafig:: Images/KDtree2.png
   :width: 300
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Example of searching in a kd tree

   Searching in the kd tree of Figure :num:`Figure #kdExamp`.
   (a) The kd tree decomposition for a :math:`128 \times 128`-unit
   region containing seven data points.
   (b) The kd tree for the region of (a).

Here is an implementation for the region search method.

::

   private void rshelp(KDNode<E> rt, int[] point,
                       int radius, int lev) {
     if (rt == null) return;
     int[] rtkey = rt.key();
     if (InCircle(point, radius, rtkey))
       System.out.println(rt.element());
     if (rtkey[lev] > (point[lev] - radius))
       rshelp(rt.left(), point, radius, (lev+1)%D);
     if (rtkey[lev] < (point[lev] + radius))
       rshelp(rt.right(), point, radius, (lev+1)%D);
   }

When a node is visited, function ``InCircle`` is used to
check the Euclidean distance between the node's record and the query
point.
It is not enough to simply check that the differences between the
:math:`x`- and :math:`y`-coordinates are each less than the query
distances because the the record could still be outside the search
circle, as illustrated by Figure :num:`Figure #InCirc`.

.. _InCirc:

.. odsafig:: Images/InCirc.png
   :width: 300
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Euclidean distance checking

   Function ``InCircle`` must check the Euclidean distance
   between a record and the query point.
   It is possible for a record :math:`A` to have :math:`x`- and
   :math:`y`-coordinates each within the query distance of the query
   point :math:`C`, yet have :math:`A` itself lie outside the query
   circle.

Here is a visualization of building a kd-tree.
</p>

.. avembed:: AV/Development/kd-treeAV.html ss

Here is a version where you can click to get the node inserted.

.. TODO::
   :type: AV

   This can probably replace the static visualization.

.. avembed:: AV/Development/kd-interact.html ss


.. TODO::
   :type: exercise

   We need a proficiency exercise.

.. [#] A more efficient computation is
       :math:`(P_x - N_x)^2 + (P_y - N_y)^{2} \leq d^{2}`.
       This avoids performing a square root function.
