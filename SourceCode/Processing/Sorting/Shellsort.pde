void sorttest(Comparable[] A) {
  shellsort(A);
}

/* *** ODSATag: Shellsort *** */
void shellsort(Comparable[] A) {
  for (int i=A.length/2; i>2; i/=2) // For each increment
    for (int j=0; j<i; j++)         // Sort each sublist
      inssort2(A, j, i);
  inssort2(A, 0, 1);     // Could call regular inssort here
}

/** Modified Insertion Sort for varying increments */
void inssort2(Comparable[] A, int start, int incr) {
  for (int i=start+incr; i<A.length; i+=incr)
    for (int j=i; (j>=incr) && (A[j].compareTo(A[j-incr]) < 0); j-=incr)
      swap(A, j, j-incr);
}
/* *** ODSAendTag: Shellsort *** */
