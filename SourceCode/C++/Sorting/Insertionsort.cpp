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
  KVpair kv[n];
  int i;
  for (i=0; i<n; i++) {
    kv[i].setKey(A[i]);
  }
  for (i=0; i<n; i++)
    cout << A[i] << " ";
  cout << "\n";
  inssort<E, Comp>(A, n);
  if (!checkorder<E, Comp>(A, n)) return false;
  for (i=0; i<n; i++)
    cout << A[i] << " ";
  cout << "\n";
  for (i=0; i<n; i++)
    cout << kv[i] << " ";
  cout << "\n";
  KVpair *ka = new KVpair(10, new Int(15));
  KVpair *kb = new KVpair(15, new Int(10));
  if (ka < kb) cout << ka->key() << " < " << kb->key() << "\n";
  else   cout << ka->key() << " !< " << kb->key() << "\n";
  if (kb < ka) cout << kb->key() << " < " << ka->key()<< "\n";
  else cout << kb->key() << " !< " << ka->key() << "\n";

  if (kv[0] < kv[1]) cout << (kv[0])->key() << " < " << (kv[1])->key() << "\n";
  else   cout << (kv[0])->key() << " !< " << (kv[0])->key() << "\n";

  //  inssort(kv, n);
  //  if (!checkorder(kv, n)) return false;
  for (i=0; i<n; i++)
    cout << kv[i] << " ";
  cout << "\n";
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
