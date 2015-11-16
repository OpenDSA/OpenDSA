.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Nick Parlante, Cliff Shaffer, and Sally Hamouda
   :requires: Local memory
   :satisfies: Reference parameters
   :topic: Pointers

Reference Parameters
====================

Reference Parameters
--------------------

In the simplest :term:`pass by value` or :term:`value parameter`
scheme, each function has separate, local memory and parameters are
copied from the caller to the callee at the moment of the function
call.
But what about the other direction?
How can the callee communicate back to its caller?
Using a "return" at the end of the callee to copy a result back to the
caller works for simple cases, but does not work well for all
situations.
Also, sometimes copying values back and forth is undesirable.
:term:`Pass by reference` parameters solve all of these problems.
For the following discussion, the term "value of interest" will be a
value that the caller and callee wish to communicate between each
other.
A reference parameter passes a pointer to the value of interest
instead of a copy of the value of interest.
This technique uses the sharing property of pointers so that the
caller and callee can share the value of interest.

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

::

	void B(int worth) {
	  worth = worth + 1;
	  // T2
	}
	
	void A() {
	  int netWorth;
	  netWorth = 55;  // T1
	
	  B(netWorth); 
	  // T3 -- B() did not change netWorth
	}
	
	
	
.. odsafig:: Images/T1-T3.png
   :width: 600
   :align: center
   :capalign: justify
   :figwidth: 100%  
   
``B()`` adds 1 to its local ``worth`` copy, but when ``B()`` exits, ``worth`` is deallocated, so changing it was useless. The value of interest, 
`netWorth`, rests unchanged the whole time in A()'s local storage. A function can change its local copy of the value of interest,
but that change is not reflected back in the original value. This is
really just the old "independence" property of local storage, but in
this case it is not what is wanted.

By Reference
~~~~~~~~~~~~

The reference solution to the Bill Gates problem is to use a single
``netWorth`` variable for the value of interest and never copy
it. Instead, each function can receives a pointer to ``netWorth``.
Each function can see the current value of `netWorth` by dereferencing its pointer. More importantly, each function can change the net 
``worth``  |---| just dereference the pointer to the centralized  ``netWorth`` and change it directly. Everyone agrees what
the current value of ``netWorth``  because it exists in only one place |---| everyone has a pointer to the one master copy. The following memory drawing shows `A()` and `B()`
functions changed to use :term:`reference parameters`.
As before, T1, T2, and T3 correspond to points in the code (below),
but you can study the memory structure without looking at the code
yet.

.. odsafig:: Images/T1-T3-2nd.png
   :width: 600
   :align: center
   :capalign: justify
   :figwidth: 100%  

The reference parameter strategy: ``B()`` receives a pointer to the value of interest instead of
a copy.


Passing By Reference
--------------------

Here are the steps to use in the code to use the pass-by-reference strategy:

* Have a single copy of the value of interest.
  The single "master" copy. 
* Pass pointers to that value to any function which wants to see or
  change the value.
* Functions can dereference their pointer to see or change the value
  of interest.
* Functions must remember that they do not have their own local
  copies. If they dereference their pointer and change the value, they
  really are changing the master value. If a function wants a local
  copy to change safely, the function must explicitly allocate and
  initialize such a local copy.

Syntax
~~~~~~

The syntax for by reference parameters  in the C language just uses pointer operations on
the parameters:

#. Suppose a function wants to communicate about some value of
   interest |---| ``int`` or ``float`` or ``struct fraction``.

#. The function takes as its parameter a pointer to the value of
   interest |---| an ``int*``  or ``float*`` or ``struct fraction*``.
   Some programmers will add the word "ref" to the name of a reference
   parameter as a reminder that it is a reference to the value of
   interest instead of a copy.

#. At the time of the call, the caller computes a pointer to the value
   of interest and passes that pointer. The type of the pointer
   (pointer to the value of interest) will agree with the type in (2)
   above. If the value of interest is local to the caller, then this
   will often involve a use of the & operator (Section 1).
 
#. When the callee is running, if it wishes to access the value of
   interest, it must dereference its pointer to access the actual
   value of interest. Typically, this equates to use of the
   dereference operator (``*``) in the function to see the value of
   interest.

Bill Gates By Reference
~~~~~~~~~~~~~~~~~~~~~~~

