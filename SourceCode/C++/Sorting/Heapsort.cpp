#include "utils.h"
#include "Comparable.cpp"
#include "KVPair.cpp"
#include "Int.cpp"
#include "Checkorder.cpp"

// With KVPair

void swap(Comparable *A[], int i, int j) {
  Comparable* tmp = A[i];
  A[i] = A[j];
  A[j] = tmp;
}

/* *** ODSATag: siftdown *** */
void siftDown(Comparable* A[], int start, int end) {
  int root = start;

  while (root*2+1 < end) {
    int child = 2*root + 1;
    if ((child + 1 < end) && *A[child] < *A[child+1]) {
    child += 1;
  }
    if (*A[root] < *A[child]) {
      swap(A, child, root);
      root = child;
    }
    else
      return;
  }
}
/* *** ODSAendTag: siftdown *** */

/* *** ODSATag: Heapsort *** */
void heapsort(Comparable* A[], int count) {
  int start, end;
  /* heapify */
  for (start = (count-2)/2; start >= 0; start--) {
    siftDown(A, start, count);
  }
  for (end = count-1; end > 0; end--) {
    swap(A, end, 0);
    siftDown(A, 0, end);
  }

}
/* *** ODSAendTag: Heapsort *** */

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
  
  heapsort(A, n);

  if (!checkorder(A, n)) return false;

  for (i = 0; i < n; ++i) {
    delete A[i];
  }

  /* Sort an array of KVPairs */
  
  for (i = 0; i < n; ++i) {
    A[i] = new KVPair(array[i], &array[i]);
  }

  heapsort(A, n);

  if (!checkorder(A, n)) return false;

  for (i = 0; i < n; ++i) {
    delete A[i];
  }
  
  delete[] array;

  return true;
}

#include "SortTest.cpp"
