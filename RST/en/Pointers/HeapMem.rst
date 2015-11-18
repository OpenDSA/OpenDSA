.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Nick Parlante, Cliff Shaffer, and Sally Hamouda
   :requires: Local memory
   :satisfies: Heap Memory
   :topic: Pointers

Heap Memory
===========

Heap Memory
-----------

"Heap" memory, also known as "dynamic" memory, is an alternative to
local stack memory.
Local memory (Section 2) is quite automatic |---| it is allocated
automatically on function call and it is deallocated automatically
when a function exits.
Heap memory is different in every way.
The programmer explicitly requests the allocation of a memory
"block" of a particular size, and the block continues to be allocated
until the programmer explicitly requests that it be deallocated.
Nothing happens automatically.
So the programmer has much greater control of memory, but with greater
responsibility since the memory must now be actively managed.
The advantages of heap memory are: 

* **Lifetime**. Because the programmer now controls exactly when memory
  is allocated and deallocated, it is possible to build a data
  structure in memory, and return that data structure to the
  caller. This was never possible with local memory which was
  automatically deallocated when the function exited.

* **Size**. The size of allocated memory can be controlled with more
  detail. For example, a string buffer can be allocated at run-time
  which is exactly the right size to hold a particular string. With
  local memory, the code is more likely to declare a buffer size 1000
  and hope for the best. (See the StringCopy() example below.)

The disadvantages of heap memory are:

* **More Work**. Heap allocation needs to arranged explicitly in the
  code which is just more work.

* **More Bugs**. Because it's now done explicitly in the code,
  realistically on occasion the allocation will be done incorrectly
  leading to memory bugs. Local memory is constrained, but at least
  it's never *wrong*.

Nonetheless, there are many problems that can only be solved with heap
memory, so that's that way it has to be.
In languages with garbage collectors such as Perl, LISP, or Java,
the above disadvantages are mostly eliminated.
The garbage collector takes over most of the responsibility for heap
management at the cost of a little extra time taken at run-time.


What Does The Heap Look Like?
-----------------------------

Before seeing the exact details, let's look at a rough example of
allocation and deallocation in the heap.

Allocation
~~~~~~~~~~

The heap is a large area of memory available for use by the program. 
The program can request areas, or "blocks", of memory for its use
within the heap.
In order to allocate a block of some size, the program makes an explicit request by calling the heap :term:`allocation` function. 
The allocation function reserves a block of memory of the requested size in the heap and returns a pointer to it. Suppose a program makes three allocation requests to allocate memory to hold three separate GIF images in the heap each of which takes 1024 bytes of memory. After the three allocation requests, memory might look like.

.. odsafig:: Images/LocalHeapaloc.png
   :width: 400
   :align: center
   :capalign: justify
   :figwidth: 100% 
   
Each allocation request reserves a contiguous area of the requested size in the heap and
returns a pointer to that new block to the program. Since each block is always referred to
by a pointer, the block always plays the role of a "pointee" (Section 1) and the program
always manipulates its heap blocks through pointers. The heap block pointers are
sometimes known as "base address" pointers since by convention they point to the base
(lowest address byte) of the block.
In this example, the three blocks have been allocated contiguously starting at the bottom
of the heap, and each block is 1024 bytes in size as requested. In reality, the heap
manager can allocate the blocks wherever it wants in the heap so long as the blocks do
not overlap and they are at least the requested size. At any particular moment, some areas
in the heap have been allocated to the program, and so are "in use". Other areas have yet
to be committed and so are "free" and are available to satisfy allocation requests. The
heap manager has its own, private data structures to record what areas of the heap are
committed to what purpose at any moment  The heap manager satisfies each allocation
request from the pool of free memory and updates its private data structures to record
which areas of the heap are in use. 

Deallocation
~~~~~~~~~~~~

When the program is finished using a block of memory, it makes an explicit 
deallocation request to indicate to the heap manager that the program is now finished with that block.
The heap manager updates its private data structures to show that the area of memory
occupied by the block is free again and so may be re-used to satisfy future allocation
requests. Here's what the heap would look like if the program deallocates the second of
the three blocks.   	

.. odsafig:: Images/LocalHeapdealoc.png
   :width: 300
   :align: center
   :capalign: justify
   :figwidth: 100% 
   
