#include "utils.h"
#include "Int.cpp"
#include "Checkorder.cpp"

/* *** ODSATag: Radixsort *** */
static void radixsort(int A[], int k, int r, int n) {
  int B[n], count[r], i, j, rtok;
  
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
  int i;

  /* Sort an array of Ints */
  for (i = 0; i < n; ++i) {
    A[i] = new Int(array[i]);
  }

  //  for (i = 0; i < n; ++i) {
  //    cout << *A[i] << " ";
  //  }
  //  cout << std::endl;
  
  radixsort(A, 2, 256, n);

  if (!checkorder(A, n)) return false;

  for (i = 0; i < n; ++i) {
    delete A[i];
  }
  
  delete[] array;

  return true;
}

#include "SortTest.cpp"
