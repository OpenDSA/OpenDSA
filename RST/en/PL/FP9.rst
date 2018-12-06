.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps

===============================================================
Functional Programming - Continuations and Continuation Passing
===============================================================

   
Tail recursive functions
------------------------

Consider the two functions below.  Each takes in a list of non-negative
integers and uses recursion to return the product of the numbers in the list. 

::

    var product1 = function(ns) {
        if (fp.isNull(ns)) {
            return 1;
        } else {
            return fp.mul(fp.hd(ns),
                          product1(fp.tl(ns)));
        }
    }

::

    var product2 = function (ns) {
        var helper = function (ns,a) {
              if (fp.isNull(ns))  {
                  return a;
              } else {
                  return helper(fp.tl(ns), 
                                fp.mul(a,fp.hd(ns)));
              }
        };
        return helper(ns,1);
    }

Which version is better and why?
To begin answering that question, we need the following definition.
A **tail call** is a function call performed as the final action in
a function’s body. A function is **tail recursive** if all of the
recursive calls it makes are tail calls.  We alluded to the notion of tail
recursion in the `section on the reduce function`_.   Now we will learn more
about it and its advantages.

.. _section on the reduce function: FP7.html

This first problem is about a recursive function to compute the
greatest common divisor (or :math:`gcd`) of two integers.

.. avembed:: Exercises/PL/TailRecursion.html ka
   :long_name: Tail Recursion

Continuation Passing Style
--------------------------


**Tail-call elimination or optimization** (TCO) automatically removes
tail calls. Two question immediately arise.  Why would we want to do
this?  Assuming we understand why, how could it be done?


To understand "why", we first note that the
product-of-numbers-in-a-list computation should return 0 with no
computation if the input list contains one or more zeros.

With the *product1* function, no computations are performed until the base case is
reached. But what if the last number is the first zero in the input
list? We could save the last recursive call, but we still need to return
0 all the way back, through the (possibly very high) call stack -- doing
an unnecessary multiplication by 0 upon each return.

With the *product2* function, TCO removes the sequence of recursive calls and thus
allows us to return right away when the first zero is found. However,
since the computations are performed before each recursive call, a lot
of effort may have been wasted before the first zero is detected.

In such cases, we would like to have better control over the flow of
execution of our programs. For example, we would like to return
immediately as soon as a zero is detected, as in *product2*, but, as in
*product1*, we do *not* want to perform any expensive computations until
we know for sure that no zeros are present in the input list.

**Continuations** allow us to make the control flow and execution state of
our programs explicit and thus solve this problem.

A **continuation** is a callback function :math:`k` that represents the
current state of the program’s execution. More precisely, the continuation :math:`k` is a
function of one argument, namely the value that has been computed so
far, that returns the final value of the computation after the rest of
the program has run to completion.

So, at any point in the computation for our product example, the continuation :math:`k`
takes as input the partial product :math:`x` that has been calculated so
far and returns the final product. Of course, the final product is still
computed recursively. So :math:`k` only computes one multiplication and
then calls another continuation to process the rest of the list.

For example, if the input list is *[2,3,4,5,6]*, the continuation after
the 3 has been processed is the function that takes
:math:`x=6=2\times 3` as input, computes the next product (namely,
:math:`x \times 4`) and finally passes this new value as input to the
continuation for the next recursive call.

The resulting code is in the *product3* function appearing below.
When programming in the **continuation-passing style** (CPS), every
function takes an extra parameter, namely a continuation.

::

    var product3 = function (ns) {
        var cps_product = function (ns,k) {
            if (fp.isNull(ns)) {
                return k(1);
            } else {
                return cps_product(fp.tl(ns),
                                   function (x) {
                                       return k(fp.mul(x,fp.hd(ns)));
                                   });
            }
        };
        return cps_product(ns, function (x) { return x; });
    }

To initiate the computation, the CPS helper function is given the
identity function.


.. inlineav:: FP9Code1CON ss
   :long_name: Illustrate Continuation Passing
   :links: AV/PL/FP/FP9CON.css
   :scripts: AV/PL/FP/FP9Code1CON.js
   :output: show



