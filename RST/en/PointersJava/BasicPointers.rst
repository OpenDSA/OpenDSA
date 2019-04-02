.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Nick Parlante, Cliff Shaffer, Sally Hamouda, Mostafa Mohammed, and Sushma Mandava
   :requires:
   :satisfies: Pointer intro
   :topic: Pointers


Basic References
================

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
Programmers have more limited access with a reference.
This limits what they can do, but the Java philosophy is that this is
more than made up for by a greater chance of the code working correctly.
Essentially, Java programmers may only assign to a reference and
compare two references for equality.
Other uses of a reference are done implicitly with no control from the
programmer.
These restrictions reduce the chance for bugs.


Data Types in Java
~~~~~~~~~~~~~~~~~~

Simple ``int`` and ``float`` variables operate pretty intuitively.
An ``int`` variable is like a box that can store a single ``int``
value such as 42.
Visually, a simple variable can be viewed as a box with its current
value shown inside.

.. _num42Fig:

.. inlineav:: num42CON dgm
   :links: AV/Pointers/num42CON.css
   :scripts: AV/Pointers/num42CON.js
   :align: center

A reference variable works a little differently.
It does not store a simple value directly.
Instead, a reference variable stores a :term:`reference` to some
:term:`object`.
The object that the reference refers to is sometimes known as its
:term:`pointee`.
In the next figure, the reference variable (called ``empRef``) is
shown as a box that contains the beginning of a directed line, which
leads to its pointee (an ``Employee`` object, shown as the box storing
two fields: the string value "John" and the integer value "1000").
So ``empRef`` is the reference and the ``Employee`` object is its
pointee.
What is stored inside of ``empRef``?
Its value is **not** an ``Employee`` object.
Its value is only a reference to an ``Employee`` object.
(By the way, there is no commonly used word for the concept of a
pointee |---| pointee is just the word that we used in these
explanations.)

.. inlineav:: employeeEmpRefCON dgm
   :links: AV/Pointers/employeeEmpRefCON.css
   :scripts: AV/Pointers/employeeEmpRefCON.js
   :align: center

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
In drawings, the value ``null`` is often drawn as X's or as a diagonal
line between the corners of the reference variable's box.

.. _numptrnullFig:

.. inlineav:: empRefnullCON dgm
   :links: AV/Pointers/empRefnullCON.css
   :scripts: AV/Pointers/empRefnullCON.js
   :align: center


changePointeeDataDirect
-----------------------

.. extrtoolembed:: 'changePointeeDataDirect'
   :learning_tool: code-workout-jhavepop


The Employee Class
~~~~~~~~~~~~~~~~~~

We are going to use the ``Employee`` object for a lot of our examples,
so let's make a formal introduction now.
Meet the ``Employee`` class.

.. codeinclude:: Pointers/PointerExample
   :tag: EmployeeClass


Reference Assignments
~~~~~~~~~~~~~~~~~~~~~

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
   :learning_tool: code-workout-jhavepop


Sharing
~~~~~~~

Two references which both refer to a single pointee are said to be
"sharing".
Sometimes we say that each is an :term:`alias` for the other, because
we can refer to the referenced object through either name.
That two or more references can cooperatively share a single memory
structure is a key advantage of references.
References ``second`` and ``empRef`` in the above example both share
the same object, so either can modify the object's value.
Reference manipulation is just technique |---| sharing is often the
real goal.
Later we will see how sharing can be used to provide efficient
communication between parts of a program.

.. avembed:: Exercises/Pointers/PointerEX1PRO.html ka


Shallow and Deep Copying
------------------------

What does it mean to copy?
~~~~~~~~~~~~~~~~~~~~~~~~~~

An important use of sharing is to enable communication between two
functions.
One function passes a reference to the object of interest to another
function.
Both functions can access the object of interest, but the object of
interest itself is not copied.
This communication is called :term:`shallow copy` since, instead of
making and sending a (large) copy of the object of interest, a (small)
reference is sent and the object of interest is shared.
The recipient needs to understand that they have a shallow copy,
so that they know not to change or delete it accidentally,
since it is shared.
The alternative |---| where a complete copy is made and sent |---| is
known as a :term:`deep copy`.
Deep copies are simpler in a way, since each function can change their
copy without interfering with the other copy.
But deep copies run slower because of all the copying.
And if the second function was **meant** to modify the copy for every
user of the object, then deep copy won't let this happen.
The drawing below shows shallow and deep copying between two functions,
``A()`` and ``B()``.
In the shallow case, the smiley face is shared by passing a reference
between the two.
In the deep case, the smiley face is copied, and each function gets
their own.

.. _shallowdeepFig:

.. inlineav:: shallowdeepCON dgm
   :links: AV/Pointers/shallowdeepCON.css
   :scripts: AV/Pointers/shallowdeepCON.js
   :align: center

Here is an example of the difference between shallow and deep copying:

.. codeinclude:: Pointers/shallowCopy
   :tag: shallow

.. inlineav:: shallowdeepExampleCON ss
   :long_name: Shallow Deep Copy Slideshow
   :links: AV/Pointers/shallowdeepExampleCON.css
   :scripts: AV/Pointers/shallowdeepExampleCON.js
   :output: show

.. avembed:: Exercises/Pointers/PointerEX2PRO.html ka


Shallow and Deep Comparing
~~~~~~~~~~~~~~~~~~~~~~~~~~

