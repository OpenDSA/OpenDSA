.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

======
Lists2
======

.. slide:: Space Comparison

   "Break-even" point:

   :math:`DE = n(P + E)`

   :math:`n = \frac{DE}{P + E}`

   E: Space for data value.

   P: Space for pointer.

   D: Number of elements in array.


.. slide:: Space Example

   * Array-based list: Overhead is one pointer (4 bytes) per position in
     array – whether used or not.

   * Linked list: Overhead is two pointers per link node
     one to the element, one to the next link

   * Data is the same for both.

   * When is the space the same?

     * When the array is half full


.. slide:: Freelist

   .. odsalink:: AV/List/listFreeCON.css

   System new and garbage collection are slow.

   * Add freelist support to the Link class.

   .. inlineav:: listFreeCON ss
      :output: show

   .. odsascript:: AV/List/listFreeCON.js

.. slide:: Doubly Linked Lists

   .. odsalink:: DataStructures/DoubleLinkList.css
   .. odsalink:: AV/List/dlistCON.css

   .. inlineav:: dlistDiagramCON dgm
      :output: show

   .. odsascript:: DataStructures/DoubleLinkList.js
   .. odsascript:: AV/List/dlist.js
   .. odsascript:: AV/List/dlistDiagramCON.js


.. slide:: Doubly Linked Node (1)

   .. codeinclude:: Lists/DLink
      :tag: DLink



.. slide:: Doubly Linked Insert

   .. inlineav:: dlistInsertCON ss
      :output: show   

   .. odsascript:: AV/List/dlistInsertCON.js



.. slide:: Doubly Linked Remove

   .. inlineav:: dlistRemoveCON ss
      :output: show

   .. odsascript:: AV/List/dlistRemoveCON.js


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

   .. odsalink:: AV/List/aqueueCON.css

   .. inlineav:: aqueueFirstCON ss
      :output: show

   .. odsascript:: DataStructures/CircularQueue.js
   .. odsascript:: AV/List/aqueueFirstCON.js

.. slide:: Queue Implementation (2)

   .. inlineav:: aqueueDriftCON ss
      :output: show

   .. odsascript:: AV/List/aqueueDriftCON.js


.. slide:: Queue Implementation (3)

   .. inlineav:: aqueueBadCON ss
      :output: show

   .. odsascript:: AV/List/aqueueBadCON.js


.. slide:: Circular Queue (1)

   .. inlineav:: aqueueCircularCON ss
      :output: show


   .. odsascript:: AV/List/aqueueCircularCON.js

.. slide:: Circular Queue (2)

   .. inlineav:: aqueueEmptyCON ss
      :output: show

   .. odsascript:: AV/List/aqueueEmptyCON.js
