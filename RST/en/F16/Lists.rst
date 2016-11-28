.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

=====
Lists
=====

Lists
-----

.. slide:: Lists, Stacks, Queues

   .. odsalink:: AV/List/alistCON.css
   .. odsalink:: AV/List/llistCON.css

   A list is a finite, ordered **sequence** of data items.

   Important concept: List elements have a **position**.

   Notation: :math:`<a_0, a_1, …, a_{n-1}>`

   What operations should we implement?


.. slide:: List Implementation Concepts

   Our list implementation will support the concept of a
   **current position**.

   Operations will act relative to the current position.

   :math:`<20, 23\ |\ 12, 15>`

.. slide:: List ADT (1)

   .. codeinclude:: Lists/List
      :tag: ListADT1


.. slide:: List ADT (2)

   .. codeinclude:: Lists/List
      :tag: ListADT2


.. slide:: List ADT (3)

   .. codeinclude:: Lists/List
      :tag: ListADT3


.. slide:: List ADT Examples

   List: :math:`<12\ |\ 32, 15>`

   L.insert(99);

   Result: :math:`<12\ |\ 99, 32, 15>`

   Iterate through the whole list:

   .. codeinclude:: Lists/ListTest
      :tag: listiter


.. slide:: List Find Function

   .. codeinclude:: Lists/ListTest
      :tag: listfind


.. slide:: Array-Based List Class (1)

   .. codeinclude:: Lists/AList
      :tag: AListVars

   .. codeinclude:: Lists/AList
      :tag: Constructors


.. slide:: Array-Based List Insert

   .. inlineav:: alistInsertCON ss
      :output: show

   .. odsascript:: AV/List/alistInsertCON.js


.. slide:: Link Class

   Dynamic allocation of new list elements.

   .. codeinclude:: Lists/Link
      :tag: Link


.. slide:: Linked List Position (1)

   .. inlineav:: llistBadCON ss
      :output: show

   .. odsascript:: AV/List/llist.js
   .. odsascript:: AV/List/llistBadCON.js

.. slide:: Linked List Position (2)

   .. inlineav:: llistBadDelCON ss
      :output: show

   .. odsascript:: AV/List/llistBadDelCON.js


.. slide:: Linked List Position (3)

   .. inlineav:: llistInitCON dgm
      :output: show

   |

   .. inlineav:: llistHeaderCON dgm
      :output: show

   .. odsascript:: AV/List/llistInitCON.js
   .. odsascript:: AV/List/llistHeaderCON.js


.. slide:: Linked List Class (1)

   .. inlineav:: llistVarsCON ss
      :output: show

   .. odsascript:: AV/List/llistVarsCON.js


.. slide:: Linked List Class (2)

   .. inlineav:: llistConsCON ss
      :output: show

   .. odsascript:: AV/List/llistConsCON.js


.. slide:: Insertion

   .. inlineav:: llistInsertCON ss
      :output: show

   .. odsascript:: AV/List/llistInsertCON.js

.. slide:: Removal

   .. inlineav:: llistRemoveCON ss
      :output: show

   .. odsascript:: AV/List/llistRemoveCON.js

.. slide:: Prev

   .. inlineav:: llistOtherCON ss
      :output: show

   .. odsascript:: AV/List/llistOtherCON.js

.. slide:: Overhead

   * Container classes store elements. Those take space.

   * Container classes also store additional space to organize the
     elements.

      * This is called **overhead**

   * The **overhead fraction** is: overhead/total space


.. slide:: Comparison of Implementations

   * Array-Based Lists:
      * Insertion and deletion are :math:`\Theta(n)`.
      * Prev and direct access are :math:`\Theta(1)`.
      * Array must be allocated in advance.
      * No overhead if all array positions are full.

   * Linked Lists:
      * Insertion and deletion are :math:`\Theta(1)`.
      * Prev and direct access are :math:`\Theta(n)`.
      * Space grows with number of elements.
      * Every element requires overhead.


.. slide:: Space Comparison

   "Break-even" point:

   :math:`DE = n(P + E)`

   :math:`n = \frac{DE}{P + E}`

   E: Space for data value.

   P: Space for pointer.

   D: Number of elements in array.


.. slide:: Space Example

   * Array-based list: Overhead is one pointer (8 bytes) per position in
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


.. slide:: Container Class Design Issues

   * Storing a record vs. Storing a reference to a record
   * Homogeneity: Allow different record types? Check and block?
   * Deletion: What happens to the record?


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
