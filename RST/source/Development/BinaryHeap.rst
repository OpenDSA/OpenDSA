.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Ari Korhonen and Cliff Shaffer
   :prerequisites: 
   :topic: Binary Heaps

.. _BinaryHeap:

.. index:: ! Binary Heap
.. index:: ! Priority Queue

Priority Queues [STUB]
======================

Priority Queue (PQ) is an Abstract Data Type (ADT) that has the
following operations 1) insert and 2) find and remove the largest (or
smallest) item (DeleteMax or DeleteMin).

Example Use Case: Work Flow Problem

Let a set of jobs J, waiting for completion, be inserted into a
priority Queue Q. Each job has a certain priority value p. After the
completion of each job, the next job selected is such that has the
highest priority. The selected job is removed from Q and started. At
any moment, new jobs can be inserted into Q. Thus, there can be
arbitrary interleavings of operations in terms of insertions and
removals. The challenge is to find such a data structure and
algorithms that can most efficiently implement the required
operations.

Binary Heap
-----------

Binary Heap (aka Heap; other heaps exist as well, but without any
extra prefix, heap refers to Binary Heap) is one of the most important
implementations for PQ. It is a complete binary tree where all the
levels - except possibly the last/lowest level - are full, and in the
last/lowest level all the items are on the left. In this case, the
data structure can simply be implemented as an array. If the heap is
Minimum Heap (MinHeap), the priority of each node is less than the
priority of its children. We say that the heap order property for
MinHeap is "the father is less (or equal) than its children". Of
course, the heap order property can be the other way around in which
case we are dealing with Maximum Heap (MaxHeap).

Heap algorithms are based on the following basic idea. First, we make
a minor local change. After this, the heap is modified in order to
satisfy the heap order property again. The changes are required only
in the path from the root to leaf or vice versa.

Heap in a Nutshell
------------------

An important implementation for Priority Queue (allows efficient
implementations for the operations insert and DeleteMax).

Can be implemented using a simple array due to the fact that a binary heap is
a complete binary tree.

Heap order property (MaxHeap): Father greater than its children.

Heap order property (MinHeap): Father less than its children.

Array Representation
--------------------
