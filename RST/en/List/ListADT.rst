.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :requires: ADT
   :satisfies: list ADT
   :topic: Lists

.. odsalink:: AV/List/listADTCON.css

The List ADT
============

List Terminology and Notation
-----------------------------

We all have an intuitive understanding of what we mean by a "list".
We want to turn this intuitive understanding into a concrete data
structure with implementations for its operations.
The most important concept related to lists is that of
:term:`position`.
In other words, we perceive that there is a first element in the list,
a second element, and so on.
So, define a :term:`list` to be a finite, ordered
sequence of data items known as :term:`elements <element>`.
This is close to the mathematical concept of
a :term:`sequence`.

"Ordered" in this definition means that each element has a
position in the list.
So the term "ordered" in this context does **not** mean that the list
elements are sorted by value.
(Of course, we can always choose to sort the elements on the list if
we want, its just that keeping the elements sorted is not an inherent
property of being a list.)

Each list element must have some data type.
In the simple list implementations discussed in this chapter, all
elements of the list are usually assumed to have the same data type,
although there is no conceptual objection to lists whose elements have
differing data types if the application requires it.
The operations defined as part of the list :term:`ADT` do not
depend on the elemental :term:`data type`.
For example, the list ADT can be used for lists of integers, lists of
characters, lists of payroll records, even lists of lists.

A list is said to be :term:`empty` when it contains no elements.
The number of elements currently stored is called the
:term:`length` of the list.
The beginning of the list is called the :term:`head`,
the end of the list is called the :term:`tail`.

We need some notation to show the contents of a list,
so we will use the same angle bracket notation that is normally used
to represent :term:`sequences <sequence>`.
To be consistent with standard array indexing, the first position
on the list is denoted as 0.
Thus, if there are :math:`n` elements in the list, they are given
positions 0 through :math:`n-1` as
:math:`\langle\ a_0,\ a_1,\ ...,\ a_{n-1}\ \rangle`.
The subscript indicates an element's position within the list.
Using this notation, the empty list would appear as
:math:`\langle\ \rangle`. 


Defining the ADT
~~~~~~~~~~~~~~~~

What basic operations do we want our lists to support?
Our common intuition about lists tells us that a list should be able
to grow and shrink in size as we insert and remove elements.
We should be able to insert and remove elements from anywhere in
the list.
We should be able to gain access to any element's value,
either to read it or to change it.
We must be able to create and clear (or reinitialize)
lists.
It is also convenient to access the next or previous
element from the "current" one.

Now we can define the ADT for a list object in terms of a set
of operations on that object.
We will use an interface to formally define the list ADT.
``List`` defines the member functions that any list
implementation inheriting from it must support, along with their
parameters and return types.

True to the notion of an ADT, an interface
does not specify how operations are implemented.
Two complete implementations are presented later in later modules,
both of which use the same list ADT to define their operations.
But they are  considerably different in approaches and in their
space/time tradeoffs.

The code below presents our list ADT.
Any implementation for a :term:`container class` such as a list should
be able to support different data types for the elements.
One way to do this in Java is to store data values of type
``Object``.
Languages that support generics (Java) or templates (C++) give more
control over the element types.

The comments given with each member function describe what it is
intended to do.
However, an explanation of the basic design should help make this
clearer.
Given that we wish to support the concept of a sequence, with access
to any position in the list, the need for many of the member
functions such as ``insert`` and ``moveToPos`` is clear.
The key design decision embodied in this ADT is support for the
concept of a :term:`current position`.
For example, member ``moveToStart`` sets
the current position to be the first element on the list, while
methods ``next`` and ``prev`` move the current position
to the next and previous elements, respectively.
The intention is that any implementation for this ADT support the
concept of a current position.
The current position is where any action such as insertion or deletion
will take place.
An alternative design is to factor out position as a separate position
object, sometimes referred to as an :term:`iterator`.

.. codeinclude:: Lists/List
   :tag: ListADT

|

.. inlineav:: listADTposCON ss
   :output: show  

The ``List`` member functions allow you to build a list with elements
in any desired order, and to access any desired position in the list.
You might notice that the ``clear`` method is a "convenience" method,
since it could be implemented by means of the other
member functions in the same asymptotic time.

A list can be iterated through follows:

.. codeinclude:: Lists/ListTest
   :tag: listiter

In this example, each element of the list in turn is stored
in ``it``, and passed to the ``doSomething`` function.
The loop terminates when the current position reaches the end of the
list.

The list class declaration presented here is just one of
many possible interpretations for lists.
Our list interface provides most of the operations that one
naturally expects to perform on lists and serves to illustrate the
issues relevant to implementing the list data structure.
As an example of using the list ADT, here is a function to
return ``true`` if there is an occurrence of a given integer in the
list, and ``false`` otherwise.
The ``find`` method needs no knowledge about the specific list
implementation, just the list ADT.

.. codeinclude:: Lists/ListTest
   :tag: listfind

In languages that support it, this implementation for ``find`` could
be rewritten as a generic or template with respect to the element
type.
While making it more flexible, even generic types still
are limited in their ability to handle different data types stored on
the list.
In particular, for the ``find`` function generic types would only work
when the description for the object being searched for (``k`` in the
function) is of the same type as the objects themselves.
They also have to be comparable when using the ``==`` operator.
A more realistic situation is that we are searching for a record that
contains a :term:`key` field whose value matches ``k``.
Similar functions to find and return a :term:`composite type` based
on a key value can be created using the list implementation, but to do
so requires some agreement between the list ADT and the ``find``
function on the concept of a key, and on
:ref:`how keys may be compared <comparable> <Comparison>`.

There are two standard approaches to implementing lists, the
:ref:`array-based list <ListArray>`, and the
:ref:`linked list <linked list> <ListLinked>`.


ADT Practice Exercise
~~~~~~~~~~~~~~~~~~~~~

.. avembed:: Exercises/List/ListADTPROG.html ka
  
.. TODO::
   :tag: Exercise

   This exercise ought to get expanded to a much richer set of
   variations on the question.

.. odsascript:: AV/List/listADTposCON.js
