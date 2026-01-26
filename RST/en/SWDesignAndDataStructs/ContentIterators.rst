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
* Use Scanner for File I/O

Suggested Reading
~~~~~~~~~~~~~~~~~

Java Interlude 5 Iterators from `Data Structures and Abstractions with Java, 4th edition  by Frank M. Carrano and Timothy Henry <https://www.amazon.com/Data-Structures-Abstractions-Java-4th/dp/0133744051/ref=sr_1_1?ie=UTF8&qid=1433699101&sr=8-1&keywords=Data+Structures+and+Abstractions+with+Java>`_

.. _IteratorIntro: 

Introduction to Iterators 
---------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html
   
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/IntroToIterators.pdf"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" alt="" width="32" height="32">
      IntroToIterators.pdf</img>
      </a>


.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_8c0mzbfl' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Introduction to Iterators"></iframe> 
   </center>

Checkpoint 1
------------

.. avembed:: Exercises/SWDesignAndDataStructs/IteratorsCheckpoint1Summ.html ka
   :long_name: Checkpoint 1

.. _IteratorInterface: 


Programming Using the Iterable Interface 
-----------------------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html
   
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/Iterable.pdf"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" alt="" width="32" height="32">
      Iterable.pdf</img>
      </a>


.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_eqvj3pre' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Programming Using the Iterable Interface "></iframe> 
   </center>

Checkpoint 2
------------

.. avembed:: Exercises/SWDesignAndDataStructs/IteratorsCheckpoint2Summ.html ka
   :long_name: Checkpoint 2

.. _IteratorProg: 

Programming Using Iterators
-----------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html
   
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/ProgrammingWithIterators.pdf"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" alt="" width="32" height="32">
      ProgrammingWithIterators.pdf</img>
      </a>

.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_qzq8us2t' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Programming Using Iterators"></iframe> 
   </center>

Checkpoint 3
------------

.. avembed:: Exercises/SWDesignAndDataStructs/IteratorsCheckpoint3Summ.html ka
   :long_name: Checkpoint 3

.. _IteratorDesign: 

Iterator Design Decisions
--------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html
   
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/IteratorsDesignConsiderations.pdf"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" alt="" width="32" height="32">
      IteratorsDesignConsiderations.pdf</img>
      </a>


.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_suuo9vaf' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Iterator Design Decisions"></iframe> 
   </center>


.. admonition:: Clarification

    Iterators that are a nested class inside the linked structure (not subclasses) are more efficient than Iterators that are independent classes.

.. _IteratorInner: 

Inner Iterator
--------------

As discussed throughout this section there are various design approaches for
iterators.  Below is one example of how an inner Iterator class could be
implemented for LList.

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


Include an inner ``Iterator`` class.  This version does not provide remove
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


A version of an inner ``Iterator`` class which does provide remove functionality.
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

.. _IteratorScanner: 

Scanners Implement Iterator<String>
-----------------------------------

The ``java.io`` package offers a rich inheritance hierarchy of classes for reading from text files. The Scanner class was created to simplify text input and is thus preferred over the other classes. Scanner implements ``Iterable<String>`` and provides ``next()`` and ``hasNext()`` methods in addition to many others.

Several methods provided by Scanner objects provide virtually all of the input capabilities you will need in this course:

* ``<scanner>.hasNext();`` Returns true if this scanner has another token in its input.
* ``<scanner>.next();`` Finds and returns the next complete token (by default the next whitespace delimited string as a String object like the next line or next tab-seperated word) from this scanner. A NoSuchElementException is thrown if no more tokens are available, (i.e., you have reached the end of input).
* ``<scanner>.hasNextLine();`` Returns true if this scanner has another line in its input.
* ``<scanner>.nextLine(); Finds and returns the next complete line. A ``NoSuchElementException`` is thrown if no more tokens are available, (i.e., you have reached the end of input).
* ``<scanner>.hasNext<PrimitiveType>();`` The ``<PrimitiveType>`` can be replaced by double, float, int, etc. Returns true if this scanner has another token in its input and it can be interpreted as a value of the <PrimitiveType>.
* ``<scanner>.next<PrimitiveType>();`` The ``<PrimitiveType>`` can be replaced by ``double``, ``float``, ``int``, etc. The method scans the next token of the input as an ``<PrimitiveType>`` and returns back the corresponding <PrimitiveType> value. It throws an InputMismatchException if the next token does not match the ``<PrimitiveType>``, or if the value scanned is out of range. It also throws a NoSuchElementException if no more tokens are available.
* ``<scanner>.useDelimiter(String pattern);`` by default whitespace (spaces, tabs, or new line characters) are used as delimiters for separating the input into tokens to return. This method allows the user to set the delimiter characters to whatever they wish for breaking up the input. Commas are a common other delimiter to use as tables or data is often stored in what are called CSV (comma seperated value) files.
* ``<scanner>.close();`` closes the scanner to release system resources being used by the scanner.

