.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps


Lazy Lists
==========

Infinite Sequences
------------------

**Implementing call-by-name**

Macro-expansion may be implemented with a double textual substitution
(as in the C++ pre-processor) or with a single substitution and
dynamic scoping.  The result is the evaluation of the entire function
body in the caller's environment.  But how to implement call-by-name?
How to evaluate the arguments in the caller’s environment but the rest
of the body in the callee’s environment?

Instead of simply passing a textual representation of the argument, we
pass in a parameterless anonymous function that returns the argument.
Such an anonymous function is called a **thunk**.

Understanding the difference between an argument that is evaluated and
a thunk is to understand the difference between *7* and
**function () { return 7; }**.

Instead of evaluating the argument before calling the function and
using that value in the function, every time a parameter is referenced
in the function body, the thunk is *thawed* to obtain the argument’s
value.

**Call-by-name lists**

To illustrate the use of thunks, we will implement call-by-name lists,
which are similar to the way they are used by default in Haskell and,
as a programmer-chosen option, in Python.  Call-by-name lists
essentially give you **lazy lists**, which can also be thought of as
"infinite sequences".  

Below is a partial code listing for a JavaScript module for infinite
sequences called the **is** module.

The constructor for sequences (i.e., the **cons** function) takes two
arguments, namely the element we want at the head of the sequence and
a thunk that will return the tail of the sequence if we ever need to
go beyond the first element.  For simplicity, we will only manipulate
sequences of integers.

Here is the code for some of the functions in the **is** module.

::

    // return the sequence frozen in the given thunk
    // this function is NOT exported
    var thaw = function (thunk) { 
        return thunk(); 
    };

    // construct a new sequence made of the given integer and thunk 
    var cons = function (n,thunk) { 
        return [n, thunk];  
    };

    // get the first integer in the  sequence
    var hd = function (seq) { 
        return seq[0]; 
    };

    // return the sequence that is obtained by deleting the head of the given sequence 
    var tl = function (seq) { 
        return thaw(seq[1]); 
    };

    // return the list containing the first n integers in the given sequence
    var take = function (seq,n) {
        if (n === 0)
            return [];
        else {
            var result = take(tl(seq), n - 1).slice(0); 
            result.unshift(hd(seq));
            return result;
        }
    };


In addition to the functions listed above, the **is** module has some
helper functions that are "infinite analogues" to their counterparts
in finite lists (our **fp** module).  Think about how the set of
question marks should be filled in to complete these functions before
proceeding to the practice problems

::

    // return the sequence of successive integers starting at n
    var from = function (n) {
        return cons(n, function () { ?????? });
    };

    // return the sequence obtained by removing the first n integers from the given sequence 
    var drop = function (seq,n) {
        if (n === 0)
            return seq;
        else {
            return drop( ?????? );
        }
    };

    // return a new sequence obtained by mapping the given function onto the given sequence
    var map = function (f,seq) {
        return cons (  ?????? );

    };

    // return a new sequence obtained by filtering the given sequence with the given predicate
    var filter = function (pred,seq) {
        if (pred(hd(seq))) {
            return cons ( ?????? );
        } else {
            return ??????;
        }
    };

    // return a new sequence obtained by repeatedly applying the given function to the
    // previous term of the sequence (starting with the given integer).   That is, return
    // the sequence n, f(n), f(f(n)), f(f(f(n))), ...
    var iterates = function (f,n) {

        return cons(n, ?????? );
    };

**Call-by-need**
   
What's the difference between our call-by-name implementation of
infinite sequences and the way it is done in Haskell?  In Haskell, the
analogue of the **is.tl** and **is.take** functions are done with
call-by-need instead of call-by-name. In call-by-need, the value
returned by a thunk is stored (that is, cached) after it is thawed for
the first time. This is much more efficient since it never results in
a thunk being thawed more than once..


This problem will help you better understand code that creates
call-by-name infinite sequences.

.. avembed:: Exercises/PL/InfSeq1.html ka
   :long_name: Matching sequence to code that produced it

Practice With Infinite Sequences
--------------------------------

This problem will help you write recursive code to process infinite
sequences. To earn credit for it, you must complete this randomized
problem correctly three times in a row.

.. avembed:: Exercises/PL/InfSeq2.html ka
   :long_name: RP set #32, question #2

Practice With Infinite Sequences (2)
------------------------------------

This problem reviews recursive definitions of sequences.  To earn
credit for it, you must complete this randomized problem correctly
three times in a row.

.. avembed:: Exercises/PL/InfSeq3.html ka
   :long_name: Matching sequence to code that produced it (2)

Practice With Infinite Sequences (3)
------------------------------------


This problem deals with one more example of a recursive definition of
a sequence.

.. avembed:: Exercises/PL/InfSeq4.html ka
   :long_name: Matching sequence to code that produced it (3)

