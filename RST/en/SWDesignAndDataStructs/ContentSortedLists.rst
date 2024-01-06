.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.
.. TODO Verify the last couple sections. Does this mean Margaret needs to look through this page? Or all modules hereafter? or is this for bob

.. avmetadata::
   :author: Molly

Sorted Lists
============

Shortcuts
---------

- :ref:`SortListIntro`
- :ref:`SortListADT`
- :ref:`SortListInterface`
- :ref:`SortListImp`
- :ref:`SortListImpScratch`
- :ref:`SortListImpComposition`
- :ref:`SortListImpInheritance`

 
Objectives
----------

* Distinguish between Ordered vs Sorted Order
* Describe the differences between a List ADT and a Sorted List ADT
* Implement and use a Sorted List ADT
* add objectives from other canvas pages as needed

Suggested Reading:
~~~~~~~~~~~~~~~~~~

- Chapter 16 Sorted Lists from `Data Structures and Abstractions with Java, 4th edition  by Frank M. Carrano and Timothy Henry <https://www.amazon.com/Data-Structures-Abstractions-Java-4th/dp/0133744051/ref=sr_1_1?ie=UTF8&qid=1433699101&sr=8-1&keywords=Data+Structures+and+Abstractions+with+Java>`_

- `Java documentation on Lists <https://docs.oracle.com/javase/7/docs/api/java/util/List.html>`_

.. _SortListIntro:

Thinking about Order vs Sorted Order
-------------------------------------
    
Consider the various data structures discussed so far.  Each of these data structures offer a number of characteristics, attributes (fields), and behaviors (operations or methods), and ways of arranging and interacting with stored data. 
    
A given data structure may, at times, be found to be appropriate for use in certain applications, usually because it offers features which support the implementation and functioning of that specific application’s requirements.  
    
At other times a given Data Structure may be thought to be inappropriate for use in a given application, possibly because it provides features that are unnecessary, restrictive, unhelpful, and not supportive with respect to the requirements and functioning of the software application. 
    
We may recall, for example, that ``Bags`` are useful in applications where order doesn't matter, i.e. where the order of the data stored within the structure is of no concern with respect to the needs of the application and the functioning of the system.
    
``Bags`` are, by their very nature, unordered.
    
However, there are some applications where maintaining order, or more specifically maintaining *sorted* order, is very important.  It is important to note our deliberate distinction of **Order** vs **Sorted Order**.



Interactive: Introduction to Sorted Lists
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. admonition:: Follow Along, Practice and Explore

    Download to explore the interface files (see below) from the video on your own. Also follow allong with the slides from the video.
    
   .. raw:: html

      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/examples/ListInterface.java"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/icons8-java60.png" width="32" height="32">
      ListInterface.java</img>
      </a>
      <br>
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/examples/SortedListInterface.java"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/icons8-java60.png" width="32" height="32">
      SortedListInterface.java</img>
      </a>
      <br>
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/SortedListsOrderVsSorted.pdf"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" width="32" height="32">
      SortedListsOrderVsSorted.pdf</img>
      </a>



.. raw:: html

   <center>
       <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_lw5tazyu' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>



 
.. _SortListADT:

List ADTs
---------
Lists are considered to be an “ordered collection” of elements or Objects, also known as a sequence of elements.

This means that client code can access elements from a List via their integer index or “position” in the List.  The elements of the List are said to be ordered by this index or “position”.

While the elements of the collection are considered to have a specific order, the ordering of these List elements are NOT based on the element’s value, rather their index.  

Lists are not necessarily in Sorted Order, for example a list of numbers may be 7,22,-45,89.

 

Sorted List ADT
~~~~~~~~~~~~~~~
A Sorted List is therefore a collection of elements or Objects in sorted order, where 

- the ordering of elements is based on something related to the element’s value or the Object’s “state” (When referring to an Object’s state we mean the values of each of its fields)
- each element is of the same type (through inheritance and polymorphism a List could be used to facilitate some combination of comparable types)

An example of a Sorted List could be a List of names, stored as Strings arranged in alphabetical order.  In computing we often refer to this as lexicographic or lexical order.

Just like Lists and many other data structures, it would be necessary to implement methods that enable client code to add new elements, remove elements, and track and manage the number of elements in the Sorted List.  As you progress through this module you will explore the similarities and differences between Lists and Sorted Lists and their implementations. 





.. _SortListInterface:

Sorted ListInterface
---------------------

Notice how the SortedListInterface UML only contains one add method and no replace method.


