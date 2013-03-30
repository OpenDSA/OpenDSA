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
