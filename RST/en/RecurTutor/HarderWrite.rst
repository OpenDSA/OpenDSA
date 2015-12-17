.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Sally Hamouda and Cliff Shaffer
   :requires: recursion writing
   :topic: Recursion

Writing More Sophisticated Recursive Functions
==============================================

Some recursive functions have only one base case and one recursive
call.
But it is common for there to be more than one of either or both.

The following is the general structure for a recursive function.

.. codeinclude:: RecurTutor/RecMultBcRc

.. topic:: Example

   Consider a rather simple function to determine if an integer ``X`` is
   prime or not. 
   ``Y`` is a helper variable that is used as the devisor.
   When calling the function initially, ``Y = X - 1``

   .. codeinclude:: RecurTutor/Prime

   We see that ``Prime`` has two base cases and one recursive call.

.. topic:: Example

   Here is a function that has multiple recursive calls.
   Given an ``int`` array named ``arr``, function
   ``isSubsetSum`` determines whether some of the values in
   ``arr`` add up to ``sum``.
   For example, given the number 3, 8, 1, 7, and -3, with ``sum = 4``,
   the result is ``true`` because the values 3 and 1 sum to 4. 
   If ``sum = 6``, then the result will be ``true`` because the
   :math:`8 + 1 + -3 = 6`.  
   On the other hand, if ``sum = 2`` then the result is ``false``
   there is no combination of the five numbers that adds up to 2.
   In this code, variable ``n`` is the number of values that we look
   at.
   We don't want to just use ``arr.length`` because the recursive
   calls need to limit their work to part of the array.
   
   .. codeinclude:: RecurTutor/IsSubsetSum
   
   This example has two base cases and two recursive calls.

.. topic:: Example

   Here is a function that has multiple base cases and multiple
   recursive calls.
   Function ``paths`` counts the number of different ways to reach a
   given basketball score.
   Recall that in Basketball, it is possible to get points in
   increments of 1, 2, or 3.
   So if ``n = 3``, then ``paths`` will return 4, since there are four
   different ways to accumulate 3 points: :math:`1+1+1, 1+2, 2+1,` and 3.
   
   .. codeinclude:: RecurTutor/Paths

   This function has three base cases and three recursive calls.
