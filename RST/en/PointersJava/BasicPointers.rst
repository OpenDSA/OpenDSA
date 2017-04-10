.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Nick Parlante, Cliff Shaffer, Sally Hamouda, and Mostafa Mohammed
   :requires:
   :satisfies: Pointer intro
   :topic: Pointers

.. odsalink:: AV/PointersSushma/num42CON.css
.. odsalink:: AV/PointersSushma/employeeEmpRefCON.css
.. odsalink:: AV/PointersSushma/empRefnullCON.css
.. odsalink:: AV/PointersSushma/empRefsecondCON.css
.. odsalink:: AV/PointersSushma/shallowdeepCON.css
.. odsalink:: AV/PointersSushma/empPtrxxxCON.css
.. odsalink:: AV/PointersSushma/employeePtr2CON.css
.. odsalink:: AV/PointersSushma/examplePointerCodeCON.css
.. odsalink:: AV/PointersSushma/badPointerPowCON.css

Basic References
================

What is a Pointer?
------------------

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
--------------------

Java actually uses only a restricted version of the pointer concept,
which is called a :term:`reference`.
While they mean roughly the same thing, the term "pointer" tends to be
used in discussions that are not specific to any particular language
or implementation.
The word "pointers" connotes the common C/C++ implementation of
pointers as :term:`addresses <address>` or locations in memory.
Programmers have more limited access with a reference,
and so more limits on what they can do.
Programmers cam only assign to a reference and compare two references
for equality.
Other uses of a reference is done implicitly with no control from the
programmer.
These restrictions reduce the chance for bugs.


Data Types in Java
------------------

Simple ``int`` and ``float`` variables operate pretty intuitively. An
``int`` variable is like a box which can store a single ``int`` value such
as 42. In a drawing, a simple variable is a box with its current value
shown inside.

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
leads to its pointee (an ``Employee`` object in the box named
``employee1``).
So ``empRef`` is the reference and ``employee1`` is its pointee.
What is stored inside of ``empRef``?
Its value is **not** an ``Employee`` object.
Its value is only a reference to an ``Employee`` object.
(By the way, there is no commonly used word for the concept of a
pointee |---| pointee is just the word used in these explanations.)

.. _numnumptrFig:

.. inlineav:: employeeEmpRefCON dgm

Going back to simple things like ``int`` and ``float`` variables that
just store a value in a box:
In Java, these are referred to as
:term:`primitive data types <primitive data type>`.
In Java, Objects and Arrays are non-primitive data types,
and they are always accessed by references.
Java automatically uses references behind the scenes for such complex
types, and no reference-specific syntax used.
You just need to realize that assignment operations like 
``a = b`` will automatically be implemented with references if ``a`` and
``b`` are arrays or objects.
Assignments and parameters with arrays and objects are intrinsically
shallow or shared |---| see the Deep vs. Shallow Copy material below.


Referencing and  Dereferencing
------------------------------

:term:`Dereferencing <dereference>` means to follow a reference to get
the value of its pointee.
The value of the dereference of ``empRef`` in the figure above is the
object ``employee1``.
So, "dereference" just means to access the value of the pointee.
The key restriction is that the reference must have a pointee for the
dereference to access.
A lot of bugs in reference code involve violating that one
restriction.
A reference must be assigned a pointee before dereference operations
will work.

The constant ``null`` is a special reference value that encodes the
idea of "points to nothing".
It turns out to be convenient to have a well-defined reference value
to represent the idea that a reference does not have a pointee.
It is a runtime error to dereference a ``null`` reference.
In drawings, the value ``null`` is often drawn as a diagonal
line between the corners of the reference variable's box.

.. _numptrnullFig:

.. inlineav:: empRefnullCON dgm


The ``Employee`` Class
----------------------

We are going to use the ``Employee`` object for a lot of our examples,
so let's introduce it now.

.. codeinclude:: PointersBook/BasicPointers/PointerExample
   :tag: EmployeeClass
   :lang: Java


Reference Assignments
---------------------

An assignment (``=``) of one reference to another makes them point to
the same pointee.
It's a simple rule for a potentially complex situation, so it is worth
repeating: assigning one reference to another makes them point to the
same thing.
The example below adds a second reference, ``second``, assigned with
the statement::

   second = empRef;

