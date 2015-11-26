.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Nick Parlante, Cliff Shaffer, and Sally Hamouda
   :requires: Pointer intro
   :satisfies: Local memory
   :topic: Pointers

Local Memory
============

Thanks For The Memory: Allocation and Deallocation
--------------------------------------------------

:term:`Local variables <local variable>` are the programming structure
everyone uses but no one thinks about.
You think about them a little when first mastering the syntax.
But after a few weeks, the variables are so automatic that you soon
forget to think about how they work.
This situation is a credit to modern programming languages |---| most
of the time variables appear automatically when you need them, and
they disappear automatically when you are finished.
For basic programming, this is a fine situation.
However, for advanced programming, it's going to be useful to have an
idea of how variables work...

Variables represent storage space in the computer's memory.
Each variable presents a convenient names like length or sum in the
source code.
Behind the scenes at runtime, each variable uses an area of the
computer's memory to store its value.
It is not the case that every variable in a program has a permanently
assigned area of memory.
Instead, modern languages are smart about giving memory to a variable
only when necessary.
The terminology is that a variable is allocated when it is given an
area of memory to store its value.
While the variable is :term:`allocated`, it can operate as a variable
in the usual way to hold a value.
A variable is :term:`deallocated` when the system reclaims the memory
from the variable, so it no longer has an area to store its value.
For a variable, the period of time from its allocation until its
deallocation is called its :term:`lifetime`.

The most common memory related error is using a deallocated variable.
For local variables, modern languages automatically protect against
this error.
With pointers, as we will see however, the programmer must make sure
that allocation is handled correctly.


Local Memory
------------
The most common variables you use are :term:`local variables` within
functions such as the variables ``num`` and ``result`` in the
following function.
All of the local variables and parameters taken together are called
its :term:`local storage` or just its "locals", such as 
``num`` and ``result`` in the following code...

::

	// Local storage example
	int Square(int num) {
	  int result;
	  result = num * num;
	  return result;
	}
	
The variables are called "local" to capture the idea that their lifetime is tied to the
function where they are declared. Whenever the function runs, its local variables are
allocated. When the function exits, its locals are deallocated. For the above example, that
means that when the ``Square()`` function is called, local storage is allocated for
``num`` and ``result``. Statements like ``result = num * num``; in the function use the local
storage. When the function finally exits, its local storage is deallocated.

Here is a more detailed version of the rules of local storage:

#.  When a function is called, memory is allocated for all of its
    locals. In other words, when the flow of control hits the starting
    ``{`` for the function, all of its locals are allocated
    memory. Parameters such as num and local variables such as result
    in the above example both count as locals. The only difference
    between parameters and local variables is that parameters start
    out with a value copied from the caller while local variables
    start with random initial values. This article mostly uses simple
    ``int`` variables for its examples, however local allocation works
    for any type: structs, arrays... these can all be allocated
    locally.

#. The memory for the locals continues to be allocated so long as the
   thread of control is within the owning function. Locals continue to
   exist even if the function temporarily passes off the thread of
   control by calling another function. The locals exist undisturbed
   through all of this.

#. Finally, when the function finishes and exits, its locals are
   deallocated. This makes sense in a way |---| suppose the locals were
   somehow to continue to exist |---| how could the code even refer to
   them? The names like ``num`` and ``result``only make sense within
   the body of ``Square()`` anyway. Once the flow of control leaves
   that body, there is no way to refer to the locals even if they were
   allocated. That locals are available	("scoped") only within their
   owning function is known as :term:`lexical scoping` and pretty much
   all    languages do it that way now.
	

Examples
--------

Here is a simple example of the lifetime of local storage.

::

  void Foo(int a) {
	// (1) Locals (a, b, i, scores) allocated when Foo runs
	int i;
	float scores[100];
	// This array of 100 floats is allocated locally.
	a = a + 1;
	// (2) Local storage is used by the computation
	for (i=0; i<a; i++) {
	  Bar(i + a); // (3) Locals continue to exist undisturbed,
	}  // even during calls to other functions.
  } // (4) The locals are all deallocated when the function exits.
	
Here is a larger example which shows how the simple rule "the locals
are allocated when their function begins running and are deallocated
when it exits" can build more complex behavior.
You will need a firm grasp of how local allocation works to understand the
material in later modules.
The drawing shows the sequence of allocations and deallocations which
result when the function X() calls the function Y() twice.
The points in time T1, T2, etc. are marked in 
the code and the state of memory at that time is shown in the drawing.

::

  void X() {
    int a = 1;
    int b = 2;
    //T1
    
    Y(a);
    //T3
    Y(b);
    
   //T5
  }
  
  void Y(int p) {
    int q;
    q = p + 2;
    //T2 (first time through), T4 (second time through)
  }
  


.. odsafig:: Images/T1-T5.png
   :width: 600
   :align: center
   :capalign: justify
   :figwidth: 100%     	


(optional extra...) The drawing shows the sequence of the locals being allocated and
deallocated |---| in effect the drawing shows the operation over time of
the :term:` runtime stack` which is the data structure which the
system uses to implement local storage.


Local Parameters
----------------

Local variables are tightly associated with their function |---| they
are used there and nowhere else.
Only the ``X()`` code can refer to its ``a`` and ``b``.
Only the ``Y()`` code can refer to its ``p`` and ``q``.
This independence of local storage is the root cause of both its
advantages and disadvantages.

Disadvantages Of Locals
~~~~~~~~~~~~~~~~~~~~~~~

Locals are great for 90% of a program's memory needs:

* Convenient. Locals satisfy a convenient need |---| functions often need
  some temporary memory which exists only during the function's
  computation. Local variables conveniently provide this sort of
  temporary, independent memory.

* Efficient. Relative to other memory use techniques, locals are very
  efficient. Allocating and deallocating them is time efficient (fast)
  and they are space efficient in the way they use and recycle memory

* Local Copies. Local parameters are basically local copies of the
  information from the caller. This is also known as
  :term:`pass by value`.
  Parameters are local variables which are initialized with an
  assignment (``=``) operation from the caller. The caller is not
  "sharing" the parameter value with the callee in the pointer sense |---|
  the callee is getting its own copy. This has the advantage that the
  callee can change its local copy without affecting the caller. (Such
  as with the ``p`` parameter in the above example.) This independence
  is good since it keeps the operation of the caller and callee
  functions separate which follows the rules of good software
  engineering |---| keep separate components as independent as possible

Disadvantages Of Locals
~~~~~~~~~~~~~~~~~~~~~~~

There are two disadvantages of Locals:

#. Short Lifetime. Their allocation and deallocation schedule (their
   "lifetime") is very strict. Sometimes a program needs memory which
   continues to be allocated even after the function which originally
   allocated it has exited. Local variables will not work since they
   are deallocated automatically when their owning function
   exits. This problem will be solved in a later section with
   :term:`heap` memory.

