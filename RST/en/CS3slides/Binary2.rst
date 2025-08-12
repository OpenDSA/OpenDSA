.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

===================
Binary Trees Part 2
===================

Full and Complete Binary Trees
------------------------------

.. revealjs-slide::

* Full binary tree: Each node is either a leaf or internal node with
  exactly two non-empty children.

* Complete binary tree: If the height of the tree is :math:`d`,
  then all leaves except possibly level :math:`d` are completely
  full.
  The bottom level has all nodes to the left side.

.. inlineav:: FullCompCON dgm
   :links: AV/Binary/FullCompCON.css
   :scripts: AV/Binary/FullCompCON.js
   :align: center


Full Binary Tree Theorem (1)
----------------------------

.. revealjs-slide::

* **Theorem:** The number of leaves in a non-empty full binary tree
  is one more than the number of internal nodes.

* **Proof** (by Mathematical Induction):

* **Base case:** A full binary tree with 1 internal node must have
  two leaf nodes.

* **Induction Hypothesis:** Assume any full binary tree **T** containing
  :math:`n-1` internal nodes has :math:`n` leaves.


Full Binary Tree Theorem (2)
----------------------------

.. revealjs-slide::

* **Induction Step:** Given tree **T** with :math:`n` internal nodes,
  pick internal node :math:`I` with two leaf children.
  Remove :math:`I`'s children, call resulting tree **T'**.

* By induction hypothesis, **T'** is a full binary tree with :math:`n`
  leaves.

* Restore :math:`I`'s two children.
  The number of internal nodes has now gone up by 1 to reach
  :math:`n`.
  The number of leaves has also gone up by 1.


Full Binary Tree Corollary
--------------------------

.. revealjs-slide::

* **Theorem:** The number of null pointers in a non-empty tree is one
  more than the number of nodes in the tree.

* **Proof:** Replace all null pointers with a pointer to an empty leaf
  node.  This is a full binary tree.


Dictionary
----------

.. revealjs-slide::

.. codeinclude:: Design/Dictionary
   :tag: DictionaryADT


Dictionary (2)
--------------

.. revealjs-slide::

* How can we implement a dictionary?

  * We know about array-based lists and linked lists.
  * They might be sorted or unsorted.
  * What are the pros and cons?


Binary Search Trees
-------------------

.. revealjs-slide::

.. inlineav:: BinDiffCON dgm
   :links: AV/Binary/BinDiffCON.css
   :scripts: AV/Binary/BinDiffCON.js
   :align: center

BST as a Dictionary (1)
-----------------------

.. revealjs-slide::

.. codeinclude:: Binary/BST
   :tag: BSTa

BST as a Dictionary (2)
-----------------------

.. revealjs-slide::

.. codeinclude:: Binary/BST
   :tag: BSTb

BST ``findhelp``
----------------

.. revealjs-slide::

.. inlineav:: BSTsearchCON ss
   :links: AV/Binary/BSTCON.css
   :scripts: AV/Binary/BSTsearchCON.js
   :output: show


BST ``inserthelp``
------------------

.. revealjs-slide::

.. inlineav:: BSTinsertCON ss
   :links: AV/Binary/BSTCON.css
   :scripts: AV/Binary/BSTinsertCON.js
   :output: show


BST ``deletemax``
-----------------

.. revealjs-slide::

.. inlineav:: BSTdeletemaxCON ss
   :links: AV/Binary/BSTCON.css
   :scripts: AV/Binary/BSTdeletemaxCON.js
   :output: show


BST ``removehelp``
------------------

.. revealjs-slide::

.. inlineav:: BSTremoveCON ss
   :links: AV/Binary/BSTCON.css
   :scripts: AV/Binary/BSTremoveCON.js
   :output: show


BST Analysis
------------

.. revealjs-slide::

* Find: :math:`O(d)`

* Insert: :math:`O(d)`

* Delete: :math:`O(d)`

* :math:`d =` depth of the tree

* :math:`d` is :math:`O(\log n)` if the tree is balanced.

* What is the worst case cost? When?
