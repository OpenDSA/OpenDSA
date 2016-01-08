.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires:
   :satisfies: ADT; metaphor
   :topic: Abstract Data Types

.. odsalink:: AV/Design/ADTCON.css

Abstract Data Types
===================

Abstract Data Types
-------------------

This module presents terminology and definitions related to techniques
for managing the tremendous complexity of computer programs.
It also presents working definitions for the fundamental but somewhat
slippery terms ":term:`data item`" and ":term:`data structure`".
We begin with the basic elements on which data structures are built.

A :term:`type` is a collection of values.
For example, the Boolean type consists of the values ``true`` and
``false``.
The integers also form a type.
An integer is a :term:`simple type`
because its values contain no subparts.
A bank account record will typically contain several pieces of
information such as name, address, account number, and account
balance.
Such a record is an example of an :term:`aggregate type` or
:term:`composite type`.
A :term:`data item` is a piece of information
or a record whose value is drawn from a type.
A data item is said to be a :term:`member` of a type.

A :term:`data type` is a type together with a collection of operations
to manipulate the type.
For example, an integer variable is a member of the integer data
type.
Addition is an example of an operation on the integer data type.

A distinction should be made between the
logical concept of a data type and its physical implementation in a
computer program.
For example, there are two traditional implementations
for the list data type:
the linked list and the array-based list.
The list data type can therefore be implemented using a linked list or
an array.
But we don't need to know how the list is implemented when we wish to
use a list to help in a more complex design.
For example, a list might be used to help implement a
:ref:`graph data structure <graph> <GraphImpl>`.

As another example, the term "array" could refer either
to a data type or an implementation.
"Array" is commonly used in computer programming to mean a
contiguous block of memory locations,
where each memory location stores one fixed-length data item.
By this meaning, an array is a physical data structure.
However, array can also mean a logical data type composed of a
(typically homogeneous) collection of data items, with each data item
identified by an index number.
It is possible to implement arrays in many different ways besides as a
block of contiguous memory locations.
The :ref:`sparse matrix <sparse matrix> <SparseMatrix>`
refers to a large, two-dimensional array
that stores only a relatively few non-zero values.
This is often implemented with a linked structure, or possibly using a
:ref:`hash table <hash table> <HashIntro>`.
But it could be implemented with an interface that uses traditional
row and column indices, thus appearing to the user in the same way
that it would if it had been implemented as a block of contiguous
memory locations.


An :term:`abstract data type` (ADT) is the specification of a data type
within some language, independent of an implementation.
The interface for the ADT is defined in terms of a type and a set of
operations on that type.
The behavior of each operation is determined by its inputs and outputs.
An ADT does not specify *how* the data type is implemented.
These implementation details are hidden from the user of the ADT and
protected from outside access, a concept referred to as
:term:`encapsulation`.

A :term:`data structure` is the implementation for an ADT.
In an object-oriented language,
an ADT and its implementation together make up a :term:`class`.
Each operation associated with the ADT is implemented by a
:term:`member function` or :term:`method`.
The variables that define the space required by a data item are
referred to as :term:`data members <data member>`.
An :term:`object` is an instance of a class, that is, something that
is created and takes up storage during the execution of a
computer program.

The term :term:`data structure` often refers to data
stored in a computer's main memory.
The related term  :term:`file structure`
often refers to the organization of data on peripheral storage, such
as a disk drive or CD.

.. topic:: Example

   The mathematical concept of an integer, along with operations
   that manipulate integers, form a data type.
   The ``int`` variable type is a physical representation of
   the abstract integer.
   The ``int`` variable type, along with the operations that act on an 
   ``int`` variable, form an ADT.
   Unfortunately, the ``int`` implementation is not
   completely true to the abstract integer, as there are limitations on
   the range of values an ``int`` variable can store.
   If these limitations prove unacceptable, then some other
   representation for the ADT "integer" must be devised, and a new
   implementation must be used for the associated operations.

.. topic:: Example

   An ADT for a list of integers might specify the following operations:

   #. Insert a new integer at a particular position in the list.

   #. Return ``True`` if the list is empty.

   #. Reinitialize the list.

   #. Return the number of integers currently in the list.

   #. Delete the integer at a particular position in the list.

   From this description, the input and output of each operation should
   be clear, but the implementation for lists has not been
   specified.

One application that makes use of some ADT might use particular
member functions of that ADT more than a second application, or the
two applications might have different time requirements for the
various operations.
These differences in the requirements of applications are the reason
why a given ADT might be supported by more than one implementation.

.. topic:: Example

   Two popular implementations for large disk-based
   database applications are :ref:`hashing <hashing> <HashIntro>`
   and the :ref:`B-tree <B-tree> <BTree>`.
   Both support efficient insertion and deletion of records, and both
   support exact-match queries.
   However, hashing is more efficient than the B-tree for
   exact-match queries.
   On the other hand, the B-tree can perform range queries
   efficiently, while hashing is hopelessly inefficient for
   range queries.
   Thus, if the database application limits searches to exact-match
   queries, hashing is preferred.
   On the other hand, if the application requires support for range
   queries, the B-tree is preferred.
   Despite these performance issues, both implementations solve
   versions of the same problem: updating and searching a large
   collection of records.

