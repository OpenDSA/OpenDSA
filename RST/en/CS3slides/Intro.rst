.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False


===================================================
Data Structures and Algorithm Analysis Introduction
===================================================

Introduction
------------

.. slide:: Course Introduction

   Goals of this Course

   * Reinforce the concept that costs and benefits exist for every data
     structure.
   * Learn the commonly used data structures.
      * These form a programmer's basic data structure "toolkit".
   * Understand how to measure the cost of a data structure or program.
      * These techniques also allow you to judge the merits of new data
        structures that you or others might invent.

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
      :links: AV/Design/ADTCON.css
      :scripts: AV/Design/ADTCON.js
      :output: show
