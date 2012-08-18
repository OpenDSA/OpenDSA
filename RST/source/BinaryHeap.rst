.. avmetadata:: Binary Heap
   :author: Ari Korhonen and Cliff Shaffer
   :prerequisites: 
   :topic: Binary Heaps
   :short_name: BinaryHeap

.. _BinaryHeap:

.. include:: JSAVheader.rinc

.. raw:: html

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
       var arrlabel = av.label("Values in <b style='color:#0b0;'>green</b> have changed from their original positions", {before: arr});
       arr.css(function(index)
         { return arr.value(index) !== origarr.value(index); },
         {"color": "#0b0", "font-weight": "bold"});
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

.. index:: ! Binary Heap
.. index:: ! Priority Queue

Priority Queue Introduction
===========================

Priority Queue (PQ) is an Abstract Data Type (ADT) that has the following operations 1) insert and 2) find and remove the largest (or smallest) item (DeleteMax or DeleteMin).

Example Use Case: Work Flow Problem

Let a set of jobs J, waiting for completion, be inserted into a priority Queue Q. Each job has a certain priority value p. After the completion of each job, the next job selected is such that has the highest priority. The selected job is removed from Q and started. At any moment, new jobs can be inserted into Q. Thus, there can be arbitrary interleavings of operations in terms of insertions and removals. The challenge is to find such a data structure and algorithms that can most efficiently implement the required operations.

Binary Heap
===========

Binary Heap (aka Heap; other heaps exist as well, but without any extra prefix, heap refers to Binary Heap) is one of the most important implementations for PQ. It is a complete binary tree where all the levels - except possibly the last/lowest level - are full, and in the last/lowest level all the items are on the left. In this case, the data structure can simply be implemented as an array. If the heap is Minimum Heap (MinHeap), the priority of each node is less than the priority of its children. We say that the heap order property for MinHeap is "the father is less (or equal) than its children". Of course, the heap order property can be the other way around in which case we are dealing with Maximum Heap (MaxHeap).

Heap algorithms are based on the following basic idea. First, we make a minor local change. After this, the heap is modified in order to satisfy the heap order property again. The changes are required only in the path from the root to leaf or vice versa.

Heap in a Nutshell
------------------

An important implementation for Priority Queue (allows efficient implementations for the operations insert and DeleteMax)

Can be implemented using a simple array due to the fact that a binary heap is
a complete binary tree.

Heap order property (MaxHeap): Father greater than its children

Heap order property (MinHeap): Father less than its children

Array Representation
====================

