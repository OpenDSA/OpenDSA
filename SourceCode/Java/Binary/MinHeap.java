// TODO: Maxheap got modified to support an "update" utility and
// a "modify" method. These need to be repeated here.
/* *** ODSATag: Minheap *** */
// Min-heap implementation
class MinHeap {
  private int[] heap;   // Pointer to the heap array
  private int maxSize;  // Maximum size of the heap
  private int n;        // Number of things now in heap

  // Constructor supporting preloading of heap contents
  MinHeap(int[] h, int num, int max)
    { heap = h;  n = num;  maxSize = max;  buildHeap(); }

  // Return current number of elements in the heap
  int heapSize() { return n; }

  // Return true if pos a leaf position, false otherwise
  boolean isLeaf(int pos)
  { return (pos >= n / 2) && (pos < n); }

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
  int parent(int pos) {
    if (pos <= 0) return -1;
    return (pos - 1) / 2;
  }

  // Insert val into heap
  void insert(int key) {
    if (n >= maxSize) {
      System.out.println("Heap is full");
      return;
    }
    int curr = n++;
    heap[curr] = key;  // Start at end of heap
    // Now sift up until curr's parent's key > curr's key
    while ((curr != 0) && (heap[curr] < heap[parent(curr)])) {
      swap(curr, parent(curr));
      curr = parent(curr);
    }
  }

  // Heapify contents of Heap
  void buildHeap()
    { for (int i=n/2-1; i>=0; i--) siftdown(i); }

  // Put element in its correct place
  void siftdown(int pos) {
    if ((pos < 0) || (pos >= n)) return; // Illegal position
    while (!isLeaf(pos)) {
      int j = leftchild(pos);
      if ((j<(n-1)) && (heap[j] > heap[j+1]))
        j++; // j is now index of child with greater value
      if (heap[pos] <= heap[j]) return;
      swap(pos, j);
      pos = j;  // Move down
    }
  }

  // Remove and return minimum value
  int removemin() {
    if (n == 0) return -1; // Removing from empty heap
      swap(0, --n);        // Swap maximum with last value
    if (n != 0)            // Not on last element
      siftdown(0);         // Put new heap root val in correct place
    return heap[n];
  }

  // Remove and return element at specified position
  int remove(int pos) {
    if ((pos < 0) || (pos >= n)) return -1; // Illegal heap position
    if (pos == (n-1)) n--; // Last element, no work to be done
    else {
      swap(pos, --n); // Swap with last value
      // If we just swapped in a big value, push it up
      while ((pos > 0) && (heap[pos] < heap[parent(pos)])) {
        swap(pos, parent(pos));
        pos = parent(pos);
      }
      if (n != 0) siftdown(pos); // If it is little, push down
    }
    return heap[n];
  }

  // swaps the elements at two positions
  private void swap(int pos1, int pos2) {
    int temp = heap[pos1];
    heap[pos1] = heap[pos2];
    heap[pos2] = temp;
  }
}
/* *** ODSAendTag: Minheap *** */
