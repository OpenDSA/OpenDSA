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

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_nhqfykqn' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Introduction to Ordering, Comparing, and Sorting"></iframe> 
   </center>

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

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_px7gfy13' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Introduction to Sorting"></iframe> 
   </center>

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

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_cs0nki5i' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Selection Sort"></iframe> 
   </center>


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

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_19z2exnz' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Insertion Sort with an Array"></iframe> 
   </center>


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

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_qc2qxx6h' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Insertion Sort with a Linked Chain "></iframe> 
   </center>

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

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_pit1l2lg' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Introduction to Comparators"></iframe> 
    </center>


Programming Practice: Comparators
---------------------------------

.. extrtoolembed:: 'Programming Practice: Comparators'
   :workout_id: 1926

