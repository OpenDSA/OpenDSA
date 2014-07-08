.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :requires: stack ADT
   :satisfies: linked stack
   :topic: Lists

.. odsalink:: AV/List/listStackLCON.css      

Linked Stacks
=============

Linked Stack Implementation
---------------------------

The linked stack implementation is quite simple.
The freelist of Module :numref:`<Freelist>` is an example
of a linked stack.

Elements are inserted and removed only from the head of the list.
A header node is not used because no special-case code is required
for lists of zero or one elements.
Here is the complete linked stack implementation.

.. codeinclude:: Lists/LStack
   :tag: LStack1,LStack2

.. _LStackDiagram:

.. inlineav:: LStackDiagramCON dgm
   :align: center   
   
   Diagram showing a linked stack

.. inlineav:: LStackPushCON ss
   :output: show   
   
.. inlineav:: LStackPopCON ss
   :output: show
   
.. avembed:: Exercises/List/listLStackPush.html ka

.. avembed:: Exercises/List/listLStackPop.html ka

   
Comparison of Array-Based and Linked Stacks
-------------------------------------------

All operations for the array-based and linked stack implementations
take constant time, so from a time efficiency perspective,
neither has a significant advantage.
Another basis for comparison is the total space
required.
The analysis is similar to that done for list implementations.
The array-based stack must declare a fixed-size array initially, and
some of that space is wasted whenever the stack is not full.
The linked stack can shrink and grow but requires the overhead of a
link field for every element.

When multiple stacks are to be
implemented, it is possible to take advantage of the one-way growth of
the array-based stack.
This can be done by using a single array to store two stacks.
One stack grows inward from each end as illustrated by
Figure :num:`Figure #TwoArrayStacks`, hopefully leading to less wasted
space.
However, this only works well when the space requirements of the two
stacks are inversely correlated.
In other words, ideally when one stack grows, the other will shrink.
This is particularly effective when elements are taken from
one stack and given to the other.
If instead both stacks grow at the same time, then the free space
in the middle of the array will be exhausted
quickly.

.. _TwoArrayStacks:

.. inlineav:: LStackTwostacksCON dgm
   :align: center     

   Two stacks implemented within in a single array, both growing
   toward the middle.
   
.. odsascript:: AV/List/listStackLCON.js
