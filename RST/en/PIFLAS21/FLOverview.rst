.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires: FL Introduction
   :satisfies:
   :topic: Introduction

Overview
========

Languages, Grammars, and Machines
---------------------------------

A :term:`language` is simply a collection of strings.
A fundamental thing to be able to do with a string is to determine
whether or not it is part of a given language.
This semester, we are studying various types of machines to see what
languages they can reliably "recognize", that is, reliably determine
whether any given string is in that language or not.
In parallel, we will study other ways of expressing or defining
languages.
These ways include :term:`grammars <grammar>`, and other
"language defining languages"
like :term:`regular expressions <regular expression>`.

Language Hierarchy
------------------

This is a picture of what we will do most of the semester.
By the end you will know how everything in this picture applies to how
compilers work, and to how hard a related problem is to solve.

.. inlineav:: HierarchyCON dgm
   :links: AV/VisFormalLang/Intro/HierarchyCON.css
   :scripts: AV/VisFormalLang/Intro/HierarchyCON.js
   :align: center

You are familiar with programming languages, now we’ll look in finer
detail how programming languages are defined, with grammars, and
:term:`automata` (which are simpler versions of computers then your
laptop).
"Automata" is just another word for "machine".

We start in the very center.
We’ll be examining simpler languages and grammars and then building up
to how programming languages are formed.
We start with :term:`finite automata` (also called
:term:`finite state machines <finite state machine>`).
We will see that an automaton represents a simple language,
and that a type of grammar (:term:`regular grammar`) can represent the
same language.
Also we will look at :term:`regular expressions <regular expression>`.
Remember these represent languages that can be represented by a
program with no extra memory.

Then we will add memory and look at a machine (:term:`PDA`) that can
represent a larger set of languages and their corresponding grammars.

Then we will add more memory and capabilities and look at another
machine (Turing machine) and the type of languages that it can
represent and its corresponding grammar.

Then we will look at languages you cannot write a program to solve.


Power of Machines
-----------------

(Note: We will be going over all of this information in detail during
the semester.
But this view can help you put it all together.)

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

FA - can recognize integers, real numbers, but can’t recognize a valid
arithmetic expression.

PDA - can recognize a valid arithmetic expression, but can’t compute
it and give you the answer.

TM - can compute expressions, but can’t write a program that takes any
Java program and tells you whether the program will halt or not.


Application: Compilers
----------------------

* Our focus - Question: Given a program in some language (say Java or
  C++) - is it valid?
  That is, is it a syntactically correct program?

  If it is correct, go ahead and generate executable code, if not don’t!

  Is the C++ compiler friendly? Are the messages helpful? How does it
  figure out what the errors are?
  What line is the error on?

* Question: language L, program P - is P valid?

  You might go work for a company and design a new language, maybe
  this language will be to program a robot.

*  Other things to consider, how is the compilation process different for
   different programming languages? (Java vs C++?)

   Note that technically some languages such as C++ are compiled to
   assembly language and machine language, whereas others such as Java
   is converted to byte code for a virtual machine and then
   interpreted.
   We will talk more about this later in the semester, but
   note that this course is more about getting to the point where you
   can then either interpret or convert to assembly language but
   we do not focus on converting to assembly language.
   That is a topic for a compilers course.

.. inlineav:: CompileCON dgm
   :links: 
   :scripts: AV/VisFormalLang/Intro/CompileCON.js
   :align: center


Stages of a Compiler
~~~~~~~~~~~~~~~~~~~~

In this class we will be learning how this process works, everything
but the last step.

.. inlineav:: CompileStagesCON dgm
   :links: 
   :scripts: AV/VisFormalLang/Intro/CompileStagesCON.js
   :align: center

   Stages of a compiler

PART 1: Identifying the tokens in a program.
Our unit on regular languages gives the foundation for this.

Lexical analysis (focus is on regular languages)
identifies the pieces (tokens) of the program.

token: integer, keyword, variable name, symbol such as +

PART 2: Identifying if the tokens fit together in the correct
way so the program is syntactically valid.
This is called Syntax analysis.
We will be learning the theory for this in our unit on context free
languages.
This will also involve studying several parsing algorithms.

PART 3. Creating the parse tree.
An interpretor walks through the parse tree and immediately executes
the code.
(Does not generate the code)


Some Mindbending Ideas
----------------------

There are a lot of "meta" concepts related to Formal Languages.
Here are a few things to think about.

The descriptions of languages are just strings.
Which means that, for example, the set of (strings that are) regular
expressions is a language.
Which leads to some questions like:

* What type of language (from our hierarchy) is the set of regular
  expressions?
* What type of language (from our hierarchy) is Java?
* What type of language is a Context Free Grammar?

Here is another interesting "meta" questions.
For any given language :math:`L`, define the language co-:math:`L` to be all
strings **not** in :math:`L`.
Is co-:math:`L` always the same type of language (in our hierarchy) as :math:`L`?
