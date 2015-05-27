.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Sally Hamouda
   :requires: recursion intro
   :satisfies: recursion writing
   :topic: Recursion


.. odsalink:: AV/RecurTutor/recursionWrtCON.css


Writing a recursive function
==================================

As we have mentioned before, solving a "big" problem recursively means to solve one or more smaller versions of the problem, and using those solutions of the smaller problems to solve the "big" problem. 

In particular, solving problems recursively typically means that there are smaller versions of the problem solved in similar ways. For example, consider the problem of summing values of an array. What's the difference between summing an array of 100 elements versus summing an array of 50 elements?

You use the same technique, but in one case you sum up to 100 elements, and in the other case, you sum up to the first 50 elements. And, even more importantly, you can use the solution to the smaller problem to help you solve the larger problem.

To understand recursion, you must understand that the basic unit of recursion is the function call. In fact, if you avoid using loops and use only recursion, you will find that your function code will generally be much shorter. 

The following visualization shows the basic four steps you need to write any recursive function:


.. inlineav:: recursionWrtStepsCON ss
   :output: show  

The following visualization shows four different versions of the Sum recursive function and the differences between them

.. inlineav:: recursionWrtSumCON ss
   :output: show  


.. topic:: Example

   The following code shows an example of a recursive function that computes the Fibonacci of a given number.
   Fibonacci Sequence is the series of numbers: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ... Where the next number is found by adding up the two numbers before it:
   
   .. codeinclude:: RecurTutor/Fibonacci

You will never understand recursion well without doing a lot of practice on it. Here are set of practice exercises on recursion, try to practice them all to master recursion.

.. odsascript:: AV/RecurTutor/recursionWrtStepsCON.js
.. odsascript:: AV/RecurTutor/recursionWrtSumCON.js