After the deallocation, the pointer continues to point to the now deallocated block. The
program must not access the deallocated pointee. This is why the pointer is drawn in gray
|---| the pointer is there, but it must not be used. Sometimes the code will set the pointer to
NULL immediately after the deallocation to make explicit the fact that it is no longer
valid.


Programming The Heap
--------------------

Programming the heap looks pretty much the same in most languages. The basic features
are:

* The heap is an area of memory available to allocate areas ("blocks")
  of memory for the program.

* There is some "heap manager" library code which manages the heap for
  the program. The programmer makes requests to the heap manager,
  which in turn manages the internals of the heap. In C, the heap is
  managed by the ANSI library functions ``malloc()``, ``free()``, and
  ``realloc()``.

* The heap manager uses its own private data structures to keep track
  of which blocks in the heap are "free" (available for use) and which
  blocks are currently in use by the program and how large those
  blocks are. Initially, all of the heap is free.

* The heap may be of a fixed size (the usual conceptualization), or it
  may appear to be of a fixed but extremely large size backed by
  virtual memory. In either case, it is possible for the heap to get
  "full" if all of its memory has been allocated and so it cannot
  satisfy an allocation request. The allocation function will
  communicate this run-time condition in some way to the program |---|
  usually by returning a NULL pointer or raising a language specific
  run-time exception.

* The allocation function requests a block in the heap of a particular
  size. The heap manager selects an area of memory to use to satisfy
  the request, marks that area as "in use" in its private data
  structures, and returns a pointer to the heap block. The caller is
  now free to use that memory by dereferencing the pointer. The block
  is guaranteed to be reserved for the sole use of the caller |---|
  the heap will not hand out that same area of memory to some other
  caller. The block does not move around inside the heap |---| its
  location and size are fixed once it is allocated. Generally, when a
  block is allocated, its contents are random. The new owner is
  responsible for setting the memory to something
  meaningful. Sometimes there is variation on the memory allocation
  function which sets the block to all zeros (calloc() in C).

* The deallocation function is the opposite of the allocation
  function. The program makes a single deallocation call to return a
  block of memory to the heap free area for later re-use. Each block
  should only be deallocated once. The deallocation function takes as
  its argument a pointer to a heap block previously furnished by the
  allocation function. The pointer must be exactly the same pointer
  returned earlier by the allocation function, not just any pointer
  into the block. After the deallocation, the program must treat the
  pointer as bad and not access the deallocated pointee.


C Specifics
-----------

In the C language, the library functions which make heap requests are
``malloc()`` ("memory allocate") and ``free()``.
The prototypes for these functions are in the header file ``<stdlib.h>``.
Although the syntax varies between languages, the roles of
``malloc()`` and ``free()`` are nearly identical in all languages.

   ``void* malloc(unsigned long size);``
   The ``malloc()`` function takes an unsigned integer which is the
   requested size of the block measured in bytes.
   ``malloc()`` returns a pointer to a new heap block if the
   allocation is successful, and NULL if the request cannot be
   satisfied because the heap is full.
   The C operator ``sizeof()`` is a convenient way to compute the size
   in bytes of a type |---| ``sizeof(int)`` for an  int pointee,
   ``sizeof(struct fraction)`` for a ``struct fraction`` pointee.
	
   ``void free(void* heapBlockPointer);``
   The ``free()`` function takes a pointer t a heap block and returns
   it to the free pool for later reuse. The pointer passed to
   ``free()`` must be exactly the pointer returned earlier by
   ``malloc()``, not just a pointer to somewhere in the block.
   Calling ``free()`` with the wrong sort of pointer is famous for the
   particularly ugly sort of crashing which it causes. The call to
   ``free()`` does not need to give the size of the heap block |---|
   the heap manager will have noted the size in its private data
   structures. The call to ``free()`` just needs to identify which
   block to deallocate by its pointer. If a program correctly
   deallocates all of the memory it allocates, then every call to
   ``malloc()`` will later be matched by exactly one call to
   ``free()`` As a practical matter however, it is not always
   necessary for a program to deallocate every block it allocates
   |---| see "Memory Leaks" below.
	

