.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :requires: list ADT
   :satisfies: list element implementation
   :topic: Lists
   :keyword: List Element Implementation


List Element Implementations
============================

List Element Implementations
----------------------------

When designing any :term:`container class`, there are a number of
design choices to be made regarding the data elements.

What to do if something can appear multiple times on a list?
One option is to use a reference to :term:`elements <element>`.
Another is to store separate copies.
In general, the larger the elements and the more that they are
duplicated, the more likely that pointers to shared elements is the
better approach.

.. inlineav:: listElementDataCON ss
   :long_name: List Element Data
   :links: AV/List/listElementCON.css
   :scripts: AV/List/listElementDataCON.js
   :output: show
   :keyword: List Element Implementation


Homogeneity
~~~~~~~~~~~

The next issue to consider is whether to enforce :term:`homogeneity`
in the list elements.
That is, should lists be restricted so that all data elements stored
are of the same object type?
Or should it be possible to store different types?

If you want to enforce homogeneity, the most rigid way is to simply
define the elements to be of a fixed type.
But that does not help if you want one list to store integers while
another stores strings.
A much more flexible approach is to use Java generics or C++
templates.
In this way, the compiler will enforce that a given list will only
store a single data type, while still allowing different lists to have
different data types.
Another approach is to store an object of the appropriate type in the
header node of the list (perhaps an object of the appropriate type is
supplied as a parameter to the list constructor), and then check that
all insert operations on that list use the same element type.
This approach is useful in a language like JavaScript that does not
use strong typing, but does allow a program to test the type of an
object.

In some applications, the designer would like to allow a given list
store elements with different types.
In Java, declaring the element to be of type ``Object`` will stop the
compiler from enforcing any type restrictions.
In C++, a similar effect can be achieved by using ``void*`` pointers.

.. inlineav:: listElementTypeCON ss
   :long_name: List Element Type
   :links: AV/List/listElementCON.css
   :scripts: AV/List/listElementTypeCON.js
   :output: show
   :keyword: List Element Implementation
   

Element Deletion
~~~~~~~~~~~~~~~~

Our last design issue is what to do to the list elements when the list
itself is deleted?
This is a serious concern in a language like C++ that does not support
automatic garbage collection.

.. inlineav:: listElementDeleteCON ss
   :long_name: List Element Delete
   :links: AV/List/listElementCON.css
   :scripts: AV/List/listElementDeleteCON.js
   :output: show 
   :keyword: List Element Implementation
   

Practice Questions
~~~~~~~~~~~~~~~~~~

.. avembed:: Exercises/List/ListSumm.html ka
   :long_name: List Summary Questions
   :keyword: List Element Implementation
