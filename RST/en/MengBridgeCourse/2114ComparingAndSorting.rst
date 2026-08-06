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

Introduction to Ordering, Comparing, and Sorting [13:39]
--------------------------------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html
   
      <br>
         <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/12.1.2.1-IntroOrderingAndComparing.pdf" target="_blank">
         <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" alt="" width="32" height="32">
         Video Slides 12.1.2.1-IntroOrderingAndComparing.pdf
         </a>

.. raw:: html

   <div style="position: relative; width: 100%; height: 0; padding-bottom: 35%">
        <iframe src="https://virginiatech.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=d5d981dc-2cfb-44bb-8531-b412005faa27&autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=false&interactivity=all" style="border: 1px solid #464646; position: absolute; top: 0; left: 0; width: 960px; height: 395px; box-sizing: border-box;" allowfullscreen allow="autoplay" aria-label="Introduction to Ordering, Comparing, and Sorting" aria-description="Introduction to Ordering, Comparing, and Sorting"></iframe>
     </div>   

Checkpoint 1
------------

.. avembed:: Exercises/MengBridgeCourse/CompSortCheckpoint1Summ.html ka
   :long_name: Checkpoint 1

.. _SortIntro: 
   
Interactive: Introduction to Sorting [12:51]
--------------------------------------------

.. admonition:: Follow Along and Engage

   Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html
  
    <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/12.1.3.1-IntroToSorting.pdf" target="_blank">
       <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" alt="" width="32" height="32">
       Video Slides 12.1.3.1-IntroToSorting.pdf
       </a>

.. raw:: html

   <div style="position: relative; width: 100%; height: 0; padding-bottom: 35%">
     <iframe src="https://virginiatech.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=2e56f9cf-2982-4ba5-9746-b40c00bd2c79&autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=false&interactivity=all" style="border: 1px solid #464646; position: absolute; top: 0; left: 0; width: 960px; height: 395px; box-sizing: border-box;" allowfullscreen allow="autoplay" aria-label="Introduction to Sorting" aria-description="Introduction to Sorting"></iframe>
  </div>
  

Checkpoint 2
------------

.. avembed:: Exercises/MengBridgeCourse/CompSortCheckpoint2Summ.html ka
   :long_name: Checkpoint 2

.. _SortSelect: 

Interactive: Selection Sort [12:36]
-----------------------------------
   
.. admonition:: Follow Along and Engage

   Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

  .. raw:: html
  
        <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/12.1.4.1-SelectionSort.pdf" target="_blank">
        <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" alt="" width="32" height="32">
        Video Slides 12.1.4.1-SelectionSort.pdf
        </a>

.. raw:: html

   <div style="position: relative; width: 100%; height: 0; padding-bottom: 35%">
     <iframe src="https://virginiatech.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=1fe7eb9a-a54f-4a05-b2cd-b41f0059cf81&autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=false&interactivity=all" style="border: 1px solid #464646; position: absolute; top: 0; left: 0; width: 960px; height: 395px; box-sizing: border-box;" allowfullscreen allow="autoplay" aria-label="Selection Sort" aria-description="Selection Sort"></iframe>
  </div>

Checkpoint 3
------------

.. avembed:: Exercises/MengBridgeCourse/CompSortCheckpoint3Summ.html ka
   :long_name: Checkpoint 3

.. _SortInsert:
    
Insertion Sort with an Array
-----------------------------------------

.. admonition:: Follow Along and Engage

   Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

  .. raw:: html
  
     <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/12.1.5.1-InsertionSortArray.pdf" target="_blank">
        <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" alt="" width="32" height="32">
        Video Slides 12.1.5.1-InsertionSortArray.pdf
        </a>

.. raw:: html

   <div style="position: relative; width: 100%; height: 0; padding-bottom: 35%">
     <iframe src="https://virginiatech.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=871cb78b-3e68-4834-bbe8-b4270036a247&autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=false&interactivity=all" style="border: 1px solid #464646; position: absolute; top: 0; left: 0; width: 960px; height: 395px; box-sizing: border-box;" allowfullscreen allow="autoplay" aria-label="Insertion Sort with an Array" aria-description="Insertion Sort with an Array"></iframe>
  </div>
  
Checkpoint 4
------------

.. avembed:: Exercises/MengBridgeCourse/CompSortCheckpoint4Summ.html ka
   :long_name: Checkpoint 4

Insertion Sort with a Linked Chain [16:50]
------------------------------------------

.. admonition:: Follow Along and Engage

   Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

  .. raw:: html
  
    <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/12.1.6.1-InsertionSortLinked.pdf" target="_blank">
     <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" alt="" width="32" height="32">
     Video Slides 12.1.6.1-InsertionSortLinked.pdf
     </a>
     
.. raw:: html
  
  <div style="position: relative; width: 100%; height: 0; padding-bottom: 35%">
       <iframe src="https://virginiatech.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=42b2267e-b157-4907-8d5a-b41a01725b36&autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=false&interactivity=all" style="border: 1px solid #464646; position: absolute; top: 0; left: 0; width: 960px; height: 395px; box-sizing: border-box;" allowfullscreen allow="autoplay" aria-label="Insertion Sort with a Linked Chain"" aria-description="Insertion Sort with a Linked Chain""></iframe>
    </div>

Checkpoint 5
------------

.. avembed:: Exercises/MengBridgeCourse/CompSortCheckpoint5Summ.html ka
   :long_name: Checkpoint 5


Programming Practice: Insertion Sort
------------------------------------

.. extrtoolembed:: 'Programming Practice: Insertion Sort'
   :workout_id: 1925

.. _SortCompareIntro:

Introduction to Comparators [11:22]
-----------------------------------
.. admonition:: Follow Along, Practice and Explore
    
    In Eclipse, use the *Project > Download Assignment...* menu command to download the exercise project named "ex12.01-Comparing". Use this example to follow along with the following video. Feel free to experiment. 
      
      Refer to `01.02: Lab: LightBot for Beginners <https://profdev-lms.tlos.vt.edu/courses/2832/assignments/10634>`_ if you need to review the instructions for downloading Eclipse projects.

      .. raw:: html
      
        <br>
         <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/12.1.8.1-Comparators.pdf" target="_blank">
         <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" alt="" width="32" height="32">
         Video Slides 12.1.8.1-Comparators.pdf
         </a>
      

.. raw:: html
    
   <div style="position: relative; width: 100%; height: 0; padding-bottom: 35%">
         <iframe src="https://virginiatech.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=a9d98503-7ec5-4fd8-83d3-b3f6006fa882&autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=false&interactivity=all" style="border: 1px solid #464646; position: absolute; top: 0; left: 0; width: 960px; height: 395px; box-sizing: border-box;" allowfullscreen allow="autoplay" aria-label="Introduction to Comparators" aria-description="Introduction to Comparators"></iframe>
      </div>    

Programming Practice: Comparators
---------------------------------

.. extrtoolembed:: 'Programming Practice: Comparators'
   :workout_id: 1926


