.. raw:: html

   <link href="_static/opendsaMOD.css" rel="stylesheet" type="text/css" />
   <link href="http://algoviz.org/OpenDSA/dev/OpenDSA/JSAV/css/JSAV.css" rel="stylesheet" type="text/css" />
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
   <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js"></script>
   <script src="http://algoviz.org/OpenDSA/dev/OpenDSA/JSAV/lib/jquery.transform.light.js"></script>
   <script src="http://algoviz.org/OpenDSA/dev/OpenDSA/JSAV/lib/raphael.js"></script>
   <script src="http://algoviz.org/OpenDSA/dev/OpenDSA/JSAV/build/JSAV-min.js"></script>
   <script type="text/javascript" src="_static/ODSA.js"></script>

   <style>
     #container .jsavarray {
       left: -10px;
     }

     p.jsavoutput.jsavline {
       height: 80px;
       margin: 10px, 0px;
     }
     .jsavcontainer {
       width: 760px;
       background-color: #eed;
       margin: 0 auto;
       border: 0px
     }
     .jsavcounter {
       float: left;
       width: 100px;
       margin-top: 15px;
     }
     .jsavsettings {
       float: right;
     }
     .jsavsettings:after {
       clear: both;
       display: block;
       content: "";
     }
     .jsavcontrols {
       width: 650px;
     }
     .jsavcontrols a {
       margin: 0 40px;
     }
   </style>

   <input type="button" float="right" name="about" value="About"/>

   <script>
     // Various functions and variables that will be used by all of the
     // following sections of the tutorial.

     var speed = 100; // Animation default speed
     // The various arrays to start sweeps with or display
     var theArray = [20, 30, 12, 54, 55, 11, 78, 14, 13, 79, 44, 98, 76, 45, 32, 11];
     var theArray2 = [13, 30, 12, 54, 55, 11, 32, 11, 20, 79, 44, 98, 76, 45, 78, 14];
     var theArray3 = [13, 11, 12, 11, 20, 30, 32, 14, 55, 45, 44, 54, 76, 79, 78, 98];
     var theArray4 = [12, 11, 13, 11, 20, 14, 32, 30, 44, 45, 55, 54, 76, 79, 78, 98];
 
     var LIGHT = "rgb(215, 215, 215)";  // For "greying out" array elements
     var DARK = "black";                // Make array elements dark again

     // Convenience function for setting another type of highlight
     // (will be used for showing which elements will be compared during sort)
     var setBlue = function(arr, index) {
       arr.css(index, {"background-color": "#ddf" });
     };

     // Partial Shellsort. Sweep with the given increment
     function sweep(av, myarr, incr) {
       var j = 0;
       highlightFunction = function(index) { return index%incr == j;};
       for (j=0; j<incr; j++) {         // Sort each sublist
         // Highlight the sublist
         myarr.highlight(highlightFunction);
         av.step();
         inssort(av, myarr, j, incr);
         myarr.unhighlight(highlightFunction);
       }
     }

     // Insertion sort using increments
     function inssort(av, arr, start, incr) {
       var i, j;
       for (i=start+incr; i<arr.size(); i+=incr) {
         setBlue(arr, i);
         for (j=i; j>=incr; j-=incr) {
           setBlue(arr, j-incr);
	   av.step();
           if (arr.value(j) < arr.value(j-incr)) {
   	     arr.swap(j, j-incr); // swap the two indices
	     av.step();
   	   }
           else {
   	     arr.highlight([j-incr, j]);
             break; // Done pushing element, leave for loop
           }
  	   arr.highlight(j);
         }
         arr.highlight(j);
       }
     }

     // Display a slideshow for a sweep of "increment" steps on array "inArr"
     function DoSweep(container, inArr, increment) {
       var av = new JSAV(container);
       av.SPEED = speed; // Set the animation speed base
       // Create an array object under control of JSAV library
       var arr = av.ds.array(inArr, {indexed: true});
       av.displayInit();
       arr.unhighlight(); // unhighlight seems to have the side effect of
                          // making the cell dark.
       sweep(av, arr, increment); // first sweep with increment 8
       av.recorded();
     }

     // Show the differences between the original array and given array "a"
     function ShowDifference(container, a) {
       var av = new JSAV(container, {"animationMode": "none"});
       var origarr = av.ds.array(theArray, {indexed: true});
       var origlabel = av.label("Original Array", {before: origarr});
       var arr = av.ds.array(a, {indexed: true});
       var arrlabel = av.label("Values in <b style='color:#0f0;'>green</b> have changed from their original positions", {before: arr});
       arr.css(function(index)
         { return arr.value(index) !== origarr.value(index); }, {"color": "#0f0"});
     }
   </script>

   <script>
     // Support for "About" button
     $('input[name="about"]').click(about); // Set callback action
     function about() { // This is what we pop up
       var mystring = "Shellsort Explanation Slideshow\nWritten by Cliff Shaffer and Ville Karavirta\nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nWritten during June, 2011\nLast update: August 14, 2011\nJSAV library version " + JSAV.version();
       alert(mystring);
     }
   </script>

