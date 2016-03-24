.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps


Recursive Functions
===================

RP 19 Part 1
------------

This problem will give you practice with fixed-point combinators.

To reduce syntactic clutter in this problem, we will take some
shortcuts in writing :math:`\lambda` expressions. First, we will drop
all but the first :math:`\lambda` and all but the last dot for
(curried) functions with two or more parameters. So, for example, we
will use:

.. math::

         \lambda abcd.E

as an abbreviation for:

.. math::
         \lambda a.\!\lambda b.\!\lambda c.\!\lambda d.E


Second, to cut down on parentheses, we will use :math:`(u\ v\ w\ x\ y\
z)` as an abbreviation for :math:`(((((u\ v)\ w)\ x)\ y)\ z)`. In
essence, we are making function application left-associative. **This
notation is to be used only for this review problem.  Do NOT use it
for any assignments, exams, or other review problems.**

.. avembed:: Exercises/PL/RP19part1.html ka
