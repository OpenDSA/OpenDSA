.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :satisfies: algorithm analysis chapter introduction
   :topic: Algorithm Analysis

Chapter Introduction
====================

How long will it take to process the company payroll once we complete
our planned merger?
Should I buy a new payroll program from vendor X or vendor Y?
If a particular program is slow, is it badly implemented or is it
solving a hard problem?
Questions like these ask us to consider the difficulty of a problem,
or the relative efficiency of two or more approaches to solving a
problem.

This chapter introduces the motivation, basic notation, and
fundamental techniques of algorithm analysis.
We focus on a methodology known as
:term:`asymptotic algorithm analysis`, or simply
:term:`asymptotic analysis`.
Asymptotic analysis attempts to estimate the resource
consumption of an algorithm.
It allows us to compare the relative costs of two or more
algorithms for solving the same problem.
Asymptotic analysis also gives algorithm designers a tool for
estimating whether a proposed solution is likely to meet the resource
constraints for a problem before they implement an actual
program.
After reading this chapter, you should understand

* the concept of a :term:`growth rate`,
  the rate at which the cost of an algorithm grows
  as the size of its input grows;

* the concept of an :term:`upper bound` and :term:`lower bound` for a
  growth rate, and how to estimate these bounds for a simple program,
  algorithm, or problem; and

* the difference between the cost of an :term:`algorithm`
  (or program) and the cost of a :term:`problem`.

The chapter concludes with a brief discussion of the
practical difficulties encountered when empirically measuring the cost
of a program, and some principles for code tuning
to improve program efficiency.
