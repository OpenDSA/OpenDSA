.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Sally Hamouda
   :satisfies: common mistakes in recursive binary tree traversal
   :topic: Common Mistakes in Recursive Binary Trees Traversal

.. odsalink:: AV/RecurTutor2/AdvancedRecurTutor.css

Common Mistakes in Recursive Binary Tree Traversal
==================================================

When writing a recursive function to solve a problem that requires traversing a binary tree,
we want to make sure that we are visiting "exactly" the required nodes (no more and no less).
You should also make sure that you don't do the common mistakes stated  below:

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

   

In summary, those are the common mistakes you should avoid doing:

.. inlineav:: BinaryTreeMistakesCON ss
   :output: show


Learning those skills requires a lot of practice to make sure that you are not only getting
the correct answer but also doing the solution efficiently without falling into the common mistakes.

.. odsascript:: AV/RecurTutor2/BinaryTreeMistakesCON.js
