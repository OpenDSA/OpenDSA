.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :requires: list ADT
   :satisfies: stack
   :topic: Lists

.. odsalink:: AV/List/listStackCON.css      

Stacks
======

Stack terminology
-----------------

The :term:`stack` is a list-like structure
in which elements may be inserted or removed from only one end.
While this restriction makes stacks less flexible than lists,
it also makes stacks both efficient (for those operations they can do)
and easy to implement.
Many applications require only the limited form of
insert and remove operations that stacks provide.
In such cases, it is more efficient to use the simpler stack data
structure rather than the generic list.
For example, the freelist of Module :numref:`<Freelist>` is really a
stack.

Despite their restrictions, stacks have many uses.
Thus, a special vocabulary for stacks has developed.
Accountants used stacks long before the invention of the computer.
They called the stack a "LIFO" list,
which stands for "Last-In, First-Out."
Note that one implication of the LIFO policy is that stacks
remove elements in reverse order of their arrival.

The accessible element of the stack is called the ``top`` element.
Elements are not said to be inserted, they are :term:`pushed` onto the
stack.
When removed, an element is said to be :term:`popped` from the stack.
Here is a simple stack ADT.

.. codeinclude:: Lists/Stack.pde
   :tag: Stack

As with lists, there are many variations on stack implementation.
The two approaches presented here are the :term:`array-based stack`
and the :term:`linked stack`, 
which are analogous to array-based and linked lists, respectively.

Array-Based Stacks
------------------

Here is a complete implementation for
the array-based stack class.

.. codeinclude:: Lists/AStack.pde
   :tag: AStack1,AStack2

.. inlineav:: AStackVarCON ss
   :output: show
   
The array-based stack implementation is essentially
a simplified version of the array-based list.
The only important design decision to be made is which end of the
array should represent the top of the stack.

.. inlineav:: AStackTopposCON ss
   :output: show
   
.. inlineav:: AStackPushCON ss
   :output: show

.. inlineav:: AStackPopCON ss
   :output: show
   
.. avembed:: Exercises/List/listAStackPush.html ka

.. avembed:: Exercises/List/listAStackPop.html ka

.. odsascript:: AV/List/listStackCON.js
