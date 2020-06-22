.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
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

.. TODO::
   
   | Lesson Plan for Today:
   |    Standard presentation on lists
   |    Provide opportunity to discuss P1, based on student questions

   | Relationship to CSOs:
   |    CSO...

.. slide:: Lists

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
      :long_name: Array-based List Insertion Slideshow
      :links: AV/List/alistCON.css
      :scripts: AV/List/alistInsertCON.js
      :output: show


.. slide:: Link Class

   Dynamic allocation of new list elements.

   .. codeinclude:: Lists/Link
      :tag: Link


.. slide:: Linked List Position (1)

   .. inlineav:: llistBadCON ss
      :long_name: Linked List Slideshow 1
      :links: AV/List/llistCON.css
      :scripts: AV/List/llist.js AV/List/llistBadCON.js
      :output: show


.. slide:: Linked List Position (2)

   .. inlineav:: llistBadDelCON ss
      :long_name: Linked List Slideshow 2
      :links: AV/List/llistCON.css
      :scripts: AV/List/llist.js AV/List/llistBadDelCON.js
      :output: show


.. slide:: Linked List Position (3)

   .. inlineav:: llistInitCON dgm
      :links: AV/List/llistCON.css
      :scripts: AV/List/llist.js AV/List/llistInitCON.js
      :align: center

   |

   .. inlineav:: llistHeaderCON dgm
      :links: AV/List/llistCON.css
      :scripts: AV/List/llist.js AV/List/llistHeaderCON.js
      :align: center


.. slide:: Linked List Class (1)

   .. inlineav:: llistVarsCON ss
      :long_name: Linked List Variables Slideshow
      :links: AV/List/llistCON.css
      :scripts: AV/List/llist.js AV/List/llistVarsCON.js
      :output: show


.. slide:: Linked List Class (2)

   .. inlineav:: llistConsCON ss
      :long_name: Linked List Constructors Slideshow
      :links: AV/List/llistCON.css
      :scripts: AV/List/llist.js AV/List/llistConsCON.js
      :output: show


.. slide:: Insertion

   .. inlineav:: llistInsertCON ss
      :long_name: Linked List Insert Slideshow
      :links: AV/List/llistCON.css
      :scripts: AV/List/llist.js AV/List/llistInsertCON.js
      :output: show


.. slide:: Removal

   .. inlineav:: llistRemoveCON ss
      :long_name: Linked List Remove Slideshow
      :links: AV/List/llistCON.css
      :scripts: AV/List/llist.js AV/List/llistRemoveCON.js
      :output: show


.. slide:: Prev

   .. inlineav:: llistOtherCON ss
      :long_name: Linked List Position Slideshow
      :links: AV/List/llistCON.css
      :scripts: AV/List/llist.js AV/List/llistOtherCON.js
      :output: show

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
      :long_name: Freelist Slideshow 1
      :links: AV/List/listFreeCON.css
      :scripts: AV/List/llist.js AV/List/listFreeCON.js
      :output: show


.. slide:: Doubly Linked Lists

   .. inlineav:: dlistDiagramCON dgm
      :links: DataStructures/DoubleLinkList.css AV/List/dlistCON.css
      :scripts: DataStructures/DoubleLinkList.js AV/List/dlist.js AV/List/dlistDiagramCON.js
      :output: show


.. slide:: Doubly Linked Node (1)

   .. codeinclude:: Lists/DLink
      :tag: DLink


.. slide:: Doubly Linked Insert

   .. inlineav:: dlistInsertCON ss
      :long_name: Doubly Linked List Insert
      :links: DataStructures/DoubleLinkList.css AV/List/dlistCON.css
      :scripts: DataStructures/DoubleLinkList.js AV/List/dlist.js AV/List/dlistInsertCON.js
      :output: show   


.. slide:: Doubly Linked Remove

   .. inlineav:: dlistRemoveCON ss
      :long_name: Doubly Linked List Remove
      :links: DataStructures/DoubleLinkList.css AV/List/dlistCON.css
      :scripts: DataStructures/DoubleLinkList.js AV/List/dlist.js AV/List/dlistRemoveCON.js
      :output: show
