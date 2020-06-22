.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps


Defining SLang 1
================

Syntax of SLang 1
-----------------

So far we have examined how to program from a functional programming
perspective and how the lambda calculus forms the theoretical
foundation for that perspective.  We will now shift our focus and
consider how we could actually develop a small interpreter for a
language based on the lambda calculus.  We'll call that language
*SLang 1*, short for "Simple Language version 1".   

The development process for this interpeter will require our writing a
Jison grammar to define the syntax of the language and transform
programs in the language into an *abstract syntax tree* (AST).

How does **concrete syntax** differ from **abstract syntax**? In other
words, how do parse trees differ from abstract syntax trees?

A **parse tree** has a leaf node for each token, and an interior node
for each non-terminal. Parse trees are useful to represent the structure
or syntax of the source program.

However, we are now interested in the meaning of the program, not just
its superficial structure. **Abstract syntax trees (or ASTs)** are parse
trees stripped of all nodes that are not essential for later processing
(for us: the execution or interpretation process).

In an AST:

-  Operators appear at interior nodes, not at leaf nodes and their
   operands become their children.

-  Chains of unit productions (i.e., productions of the form
   ``<X> ::= <Y>``) are collapsed.

-  Lists are flattened.

-  Syntactic details (semi-colons, parens, etc.) are omitted.

This is illustrated in the example below.

::

             Parse Tree       Abstract Syntax Tree
             ==========       ====================

                 exp                  *
                  |                  / \
                term                3   +
                 /|\                   / \
             term * factor            4   2
              /      /|\
             /      / | \
          factor   ( exp )
            |        /|\
            3     exp + term
                   |      |
                 term   factor
                   |      |
                 factor   2
                   |
                   4

An AST often contains few nodes corresponding to non-terminals.  Nonetheless, it contains all of the information that is needed for the interpreter to derive the correct meaning of the input program, that is, to evaluate the program and return its correct value.

::

          Input                                  Parse Tree
          =====                                  ==========

          {                                ____ methodBody _________
             x = 0;                       /       /            \    \
             while (x<10) {              {  declList        stmtList }
                x = x+1;                       |           /        \
             }                              epsilon   stmtList       stmt___
             y = x*2;                                /      \       /  | \  \
          }                                     stmtList   stmt    ID  = exp ;
                                               /      \       \   (y)   / | \
                 AST                   stmtList      stmt     ...     exp * term
                 ===                       |       / | |  \            |      |
                                        epsilon   ID = exp ;         term   factor
              methodBody                          (x)   |              |      |
             /          \                            INTLITERAL     factor   INT
     declList            stmtList                      (0)             |     (2)
                        /   |    \                                    ID
                  assign  while  assign                               (x)
                  /     \  ...   /     \   
                 ID     INT     ID       *        
                 (x)    (0)     (y)     / \       
                                      ID  INT    
                                      (x) (2)    

The concrete syntax of SLang 1 is defined by the following EBNF grammar:
				      
::

    <program>  ::= <exp>
    <exp>      ::= <var_exp> | <fn_exp> | <app_exp> | <papp_exp> | <int>
    <fn_exp>   ::= fn '(' (<var_exp> (',' <var_exp>)*)? ')' => <exp>
    <app_exp>  ::= '(' <exp> <exp>* ')'
    <papp_exp> ::= <prim_op> '(' <args>? ')'
    <args>     ::= <exp> (',' <exp>)*
    <prim_op>  ::= + | * | add1


The SLang 1 "program" **(fn (a,b) => b y 3)** would result in the following parse tree and AST.
			      
::

                            parse tree                          AST
                            ==========                          ===

                             program                          program
                                |                                |
                               exp                            app_exp
                                |                            /       \
                           _ app_exp ______            fn_exp         args
                          /   |   |    \   \           /    \        /    \
                         (  exp  exp   exp  )      [a,b]  var_exp var_exp int
                   _________/      \     \                   |      |      |
                  /              var_exp int                 b      y      3
         ______fn_exp___________     \     \
        / /    /  |    |  \  \  \     y     3               [ "Program",
       / /    /   |    |   \  \  \                            [ "AppExp",
     fn ( var_exp , var_exp ) => exp                            [ "FnExp",
             |         |          |                               ["a","b"],
             a         b       var_exp                            ["VarExp","b"]],
                                  |                             [ "args",
                                  b                               ["VarExp","y"],
                                                                  ["IntExp",3]]]]


										     

The expression in the bottom-right corner of the example above is a representation of the abstract syntax tree as a list of lists.

Concrete Syntax of SLang 1
--------------------------

The following problem will help you master the concrete syntax of
SLang 1. To earn credit for it, you must complete this randomized
problem correctly three times in a row.

.. avembed:: Exercises/PL/ConcreteSynSLang1_new.html ka
   :long_name: SLang 1 Concrete Syntax


More Practice with the Concrete Syntax of SLang 1
-------------------------------------------------

The following problem will reinforce your mastery of the concrete syntax of
SLang 1 by providing more intensive practice. To earn credit for it,
you must complete this randomized problem correctly three times in a
row.

.. avembed:: Exercises/PL/ConcreteSynSLang1.html ka
   :long_name: More SLang 1 Concrete Syntax

      
Abstract Syntax of SLang 1
--------------------------

The following problem will help you master the abstract syntax of SLang 1.

.. avembed:: Exercises/PL/AbstractSynSLang1.html ka
   :long_name: SLang 1 Abstract Syntax

Curry in SLang 1
----------------

The following problem will illustrate the semantics of SLang 1 while helping
you review the definition of the *curry* function.

.. avembed:: Exercises/PL/CurryInSLang1.html ka
   :long_name: Curry in SLang 1


Semantics of SLang 1
--------------------

The following problem focuses on the semantics of SLang 1.

.. avembed:: Exercises/PL/SemanticsSLang1.html ka
   :long_name: SLang 1 Semantics

