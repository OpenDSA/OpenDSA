.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino

Lists
=====

Overview & Objectives
---------------------

Upon completion of this module, students will be able to:

* Distinguish properties and use cases for a list from other ADT(stack, queues, bags)
* Implement lists in java  using an Array-Based or Linked-Chain approach
* Consider various design approaches and corresponding efficiency
* Trace and debug list implementations

Suggested Reading:
~~~~~~~~~~~~~~~~~~

**Chapters 12 - 14: Lists, A List Implementation That Uses an Array, A List Implementation That Links Data** from `Data Structures and Abstractions with Java, 4th edition  by Frank M. Carrano and Timothy Henry <https://www.amazon.com/Data-Structures-Abstractions-Java-4th/dp/0133744051/ref=sr_1_1?ie=UTF8&qid=1433699101&sr=8-1&keywords=Data+Structures+and+Abstractions+with+Java>`_

.. raw:: html
    <a name="ListIntro">

Introduction to Lists [13:41]
-----------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html
   
      <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/11.1.2.1-ListIntro.pdf" target="_blank">
         <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" alt="" width="32" height="32">
         Video Slides 11.1.2.1-ListIntro.pdf</img>
         </a>

.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_756fc9vh' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Introduction to Lists"></iframe> 
   </center>
  
.. admonition:: The List Interface
   
     Download to run and explore the java files (see below) from the video on your own in eclipse. 
             
    .. raw:: html
        
        <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/examples/ListInterface.java"  target="_blank">
        <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/icons8-java60.png" alt=""  width="32" height="32">
        ListInterface.java</img>
        </a>
   
   
    .. code-block:: java
   
         package list;
   
         /**
         * An interface for the ADT list. Entries in a list have positions that begin
         * with 0
         * 
         * @author Frank M. Carrano
         * @author Timothy M. Henry
         * @author maellis1
         * @version July 2024
         */
         public interface ListInterface<T> {
            /**
            * Adds a new entry to the end of this list. Entries currently in the list
            * are unaffected. The list's size is increased by 1.
            * 
            * @param newEntry
            *            The object to be added as a new entry.
            */
            public void add(T newEntry);
   
            /**
            * Adds a new entry at a specified position within this list. Entries
            * originally at and above the specified position are at the next higher
            * position within the list. The list's size is increased by 1.
            * 
            * @param newPosition
            *            An integer that specifies the desired position of the new
            *            entry.
            * @param newEntry
            *            The object to be added as a new entry.
            * @throws IndexOutOfBoundsException
            *             if either newPosition less than 0 or newPosition greater than
            *             the size of the list.
            */
            public void add(int newPosition, T newEntry);
   
            /**
            * Removes the entry at a given position from this list. Entries originally
            * at positions higher than the given position are at the next lower
            * position within the list, and the list's size is decreased by 1.
            * 
            * @param givenPosition
            *            An integer that indicates the position of the entry to be
            *            removed.
            * @return A reference to the removed entry.
            * @throws IndexOutOfBoundsException
            *             if either givenPosition less than 0 or givenPosition greater
            *             than or equal to the size of the list.
            */
            public T remove(int givenPosition);
   
            /** Removes all entries from this list. */
            public void clear();
   
            /**
            * Replaces the entry at a given position in this list.
            * 
            * @param givenPosition
            *            An integer that indicates the position of the entry to be
            *            replaced.
            * @param newEntry
            *            The object that will replace the entry at the position
            *            givenPosition.
            * @return The original entry that was replaced.
            * @throws IndexOutOfBoundsException
            *             if either givenPosition less than 0 or givenPosition greater
            *             than or equal to the size of the list.
            */
            public T replace(int givenPosition, T newEntry);
   
            /**
            * Retrieves the entry at a given position in this list.
            * 
            * @param givenPosition
            *            An integer that indicates the position of the desired entry.
            * @return A reference to the indicated entry.
            * @throws IndexOutOfBoundsException
            *             if either givenPosition less than 0 or givenPosition greater
            *             than or equal to the size of the list.
            */
            public T getEntry(int givenPositi son);
   
            /**
            * Retrieves all entries that are in this list in the order in which they
            * occur in the list.
            * 
            * @return A newly allocated array of all the entries in the list. If the
            *         list is empty, the returned array is empty.
            */
            public Object[] toArray();
   
            /**
            * Sees whether this list contains a given entry.
            * 
            * @param anEntry
            *            The object that is the desired entry.
            * @return True if the list contains anEntry, or false if not.
            */
            public boolean contains(T anEntry);
   
            /**
            * Gets the length of this list.
            * 
            * @return The integer number of entries currently in the list.
            */
            public int getLength();
   
            /**
            * Sees whether this list is empty.
            * 
            * @return True if the list is empty, or false if not.
            */
            public boolean isEmpty();
         } // end ListInterface
   