Simple Heap Example
-------------------
Here is a simple example which allocates an 
``int`` block in the heap, stores the number 42 in the block, and then deallocates it. 
This is the simplest possible example of heap block allocation, use, and deallocation. 
The example shows the state of memory at three different times during the execution of the above code. The stack and heap are shown
separately in the drawing |---| a drawing for code which uses stack and heap memory needs
to distinguish between the two areas to be accurate since the rules which govern the two
areas are so different. In this case, the lifetime of the local variable intPtr is totally
separate from the lifetime of the heap block, and the drawing needs to reflect that
difference.

::

   void Heap1() {
     int* intPtr;
     // Allocates local pointer local variable (but not its pointee)
     // T1


.. odsafig:: Images/LocalHeapintptrxxx.png
   :width: 300
   :align: center
   :capalign: justify
   :figwidth: 100% 
   


::

	 // Allocates heap block and stores its pointer in local variable.
	 // Dereferences the pointer to set the pointee to 42.
	 intPtr = malloc(sizeof(int));
	 *intPtr = 42;
	 // T2
	 
.. odsafig:: Images/LocalHeapintptr42.png
   :width: 300
   :align: center
   :capalign: justify
   :figwidth: 100% 
   

::

	 // Deallocates heap block making the pointer bad.
	 // The programmer must remember not to use the pointer
	 // after the pointee has been deallocated (this is
	 // why the pointer is shown in gray).
	 free(intPtr);
	 // T3
	 
.. odsafig:: Images/LocalHeapintptr.png
   :width: 300
   :align: center
   :capalign: justify
   :figwidth: 100% 	 
   
   
   
Simple Heap Observations
------------------------

* After the allocation call allocates the block in the heap. The
  program stores the pointer to the block in the local variable
  ``intPtr``. The block is the "pointee" and ``intPtr`` is its pointer
  as shown at T2. In this state, the pointer may be dereferenced
  safely to manipulate the pointee. The pointer/pointee rules from
  Section 1 still apply, the only difference is how the pointee is
  initially allocated.

* At T1 before the call to ``malloc()``, ``intPtr`` is uninitialized
  does not have a pointee |---| at this point ``intPtr`` "bad" in the
  same sense as discussed in Section 1. As before, dereferencing such
  an uninitialized pointer is a common, but catastrophic
  error. Sometimes this error will crash immediately (lucky). Other
  times it will just slightly corrupt a random data structure
  (unlucky).

* The call to ``free()`` deallocates the pointee as shown at
  T3. Dereferencing the pointer after the pointee has been deallocated
  is an error. Unfortunately, this error will almost never be flagged
  as an immediate run-time error. 99% of the time the dereference will
  produce reasonable results 1% of the time the dereference will
  produce slightly wrong results. Ironically, such a rarely appearing
  bug is the most difficult type to track down.

* When the function exits, its local variable intPtr will be
  automatically deallocated following the usual rules for local
  variables (Section 2). So this function has tidy memory behavior
  |---| all of the memory it allocates while running (its local
  variable, its one heap block) is deallocated by the time it exits.


Heap Array
----------

In the C language, it's convenient to allocate an array in the heap,
since C can treat any pointer as an array.
The size of the array memory block is the size of each element (as 
computed by the ``sizeof()`` operator) multiplied by the number of
elements (See CS Education Library/101 The C Language, for a complete
discussion of C, and arrays and pointers in particular).
So the following code heap allocates an array of 100 
``struct fraction``'s in the heap, sets them all to 22/7, and
deallocates the heap array.

::

	void HeapArray() {
	  struct fraction* fracts;
	  int i;
	  // allocate the array
	  fracts = malloc(sizeof(struct fraction) * 100);
	  // use it like an array -- in this case set them all to 22/7
	  for (i=0; i<99; i++) {
	    fracts[i].numerator = 22;
	    fracts[i].denominator = 7;
	  }
	  // Deallocate the whole array
	  free(fracts);
	}
	
Heap String Example
-------------------
Here is a more useful heap array example. The ``StringCopy()`` function takes a C string,
makes a copy of that string in the heap, and returns a pointer to the new string. The caller
takes over ownership of the new string and is responsible for freeing it.

::

	/*
	 Given a C string, return a heap allocated copy of the string.
	 Allocate a block in the heap of the appropriate size,
	 copies the string into the block, and returns a pointer to the block.
	 The caller takes over ownership of the block and is responsible
	 for freeing it.
	*/
	char* StringCopy(const char* string) {
	  char* newString;
	  int len;
	  len = strlen(string) + 1;   // +1 to account for the '\0'
	  newString = malloc(sizeof(char)*len); 	// elem-size * number-of-elements
	  assert(newString != NULL); 	// simplistic error check (a good habit)
	  strcpy(newString, string); 	// copy the passed in string to the block
	  
	  return(newString); 	// return a ptr to the block
	}

Heap String Observations
~~~~~~~~~~~~~~~~~~~~~~~~

``StringCopy()`` takes advantage of both of the key features of heap memory:

* **Size**. ``StringCopy()`` specifies, at run-time, the exact size of
  the block needed to store the string in its call to
  ``malloc()``. Local memory cannot do that since its size is
  specified at compile-time. The call to ``sizeof(char)`` is not
  really necessary, since the size of  ``char``  is 1 by
  definition. In any case, the example demonstrates the correct
  formula for the size of an array block which is  ``element-size *
  number-of-elements``.

* **Lifetime**.  ``StringCopy()`` allocates the block, but then passes
  ownership of it to the caller. There is no call to free(), so the
  block continues to exist even after the function exits. Local memory
  cannot do that. The caller will need to take care of the
  deallocation when it is finished with the string.


Memory Leaks
------------

What happens if some memory is heap allocated, but never deallocated?
A program which forgets to deallocate a block is said to have a
:term:`memory leak` which may or may not be a serious problem.
The result will be that the heap gradually fill up as there 
continue to be allocation requests, but no deallocation requests to
return blocks for re-use.
For a program which runs, computes something, and exits immediately, memory leaks
are not usually a concern. Such a "one shot" program could omit all of its deallocation
requests and still mostly work. Memory leaks are more of a problem for a program which
runs for an indeterminate amount of time. In that case, the memory leaks can gradually
fill the heap until allocation requests cannot be satisfied, and the program stops working
or crashes. Many commercial programs have memory leaks, so that when run for long
enough, or with large data-sets, they fill their heaps and crash. Often the error detection
and avoidance code for the heap-full error condition is not well tested, precisely because
the case is rarely encountered with short runs of the program |---| that's why filling the
heap often results in a real crash instead of a polite error message. Most compilers have a
"heap debugging" utility which adds debugging code to a program to track every
allocation and deallocation. When an allocation has no matching deallocation, that's a
leak, and the heap debugger can help you find them.

Ownership
---------

``StringCopy()`` allocates the heap block, but it does not deallocate it. This is so the caller
can use the new string. However, this introduces the problem that somebody does need to
remember to deallocate the block, and it is not going to be ``StringCopy()``. That is why the
comment for ``StringCopy()`` mentions specifically that the caller is taking on 
ownership  of the block. Every block of memory has exactly one "owner" who takes responsibility for
deallocating it. Other entities can have pointers, but they are just sharing. There's only
one owner, and the comment for ``StringCopy()`` makes it clear that ownership is being
passed from ``StringCopy()`` to the caller. Good documentation always remembers to
discuss the ownership rules which a function expects to apply to its parameters or return
value. Or put the other way, a frequent error in documentation is that it forgets to
mention, one way or the other, what the ownership rules are for a parameter or return
value. That's one way that memory errors and leaks are created.

Ownership Models
~~~~~~~~~~~~~~~~

The two common patterns for ownership are:

* **Caller ownership**.  The caller owns its own memory. It may pass a
  pointer to the callee for sharing purposes, but the caller retains
  ownership. The callee can access things while it runs, and
  allocate and deallocate its own memory, but it should not disrupt
  the caller's memory.
	
* **Callee allocated and returned**. The callee allocates some memory
  and returns it to the caller. This happens because the result of the
  callee computation needs new memory to be stored or
  represented. The new 	memory is passed to the caller so they can see
  the result, and the caller 	must take over ownership of the
  memory. This is the pattern demonstrated in ``StringCopy()``.

Heap Memory Summary
-------------------

Heap memory provides greater control for the programmer |---| the
blocks of memory can be requested in any size, and they remain
allocated until they are deallocated explicitly.
Heap memory can be passed back to the caller since it is not deallocated on exit, and it
can be used to build linked structures such as linked lists and binary trees. The
disadvantage of heap memory is that  the program must make explicit allocation and
deallocate calls to manage the heap memory. The heap memory does not operate
automatically and conveniently the way local memory does.
