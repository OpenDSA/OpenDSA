.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Sally Hamouda
   :satisfies: binary tree as a recursive data Structures
   :topic: Binary Tree as a Recursive Data Structures

Binary Tree as a Recursive Data Structure
=========================================

Recursive data structure is a data structure that is partially composed of smaller or simpler instances of the same data structure where the relationships identified by the structure provides a natural model for the recursive algorithm to work with that data. For example, lists and binary trees could be viewed as a recursive data structures. List is a recursive data structure because a list can be defined as an empty list or a node followed by a list. While, binary tree can be defined as an empty tree or a node pointing to two binary trees one on its right and the other one on its left. So, recursion is ideally suited to recursive data structures like lists and binary trees.

.. Todo::

   Figure shows that list  is a node followed by a list.
   
.. Todo::

   Figure shows that binary tree shows is a node pointing to two binary trees. 

Next example will show how the flow of information in a list can be done recursively to compute the sum of the values in the list. We will then evlove the same example to compute the sum of the values stored in a binary tree.

.. topic:: Example

   Suppose that we want to compute the sum of the values stored in a list.

.. Todo::

   A visulization that shows the steps of doing so through delegation model. Suppose that you are given this task and you ask a friend to take the list without the first element 
   and sum it then return it to you so that you add the first's node value and you are done. The visulization will show the recursive code which is doning that.   

   The Code::

	     double sum( List head )
	     {
	      double solution, smallerSol;
	
	       if ( head == null )
	       {
	         solution = 0;        // Solution for the base case
	
	         return solution;     // Return solution
	       }
	       else
	       {
	         smallerSol = sum( head.next() );      // Solve smaller problem
	
		 solution = head.getValue() + smallerSol; // Solve my problem using the solution of smaller problem   
		                                     
		 return solution;     // Return solution
	       }
	     }



.. topic:: Example

   We will repeat the previous problem on a binary tree.
	
.. Todo::

   A visulization that shows the steps of doing so through delegation model. Suppose that you are given this task. You ask two friends to help you. The first one will take the 
   left subtree to sum it and the second one will take the right sub tree to sum it then you add the root's value and  you are done. 
   The visulization will show the recursive code which is doning that.
   
   The Code::

       double sum( BinNode root )
       {
        double mySum, leftSum, rightSum;
        if ( root == null )
        {
         mySum = 0;        // Solution for the base case
         return mySum;     // Return solution
        }
        else
        {
         leftSum  = sum( root.left );      // Solve smaller problem 1
         rightSum = sum( root.right );     // Solve smaller problem 2

	 mySum = root.value + leftSum + rightSum;
                                             // Solve my problem using
	                                     // solution of smaller problem   

	 return mySum;     // Return solution
       }
      }

