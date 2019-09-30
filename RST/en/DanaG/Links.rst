Link Nodes
==========

Link Nodes
----------

In this module, we introduce the idea of a :term:`link node`.
A link node has some sort of value field, and a pointer to another link
node.
Later, you will learn about :term:`linked lists <linked list>`,
which are made from link nodes.
For now, we will just use them as a simple way to connect some objects
together.

Here is a class definition for a basic ``link`` object.
Note that, while the ``next`` field references another ``link``
object, the ``data`` field is of type ``Object``.
This denotes that we don't really care what sort of thing one stores
in a ``link`` node's data field.

.. codeinclude:: Pointers/Link
   :tag: Link

Now we'll see some examples for how to use ``link`` nodes to put
chains together.

.. inlineav:: linkNodes1CON ss
   :links: AV/DanaG/linkNodes1CON.css
   :scripts: AV/DanaG/linkNodes1CON.js
   :output: show
