.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

===================
Binary Trees Part 2
===================

Binary Search Trees
~~~~~~~~~~~~~~~~~~~~

.. odsafig:: Images/BSTShape2.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Two Binary Search Trees

BST as a Dictionary (1)
~~~~~~~~~~~~~~~~~~~~~~~~

.. codeinclude:: Binary/BST
   :tag: BSTa

BST as a Dictionary (2)
~~~~~~~~~~~~~~~~~~~~~~~~

.. codeinclude:: Binary/BST
   :tag: BSTb

BST ``findhelp``
~~~~~~~~~~~~~~~~

.. odsalink:: AV/Binary/BSTCON.css

.. inlineav:: BSTsearchCON ss
   :output: show

.. odsascript:: AV/Binary/BSTsearchCON.js

BST ``inserthelp``
~~~~~~~~~~~~~~~~~~

.. inlineav:: BSTinsertCON ss
   :output: show

.. odsascript:: AV/Binary/BSTinsertCON.js


BST ``deletemax``
~~~~~~~~~~~~~~~~~~

.. inlineav:: BSTdeletemaxCON ss
   :output: show

.. odsascript:: AV/Binary/BSTdeletemaxCON.js


BST ``removehelp``
~~~~~~~~~~~~~~~~~~

.. inlineav:: BSTremoveCON ss
   :output: show

.. odsascript:: AV/Binary/BSTremoveCON.js

BST Analysis
~~~~~~~~~~~~~~

Find: :math:`O(d)`

Insert: :math:`O(d)`

Delete: :math:`O(d)`

:math:`d =` depth of the tree

:math:`d` is :math:`O(\log n)` if the tree is balanced.

What is the worst case cost? When?


BST vs. SkipList
~~~~~~~~~~~~~~~~~

Both can have bad performance (:math:`\Theta(n)`) in the worst case.

Both have operations that cost :math:`\log(n)` in the average case.

Its all a matter of chance (SkipList) vs. highly probably bad
scenarios (BST).
