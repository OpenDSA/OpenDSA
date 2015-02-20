.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Sally Hamouda
   :satisfies: recursive binary tree traversal
   :topic: Recursive Binary Trees Traversal

.. odsalink:: AV/RecurTutor2/AdvancedRecurTutor.css

Recursive Binary Tree Traversal
================================

When writing a recursive function to solve a problem that requires traversing a binary tree,
we want to make sure that we are visiting "exactly" the required nodes (no more and no less).

So, you should learn two skills in order to avoid inefficient solutions:

 #. Formulate the base case and its action to work correctly on any given binary tree.
 #. Formulate the recursive case and its action to work correctly on any give binary tree.


Formulate the base case and its action
--------------------------------------

In binary trees, the base case is always to check if we have an empty tree.
One of the common mistakes some people does is considering that the base case
action will be executed only after the recursive calls are executed.
This is not always the case because you may have your input as an empty tree
from the very beginning and in that case no recursive calls will be executed
before the base case action. Make sure when you write a program that traverse a binary tree
to check in the base case if the root of the binary is null (In that case the given tree is empty).

The action that the base case will execute is dependable on the given problem.
For example, if it is required to count the nodes then the base case action will be returning 0.
While, if it is required to check on the existence of a value or not then the base case action 
in this case will return false because the given binary tree is empty.


Formulate the recursive case and its action
-------------------------------------------

Always remember that you should not worry about the recursion details.
Admit that it will do it correctly. So, when your recursive case action
is to  visit recursively the right and left children this means that every node will do that.
You don't need to worry about making sure that every node will do it.

Some problems requires that you traverse the whole tree, in those
problems you must make sure that your function is working for the left and right sides of the tree.
Some other problems requires only traversing the left or the right side
of the tree. You have to make sure that you visit exactly the nodes that are needed by the problem.

The following visualization shows an example of a code that does redundant visit to solve the problem
of getting the number of nodes falling in a certain given range in a binary search tree (BST).
The code in the visualization works correctly but it is NOT an efficient code because
it does redundant/unnecessary nodes visits.

.. inlineav:: IneffBinaryTreeRangeCON ss
   :output: show

.. odsascript:: AV/RecurTutor2/IneffBinaryTreeRangeCON.js
