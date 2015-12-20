.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :topic: Memory Management

Chapter Introduction: Memory Management
=======================================

Most data structures are designed to store and access objects of
uniform size.
A typical example would be an integer stored in a list or a queue.
Some applications require the ability to store variable-length records,
such as a string of arbitrary length.
One solution is to store in list or queue a bunch of pointers to
strings, where each pointer is pointing to space of whatever size is
necessary to old that string.
This is fine for data structures stored in main memory.
But if the collection of strings is meant to be stored on disk, then
we might need to worry about how exactly these strings are stored.
And even when stored in main memory, something has to figure out where
there are available bytes to hold the string.
In a language like C++ or Java, programmers can allocate space as
necessary (either explicitly with ``new`` or implicitly with a
variable declaration).
Where does this space come from?
This section discusses memory management techniques for the general
problem of handling space requests of variable size.

The basic model for memory management is that we have a (large)
block of contiguous memory locations, which we will call the
:term:`memory pool`.
Periodically, memory requests are issued for some amount of space in
the pool.
A :term:`memory manager` has the job of finding a contiguous block of
locations of at least the requested size from somewhere within the
memory pool.
Honoring such a request is called 
:term:`memory allocation`.
The memory manager will typically return some piece of information
that the requestor can hold on to so that later it can recover the
data that were just stored by the memory manager.
This piece of information is called a :term:`handle`.
At some point, space that has been requested might no longer be needed,
and this space can be returned to the memory manager so that it can be
reused.
This is called a :term:`memory deallocation`.
We can define an ADT for a simple memory manager for storing variable
length arrays of integers as follows.

.. codeinclude:: Memman/MemmanADT

The user of the ``MemManager`` ADT provides a pointer
(in parameter ``info``) to space that
holds some message to be stored or retrieved.
This is similar to the C++ basic file read/write methods.
The fundamental idea is that the client gives messages to the memory
manager for safe keeping.
The memory manager returns a ``receipt`` for the message in the form
of a ``MemHandle`` object.
The client holds the ``MemHandle`` until it wishes to get the
message back.

Method ``insert`` lets the client tell the memory manager the
length and contents of the message to be stored.
This ADT assumes that the memory manager will remember the length of
the message associated with a given handle, thus method
``getRecord`` does not include a length parameter but instead
returns the message actually stored.
Method ``release`` allows the client to tell the memory
manager to release the space that stores a given message.

When all inserts and releases follow a simple pattern, such as last
requested, first released (stack order), or first requested, first
released (queue order), memory management is fairly easy.
We are concerned here with the general case where blocks
of any size might be requested and released in any order.
This is known as :term:`dynamic memory allocation`.
One example of dynamic memory allocation is managing free store for a
compiler's runtime environment, such as the system-level
``new`` and ``delete`` operations in C++.
Another example is managing main memory in a multitasking operating
system.
Here, a program might require a certain amount of space, and the
memory manager must keep track of which programs are using which parts
of the main memory.
Yet another example is the file manager for a disk drive.
When a disk file is created, expanded, or deleted, the file manager
must allocate or deallocate disk space.

A block of memory or disk space managed in this way is sometimes
referred to as a :term:`heap`.
The term "heap" is being used here in a different way
than the heap data structure typically used to implement a priority
queue.
Here "heap" refers to the memory controlled by a dynamic memory
management scheme.

In the rest of this chapter, we first study techniques for dynamic
memory management.
We then tackle the issue of what to do when no single block
of memory in the memory pool is large enough to honor a given request.
