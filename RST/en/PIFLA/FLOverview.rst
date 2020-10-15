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
whether some string is in that language or not.
We will also study other ways of expressing or defining languages.
These include :term:`grammars <grammar>`, and other
"language defining languages"
like :term:`regular expressions <regular expression>`.

Language Hierarchy
------------------

This picture shows what we will do most of the semester.
By the end, you will know how things in this picture apply to
compilers, and how hard some related problems are to solve.

.. inlineav:: HierarchyCON dgm
   :links: AV/PIFLA/Intro/HierarchyCON.css
   :scripts: AV/PIFLA/Intro/HierarchyCON.js
   :align: center

You are familiar with programming languages.
Now we’ll look in finer detail at how programming languages are
defined, using grammars, and 
:term:`automata` (which are simpler versions of computers then your
laptop).
"Automata" is just another word for "machine".

We start in the very center of the diagram, which represents the
smallest set of languages.
We’ll be examining simpler languages and grammars and then building up
to how programming languages are formed.
We start with :term:`finite automata` (also called
:term:`finite state machines <finite state machine>`).
We will see that any finite automaton represents a simple language,
and that a type of grammar (:term:`regular grammar`) can represent the
same language.
Also we will look at :term:`regular expressions <regular expression>`.
These turn out to be languages that can be represented by a
program with no extra memory.

Then we will add memory in a very simple way, using a machine
(:term:`Pushdown Automata` or :term:`PDA`) that can 
represent a larger set of languages, along with their corresponding
grammars.

Then we will add more memory and capabilities, bringing us to another
machine (the Turing machine), the type of languages that it can
represent, and its corresponding type of grammar.

Finally, we discuss languages that you cannot write a program to
reliably recognize.


The Power of Machines
---------------------

We will be going over all of this information in detail during
the semester.
But this table gives you a quick overview.

.. math::

   \begin{array}{lll}
   \mathrm{Machine}& \mathrm{Can\ do}&  \mathrm{Cannot\ do}\\
   \hline 
   \mathrm{Finite\ Automata}&       \mathrm{recognize\ integers}& \mathrm{recognize\ arithmetic\ expressions}\\
   \mathrm{(no\ memory)}\\
   \hline
   \mathrm{Push-Down\ Automata}&      \mathrm{recognize\ arithmetic\ expr}& \mathrm{compute\ expression\ value}\\
   \mathrm{(stack)}\\
   \hline
   \mathrm{Turing\ Machine}&       \mathrm{compute\ expression}&
   \mathrm{decide\ if\ program\ halts}\\
   \mathrm{(unlimited\ memory)}
   \end{array}

FA - can recognize integers, real numbers, but can’t recognize a valid
arithmetic expression.

PDA - can recognize a valid arithmetic expression, but can’t compute
it and give you the answer.

TM - can compute expressions, but can’t write a program that takes any
Java program and tells you whether that program will halt or not.


Application: Compilers
----------------------

Question: Given a program in some language (say Java or C++), is it valid?
That is, is it a syntactically correct program?
This is something that certain automata can do, if the grammar for the
language is defined in the right way.

If the program is syntactically correct, then the compiler will go
ahead and generate code to execute the program efficiently.
We won't talk about that part of a compiler |---| to learn about doing
that, you would need to take a compiler course.

.. inlineav:: CompileCON dgm
   :links: 
   :scripts: AV/PIFLA/Intro/CompileCON.js
   :align: center

You might think that understanding how to write a grammar to recognize
a language (or design the language so that it is indeed possible to
write a grammar) is an unnecessary skill.
But in reality, a lot of programmers write "little languages" as part
of their job.
For example, you might go work for a company that makes robots, and
you could need a little language to control the robot.


Stages of a Compiler
~~~~~~~~~~~~~~~~~~~~

The following figure gives a rough overview of how a compiler works,
by performing three basic tasks.
In this class we will be learning about the first two of the three
major tasks: recognizing tokens, and determining if the tokens fit
together in an acceptable way.

.. inlineav:: CompileStagesCON dgm
   :links: 
   :scripts: AV/PIFLA/Intro/CompileStagesCON.js

PART 1: Identifying the tokens in a program.
Regular languages are the foundation for this.
Lexical analysis identifies the pieces (tokens) of the program.
Tokens are things like integers, keywords, variable names, special
symbols such as :math:`+`.

PART 2: Identify whether the tokens fit together in the correct
way, so that the program is syntactically valid.
This is called Syntax Analysis.
We will be learning the theory for this in our unit on context free
languages.
This will involve studying several parsing algorithms.

PART 3. Creating the parse tree.
An interpretor walks through the parse tree and immediately executes
the program (it does not generate code to execute the program).
A compiler will take the parse tree and create a version of
the program (that is not so nice for a human to read) that can quickly
execute the program.


Some Mindbending Ideas
----------------------

There are a lot of "meta" concepts related to Formal Languages.
Here are a few things to think about.

The descriptions of languages are just strings.
Which means that, for example, the set of (strings that are) regular
expressions is, itself, a language.
Which leads to some questions like:

* What type of language (from our hierarchy) is the set of regular
  expressions?
* What type of language (from our hierarchy) is Java?
* What type of language is a Context Free Grammar?

Here is another interesting "meta" question.
For any given language :math:`L`, define the language co-:math:`L` to be all
strings **not** in :math:`L`.
Is co-:math:`L` always the same type of language (in our hierarchy) as
:math:`L`?
