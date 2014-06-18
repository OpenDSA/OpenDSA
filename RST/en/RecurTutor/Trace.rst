.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Sally Hamouda
   :prerequisites:
   :topic: Recursion

.. odsalink:: AV/RecurTutor/recursiontracecon1.css
.. odsalink:: AV/RecurTutor/recursiontracecon2.css
.. odsalink:: AV/RecurTutor/recursiontracecon3.css
.. odsalink:: AV/RecurTutor/recursiontracecon4.css
.. odsalink:: AV/RecurTutor/recursiontracecon5.css
.. odsalink:: AV/RecurTutor/recursiontracecon6.css

How to trace a recursive code?
==============================
Tracing recursive functions is a great way to learn how it behave. After you
become comfortable with tracing, you rarely need to trace again. You begin to
trust that recursion will work.
When tracing most recursive functions, there is winding and unwinding part.
The "winding" part occurs as the recursion heads to the base case. The "un-
winding" part occurs when the recursion returns back to the original call. Most
people forget there is the "unwinding" phase. The winding and unwinding is
not really special to recursion. It occurs with any function.

.. inlineav:: RecursionTraceCON2 ss
   :output: show 

Next we will show a tracing example for a simple sum function:

.. inlineav:: RecursionTraceCON4 ss
   :output: show

Next we will show a tracing example of a factorial function:

.. inlineav:: RecursionTraceCON1 ss
   :output: show 

As you trace the code, you should observe several things:

.. inlineav:: RecursionTraceCON3 ss
   :output: show 

Starting at the base case, you have a value that is then used to solve the call
from the function that called the base case, which is used to solve the call that
called the call that called the base case, and so forth. Basically, the solution is
being built up, until finally, you reach the original call, and the final solution is
arrived at, having been built up from the base case.

Whenever the return statement of the recursive call has no more work to do
AFTER the recursive call, the function is said to be tail-recursive.


Next Example will model the domino effect recursively:

.. inlineav:: RecursionTraceCON5 ss
   :output: show 

After modeling the domino effect recursively, the two steps
in the previous visualization becomes a template solution for general linear
recursive questions. If we think of tipping over each
domino as performing a further step of computation toward
the final solution, then this template is capable of solving
all linear recursive problems. The rules of thumb toward a
linear recursive solution can now be summarized as follows:

1. Since the first domino has to be tipped over manually,
the solution for base case is computed non-recursively.

2. For any other domino, before a domino is tipped over
all of its preceded dominos have to be tipped over and
then the current domino will be tipped over
subsequently. So the solution for a recursive case is
computed recursively by solving its next smaller case
first followed by some subsequent computation.


Next visualization will show how we can use the previously illustrated Domino effect solving technique to print positive integers from 1 to N recursively. 

.. inlineav:: RecursionTraceCON6 ss
   :output: show 


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



 
.. odsascript:: AV/RecurTutor/recursiontracecon1.js
.. odsascript:: AV/RecurTutor/recursiontracecon2.js
.. odsascript:: AV/RecurTutor/recursiontracecon3.js
.. odsascript:: AV/RecurTutor/recursiontracecon4.js
.. odsascript:: AV/RecurTutor/recursiontracecon5.js
.. odsascript:: AV/RecurTutor/recursiontracecon6.js
