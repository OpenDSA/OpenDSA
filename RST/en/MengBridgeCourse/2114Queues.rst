.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino

Queues
======

Objectives
----------

Upon completion of this module, students will be able to:

* Name the function and purpose of basic Java data structures
* State key characteristics of Queues in Java
* Build and populate Queues in Java

Suggested Reading
~~~~~~~~~~~~~~~~~

Chapter 10: **Queues, Deques, and Priority Queues**  and  **Chapter 11: Queue, Deque, and Priority Queue Implementations** from `Data Structures and Abstractions with Java <https://www.amazon.com/Data-Structures-Abstractions-Java-4th/dp/0133744051/ref=sr_1_1?ie=UTF8&qid=1433699101&sr=8-1&keywords=Data+Structures+and+Abstractions+with+Java>`_ by Frank M. Carrano and Timothy Henry

.. _QueueIntro: 

Interactive: Introduction to Queues [8:50]
------------------------------------------

.. admonition:: Follow Along, Practice, and Explore

    Download to run and explore the java files (see below) from the video on your own in eclipse. You may download the standalone \*.java file for this example. 
    
    .. raw:: html
    
        <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/examples/QueueInterface.java"  target="_blank">
        <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/icons8-java60.png" width="32" height="32">
        QueueInterface.java</img>
        </a>
              
    .. code-block:: java
   
      package queue;
      
      /**
         An interface for the ADT queue.
         @author Frank M. Carrano
         @author Timothy M. Henry
         @version 4.0
      */
      public interface QueueInterface
      {
        /** Adds a new entry to the back of this queue.
            @param newEntry  An object to be added. */
        public void enqueue(T newEntry);
      
        /** Removes and returns the entry at the front of this queue.
            @return  The object at the front of the queue.
            @throws  EmptyQueueException if the queue is empty before the operation. */
        public T dequeue();
      
        /**  Retrieves the entry at the front of this queue.
            @return  The object at the front of the queue.
            @throws  EmptyQueueException if the queue is empty. */
        public T getFront();
      
        /** Detects whether this queue is empty.
            @return  True if the queue is empty, or false otherwise. */
        public boolean isEmpty();
      
        /** Removes all entries from this queue. */
        public void clear();
      } // end QueueInterface
   
   .. raw:: html
     
       <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/10.2.2.1-QueueIntro.pdf" target="_blank">
       <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
       Video Slides 10.2.2.1-QueueIntro.pdf</img>
       </a>   

.. raw:: html

     <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_1km1xhtz' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
     </center>

Checkpoint 1
------------

.. avembed:: Exercises/MengBridgeCourse/QueueCheckpoint1Summ.html ka
   :long_name: Checkpoint 1


Programming Practice: Queues 1
------------------------------

.. extrtoolembed:: 'Programming Practice: Queues 1'
   :workout_id: 1920

.. _QueueLinked: 

Interactive: Linked Queues Intro and Enqueue [11:29]
----------------------------------------------------

.. admonition:: Follow Along, Practice and Explore

   .. raw:: html

      <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/10.2.4.1-LinkedQueuesEnqueue.pdf" target="_blank">
         <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
         Video Slides 10.2.4.1-LinkedQueuesEnqueue.pdf</img>
         </a>
         
.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_nf3l8nvv' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>

Checkpoint 2
------------

.. avembed:: Exercises/MengBridgeCourse/QueueCheckpoint2Summ.html ka
   :long_name: Checkpoint 2

Interactive: Linked Queues Removing and More (Dequeue and Other Methods) [8:41]
-------------------------------------------------------------------------------
      
.. admonition:: Follow Along, Practice and Explore

    .. raw:: html

        <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/10.2.5.1-LinkedQueueRemove.pdf" target="_blank">
           <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
           Video Slides 10.2.5.1-LinkedQueueRemove.pdf</img>
           </a>

.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_5m4m3con' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
   </center>

Checkpoint 3
------------

.. avembed:: Exercises/MengBridgeCourse/QueueCheckpoint3Summ.html ka
   :long_name: Checkpoint 3

.. _QueueIntroDeque: 

Interactive: Introduction to Deque [13:51]
------------------------------------------

