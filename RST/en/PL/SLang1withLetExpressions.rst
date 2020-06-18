.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps

Let Expressions
===============

Let Blocks
----------

In :ref:`reverse` where we introduced helper functions, we considered the
following **split** function.

::

    var split = function (pivot,list) {
        if (fp.isNull(list)) { 
            return [[],[]]; 
        } else {
            if (fp.isLT(fp.hd(list), pivot)) {
                return fp.makeList(
                    fp.cons(fp.hd(list), fp.hd(split(pivot,fp.tl(list)))),        // Call split
                    fp.hd(fp.tl(split(pivot,fp.tl(list))))                        // Call again
                );
            } else {
                return fp.makeList(
                    fp.hd(split(pivot,fp.tl(list))),                              // Call split 
                    fp.cons(fp.hd(list), fp.hd(fp.tl(split(pivot,fp.tl(list)))))  // Call again
                );
            }
        }
    };

While this works correctly, it is inherently inefficient because it
always makes two recursive calls to **split** that are guaranteed to
produce the exact same result.

It would be much better to cache the result of a call to **split** and
then use that cached result in place of the two calls.  We could do
this in SLang 1 if we had the ability to declare a symbol local to the
scope where it was needed and "assign" that symbol the result of
calling **split**.  Then, instead of calling **split** twice, we could
just twice use the result that had been cached by association with the
symbol.  It is with this in mind that we introduce a **let block** in
SLang 1.  Consider the following three examples of **let block** usage.
In each example, the assignments to symbols following **let** are used
in the expression enclosed in the keywords **in** and **end**.

Example 1

::

    let
       x = 1
       y = 2
    in
       +(x,y)
    end

Example 2

::
   
    let
       x = 1
    in
       let
          f = fn(y) => +(y,x)
       in
          let
              x = 2
          in
              (f 3)
          end
       end
    end

Example 3

::

    let
       x = 1
       sqr = fn (x) => *(x,x)
    in
       let
          f = fn(y) => +(y,x)
       in
          let
              x = 2
          in
              +(x,(sqr (f x)))
          end
       end
    end


Interestingly, the **let block** (or  **let expression**) is just *syntactic sugar* for an
existing construct in SLang 1.  That is, when the SLang 1 interpreter
encounters a **let block** it can just "translate" it into that
existing construct right away as it builds the abstract syntax tree.
To see what this existing structure is, figure out what the sets of
question marks should be in each one of the following statements.


Statement 1: When we evaluate **let x = 1 y = 2 in <exp> end**, we return the value
of **???** in an environment in which **???** and **???** are bound to **???** and **???**,
respectively.

Statement 2: When we evaluate **(fn (x,y) => <exp> 1 2)**, we return the value of
**???** in an environment in which **???** and **???** are bound to **???** and **???** ,
respectively.

Test whether you've filled in the question marks correctly by doing
the following practice problems.

    
Let Blocks As Syntactic Sugar
-----------------------------

The following randomized problem focuses on *let expressions* as *syntactic
sugar*. Solve it correctly three times in a row to get
credit for it.

.. avembed:: Exercises/PL/LetSynSugar.html ka
   :long_name: Let As Syntactic Sugar

Nested Lets
-----------

The following randomized problem focuses on the evaluation of nested
*let expressions*. Solve it correctly three times in a row to get
credit for it.

When you provide your answer, remember to include the full denoted
value, for example **[ "Num", 0 ]** and not just **0**.

.. avembed:: Exercises/PL/LetNested.html ka
   :long_name: Nested Lets

Nested Lets with Closures
-------------------------

The following randomized problem focuses on the evaluation of nested
*let expressions* with closures. Solve it correctly three times in a row to get
credit for it.

Again, when you provide your answer, remember to include the full denoted value.


.. avembed:: Exercises/PL/LetNestedWithClosures.html ka
   :long_name: Nested Lets with Closures
