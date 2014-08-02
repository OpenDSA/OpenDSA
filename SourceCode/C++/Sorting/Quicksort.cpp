#include "utils.h"
#include "Comparable.cpp"
#include "KVPair.cpp"
#include "Int.cpp"
#include "Checkorder.cpp"


/* *** ODSATag: findpivot *** */
int findpivot(int i, int j)
  { return (i+j)/2; }
/* *** ODSAendTag: findpivot *** */

/* *** ODSATag: partition *** */
int partition(Comparable* A[], int left, int right, Comparable* pivot) {
  while (left <= right) { // Move bounds inward until they meet
    while (*A[left] < *pivot) left++;
    while ((right >= left)  && (*A[right] >= *pivot)) right--;
    if (right > left) swap(A, left, right);  // Swap out-of-place values
   }
  return left;           // Return first position in right partition
}
/* *** ODSAendTag: partition *** */

/* *** ODSATag: Quicksort *** */
void quicksort(Comparable* A[], int i, int j) {
  int pivotindex = findpivot(i, j);
  swap(A, pivotindex, j); // Stick pivot at end
  // k will be the first position in the right subarray
  int k = partition(A, i, j-1,A[j]);
  swap(A, k, j);                       // Put pivot in place
  if ((k-i) > 1) quicksort(A, i, k-1); // Sort left partition
  if ((j-k) > 1) quicksort(A, k+1, j); // Sort right partition
}

/* *** ODSAendTag: Quicksort *** */

// With KVPair

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
  
  quicksort(A, 0, n-1);

  if (!checkorder(A, n)) return false;

  for (i = 0; i < n; ++i) {
    delete A[i];
  }

  /* Sort an array of KVPairs */
  
  for (i = 0; i < n; ++i) {
    A[i] = new KVPair(array[i], &array[i]);
  }

  quicksort(A, 0, n-1);

  if (!checkorder(A, n)) return false;

  for (i = 0; i < n; ++i) {
    delete A[i];
  }
  
  delete[] array;

  return true;
}

#include "SortTest.cpp"
