.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :title: Implementing the Linked Queue
   :author: Cliff Shaffer
   :institution: Virginia Tech
   :requires: queue
   :satisfies: linked queue
   :topic: Lists
   :keyword: Linked Queue
   :naturallanguage: en
   :programminglanguage: Java
   :description: Presents an implementation for linked queues.


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
   :keyword: Linked Queues
   
|

.. inlineav:: lqueueEnqueueCON ss
   :long_name: Linked Queue Enqueue
   :links: AV/List/lqueueCON.css
   :scripts: AV/List/llist.js AV/List/lqueueEnqueueCON.js
   :output: show   
   :keyword: Linked Queues
   
.. avembed:: Exercises/List/LqueueEnqueuePRO.html ka
   :long_name: Linked Queue Enqueue Exercise
   :keyword: Linked Queues


Linked Dequeue
--------------

.. inlineav:: lqueueDequeueCON ss
   :long_name: Linked Queue Dequeue
   :links: AV/List/lqueueCON.css
   :scripts: AV/List/llist.js AV/List/lqueueDequeueCON.js
   :output: show 
   :keyword: Linked Queues
   
.. avembed:: Exercises/List/LqueueDequeuePRO.html ka
   :long_name: Linked Queue Dequeue Exercise
   :keyword: Linked Queues


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
   :keyword: Stacks; Queues


