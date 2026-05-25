/* *** ODSATag: Heapsort *** */
static <T extends Comparable<T>> void heapsort(T[] A) {
  // The heap constructor invokes the buildheap method
  MaxHeap H = new MaxHeap(A, A.length, A.length);
  for (int i=0; i<A.length; i++) {  // Now sort
    H.removeMax(); // Removemax places max at end of heap
  }
}
/* *** ODSAendTag: Heapsort *** */
