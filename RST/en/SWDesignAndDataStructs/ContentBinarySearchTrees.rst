.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly


Binary Search Trees
===================

Objectives
----------
* Distinguish a Binary Tree from a Binary Search Tree (BST)
* Describe the characteristics of a Binary Search Tree and the efficiency its operations
* Traverse a Binary Search Tree
* Implement and use a Binary Search Tree ADT
* Add an a new entry to a Binary Search Tree
* Remove an entry from a Binary Search Tree

Suggested Reading:
~~~~~~~~~~~~~~~~~~

Chapter 25 A Binary Search Tree Implementation from `Data Structures and Abstractions with Java, 4th edition  by Frank M. Carrano and Timothy Henry <https://www.amazon.com/Data-Structures-Abstractions-Java-4th/dp/0133744051/ref=sr_1_1?ie=UTF8&qid=1433699101&sr=8-1&keywords=Data+Structures+and+Abstractions+with+Java>`_

.. raw:: html

    <a name="BSTIntro">


Interactive: Introduction to Binary Search Trees
------------------------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html

      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/IntroBinarySearchTrees24.pdf"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" alt="" width="32" height="32">
      IntroBinarySearchTrees.pdf</img>
      </a>


.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_oa8zsd2b' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Introduction to Binary Search Trees"></iframe> 
   </center>


Checkpoint 1
------------

.. avembed:: Exercises/SWDesignAndDataStructs/BSTCheckpoint1Summ.html ka
   :long_name: Checkpoint 1

.. raw:: html
   
   <a name="BSTProg">

Interactive: Programming Binary Search Trees
------------------------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html

      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/ProgrammingBinarySearchTrees.pdf"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" alt="" width="32" height="32">
      ProgrammingBinarySearchTrees.pdf</img>
      </a>


.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_ykrtcb3f' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Programming Binary Search Trees"></iframe> 
   </center>


Checkpoint 2
------------

.. avembed:: Exercises/SWDesignAndDataStructs/BSTCheckpoint2Summ.html ka
   :long_name: Checkpoint 2

.. _BSTAdd: 

Interactive: Adding Binary Search Trees
------------------------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html

      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/AddingToBinarySearchTrees24.pdf"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" alt="" width="32" height="32">
     AddingToBinarySearchTrees.pdf</img>
      </a>


.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_y1v3inw7' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Adding Binary Search Trees"></iframe> 
   </center>


Checkpoint 3
------------

.. avembed:: Exercises/SWDesignAndDataStructs/BSTCheckpoint3Summ.html ka
   :long_name: Checkpoint 3

.. _BSTRemove: 

Interactive: Removing From Binary Search Trees
----------------------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html


      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/RemovingFromBinarySearchTrees24.pdf"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" alt="" width="32" height="32">
      RemovingFromBinarySearchTrees.pdf</img>
      </a>


.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_ljk55fcq' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Removing From Binary Search Trees"></iframe> 
   </center>

Checkpoint 4
------------

.. avembed:: Exercises/SWDesignAndDataStructs/BSTCheckpoint4Summ.html ka
   :long_name: Checkpoint 4