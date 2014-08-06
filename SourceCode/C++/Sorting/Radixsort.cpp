#include "utils.h"
#include "Comparable.cpp"
#include "KVPair.cpp"
#include "Int.cpp"
#include "Checkorder.cpp"

//Written by Hannah Börjesson 2014 @LiU
/* *** ODSATag: Radixsort *** */
static void radixsort(int A[], int k, int r, int n) {
  int B[n];
  int count[r];
  int i, j, rtok;
  
  for (i = 0, rtok = 1; i < k; i++, rtok *= r) {  // For k digits
    for (j = 0; j < r; j++) count[j] = 0;  // Initialize count
    
    // Count the number of records for each bin on this pass
    for (j = 0; j < n; j++) count[(A[j]/rtok)%r]++;
    
    // count[j] will be index in B for last slot of bin j.
    // First, reduce count[0] because indexing starts at 0, not 1
    count[0] = count[0] - 1;
    for (j = 1; j < r; j++) count[j] = count[j-1] + count[j];
    
    // Put records into bins, working from bottom of bin
    // Since bins fill from bottom, j counts downwards
    for (j  = n-1; j >= 0; j--) {
      B[count[(A[j]/rtok)%r]] = A[j];
      count[(A[j]/rtok)%r] = count[(A[j]/rtok)%r] - 1;
    }
    for (j = 0; j < n; j++) A[j] = B[j];  // Copy B back
  }
}
/* *** ODSAendTag: Radixsort *** */

bool sorttest(int array[], int n, int threshold) {

  radixsort(array, 2, 256, n);

  if (!checkorder(array, n)) return false;

  delete[] array;

  return true;
}

#include "SortTest.cpp"
