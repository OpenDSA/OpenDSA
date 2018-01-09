.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
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

   * Administration stuff
   * Course mechanics
   * Course introduction (OpenDSA Chapter 1/Linz Chapter 1)


.. slide:: Administration stuff

   * Sign-in sheet (be sure to sign-in on one of them)
   * Get a copy of the syllabus
   * Force Add System:
      * https://www.cs.vt.edu/????
      * Password: ????
   * Go over Syllabus


.. slide:: Course Mechanics: Instructional Software

   * Canvas

      * Posted homework, homework submission, homework feedback
      * Post grades
      * Access to course materials (OpenDSA, JFLAP, etc.)

   * OpenDSA for some couse notes, visualizations
   * JFLAP for simulators, to help with doing your homework


.. slide:: What You Should Already Know

   * Discrete Math

     * Proof by Induction, Contradiction
     * Set theory, relations

   * Basics of Asymptotic Analysis: Big-oh, :math:`\Theta`, :math:`\Omega`

   * Basic data structures (Lists, search structures such as BSTs,
     sorting algorithms, heaps, hashing, and basic graph algorithms)

   * Survival Tip: A **lot** of this course depends on understanding
     the notation. Don't blow this off, its too hard to pick up in a
     hurry. Make some effort now by reviewing set notation. And be
     sure that you know how to understand induction proofs.


.. slide:: What we will do (1)

   * Try to understand what computers can do.
  
     * Hard to reason about Intel processor with billions of transistors.
     * Don't want to reinvent the wheel when you can use tools like
       regex parser, YACC
     * Computer Scientists have developed many simple models of
       computation, each of which can be implemented relatively easily
       in software.

   * This course is about these various models of computation, how
     complicated each one is, and what its limits are.


.. slide:: What we will do (2)

   By the end of this class, you will be able to answer questions like
   the following.

   * Can you write a program to determine if a string is an integer?

   * Can you do it if your machine had no additional memory other
     than the program itself?
     That is, you can’t store any values or look at them again.


.. slide:: What we will do (3)

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


.. slide:: What we will do (4)

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


.. slide:: What we will do (5)

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

   This is a picture of what we will do most of the semester.
   By the end you will know how everything in this picture applies to how
   compilers work, and to how hard a problem is to solve.

   .. inlineav:: HierarchyCON dgm
      :links: AV/FormalLang/HierarchyCON.css
      :scripts: AV/FormalLang/HierarchyCON.js
      :align: center


.. slide:: Models of Computation, Languages, Machines

   There is an interplay between strings that define a language,
   "machines" that can "recognize" a language, and doing
   "compuation".

   * "Automata" is just another word for "machine".
   * Our general strategy is to look at classes of languages along
     with the "machines" that can process them.
   * We are looking into the limits on these classes

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


.. slide:: Key Concept: Language

   * :math:`\Sigma`: A set of symbols, an alphabet
     (usually we use for examples: :math:`a, b, c`)
   * string: Finite sequence of symbols (from some alphabet)
     (usually: :math:`u, v, w`)
   * language: A subset of the strings defined over :math:`\Sigma`

   So, a language is a sets of strings, in particular, some subset of
   the powerset of :math:`\Sigma`.


.. slide:: Language Examples

   * | :math:`\Sigma = \{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\}`
     | :math:`L = \{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, ... \}`

   * | :math:`\Sigma = \{a, b, c\}`
     | :math:`L = \{ab, ac, cabb\}`
     | :math:`L` is a language with 3 strings, each string is a sequence of
       strings formed over the alphabet.

   * | :math:`\Sigma = \{a, b\}`
     | :math:`L = \{a^n b^n | n > 0\}`
     | This is an example of an infinite language.
     | What are the strings in the language? :math:`\{ab, aabb, aaabbb, aaaabbbb, . . .\}`


.. slide:: Key Concept: Grammars

   | A tiny subset of the english language, not complete!
   |   <sentence> :math:`\rightarrow` <subject><verb><d.o.>
   |   <subject> :math:`\rightarrow` <noun> | <article><noun>
   |   <verb> :math:`\rightarrow` hit | ran | ate
   |   <d.o.> :math:`\rightarrow` <article><noun> | <noun>
   |   <noun> :math:`\rightarrow` Fritz | ball
   |   <article> :math:`\rightarrow` the | an | a

   Variables vs. Terminals


.. slide:: Deriving a sentence

   A variable in the grammar can be replaced by the right hand side of
   its rule::

      Fritz hit the ball

      <sentence> -> <subject><verb><d.o> 
                 -> <noun><verb><d.o>
                 -> Fritz <verb><d.o.>
                 -> Fritz hit <d.o.>
                 -> Fritz hit <article><noun>
                 -> Fritz hit the <noun>
                 -> Fritz hit the ball

   Can we derive these sentences? If not, can we change the grammar?::

      The ball hit Fritz

      The ball ate the ball


.. slide:: Formal definition of a grammar

   | A grammar :math:`G = (V, T, S, P)` where
   |   :math:`V` is a finite set of variables (nonterminals).
   |   :math:`T` is a finite set of terminals (generally, these are strings).
   |   :math:`S` is the start variable (:math:`S \in V`).
   |   :math:`P` is a set of productions (rules).

   :math:`x \rightarrow y` means to replace :math:`x` by :math:`y`.

   Here, :math:`x \in (V \cup T)^+, y \in (V \cup T)^*`.


.. slide:: Grammar Notation

   | :math:`w \Rightarrow z: \qquad w` derives :math:`z`
   | :math:`w \stackrel{*}{\Rightarrow} z: \qquad` derives in 0 or more steps
   | :math:`w \stackrel{+}{\Rightarrow} z: \qquad` derives in 1 or more steps

   | Given grammar :math:`G = (V, T, S, P)`, define
   |   :math:`L(G)= \{w \in T{}^{*} \mid S \stackrel{*}{\Rightarrow} w\}`

   | **Example**
   |   :math:`G=(\{S\}, \{a,b\}, S, P)`
   |   :math:`P=\{S \rightarrow aaS, S \rightarrow b\}`
   |   :math:`L(G) =` ?


.. slide:: Key Concept: Automata

   .. odsafig:: Images/stautomata.png
      :width: 370
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: Basic machine

   Numbers in control unit symbolize "states", which are the specific
   positions on the dial that the arrow may point to.

   There is also the control behavior (like the "software" of the computer).

   "When State 1, if see letter :math:`a`, then write :math:`c`
   and go to State 2. If see :math:`b`, move right."
