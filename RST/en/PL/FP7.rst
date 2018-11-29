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