The result is that ``second`` points to the same pointee as
``empRef``.
In the drawing, this means that the ``second`` and ``empRef`` boxes
both contain arrows pointing to ``employee1``.
Assignment between references does not change or even touch the
pointees.
It just changes which pointee a reference refers to.

.. _numptrsecondlFig:

.. inlineav:: empRefsecondCON dgm

After the assignment, testing for ``(second == empRef)`` would return
true.

The assignment operation also works with the ``null`` value.
An assignment operation with a ``null`` reference copies the ``null``
value from one reference to another.

Memory drawings are the key to thinking about reference code.
When you are looking at code, think about how it will use
memory at run time, then make a quick drawing to work out your ideas.
This tutorial uses a lot of drawings to show how references work.
You should too.


Sharing
-------

Two references which both refer to a single pointee are said to be
"sharing".
That two or more entities can cooperatively share a single memory
structure is a key advantage of references.
References ``second`` and ``empRef`` in the above example both share the
same object, so either can modify the object's value.
Reference manipulation is just technique |---| sharing is often the
real goal.
Later we will see how sharing can be used to provide efficient
communication between parts of a program.


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

Here is an example of the difference between shallow and deep copying:

.. codeinclude:: PointersBook/BasicPointers/shallowCopy
   :tag: shallow

The next module will explain the above sharing technique in detail.


Bad References
--------------

When a reference is first allocated, it does not have a pointee.
The reference is :term:`uninitialized` or simply "bad".
A bad reference has a value ``null``.
A dereference operation on a bad reference is a serious runtime error.
The dereference operation will crash or halt immediately.
Each reference must be assigned a pointee before it can support
dereference operations.
Before that, the reference is bad and must not be used. In our memory
drawings, the bad reference value is shown with an XXX value.

.. _numptrxxxFig:

.. inlineav:: empPtrxxxCON dgm

Bad references are common.
In fact,  **every reference starts out with a bad value**.
Correct code overwrites the bad value with a correct reference to a
pointee, and thereafter the reference works fine.
There is nothing automatic that gives a reference a valid pointee.
You just have to program carefully.
Fortunately, in Java, the compiler will usually spot when a reference
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

One way to think about reference code is that operates at two levels
|---| reference level and pointee level.
The trick is that **both** levels need to be initialized and connected
for things to work.
(1) The reference must be allocated, 
(2) The pointee must be allocated, and (3) the reference must be
assigned to point to the pointee.
It's rare to forget step (1).
But forget (2) or (3), and the whole thing will blow up at the first
dereference.
For example, a popular mistake is declare a string variable, but then
never assign it an actual string before tyring to print or otherwise
use it.
Remember to account for both levels.
Making a memory drawing during your design can help to make sure that
it's right.


Syntax
------

The above basic features of references, pointees, dereferencing, and
assigning are the only concepts you need to build reference code.
However, in order to talk about reference code, we need to use a known
syntax which is about as interesting as... a syntax.
We will use the Java language syntax which has the advantage that it
has influenced the syntaxes of several languages.


Declaring a Reference Variable
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A reference variable to a non-primitive data type (that is, any object) is
defined by declaring a variable of that object's type.
In other words, reference variables are declared just like any other
variable.
The declaration gives the type and identifier of the new variable, and
reserves memory to hold its value.
But |---| and here is the most important thing |---| declaring the
reference variable  does not assign a pointee for the reference.
The reference starts out with a "bad" value until you assign it to something.

.. codeinclude:: PointersBook/BasicPointers/PointerExample
   :tag: PointerVariables
   :lang: Java


Assigning a pointee to a reference
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

We assign a pointee to a reference variable with a simple assignment
statement.
We could assign our reference variable to the same value as another
reference variable, as in this picture.

.. inlineav:: employeePtr2CON dgm

We can do this with the following code::

   Employee empPtr = johnRef;

Of course, this begs the question of how the variable ``johnRef`` got
its value in the first place.
We create an object with the ``new`` operator, as follows::

   Employee johnRef = new Employee("John");


Dereference the reference
~~~~~~~~~~~~~~~~~~~~~~~~~

Anytime a reference variable appears anywhere **other** than the left
side of an assignment statement, it is :term:`dereferenced`.
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
This is why empPtr ends up pointing to that same object.
Of course, whenever you dereference any reference variable, it had
better have a pointee.
Otherwise, you get a runtime error of type ``NullPointerException``.


