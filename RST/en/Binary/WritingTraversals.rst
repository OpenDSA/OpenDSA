.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Sally Hamouda
   :satisfies: common mistakes in recursive binary tree traversal
   :topic: Common Mistakes in Recursive Binary Trees Traversal

.. odsalink:: AV/Binary/WriteTrav.css

Implementing Tree Traversals
============================

Writing a Recursive Method to Traverse a Binary Tree
----------------------------------------------------

When writing a recursive method to solve a problem that requires
traversing a binary tree, we want to make sure that we are visiting
the required nodes (no more and no less).

Recall that for any recursive function you should learn two skills:

 #. Formulate the base case and its action.
 #. Formulate the recursive case and its action.


Formulate the base case and its action
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In binary trees, in many binary tree types the base case is to check if we have an empty tree.
One of the common mistakes some people do is considering that the base case
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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Always remember that you should not worry about the recursion details.
Admit that it will do it correctly. So, when your recursive case action
is to  visit recursively the right and left children this means that every node will do that.
You don't need to worry about making sure that every node will do it.

Some problems requires that you traverse the whole tree, in those
problems you must make sure that your function is working for the left and right sides of the tree.
Some other problems requires only traversing the left or the right side
of the tree. You have to make sure that you visit exactly the nodes that are needed by the problem.

An issue to consider when designing a traversal is how to
define the visitor function that is to be executed on every node.
One approach is simply to write a new version of the traversal for
each such visitor function as needed.
The disadvantage to this is that whatever function does the traversal
must have access to the ``BinNode`` class.
It is probably better design to permit only the tree class to have
access to the ``BinNode`` class.

Another approach is for the tree class to supply a generic traversal
function that takes the visitor as a function parameter.
This is known as the
:term:`visitor design pattern`.
A major constraint on this approach is that the
:term:`signature` for all visitor functions, that is,
their return type and parameters, must be fixed in advance.
Thus, the designer of the generic traversal function must be able to
adequately judge what parameters and return type will likely be needed
by potential visitor functions.


Common Mistakes in Recursive Binary Tree Traversals
---------------------------------------------------

When writing a recursive function to solve a problem that requires
traversing a binary tree,
we want to make sure that we are visiting the required nodes (no more
and no less).
Here are a number of mistakes to avoid.

 #. Forgetting to check if the root is null.
 #. Checking if one or both children are null. You SHOULD NOT do that. When you do the recursive call and pass the root.left()
    or the root.right() as the parameter, the recursive function will call itself and treating
    the passed child as the new root. So, you don't need to explicitly check if the children are null.
 #. Accessing the children values. You SHOULD NOT do that. The same as the previous point. The child passed to the recursive call
    is treated as the new root. So, you don't need to explicitly access the children values. Just
    make sure you do that for the root.
 #. If it is required from you to write a function that returns a value (e.g. the number of nodes in a binary tree),
    you have to make sure that the function actually "returns". One of the common mistakes is just
    writing the recursive call without writing the word "return" before it.


Forgetting to check if the root is null
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

One of the most common mistakes when writing a program that traverses
a binary tree is forgetting to check if the root is null or not.
In this case, your code will not execute correctly because you are missing
a crucial check. So, make sure if the tree will allow the root to be null to always check if the root is null or not.

The following mistakes will not affect your code execution or results.
Your solution will execute correctly but not efficiently.

Checking if Children are null
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
   checks on the left and the right child of each visited node
	    
   .. codeinclude:: Binary/RecExCode
      :tag: IneffCnt


   So, don't explicitly check if the children are null or not. Your solution may execute   correctly but not efficiently. Remember that the root's left or right children is treated as the new root when passed to the recursive call so you don't need to do that redundant check.
  
   The efficient solution should be:

   .. codeinclude:: Binary/RecExCode
      :tag: EffCnt

Accessing Child Values Unnecessarily
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Another common mistake is accessing the children values while not needed. Again, don't explicitly access the children values if it is not needed. Your solution may execute correctly but not efficiently. Remember that the root's left or right children is treated as the new root when passed to the recursive call so you don't need to do that redundant check.

.. topic:: Example

   If the problem is incrementing each node in a binary tree
   by a certain given value.
	
   The following solution is correct but inefficient as it does redundant
   manipulation to left and the right children of each visited node
  
   .. codeinclude:: Binary/RecExCode
      :tag: IneffbtInc
		
	
   The efficient solution should not explicitly set the children values that way.
   It should just pass the root's left and right to the recursive call and then the
   recursive function will do the rest. As an exercise for you, think about how to rewrite 
   this code efficiently.

  
In rare problems, you may need to explicitly check if the children are null or access
the children values. For example, check if a children in a tree satisfies the sum property.
This property says that for each node sum of its left and
right children should be equal to node value.    In this specific problem you will need to
explicitly check on the children if the children are null or not and check on their values.

.. inlineav:: BinaryTreeMistakesCON ss
   :output: show


Learning those skills requires some practice to make sure that you are
not only getting the correct answer but also doing the solution
efficiently without falling into the common mistakes.

.. showhidecontent:: RecurTreePROG

   Here are practice coding exercises.

   .. avembed:: Exercises/RecurTutor2/BinaryTreeLocalSumm.html ka

   .. avembed:: Exercises/RecurTutor2/BinaryTreeCntValSumm.html ka

.. odsascript:: AV/Binary/BinaryTreeMistakesCON.js

