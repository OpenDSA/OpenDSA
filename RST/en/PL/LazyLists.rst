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

Understanding the difference between an passing an argument that is
evaluated before calling the function and a thunk is to understand the
difference between *7* and **function () { return 7; }**.  The former,
when passed as an argument, is already evaluated.  The function can
use that value without having to do anything else to it.  However, the
latter, when passed as an argument, requires that the parameterless be
executed to "unwrap" the value that the function should be using in
its computation.
 
Instead of evaluating the argument before calling the function and
using that value in the function, every time a parameter is referenced
in the function body, the thunk is evaluated to obtain the argument’s
value.  The evaluation process is often referred to as *thawing the
thunk*.

**Call-by-name lists**

To illustrate the use of thunks, we will implement call-by-name lists,
which are similar to the fashion in which lists are used by default in
Haskell, as a programmer-chosen option, in Python and Scala.
Call-by-name lists essentially give you **lazy lists**, and we will
see that they can also be thought of as "infinite sequences".  This
perspective offers a very different approach to the way in which one
works with such lists.

Below is documentation for some of the functions that we will provide
in a JavaScript module for infinite sequences called the **is**
module.

The constructor for sequences (i.e., the **cons** function) takes two
arguments, namely the element we want at the head of the sequence and
a thunk that will return the tail of the sequence if we ever need to
go beyond the first element.  For simplicity, we will only manipulate
infinite sequences of integers.  

::

   // Construct a new sequence comprised of the given integer and thunk
   var cons = function (n,thunk) 

   // Get the first integer in the  sequence
   var hd = function (seq) 

   // Get the the infinite sequence following the first element.  This
   // will itself be in the form of an integer followed by a thunk
   var tl = function (seq) 
   
   // Return the (finite, non-lazy) list containing the first n
   // integers in the given sequence
   var take = function (seq,n) 

The following slide-show illustrates how we could use these operations
to construct and then expose various parts of an infinite sequence of
1's.

.. inlineav:: LazyLists1CON ss
   :long_name: Illustrate Basic Lazy List Operations
   :links: AV/PL/LazyLists/LazyListsCON.css
   :scripts: AV/PL/LazyLists/LazyLists1CON.js
   :output: show


Let's now turn our attention to how these four basic functions in the
**is** module -- *cons, hd, tl*, and *take* -- are implemented.  The
underlying representation of a lazy list is a two-element array *seq*.
*seq[0]* stores the head of the list, which is already evaluated, and
*seq[1]* stores the thunk that must be evaluated to expose the
remainder of the of the list.

::

   // Construct a new sequence comprised of the given integer and thunk
   var cons = function (x, thunk) {
     return [x, thunk];
   };

   // Get the first integer in the  sequence
   var hd = function (seq) {
     return seq[0];
   };

   // Get the the infinite sequence following the first element.  This
   // will itself be in the form of an integer followed by a thunk
   var tl = function (seq) {
     return thaw(seq[1]);
   };

   // thaw is a helper function for tl.   It returns the result
   // of evaluating the function that 
   var thaw = function (thunk) { return thunk(); };
   
   // Return the (finite, non-lazy) list containing the first n
   // integers in the given sequence
   var take = function (seq, n) {
     if (n === 0)
       return [];
     else {
       // Get a copy of the result of recursive call with n - 1
       var result = take(tl(seq), n - 1).slice(0); // slice(0) gives a copy of the array
       // And use Javascript's unshift to put the hd at the beginning of result
       result.unshift(hd(seq));
       return result;
     }
   };

So far the only sequence that we have been able to create has been a
boring sequence consisting of all ones.  To make it easier to
construct more interesting sequences, in addition to *cons, hd, tl*,
and *take*, the **is** module has some utility functions that are
"infinite analogues" to their counterparts in finite lists (our **fp**
module).  Each of these utility functions -- *from, map, filter,
iterates*, and *drop* are discussed and illustrated below.

* The **from** operation:
  
.. inlineav:: LazyLists2CON ss
   :long_name: Illustrate from operation in is module
   :links: AV/PL/LazyLists/LazyListsCON.css
   :scripts: AV/PL/LazyLists/LazyLists2CON.js
   :output: show

* The **map** operation

.. inlineav:: LazyLists3CON ss
   :long_name: Illustrate map operation in is module
   :links: AV/PL/LazyLists/LazyListsCON.css
   :scripts: AV/PL/LazyLists/LazyLists3CON.js
   :output: show

* The **filter** operation

.. inlineav:: LazyLists4CON ss
   :long_name: Illustrate filter operation in is module
   :links: AV/PL/LazyLists/LazyListsCON.css
   :scripts: AV/PL/LazyLists/LazyLists4CON.js
   :output: show

* The **drop** operation:

.. inlineav:: LazyLists5CON ss
   :long_name: Illustrate drop operation in is module
   :links: AV/PL/LazyLists/LazyListsCON.css
   :scripts: AV/PL/LazyLists/LazyLists5CON.js
   :output: show


* The **iterates** operation:

.. inlineav:: LazyLists6CON ss
   :long_name: Illustrate iterates operation in is module
   :links: AV/PL/LazyLists/LazyListsCON.css
   :scripts: AV/PL/LazyLists/LazyLists6CON.js
   :output: show


.. Think about how the set of question marks should be filled
.. in to complete these functions before proceeding to the practice
.. problems

.. ::
.. 
..     // return the sequence of successive integers starting at n
..     var from = function (n) {
..         return cons(n, function () { ?????? });
..     };
.. 
..     // return the sequence obtained by removing the first n integers from the given sequence 
..     var drop = function (seq,n) {
..         if (n === 0)
..             return seq;
..         else {
..             return drop( ?????? );
..         }
..     };
.. 
..     // return a new sequence obtained by mapping the given function onto the given sequence
..     var map = function (f,seq) {
..         return cons (  ?????? );
.. 
..     };
.. 
..     // return a new sequence obtained by filtering the given sequence with the given predicate
..     var filter = function (pred,seq) {
..         if (pred(hd(seq))) {
..             return cons ( ?????? );
..         } else {
..             return ??????;
..         }
..     };
.. 
..     // return a new sequence obtained by repeatedly applying the given function to the
..     // previous term of the sequence (starting with the given integer).   That is, return
..     // the sequence n, f(n), f(f(n)), f(f(f(n))), ...
..     var iterates = function (f,n) {
.. 
..         return cons(n, ?????? );
..     };


**The Sieve of Erastosthenes -- an example that takes advantage of lazy lists**

The need to compute various prime numbers occurs in a variety of
applcations, for example, public-key encryption.  A long known
technique to compute all the prime numbers up to a limit *n* with
reasonable efficiency is the *Sieve of Erastosthenes*.  The slide slow
below describes the sieve algorithm in a language with eager (as
opposed to lazy) evaluation.

.. inlineav:: LazyLists7CON ss
   :long_name: Illustrate sieve of Erastonthenes
   :links: AV/PL/LazyLists/LazyListsCON.css
   :scripts: AV/PL/LazyLists/LazyLists7CON.js
   :output: show

There is a problem with this algorithm, however, from the perspective
of its utility.  That is, how well can it answer the questions
regarding primes we might want to ask of it?   While it can answer a question like "Find all primes

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

