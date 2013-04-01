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
