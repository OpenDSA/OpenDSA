.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer, Mohammed Mostafa, and Margaret Ellis
   :requires: Pointer intro
   :satisfies: Link Nodes
   :topic: Link Nodes

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
   :links: AV/Pointers/linkNodes1CON.css
   :scripts: AV/Pointers/linkNodes1CON.js
   :output: show

How do we set up the chain to begin with?

.. inlineav:: linkNodes2CON ss
   :links: AV/Pointers/linkNodes2CON.css
   :scripts: AV/Pointers/linkNodes2CON.js
   :output: show


Here is an exercise to practice manipulating link nodes.

.. avembed:: Exercises/Pointers/PointerEX3PRO.html ka
