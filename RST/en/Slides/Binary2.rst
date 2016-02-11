.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

===================
Binary Trees Part 2
===================

.. slide:: Binary Tree Implementation

   .. odsafig:: Images/BinLink.png
      :width: 600
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: Binary tree node implementation


.. slide:: Binary Tree Implementation (2)

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

   Design patterns capture reusable pieces of design wisdom.

   Goals:

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
