.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps

===================================
Recurring On Lists That Aren't Flat
===================================

   
Deep Recursion in FP
--------------------

In the previous section, we limited our treatment of list-processing
functions to operating on *flat* lists of integers, that is, lists that
do not themselves contain nested inner lists.  In this section, we
will consider how to operate on lists that can contain not only
integers, but also lists.  This will lead to a discussion of *deep recursion*,
which can handle trees represented as lists of lists of ...  lists of integers
nested arbitrarily deep.

A good guideline for deep recursion is the following.  When recurring
on a list *lst* of elements that may themselves be lists, recur on both
*fp.hd(lst)* and *fp.tl(lst)*, after making sure that *lst* is not empty and
that *fp.hd(lst)* is indeed a list.

Consider the following **tree_test** list as an example::

    var tree_test = [ 14,
                      [ 7, [], [12, [], []] ],
                      [ 26,
		        [ 20, [17, [], []], [] ],
                        [ 31, [], [] ]
		      ]
		    ]

We want to develop a function that takes in an integer tree
represented as a list of lists of ... lists of integers and returns the sum
of the integers in the tree.

.. 
.. ::
.. 
..     var sumTree = function (ns) {
..         if (fp.isNull(ns)) {
..             return 0;
..         } else if (???????) {
..             return ?????????;
..         } else {
..             return ?????????;
..         }
..     }
.. 

.. inlineav:: FP3Code1CON ss
   :long_name: Illustrate Deep Recursion On List To Return Numeric Value
   :links: AV/PL/FP/FP3CON.css
   :scripts: AV/PL/FP/FP3Code1CON.js
   :output: show



Now that we have seen a deep recursion example in the preceding
slide show, consider the slight modification in the following review
problem.

.. avembed:: Exercises/PL/DeepRecur1.html ka
   :long_name: Deep Recursion 1

Deep Recursion on Binary Search Trees
-------------------------------------

Note that, although our **sumTree** function would work on an arbitrary
nested list, our particular **tree\_test** example is actually a
binary search tree under the interpretation that the first nested list
following a given number is the left subtree of that number, which
contains only values less than or equal to the number, and the second
nested list following a number is the right subtree, which contains
only numbers greater than the given number.  Using this representation of
a tree, we could develop the helper functions below that
process those nested lists that are binary search trees.

::

    // Return the left subtree
    var left = function (bst) {
       return fp.hd(fp.tl(bst));
    };

    // Return the right subtree
    var right = function (bst) {
       return fp.hd(fp.tl(fp.tl(bst)));
    };

    // Is this tree a leaf node?
    var isLeaf = function (tree) {
      return fp.isNull(left(tree)) && fp.isNull(right(tree));
    };


Using these helper functions, we can easily write a function **path**
(with one caveat addressed below)

**var path = function (n, bst) { ... };**

where **n** is a number and **bst** is a binary search tree that
**contains the number n**.  **path** should return a list of 0’s and
1’s showing how to find the node containing **n**, where 1 indicates
"go right" and 0 indicates "go left". If **n** is found at the root, the
empty list is returned. Example usage::

    > var tree_test = [ 14,
                        [ 7, [], [12, [], []] ],
                        [ 26,
                          [ 20, [17, [], []], [] ],
                          [ 31, [], [] ]
		        ]
		      ]

    > path(17, tree_test)
    [1, 0, 0]

The caveat in the function we develop is that it is not prepared to
return some type of error signal when **n** is not contained in the
tree.   We will address this shortcoming in the
`section on continuation passing style <FP9.html>`_.


.. inlineav:: FP3Code2CON ss
   :long_name: Illustrate Deep Recursion On BST
   :links: AV/PL/FP/FP3CON.css
   :scripts: AV/PL/FP/FP3Code2CON.js
   :output: show



Now that we've seen how to use **cons** in conjunction with lists
being returned from deep recursion, consider the following review
problem.  It also deals with deep recursion and more specifically with
the **subst** function that was described in :ref:`subst`.

.. avembed:: Exercises/PL/DeepRecur2.html ka
   :long_name: Deep Recursion 2


Practice with Deep Recursion
----------------------------

This problem is similar to (and assumes that you have solved) the
previous problem.

.. avembed:: Exercises/PL/DeepRecur3.html ka
   :long_name: Deep Recursion 3

More Practice with Deep Recursion
---------------------------------

As a final example and to give you a lot more practice with deep
recursion, consider the following randomized exercise. You have to
solve it correctly three times in a row.

.. avembed:: Exercises/PL/DeepRecur4.html ka
   :long_name: Deep Recursion 4
