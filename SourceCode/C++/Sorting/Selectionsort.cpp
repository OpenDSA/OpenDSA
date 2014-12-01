#include "utils.h"
#include "Comparable.cpp"
#include "KVPair.cpp"
#include "Int.cpp"
#include "Checkorder.cpp"

// With KVPair
/* *** ODSATag: Selectionsort *** */
void selectionsort(Comparable* A[], int n) {
  for (int i = 0; i < n-1; i++) { // Select i'th biggest record
    int bigindex = 0;             // Current biggest index
    for (int j = 1; j < n-i; j++) // Find the max value
      if (*A[j] > *A[bigindex])   // Found something bigger
        bigindex = j;             // Remember bigger index    
    swap(A, bigindex, n-i-1);     // Put it into place
  }
}
/* *** ODSAendTag: Selectionsort *** */

bool sorttest(int array[], int n, int threshold) {
  Comparable* A[n];
  int i;

  /* Sort an array of Ints */
  for (i = 0; i < n; ++i) {
    A[i] = new Int(array[i]);
  }

  //  for (i = 0; i < n; ++i) {
  //    cout << *A[i] << " ";
  //  }
  //  cout << std::endl;
  
  selectionsort(A, n);

  if (!checkorder(A, n)) return false;

  for (i = 0; i < n; ++i) {
    delete A[i];
  }

  /* Sort an array of KVPairs */
  
  for (i = 0; i < n; ++i) {
    A[i] = new KVPair(array[i], &array[i]);
  }

  selectionsort(A, n);

  if (!checkorder(A, n)) return false;

  for (i = 0; i < n; ++i) {
    delete A[i];
  }
  
  delete[] array;

  return true;
}

#include "SortTest.cpp"
