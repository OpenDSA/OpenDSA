.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

=========
Midterm 2
=========

Midterm 2 Structure
-------------------

.. revealjs-slide::

* Monday/Tuesday, April 13/14
* 100 points
* Format

  * Similar to Midterm 1
  * The questions of of types that we can autograde:
    Multiple Choice, True/False, fill-in-the-blank, etc.

* Anything from Chapter 1-7 is fair to ask about, but focus is
  on chapters 8 and 10.
  (Chapters 9 and 11-14 will be covered on the final.)


Topics (1)
----------

.. revealjs-slide::

* Chapter 8: Sorting

  * How each of the algorithms work
  * Know the Best/Avg/Worst cost for each
  * Know the key proofs:

    * Lower bound for Exchange Sorts;
    * Why the worst case analysis for Radix Sort is :math:`\Theta(n \log n)`
    * Lower bound for sorting

      
Topics (2)
----------

.. revealjs-slide::

* Know how these sorting algorithms work, and their analysis.

  * Insertion Sort
  * Bubble Sort
  * Selection Sort
  * Shellsort
  * Mergesort
  * Quicksort
  * Heapsort
  * Radix Sort


Topics (3)
----------

.. revealjs-slide::

* Chapter 10: Hashing
* Solves exact match queries exceptionally well
* What makes a hash function good or bad

  * Hash functions: Mod, Binning, mid-square, strings

* What makes a collision resolution good or bad

  * linear probing (possibly by steps)
  * pseudo-random probing
  * quadratic probing
  * double hashing

* How full the table ought to be for good performance
  (tradeoff of space vs. time)
* Expected cost analysis for hashing (when properly implemented)
