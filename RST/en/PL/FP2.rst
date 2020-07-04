.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps

==============================================================================
Developing Basic, Recursive List-processing Functions 
==============================================================================

   
Recursive List Processing Example: sum( list )
----------------------------------------------

In the previous section, we introduced three predicates that are part
of the *fp* module, namely *isEq*, *isZero*, and *isNull*.  We will now
introduce some additional predicates and arithmetic functions that we
will then use to write recursive list-processing functions, including
``sum``, ``isMember``, ``removeFirst``, and ``subst``.

First, to check whether something is a list or not, you must use the
``isList`` function::

    > fp.isList( [ ] )  
    true
    > fp.isList( [1,2,3] )
    true
    > fp.isList( 1 )
    false

Second, the two helper functions ``add`` and ``sub`` perform
the addition and subtraction, respectively, of their two integer
arguments::

    > fp.add(2,3)
    5
    > fp.sub(2,3)
    -1

Third, the two predicates ``isLT`` and ``isGT`` test whether
their first argument is less than or greater than their second argument,
respectively::

    > fp.isGT(2,3)
    false
    > fp.isLT(2,3)
    true

We're now ready to write a recursive ``sum`` function that takes in an
integer list and returns the sum of all of the values in the input
list.  ::

    > var fp = require('./fp')
    > sum( [ 1, 2, 3 ] )
    6
    > sum( [ ] )
    0
    > sum( [ 1, -2, 3, -4] )
    -2

When we design a recursive algorithm on lists, we must keep in mind
the recursive BNF definition of integer lists:

.. math::

   \begin{eqnarray*} 
         <list\_of\_ints> &::=& \epsilon \\
         & | & <int> <list\_of\_ints> \\
   \end{eqnarray*}	 

Following the two paths for a *<list_of_ints>* in this grammar, one
for the empty list and one for a non-empty list, leads us to structure
a *sum* function as shown below.

Think about how to complete this function.

.. inlineav:: FP2Code1CON ss
   :long_name: Illustrate Simple Recursion On List To Return Numeric Value
   :links: AV/PL/FP/FP2CON.css
   :scripts: AV/PL/FP/FP2Code1CON.js
   :output: show

Then try the following
review problem, which uses similar recursive list-processing logic.
Note that this problem is randomized. You must solve it correctly
three times in a row to earn the point associated with it.

.. avembed:: Exercises/PL/RecListProc1.html ka
   :long_name: Recursion on Flat lists 1

Recursive List Processing Example: isMember( num, list )
--------------------------------------------------------

Next consider a function *isMember* that takes in an integer *n* and an integer list *ns* and returns true if and only if
its first argument is a member of the second argument::

    > var fp = require('./fp')
    > isMember( 2, [ 1, 2, 3 ] )
    true
    > isMember( 4, [ 1, 2, 3 ] )
    false
    > isMember( 2, [ 1, [ 2, 3 ] ] )
    false

Note that the second argument in the last call above is not an integer
list. Keep in mind the recursive definition of integer lists:

.. math::

   \begin{eqnarray*} 
   <list\_of\_ints> &::=& \epsilon \\
   & | &  <int> <list\_of\_ints> \\
   \end{eqnarray*}

Following this recursive definition, we design a recursive algorithm
for *isMember* using the template provided in the first slide below.


.. inlineav:: FP2Code2CON ss
   :long_name: Illustrate Simple Recursion On List To Define IsMember
   :links: AV/PL/FP/FP2CON.css
   :scripts: AV/PL/FP/FP2Code2CON.js
   :output: show
		      

Using a recursive pattern similar to the one for *isMember*, think about
how to design a similar list-processing function *removeFirst* that
takes in an integer *n* and an integer list *l* and
returns a list identical to *l* but with the first occurrence of
*n* removed::

       > var fp = require('./fp')
       > removeFirst(3,[1,2,3])
       [ 1, 2 ]
       > removeFirst(4,[1,2,3])
       [ 1, 2, 3 ]
       > removeFirst(2,[1,2,3,2])
       [ 1, 3, 2 ]


Once you have the correct logic for *removeFirst*, consider the
following review problem, which asks you to slightly modify *removeFirst*.


.. avembed:: Exercises/PL/RecListProc2.html ka
   :long_name: Recursion on Flat Lists 2


.. _subst:

Recursive List Processing Example: subst( new, old, list )
----------------------------------------------------------


As a final example in this section, consider a function that takes in
two integers :math:`n` (for ’new’) and :math:`o` (for ’old’) and an
integer list :math:`l` and returns a list identical to :math:`l`
except that all occurrences of :math:`o` in :math:`l` have been
replaced by :math:`n`::

    > var fp = require('./fp')
    > subst(10,1,[1,2,3,2,1])
    [ 10, 2, 3, 2, 10 ]
    > subst(50,5,[1,2,3])
    [ 1, 2, 3 ]
    > subst(10,1,[[1,2],3])
    [ [ 1, 2 ], 3 ]


Note that we stretched the semantics of the *subst* function a bit since the third argument in the last call above is not an integer list. Again the template for the *subst* function follows the pattern
established by the BNF grammar for a *<list_of_ints>*.


.. inlineav:: FP2Code3CON ss
   :long_name: Illustrate Simple Recursion On List To Do Substitution
   :links: AV/PL/FP/FP2CON.css
   :scripts: AV/PL/FP/FP2Code3CON.js
   :output: show


Now that we have established the correct logic for this function, consider the final review problem for this section, which  asks you to slightly modify the ``subst`` function.

.. avembed:: Exercises/PL/RecListProc3.html ka
   :long_name: Recursion on Flat Lists 3
