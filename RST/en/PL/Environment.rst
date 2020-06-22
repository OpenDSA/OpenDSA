.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps

Environment-based Model of Evaluation
=====================================

Environment Data Structure
--------------------------

In a pure :math:`\lambda`-calculus interpreter:

When evaluating a function call, the (values of the) arguments are actually
**substituted** for the formal parameters (depending on the reduction
strategy: normal order or applicative order) in the body of the
function.

In our applied :math:`\lambda`-calculus interpreter:

We guarantee that substitution remains a valid way to reason about
function behavior, but we move away from the **substitution model**
for the implementation of the interpreter and adopt an
**environment-based model** of evaluation, in which values are bound
to identifiers (variable names).

Conceptually, an environment is a (possibly empty) set of variable-value
pairs. We’ll represent this set itself and each pair in it as an array.
For example:

::

    E = [ ]    // the empty environment

    E = [ ["y",4], ["x",5], ["f",<sqr_fn>] ]  
               // the environment in which y is bound to 4
               //                          x is bound to 5
               //                          f is bound to the squaring function

In reality, there is more than one environment, since there is more than
one scope. For example, the variable "x" may be bound to the value 5 in
one scope but it may be bound to the squaring function in another scope.

In JavaScript, each function defines its own scope. Since function
definitions can be nested inside other functions, scopes (and thus
environments) may be nested as well. We will represent this
hierarchical structure of the environment using nested arrays.  For
example, for the following JavaScript code segment:


::

    function f(x,y) {
      return function (x) {
          return function (y,z) {
             // compute with x,y,z (**)
           };
        };
    }
    var id = function (x) { return x; };
    f(1,2)("hi")(true, id);


the nested arrays for the environment would be:

::

    [ "Env",                  // our usual tag

      [ ["y",true],           // the set of bindings in the innermost scope, 
        ["z",id]],            // i.e., the top of the stack of environments

      [ "Env",                // the sets of bindings in all of the outer scopes, 
                              // i.e.,the rest of the stack of environments
        [["x","hi"]],         //          .
                              //          .
        [ "Env",              //          .
          [["x",1],["y",2]],  //          .
          ["EmptyEnv"]]]]     //          .


An environment contains the bindings of variables to values. An Integer
is one kind of value. But what kind of value is a function abstraction?

It is a function definition with a list of formal parameters, a body,
and a *closure* that wraps up an anonymous function definition together with the
current environment, that is, the one existing at the time the function
is defined.

| For example, defining the anonymous function: **fn (f) => (f x)**
| in the environment: **E1 = [ "Env", [ ["x", 5] ], [ "EmptyEnv" ] ]**
| results in the following new value: **[ "Clo", [ "f" ], (f x), E1 ]** 
| that is, the anonymous function whose only parameter is a function **f**, whose body is the call of **f** on the argument **x**, and whose environment is **E1**.

| If this closure is later bound to the variable **g**, as in: **(fn (g) => (g 1) fn (f) => (f x))**
| then the environment at the point where **g** is being applied to 1 is: **E2 = [ "Env", [ ["g", [ "Clo", [ "f" ], (f x), E1 ] ] ], E1 ]**

In programming languages, a **denoted value** is any kind of value that
can be bound to a variable name. So, an **environment** is just a
mapping from identifiers (e.g., "x" and "g") to denoted values.

The types of denoted values vary from programming language to
programming language. In SLang 1, the only types of denoted value are
numbers and closures.

As usual, we will represent these denoted values with arrays whose first
element is the tag "Num" or "Clo", respectively.

This means that, if we had been faithful to our
representation of environments in **E1** above, we would have shown a binding of 5 to
"x" as:

**[ "x", [ "Num", 5 ] ]**

instead of

**[ "x", 5 ]**
	  
    
Determining Values Bound to a Variable
--------------------------------------

The following problem provides practice determining which value a SLang
1 variable is bound to. To earn credit for it, you must complete this
randomized problem correctly three times in a row.

.. avembed:: Exercises/PL/Environment1.html ka
   :long_name: Determine values bound to a variable in environment

Evaluation of Expression Within an Environment
----------------------------------------------

The following problem provides practice fully evaluating SLang 1
expressions.  To earn credit for it, you must complete this randomized
problem correctly three times in a row.

.. avembed:: Exercises/PL/Environment2.html ka
   :long_name: Expression Evaluation within Environment


Determining Denoted Values in SLang 1
-------------------------------------

The following problem gives you practice with denoted values in the SLang 1
interpreter. To earn credit for it, you must complete this randomized
problem correctly three times in a row.

.. avembed:: Exercises/PL/Environment3.html ka
   :long_name: Denoted Values in SLang 1