Checkpoint 1
------------

.. avembed:: Exercises/MengBridgeCourse/ListsCheckpoint1Summ.html ka
   :long_name: Checkpoint 1

.. _ListAdd: 

Interactive: LinkedList Add() Implementation [10:21]
----------------------------------------------------
   
.. admonition:: Follow Along and Engage

   Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

  .. raw:: html
  
     <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/11.1.3.1-LinkedListAdd.pdf" target="_blank">
        <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" alt="" width="32" height="32">
        Video Slides 11.1.3.1-LinkedListAdd.pdf</img>
        </a>


.. raw:: html

  <center>
  <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_ie408z9b' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="LinkedList Add method Implementation"></iframe> 
  </center>
      
Checkpoint 2
------------

.. avembed:: Exercises/MengBridgeCourse/ListsCheckpoint2Summ.html ka
   :long_name: Checkpoint 2

Interactive: Tracing Add() with Debugger [13:33]
------------------------------------------------
   
.. admonition:: Follow Along and Engage

   Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

  .. raw:: html
  
     <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/11.1.4.1-TraceAddDebugger.pdf" target="_blank">
        <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" alt="" width="32" height="32">
        Video Slides 11.1.4.1-TraceAddDebugger.pdf</img>
        </a>


.. raw:: html

  <center>
  <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_g1bdzwhy' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Tracing Add method with Debugger"></iframe> 
  </center>
   

.. _ListRemove:
      
Interactive: LinkedList Remove() [18:09]
----------------------------------------

.. admonition:: Follow Along, Practice and Explore
  
    In Eclipse, use the *Project > Download Assignment...* menu command to download the exercise project named "ex11.01-LinkedList". 
    
    Refer to `01.02: Lab: LightBot for Beginners <https://profdev-lms.tlos.vt.edu/courses/2832/assignments/10634>`_ if you need to review the instructions for downloading Eclipse projects.


    .. raw:: html
    
        <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/11.1.5.1-LinkedListRemove.pdf" target="_blank">
           <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" alt="" width="32" height="32">
           Video Slides 11.1.5.1-LinkedListRemove.pdf</img>
           </a>


.. raw:: html

  <center>
  <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_m5thdypn' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="LinkedList Remove method"></iframe> 
  </center>

Checkpoint 3
------------

.. avembed:: Exercises/MengBridgeCourse/ListsCheckpoint3Summ.html ka
   :long_name: Checkpoint 3

Programming Practice: Lists 1
-----------------------------

.. extrtoolembed:: 'Programming Practice: Lists 1'
   :workout_id: 1922

.. _ListOptions:

Interactive: LinkedList Details and Options [10:19]
---------------------------------------------------
   
.. admonition:: Follow Along and Engage

   Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

  .. raw:: html
  
     <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/11.1.7.1-LinkedListMoreDetails.pdf" target="_blank">
        <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" alt="" width="32" height="32">
        Video Slides 11.1.7.1-LinkedListMoreDetails.pdf</img>
        </a>

.. raw:: html

  <center>
  <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_a1ubm9cw' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="LinkedList Details and Options"></iframe> 
  </center>

Checkpoint 4
------------

.. avembed:: Exercises/MengBridgeCourse/ListsCheckpoint4Summ.html ka
   :long_name: Checkpoint 4

.. _ListArray:

Interactive: An Array Implementation of a List [15:48] 
------------------------------------------------------
   
.. admonition:: Follow Along and Engage

   Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!


  .. raw:: html
  
     <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/11.1.8.1-ArrayListImplementation.pdf" target="_blank">
        <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" alt="" width="32" height="32">
        Video Slides 11.1.8.1-ArrayListImplementation.pdf</img>
        </a>


.. raw:: html

  <center>
  <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_w004gjwr' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="An Array Implementation of a List"></iframe> 
  </center>

Programming Practice: Lists 2
-----------------------------

.. extrtoolembed:: 'Programming Practice: Lists 2'
   :workout_id: 1923

