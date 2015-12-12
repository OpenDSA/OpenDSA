.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :satisfies: problems; algorithms; functions
   :topic: Algorithm Analysis

.. odsalink:: AV/AlgAnal/ProblemAlgorithmCON.css

Problems, Algorithms, and Programs
==================================

Problems, Algorithms, and Programs
----------------------------------

Problems
~~~~~~~~

Programmers commonly deal with problems, algorithms, and
computer programs.
These are three distinct concepts.

As your intuition would suggest, a :term:`problem` is
a task to be performed.
It is best thought of in terms of inputs and matching outputs.
A problem definition should not include any constraints on
*how* the problem is to be solved.
The solution method should be developed only after the problem is
precisely defined and thoroughly understood.
However, a problem definition should include constraints on the
resources that may be consumed by any acceptable
solution.
For any problem to be solved by a computer, there are always such
constraints, whether stated or implied.
For example, any computer program may use only the main memory
and disk space available, and it must run in a "reasonable" amount
of time.

Problems can be viewed as functions in the mathematical sense.
A :term:`function` is a matching
between inputs (the :term:`domain`) and outputs (the :term:`range`).
An input to a function might be a single value or a
collection of information.
The values making up an input are called the
:term:`parameters` of the function.
A specific selection of values for the parameters is called an
:term:`instance <problem instance>` of the problem.
For example, the input parameter to a sorting function might be an
array of integers.
A particular array of integers, with a given size and specific values
for each position in the array, would be an instance of the sorting
problem.
Different instances might generate the same output.
However, any problem instance must always result in the same output
every time the function is computed using that particular input.

This concept of all problems behaving like mathematical functions
might not match your intuition for the behavior of computer programs.
You might know of programs to which you can give the same input value
on two separate occasions, and two different outputs will result.
For example, if you type ``date`` to a typical Linux command
line prompt, you will get the current date.
Naturally the date will be different on different days, even though
the same command is given.
However, there is obviously more to the input for the date program
than the command that you type to run the program.
The date program computes a function.
In other words, on any particular day there can only be a single
answer returned by a properly running date program on a completely
specified input.
For all computer programs, the output is completely determined by the
program's full set of inputs.
Even a "random number generator" is completely determined by its
inputs (although some random number generating systems appear to get
around this by accepting a random input from a physical
process beyond the user's control).
The limits to what functions can be implemented by programs is part of
the domain of :ref:`Computability <computability> <Computability>`.

Algorithms
~~~~~~~~~~

An :term:`algorithm` is a method or a process followed to
solve a problem.
If the problem is viewed as a function, then an algorithm is an
implementation for the function
that transforms an input to the corresponding output.
A problem can be solved by many different algorithms.
A given algorithm solves only one
problem (i.e., computes a particular function).
OpenDSA modules cover many problems, and for several of these
problems we will see more than one algorithm.
For the important problem of sorting there are over a dozen commonly
known algorithms!

The advantage of knowing several solutions to a problem is that
solution :math:`\mathbf{A}` might be more efficient than solution
:math:`\mathbf{B}` for a specific variation of the problem, or for a
specific class of inputs to the problem, while solution
:math:`\mathbf{B}` might be more efficient than 
:math:`\mathbf{A}` for another variation or class of inputs.
For example, one sorting algorithm might be the best
for sorting a small collection of integers (which is important if you
need to do this many times).
Another might be the best for sorting a large collection of integers.
A third might be the best for sorting a collection of variable-length
strings.

By definition, something can only be called an algorithm if it has all
of the following properties.

#. It must be *correct*.
   In other words, it must compute the desired function, converting
   each input to the correct output.
   Note that every algorithm implements some function,
   because every algorithm maps every input to some output (even if
   that output is a program crash).
   At issue here is whether a given algorithm implements the 
   *intended* function.

#. It is composed of a series of *concrete steps*.
   Concrete means that the action described by that step is
   completely understood --- and doable --- by the person or machine
   that must perform the algorithm.
   Each step must also be doable in a finite amount of time.
   Thus, the algorithm gives us a "recipe" for solving the problem by
   performing a series of steps, where each such step is within our
   capacity to perform.
   The ability to perform a step can depend on who or what is intended
   to execute the recipe.
   For example, the steps of a cookie recipe in a cookbook might be
   considered sufficiently concrete for instructing a human cook,
   but not for programming an automated cookie-making factory.

#. There can be *no ambiguity* as to which step will be performed
   next.
   Often it is the next step of the algorithm description.
   Selection (e.g., the ``if`` statement)
   is normally a part of any language for describing algorithms.
   Selection allows a choice for which step will be
   performed next, but the selection process is unambiguous at the
   time when the choice is made.

#. It must be composed of a *finite* number of steps.
   If the description for the algorithm were made up of an infinite
   number of steps, we could never hope to write it down, nor
   implement it as a computer program.
   Most languages for describing algorithms (including English
   and "pseudocode") provide some way to perform
   repeated actions, known as iteration.
   Examples of iteration in programming languages include the
   ``while`` and ``for`` loop constructs.
   Iteration allows for short descriptions, with the number of
   steps actually performed controlled by the input.

#. It must *terminate*.
   In other words, it may not go into an infinite loop.


Programs
~~~~~~~~

We often think of a computer :term:`program` as an
instance, or concrete representation, of an algorithm in some
programming language.
Algorithms are usually presented in terms of programs,
or parts of programs.
Naturally, there are many programs that are instances of the same
algorithm, because any modern computer programming language can be
used to implement the same collection of algorithms (although some
programming languages can make life easier for the programmer).
To simplify presentation,
people often use the terms "algorithm" and "program" interchangeably,
despite the fact that they are really separate concepts.
By definition, an algorithm must provide sufficient
detail that it can be converted into a program when needed.

The requirement that an algorithm must terminate means that not all
computer programs meet the technical definition of an algorithm.
Your operating system is one such program.
However, you can think of the various tasks for an operating system
(each with associated inputs and outputs) as individual problems,
each solved by specific algorithms implemented by a part of the
operating system program, and each one of which terminates once its
output is produced.


Summary
~~~~~~~

To summarize:
A :term:`problem` is a function or a mapping of
inputs to outputs.
An :term:`algorithm` is a recipe for
solving a problem whose steps are concrete and unambiguous.
Algorithms must be correct, of finite length, and must terminate
for all inputs.
A :term:`program` is an instantiation of an algorithm
in a programming language.
The following slideshow should help you to visualize the differences.

.. inlineav:: ProblemAlgorithmCON ss
   :output: show


Summary Questions
~~~~~~~~~~~~~~~~~

.. avembed:: Exercises/AlgAnal/AnalPrelimSumm.html ka 

.. odsascript:: AV/AlgAnal/ProblemAlgorithmCON.js
