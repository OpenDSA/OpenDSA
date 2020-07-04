.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps


Tying The Knot
==============

Implementing Recursion Efficiently
----------------------------------

We next consider how to implement recursive functions in SLang 2.  In
the lambda calculus and SLang 1, all functions are anonymous and
cannot call themselves. We could use a fixed-point combinator, like
the :math:`Y` combinator. 

::

    let
         Y = fn (h) => (fn (x) => (h (x x)) fn (x) => (h (x x)))
         f = fn (g) => fn (n) => if (n === 0) then 1 else (n * (g (n - 1)))
    in
         ((Y f) 5)   
    end

What is the problem with this approach?

In SLang 2, we can take advantage of references and the assignment statement to
implement recursion in an efficient way with a technique called "tying
the knot."

To get a sense of how this technique works, ask yourself what is the
value of the following program?

::

    let
         dummyClosure = fn (n) => (n + 1)
    in
         let
               f = fn (n) => if (n===0) then 1 else (n * (dummyClosure (n - 1)))
         in
               (f 5)
         end
    end

How can we modify this program to turn the function **f** above into the
(recursive) function that we know under the name *factorial* so that
the value of the program above is 120?

Hint: add a single assignment statement, but which one? and where?
Answer these questions and you will see why this technique is called
"tying the knot".
    
    

Practice TTK
------------

The following problem will help you get comfortable with the TTK
technique. To earn credit for it, you must complete this randomized
problem correctly three times in a row.

When you provide your answer, remember to include the full denoted
values, for example **[ "Num", 0 ]** and not just **0**.

.. avembed:: Exercises/PL/TyingTheKnot.html ka
   :long_name: Tying the Knot
