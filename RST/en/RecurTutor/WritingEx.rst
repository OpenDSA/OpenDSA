.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Sally Hamouda
   :prerequisites:
   :topic: Recursion

.. odsalink:: AV/RecurTutor/recursionIntroCON.css


Writing Practice Exercises
===============================
.. avembed:: Exercises/RecurTutor/recwprog19.html ka


.. odsafig:: Images/PascalTriangle.jpg
   :width: 300
   :align: center
   :capalign: justify
   :figwidth: 50%
   :alt: Pascal Triangle

   Pascal triangle

.. avembed:: Exercises/RecurTutor/recwprog20.html ka


.. odsafig:: Images/cannonballs.png
  :width: 300
  :align: center
  :capalign: justify
  :figwidth: 50%
  :alt: Cannonballs Pyramid

  Cannonballs Pyramid

.. avembed:: Exercises/RecurTutor/recwprog21.html ka


.. avembed:: Exercises/RecurTutor/recwprog22.html ka


.. avembed:: Exercises/RecurTutor/recwprog23.html ka
	

.. avembed:: Exercises/RecurTutor/recwprog24.html ka

	
.. avembed:: Exercises/RecurTutor/recwprog25.html ka	
	
		
.. avembed:: Exercises/RecurTutor/recwprog26.html ka
		


	
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
	
	We want to count the number of pins in a pyramid of bowling pins, knowing that: The first row has one pin, the second row has 2 pins, the third	row has 3 pins and so on. Given the following recursive function that misses a recursive call. Given the following recursive function signature, write the function code such that this function calculates the total number of pins in the triangle(Like exercise 21)::
	
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
	
	Given the following recursive function signature, write the function code such that this function takes a positive numStairs and returns the number
	of different ways to climb a staircase of that height taking strides of one or two stairs at a time(same as 26)::
	
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

.. odsascript:: AV/RecurTutor/RecursionIntroCON.js
