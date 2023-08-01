.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino


Polymorphism
============

Shortcuts
---------

- :ref:`IntroOOP`
- :ref:`IntroUML`
- :ref:`IntroInheritance`
- :ref:`IntroPolyMeasure`
- :ref:`IntroPolySuper`
- :ref:`IntroPolyExample`

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

.. _IntroOOP: 

Interactive: Introduction to Object Oriented Programming
---------------------------------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html
   
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/JavaOOPObjects.pdf"  target="_blank">
      <img src="../html/_static/Images/projector-screen.png" width="32" height="32">
      JavaOOPObjects.pdf</img>
      </a>


.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_td3bp4s0' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
   </center>

Checkpoint 1
------------

.. avembed:: Exercises/SWDesignAndDataStructs/OOP1Checkpoint1Summ.html ka
   :long_name: Checkpoint 1

.. _IntroUML: 

Interactive: Java UML Diagrams
------------------------------

.. admonition:: Follow Along and Engage
   
       Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!
   
      .. raw:: html
      
         <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/JavaOOPUML.pdf"  target="_blank">
         <img src="../html/_static/Images/projector-screen.png" width="32" height="32">
         JavaOOPUML.pdf</img>
         </a>
         <br>
         <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStruct/course-notes/OOPUMLDiagramKey.pdf" target="_blank">
         <img src="../html/_static/Images/uml.png" width="32" height="32">
         UML Diagram from the example in the video</img>
         </a>
   
   
   .. raw:: html
   
      <center>
      <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_phzs60ad' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
      </center>


Programming Practice: Object Oriented Programming
-------------------------------------------------

.. extrtoolembed:: 'Programming Practice: Object Oriented Programming'
   :workout_id: 1906

.. _IntroInheritance: 

Interactive: Java Inheritance: this, super [11:15]
--------------------------------------------------

.. admonition:: Follow Along, Practice and Explore

    Download to run and explore the java file (see below) from the video on your own in eclipse. You may download the standalone \*.java file for this example. To run the standalone \*.java file you will need to 
    
        1) create a new Eclipse project, then 
        2) create a package within the project called “example” (the package named at the top of the class MUST match the package the file is placed in within the Eclipse project), and finally 
        3) download and import the standalone \*.java file(s) to the created package.

   .. raw:: html
   
        <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/JavaOOPInheritenceSuperThis.pdf"  target="_blank">
        <img src="../html/_static/Images/projector-screen.png" width="32" height="32">
        Video Slides Java OOP Super This.pdf</img>
        </a>
        <br>
        <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/examples/exJavaOOP.zip"  target="_blank">
        <img src="../html/_static/Images/icons8-java60.png" width="32" height="32">
        CS2 Java OOP Example Eclipse Project</img>
        </a>
        


.. raw:: html
    
    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_25fplq8v' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>

Checkpoint 2
------------

.. avembed:: Exercises/SWDesignAndDataStructs/OOP1Checkpoint2Summ.html ka
   :long_name: Checkpoint 2

Interactive: Java Inheritance: equals(), toString()
---------------------------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html
   
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/JavaOOPInheritenceEqualsToString.pdf"  target="_blank">
      <img src="../html/_static/Images/projector-screen.png" width="32" height="32">
      JavaOOPInheritenceEqualsToString.pdf</img>
      </a>


.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_ml9sbz2y' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
   </center>


Java OOP Checkpoint 3
---------------------
.. avembed:: Exercises/SWDesignAndDataStructs/OOP1Checkpoint3Summ.html ka
   :long_name: Checkpoint 3

.. _IntroPolyMeasure: 

Interactive: Polymorphism Measurable Interface
----------------------------------------------

.. admonition:: Try It Yourself

    Download to run and explore the java file (see below) from the video on your own in eclipse. You may download the standalone \*.java file for this example. To run the standalone \*.java file you will need to 
    
        1) create a new Eclipse project, then 
        2) create a package within the project called “example” (the package named at the top of the class MUST match the package the file is placed in within the Eclipse project), and finally 
        3) download and import the standalone \*.java file(s) to the created package.
    
    .. raw:: html
    
        <!-- TODO: Code link? ok there is an exMeasurable.zip, need that listed here?? not sure how syncs with admonition-->
        <br>
        <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/JavaOOPPolyMeasurable.pdf" target="_blank">
        <img src="../html/_static/Images/projector-screen.png" width="32" height="32">
        Video Slides JavaOOPPolyMeasurable.pdf</img>
        </a>

.. raw:: html

    <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_ywzatt7g' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
    </center>


Checkpoint 4
------------

.. avembed:: Exercises/SWDesignAndDataStructs/OOP2Checkpoint4Summ.html ka
   :long_name: Checkpoint 4


Programming Practice: Polymorphism 1
------------------------------------

.. extrtoolembed:: 'Programming Practice: Polymorphism 1'
   :workout_id: 1907

.. _IntroPolySuper: 

Interactive: Polymorphism Computer Superclass
---------------------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html
   
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/JavaOOPPolyComputer.pdf"  target="_blank">
      <img src="../html/_static/Images/projector-screen.png" width="32" height="32">
      JavaOOPPolyComputer.pdf</img>
      </a>


.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_pkxo2beb' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
   </center>

Checkpoint 5
------------

.. avembed:: Exercises/SWDesignAndDataStructs/OOP2Checkpoint5Summ.html ka
   :long_name: Checkpoint 5

.. _IntroPolyExample: 

Interactive: Polymorphism Integer Example
-----------------------------------------

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!

   .. raw:: html
   
      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/JavaOOPPolyInteger.pdf"  target="_blank">
      <img src="../html/_static/Images/projector-screen.png" width="32" height="32">
      JavaOOPPolyInteger.pdf</img>
      </a>


.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=0_33oovpxg' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
   </center>    

Checkpoint 6
------------

.. avembed:: Exercises/SWDesignAndDataStructs/OOP2Checkpoint6Summ.html ka
   :long_name: Checkpoint 6


Programming Practice: Polymorphism 2
------------------------------------

.. extrtoolembed:: 'Programming Practice: Polymorphism 2'
   :workout_id: 1908
