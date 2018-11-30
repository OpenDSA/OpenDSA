.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps

============================================================================================
Functional Programming - Procedural Abstraction: The Filtering and Folding (Reduce) Patterns 
============================================================================================

   
The Filtering Pattern
---------------------

The filter pattern is exemplified below.
In the example on the right, JavaScript's mod operator **%** is used to test whether or not an integer is even.  

.. inlineav:: FP7Code1CON ss
   :long_name: Illustrate Filtering Pattern
   :links: AV/PL/FP/FP7CON.css
   :scripts: AV/PL/FP/FP7Code1CON.js
   :output: show

Note that, with **curry**, we could use the **filter** function to actually create the functions **keepPositive** and **keepEven**. 
   
::

    > var keepPositive = fp.curry(filter)(function (n) { return fp.isGT(n,0); });
    > var keepEven = fp.curry(filter)(function(n) { return fp.isZero(n % 2); });

This illustrates the function-creating powers of currying.  It allows
us to not only replicate the behavior of individual functions such as
**keepPositive** and **keepEven**, but also to replicate the functions
themselves without ever having to write their code.
    
This first problem deals with the filtering pattern.

.. avembed:: Exercises/PL/Filter.html ka
   :long_name: Filtering Pattern

Folding/Reducing
----------------

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



Later ...

**Reducing from the right:** Whereas the *reduce* function we have defined applies its helper
function *f* to produce the accumulated value *acc* in left-to-right
order as it works through the list, we could also define a similar
function that applied the helper function in right-to-left fashion as
it worked through the list.


