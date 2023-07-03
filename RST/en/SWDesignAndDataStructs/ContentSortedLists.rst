.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly

Sorted Lists
============

Objectives
----------

* Distinguish between Ordered vs Sorted Order
* Describe the differences between a List ADT and a Sorted List ADT
* Implement and use a Sorted List ADT
* add objectives from other canvas pages as needed

**Suggested Reading:**  *Chapters 16 Sorted Lists from Data Structures and Abstractions with Java, 4th edition  by Frank M. Carrano and Timothy Henry* 



Interactive: Introduction to Sorted Lists
-----------------------------------------

.. admonition:: Follow Along, Practice and Explore

    Download to run and explore the java files (see below) from the video on your own in eclipse. You may download the standalone *.java file for this example. To run the standalone *.java file you will need to 
        1) create a new Eclipse project, then 
        2) create a package within the project called “example” (the package named at the top of the class MUST match the package the file is placed in within the Eclipse project), and finally 
        3) download and import the standalone *.java file(s) to the created package.

.. raw:: html

   <a href="https://courses.cs.vt.edu/~cs2114/SWDesignAndDataStructs/ListInterface.java"  target="_blank">
   <img src="../html/_static/Images/icons8-java60.png" width="32" height="32">
   ListInterface.java</img>
   </a>

.. raw:: html

   <a href="https://courses.cs.vt.edu/~cs2114/SWDesignAndDataStructs/SortedListInterface.java"  target="_blank">
   <img src="../html/_static/Images/icons8-java60.png" width="32" height="32">
   SortedListInterface.java</img>
   </a>

.. raw:: html

   <a href="https://courses.cs.vt.edu/~cs2114/SWDesignAndDataStructs/SortedListsOrderVsSorted.pdf"  target="_blank">
   <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
   SortedListsOrderVsSorted.pdf</img>
   </a>



.. raw:: html

   <center>
       <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_lw5tazyu' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>


Recap UML/code for ListInterface
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

possibly show the UML image from: https://canvas.vt.edu/courses/165395/pages/introduction-to-sorted-lists?module_item_id=2213510

Thinking about Order vs Sorted Order
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Consider the various Data Structures discussed so far.  Each of these Data Structures offer a number of characteristics, attributes (fields), and behaviors (operations or methods), and ways of arranging and interacting with stored data. 

A given Data Structure may, at times, be found to be appropriate for use in certain applications, usually because it offers features which support the implementation and functioning of that specific application’s requirements.  

At other times a given Data Structure may be thought to be inappropriate for use in a given application, possibly because it provides features that are unnecessary, restrictive, unhelpful, and not supportive with respect to the requirements and functioning of the software application. 

We may recall, for example, that Bags are useful in applications where order doesn't matter, i.e. where the order of the data stored within the structure is of no concern with respect to the needs of the application and the functioning of the system.

Bags are, by their very nature, unordered.

However there are some applications where maintaining order, or more specifically maintaining sorted order, is very important.  It is important to note our deliberate distinction of Order vs Sorted Order.

 

List ADT
~~~~~~~~
Lists are considered to be an “ordered collection” of elements or Objects, also known as a sequence of elements.

This means that client code can access elements from a List via their integer index or “position” in the List.  The elements of the List are said to be ordered by this index or “position”.

While the elements of the collection are considered to have a specific order, the ordering of these List elements are NOT based on the element’s value, rather their index.  

Lists are not necessarily in Sorted Order.

 

Sorted List ADT
~~~~~~~~~~~~~~~
A Sorted List is therefore a collection of elements or Objects in sorted order, where 

the ordering of elements is based on something related to the element’s value or the Object’s “state” (When referring to an Object’s state we mean the values of each of its fields)
each element is of the same type (through inheritance and polymorphism a List could be used to facilitate some combination of comparable types)
An example of a Sorted List could be a List of names, stored as Strings arranged in alphabetical order.  In computing circles we often refer to this as lexicographic or lexical order.

Just like Lists and many other data structures, it would be necessary to implement methods that enable client code to add new elements, remove elements, and track and manage the number of elements in the Sorted List.  As you progress through this module you will explore the similarities and differences between Lists and Sorted Lists and their implementations. 


References
~~~~~~~~~~
https://docs.oracle.com/javase/7/docs/api/java/util/List.html



Checkpoint 1
------------

.. avembed:: Exercises/SWDesignAndDataStructs/OOP1Checkpoint1Summ.html ka
   :long_name: Checkpoint 1