#include "Maxheap.cpp"


/* *** ODSAendTag: Heapsort *** */

void heapsort(Comparable* A[], int n) {
  MaxHeap H (A,n,n);  
  for (int i = 0; i < n; i++) 
     H.removemax();
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

  //heapsort(A, n);

  if (!checkorder(A, n)) return false;

  for (i = 0; i < n; ++i) {
    delete A[i];
  }
  
  delete[] array;

  return true;
}

#include "SortTest.cpp"
