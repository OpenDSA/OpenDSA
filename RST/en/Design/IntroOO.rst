.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2014-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Dave Parillo
   :requires: ADT
   :satisfies: OO Intro
   :topic: Introduction

Introduction to Object Oriented Programming
===========================================

Introduction to Object Oriented Programming
-------------------------------------------

Object-oriented programming (OOP) is a programming paradigm based on the 
concept of :term:`objects <object>`, which are :term:`data structures
<data structure>` that contain data,
in the form of fields (or attributes) 
and code, in the form of procedures, (or methods). 
A distinguishing feature of objects is that an object's procedures 
provide access to and modify the its fields.

In object-oriented programming, computer programs are designed by making them 
out of objects that interact with one another. 
There is significant diversity in object-oriented programming, 
but most popular languages are class-based, meaning that objects are instances of classes, 
which typically also determines their type.

Object orientation is an outgrowth of procedural programming.
Procedural programming is a programming paradigm, derived from structured programming, 
based upon the concept of the procedure call. Procedures, also known as routines, subroutines, 
or methods define the computational steps to be carried out.

Any given procedure might be called at any point during a program's execution, 
including by other procedures or itself. 
Procedural programming is a list or set of instructions telling a 
computer what to do step by step and how to perform from the first 
code to the second code. 
Procedural programming languages include C, Fortran, Pascal, and BASIC.

The focus of procedural programming is to break down a programming task into 
a collection of variables, data structures, and subroutines, 
whereas in object-oriented programming it is to break down a programming task into 
:term:`objects <object>` that expose behavior (methods) and data (fields) using interfaces. 
The most important distinction is that while procedural programming uses procedures 
to operate on data structures, object-oriented programming bundles the two together, 
so an **object**, which is an **instance of a class**, operates on its "own" data structure.


Principles of Object Oriented Programming
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