.. index:: ! Shellsort
.. index:: Insertion Sort, Selection Sort

Shellsort
=========

When properly implemented, Shellsort will give
substantially better performance than any of the :math:`\theta(n^2)`
sorts like Insertion Sort or Selection Sort.
But it is also a bit more complicated than those simple
:math:`\theta(n^2)` sorts.
Unlike Insertion Sort and Selection Sort, there is no real-life
intuition to inspire Shellsort -- nobody will use Shellsort to
sort their Bridge hand or organize their bills.
The key idea behind Shellsort is to exploit the best-case performance
of Insertion Sort.
Recall that when a list is sort or nearly sort, Insertion Sort runs in
linear time.
So Shellsort's strategy is to quickly make the list "mostly sorted",
so that a final Insertion Sort can finish the job.

Shellsort does what most good sorts do:
Break the list into sublists, sort the sublists, then recombine them.
But Shellsort does this in an unusual way, breaking its input
into "virtual" sublists of elements that are often not contiguous.
Each such sublist is sorted using an Insertion Sort.
Another group of sublists is then chosen and sorted, and so on.

Shellsort works by performing its Insertion Sorts on carefully
selected sublists, first on small sublists and then on increasingly
large sublists.
So at each stage, any Insertion Sort is either working on a small list
(and so is fast) or is working on a nearly sorted list (and again is
fast).

.. index:: ! increment

Shellsort breaks the list into disjoint sublists, where a sublist
is defined by an "increment".
Each element in a given sublist is "increment" positions apart.
For example, if the increment were 4, then each element in the sublist
would be 4 positions apart.
In our examples, we assume for convenience that :math:`n`,
the number of values to be sorted, is a power of two.

One possible implementation of Shellsort will begin by breaking the
list into :math:`n/2` sublists of 2 elements each, where the array
index of the 2 elements in each sublist differs by :math:`n/2`.
That is, the increment is :math:`n/2`.
If there are 16 elements in the array indexed from 0
to 15, there would initially be 8 sublists of 2 elements each, with
each element in the sublist being 8 positions apart.
The first sublist would be the elements in positions 0 and 8.
The second is in positions 1 and 9, and so on.

Click on the slideshow buttons to see the series of sublists of size
two.

.. raw:: html

   <div id="container1">
     <span class="jsavcounter"></span>
     <a class="jsavsettings" href="#">Settings</a>
     <div class="jsavcontrols"></div>
   </div>

   <script>
   (function($) {
     var av = new JSAV("container1");
     av.SPEED = speed; // Set the animation speed base
     // Create an array object under control of JSAV library
     var arr = av.ds.array(theArray, {indexed: true});

     // set color to LIGHT for the whole array, then highlight indices 0 and 8
     arr.css(function(index)
       { return index%8 != 0;}, {"color": LIGHT}).highlight([0, 8]);
     av.displayInit();
     arr.unhighlight([0, 8]).css([0, 8], {"color": LIGHT}).highlight([1, 9]);
     for (var i=2; i<8; i++) { // loop through the rest of the array sublists
       av.step();
      arr.unhighlight([i-1, i+7]).css([i-1, i+7], {"color": LIGHT}).highlight([i, i+8]);
     }
     av.recorded();
   })(jQuery);
   </script>

Now, each of these sublists of length two gets sorted using Insertion
Sort.
As you click through the next slideshow, you will first see the current
sublist highlighted in yellow.
Then a pair of elements to be compared will be shown in blue.
They are swapped if necessary to put them in sort order.

.. raw:: html

   <div id="container2">
     <span class="jsavcounter"></span>
     <a class="jsavsettings" href="#">Settings</a>
     <div class="jsavcontrols"></div>
   </div>

   <script>
   (function($) {
     var arr = theArray;
     DoSweep("container2", arr, 8);
   })(jQuery);
   </script>

At the end of the first pass, the resulting array is "a little better
sorted".

.. raw:: html

   <div id="container3">
   </div>

   <script>
   (function($) {
     var arr = theArray2;
     ShowDifference("container3", arr);
   })(jQuery);
   </script>