To use these methods, normally you will process the input by scanning one line at a time and then scanning the line for the desired tokens.

For example:

.. code-block:: java

   Scanner inStream = IOHelper.createScanner("input.txt");
   // if NOT at the end of the stream, more input is available
   if (inStream.hasNextLine())
   {
      // Get an entire line
      String thisLine = inStream.nextLine();
      // Create a scanner to process the line
      Scanner line = new Scanner(thisLine);
      // Check for the next whitespace delimited int
      if (line.hasNextInt())
      {
         System.out.println(line.nextInt());
      }
   }
   inStream.close();

Notice how the existence of each input is checked before it is extracted to avoid exceptions.

Also, if you have programmed in another language before, note that characters in Java are encoded using unicode, a 16-bit character code. Programmers in other languages may instead be familiar with ASCII, the American Standard Code for Information Interchange, which is a 7-bit character code. Fortunately, the first 128 codes in unicode are equivalent to the entire ASCII character set . For American users, ASCII values may thus be freely used when reading and writing character-by-character without error, although this approach does not directly extend to programs written for an international audience.

Scanners can also be used to process the tokens in a line of data.  These tokens may be separated by whitespace or other delimiters. For example to process lines of commands with white space delimiters:

.. code-block::

    set counter 10
    
    add counter 1
    
    display counter


.. code-block:: java

   Scanner inStream = IOHelper.createScanner("input.txt");
   // if NOT at the end of the stream, more input is available
   if (inStream.hasNextLine())
   {
      // Get an entire line
      String thisLine = inStream.nextLine();
      // Create a scanner to process the line
      Scanner line = new Scanner(thisLine);
      // Create an array to hold the tokens on the line
      String[] tokens = new String[MAX];
      int tokenCount;
      // Check for the next whitespace delimited int
      while (line.hasNext() && tokenCount < MAX)
      {
         tokens[tokenCount++] = line.next();
      }
      processLineOfData(tokens);
   }
   inStream.close();

In order to process data that is delimited by characters other than whitespace, the useDelimiter method is needed with a regular expression pattern as a  parameter. For example to process lines of commands with commas as delimiters, such as:

.. code-block::

    Shepard, G, Gr., 5'9"
    
    Brooks, G, Jr., 5'10" 
    
    Amoore, F, Sr., 6'2"


Here the Scanner needs to be set to use a comma.  Because there can be an undetermined amount of whitespace following a comma, the regular expression ",\\s*" should be used.  This regular expression pattern matches a comma followed by 0 or more white spaces.  Note that ",\\s+" would match a comma followed by 1 or more white spaces.  Note that ", \*" would match 0 or more spaces created by the space bar but it would not account for tabs or newlines which can also create white space, so using ",\\s*" is better practice.  More information is available about java regular expressions at https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html

.. code-block:: java

   Scanner inStream = IOHelper.createScanner("input.txt");
   // if NOT at the end of the stream, more input is available
   if (inStream.hasNextLine())
   {
      // Get an entire line
      String thisLine = inStream.nextLine();
      // Create a scanner to process the line
      Scanner line = new Scanner(thisLine).useDelimiter(",\\s*");
      // Create an array to hold the tokens on the line
      String[] tokens = new String[MAX];
      int tokenCount;
      // Check for the next whitespace delimited int
      while (line.hasNext() && tokenCount < MAX)
      {
         tokens[tokenCount++] = line.next();
      }
      processLineOfData(tokens);
   }
   inStream.close();







