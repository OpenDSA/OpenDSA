.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

=========
SkipLists
=========

SkipList Ideal
--------------

.. revealjs-slide::

.. raw:: html

   <iframe src="../../../Metadata/inlineav/SearchStruct/SkipListIntroCON.html" 
           width="960" 
           height="500"
           frameborder="0"
           style="background: white; display: block; margin: 0 auto;">
   </iframe>


SkipList Reality
----------------

.. revealjs-slide::

.. raw:: html

   <iframe src="../../../Metadata/inlineav/SearchStruct/SkipListInsertCON.html" 
           width="960" 
           height="500"
           frameborder="0"
           style="background: white; display: block; margin: 0 auto;">
   </iframe>


Analysis
--------

.. revealjs-slide::

* Best-case behavior is "balanced": :math:`\Theta(\log n)` (like a
  BST).
* Worst-case behavior: All nodes at the same level (regardless of
  what level): Effectively degenerates to a linked list (like a
  BST).
* The Big Idea:

  * SkipList behavior is not dependent on order of
    inserts/delete as is a BST.

  * SkipList performance is dictated entirely by random chance.

  * It is similar to what the BST cost would be if we randomized the
    input order. A huge improvement in expected performance!


Programming Principles
----------------------

.. revealjs-slide::

#. All container classes should be general.
#. Any container class's initial state should be identical to its
   empty state.
