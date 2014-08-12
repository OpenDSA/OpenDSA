.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Sally Hamouda
   :prerequisites:
   :topic: Recursion

.. odsalink:: AV/RecurTutor/recursionintrocon1.css
.. odsalink:: AV/RecurTutor/recursionintrocon2.css

Introduction
==========================

Recursion makes it possible to solve complex problems using programs that are surprisingly concise, easily understood and algorithmically efficient. Recursion is the process of solving a large problem by reducing it to one or more sub-problems which are: Identical in structure to the original problem and somewhat simpler to solve.

Once that original subdivision has been made, the same decompositional technique is used to divide each of these problems into new ones which are even less complex. Eventually, the sub-problems become so simple that they can be then solved without further subdivision, and the complete solution is obtained by reassembling the solved components.

An algorithm is recursive if it calls itself to do part of its work. For this approach to be successful, the  call to "itself" must be on a smaller problem than the one originally attempted. In general, a recursive algorithm must have two parts: the base case, which handles a simple input that can be solved without resorting to a recursive call, and the recursive part which contains one or more recursive calls to the algorithm where the parameters are in some sense "closer" to the base case than those of the original call.

Imagine that someone in a movie theater asks you what row you're sitting in. You don't want to count, so you ask the person in front of you what row they are sitting in, knowing that you will respond one greater than their answer. The person in front will ask the person in front of them. This will keep happening until word reaches the front row and it is easy to respond: "I'm in row 1!" From there, the correct message (incremented by one each row) will eventually make it's way back to the person who asked.

To use recursion effectively, it is necessary to train yourself to stop analyzing the recursive process beyond the recursive call. The sub-problems will take care of themselves. You just worry about the base cases and how to recombine the sub-problems. Those who are unfamiliar with recursion might find it hard to accept that it is used primarily as a tool for simplifying the design and description of algorithms. A recursive algorithm usually does not yield the most efficient computer program for solving the problem because recursion involves function calls, which are typically more expensive than other alternatives such as a while loop. However, the recursive approach usually provides an algorithm that is reasonably efficient. If necessary, the clear, recursive solution can later be modified to yield a faster implementation.

Let's think about recursion in a different way. Think about recursion as if you have a big task and you will do a small part of it then delegate it to another one to help you on doing this task. An example similar to the movie theater example  mentioned earlier is, suppose that you have the task of multiplying two numbers x and y. You would like to delegate this task to some friend. You will ask the friend to multiply x-1 and y. You will simply add y to the result and you will be done with your task. You will not think about how your friend is going to do the task as you simply know how to do your own part.  When your friend send you back the result, you will only add y to that result. Next visualization shows that delegation process.

.. inlineav:: RecursionIntroCON2 ss
   :output: show  


If you are going to think how your friend is going to do the task then you will think that your friend will do exactly the same with another friend who will do exactly the same with a third one and so on. x will be decremented till eventually it will reach to one at the last friend. The last friend will send back the result of multiplying a one and y. The last friend will be returning back the result to the previous friend. This friend will add x to the result. This process will continue all the way back till the result of x-1 multiplied by y is back to you. 


.. inlineav:: RecursionIntroCON1 ss
   :output: show  

In order to understand recursion, you need to understand and practice how to write and read a recursive function.



.. odsascript:: AV/RecurTutor/recursionintrocon2.js
.. odsascript:: AV/RecurTutor/recursionintrocon1.js
