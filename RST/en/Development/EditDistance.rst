.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Erich Brungraber
   :requires: Knapsack
   :topic: Algorithms

Edit Distance
=============

Edit Distance
-------------

:term:`Edit Distance` is an algorithm for computing the minimum number
of changes from one string to another.  The two non-interesting cases
are: if both strings are of length zero (or identical), then zero
operations are needed; and if one string is of zero length, then the
number of operations needed is the length of the non-zero length
string.

Following the dynamic programming approach, the first step is solve
the problem recursively.  Like most recursive solutions, this
algorithm is easy to follow.  First, some symbols and their defintions
to make the description easier to understand.

+--------------+------------------------------------------+
|  Symbol      | Definition                               |
+==============+==========================================+
|S             |is the starting string                    |
+--------------+------------------------------------------+
|T             |is the ending string                      |
+--------------+------------------------------------------+
|m             |the length of the starting string         |
+--------------+------------------------------------------+
|n             |the length of the ending string           |
+--------------+------------------------------------------+
|S\(i\)        |is the character in S at the ith position |
+--------------+------------------------------------------+
|T\(j\)        |is the character in T at the jth position |
+--------------+------------------------------------------+
|ED\(S,T,i,j\) |i:[1..m], j:[1..n], the minimum number of |
|              |changes when comparing S\(i\) with T\(j\) |
+--------------+------------------------------------------+

The recursive algorithm is as follows:

1.  Base case check.  The base case for this algorithm is simply when you run out of characters to compare in either *S* or *T*.  If you run out of characters for both, the number that is returned will be zero.  However if you run out of characters of one but not the other, the value returned is the remaining number of characters in the non-zero length string.
2.  Check to see if *S\(i\) == T\(j\)*.  
	a. 1\)	If they match, recurse to *ED\(S,T,i-1,j-1\)*.  Since they match, nothing needs to be done at this position, so no operation count is added to this value.  
	b. 2\)	If they don't match, three recursive calls are necessary.  In order:

		- A\) Substitution: recurse to *ED\(S,T,i-1,j-1\)* and add one\*.
		- B\) Insertion: 	recurse to *ED\(S,T,i,j-1\)* and add one\*.
		- C\) Deletion:  	recurse to *ED\(S,T,i-1,j\)* and add one\*.
		- D\) Choose which operation to take.  Since Edit Distance is a minimum-returning function, simply find the operation that yields the minimum number of changes (operation counts).  If there is a tie, follow the order of precedence established by the ordering of recursive calls:  Substition, Insertion, Deletion.

\* Since each of these recursive calls refer to a specific operation, the op count, or value returned by each recursive call is incremented by 1.

The initial function call appears as *ED\(S,T,m,n\)*.  Note that for the purposes of this algorithm, standard 0-base array enumeration isn't used; the strings start at character position **1**, not **0**.

Operation Description:

	Substitution
		The current character in the starting string becomes the current character in the ending string.  *S\(i\) = T\(j\)*

	Example:

	| Starting string: sit
	| Ending string: sat
	| For the second character comparison on both strings, the "i" becomes an "a", a substitution.

	Insertion
		The ending string is longer than the starting string, so the current character of the ending string is inserted at the current character of the starting string's position. *S.insert\(i,T\(j\)\)* 

	Example:

	| Starting string: red
	| Ending string: read
	| At the second to last character comparison for both strings, an "a" is inserted to make the strings match.

	Deletion
		The starting string is longer than the ending string, so the current character of the starting string is removed. *S.remove\(i\)*

	Example:

	| Starting string: 123456
	| Ending string: 13456
	| The second character of the starting string "2" needs to be deleted for the strings to match.

The following is the Edit Distance algorithm handled recursively in Java. ::

	int editDistance(String S, String T, int i, int j) 
	{	    
		//base cases
		if (i === 0)
			return j;
		if (j === 0)
			return i;
	
		//recursive call, start with match check
		if (S.charAt(i) == T.charAt(j))
			return editDistance(S, T, i-1, j-1);
	    	else 
		{	//no match, recurse three times
		
			int sub = editDistance(S, T, i-1, j-1) + 1;
			int ins = editDistance(S, T, i, j-1) + 1;
			int del = editDistance(S, T, i-1, j) + 1;
	
			return Math.min(Math.min(sub, ins), del);
	    	}
	}

This recursive algorithm handles Edit Distance, but as the string length increases, the call stack increases exponentially.  Why it increases exponentially is due to the fact that at any given character comparision, there might be as many as three recursive calls, so :math:`O(3^{max(m,n)})`.  The recursive call tree can be seen by the following animation.  

