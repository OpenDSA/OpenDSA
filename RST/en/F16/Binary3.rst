.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

===================
Binary Trees Part 3
===================

Binary Trees Part 3
-------------------

.. slide:: Comparison (1)

   * How do we generalize the concept of comparison?
   * "<" is not good enough. String < String won't give you what you
     want.
   * Need a general way to get the key out of a record
   * Define a method record.key()?
      * [Note for C++ users: Operator overloading is effectively the
        same thing.]
      * That is not good enough. What if we want to search on different
        key fields?

.. slide:: Comparison (2)

   * Fundamental issue: Defining the key is a property of the context,
     NOT a property of the record.


.. slide:: KVpair

   This is a truly general way to solve the problem.

   .. codeinclude:: Utils/KVPair
      :tag: KVPair


.. slide:: .

   .


.. slide:: KVpair: Generics

   .. codeinclude:: Utils/KVPairGen
      :tag: KVPair


.. slide:: .

   .


.. slide:: Using the KVpair (1)

   .. codeinclude:: Sorting/Insertionsort
      :tag: Insertionsort

   What is being compared?

   What if we want to find the record that has a given key?


.. slide:: Binary Tree Implementation (1)

   "Simple" node model.

   .. odsafig:: Images/BinLink.png
      :width: 600
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: Binary tree node implementation


.. slide:: Binary Tree Implementation (2)

   Internal nodes can be different from leaf nodes.

   .. odsafig:: Images/DiffNode.png
      :width: 400
      :align: center
      :capalign: center
      :figwidth: 90%
      :alt: Expression Tree


.. slide:: Inheritance (1)

   .. codeinclude:: Binary/ExpressionTree
      :tag: ExpressionTree1

.. slide:: Inheritance (2)

   .. codeinclude:: Binary/ExpressionTree
      :tag: ExpressionTree2


.. slide:: Inheritance (3)

   .. odsalink:: AV/Binary/BTCON.css

   .. inlineav:: expressionTraversalCON ss
      :output: show

   .. odsascript:: AV/Binary/expressionTraversalCON.js


.. slide:: Design Patterns

   * Design patterns capture reusable pieces of design wisdom.

   * Goals:
      * Quickly communicate design wisdom to new designers
      * Give a shared vocabulary to designers


.. slide:: Composite (1)

   .. codeinclude:: Binary/ExpressionTreeC
      :tag: Composite1


.. slide:: Composite (2)

   .. codeinclude:: Binary/ExpressionTreeC
      :tag: Composite2

.. slide:: Composite (3)

   .. codeinclude:: Binary/ExpressionTreeC
      :tag: Composite3


.. slide:: Space Overhead (1)

   * From the Full Binary Tree Theorem:
      * Half of the pointers are null.

   * If leaves store only data, then overhead depends on whether this
     is full tree.

   * Ex: Full tree, all nodes the same, with two pointers to children and
     one to element

      * Total space required is :math:`(3p + d)n`
      * Overhead: :math:`3pn`
      * If :math:`p = d`, this means :math:`3p/(3p + d) = 3/4` overhead.


.. slide:: Space Overhead (2)

   Eliminate pointers from the leaf nodes

   .. math::

      \frac{n/2(2p)}{n/2(2p) + dn} = \frac{p}{p + d}

   This is 1/2 if :math:`p = d`.

   :math:`(2p)/(2p + d)` if data only at leaves :math:`\Rightarrow`
   2/3 overhead.

   Note that some method is needed to distinguish leaves from internal
   nodes.
