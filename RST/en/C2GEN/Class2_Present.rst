.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :satisfies: OpenDSA Introduction
   :topic: Introduction

Class 2: Presentation
=====================

Instructor's tools
------------------

OpenDSA has basic support to let instructors:

*  create assignments
*  track student progress (gradebook)

**Caveat:** All of this is going to change by Spring 2016
(possibly by Fall 2015).

*  By then we will be implementing using LTI with integration into
   various standard LMS sytems (first target is Canvas).

For details on the current system, see:

*  `Examples <http://algoviz.org/OpenDSA/instructors.html>`_
*  `Documentation <http://opendsa.readthedocs.org/en/latest/InstructorTools.html>`_


Configuring a book instance
---------------------------

OpenDSA textbook instances are compiled from configuration files.

*  Select written and programming language(s)
*  Select modules
*  Configure exercises
*  There are some controls over whether given sections are included or
   not.

Look at the
`configuration file <https://github.com/OpenDSA/OpenDSA/blob/master/config/C2GEN.json>`_
for the book instance that you are
looking at right now.

OpenDSA Classroom Use
---------------------

*  Virginia Tech CS3:

   *  Fall 2012/Spring 2013 (sorting, hashing): 200 students
   *  Fall 2013, Spring 2014, Fall 2014 (full semester): 500 students

      I found that I could spend much less time on "procedural"
      aspects of various algorithms, and more on deeper concepts
      (analysis) or on programming issues.

*  Virginia Tech CS2:

   *  Spring, Summer, Fall 2014, Spring 2015: 250 students
   *  Linear structures, simple sorts, binary trees intro
   *  Some experimentation with "flipped classroom"

*  Virginia Tech Senior/Graduate algorithms:

   * Spring 2015, 60 students (NP Completeness)

*  Other schools where OpenDSA has been used in 2014 and 2015:
   University of Alexandria, Egypt, 
   Beloit College,
   New York University,
   Aalto University, Finland,
   University of Texas, El Paso,
   Linkoping, Sweden,
   Florida International University,
   Valparaiso University,
   Christopher Newport University.


Log Data Collection and Results
-------------------------------

We log all user interactions (mouse clicks, pages visited, timestamps,
exercises completed, slides viewed, window focus/unfocus, etc.)

Goals:

*  Learn about effective/ineffective exercises (time spent, use for
   study practice, etc.)
*  Learn about general system behavior (to see what is effective, what
   aspects are "gamed")
*  Learn patterns of use like time distribution, whether OpenDSA used
   to study

We also collect a lot of survey data.


Examples
--------

Question: Do students want the "gamification" feedback?

.. odsafig:: Images/Gamification.png
   :width: 400
   :align: center
   :capalign: center
   :figwidth: 90%
   :alt: Gamification

   Gamification: Survey data.


Question: Do students try to "game" the system by reading the hints to get the
question answers for later?

.. odsafig:: Images/Hints.png
   :width: 400
   :align: center
   :capalign: center
   :figwidth: 90%
   :alt: Hints

   Hints vs. fraction of incorrect answers


Question: Do students view the "model" answers in the proficiency exercises?

.. odsafig:: Images/ModelAnswer.png
   :width: 400
   :align: center
   :capalign: center
   :figwidth: 90%
   :alt: Model Answer

   Looking at model answers


Question: Do students read analytical material?

.. odsafig:: Images/QuicksortTime.png
   :width: 400
   :align: center
   :capalign: center
   :figwidth: 90%
   :alt: Quicksort Time

   Time spent reading Quicksort analysis material


Question: Do students use OpenDSA to study?

.. odsafig:: Images/cao1.png
   :width: 400
   :align: center
   :capalign: center
   :figwidth: 90%
   :alt: Time

   Time distribution of user interactions (CS3, Fall 2013)


.. odsafig:: Images/cs2114_dist1.png
   :width: 400
   :align: center
   :capalign: center
   :figwidth: 90%
   :alt: Time

   Time distribution of user interactions (CS2, Spring 2014)

Some other questions:

*  Do students spend enough time on Recursion? (instructor surveys)
*  Do we have proper coverage on key topics like recursion?
   (instructor surveys, Concept Inventory process)
