.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Sally Hamouda
   :satisfies: binary tree common traversal problems
   :topic: Binary Trees Common Traversal Problems


Binary Tree Traversal Common Problems
===============================================

When solving a problem that requires traversing a binary tree, we want to make sure that we are visiting "exactly" the required nodes (no more and no less).


.. topic:: Example

   If it is required to count the number of leaf nodes in a given binary tree. You may write a program which is correctly counting the number of leaf nodes but do redaundant   
   visits to the nodes.
 

.. topic:: Example

   Given a binary search tree, find out the minimum value. Your solution to this problem can visit every single node in the binary search tree without benefiting from the binary 
   search tree proporty that can make you avoid visiting many nodes in most of the cases.

 You should learn two skills in order to avoid ineffecient solutions:

 #. Formulate the base case and its action to work correctly on any given binary tree.
 #. Formulate the recursive case and its action to work correctly on any give binary tree.


Formulate the base case and its action
--------------------------------------

In binary trees, the base case is always to check if we have an empty tree. One of the common mistakes some people does is considering that the base case action will be executed only after the recursive calls are executed. This is not always the case because you may have your input as an empty tree from the very begining and in that case no recursive calls will be executed before the base case action.

The base case action formulation depends on the problem we have. For example, if it is required to count the nodes then the base case action will be returning 0. 


Formulate the recursive case and its action
-------------------------------------------

Always remember that you should not worry about the recursion details. Admit that it will do it correctly. So, when your recursive case action is to  visit recursively the right and left children this means that every node will do that. You don't need to worry about making sure that every node will do it.

Make sure that when you design your recursive case(s) that they are not doing redundant nodes visit or skipping nodes. This can be done by tracing your code on a binary tree and marking the nodes that you have visited after each recursive call.


.. topic:: Example

   Recall the previous example of counting the number of nodes in a binary tree.
   
   The following solution is correct but ineffecient as it does redaundant checks on the left and the right child of each visited node::
   
    int ineff_count(BinNode rt) { 
    if (rt == null) {
       return 0;
     } 
     int count = 0;

     if (rt.left() != null) {
      count = 1+ ineff_count(rt.left());
     }

     if (rt.right() != null) {
      count = 1 + ineff_count(rt.right());
    }
    
    if (rt.left() == null && rt.right() == null) {
       return 1;
    }
    
     return 1 + count;
     }	
    }
   



   The effecient solution should be ::

     int eff_count(BinNode rt) {
      if (rt == null) return 0;  // Nothing to count
      return 1 + count(rt.left()) + count(rt.right());
     }

Learning those skills requires a lot of practice to make sure that you are not only getting the correct answer but also doing the solution effeciently without visiting more or less nodes than required.
