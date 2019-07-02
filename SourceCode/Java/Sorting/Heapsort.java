@SuppressWarnings("unchecked") // Generic array allocation
static Boolean sorttest(int[] B) {
  int i;
  Integer[] A = new Integer[B.length];
  for (i=0; i<B.length; i++)
    A[i] = new Integer(B[i]);
  heapsort(A);
  if (!checkorder(A)) return false;
  return true;
}

/* *** ODSATag: Heapsort *** */
static void heapsort(Comparable[] A) {
  // The heap constructor invokes the buildheap method
  MaxHeap H = new MaxHeap(A, A.length, A.length);
  for (int i=0; i<A.length; i++)  // Now sort
    H.removemax(); // Removemax places max at end of heap
}
/* *** ODSAendTag: Heapsort *** */
