void sorttest(int[] A) {
  radix(A, 4, 256);
}

/* *** ODSATag: Radixsort *** */
static void radix(int[] A, int k, int r) {
     int B[A.length];
     int count[r];     // Count[i] stores number of records with digit value i
     int i, j, rtok;

     for (i=0, rtok=1; i<k; i++, rtok*=r) { // For k digits
       for (j=0; j<r; j++) count[j] = 0;    // Initialize count

       // Count the number of records for each bin on this pass
       for (j=0; j<A.length; j++) count[(A[j]/rtok)%r]++;

       // count[j] will be index in B for last slot of bin j.
       // First, reduce count[0] because indexing starts at 0, not 1
       count[0] = count[0] - 1;
       for (j=1; j<r; j++) count[j] = count[j-1] + count[j];

       // Put records into bins, working from bottom of bin
       // Since bins fill from bottom, j counts downwards
       for (j=A.length-1; j>=0; j--) {
         B[count[(A[j]/rtok)%r]] = A[j];
         count[(A[j]/rtok)%r] = count[(A[j]/rtok)%r] - 1;
       }
       for (j=0; j<A.length; j++) A[j] = B[j]; // Copy B back
     }
   }
/* *** ODSAendTag: Radixsort *** */
