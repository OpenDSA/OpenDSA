.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Sally Hamouda
   :prerequisites:
   :topic: Recursion Chapter Skeleton

.. odsalink:: AV/RecurTutor/recursionIntroCON.css


Recursion Chapter Skeleton
==========================

Introduction
------------

Recursion makes it possible to solve complex problems using programs that are surprisingly concise, easily understood and algorithmically efficient. Recursion is the process of solving a large problem by reducing it to one or more sub-problems which are: Identical in structure to the original problem and somewhat simpler to solve.

Once that original subdivision has been made, the same decompositional technique is used to divide each of these problems into new ones which are even less complex. Eventually, the sub-problems become so simple that they can be then solved without further subdivision, and the complete solution is obtained by reassembling the solved components.

An algorithm is recursive if it calls itself to do part of its work. For this approach to be successful, the  call to "itself" must be on a smaller problem than the one originally attempted. In general, a recursive algorithm must have two parts: the base case, which handles a simple input that can be solved without resorting to a recursive call, and the recursive part which contains one or more recursive calls to the algorithm where the parameters are in some sense "closer" to the base case than those of the original call.

Imagine that someone in a movie theater asks you what row you're sitting in. You don't want to count, so you ask the person in front of you what row they are sitting in, knowing that you will respond one greater than their answer. The person in front will ask the person in front of them. This will keep happening until word reaches the front row and it is easy to respond: "I'm in row 1!" From there, the correct message (incremented by one each row) will eventually make it's way back to the person who asked.

To use recursion effectively, it is necessary to train yourself to stop analyzing the recursive process beyond the recursive call. The sub-problems will take care of themselves. You just worry about the base cases and how to recombine the sub-problems. Those who are unfamiliar with recursion might find it hard to accept that it is used primarily as a tool for simplifying the design and description of algorithms. A recursive algorithm usually does not yield the most efficient computer program for solving the problem because recursion involves function calls, which are typically more expensive than other alternatives such as a while loop. However, the recursive approach usually provides an algorithm that is reasonably efficient. If necessary, the clear, recursive solution can later be modified to yield a faster implementation.

Let's think about recursion in a different way. Think about recursion as if you have a big task and you will do a small part of it then delegate it to another one to help you on doing this task. An example similar to the movie theater example  mentioned earlier is, suppose that you have the task of multiplying two numbers x and y. You would like to delegate this task to some friend. You will ask the friend to multiply x-1 and y. When your friend send you back the result, you will only add y to that result. Your friend will do exactly the same with another friend who will do exactly the same with a third one and so on. x will be decremented till eventually it will reach to one at the last friend. The last friend will send back the result of multiplying a one and y. The last friend will be returning back the result to the previous friend. This friend will add x to the result. This process will continue all the way back till the result of x-1 multiplied by y is back to you. You will simply add y to the result and you will be done with your task. Next visualization shows that delegation process:


.. inlineav:: RecursionIntroCON1 ss
   :output: show  


.. inlineav:: RecursionIntroCON2 ss
   :output: show  


In order to understand recursion, you need to understand and practice how to write and read a recursive function.

How to write a recursive function?
----------------------------------

As we have mentioned before, solving a "big" problem recursively means to solve one or more smaller versions of the problem, and using those solutions of the smaller problems to solve the "big" problem. 

In particular, solving problems recursively typically means that there are smaller versions of the problem solved in similar ways. For example, consider the problem of summing values of an array. What's the difference between summing an array of 100 elements versus summing an array of 50 elements?

You use the same technique, but in one case you sum up to 100 elements, and in the other case, you sum up to the first 50 elements. And, even more importantly, you can use the solution to the smaller problem to help you solve the larger problem.

To understand recursion, you must understand that the basic unit of recursion is the function call. In fact, if you avoid using loops and use only recursion, you will find that your function code will generally be much shorter. 

The following visualization shows the basic four steps you need to write any recursive function:

.. inlineav:: RecursionIntroCON3 ss
   :output: show  


The simplest version of a recursive function is an if-else statement where the \lq\lq if" part is the base case, and the "else" part is the recursive case. There are several mistakes people make with a base case. The first one is picking too large a base case. Second, not realizing there may be more than one base case. Finally, thinking that the base case only gets called when the input size is the smallest. In fact, the recursion ALWAYS makes it to some base case. Thus, the base case is where the recursion eventually stops. Don't think of it as merely called when the input is, say, 0. It gets called for all cases (eventually).
In the recursive case, there is a recursive call. Most recursive functions do something after the call. After all, you often need the solution of the \lq\lq smaller" recursive call to create the solution for the "big" problem.

However, on occasion, you may need to do some work prior to the recursive function call (e.g., calculating or printing something).

The following visualization shows three different versions of the Sum recursive function and the differences between them:

.. inlineav:: RecursionIntroCON4 ss
   :output: show  

You will never understand recursion well without doing a lot of practice on it. Here are set of practice exercises on recursion, try to practice them all to master recursion.

Practice Exercises
-------------------
.. TODO::
   :type: Programming Exercise

   Given the following recursive function write down the missing base
   case such that this function finds the largest number in the array
   named numbers::

      int largest(int[] numbers, int index) {
        // <<Missing base case>> {
          return numbers[index];
        }
        else if(numbers[index] > numbers[index+1]) {
          numbers[index+1] = numbers[index];
        }
        return largest(numbers,index+1);
      } 

   The answer::

      if(index==numbers.length-1)

.. TODO::
   :type: Programming Exercise
   
   Given the following recursive function, write down the missing
   action that should be done at the base case so that this function
   prints the values in an array named list. The values must appear
   one per line in order of increasing subscript.::
    
      void print(String[] list, int index) { 
        if (index < list.length) 
          //<<Missing Code>>
        print(list, index+1);
      }

   The answer::

      System.out.println(list[index]);


.. TODO::
   :type: Programming Exercise

   Given the following recursive function write down the missing base
   case condition and recursive call such that this function computes
   logb n::
 
      int log(int b, int n )
      {
        // <<Missing base case condition>>
          return 0;
        else
          return //<<Missing a Recursive call>>
     }

   The answer::

      if (b < n)
       (1 + log(b, n / b));



