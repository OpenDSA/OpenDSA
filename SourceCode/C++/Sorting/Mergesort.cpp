#include "utils.h"
#include "Comparable.cpp"
#include "KVPair.cpp"
#include "Int.cpp"
#include "Checkorder.cpp"

// With KVPair
/* *** ODSATag: Mergesort *** */
void mergesort(Comparable* A[], Comparable* temp[], int left, int right) {
  if (left == right) return; // List has one record
  int mid = (left + right)/2; // Select midpoint
  mergesort(A, temp, left, mid); // Mergesort first half
  mergesort(A, temp, (mid+1), right); // Mergesort second half
  for (int i = left; i <= right; i++)  // Copy subarray to temp
    *temp[i] = *A[i];
  // Do the merge operation back to A
  int i1 = left;
  int i2 = mid + 1;
  for (int curr = left; curr <= right; curr++) {
    if (i1 == mid+1)   // Left sublist exhausted
      *A[curr] = *temp[i2++];
    else if (i2 > right)   // Right sublist exhausted 
      *A[curr] = *temp[i1++];
    else if (*temp[i1] <= *temp[i2])    // Get smaller value
      *A[curr] = *temp[i1++]; 
    else
      *A[curr] = *temp[i2++]; 
  }   
}
/* *** ODSAendTag: Mergesort *** */

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
  
  mergesort(A, temp, 0, n-1);

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
      temp[i] = new KVPair(0, 0);
   }

  mergesort(A, temp, 0, n-1);

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
