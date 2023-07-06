.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino


Polymorphism
====================

Objectives
----------

* Create and use objects in java
* Review Java Interfaces and Abstract Classes
* Review Inheritance and Composition
* Review Overloading and Overriding
* Review Reference Variables
* Trace and program using inheritance
* Trace and implement equals and toString methods
* Trace coding examples of polymorphism
* Design java classes using polymorphism
* Apply Typecasting



Introduction to Object Oriented Programming
-------------------------------------------
[9:26] Java Objects Video
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html
    
     <center>
     <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_td3bp4s0' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
     </center>

.. raw:: html

   <a href="https://courses.cs.vt.edu/~cs2114/SWDesignAndDataStructs/JavaOOPObjects.pdf"  target="_blank">
   <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
   Video Slides Java OOP Objects.pdf</img>
   </a>



Checkpoint 1
------------

.. avembed:: Exercises/SWDesignAndDataStructs/OOP1Checkpoint1Summ.html ka
   :long_name: Checkpoint 1



Java UML Diagrams
-----------------

[6:15] Java Object UML Video
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

     <center>
     <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_phzs60ad' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
     </center>

.. raw:: html

   <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/7.3.2.1-JavaOOPUML.pdf" target="_blank">
   <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
   Video Slides 7.3.2.1-JavaOOPUML.pdf</img>
   </a>

Related Resources
"""""""""""""""""""

.. raw:: html

   <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/7.3.2.1.1-UMLDiagramKey.pdf" target="_blank">
   A UML Diagram from the example in the video 7.3.2.1.1-UMLDiagramKey.pdf
   </a>





Programming Practice: Object Oriented Programming
-------------------------------------------------

.. extrtoolembed:: 'Programming Practice: Object Oriented Programming'
   :workout_id: 1906


Java Inheritance: this, super
-----------------------------

Interactive
~~~~~~~~~~~

.. admonition:: Follow Along, Practice and Explore

    Download to run and explore the corresponding project from the video on your own in eclipse. The project CS-GraphWindowLib is required for the sample project above.  It is also used in your course projects. To download the CS-GraphWindowLib you must first complete the configuration steps for your first lab. You will then be able to download it via eclipse using the blue down arrow icon or using the Project Menu and selecting "Download Assignment..."


   .. raw:: html

      <a href="https://courses.cs.vt.edu/~cs2114/SWDesignAndDataStructs/CS2-ExJavaOOP.zip"  target="_blank">
      <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
       CS2 Java OOP Example Eclipse Project</img>
      </a>



[11:15] Java OOP This and Super Video
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. raw:: html
    
    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_25fplq8v' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>

.. raw:: html

   <a href="https://courses.cs.vt.edu/~cs2114/SWDesignAndDataStructs/JavaOOPInheritenceSuperThis.pdf"  target="_blank">
   <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
   Video Slides Java OOP Super This.pdf</img>
   </a>





Checkpoint 2
------------

.. avembed:: Exercises/SWDesignAndDataStructs/OOP1Checkpoint2Summ.html ka
   :long_name: Checkpoint 2



Java Inheritance: equals(), toString()
--------------------------------------



[14:33] Java OOP: Equals toString Video
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_ml9sbz2y' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>

.. raw:: html

   <a href="https://courses.cs.vt.edu/~cs2114/SWDesignAndDataStructs/JavaOOPInheritenceEqualsToString.pdf"  target="_blank">
   <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
   Video Slides Java OOP Equals ToString .pdf</img>
   </a>



Java OOP Checkpoint 3
---------------------
.. avembed:: Exercises/SWDesignAndDataStructs/OOP1Checkpoint3Summ.html ka
   :long_name: Checkpoint 3


Polymorphism Measurable Interface
---------------------------------

Polymorphism Example Code
~~~~~~~~~~~~~~~~~~~~~~~~~
.. admonition:: Try It Yourself

   In Eclipse, use the *Project > Download Assignment...* menu command to download the exercise project named "ex07.04-MeasurableInterface". Use this example to follow along with the following video. Feel free to experiment. 
   
   Refer to `01.02: Lab: LightBot for Beginners <https://profdev-lms.tlos.vt.edu/courses/2832/assignments/10634>`_ if you need to review the instructions for downloading Eclipse projects.

[7:23] The Measurable Interface
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_ywzatt7g' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>

.. raw:: html

   <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/7.4.1.1-JavaOOPPolyMeasurable.pdf" target="_blank">
   <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
   Video Slides 7.4.1.1-JavaOOPPolyMeasurable.pdf</img>
   </a>



Checkpoint 4
------------

.. avembed:: Exercises/SWDesignAndDataStructs/OOP2Checkpoint4Summ.html ka
   :long_name: Checkpoint 4


Programming Practice: Polymorphism 1
------------------------------------

.. extrtoolembed:: 'Programming Practice: Polymorphism 1'
   :workout_id: 1907

Polymorphism Computer Superclass
--------------------------------

[12:09] The Computer Superclass
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_pkxo2beb' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>

.. raw:: html

   <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/7.4.4.1-JavaOOPPolyComputer.pdf" target="_blank">
   <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
   Video Slides 7.4.4.1-JavaOOPPolyComputer.pdf</img>
   </a>

Checkpoint 5
------------

.. avembed:: Exercises/SWDesignAndDataStructs/OOP2Checkpoint5Summ.html ka
   :long_name: Checkpoint 5





Polymorphism Integer Example
----------------------------

[7:40] Java Polymorphism Integer Example
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html
    
    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=0_33oovpxg' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>

.. raw:: html

   <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/7.6.4.1-JavaOOPPolyInteger.pdf" target="_blank">
   <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
   Video Slides 7.6.4.1-JavaOOPPolyInteger.pdf</img>
   </a>


Checkpoint 6
------------

.. avembed:: Exercises/SWDesignAndDataStructs/OOP2Checkpoint6Summ.html ka
   :long_name: Checkpoint 6


Programming Practice: Polymorphism 2
------------------------------------

.. extrtoolembed:: 'Programming Practice: Polymorphism 2'
   :workout_id: 1908
