.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

==================
Project Management
==================

Project Management
------------------

.. revealjs-slide::

* Project management is a skill

  * It has to be learned
  * It has to be practiced

* Any skill-based class will typically grade you on process

  * Consider taking a class to learn Tennis

* This semester, we will pay a lot of attention to your **process**


Scheduling
----------

.. revealjs-slide::

* Managing large-scale projects involves scheduling activities

  * It is human nature to work better toward intermediate milestones.

* The same concepts can/should be applied to mid-sized projects
  encountered in class.

  * For any project needing more than a week to complete, break into parts
    and design a schedule with milestones and deliverables.
  * Find some way to keep track of details.

   .. note::

      For me, programming takes a lot of focus and concentration. One
      concern for me is the many details to remember. I use "todo"
      lists a lot. I find things like the GitHub Issue Tracker invaluable
      for bigger projects (but that might be overkill for CS3114 class
      projects). The key thing is to write down any details that occur to
      you that you don't want to deal with right this instant.


Historical Data
---------------
.. revealjs-slide::

* Relationship between final score on a project (Y axis)
  and % of total time spent by about a week before the due date (X axis).

.. image:: /Images/ProgramTime.png
   :width: 400
   :align: center
   :alt: Programmer time data


Historical Data 2
-----------------

.. revealjs-slide::

* Results were significant:

  * 90% of scores below median were students who did less than 50% of the
    project prior to the last week.
  * Few did poorly who put in > 50% time early
  * Some did well who didn’t put in >50% time early, but most who did well
    put in the early time

* Correlations:

  * Strong correlation between early time and high score
  * No correlation between total time spent and score
  * No correlation between % early time and total time


What is the Mechanism?
----------------------

.. revealjs-slide::

* Correlations do not necessarily mean causation

  * Do they behave that way because they are good, or does
    behaving that way make them good?
  * But, we have data from students who sometimes spread their
    work over time (they generally did better) vs. doing work at
    the last minute (they generally did worse)

* Why would this matter?

  * Spreading projects over time allows the “sleep on it”
    heuristic to operate
  * Avoiding the “zombie” effect makes people more productive
    (and cuts time requirements)

    
How to fail at implementing your project:
-----------------------------------------

.. revealjs-slide::

* Write the project
* Debug the project


How to succeed at implementing your project:
--------------------------------------------

.. revealjs-slide::
   
* Write the smallest possible kernel then debug that kernel thoroughly
* Repeat until completion:

  * Add a functional unit
  * Debug the resulting program

* Do mechanics early

  * Example: Submit to Web-CAT early to make sure the process works.
  * You more-or-less might control how fast you work on the project,
    but you can't control how long it takes to fix outside things when
    something goes wrong.

* Do a full structural design before starting implementation
* Implement the tricky parts last (get the most bang for your time
  buck early)


How to Survive These Projects
-----------------------------

.. revealjs-slide::
   
* Keys to success:

* Have a method for keeping track of all the details

  * You can't remember it all

* Rational Planning (and keeping to the plan)

  * Spread the work over time

* Incremental Development

  * Interleave writing and debugging

   
Being Organized
---------------

.. revealjs-slide::

* Software development has so many details

  * Spec requirements
  * Program interactions

* So does Life

  * Assignments and other things to do

* You can't turn this on/off

  * Either you get in the habit of developing in an organized way,
    or you can't succeed as a software developer
  * Part of it is developing the attitude of "sweating the details"
  * Part of it is having the coping mechanisms to handle the
    details (organizational tactics)


Memory Can't Handle It
----------------------

.. revealjs-slide::

* Externalize

  * TODO lists (What)
  * Scheduling (The Plan for How)
  * Issue trackers
  * Documenting/Commenting
  * Be able to update lists at any time,
  * Repository: GitHub


Spread Work Over Time
---------------------

.. revealjs-slide::

* For anything beyond a small software project, you must have a
  plan/schedule
* Explicitly develop a schedule:

  * Break into pieces: List of subtasks
  * Deadlines for subtasks
  * Realistic, enough flexibility built in
  * Continuously modify and refine the plan


Incremental Development
-----------------------

.. revealjs-slide::

* Break the project into a small initial core

  * Implement and TEST and COMMENT the core
  * Then gradually add functionality
  * On any given day, write only as much code as you have time to debug
    THAT DAY
  * This works well with Scheduling and Organizing

   .. note::

      For our projects, you need implementation, comments, and tests.
      If you write the comments (especially javadoc comments) and the
      tests when you add a functional unit, its not that big a burden.
      If you add them at the end, it feels really tedious (and you don't
      get any of the benefits).


Milestones
----------

.. revealjs-slide::

* Big positive effect with milestones (introduced in Spring 2016)
  vs. without (control group: Fall 2014).

.. math::

   \begin{array} {crr}
   \hline
      & S16 &F14\\
   \hline
   A& 43\%& 23\%\\
   B& 16\%& 22\%\\
   C& 11\%& 11\%\\
   D/C-& 8\%& 6\%\\
   F& 4\%& 5\%\\
   \textrm{Drop}& 19\%& 33\%\\
   \hline
   \end{array}


Working with a Partner (1)
--------------------------

.. revealjs-slide::

* Typically, about half to 2/3 of students work with a partner.
* As a population, we cannot distinguish differences in performance
  in terms of score distribution between partnerships and singles.
* Data indicate that each member of partnership works about 80% as
  much as a person working alone.
  

Working with a Partner (2)
--------------------------

.. revealjs-slide::

* About 1/3 of partnerships end badly.
  
  * The common complaint is one blaming the other for "letting me down".

* Two approaches:
  
  * Divide and Conquer: Bad
  * Extreme Programming: Good

.. note::

   Historically, about 1/3 of CS3114 partnerships have
   crashed-and-burned. The most common culprit appears to be that one
   person thought that the other person "let me down". This stems from
   (is even possible because of) lack of cohesiveness. Meaning: The
   did not work together.

   Divide-and-conquer reduces to "throw it over the wall". Even if
   both parties hold up their end, this leads to inefficiencies in
   putting the pieces together. And its easier to work without design
   discipline. With two pairs of eyes on everything, quality is more
   likely.

   Extreme Programming: Everything is done together. Design
   together. Code together. Debug together.

   The one place where you might want to separate: "Tiger-team
   testing". Meaning, one person writes test cases for the other
   person's code.
