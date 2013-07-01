.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :prerequisites:
   :topic: Lists
.. odsalink:: AV/Development/dlist.css
.. odsalink:: AV/Development/listElementCON.css   

List Element Implementations [Storyboard]
=========================================

.. TODO::
   :type: Slideshow

   The following paragraph should be a slideshow, where each data
   structure variation mentioned has an associated image.

   List users must decide whether they wish to store a copy of any given
   element on each list that contains it.
   For small elements such as an integer, this makes sense.
   If the elements are payroll records, it might be desirable for
   the list node to store a pointer to the record rather than store a
   copy of the record itself.
   This change would allow multiple list nodes (or other data structures) 
   to point to the same record, rather than make repeated copies of the
   record.
   Not only might this save space, but it also means that a modification
   to an element's value is automatically reflected at all locations
   where it is referenced.
   The disadvantage of storing a pointer to each element is that the
   pointer requires space of its own.
   If elements are never duplicated, then this additional space
   adds unnecessary overhead.
   Java most naturally stores references to objects, meaning that only
   a single copy of an object such as a payroll record will be
   maintained, even if it is on multiple lists.

.. inlineav:: listElementDataCON ss
   :output: show

Whether it is more advantageous to use pointers to shared elements
or separate copies depends on the intended application.
In general, the larger the elements and the more they are duplicated,
the more likely that pointers to shared elements is the
better approach.

.. TODO::
   :type: Slideshow

   Illustrate the following paragraph with a slideshow or just a
   diagram showing homogeneous vs. non-homgeneous lists.

   A second issue faced by implementors of a list class (or any other
   data structure that stores a collection of user-defined data elements)
   is whether the elements stored are all required to be of the same type.
   This is known as :dfn:`homogeneity` in a data structure.
   In some applications, the user would like to define the class of the
   data element that is stored on a given list, and then never permit
   objects of a different class to be stored on that same list.
   In other applications, the user would like to permit the objects
   stored on a single list to be of differing types.

.. inlineav:: listElementTypeCON ss
   :output: show 
   
The simple list implementations presented in this chapter use elements
of type ``Object``.
Thus, the compiler will not enforce any restrictions regarding
homogeneity of the elements.
There are various techniques that implementors of a
list class can use to ensure that the element type for a given list
remains fixed.
The simplest (but least flexible) way is to define the element type
rather than use the ``Object`` type.
C++ templates and Java generics make it easy to require that a given
list stores homogeneous elements 
while still permitting different lists to store different element
types.
Another approach is to store an object of the appropriate type in the
header node of the list (perhaps an object of the appropriate type is
supplied as a parameter to the list constructor), and then check that
all insert operations on that list use the same element type.
This approach is useful in a language like JavaScript that does not
use strong typing but does allow a program to test the type of an
object.

.. TODO::
   :type: Slideshow

   Illustrate the following paragraph with some images

   The third issue that users of a list implementation must face is
   primarily of concern when programming in languages that do not support
   automatic garbage collection.
   That is how to deal with the memory of the objects stored on the list
   when the list is deleted or the ``clear`` method is called.
   In C++ for example, list destructor and the ``clear`` method are
   problematic in that there is a potential that they will be misused.
   Deleting ``listArray`` in the array-based implementation,
   or deleting a link node in the linked list implementation,
   might remove the only reference to an object, leaving its memory space
   inaccessible.
   Unfortunately, there is no way for the list implementation to know
   whether a given object is pointed to in another part of the program or
   not.
   Thus, the user of the list must be responsible for
   deleting these objects when that is appropriate.
   
.. inlineav:: listElementDeleteCON ss
   :output: show 
   
.. TODO::
   :type: Exercise

   Need a battery of summary questions.
   
.. odsascript:: AV/Development/dlist.js   
.. odsascript:: AV/Development/listElementCON.js