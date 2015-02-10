.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Sally Hamouda
   :satisfies: binary tree common traversal problems
   :topic: Binary Trees Common Traversal Problems

.. odsalink:: AV/RecurTutor2/AdvancedRecurTutor.css

Binary Tree Traversal Common Problems
=====================================

When writing a recursive function to solve a problem that requires traversing a binary tree,
we want to make sure that we are visiting "exactly" the required nodes (no more and no less).
You should also make sure that you don't do the common mistakes stated  below.

So, you should learn two skills in order to avoid inefficient solutions:

 #. Formulate the base case and its action to work correctly on any given binary tree.
 #. Formulate the recursive case and its action to work correctly on any give binary tree.

Avoid the following common mistakes:

 #. Forget to check if the root is null.
 #. Check if one or both children are null. You SHOULD NOT do that. When you do the recursive call and pass the root.left()
    or the root.right() as the parameter, the recursive function will call itself and treating
    the passed child as the new root. So, you don't need to explicitly check if the children are null.
 #. Access the children values. You SHOULD NOT do that. The same as the previous point. The child passed to the recursive call
    is treated as the new root. So, you don't need to explicitly access the children values. Just
    make sure you do that for the root.
 #. If it is required from you to write a function that returns a value (e.g. the number of nodes in a binary tree),
    you have to make sure that the function actually "returns". One of the common mistakes is just
    doing  the recursive call without writing the word "return" before it.
 #. Doing unneeded visits to the nodes that can be avoided. That more likely
    to happen in the problems that requires traversing a binary search tree and you forget
    to make use of the binary search tree properties which keeps the numbers
    less than the root in the left sub-tree and the numbers larger than the root on the
    right sub-tree. So one of the common mistakes is searching for the minimum  value in
    a binary search tree in the right sub-trees or searching for the maximum value of a binary search tree
    in the left sub-tree.
 
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

Avoid common mistakes
---------------------

One of the most common mistakes when writing a program that traverses
a binary tree is forgetting to check if the root is null or not.
In this case, your code will not execute correctly because you are missing
a crucial check. So, make sure to always check if the root is null or not.

The following mistakes will not affect your code execution or results.
Your solution will execute correctly but not efficiently.

One of the common mistakes is checking if the children are null or not.
 
.. topic:: Example

   Recall the problem of counting the number of nodes in a binary tree.
  
   The following solution is correct but inefficient as it does redundant
   checks on the left and the right child of each visited node::
  
    int ineff_count(BinNode root) {
    if (root == null) {
       return 0;
     }
     int count = 0;

     if (root.left() != null) {
      count = 1+ ineff_count(root.left());
     }

     if (root.right() != null) {
      count = 1 + ineff_count(root.right());
    }
   
    if (root.left() == null && root.right() == null) {
       return 1;
    }
   
     return 1 + count;
     }   
    }
  
  
   So, don't explicitly check if the children are null or not. Your solution
   may execute correctly but not efficiently. Remember that the root's left or right children
   is treated as the new root when passed to the recursive call so you don't need to do that
   redundant check.
  
   The efficient solution should be ::

     int eff_count(BinNode root) {
      if (root == null) return 0;  // Nothing to count
      return 1 + count(root.left()) + count(root.right());
     }


Another common mistake is accessing the children values. Again, don't explicitly access
the children values. Your solution may execute correctly but not efficiently.
Remember that the root's left or right children is treated as the new root
when passed to the recursive call so you don't need to do that redundant check.

.. topic:: Example

   If the problem is incrementing each node in a binary tree
   by a certain given value.
  
   The following solution is correct but inefficient as it does redundant
   manipulation to left and the right children of each visited node::
  
    void ineff_btInc(BinNode root , int value) {
    if (root != null)
    {
     root.setElement(((Integer)root.element()) + value);
     if(root.left()!= null)
     {
       root.left().setElement(((Integer)root.left().element()) + value);
       ineff_btInc(root.left().left() , value);
     }
     if(root.right()!= null)
     {
       root.right().setElement(((Integer)root.right().element()) + value);
       ineff_btInc(root.right().right() , value);
     }
    }
   }

  The efficient solution should not explicitly set the children values that way.
  It should just pass the root's left and right to the recursive call and then the
  recursive function will do the rest. As an exercise for you, think about how to re-write
  this code efficiently.

  
In rare problems, you may need to explicitly check if the children are null or access
the children values. For example, check if a children in a tree satisfies the sum property.
This property says that for each node sum of its left and
right children should be equal to node value.    In this specific problem you will need to
explicitly check on the children if the children are null or not and check on their values.


Another common mistake is doing unneeded visits to the nodes that can be avoided.

.. topic:: Example

   Given a binary search tree, find out the minimum value. Your solution to this problem
   can visit every single node in the binary search tree without benefiting from the binary
   search tree property that can make you avoid visiting many nodes in most of the cases.
   So, you know that the values greater than the root are always on the right sub-tree.
   Given that you want the minimum so why will you ever need to traverse any of the right sub-trees
   when you know that the minimum value is in a left sub-tree. 
   This was explained in the previous visulization.

In summary, those are the common mistakes you should avoid doing:

.. inlineav:: BinaryTreeMistakesCON ss
   :output: show


Learning those skills requires a lot of practice to make sure that you are not only getting
the correct answer but also doing the solution efficiently without falling into the common mistakes.

.. odsascript:: AV/RecurTutor2/IneffBinaryTreeRangeCON.js
.. odsascript:: AV/RecurTutor2/BinaryTreeMistakesCON.js
