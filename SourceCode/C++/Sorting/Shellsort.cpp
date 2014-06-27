#include "utils.h"
#include "Comparable.cpp"
#include "KVPair.cpp"
#include "Int.cpp"
#include "Checkorder.cpp"

// With KVPair
/* *** ODSATag: Inssort2 *** */
// Insertion sort for varying increment
void inssort2(Comparable* A[], int n, int start, int incr) {
  for (int i = start+incr; i < n; i += incr) {
    for (int j = i; (j >= incr) && (*A[j] < *A[j-incr]); j -= incr) {
      swap(A, j, j-incr);
    }
  }
}
/* *** ODSAendTag: Inssort2 *** */

/* *** ODSATag: Shellsort *** */

// Shellsort n/2 increment
void shellsort(Comparable* A[], int n) {
  for (int i = n/2; i > 2; i /= 2) { //For each increment
    for (int j = 0; j < i; j++) { //Sort each sublist
      inssort2(A, n, j, i);
    }
  }
  inssort2(A, n, 0, 1);
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
  
  inssort(A, n);

  if (!checkorder(A, n)) return false;

  for (i = 0; i < n; ++i) {
    delete A[i];
  }

  /* Sort an array of KVPairs */
  
  for (i = 0; i < n; ++i) {
    A[i] = new KVPair(array[i], &array[i]);
  }

  inssort(A, n);

  if (!checkorder(A, n)) return false;

  for (i = 0; i < n; ++i) {
    delete A[i];
  }
  
  /* Sort an array of KVPairs */
  
  for (i = 0; i < n; ++i) {
    A[i] = new KVPair(array[i], &array[i]);
  }

  inssortshift(A, n);

  if (!checkorder(A, n)) return false;

  for (i = 0; i < n; ++i) {
    delete A[i];
  }
  
  delete[] array;

  return true;
}

#include "SortTest.cpp"
