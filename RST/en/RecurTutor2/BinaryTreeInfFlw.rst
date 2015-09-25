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

Here are a few simple examples and exercises.

Local
-----
Local traversal involves going to each node in the tree to do some
operation.
Such functions, need no information flow between the binary tree
nodes.
An example would be incrementing the value for all nodes in a binary
tree by one, which you should have done in the previous module.

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

Practice the collect and retun information flow through the following
programming exercises.
 
.. avembed:: Exercises/RecurTutor2/BTreturnPROGSumm.html ka
   
Guided traversal does not require visiting every node.
Later on, we will see examples and exercises for this type of
information flow.
