.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps

=================
Grammars - Part 4 
=================
.. (M 2/8/16)

RP 4 part 1
-----------

Topics for this module:

  1. Parser generators
  2. The Jison parser generator

A *parser* is a program that takes as input a program in the *source
language* (that is, the programming language that you are compiling or
interpreting) and determines whether the source program is
syntactically correct or not. If correct, the parser returns a signal
indicating it is correct. Otherwise, the parser returns one or more
syntax errors.  Parsing is typically the first sub-task to be
completed when compiling or interpreting a program.   
The parser is built around the grammar for the source language.
A *parser generator* is a program that takes as input a BNF
grammar for a source language and outputs a parser for this 
language.

Jison is a parser generator developed by Zach Carter.  It is
available to download or to use online at http://zaa.ch/jison.  It is
beyond the scope of what we want to do in this Programming Languages
course to describe Jison in detail.  However, we do want to provide an
overview of how it used since it will be incorporated into the
interpreters we develop later in the course.  A complete description
of Jison is available at http://zaa.ch/jison/docs.

As an example of using JISON, the grammar we gave as **Example Grammar
3** in the preceding section would be given to Jison in the following
form::

  /* 
    description: Parses simple arithmetic expressions
  */
  
  // lexical section of the grammar 
  // ==============================
  
  %lex
  %%
  \s+                   /* no return statement, so skip whitespace */
  [A-Z]                 return "PRI"    /* A primary is an individual upper-case letter */
  "*"                   return "TIMES"
  "/"                   return "DIV"
  "-"                   return "MINUS"
  "+"                   return "PLUS"
  "("                   return "LPAREN"
  ")"                   return "RPAREN"
  <<EOF>>               return "EOF"
  .                     return "INVALID"
  
  /lex
  
  %start program
  
  // phrase-structure section of the grammar
  // =======================================
  
  %%
  
  program
      : exp "EOF"
        { return "The program is valid"; } /* returned by a successful parse */
      ;
  exp
      : trm
      | exp "PLUS" trm
      | exp "MINUS" trm      
      ;
  trm
      : fac
      | trm "TIMES" fac
      | trm "DIV" fac
      ;
  fac
      : "PRI"
      | "LPAREN" exp "RPAREN"
    ;

    
Your instructor will provide specific instructions about how to use Jison at your installation.   However, it is very easy to give it a try online.   Simply do the following.
    
  * Go to http://zaa.ch/jison/try/.   There you will see that Jison gives you a text area into which you can paste your grammar.
  * Paste the Jison grammar that appears above into this text area, replacing the default grammar that is already there.   The click the *Generate Parser* button, and that will consequently produce your parser on the Jison server.
  * Then type a valid expression for **Example Grammar 3** into the *Test Your Parser* area, and click the *Parse* button.   If your expression was indeed valid, you should see the message "The program is valid" produced.   Why?   Because *program* is the top-level start symbol in the Jison version of this grammar, and in the Jison specification above, this is the string that should be returned when we have a successful parse  (because of the line in the grammar **return "The program is valid"**).   If the expression you type in isn't valid, you will see a detailed error message that is produced by Jison.
    

The review problem set for this module contains two review problems
that involve simple Jison grammars.  Before starting those problems,
there is one Jison convention for expressing lexical structure of
which you need to be aware.  In the example grammar above, this
convention is illustrated in the specification::
      
  [A-Z]                 return "PRI"    /* A primary is an individual upper-case letter */

The **[A-Z]** notation tells Jison that a primary (that is, a variable in our simple expression language) must consist of one upper-case letter between "A" and "Z".   If we also wanted to allowed lower-case letters to be used, the following specification would be given::

  [A-Z]|[a-z]           return "PRI"    /* A primary is an individual upper-case letter */

Note the vertical line, which indicates "or".

If we wanted to specify that a primary is a single upper-case letter followed by a single digit, we would have::
  
  [A-Z][0-9]            return "PRI"    /* A primary is an individual upper-case letter */

Here the absence of a vertical line specifies that the two characters must appear in sequence, as opposed to one or the other.
  
This first problem will help you understand the grammar represented by
a Jison file. Note that this problem is randomized. You must **solve it
correctly three times in a row** to earn the credit associated with it.

.. avembed:: Exercises/PL/RP4part1.html ka

RP 4 part 2
-----------

This problem will again help you understand the grammar represented by a Jison file.

.. avembed:: Exercises/PL/RP4part2.html ka
