.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Nick Parlante, Cliff Shaffer, Sally Hamouda and Mostafa Mohammed
   :requires: Local memory
   :satisfies: Reference parameters
   :topic: Pointers

Reference Parameters
====================

Reference Parameters
--------------------

In the simplest :term:`pass by value` or value parameter
scheme, each function has separate, local memory and parameters are
copied from the caller to the callee at the moment of the function
call.
But what about the other direction?
How can the callee communicate back to its caller?
Using a "return" at the end of the callee to copy a result back to the
caller works for simple cases, but does not work well for all
situations. In Java, all premitive data types like int, float, double, boolean , ...etc
are passed only by value.

:term:`Pass by reference` parameters solve all of these problems.
For the following discussion, the term "value of interest" will be a
value that the caller and callee wish to communicate between each
other.
A reference parameter passes a pointer to the value of interest
instead of a copy of the value of interest.
This technique uses the sharing property of pointers so that the
caller and callee can share the value of interest. In Java, any object or array are bassed
to other functions by reference. This means that the inner values of them can be modified
in the callee function. But, we cannot change the object or the array address itself. That
is way it is known that Java is always pass by value.

Bill Gates Example
~~~~~~~~~~~~~~~~~~

Suppose functions ``A()`` and ``B()`` both do computations involving Bill Gates' net worth
measured in billions of dollars |---| the value of interest for this problem. ``A()`` is the main
function and its stores the initial value (about 55 as of 1998). ``A()`` calls ``B()`` which tries to
add 1 to the value of interest.


Bill Gates By Value
~~~~~~~~~~~~~~~~~~~

Here is the code and memory drawing for a simple, but incorrect implementation where
``A()`` and ``B()`` use pass by value. Three points in time, T1, T2, and T3 are marked in the
code and the state of memory is shown for each state...


.. codeinclude:: PointersBook/BillGatesByValue

.. odsafig:: Images/T1-T3.png
   :width: 600
   :align: center
   :capalign: justify
   :figwidth: 100%

Because that the worth variable is of type int. It is passed by value and any modifications to
its value of interest in function B will not make any changes on the original value on netWorth.

``B()`` adds 1 to its local ``worth`` copy, but when ``B()`` exits, ``worth`` is deallocated, so changing it was useless. The value of interest,
`netWorth`, rests unchanged the whole time in A()'s local storage. A function can change its local copy of the value of interest,
but that change is not reflected back in the original value. This is
really just the old "independence" property of local storage, but in
this case it is not what is wanted.

By Reference
~~~~~~~~~~~~

As it was stated before, any premetive data type will be sent bt value.
So, the reference solution to the Bill Gates problem must use objects to be able to modify
its value in side the callee function. So, by using an object to hold the ``netWorth``, this
object will be sent to any function and this function can modify the value of ``netWorth``.
The idea is to use a single ``object`` to hold the value of interest and never copy
it. Instead, each function can receives a reference to that ``object``.
Each function can see the current value of ``netWorth`` by dereferencing its ``object``.
More importantly, each function can change the net ``worth``  |---| just dereference the pointer
to the centralized  ``object`` and change its inner values directly. Everyone agrees what
the current value of ``netWorth``  because it exists in only one ``object`` |---| everyone
has a reference to the one master copy.


Passing By Reference
--------------------

Again, Java always passes parameters by value. If the passed parameters are ``objects``
 or ``arrays`` the value of the parameter will be a copy of the address of that ``object``
 or ``array``. So, in this case the inner values of it can be modified directly in the
 callee function.
Here are the steps to use in the code to pass ``objects`` or ``arrays`` strategy:

* Have a single copy of the value of interest. The single "master" copy.
* Pass references to that value to any function which wants to see or
  change the value.
* Functions can dereference their reference to see or change the value
  of interest.
* Functions must remember that they do not have their own local
  copies. If they dereference their pointer and change the value, they
  really are changing the master value. If a function wants a local
  copy to change safely, the function must explicitly allocate and
  initialize such a local copy.
* Any changes to the reference value of the function's parameter will not affect the
  original value of that reference in the caller function. As it was mentioned before,
  Java sends all parameters by ``value``. Later in this section this topic will be explained
  by example.

Bill Gates By Reference
~~~~~~~~~~~~~~~~~~~~~~~

Here is the Bill Gates example written to use reference parameters.

.. codeinclude:: PointersBook/BillGatesBillions


Don't Make Copies
~~~~~~~~~~~~~~~~~

Java avoids making copies of ``objects`` and ``arrays`` by sending a copy of the
reference value instead of a copy of the ``object`` or ``array``. For efficiency,
making copies may be undesirable if the value of interest is large, such as an array.
Making the copy requires extra space for the copy itself and extra time to do the copying.
From a design point of view, making copies may be undesirable because as soon as there are
two copies, it is unclear which one is the "correct" one if either is changed.
Proverb: "A person with one watch always knows what time it is.
A person with two watches is never sure."



Simple Reference Parameter Example: Swap()
------------------------------------------

The standard example of reference parameters is a ``Swap()`` function
that exchanges the values of two ``ints`` inside an array.
It's a simple function, but it does need to change the caller's memory
which is the key feature of pass by reference.

Swap With Arrays
~~~~~~~~~~~~~~~~

If we want to exchange the first and last ``int``s in an array. ``Swap()`` takes ``int[]`` array,
two indices for the elements to be swaped.

.. codeinclude:: PointersBook/SwapWithArrays

This example will show that Java sendes the reference (by value) to the callee function and the callee
function was able to change the values of array elements.

Java is always pass-by-value
----------------------------
This section will explain this term in more details by examples.
As mentioned before, Java passes all parameters by value. There are two types of parameters.

* Value data types like int, float, double, boolean, ... etc. These parameteres
  are passed by copying the value of the parameteres.
* Reference data types like ``objects`` and ``arrays``. These parameters are passed by
  copying the reference of the parameteres.
The following example will demonstrate the idea of passing arrays and objects is done
by copying their reference. In the example, the callee function will change the reference
of the array by creating a new array. In this case, the caller function will access the original
array. The reseon is that the callee function changed the copy of the reference not
the original reference to the array.

.. codeinclude:: PointersBook/JavaPassByValue

Reference Parameter Summary
---------------------------

Passing by value (copying the value) does not allow the callee to communicate back to its caller
and has also has the usual disadvantages of making copies. Pass by reference (in Java, copying the reference of objects or arrays)
uses references to avoid copying the value of interest, and allow the callee to communicate back
to the caller.

For pass by reference, there is only one copy of the value of interest, and copyies of that references to that
one copy are passed. So if the value of interest is an array of int, a copy of its reference parameter will
be passed to any function instead of copying the array.
