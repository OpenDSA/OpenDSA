.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino

Linked Chains (Pointers)
========================

Objectives
----------

Upon completion of this module, students will be able to:

* Understand the characteristics and use of a Linked Chain of Nodes
* Implement a Linked Chain and associated methods
* Iterate though a Linked Chain
* Trace the execution of Linked Chain methods
* Compare Array-based and Linked Chain implementation
* Practice linked chain manipulation

Acknowledgement
~~~~~~~~~~~~~~~
Some prose and images on this page originally came from a document written by Nick Parlante of Stanford University, and used by permission of the author: "`Pointers and Memory <http://cslibrary.stanford.edu/102/PointersAndMemory.pdf>`_" by Nick Parlante, Copyright 1998-2000, Stanford CS Education Library.

.. _PointerLinkedNodes: 

Interactive: Intro to Linked Chains of Nodes [10:51]
----------------------------------------------------

.. admonition:: Follow Along and Engage 

    Follow along with the video, refering to the LinkedChain class
    
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
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_xfyll19n' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Intro to Linked Chains of Nodes"></iframe> 
    </center>


Checkpoint 1
------------

.. avembed:: Exercises/MengBridgeCourse/LinkedChainCheckpoint1Summ.html ka
   :long_name: Checkpoint 1

.. _PointerVisDemo:

Interactive: Demo in Visualizer [11:31]
---------------------------------------   

   .. admonition:: Follow Along and Engage
   
       Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!
   
      .. raw:: html
      
         <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/8.1.3-LinkedChainCode.pdf" target="_blank">
         <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" alt="" width="32" height="32">
         Video Slides 8.1.3-LinkedChainCode.pdf</img>
         </a>
   
.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_dkk3roib' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Demo in Visualizer"></iframe> 
    </center>

Checkpoint 2
------------

.. avembed:: Exercises/MengBridgeCourse/LinkedChainCheckpoint2Summ.html ka
   :long_name: Checkpoint 2

.. _PointerContains: 

Contains() method Animation [5:14]
----------------------------------
   
   .. admonition:: Follow Along and Engage
   
       Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!
   
      .. raw:: html
      
         <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/8.1.4-LinkedChainContains.pdf" target="_blank">
            <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" alt="" width="32" height="32">
            Video Slides 8.1.4-LinkedChainContains.pdf</img>
            </a>
   
.. raw:: html

  <center>
  <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_q83rf3ey' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Contains method Animation"></iframe> 
  </center>
   

