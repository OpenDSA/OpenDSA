.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps

============================================================
Functional Programming - Recurring On Lists That Aren't Flat
============================================================

   
Deep Recursion in FP (1)
------------------------

In the previous section, we limited our treatment of list-processing
functions to operating on *flat* lists of integers, that is, list that
do not themselves contain nested inner lists.  In this section, we
will consider how to operate on lists that can contain not only
integers, but also lists.  This will lead to a discussion of "deep
recursion," which can handle trees represented as lists of lists of ...  lists of integers nested arbitrarily deep.

A good guideline for deep recursion is the following.  When recurring
on a list of creatures *lst* that may themselves be lists, recur on both
*fp.hd(lst)* and *fp.tl(lst)* – just make sure *lst* is not empty and
that *fp.hd(lst)* is a list.

Consider the following **tree_test** list as an example::

    var tree_test = [14, [7, [], [12, [], []]],
                         [26, [20, [17, [], []],
                                   [] ],
                              [31, [], []]]]

We want to develop a function that takes in an integer tree
represented as a list of lists of …lists of integers and returns the sum
of the integers in the tree.

::

    var sumTree = function (ns) {
        if (fp.isNull(ns)) {
            return 0;
        } else if (???????) {
            return ?????????;
        } else {
            return ?????????;
        }
    }

Once you have decided how to fill in the **???????** in the preceding
example, consider the slight modification in the following review
problem.

.. avembed:: Exercises/PL/DeepRecur1.html ka
   :long_name: Deep Recursion 1

Deep Recursion 2
----------------

Notice that our **tree\_test** is actually a binary search tree under
the interpretation that the first nested list following a number is
the left subtree of that number and the second nested list following a
number is the right subtree.  Using this represented of the tree,
write a function **path**

**var path = function (n, bst)**

where **n** is a
number and **bst** is a binary search tree that contains the number
*n*. **path** should return a list of 0’s and 1’s showing how to find
the node containing **n**, where 1 indicates "go right" and 0 indicates
"go left". If *n* is found at the root, the empty list is
returned. Example usage::

    > var tree_test = [14, [7, [], [12, [], []]],
                         [26, [20, [17, [], []],
                              [] ],
                              [31, [], []]]]
    > path(17, tree_test)
    [1, 0, 0]

    
In writing this function, you should be using **cons** to construct the returned list as you progress through the tree using a deep recursion strategy.   Once you feel you have a correct solution, use similar logic in developing a solution for the following review problem.
    
This problem again deals with deep recursion and more specifically with the
``subst`` function that was previously described.

.. avembed:: Exercises/PL/DeepRecur2.html ka
   :long_name: Deep Recursion 2


Deep Recursion 3
----------------

This problem is similar to (and assumes that you have solved) the
previous problem.

.. avembed:: Exercises/PL/DeepRecur3.html ka
   :long_name: Deep Recursion 3

Deep Recursion 4
----------------

As a final example to  give you a lot more practice with deep
recursion, consider the following randomized exercise. You have to solve it
correctly three times in a row.

.. avembed:: Exercises/PL/DeepRecur4.html ka
   :long_name: Deep Recursion 4
