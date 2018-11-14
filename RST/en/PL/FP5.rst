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


.. 
.. 
..     var x = "outside";                              // what is the scope of this x?
..     var f1 = function() { var x = "inside f1"; };   // what is the scope of this x?
..     f1();    
..     // what is the value of x right here?
..     var f2 = function() { x = "inside f2"; };       // what is the scope of this x?
..                                                     // is this a trick question?
..     f2();    
..     // what is the value of x right here?


