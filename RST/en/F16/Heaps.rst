.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

=====
Heaps
=====

Heaps
-----

.. slide:: Complete Trees
   
   .. odsalink:: AV/slides.css
   .. odsalink:: AV/Binary/heapbuildProofCON.css
  
   .. _BinArray:

   .. figure:: Images/BinArray.png
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


.. slide:: Heap insert

   .. inlineav:: heapinsertCON ss
      :output: show

   .. odsascript:: DataStructures/binaryheap.js
   .. odsascript:: AV/Binary/heapinsertCON.js


.. slide:: Building a Heap

   .. inlineav:: heapbuildCON ss
      :output: show

   .. odsascript:: AV/Binary/heapbuildCON.js


.. slide:: Building a Heap Proof

   .. inlineav:: heapbuildProofCON ss
      :output: show

   .. odsascript:: AV/Binary/heapbuildProofCON.js


.. slide:: Delete the maximum value

   .. inlineav:: heapmaxCON ss
      :output: show

   .. odsascript:: AV/Binary/heapmaxCON.js
