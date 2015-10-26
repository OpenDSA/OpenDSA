/*global ODSA */
// Written by Sally Hamouda and Cliff Shaffer
// Visualizing the four steps to write a recursive function
$(document).ready(function() {
  "use strict";
  var av = new JSAV("recurWriteStepsCON");

  // Slide 1
  av.umsg("Step 1: Write and define the prototype for the function.");
  av.displayInit();

  // Slide 2
  av.umsg("Let's look at an example. Here is a function to sum the first $n$ elements of an array.");
  var pseudo = av.code("// Sums the first n elements of the array, arr \n  int sum(int arr[], int n)", {lineNumbers: false});
  pseudo.highlight(2);
  av.step();

  // Slide 3
  av.umsg("Step 2: Write out a sample function call. Once you've determined what the function does, then we imagine a function call. This will sum the first $n$ elements of arr.");
  pseudo.hide();
  var pseudo2 = av.code("int result = sum(arr, n);", {lineNumbers: false});
  av.step();

  // Slide 4
  av.umsg("Pick the most generic function call. For example, you don't want to have a call like:");
  pseudo2.hide();
  var pseudo3 = av.code("int result = sum(arr, 10);", {lineNumbers: false});
  av.step();

  // Slide 5
  av.umsg("The problem with this version is that it is calling with a constant for the number of values summed. You want to use variables when possible, because that's the most general way to call the function.");
  av.step();

  // Slide 6
  av.umsg("Step 3: Think of the smallest version of the problem. This is called the base case. Here, you pick a small value for $n$, and give its answer. A common mistake is to pick a base case that is too large.");
  pseudo3.hide();
  av.step();

  // Slide 7
  av.umsg("So, what is the smallest version of the problem? Here are three choices:");
  var pseudo4 = av.code(" sum(arr, 2); \n sum(arr, 1); \n sum(arr, 0);", {lineNumbers: true});
  av.step();

  // Slide 8
  av.umsg("Some people pick choice 1, reasoning that if you are to sum elements of an array, then you must have at least two elements to sum.");
  pseudo4.highlight(1);
  av.step();

  // Slide 9
  av.umsg("However, it is perfectly valid to have a summation of only one element. You could just return the value for that one element.");
  pseudo4.unhighlight(1);
  av.step();

  // Slide 10
  av.umsg("Some people pick choice 2, because it does not make sense to sum an array of size 0, whereas an array of size 1 seems to make sense.");
  pseudo4.highlight(2);
  av.step();

  // Slide 11
  av.umsg("But the real issue is: How small might an array be? Choice 3 is the smallest array size possible (an empty array). You can sum zero elements of an array. What value should it return? It should return 0.");
  pseudo4.unhighlight(2);
  pseudo4.highlight(3);
  av.step();

  // Slide 12
  av.umsg("Step 4: Think of smaller versions of the function call. Here's the function call: ");
  pseudo4.hide();
  var pseudo5 = av.code("// sums first n elements of arr \n sum(arr, n)  ", {lineNumbers: false});
  av.step();

  // Slide 13
  av.umsg("This means to solve a problem of size $n$. We need to think of a smaller problem, which we will assume can be solved correctly. The next smallest problem is to sum $n-1$ elements.");
  pseudo5.hide();
  var pseudo6 = av.code("// sum first n-1 elements of arr \n sum(arr, n - 1)", {lineNumbers: false});
  av.step();

  // Slide 14
  av.umsg("Assume this smaller problem of size $n-1$ has been solved for you. How would you solve the original, larger problem?");
  av.step();

  // Slide 15
  av.umsg("If the first $n - 1$ elements have already been summed, then only the $n$th element is left to be summed. So, the solution to solving sum(arr,n) is to add sum(arr, n-1) to arr[n-1]. (Remember that the $n$th element is actually at index $n - 1$ because arrays start at index 0).");
  pseudo6.hide();
  var pseudo7 = av.code("// return sum of first n elements of arr \n return sum(arr, n - 1) + arr[n-1];", {lineNumbers: false});
  av.step();

  // Slide 16
  av.umsg("Putting it all together: Writing a recursive function requires putting the base case and the recursive case together. Here is the usual format:");
  pseudo7.hide();
  var peseudo8 = av.code("if (base case) {\n // return some simple expression\n} else { // recursive case\n // some work before \n // recursive call \n // some work after \n}", {lineNumbers: false, top: 10, left: 70});
  peseudo8.highlight(1);
  peseudo8.highlight(3);
  av.step();

  // Slide 17
  av.umsg("It doesn't really matter whether the base case or the recursive part comes first.");
  av.label("Usual Format:", {left: 70, top: -20});
  av.label("Alternative Format:", {left: 430, top: -20});
  var peseudo9 = av.code("if (recursive case) {\n // some work before \n // recursive call \n // some work after \n} else { // base case\n  // return some simple expression\n}", {lineNumbers: false, top: 10, left: 430});
  peseudo9.highlight(1);
  peseudo9.highlight(5);
  av.recorded();
});
