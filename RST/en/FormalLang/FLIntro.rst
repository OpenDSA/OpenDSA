.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires:
   :satisfies: FL Introduction
   :topic: Introduction

Formal Languages
================

Introduction
------------

This eTextbook is intended for a senior-level course in Formal Languages.

Prerequisites
-------------

This is a CS "Theory" course.
In practice, that means a math course with applications to basic CS
applications.
This course assumes that you already have sufficient background in a
number of Computer Science topics .

You should have had a course in Discrete Math, covering at least the
following:

* Basic proof techniques like proof by contradition and induction.
* Basic techniques for solving summations and recurrence relations
* Set theory and relations

You should have had a course in Data Structures, covering at least the
following:

* Basic algorithm analysis, including big-oh, big-Omega, and
  :math:`\Theta` notations.
* Basic data structures and algorithms including lists, search
  structures such as BSTs, sorting algorithms, heaps, hashing, and
  basic graph algorithms.


What we will do
---------------

It is really hard to reason about the abilities of a modern Intel
processor with billions of transistors.
And you don't want to reinvent the wheel when you can process your
input with a regex parser or use a tool like YACC to generate a simple
compiler.
So, to help with these problems,
Computer Scientists have developed many simple models of computation,
each of which can be implemented relatively easily in software.

This course is about these various models of computation, how
complicated each one is, and what its limits are.
For example, if you know what you can or cannot do with a regular
expression, then you know whether to bother with trying to use regex
tools to solve a given problem.
Likewise, if you know the limits of the types of grammar supported by
a given compiler generator like YACC, then you know whether you can
use that tool to get your job done, or whether you need to go to the
much greater effort of "rolling your own" compiler.
This sort of question comes up often enough in the working life of a
practicing programmer that you want to know when a tool will solve
your problem or not.

By the end of this class, you will be able to answer questions like
the following.

* Can you write a program to determine if a string is an integer?

  * Examples: 9998.89  8abab  789342

   .. note:: 

      Ask them if they can do this. Ask them how they would solve it.

  * Can you do it if your machine had no additional memory other
    than the program itself?
    That is, you can’t store any values or look at them again.

   .. note::

      Ask them if they can solve this by looking at the symbols one at
      a time,
      without looking back at a previous symbol and without using memory to
      keep track of anything?    

      Answer: Yes.

* Can you write a program to determine if a string is a legal
  arithmetic expression?

  * Examples:

    * ((34 + 7 ∗ (18/6)))
    * (((((((a + b) + c) ∗ d(e + f)))))

    .. note::

       Ask them how they would solve this. What do they need to keep
       track of? Do they need a stack?

       Ask them if they could just determine if there are the correct number
       of parenthesis,
       and they are in the right order, (()(())) is good, ())( is not good.
       For this a stack will work, but ask them if you can solve this simpler
       than that, without a stack. You
       can actually do this with one integer variable: add one for left
       paren, subtract one for right paren.
       Start with 0, never go negative, and end with 0.

  * But, can you do it if if your machine had no additional memory other
    than the program itself?
    That is, you can’t store any values or look at them again.

    .. note::

       Ask them if they could solve the problem without a stack or an
       integer variable, with no
       additional memory other than the program. Can the program itself look
       at a particular expression
       and solve it.
       The answer is NO, you have to have memory to keep track of left
       versus right parenthesis.
       There is no way to solve this problem without extra memory.

   * Could you solve this problem (without memory) if you were limited
     to look at expressions of length 12 or less?

     .. note::

        YES you could. You could write a program to check each possible
        string. Note the alphabet would be
        finite, say N characters. How many possible strings are there to
        check? :math:`N^10`, some which are valid,
        some which are not. Your program would be brute force and incredibly
        huge and be of the form "If x
        is this string, then valid, else if x is this string, then not valid, etc."

* Can you write a program to determine the **value** of a valid
  mathematical expression?

  * Example:

    * ((34 + 7 ∗ (18/6)))

  .. note::

     This question is different. Instead of asking if it is valid, we are
     asking to evaluate it and solve it.


  * But, what memory or computational power is required?
    Is the ability to recognize if a string is a valid mathematical
    expression the same level of power required to compute the result
    of that expression?

    .. note:: Answer: No.

* Can you write a program to determine if a file is a valid Java program?

  .. note::

     This is what compilers do! They first determine if the program is a
     valid program and then they can execute the program.

     In this course we will be looking at all aspects of how a compiler
     determines this.

* Can you write a program to determine if a Java program given as
  input will ever halt?

  .. note::

     The input is a java program and the output is whether or not the
     program will halt. Ask them to tell you how that program would work?

     Ask them what constructs in a program make it difficult to determine
     if the program will halt or not.
     Loops. Point out that loops can be difficult to determine as they
     might not be obvious and involve recursion or not obvious
     recursion - a program calling another program which then calls
     that program.
     Just focusing on loops, how do you determine if a loop condition will
     be met so that the loop halts?

     This is a very hard (well, impossible) problem. This is another
     topic we will be looking at this semester.

* What types of languages can we represent with Regular Expressions,
  BNF Grammars, and Context Free Grammars?



* What is the relative "power" of a Push-down Automata, a Finate State
  Automata, a Non-Deterministic Finite Automata, and a Turing machine?


Process
-------

The primary work in this course will come from the weekly homework
sets.
