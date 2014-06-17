.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Sally Hamouda
   :prerequisites:
   :topic: Recursion




How to write a recursive function?
==================================

As we have mentioned before, solving a "big" problem recursively means to solve one or more smaller versions of the problem, and using those solutions of the smaller problems to solve the "big" problem. 

In particular, solving problems recursively typically means that there are smaller versions of the problem solved in similar ways. For example, consider the problem of summing values of an array. What's the difference between summing an array of 100 elements versus summing an array of 50 elements?

You use the same technique, but in one case you sum up to 100 elements, and in the other case, you sum up to the first 50 elements. And, even more importantly, you can use the solution to the smaller problem to help you solve the larger problem.

To understand recursion, you must understand that the basic unit of recursion is the function call. In fact, if you avoid using loops and use only recursion, you will find that your function code will generally be much shorter. 

The following visualization shows the basic four steps you need to write any recursive function:

.. TODO::
   :type: Visualization
   
    The Four Steps to Write a Recursive code:

    Step 1: Write and define the prototype of the function. Since functions are the basic unit of recursion, it's important to know what the function does. The prototype you use 
    will dictate how the recursion behaves.Let's look at an example. Here's a function which will sum the first n elements of an array.

    // Sums the first n elements of the array, arr  int sum( int arr[], int n )

    Step 2: Write out a sample function call. Once you've determined what the function does, then we imagine a function call.
 
    int result = sum( arr, n );

    So, the call is sum( arr, n ). This will sum the first n elements of arr. Pick the most generic function call. For example, you don't want to have a call like:

    int result = sum( arr, 10 );

    That's picking a constant. You want to use variables when possible, because that's the most general way to call the function.

    Step 3: Think of the smallest version of the problem. The smallest version is called the base case. Most people mistakenly pick a base case that's too large. In this case, 
    you will pick a specific value for n.

    So, what is the smallest version of the problem? Here are three choices: sum( arr, 2 ); as Choice 1, sum( arr, 1 ); as  Choice 2 and sum( arr, 0 ); as Choice 3  
    Some people pick choice 1, reasoning that if you are to sum elements of an array, then you must have at least two elements to sum.
  
    However, that is really not necessary. In math, there is something called a  summation. It is perfectly valid to have a summation of only one element. You just return that 
    one element. Some people pick choice 2, because it doesnt make sense to sum an array of size 0, whereas an array of size 1 seems to make sense.

    However, it turns out choice 3 is the smallest choice possible. You can sum zero elements of an array. What value should it return? It should return 0. As it turns out, 0 is 
    the additive identity. Anything added to 0 is that number. If we wanted to multiply all elements of an array, we would have picked the multiplicative identity, which is 1.

    Step 4: Think of smaller versions of the function call. Here's the function call: sum( arr, n )  // sums first n elements of arr

    It tries to solves a problem of size n. We want to think of a smaller problem which we will assume can be solved correctly. The next smallest problem is to sum n - 1 
    elements.  sum( arr, n - 1 )  // sums first n - 1 elements of arr

    Assume this problem has been solved for you. How would you solve the original, larger problem?
 
    If the first n - 1 elements have already been summed then only the nth element is left to be summed. The n-th element is actually at index n - 1 (because arrays start at 
    index 0). So, the solution to solving sum(arr,n) is to add sum(arr, n-1) to arr[n-1].Putting it All Together. So, writing a recursive function requires putting the base case 
    and the recursive case together.

    Here is the usual format: if ( base case ) // return some simple expression else // recursive case   {     // some work before      // recursive call      // some work 
    after }

   

The simplest version of a recursive function is an if-else statement where the \lq\lq if" part is the base case, and the "else" part is the recursive case. There are several mistakes people make with a base case. The first one is picking too large a base case. Second, not realizing there may be more than one base case. Finally, thinking that the base case only gets called when the input size is the smallest. In fact, the recursion ALWAYS makes it to some base case. Thus, the base case is where the recursion eventually stops. Don't think of it as merely called when the input is, say, 0. It gets called for all cases (eventually).
In the recursive case, there is a recursive call. Most recursive functions do something after the call. After all, you often need the solution of the \lq\lq smaller" recursive call to create the solution for the "big" problem.

However, on occasion, you may need to do some work prior to the recursive function call (e.g., calculating or printing something).

.. TODO::
   :type: Visualization
   
   The following visualization shows three different versions of the Sum recursive function and the differences between them

   To solve the sum problem, we use the simpler of the two versions.

   int sum( int arr[], int size )
    {
      if ( size == 0 )  // base case 
          return 0;
      else{            
         // recursive call
          int smallResult = sum( arr, size - 1 );           
         // use solution of recursive call to solve this problem            
          return smallResult + arr[ size - 1 ];
       }
     }

   Some people don’t like multiple return statements. That can be easily handled

   int sum( int arr[], int size )
   {
     if ( size == 0 )  
      // base case 
          return 0;
     else        
     {            
      // recursive call            
      int smallResult = sum( arr, size - 1 );
      // use solution of recursive call to solve this problem
      result= smallResult + arr[ size - 1 ];
     } 
     return result;

   You may even think there's no reason to declare smallResult and prefer to write

   int sum( int arr[], int size )    
   {       
    if ( size == 0 )   
      return 0;
    else        
     {      
      return sum( arr, size - 1 )+ arr[ size - 1 ];
     }
    }

   Certainly, once you gain more experience with recursive functions, this is the preferable version. However, declaring a local variable to store the result of the recursive 
   call might help you in the beginning to think about the small solution and then thinking about how to use that small solution to solve the bigger problem.


You will never understand recursion well without doing a lot of practice on it. Here are set of practice exercises on recursion, try to practice them all to master recursion.
