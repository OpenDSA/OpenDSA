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
    writing the recursive call without writing the word "return" before it.


Forget to check if the root is null
------------------------------------

One of the most common mistakes when writing a program that traverses
a binary tree is forgetting to check if the root is null or not.
In this case, your code will not execute correctly because you are missing
a crucial check. So, make sure if the tree will allow the root to be null to always check if the root is null or not.

The following mistakes will not affect your code execution or results.
Your solution will execute correctly but not efficiently.

Check if Children are null
--------------------------
One of the common mistakes is checking explicitly if the children are 
null or not when it is not needed in most cases.

An important decision in the implementation of any recursive function
on trees is when to check for an empty subtree.
Function ``preorder`` first checks to see if the value for
``rt`` is ``null``.
If not, it will recursively call itself on the left and right children
of ``rt``.
In other words, the previously shown ``preorder`` function makes no attempt to avoid calling
itself on an empty child.

Some programmers use an alternate design in which the left and
right pointers of the current node are checked so that the recursive
call is made only on non-empty children.
Such a design typically looks as follows

.. codeinclude:: Binary/Preorder
   :tag: preorder2

At first it might appear that ``preorder2`` is more efficient
than ``preorder``, because it makes only half as many recursive
calls (since it won't try to call on a null pointer).
On the other hand, ``preorder2`` must access the left and right
child pointers twice as often.
The net result is that there is no performance improvement.

In reality, the design of ``preorder2`` is inferior to
that of ``preorder`` for two reasons.
First, while it is not apparent in this simple example,
for more complex traversals it can become awkward to place the check
for the ``null`` pointer in the calling code.
Even here we had to write two tests for ``null``,
rather than the one needed by ``preorder``.
The key point is that it is much easier to write a recursive function
on a tree when we only think about the needs of the current node.
Whenever we can, we want to let the children take care of themselves.
In this case, we care that the current node is not null, and we care
about how to invoke the recursion on the children, but we do **not**
want to care about how or when that is done.

Looking at the children to see if they are null means that we are
worrying too much about something that can be dealt with just as well
by the children.
The second concern with ``preorder2`` is that it
tends to be error prone.
While ``preorder2`` insures that no recursive
calls will be made on empty subtrees, it will fail if the initial call
passes in a ``null`` pointer.
This would occur if the original tree is empty.
To avoid the bug, either ``preorder2`` needs
an additional test for a ``null`` pointer at the beginning
(making the subsequent tests on the children redundant after all
because they will just repeat the test),
or the caller of ``preorder2`` has a hidden obligation to
pass in a non-empty tree, which is unreliable design.
The net result is that many programmers forget to test for the
possibility that the empty tree is being traversed.
By using the first design, which explicitly supports processing of
empty subtrees, the problem is avoided.


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

Access Children Values
----------------------

Another common mistake is accessing the children values while not needed. Again, don't explicitly access
the children values if it is not needed. Your solution may execute correctly but not efficiently.
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
