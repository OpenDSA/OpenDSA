.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps

===================================================================
Using Parser Generators to Interpret a Language
===================================================================


Annotating Jison Grammars
-------------------------

In this section, we give an overview of how to add annotations to a
Jison grammar to produce an interpreter, rather than just a parser.
By an interpreter we mean that, instead of merely returning a signal
indicating whether or not the input expression is syntactically valid,
we actually want to "evaluate" valid expressions in some way and
return the result of doing that evaluation.

Consider the following Jison grammar, which is a scaled-down version
of the demo at http://zaa.ch/jison/demos/calc, as made available by
Jison developer Zach Carter::
  
  /* 
      description: Parse and interpret simple arithmetic expressions
                   and evaluates them
      source:      this grammar is adapted from: 
                   http://zaach.github.io/jison/demos/calc/
  */
  
  // lexical section of the grammar 
  // ==============================
  
  %lex
  %%
  \s+                   /* no return statement, so skip whitespace */
  [0-9]+("."[0-9]+)?    return "NUMBER"
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
        { return $1; }
      ;
  exp
      : term
        { $$ = $1; }
      | exp "PLUS" term
        { $$ = $1 + $3; }
      | exp "MINUS" term      
        { $$ = $1 - $3; }
      ;
  
  term
      : factor
        { $$ = $1; }
      | term "TIMES" factor
        { $$ = $1 * $3; }
      | term "DIV" factor
        { $$ = $1 / $3; }
      ;
  factor
      :  "NUMBER"
        { $$ = Number( $1 ); }    
      | "LPAREN" exp "RPAREN"
        { $$ = $2; }
      ;

This grammar produces a parser/interpreter that evaluates simple arithmetic expressions.  To try it, merely cut-and-paste it into the online version of Jison at http://zaa.ch/jison/try.  Let Jison produce the parser/interpreter for you, and then see what happens when you type in expressions like :math:`6.4 - 3.2 * (42.6/13)` and click Jison's *Parse* button.  When you give this grammar to Jison, you get back an interpreter that is a simple calculator.

"New" features of Jison are introduced in this grammar.  First,
consider the lexical specification given by the line::
	
  [0-9]+("."[0-9]+)?    return "NUMBER"

Recall that the string of characters before the "return" keyword is
officially called a *regular expression*. In fact, we are already
familiar with the symbols it uses from our discussion of EBNF.
Remember that :math:`+` in EBNF means one-or-more, :math:`?` means
zero-or-one, and parentheses are used for grouping.  Hence the above
regular expression says that a number is "one or more digits followed
optionally by a group consisting of a decimal point and one or more
digits".

Second, consider the annotation delimited by braces in the following
portion of the grammar::

  program
      : exp "EOF"
        { return $1; }
      ;
  exp
      : term
        { $$ = $1; }
      | exp "PLUS" term
        { $$ = $1 + $3; }
      | exp "MINUS" term      
        { $$ = $1 - $3; }
      ;

In the example above, there is one annotation per production. This
annotation is inserted at the end of the production.

These annotations are made up of JavaScript code. Here the notations **$1**
and **$3** refer to what the parser/interpreter returns from
evaluating the first and third non-terminals on the RHS of the
**exp** production.  The **$$** notation is what the
parser/interpreter recursively returns to the previous level of the
parse.  So **{ $$ = $1 + $3; }** indicates that the interpreter should add
what was returned from parsing an **exp** (the first non-terminal) and
a **term** (the third non-terminal) and consequently return that sum
to the prior level of recursion in the parse.  At the top-level
associated with the **program** non-terminal, the notation **{ return
$1; }** indicates that, when end-of-input is found, the
parser/interpreter should return **$1**, that is, whatever resulted
from parsing/evaluating the **exp** on the RHS of the **program**
production.
  
The review problem for this section will help you understand how
annotated Jison grammars can be used to generate interpreters.

.. avembed:: Exercises/PL/AnnotatingJison.html ka
   :long_name: Annotating Jison