Example Reference Code
----------------------

With the syntax defined, we can now write some reference code that
demonstrates all the reference rules.

.. codeinclude:: PointersBook/BasicPointers/PointerExample
   :tag: Example

.. inlineav:: examplePointerCodeCON ss
   :output: show


Bad reference Example
---------------------

Code with the most common sort of reference bug will **look** like the
above correct code, but without the middle step where the references
are assigned pointees.
The bad code will compile fine, but at run-time, each dereference with
a bad reference will raise ``NullPointerException`` and the program
will crash.
It is up to you to ensure that each reference is assigned a pointee
before it is used.
Here is a simple example of bad code, and a
drawing of how memory is likely to react.

.. codeinclude:: PointersBook/BasicPointers/badPointers
   :tag: badPointers

|

.. inlineav:: badPointerPowCON dgm


Reference Rules Summary
-----------------------

No matter how complex a reference structure gets, the list of rules remains short.

* A reference variable stores a reference to its pointee. The pointee, in turn,   stores something useful.

* The dereference operation on a reference accesses its pointee. A reference may only be dereferenced after it has been
  assigned to refer to a pointee. Most reference bugs involve violating this one rule.

* Allocating a reference does not automatically assign it to refer to a pointee. Assigning the reference to refer to a
  specific pointee is a separate operation which is easy to forget.

* Assignment between two references makes them refer to the same pointee which introduces ``object sharing``.


Java References Features
------------------------
The Java references have two main features.

* Fewer bugs. Because the language implements the reference manipulation accurately and automatically, the most common
  reference bug are no longer possible, Yay! Also, the Java runtime system checks each reference value every time it is
  used, so NULL reference dereferences are caught immediately on the line where they occur. This can make a programmer
  much more productive.

* Slower. Because the language takes responsibility for implementing so much reference machinery at runtime, Java code
  runs slower than other languages like C and C++. (There are other reasons for Java to run slowly as well. There is active
  research in making Java faster in interesting ways |---| the Sun "Hot Spot" project.) In any case, the appeal of increased
  programmer efficiency and fewer bugs makes the slowness worthwhile for some  applications.


How Are References Implemented In The Machine?
----------------------------------------------

How are references implemented?
The short explanation is that every area of memory in the machine has a numeric address like 1000 or 20452. A reference
to an area of memory is really just an integer which is storing the address of that area of memory. The dereference operation
looks at the address, and goes to that area of memory to retrieve the pointee stored there. Reference assignment just copies
the numeric address from one reference to another. The NULL value is generally just the numeric address 0 |---| the computer
just never allocates a pointee at 0 so that address can be used to represent NULL. A bad reference is really just a reference
which contains a NULL value. The reference has not yet been assigned the specific address of a valid pointee. This is why
dereference operations with bad references are so unpredictable.


Why Are Bad Reference Bugs So Common?
-------------------------------------

Why is it so often the case that programmers will allocate a reference, but forget to set it to refer to a pointee?
The rules for references do not seem that complex, yet every programmer makes this error repeatedly. Why?
The problem is that we are trained by the tools we use. Simple variables don't require any extra setup. You can allocate
a simple variable, such as ``int`` , and use it immediately. All that ``int``, ``char`` or ``boolean`` variables you
have written has trained you, quite reasonably, that a variable may be used once it is declared. Unfortunately, references
look like simple variables but they require the extra initialization before use. It's unfortunate, in a way, that references
happen look like other variables, since it makes it easy to forget that the rules for their use are very different.
Oh well. Try to remember to assign your references to refer to
pointees.
But don't be surprised when you forget, and your program breaks.

.. odsascript:: AV/PointersSushma/num42CON.js
.. odsascript:: AV/PointersSushma/employeeEmpRefCON.js
.. odsascript:: AV/PointersSushma/empRefnullCON.js
.. odsascript:: AV/PointersSushma/empRefsecondCON.js
.. odsascript:: AV/PointersSushma/shallowdeepCON.js
.. odsascript:: AV/PointersSushma/empPtrxxxCON.js
.. odsascript:: AV/PointersSushma/employeePtr2CON.js
.. odsascript:: AV/PointersSushma/examplePointerCodeCON.js
.. odsascript:: AV/PointersSushma/badPointerPowCON.js