The second pass of Shellsort looks at fewer, bigger sublists.
In our example, the second pass would have an increment of size 4,
resulting in :math:`n/4` sublists 
Since the array in our example has :math:`n=16` elements, we have
:math:`16/4 = 4` sublists that each have 4 elements.
Thus, the second pass would have as its first
sublist the 4 elements in positions 0, 4, 8, and 12.
The second sublist would have elements in positions 1, 5, 9, and 13,
and so on.

As you click through the slides, you will see the sublists for
increment 4.

.. raw:: html

   <div id="container4">
     <span class="jsavcounter"></span>
     <a class="jsavsettings" href="#">Settings</a>
   	<div class="jsavcontrols"></div>
   </div>

   <script>
   (function($) {
     var av = new JSAV("container4");
     av.SPEED = speed; // Set the animation speed base

     var arr = av.ds.array(theArray2, {indexed: true});

     arr.css(function(index)
     { return index%4 != 0;}, {"color": LIGHT}).highlight([0, 4, 8, 12]);

     av.displayInit();
     arr.unhighlight([0, 4, 8, 12]).css([0, 4, 8, 12], {"color": LIGHT}).highlight([1, 5, 9, 13]);

     av.step();
     arr.unhighlight([1, 5, 9, 13]).css([1, 5, 9, 13], {"color": LIGHT}).highlight([2, 6, 10, 14]);

     av.step();
     arr.unhighlight([2, 6, 10, 14]).css([2, 6, 10, 14], {"color": LIGHT}).highlight([3, 7, 11, 15]);

     av.recorded();
   })(jQuery);
   </script>

Each sublist of 4 elements would also be sorted using an Insertion
Sort, as shown next.

.. raw:: html

   <div id="container5">
     <span class="jsavcounter"></span>
     <a class="jsavsettings" href="#">Settings</a>
  	<div class="jsavcontrols"></div>
   </div>

   <script>
   (function($) {
     var arr = theArray2;
     DoSweep("container5", arr, 4);
   })(jQuery);
   </script>

At the end of processing sublists with increment 4, the array is
"even more sorted".

.. raw:: html

   <div id="container6">
   </div>

   <script>
   (function($) {
     var arr = theArray3;
     ShowDifference("container6", arr);
   })(jQuery);
   </script>

The third pass would be made on sublists with increment 2.
The effect is that we process 2 lists, one consisting of the odd
positions and the other consisting of the even positions.
As usual, we sort the sublists using Insertion Sort.

.. raw:: html

   <div id="container7">
     <span class="jsavcounter"></span>
     <a class="jsavsettings" href="#">Settings</a>
	<div class="jsavcontrols"></div>
   </div>

   <script>
   (function($) {
     var arr = theArray3;
     DoSweep("container7", arr, 2);
   })(jQuery);
   </script>

At this point, we are getting close to sorted.

.. raw:: html

   <div id="container8">
   </div>

   <script>
   (function($) {
     var arr = theArray4;
     ShowDifference("container8", arr);
   })(jQuery);
   </script>

Shellsort's final pass will always use an increment of 1,
which means a "regular" Insertion Sort of all elements.

.. raw:: html

   <div id="container9">
     <span class="jsavcounter"></span>
     <a class="jsavsettings" href="#">Settings</a>
	<div class="jsavcontrols"></div>
   </div>

   <script>
   (function($) {
     var arr = theArray4;
     DoSweep("container9", arr, 1);
   })(jQuery);
   </script>


Finally, the array is sorted.

.. raw:: html

   <input type="button" name="ex1" value="Exercise 1"
          style="background-color:#f00;"/>
   <script>
     // Support for "Exercise 1" button
     $('input[name="ex1"]').click(ex1); // Set callback action
     function ex1() { // This is what we pop up
       var mystring = "Two forms at random:\n1) Given a random array of size n, a random increment size I <= n/2, and a random start location S, 0<=S<I (with an arrow over position S), click to highlight the array elements that should be in this sublist. Solve this exercise 10 times in a row to get credit.\n 2) Given random array of size n, and a sub array with elements highlighted, sort the indicated sublist.";
       alert(mystring);
       this.style.background='#0f0';
     }
   </script>

There is a lot of flexibility to picking the increment series.
It does not need to start with :math:`n/2` and cut in half each time.
In fact that is not even a good choice for the increment series.
We will come back to this later.
For now, just realize that so long as each increment is smaller than the
last, and the last increment is 1, Shellsort will work.

At this point try running Shellsort on an array of your chosen size,
with either random values or values that you select.
You can also set the increment series.
Use this visualization to make sure that you understand how Shellsort
works.

