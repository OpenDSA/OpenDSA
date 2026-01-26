/* *** ODSATag: Radixsort *** */
static void radix(Integer[] A, int k, int r) {
  Integer[] B = new Integer[A.length];
  int[] count = new int[r];
  int i, j, rtok;
  for (i=0, rtok=1; i<k; i++, rtok*=r) { 
    for (j=0; j<r; j++) 
      count[j] = 0;
    for (j=0; j<A.length; j++) 
      count[(A[j]/rtok)%r]++;
    int total = A.length;
    for (j=r-1; j>=0; j--) {
      total -= count[j]; count[j] = total; }
    for (j=0; j<A.length; j++) {
      B[count[(A[j]/rtok)%r]] = A[j];
      count[(A[j]/rtok)%r] = count[(A[j]/rtok)%r] + 1;
    }
    for (j=0; j<A.length; j++) A[j] = B[j];
  }
}
/* *** ODSAendTag: Radixsort *** */
