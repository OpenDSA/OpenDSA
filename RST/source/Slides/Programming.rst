.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False


==================
Program Management
==================

.. slide:: Historical Data
   :level: 1

   .. _ProgramerData:

   .. figure:: Images/ProgramTime.png
      :width: 400
      :align: center
      :alt: Programmer time data

   * X axis is % of total time spent by about one week before program
     due date.
   * Y axis is score.

.. slide:: Historical Data 2

   * Results were significant:
      * 90% of scores below median were students who did less than 50% of the
        project prior to the last week.
      * Few did poorly who put in > 50% time early
      * Some did well who didn’t put in >50% time early, but most who did well
        put in the early time

.. slide:: Historical Data 3

   * Correlations:
      * Strong correlation between early time and high score
      * No correlation between time spent and score
      * No correlation between % early time and total time

.. slide:: What is the Mechanism?

   * Correlations do not necessarily mean causation
      * Do they behave that way because they are good, or does
        behaving that way make them good?
      * But, we have data from students who sometimes spread their
        work over time (and generally doing better) vs. doing work at
        the last minute (and generally doing worse)
   * Why would this matter?
      * Spreading projects over time allows the “sleep on it”
        heuristic to operate
      * Avoiding the “zombie” effect makes people more productive
        (and cuts time requirements)

.. slide:: How to fail at implementing your project

   * Write the project
   * Debug the project

.. slide:: How to succeed at implementing your project

   * Write the smallest possible kernel
   * Debug the kernel thoroughly
   * Repeat until completion:
      * Add a functional unit
      * Debug the resulting program
      * Have a way to track details
