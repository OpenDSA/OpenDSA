
static Boolean sorttest(int[] A) {
  int i;
  shellsort(A);
  if (!checkorder(A)) return false;
  return true;
}

/* *** ODSATag: Shellsort *** */
static void shellsort(int[] A) {
  for (int i=A.length/2; i>2; i/=2) // For each increment
    for (int j=0; j<i; j++)         // Sort each sublist
      inssort2(A, j, i);
  inssort2(A, 0, 1);     // Could call regular inssort here
}

/** Modified Insertion Sort for varying increments */
static void inssort2(int[] A, int start, int incr) {
  for (int i=start+incr; i<A.length; i+=incr)
    for (int j=i; (j>=incr) && (A[j] < A[j-incr]); j-=incr)
      Swap.swap(A, j, j-incr);
}
/* *** ODSAendTag: Shellsort *** */
