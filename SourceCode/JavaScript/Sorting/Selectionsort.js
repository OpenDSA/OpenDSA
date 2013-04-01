function sorttime(B) {
  var i;
  var A = [];
  A.length = B.length;

  for(i = 0; i < B.length; i++) A[i] = B[i];
  time1 = new Date();
  selsort(A);
  time2 = new Date();
  checkorder(A);
  console.log("Standard Selection Sort: Size " + testsize + ", Time: " + (time2 - time1));

  for(i = 0; i < B.length; i++) A[i] = B[i];
  time1 = new Date();
  selsortcheck(A);
  time2 = new Date();
  checkorder(A);
  console.log("Selection Sort/Check swaps: Size " + testsize + ", Time: " + (time2 - time1));
}

// Same as selsort, but check if the swap is necessary
function selsortcheck(A) {
  for (var i = 0; i < A.length - 1; i++) { // Select i'th biggest record
    var bigindex = 0;                // Current biggest index
    for (var j = 1; j < A.length - i; j++) // Find the max value
      if (A[j] > A[bigindex])        // Found something bigger  
        bigindex = j;                // Remember bigger index
    if (bigindex != A.length - i - 1)
      swap(A, bigindex, A.length - i - 1); // Put it into place
  }
}

function success() {
  var bw = require("buffered-writer");
  bw.open("SelsortTestSuccess").write("Success").close();
}

function sorttest(A) {
  selsort(A);
}

/* *** ODSATag: Selectionsort *** */
function selsort(A) {
  for (var i = 0; i < A.length - 1; i++) { // Select i'th biggest record
    var bigindex = 0;                // Current biggest index
    for (var j = 1; j < A.length - i; j++) // Find the max value
      if (A[j] > A[bigindex])        // Found something bigger  
        bigindex = j;                // Remember bigger index
    swap(A, bigindex, A.length - i - 1); // Put it into place
  }
}
/* *** ODSAendTag: Selectionsort *** */
