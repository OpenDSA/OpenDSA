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
 
.. avembed:: Exercises/RecurTutor2/BinaryTreeLDSumm.html ka

.. avembed:: Exercises/RecurTutor2/BinaryTreeValSumm.html ka

.. avembed:: Exercises/RecurTutor2/BinaryTreeSumSumm.html ka


   
.. Todo::
   Given a binary tree, print out all of its root-to-leaf paths. Note that, "path so far" needs to be communicated between the recursive calls.
   
   The code::
 
	public void printPaths() {
	int[] path = new int[1000];
	printPaths(root, path, 0);
	}
	/**
	Recursive printPaths helper -- given a node, and an array containing
	the path from the root node up to but not including this node,
	prints out all the root-leaf paths.
	*/
	private void printPaths(Node node, int[] path, int pathLen) {
	if (node==null) return;
	// append this node to the path array
	path[pathLen] = node.data;
	pathLen++;
	// it's a leaf, so print the path that led to here
	if (node.left==null && node.right==null) {
	printArray(path, pathLen);
	}
	else {
	// otherwise try both subtrees
	printPaths(node.left, path, pathLen);
	printPaths(node.right, path, pathLen);
	}
	}
	/**
	Utility that prints ints from an array on one line.
	*/
	private void printArray(int[] ints, int len) {
	int i;
	for (i=0; i<len; i++) {
	System.out.print(ints[i] + " ");
	}
	System.out.println();
	}




.. Todo::
   CountTrees
   Suppose you are building an N node binary search tree with the values 1..N. How many structurally different
   binary search trees are there that store those values? Write a recursive function that, given the number of distinct
   values, computes the number of structurally unique binary search trees that store those values. For example 
   countTrees(4) should return 14, since there are 14 structurally unique binary search trees that store 1, 2, 3, and 4. The
   base case is easy, and the recursion is short but dense. Your code should not construct any actual trees; it's just a
   counting problem.

   The code::

	public static int countTrees(int numKeys) {
	if (numKeys <=1) {
	return(1);
	}
	else {
	// there will be one value at the root, with whatever remains
	// on the left and right each forming their own subtrees.
	// Iterate through all the values that could be the root...
	int sum = 0;
	int left, right, root;
	for (root=1; root<=numKeys; root++) {
	left = countTrees(root-1);
	right = countTrees(numKeys - root);
	// number of possible trees with this root == left*right
	sum += left*right;
	}
	return(sum);
	}
	}
	  

Local
-----
Local traversal invloves going to each node in the tree and do some operation. In this type, there is no information flow is going between the binary tree nodes. For example, incrementing all the node values by one. 

Practice the local information flow through the following programming exercises

.. avembed:: Exercises/RecurTutor2/BinaryTreeIncSumm.html ka

.. Todo::
   Duplicate
   For each node in a binary search tree, create a new duplicate node, and insert the duplicate as the left child of the
   original node. The resulting tree should still be a binary search tree. This can be accomplished without changing the root node pointer.

   The code::

     private void doubleTree(Node node) {
	Node oldLeft;
	if (node == null) return;
	// do the subtrees
	doubleTree(node.left);
	doubleTree(node.right);
	// duplicate this node to its left
	oldLeft = node.left;
	node.left = new Node(node.data);
	node.left.left = oldLeft;
	}  


.. Todo::
   Mirror
   Change a tree so that the roles of the left and right pointers are swapped at every node.
   The solution is short, but very recursive. As it happens, this can be accomplished without changing the root node
   pointer, so the return-the-new-root construct is not necessary. Alternately, if you do not want to change the tree
   nodes, you may construct and return a new mirror tree based on the original tree.
   
    The code::
    
       private void mirror(Node node) {
	if (node != null) {
	// do the sub-trees
	mirror(node.left);
	mirror(node.right);
	// swap the left/right pointers
	Node temp = node.left;
	node.left = node.right;
	node.right = temp;
	}
	}
	

Guided
------
Guided traversal problems does not involve visiting all the nodes. So the information flow is only between some nodes of the binary tree and not all the nodes are invloved. For example, finding wether a certain value found in a binary tree or not. Most of the problems that requires information flow on binary search  trees are considered to be guided.

Practice the guided information flow through the following programming exercises.

.. Todo:: 
   Minimum Value
   Given a non-empty binary search tree (an ordered binary tree), return the minimum data value found in that tree.
   Note that it is not necessary to search the entire tree. 

   The code::

	private int maxDepth(Node node) {
	if (node==null) {
	return(0);
	}
	else {
	int lDepth = maxDepth(node.left);
	int rDepth = maxDepth(node.right);
	// use the larger + 1
	return(Math.max(lDepth, rDepth) + 1);
	}
	}

.. Todo:: 
   Min Value
    Returns the min value in a non-empty binary search tree.

    The code::

	private int minValue(Node node) {
	Node current = node;
	while (current.left != null) {
	current = current.left;
	}
	return(current.data);
	}





This type of problems involves information flow between more than one tree. In that type of information flow, you need more than one tree to exchange information among each others.

.. Todo::
   Swape Trees Values
   Given two binary trees, swap the values of their nodes.
   


.. Todo::
   SameTree
   Given two binary trees, return true if they are structurally identical -- they are made of nodes with the same values
   arranged in the same way.
   
   The code::

     boolean sameTree(Node a, Node b) {
	// 1. both empty -> true
	if (a==null && b==null) return(true);
	// 2. both non-empty -> compare them
	else if (a!=null && b!=null) {
	return(
	a.data == b.data &&
	sameTree(a.left, b.left) &&
	sameTree(a.right, b.right)
	);
	}
	 // 3. one empty, one not -> false
	else return(false);
	}


