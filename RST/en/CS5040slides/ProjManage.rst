.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False


==================
Project Management
==================

Project Management
------------------

.. slide:: Project Management

   * Project management is a skill
      *   It has to be learned
      *   It has to be practiced
   
   * Any skill-based class will typically grade you on process
      *   Consider taking a class to learn Tennis
   
   * This semester, we will pay a lot of attention to your **process**
      *   We are working on ways to grade process
      *   (We are nto there yet -- Milestones and metrics for test
          suites are as close as we have come so far.)


.. slide:: Scheduling

   | Managing large-scale projects involves scheduling activities
   |   It is human nature to work better toward intermediate milestones.
   |
   | The same concepts can/should be applied to mid-sized projects
     encountered in class.
   |   For any project needing more than a week to complete, break into parts
       and design a schedule with milestones and deliverables.
   |   Find some way to keep track of details.

.. note::

   For me, programming takes a lot of focus and concentration. One
   concern for me is the many details to remember. I use "todo"
   lists a lot. I find things like the GitHub Issue Tracker invaluable
   for bigger projects (but that might be overkill for CS3114 class
   projects). The key thing is to write down any details that occur to
   you that you don't want to deal with right this instant.


.. slide:: Historical Data

   .. _ProgramerData:

   .. figure:: Images/ProgramTime.png
      :width: 400
      :align: center
      :alt: Programmer time data

   | X axis is % of total time that will ever be spent at a point
     about one week before program due date.
   | Y axis is score.


.. slide:: Historical Data 2

   | Results were significant:
   |   For CS3114/5040 projects, those who spend at least half their
       eventual project time prior to one week before project is due will
       perform far better on average.
   |   90% of scores below median were students who did less than 50% of the
       project prior to the last week.
   |   Few did poorly who put in > 50% time early
   |   Some did well who didn’t put in >50% time early, but most who did well
       put in the early time

   
.. slide:: Historical Data 3

   | Correlations:
   |   Strong correlation between early time and high score
   |      (People who start early tend to do better.)
   |   No correlation between total time spent and score
   |      (Some people just program faster than others, which is not
          directly tied to quality. There is more difference in time
          required by non-novice programmers than in almost anything
          else that people do!)
   |   No correlation between % early time and total time
   |      (Starting early does NOT lead to spending more total time.)


.. slide:: What is the Mechanism?

   | Correlations do not necessarily mean causation
   |   Do they behave that way because they are good, or does
       behaving that way make them good?
   |   But, we have data from students who sometimes spread their
       work over time (and generally doing better) vs. doing work at
       the last minute (and generally doing worse)
   |   Milestones empirically lift the middle third of the
       class by a letter grade
   | Why would this matter?
   |   Spreading projects over time allows the “sleep on it”
       heuristic to operate
   |   Avoiding the “zombie” effect makes people more productive
       (and cuts time requirements)


.. slide:: How to fail at implementing your project:

     | Step 1: Write the project
     | Step 2: Debug the project


.. slide:: How to succeed at implementing

   | Write the smallest possible kernel
   | Debug that kernel thoroughly
   | Repeat until completion:
   |   Add a functional unit
   |   Debug the resulting program
   |   Have a way to track details
   | Do mechanics early
   | Do structural design before implementation
   | Implement the tricky parts last


.. slide:: How to Survive

   | Keys to success:

   | Keeping Track of all the details
   |   You can't remember it all

   | Rational Planning (and keeping to the plan)
   |   Spread the work over time

   | Incremental Development
   |   Interleave writing and debugging

   
.. slide:: Being Organized 1

   | Software development has so many details
   |   Spec requirements
   |   Program interactions

   | So does Life
   |   Assignments and other things to do


.. slide:: Being Organized 2

   | You can't turn this on/off
   |   Either you get in the habit of developing in an organized way,
       or you can't succeed as a software developer
   |   Part of it is developing the attitude of "sweating the details"
   |   Part of it is having the coping mechanisms to handle the
       details (organizational tactics)

.. note::

   The good news is that there is an alternative: there are plenty of
   jobs where someone will tell you what to do every minute of the day.
   The bad news is that they tend not to pay well. Many of these jobs
   involve hamburgers.


.. slide:: Memory Can't Handle It

   | Externalize
   |   TODO lists (What)
   |   Scheduling (The Plan for How)
   |   Issue trackers
   |   Documenting/Commenting
   |   Be able to update lists at any time,
   | Repository: GitHub


.. slide:: Spread Work Over Time

   | For anything beyond a small software project, you must have a
     plan/schedule
   | Explicitly develop a schedule:
   |   Break into pieces: List of subtasks
   |   Deadlines for subtasks
   |   Realistic, enough flexibility built in
   |   Continuously modify and refine the plan


.. slide:: Incremental Development

   | Break the project into a small initial core
   | Implement and TEST and COMMENT the core
   | Then gradually add functionality
   | On any given day, write only as much code as you have time to debug
     THAT DAY
   | This works well with Scheduling and Organizing

.. note::

   For our projects, you need implementation, comments, and tests.
   If you write the comments (especially javadoc comments) and the
   tests when you add a functional unit, its not that big a burden.
   If you add them at the end, it feels really tedious (and you don't
   get any of the benefits).


.. slide:: Milestones

   | Big positive effect with milestones (S16) vs without (F14)

   ====  ===   ===
         S16   F14
   ====  ===   ===
   A     43%   23%
   B     16%   22%
   C     11%   11%
   D/C-   8%    6%
   F      4%    5%
   Drop  19%   33%
   ====  ===   ===


.. slide:: Working with a Partner (1)

   | Typically, about half to 2/3 of students work with a partner (CS3114).
   | As a population, we cannot distinguish differences in performance
     in terms of score distribution between partnerships and singles.
   | Data indicate that each member of partnership works about 80% as
     much as a person working alone.
  

.. slide:: Working with a Partner (2)

   | About 1/3 of partnerships end badly (CS3114).
   |   The common complaint is one blaming the other for "letting me down".

   | Two approaches:
   |   Divide and Conquer: Bad
   |   "Extreme" Programming: Good

.. note::

   Historically, about 1/3 of CS3114 partnerships have
   crashed-and-burned. The most common culprit appears to be that one
   person thought that the other person "let me down". This stems from
   lack of cohesiveness. Meaning: They did not work together.

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
