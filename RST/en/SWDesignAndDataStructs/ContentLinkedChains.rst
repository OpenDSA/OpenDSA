.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino, Margaret Ellis, Cliff Shaffer, Mohammed Farghally, Mostafa Mohammed

Linked Chains (Pointers)
========================

Objectives
----------

Upon completion of this module, students will be able to:

* Review the concept of referene variables
* Understand the characteristics and use of a Linked Chain of Nodes
* Implement a Linked Chain and associated methods
* Iterate though a Linked Chain
* Trace the execution of Linked Chain methods
* Compare Array-based and Linked Chain implementation
* Practice linked chain manipulation

Some prose and images on this page originally came from 
a document written by Nick Parlante of Stanford University, and used
by permission of the author:
"`Pointers and Memory
<http://cslibrary.stanford.edu/102/PointersAndMemory.pdf>`_"
by Nick Parlante, Copyright 1998-2000,
Stanford CS Education Library.


Reference Variables
-------------------
Java uses a restricted version of the pointer concept, which is called a reference. While they mean roughly the same thing, the term “pointer” tends to be used in discussions that are not specific to any particular language or implementation. The word “pointers” connotes the common C/C++ implementation of pointers as addresses or locations in memory. A reference only “points to” an object. This means that programmers are given more limited access with a reference. While this limits what they can do, the Java philosophy is that this is more than made up for by a greater chance of the code working correctly. Java programmers may only assign to a reference and compare two references for equality. Other uses of a reference are done implicitly with no control from the programmer. These restrictions reduce the chance for bugs.

Two references which both refer to a single object are said to be “sharing”. Sometimes we say that each is an alias for the other, because we can refer to the referenced object through either name. That two or more references can cooperatively share a single memory structure is a key advantage of references. Either can modify the object’s value. 
5.3 from openDSA CS2 book


.. avembed:: Exercises/Pointers/PointerEX1PRO.html ka

.. avembed:: Exercises/Pointers/PointerEX2PRO.html ka

[10:51] Intro to Linked Chains of Nodes
---------------------------------------

.. admonition:: The LinkedChain Class
   
   .. code-block:: java

      package linkedchain;
      
      public class LinkedChain {
      
         private Node head; // Reference to first node
         private int numberOfEntries;
      
         public static void main(String[] args) {
      
            LinkedChain chain = new LinkedChain();
            chain.add(10);
            chain.add(-2);
            chain.add(57);
         }
      
         public LinkedChain() {
            head = null;
            numberOfEntries = 0;
         } // end default constructor
      
         public void add(int newEntry) {
            // Add to beginning of chain:
            Node newNode = new Node(newEntry);
            newNode.next = head; // Make new node reference rest of chain
            head = newNode; // New node is at beginning of chain
            numberOfEntries++;
         } // end add
      
         private class Node {
            private int data;
            private Node next; // Link to next node
      
            private Node(int dataPortion) {
               this(dataPortion, null);
            } // end constructor
      
            private Node(int dataPortion, Node nextNode) {
               data = dataPortion;
               next = nextNode;
            } // end constructor
         } // end Node
      }


.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_xfyll19n' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>


Checkpoint 1
------------

.. avembed:: Exercises/SWDesignAndDataStructs/LinkedChainCheckpoint1Summ.html ka
   :long_name: Checkpoint 1


Programming Exercises 1
-----------------------------

.. extrtoolembed:: 'SWDataStructsAndDesign_LinkedChains1'
   :workout_id: 2479



[11:31] Demo in Visualizer
--------------------------

.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_dkk3roib' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>

.. raw:: html

   <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/8.1.3-LinkedChainCode.pdf" target="_blank">
   <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
   Video Slides 8.1.3-LinkedChainCode.pdf</img>
   </a>


Checkpoint 2
------------

.. avembed:: Exercises/SWDesignAndDataStructs/LinkedChainCheckpoint2Summ.html ka
   :long_name: Checkpoint 2


Programming Exercises 2
-----------------------------

.. extrtoolembed:: 'SWDataStructsAndDesign_LinkedChains2'
   :workout_id: 2480


[5:14] Contains() Animation
---------------------------

.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_q83rf3ey' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>

    
.. raw:: html

   <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/8.1.4-LinkedChainContains.pdf" target="_blank">
   <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
   Video Slides 8.1.4-LinkedChainContains.pdf</img>
   </a>

Checkpoint 3
------------

.. avembed:: Exercises/Pointers/PointerEX3PRO.html ka


Pointers Concepts Summary
-------------------------

.. avembed:: Exercises/CMP/CMpointersSumm.html ka
   :long_name: Concept map pointers exercises



Credit
------
Some prose and images on this page originally came from 
a document written by Nick Parlante of Stanford University, and used
by permission of the author:
"`Pointers and Memory
<http://cslibrary.stanford.edu/102/PointersAndMemory.pdf>`_"
by Nick Parlante, Copyright 1998-2000,
Stanford CS Education Library.
