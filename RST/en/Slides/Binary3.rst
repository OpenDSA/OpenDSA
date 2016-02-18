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

.. slide:: Midterm 1

   Midterm 1 is Tuesday, February 23

   Topics:

   * Algorithm Analysis:
      * Upper, lower bounds, bounds on a problem

   * Linear Structures: Lists, Stacks, Queues
      * Implementation and Analysis, space requirements

   * Binary Trees: Notation, full binary tree theorem, space analysis

   * BST implementation and analysis, compare to SkipList

.. slide:: Spatial Data Structures

   * BST, SkipList handle a one dimensional key.

   * What if we have 2 or more dimensions?
      * Could concatenate sub-keys into one. But that makes one dimension
        more important.
      * We want all dimensions to be equally important.

   * Keystone functionality: Regionsearch, nearest


.. slide:: Spatial Data Structure (2)

   * Key design considerations:
      * Alternating dimensions vs. multiway splits
      * Key space vs. Object space decomposition
      * Decomposition rule


.. slide:: PR Quadtree (1)

   .. odsafig:: Images/PRexamp.png
      :width: 700
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: Example of a PR quadtree


.. slide:: PR Quadtree (2)

   .. odsafig:: Images/PRinsert.png
      :width: 700
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: PR quadtree insertion example.


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

.. slide:: Flyweight Design Pattern

   (Otherwise) multiple copies of a stateless object, all references
   pointing to the same copy.

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