.. TODO::
   :type: Programming Exercise

   Given the following recursive function write down the missing
   recursive call such that this function prints all positive odd
   numbers less than or equal to i::

     public static void printOddRecursive(int i) {
       if (i > 0) {
         if (i % 2 == 1) { 
           System.out.println(i);
         }
         //<<Missing a Recursive call>>
       }
     }
 
 
   The answer::

     printOddRecursive(i - 1);


.. TODO::
   :type: Programming Exercise
  
    Given the following recursive function write down the missing base case condition and the action that should be done at the base case such that this function multiply two  
    numbers x and y. (Assume both values given are positive.)::

     int mult(int x, int y) {

     //<<Missing base case condition>>

     //<<Missing base case action>>

     else

     return mult(x-1, y) + y;
     }

    The answer::

     if ( x == 1 )
    
      return y;
      

.. TODO::
   :type: Programming Exercise
 
   Given the following recursive write down the missing recursive call such that this function computes the value of y to the x power::

    public int power(int x, int y) {

    if ( x == 1 )

    return y;

    else

     return //<<Missing a Recursive call>>
    }

   The answer::
      
    power(x-1, y) * y

 
.. TODO::
   :type: Programming Exercise

   Given the following recursive function write down the missing recursive call such that this function given 2 numbers, will find the sum of all the integers between them.   
   Example: given 1 and 4, the method should add 1+2+3+4 = 10::

 
	   int Sum(int a, int b)
	  {
	   if (a == b)
	
	    return a;
	
	  else
	
	    return //<<Missing a Recursive call>>
	
	  }
	
   The answer::

     Sum(a,b-1) + b;


.. TODO::
   :type: Programming Exercise
   
   Given the following recursive function write down the missing recursive call such that this function computes the factorial of n. (Assume n is always positive. factorial of 
   n= n* n-1 * n-2*...1)::

	  int fact(int n)
	  {
	
	   int result;
	
	   if(n==1)
	
	   return 1;
	
	  return //<<Missing a Recursive call>>
	
	 }
	
	The answer::
	  fact(n-1) * n;
	
.. TODO::
   :type: Programming Exercise

   Given the following recursive function write down the missing base case condition and the action that should be done at the base case this function computes the greatest   
   common divisor of x and y::
	
	   int GCD(int x, int y)
	   {
	
	    //<<Missing base case condition>>
	
	    //<<Missing base case action>>
	    else
	   {
	     return GCD (y, x % y);
	   }
	  }
	
	The answer::
	   if ((x % y) == 0)
	   {
	    return y;
	   }
	   
	
.. TODO::
   :type: Programming Exercise
 
   Given the following mystery function write down the missing recursive call such that this function returns a value of 15 when mystery(5) is called::
	
	  int mystery(int k) { 
	 
	  if (k <= 0) {
	
	   return 0;
	  }
	
	  else {
	
	   return //<<Missing a Recursive call>>
	
	   }
	
	  }
	
   The answer::
	
	  k + mystery(k - 1)


.. TODO::
   :type: Programming Exercise
 
   Given the following recursive function write down the missing recursive call such that this function counts the number of digits in an integer::
   
	   int GetDigits(int number, int digits)
	   {
	
	   if (number == 0)
	
	    return digits;
	  
	   return //<<Missing a Recursive call>>
	   }

   The answer::
  
     GetDigits(number/ 10, ++digits);


.. TODO::
   :type: Programming Exercise 
   
   Given the following recursive function write down the missing recursive call such that this function counts the number of As in a given string::
	   
	   public static int countChr(String str ) {
	
	   if (str.length() == 0) {
	 
	   return 0;
	  }
	  
	   int count = 0;
	 
	   if (str.substring(0, 1).equals("A")) {
	 
	    count = 1;
	   }
	 
	   return count + //<<Missing a Recursive call>>
	
	  }
	
	The answer::
	   countChr(str.substring(1)); 


In the previous examples and exercises, all the recursive functions has only
one base case and one recursive case. A more general structure for recursion
can have more than one base case and recursive case. The following Figure/Visualization shows how a general structure recursive function look like:

.. TODO::
   :type: Figure/Visualization::

    if ( base case 1 )
      // return some simple expression
    else if ( base case 2 )
      // return some simple expression
    else if ( base case 3 )
      // return some simple expression
    else if ( recursive case 1 )
    {
     // some work before 
     // recursive call 
     // some work after 
      }
    else if ( recursive case 2 )
      {
      // some work before 
      // recursive call 
      // some work after 
      }
    else // recursive case 3
      {
      // some work before 
      // recursive call 
      // some work after 
      }

You need to practice harder recursive functions in order to gain more experience on recursion.

Harder Practice Exercises
--------------------------
.. TODO::
   :type: Programming Exercise
   
   Given the following recursive function write down the missing recursive call such that this function takes a non-negative integer in return for the sum of its digits. For  
   example, sumOfDigits(1234) returns 1+2+3+4 =10::
	   
	   int sumOfDigits(int number)
	   {  
	    if(number/10 == 0)
	  
	   return number; 
	   
	   return //<<Missing a Recursive call>>
	   }
	 
   The answer::
	   
	    number%10 + sumOfDigits(number/10);


.. TODO::
   :type: Programming Exercise
   
   The following exercise involves two recursive calls:

   Given the following recursive function write down the missing recursive calls such that this function computes the Fibonacci of a given number::
	   
	   long Fibonacci(int n)
	   {
	  
	   if (n > 2)
	  
	    return //<<Missing a Recursive call>>
	 
	   else
	 
	   return 1;
	   
	  } 
	
	   
   The answer::
	  
	     Fibonacci(n-1) + Fibonacci(n-2);
	

.. TODO::
   :type: Programming Exercise
   
	The following exercise involves two base cases:
	   
	Given the following recursive function write down the conditions such that this function determines if an integer N is prime or not::
	   
	   public static boolean Prime(int X,int Y)
	
	   {
	
	    //<<Missing base case condition 1>>
	 
	    return true;
	
	   else
	
	   //<<Missing base case condition 2>>
	
	   return false;
	
	   else
	
	    return Prime(X,Y-1);
	
	  }
	
	 
	The answer::
	
	  if ( Y == 1)
	
	  if ( X%Y == 0)


