/* *** ODSATag: Queue *** */
interface Queue { // Queue ADT
  // Reinitialize queue
  void clear();

  // Put element on rear
  void enqueue(Object it);

  // Remove and return element from front
  Object dequeue();

  // Return front element
  public Object frontValue();

  // @return Queue size
  int length();
}
/* *** ODSAendTag: Queue *** */
