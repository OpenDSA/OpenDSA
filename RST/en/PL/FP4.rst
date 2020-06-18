.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps

=================================================================
Using Helper Functions with Accumulators
=================================================================

.. _reverse:

Using Helpers to Write reverse and split Functions
--------------------------------------------------

How would you design a *reverse* function that takes in a list of integers
and returns a list containing the same elements as the input list but in
reverse order?

::

    > reverse( [1,2,3] )   // we could start with [ ] and insert 1 into it to get [ 1 ]
    [ 3, 2, 1 ]            // then insert 2 into [ 1 ] to get [ 2, 1 ]
                           // then insert 3 into [ 2, 1 ] to get [ 3, 2, 1 ]
    > reverse( [ ] )
    [ ]



The essence of using the *accumulator pattern* is to add an extra
argument, called an *accumulator*, to a helper function for the
function we are trying to develop.  For *reverse*, we could use a recursive helper
function that takes in the input list *ns* and the list *acc* that is being built.
This is illustrated in the slide show below.


.. inlineav:: FP4Code1CON ss
   :long_name: Illustrate Use of Accumulator in Developing Reverse Function
   :links: AV/PL/FP/FP4CON.css
   :scripts: AV/PL/FP/FP4Code1CON.js
   :output: show



As another example of using an accumulator, consider how you would
design a split function that takes in an integer :math:`n` and a list
:math:`ns` of integers and returns two lists, the first one of which
contains all of the elements of :math:`ns` that are smaller than
:math:`n` and the second one contains the remaining elements of
:math:`ns`?

::

    > split(5, [1,9,2,8,3,7])
    [ [ 3, 2, 1 ], [ 7, 8, 9 ] ]  
    > split(5,[ ])
    [ [ ], [ ] ]

We call the first argument of split the *pivot* because of a famous
algorithm that uses split (see the second review problem below).


.. inlineav:: FP4Code2CON ss
   :long_name: Illustrate Use of Accumulator in Developing Split Function
   :links: AV/PL/FP/FP4CON.css
   :scripts: AV/PL/FP/FP4Code2CON.js
   :output: show


The first review problem will test your understanding of *split* and
another function called *join*, which is also developed using an
accumulator.


.. avembed:: Exercises/PL/SplitAndJoin.html ka
   :long_name: Split and Join with accumulators

Using the split Function to Develop a Sorting Function
------------------------------------------------------

This problem will have you use the ``split`` function to implement an
efficient sorting algorithm.

.. avembed:: Exercises/PL/QuickSort.html ka
   :long_name: Using split to define quick sort

Additional Practice with the Accumulator Pattern
------------------------------------------------

This problem will give you a lot more practice with the accumulator pattern.
It is a randomized problem. You have to solve it three times in a row.

.. avembed:: Exercises/PL/AccumulatorPatternPractice.html ka
   :long_name: Accumulator Pattern Practice
