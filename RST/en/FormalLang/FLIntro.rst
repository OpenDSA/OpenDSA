.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
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

This course assumes that you already have sufficient background in a
number of Computer Science topics 

You should have had a course in Discrete Math, covering at least the
following:

* Basic proof techniques like proof by contradition and induction.
* Basic techniques for solving summations and recurrence relations
* Set theory and relations

You should have had a course in Data Structures to cover at least the
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

By the end of this class, you will be able answers like the following.

* You probably know how to write a program to determine if a string is
  an integer.

  * Examples: 9998.89  8abab  789342

  * Think about how a program might work to answer this question.

  * Can you do it if if your machine had no additional memory other
    than the program itself?
    That is, you can’t store any values or look at them again.

    * Answer: Yes.

|

* You can probably write a program to determine if a string is a legal
  arithmetic expression.

  * Examples:

    * ((34 + 7 ∗ (18/6)))
    * (((((((a + b) + c) ∗ d(e + f)))))

  * But, can you do it if if your machine had no additional memory other
    than the program itself?
    That is, you can’t store any values or look at them again.

    * Answer: No.

|

* You can probably write a program to determine the value of a valid
  mathematical expression.

  ((34 + 7 ∗ (18/6)))

  * But, what memory or computational power is required?
    Is the ability to recognize if a string is a valid mathematical
    expression the same level of power required to compute the result
    of that expression?

    * Answer: No.

|

* You can probably (or at least, compiler writers can) write a
  program to determine if a string is a valid Java program.

  * But, can you write a program to tell if a given Java program halts
    on a given input?

|

* What types of languages can we represent with Regular Expressions,
  BNF Grammars, and Context Free Grammars?

|

* What is the relative "power" of a Push-down Automata, a Finate State
  Automata, a Non-Deterministic Finite Automata, and a Turing machine?


Process
-------

The primary work in this course will come from the weekly homework
sets.
