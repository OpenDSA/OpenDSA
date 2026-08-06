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
        <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/icons8-java60.png" alt=""  width="32" height="32">
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
       <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" alt="" width="32" height="32">
       Video Slides 10.2.2.1-QueueIntro.pdf</img>
       </a>   

.. raw:: html

   <div style="position: relative; width: 100%; height: 0; padding-bottom: 38%">
     <iframe src="https://virginiatech.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=7f04d504-60c4-4c5a-b52e-b41d0176174e&autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=false&interactivity=all" style="border: 1px solid #464646; position: absolute; top: 0; left: 0; width: 960px; height: 395px; box-sizing: border-box;" allowfullscreen allow="autoplay" aria-label="Introduction to Queues" aria-description="Introduction to Queues"></iframe>
  </div>

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
         <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" alt="" width="32" height="32">
         Video Slides 10.2.4.1-LinkedQueuesEnqueue.pdf</img>
         </a>
         
.. raw:: html

   <div style="position: relative; width: 100%; height: 0; padding-bottom: 38%">
     <iframe src="https://virginiatech.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=7ec0a091-58ba-4a65-90e0-b404005a6af1&autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=false&interactivity=all" style="border: 1px solid #464646; position: absolute; top: 0; left: 0; width: 960px; height: 395px; box-sizing: border-box;" allowfullscreen allow="autoplay" aria-label="Linked Queues Intro and Enqueue" aria-description="Linked Queues Intro and Enqueue"></iframe>
  </div>

Checkpoint 2
------------

.. avembed:: Exercises/MengBridgeCourse/QueueCheckpoint2Summ.html ka
   :long_name: Checkpoint 2

Interactive: Linked Queues Removing and More (Dequeue and Other Methods) [8:41]
-------------------------------------------------------------------------------
      
.. admonition:: Follow Along, Practice and Explore

    .. raw:: html

        <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/10.2.5.1-LinkedQueueRemove.pdf" target="_blank">
           <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" alt="" width="32" height="32">
           Video Slides 10.2.5.1-LinkedQueueRemove.pdf</img>
           </a>

.. raw:: html

   <div style="position: relative; width: 100%; height: 0; padding-bottom: 38%">
     <iframe src="https://virginiatech.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=ec77a709-1c31-4d98-9cad-b423010e7661&autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=false&interactivity=all" style="border: 1px solid #464646; position: absolute; top: 0; left: 0; width: 960px; height: 395px; box-sizing: border-box;" allowfullscreen allow="autoplay" aria-label="Linked Queues Removing and More" aria-description="Linked Queues Removing and More"></iframe>
  </div>

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
        <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/icons8-java60.png" alt=""  width="32" height="32">
        DequeInterface.java</img>
        </a>
        <br>
        <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/10.2.6.1-DequeIntro.pdf" target="_blank">
           <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" alt="" width="32" height="32">
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

   <div style="position: relative; width: 100%; height: 0; padding-bottom: 38%">
     <iframe src="https://virginiatech.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=0091965a-230e-474a-8be2-b4010063d7ca&autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=false&interactivity=all" style="border: 1px solid #464646; position: absolute; top: 0; left: 0; width: 960px; height: 395px; box-sizing: border-box;" allowfullscreen allow="autoplay" aria-label="Introduction to Deque" aria-description="Introduction to Deque"></iframe>
  </div>

Checkpoint 4
------------

.. avembed:: Exercises/MengBridgeCourse/QueueCheckpoint4Summ.html ka
   :long_name: Checkpoint 4

Interactive: Deque Removing and Wrap Up [9:02]
----------------------------------------------
 
.. admonition:: Follow Along, Practice and Explore

   .. raw:: html

       <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/10.2.7.1-DequeRemoveAndWrapUp.pdf" target="_blank">
          <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" alt="" width="32" height="32">
          Video Slides 10.2.7.1-DequeRemoveAndWrapUp.pdf</img>
          </a>
 
