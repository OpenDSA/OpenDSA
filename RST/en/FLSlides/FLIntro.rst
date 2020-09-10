.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires:
   :satisfies: FL Introduction
   :topic: Introduction

.. slideconf::
   :autoslides: False


Formal Languages Course Introduction
====================================

.. slide:: Introduction

   What we are doing today:

   * Administration stuff and Course mechanics
   * Course introduction (OpenDSA Chapter 1/Linz Chapter 1)


.. slide:: Administration stuff

   * Sign-in sheet (be sure to sign-in on one of them)
   * I do not handle force-adds. Email to csundergrad@cs.vt.edu.
   * Get a copy of the syllabus
   * Go over Syllabus, Homework policies (at Canvas)


.. slide:: Course Mechanics: Instructional Software

   * Canvas

      * Posted homework, homework submission, homework feedback
      * Post grades
      * Access to course materials (OpenDSA, JFLAP, etc.)

   * OpenDSA for some couse notes, visualizations
   * JFLAP for simulators, to help with doing your homework


.. slide:: What you should already know

   * Discrete Math

     * Proof by Induction, Contradiction
     * Set theory, relations

   * Basics of Asymptotic Analysis: Big-oh, :math:`\Theta`, :math:`\Omega`

   * Basic data structures (Lists, search structures such as BSTs,
     sorting algorithms, heaps, hashing, and basic graph algorithms)

   * Survival Tip:
     A **lot** of this course depends on understanding notation.
     Don't blow this off, its too hard to pick under stress.
     Make effort now by reviewing set notation.
     Be sure you know how to read/do induction proofs.


.. slide:: What this course is about

   * Try to understand what computers can do.
  
     * Hard to reason about an Intel processor with billions of transistors.
     * Don't want to reinvent the wheel when you can use tools like
       regex parser, Flex, Bison
     * Computer Scientists have developed many simple models of
       computation, each of which can be implemented relatively easily
       in software.

   * This course is about these various models of computation, how
     complicated each one is, and what its limits are.


.. slide:: Outcomes (1)

   By the end of this class, you will be able to answer questions like
   the following.

   * Can you write a program to determine if a string is an integer?

   * Can you do it if your machine had no additional memory other
     than the program itself?
     That is, you can’t store any values or look at them again.

   * Can you tell if a string has an odd number of characters?

   * Can you do it if you have no working memory?

.. slide:: Outcomes (2)

   * Can you write a program to determine if a string is a legal
     arithmetic expression?

     * Examples:

       * ((34 + 7 ∗ (18/6)))
       * (((((((a + b) + c) ∗ d(e + f)))))

   * But, can you do it if if your machine had no additional memory other
     than the program itself?
     That is, you can’t store any values or look at them again.

   * Could you solve this problem (without memory) if you were limited
     to look at expressions of length 12 or less?


.. slide:: Outcomes (3)

   * Can you write a program to determine the **value** of a valid
     mathematical expression?

     * Example:

       * ((34 + 7 ∗ (18/6)))

   * But, what memory or computational power is required?
     Is the ability to recognize if a string is a valid mathematical
     expression the same level of power required to compute the result
     of that expression?

   * Can you write a program to determine if a file is a valid Java
     program?


.. slide:: Outcomes (4)

   * Can you write a program to determine if a Java program given as
     input will ever halt?

   * What types of languages can we represent with Regular Expressions,
     BNF Grammars, and Context Free Grammars?

   * What is the relative "power" of a Push-down Automata,
     a Finate State Automata, a Non-Deterministic Finite Automata,
     and a Turing machine?


.. slide:: Process

   The primary work in this course will come from the weekly homework
   sets.



.. slide:: Language Hierarchy

   By the end you will know how everything in this picture applies to how
   compilers work, and to how hard a typical language-related problem
   is to solve.

   Note the interplay between classes of languages, classes of grammars,
   and classes of machines.

   .. inlineav:: HierarchyCON dgm
      :links: AV/VisFormalLang/Intro/HierarchyCON.css
      :scripts: AV/VisFormalLang/Intro/HierarchyCON.js
      :align: center


.. slide:: Models of Computation, Languages, Machines

   * "Automata" is just another word for "machine".
   * Our general strategy is to look at classes of languages along
     with the "machines" that can process them.
   * Your job is to understand the limits on these classes


.. slide:: Power of Machines

   .. math::

      \begin{array}{lll}
      \mathrm{Machine}& \mathrm{Can\ do}&  \mathrm{Can't\ do}\\
      \hline 
      \mathrm{Finite\ Automata}&       \mathrm{recognize\ integers}& \mathrm{recognize\ arithmetic\ expr}\\
      \mathrm{(no\ memory)}\\
      \hline
      \mathrm{Push-Down\ Automata}&      \mathrm{recognize\ arithmetic\ expr}& \mathrm{compute\ expression}\\
      \mathrm{(stack)}\\
      \hline
      \mathrm{Turing\ Machine}&       \mathrm{compute\ expression}&  \mathrm{decide\ if\ halts}\\
      \mathrm{(unlimited)}
      \end{array}


.. slide:: Application: Compilers

   There are essentially two parts to compilers:

   * "Recognize" if the program is "correct" [Parsing]
   * Generate "code" to execute the program. [Code Generation]

   The main difference between this course and a compilers course is
   that we focus only on the first part.


.. slide:: To do by next class

  * Read Chapter 1, and also look at the OpenDSA materials

  * Look at Homework Assignment 1, find a partner

    * Carefully read the General Homework Instructions page

  * Install JFLAP, make sure that you can run it
