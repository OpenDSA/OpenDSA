.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
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
:ref:`Local memory <local memory> <LocalMem>` is quite automatic.
Local variables are allocated automatically when a function is called,
and they are deallocated automatically when the function exits.
Heap memory is different in every way.
The programmer explicitly requests that space be allocated,
using the ``new`` operator in Java or C++.
This memory "block" will be of a particular size,
ususally determined automatically from the size of the object being
created.
That memory block (your object) continues to be allocated
until something happens that makes it go away.
In some languages (noteably, C and C++),
an object in heap memory **only** goes away when the programmer explicitly
requests that it be deallocated.
So the programmer has much greater control of memory, but with greater
responsibility since the memory must now be actively managed.
Dropping all references to a memory location without deallocating it
is a signficant source of errors in C/C++, and this is so common that
it has a name: :term:`memory leak`.
(In fact, many commercial programs implemented in C++ have memory
leaks, that will eventually make them crash after being used for a
long time.)
Java removes this source of errors by handling memory deallocation
automatically, using :term:`garbage collection`.
The downside is that garbage collection is a slow process that happens
at unpredictable times.

The advantages of heap memory are:

* **Lifetime**. Because the programmer now controls exactly when
  memory is allocated, it is possible to build a data structure in
  memory, and return that data structure to the caller.
  This was never possible with local memory, which was automatically
  deallocated when the function exited.

* **Size**. The size of allocated memory can be controlled with more
  detail.
  For example, a string buffer can be allocated at run-time that is
  exactly the right size to hold a particular string.
  With local memory, the code is more likely to declare a buffer of
  size 1000 and hope for the best.
  (See the StringCopy() example below.)

The disadvantages of heap memory are:

* **More Work**. Heap allocation needs to arranged for explicitly in
  the code, which is just more work.

* **More Bugs**. Because it's now done explicitly in the code,
  on occasion the allocation will be done incorrectly leading to
  memory bugs.
  Local memory is constrained, but at least it's never *wrong*.

Nonetheless, there are many problems that can only be solved with heap
memory, so that's the way it has to be.

The following are some important points about Garbage Collection.

* Garbage collection is a mechanism that is invoked by the Java
  Virtual Machine to get ride of the unused heap memory objects.
  It removes every object that is not being used anymore by the
  running Java program.
  The result of this process is freeing up the unused memory so other
  new objects can use that piece of memory.

* In other programming languages like C and C++, it is the
  responsibility of the programmer to take care of freeing up the
  memory from unused objects and arrays.
  Doing so consumes programmer's time and increases code complexity.
  On the other hand, garbage collection makes programming easier
  by taking care of the memory management for the programmer.

* Before removing an object from memory, garbage collection invokes the
  finalize() method of that object and gives an opportunity to perform
  any sort of cleanup required.
  If the programmer does not override this method,
  the default finializer method will be invoked
  (the method defined in the ``Object`` class).

* The Java Virtual Machine invokes garbage collection based on the
  size of the dynamically allocated memory from the heap.
  Garbage collection is **slow**, and hard to predict.
  This can be a problem for programs that have real-time performance
  constraints.

The following are some cases that make an object subject to be removed
from heap memory by garbage collection:

#. When the programmer changes all references to an object to something
   else.

#. If the object is defined inside a block of code, and all references
   to that object are local.
   When excecution of that block is complete, the local variables are
   destroyed automatically, leaving the object in heap memory without
   any references. (So this is really a special case of rule (1).)
   Here is an example

   .. codeinclude:: Pointers/Scoop

#. Assume an object ``A`` contains a reference to another object
   ``B``, and ``A`` contains the only such reference to ``B``.
   Object ``B`` will be eligible for garbage collection if ``A`` is
   also eligible for garbage collection.
   Here is an example.

  .. codeinclude:: Pointers/Date

.. inlineav:: garbageDisposalCON ss
   :links: AV/Pointers/garbageDisposalCON.css
   :scripts: AV/Pointers/garbageDisposalCON.js
   :output: show


Before seeing the exact details, let's look at a rough example of
allocation and deallocation in the heap.

Allocation
~~~~~~~~~~

The heap is a large area of memory available for use by the program.
The program can request areas, or "blocks", of memory for its use
within the heap.
In order to allocate a block of some size, the program makes an
explicit request by calling the heap :term:`allocation` operation.
In Java or C++, this is the ``new`` operator.
The allocation function reserves a block of memory of the requested
size in the heap (usually, the size of the object that you want) and
returns a refernece to it.
Suppose a program makes three allocation requests to allocate memory
to hold three separate GIF images in the heap, each of which takes
1024 bytes of memory.
After the three allocation requests, memory might look like.

.. inlineav:: LocalHeapaloc dgm
   :links: AV/Pointers/LocalHeapaloc.css
   :scripts: AV/Pointers/LocalHeapaloc.js

