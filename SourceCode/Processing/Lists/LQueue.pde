/* *** ODSATag: LQueue1 *** */
// Linked queue implementation
class LQueue implements Queue {
  private Link front; // Pointer to front queue node
  private Link rear;  // Pointer to rear queuenode
  private int size;   // Number of elements in queue

  // Constructors
  LQueue() { init(); }
  LQueue(int size) { init(); } // Ignore size

  // Initialize queue
  private void init() {
    front = rear = new Link(null);
    size = 0;
  }
/* *** ODSAendTag: LQueue1 *** */

  // Reinitialize queue
  void clear() { init(); }

  String toString() {
    StringBuffer out = new StringBuffer(size * 4);
    for (Link temp = front.next(); temp != null;  temp = temp.next()) {
      out.append(temp.element());
      out.append(" ");
    }
    return out.toString();
  }
/* *** ODSATag: LQueue2 *** */

/* *** ODSATag: LQueueEnqueue *** */
  // Put element on rear
  boolean enqueue(Object it) {
    rear.setNext(new Link(it, null));
    rear = rear.next();
    size++;
    return true;
  }
/* *** ODSAendTag: LQueueEnqueue *** */

/* *** ODSATag: LQueueDequeue *** */
  // Remove and return element from front
  Object dequeue() {
    if (size == 0) return null;
    Object it = front.next().element(); // Store the value
    front.setNext(front.next().next()); // Advance front
    if (front.next() == null) rear = front; // Last Object
    size--;
    return it; // Return Object
  }
/* *** ODSAendTag: LQueueDequeue *** */

  // Return front element
  Object frontValue() {
    if (size == 0) return null;
    return front.next().element();
  }

  // Return queue size
  int length() { return size; }
}
/* *** ODSAendTag: LQueue2 *** */
