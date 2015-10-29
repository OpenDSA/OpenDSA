/*global ODSA */
// Written by Sally Hamouda and Cliff Shaffer
$(document).ready(function () {
  "use strict";
  var theArray = [2, 4, 6];
  function setGreen(arr, index) {
    arr.css(index, {"background-color": "#00FF00" });
  };

  function setWhite(arr, index) {
    arr.css(index, {"background-color": "#fff" });
  };

  var av_name = "recurTraceSumCON";
  var av = new JSAV(av_name);

  // Slide 1
  av.umsg("Now let's consider an easy recursive call. We want to sum the elements of an array.");
  var pseudo = av.code({url: "../../../SourceCode/Java/RecurTutor/WrtSumV4.java",
                        lineNumbers: false,});
  av.displayInit();

  // Slide 2
  av.umsg("Assume the array contains [2, 4, 6], and that the first call is sum(arr, 3). This will sum the first three elements of the array.");
  var arr = av.ds.array(theArray, {indexed: true});
  av.step();

  // Slide 3
  av.umsg("As the initial call to sum is made, the base case is not true (n is not 0).");
  pseudo.highlight(2);
  av.step();

  // Slide 4
  av.umsg("So it goes to the recursive call, this time passing a value of n$-1=2$. It will also pass a reference to the array.");
  pseudo.unhighlight(2);
  pseudo.highlight(5);
  av.step();

  // Slide 5
  av.umsg("The original sum makes a call to sum, passing in a copy of arr. Notice that n has a value of 2.");
  pseudo.unhighlight(5);
  pseudo.highlight(1);
  av.step();

  // Slide 6
  av.umsg("Here's the important question, to see if you're keeping up. How many n's are there? One or two? Recall that n is a value parameter. Because it is a value parameter, that means it's a copy. Thus, it occupies a different memory location.");
  av.step();

  // Slide 7
  av.umsg("In the second call, n is 2, which means we aren't at the base case yet. So, it again goes into the else case...");
  pseudo.unhighlight(1);
  pseudo.highlight(5);
  av.step();

  // Slide 8
  av.umsg("...and makes a recursive call.");
  pseudo.unhighlight(5);
  pseudo.highlight(1);
  av.step();

  // Slide 9
  av.umsg("Again, we're not yet to the base case, so we must make another recursive call.");
  pseudo.unhighlight(1);
  pseudo.highlight(5);
  av.step();

  // Slide 10
  av.umsg("At this point, we are at the base case. So, the value of 0 is returned.");
  pseudo.unhighlight(5);
  pseudo.highlight(3);
  av.step();

  // Slide 11
  av.umsg("The result returned is added to the value in arr[n - 1]. Since n is now 1 , arr[n - 1] is arr[1 - 1] which is arr[0] = 2. So, add 0 + 2.");
  pseudo.unhighlight(3);
  pseudo.highlight(5);
  setGreen(arr, 0);
  av.step();

  // Slide 12
  av.umsg("This is why it's important to return 0 from the base case. We add 0 to the value at array element 0. Any other value produces an incorrect answer. Next, 2 is returned back to the previous call.");
  av.step();

  // Slide 13
  av.umsg("Now 2 is added to arr[n - 1] = arr[2 - 1] = arr[1] = 4. So, 2 + 4 is 6, and that is returned back.");
  setWhite(arr,0);
  setGreen(arr, 1);
  av.step();

  // Slide 14
  av.umsg("Finally, 6  will be added to arr[n - 1] = arr[3 - 1] = arr[2] = 6, which is 12, and 12 is the final result of the call. That is the answer expected.");
  setWhite(arr,1);
  setGreen(arr, 2);
  av.recorded();
});
