/* *** ODSATag: Queue *** */
interface Queue { // Queue class ADT
  // Reinitialize queue
  void clear();

  // Put element on rear
  boolean enqueue(Object it);

  // Remove and return element from front
  Object dequeue();

  // Return front element
  Object frontValue();

  // Return queue size
  int length();
}
/* *** ODSAendTag: Queue *** */
