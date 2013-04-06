function sorttime(B) {
  var i;
  var A = [];
  A.length = B.length;
  var totaltime, runs;
  var numruns = 20;

  for(i = 0; i < B.length; i++) A[i] = B[i];
  time1 = new Date();
  bubblesort(A);
  time2 = new Date();
  checkorder(A);
  console.log("Standard Bubble Sort: Size " + testsize + ", Time: " + (time2 - time1));

  for(i = 0; i < B.length; i++) A[i] = B[i];
  time1 = new Date();
  bubblesortcheck(A);
  time2 = new Date();
  checkorder(A);
  console.log("Swap Check Bubble Sort: Size " + testsize + ", Time: " + (time2 -time1));

  for(i = 0; i < B.length; i++) A[i] = B[i];
  time1 = new Date();
  bubblesortcheck2(A);
  time2 = new Date();
  checkorder(A);
  console.log("Swap Check Bubble Sort 2: Size " + testsize + ", Time: " + (time2 - time1));

totaltime = 0;
for (runs=0; runs<numruns; runs++) {
  for(i = 0; i < B.length; i++) A[i] = B[i];
  time1 = new Date();
  wikipedia(A);
  time2 = new Date();
  checkorder(A);
totaltime += (time2-time1);
}
  console.log("Wikipedia Bubble Sort: Size " + testsize + ", " + " for " + numruns + " runs, Time: " + totaltime);

  for(i = 0; i < B.length; i++) A[i] = B[i];
  time1 = new Date();
  wikipedia2(A);
  time2 = new Date();
  checkorder(A);
  console.log("Wikipedia Bubble Sort 2: Size " + testsize + ", Time: " + (time2 - time1));

totaltime = 0;
for (runs=0; runs<numruns; runs++) {
  for(i = 0; i < B.length; i++) A[i] = B[i];
  time1 = new Date();
  unwikipedia(A);
  time2 = new Date();
  checkorder(A);
totaltime += (time2-time1);
}
  console.log("Wikipedia Bubble Sort without swap checking: Size " + testsize + ", " + " for " + numruns + " runs, Time: " + totaltime);
}

// A flag check if a pass did not have any swaps, which lets us quit
function bubblesortcheck(A) {
  for (var i = 0; i < A.length - 1; i++) { // Insert i'th record
    var swaps = false;
    for (var j = 1; j < A.length - i; j++)
      if (A[j-1] > A[j]) {
        swap(A, j-1, j);
        swaps = true;
      }
    if(!swaps) { console.log("Quit at " + i); break; }  // Can quit early
  }
}

// Modify the flag to check position of last swap taken
function bubblesortcheck2(A) {
  for (var i = 0; i < A.length - 1; i++) {// Insert i'th record
    var lastseen = 0;
    var top = A.length;
    for (var j = 1; j < top; j++)
      if (A[j - 1] > A[j]) {
        swap(A, j - 1, j);
        lastseen = j - 1;
      }
    top = lastseen;
    if (top == 0) { console.log("Quit at " + i); break; }  // Can quit early
  }
}

// Wikipedia article "optimization" to only swap up to the last swap seen
function wikipedia(A) {
  var n = A.length - 1;
  while (n > 0) {
    var newn = 0;
    for (var i = 0; i < n; i++)
      /* if this pair is out of order */
      if (A[i] > A[i + 1]) {
        swap(A, i, i + 1);
        newn = i;
      }
    n = newn;
  }
}

// Wikipedia article "optimization" rewritten with a for loop
function wikipedia2(A) {
  var newn;
  for(var n = A.length - 1; n > 0; n = newn) {
    newn = 0;
    for (var i = 0; i < n; i++)
      /* if this pair is out of order */
      if (A[i] > A[i + 1]) {
        swap(A, i, i + 1);
        newn = i;
      }
  }
}

// Wikipedia article-compatible version without swap checking
function unwikipedia(A) {
  var n = A.length - 1;
  while (n > 0) {
    for (var i = 0; i < n; i++)
      /* if this pair is out of order */
      if (A[i] > A[i + 1]) {
        swap(A, i, i + 1);
      }
    n -= 1;
  }
}

function success() {
  var bw = require("buffered-writer");
  bw.open("BubblesortTestSuccess").write("Success").close();
}

function sorttest(A) {
  bubblesort(A);
}

/* *** ODSATag: Bubblesort *** */
function bubblesort(A) {
  for (var i = 0; i < A.length - 1; i++) // Insert i'th record
    for (var j = 1; j < A.length - i; j++)
      if (A[j - 1] > A[j])
        swap(A, j - 1, j);
}
/* *** ODSAendTag: Bubblesort *** */
