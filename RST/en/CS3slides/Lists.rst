.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

=====
Lists
=====

Lists
-----

.. revealjs-slide::

* A list is a finite, ordered **sequence** of data items.

* Important concept: List elements have a **position**.

* Notation: :math:`<a_0, a_1, …, a_{n-1}>`

* What operations should we implement?


List Implementation Concepts
----------------------------

.. revealjs-slide::

* Our list implementation will support the concept of a
  **current position**.

* Operations will act relative to the current position.

* :math:`<20, 23\ |\ 12, 15>`

List ADT (1)
------------

.. revealjs-slide::

.. codeinclude:: Lists/List
   :tag: ListADT1


List ADT (2)
------------

.. revealjs-slide::

.. codeinclude:: Lists/List
   :tag: ListADT2


List ADT (3)
------------

.. revealjs-slide::

.. codeinclude:: Lists/List
   :tag: ListADT3


List ADT Examples
-----------------

.. revealjs-slide::

* List: :math:`<12\ |\ 32, 15>`

* L.insert(99);

* Result: :math:`<12\ |\ 99, 32, 15>`

* Iterate through the whole list:

.. codeinclude:: Lists/ListTest
   :tag: listiter

List Find Function
------------------

.. revealjs-slide::

.. codeinclude:: Lists/ListTest
   :tag: listfind


Array-Based List Class (1)
--------------------------

.. revealjs-slide::

.. codeinclude:: Lists/AList
   :tag: AListVars

.. codeinclude:: Lists/AList
   :tag: Constructors


Array-Based List Insert
-----------------------

.. revealjs-slide::

.. inlineav:: alistInsertCON ss
   :long_name: Array-based List Insertion Slideshow
   :links: AV/List/alistCON.css
   :scripts: AV/List/alistInsertCON.js
   :output: show


Link Class
----------

.. revealjs-slide::

* Dynamic allocation of new list elements.

.. codeinclude:: Lists/Link
   :tag: Link


Linked List Position (1)
------------------------

.. revealjs-slide::

.. inlineav:: llistBadCON ss
   :long_name: Linked List Slideshow 1
   :links: AV/List/llistCON.css
   :scripts: AV/List/llist.js AV/List/llistBadCON.js
   :output: show


Linked List Position (2)
------------------------

.. revealjs-slide::

.. inlineav:: llistBadDelCON ss
   :long_name: Linked List Slideshow 2
   :links: AV/List/llistCON.css
   :scripts: AV/List/llist.js AV/List/llistBadDelCON.js
   :output: show


Linked List Position (3)
------------------------

.. revealjs-slide::
   
.. inlineav:: llistInitCON dgm
   :links: AV/List/llistCON.css
   :scripts: AV/List/llist.js AV/List/llistInitCON.js
   :align: center

|

.. inlineav:: llistHeaderCON dgm
   :links: AV/List/llistCON.css
   :scripts: AV/List/llist.js AV/List/llistHeaderCON.js
   :align: center


Linked List Class (1)
---------------------

.. revealjs-slide::

.. inlineav:: llistVarsCON ss
   :long_name: Linked List Variables Slideshow
   :links: AV/List/llistCON.css
   :scripts: AV/List/llist.js AV/List/llistVarsCON.js
   :output: show


Linked List Class (2)
---------------------

.. revealjs-slide::


.. inlineav:: llistConsCON ss
   :long_name: Linked List Constructors Slideshow
   :links: AV/List/llistCON.css
   :scripts: AV/List/llist.js AV/List/llistConsCON.js
   :output: show


Insertion
---------

.. revealjs-slide::

.. inlineav:: llistInsertCON ss
   :long_name: Linked List Insert Slideshow
   :links: AV/List/llistCON.css
   :scripts: AV/List/llist.js AV/List/llistInsertCON.js
   :output: show


Removal
-------

.. revealjs-slide::

.. inlineav:: llistRemoveCON ss
   :long_name: Linked List Remove Slideshow
   :links: AV/List/llistCON.css
   :scripts: AV/List/llist.js AV/List/llistRemoveCON.js
   :output: show


Prev
----

.. revealjs-slide::

.. inlineav:: llistOtherCON ss
   :long_name: Linked List Position Slideshow
   :links: AV/List/llistCON.css
   :scripts: AV/List/llist.js AV/List/llistOtherCON.js
   :output: show

Overhead
--------

.. revealjs-slide::

* Container classes store elements. Those take space.

* Container classes also store additional space to organize the
  elements.

  * This is called **overhead**

* The **overhead fraction** is: overhead/total space


Comparison of Implementations
-----------------------------

.. revealjs-slide::

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
----------------

.. revealjs-slide::

* "Break-even" point:

* :math:`DE = n(P + E)`

* :math:`n = \frac{DE}{P + E}`

* E: Space for data value.

* P: Space for pointer.

* D: Number of elements in array.


Space Example
-------------

.. revealjs-slide::

* Array-based list: Overhead is one pointer (8 bytes) per position in
  array – whether used or not.

* Linked list: Overhead is two pointers per link node
  one to the element, one to the next link

* Data is the same for both.

* When is the space the same?

  * When the array is half full


Freelist
--------

.. revealjs-slide::

.. odsalink:: AV/List/listFreeCON.css

* System new and garbage collection are slow.

  * Add freelist support to the Link class.

.. inlineav:: listFreeCON ss
   :long_name: Freelist Slideshow 1
   :links: AV/List/listFreeCON.css
   :scripts: AV/List/llist.js AV/List/listFreeCON.js
   :output: show


Doubly Linked Lists
-------------------

.. revealjs-slide::

.. inlineav:: dlistDiagramCON dgm
   :links: DataStructures/DoubleLinkList.css AV/List/dlistCON.css
   :scripts: DataStructures/DoubleLinkList.js AV/List/dlist.js AV/List/dlistDiagramCON.js
   :output: show


Doubly Linked Node (1)
----------------------

.. revealjs-slide::

.. codeinclude:: Lists/DLink
   :tag: DLink


Doubly Linked Insert
--------------------

.. revealjs-slide::

.. inlineav:: dlistInsertCON ss
   :long_name: Doubly Linked List Insert
   :links: DataStructures/DoubleLinkList.css AV/List/dlistCON.css
   :scripts: DataStructures/DoubleLinkList.js AV/List/dlist.js AV/List/dlistInsertCON.js
   :output: show   


Doubly Linked Remove
--------------------

.. revealjs-slide::

.. inlineav:: dlistRemoveCON ss
   :long_name: Doubly Linked List Remove
   :links: DataStructures/DoubleLinkList.css AV/List/dlistCON.css
   :scripts: DataStructures/DoubleLinkList.js AV/List/dlist.js AV/List/dlistRemoveCON.js
   :output: show


Container Class Design Issues
-----------------------------

.. revealjs-slide::

* Storing a record vs. Storing a reference to a record
* Homogeneity: Allow different record types? Check and block?
* Deletion: What happens to the record?

