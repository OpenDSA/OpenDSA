.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Nick Parlante, Cliff Shaffer, Sally Hamouda and Mostafa Mohammed
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
until the programmer explicitly requests that it be deallocated. In Java, the
memory deallocation is done automatically by Automatic Garbage Collection.
So the programmer has much greater control of memory, but with greater
responsibility since the memory must now be actively managed.
The advantages of heap memory are:

* **Lifetime**. Because the programmer now controls exactly when memory
  is allocated, it is possible to build a data structure in memory, and return
  that data structure to the caller. This was never possible with local memory
  which was automatically deallocated when the function exited.

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

Java Garbage Collection
-----------------------
The following are some important points about Garbage Collection:

* Garbage collection is a mechanism that is frequently invoked by the Java Virtual
Machine to get ride of the unused heap memory objects. It removes every object
that is not being used by the running Java program anymore. The results of this
process is freeing up the memory so other new objects can use that piece of memory.

* In other programming languages like C and C++, it is the responsibility of the
programmer to take care of freeing up the memory from unused objects and arrays,
this process consumes programmer's time and increase code complexity. In the other
hand, garbage collection makes programming more easily by taking care of the memory
management for the programmer and makes the programmer focusing only on programming.

* Before removing an object from memory garbage collection invokes finalize() method
of that object and gives an opportunity to perform any sort of cleanup required. If
the programmer do not override this method, the default finializer method will be
invoked (the method defined in ``Object`` class).

* Java Virtual Machine invokes the garbage collection based on the size of the
dynamically allocated memory from the heap.

* Programmers can use some methods like System.gc() and Runtime.gc() to send request
of garbage collection to Java Virtual Machine.

The following are some cases that make an object subject to be removed from heap
memory by garbage collection:

* When the programmer sets all references to an object to ``null``.

* If the object is defined inside a block of code and all references to that object
are out of scoop after the execution of that block. Here is an example

.. codeinclude:: PointersBook/Scoop

* If an object A contains a reference to another object B. Object B will be eligible
for garbage collection one object A set to ``null``. Here is an example:

.. codeinclude:: PointersBook/Date

What Does The Heap Look Like?
-----------------------------

Before seeing the exact details, let's look at a rough example of
allocation and deallocation in the heap.

Allocation
~~~~~~~~~~

The heap is a large area of memory available for use by the program.
The program can request areas, or "blocks", of memory for its use
within the heap.
In order to allocate a block of some size, the program makes an explicit request
by calling the heap :term:`allocation` function. The allocation function reserves
a block of memory of the requested size in the heap and returns a pointer to it.
Suppose a program makes three allocation requests to allocate memory to hold three
separate GIF images in the heap each of which takes 1024 bytes of memory. After
the three allocation requests, memory might look like.

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

When the program is finished using a block of memory, the block will be marked unused,
this allows Java garbage collection to know that this area must be cleaned. The
garbage collection will implicitly freeing up the unused memory blocks in heap.
The heap manager updates its private data structures to show that the area of memory
occupied by the block is free again and so may be re-used to satisfy future allocation
requests. Here's what the heap would look like if the garbage collection deallocates
the second of the three blocks.

.. odsafig:: Images/LocalHeapdealoc.png
   :width: 300
   :align: center
   :capalign: justify
   :figwidth: 100%

After the deallocation, the pointer continues to point to the now deallocated block. The
program must not access the deallocated pointee. This is why the pointer is drawn in gray
|---| the pointer is there, but it must not be used. Sometimes the code will set
the pointer to ``null`` to tell the garbage collection that this object is now unused.


Programming The Heap
--------------------

Programming the heap looks pretty much the same in most languages. The basic features
are:

* The heap is an area of memory available to allocate areas ("blocks")
  of memory for the program.

* There is some "heap manager" library code which manages the heap for
  the program. The programmer makes requests to the heap manager,
  which in turn manages the internals of the heap.

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
  usually by raising an OutOfMemoryError run-time exception.

* The allocation function requests a block in the heap of a particular
  size. The heap manager selects an area of memory to use to satisfy
  the request, marks that area as "in use" in its private data
  structures, and returns a pointer to the heap block. The caller is
  now free to use that memory by dereferencing the pointer. The block
  is guaranteed to be reserved for the sole use of the caller |---|
  the heap will not hand out that same area of memory to some other
  caller. The block does not move around inside the heap |---| its
  location and size are fixed once it is allocated.