The concept of an ADT can help us to focus on key issues even in
non-computing applications.

.. topic:: Example

   When operating a car, the primary activities are steering,
   accelerating, and braking.
   On nearly all passenger cars, you steer by turning the steering
   wheel, accelerate by pushing the gas pedal, and brake by pushing
   the brake pedal.
   This design for cars can be viewed as an ADT with operations
   "steer", "accelerate", and "brake".
   Two cars might implement these operations in radically different
   ways, say with different types of engine, or front- versus
   rear-wheel drive. 
   Yet, most drivers can operate many different cars because the ADT
   presents a uniform method of operation that does not require the
   driver to understand the specifics of any particular engine or
   drive design.
   These differences are deliberately hidden.

The concept of an ADT is one instance of an
important principle that must be understood by any successful
computer scientist: managing complexity through
abstraction.
A central theme of computer science is complexity and
techniques for handling it.
Humans deal with complexity by assigning a label to an assembly of
objects or concepts and then manipulating the label in place of the
assembly.
Cognitive psychologists call such a label a
:term:`metaphor`.
A particular label might be related to other pieces of information or
other labels.
This collection can in turn be given a label,
forming a hierarchy of concepts and labels.
This hierarchy of labels allows us to focus on
important issues while ignoring unnecessary details.

.. topic:: Example

   We apply the label "hard drive" to a collection of
   hardware that manipulates data on a particular type of
   storage device, and we apply the label "CPU" to the hardware that
   controls execution of computer instructions.
   These and other labels are gathered together under the label
   "computer".
   Because even the smallest home computers today have millions of
   components, some form of abstraction is necessary to comprehend how
   a computer operates.

Consider how you might go about the process of designing a complex
computer program that implements and manipulates an ADT.
The ADT is implemented in one part
of the program by a particular data structure.
While designing those parts of the program that use the ADT,
you can think in terms of operations on the data type without
concern for the data structure's implementation.
Without this ability to simplify your thinking about a complex
program, you would have no hope of understanding or implementing it.

.. topic:: Example

   Consider the design for a relatively simple database system stored
   on disk.
   Typically, records on disk in such a program are accessed through a
   :ref:`buffer pool <buffer pool> <BuffPool>` rather than directly.
   Variable length records might use a
   :ref:`memory manager <memory manager> <MemmanIntro>` to find an
   appropriate location within the disk file to place the record.
   Multiple :ref:`index structures <indexing> <IndexIntro>`
   will typically be used to support access to a collection of records
   using multiple :term:`search keys <search key>`.
   Thus, we have a chain of classes, each with its own responsibilities
   and access privileges.
   A database query from a user is implemented by searching an index
   structure.
   This index requests access to the record by means of a request to
   the buffer pool.
   If a record is being inserted or deleted, such a request goes
   through the memory manager, which in turn interacts with the buffer
   pool to gain access to the disk file.
   A program such as this is far too complex for nearly any human
   programmer to keep all of the details in his or her head at once.
   The only way to design and implement such a program is through
   proper use of abstraction and metaphors.
   In object-oriented programming,
   such abstraction is handled using classes.

Data types have both a :term:`logical form` and a :term:`physical form`.
The definition of the data type in terms of an ADT is its logical
form.
The implementation of the data type as a data structure
is its physical form.
Sometimes you might see the term *concrete implementation*,
but the word concrete is redundant.
The figure below illustrates this relationship between logical
and physical forms for data types.
When you implement an ADT, you are dealing with the physical form of
the associated data type.
When you use an ADT elsewhere in your program, you are concerned with
the associated data type's logical form.
Some sections of this book focus on physical
implementations for a given data structure.
Other sections use the logical ADT for the data structure in the
context of a higher-level task.

.. _DataType:

.. inlineav:: ADTCON dgm
   :align: justify

   The relationship between data items, abstract data types, and data
   structures.

The ADT defines the logical form of the data type.
The data structure implements the physical form of the data type.
Users of an ADT are typically programmers working in the same language
as the implementer of the ADT.
Typically, these programmers want to use the ADT as a component
in another application.
The interface to an ADT is also commonly referred to as the 
Application Programmer Interface, or API, for the ADT.
The interface becomes a form of communication between the two programmers.

.. topic:: Example

   A particular programming environment might provide a library that
   includes a :term:`list` class.
   The logical form of the list is defined by the public 
   functions, their inputs, and their outputs that define the class.
   This might be all that you know about the list class implementation,
   and this should be all you need to know.
   Within the class, a variety of physical implementations for lists
   is possible.

.. avembed:: Exercises/Design/IntroADTSumm.html ka

.. odsascript:: AV/Design/ADTCON.js
