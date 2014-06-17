#include "utils.h"
#include "KVpair.cpp"
#include "compare.h"

// With KVpair
/* *** ODSATag: Insertionsort *** */
void inssort(KVpair* A[], int n) { // Insertion Sort
  for (int i=1; i<n; i++)       // Insert i'th record
    for (int j=i; (j>0) && (A[j] < A[j-1]); j--)
      swap(A, j, j-1);
}
/* *** ODSAendTag: Insertionsort *** */

// With templates and comparator
template <typename E, typename Comp>
void inssort(E A[], int n) { // Insertion Sort
  for (int i=1; i<n; i++)       // Insert i'th record
    for (int j=i; (j>0) && (Comp::lt(A[j], A[j-1])); j--)
      swap(A, j, j-1);
}


#include "Checkorder.cpp"

template <typename E, typename Comp>
bool sorttest(E A[], int n, int threshold) {
  inssort<E, Comp>(A, n);
  if (!checkorder<E, Comp>(A, n)) return false;
  KVpair** kv = new KVpair*[n];
  for (int i=0; i<n; i++) {
    kv[i] = new KVpair(A[i], new Int(A[i]));
  }
  inssort(kv, n);
  if (!checkorder(kv, n)) return false;
  return true;
}

#include "SortTest.cpp"

/* *** ODSATag: InsertionOpt *** */
// Instead of swapping, "shift" the values down the array
template <typename E, typename Comp>
void inssortshift(E A[], int n) { // Insertion Sort
  for (int i=1; i<n; i++) { // Insert i'th record
    int j;
    E temp = A[i];
    for (int j=i; (j>0) && (Comp::prior(temp, A[j-1])); j--)
      A[j] = A[j-1];
    A[j] = temp;
  }
}
/* *** ODSAendTag: InsertionOpt *** */
