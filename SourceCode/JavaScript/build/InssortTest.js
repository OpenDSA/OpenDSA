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
    }
  }
  console.log("Done!");
}
// Swap for int arrays
function swap(A, i, j) {
  var temp = A[i];
  A[i] = A[j];
  A[j] = temp;
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