There are many views on the main features and motivations for object
oriented programming [#]_ [#]_.
There are 4 principles that apply to most:

:Encapsulation:
    
    Encapsulation refers to the creation of self-contained modules (classes)
    that bind processing functions to its data members. 
    The data within each class is kept private.
    Each class defines rules for what is publicly visible and
    what modifications are allowed.

:Inheritance:
    
    Classes may be created in hierarchies, and inheritance lets the 
    structure and methods in one class pass down the :term:`class hierarchy`. 
    By *inheriting* code, complex behaviors emerge
    through the reuse of code in a parent class.
    If a step is added at the bottom of a hierarchy, 
    only the processing and data associated with that unique step must be added. 
    Everything else above that step may be inherited. 
    Reuse is considered a major advantage of object orientation.


:Polymorphism:
    
    Object oriented programming lets programmers create procedures for 
    objects whose exact type is not known until runtime. 
    For example, a screen cursor may change its shape from an arrow to a 
    line depending on the program mode. 
    The routine to move the cursor on screen in response to mouse movement can 
    be written for "cursor", and polymorphism lets that cursor take simulating 
    system behaviour. 
    It can be also described as many shapes of same object.

:Abstraction:
    
    An abstraction denotes the essential characteristics of an object that distinguish it from all
    other kinds of object and thus provide crisply defined conceptual
    boundaries, relative to the perspective of the viewer. [Booch]_

    Abstraction denotes a model, a view, or some other focused representation 
    for an actual item. Its the development of a software object to represent 
    an object we can find in the real world. 
    Encapsulation hides the details of that implementation.

.. [#] `Wikipedia OO fundamental concepts <https://en.wikipedia.org/wiki/Object-oriented_programming#Fundamental_features_and_concepts>`_
.. [#] `SOLID <http://en.wikipedia.org/wiki/SOLID_%28object-oriented_design%29>`_ Object oriented design


Encapsulation
~~~~~~~~~~~~~

Consider the following example:

.. codeinclude:: Introduction/BadEncapsulation

It's clearly a bad idea to allow people to set the shipping weight to a negative value.
How can you change this class to prevent problems like this from happening?
Your only choice is to make the *weight* private and write a method that allows
the class to set limits on weight.  But since you have already declared *weight*
to be **public**, as soon as you make this 'fix', you break every class that
currently uses it!

The ability to change your code without breaking every class that uses it is one
of the key benefits of encapsulation.
By limiting access and hiding the implementation details of your class to the maximum
extent possible, you make it possible to change, fix, extend, or rework your class
without requiring changes in any of the code that uses your class.

How do we ensure our code remains flexible and maintainable?

- Keep fields hidden using a *private* access modifier
- Make *public accessor methods* and force callers to use them
  by hiding your fields.

Compare our first example with the following:

.. codeinclude:: Introduction/Encapsulation

The alert among you might be thinking 
"Hey! How is this any better than the first example?"
We added a setter and getter, but added no new capability.  
What have we gained?

We have gained quite a bit.
Now we are free to change our minds about how weight values are set and retrieved.
Even though we aren't doing anything now, we are free to change the implementation
later and no calling class will know.

Good OO design demands thinking about the future.
Which brings us to our final example.
No classes would need to be modified to add the new capability below.

.. codeinclude:: Introduction/GoodEncapsulation

Inheritance
~~~~~~~~~~~

Consider the following example:

.. codeinclude:: Introduction/Inheritance

When run, produces the following output:

  'test1' does not equal 'test2'.
  'test1' is an Object.

Where did the *equals* method come from?
It was **inherited** from the class **Object**.
In Java (and some other languages as well), every class is a subclass of the class **Object**.
In Java, every class inherits methods for 
**equals**, **hashCode**, **toString**, and a few others.

Why?

The creators of the language assumed it would be very common to be able to determine
if two objects were equal or to produce a String representation of an object.
If these methods were not in the Object class, then every programmer would have to 
create their own solution for this problem. 
More importantly, every programmer might implement a different *interface* for basic
needs currently satisfied by 'equals' and 'toString', which would complicate
the implementation of these common functions between developers.


More generically, inheritance promotes code reuse.
An excellent example is the **InputStream** class.
The *InputStream* class is the base class (superclass) of 
all input streams in the Java IO API. 
*InputStream* subclasses include the *FileInputStream*, *BufferedInputStream* 
and the *PushbackInputStream* among others.

Java InputStream's are used for reading data, one byte at a time, for example:

.. codeinclude:: Introduction/InputStreamExample

Which creates a new FileInputStream instance. 
FileInputStream is a subclass of InputStream so it is safe to assign an instance of 
FileInputStream to an InputStream variable.

The *InputStream* class exposes common methods which all subclasses of *InputStream* inherit.

:void available(): 
    Returns an estimate of the number of bytes that can be 
    read (or skipped over) from this input stream without blocking by the next 
    invocation of a method for this input stream.
:int close(): 
    Closes this input stream and releases any system resources associated with the stream.
:mark(int readlimit): 
    Marks the current position in this input stream.
:boolean markSupported(): 
    Tests if this input stream supports the mark and reset methods.
:abstract int read(): 
    Reads the next byte of data from the input stream.
:int read(byte[] b): 
    Reads some number of bytes from the input stream and stores them into the buffer array b.
:int read(byte[] b, int off, int len): 
    Reads up to len bytes of data from the input stream into an array of bytes.
:void reset(): 
    Repositions this stream to the position at the time the mark method was last 
    called on this input stream.
:long skip(long n): 
    Skips over and discards n bytes of data from this input stream.

The *FileInputStream* class inherits all of the methods from *InputStream* and offers two more:

:FileChannel getChannel(): 
    Returns the unique FileChannel object associated with this file input stream.
:FileDescriptor getFD(): 
    Returns the FileDescriptor object that represents the connection to the 
    actual file in the file system being used by this FileInputStream.


In contrast, the *AudioInputStream* class offers two completely different methods:

:AudioFormat getFormat():
    Obtains the audio format of the sound data in this audio input stream.
:long getFrameLength():
    Obtains the length of the stream, expressed in sample frames rather than bytes.

The above examples illustrate that both the AudioInputStream and FileInputStream objects have an
**IS-A** relationship with InputStream.  That is, an AudioInputStream **IS-A** InputStream
and a FileInputStream **IS-A** InputStream.

The **IS-A** relationship in Java is expressed using the keywords *extends* for class inheritance
and *implements* for interface implementations.

This is different from extending classes through :term:`composition`.

Not only does inheritance promote code reuse, but it provides a means to use 
polymorphism in our code.


Polymorphism
~~~~~~~~~~~~

:term:`Polymorphism` is often referred to as the third pillar 
of object-oriented programming, after encapsulation and inheritance. 
Polymorphism is a Greek word that means "many-shaped" and polymorphism itself comes in
two distinct forms:

- :term:`Run-time polymorphism`

  Base classes may define and implement abstract, or virtual methods, 
  and derived classes can override them, which means they provide their own 
  definition and implementation. 
  At run-time, when client code calls the method, the type is resolved and invokes 
  that override of the virtual method. 
  Thus in your source code you can call a method on a base class, and cause a derived 
  class's version of the method to be executed.

  At run time, objects of a derived class may be treated as objects of a base class 
  in places such as method parameters and collections or arrays. 
  When this occurs, the object's declared type is no longer identical to its 
  run-time type.

  Note that a derived class may be treated as any type in its inheritance hierarchy.
  Also, it is perfectly valid for an overloaded method to be overridden.

- :term:`Compile-time polymorphism`

  Compile-time polymorphism is simply method overloading. 
  **Overloaded** methods have the same method name but 
  different number of arguments or different types of arguments or both.

Run-time Polymorphism
~~~~~~~~~~~~~~~~~~~~~

Consider our earlier discussion of the class *Object* when we discussed encapsulation.
What is the result of the following code from [Bloch]_ pg. 74?

.. codeinclude:: Introduction/Complex1

.. line-block::
   ``'a' and 'b' are not equal.``
   ``'a' is Complex@325e9e34``
   ``'b' is Complex@61e481c1``

In this case, the two objects are not considered equal because they are not the same object.
This is the default behavior for ``equals()``, and it is often sufficient.
In cases where you need to determine whether two objects are *logically equivalent*,
you override the ``equals()`` method.

There are many classes where it would be irritating to have ``equals()`` evaluate to false:

.. line-block::
   Object a = new Integer(2);
   Object b = new Integer(2);

Recall that ``==`` always compares object references and in the above example, will identify
the two Integer classes as different even though ``a.equals(b)`` evaluates to true.

Similarly, the output of ``toString()`` displays the location of the object on the heap,
which is not always the most intuitive string representation of your objects.

Compare the previous example with the following.
What output does this program produce?

.. codeinclude:: Introduction/Complex2

The class :term:`overrides <run-time polymorphism>` the definitions of ``equals()`` and ``toString()`` 
providing a more generally useful implementation than provided by the default
implementation in the *Object* class.

The output is:

.. line-block::
  ``'a' equals 'b'.``
  ``'a' = (1.0 + 0.0i)``
  ``'b' = (1.0 + 0.0i)``


Compile-time Polymorphism
~~~~~~~~~~~~~~~~~~~~~~~~~

In procedural languages without overloading, it was common to have many functions
with similar names to perform essentially the same task on different data types.
The absolute value function is a classic example.

In C, the ``abs()`` function returns the absolute value of an integer.
The only valid parameter you can pass is an ``int`` |---| any other type
will fail to compile.  How is this problem solved in C?
With different method names: ``labs()`` is used to return the absolute value
of a long and ``fabs()`` returns the absolute value of a float.
The burden is on the users of these functions |---| programmers 
to remember which function is needed. 
Additionally, there is no easy way to be flexible about the generic concept
of taking the absolute value of a number.  The burden is on the programmer
of the various ``*abs()`` functions to ensure the correct function is used
with the appropriate type.

Overloading is a powerful tool, but there are pitfalls.
Consider the following snippet.
What does the following program print?

.. codeinclude:: Introduction/DataStructureGroup

You might expect the program to print:

.. line-block::
   ``"List"``
   ``"Queue"``
   ``"Unknown group"``


It does not. Why?

Because ``group`` is overloaded and the **compiler** determines which
function to invoke.  For all three types the compile-time type
of the parameter passed to ``group`` is the same: ``Collection<?>``.
The type changes at run-time, but this has no effect on overloading.

Keep in mind that overriding methods is far more common in Java than
overloading, so consider your use of overloading carefully.


Abstraction
~~~~~~~~~~~

One of the key advantages of object oriented languages over :term:`procedural` languages is that
objects act as metaphors for the real-world |---| in other words, objects *model* the real world.
In a procedural language, tasks are executed in functions or procedures and the
data that the functions operate on is stored elsewhere. A better way to manage the complexity
of large programs is to keep the data in a program and the operations allowed on that data
in a cohesive logical unit.  
A program describing a car might perform basic tasks: steer, speed up, slow down, but also
needs to store information about the car: current speed, direction, cruise control setting, etc.

If you wrote your car driving program in a procedural language, you would likely require 
different functions to control each of the car behaviors.
You might create functions for ``turnCarOn()``, ``turnCarOff()``, ``accelerate()``, ``steer()``,
and others.  You would also need variables to store the current state of the car.
Although it's perfectly valid to construct such a car in a procedural language, these
functions and variables we have created only exist as a whole entity, a *car* in the mind of 
the programmer who created it.  
The idea that individual units within a program each have a specific role or responsibility
is called :term:`cohesion` and is difficult achieve in procedural programs.

For very large programs, which might contain hundreds or even thousands of entities,
lack of cohesion can introduce errors, make programs more difficult to understand and maintain,
and complicate the development of very large programs.