* The deallocation function is the opposite of the allocation
  function. The Java virtual machine invokes the garbage collection frequently to
  remove any unused block of memory, free its space and return this space of memory
  to the heap free area for later re-use. Each block should only be deallocated once.
  After the deallocation, the program must treat the pointer as a ``null`` pointer
  and anu attemp to acccess its deallocated space raises ``NullPointerException``.

Simple Heap Example
-------------------
Here is a simple example which allocates an ``Employee`` object block in the heap,
and then deallocates it.
This is the simplest possible example of heap block allocation, use, and deallocation.
The example shows the state of memory at three different times during the execution
of the above code. The stack and heap are shown separately in the drawing |---| a
drawing for code which uses stack and heap memory needs to distinguish between the
two areas to be accurate since the rules which govern the two areas are so different.
In this case, the lifetime of the local variable empPtr is totally separate from
the lifetime of the heap block, and the drawing needs to reflect that difference.

.. codeinclude:: PointersBook/SimpleHeapExampleT1

.. odsafig:: Images/LocalHeapintptrxxx.png
   :width: 300
   :align: center
   :capalign: justify
   :figwidth: 100%



.. codeinclude:: PointersBook/SimpleHeapExampleT2

.. odsafig:: Images/LocalHeapintptr42.png
   :width: 300
   :align: center
   :capalign: justify
   :figwidth: 100%


.. codeinclude:: PointersBook/SimpleHeapExampleT3

.. odsafig:: Images/LocalHeapintptr.png
   :width: 300
   :align: center
   :capalign: justify
   :figwidth: 100%



Simple Heap Observations
------------------------

* After the allocation call allocates the block in the heap. The
  program stores the pointer to the block in the local variable
  ``empPtr``. The block is the "pointee" and ``empPtr`` is its pointer
  as shown at T2. In this state, the pointer may be dereferenced
  safely to manipulate the pointee. The pointer/pointee rules from
  Section 1 still apply, the only difference is how the pointee is
  initially allocated.

* At T1 before using ``new``, ``empPtr`` is uninitialized
  does not have a pointee |---| at this point ``empPtr`` ``null`` in the
  same sense as discussed in Section 1. As before, dereferencing such
  an uninitialized pointer is a common, but catastrophic
  error (raises a ``NullPointerException``). This error will crash immediately,
  unless there is a code to handle this exception.

* Assigning a ``null`` to a reference deallocates the pointee as shown at
  T3. Dereferencing the pointer after the pointee has been deallocated
  is an error like the previous point.

* When the function exits, its local variable ``empPtr`` will be
  automatically deallocated by the garbage collection. So this function has tidy
  memory behavior |---| all of the memory it allocates while running (its local
  variable, its one heap block) is deallocated by the time it exits.


Heap Array
----------

In the Java language, it's mandatory to allocate an array in the heap. The size
of the array memory block is the size of each element multiplied by the number of
elements. So the following code heap allocates an array of 100
``Fractions``'s in the heap, sets them all to 22/7, and deallocates the heap array.

.. codeinclude:: PointersBook/Fraction

Heap Array Observations
~~~~~~~~~~~~~~~~~~~~~~~

In the previous example the array is diamically allocated memory in two steps:

* The first step when the array is created using ``fracts =  new Fraction[100];``.
This line is used to allocate dynamic array of 100 reference to ``Fractions``. All
references are initialized to ``null``.

* The second step was inside the loop. Every loop iteration uses ``new`` to dynamically
allocate an ``object`` of type ``Fraction``. The initial value of eacth object determined
by the values sent to the Fraction constructor.


Memory Leaks
------------

What happens if some memory is heap allocated, but never deallocated?
A program which forgets to deallocate a block is said to have a
:term:`memory leak` which may or may not be a serious problem.
The result will be that the heap gradually fill up as there
continue to be allocation requests, but no deallocation requests to
return blocks for re-use. In Java, this problem will not happen as the garbage collection
will automatically free any unused block of memory and make it available to be used again.


Heap Memory Summary
-------------------

Heap memory provides greater control for the programmer |---| the
blocks of memory can be requested in any size, and they remain
allocated until they are deallocated implicitly.
Heap memory can be passed back to the caller since it is not deallocated on exit, and it
can be used to build linked structures such as linked lists and binary trees. The
disadvantage of heap memory is that  the program must make explicit allocation
calls to manage the heap memory. The heap memory does not operate automatically
and conveniently the way local memory does.
