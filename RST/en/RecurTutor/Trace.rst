.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Sally Hamouda
   :prerequisites:
   :topic: Recursion

.. odsalink:: AV/RecurTutor/recursionIntroCON.css


How to trace a recursive code?
==============================
Tracing recursive functions is a great way to learn how it behave. After you
become comfortable with tracing, you rarely need to trace again. You begin to
“trust” that recursion will work.
When tracing most recursive functions, there is winding and unwinding part.
The “”winding” part occurs as the recursion heads to the base case. The “un-
winding” part occurs when the recursion returns back to the original call. Most
people forget there is the “unwinding” phase. The winding and unwinding is
not really special to recursion. It occurs with any function.

.. TODO::
   :type: Visualization
   
   Suppose function a() has a call to function b(), and function b() has a call to function c(), and function c() has a call to function d(). Once function
   d() is done, what happens next? It goes back to c(), then to b(), and finally back to a(). So you can think of going from a() to d() as the ”winding” of the recursion,
   and returning back to a() as the unwinding. The same thing happens with recursive functions, which goes to show you that recursive functions aren’t any more special than   
   normal functions. If function f() makes a recursive call to function f(), which makes a call to function f(), which makes a call to function f() (which is the base
   case), then it will eventually go back to f(), then f(), and finally back to the original f(). That may be harder to follow, but it’s really the same principle.



