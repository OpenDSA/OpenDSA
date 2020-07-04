.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps

====================================
List Construction and Deconstruction
====================================

   
Constructing Lists with fp.cons
-------------------------------


.. .. Just a test to see if we can visualize a beta reduction
.. 
.. Just a test to see if we can visualize a beta reduction -- delete when done testing
..    
.. .. inlineav:: LC1CON ss
..    :long_name: Illustrate Lambda Calculus applicative order
..    :links: AV/PL/LC/LCCON.css
..    :scripts: AV/PL/interpreters/lambdacalc/version1.4.used.in.book/scripts/init.js AV/PL/interpreters/lambdacalc/version1.4.used.in.book/scripts/grammar.js AV/PL/interpreters/lambdacalc/version1.4.used.in.book/scripts/absyn.js AV/PL/interpreters/lambdacalc/version1.4.used.in.book/scripts/interpreter.js AV/PL/interpreters/lambdacalc/version1.4.used.in.book/scripts/randomExamples.js AV/PL/LC/LC1CON.js
..    :output: show



**Functional programming** (FP) is a programming paradigm where
functions are the main abstraction and in which functions are pure,
first-class values and data is immutable.

A function is **pure** if it returns a value without having any side
effects. A pure function does not affect any data outside of itself (no
assignment statements, no I/O) and does not access any global data that
could be changed by other functions. A pure function ALWAYS returns the
same value given the same input, like in mathematics. In fact, FP
started with Alonzo Church’s :math:`\lambda`-calculus, which we will
study later in this course.

**First-class values**, like integers, booleans, strings, etc., are
values that can be assigned to variables, can be stored in arrays and
other data structures, can be used as an argument in a function call and
can be the return value of a function call. In FP, functions are
first-class values. Functions that take one or more functions as
parameters and/or return a function are called **higher-order
functions** (much more on this later).

In FP, all data items are **immutable**: once a value is created, it can
never be modified. Even in Java, which is an object-oriented language, not a FP
language, String objects are immutable.

The most basic, built-in data structure in FP languages is the list,
whose structure can be described in BNF notation as follows:

.. math::

   \begin{eqnarray*} 
   <list\_of\_ints> & ::= & \epsilon \\
   &|& <int> <list\_of\_ints> \\
   \end{eqnarray*}

Note that:

#. We are limiting ourselves to lists of integers for now, and

#. The grammar above describes the **abstract syntax or structure** of
   lists, not its **concrete syntax**, that is, how lists actually
   appear in any particular FP language.

In this functional programming chapter, the concrete syntax of lists
will use square brackets around each list and a comma between pairs of
consecutive elements in the list.

So, the empty list will be represented by::

    [ ]

and non-empty lists will look like this::

    [2,3,5,7,11,13,17,19]

Since JavaScript (JS) does not come with a built-in immutable list data
structure, we provide one as part of a module called ``fp.js``, which
is used throughout this chapter.

You can make this module (as long as it is located in your current
directory) available in your JS files by including the following line
at the top of the file::

          var fp = require('./fp');

	  
Then, every time you want to use any of the functions defined in this
module (such as the ``hd`` function to be described shortly), you will
prepend the prefix ``fp.`` to the function’s name. For example, you
would call the ``hd`` function with the argument ``list`` like this::

          fp.hd(list)

Lists can be constructed using the ``cons`` function, which takes two
arguments: a single element and a list of elements. The ``cons``
function returns a new list equal to its second argument but with its
first argument inserted in front. So, in a read-eval-print loop such as that provided
in *node*::

    > fp.cons( 5, [1,2,3] )
    [ 5, 1, 2, 3 ]
    > fp.cons( 1, [ ] )
    [ 1 ]

The ``fp`` module provides a helper function to create an arbitrarily
long list in one call, like this:

::

    > fp.makeList(1,2,3)
    [ 1, 2, 3 ]
    > fp.makeList(1,2,3,4,5,6,7,8,9,10)
    [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
    > fp.makeList()
    []

The following problem deals with the syntax and semantics of the ``fp.cons`` function.

.. avembed:: Exercises/PL/FPcons.html ka
   :long_name: Using cons

	       
	       
Deconstructing Lists with fp.hd and fp.tl
-----------------------------------------

So far, we can build lists using the ``fp.cons`` and ``fp.makeList``
constructors. However, we also need to be able to access the elements of
a list.

The ``fp`` module provides the so-called “head” and “tail” accessors.

-  ``fp.hd(l)`` returns the first element of its list argument.

-  ``fp.tl(l)`` returns the list obtained by removing the head from its
   list argument.

::

    > fp.hd([1,2,3])
    1
    > fp.tl([1,2,3])                  // how would you access the second or third element of this list?
    [ 2, 3 ]
    > fp.hd([])
    Error: hd can only be called with a non-empty list.
    > fp.tl([])
    Error: tl can only be called with a non-empty list.

In languages like Lisp and Scheme, these accessors are called
“car” and “cdr” respectively.

It is important to note the symmetry between the ``cons`` constructor
and the list accessors: ``cons`` builds a list using the same building
blocks that the accessors return.

The following practice problem deals with the semantics of the
``fp.hd``, ``fp.tl``, and ``fp.cons`` functions. Note that this
problem is randomized. You must solve it correctly three times in a
row to earn the point associated with it.


.. avembed:: Exercises/PL/FPHdTlCons1.html ka
   :long_name: Head, Tail, and Cons 1

Practicing List Manipulations with the fp module
------------------------------------------------

This problem helps you review the semantics of the ``fp.hd``,
``fp.tl``, and ``fp.cons`` functions.

.. avembed:: Exercises/PL/FPHdTlCons2.html ka
   :long_name: Head, Tail, and Cons 2

fp.isNull, fp.isEq, and fp.isZero
---------------------------------

To check whether a list is empty or not, you must use the
’\ ``isNull``\ ’ function:

::

    > fp.isNull( [ ] )      // we say that a list is null when it is equal to [ ] 
    true
    > fp.isNull( [1,2,3] )
    false

The ``isNull`` function is a **predicate**, that is, a function that
returns a Boolean value, ``true`` or ``false``.

A second useful predicate is ’\ ``isEq``\ ’, which checks whether two
*primitive elements* are equal (note that integers are primitive elements but
lists are not):

::

    > fp.isEq(1,1)
    true
    > fp.isEq(1,2)
    false

A third useful predicate is ’\ ``isZero``\ ’:

::

    > fp.isZero(0)
    true
    > fp.isZero(1)
    false


The final problem in this section deals with the syntax and semantics of the ``fp.hd``,
``fp.tl``, and ``fp.isEq`` functions.

.. avembed:: Exercises/PL/FPisEq.html ka
   :long_name: Using isEq test

