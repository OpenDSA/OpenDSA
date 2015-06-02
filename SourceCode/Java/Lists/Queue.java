/* *** ODSATag: Queue *** */
public interface Queue { // Queue class ADT
  // Reinitialize queue
  public void clear();

  // Put element on rear
  public boolean enqueue(Object it);

  // Remove and return element from front
  public Object dequeue();

  // Return front element
  public Object frontValue();

  // Return queue size
  public int length();
}
/* *** ODSAendTag: Queue *** */
