.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino

Stacks
======

Objectives
----------

Upon completion of this module, students will be able to:

* Describe the Stack Abstract Data Type/Data Structure and the characteristics of a Stack
* Implement Stacks in Java using an Array-Based or Linked-Chain approach
* Develop and use Stack methods
* Test the functionality of Stack
* Evaluate a range of applications / use cases to determine if use of the Stack Data Structure is appropriate

Suggested Reading
~~~~~~~~~~~~~~~~~

Chapters 5 - 6 Bags from  `Data Structures and Abstractions with Java, 4th edition  by Frank M. Carrano and Timothy Henry <https://www.amazon.com/Data-Structures-Abstractions-Java-4th/dp/0133744051/ref=sr_1_1?ie=UTF8&qid=1433699101&sr=8-1&keywords=Data+Structures+and+Abstractions+with+Java>`_

.. _StacksIntro: 

Interactive: Introduction to Stacks
-------------------------------------------

.. admonition:: The Stack Interface

    .. raw:: html
    
        <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/examples/StackInterface.java" target="_blank">
        <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/icons8-java60.png" width="32" height="32">
        StackInterface.java</img></a>
    
   .. code-block:: java
   
      package stack;
      
      /**
       * An interface for the ADT stack.
       * 
       * @author Frank M. Carrano
       * @author Timothy M. Henry
       * @author maellis1
       * @version May 2020 
       */
      public interface StackInterface<T> {
          /**
           * Adds a new entry to the top of this stack.
           * 
           * @param newEntry
           *            An object to be added to the stack.
           */
          public void push(T newEntry);
      
          /**
           * Removes and returns this stack's top entry.
           * 
           * @return The object at the top of the stack.
           * @throws stack.EmptyStackException
           *             if the stack is empty before the operation.
           */
          public T pop();
      
          /**
           * Retrieves this stack's top entry.
           * 
           * @return The object at the top of the stack.
           * @throws stack.EmptyStackException
           *             if the stack is empty.
           */
          public T peek();
      
          /**
           * Detects whether this stack is empty.
           * 
           * @return True if the stack is empty.
           */
          public boolean isEmpty();
      
          /** Removes all entries from this stack. */
          public void clear();
      } // end StackInterface
     
  
.. admonition:: Follow Along and Engage
      
    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!
    
    .. raw:: html
    
        <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/StacksIntro.pdf"  target="_blank">
        <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" width="32" height="32">
        StacksIntro.pdf</img>
        </a>


.. raw:: html

     <center>
     <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_2th5gshg' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
     </center>

Checkpoint 1
------------

.. avembed:: Exercises/SWDesignAndDataStructs/StacksCheckpoint1Summ.html ka
   :long_name: Checkpoint 1

.. _StacksMemory: 

Interactive: Stack Memory Example
----------------------------------------

.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_0ahaxauj' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>

Checkpoint 2
------------

.. avembed:: Exercises/SWDesignAndDataStructs/StacksCheckpoint2Summ.html ka
   :long_name: Checkpoint 2


.. _StacksArrayBased: 

Stacks Array-Based Design
--------------------------------

.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_zvh51gzm' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>

Checkpoint 3
------------

.. avembed:: Exercises/SWDesignAndDataStructs/StacksCheckpoint3Summ.html ka
   :long_name: Checkpoint 3

.. _StacksArrayImpl: 

Stacks Array Implementation
----------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html
   
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/StacksArrayImplementation.pdf"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" width="32" height="32">
      StacksArrayImplementation.pdf</img>
      </a>


.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_k40xld68' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
   </center>
   
.. _StacksChainImpl:   

Stacks Linked Chain Implementation
-----------------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html
   
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/StacksLinkedChainImplementation.pdf"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" width="32" height="32">
      StacksLinkedChainImplementation.pdf</img>
      </a>
      <br>
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/TestingStacks.pdf"  target="_blank">
        <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" width="32" height="32">
        TestingStacks.pdf</img>
      </a>


.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_miuoo412' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
   </center>

Checkpoint 4
------------

.. avembed:: Exercises/SWDesignAndDataStructs/StacksCheckpoint4Summ.html ka
   :long_name: Checkpoint 4


Programming Practice: LinkedStacks
----------------------------------

.. extrtoolembed:: 'Programming Practice: LinkedStacks'
   :workout_id: 1912
