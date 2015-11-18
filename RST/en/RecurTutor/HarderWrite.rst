.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Sally Hamouda
   :requires: recursion writing
   :topic: Recursion


Writing a more sophisticated recursive function
===============================================

In the previous examples and exercises, all the recursive functions has only one base case and one recursive case. A more general structure for recursion
can have more than one base case and recursive case. 

The following Figure shows how a general structure recursive function looks like.

.. codeinclude:: RecurTutor/RecMultBcRc

In some problems, we need to have more than one base case and more than one recursive case. 

.. topic:: Example

   Example of a function that has multiple base cases is a function that determines if an integer X is prime or not. 
   The following code shows a recursive function that determines if an integer X is prime or not.
   Where X is the number to check whether it is prime or not. Y is a divisor which is a number below X, when calling the function initially Y equals X-1:

   .. codeinclude:: RecurTutor/Prime


.. topic:: Example

   Example of a function that has multiple recursive calls, is a function that finds whether a subset of given numbers
   adds up to a target sum.  For example, given the set 3,8,1,7,-3 (where n is 5 for this set) and the target sum is 4, 
   the result is true because the subset 3,1 sums to 4. 
   Also, if the target is 6 the result will be true because the subset 8,1,-3 sums to 6.  
   On the other hand, if the target is 2 then the result is false because non of the subsets can sum to 2. 
   As shown in the following code, the function takes a set of integers, the number of integers and a target sum:
   
   .. codeinclude:: RecurTutor/IsSubsetSum
   
.. topic:: Example

   Example of a function that has multiple base cases and multiple recursive calls, is a function that counts 
   the number of different ways to reach a basketball score. 
   Example: For the input 3, the output will be 4, since there are 4 different ways to accumulate 3: 1+1+1, 1+2, 2+1, 3.:
   
   .. codeinclude:: RecurTutor/NumOfOps
      
You need to practice harder recursive functions in order to gain more experience on recursion.
