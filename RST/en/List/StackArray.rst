.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :requires: list ADT
   :satisfies: stack ADT; array-based stack; stack
   :topic: Lists

Stacks
======

Stack Terminology and Implementation
------------------------------------

The :term:`stack` is a list-like structure
in which elements may be inserted or removed from only one end.
While this restriction makes stacks less flexible than lists,
it also makes stacks both efficient (for those operations they can do)
and easy to implement.
Many applications require only the limited form of
insert and remove operations that stacks provide.
In such cases, it is more efficient to use the simpler stack data
structure rather than the generic list.
For example, the :ref:`freelist <freelist> <Freelist>` is really a
stack.

Despite their restrictions, stacks have many uses.
Thus, a special vocabulary for stacks has developed.
Accountants used stacks long before the invention of the computer.
They called the stack a ":term:`LIFO`" list,
which stands for "Last-In, First-Out."
Note that one implication of the LIFO policy is that stacks
remove elements in reverse order of their arrival.

The accessible element of the stack is called the ``top`` element.
Elements are not said to be inserted, they are :term:`pushed <push>`
onto the stack.
When removed, an element is said to be :term:`popped <pop>` from the
stack.
Here is a simple stack :term:`ADT`.

.. codeinclude:: Lists/Stack
   :tag: Stack

As with lists, there are many variations on stack implementation.
The two approaches presented here are the :term:`array-based stack`
and the :ref:`linked stack <linked stack> <StackLinked>`, 
which are analogous to array-based and linked lists, respectively.


Array-Based Stacks
~~~~~~~~~~~~~~~~~~

Here is a complete implementation for
the array-based stack class.

.. codeinclude:: Lists/AStack
   :tag: AStack1,AStack2

|

.. inlineav:: astackVarCON ss
   :long_name: Array stack variables slideshow
   :links: AV/List/astackCON.css
   :scripts: AV/List/astackVarCON.js
   :output: show
   

The array-based stack implementation is essentially
a simplified version of the array-based list.
The only important design decision to be made is which end of the
array should represent the top of the stack.

.. inlineav:: astackTopCON ss
   :long_name: Array stack top position slideshow
   :links: AV/List/astackCON.css
   :scripts: AV/List/astackTopCON.js
   :output: show
   
|

.. inlineav:: astackPushCON ss
   :long_name: Array stack push slideshow
   :links: AV/List/astackCON.css
   :scripts: AV/List/astackPushCON.js
   :output: show

.. avembed:: Exercises/List/AstackPushPRO.html ka
   :long_name: Array-based Stack Push Exercise


Pop
---

.. inlineav:: astackPopCON ss
   :long_name: Array stack pop slideshow
   :links: AV/List/astackCON.css
   :scripts: AV/List/astackPopCON.js
   :output: show
   
.. avembed:: Exercises/List/AstackPopPRO.html ka
   :long_name: Array-based Stack Pop Exercise
