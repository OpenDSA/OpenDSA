.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly


Section 1: Using Bags
=====================

Objectives
----------

**Upon completion of this module, students will be able to:**

* Name the function and purpose of basic Java data structures
* State key characteristics of Bags in Java
* Build and populate Bags in Java


Suggested Reading
-----------------

 Chapters 1 - 3 Bags from `Data Structures and Abstractions with Java, 4th edition  by Frank M. Carrano and Timothy Henry <https://www.amazon.com/Data-Structures-Abstractions-Java-4th/dp/0133744051/ref=sr_1_1?ie=UTF8&qid=1433699101&sr=8-1&keywords=Data+Structures+and+Abstractions+with+Java>`_. 


Introduction
------------

Data structures provide a model for organizing and manipulating a collection of data.  They are an example of an Abstract Data Type or ADT.  Previously, if you wanted to store an integer value representing, for example, the thermostat temperature setting for a room, you would use a statement like `int temp = 75;`.   However, what if you had to store and track the thermostat temperature settings for 500 rooms of a commercial building?  It would be tedious to create an int variable for each of them.  Conceptually client code can think of grouping the data into an appropriate data structure, for example, a list or a bag.  Client code can then interact with it accordingly, such as by adding or removing items.  With respect to the thermostat temperature setting example, client code would add to the selected data structure an integer value to represent the temperature setting for each room in the commercial building.  We would, of course, need a way to identify which integer value was associated with a given room, concerns like this will be explored in further detail throughout this course.  Common introductory linear data structures are bags, stacks, queues, and lists.  Data structures can also be organized as trees or graphs and in multiple dimensions, they can be indexed by position or by a key such as in a dictionary.

This module introduces the Bag ADT.  It is a finite collection of objects in no particular order and can contain duplicates.  Bags are used all the time in everyday life to organize and manage collections of objects, such as the items in a backpack, a grocery bag, or the movies you've seen this decade.  The possible behaviors of a bag object are: get the number of items stored in the bag, check to determine if the bag is empty, add and remove objects, iterate over the items in the bag, and check to see if the bag contains a specific object. 

When designing a Bag class, there are many things a developer must think about.  In order to implement a Bag its data and methods need to be specified.  When designing how the methods are expected to work we need to consider all aspects of a method's intended behavior.  Essential to this is considering what should happen when tasks cannot be completed, should the code silently fail, notify the client code of the fact that the task cannot be completed, or perhaps some other course of action?A developer also has many options when implementing a data structure.  A key decision is how to actually store the data.  The client code interacts with a bag by invoking  its public methods, but under the hood  the bag could possibly be built with an array or a linked chains of nodes.  Other data structure implementation decisions involve determining  the various algorithms to efficiently program specified methods.

A developer also has many options when implementing a data structure.  A key decision is how to actually store the data.  The client code interacts with a bag by invoking  its public methods, but under the hood  the bag could possibly be built with an array or a linked chains of nodes.  Other data structure implementation decisions involve determining  the various algorithms to efficiently program specified methods.

Documentation of Bag Interface methods
--------------------------------------


UML/code for BagInterface
-------------------------

The image below presents the UML notation for the BagInterface class.

You may recall that UML, short for Unified Modeling Language, is a standardized modeling language used to capture, visualize,  and communicate the design of a system.

There are many types of UML diagrams.  Throughout most of the course we will be using diagrams similar to the one depicted below, these are referred to as UML Class Diagrams.

Observe how the class diagram quickly communicates the name and characteristics of the software components of a given system.  At a glance you can tell that this image describes the specification for an Interface, it indicates the methods that should be common to all classes that implement this BagInterface, i.e. methods that should be present in all implementations of a Bag.  It also indicates the access modifiers for fields and methods, as well as details regarding the parameters and return types for each method.  In this case you will note the annotation to the left of each method's name indicating that each method is public.

.. odsafig:: Images/BagInterfaceUML.png
   :width: 200
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Alternative text

   Bag image



changePointeeDataDirect
-----------------------

Molly is practicing adding a CW style question (still in progress)

.. extrtoolembed:: 'changePointeeDataDirect'
