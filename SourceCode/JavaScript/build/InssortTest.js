"use strict";
/*global console */

var numtests = 5;
var testsize = 100;
var SUCCESS = true;

var A = [];
var i;

// Perform numtests trials to test this
A.length = testsize;
for (var tests = 0; tests < numtests; tests++) {
  for (i = 0; i < A.length; i++) {
    A[i] = Math.floor(Math.random() * 1000) + 1;
  }
  sorttest(A);
  for (i = 1; i < A.length; i++) {
    if (A[i] < A[i-1]) {
      console.log("Error! Value " + A[i] + " at position " + i +
              " was less than " + A[i-1] + " at position " + (i-1));
      SUCCESS = false;
    }
  }
  console.log("Done!");
}

if (SUCCESS) {
  success();
}
// Swap for int arrays
function swap(A, i, j) {
  var temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}
function sorttime(B) {
  var i;
  var A = [];
  A.length = B.length;

  for(i=0; i<B.length; i++) A[i] = B[i];
  time1 = new Date();
  inssort(A);
  time2 = new Date();
  checkorder(A);
  console.log("Standard Insertion Sort: Size " + testsize + ", Time: " + (time2 - time1));

  for(i=0; i<B.length; i++) A[i] = B[i];
  time1 = new Date();
  inssort2(A);
  time2 = new Date();
  checkorder(A);
  console.log("Standard Insertion Sort, no swap function: Size " + testsize + ", Time: " + (time2 - time1));

  for(i=0; i<B.length; i++) A[i] = B[i];
  time1 = new Date();
  inssortshift(A);
  time2 = new Date();
  checkorder(A);
  console.log("Shifting Insertion Sort: Size " + testsize + ", Time: " + (time2 - time1));

  for(i=0; i<B.length; i++) A[i] = B[i];
  time1 = new Date();
  inssortshift2(A);
  time2 = new Date();
  checkorder(A);
  console.log("Shifting Insertion Sort 2 (!==): Size " + testsize + ", Time: " + (time2 - time1));
}


// Instead of swapping, "shift" the values down the array
function inssortshift(A) {
  for (var i = 1; i < A.length; i++) { // Insert i'th record
    var j;
    var temp = A[i];
    for (j = i; (j > 0) && (temp < A[j-1]); j--)
      A[j] = A[j-1];
    A[j] = temp;
  }
}

// Same as inssortshift, but try != instead of < for the zero test
// This will only matter to JavaScript
function inssortshift2(A) {
  for (var i = 1; i !== A.length; i++) { // Insert i'th record
    var j;
    var temp = A[i];
    for (j = i; (j !== 0) && (temp < A[j - 1]); j--)
      A[j] = A[j-1];
    A[j] = temp;
  }
}

// Same as standard insertion sort, except get rid of the swap
// function call
function inssort2(A) {
  var temp;
  for (var i = 1; i < A.length; i++) // Insert i'th record
    for (var j = i; (j > 0) && (A[j] < A[j - 1]); j--) {
      temp = A[j]; A[j] = A[j - 1]; A[j - 1] = temp;
    }
}

function success() {
  var bw = require("buffered-writer");
  bw.open("InssortTestSuccess").write("Success").close();
}

function sorttest(A) {
  inssort(A);
}

/* *** ODSATag: Insertionsort *** */
function inssort(A) {
  for (var i = 1; i < A.length; i++) // Insert i'th record
    for (var j = i; (j > 0) && (A[j] < A[j - 1]); j--)
      swap(A, j, j - 1);
}
/* *** ODSAendTag: Insertionsort *** */
