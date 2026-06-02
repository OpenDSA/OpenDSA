// TODO: Need to test changes to update and modify
// Max-heap implementation
// use `java -ea` to enable assertions that check valid heap positions
/* *** ODSATag: Maxheap *** */
class MaxHeap {
  private int[] heap;   // Pointer to the heap array
  private int maxSize;  // Maximum size of the heap
  private int n;        // Number of things now in heap

  // Constructor supporting preloading of heap contents
  MaxHeap(int[] h, int num, int max)
    { heap = h; n = num; maxSize = max; buildHeap(); }

  // Return current size of the heap
  public int heapSize() { return n; }

  // Return true if pos a leaf position, false otherwise
  public boolean isLeaf(int pos) 
  { return (n / 2 <= pos ) && (pos < n); }

  // Return position for left child of pos
  int leftchild(int pos) {
    if (pos >= n / 2) return -1;
    return 2 * pos + 1;
  }

  // Return position for right child of pos
  int rightchild(int pos) {
    if (pos >= (n - 1) / 2) return -1;
    return 2 * pos + 2;
  }

  // Return position for parent
  public static int parent(int pos) 
  { return (pos - 1) / 2; }

  // Insert val into heap
  public void insert(int key) {
    assert n < maxSize : "Heap is full; cannot insert";
    heap[n] = key;
    n++;
    siftUp(n - 1);
  }

  // Heapify contents of Heap
  private void buildHeap() {
    for (int i = parent(n - 1); i >= 0; i--) {
      siftDown(i);
    }
  }

  // Moves an element down to its correct place
  private void siftDown(int pos) {
    assert (0 <= pos && pos < n) : "Invalid heap position";
    while (!isLeaf(pos)) {
      int child = leftchild(pos);
      if ((child + 1 < n) && (heap[child + 1] > heap[child])) {
        child = child + 1; // child is now index with the greater value
      }
      if (heap[child] <= heap[pos]) {
        return; // stop early
      }
      swap(pos, child);
      pos = child; // keep sifting down
    }
  }

  // Moves an element up to its correct place
  private void siftUp(int pos) {
    assert (0 <= pos && pos < n) : "Invalid heap position";
    while (pos > 0) {
      int parent = parent(pos);
      if (heap[parent] > heap[pos]) {
        return; // stop early
      }
      swap(pos, parent);
      pos = parent; // keep sifting up
    }
  }

  // Remove and return maximum value
  public int removeMax() {
    assert n > 0 : "Heap is empty; cannot remove";
    n--;
    if (n != 0) {
      swap(0, n);  // Swap maximum with last value
      siftDown(0); // Put new heap root val in correct place
    }
    return heap[n];
  }

  // Remove and return element at specified position
  public int remove(int pos) {
    assert (0 <= pos && pos < n) : "Invalid heap position";
    n--;
    swap(pos, n); // Swap with last value
    update(pos);  // Move other value to correct position
    return heap[n];
  }

  // Modify the value at the given position
  public void modify(int pos, int newVal) {
    assert (0 <= pos && pos < n) : "Invalid heap position";
    heap[pos] = newVal;
    update(pos);
  }

  // The value at pos has been changed, restore the heap property
  private void update(int pos) {
    siftUp(pos);   // priority goes up
    siftDown(pos); // unimportant goes down
  }

  // swaps the elements at two positions
  private void swap(int pos1, int pos2) {
    int temp = heap[pos1];
    heap[pos1] = heap[pos2];
    heap[pos2] = temp;
  }
}
/* *** ODSAendTag: Maxheap *** */
