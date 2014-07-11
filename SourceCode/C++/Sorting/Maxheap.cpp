#include "utils.h"
#include "Comparable.cpp"
#include "KVPair.cpp"
#include "Int.cpp"
#include "Checkorder.cpp"

/* *** ODSATag: Maxheap *** */
// Max-heap implementation
class MaxHeap {
  Comparable* Heap[];
  int size;
  int n;
public:
  MaxHeap(Comparable*[], int, int);
  
  // Return current size of the heap
  int heapsize() { return n; }
  
  // Return true if pos a leaf position, false otherwise
  bool isLeaf(int pos) { return (pos >= n/2) && (pos < n); }
  
  // Return position for left child of pos
  int leftchild(int pos) {
    if(pos >= n/2) return -1;
    return 2*pos + 1;
  }

  // Return position for right child of pos
  int rightchild(int pos) {
    if (pos >= (n-1)/2) return -1;
    return 2*pos + 2;
  }
  
  // Return position for parent
  int parent(int pos) {
    if (pos <= 0) return -1;
    return (pos-1)/2;
  }
  // Insert val into heap
  void insert(Comparable* key) {
    if (n >= size) {
      std::cout << "Heap is full" << std::endl;
      return;
    }
    int curr = n++;
    Heap[curr] = key; // Start at end of heap
    // Now sift up until curr's parent's key > curr's key
    while ((curr != 0) && (*Heap[curr] > *Heap[parent(curr)])) {
        swap(Heap, curr, parent(curr));
        curr = parent(curr);
      }
  }
  
  // Heapify contents of Heap
  void buildheap() {
    for (int i=n/2-1; i>=0; i--) {
        std::cout << "buildheap varv : " << i << std::endl;
        siftdown(i);
    }
  }  
  // Put element in its correct place
  void siftdown(int pos) {
    if ((pos < 0) || (pos >= n)) return; // Illegal position
      while (!isLeaf(pos)) {
        int j = leftchild(pos);
        std::cout << "**** POS : " << pos << " *** J:  " << j << std::endl;
        if ((j<(n-1)) && (*Heap[j] < (*Heap[j+1]))) j++; // j is now index of child with greater value
        //GOING DOWN... when pos = 9 and j = 19
        std::cout << "Now j is: " << j << std::endl;
        if (*Heap[pos] >= (*Heap[j])) return; // THIS = SEG FAULT...
        std::cout << "Now swap" << std::endl;
        swap(Heap, pos, j);
        pos = j;  // Move down 
      }
  }
  
  // Remove and return maximum value
  Comparable* removemax() {
    if (n == 0) return NULL;  // Removing from empty heap
    swap(Heap, 0, --n); // Swap maximum with last value
    if (n != 0)      // Not on last element
      siftdown(0);   // Put new heap root val in correct place
    return Heap[n];
  }
  // Remove and return element at specified position
  Comparable* remove(int pos) {
    if ((pos < 0) || (pos >= n)) return NULL; // Illegal heap position
    if (pos == (n-1)) n--; // Last element, no work to be done
    else {
      swap(Heap, pos, --n); // Swap with last value
      // If we just swapped in a big value, push it up
      while ((pos > 0) && (*Heap[pos] > (*Heap[parent(pos)]))) {
        swap(Heap, pos, parent(pos));
        pos = parent(pos);
      }
      if (n != 0) siftdown(pos); // If it is little, push down
    }
    return Heap[n];
  }
  
};

MaxHeap::MaxHeap(Comparable* h[], int num, int max) {
  *Heap = *h; n = num; size = max; buildheap();
}

/* *** ODSAendTag: Maxheap *** */
