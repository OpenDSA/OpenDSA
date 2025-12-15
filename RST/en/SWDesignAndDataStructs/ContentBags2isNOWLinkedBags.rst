.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino

Introduction to Linked Bags
===========================

Objectives
----------

Upon completion of this module, students will be able to:

* Name the function and purpose of basic Java data structures
* State key characteristics of Bags in Java
* Build and populate Bags in Java


Linked Bags
-----------

Suggested Reading:
~~~~~~~~~~~~~~~~~~

Suggested Reading:  **Chapter 3: Bag Implementation That Links Data** from `Data Structures and Abstractions with Java, 4th edition  by Frank M. Carrano and Timothy Henry <https://www.amazon.com/Data-Structures-Abstractions-Java-4th/dp/0133744051/ref=sr_1_1?ie=UTF8&qid=1433699101&sr=8-1&keywords=Data+Structures+and+Abstractions+with+Java>`_

Introduction to Linked Bags
---------------------------

[4:10] Introduction to Linked Bags
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

    <center>
       <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_dh0z9agx' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Introduction to Linked Bags"></iframe> 
    </center>

.. raw:: html

   <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/8.2.3-LinkedBagIntro.pdf" target="_blank">
   <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" alt="" width="32" height="32">
   Video Slides 8.2.3-LinkedBagIntro.pdf</img>
   </a>


LinkedBag add and toArray
--------------------------

[12:45] LinkedBag add and toArray
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_7kh033i4' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="LinkedBag add and toArray"></iframe> 
    </center>

.. raw:: html

   <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/8.2.4.1-LinkedBagAddToArray.pdf" target="_blank">
   <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" alt="" width="32" height="32">
   Video Slides 8.2.4.1-LinkedBagAddToArray.pdf</img>
   </a>

Checkpoint 1
------------

.. avembed:: Exercises/SWDesignAndDataStructs/LinkedBagCheckpoint1Summ.html ka
   :long_name: Checkpoint 1


ExLinkedBagJunit Demonstration
------------------------------

Code examples
~~~~~~~~~~~~~
.. admonition:: Try It Yourself

  In Eclipse, use the *Project > Download Assignment...* menu command to download the exercise project named "ex08.05-LinkedBagsWithJUnit". Use this example to follow along with the following video. Feel free to experiment.

  Refer to `01.02: Lab: LightBot for Beginners <https://profdev-lms.tlos.vt.edu/courses/2832/assignments/10634>`_ if you need to review the instructions for downloading Eclipse projects.


[7:14] ExLinkedBagJUnit  Demonstration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_y9dkjp2z' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="ExLinkedBagJUnit  Demonstration"></iframe> 
    </center>

LinkedBag getFrequencyOf() and contains()
-----------------------------------------

.. admonition:: Try It Yourself
    In Eclipse, use the *Project > Download Assignment...* menu command to download the lab project named "ex08.05-LinkedBagsWithJUnit"

    Refer to `01.02: Lab: LightBot for Beginners <https://profdev-lms.tlos.vt.edu/courses/2832/assignments/10634>`_ if you need to review the instructions for downloading Eclipse projects.


[14:00] LinkedBag getFrequencyOf() and contains() Demonstration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_jaeiozal' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="LinkedBag getFrequencyOf() and contains() Demonstration"></iframe> 
    </center>

.. raw:: html

   <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/8.2.6.1-LinkedFreqContains.pdf" target="_blank">
   <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" alt="" width="32" height="32">
   Video Slides 8.2.6.1-LinkedFreqContains.pdf</img>
   </a>

Checkpoint 2
------------

.. avembed:: Exercises/SWDesignAndDataStructs/LinkedBagCheckpoint2Summ.html ka
   :long_name: Checkpoint 2


LinkedBag Removing an item
---------------------------

[13:44] LinkedBag Removing an Item
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_kps8b356' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="LinkedBag Removing an Item"></iframe> 
    </center>

.. raw:: html

   <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/8.2.7.1-LinkedRemove.pdf" target="_blank">
   <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" alt="" width="32" height="32">
   Video Slides 8.2.7.1-LinkedRemove.pdf</img>
   </a>

**Tradeoffs of using a linked chain implementation for a bag**

.. list-table:: Pros and Cons of Linked Bags
   :header-rows: 1

   * - Pros
     - Cons
   * - Bag can grow in size easily
     - Requires more space than a same-sized array
   * - Adding an entry to the bag is fast
     - Removing a specified entry requires time to locate the entry


Checkpoint 3
------------

.. avembed:: Exercises/SWDesignAndDataStructs/LinkedBagCheckpoint3Summ.html ka
   :long_name: Checkpoint 3


Wrapping up Bags
----------------

As you've seen, Bags are a simple but foundational data structure in Java.
We will continue with other data structures and their unique characteristics,
including opportunities to practice building them, in later modules.

Recall that the objectives for this module were to:

* Name the function and purpose of basic Java data structures
* State key characteristics of Bags in Java
* Build and populate Bags in Java


Programming Practice: LinkedBags
--------------------------------

.. extrtoolembed:: 'Programming Practice: LinkedBags'
   :workout_id: 1911

