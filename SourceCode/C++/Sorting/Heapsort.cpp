#include "Maxheap.cpp"


/* *** ODSATag: Heapsort *** */
void heapsort(Comparable* A[], int n) {
  std::cout << "Getting started with array:" << std::endl;
  for (int j = 0; j<n; j++)
    std::cout << *A[j] << " ";
  std::cout << std::endl;
  MaxHeap H(A,n,n);
  std::cout << "Now, ready to unpack the heap" << std::endl;
  for (int i = 0; i < n; i++)
     H.removemax();
}
/* *** ODSAendTag: Heapsort *** */

// With KVPair

bool sorttest(int array[], int n, int threshold) {
  Comparable* A[n];
  int i;

  cout << "We came in with array:" << endl;
  for (i = 0; i<n; i++)
    std::cout << array[i] << " ";
  std::cout << std::endl;


  /* Sort an array of Ints */
  for (i = 0; i < n; ++i) {
    A[i] = new Int(array[i]);
  }

  cout << "We are going to call Heapsort with this array:" << endl;
  for (i = 0; i<n; i++)
    std::cout << A[i] << " ";
  std::cout << std::endl;

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
