.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer, Mohammed Mostafa, and Margaret Ellis
   :requires: Pointer intro
   :satisfies:
   :topic: Link Nodes


.. odsalink:: AV/Pointers/linkNodes1CON.css
.. odsalink:: AV/Pointers/linkNodes2CON.css
.. odsalink:: AV/Pointers/linkNodes3CON.css
.. odsalink:: AV/Pointers/linkNodes4CON.css
.. odsalink:: AV/Pointers/linkNodes5CON.css

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
   :links: 
   :scripts: 
   :output: show

How do we set up the chain to begin with?

.. inlineav:: linkNodes2CON ss
   :links: 
   :scripts: 
   :output: show

One can easily write a loop to iterate through all the Links on a
chain, without needing to know how many there actually are.

.. inlineav:: linkNodes3CON ss
   :links: 
   :scripts: 
   :output: show

One can remove a Link from a chain.

.. inlineav:: linkNodes4CON ss
   :links: 
   :scripts: 
   :output: show


Finally, we can also insert new Links.

.. inlineav:: linkNodes5CON ss
   :links: 
   :scripts: 
   :output: show

Here is an exercise to practice manipulating link nodes.

.. avembed:: Exercises/Pointers/PointerEX3PRO.html ka

.. odsascript:: AV/Pointers/linkNodes1CON.js
.. odsascript:: AV/Pointers/linkNodes2CON.js
.. odsascript:: AV/Pointers/linkNodes3CON.js
.. odsascript:: AV/Pointers/linkNodes4CON.js
.. odsascript:: AV/Pointers/linkNodes5CON.js
