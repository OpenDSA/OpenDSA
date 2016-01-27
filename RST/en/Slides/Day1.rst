.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. odsalink:: AV/Design/ADTCON.css

.. slideconf::
   :autoslides: False


===================
CS3114 Introduction
===================

.. slide:: Introduction

   What we are doing today:

   * Administration stuff
   * Course mechanics
   * Course introduction (OpenDSA Chapter 1)

.. slide:: Administration stuff

   .. rst-class:: build

   * Sign-in sheet (be sure to sign-in on one of them)
   * Get a copy of the syllabus
   * Force Add System: https://www.cs.vt.edu/S16Force-Adds, Password: 3114cas#
   * Consent forms (please return at end of class)

.. slide:: Course Mechanics

   .. rst-class:: build

   * Go over Syllabus
   * Course online support: Canvas, OpenDSA, Web-CAT

.. slide:: Canvas

   We will use Canvas

   * Project specs and supporting documents
   * Link to Piazza forum
   * Post grades
   * Access to OpenDSA (online textbook)

.. slide:: OpenDSA

  * Access OpenDSA through Canvas->Modules

  * Lots of visualizations, exercises

  * Mastery-based approach

  * Homework due most days before class

   .. rst-class:: build

    * Small homework due this Thursday morning

.. slide:: Web-CAT

  * Get the updated plugin
  * Project submission
  * Support for junit testing
  * Auto-grading: Correctness, style

.. slide:: Course Introduction

   Goals of this Course

   * Reinforce the concept that costs and benefits exist for every data
     structure.
   * Learn the commonly used data structures.
      * These form a programmer's basic data structure "toolkit".
   * Understand how to measure the cost of a data structure or program.
      * These techniques also allow you to judge the merits of new data
        structures that you or others might invent.

.. slide:: Role in the Curriculum

   * This course represents a transition between "learning to
     program" courses (CS 1114, CS 2114) and "content" courses.
   * To do well, you must be able to handle both
      * Programming (we focus on projects with dynamic memory allocation and
        file processing)
      * Content, theory and analysis

   .. rst-class:: build

   * The projects test programming proficiencies
   * OpenDSA exercises test knowledge of how algorithms work
   * Exams test understanding of the theory (analysis)

.. note:: 

   Most graduates from our department will tell you that this is one
   of the two hardest courses, and also one of the two most important
   for job preparation. So its both high effort and high value.


.. slide:: Costs and Benefits

   * Each data structure has costs and benefits.
      * Rarely is one data structure better than another in all situations.
   * Any data structure requires:
      * space for each data item it stores,
      * time to perform each basic operation,
      * programming effort.
   * Only after a careful analysis of problem characteristics can we
     know the best data structure for a task.

.. slide:: Data Structure

   * A data structure is the physical implementation of an ADT.
      * Each operation associated with the ADT is implemented by one
        or more subroutines in the implementation.
   * Data structure usually refers to an organization for data in main
     memory.
   * File structure: an organization for data on peripheral storage, such
     as a disk drive.

.. slide:: Logical vs. Physical Form

   * Data items have both a logical and a physical form.

   * Logical form: definition of the data item within an ADT.

      * Ex: Integers in mathematical sense: +, -

   * Physical form: implementation of the data item within a data
     structure.

      * Ex: 32/64 bit integers, overflow.

.. slide:: Logical vs. Physical Form (2)

   .. inlineav:: ADTCON dgm
      :output: show

.. slide:: Homework

  * Look at Canvas
  * Look at Project 1 spec: Will discuss next time
  * Do Chapter 1 exercises in OpenDSA by 11:00am Thursday

.. slide:: Before you leave today

  * Put your name and PID on sign-up sheet
  * If you need to add the course: Log in to
    https://www.cs.vt.edu/S16Force-Adds, Password: 3114cas#
  * Please return consent form

   .. odsascript:: AV/Design/ADTCON.js
