.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps

======================================================================
Procedural Abstraction: The Filtering and Folding (or Reduce) Patterns
======================================================================

   
The Filtering Pattern
---------------------

The filtering (or simply, filter) pattern is exemplified below.  In the
example on the right, JavaScript's mod operator **%** is used to test
whether or not an integer is even.

.. inlineav:: FP7Code1CON ss
   :long_name: Illustrate Filtering Pattern
   :links: AV/PL/FP/FP7CON.css
   :scripts: AV/PL/FP/FP7Code1CON.js
   :output: show

Note that, with **curry**, we could use the **filter** function to actually create the functions **keepPositive** and **keepEven**. 
   
::

    > var keepPositive = fp.curry(filter)(function (n) { return fp.isGT(n,0); });
    > var keepEven = fp.curry(filter)(function (n) { return fp.isZero(n % 2); });

This illustrates the function-creating powers of currying.  It allows
us to not only replicate the behavior of individual functions such as
**keepPositive** and **keepEven**, but also to replicate the functions
themselves without ever having to write their code.
    
The first problem below deals with the filtering pattern.

.. avembed:: Exercises/PL/Filter.html ka
   :long_name: Filtering Pattern

The Folding/Reduce Pattern
--------------------------

To discover our next pattern, recall that, in the section
:ref:`reverse`, we used a helper function with an accumulator to
perform a **cons** operation prior to making a recursive call instead
of after returning from a recursive call.  Keep that in mind as you look for
the commonality in the following two examples.


.. inlineav:: FP7Code2CON ss
   :long_name: Illustrate Reduce/Folding Pattern
   :links: AV/PL/FP/FP7CON.css
   :scripts: AV/PL/FP/FP7Code2CON.js
   :output: show




The *reduce* function we have defined in the previous examples applies
its helper function *f* to produce the accumulated value *acc* in
left-to-right order as it works through the list.  Moreover, it does
this in what is known as *tail-recursive* fashion because the helper
function *f* is applied within the arguments to the recursive call,
not to the result being returned from the recursive call.  This
left-to-right order was essential for the definition of *reverse* to
work correctly.  For *sum*, it was inconsequential because of the
commutative property of addition.  We will return to a more extensive
discussion of tail-recursive functions in
the `section on continuation passing style`_.

.. _section on continuation passing style: FP9.html

We could also define a similar function that applies the helper
function in right-to-left order as it works through the list.
This is illustrated in the next set of examples.


.. inlineav:: FP7Code3CON ss
   :long_name: Illustrate ReduceRight Pattern
   :links: AV/PL/FP/FP7CON.css
   :scripts: AV/PL/FP/FP7Code3CON.js
   :output: show


Note that the *reduceRight* function expects the function we pass in
for the operation that "accumulates" values to have its first
parameter represent the head of the list, that is, the "next" value to
be accumulated.  Its second parameter is consequently the accumulator.
This is the opposite of *reduce*, which expected a function that had
the first parameter playing the role of the accumulator, and its
second being the "next value to be accumulated".  This emphasizes the right
versus left associativity of the two patterns.

Also note that, because *reduce* captures the accumulation pattern as
we described it in `the section on helper functions`_, the accumulator
has undergone all the computations necessary to achieve the final
answer by the time the end of the list is reached.  This is not true
of *reduceRight* since it applies its function parameter *f* to the
result of making the recursive call instead of applying recursion to
the result of applying *f*.  The *acc* parameter that *reduce* takes
is a true accumulator, which builds up its values on the descent into
recursion, so that all the necessary computation is completed by the
time the base case is reached.  The *acc* parameter that *reduceRight*
takes is merely a starting point for the accumulation of values that
must be computed as we recursively ascend from reaching the base
level.

.. _the section on helper functions: FP4.html
      

The following problem deals with the reduce patterns described above.

.. avembed:: Exercises/PL/Reduce1.html ka
   :long_name: Reduce 1


Practice with the Mapping and Reduce Patterns
---------------------------------------------

The following problem uses both the mapping and the reduce patterns.

.. avembed:: Exercises/PL/Reduce2.html ka
   :long_name: Reduce and Map


More Practice with the Reduce Pattern
-------------------------------------

The following problem will give you intensive practice with the reduce
pattern. This problem is randomized and must be solved three times in
a row.

.. avembed:: Exercises/PL/Reduce3.html ka
   :long_name: Reduce 3
