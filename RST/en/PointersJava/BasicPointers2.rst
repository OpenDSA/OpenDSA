.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Nick Parlante, Cliff Shaffer, Sally Hamouda, Mostafa Mohammed, and Sushma Mandava
   :requires:
   :satisfies:
   :topic: Pointers


Basic References Part 2
=======================

Sharing
-------

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
methods.
One method passes a reference to the object of interest to another
method.
Both methods can access the object of interest, but the object of
interest itself is not copied.
This communication is called :term:`shallow copy` since, instead of
making and sending a (large) copy of the object of interest, a (small)
reference is sent and the object of interest is shared.
The recipient needs to understand that they have a shallow copy,
so that they know not to change or delete it accidentally,
since it is shared.
The alternative |---| where a complete copy is made and sent |---| is
known as a :term:`deep copy`.
Deep copies are simpler in a way, since each method can change their
copy without interfering with the other copy.
But deep copies run slower because of all the copying.
And if the second method was **meant** to modify the copy for every
user of the object, then deep copy won't let this happen.
The drawing below shows shallow and deep copying between two methods,
``A()`` and ``B()``.
In the shallow case, the smiley face is shared by passing a reference
between the two.
In the deep case, the smiley face is copied, and each method gets
their own.

.. _shallowdeepFig:

.. inlineav:: shallowdeepCON dgm
   :links: AV/Pointers/shallowdeepCON.css
   :scripts: AV/Pointers/shallowdeepCON.js
   :align: center

|

.. inlineav:: shallowdeepExampleCON ss
   :long_name: Shallow Deep Copy Slideshow
   :links: AV/Pointers/shallowdeepExampleCON.css
   :scripts: AV/Pointers/shallowdeepExampleCON.js
   :output: show

.. avembed:: Exercises/Pointers/PointerEX2PRO.html ka


Shallow and Deep Comparing
--------------------------

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
then in most languages we do **not** simply compare the two reference
variables for equality.
Instead, we need to do a "deep comparison" where we are looking at the
characters in the strings themselves.
Most languages have methods to do this for you.
In Java, we can see if two strings are the same with the ``.equals()``
method of the ``String`` class, like this::

  if (ref1.equals(ref2))

In Java, another option for comparing the values of two string
objects is the ``.compareTo()`` method.
This will return -1 if the first is less than the second in
alphabetical order, 0 if they are the same, and 1 if the first is
greater than the second.
The following is equivalent to the use of ``.equals()`` shown above::

  if (ref1.compareTo(ref2) == 0)


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
In our memory drawings, the bad reference value is drawn as a diagonal
line between the corners of the reference variable's box.

.. _numptrxxxFig:

.. inlineav:: empRefnullCON dgm
   :links: AV/Pointers/empRefnullCON.css
   :scripts: AV/Pointers/empRefnullCON.js
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
visualization of how memory would react if this code were executed.

.. codeinclude:: Pointers/badPointers
   :tag: badPointers

|
         
.. inlineav:: badPointerPowCON ss
   :links: AV/Pointers/badPointerPowCON.css
   :scripts: AV/Pointers/badPointerPowCON.js
   :output: show

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
