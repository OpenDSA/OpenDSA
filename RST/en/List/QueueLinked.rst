.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :requires: queue
   :satisfies: linked queue
   :topic: Lists

Linked Queues
=============

Linked Queues
-------------

The linked queue implementation is a straightforward adaptation
of the linked list.
Here is the linked queue class declaration.

.. codeinclude:: Lists/LQueue
   :tag: LQueue1,LQueue2

|

.. inlineav:: lqueueIntroCON ss
   :long_name: Linked Queue Intro
   :links: AV/List/lqueueCON.css
   :scripts: AV/List/llist.js AV/List/lqueueIntroCON.js
   :output: show    
   
|

.. inlineav:: lqueueEnqueueCON ss
   :long_name: Linked Queue Enqueue
   :links: AV/List/lqueueCON.css
   :scripts: AV/List/llist.js AV/List/lqueueEnqueueCON.js
   :output: show   
   
.. avembed:: Exercises/List/LqueueEnqueuePRO.html ka
   :long_name: Linked Queue Enqueue Exercise


Linked Dequeue
--------------

.. inlineav:: lqueueDequeueCON ss
   :long_name: Linked Queue Dequeue
   :links: AV/List/lqueueCON.css
   :scripts: AV/List/llist.js AV/List/lqueueDequeueCON.js
   :output: show 
   
.. avembed:: Exercises/List/LqueueDequeuePRO.html ka
   :long_name: Linked Queue Dequeue Exercise


Comparison of Array-Based and Linked Queues
-------------------------------------------

All member functions for both the array-based and linked queue
implementations require constant time.
The space comparison issues are the same as for the equivalent stack
implementations.
Unlike the array-based stack implementation, there is no convenient
way to store two queues in the same array,
unless items are always transferred directly from one queue to the other.

Stack and Queue Summary Questions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. avembed:: Exercises/List/StackQSumm.html ka
   :long_name: Stack/Queue Summary Exercise
