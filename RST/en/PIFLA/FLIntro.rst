.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires:
   :satisfies: FL Introduction
   :topic: Introduction

About this Course and this Book
===============================

Introduction
------------

This eTextbook is intended for a senior-level course in
Formal Languages and Automata (FLA).
It follows a well-established collection of topics,
as traditionally taught in most FLA courses.
However, it does it in some untraditional ways, as explained below.
Also, since this might be the only classical CS theory course that you
take in your curriculum, we throw in at the end a little introduction to
two other traditional topics in CS theory:
Complexity theory (also known as NP-completeness, which relates to
undestanding what is expensive versus not so expensive to compute);
and Computability (the study of where the limits are in terms of what
problems are possible for a computer program to solve).


Prerequisites
-------------

This is a CS "Theory" course.
In practice, that means using mathematics to help undestand deep CS
concepts, and how they relate to practical CS applications.
This course assumes that you already have sufficient background in a
number of Math and CS topics.

You should have had a course in Discrete Math, covering at least the
following:

* Basic :term:`proof` techniques like :term:`proof by contradiction`
  and :term:`proof by induction`. 
* Basic techniques for solving :term:`summations <summation>`
  and :term:`recurrence relations <recurrence relation>`.
* Basic set theory and :term:`relations <relation>`.

You should have had a course in Data Structures, covering at least the
following:

* Basic :term:`algorithm analysis`, including
  :term:`big-oh <big-Oh notation>`,
  :term:`big-Omega <Omega notation>`,
  and :term:`Theta <Theta notation>` notations.
* Basic data structures and algorithms including lists, search
  structures such as BSTs, sorting algorithms, heaps, hashing, and
  standard graph algorithms.


How this Book Works
-------------------

This book is not like your typical textbook, in a lot of ways.
You might have previously used an OpenDSA eTextbook for another class.
If so, some of this will be familiar.
But even if you have used OpenDSA before, some basic features in this
book will probably be new to you.

First, a lot of the content is presented using a technique called
"Programmed Instruction".
The idea beind Programmed Instruction is to keep you engaged with the
material by constantly asking you questions about what you are
reading.
So what you will see is a type of slideshow, that we call a
"Programmed Instruction frameset".
Each slide in the frameset will present a small amount of
information, perhaps with some graphics to help make things clear.
But frequently, to make progress in the frameset, you will have to
answer a question.
We hope that you will find these to mostly be easy questions
(at least, most of them are supposed to be easy).
Their goal is to keep you focused on what the content means, forcing you to
learn it as you go by constantly challenging your understanding.
So, besides keeping you engaged, being able to answer the questions as
you go through the content means that you can be confident that you
really understood what you read.

Second, this book is filled with many auto-graded exercises.
They also help to make sure that you understand what you have read, at
a more integrated level than the simple questions given in the
framesets.

Third, since this book all about simple types of "machines",
we have provided many tools to create and (visually) simulate the
behavior of these machines.
And we integrate these simulations into some of the exercises.
This is a lot like writing small programs.
It's just that instead of writing in a normal programming language
like Java, you will be writing with a machine editor.
You machine is typically expressed as a graph.
Sometimes you will define a different type of "machine" by writing a
grammar.
But it's a lot like programming either way,
and internally we verify that your machine is correct by running unit
tests against your machine to see if its answers match ours.


What We Will Do
---------------

It is really hard to reason about the abilities of a modern Intel or AMD
processor with billions of transistors.
And you don't want to reinvent the wheel if you can process your
input with a regex parser or use a tool like YACC to generate a simple
compiler.
So, to help understand these problems, and the tools that can solve them,
Computer Scientists have developed many simple models of computation.
Each of them can be implemented relatively easily in software.
But more importantly, they are simple enough to really understand what
they can (and cannot) do.

This course is about these various models of computation, how
complicated each one is, and what its limits are.
For example, if you know what you can or cannot do with a regular
expression, then maybe you can solve a hard problem with simple calls
to a regex library.
On the other hand, maybe you can avoid wasting your time trying
use regex tools to solve the wrong problem.
Likewise, if you know the limits of the types of grammar supported by
a given compiler generator like YACC or Bison, then you know whether
you can use that tool to get your job done, or whether you need to go
to the much greater effort of "rolling your own" compiler.
This sort of question comes up often enough in the working life of a
practicing programmer that you want to know when a tool will solve
your problem and when it will not.

By the end of this class, you will be able to answer questions like
the following.

* Can you write a program to determine if a string is an integer?

  * Examples: 9998.89  8abab  789342

  This should be easy. Think about how you would solve it with a program.

* Can you do it if your machine had no additional memory other than
  the program itself?
  That is, you can’t store any values (no variables!) or look back at
  the input again.

  Answer: Yes. You can solve this by looking at the symbols one at
  a time, left to right, without looking back at a previous symbol and
  without using any variables keep track of anything.

* Can you write a program to tell if a string has an odd number of
  characters?

  Of course, this is easy.

* Can you do it without any working memory?

  Answer: Yes. Here we get into the concept of an "even state" and an
  "odd state".
  But those can be built into the program, so need not be part of the
  working memory.

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
  For this, a stack will let you do the job.

  But, can you solve this simpler than that, without a stack?
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
  Note the alphabet would be finite, say :math:`N` characters.
  How many possible strings are there to check?
  :math:`N^{12}`, some which are valid, some which are not.
  Your program would be brute force and incredibly
  huge and be of the form
  "If x is this string, then valid, else if x is this string, then not
  valid, etc."
  But it is **possible** to do.

  Another approach is to use state to keep track of how unbalanced you
  currently are.
  In this case, this works because we can't have more than 12 such
  states.
  So, this is another solution that does not need working memory.

* Can you write a program to determine the **value** of a valid
  mathematical expression?

  * Example:

    * ((34 + 7 ∗ (18/6)))

  This question is different. Instead of asking if it is valid, we are
  asking to evaluate it and solve it.

* But, what memory or computational power is required?
  Does the ability to recognize if a string is a valid mathematical
  expression have the same level of power required to compute the result
  of that expression?

  Answer: No.

* Can you write a program to determine if a file is a valid Java program?

  This is what a compiler does!
  It first determines if the program is valid Java.
  If so, it turns the program into a form that is more efficient for
  the computer to execute.
  Finally, it executes the program.

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
  Automata, a Non-Deterministic Finite Automata, and a Turing Machine?
