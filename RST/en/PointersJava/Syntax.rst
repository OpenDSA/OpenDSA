.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Nick Parlante, Cliff Shaffer, Sally Hamouda, Mostafa Mohammed, and Sushma Mandava
   :requires: Pointer intro
   :satisfies: Pointer Syntax
   :topic: Pointers


Pointers Syntax
===============

Syntax
------

The previously mentioned basic features of references, pointees, dereferencing, and
assigning are the only concepts you need to build reference code.
However, in order to talk about reference code, we need to use a known
syntax which is about as interesting as... a syntax.
We will use the Java language syntax which has the advantage that it
has influenced the syntaxes of several languages.


Declaring a Reference Variable
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A reference to a non-primitive data type (that is, a reference to any
object) is defined by declaring a variable of that object's type.
In other words, reference variables are declared just like any other
variable.
The declaration gives the type and identifier of the new variable, and
reserves memory to hold its value.
But |---| and here is the most important thing |---| declaring the
reference variable  does not assign a pointee for the reference.
The reference starts out with a "bad" value until you assign it to something.

.. codeinclude:: Pointers/PointerExample
   :tag: PointerVariables


Assigning a pointee to a reference
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. inlineav:: employeePtr2CON ss
   :links: AV/Pointers/employeePtr2CON.css
   :scripts: AV/Pointers/employeePtr2CON.js
   :output: show

Dereference the reference
~~~~~~~~~~~~~~~~~~~~~~~~~

Anytime a reference variable appears anywhere **other** than the left
side of an assignment statement, it is
dereferenced.
This is really no different than how a primitive variable like an
``int`` is used.
Consider the following code::

   int a = 5;
   int b = a;

In this case, the value of ``a`` in the second line is just 5.
In exactly the same way, in this code::

   Employee empPtr = johnRef;

the value of ``johnRef`` is simply the location of the object that it
is referencing.
This is why ``empPtr`` ends up pointing to that same object.
Of course, whenever you dereference any reference variable, it had
better have a pointee.
Otherwise, you get a runtime error of type ``NullPointerException``.


Example Reference Code
~~~~~~~~~~~~~~~~~~~~~~

.. inlineav:: examplePointerCodeCON ss
   :links: AV/Pointers/examplePointerCodeCON.css
   :scripts: AV/Pointers/examplePointerCodeCON.js
   :output: show


changeHeadPointer1
------------------

.. extrtoolembed:: 'changeHeadPointer1'



Reference Rules Summary
~~~~~~~~~~~~~~~~~~~~~~~

No matter how complex a reference structure gets, the list of rules
remains short.

* A reference variable stores a reference to its pointee.
  The pointee, in turn, stores something useful.

* The dereference operation on a reference accesses its pointee.
  A reference may only be dereferenced after it has been assigned to
  refer to a pointee.
  Most reference bugs involve violating this one rule.

* Allocating a reference does not automatically assign it to refer to
  a pointee.
  Assigning the reference to refer to a specific pointee is a separate
  operation.
  This is easy to forget.

* Assignment between two references makes them refer to the same
  pointee, which allows ``object sharing``.


Java References vs Pointers
---------------------------

Java references have two main features that distinguishes them from
the less restrictive pointers in a language like C or C++.

#. Fewer bugs.
   Because the language implements the reference manipulation
   accurately and automatically, the most common reference bug are no
   longer possible. Yay!
   Also, the Java runtime system checks each reference value every time
   it is used, so dereferencing a ``null`` reference is caught
   immediately on the line where it occurs.
   This is in contrast to a language like C++, where dereferencing a
   value of ``null`` might not make the program crash until later.
   This can make a programmer much more productive to know
   exactly where the problem occurred.

#. Slower. Because the language takes responsibility for implementing
   so much reference machinery at runtime, and does so much extra
   runtime checking, Java code runs slower than
   other languages like C and C++.
   But the appeal of increased programmer efficiency and fewer bugs
   makes the slowness worthwhile for many applications.


How Are References Implemented In The Machine?
----------------------------------------------

How are references implemented?
The short explanation is that every area of memory in the machine has
a numeric address like 1000 or 20452.
You can think of memory as a big array, and each position in memory
has an index which is its memory address.
A reference to an area of memory is really just an integer which is
storing the address of that area of memory.

.. inlineav:: memoryModelCON dgm
   :links: AV/Pointers/memoryModelCON.css
   :scripts: AV/Pointers/memoryModelCON.js
   :align: center

In the picture above, we assume that Java decides to place the new
Employee object starting at memory location 2000.
So the reference variable just stores a value of 2000.
If we looked closely at the computer's memory then we could see
exactly how the ``Employee`` object is layed out in the bytes in
memory (beginning at 2000).
But we don't show it in this picture because the internal details for
how the ``Employee`` object is implemented are more complicated than
we need to care about right now.
(But you should go ahead and look this up if you really want to know.
You will learn a lot.)

A dereference operation looks at the address of the reference
variable, and goes to that position in memory to retrieve the pointee
stored there.
An assignment of one reference variable to another just copies the
numeric memory location.
This is exactly like what happens when making an assignment between
two ``int`` variables:
The value is simply copied from one to the other.
The value of ``null`` is always a special value that Java will never
use as the location of any legal pointee.
A bad reference is really just a reference which contains a ``null``
value.
Java's runtime environment is constantly watching for a dereference of
a reference variable with a ``null`` value, so it can catch it right
away if that happens.

