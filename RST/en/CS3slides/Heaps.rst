.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

=====
Heaps
=====

Binary Tree Space Overhead (1)
------------------------------

.. revealjs-slide::

* From the Full Binary Tree Theorem:

  * Half of the pointers are null.

* If leaves store only data, then overhead depends on whether this
  is full tree.

* Ex: Full tree, all nodes the same, with two pointers to children and
  one to element

  * Total space required is :math:`(3p + d)n`
  * Overhead: :math:`3pn`
  * If :math:`p = d`, this means :math:`3p/(3p + d) = 3/4` overhead.


Binary Tree Space Overhead (2)
------------------------------

.. revealjs-slide::

* Eliminate pointers from the leaf nodes

.. math::

   \frac{n/2(2p)}{n/2(2p) + dn} = \frac{p}{p + d}

* This is 1/2 if :math:`p = d`.

* :math:`(2p)/(2p + d)` if data only at leaves :math:`\Rightarrow`
  2/3 overhead.

* Note that some method is needed to distinguish leaves from internal
  nodes.


Complete Trees
--------------

.. revealjs-slide::

.. image:: Images/BinArray.png
   :width: 300
   :align: center
   :alt: Complete binary tree node numbering

.. math::

   \begin{array}{|c|c|c|c|c|c|c|c|c|c|c|c|c|}
   \hline
   \textrm{Position} & 0  & 1 & 2 & 3 &  4 &  5 & 6 & 7 & 8 &  9 & 10 & 11\\
   \hline
   \hline
   \textrm{Parent} & \,--\, & 0 & 0 & 1 &  1 &  2 &  2 & 3 & 3 & 4 & 4 & 5\\
   \hline
   \textrm{Left Child} & 1  & 3 & 5 & 7 &  9 & 11 & \,--\, & \,--\, & \,--\, &
   \,--\, & \,--\, &  \,--\,\\
   \hline
   \textrm{Right Child} & 2  & 4 & 6 & 8 & 10 & \,--\, & \,--\, & \,--\, &
   \,--\, & \,--\, & \,--\, &  \,--\,\\
   \hline
   \textrm{Left Sibling} & \,--\, & \,--\, & 1 & \,--\, &  3 & \,--\, & 5 &
   \,--\, & 7 & \,--\, &  9 &  \,--\,\\
   \hline
   \textrm{Right Sibling} & \,--\, & 2 & \,--\, & 4 & \,--\, &  6 & \,--\, & 8 &
   \,--\, & 10 & \,--\, & \,--\,\\
   \hline
   \end{array}


Heap insert
-----------

.. revealjs-slide::

.. inlineav:: heapinsertCON ss
   :long_name: Heap insert Slideshow
   :links: 
   :scripts: DataStructures/binaryheap.js AV/Binary/heapinsertCON.js
   :output: show


Building a Heap
---------------

.. revealjs-slide::

.. inlineav:: heapbuildCON ss
   :long_name: Heapbuild Slideshow
   :links: 
   :scripts: DataStructures/binaryheap.js AV/Binary/heapbuildCON.js
   :output: show


Building a Heap: Analysis
-------------------------

.. revealjs-slide::

.. inlineav:: heapbuildProofCON ss
   :long_name: Heap build analysis proof Slideshow
   :links: AV/Binary/heapbuildProofCON.css
   :scripts: DataStructures/binaryheap.js AV/Binary/heapbuildProofCON.js
   :output: show


Delete the maximum value
------------------------

.. revealjs-slide::

.. inlineav:: heapmaxCON ss
   :long_name: Remove Max Slideshow
   :links: 
   :scripts: DataStructures/binaryheap.js AV/Binary/heapmaxCON.js
   :output: show