.. admonition:: Follow Along, Practice and Explore

    Download to run and explore the java files (see below) from the video on your own in eclipse. You may download the standalone \*.java file for this example. 

  .. raw:: html
        
        <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/examples/DequeInterface.java"  target="_blank">
        <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/icons8-java60.png" width="32" height="32">
        DequeInterface.java</img>
        </a>
        <br>
        <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/10.2.6.1-DequeIntro.pdf" target="_blank">
           <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
           Video Slides 10.2.6.1-DequeIntro.pdf</img>
           </a>
        
  .. code-block:: java
  
     package deque;
  
     /**
      * An interface for the ADT deque.
      *
      * @author Frank M. Carrano
      * @author Timothy M. Henry
      * @version 4.0
      * @param  generic type for the deque
      */
     public interface DequeInterface
     {
         /**
          * Adds a new entry to the front of this dequeue.
          *
          * @param newEntry
          *            An object to be added.
          */
         public void addToFront(T newEntry);
  
         /**
          * Adds a new entry to the back of this dequeue.
          *
          * @param newEntry
          *            An object to be added.
          */
         public void addToBack(T newEntry);
  
         /**
          * Removes and returns the front entry of this dequeue.
          *
          * @return The object at the front of the dequeue.
          * @throws EmptyDequeException
          *             if the dequeue is empty before the operation.
          */
         public T removeFront();
  
         /**
          * Removes and returns the back entry of this dequeue.
          *
          * @return The object at the back of the dequeue.
          * @throws EmptyDequeException
          *             if the dequeue is empty before the operation.
          */
         public T removeBack();
  
         /**
          * Retrieves the front entry of this dequeue.
          *
          * @return The object at the front of the dequeue.
          * @throws EmptyDequeException
          *             if the dequeue is empty before the operation.
          */
         public T getFront();
  
         /**
          * Retrieves the back entry of this dequeue.
          *
          * @return The object at the back of the dequeue.
          * @throws EmptyDequeException
          *             if the dequeue is empty before the operation.
          */
         public T getBack();
  
         /**
          * Detects whether this dequeue is empty.
          *
          * @return True if the queue is empty, or false otherwise.
          */
         public boolean isEmpty();
  
         /**
          * Removes all entries from this dequeue.
          */
         public void clear();
     } // end DequeInterface


  

.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_vj6hwbnk' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>

Checkpoint 4
------------

.. avembed:: Exercises/MengBridgeCourse/QueueCheckpoint4Summ.html ka
   :long_name: Checkpoint 4

Interactive: Deque Removing and Wrap Up [9:02]
----------------------------------------------
 
.. admonition:: Follow Along, Practice and Explore

   .. raw:: html

       <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/10.2.7.1-DequeRemoveAndWrapUp.pdf" target="_blank">
          <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
          Video Slides 10.2.7.1-DequeRemoveAndWrapUp.pdf</img>
          </a>
 
.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_c94y4y06' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>
    
Checkpoint 5
------------

.. avembed:: Exercises/MengBridgeCourse/QueueCheckpoint5Summ.html ka
   :long_name: Checkpoint 5

.. _QueueArray: 

Interactive: ArrayQueue: Array Implementation of Queues [11:08]
---------------------------------------------------------------

.. admonition:: Follow Along and Engage

   Download the slides corresponding to the videos. Take notes on them as you watch the video, practice drawing diagrams yourself!

  .. raw:: html
  
     <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/10.2.8.1-ArrayQueueIntro.pdf" target="_blank">
        <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
        Video Slides 10.2.8.1-ArrayQueueIntro.pdf</img>
        </a>


.. raw:: html

  <center>
  <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_no29pnf8' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
  </center>

  <center>
  <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_8fs30aor' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
  </center>
      

Checkpoint 6
------------

.. avembed:: Exercises/MengBridgeCourse/QueueCheckpoint6Summ.html ka
   :long_name: Checkpoint 6


Interactive: ArrayQueue: One Unused Location [7:11]
---------------------------------------------------

.. admonition:: Follow Along and Engage

   Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

  .. raw:: html
  
     <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/10.2.9.1-ArrayQueueRemove.pdf" target="_blank">
        <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
        Video Slides 10.2.9.1-ArrayQueueRemove.pdf</img>
        </a>


.. raw:: html

  <center>
  <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_299igb5h' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
  </center>

Checkpoint 7
------------

.. avembed:: Exercises/MengBridgeCourse/QueueCheckpoint7Summ.html ka
   :long_name: Checkpoint 7

Interactive: ArrayQueue: Ensure Capacity [14:06]
------------------------------------------------

.. admonition:: Follow Along and Engage

   Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

  .. raw:: html
  
     <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/10.2.10.2-ArrayQueueEnsureCapacity.pdf" target="_blank">
        <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
        Video Slides 10.2.10.2-ArrayQueueEnsureCapacity.pdf</img>
        </a>


.. raw:: html

  <center>
  <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_vykguc35' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
  </center>

Checkpoint 8
------------

.. avembed:: Exercises/MengBridgeCourse/QueueCheckpoint8Summ.html ka
   :long_name: Checkpoint 8

Interactive: ArrayQueue WrapUp [6:59]
-------------------------------------

.. admonition:: Follow Along and Engage

   Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

  .. raw:: html
  
     <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/10.2.11.1-ArrayQueueWrapUp.pdf" target="_blank">
        <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
        Video Slides 10.2.11.1-ArrayQueueWrapUp.pdf</img>
        </a>


.. raw:: html

  <center>
  <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_8ktqd0d5' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
  </center>


.. admonition:: Empty Queue Exception

    .. code-block:: java
    
        package queue;
    
        /**
        * A class of runtime exceptions thrown by methods to indicate that a queue is
        * empty.
        *
        * @author Frank M. Carrano
        * @author Timothy M. Henry
        * @version 4.0
        */
    
        public class EmptyQueueException extends RuntimeException {
            /**
             * serial Version UID
             */
            private static final long serialVersionUID = 960025440830878197L;
    
            public EmptyQueueException() {
                this(null);
            } // end default constructor
    
            public EmptyQueueException(String message) {
                super(message);
            } // end constructor
        } // end EmptyQueueException

Programming Practice: Queues 2
------------------------------

.. extrtoolembed:: 'Programming Practice: Queues 2'
   :workout_id: 1921
