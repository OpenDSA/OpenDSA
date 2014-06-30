#include "utils.h"
#include "Comparable.cpp"
#include "KVPair.cpp"
#include "Int.cpp"
#include "Checkorder.cpp"

// With KVPair
/* *** ODSATag: Bubblesort *** */
void bubblesort(Comparable* A[], int n) {
  for (int i = 0; i < n-1; i++) {
    for (int j = 0; j < n-1; j++) {
      if (*A[j] > *A[j+1]) {
        swap(A, j, j+1);
      }
    }
  }
}
/* *** ODSAendTag: Bubblesort *** */

// With KVPair
/* *** ODSATag: Bubblecheckswap *** */
void bubblecheckswap(Comparable* A[], int n) {
  n = n-1;
  while (n > 0) {
    /* Assume the array is sorted */
    bool sorted = true;
    for (int i = 0; i < n; i++) {
      /* if this pair is out of order */
      if (*A[i] > *A[i+1]) {
        swap(A, i, i+1);
        sorted = false;
      }
    }
    if (sorted) break;
  }
}
/* *** ODSAendTag: Bubblecheckswap *** */

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
  
  bubblesort(A, n);

  if (!checkorder(A, n)) return false;

  for (i = 0; i < n; ++i) {
    delete A[i];
  }

  /* Sort an array of KVPairs */
  
  for (i = 0; i < n; ++i) {
    A[i] = new KVPair(array[i], &array[i]);
  }

  bubblesort(A, n);

  if (!checkorder(A, n)) return false;

  for (i = 0; i < n; ++i) {
    delete A[i];
  }
  
  delete[] array;

  return true;
}

#include "SortTest.cpp"