#. Restricted Communication. Since locals are copies of the caller
   parameters, they do not provide a means of communication from the
   callee back to the caller. This is the downside of the
   "independence" advantage. Also, sometimes making copies of a value
   is undesirable for other reasons. We will see the solution to this
   problem below in the next module.

Synonyms For "Local"
~~~~~~~~~~~~~~~~~~~~

Local variables are also known as :term:`automatic variables` since
their allocation and deallocation is done automatically as part of the
function call mechanism.
Local variables are also sometimes known as :term`stack variables`
because, at a low level, languages almost always implement local
variables using a stack structure in memory.


The Ampersand (&) Bug |---| TAB
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Now that you understand the allocation schedule of locals, you can
appreciate one of the more ugly bugs possible in C and C++.
What is wrong with the following code where the 
function ``Victim()`` calls the function ``TAB()``?
To see the problem, it may be useful to make
a drawing to trace the local storage of the two functions.

::

	// TAB -- The Ampersand Bug function
	// Returns a pointer to an int
	int* TAB() {
	int temp;
	return(&temp);
	// return a pointer to the local int
	}
	void Victim() {
	int* ptr;
	ptr = TAB();
	*ptr = 42;
	// Runtime error! The pointee was local to TAB

``TAB()`` is actually fine while it is running. The problem happens to its caller after ``TAB()`` exits. ``TAB()`` returns a pointer to an
``int``, but where is that ``int``allocated? The problem is that the local ``int``, ``temp``, is allocated only while ``TAB()`` is running. When ``TAB()`` exits,
all of its locals are deallocated. So the caller is left with a pointer to a deallocated variable. ``TAB()``'s locals are deallocated when it exits, just as happened to the locals for
``Y()`` in the previous example. It is incorrect (and useless) for `TAB()` to return a pointer to memory which is about to be
deallocated. We are essentially running into the "lifetime" constraint of local variables.
We want the int to exist, but it gets deallocated automatically. Not all uses of & between
functions are incorrect |---| only when used to pass a pointer back to the caller. The correct
uses of `&` are discussed in section 3, and the way to pass a pointer back to the caller is
shown in section 4.	

Local Memory Summary
~~~~~~~~~~~~~~~~~~~~

Locals are very convenient for what they do |---| providing convenient and efficient
memory for a function which exists only so long as the function is executing. Locals have
two deficiencies which we will address in the following sections |---| how a function can
communicate back to its caller (Section 3), and how a function can allocate separate
memory with a less constrained lifetime (section 4).


How Does The Function Call Stack Work?
--------------------------------------

You do not need to know how local variables are implemented during a function call, but
here is a rough outline of the steps if you are curious. The exact details of the
implementation are language and compiler specific. However, the basic structure below is
approximates the method used by many different systems and languages...
To call a function such as ``foo(6, x+1)``:

1. Evaluate the actual parameter expressions, such as the x+1, in the
   caller's context.

2. Allocate memory for ``foo()``'s locals by pushing a suitable "local
   block" of memory onto a runtime :term:`call stack` dedicated to this
   purpose. For parameters but not local variables, store the values
   from step (1) into the appropriate slot in ``foo()``'s local
   block.

3. Store the caller's current address of execution (its "return
   address") and switch execution to ``foo()``.

4. ``foo()`` executes with its local block conveniently available at
   the end of the call stack. 

5. When ``foo()`` is finished, it exits by popping its locals off the
   stack and "returns" to the caller using the previously stored
   return address. Now the caller's locals are on the end of the stack
   and it can resume executing.

For the extremely curious, here are other miscellaneous notes on the
function call process:

* This is why infinite recursion results in a "Stack Overflow Error"
  |---| the code keeps calling and calling resulting in steps (1) (2)
  (3), (1) (2) (3), but never a step (4)....eventually the call stack
  runs out of memory.

* This is why local variables have random initial values |---| step (2)
  just pshes the whole local block in one operation. Each local gets
  its own area of memory, but the memory will contain whatever the
  most recent tenant left there. To clear all of the local block for
  each function call would be too time expensive.

* The "local block" is also known as the function's
  :term:`activation record` or :term:`stack frame`.
  The entire block can be pushed onto the
  stack (step 2), in a single CPU operation |---| it is a very fast
  operation.

* For a multithreaded environment, each thread gets its own call stack
  instead of just having single, global call stack.

* For performance reasons, some languages pass some parameters through
  registers and others through the stack, so the overall process is
  complex. However, the apparent the lifetime of the variables will
  always follow the "stack" model presented here.