Here is the Bill Gates example written to use reference
parameters. This code now matches the by-reference memory drawing
above. 

::

	// B() now uses a reference parameter -- a pointer to
	// the value of  interest. B() uses a dereference (*) on the
	// reference parameter to get at the value of interest.
	void B(int* worthRef) {
	// reference parameter
	*worthRef = *worthRef + 1; // use * to get at value of interest
	// T2
	}
	
	void A() {
	int netWorth;
	netWorth = 55; // T1 -- the value of interest is local to A()
	B(&netWorth);  // Pass a pointer to the value of interest.
	               // In this case using &.
	// T3 -- B() has used its pointer to change the value of interest
   }
   

Don't Make Copies
~~~~~~~~~~~~~~~~~

Reference parameters enable communication between the callee and its
caller.
Another reason to use reference parameters is to avoid making
copies.
For efficiency, making copies may be undesirable if the value of
interest is large, such as an array.
Making the copy requires extra space for the copy itself and extra
time to do the copying.
From a design point of view, making copies may be undesirable because
as soon as there are two copies, it is unclear which one is the
"correct" one if either is changed.
Proverb: "A person with one watch always knows what time it is.
A person with two watches is never sure."
Avoid making copies.


Simple Reference Parameter Example: Swap()
------------------------------------------

The standard example of reference parameters is a ``Swap()`` function
that exchanges the values of two ``ints``.
It's a simple function, but it does need to change the caller's memory
which is the key feature of pass by reference.

Swap() Function
~~~~~~~~~~~~~~~

The values of interest for ``Swap()`` are two ``ints``.
Therefore, ``Swap()`` does not take ``ints`` as its parameters.
It takes pointers to ``int`` |---| (``int*``)'s.
In the body of ``Swap()`` the parameters, ``a`` and ``b``, are
dereferenced with ``*`` to get at the actual (``int``) values of
interest.

::

	void Swap(int* a, int* b) {
	  int temp;
	  
	  temp = *a;
	  *a = *b;
	  *b = temp;
	}
	
Swap() Caller
~~~~~~~~~~~~~

To call Swap(), the caller must pass pointers to the values of interest.

::

	void SwapCaller() {
	  int x = 1;
	  int y = 2;
	
	  Swap(&x, &y); // Use & to pass pointers to the int values of interest
	                //  (x and y).
	}
	
	
.. odsafig:: Images/swapswapcaller.png
   :width: 400
   :align: center
   :capalign: justify
   :figwidth: 100%  

The parameters to ``Swap()`` are pointers to values of interest which are back in the caller's
locals. The ``Swap()`` code can dereference the pointers to get back to the caller's memory to
exchange the values. In this case, ``Swap()`` follows the pointers to exchange the values in
the variables x and y back in ``SwapCaller()``. ``Swap()`` will exchange any two ints given
pointers to those two ints.

Swap() With Arrays
~~~~~~~~~~~~~~~~~~

Just to demonstrate that the value of interest does not need to be a simple variable, here's
a call to ``Swap()`` to exchange the first and last ``int``s in an array. ``Swap()`` takes ``int*``'s, but
the ``ints`` can be anywhere. An ``int`` inside an array is still an ``int``.

