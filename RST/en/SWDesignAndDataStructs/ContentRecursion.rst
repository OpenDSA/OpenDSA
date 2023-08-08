.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino


Recursion
=========

..
    Shortcuts
    ---------
    
    - :ref:`RecursionIntro`
    - :ref:`RecursionExample`
    - :ref:`RecursionArray`
    - :ref:`RecursionChain`
    - :ref:`RecursionConclusion`


Objectives
----------

Upon completion of this module, students will be able to:


* Trace recursive methods
* Implement recursive methods
* Consider the efficiency of recursive methods


Suggested Reading
~~~~~~~~~~~~~~~~~

Chapter 7 from  `Data Structures and Abstractions with Java, 4th edition  by Frank M. Carrano and Timothy Henry <https://www.amazon.com/Data-Structures-Abstractions-Java-4th/dp/0133744051/ref=sr_1_1?ie=UTF8&qid=1433699101&sr=8-1&keywords=Data+Structures+and+Abstractions+with+Java>`_

.. _RecursionIntro: 

Introduction to Recursion 
-------------------------

Intro to Recursion, Part 1
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_k95fexwx' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>

Intro to Recursion, Part 2
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html
   
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/RecursionIntro.pdf"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" width="32" height="32">
      RecursionIntro.pdf</img>
      </a>


.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_c7g8ts7i' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
   </center>


Checkpoint 1
------------

.. avembed:: Exercises/SWDesignAndDataStructs/RecursionCheckpoint1Summ.html ka
   :long_name: Checkpoint 1

.. _RecursionExample: 

Interactive: More Recursion : Factorial Examples
--------------------------------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html
   
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/RecursionExample.pdf"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" width="32" height="32">
      RecursionExample.pdf</img>
      </a>


.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_kvgpxyil' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
   </center>


Programming Practice: Recursion 1
---------------------------------

.. extrtoolembed:: 'Programming Practice: Recursion 1'
   :workout_id: 1916

.. _RecursionArray: 

Interactive: Recursion on Arrays: Display an Array
----------------------------------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html
   
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/DisplayArrays.pdf"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" width="32" height="32">
      DisplayArrays.pdf</img>
      </a>



.. admonition:: Correction to note!

   The code in the second example in this video is missing  the ``{}`` in the ``if`` block.  It should be:

   .. code-block:: java
   
      public static void displayArray2(int[] array, int first, int last)
      {
           if (first <= last) {
               displayArray2(array, first, last - 1);
               System.out.print(array[last] + " ");
           }
   
      }


.. raw:: html
      
         <center>
         <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_dgn4f1ws' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
         </center>
      


Checkpoint 2
------------

.. avembed:: Exercises/SWDesignAndDataStructs/RecursionCheckpoint2Summ.html ka
   :long_name: Checkpoint 2


Interactive: Recursion on Arrays: Display the Middle of an Array
-----------------------------------------------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html
   
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/DisplayArraysMiddle.pdf"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" width="32" height="32">
      DisplayArraysMiddle.pdf</img>
      </a>


.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_w4ksnyaj' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
   </center>

Checkpoint 3
------------

.. avembed:: Exercises/SWDesignAndDataStructs/RecursionCheckpoint3Summ.html ka
   :long_name: Checkpoint 3


Programming Practice: Recursion 2
---------------------------------

.. extrtoolembed:: 'Programming Practice: Recursion 2'
   :workout_id: 1917

.. _RecursionChain: 

Interactive: Recursion on Linked Chains
----------------------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html
   
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/DisplayBagsRecursively.pdf"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" width="32" height="32">
      DisplayBagsRecursively.pdf</img>
      </a>


.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_cqp6egsu' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
   </center>

Interactive: Tower of Hanoi
-----------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html
   
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/TowersOfHanoi.pdf"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" width="32" height="32">
      TowersOfHanoi.pdf</img>
      </a>


.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_i6r2ykc6' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
   </center>


Checkpoint 4
------------

.. avembed:: Exercises/SWDesignAndDataStructs/RecursionCheckpoint4Summ.html ka
   :long_name: Checkpoint 4


.. _RecursionConclusion: 

Interactive: Recursion Wrap Up
-------------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html
   
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/RecursionWrapUp.pdf"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" width="32" height="32">
      RecursionWrapUp.pdf</img>
      </a>


.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_tqcalmf0' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
   </center>

Programming Practice: Recursion 3
---------------------------------

.. extrtoolembed:: 'Programming Practice: Recursion 3'
   :workout_id: 1918


Forward Flow Tracing Exercises
------------------------------

.. avembed:: Exercises/RecurTutor/RecTraceSummFwdFlow.html ka
   :long_name: Recursion Tracing Exercises Set 1


Backward Flow Tracing Exercises
-------------------------------

.. avembed:: Exercises/RecurTutor/RecTraceSummbckwrdFlow.html ka
   :long_name: Recursion Tracing Exercises Set 2


Find Error Tracing Exercises
----------------------------

.. avembed:: Exercises/RecurTutor/RecTraceSummFuncErr.html ka
   :long_name: Recursion Tracing Exercises Set 3


Two Recursive Calls Tracing Exercises
-------------------------------------

.. avembed:: Exercises/RecurTutor/RecTraceSummTwoRC.html ka
   :long_name: Recursion Tracing Exercises Set 4


How Many Times Tracing Exercises
--------------------------------

.. avembed:: Exercises/RecurTutor/RecTraceSummHowmany.html ka
   :long_name: Recursion Tracing Exercises Set 5


Harder Tracing Exercises
------------------------

.. avembed:: Exercises/RecurTutor/RecTraceSummHard.html ka
   :long_name: Recursion Tracing Exercises Set 6
