#include "utils.h"
#include "Comparable.cpp"
#include "KVPair.cpp"
#include "Int.cpp"
#include "Checkorder.cpp"

// Shellsort n/2 increment
/* *** ODSATag: Shellsort *** */
void shellsort(Comparable* A[], int n) {
  for (int i = n/2; i > 2; i /= 2)  //For each increment
    for (int j = 0; j < i; j++)  //Sort each sublist
      inssort2(A, j, i, n);
    inssort2(A, 0, 1, n);
}

// Modified Insertion Sort for varying increments
void inssort2(Comparable* A[], int start, int incr, int n) {
  for (int i = start+incr; i < n; i += incr)
    for (int j = i; ((j >= incr) && (*A[j] < *A[j-incr])); j -= incr) 
      swap(A, j, j-incr);
}
/* *** ODSAendTag: Shellsort *** */

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
  
  shellsort(A, n);

  if (!checkorder(A, n)) return false;

  for (i = 0; i < n; ++i) {
    delete A[i];
  }

  /* Sort an array of KVPairs */
  
  for (i = 0; i < n; ++i) {
    A[i] = new KVPair(array[i], &array[i]);
  }

  shellsort(A, n);

  if (!checkorder(A, n)) return false;

  for (i = 0; i < n; ++i) {
    delete A[i];
  }
  
  delete[] array;

  return true;
}

#include "SortTest.cpp"
