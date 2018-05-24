/* *** ODSATag: LQueue1 *** */
// Linked queue implementation
class LQueue<E> implements Queue<E> {
  private Link<E> front; // Pointer to front queue node
  private Link<E> rear;  // Pointer to rear queue node
  private int size;      // Number of elements in queue

  // Constructors
  LQueue() { init(); }
  LQueue(int size) { init(); } // Ignore size

  // Initialize queue
  void init() {
    front = rear = new Link<E>(null);
    size = 0;
  }
/* *** ODSAendTag: LQueue1 *** */

  // Reinitialize queue
  public void clear() { init(); }

  public String toString() {
    StringBuffer out = new StringBuffer(size * 4);
    for (Link<E> temp = front.next(); temp != null;  temp = temp.next()) {
      out.append(temp.element());
      out.append(" ");
    }
    return out.toString();
  }
/* *** ODSATag: LQueue2 *** */

/* *** ODSATag: LQueueEnqueue *** */
  // Put element on rear
  public boolean enqueue(E it) {
    rear.setNext(new Link<E>(it, null));
    rear = rear.next();
    size++;
    return true;
  }
/* *** ODSAendTag: LQueueEnqueue *** */

/* *** ODSATag: LQueueDequeue *** */
  // Remove and return element from front
  public E dequeue() {
    if (size == 0) return null;
    E it = front.next().element(); // Store the value
    front.setNext(front.next().next()); // Advance front
    if (front.next() == null) rear = front; // Last element
    size--;
    return it; // Return element
  }
/* *** ODSAendTag: LQueueDequeue *** */

  // Return front element
  public E frontValue() {
    if (size == 0) return null;
    return front.next().element();
  }

  // Return queue size
  public int length() { return size; }
  
  //Tell if the queue is empty or not
  public boolean isEmpty() { return size == 0; }
}
/* *** ODSAendTag: LQueue2 *** */
