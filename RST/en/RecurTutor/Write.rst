.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Sally Hamouda
   :prerequisites:
   :topic: Recursion

.. odsalink:: AV/RecurTutor/recursionwritecon1.css
.. odsalink:: AV/RecurTutor/recursionwritecon2.css

How to write a recursive function?
==================================

As we have mentioned before, solving a "big" problem recursively means to solve one or more smaller versions of the problem, and using those solutions of the smaller problems to solve the "big" problem. 

In particular, solving problems recursively typically means that there are smaller versions of the problem solved in similar ways. For example, consider the problem of summing values of an array. What's the difference between summing an array of 100 elements versus summing an array of 50 elements?

You use the same technique, but in one case you sum up to 100 elements, and in the other case, you sum up to the first 50 elements. And, even more importantly, you can use the solution to the smaller problem to help you solve the larger problem.

To understand recursion, you must understand that the basic unit of recursion is the function call. In fact, if you avoid using loops and use only recursion, you will find that your function code will generally be much shorter. 

The following visualization shows the basic four steps you need to write any recursive function:


.. inlineav:: RecursionWriteCON1 ss
   :output: show  

The simplest version of a recursive function is an if-else statement where the \lq\lq if" part is the base case, and the "else" part is the recursive case. There are several mistakes people make with a base case. The first one is picking too large a base case. Second, not realizing there may be more than one base case. Finally, thinking that the base case only gets called when the input size is the smallest. In fact, the recursion ALWAYS makes it to some base case. Thus, the base case is where the recursion eventually stops. Don't think of it as merely called when the input is, say, 0. It gets called for all cases (eventually).
In the recursive case, there is a recursive call. Most recursive functions do something after the call. After all, you often need the solution of the \lq\lq smaller" recursive call to create the solution for the "big" problem. However, on occasion, you may need to do some work prior to the recursive function call (e.g., calculating or printing something).

The following visualization shows three different versions of the Sum recursive function and the differences between them

.. inlineav:: RecursionWriteCON2 ss
   :output: show  

You will never understand recursion well without doing a lot of practice on it. Here are set of practice exercises on recursion, try to practice them all to master recursion.

.. odsascript:: AV/RecurTutor/recursionwritecon1.js
.. odsascript:: AV/RecurTutor/recursionwritecon2.js
