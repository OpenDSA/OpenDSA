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

 
   <div style="position: relative; width: 100%; height: 0; padding-bottom: 38%">
        <iframe src="https://virginiatech.hosted.panopto.com/Panopto/Pages/Embed.aspx?autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=false&interactivity=all&id=961946ac-c2a6-40e4-a731-b429008ed023" style="border: 1px solid #464646; position: absolute; top: 0; left: 0; width: 960px; height: 395px; box-sizing: border-box;" allowfullscreen allow="autoplay" aria-label="Introduction to Binary Search Treess" aria-description="Introduction to Binary Search Trees"></iframe>
     </div>
     
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

   <div style="position: relative; width: 100%; height: 0; padding-bottom: 38%">
        <iframe src="https://virginiatech.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=83c9cfd3-5f23-4d63-8ee7-b40400ec81c9&autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=false&interactivity=all" style="border: 1px solid #464646; position: absolute; top: 0; left: 0; width: 960px; height: 395px; box-sizing: border-box;" allowfullscreen allow="autoplay" aria-label="Programming Binary Search Trees" aria-description="Programming Binary Search Trees"></iframe>
     </div>

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

   <div style="position: relative; width: 100%; height: 0; padding-bottom: 38%">
        <iframe src="https://virginiatech.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=9169e2c5-1519-4193-b170-b41000bd06c8&autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=false&interactivity=all" style="border: 1px solid #464646; position: absolute; top: 0; left: 0; width: 960px; height: 395px; box-sizing: border-box;" allowfullscreen allow="autoplay" aria-label="Adding Binary Search Trees" aria-description="Adding Binary Search Trees"></iframe>
     </div>

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

   <div style="position: relative; width: 100%; height: 0; padding-bottom: 38%">
        <iframe src="https://virginiatech.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=282c8235-18a0-4b07-9287-b40f003d836e&autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=false&interactivity=all" style="border: 1px solid #464646; position: absolute; top: 0; left: 0; width: 960px; height: 395px; box-sizing: border-box;" allowfullscreen allow="autoplay" aria-label="Removing From Binary Search Trees" aria-description="Removing From Binary Search Trees"></iframe>
    </div>
     
Checkpoint 4
------------

.. avembed:: Exercises/SWDesignAndDataStructs/BSTCheckpoint4Summ.html ka
   :long_name: Checkpoint 4