::

	void SwapCaller2() {
	  int scores[10];
	  scores[0] = 1;
	  scores[9[ = 2;
	  Swap(&(scores[0]), &(scores[9]));// the ints of interest do not need to be
	         // simple variables -- they can be any int. The caller is responsible
	         // for computing a pointer to the int.
	         
The above call to ``Swap()`` can be written equivalently as
``Swap(scores, scores+9)`` due to the array syntax in C. You can

ignore this case if it is not familiar to you |---|
it's
not an important area of the language and both forms compile to the exact same thing anyway.	         

More Syntax
-----------

Is The & Always Necessary?
~~~~~~~~~~~~~~~~~~~~~~~~~~

When passing by reference, the caller does not always need to use & to compute a new
pointer to the value of interest. Sometimes the caller already has a pointer to the value of
interest, and so no new pointer computation is required. The pointer to the value of
interest can be passed through unchanged.

For example, suppose B() is changed so it calls a C() function which adds 2 to the value
of interest...

::

	// Takes the value of interest by reference and adds 2.
	void C(int* worthRef) {
	  *worthRef = *worthRef + 2;
	}
	
	// Adds 1 to the value of interest, and calls C().
	void B(int* worthRef) {
	  *worthRef = *worthRef + 1; // add 1 to value of interest as before
	
	  C(worthRef);    // NOTE no & required. We already have
	                  // a pointer to the value of interest, so
	                  // it can be passed through directly.
    }	



What About The & Bug TAB?
~~~~~~~~~~~~~~~~~~~~~~~~~

All this use of & might make you nervous |---| are we committing the & bug from Section
2? No, it turns out the above uses of & are fine. The & bug happens when an & passes a
pointer to local storage from the callee back to its caller. When the callee exits, its local
memory is deallocated and so the pointer no longer has a pointee. In the above, correct
cases, we use & to pass a pointer from the caller to the callee. The pointer remains valid
for the callee to use because the caller locals continue to exist while the callee is running.
The pointees will remain valid due to the simple constraint that the caller can only exit
sometime after its callee exits. Using & to pass a pointer to local storage from the caller
to the callee is fine. The reverse case, from the callee to the caller, is the & bug.

The ** Case
~~~~~~~~~~~

What if the value of interest to be shared and changed between the caller and callee is
already a pointer, such as an ``int*`` or a ``struct fraction*``? 
Does that change the rules for setting  up reference parameters? No. 
In that case, there is no change in the rules.
They operate just as before. The reference parameter is still a pointer to the value of
interest, even if the value of interest is itself a pointer. Suppose the value of interest is
``int*``. This means there is an ``int*`` value which the caller and callee want to share and change. Then the reference parameter should be an 
``int**``. For a ``struct fraction*``  value of interest, the reference parameter is ``struct fraction**``. 
A single dereference (``*``) operation on the reference parameter yields the value of interest as it did in the simple cases. Double pointer (``**``) parameters are common in linked list or
other pointer manipulating code were the value of interest to share and change is itself a pointer, such as a linked list head pointer.


Reference Parameter Summary
---------------------------

Passing by value (copying) does not allow the callee to communicate back to its caller
and has also has the usual disadvantages of making copies. Pass by reference uses
pointers to avoid copying the value of interest, and allow the callee to communicate back
to the caller.

For pass by reference, there is only one copy of the value of interest, and pointers to that
one copy are passed. So if the value of interest is an int, its reference parameter is an ``int*``.
If the value of interest is a `struct fraction*`, its reference parameters is a ``struct fraction**``.
Functions use the dereference operator (``*``) on the reference parameter to see or change the
value of interest.


Reference Parameters in Java
----------------------------

Because Java has no ``*``/``&`` operators, it is not possible to implement reference parameters
in Java directly. Maybe this is ok |---| in the OOP paradigm, you should change objects by
sending them messages which makes the reference parameter concept unnecessary. The caller passes the callee a (shallow) reference to the value of interest (object of interest?),
and the callee can send it a message to change it. Since all objects are intrinsically
shallow, any change is communicated back to the caller automatically since the object of
interest was never copied.


Reference Parameters in C++
---------------------------

Reference parameters are such a common programming task that they have been added as
an official feature to the C++ language. So programming reference parameters in C++ is
simpler than in C. All the programmer needs to do is syntactically indicate that they wish
for a particular parameter to be passed by reference, and the compiler takes care of it. The
syntax is to append a single ``&`` to right hand side of the parameter type. So an  ``int``
parameter passes an integer by value, but an `int&` parameter passes an integer value by
reference. The key is that the compiler takes care of it. In the source code, there's no
additional fiddling around with ``&``'s or ``*``'s. So ``Swap()`` and ``SwapCaller()`` written with C++
look simpler than in C, even though they accomplish the same thing..

::

	void Swap(int& a, int& b) {
	  // The & declares pass by reference
	  int temp;
	  temp = a;
	  // No *'s required -- the compiler takes care of it
	  a = b;
	  b = temp;
	}
	
	void SwapCaller() {
	  int x = 1;
	  int y = 2;
	  Swap(x, y);
	  // No &'s required -- the compiler takes care of it
	}
	
The types of the various variables and parameters operate simply as they are declared
(``int`` in this case). The complicating layer of pointers required to implement the
reference parameters is hidden. The compiler takes care of it without allowing the
complication to disturb the types in the source code.
