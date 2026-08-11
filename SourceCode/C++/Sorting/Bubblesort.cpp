#include "utils.h"
#include "Comparable.cpp"
#include "KVPair.cpp"
#include "Int.cpp"
#include "Checkorder.cpp"
//Written by Hannah Börjesson 2014 @LiU

// With KVPair
/* *** ODSATag: Bubblesort *** */
void bubblesort(Comparable* A[], int n) {
  for (int i = 0; i < n-1; i++) // Insert i'th record
    for (int j = 0; j < n-i; j++) 
      if (*A[j] > *A[j+1]) 
        swap(A, j, j+1);
}
/* *** ODSAendTag: Bubblesort *** */

// With KVPair
/* *** ODSATag: BubblesortCheck *** */
void bubblecheckswap(Comparable* A[], int n) {
  n = n-1;
  while (n > 0) {
    int newn = 0;
    for (int i = 0; i < n; i++) {
      /* if this pair is out of order */
      if (*A[i] > *A[i+1]) {
        swap(A, i, i+1);
        newn = i;
      }
    }
    n = newn;
  }
}
/* *** ODSAendTag: BubblesortCheck *** */

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


bool sorttime(int array[], int arraysize, int listsize, int threshold) {
  Comparable* A[arraysize];
  int i;

  /* Sort an array of Ints */
  for (i = 0; i < arraysize; ++i) {
    A[i] = new Int(array[i]);
  }

  Settime();
  for (i=0; i<arraysize; i+=listsize) {
    bubblesort(&A[i], listsize);
  }
  cout << "Sort Int array with list size " << listsize
       << ", array size " << arraysize
       << ", and threshold " << threshold << ": "
       << Gettime() << " seconds\n";

  for (i=0; i<arraysize; i+=listsize) {
    if (!checkorder(&A[i], listsize)) return false;
  }

  for (i = 0; i < arraysize; ++i) {
    delete A[i];
  }


  /* Sort an array of KVPairs */
  
  for (i = 0; i < arraysize; ++i) {
    A[i] = new KVPair(array[i], &array[i]);
  }

  Settime();
  for (i=0; i<arraysize; i+=listsize) {
    bubblesort(&A[i], listsize);
  }
  cout << "Sort KVPair with list size " << listsize
       << ", array size " << arraysize
       << ", and threshold " << threshold << ": "
       << Gettime() << " seconds\n";

  for (i=0; i<arraysize; i+=listsize) {
    if (!checkorder(&A[i], listsize)) return false;
  }

  for (i = 0; i < arraysize; ++i) {
    delete A[i];
  }
  

  /* Sort an array of Ints */
  for (i = 0; i < arraysize; ++i) {
    A[i] = new Int(array[i]);
  }

  Settime();
  for (i=0; i<arraysize; i+=listsize) {
    bubblecheckswap(&A[i], listsize);
  }
  cout << "Sort Int array on checking swaps with list size " << listsize
       << ", array size " << arraysize
       << ", and threshold " << threshold << ": "
       << Gettime() << " seconds\n";

  for (i=0; i<arraysize; i+=listsize) {
    if (!checkorder(&A[i], listsize)) return false;
  }

  for (i = 0; i < arraysize; ++i) {
    delete A[i];
  }


  /* Sort an array of KVPairs */
  
  for (i = 0; i < arraysize; ++i) {
    A[i] = new KVPair(array[i], &array[i]);
  }

  Settime();
  for (i=0; i<arraysize; i+=listsize) {
    bubblecheckswap(&A[i], listsize);
  }
  cout << "Sort KVPair on checking swaps with list size " << listsize
       << ", array size " << arraysize
       << ", and threshold " << threshold << ": "
       << Gettime() << " seconds\n";

  for (i=0; i<arraysize; i+=listsize) {
    if (!checkorder(&A[i], listsize)) return false;
  }

  for (i = 0; i < arraysize; ++i) {
    delete A[i];
  }


  return true;
}

#include "SortTest.cpp"
