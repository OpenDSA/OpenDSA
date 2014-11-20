.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Sally Hamouda
   :prerequisites:
   :topic: Binary Tree Programming Exercises


Binary Tree Programming Exercises
=================================

Inorder to understand more how to apply recursion on binary trees, you should practice different types of problems.

.. .. avembed:: Exercises/RecurTutor2/btCntPROG.html ka

Local Traversal
----------------

The first type of problems is local traversal problems. In this type of problems, you go to each node and do some operation.

.. avembed:: Exercises/RecurTutor2/btIncPROG.html ka

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
	

Guided Traversal
----------------

.. avembed:: Exercises/RecurTutor2/btCheckValPROG.html ka

The second type is guided traversal problems. In this type of problems, not all the nodes are vsisited.

.. Todo:: 
   Max Value
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




Simple collect-and-return traversal
-----------------------------------

The third type is Simple collect-and-return traversal problems. This type of problems are such as sum the values of all the nodes, or count the nodes.

.. avembed:: Exercises/RecurTutor2/btLeafPROG.html ka
 
.. avembed:: Exercises/RecurTutor2/btDepthPROG.html ka
 
.. avembed:: Exercises/RecurTutor2/btSumAllPROG.html ka

.. Todo::
   We'll define a "root-to-leaf path" to be a sequence of nodes in a tree starting with the root node and proceeding
   downward to a leaf (a node with no children). We'll say that an empty tree contains no root-to-leaf paths.     
   Given a binary tree and a sum, return true if the tree has a root-to-leaf path such that adding up all the values
   along the path equals the given sum. Return false if no such path can be found. 

   The code::

      boolean hasPathSum(Node node, int sum) {
	// return true if we run out of tree and sum==0
	if (node == null){
	 return(sum == 0);
	}
	else {
	// otherwise check both subtrees
	int subSum = sum - node.data;
	return(hasPathSum(node.left, subSum) || hasPathSum(node.right, subSum));
	}
	} 
	    
    
    
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

.. avembed:: Exercises/RecurTutor2/btCheckValPROG.html ka

.. avembed:: Exercises/RecurTutor2/btCntValPROG.html ka

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
	  

Multiple trees traversal
------------------------

The fourth type is multiple trees traversal poblems. This type of problems involves more than one tree.

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



