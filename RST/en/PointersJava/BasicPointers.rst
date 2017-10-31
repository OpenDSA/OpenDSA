.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Nick Parlante, Cliff Shaffer, Sally Hamouda, Mostafa Mohammed, and Sushma Mandava
   :requires:
   :satisfies: Pointer intro
   :topic: Pointers

.. odsalink:: AV/Pointers/num42CON.css
.. odsalink:: AV/Pointers/employeeEmpRefCON.css
.. odsalink:: AV/Pointers/empRefnullCON.css
.. odsalink:: AV/Pointers/empRefsecondCON.css
.. odsalink:: AV/Pointers/shallowdeepCON.css
.. odsalink:: AV/Pointers/empPtrxxxCON.css
.. odsalink:: AV/Pointers/employeePtr2CON.css
.. odsalink:: AV/Pointers/examplePointerCodeCON.css
.. odsalink:: AV/Pointers/badPointerPowCON.css
.. odsalink:: AV/Pointers/memoryModelCON.css


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
   :align: center


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
   :align: center

Here is an example of the difference between shallow and deep copying:

.. codeinclude:: Pointers/shallowCopy
   :tag: shallow

.. inlineav:: ShallowCopyCON ss
    :long_name: Shallow Copy Slideshow
    :output: show

.. avembed:: Exercises/Pointers/PointerEX2PRO.html ka


Bad References
~~~~~~~~~~~~~~

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
(2) The pointee must be allocated, and (3) the reference must be
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


Syntax
~~~~~~

The above basic features of references, pointees, dereferencing, and
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
   :output: show


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
~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

How are references implemented?
The short explanation is that every area of memory in the machine has
a numeric address like 1000 or 20452.
You can think of memory as a big array, and each position in memory
has an index which is its memory address.
A reference to an area of memory is really just an integer which is
storing the address of that area of memory.

.. inlineav:: memoryModelCON dgm
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

.. odsascript:: AV/Pointers/num42CON.js
.. odsascript:: AV/Pointers/employeeEmpRefCON.js
.. odsascript:: AV/Pointers/empRefnullCON.js
.. odsascript:: AV/Pointers/empRefsecondCON.js
.. odsascript:: AV/Pointers/shallowdeepCON.js
.. odsascript:: AV/Pointers/empPtrxxxCON.js
.. odsascript:: AV/Pointers/employeePtr2CON.js
.. odsascript:: AV/Pointers/examplePointerCodeCON.js
.. odsascript:: AV/Pointers/badPointerPowCON.js
.. odsascript:: AV/Pointers/memoryModelCON.js
.. odsascript:: AV/Pointers/shallowCopyCON.js
