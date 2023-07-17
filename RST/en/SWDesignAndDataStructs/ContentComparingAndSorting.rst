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

Introduction to Ordering, Comparing, and Sorting
------------------------------------------------

[13:39] Introduction to Sorting and Comparing
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_nhqfykqn' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>

.. raw:: html
   <br>
   <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/12.1.2.1-IntroOrderingAndComparing.pdf" target="_blank">
   <img src="../html/_static/Images/projector-screen.png" width="32" height="32">
   Video Slides 12.1.2.1-IntroOrderingAndComparing.pdf
   </a>

Checkpoint 1
------------

.. avembed:: Exercises/SWDesignAndDataStructs/CompSortCheckpoint1Summ.html ka
   :long_name: Checkpoint 1

Introduction to Sorting Video
-----------------------------

[12:51] Introduction to Sorting
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_px7gfy13' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>


.. raw:: html
   
   <br>
   <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/12.1.3.1-IntroToSorting.pdf" target="_blank">
   <img src="../html/_static/Images/projector-screen.png" width="32" height="32">
   Video Slides 12.1.3.1-IntroToSorting.pdf
   </a>

Checkpoint 2
------------

.. avembed:: Exercises/SWDesignAndDataStructs/CompSortCheckpoint2Summ.html ka
   :long_name: Checkpoint 2

Selection Sort Video
--------------------

[12:36] Selection Sort
~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_cs0nki5i' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>
     
.. raw:: html

   <br>
   <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/12.1.4.1-SelectionSort.pdf" target="_blank">
   <img src="../html/_static/Images/projector-screen.png" width="32" height="32">
   Video Slides 12.1.4.1-SelectionSort.pdf
   </a>

Checkpoint 3
------------

.. avembed:: Exercises/SWDesignAndDataStructs/CompSortCheckpoint3Summ.html ka
   :long_name: Checkpoint 3


.. avembed:: Exercises/Sorting/SelsortPRO.html ka
   :long_name: Selection Sort Proficiency Exercise

.. avembed:: Exercises/Sorting/SelsortSumm.html ka
   :long_name: Selection Sort Summary Exercise




Insertion Sort
--------------

[16:17] Insertion Sort Array
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_19z2exnz' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>

.. raw:: html

   <br>
   <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/12.1.5.1-InsertionSortArray.pdf" target="_blank">
   <img src="../html/_static/Images/projector-screen.png" width="32" height="32">
   Video Slides 12.1.5.1-InsertionSortArray.pdf
   </a>

Checkpoint 4
------------

.. avembed:: Exercises/SWDesignAndDataStructs/CompSortCheckpoint4Summ.html ka
   :long_name: Checkpoint 4


.. avembed:: Exercises/Sorting/InssortPRO.html ka
   :long_name: Insertion Sort Proficiency Exercise

[16:50] Insertion Sort Linked Chain
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html
    
    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_qc2qxx6h' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>
    
.. raw:: html

   <br>
   <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/12.1.6.1-InsertionSortLinked.pdf" target="_blank">
   <img src="../html/_static/Images/projector-screen.png" width="32" height="32">
   Video Slides 12.1.6.1-InsertionSortLinked.pdf
   </a>

Checkpoint 5
------------

.. avembed:: Exercises/SWDesignAndDataStructs/CompSortCheckpoint5Summ.html ka
   :long_name: Checkpoint 5


.. avembed:: Exercises/Sorting/InssortSumm.html ka
   :long_name: Insertion Sort Summary Exercise

Programming Practice: Insertion Sort
------------------------------------

.. extrtoolembed:: 'Programming Practice: Insertion Sort'
   :workout_id: 1925



Comparators
-----------

Comparator Example Code
~~~~~~~~~~~~~~~~~~~~~~~
.. admonition:: Try It Yourself
   
  In Eclipse, use the *Project > Download Assignment...* menu command to download the exercise project named "ex12.01-Comparing". Use this example to follow along with the following video. Feel free to experiment. 
  
  Refer to `01.02: Lab: LightBot for Beginners <https://profdev-lms.tlos.vt.edu/courses/2832/assignments/10634>`_ if you need to review the instructions for downloading Eclipse projects.

[11:22] Introduction to Comparators
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_pit1l2lg' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>

.. raw:: html

  <br>
   <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/12.1.8.1-Comparators.pdf" target="_blank">
   <img src="../html/_static/Images/projector-screen.png" width="32" height="32">
   Video Slides 12.1.8.1-Comparators.pdf
   </a>

Programming Practice: Comparators
---------------------------------

.. extrtoolembed:: 'Programming Practice: Comparators'
   :workout_id: 1926
