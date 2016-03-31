.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps

Interpreter Modifications
=========================


Overview of Exercises
---------------------

The following review problems are designed to help you prepare for the
exercises that you will complete in class on Monday.  These exercises
will consequently set the stage for your next assignment.  In each one
of these in-class exercises as well as in the upcoming assignments,
you will have to extend the SLang interpreter.  Recall that the
interpreter is made up of the following files:

   1. *absyn.js* defines the abstract syntax of SLang 1.

   2. *grammar.jison* defines the lexical-level grammar and the phrase-structure grammar for SLang 1; this file also contains the parser code that builds the AST.

   3. *env.js* implements the data structure that represents the environment of the interpreter; this file also defines the types of *denoted values*, that is, those that can appear in the environment.

   4. *interpreter.js* implements the interpreter itself.


In each one of the following problems, we describe an extension to the
interpreter that you will carry out in class. Read carefully how each
extension is supposed to behave when interpreted, and assume that we
will carry out the extensions in the order that they appear here. Then
select all of those files that MUST be modified from what they were
in the prior problem to carry out the described extension. For each
file that you check, be prepared to give an overview of the changes
that would need to be made in that file.  


RP 23 Part 1
------------

.. avembed:: Exercises/PL/RP23part1.html ka

RP 23 Part 2
------------

.. avembed:: Exercises/PL/RP23part2.html ka

RP 23 Part 3
------------

.. avembed:: Exercises/PL/RP23part3.html ka

RP 23 Part 4
------------

.. avembed:: Exercises/PL/RP23part4.html ka
