.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :satisfies: information flow in a binary tree
   :topic: Information Flow in a Binary


Binary Tree Information Flow
=============================

Handling information flow between parts of a program can
be a significant design challenge, especially when dealing with
recursive functions such as tree traversals.

In general, we can run into trouble either with passing in the correct
information needed by the function to do its work,
or with returning information to the recursive function's caller.
We will see many examples throughout the book that illustrate methods
for passing information in and out of recursive functions as they
traverse a tree structure.


We can categorize the type of information flow in  a binary tree into the following categories:

 #. Collect-and-return
 #. Local
 #. Guided
 

Some problems might include features from multiple types of those categories.

Here are a few simple examples and exrecises on each category.

Collect-and-return
------------------

Collect-and-return requires that we communicate information back up the tree to the end user. For example, sum the values of all the nodes, or count the nodes of a tree.

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


Practice the collect and retun information flow through the following programming exercises
 
.. avembed:: Exercises/RecurTutor2/BinaryTreeClctNrtrnSumm.html ka
   
	  
Local
-----
Local traversal invloves going to each node in the tree and do some operation. 
In this type, there is no information flow is going between the binary tree nodes. 
For example, incrementing all the node values in a binary tree by one. 

Practice the local information flow through the following programming exercises

.. avembed:: Exercises/RecurTutor2/BinaryTreeLocalSumm.html ka

The guided information flow does not require visiting every node. In the next lesson, we will see more
examples and exercises on this type of information flow.
