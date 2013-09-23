void sorttest(Integer[] A) {
  shellsort(A);
}

/* *** ODSATag: Shellsort *** */
void shellsort(Integer[] A) {
  for (int i=A.length/2; i>2; i/=2) // For each increment
    for (int j=0; j<i; j++)         // Sort each sublist
      inssort2(A, j, i);
  inssort2(A, 0, 1);     // Could call regular inssort here
}

/** Modified Insertion Sort for varying increments */
void inssort2(Integer[] A, int start, int incr) {
  for (int i=start+incr; i<A.length; i+=incr)
    for (int j=i; (j>=incr) && (A[j] < A[j-incr]); j-=incr)
      swap(A, j, j-incr);
}
/* *** ODSAendTag: Shellsort *** */
