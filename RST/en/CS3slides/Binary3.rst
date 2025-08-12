.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

===================
Binary Trees Part 3
===================

Comparison (1)
--------------

.. revealjs-slide::

* How do we generalize the concept of comparison?
* "<" is not good enough. String < String won't give you what you
  want.
* Need a general way to get the key out of a record
* Define a method record.key()?

  * [Note for C++ users: Operator overloading is effectively the
    same thing.]
  * That is not good enough. What if we want to search on different
    key fields?

Comparison (2)
--------------

.. revealjs-slide::

* Fundamental issue: The key is a property of the context,
  NOT a property of the record.


KVpair
------

.. revealjs-slide::

* This is a truly general way to solve the problem.

.. codeinclude:: Utils/KVPair
   :tag: KVPair


KVpair: Generics
----------------

.. revealjs-slide::

.. codeinclude:: Utils/KVPairGen
   :tag: KVPair


Using the KVpair (1)
--------------------

.. revealjs-slide::

.. codeinclude:: Sorting/Insertionsort
   :tag: Insertionsort

* What is being compared?

* What if we want to find the record that has a given key?


Binary Tree Implementation (1)
------------------------------

.. revealjs-slide::

* "Simple" node model.

.. inlineav:: BTnullpointerCON dgm
   :links: AV/Binary/BTCON.css AV/Binary/BTnullpointerCON.css
   :scripts: AV/Binary/BTnullpointerCON.js
   :align: center


Binary Tree Implementation (2)
------------------------------

.. revealjs-slide::

* Internal nodes can be different from leaf nodes.

.. inlineav:: expressionTreeCON dgm
   :links: AV/Binary/BTCON.css AV/Binary/expressionTreeCON.css
   :scripts: AV/Binary/expressionTreeCON.js
   :align: center


Inheritance (1)
---------------

.. revealjs-slide::

.. codeinclude:: Binary/ExpressionTree
   :tag: ExpressionTree1


Inheritance (2)
---------------

.. revealjs-slide::

.. codeinclude:: Binary/ExpressionTree
   :tag: ExpressionTree2


Inheritance (3)
---------------

.. revealjs-slide::

.. inlineav:: expressionTraversalCON ss
   :long_name: Expression Tree Traversal Slideshow
   :links: AV/Binary/BTCON.css
   :scripts: AV/Binary/expressionTraversalCON.js
   :output: show


Design Patterns
---------------

.. revealjs-slide::

* Design patterns capture reusable pieces of design wisdom.

* Goals:

  * Quickly communicate design wisdom to new designers
  * Give a shared vocabulary to designers


Composite (1)
-------------

.. revealjs-slide::

.. codeinclude:: Binary/ExpressionTreeC
   :tag: Composite1


Composite (2)
-------------

.. revealjs-slide::

.. codeinclude:: Binary/ExpressionTreeC
   :tag: Composite2

Composite (3)
-------------

.. revealjs-slide::

.. codeinclude:: Binary/ExpressionTreeC
   :tag: Composite3


Space Overhead (1)
------------------

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


Space Overhead (2)
------------------

.. revealjs-slide::

* Eliminate pointers from the leaf nodes

.. math::

   \frac{n/2(2p)}{n/2(2p) + dn} = \frac{p}{p + d}

* This is 1/2 if :math:`p = d`.

* :math:`(2p)/(2p + d)` if data only at leaves :math:`\Rightarrow`
  2/3 overhead.

* Note that some method is needed to distinguish leaves from internal
  nodes.
