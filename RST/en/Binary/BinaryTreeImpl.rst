.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: binary tree terminology
   :satisfies: binary tree node implementation; expression tree
   :topic: Binary Trees

.. odsalink:: AV/Binary/BTCON.css

Binary Tree Node Implementations
================================

Binary Tree Node Implementations
--------------------------------

In this module we examine various ways to implement binary tree
nodes.
By definition, all binary tree nodes have two children,
though one or both children can be empty.
Binary tree nodes typically contain a value field,
with the type of the field depending on the application.
The most common node implementation includes a value field and
pointers to the two children.

Here is a simple implementation for the
``BinNode`` abstract class, which we will name ``BSTNode``.
Its element type is an Object.
When we need to support search structures such as the
:ref:`Binary Search Tree <binary search tree> <BST>`,
the node will typically store a
:ref:`key-value pair <key-value pair> <Dictionary>`.
Every ``BSTNode`` object also has two pointers,
one to its left child and another to its right child.

.. codeinclude:: Binary/BSTNode
   :tag: BSTNode

.. _BinLink:

.. odsafig:: Images/BinLink.png
   :width: 300
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Binary tree node implementation

   Illustration of a typical pointer-based binary tree implementation,
   where each node stores two child pointers and a value.

Some programmers find it convenient to add a pointer to the
node's parent, allowing easy upward movement in the
tree.
Using a parent pointer is somewhat analogous to adding a link to the
previous node in a doubly linked list.
In practice, the parent pointer is almost always unnecessary
and adds to the space overhead for the tree implementation.
It is not just a problem that parent pointers take space.
More importantly, many uses of the parent pointer are driven by
improper understanding of recursion and so indicate poor programming.
If you are inclined toward using a parent pointer, consider if there
is a more efficient implementation possible.

An important decision in the design of a pointer-based node
implementation is whether the same class definition will be used for
:term:`leaves <leaf node>` and
:term:`internal nodes <internal node>`. 
Using the same class for both will simplify the implementation, but
might be an inefficient use of space.
Some applications require data values only for the leaves.
Other applications require one type of value for the leaves and
another for the internal nodes.
Examples include the :term:`binary trie`, the :term:`PR Quadtree`, 
the :term:`Huffman coding tree`, and the :term:`expression tree`
illustrated by Figure :num:`Figure #DiffNodes`. 
By definition, only internal nodes have non-empty children.
If we use the same node implementation for both internal and leaf
nodes, then both must store the child pointers.
But it seems wasteful to store child pointers in the leaf nodes.
Thus, there are many reasons why it can save space to have separate
implementations for internal and leaf nodes.

.. _DiffNodes:

.. odsafig:: Images/DiffNode.png
   :width: 300
   :align: center
   :capalign: center
   :figwidth: 90%
   :alt: Expression Tree

   An expression tree for :math:`4x(2x + a) - c`.

As an example of a tree that stores different information at the leaf
and internal nodes, consider the expression tree illustrated by
Figure :num:`Figure #DiffNodes`.
The expression tree represents an algebraic expression
composed of binary operators such as addition, subtraction,
multiplication, and division.
Internal nodes store operators, while the leaves store operands.
The tree of Figure :num:`Figure #DiffNodes` represents the expression
:math:`4x(2x + a) - c`.
The storage requirements for a leaf in an expression tree are quite
different from those of an internal node.
Internal nodes store one of a small set of operators,
so internal nodes could store a small code identifying the
operator such as a single byte for the operator's character symbol.
In contrast, leaves store variable names or numbers,
which is considerably larger in order
to handle the wider range of possible values.
At the same time, leaf nodes need not store child pointers.

:term:`Object-oriented languages <object-oriented programming paradigm>`
allow us to differentiate leaf from
internal nodes through the use of a :term:`class hierarchy`.
A :term:`base class` provides a general definition for an
object,
and a :term:`subclass` modifies a base class to add more detail.
A base class can be declared for binary tree nodes in general,
with subclasses defined for the internal and leaf nodes.
The base class in the following code is named
``VarBinNode``.
It includes a virtual member function named
``isLeaf``, which indicates the node type.
Subclasses for the internal and leaf node types each implement
``isLeaf``.
Internal nodes store child pointers of the base class type;
they do not distinguish their children's actual subclass.
Whenever a node is examined, its version of ``isLeaf`` indicates
the node's subclass.

.. codeinclude:: Binary/ExpressionTree
   :tag: ExpressionTree

.. inlineav:: expressionTraversalCON ss
   :output: show

The Expression Tree implementation includes two subclasses derived
from class ``VarBinNode``, named ``LeafNode`` and
``IntlNode``.
Class ``IntlNode`` can access its children through
pointers of type ``VarBinNode``.
Function ``traverse`` illustrates the use of these classes.
When ``traverse`` calls method ``isLeaf``,
the language's runtime environment
determines which subclass this particular instance of ``rt``
happens to be and calls that subclass's version of ``isLeaf``.
Method ``isLeaf`` then provides the actual node type to its
caller.
The other member functions for the derived subclasses are accessed by
type-casting the base class pointer as appropriate, as shown in
function ``traverse``.

.. odsascript:: AV/Binary/expressionTraversalCON.js
