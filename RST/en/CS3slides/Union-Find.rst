.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

==========
Union/FIND
==========

Disjoint Sets and Equivalence Classes
-------------------------------------

.. revealjs-slide::

* Sometimes we have a collection of objects that we want to divide
  into separate sets.

.. inlineav:: UFconcomCON dgm
   :links: AV/General/UFCON.css
   :scripts: AV/General/UFconcomCON.js
   :align: left


Approach
--------

.. revealjs-slide::

* Each object initially is a separate node in its own tree.

* When two objects are "equivalent", then add them to the same tree.

* Key question: **Given two nodes, are they in the same tree?**


Parent Pointer Implementation
-----------------------------

.. revealjs-slide::

.. inlineav:: UFfigCON dgm
   :links: AV/General/UFCON.css
   :scripts: AV/General/UFfigCON.js


Union/FIND
----------

.. revealjs-slide::

.. codeinclude:: General/ParPtrTree1
   :tag: UF1, UF2


Weighted Union
--------------

.. revealjs-slide::

* A key goal is to keep the depth of nodes as shallow as possible
  (consistent with efficient processing).

* Weighted Union rule:

  * When two trees are unioned, add one with fewer nodes as a child
    of the root of the tree with more nodes.
  * Depth is :math:`O(\log n)`


Algorithm Visualization
-----------------------

.. revealjs-slide::

.. inlineav:: ufCON ss
   :long_name: Union/Find Example
   :links: AV/General/UFCON.css
   :scripts: AV/General/ufCON.js
   :output: show

            
Path Compression
----------------

.. revealjs-slide::

.. inlineav:: pathcompCON ss
   :long_name: Union/Find Path Compression Example
   :links: AV/General/UFCON.css
   :scripts: AV/General/pathcompCON.js
   :output: show
