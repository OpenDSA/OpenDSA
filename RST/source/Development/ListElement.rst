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

.. inlineav:: listElementDataCON ss
   :output: show

Whether it is more advantageous to use pointers to shared elements
or separate copies depends on the intended application.
In general, the larger the elements and the more they are duplicated,
the more likely that pointers to shared elements is the
better approach.

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

.. inlineav:: listElementDeleteCON ss
   :output: show 
   
.. TODO::
   :type: Exercise

   Need a battery of summary questions.
   
.. odsascript:: AV/Development/dlist.js   
.. odsascript:: AV/Development/listElementCON.js
