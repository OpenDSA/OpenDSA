.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Sally Hamouda
   :prerequisites:
   :topic: Recursion

.. odsalink:: AV/RecurTutor/recursionIntroCON.css


Tracing Practice Exercises
===========================


.. avembed:: Exercises/RecurTutor/rectFIBmystbc1.html ka
.. avembed:: Exercises/RecurTutor/rectMCQresrc2.html ka	
.. avembed:: Exercises/RecurTutor/rectFIBbwd3.html ka		
.. avembed:: Exercises/RecurTutor/rectFIBfwd4.html ka	
.. avembed:: Exercises/RecurTutor/rectFIB2rc5.html ka	
.. avembed:: Exercises/RecurTutor/rectMCQbwd6.html ka
.. avembed:: Exercises/RecurTutor/rectFIBir7.html ka	
.. avembed:: Exercises/RecurTutor/rectFIBfwd8.html ka	
.. avembed:: Exercises/RecurTutor/rectMCQbwd9.html ka

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



.. odsascript:: AV/RecurTutor/RecursionIntroCON.js
