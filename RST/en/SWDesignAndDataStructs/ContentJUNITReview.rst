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

Introduction to Hokie Class
---------------------------

In this discussion we will be revisiting good testing practices with an example
class called "Hokie Class".

Testing Code Example
~~~~~~~~~~~~~~~~~~~~

.. admonition:: Try It Yourself

   In Eclipse, use the *Project > Download Assignment...* menu command to download the exercise project named "ex07.01-BuggyHokie". Use this example to follow along with the following video. Feel free to experiment. 
   
   Refer to `01.02: Lab: LightBot for Beginners <https://profdev-lms.tlos.vt.edu/courses/2832/assignments/10634>`_ if you need to review the instructions for downloading Eclipse projects.

[6:07] Introduction to Hokie Class
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_0850nht8&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[hotspots.plugin]=1&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_57q5cew0" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>


Checkpoint 1
------------

.. avembed:: Exercises/MengBridgeCourse/JunitCheckpoint1Summ.html ka
   :long_name: Checkpoint 1


Intro to Hokie Class JUnit Testing
----------------------------------

A Note about Assert Statements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

So far in the course when we want to test that a piece of code acted the way we
wanted, we'd run a statement like:

.. code-block:: java

   assertThat(<something we want to check>).isEqualTo(<expected value>);


This is a more modern style that's intended to be more readable.
However, there is a different form of syntax you can use to create assertions:


.. code-block:: java

   assertEquals(<expected value>, <something we want to check>);

This second kind of assert statement is more commonly used today, but it can be
tricky to use correctly.  When using ``asserEquals``, it can be easy to put the
value we want to check first and the expected value second.

For example, say we
wanted to check that a variable ``x`` was equal to 5.

.. code-block:: java

   int x = 4;
   assertEquals(x, 5);

Writing like this would be syntactically correct, but potentially confusing because
the failure message would read "Expected [4] but got [5]".  In reality, we were
*expecting* 5 but *got* 4.

Videos in the second half of the course will be using this second, more commonly
used syntax.  You can continue to use either version.  Below, is a table of
assertions in both styles.

.. list-table:: Assertions
   :header-rows: 1

   * - Task
     - Newer Assertion Style
     - Older Assertion Style
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
     - ``assertTrue(x);``
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




[19:37] Hokie Class JUnit Testing
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_35cpol6i&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[hotspots.plugin]=1&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_m8r5pgfb" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>

.. raw:: html

   <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/7.1.4.1-JavaUnitTesting.pdf" target="_blank">
   <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
   Video Slides 7.1.4.1-JavaUnitTesting.pdf
   </a>

Checkpoint 2
------------

.. avembed:: Exercises/MengBridgeCourse/JunitCheckpoint2Summ.html ka
   :long_name: Checkpoint 2

Review of Writing JUnit Tests with student.TestCase
---------------------------------------------------

.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_zj2voxbz&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[hotspots.plugin]=1&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_jkkkycol" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>

Additional reference for writing JUnit Tests:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

`Writing JUnit Tests With Student TestCase <2114_junit_tutorial.html>`_

`A Whirlwind Introduction to JUnit <https://web-cat.org/eclstats/junit-quickstart/>`_

Checkpoint 3
------------

.. avembed:: Exercises/MengBridgeCourse/JunitCheckpoint3Summ.html ka
   :long_name: Checkpoint 3
