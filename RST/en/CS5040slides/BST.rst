.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

===================
Binary Search Trees
===================

Binary Search Trees
-------------------
.. slide:: Binary Search Trees

   .. inlineav:: BinDiffCON dgm
      :links: AV/Binary/BinDiffCON.css
      :scripts: AV/Binary/BinDiffCON.js
      :align: center

.. slide:: BST as a Dictionary (1)

   .. codeinclude:: Binary/BST
      :tag: BSTa

.. slide:: BST as a Dictionary (2)

   .. codeinclude:: Binary/BST
      :tag: BSTb

.. slide:: BST ``findhelp``

   .. inlineav:: BSTsearchCON ss
      :links: AV/Binary/BSTCON.css
      :scripts: AV/Binary/BSTsearchCON.js
      :output: show


.. slide:: BST ``inserthelp``

   .. inlineav:: BSTinsertCON ss
      :links: AV/Binary/BSTCON.css
      :scripts: AV/Binary/BSTinsertCON.js
      :output: show


.. slide:: BST ``deletemax``

   .. inlineav:: BSTdeletemaxCON ss
      :links: AV/Binary/BSTCON.css
      :scripts: AV/Binary/BSTdeletemaxCON.js
      :output: show


.. slide:: BST ``removehelp``

   .. inlineav:: BSTremoveCON ss
      :links: AV/Binary/BSTCON.css
      :scripts: AV/Binary/BSTremoveCON.js
      :output: show


.. slide:: .

   .


.. slide:: BST Analysis

   Find: :math:`O(d)`

   Insert: :math:`O(d)`

   Delete: :math:`O(d)`

   :math:`d =` depth of the tree

   :math:`d` is :math:`O(\log n)` if the tree is balanced.

   What is the worst case cost? When?
