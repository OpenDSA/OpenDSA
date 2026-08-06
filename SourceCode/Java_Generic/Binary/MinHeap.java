// TODO: Maxheap got modified to support an "update" utility and
// a "modify" method. These need to be repeated here.
/* *** ODSATag: Minheap *** */
// Min-heap implementation
class MinHeap<T extends Comparable<T>> {
  private T[] heap; // Pointer to the heap array
  private int maxSize;          // Maximum size of the heap
  private int n;             // Number of things now in heap

  // Constructor supporting preloading of heap contents
  MinHeap(T[] h, int inSize, int max)
    { heap = h;  n = inSize;  maxSize = max;  buildheap(); }

  // Return current size of the heap
  public int heapSize() { return n; }

  // Return true if pos a leaf position, false otherwise
  public boolean isLeaf(int pos)
  { return (pos >= n/2) && (pos < n); }

  // Return position for left child of pos
  public int leftchild(int pos) {
    if (pos >= n/2) return -1;
    return 2*pos + 1;
  }

  // Return position for right child of pos
  public int rightchild(int pos) {
    if (pos >= (n-1)/2) return -1;
    return 2*pos + 2;
  }

  // Return position for parent
  public int parent(int pos) {
    if (pos <= 0) return -1;
    return (pos-1)/2;
  }

  // Insert val into heap
  public void insert(T key) {
    if (n >= maxSize) {
      System.out.println("Heap is full");
      return;
    }
    int curr = n++;
    heap[curr] = key;  // Start at end of heap
    // Now sift up until curr's parent's key > curr's key
    while ((curr != 0) && (heap[curr].compareTo(heap[parent(curr)]) < 0)) {
      swap(curr, parent(curr));
      curr = parent(curr);
    }
  }

  // Heapify contents of the heap
  public void buildheap()
    { for (int i=n/2-1; i>=0; i--) siftDown(i); }

  // Put element in its correct place
  public void siftDown(int pos) {
    if ((pos < 0) || (pos >= n)) return; // Illegal position
    while (!isLeaf(pos)) {
      int child = leftchild(pos);
      if ((child<(n-1)) && (heap[child].compareTo(heap[child+1]) > 0))
        child++; // child is now index of child with lesser value
      if (heap[pos].compareTo(heap[child]) <= 0) return; // Stop early
      swap(pos, child);
      pos = child;  // Move down
    }
  }

  // Remove and return minimum value
  public T removemin() {
    if (n == 0) return null;  // Removing from empty heap
    swap(0, --n); // Swap maximum with last value
    if (n != 0)      // Not on last element
      siftDown(0);   // Put new heap root val in correct place
    return heap[n];
  }

  // Remove and return element at specified position
  public T remove(int pos) {
    if ((pos < 0) || (pos >= n)) return null; // Illegal heap position
    if (pos == (n-1)) n--; // Last element, no work to be done
    else {
      swap(pos, --n); // Swap with last value
      // If we just swapped in a big value, push it up
      while ((pos > 0) && (heap[pos].compareTo(heap[parent(pos)]) < 0)) {
        swap(pos, parent(pos));
        pos = parent(pos);
      }
      if (n != 0) siftDown(pos); // If it is little, push down
    }
    return heap[n];
  }

  // swaps the elements at two positions
  private void swap(int pos1, int pos2) {
    T temp = heap[pos1];
    heap[pos1] = heap[pos2];
    heap[pos2] = temp;
  }
}
/* *** ODSAendTag: Minheap *** */
