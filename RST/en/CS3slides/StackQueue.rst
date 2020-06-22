.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

=================
Stacks and Queues
=================

.. slide:: Container Class Design Issues

   * Storing a record vs. Storing a reference to a record
   * Homogeneity: Allow different record types? Check and block?
   * Deletion: What happens to the record?


.. slide:: Stacks

   LIFO: Last In, First Out.

   Restricted form of list: Insert and remove only at front of list.

   Notation:

   * Insert: PUSH
   * Remove: POP
   * The accessible element is called TOP.


.. slide:: Stack ADT

   .. codeinclude:: Lists/Stack
      :tag: Stack


.. slide:: Array-Based Stack (1)

   Issues:

   * Which end is the top?
   * Where does “top” point to?
   * What are the costs of the operations?


.. slide:: Array-Based Stack (2)

   .. codeinclude:: Lists/AStack
      :tag: AStack1


.. slide:: Linked Stack

   .. codeinclude:: Lists/LStack
      :tag: LStack1

   What are the costs of the operations?


   How do space requirements compare to the array-based stack
   implementation?


.. slide:: Queues

   FIFO: First in, First Out

   Restricted form of list: Insert at one end, remove from the other.

   Notation:

   * Insert: Enqueue
   * Delete: Dequeue
   * First element: Front
   * Last element: Rear


.. slide:: Queue Implementation (1)

   .. inlineav:: aqueueFirstCON ss
      :long_name: Array-based Queue Positions Slideshow
      :links: AV/List/aqueueCON.css
      :scripts: AV/List/aqueueFirstCON.js
      :output: show


.. slide:: Queue Implementation (2)

   .. inlineav:: aqueueDriftCON ss
      :long_name: Array-based Queue Drift Slideshow
      :links: AV/List/aqueueCON.css
      :scripts: AV/List/aqueueDriftCON.js
      :output: show


.. slide:: Queue Implementation (3)

   .. inlineav:: aqueueBadCON ss
      :long_name: Array-based Queue Bad Representation Slideshow
      :links: AV/List/aqueueCON.css
      :scripts: AV/List/aqueueBadCON.js
      :output: show


.. slide:: Circular Queue (1)

   .. inlineav:: aqueueCircularCON ss
      :long_name: Circular Array-based Queue Slideshow
      :links: AV/List/aqueueCON.css
      :scripts: DataStructures/CircularQueue.js AV/List/aqueueCircularCON.js
      :output: show


.. slide:: Circular Queue (2)

   .. inlineav:: aqueueEmptyCON ss
      :long_name: Empty Circular Array-based Queue Slideshow
      :links: AV/List/aqueueCON.css
      :scripts: DataStructures/CircularQueue.js AV/List/aqueueEmptyCON.js
      :output: show