.. TODO::
   :type: Visualization
    
    Let’s consider an easy recursive call. We want to sum the elements of an array. This is the code::
 
	    int sum( int arr[], int n )
	    {
	     if ( n == 0 )
	
	      return 0;
	
	    else
	
	    {
	
	     int smallResult = sum( arr, n - 1 ); // A
	
	     return smallResult + arr[ n - 1 ];
	
	    }
	   }

  Assume the array contains: 2, 4, 6 , and that the call to the sum is: sum(arr, 3 ) which will sum the first three elements of the array. The initial call to sum fills in the 
  block. Since arr is an array and arrays are really pointers, there’s a pointer to the ”global” array. The arrow in the diagram represents a pointer to the array at the top. n, 
  however, is a value parameter, so a copy of n resides in the box. The letter ”A” lies under the recursive call, and also appears in the code above. The reason for labelling 
  recursive calls is to make it easier to know where to go back to once the recursive call is done. In this case, there’s only one recursive call, so it’s easy to find. However, 
  some recursive functions have two calls, so labelling makes it easier to follow. As the initial call to sum is made, the base case is not true (i.e., n is not
  0), so you go into the ”else” and make a recursive call to sum, this time passing a value of 2 (which is n - 1, where n is 3 at the time of the call. This produces a diagram 
  that looks like: The top sum makes a call to sum, passing in the same arr pointer (it is a copy of the pointer, but the copy points to the same array). Notice that n has a 
  value of 2.

.. inlineav:: RecursionIntroCON1 ss
   :output: show 

.. inlineav:: RecursionIntroCON2 ss
   :output: show 

.. inlineav:: RecursionIntroCON3 ss
   :output: show 

As you trace the code, you should observe several things:
1. The tracing eventually gets down to the base case. Beginners often think
that the base case only occurs when the initial call is at the base case. Not true!. All calls eventually reach the base case and if there is more than
one base case, it reaches one of the base cases. Thus, the value returned
by the base case is important.

2. It’s helpful to label recursive calls. You do this to keep track of what’s go-
ing on. Recall that a recursive call, like any other function call, eventually
returns back to the point of being called. However, since you’re calling
the same function, it’s easy to make mistakes when tracing the code.

3. Recursion involves a “winding” phase where the calls are progressively
getting closer to the base case, and you are getting to smaller and smaller
problems, and an “unwinding” phase, when you begin to return back to
the original call. It’s usually in the ”unwinding” phase where the solution
is generated.
Starting at the base case, you have a value that is then used to solve the call
from the function that called the base case, which is used to solve the call that
called the call that called the base case, and so forth. Basically, the solution is
being built up, until finally, you reach the original call, and the final solution is
arrived at, having been built up from the base case.
Whenever the return statement of the recursive call has no more work to do
AFTER the recursive call, the function is said to be tail-recursive.
The function has to be written a little differently if you use reference param-
eters, because reference parameters only accept lvalues (i.e., variables or array
elements) as arguments. So, you’d have to rewrite sum as:


 void sum( int arr[], int n, int & result )
    {
     if ( n == 0 ) // base case 1
     ; // nothing to do, result has answer
    else
    {
     result += arr[ n - 1 ];
     return sum( arr, n - 1, result );
    }
   }

Notice that the return type is now void, and that you must compute the
result before passing it to sum, since the third argument of sum needs to be an
lvalue (so while result is an lvalue, result + arr[ n - 1 ] is not. That’s an rvalue,
and you can’t pass rvalues to reference parameters.

.. TODO::
   :type: Visualization

    The Domino Effect Visualization 1
    
    Print positive integers from 1 to N recursively. To apply this problem solving technique, it is assumed that there is a sequence of   
    integers, from 1 to N, hidden behind the dominos, and the only way to see the integer behind a domino is tipping its front domino over.
       
      
    .. _domino1:

	.. odsafig:: Images/printoneton.png
	   :width: 300
	   :align: center
	   :capalign: justify
	   :figwidth: 50%
	   :alt: Print One to N recursively using the idea of the Domino Effect
	   
	   Print One to N recursively using the idea of the Domino Effect
	   
	
.. TODO::
   :type: Visualization
   
    The Domino Effect Visualization 2   

    Count the number of digits within an integer n recursively, where n greater than 0. To apply the same technique, 
    it is assumed that the digits within the integer, from most significant to lest significant, are hidden behind the dominos. 
    In this tryout, the dominos are tipped over from right to left, 
    so that tipping over dominos can be imagined as counting digits from the least significant to the most significant. 


    .. _domino2:

	.. odsafig:: Images/numofdig.png
	   :width: 300
	   :align: center
	   :capalign: justify
	   :figwidth: 50%
	   :alt: Counting the number of digits in an integer recursively using  the idea of the Domino Effect.
	   
	   Counting the number of digits in an integer recursively using  the idea of the Domino Effect.
	   

.. TODO::
   :type: Visualization

    Towers of Hanoi Visualizations
   
    In those problems variations there are n black disks B1, B2 . . . Bn and n white disks W1, W2 . . .Wn. The black disk Bk and the white disk Wk each has diameter k for k = 1, 
    2 . . . n. There are three poles A, B and C. The following conditions must be satisfied. (a) Only one disk at a time can be moved from one pole to another pole. (b) Only the 
    top disk of a pole can be removed and a disk can be placed only at the top of a pole. (c) A disk can only have a smaller disk or an equal size disk of any color above it 
    anywhere in a pole. A stack of disks from top to bottom is written as a string of disks from left to right. For example the string W1W2 . . . Wn denotes the stack of n 
    white  disks and the string W1B1W2B2 . . . WnBn denotes the stack of n pairs of black and white disks where the white disk is on top of the black disk in each pair. The   
    function m moves single disk. The function call m(D, X, Y) means moving disk D from pole X to pole Y. Each problem is defined by specifying the initial and the final 
    configurations of black and white disks in poles A, B, and C. The problem is to transform the initial configuration into the final configuration. The already existing 
    problems can be grouped into four categories:  (a) Moving a tower of b/w pairs problem. (b) Splitting a tower of b/w pairs into towers of b/w disks. (c) Merging towers of b/
    w disks into a tower of b/w pairs. (d) Moving towers of b/w disks.

.. TODO::
   :type: Visualization
   
    Chinese Ring Visualization

    This puzzle is unfortunately very difficult to visualize with only a verbal description, but its features that lead to a recursive solution can be defined
    (Figure 8 in the latex fiel) . It consists of a long, narrow, horizontal loop of wire which passes through the centers of several small rings . A string is tied to the top 
    of each ring ; the string passes through the ring to its left and through the long loop, and is anchored to a fixed base . The leftmost end of the long loop is also 
    anchored. The problem is to  remove the rings from the loop. The loop cannot simply be withdrawn, since all the strings pass through it. Some experimentation leads to the 
    discovery of the following principle (assume that the rings are numbered 1 to n from right to left): Ring 1 may be removed at any time by sliding it to the right end of the 
    loop, and then  dropping it and the string through the loop . Ring k may be removed if and only if ring k-1 is still on the loop and rings 1 to k-2 are all off the loop.
    One other observation is important for this problem . The problem of putting rings back on the loop can be solved by using the algorithm forremoving rings in reverse . 
    like the Towers of Hanoi problem, not every move is a direct step toward a solution . Some rings will be taken off and put back on several times before the final solution is 
    reached. Recursion is applicable to this problem because : (a) Removing rings 1 . .n can be accomplished by first getting ring n off the loop, and then removing rings 1 to 
    n-1 ; getting ring n off can be accomplished by first removing rings 1 to n-2, the n taking off ring n, and then replacing rings 1 to n-2 
    (b) Removing rings 1 to 2 can be accomplished directly, first taking off ring 2 and then ring 1.
    (c) Removing ring 1 can be accomplished directly.

    .. _chiness:

	.. odsafig:: Images/chinessring.png
	   :width: 300
	   :align: center
	   :capalign: justify
	   :figwidth: 50%
	   :alt: Chinese Rings Puzzle
   
	   Chinese Rings Puzzle
	   
.. TODO::
   :type: Visualization
   
    Flood Fill visualization 
   
    The flood fill algorithm is used to identify all of the elements in a two dimensional array that are connected to a specific element. One graphical application is the flood 
    fill or “paint bucket tool that is commonly available in image editing software. This tool changes the color of a connected region in the image to a new color without       
    impacting other unconnected pixels of that color. It is normally used by clicking on a single pixel in the image. Then the color of that pixel is identified, and all 
    connected pixels of the same color are replaced with the new color. Flood fill demonstrates that a recursive method may require data beyond what is provided by
    the parameters specified for the method. In this specific case, one would expect to perform a flood fill by invoking a method that takes three parameters: the x and y    
    coordinates where the fill will begin, and the new color that should be used. However, these values are not sufficient to implement a recursive solution successfully because 
    the recursive function needs to know what color is being replaced in order to detect the boundary for the region that is being filled.

.. TODO::
   :type: Visualization
    
    Finding a path through a maze
    
    Finding a path through a maze is a component of some computer games. It clearly demonstrates the utility of recursion. We will use a two dimensional array representation for 
    the maze. Within this array, each element can initially contain one of four possible values: A barrier, an open space, the start of the maze and the exit from the maze. As   
    the solution progresses, blocks can take on additional values indicating that a space is part of the path from the starting location to the location that is currently being
    explored, or that a space has been visited previously and should not be considered again. By traversing the two dimensional array, one can easily draw an overhead view of 
    maze by drawing squares of different colors to represent each of the possible values of a block.

.. TODO::
   :type: Visualization
   
    Possible ideas
   
    Binary tree traversals
   
    Binary search in an array
   
    Binary search tree algorithms
   
    Height-balanced binary search tree algorithms for insertion and deletion
   
    Merge-sort sorting algorithm


 
.. odsascript:: AV/RecurTutor/RecursionIntroCON.js
