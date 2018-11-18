.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps

============================================================================================
Functional Programming - Scope, Closures, Higher-order Functions, Static vs. Dynamic Binding
============================================================================================

   
Scope, Closures, Higher-order Functions (1)
-------------------------------------------

Every **variable** is a memory location. Each variable has a name, by
which you can refer to this location in your program, and a value that
is associated with the location.

In the statement *x = x + 1*, does the leftmost *x* refers to a
location or a value?  Does the rightmost “x” refers to a location or a
value?

Additionally  every variable also has a **scope** which comprises all of the
sections of the program where the variable is visible. So, when the
variable *x* is in scope, you can refer to it by name. Anywhere else,
using the name *x* is an error (unless there exists another variable
also called *x* that is in scope, as considered below).

In JavaScript, there are only two kinds of scopes: the global scope and
local scopes. A **local scope** is always defined by the body of a
function.  This is different from languages like C and Java, where
scope is defined by a block enclosed in curly braces.  Suppose for
example, the following code is loaded into the read-eval-print loop of
an interpreter like **node**.


.. inlineav:: FP5Code1CON ss
   :long_name: Illustrate Scope
   :links: AV/PL/FP/FP5CON.css
   :scripts: AV/PL/FP/FP5Code1CON.js
   :output: show

In most other languages, it is better to give each variable the
smallest scope possible, by declaring the variable as close as
possible to its uses. Not so in JavaScript, because **JavaScript does
not have block scope** and variable declarations are always *hoisted*
to the top of the function.  Consider how this plays out in the
following example, remembering to take into account what was said
earlier about scope in JavaScript being defined by the body of a
function and not by an inner set of curly braces.

.. inlineav:: FP5Code2CON ss
   :long_name: Illustrate Variable Hoisting
   :links: AV/PL/FP/FP5CON.css
   :scripts: AV/PL/FP/FP5Code2CON.js
   :output: show




..     var x = 10;
..     var f = function(y) { 
..                console.log(y);
..                if (true) {
..                     var x = 20;   
..                }
..                console.log(x);
..     }
..     f(x);    


The prior example illustrates something allowed but considered a bad
practice in JavaScript.  Inside the body of a function, you should
never declare a variable inside any nested block. You should always
declare your variables in the outermost block (that is, the block
defining the body of the function). Furthermore, always declare your
variables at the beginning of that body.


When an expression refers to a variable for which there is no
declaration in the smallest scope containing the expression, how is
the use of that variable bound to a declaration?  The following code illustrates
this situation.

.. inlineav:: FP5Code3CON ss
   :long_name: Illustrate Nested Scopes
   :links: AV/PL/FP/FP5CON.css
   :scripts: AV/PL/FP/FP5Code3CON.js
   :output: show


..     var f = function (x,y) {
..         var g = function (x) {     // what is the scope of g?
..                   return x + y;    // line A
..         }
..         return g(10*x);            // line B
..     }


Here is another example illustrating the nuances of using variables of
the same name at different levels of scope.  Consider what happens
when this code is loaded into a read-eval-print interpreter.

.. inlineav:: FP5Code4CON ss
   :long_name: Illustrate Static vs Dynamic Binding
   :links: AV/PL/FP/FP5CON.css
   :scripts: AV/PL/FP/FP5Code4CON.js
   :output: show

The slide-show above indicates that JavaScript (and most other
functional languages) use **static binding**.  That is, the use of *x*
in expression :math:`e` is bound to the declaration of *x* that
appears in the smallest scope that contains :math:`e` at the time the
function was defined.

Static binding is also called **static scoping** or **lexical
scoping**.
	    
There is a different type of binding called **dynamic binding**, in
which the declaration that binds a use of *x* in expression :math:`e`
is first looked for in the function (say, *f*) that contains
:math:`e`, then, if needed, in the function (say, *g*) that called
*f*, then in the function that called *g*, etc.  Note that, if
JavaScript used dynamic binding, the the value returned in the
previous example would have been 20 instead of 3.


..     var x = 1;
..     var f = function () {  return x; }   // the variable x is bound to which declaration of x?
..     x = 2;
..     var g = function () {
..                 var x = 20;              // which type of binding does JS use?
..                 return f();
..     }
..     x = 3;
..     g();       // what is the value returned here with dynamic binding? with static binding?  