.. raw:: html

   <center>
     <iframe src="http://algoviz.org:/OpenDSA/dev/OpenDSA/AV/shellsort-av.html"
       type="text/javascript" width="792" height="492"
       frameborder="0" marginwidth="0" marginheight="0"
       scrolling="no">
     </iframe>
   </center>

Next, let's review what makes for a legal increment series.

.. raw:: html

   <input type="button"
     name="http://algoviz.org/OpenDSA/dev/OpenDSA/Exercises/ShellsortSeries.html+1000+700"
     value="Show Question 2" id="example427+show" class="showLink"
     style="background-color:#f00;"/> 
   <div id="example427" class="more">
   <input type="button"
     name="http://algoviz.org/OpenDSA/dev/OpenDSA/Exercises/ShellsortSeries.html+1000+700+hide"
     value="Hide Question 2" id="example427+hide"
     class="hideLink" style="background-color:#f00;"/>
   </div>

Now test yourself to see how well you understand Shellsort.
Can you reproduce its behavior?

.. raw:: html

   <input type="button" name="http://algoviz.org/OpenDSA/dev/OpenDSA/AV/ShellsortProficiency.html+822+502"
     value="Show Proficiency Exercise" id="example449+show"
     class="showLink" style="background-color:#f00;"/>
   <div id="example449" class="more">
   <input type="button"
     name="http://algoviz.org/OpenDSA/dev/OpenDSA/AV/ShellsortProficiency.html+822+502+hide"
     value="Hide Proficiency Exercise" id="example449+hide"
     class="hideLink" style="background-color:#f00;"/>
   </div>

Some choices for the series of increments will make Shellsort
run more efficiently than others.
In particular, the choice of increments described above
:math:`(2^k, 2^{k-1}, \ldots, 4, 2, 1)` turns out to be relatively inefficient.
You should notice for example that all elements in a given 8 increment
sublist are also part of some 4 increment sublist, which are all in turn
elements of the same 2 increment sublist.
So there is no "crossover" between sublists as the increments
reduce.
A better choice is the following series based on ":math:`3n+1`":
(..., 121, 40, 13, 4, 1).
Another approach is to make sure that the various increments are
relatively prime.
The series (..., 11, 7, 3, 1) would be an example.
In this case, there is a lot of "crossover" between the lists at the
various increment sizes.

Now you are ready to try out some different increment series to see
how they affect the cost of Shellsort.

.. raw:: html

   <input type="button" name="http://algoviz.org/OpenDSA/AV/ShellsortPerformance.html+822+388"
     value="Show Performance Exercise" id="example456+show"
     class="showLink" style="background-color:#f00;"/>
   <div id="example456" class="more">
   <input type="button"
     name="http://algoviz.org/OpenDSA/AV/ShellsortPerformance.html+822+388+hide"
     value="Hide Performance Exercise" id="example456+hide"
     class="hideLink" style="background-color:#f00;"/> 
   </div>

A theoretical analysis of Shellsort is difficult, so we must accept
without proof that the average-case performance of Shellsort
(for the ":math:`3n+1`" increment series such as ..., 13, 4, 1)
is :math:`O(n\sqrt{n})`.
Other choices for the increment
series can reduce this upper bound somewhat.
Thus, Shellsort is substantially better than Insertion Sort,
or any of the other :math:`\theta(n^2)` sorts presented earlier.
In fact, Shellsort is not so much worse than the
asymptotically better sorts to be presented later,
whenever :math:`n` is of medium size (thought is tends to be a little
slower than these other algorithms if they are well implemented).
Shellsort illustrates how we can sometimes exploit the special properties
of an algorithm (in this case Insertion Sort) even if in general that
algorithm is unacceptably slow.

Here are some questions to check whether you understand the basics of
Shellsort's runtime cost.

.. raw:: html

   <input type="button" name="http://algoviz.org/OpenDSA/dev/OpenDSA/Exercises/ShellsortMC.html+1000+700"
          value="Show Question 3" id="example477+show" class="showLink"
	  style="background-color:#f00;"/> 
   <div id="example477" class="more">
   <input type="button"
          name="http://algoviz.org/OpenDSA/dev/OpenDSA/Exercises/ShellsortMC.html+1000+700+hide"
          value="Hide Question 3" id="example477+hide"
          class="hideLink" style="background-color:#f00;"/>
   </div>

Notes
-----

Shellsort was named for its inventor, D.L. Shell, who first published
it in 1959.

It is also sometimes called the :dfn:`diminishing increment sort`.

If you want to know more about Shellsort, you can find a lot of
details about its analysis along with ideas on how to pick a good
increment series in [KnuthV3]_.
