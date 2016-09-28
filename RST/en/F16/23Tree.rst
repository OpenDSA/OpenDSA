.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

==========
2-3+ Trees
==========

2-3+ Trees
----------

.. slide:: 2-3 Tree

   * A 2-3 Tree has the following properties:
      #. A node contains one or two keys
      #. Every internal node has either two children (if it contains
         one key) or three children (if it contains two keys).
      #. All leaves are at the same level in the tree, so the tree is
         always height balanced.

   * The 2-3 Tree has a search tree property analogous to the BST.


.. slide:: 2-3+ Tree

   * Internal nodes of the 2-3+ Tree do not store records
      * They only store key values to guide the search.
   * Leaf nodes store records or pointers to records.
   * A leaf node may store more or less records than an internal node
     stores keys.

   See |TTViz_link| for examples of operations.

   .. |TTViz_link| raw:: html

      <a href=" http://lti.cs.vt.edu/NewKA/OpenDSA/AV/Development/TTPlusTree.html"
      target="_blank">this link</a>

   See |BP_link| for an interactive visualization.

   .. |BP_link| raw:: html

      <a href="http://www.cs.usfca.edu/~galles/visualization/BPlusTree.html"
      target="_blank">this link</a>


.. slide:: 2-3+ Tree Insert Rules

   #. If you have room in the node, add in the record.
       * You might need to update parent keys, but not parent structure
   #. If the node overflows, then split 1/2.
       * Promote the right node's first key value to the parent.
       * This can cause a cascade of splits.


.. slide:: 2-3+ Tree Deletion Rules (1)

   1. If the node has enough records, simply remove this one.
       * Don't bother to adjust key values of parents
   2. If the node underflows, attempt to borrow from a sibling.
       * Do not borrow from cousins.
       * Borrowing will require update of keys in parents, but not
         parent structure.


.. slide:: 2-3+ Tree Deletion Rules (2)

   3. If borrowing is impossible, then that means something has to
      change structurally.

       * If this is a leaf node, then it goes away (no records left). Which
         means a deletion from the parent.
       * If this is an internal node that lost a child, then it is down
         to one child that must be merged with a sibling.
       * At a minimum, this means adjustment to other key values up the
         tree.
       * It could cause a cascade of merges up the tree. In the limit,
         the root might go away, making the tree become one level
         shorter.

.. slide:: Special Considerations for Project 2

   * The difference between Key and Value are slightly blurred.
   * The tree stores KVPairs, each record is a "track".
   * We represent each track with TWO records: artist|song and
     song|artist
   * An artist with multiple songs appears as multiple KVPairs with
     the same "key" (artist), but different "values" (songs).
   * When searching, use the "value" to break ties in the "key"