Each allocation request reserves a contiguous area of the requested
size in the heap and returns a reference to that new block to the
program.
Since each block is always referred to by a reference, the block
always plays the role of a "pointee" (Section 1) and the program 
always manipulates its heap blocks through references.
The heap block references are sometimes known as "base address"
pointers since by convention they point to the base (lowest address
byte) of the block.
In this example, the three blocks have been allocated contiguously
starting at the bottom of the heap, and each block is 1024 bytes in
size as requested.
In reality, the heap manager can allocate the blocks wherever it wants
in the heap so long as the blocks do not overlap and they are at least
the requested size.
At any particular moment, some areas in the heap have been allocated
to the program, and so are "in use".
Other areas have yet to be committed and so are "free" and are
available to satisfy allocation requests.
The heap manager has its own, private data structures to record what
areas of the heap are committed to what purpose at any moment.
The heap manager satisfies each allocation request from the pool of
free memory and updates its private data structures to record which
areas of the heap are in use.

Deallocation
~~~~~~~~~~~~

When the program is finished using a block of memory, in some
languages the block must be explicitly deallocated.
In such cases, the block will be marked unused.
In Java, typically space is "made available" by not having any
references to it.
This allows Java garbage collection to know that this area must be
cleaned.
Garbage collection will implicitly free up the unused memory blocks in
the heap.
The heap manager updates its private data structures to show that the
area of memory occupied by the block is free again and so may be
re-used to satisfy future allocation requests.
Here's what the heap would look like if the garbage collection
deallocates the second of the three blocks.

.. inlineav:: LocalHeapdealoc dgm
   :links: AV/Pointers/LocalHeapdealoc.css
   :scripts: AV/Pointers/LocalHeapdealoc.js

After deallocation, the reference continues to point to the now
deallocated block.
The program can no longer reach the deallocated pointee.
In a language (like C++) with explicit memory deallocation and no
garbage collection, the programmer must make sure that he or she does
not try to follow the old reference to the deallocated block.
This is why the pointer is drawn in gray |---| the pointer is there,
but it must not be used.
Of course, in Java the code will have set the pointer to ``null`` or
to point to somewhere else, so as to tell the garbage collection that
this object is now unused.
This is a big part of why Java references are safer to use than C++
pointers.


Programming the Heap
~~~~~~~~~~~~~~~~~~~~

Programming the heap looks pretty much the same in most languages.
The basic features are:

* The heap is an area of memory available to allocate areas ("blocks")
  of memory for the program.

* There is some "heap manager" library code which manages the heap for
  the program.
  The programmer makes requests to the heap manager, which in turn
  manages the internals of the heap.

* The heap manager uses its own private data structures to keep track
  of which blocks in the heap are "free" (available for use) and which
  blocks are currently in use by the program and how large those
  blocks are.
  Initially, all of the heap is free.

* The heap may be of a fixed size (the usual conceptualization), or it
  may appear to be of a fixed but extremely large size backed by
  virtual memory.
  In either case, it is possible for the heap to get
  "full" if all of its memory has been allocated and so it cannot
  satisfy an allocation request.
  The allocation function will communicate this run-time condition in
  some way to the program |---| usually by raising an OutOfMemoryError
  run-time exception.

* The allocation function requests a block in the heap of a particular
  size.
  The heap manager selects an area of memory to use to satisfy
  the request, marks that area as "in use" in its private data
  structures, and returns a reference to the heap block.
  The caller is now free to use that memory by following the
  reference.
  The block is guaranteed to be reserved for the sole use of the
  caller |---| the heap will not hand out that same area of memory to
  some other caller.
  The block does not move around inside the heap |---| its
  location and size are fixed once it is allocated.

* The Java virtual machine invokes the garbage collection to remove
  any unused block of memory, free its space and return this space of
  memory to the heap free area for later re-use.


A Heap Example
~~~~~~~~~~~~~~

.. inlineav:: LocalHeapintptr42 ss
   :links: AV/Pointers/LocalHeapintptr42.css
   :scripts: AV/Pointers/LocalHeapintptr42.js
   :output: show


Arrays
~~~~~~

In Java, array memory is allocated in the heap.
The size of the array memory block is the size of each element
multiplied by the number of elements.
So the following code heap allocates an array of 100 ``Fraction``
objects in the heap, sets them all to 22/7, and deallocates the heap
array.

.. codeinclude:: Pointers/Fraction

In this example the array is dynamically allocated memory in
two steps:

* The first step when the array is created using
  ``fracts = new Fraction[100];``. 
  This line is used to allocate dynamic array of 100 references to
  ``Fractions``.
  All references are initialized to ``null``.

* The second step was inside the loop.
  Every loop iteration uses ``new`` to dynamically allocate an
  object of type ``Fraction``.
  The initial value of each object determined 
  by the values sent to the Fraction constructor.

Heap memory provides greater control for the programmer |---| the
blocks of memory can be requested in any size, and they remain
allocated until they are no longer pointed to and recovered by the
garbage collector.
An object in heap memory can be passed back to the caller of a
function, since it is not deallocated when that function exits.
And it can be used to build linked structures
such as linked lists and binary trees.
The disadvantage of heap memory is that the program must make
explicit allocation calls to manage the heap memory, and the program
has to wait when the garbage collector runs.
The heap memory does not operate automatically
and conveniently the way local memory does.

