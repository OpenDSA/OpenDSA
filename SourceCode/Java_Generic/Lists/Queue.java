/* *** ODSATag: Queue *** */
public interface Queue<E> { // Queue class ADT
  // Reinitialize queue
  public void clear();

  // Put element on rear
  public boolean enqueue(E it);

  // Remove and return element from front
  public E dequeue();

  // Return front element
  public E frontValue();

  // Return queue size
  public int length();
}
/* *** ODSAendTag: Queue *** */