.. TODO::
   :type: Programming Exercise
   
	   Given the following recursive function write down the missing code at the else such that this function prints the binary equivalent of an int N. Example: the binary   
	   equivalent of 13 may be found by repeatedly dividing 13 by 2. If there is a remainder a 1 gets printed otherwise a zero gets printed.So, 13 in base 2 is 1101::
	
		  void decibinary ( int num)
		  {
		
		   if ( num < 2)
		
		    System.out.print(num);
		
		   else
		
		   {
		    //<<Missing a Recursive call>>
		
		   //<<Missing a command>>
		
		   }
		
		  }
		
	   The answer::
	      decibinary(num/2);
	
	      System.out.print(num%2);
	

.. TODO::
   :type: Programming Exercise

	   Given the following recursive function write down the missing recursive
	   call such that this function determines the minimum element in an array
	   of integers::
	  
		   int recursiveMin(int numbers[] , int startIndex)
		  {
		   
		  if(startIndex+1 == numbers.length)
		  
		   return numbers[startIndex];
		  
		  else
		
		   return Math.min(numbers[startIndex], //<<Missing a Recursive call>>);
		  
		  }
	  
	   The answer::
	     recursiveMin(numbers , startIndex+1)

.. TODO::
   :type: Programming Exercise
   
   Given the following recursive function write down the missing two conditions such that this function ,given two Strings, returns true if the two strings have the same      
   sequence of characters but in the opposite order (ignoring white space and capitalization), and returns false otherwise:: 
  
	   boolean isReverse(String s1, String s2) {
	   
	   if //<<Missing condition 1>>
	   
	     return true;
	  
	   else if //<<Missing condition 2>>
	   
	   return false;
	  
	   else
	  {
	   String s1first = s1.substring(0, 1);
	
	   String s2last = s2.substring(s2.length() - 1);
	
	   return s1first.equalsIgnoreCase(s2last) && isReverse(s1.substring(1), s2.substring(0, s2.length()-1));
	
	   }
	 }

   The answer::
	
	  (s1.length() == 0 && s2.length() == 0)
	
	  (s1.length() == 0 || s2.length() == 0)


Classic recursion involves thinking ”backwards”. Instead of building a solution from nothing, you pretend you are at the solution, and want to take a
step back and ask how to solve the problem if you were a step back. Here’s an analogy. You are planning a trip from point A to point B. One way to start is
to begin at point A and move forward to B. Most people like that solution and find it easier to think that way.
However, another approach is to be at B and step back one step towards A (let’s call this point, C), and assume that you can reach C, and figure out how
to B once you reach C. For example, you might be travelling from Atlanta to Boston. You think ”if I were at New York, how would I make it to Boston” and then worry about how to solve the problem of getting from Atlanta to New York. If you learn to think ”backwards” or more accurately, learn to figure out what the correct “smaller” version of the problem is, you’re well on your way to figuring out recursion. 


Writing Practice Exercises
---------------------------

The following exercises will ask you to write a whole recursive function:

.. TODO::
   :type: Programming Exercise

    
    You are given a stack, given the following recursive function signature, write down the recursive function reverse it without using any other data
    structures(or without extra memory). You cannot use any memory at all. All what you have to do is use recursion only to attain this. You don’t 
    need to implement a function to push, pop or check if the stack is empty or not::
  
	   void stackReversal(Stack<Integer> s)
	   {
	
	   }

    The answer::

	    void stackReversal(Stack<Integer> s)
	    {
	  
	    if(s.size() == 0) 
	  
	    return;
	 
	    int n = getLast(s);
	   
	    stackReversal(s);
	   
	    s.push(n);
	   }


.. TODO::
   :type: Programming Exercise
   
	Pascal’s triangle is a useful recursive definition that tells us the coefficients in the expansion of the polynomial (x + a)n . Each element in the triangle has a coordinate, given by the row it is on and its position in the row (which you could call a column). Every number in Pascals triangle is
	defined as the sum of the item above it and the item above it and to the left (its position in the row, minus one). If there is a position that does not have an entry, we treat it as if we had a 0 there. The figure belowshows the few rows of this triangle:
	
	.. _PascalsTriangle:

	.. odsafig:: Images/PaulHartalPascalTriangle.jpg
	   :width: 300
	   :align: center
	   :capalign: justify
	   :figwidth: 50%
	   :alt: Pascal’s triangle
	   
	   Pascal’s triangle
	
	 Given the following recursive function signature, write down the recursive function which takes a row and a column and finds the value at that position in the triangle::
		int pascal(int row, int column)
		
		{
		 
		}
	
	The answer::
	
		int pascal(int row, int column)
		
		{
		
		if(row<0 and column <0)
		
		return 0;
		
		else if (row==0 and column== 0 )
		
		
		
		return 1;
		
		else
		
		return pascal(row-1, column) + pascal(row-1, column-1);
		
		}

.. TODO::
   :type: Programming Exercise	
	
	Spherical objects, such as cannonballs, can be stacked to form a pyramid with one cannonball at the top, sitting on top of a square composed of	four cannonballs, sitting on top of a square composed of nine cannonballs,
	and so forth. 
	
	.. _CannonBalls:

	.. odsafig:: Images/cannonballs.png
	   :width: 300
	   :align: center
	   :capalign: justify
	   :figwidth: 50%
	   :alt: Cannonballs Pyramid
	   
	   Cannonballs Pyramid

    Given the following recursive function signature, write the function code such that it takes as its argument the height of a pyramid	of cannonballs and returns the number of cannonballs it contains based::
	on the height of the stack::
	
		int Cannonball(int height)
		
		{
		
		}
	
	The answer::
	
		int Cannonball(int height)
		
		{
		
		if (height == 0)
		
		{
		
		return 0;
		
		}
		
		else
		
		{
		
		return (height * height + Cannonball(height - 1));
		
		}
		
		}

.. TODO::
   :type: Programming Exercise	
	
	We want to count the number of pins in a pyramid of bowling pins, knowing that: The first row has one pin, the second row has 2 pins, the third	row has 3 pins and so on. Given the following recursive function that
	misses a recursive call. Given the following recursive function signature, write the function code such that this function calculates the total number	of pins in the triangle::
	
		int CountPins(int row)
		
		{
		
		}
		
	The answer::
	
		int CountPins(int row)
		
		{
		
		if (row == 1)
		
		return 1;
		
		else
		
		return (CountPins(row-1)+row);
		
		}

.. TODO::
   :type: Programming Exercise	

	Given the following recursive function signature, write the function code such that this function takes a string and returns true if it is read the
	same forwards or back-wards (palindrome)::
	
		static boolean CheckPalindrome(String s, int leftSide, int rightSide)
		
		{
		
		}
		
	The answer::
	
		static boolean CheckPalindrome(String s, int leftSide, int rightSide)
		
		{
		
		if (rightSide <= leftSide)
		
		
		return true;
		
		else if (s.charAt(leftSide) != s.charAt(rightSide))
		
		return false;
		
		else
		
		return CheckPalindrome(s,leftSide+1,rightSide-1);
		
		}

.. TODO::
   :type: Programming Exercise	
	
	Given the following recursive function signature, write the function code such that this function returns the given string in a reverse order::
	
		string ReverseStringRecursive (string str)
		
		{
		
		}
	
	The answer::
	
		string ReverseStringRecursive (string str)
		
		{
		
		if (str.length() == 0)
		
		{
		
		return "";
		
		}
		
		return ReverseStringRecursive(str.substr(1)) + str[0];
		
		}
	
.. TODO::
   :type: Programming Exercise	
	
	Given the following recursive function signature, write the function code such that this function prints out all permutations of a given string::
	
		void recPermute(String soFar, String remaining) {
		
		}
	
	The answer::
	
		void recPermute(String soFar, String remaining) {
		
		if (remaining.length() == 0)
		
		System.out.println(soFar);
		
		else
		
		{
		
		for (int i=0; i< remaining.length(); i++) {
		
		String nextSoFar = soFar + remaining[i];
		
		String nextRemaining = remaining.substring(0,i) +
		
		remaining.substring(i+1);
		
		recPermute(nextSoFar, nextRemaining);
		
		}
		
		}
		
		}


.. TODO::
   :type: Programming Exercise	

	Given the following recursive function signature, write the function code such that this function print all subsets of a given string::
	
		void recSubsets(String soFar, String remaining) {
		
		}
	
	The answer::
	
		void recSubsets(String soFar, String remaining) {
		
		if (remaining.length()==0)
		
		System.out.println(soFar);
		
		else {
		
		recSubsets(soFar+remaining[0], remaining.substring(1);
		
		recSubsets(soFar, remaining.substring(1);
		
		
		}
		
		}


.. TODO::
   :type: Programming Exercise	
	
	Given the following recursive function signature, write the function code such that this function modifies an array 
	of Strings to remove duplicates. For example, if the list has the values {”recursion”, ”recursion”, ”is”,”is”, ”cool”, ”cool”} 
	before the method is called, it should have the values {”recursion”, ”is”, ”cool”}. 
	You may not create any new arrays::
	
		public static void removeDuplicates(ArrayList<String> list, int counter)
		{
		
		
		}
	
	The answer::
	
		public static void removeDuplicates(ArrayList<String> list, int counter)
		{
		
		if(counter < list.size()){
		
		if(list.contains(list.get(counter))){
		
		if(list.lastIndexOf(list.get(counter))!=counter)
		
		{
		
		list.remove(list.lastIndexOf(list.get(counter)));
		
		counter--;
		
		}
		
		}
		
		removeDuplicates(list, ++counter);
		
		}
		
		}

.. TODO::
   :type: Programming Exercise
	
	Given the following recursive function signature, write the function code such that this function takes a string from which all characters except the
	bracketing operators have been removed. The method should return true	if the bracketing operators in str are balanced, which means that they are
	correctly nested and aligned. If the string is not balanced, the method	returns false::
	
	
		public static boolean isBalanced(final String str1, finalLinkedList<Character> openedBrackets, 
		                                 final Map<Character,	Character> closeToOpen) 
		
		{
		
		}
		
	The answer::
	
		public static boolean isBalanced(final String str1, final
		
		LinkedList<Character> openedBrackets, final Map<Character,
		
		Character> closeToOpen) {
		
		if ((str1 == null) || str1.isEmpty()) {
		
		return openedBrackets.isEmpty();
		
		} else if (closeToOpen.containsValue(str1.charAt(0))) {
		
		openedBrackets.add(str1.charAt(0));
		
		return isBalanced(str1.substring(1), openedBrackets,
		
		closeToOpen);
		
		} else if (closeToOpen.containsKey(str1.charAt(0))) {
		
		if (openedBrackets.getLast() ==
		
		closeToOpen.get(str1.charAt(0))) {
		
		openedBrackets.removeLast();
		
		return isBalanced(str1.substring(1), openedBrackets,
		
		closeToOpen);
		
		} else {
		
		return false;
		
		}
		
		} 
		else {
		
		return isBalanced(str1.substring(1), openedBrackets,
		
		closeToOpen);
		
		}
		
		}

.. TODO::
   :type: Programming Exercise	
	
	Given the following recursive function signature, write the function code such that this function ,given an integer n, prints the squares of the integers
	from 1 to n, separated by commas. It should print the squares of the odd integers in descending order first and then following with the squares of
	the even integers in ascending order. It does not print a newline character::
	
	
		void calculateSquare(int n)
		
		{
		
		}
	
	The answer::
	
		void calculateSquare(int n)
		
		{
		
		int t=n;
		
		if(n<=0)
		
		return;
		
		if(n%2==1)
		
		{
		
		System.out.println(n*n);
		
		calculateSquare(--n);
		
		}
		
		else
		
		{
		
		calculateSquare(--n);
		
		System.out.println(t*t);
		}
		
		
		}


.. TODO::
   :type: Programming Exercise	
   
	Given the following recursive function signature, write the function code such that takes two positive integers X and Y as its input where X<Y,	and outputs the minimal number of invocations of the operations +1 and
	∗2 that are required to obtain Y from X.	
	For Example: If the inputs 10 17, the output will be 7 (due to 7 invocations of +1). For the input 10 21, the output will be 2 (due to ∗2 and then +1)::
	
		int minOps (int x, int y)
		
		{
		
		}
		
	The answer::
	
		int minOps (int x, int y)
		
		{
		
		if (2*x > y)
		
		return y-x;
		
		else if (y%2 == 1)
		
		return (minOps (x, y-1) + 1);
		
		
		else
		
		return (minOps (x, y/2) + 1);
		
		}
		
	
.. TODO::
   :type: Programming Exercise	
	
	Given the following recursive function signature, write the function code such that this function takes a set of integers and a target number, your
	goal is to find whether a subset of those numbers that sums to the target number. 
	For example, given the set 3,7,1,8,-3 and the target sum 4, the subset 3,1 sums to 4. On the other hand, if the target is 2 then the result
	is false. It is only required to return true or false::
	
		bool isSubsetSum(int set[], int n, int sum)
		
		{
		
		}
		
	The answer::
	
		bool isSubsetSum(int set[], int n, int sum)
		
		{
		
		if (sum == 0)
		
		return true;
		
		if (n == 0 && sum != 0)
		
			
		return false;
		
		if (set[n-1] > sum)
		
		return isSubsetSum(set, n-1, sum);
		
		return isSubsetSum(set, n-1, sum)|| isSubsetSum(set, n-1,
		
		sum-set[n-1]);
		
		}
	
	
.. TODO::
   :type: Programming Exercise	

	Given the following recursive function signature, write the function code	such that this function counts the number of different ways to reach a
	basketball score.	Example: For the input 3, the output will be 4, since there are 4 different	ways to accumulate 3: 1+1+1, 1+2, 2+1, 3::
	
		int noOfPath (int n)
		
		{
		
		}
	
	The answer::
	
		int noOfPath (int n)
		
		{
		
		if (n==1)
		
		return 1;
		
		if (n==2)
		
		
		return 2;
		
		if (n==3)
		
		return 4;
		
		return noOfPath(n-1) + noOfPath(n-2) + noOfPath(n-3);
		
		}
		
	
.. TODO::
   :type: Programming Exercise	
	
	Given the following recursive function signature, write the function code such that this function takes a positive numStairs and returns the number
	of different ways to climb a staircase of that height taking strides of one or two stairs at a time::
	
		int count_stair_ways (int n)
		
		{
		
		}
		
	The answer::
	
		int count_stair_ways (int n)
		
		{
		
		if (n==0)
		
		return 1;
		
		if (n<0)
		
		return 0;
		
		else
		
		
		return count_stair_ways(n-1) + count_stair_ways (n-2);
		
		}
	
.. TODO::
   :type: Programming Exercise	
	
	Given the following recursive function signature, write the function code such that this function sorts an array of integers named array, with sub-scripts from 0 to n-1, using a selection sort. Remember that the basic idea
	behind such a sort is to repeatedly select an item from the unsorted array 	and place it in its correct final position in the array::
		
		void selectionSort(int[] array, int startIndex)
		
		{
		
		}
		
	
	The answer::
	
		void selectionSort(int[] array, int startIndex)
		
		{
		
		if ( startIndex >= array.length - 1 )
		
		return;
		
		int minIndex = startIndex;
		
		for ( int index = startIndex + 1; index < array.length; index++)
		
		{
		
		if (array[index] < array[minIndex] )
		
		minIndex = index;
		
		}
		
		int temp = array[startIndex];
		
		array[startIndex] = array[minIndex];
		
		array[minIndex] = temp;
		
		
		selectionSort(array, startIndex + 1);
		
		}
		
	
.. TODO::
   :type: Programming Exercise	
	
	Old merchants measured many commodities using weights and a two-pan balancea practice that continues in many parts of the world today. 
	If you are using a limited set of weights, however, you can only measure certain quantities accurately. 
	For example, suppose that you have only	two weights: a 1-ounce weight and a 3-ounce weight. With these you can	easily measure out 4 ounces. 
	You can also measure out 2 ounces by shifting the 1-ounce weight to the other side. determines whether it is possible to measure out the desired target 
	amount with a given set of weights. The	available weights are stored in a vector Weight. 
	Each weight in the vector can be either: Put on the opposite side of the balance from the sample, 
	put on the same side of the balance as the sample, or Left off the balance	entirely.
	For example, suppose that you have only two weights: a 1-ounce weight	and a 3-ounce weight. With these you can easily measure out 4 ounces.
	It is somewhat more interesting to discover that you can also measure out  2 ounces by shifting the 1-ounce weight to the other side 2 ounces by shifting the 1-ounce weight to the other side.
	
	.. _Oldmerch1:

	.. odsafig:: Images/oldmerch1.jpg
	   :width: 300
	   :align: center
	   :capalign: justify
	   :figwidth: 50%
	   :alt: With a 1-ounce weight and a 3-ounce weight you can easily measure out 4 ounces
	   
	   With a 1-ounce weight and a 3-ounce weight you can easily measure out 4 ounces
	   
	.. _oldmerch2:

	.. odsafig:: Images/oldmerch2.jpg
	   :width: 300
	   :align: center
	   :capalign: justify
	   :figwidth: 50%
	   :alt: Measure out 2 ounces by shifting the 1-ounce weight to the other side	2 ounces by shifting the 1-ounce weight to the other side
	   
	   Measure out 2 ounces by shifting the 1-ounce weight to the other side 2 ounces by shifting the 1-ounce weight to the other side.
	
	Given the following recursive function signature, write the function code such that this function find out if a certain target weight can be measured or not::
		bool RecIsMeasurable(int target, Vector<int> & weights, int index)
		{
		
		
		}
		
	The answer::
	
		bool RecIsMeasurable(int target, Vector<int> & weights, int index)
		{
		
		
		if (target == 0)
		{
		
		return true;
		
		}
		
		if (index >= weights.size())
		
		{
		
		return false;
		
		}
		
		return RecIsMeasurable(target + weights[index], weights, index +1)	|| 
		RecIsMeasurable(target, weights, index + 1)	|| 
		RecIsMeasurable(target - weights[index], weights,index
		+ 1);
		
		}
	
.. TODO::
   :type: Programming Exercise	
	
	Given the following recursive function signature, write the function code such that
	this function counts the number of inversions in a list of numbers.
	
	Example: for the input list 2 9 1 8, the output will be 3 (due to the inversions 2>1, 9>1, and 9>8)::
	
	 public static int countInversions(int nums[]){
	
	 }

	The answer::
	
		public static int countInversions(int nums[])
		
		{
		
		int mid = nums.length/2, k;
		
		int countLeft, countRight, countMerge;
		
		
		if (nums.length <= 1)
	    return 0;
	    
		int left[] = new int[mid];
		
		int right[] = new int[nums.length - mid];
		
		for (k = 0; k < mid; k++)
		
		left[k] = nums[k];
		
		for (k = 0; k < nums.length - mid; k++)
		
		right[k] = nums[mid+k];
		
		countLeft = countInversions (left);
		
		countRight = countInversions (right);
		
		int result[] = new int[nums.length];
		
		countMerge = mergeAndCount (left, right, result);
		
		for (k = 0; k < nums.length; k++)
		
		nums[k] = result[k];
		
		return (countLeft + countRight + countMerge);
		
		}
		
		/* This procudure will merge two lists, and count the number of inversions 
		caused by the elements in the "right" list that are
		less than elements in the "left" list.
		*/
		
		public static int mergeAndCount (int left[], int right[], int result[])
		{
		
		int a = 0, b = 0, count = 0, i, k=0;
		
		while ( ( a < left.length) && (b < right.length) )
		{
		
		if ( left[a] <= right[b] )
		
		result [k] = left[a++];
		
		else
		
		/* You have found (a number of) inversions here. */
		
		
		{
		
		result [k] = right[b++];
		
		count += left.length - a;
		
		}
		
		k++;
		
		
		}
		
		if ( a == left.length )
		
		for ( i = b; i < right.length; i++)
		
		result [k++] = right[i];
		
		else
		
		for ( i = a; i < left.length; i++)
		
		result [k++] = left[i];
		
		return count;
		
		}
	
	
.. TODO::
   :type: Programming Exercise	
	
	On the standard Touch-Tone telephone dial, the digits are mapped onto the alphabet (minus the letters Q and Z. 
	In order to make their phone numbers more memorable, service providers like to find numbers that spell
	out some word (called a mnemonic) appropriate to their business that	makes that phone number easier to remember. For example, the phone
	number for a recorded time-of-day message in some localities is 637-8687 (NERVOUS).	
	
	PAD PBD PCD RAD RBD RCD SAD SBD SCD
	
	PAE PBE PCE RAE RBE RCE SAE SBE SCE
	
	PAF PBF PCF RAF RBF RCF SAF SBF SCF
	
	
	.. _phone:

	.. odsafig:: Images/phone.jpg
	   :width: 300
	   :align: center
	   :capalign: justify
	   :figwidth: 50%
	   :alt: Standard Touch-Tone telephone dial
	   
	   Standard Touch-Tone telephone dial
	
	Given the following recursive function signature, write the function code such that this function generate all possible letter 
	combinations that correspond to a given number, represented as a string of digits. For example,	if you call with 723 your program 
	should generate the following 27 possible letter combinations that correspond to that prefix::
	
		void RecursiveMnemonics(string prefix, string rest)
		
		{
		
		}
		
	The answer::
	
		void RecursiveMnemonics(string prefix, string rest)
		
		{
		
		if (rest.length() == 0)
		
		{
		
		System.out.println(prefix);
		
		}
		
		else
		
		{ // DigitaLetters is a function that returns a string consisting of the legal substitutions for a given digit character
		
		string options = DigitLetters(rest[0]);
		
		for (int i = 0; i < options.length(); i++)
		{
		
		RecursiveMnemonics(prefix + options[i], rest.substr(1));
		
		}
		
		}
		
		}
	


How to trace a recursive function?
----------------------------------

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

.. inlineav:: RecursionIntroCON5 ss
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


    
Tracing exercises
-----------------

.. TODO::
   :type: Programming Exercise

    Consider the following function::
    
		int mystery(int a, int b) {
		
		if (b==1)
		
		return a;
		
		else
		
		return a + mystery(a, b-1);
		
		}
		
	What is the return of calling mystery(2,1)?
	
	The answer:
	
	It is the value of a which is 2 because the limiting case will be the only
	
	executed code in that case.

	
.. TODO::
   :type: Programming Exercise	
	
	Consider the following code::
	
		public int result(int n)
		
		{
		
		if(n==1)
		
		return 2;
		
		else
		
		return 2 * result(n-1);
		
		}
	
	If n>0, how many times will result be called to evaluate result(n)( including the initial call)
	
	(a) 2
	
	(b) 2n
	
	(c) 2^n
	
	(d) n^2
	
	
.. TODO::
   :type: Programming Exercise
   
	Consider the following code::
	
		public void dosomething (int n) {
		
		if(n>0) {
		
		dosomething(n-1);
		
		System.out.print(n);
		
		}
		
		}
	
	What will be printed when “dosomething(5)”is called? (Either write a
	
	sequence of numbers, or write “infinite recursion”.)
	
	The answer:
	
	12345
	
.. TODO::
   :type: Programming Exercise	
	
	Consider the following code::
	
		public int mystery(int n, int a , int d)
		
		{
		
		if(n==1)
		
		return a;
		
		else
		
		retun d + mystery(n-1,a,d);
		
		}
	
	What value is returned by the call mystery(3,2,6)? (Either write a number, or write “infinite recursion”.)
	
	
	
.. TODO::
   :type: Programming Exercise	
	
	Consider the following code::
	
		public int f(int k , int n)
		
		{
		
		if(n==k)
		
		return k;
		
		else
		
		if(n > k)
		
		return f(k, n-k);
		
		else
		
		return f(k-n, n);
		
		}
	
	What value is returned by the call f(6,8)?(Either write a number, or write “infinite recursion”.)
	
.. TODO::
   :type: Programming Exercise	
	
	What does the following function do?::
	
		public int function(int [] x , int n)
		
		{ int t;
		
		if(n==1)
		
		return x[0];
		
		else
		
		{
		
		t= function(x, n-1);
		
		if(x[n-1] > t)
		
		return x[n-1];
		
		else
		
		return t;
		
		}
		
		}
	
	(a) It finds the largest value in x and leaves x unchanged.
	
	(b) It finds the smallest value in x and leaves x unchanged.
	
	(c) It sorts x in ascending order and returns the largest value in x.
	
	
	(d) It sorts x in descending order and returns the largest value in x.
	
	(e) It returns x[0] or x[n-1] whichever is larger.
	
.. TODO::
   :type: Programming Exercise	
	
	Consider the following function::
	
		int mystery(int a, int b) {
		
		if (b==1)
		
		return a;
		
		else
		
		return a + mystery(a, b-1);
		
		}
	
	What is the return of calling mystery(2,0)?
	
	The answer:
	
	Infinite recursion. Because the limiting case will never be executed in that case.
	
.. TODO::
   :type: Programming Exercise
   	
	Consider the following code::
	
		public int result(int n)
		
		{
		
		if(n==1)
		
		return 2;
		
		else
		
		return 2 * result(n-1);
		
		}
		
	What value does result(5) return? (Either write a number, or write “infinite recursion”.)


.. TODO::
   :type: Programming Exercise	
	
	Consider the following code::
	
		void function(String[] list, int index) {
		
		System.out.println(list[index]);
		
		if (index > 1)
		
		function(list, index-1);
		
		}
	
	What will be printed when “function([’a’,’b’,’c’,’d’], 4)”is called? (Either write a sequence of numbers, or write “infinite recursion”.)
	
	The answer:
	
	d
	
	c
	
	b
	
	a

.. TODO::
   :type: Programming Exercise
	
	Which describes what the print method below does?::
	
		public void print(String s)
		
		{
		
		if(s.length()>0)
		
		{
		
		printString(s.substring(1));
		
		System.out.print(s.substring(0,1));
		
		}
		
		}
	
	(a) It prints s.
	
	(b) It prints s in reverse order.
	
	(c) It prints only the first character of string s.
	
	(d) It prints only the first two characters of string s.
	
	(e) It prints only the last character of string s.

.. TODO::
   :type: Programming Exercise
	
	Consider the following code::
	
		public int exec(int n){
		
		if (n == 0)
		
		return 0;
		
		else
		
		return n + exec(n - 1);
		
		}
	
	What is the value that will be returned by the method call exec(5)? (Either write a number, or write “infinite recursion”.)
	
	The answer:
	
	15.
	
.. TODO::
   :type: Programming Exercise	
	
	Consider the following code::
	
		public void dosomething (int n) {
		
		if(n>0) {
		
		System.out.print(n);
		
		dosomething(n-1);
		
		
		}
		
		}
	
	What will be printed when when “dosomething(5)” is called? (Either write a sequence of numbers, or write “infinite recursion”.)
	
	The answer:
	
	54321


.. TODO::
   :type: Programming Exercise	
   
	A user enters several positive integers at the keyboard and terminates the
	
	list with a sentinel(-999). A writeEven function reads those integers and
	
	outputs the even integers only, in the reverse order that they are read.
	
	Thus if the user enters:
	
	3 5 14 6 8 -999
	
	The output of writeEven will be:
	
	8 6 14
	
	The code::
		public static void writeEven()
		
		{
		
		int num = IO.readInt();
		
		if (num!= -999)
		
		{
		
		// Missing code
		
		}
		
		}
		
		Which //Missingcode satisfies what writeEven does?
	
	I)
	
	if(num%2==0)
	
	System.out.print(num+"");
	
	writeEven();
	
	II)
	
	if(num%2==0)
	
	writeEven();
	
	System.out.print(num+"");
	
	III)
	
	writeEven();
	
	if(num%2==0)
	
	System.out.print(num+"");
	
	
	(a) I only
	
	(b) II only
	
	(c) III only
	
	(d) I and II only
	
	(e) I, II and III
	
.. TODO::
   :type: Programming Exercise	
   	
	Consider the following code::
	
		public static void testa(int n)
		
		{
		
		System.out.println(n + " ");
		
		if (n>0)
		
		testa(n-2);
		
		}
		
	What is printed by the call testa(4)?(Either write a sequence of numbers, or write “infinite recursion”.)
	
	
.. TODO::
   :type: Programming Exercise	
	
	Consider the following code::
	
		public static void testb(int n)
		
		{
		
		if (n>0)
		
		testb(n-2);
		
		System.out.println(n + " ");
		
		}
		
	What is printed by the call testb(4)?(Either write a sequence of numbers, or write “infinite recursion”.)


.. TODO::
   :type: Programming Exercise
   	
	Consider the following code fragment::
	
		public int func(int x, int y) {
		
		if (y == 1)
		
		return x;
		
		else
		 
		return x + func(x, y+1);
		
		}
	
	
	What is the value of func(2,3)?
	
	The answer:
	
	Infinite recursion. Because the limiting case will never be executed in that case as y is increasing in the recursive call so it will never reach to the
	
	value of 1.
	
	
.. TODO::
   :type: Programming Exercise		
	
	Given the following code::
	
		int mystery (int[] numbers, int index) {
		
		if(index==numbers.length-1) {
		
		
		return numbers[index];
		
		}
		
		else if(numbers[index] > numbers[index+1]) {
		
		numbers[index+1] = numbers[index];
		
		}
		
		return mystery(numbers,index+1);
		
		}
	
	If initially numbers= 5, 9 , 20 , 2, 3 ,12 and index=0 What will be the value returned by this mystery function and what will be the value of index at the time of the last return?
	
	The answer:
	
	20 and 5.
	
.. TODO::
   :type: Programming Exercise		
	
	Find the error(s) in the following recursive function, explain how to correct it (them). This function find the sum of the values from 0 to n::
	
		public int sum(int n)
		
		{
		
		if(n == 0)
		
		return 0;
		
		else
		
		return n+ sum(n);
		
		}
	
	The answer:
	
	The code will result in an infinite recursion, unless the initially passed value is 0. The recursive call should be n+ sum(n-1) instead of n+sum(n).

.. TODO::
   :type: Programming Exercise	
	
	Consider the following code::
	
		Public void stringRecur(String s)
		
		{
		
		if(s.length()<15)
		
		System.out.println(s);
		
		stringRecur(s + "*");
		
		}
		
	When will method stringRecur terminates without error?
	
	(a) Only when the length of the input string is less than 15
	
	(b) Only when the length of the input string is greater than or equal to
	
	(c) Only when an empty sting is input
	
	(d) For all string inputs
	
	(e) For no string inputs
	
.. TODO::
   :type: Programming Exercise		
	
	Consider the following code::
	
		Public void strRecr(String s)
		
		{
		
		if(s.length()<15)
		
		{
		
		System.out.println(s);
		
		strRecr(s + "*");
		
		}
		
		}
	
	When will method strRecr terminates without error?
	
	(a) Only when the length of the input string is less than 15
	
	
	(b) Only when the length of the input string is greater than or equal to
	
	(c) Only when an empty sting is input
	
	(d) For all string inputs
	
	(e) For no string inputs

.. TODO::
   :type: Programming Exercise	
	
	Consider the following code::
	
		public int foo(int x)
		
		{
		
		if(x==1 || x==3)
		
		return x;
		
		
		else
		
		return x * foo(x-1);
		
		}
	
	Assuming no possibility of integer overflow, what will be the value of z after execution of the following statement:
	
	int z = foo(foo(3)+foo(4));
	
	(a) (15!)/(2!)
	
	(b) 3!+4!
	
	
	(c) (7!)!
	
	(d) (3!+4!)!
	
	(e) 15
	
	
.. TODO::
   :type: Programming Exercise		
	
	Consider the following code::
	
		void superWriteVertical(int number)
		
		// Postcondition: The digits of the number have been written,
		
		// stacked vertically. If number is negative, then a negative
		
		// sign appears on top.
		
		{
		
		if (number < 0)
		
		{
		
		System.out.println("-");
		
		superWriteVertical(-number);
		
		}
		
		else if (number < 10)
		
		System.out.println(number);
		
		else
		
		{
		
		superWriteVertical(number / 10);
		
		System.out.println(number % 10);
		
		}
		
		}
	
	What values of number are directly handled by the stopping case?
	
	(a) number < 0
	
	(b) number < 10
	
	(c) number ≥ 0 and number < 10
	
	(d) number > 10
	
	
	
	
.. TODO::
   :type: Programming Exercise	
   	
	
	Consider the following code::
	
	
		void superWriteVertical(int number)
		
		// Postcondition: The digits of the number have been written,
		
		// stacked vertically. If number is negative, then a negative
		
		// sign appears on top.
		
		{
		
		if (number < 0)
		
		{
		
		System.out.println("-");
		
		superWriteVertical(-number);
		
		
		}
		
		else if (number < 10)
		
		System.out.println(number);
		
		else
		
		{
		
		superWriteVertical(number / 10);
		
		System.out.println(number % 10);
		
		}
		
		}
	
	Which call will result in the most recursive calls?
	
	(a) super_write_vertical(-1023);
	
	(b) super_write_vertical(0);
	
	(c) super_write_vertical(100);
	
	(d) super_write_vertical(1023);
	
	
.. TODO::
   :type: Programming Exercise
   		
	Consider the following code::
	
		void quiz(int i)
		
		{
		
		if (i > 1)
		
		{
		
		quiz(i / 2);
		
		quiz(i / 2);
		
		}
		
		System.out.print("*");
		
		}
	
	How many asterisks are printed by the method call quiz(5)?(Either write a number, or write “infinite recursion”.)
	
.. TODO::
   :type: Programming Exercise
   		
   
    Consider the following code::
	
		public static void mystery(int n) {
		
		if (n < 0)
		
		{
		
		System.out.print("-");
		
		mystery(-n);
		
		}
		
		else if (n < 10)
		
		{
		
		System.out.println(n);
		
		}
		
		else
		
		{
		
		int two = n % 100;
		
		System.out.print(two / 10);
		
		System.out.print(two % 10);
		
		mystery(n / 100);
		
		}
		
		}
	
	
	What will be the outputs printed when when mystery(7), mystery(825), mystery(38947), 
	mystery(612305) and mystery(-12345678) are called? (Either write a number, or write “infinite recursion”.)
	
	The answer:
	
	7, 258, 47893, 0523610, -785634120
	
	
.. TODO::
   :type: Programming Exercise		
	
	Consider the following code::
	
		public class Intformatter{
		
		//Write 3 digits adjacent to each other
		
		public static void writeThreeDigits(int n)
		
		{
		
		System.out.print(n/100);
		
		System.out.print((n/10)%10);
		
		System.out.print(n%10);
		
		}
		
	//Insert commas in n, every 3 digits starting at the right::
	
		public static void writeWithCommas(int n)
		
		{
		
		if(n<1000)
		
		System.out.print(n);
		
		else
		
		{
		
		writeThreeDigits(n%1000);
		
		System.out.print(",");
		
		writeWithCommas(n/1000);
		
		}
		
		}
		}
	
	The writeWithCommas function is supposed to print its nonnegative int argument with commas properly inserted(every three digits, starting at the right).
    For example, the integer 27048621 should be printed as 27,048,621.
	The problem is that writeWithCommas doesn’t always work as intended. Which of the following integer arguments will not be printed correctly:
	
	(a) 896
	
	(b) 251462251
	
	(c) 365051
	
	(d) 278278
	
	(e) 4
	
	
	
	
.. TODO::
   :type: Programming Exercise	
   
	
	Which of the following change in the previous question code of the given functions will cause function writeWithCommas to work properly:
	
	(a) Interchange the line:
	
	System.out.print(n/100);
	
	With the line:
	
	System.out.print(n%10);
	
	in the writeThreeDigits function.
	
	(b) Interchange the line:
	
	writeThreeDigits(n%1000);
	
	With the line:
	
	writeWithCommas(n/1000);
	
	in the writeWithCommas function.
	
	(c) Change the test in writeWithCommas function to
	
	if(n>1000)
	
	(d) Change the line:
	
	writeThreeDigits(n%1000);
	
	To the line:
	
	writeThreeDigits(n/1000);
	
	in the writeWithCommas function.
	
	(e) Change the recursive call:
	
	writeWithCommas(n/1000);
	
	To the line:
	
	writeWithCommas(n%1000);
	
	in the writeWithCommas function.


Summary Exercises
------------------
.. TODO::
   :type: Summary Exercise
	
	A properly written recursive function might have more than one recursive call.
	
	(a) True
	
	(b) False
	
	The answer:
	
	True
	
.. TODO::
   :type: Summary Exercise
	
	In a recursive function declaration, the maximum number of statements that may be recursive calls is
	
	(a) 1
	
	(b) 2
	
	(c) n (where n is the argument)
	
	(d) There is no fixed maximum
	
	The answer:
	
	There is no fixed maximum


.. TODO::
   :type: Summary Exercise
	
    A recursive function causes an infinite recursion (run-time error) if
     
    (a) It has no recursive call.
	
	(b) The base case is never executed or not exist.
	
	(c) Both of the above.
	
	(d) Neither of the above.
	
	The answer:
	
	The base case is never executed or not exist.


.. odsascript:: AV/RecurTutor/RecursionIntroCON.js
