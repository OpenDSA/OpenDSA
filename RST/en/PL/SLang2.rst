.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps


Defining SLang 2
================

SLang 2: An Imperative Language
--------------------------------

We will now add to our simple language features  that lie outside the
realm of pure functional programming.

In this new version of SLang, called **SLang 2** (for Simple Language
version 2), standard arithmetic and Boolean operators are now infix,
which is just a minor change in the concrete syntax.  More
importantly, we added an *if-then-else* expression as well as
assignment statements, print statements, and sequencing of statements
within a let block.  Collectively, these last three additions (i.e.,
additions of statements, not expressions) change our simple language
into an *imperative language*, that is, a language in which the
programmer relies upon changing the state of variables (i.e., side
effects) to compute a desired value.

**Adding assignment statements to SLang**

Syntax:

::

       <exp>        ::= <var_exp> | ... | <assign_exp>
       ...
       <assign_exp> ::= set <var_exp> = <exp>

Semantics:

-  Evaluate the expression on the right-hand side of the equal sign (or RHS expression).

-  Assign the resulting value to the variable on the left-hand side (or LHS).

-  Return the value of the RHS expression.

Expressions, when evaluated, return values. Statements, when evaluated,
have side effects.

The assignment statement is actually an **expression statement**
because it is both an expression (since it returns a value) and a
statement (since it has a side effect).


**Adding print statements to SLang**

Syntax:

::

       <exp>       ::= <var_exp> | ... | <print_exp>
       ...
       <print_exp> ::= print <exp>

Semantics:

-  Evaluate the expression.

-  Send the resulting value to the console.

-  Return nothing (i.e., ‘undefined’ in JavaScript).

This is a **pure statement**, that is, a statement that has no return
value.

**Adding sequencing to SLang let blocks**

Syntax:

::

       <exp>      ::= <var_exp> | ... | <let_exp>
       <let_exp>  ::= let <bindings> in <block> end
       ...
       <block>    ::= <exp> ( ; <exp> )*

Note that the semi-colon is an expression separator, not a terminator.

Semantics of the block:

-  Evaluate the expressions in the block in order.

-  Return the value of the last expression.

For sequencing to be useful, what must all of the expressions in the
block (except the last one) be?

**Example:** Using these definitions of the semantics of assignment, print, and sequencing, convince yourself that the example program below produces the output indicated on the right.  Once you have done that, get more practice by trying the randomized problem.

::

    let                                                  Output:   
         x = 1					     	      
         y = 2					     	      
         sqr = fn (x) => (x * x)		     	      
    in						         ["Num",6] 
        let					         ["Num",2] 
            f = fn (x) => (y * x)		         ["Num",64]
            g = fn () => set y = add1(y)	         ["Num",10]
            h = fn () => set x = add1(x)	         ["Num",6] 
            x = 3				         ["Num",15]
        in					         ["Num",50]
            set x = (2 * x);
            print x;    print y;
            print (sqr (x + y));
            print (f 5);
            (g);
            (h);
            print x;
            print (f 5);
            set y = 10;
            print (f 5)
        end
    end




Output of SLang 2 Program
-------------------------

The following problem will help you master the syntax and semantics of
SLang 2. To earn credit for it, you must complete this randomized
problem correctly three times in a row.

When you provide your answer, remember to include full denoted
values, for example **[ "Num", 0 ]** and not just **0**.


.. avembed:: Exercises/PL/OutputOfSLang2Prog.html ka
   :long_name: Output of SLang 2 Program