Note that for these animations, the starting string is *"cat"* and the ending string is *"kate"*.  The numbers in each node refer to the recursive function call parameters, in this case the character positions for comparison of the starting and ending strings, respectively.  For simplicity's sake, assume the starting and ending string are globally defined.

.. avembed:: AV/Development/editRCT.html ss

Obviously, to compare any sizeable strings together, a recursive solution is not optimal.  As was seen by the previous demonstrations of dynamic programming, a dynamic approach to this problem will make things run more efficiently \(i.e., in linear time\).

The following animation demonstrates, just as the previous demonstrations of N-Choose-K and 0/1 Knapsack, the process of plucking the recursive call tree to fill in the dynamic grid.

Note that due to the similarity in approach, the majority of the code that operates this next animation is of an abstracted form that actually runs the second animations of all three dynamic programming problem visualizations.  You've already seen this animation if you've viewed N-Choose-K and the 0/1 Knapsack problems, just with a different algorithm being visualized.  If you don't see the similarity, don't worry.  The point of these three algorithm demonstrations, N-Choose-K, 0/1 Knapsack, and Edit Distance, is to reveal the same abstracted approach to creating dynamic solutions for problems.  Since the second step is virtually identical for all three of these demonstrations, we've created one animation to handle them all.

.. avembed:: AV/Development/editPrune.html ss

As you can see, the efficiency of this dynamic approach is :math:`O(m*n)`, which is obviously better than the recursive's efficiency of :math:`O(3^{max(m,n)})`.  In fact, for this particular example, of the original 19 function calls, the dynamic approach eliminated 10 of those calls, a 52.6% saving on efficiency, and this was for a **small** example!

Once the grid is filled, the last part of the dynamic solution approach is to identify the optimal path to the solution.  The following animation does just that.  Pay attention to the transitional text, as it describes which operation is done at each comparison.  Understanding which positions of the next cells relates to which operation is key.  For simplicity's sake, top-left means substitution, left means insertion, and top means deletion.

Note that for this animation, there are no deletions.  If the starting string was of greater length than the ending string, then there would be no insertions, but one or more deletions.

.. avembed:: AV/Development/editOptimal.html ss

The following is the same Edit Distance algorithm as above, but implemented dynamically.  As you can see, memoization is used to provide the means for a look-up table, storing the repeated function calls.  The initial setup of the grid might be the hardest part to understand.  This code will generate a two-dimensional array of the same type as seen in previous animations' grids, sans the initial row and column used for displaying the strings to be compared. ::

	int editDistance(String start, String end)
	{
		int startMax = start.length;
		int endMax = end.length;
		int array[][] = new int[startMax + 1][endMax + 1] 

		//initialize all array values to zero
		for (int i = 0; i <= startMax; i++)
		{
			for (int j = 0; j <= endMax; j++)
			{
				array[i][j] = 0;
			}
		}

		//initialize the base cases
		for (int i = 1; i <= startMax; i++)
		{
			array[i][0] = i;
		}
		
		for (int j = 1; j <= endMax; j++)
		{
			array[0][j] = j;
		}
			
		//fill in the grid
		for (int i = 1; i <= startMax; i++)
		{	
			for(int j = 1; j <= endMax; j++)
			{
				//match check
				if (start.charAt(i-1) == end.charAt(j-1))
					array[i][j] = array[i-1][j-1];
				else 
				{
					int sub = array[i-1][j-1] + 1;
					int ins = array[i][j-1] + 1;
					int del = array[i-1][j] + 1;
		
					array[i][j] = Math.min(Math.min(sub, ins), del);
				}
			}
		}
		    
	    	return array[startMax][endMax];
	}

One major difference between the recursive Edit Distance and this
particular dynamic Edit Distance is the minimum filling of the grid.
As was seen above in the second animation, not every cell received a
value.  These missing values were entirely unnecessary for determining
the actual Edit Distance between the two strings, and were therefore
bypassed.  This dynamic implementation, as was seen by the third
animation, will actually fill in every cell with its appropriate
value.  Perhaps you can think of a way to only fill in the necessary
cells using the dynamic method.


Exercise 1
----------

Now that you've seen the algorithms in action, you should hopefully
understand where the grid gets its values.  More than this, you should
understand how the algorithm chooses which operation to do next.  For
the following quiz, the key to completing it is understanding
ultimately which operation will be done at any point.  For any given
cell, identify which operation will yield the lowest total operation
count.

.. avembed:: Exercises/Development/edit-KA1.html ka


Exercise 2
----------

On this next quiz, identify the correct value that would go in the
highlighted cell.

.. avembed:: Exercises/Development/edit-KA2.html ka
