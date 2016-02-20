.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

======
Lists
======

   .. odsalink:: AV/List/alistCON.css
   .. odsalink:: AV/List/llistCON.css

   A list is a finite, ordered **sequence** of data items.

   Important concept: List elements have a **position**.

   Notation: :math:`<a_0, a_1, …, a_{n-1}>`

   What operations should we implement?

List Implementation Concepts
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   Our list implementation will support the concept of a
   **current position**.

   Operations will act relative to the current position.

   :math:`<20, 23\ |\ 12, 15>`

List ADT (1)
~~~~~~~~~~~~

   .. codeinclude:: Lists/List
      :tag: ListADT1

List ADT (2)
~~~~~~~~~~~~~

   .. codeinclude:: Lists/List
      :tag: ListADT2

List ADT (3)
~~~~~~~~~~~~~

   .. codeinclude:: Lists/List
      :tag: ListADT3

List ADT Examples
~~~~~~~~~~~~~~~~~~

   List: :math:`<12\ |\ 32, 15>`

   L.insert(99);

   Result: :math:`<12\ |\ 99, 32, 15>`

   Iterate through the whole list:

   .. codeinclude:: Lists/ListTest
      :tag: listiter

List Find Function
~~~~~~~~~~~~~~~~~~~

   .. codeinclude:: Lists/ListTest
      :tag: listfind

Array-Based List Class (1)
~~~~~~~~~~~~~~~~~~~~~~~~~~~

   .. codeinclude:: Lists/AList
      :tag: AListVars

   .. codeinclude:: Lists/AList
      :tag: Constructors

Array-Based List Insert
~~~~~~~~~~~~~~~~~~~~~~~~

   .. inlineav:: alistInsertCON ss
      :output: show

   .. odsascript:: AV/List/alistInsertCON.js

Link Class
~~~~~~~~~~

   Dynamic allocation of new list elements.

   .. codeinclude:: Lists/Link
      :tag: Link

Linked List Position (1)
~~~~~~~~~~~~~~~~~~~~~~~~~

   .. inlineav:: llistBadCON ss
      :output: show

   .. odsascript:: AV/List/llist.js
   .. odsascript:: AV/List/llistBadCON.js

Linked List Position (2)
~~~~~~~~~~~~~~~~~~~~~~~~

   .. inlineav:: llistBadDelCON ss
      :output: show

   .. odsascript:: AV/List/llistBadDelCON.js

Linked List Position (3)
~~~~~~~~~~~~~~~~~~~~~~~~

   .. inlineav:: llistInitCON dgm
      :output: show

   |

   .. inlineav:: llistHeaderCON dgm
      :output: show

   .. odsascript:: AV/List/llistInitCON.js
   .. odsascript:: AV/List/llistHeaderCON.js

Linked List Class (1)
~~~~~~~~~~~~~~~~~~~~~~

   .. inlineav:: llistVarsCON ss
      :output: show

   .. odsascript:: AV/List/llistVarsCON.js

Linked List Class (2)
~~~~~~~~~~~~~~~~~~~~~

   .. inlineav:: llistConsCON ss
      :output: show

   .. odsascript:: AV/List/llistConsCON.js

Insertion
~~~~~~~~~~

   .. inlineav:: llistInsertCON ss
      :output: show
   
   .. odsascript:: AV/List/llistInsertCON.js

Removal
~~~~~~~

   .. inlineav:: llistRemoveCON ss
      :output: show

   .. odsascript:: AV/List/llistRemoveCON.js

Prev
~~~~~~

   .. inlineav:: llistOtherCON ss
      :output: show

   .. odsascript:: AV/List/llistOtherCON.js

Overhead
~~~~~~~~~

   * Container classes store elements. Those take space.

   * Container classes also store additional space to organize the
     elements.

      * This is called **overhead**

   * The **overhead fraction** is: overhead/total space

Comparison of Implementations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

Space Comparison
~~~~~~~~~~~~~~~~~

   "Break-even" point:

   :math:`DE = n(P + E)`

   :math:`n = \frac{DE}{P + E}`

   E: Space for data value.

   P: Space for pointer.

   D: Number of elements in array.
