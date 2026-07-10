.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino

Comparing and Sorting
=====================

Objectives
----------

Upon completion of this module, students will be able to:

* Describe concepts of ordering and sorting
* Develop methods to compare primitives and Objects
* Describe and develop classes which implement the Comparable interface or the Comparator interface
* Describe the behavior of various sort methods including: bubble sort, selection sort, and insertion sort
* Discuss the relative efficiencies of various sort methods
* Implement, test, and use various sort methods and methods which support comparisons
* Identify  when to use the Comparable interface vs the Comparator interface

.. _SortOrderIntro: 

Introduction to Ordering, Comparing, and Sorting
--------------------------------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html
   
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/IntroOrderingAndComparing.pdf"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" alt="" width="32" height="32">
      IntroOrderingAndComparing.pdf</img>
      </a>


.. raw:: html

   <div style="position: relative; width: 100%; height: 0; padding-bottom: 38%">
        <iframe src="https://virginiatech.hosted.panopto.com/Panopto/Pages/Embed.aspx?autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=false&interactivity=all&id=d5d981dc-2cfb-44bb-8531-b412005faa27" style="border: 1px solid #464646; position: absolute; top: 0; left: 0; width: 960px; height: 395px; box-sizing: border-box;" allowfullscreen allow="autoplay" aria-label="Introduction to Ordering, Comparing, and Sorting" aria-description="Introduction to Ordering, Comparing, and Sorting"></iframe>
     </div>
     
Checkpoint 1
------------

.. avembed:: Exercises/SWDesignAndDataStructs/CompSortCheckpoint1Summ.html ka
   :long_name: Checkpoint 1

.. _SortIntro: 

Interactive: Introduction to Sorting
--------------------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html
   
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/IntroToSorting.pdf"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" alt="" width="32" height="32">
      IntroToSorting.pdf</img>
      </a>


.. raw:: html
 
   <div style="position: relative; width: 100%; height: 0; padding-bottom: 38%">
        <iframe src="https://virginiatech.hosted.panopto.com/Panopto/Pages/Embed.aspx?autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=false&interactivity=all&id=2e56f9cf-2982-4ba5-9746-b40c00bd2c79" style="border: 1px solid #464646; position: absolute; top: 0; left: 0; width: 960px; height: 395px; box-sizing: border-box;" allowfullscreen allow="autoplay" aria-label="Introduction to Sorting" aria-description="Introduction to Sorting"></iframe>
     </div>

Checkpoint 2
------------

.. avembed:: Exercises/SWDesignAndDataStructs/CompSortCheckpoint2Summ.html ka
   :long_name: Checkpoint 2

.. _SortSelect: 

Interactive: Selection Sort
-----------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html
   
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/SelectionSort.pdf"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" alt="" width="32" height="32">
      SelectionSort.pdf</img>
      </a>


.. raw:: html
   
   <div style="position: relative; width: 100%; height: 0; padding-bottom: 38%">
        <iframe src="https://virginiatech.hosted.panopto.com/Panopto/Pages/Embed.aspx?autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=false&interactivity=all&id=1fe7eb9a-a54f-4a05-b2cd-b41f0059cf81" style="border: 1px solid #464646; position: absolute; top: 0; left: 0; width: 960px; height: 395px; box-sizing: border-box;" allowfullscreen allow="autoplay" aria-label="Selection Sort" aria-description="Selection Sort"></iframe>
     </div>

Checkpoint 3
------------

.. avembed:: Exercises/SWDesignAndDataStructs/CompSortCheckpoint3Summ.html ka
   :long_name: Checkpoint 3

.. avembed:: Exercises/Sorting/SelsortPRO.html ka
   :long_name: Selection Sort Proficiency Exercise

.. _SortInsert:
 
Insertion Sort with an Array
------------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html
   
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/InsertionSortArray.pdf"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" alt="" width="32" height="32">
      InsertionSortArray.pdf</img>
      </a>


.. raw:: html

   <div style="position: relative; width: 100%; height: 0; padding-bottom: 38%">
        <iframe src="https://virginiatech.hosted.panopto.com/Panopto/Pages/Embed.aspx?autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=false&interactivity=all&id=871cb78b-3e68-4834-bbe8-b4270036a247" style="border: 1px solid #464646; position: absolute; top: 0; left: 0; width: 960px; height: 395px; box-sizing: border-box;" allowfullscreen allow="autoplay" aria-label="Insertion Sort with an Array" aria-description="Insertion Sort with an Array"></iframe>
     </div>

Checkpoint 4
------------

.. avembed:: Exercises/SWDesignAndDataStructs/CompSortCheckpoint4Summ.html ka
   :long_name: Checkpoint 4

.. avembed:: Exercises/Sorting/InssortPRO.html ka
   :long_name: Insertion Sort Proficiency Exercise


Insertion Sort with a Linked Chain 
------------------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html
   
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/InsertionSortLinked.pdf"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" alt="" width="32" height="32">
      InsertionSortLinked.pdf</img>
      </a>


.. raw:: html

   <div style="position: relative; width: 100%; height: 0; padding-bottom: 38%">
        <iframe src="https://virginiatech.hosted.panopto.com/Panopto/Pages/Embed.aspx?autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=false&interactivity=all&id=42b2267e-b157-4907-8d5a-b41a01725b36" style="border: 1px solid #464646; position: absolute; top: 0; left: 0; width: 960px; height: 395px; box-sizing: border-box;" allowfullscreen allow="autoplay" aria-label="Insertion Sort with a Linked Chain" aria-description="Insertion Sort with a Linked Chain"></iframe>
     </div>

Checkpoint 5
------------

.. avembed:: Exercises/SWDesignAndDataStructs/CompSortCheckpoint5Summ.html ka
   :long_name: Checkpoint 5


Programming Practice: Insertion Sort
------------------------------------

.. extrtoolembed:: 'Programming Practice: Insertion Sort'
   :workout_id: 1925

.. _SortCompareIntro:

Introduction to Comparators
-----------------------------------
.. admonition:: Follow Along, Practice and Explore

    
    Download to run and explore the java file (see below) from the video on your own in eclipse. You may download the standalone \*.java file  Download to run and explore the corresponding project from the video on your own in eclipse. The project CS2-Support is required for the sample project.  It is also used in your course projects. To download the CS2-Support you must first complete the configuration steps for your first lab. You will then be able to download it via eclipse using the blue down arrow icon or using the Project Menu and selecting "Download Assignment..."


   .. raw:: html

      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/examples/eclipse/exComparing.zip"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/icons8-java60.png" alt=""  width="32" height="32">
      exComparing.zip</img>
      </a>
      <br>
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/Comparators.pdf" target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" alt="" width="32" height="32">
      Video Slides Comparators.pdf
      </a>


.. raw:: html

   <div style="position: relative; width: 100%; height: 0; padding-bottom: 38%">
         <iframe src="https://virginiatech.hosted.panopto.com/Panopto/Pages/Embed.aspx?autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=false&interactivity=all&id=a9d98503-7ec5-4fd8-83d3-b3f6006fa882" style="border: 1px solid #464646; position: absolute; top: 0; left: 0; width: 960px; height: 395px; box-sizing: border-box;" allowfullscreen allow="autoplay" aria-label="Introduction to Comparators" aria-description="Introduction to Comparators"></iframe>
      </div>

Programming Practice: Comparators
---------------------------------

.. extrtoolembed:: 'Programming Practice: Comparators'
   :workout_id: 1926