.. raw:: html

   <div style="position: relative; width: 100%; height: 0; padding-bottom: 38%">
     <iframe src="https://virginiatech.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=72267ace-a344-41ac-9b2c-b41000e960f0&autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=false&interactivity=all" style="border: 1px solid #464646; position: absolute; top: 0; left: 0; width: 960px; height: 395px; box-sizing: border-box;" allowfullscreen allow="autoplay" aria-label="Deque Removing and Wrap Up" aria-description="Deque Removing and Wrap Up"></iframe>
  </div>
    
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
        <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" alt="" width="32" height="32">
        Video Slides 10.2.8.1-ArrayQueueIntro.pdf</img>
        </a>


.. raw:: html

   <div style="position: relative; width: 100%; height: 0; padding-bottom: 38%">
     <iframe src="https://virginiatech.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=6234bbf0-a26a-4206-8c14-b41a00526c34&autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=false&interactivity=all" style="border: 1px solid #464646; position: absolute; top: 0; left: 0; width: 960px; height: 395px; box-sizing: border-box;" allowfullscreen allow="autoplay" aria-label="ArrayQueue: Array Implementation of Queues 1" aria-description="ArrayQueue: Array Implementation of Queues 1"></iframe>
  </div>
  <p/>
   <div style="position: relative; width: 100%; height: 0; padding-bottom: 38%">
       <iframe src="https://virginiatech.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=41ce4beb-a567-446b-a9c0-b413014a26f7&autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=false&interactivity=all" style="border: 1px solid #464646; position: absolute; top: 0; left: 0; width: 960px; height: 395px; box-sizing: border-box;" allowfullscreen allow="autoplay" aria-label="ArrayQueue: Array Implementation of Queues 2" aria-description="ArrayQueue: Array Implementation of Queues 2"></iframe>
    </div>

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
        <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" alt="" width="32" height="32">
        Video Slides 10.2.9.1-ArrayQueueRemove.pdf</img>
        </a>


.. raw:: html

   <div style="position: relative; width: 100%; height: 0; padding-bottom: 38%">
     <iframe src="https://virginiatech.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=e34572fa-1bf7-4c55-97a9-b426017c6e62&autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=false&interactivity=all" style="border: 1px solid #464646; position: absolute; top: 0; left: 0; width: 960px; height: 395px; box-sizing: border-box;" allowfullscreen allow="autoplay" aria-label="ArrayQueue: One Unused Location" aria-description="ArrayQueue: One Unused Location"></iframe>
  </div>

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
        <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" alt="" width="32" height="32">
        Video Slides 10.2.10.2-ArrayQueueEnsureCapacity.pdf</img>
        </a>


.. raw:: html

   <div style="position: relative; width: 100%; height: 0; padding-bottom: 38%">
     <iframe src="https://virginiatech.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=3946310a-52fe-402f-8b28-b4030189cd1b&autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=false&interactivity=all" style="border: 1px solid #464646; position: absolute; top: 0; left: 0; width: 960px; height: 395px; box-sizing: border-box;" allowfullscreen allow="autoplay" aria-label="ArrayQueue: Ensure Capacity" aria-description="ArrayQueue: Ensure Capacity"></iframe>
  </div>

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
        <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" alt="" width="32" height="32">
        Video Slides 10.2.11.1-ArrayQueueWrapUp.pdf</img>
        </a>


.. raw:: html

   <div style="position: relative; width: 100%; height: 0; padding-bottom: 38%">
     <iframe src="https://virginiatech.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=a2df4eca-c2ef-471b-be6e-b40300a7bf0b&autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=false&interactivity=all" style="border: 1px solid #464646; position: absolute; top: 0; left: 0; width: 960px; height: 395px; box-sizing: border-box;" allowfullscreen allow="autoplay" aria-label="ArrayQueue WrapUp" aria-description="ArrayQueue WrapUp"></iframe>
  </div>

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


