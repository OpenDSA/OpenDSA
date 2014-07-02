#include "utils.h"
#include "Comparable.cpp"
#include "KVPair.cpp"
#include "Int.cpp"
#include "Checkorder.cpp"

void swap(Comparable *A[], int i, int j) {
  Comparable* tmp = A[i];
  A[i] = A[j];
  A[j] = tmp;
}
//Insertionsort algorithm
void inssort(Comparable* A[], int n) { // Insertion Sort
  for (int i = 1; i < n; i++) { // Insert i'th record
    for (int j = i; (j > 0) && (*A[j] < *A[j-1]); j--) {
      swap(A, j, j-1);
    }
  }
}
// With KVPair
/* *** ODSATag: MergesortOpt *** */

// Merge sort optional algorithm ****Hannah
void mergesortOpt(Comparable* A[], Comparable* temp[], int left, int right, int n) {
  int THRESHOLD = 50; //
  if ((right-left) <= THRESHOLD) {     // Small list
    inssort(A, right-left+1);
      return;
  }
  int i, j, k, mid = (left+right)/2;  // Select the midpoint
  mergesortOpt(A, temp, left, mid, n);
  mergesortOpt(A, temp, mid+1, right, n);
  // Do the merge operation. First, copy 2 halves to temp.
  for (i = mid; i >= left; i--) *temp[i] = *A[i];
  for (j = 1; j <= right-mid; j++) *temp[right-j+1] = *A[j+mid];
  // Merge sublists back to A
  for (i = left, j = right, k = left; k <= right; k++)
    if (*temp[i] < *temp[j]) *A[k] = *temp[i++];
    else *A[k] = *temp[j--];
}

/* *** ODSAendTag: MergesortOpt *** */

// With KVPair

bool sorttest(int array[], int n, int threshold) {
  Comparable* A[n];
  Comparable* temp[n];
  int i;

  /* Sort an array of Ints */
  for (i = 0; i < n; ++i) {
    A[i] = new Int(array[i]);
  }
  for (int i = 0; i < n; ++i) {
    temp[i] = new Int(0);
  }

  //  for (i = 0; i < n; ++i) {
  //    cout << *A[i] << " ";
  //  }
  //  cout << std::endl;
  
  mergesortOpt(A, temp, 0, n-1, n);

  if (!checkorder(A, n)) return false;

  for (i = 0; i < n; ++i) {
    delete A[i];
  }
   for (int i = 0; i < n; ++i) {
      delete temp[i];
    }

  /* Sort an array of KVPairs */
  
  for (i = 0; i < n; ++i) {
    A[i] = new KVPair(array[i], &array[i]);
  }
  for (int i = 0; i < n; ++i) {
      temp[i] = new KVpair(0, 0);
   }

  mergesortOpt(A, temp, 0, n-1, n);

  if (!checkorder(A, n)) return false;

  for (i = 0; i < n; ++i) {
    delete A[i];
  }
  for (int i = 0; i < n; ++i) {
      delete temp[i];
    }
  
  delete[] array;

  return true;
}

#include "SortTest.cpp"
