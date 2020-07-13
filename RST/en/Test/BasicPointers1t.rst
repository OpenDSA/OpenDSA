.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Nick Parlante, Cliff Shaffer, Sally Hamouda, Mostafa Mohammed, and Sushma Mandava
   :requires:
   :satisfies: Pointer intro
   :topic: Pointers


Basic References Part 1
=======================

Pointers and References
-----------------------

What is a Pointer?
~~~~~~~~~~~~~~~~~~

There's a lot of nice, tidy code you can write without knowing about
:term:`pointers <pointer>`.
But once you learn to use the power of pointers, you can never go
back.
There are too many things that can only be done with pointers.
But with increased power comes increased responsibility.
Pointers allow new and more ugly types of bugs, and pointer bugs can
crash in random ways which makes them more difficult to debug.
Nonetheless, even with their problems, pointers are an irresistibly
powerful programming construct.

Pointers solve two common software problems.
First, pointers allow different sections of code to share information
easily.
You can get the same effect by copying information back and forth, but
pointers solve the problem better.
Second, pointers enable complex linked data structures like
:term:`linked lists <linked list>` and
:term:`binary trees <binary tree>`.


What is a Reference?
~~~~~~~~~~~~~~~~~~~~

Java actually uses a restricted version of the pointer concept,
which is called a :term:`reference`.
While they mean roughly the same thing, the term "pointer" tends to be
used in discussions that are not specific to any particular language
or implementation.
The word "pointers" connotes the common C/C++ implementation of
pointers as :term:`addresses <address>` or locations in memory.
A reference only "points to" an object.
This means that programmers are given more limited access with a reference.
While this limits what they can do, the Java philosophy is that this is
more than made up for by a greater chance of the code working correctly.
Java programmers may only assign to a reference and
compare two references for equality.
Other uses of a reference are done implicitly with no control from the
programmer.
These restrictions reduce the chance for bugs.


Data Types in Java
------------------

.. inlineav:: primativeVsRefCON ss
   :links: AV/Pointers/primativeVsRefCON.css
   :scripts: AV/Pointers/primativeVsRefCON.js
   :output: show

(By the way, there is no commonly used word for the concept of a
pointee |---| pointee is just the word that we used in these
explanations.)

Going back to simple things like ``int`` and ``float`` variables that
just store a value in a box:
In Java, these are referred to as
:term:`primitive data types <primitive data type>`.
In Java, Objects and Arrays are non-primitive data types,
and they are always accessed by references.
Java automatically uses references behind the scenes for such complex
types, and there is no reference-specific syntax (like there is in C/C++).
You just need to realize that assignment operations like
``a = b`` will automatically be implemented with references if ``a`` and
``b`` are arrays or objects,
**which is different from the behavior that you get if** ``a`` **and**
``b`` **are primitive objects like int**.
Assignments and parameters with arrays and objects are intrinsically
shallow or shared |---|, which is discussed in the Shallow vs. Deep
Copying section below.


Referencing and Dereferencing
-----------------------------

:term:`Dereferencing <dereference>` means to follow a reference to get
the value of its pointee.
Dereferencing ``empRef`` in the figure above gives back its pointee, the
``Employee`` object.
So, "dereference" just means to access the value of the pointee.
Visually, the result of a dereference is the object pointed to by the
arrow.
In Java, this most often is done with the "dot" operator to access a
field or method of an object.
For example::

   String myName = empRef.name()

This will dereference ``empRef`` to call the ``name`` method for that
object.

The key restriction is that the reference must have a pointee to access.
A lot of bugs in reference code involve violating that one
restriction, which results in the ever-popular ``NullPointerException``.
A reference must be assigned a pointee before dereference operations
will work.

The constant ``null`` is a special reference value that encodes the
idea of "points to nothing".
It turns out to be convenient to have a well-defined reference value
to represent the idea that a reference does not have a pointee.
It is a runtime error to try to get the pointee of a ``null``
reference.
In drawings, the value ``null`` is often drawn as a diagonal
line between the corners of the reference variable's box.

.. _numptrnullFig:

.. inlineav:: empRefnullCON dgm
   :links: AV/Pointers/empRefnullCON.css
   :scripts: AV/Pointers/empRefnullCON.js
   :align: center


changePointeeDataDirect
-----------------------

.. extrtoolembed:: 'changePointeeDataDirect'



The Employee Class
------------------

.. showhidecontent:: Employee
                     
   We are going to use the ``Employee`` object for a lot of our examples,
   so let's make a formal introduction now.
   Meet the ``Employee`` class.

   .. codeinclude:: Pointers/PointerExample
      :tag: EmployeeClass


Reference Assignments
---------------------

An assignment (``=``) of one reference to another makes them point to
the same pointee.
It's a simple rule for a potentially complex situation, so it is worth
repeating: assigning one reference to another makes them point to the
same thing.
The example below adds a second reference, named ``second``, assigned
with the statement::

   second = empRef;

The result is that ``second`` points to the same pointee as
``empRef``.
In the drawing, this means that the ``second`` and ``empRef`` boxes
both contain arrows pointing to the ``Employee`` object.
Assignment between references does not change or even touch the
pointees.
It just changes which pointee a reference refers to.

.. _numptrsecondlFig:

.. inlineav:: empRefsecondCON dgm
   :links: AV/Pointers/empRefsecondCON.css
   :scripts: AV/Pointers/empRefsecondCON.js
   :align: center

After the assignment, testing for ``(second == empRef)`` would return
true.

The assignment operation also works with the ``null`` value.
An assignment operation with a ``null`` reference copies the ``null``
value from one reference to another.

Memory drawings are key to thinking about reference code.
When you are looking at code, think about how it will use memory at
run time, then make a quick drawing to work out your ideas.
This tutorial uses a lot of drawings to show how references work.
You should too.


circularList1
-------------

.. extrtoolembed:: 'circularList1'