.. odsafig:: Images/ListInterface.png
   :align: center
   :alt: ListInterface UML. 

.. odsafig:: Images/SortedListInterface.png
   :align: center
   :alt: SortedListInterface UML. 

.. admonition:: Follow Along, Practice and Explore

    Download to run and explore the corresponding project from the video on your own in eclipse. The project CS-GraphWindowLib is required for the sample project.  It is also used in your course projects. To download the CS-GraphWindowLib you must first complete the configuration steps for your first lab. You will then be able to download it via eclipse using the blue down arrow icon or using the Project Menu and selecting "Download Assignment..."

   .. raw:: html


      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/examples/eclipse/exSortedLists.zip"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/icons8-java60.png" width="32" height="32">
    exSortedLists.zip</img>
      </a>


.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_jhdza823' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
   </center>


Checkpoint 1
------------

.. avembed:: Exercises/SWDesignAndDataStructs/SortedListsCheckpoint1Summ.html ka
   :long_name: Checkpoint 1



.. _SortListImp:

Sorted List ADT Implementation Approaches
-----------------------------------------

In many ways we can conceptually think about the SortedList ADT as a List ADT with modified characteristics and additional “Sort” logic.  Reflecting upon the List ADT implementation would therefore help us consider various approaches to implementing a SortedList ADT.

Additionally List ADT implementations and SortedList ADT implementations tend to be very similar, providing opportunities for code reuse.  

In fact careful consideration and comparison of the intended behaviors of certain List ADT methods and SortedList ADT methods would reveal that a number of them share the same behavior and can therefore be implemented in the exact same way. For example ``getEntry(givenPosition)``, ``getLength()``, ``isEmpty()``, and ``toArray()`` are but a few of the methods whose implementations are the same for both a List ADT implementation and a SortedList ADT implementation.  

On the other hand, there are List ADT methods that may share the same name as their SortedList ADT counterparts but behave differently.  

The ``add(newEntry)`` method is one ListADT method that needs significant modification before it can function as a SortedList ADT ``add(newEntry)`` method. While the ``add(newEntry)`` method for the List ADT simply added the newEntry into the next available list location the ``add(newEntry)`` method for the SortedList ADT must instead locate an appropriate location for the newEntry being added, one that preserves the sorted order.

There are various design approaches to implementing a SortedList ADT, such as: write it from scratch, use composition, use inheritance.
 

Write it from scratch
~~~~~~~~~~~~~~~~~~~~~ 

One way of implementing a SortedList ADT is to simply write it from scratch.  We are already familiar with the List ADT implementation and we can draw from that experience to implement the SortedList ADT.  Due to the similarities between the two ADTs we would be able to write most of the methods the same way as for any list. A few specific methods would need to be written differently to ensure that sorted order is preserved, i.e. the list stays in sorted  throughout its life and the execution of its methods.

When choosing to write from scratch we have two further choices.  Similar to implementing a List ADT we can choose to use one of the following:

* use an array implementation
* use a linked implementation
 

Implement using Composition (Wrapper) 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This approach uses a List ADT implementation to support the implementation of the SortedList ADT.  In this implementation approach the Sorted list makes use of an instance of the List ADT (it has-a list, hence the use of the term Composition), this List ADT instance is set up as a field of SortedList, SortedList then acts as client code, calling and managing the use of the list methods in service of SortedList operations.  This will be elaborated upon in further detail later on in the module. 

 

Implement using Inheritance
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This approach also uses a List ADT implementation to support the implementation of the SortedList ADT, this time through an is-a or inheritance relationship.  

Since we can think of a SortedList as a List with modified characteristics and additional “Sort” logic we can therefore conclude that a SortedList is-a List, thus deriving the benefits of inheritance.  The List becomes a parent class, while the SortedList becomes a child of List, inheriting methods from the parent class.  Since some SortedList methods must behave differently when compared against their List ADT counterparts we must override these methods when defining the SortedList class. Specifically we must override any methods that do not serve to preserve sorted order. For example methods like add(int newPosition, T newEntry) and replace(givenPosition,newEntry) offer client code control over the positioning of newEntries, this is not appropriate as this could affect the sorted order of the SortedList.  The add(newEntry) method would also need to be modified.  Further the SortedList would require features not present within the List, requiring us to add these new methods, examples of such include the SortedList ADT methods remove(anEntry) and getPosition(anEntry).



.. _SortListImpScratch:

Implementing a Sorted List ADT from Scratch
-------------------------------------------

