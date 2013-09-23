void sorttest(Integer[] A) {
  heapsort(A);
}

/* *** ODSATag: Heapsort *** */
void heapsort(Integer[] A) {
  // The heap constructor invokes the buildheap method
  MaxHeap H = new MaxHeap(A, A.length, A.length);
  for (int i=0; i<A.length; i++)  // Now sort
    H.removemax(); // Removemax places max at end of heap
}
/* *** ODSAendTag: Heapsort *** */
