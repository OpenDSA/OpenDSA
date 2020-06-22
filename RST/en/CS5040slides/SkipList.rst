.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

=========
SkipLists
=========

.. slide:: SkipList Idea

   .. inlineav:: SkipListIntroCON ss
      :links: DataStructures/SkipList.css AV/SearchStruct/SkipListIntroCON.css
      :scripts: DataStructures/SkipList.js AV/SearchStruct/SkipListIntroCON.js
      :output: show


.. slide:: SkipList Reality

   .. inlineav:: SkipListInsertCON ss
      :links: DataStructures/SkipList.css AV/SearchStruct/SkipListInsertCON.css
      :scripts: DataStructures/SkipList.js AV/SearchStruct/SkipListInsertCON.js
      :output: show
   

.. slide:: Analysis

   * Best-case behavior is "balanced": :math:`\Theta(\log n)` (like a
     BST).
   * Worst-case behavior: All nodes at the same level (regardless of
     what level): Effectively degenerates to a linked list (like a
     BST).
   * Reality: Its behavior is not so dependent on order of inserts as
     a BST. Its similar to what BST cost would be if we randomized the
     input order. A huge improvement in expected performance!

.. slide:: Programming Principles

   #. All container classes should be general.
   #. Any container class's initial state should be identical to its
      empty state.