Implementing a Sorted List ADT with an Underlying Array
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_unitfyqf' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
   </center>


Implementing a Sorted List ADT with an Underlying Linked Chain
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html

      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/LinkedImplementationofSortedList.pdf"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" width="32" height="32">
     LinkedImplementationofSortedList.pdf</img>
      </a>



.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_lm7pijos' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
   </center>


   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_2h8sliry' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
   </center>



Reflecting upon Efficiencies
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The worst case-efficiencies of the operations on the ADT List and ADT Sorted List have been provided below for both the Array-Based and Linked implementations.  Review each table, note the similarities and differences, then consider how implementation details could affect the efficiencies of the various methods.

The table below depicts the worst-case efficiencies of the operations on the ADT sorted list for two implementations

.. odsafig:: Images/Figure16-5ListOpEfficiency.png
   :align: center
   :alt: The worst-case efficiencies of the operations on the sorted list ADT for two implementations. Shows that most operations on an sorted list are Big-O (n), regardless of implementation, while location based are constant time. 

   The worst-case efficiencies of the operations on the sorted list ADT for two implementations (credit: FIGURE 16-5 from course text: Carrano & Henry. Data Structures & Abstractions with Java)

Consider, for example, the new SortedList ADT method getPosition(…).  

The ``getPosition(…)`` method receives anEntry as a parameter, then searches the entire list to locate the position of anEntry within the list.  In its most basic implementation the ``getPosition(...)`` method uses a linear search to locate anEntry within the list, with the content of each position within the list compared against anEntry until either anEntry is found or all positions checked.  

Upon finding anEntry the method returns the integer position of the first or only occurrence of anEntry within the list.  If the search does not find anEntry within the list the method then returns an integer whose value indicates that anEntry was not found within the list.  There are many ways to set this value to indicate anEntry was not found, some developers return an invalid position, for example -1, as a flag to indicate an unsuccessful search.   Others may choose instead to return a value greater than the number of entries in the list, while some favor returning the position where anEntry would occur in the list if present, but as a negative integer.

Not that the current efficiency of that method is $O(n)$ for both an Array-based and Linked implementation. This is to be expected, since the list has n elements, then a linear search of the list for anEntry would naturally require all n elements to be checked.  

However this is not the most efficient option.  The efficiency of this method could be improved by using the fact that the SortedList is in sorted order. Instead of traversing the entire list in search of anEntry the method could stop the search once past where the element should be, if the search encounters an element greater than anEntry before finding anEntry then the method can determine that anEntry is not in the list. The ``getPosition()`` method can be further improved by using a binary search instead of a linear search.  

.. _SortListImpComposition:

Implementing a Sorted List ADT Using Composition
------------------------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html

      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/ImplementationUsingComposition.pdf"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" width="32" height="32">
      ImplementationUsingComposition.pdf</img>
      </a>


.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_nux4c057' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
   </center>

Efficiency of the Composition Approach
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


The worst case-efficiencies of the operations on the ADT List and ADT Sorted List have been provided below for the Composition implementations.  Review each table, note the similarities and differences, then consider how implementation details could affect the efficiencies of the various methods.  Note how the worst-case efficiencies for the Linked SortedList Composition approach depicted in Figure 16-9 is significantly different from the write-from-scratch SortedList approach depicted in Figure 16-5.

The table below depicts the worst-case efficiencies of the ADT sorted list operations when implemented using an instance of the ADT list

.. odsafig:: Images/Figure16-9WrapperSortedListOpEfficiency.png
   :align: center
   
   (credit FIGURE 16-9 from course text: Carrano & Henry. Data Structures & Abstractions with Java)

The table below depicts the worst-case efficiencies of the ADT sorted list operations when implemented using an array or linked chain as a comparision to the composition implementation.

.. odsafig:: Images/Figure16-5ListOpEfficiency.png
   :align: center

   (credit FIGURE 16-5 from course text: Carrano & Henry. Data Structures & Abstractions with Java).

.. _SortListImpInheritance:

Implementing a Sorted List ADT Using Inheritance
------------------------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html

      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/ImplementationUsingInheritance.pdf"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" width="32" height="32">
      ImplementationUsingInheritance.pdf</img>
      </a>

.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_qc6bdmjj' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
   </center>

Checkpoint 2
------------

.. avembed:: Exercises/SWDesignAndDataStructs/SortedListsCheckpoint2Summ.html ka
   :long_name: Checkpoint 2