Related to copying correctly (shallow means to copy the reference
itself, deep means to copy the object being referenced), there are
different levels that we might use to compare things when objects are
involved.
One possibility is that we just want to know if two reference
variables are referencing the same object.
We could do this with code like the following to see if ``ref1`` and
``ref2`` are referring to the same object::

  if (ref1 == ref2)

So here, we are comparing the value of the arrows, that both are
pointing to the same box.
While sometimes this is worth doing, it actually is not all that
common.
Any use of ``==`` with reference variables should be treated with
extra suspicion.

Quite often, we want to know if the **values** of the two objects are
the same.
This is especially common when the objects are strings.
We might want to know if two strings are the same, meaning they have
the same characters in the same order, **not** whether two
string reference variables are referencing the same string object.
If we want to know whether the contents of two strings are the same,
then in most languages we do **not** simple compare the two reference
variables for equality.
Instead, we need to do a "deep comparison" where we are looking at the
characters in the strings themselves.
Most languages have functions to do this for you.
In Java, we can see if two strings are the same with the ``.equals()``
method of the ``String`` class, like this::

  if (ref1.equals(ref2))

In Java, another option for comparing the values of two string
objects is the ``.compareTo()`` method.
This will return -1 if the first is less than the second in
alphabetical order, 0 if they are the same, and 1 if the first is
greater than the second.
It is used like this::

  if (ref1.compareTo(ref2))


Bad References
--------------

When a reference is first allocated, it does not have a pointee.
The reference is :term:`uninitialized` or simply "bad".
In Java, references are actually initialized to the value ``null``,
while in some other languages they are literally of unknown value.
Either way, dereferencing a bad or null reference value is a serious
runtime error.
The dereference operation will crash or halt immediately.
Each reference must be assigned a pointee before it can support
dereference operations.
Before that, the reference is bad and must not be used.
In our memory drawings, the bad reference value is shown with an XXX
value.

.. _numptrxxxFig:

.. inlineav:: empPtrxxxCON dgm
   :links: AV/Pointers/empPtrxxxCON.css
   :scripts: AV/Pointers/empPtrxxxCON.js
   :align: center

Bad references are common.
In fact,  **every reference starts out with a bad value**.
Correct code overwrites the bad value with a correct reference to a
pointee, and thereafter the reference works fine.
There is nothing automatic that gives a reference a valid pointee.
You just have to program carefully.
Fortunately, the Java compiler will usually spot when a reference
variable has not been initialized, and generate an error (meaning
that you cannot even complete compiling and run the program).

On the other hand, that does not stop you from assigning the variable
to something that will lead to a serious problem later.
If your code is crashing, a bad reference should be your first
suspicion.
In Java, the run-time system checks each time that a reference
variable is dereferenced to see if it is ``null``.
So code can still exhibit reference bugs, but the kind that
dereferences a ``null`` value will at least halt politely on the
offending line.
A runtime error called ``NullPointerException`` will occur and
the program will stop.
As a result, it is much easier to locate and fix reference bugs in
Java.
Such run-time checks are also a reason why Java tends to run at least
a little slower than a language like C or C++.

One way to think about reference code is that it operates at two
levels |---| reference level and pointee level.
The trick is that **both** levels need to be initialized and connected
for things to work.
(1) The reference must be allocated,
(2) the pointee must be allocated, and (3) the reference must be
assigned to point to the pointee.
It's rare to forget step (1).
But forget (2) or (3), and the whole thing will blow up at the first
dereference.
For example, a popular mistake is to declare a string variable,
but then never assign it an actual string before tyring to print or
otherwise use it.
Remember to account for both levels.
Making a memory drawing during your design can help to make sure that
it's right.

Code with the most common sort of reference bug will **look** correct,
but without the middle step where the references
are assigned pointees.
The bad code will compile fine, but at run-time, each dereference with
a bad reference will raise ``NullPointerException`` and the program
will crash.
It is up to you to ensure that each reference is assigned a pointee
before it is used.
Here is a simple example of bad code, and a
drawing of how memory would react if this code were executed.

.. codeinclude:: Pointers/badPointers
   :tag: badPointers

.. inlineav:: badPointerPowCON dgm
   :links: AV/Pointers/badPointerPowCON.css
   :scripts: AV/Pointers/badPointerPowCON.js
   :align: center

Why Are Bad Reference Bugs So Common?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In the ``badPointer`` example above,
the compiler would actually catch the mistake above before it is
allowed to even run, because the unitialized reference is being
dereferenced.
But the exact same result would happen if your program had for some
reason set the value of ``badPointer`` to ``null``.
The compiler cannot catch that for you.

There must be a reason why Java cares so much about dereferencing
``null`` pointers, that its always watching out for it. Why?
Because it happens in a lot of programs.

Why is it so often the case that programmers will allocate a
reference, but forget to set it to refer to a pointee?
Or, why will a programmer set the value of a reference to be ``null``,
and then dereference it?
The rules for references do not seem that complex, yet every
programmer makes this error repeatedly. Why?
One explanation is that we are trained by the tools that we use.
Simple variables don't require any extra setup.
You can allocate a simple variable, such as ``int``, and use it
immediately.
You can change it to whatever you want, and the value won't typically
make the program crash.
Try to remember not to dereference a ``null`` pointer value.
But don't be surprised when it happens, and your program breaks.
