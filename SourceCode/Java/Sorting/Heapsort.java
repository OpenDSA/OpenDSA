static Boolean sorttest(int[] B) {
  int i;
  int[] Aint = new int[B.length];
  for (i = 0; i < B.length; i++) {
    Aint[i] = B[i];
  }
  heapsort(Aint);
  if (!checkorder(Aint)) { return false; }
  return true;
}

/* *** ODSATag: Heapsort *** */
static void heapsort(int[] A) {
  // The heap constructor invokes the buildheap method
  MaxHeap H = new MaxHeap(A, A.length, A.length);
  for (int i = 0; i < A.length; i++) {  // Now sort
    H.removeMax(); // Removemax places max at end of heap
  }
}
/* *** ODSAendTag: Heapsort *** */
