.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

===================================================
Data Structures and Algorithm Analysis Introduction
===================================================

Course Introduction
===================

.. revealjs-slide::

* Goals of this Course:

  * Reinforce the concept that costs and benefits exist for every data
    structure.
  * Learn the commonly used data structures.

    * These form a programmer's basic data structure "toolkit".

  * Understand how to measure the cost of a data structure or program.

    * These techniques also allow you to judge the merits of new data
      structures that you or others might invent.


Costs and Benefits
==================

.. revealjs-slide::

* Each data structure has costs and benefits.

  * Rarely is one data structure better than another in all situations.

* Any data structure requires:

  * space for each data item it stores,
  * time to perform each basic operation,
  * programming effort.

* Only after a careful analysis of problem characteristics can we
  know the best data structure for a task.

Data Structure
==============

.. revealjs-slide::

* A data structure is the physical implementation of an ADT.

  * Each operation associated with the ADT is implemented by one
    or more subroutines in the implementation.

* Data structure usually refers to an organization for data in main
  memory.
* File structure: an organization for data on peripheral storage, such
  as a disk drive.

  
Logical vs. Physical Form
=========================

.. revealjs-slide::

* Data items have both a logical and a physical form.

* Logical form: definition of the data item within an ADT.

  * Ex: Integers in mathematical sense: +, -

* Physical form: implementation of the data item within a data
  structure.

  * Ex: 32/64 bit integers, overflow.

    
Logical vs. Physical Form (2)
=============================

.. revealjs-slide::

.. inlineav:: ADTCON dgm
   :links: AV/Design/ADTCON.css
   :scripts: AV/Design/ADTCON.js
   :output: show
   :align: center


Image Test
==========

Sparse Matrix:

.. image:: /Images/Sparse.png
   :width: 500
   :align: center
   :alt: Sparse Matrix


Fragment Test
=============

.. revealjs-fragments::

   * fragment #1 
   * fragment #2
   * fragment #3