.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino

Iterators
=========

Objectives
----------

Upon completion of this module, students will be able to:

* Describe the purpose and use of an Iterator
* Implement Iterators using the Iterator and Iterable Interfaces
* Design and develop algorithms that use Iterators and Iterator methods

Suggested Reading
~~~~~~~~~~~~~~~~~

Java Interlude 5 Iterators from `Data Structures and Abstractions with Java, 4th edition  by Frank M. Carrano and Timothy Henry <https://www.amazon.com/Data-Structures-Abstractions-Java-4th/dp/0133744051/ref=sr_1_1?ie=UTF8&qid=1433699101&sr=8-1&keywords=Data+Structures+and+Abstractions+with+Java>`_

.. _IteratorIntro: 

Introduction to Iterators [13:14]
---------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html
   
      <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/11.3.2.1-IntroToIterators.pdf" target="_blank">
         <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" alt="" width="32" height="32">
         Video Slides 11.3.2.1-IntroToIterators.pdf</img>
         </a>


.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_8c0mzbfl' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Introduction to Iterators"></iframe> 
   </center>

Checkpoint 1
------------

.. avembed:: Exercises/MengBridgeCourse/IteratorsCheckpoint1Summ.html ka
   :long_name: Checkpoint 1

.. _IteratorInterface: 
   
   
Programming Using the Iterable Interface [4:36]
-----------------------------------------------

.. admonition:: Follow Along and Engage

   Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

  .. raw:: html
  
     <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/11.3.3.1-Iterable.pdf" target="_blank">
        <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" alt="" width="32" height="32">
        Video Slides 11.3.3.1-Iterable.pdf</img>
        </a>


.. raw:: html

  <center>
  <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_eqvj3pre' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Programming Using the Iterable Interface"></iframe> 
  </center>

Checkpoint 2
------------

.. avembed:: Exercises/MengBridgeCourse/IteratorsCheckpoint2Summ.html ka
   :long_name: Checkpoint 2

.. _IteratorProg: 
   
Programming Using Iterators [18:02]
-----------------------------------

.. admonition:: Follow Along and Engage

   Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

  .. raw:: html
  
     <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/11.3.4.1-ProgrammingWithIterators.pdf" target="_blank">
        <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" alt="" width="32" height="32">
        Video Slides 11.3.4.1-ProgrammingWithIterators.pdf</img>
        </a>

.. raw:: html

  <center>
  <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_qzq8us2t' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Programming Using Iterators"></iframe> 
  </center>
  
Checkpoint 3
------------

.. avembed:: Exercises/MengBridgeCourse/IteratorsCheckpoint3Summ.html ka
   :long_name: Checkpoint 3

.. _IteratorDesign: 
   
Iterator Design Decisions [8:21]
--------------------------------

.. admonition:: Follow Along and Engage

   Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

  .. raw:: html
  
     <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/11.3.5.1-IteratorsDesignConsiderations.pdf" target="_blank">
        <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" alt="" width="32" height="32">
        Video Slides 11.3.5.1-IteratorsDesignConsiderations.pdf</img>
        </a>


.. raw:: html

  <center>
  <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_suuo9vaf' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Iterator Design Decisions"></iframe> 
  </center>


.. admonition:: Clarification

   Iterators that are a nested class inside the linked structure (not subclasses) are more efficient than Iterators that are independent classes.

.. _IteratorInner: 

Inner Iterator for ex11.3-Iterator
----------------------------------

As discussed throughout this section there are various design approaches for
iterators.  Below is one example of how an inner Iterator class could be
implemented for ex11.3-Iterator.

Include a public method to make the iterator object available:

.. code-block:: java

   /**
   * Iterator method creates Iterator object
   *
   * @return new Iterator object
   */
   public Iterator<T> iterator()
   {
      return new LListIterator<T>();
   }


Include an inner Iterator class.  This version does not provide remove
functionality as it is complicated with a singly linked list to keep track of
the previous nodes in order to remove the current node.

.. code-block:: java


   private class LListIterator<A> implements Iterator<T>
   {
        private Node next;
        private boolean newCurr;

        /**
        * Creates a new DLListIterator
        */
        public LListIterator()
        {
          next = firstNode;
          newCurr = false;
        }

        /**
        * Checks if there are more elements in the list
        *
        * @return true if there are more elements in the list
        */
        @Override
        public boolean hasNext()
        {
          return (next != null);
        }

        /**
        * Gets the next value in the list
        *
        * @return the next value
        * @throws NoSuchElementException
        *             if there are no nodes left in the list
        */
        @Override
        public T next()
        {
          if (next == null)
          {
            throw new NoSuchElementException("No nodes left in the list.");
          }
          T value = next.data;
          next = next.getNext();
          newCurr = true;
          return value;
        }
   }


A version of an inner Iterator class which does provide remove functionality.
It is best to only provide remove functionality through either the data
structure or the iterator in order to avoid unintended side effects.

.. code-block:: java


   private class LListIterator<A> implements Iterator<T>
    {
        private Node prev;
        private Node curr;
        private Node next;
        private boolean newCurr;

        /**
        * Creates a new DLListIterator
        */
        public LListIterator()
        {
            prev = null;
            curr = null;
            next = firstNode;
            newCurr = false;
        }

        /**
        * Checks if there are more elements in the list
        *
        * @return true if there are more elements in the list
        */
        @Override
        public boolean hasNext()
        {
            return (next != null);
        }

        /**
        * Gets the next value in the list
        *
        * @return the next value
        * @throws NoSuchElementException
        *             if there are no nodes left in the list
        */
        @Override
        public T next()
        {
            prev = curr;
            curr = next;
            next = next.getNext();
            if (curr == null)
            {
                throw new NoSuchElementException("No nodes left in the list.");
            }
            newCurr = true;
            return curr.data;
        }

       /**
        * Removes the last object returned with next() from the list
        *
        * @throws IllegalStateException
        *             if next has not been called yet
        *             and if the element has already been removed
        */
        @Override
        public void remove()
        {
            if (next == firstNode)
            {
                throw new IllegalStateException(
                     "Next has not been called yet.");
            }
            else if (!newCurr)
            {
                throw new IllegalStateException(
                     "The Element has already been removed.");
            }
            else if (curr == firstNode) {
                firstNode = next;
                curr = null;
            } else {
                prev.setNext(curr.getNext());
                curr = prev;
                 //this code that updates prev is not necessary
                 //because next() must be called before another remove()
                 //and that will update prev, saving this O(n) operation
                 //prev = firstNode;
                 //while ((prev != null) && (prev.getNext() != curr)){
                 //    prev = prev.getNext();
                 //}
            }
            numberOfEntries--;
            newCurr = false;
        }
    }

Programming Practice: Iterators
-------------------------------

.. extrtoolembed:: 'Programming Practice: Iterators'
   :workout_id: 1924
