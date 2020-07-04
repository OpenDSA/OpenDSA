.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
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
number of Computer Science topics.

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
a given compiler generator like YACC or Bison, then you know whether
you can use that tool to get your job done, or whether you need to go
to the much greater effort of "rolling your own" compiler.
This sort of question comes up often enough in the working life of a
practicing programmer that you want to know when a tool will solve
your problem or not.

By the end of this class, you will be able to answer questions like
the following.

* Can you write a program to determine if a string is an integer?

  * Examples: 9998.89  8abab  789342

  This should be easy. Think about how you would solve it with a program.

* Can you do it if your machine had no additional memory other
  than the program itself?
  That is, you can’t store any values or look at them again.

  Answer: Yes. You can solve this by looking at the symbols one at
  a time, without looking back at a previous symbol and without using
  memory to keep track of anything.

* Can you write a program to tell if a string has an odd number of
  characters?

  Of course, this is easy.

* Can you do it without any working memory?

  Answer: Yes. Here we get into the concept of an "even state" and an
  "odd state".
  But those are part of the program, not part of the working memory.

* Can you write a program to determine if a string is a legal
  arithmetic expression?

  * Examples:

    * ((34 + 7 ∗ (18/6)))
    * (((((((a + b) + c) ∗ d(e + f)))))

  How would you solve this?
  What do you need to keep track of?

  One issue is balanced parentheses.
  Can you just determine if there are the correct number of
  parenthesis, and that they are in the right order?
  ``(()(()))`` is good, but ``())(`` is not good.
  For this, a stack will work.

  But, can you can solve this simpler than that, without a stack?
  You can actually do this with one integer variable:
  add one for left paren, subtract one for right paren.
  The requirements are that the count starts at 0, never goes negative,
  and ends with 0.

* But, can you do it if your machine had no additional memory other
  than the program itself?
  That is, you can’t store any values or look at them again.

  The answer is NO, you have to have memory (at least an integer
  variable) to keep track of left versus right parenthesis.
  There is no way to solve this problem without extra memory.
  We can't use the "state" trick mentioned above,
  because there are an unlimited number of possible "states" (one
  "state" for each value of the integer variable).

* Could you solve this problem (without memory) if you were limited
  to look at expressions of length 12 or less?

  YES you could.
  You could write a program to check each possible string.
  Note the alphabet would be finite, say N characters.
  How many possible strings are there to check?
  :math:`N^12`, some which are valid, some which are not.
  Your program would be brute force and incredibly
  huge and be of the form
  "If x is this string, then valid, else if x is this string, then not
  valid, etc."
  But it is **possible** to do.

  Another approach is to use state to keep track of how unbalanced you
  currently are.
  In this case, this works because we can't have more than 12 such
  states.
  So, we don't need working memory.

* Can you write a program to determine the **value** of a valid
  mathematical expression?

  * Example:

    * ((34 + 7 ∗ (18/6)))

  This question is different. Instead of asking if it is valid, we are
  asking to evaluate it and solve it.

* But, what memory or computational power is required?
  Is the ability to recognize if a string is a valid mathematical
  expression the same level of power required to compute the result
  of that expression?

  Answer: No.

* Can you write a program to determine if a file is a valid Java program?

  This is what compilers do! They first determine if the program is a
  valid program and then they can execute the program.

* Can you write a program to determine if a Java program given as
  input will ever halt?

  The input is a java program and the output is whether or not the
  program will halt.
  How might such a program work?

  What constructs in a program make it difficult to determine
  if the program will halt or not?
  Loops can be difficult to determine as they might not be obvious
  that they terminate.
  Recursion (both direct and indirect through a function calling
  another function which then calls the first function).
  Just focusing on loops, how do you determine if a loop condition will
  be met so that the loop halts?
  This is a very hard (actually, impossible) problem.
  This is another topic that we will be looking at this semester:
  What functions are **possible** to compute?

* What types of languages can we represent with Regular Expressions,
  BNF Grammars, and Context Free Grammars?

* What is the relative "power" of a Push-down Automata, a Finate State
  Automata, a Non-Deterministic Finite Automata, and a Turing machine?


Process
-------

The primary work in this course will come from the weekly homework
sets.
