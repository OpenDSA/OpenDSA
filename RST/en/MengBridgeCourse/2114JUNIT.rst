.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino

Revisit Java Unit Testing
=========================

Objectives
----------

Upon completion of this module, students will be able to:

* Review the basics of a java class including fields, constructors, methods, parameters, and use of the keyword this
* Review debugging code and code coverage
* Implement variations for JUnit assert statements

Interactive: Introduction to Hokie Class [6:07]
-----------------------------------------------

In this discussion we will be revisiting good testing practices with an example class called "Hokie Class".

.. admonition:: Follow Along, Practice and Explore


   In Eclipse, use the *Project > Download Assignment...* menu command to download the exercise project named "ex07.01-BuggyHokie". Use this example to follow along with the following video. Feel free to experiment. 
   
   Refer to `01.02: Lab: LightBot for Beginners <https://profdev-lms.tlos.vt.edu/courses/2832/assignments/10634>`_ if you need to review the instructions for downloading Eclipse projects.


    .. raw:: html
    
         <center>
           <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_0850nht8' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Introduction to Hokie Class"></iframe> 
         </center>


Checkpoint 1
------------

.. avembed:: Exercises/MengBridgeCourse/JunitCheckpoint1Summ.html ka
   :long_name: Checkpoint 1


Intro to Hokie Class JUnit Testing
----------------------------------

A Note about Assert Statements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

So far in the course when we want to test that a piece of code acted the way we wanted, we'd run a statement like:

.. code-block:: java

   assertThat(<something we want to check>).isEqualTo(<expected value>);


This is a more modern style that's intended to be more readable. However, there is a different form of syntax you can use to create assertions:


.. code-block:: java

   assertEquals(<expected value>, <something we want to check>);

This second kind of assert statement is more commonly used today, but it can be tricky to use correctly.  When using ``assertEquals``, it can be easy to put the value we want to check first and the expected value second.

For example, say we wanted to check that a variable ``x`` was equal to 5.

.. code-block:: java

   int x = 4;
   assertEquals(x, 5);

Writing like this would be syntactically correct, but potentially confusing because the failure message would read "Expected [4] but got [5]".  In reality, we were *expecting* 5 but *got* 4.

Videos in the second half of the course will be using this second, more commonly used syntax.  You can continue to use either version.  Below, is a table of assertions in both styles. Remember both the isEqualto() and assertEquals() methods use the equals method for the object parameters, be sure to understand how the corresponding equals method works for the objects being compared.

.. list-table:: Assertions
   :header-rows: 1

   * - Task
     - AssertThat Style
     - Traditional Style
     - Notes
   * - Checking that ``x`` is equal to 5
     - ``assertThat(x).isEqualTo(5);``
     - ``assertEquals(5, x);``
     - While the new style has a ``.isNotEqualTo()``, there is no ``assertNotEquals()`` in the old style
   * - Check that a double ``x`` is equal to double ``y``
     - ``assertThat(x).isEqualTo(y, within(0.01));``
     - ``assertEquals(y, x, 0.01);``
     -
   * - Checking that ``x`` is ``true``
     - ``assertThat(x).isTrue();``
     - ``assertTrue(x);``
     -
   * - Checking that ``x`` is ``false``
     - ``assertThat(x).isFalse();``
     - ``assertFalse(x);``
     -
   * - Checking that ``x`` is ``null``
     - ``assertThat(x).isNull();``
     - ``assertNull(x);``
     -
   * - Checking that ``x`` is *not* ``null``
     - ``assertThat(x).isNotNull();``
     - ``assertNotNull(x);``
     -
   * - Checking two object variables refer to the same space in memory
     - ``assertThat(obj1).isSameAs(obj2);``
     - ``assertSame(obj2, ob1);``
     -


Interactive: Hokie Class JUnit Testing [19:37]
----------------------------------------------
 .. admonition:: Follow Along and Engage
      
          Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!
      
         .. raw:: html
         
            <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/7.1.4.1-JavaUnitTesting.pdf" target="_blank">
            <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" alt="" width="32" height="32">
               Video Slides 7.1.4.1-JavaUnitTesting.pdf
            </a>
      
      
      .. raw:: html
      
         <center>
         <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_35cpol6i' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Hokie Class JUnit Testing"></iframe> 
         </center>
 

Checkpoint 2
------------

.. avembed:: Exercises/MengBridgeCourse/JunitCheckpoint2Summ.html ka
   :long_name: Checkpoint 2

Review of Writing JUnit Tests with student.TestCase [9:57]
----------------------------------------------------------

.. raw:: html

     <center>
    <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_zj2voxbz' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Review of Writing JUnit Tests with student.TestCase"></iframe> 
     </center>

Additional reference for writing JUnit Tests:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

`Writing JUnit Tests With Student TestCase <2114_junit_tutorial.html>`_

`A Whirlwind Introduction to JUnit <https://web-cat.org/eclstats/junit-quickstart/>`_

Checkpoint 3
------------

.. avembed:: Exercises/MengBridgeCourse/JunitCheckpoint3Summ.html ka
   :long_name: Checkpoint 3

