.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Sally Hamouda and Cliff Shaffer
   :satisfies: information flow in a binary tree
   :topic: Advanced Recursion


Binary Tree Information Flow
=============================

Handling information flow in a recursive function can be a challenge.
In any given function, we might need to be concerned with either or
both of
(1) passing in the correct information needed by the function to do
its work,
or (2) returning information to the recursive function's caller.
There is also the issue that, when recursively processing a tree, we
might not need to visit all nodes of the tree.
We can categorize the types of information and control flow in a
binary tree into the following categories:

 #. Local
 #. Collect-and-return
 #. Guided
 
Some problems might include features from multiple categories.

Here are a few simple examples and exrecises on each category.

Local
-----
Local traversal invloves going to each node in the tree to do some
operation.
Such functions, need no information flow between the binary tree
nodes.
An example would be incrementing the value for all nodes in a binary
tree by one.
The following exercise lets you practice local information flow.

.. avembed:: Exercises/RecurTutor2/BinaryTreeLocalSumm.html ka


Collect-and-return
------------------

Collect-and-return requires that we communicate information back up
the tree to the caller.
Simple examples are to sum the values of all the nodes, or count the
nodes of a tree.

.. topic:: Example

   We wish to count the number of nodes in a binary tree.
   The key insight is that the total count for any (non-empty) subtree is
   one for the root plus the counts for the left and right subtrees.
   Where do left and right subtree counts come from?
   Calls to function ``count`` on the subtrees will compute this for
   us.
   Thus, we can implement ``count`` as follows.

   .. codeinclude:: Binary/Traverse
      :tag: count

.. topic:: Example

	A more difficult example is illustrated by the following problem.
	Given an arbitrary binary tree we wish to determine if,
	for every node :math:`A`, are all nodes in :math:`A`'s left
	subtree less than the value of :math:`A`, and are all nodes in
	:math:`A`'s right subtree greater than the value of :math:`A`?
	(This happens to be the definition for a binary search tree.)
	Unfortunately, to make this decision we need to know some context
	that is not available just by looking at the node's parent or
	children.
	
	.. _BSTCheckFig:
	
	.. odsafig:: Images/BSTCheckFig.png
	   :width: 100
	   :align: center
	   :capalign: justify
	   :figwidth: 90%
	   :alt: Binary tree checking
	
	   To be a binary search tree, the left child of the node with value
	   40 must have a value between 20 and 40.
	
	As shown by Figure :num:`Figure #BSTCheckFig`,
	it is not enough to verify that :math:`A`'s left child has a value
	less than that of :math:`A`, and that :math:`A`'s right child
	has a greater value.
	Nor is it enough to verify that :math:`A` has a value consistent
	with that of its parent.
	In fact, we need to know information about what range of values is
	legal for a given node.
	That information might come from any of the node's ancestors.
	Thus, relevant range information must be passed down the tree.
	We can implement this function as follows.
	
	.. codeinclude:: Binary/checkBST
	   :tag: checkBST
	

Practice the collect and retun information flow through the following programming exercises
 
.. avembed:: Exercises/RecurTutor2/BinaryTreeClctNrtrnSumm.html ka
   

The guided information flow does not require visiting every node. In the next lesson, we will see more
examples and exercises on this type of information flow.
