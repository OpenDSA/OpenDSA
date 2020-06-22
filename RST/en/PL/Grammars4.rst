.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps

=====================================
Parser Generators
=====================================
.. (M 2/8/16)

Jison
-----

The topics of this section include:

  1. Parser generators
  2. The Jison parser generator

A **parser** is a program that takes as input a program in the *source
language* (that is, the programming language that you are compiling or
interpreting) and determines whether the source program is
syntactically correct or not. If correct, the parser returns a signal
indicating it is correct (e.g., a parse tree of the source
program). Otherwise, the parser returns one or more syntax errors.

Parsing is typically the first sub-task to be completed when compiling
or interpreting a program.  The parser is built around the grammar for
the source language.  A **parser generator** is a program that takes
as input a BNF grammar for a source language and outputs a parser for
this language.

**Jison** is a parser generator developed by Zach Carter.  It is
available to download or to use online at http://zaa.ch/jison.  It is
beyond the scope of what we want to do in this Programming Languages
course to describe Jison in detail.  However, we do want to provide an
overview of how it is used since it will be incorporated into the
interpreters we develop later in the course.  A complete description
of Jison is available at http://zaa.ch/jison/docs.

As an example of using Jison, the grammar we gave as :ref:`eg3`
in the preceding section would be given to Jison in the
following form::

  /* 
    description: Parses simple arithmetic expressions
  */
  
  // lexical section of the grammar 
  // ==============================
  
  %lex
  %%
  \s+                   /* no return statement, so skip whitespace */
  [A-Z]                 return "VAR"    /* A variable is an individual uppercase letter */
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
      : term
      | exp "PLUS" term
      | exp "MINUS" term      
      ;
  term
      : fact
      | term "TIMES" fact
      | term "DIV" fact
      ;
  fact
      : "VAR"
      | "LPAREN" exp "RPAREN"
    ;

    
Your instructor will provide specific instructions about how to use
Jison at your installation.  However, it is very easy to give it a try
online.  Simply do the following:
    
  * Go to http://zaa.ch/jison/try/.   There you will see that Jison gives you a text area into which you can paste your grammar.
  * Paste the Jison grammar that appears above into this text area, replacing the default grammar that is already there.   Then click the *Generate Parser* button, and that will consequently produce your parser on the Jison server.
  * Then type a valid expression for :ref:`eg3` into the *Test Your Parser* area, and click the *Parse* button.   If your expression was indeed valid, you should see the message "The program is valid" produced.   Why?   Because *program* is the top-level start symbol in the Jison version of this grammar, and in the Jison specification above, this is the string that should be returned when we have a successful parse  (because of the line in the grammar **return "The program is valid"**).   If the expression you type in isn't valid, you will see a detailed error message that is produced by Jison.
    

The practice problem set for this section contains two practice problems
that involve simple Jison grammars.  Before starting those problems,
there is one Jison convention for expressing the lexical structure of
which you need to be aware.  In the example grammar above, this
convention is illustrated in the specification::
      
  [A-Z]                 return "VAR"    /* A variable is an individual uppercase letter */

The **[A-Z]** notation tells Jison that a variable must consist of one
uppercase letter between "A" and "Z".  If we also wanted to allow
lowercase letters to be used, the following specification would be
given::

  [A-Z]|[a-z]           return "VAR"    /* A variable is an individual uppercase or lowercase letter */

Note the vertical line, which indicates "or".

If we wanted to specify that a variable is a single uppercase letter followed by a single digit, we would have::
  
  [A-Z][0-9]            return "VAR"    /* A variable is an individual uppercase letter followed by a single digit */

Here the absence of a vertical line specifies that the two characters must appear in sequence, as opposed to one or the other.

The expressions containining the vertical line, square brackets,
double-quoted strings, etc. (and other symbols we will not discuss here)
found before the "return" keyword in the  lexical section of the Jison grammar
are called **regular expressions**.


The first problem below will help you understand the grammar represented by
a Jison file. Note that this problem is randomized. You must **solve it
correctly three times in a row** to earn the credit associated with it.

.. avembed:: Exercises/PL/Jison1.html ka
   :long_name: Jison Problem 1

More practice with Jison
------------------------

This problem will give you more practice understanding grammars
defined in the Jison file format.

.. avembed:: Exercises/PL/Jison2.html ka
   :long_name: Jison Problem 1
