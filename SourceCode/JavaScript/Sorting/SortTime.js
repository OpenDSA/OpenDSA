var testsize = 10000;
var time1, time2;         // These get set by sorttime()

function checkorder(A) {
  for (var i = 1; i < A.length; i++) {
    if (A[i] < A[i - 1]) {
      console.log("Error! Value " + A[i] + " at position " + i +
              " was less than " + A[i - 1] + " at position " + (i - 1));
    }
  }
}

var A = [];
A.length = testsize;
for (var i = 0; i < A.length; i++)
  A[i] = Math.floor(Math.random() * 1000) + 1;
// for (var i = 0; i < A.length; i++)
//   A[i] = i + 1;
// for (var i = 0; i < A.length; i++)
//   A[i] = 200000 - i;

sorttime(A);
