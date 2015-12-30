.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: binary tree terminology; design patterns; expression tree
   :satisfies: composite
   :topic: Binary Trees, Design Patterns

.. odsalink:: AV/Binary/BTCON.css

Composite-based Expression Tree
===============================

Composite-based Expression Tree
-------------------------------

There is another approach that we can take to represent separate leaf
and internal nodes, also using a virtual base class and separate node
classes for the two types.
This is to implement nodes using the :term:`Composite design pattern`.
This approach is noticeably different from the
:ref:`procedural approach <procedural> <BinaryTreeImpl>` in that the
node classes themselves implement the functionality of ``traverse``.
Here is the implementation.
Base class ``VarBinNode`` declares a member function
``traverse`` that each subclass must implement.
Each subclass then implements its own appropriate behavior for its
role in a traversal.
The whole traversal process is called by invoking ``traverse``
on the root node, which in turn invokes ``traverse`` on its
children.

.. codeinclude:: Binary/ExpressionTreeC
   :tag: Composite

.. .. inlineav:: compositeTraversalCON ss
..   :output: show

When comparing the composite implementation to
the :ref:`procedural approach <procedural> <BinaryTreeImpl>`,
each has advantages and disadvantages.
The non-composite approach does not require that the node classes know
about the ``traverse`` function.
With this approach, it is easy to add new methods to the tree class
that do other traversals or other operations on nodes of the tree.
However, we see that ``traverse`` in
the non-composite approach does 
need to be familiar with each node subclass.
Adding a new node subclass would therefore require modifications to
the ``traverse`` function.
In contrast, the composite approach requires that any new operation on
the tree that requires a traversal also be implemented in the node
subclasses.
On the other hand, the composite approach
avoids the need for the ``traverse`` function to know
anything about the distinct abilities of the node subclasses.
Those subclasses handle the responsibility of performing a traversal
on themselves.
A secondary benefit is that there is no need for ``traverse`` to
explicitly enumerate all of the different node subclasses,
directing appropriate action for each.
With only two node classes this is a minor point.
But if there were many such subclasses, this could become a bigger
problem.
A disadvantage is that the traversal operation must not be called on a
NULL pointer, because there is no object to catch the call.
This problem could be avoided by using a
:ref:`Flyweight <Flyweight> <DesignPatterns>`
to implement empty nodes.

Typically, the non-composite version would be
preferred in this example if ``traverse`` is a member function of
the tree class, and if the node subclasses are hidden from users of
that tree class.
On the other hand, if the nodes are objects that have meaning
to users of the tree separate from their existence as nodes in the
tree, then the composite version might be preferred because hiding the
internal behavior of the nodes becomes more important.

Another advantage of the composite design is that implementing each
node type's functionality might be easier.
This is because you can focus solely on the information passing and
other behavior needed by this node type to do its job.
This breaks down the complexity that many programmers feel overwhelmed
by when dealing with complex information flows related to recursive
processing.

.. odsascript:: AV/Binary/compositeTraversalCON.js
